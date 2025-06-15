import * as dotenv from 'dotenv'

dotenv.config();

const {PORT, DATABASE_PORT, DATABASE_NAME, DATABASE_PASSWORD, SECRET} = process.env;

export {PORT, DATABASE_PORT, DATABASE_NAME, DATABASE_PASSWORD, SECRET};