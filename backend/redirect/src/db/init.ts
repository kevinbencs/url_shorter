// init.ts
import pool from './db';

const init = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS "user" (
      email TEXT PRIMARY KEY,
      password TEXT NOT NULL,
      name TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS url (
      new_url TEXT PRIMARY KEY,
      real_url TEXT NOT NULL,
      private BOOLEAN DEFAULT false,
      viewer INTEGER DEFAULT 0
    );
  `);

  console.log("Tables are created");
  await pool.end();
};

init();