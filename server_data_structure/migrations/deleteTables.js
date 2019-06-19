import pool from '../config/config';

async function deleteTable() {
  try {
    await pool.query('DROP TABLE users');
    console.log('Tables Successful deleted');
  } catch (error) {
    console.log(error);
  }
}

deleteTable();
