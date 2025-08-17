import * as dotenv from 'dotenv'

dotenv.config();

const {PORT,  SECRET, SECRET_COOKIE, } = process.env;

export {PORT, SECRET, SECRET_COOKIE, };