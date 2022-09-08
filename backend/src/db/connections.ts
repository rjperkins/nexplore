import { Pool } from 'pg';
import Config from '../lib/Config';

export const pool = new Pool({
  host: Config.host,
  user: Config.user,
  database: Config.database,
  password: Config.dbPassword,
  port: Config.dbPort,
});

const execute = async (query: string) => {
  try {
    await pool.connect();
    await pool.query(query);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// const deleteTableQuery = `DROP TABLE IF EXISTS duty`;

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS "duty" (
      "Id" VARCHAR(100),
      "Name" VARCHAR(100) NOT NULL,
      PRIMARY KEY ("Id")
    );`;

execute(createTableQuery)
  .then((result) => {
    if (result) {
      console.log('Table created');
    }
  })
  .catch((error) => {
    console.error(error);
  });
