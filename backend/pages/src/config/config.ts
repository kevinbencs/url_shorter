import * as dotenv from 'dotenv'

dotenv.config();

const { SECRET, PORT, SECRET_COOKIE } = process.env;

export { SECRET, PORT, SECRET_COOKIE };