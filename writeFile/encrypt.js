import { writeFileSync, unlinkSync } from 'fs';


const docker = `
services:

  traefik:
    image: traefik:v3.6.2
    command:
      - "--providers.docker=true"
      - "--providers.docker.exposedbydefault=false"
      - "--entrypoints.web.address=:80"
      - "--entrypoints.websecure.address=:443
      - "--entrypoints.web.http.redirections.entrypoint.to=websecure"
      - "--entrypoints.web.http.redirections.entrypoint.scheme=https"

      - "--certificatesresolvers.letsencrypt.acme.httpchallenge=true"
      - "--certificatesresolvers.letsencrypt.acme.httpchallenge.entrypoint=web"
      - "--certificatesresolvers.letsencrypt.acme.email=your-email@example.com"  
      - "--certificatesresolvers.letsencrypt.acme.storage=/letsencrypt/acme.json"

      - "--log.level=INFO"

      # Optional: API dashboard
      # - "--api.dashboard=true"
      # - "--api.insecure=true"

    ports:
      - "80:80"
      - "443:443"
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock:ro"
      - "./letsencrypt:/letsencrypt"
    restart: unless-stopped

  

  gateway:
    build: 
      context: ./gateway
    command: "npm run start"
    expose:
      - "80"
    mem_limit: 200m
    cpus: 0.5
    depends_on:
      - api
      - pages
      - redirect
    environment:
      - NODE_ENV=production
      - API_PORT=3001
      - FRONTEND_PORT=3003
      - PORT=80
      - TRUST_PROXY=true
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.gateway.rule=Host(your-domain.duckdns.org)"
      - "traefik.http.routers.gateway.entrypoints=websecure"
      - "traefik.http.routers.gateway.tls=true"
      - "traefik.http.services.gateway.loadbalancer.server.port=80"
      - "traefik.http.routers.gateway.tls.certresolver=letsencrypt" 

  
  api:
    build: 
      context: ./backend/api
    command: "npm run start"
    expose:
      - "3001"
    mem_limit: 100m
    cpus: 0.5
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - PORT=3001
      - SECRET=${SECRET}
      - SECRET_COOKIE=${SECRET_COOKIE}

  migrate:
    build:
      context: ./backend/migrate
    command: sh -c " npx prisma migrate db push"
    environment:
      - DATABASE_URL=${DATABASE_URL}


  pages:
    build:
      context: .
      dockerfile: backend/pages/Dockerfile
    command: "npm run start"
    expose:
      - "3003"
    mem_limit: 100m
    cpus: 0.5
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - PORT=3003
      - SECRET=${SECRET}
      - SECRET_COOKIE=${SECRET_COOKIE}



  
volumes:
    letsencrypt:
`
const pageDocker = `
# Base image
FROM node:24

# App directory
WORKDIR /app

# Copy package
COPY  backend/pages/package*.json ./

# Install dependency
RUN npm install

# Copy files of application
COPY backend/pages .

COPY frontend ./frontend

# Build js from ts
RUN cd frontend/pages && npm install && npx tsc

# Copy html from src to dist
RUN cd frontend/pages && cp ./src/*.html ./dist 

# Make CSS
RUN cd frontend/pages && npx @tailwindcss/cli -i ./src/index.css -o ./dist/output.css

# Build step (TypeScript)
RUN npm run build

# Open port
EXPOSE 3003

#Prisma
RUN npx prisma generate

# Start app
CMD ["npm", "start"]
`

