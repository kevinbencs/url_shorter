import { writeFileSync } from 'fs';


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
      - REDIRECT_PORT=3002
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


  redirect:
    build: 
      context: ./backend/redirect
    command: "npm run start"
    expose:
      - "3002"
    mem_limit: 100m
    cpus: 0.5
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - PORT=3002

  
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



try {
    writeFileSync("../docker-compose.yml",docker);
    writeFileSync("../backend/pages/Dockerfile", pageDocker)
} catch (error) {
    console.log(error)
}