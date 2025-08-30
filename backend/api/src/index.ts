import express, {urlencoded} from 'express';
import { PORT } from './config/config.ts';
import router from './routes/routers.ts';
import cookieParser from 'cookie-parser'
import { SECRET_COOKIE } from './config/config.ts';


const server = express();
server.use(express.json({
    type: ['application/json', 'text/plain'],
    limit: '1mb'
}));
server.use(cookieParser(SECRET_COOKIE))

server.use(urlencoded({ extended: true }));
server.disable("x-powered-by"); //Reduce fingerprinting

server.use(router)


server.listen(PORT || 3001,() => {
    console.log('server is running on '+PORT)
})