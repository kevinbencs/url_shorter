import express from 'express';
import path from 'path';
import { fileURLToPath } from "url";
import { PORT } from './src/config/config';


const __dirname = path.dirname(fileURLToPath(import.meta.url));

const server = express();

server.listen(PORT || 3000,() => {
    console.log('server is running')
})