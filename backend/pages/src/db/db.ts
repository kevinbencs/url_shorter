// db.ts
import { Pool } from 'pg';
import { DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT } from '../config/config.ts';

const pool = new Pool({
  user: 'user',
  host: 'postgres', // Ez megegyezik a docker-compose service nevével
  database: DATABASE_NAME,
  password: DATABASE_PASSWORD,
  port: Number(DATABASE_PORT),
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

export default pool;
