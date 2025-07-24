import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { FRONTEND_PORT, API_PORT, REDIRECT_PORT, PORT } from './dotenv';


const app = express();
app.set('trust proxy', true);

// Redirect service: pl. http://localhost:3002/abc123
app.use(/^\/(?!api|dashboard|signin|signup|search).*/, createProxyMiddleware({
  target: `http://redirect:${REDIRECT_PORT}`,
  changeOrigin: true
}));

// User API: http://localhost:3001/api
app.use('/api', createProxyMiddleware({
  target: `http://user:${API_PORT}`,
  changeOrigin: true,
  
}));

// Frontend: http://localhost:3003
app.use(['/dashboard','/signin', '/signup', '/search'], createProxyMiddleware({
  target: `http://dashboard:${FRONTEND_PORT}`,
  changeOrigin: true,
  pathRewrite:{
    '^/signin': '/signin',
    '^/signup': '/signup',
    '^/search': '/search',
    '^/dashboard': '/dashboard'
  }
}));

app.listen(PORT, () => console.log(`Gateway running on http://localhost:${PORT}`));