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


// Redirect
app.use('/r', createProxyMiddleware({
  target: `http://redirect:${REDIRECT_PORT}`,
  changeOrigin: true,
  onError: (err, req, res) => {
    console.error("Proxy error:", err);
    res.status(500).send("Proxy error");
  }
}));

// User API
app.use('/api', createProxyMiddleware({
  target: `http://api:${API_PORT}`,
  changeOrigin: true,
  onError: (err, req, res) => {
    console.error("Proxy error:", err);
    res.status(500).send("Proxy error");
  }
}));

//Frontend
app.use('/', createProxyMiddleware({
  target: `http://pages:${FRONTEND_PORT}`,
  changeOrigin: true,
  onError: (err, req, res) => {
    console.error("Proxy error:", err);
    res.status(500).send("Proxy error");
  }
}));




app.listen(PORT, () => console.log(`Gateway running on http://localhost:${PORT}`));