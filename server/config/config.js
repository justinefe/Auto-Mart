import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionstring = {
  test: process.env.DB_TEST_URL,
  production: process.env.DB_CONNECTIONSTRING,
};

const env = process.env.NODE_ENV || 'production';

const pool = new Pool({
  connectionString: connectionstring[env],
});
export default pool;
