import * as dotenv from 'dotenv'

dotenv.config();

const {API_PORT, DATABASE_PORT, DATABASE_NAME, DATABASE_PASSWORD, SECRET} = process.env;

export {API_PORT, DATABASE_PORT, DATABASE_NAME, DATABASE_PASSWORD, SECRET};