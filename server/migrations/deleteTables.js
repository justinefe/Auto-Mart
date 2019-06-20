import pool from '../config/config';

async function deleteTable() {
  try {
    await pool.query('DROP TABLE users');
    await pool.query('DROP TABLE cars');
    console.log('Tables Successful deleted');
  } catch (error) {
    console.log('Error deleting Tables');
  }
}

deleteTable();
