import express from 'express';
import { PORT } from './config/config';
import router from './routes/routers';


const server = express();

server.use(router)

server.listen(PORT || 3000,() => {
    console.log('server is running on '+PORT)
})