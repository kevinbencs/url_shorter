import * as dotenv from 'dotenv';

dotenv.config();


const {REDIRECT_PORT, API_PORT, FRONTEND_PORT, PORT } = process.env;

export {API_PORT, FRONTEND_PORT, REDIRECT_PORT, PORT}