const redirect = `
import express, { urlencoded } from 'express';
import * as path from 'path'
import { fileURLToPath } from 'url'
import { PrismaClient } from '@prisma/client/edge';
import * as dotenv from 'dotenv'
import { withAccelerate } from '@prisma/extension-accelerate'

dotenv.config();

const {PORT} = process.env;

const server = express();
server.use(express.json({
    type: ['application/json', 'text/plain']
}));
const __dirname = path.dirname(fileURLToPath(import.meta.url));
server.use(express.static(path.join(__dirname, '../public')));

const prisma = new PrismaClient().$extends(withAccelerate());

server.use(urlencoded({ extended: false }));
server.disable("x-powered-by"); //Reduce fingerprinting



server.use('/:url', async (req, res) => {
    try {

        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        // User-Agent 
        const userAgent = req.headers['user-agent'];

        // Referer
        const referer = req.headers['referer'];

        // Language
        const language = req.headers['accept-language'];

        // 
        const accept = req.headers['accept'];


        const target = req.params.url;


        if (target.includes('.') || req.originalUrl.includes('.')) {
            return res.status(302).redirect('https://shorterurl123.duckdns.org/?info=no_url')
        }

        const url = await prisma.url.findUnique({
            where: {
                new_url: target
            }
        })

        const now = Number(new Date());

        if (!url || (url.once && url.viewer > 0) || (url.time > 0 && (now - Number(url.createdAt)) / 1000 / 6 > url.time)) {
            return res.status(302).redirect('https://shorterurl123.duckdns.org/?info=no_url');
        }


        const red = await prisma.click.create({
            data: {
                new_url: target,
                ip: String(ip),
                user_agent: userAgent,
                referer: referer || '',
                language,
                accept,
            }
        })


        await prisma.url.update({
            where: {
                new_url: target
            },
            data: {
                viewer: url.viewer + 1
            }
        })


        return res.status(302).redirect(\`${url.real_url}\`)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Internal server error.' })
    }
})


server.use((req, res) => {
    try {

        return res.status(302).redirect('https://shorterurl123.duckdns.org/?info=no_url')

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Internal server error.' })
    }
})

server.listen(PORT || 3000, () => {
    console.log('server is running on ' + PORT)
})
`

const gateway = `
import express, { urlencoded } from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { FRONTEND_PORT, API_PORT, REDIRECT_PORT, PORT } from './dotenv';
import { rateLimit } from 'express-rate-limit'
import helmet from "helmet";
import cors from "cors";


const app = express();


app.use(helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      "default-src": ["'self'"],
      "script-src": ["'self'", "https://cdn.jsdelivr.net"],
      "style-src": ["'self'", "https://cdn.jsdelivr.net", "'unsafe-inline'"],
      "img-src": ["'self'", "data:"],
      "connect-src": ["'self'"],
      "font-src": ["'self'", "https://cdn.jsdelivr.net"],
      "media-src": ["'self'", "data:"],
    },
  },
}
));


app.use(cors({
  origin: "http://localhost:443",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true
}));

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100,
  message: "Too many request. Please try again later."
});


app.use(limiter);


// User API
app.use('/api', createProxyMiddleware({
  target: \`http://api:${API_PORT}\`,
  changeOrigin: true,
  onError: (err, req, res) => {
    console.error("Proxy error:", err);
    res.status(500).send("Proxy error");
  }
}));

//Frontend
app.use('/', createProxyMiddleware({
  target: \`http://pages:${FRONTEND_PORT}\`,
  changeOrigin: true,
  onError: (err, req, res) => {
    console.error("Proxy error:", err);
    res.status(500).send("Proxy error");
  }
}));


app.listen(PORT, () => console.log(\`Gateway running on http://localhost:${PORT}\`));
`

try {
    writeFileSync("../docker-compose.yml",docker);
    writeFileSync("../backend/pages/Dockerfile", pageDocker)
    writeFileSync("../backend/redirect/src/index.ts", redirect)
    writeFileSync('../gateway/src/gateway.ts', gateway)
    unlinkSync("../backend/redirect/src/config/config.ts")
    unlinkSync("../backend/redirect/src/controllers/controllers.ts")
    unlinkSync("../backend/redirect/src/routes/routers.ts")
    unlinkSync("../backend/redirect/Dockerfile")
} catch (error) {
    console.log(error)
}
