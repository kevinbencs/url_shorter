import express, {urlencoded} from 'express';
import { PORT } from './config/config.ts';
import router from './routes/routers.ts';
import * as path from 'path'
import { fileURLToPath } from 'url'
import cookieParser from 'cookie-parser'
import { SECRET_COOKIE } from './config/config.ts';
import { authenticateToken } from './middleware/authDashboard.ts';


const server = express();
server.use(express.json({
    type: ['application/json', 'text/plain']
}));
const __dirname = path.dirname(fileURLToPath(import.meta.url));


server.use(cookieParser(SECRET_COOKIE))

server.use(urlencoded({ extended: false }));
server.disable("x-powered-by"); 
server.use('/dashboard', authenticateToken);
server.use('/dashboard',express.static(path.join(__dirname, '../frontend/dashboard/dist')));
server.use(express.static(path.join(__dirname, '../frontend')));
server.use(router)


server.listen(PORT || 3003,() => {
    console.log('server is running on '+PORT)
})