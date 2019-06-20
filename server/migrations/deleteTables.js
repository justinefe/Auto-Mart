import pool from '../config/config';

async function deleteTable() {
  try {
    await pool.query('DROP TABLE users');
    await pool.query('DROP TABLE cars');
    await pool.query('DROP TABLE orders');
    console.log('Tables Successful deleted');
  } catch (error) {
    console.log(error);
    console.log('Error deleting Tables');
  }
}

deleteTable();
