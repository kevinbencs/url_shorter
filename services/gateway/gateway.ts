import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'


const app = express();
app.set('trust proxy', true);

// Redirect service: pl. http://localhost:5000/abc123
app.use(/^\/(?!api|dashboard|signin|signup|search).*/, createProxyMiddleware({
  target: 'http://redirect:5001',
  changeOrigin: true
}));

// User API: http://localhost:5000/api/users/login
app.use(['/api', '/signin', '/signup', '/search'], createProxyMiddleware({
  target: 'http://user:5002',
  changeOrigin: true,
  pathRewrite:{
    '^/signin': '/signin',
    '^/signup': '/signup',
    '^/search': '/search'
  }
}));

// Frontend: http://localhost:5000/dashboard
app.use('/dashboard', createProxyMiddleware({
  target: 'http://dashboard:5003',
  changeOrigin: true
}));

app.listen(5000, () => console.log('Gateway running on http://localhost:5000'));