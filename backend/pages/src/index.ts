import express, {urlencoded} from 'express';
import { FRONTEND_PORT } from './config/config.ts';
import router from './routes/routers.ts';
import * as path from 'path'
import cors from 'cors'
import { fileURLToPath } from 'url'


const server = express();
server.use(express.json({
    type: ['application/json', 'text/plain']
}));
const __dirname = path.dirname(fileURLToPath(import.meta.url));
server.use(express.static(path.join(__dirname, '../public')));
server.use(cors());

server.use(urlencoded({ extended: false }));
server.disable("x-powered-by"); //Reduce fingerprinting
server.use(router)


server.listen(FRONTEND_PORT || 3000,() => {
    console.log('server is running on '+FRONTEND_PORT)
})