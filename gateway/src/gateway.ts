import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { FRONTEND_PORT, API_PORT, REDIRECT_PORT, PORT } from './dotenv';
import { rateLimit } from 'express-rate-limit'


const app = express();
app.set('trust proxy', true);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,                  
  message: "Too many request. Please try again later (15 min)."
});


app.use(limiter);

// Redirect
app.use(/^\/r\/.*/, createProxyMiddleware({
  target: `http://redirect:${REDIRECT_PORT}`,
  changeOrigin: true
}));

// User API: http://localhost:3001/api
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