import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { FRONTEND_PORT, API_PORT, REDIRECT_PORT, PORT } from './dotenv';
import { rateLimit } from 'express-rate-limit'
import helmet from "helmet";
import cors from "cors";



const app = express();
app.set('trust proxy', true);

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

app.use(express.json({ limit: "1mb" }));

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many request. Please try again later (15 min)."
});


app.use(limiter);

// Redirect
app.use('/r', createProxyMiddleware({
  target: `http://redirect:${REDIRECT_PORT}`,
  changeOrigin: true
}));

// User API
app.use('/api', createProxyMiddleware({
  target: `http://api:${API_PORT}`,
  changeOrigin: true,

}));

//Frontend
app.use('/', createProxyMiddleware({
  target: `http://pages:${FRONTEND_PORT}`,
  changeOrigin: true
}));




app.listen(PORT, () => console.log(`Gateway running on http://localhost:${PORT}`));