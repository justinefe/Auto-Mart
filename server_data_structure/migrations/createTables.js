import pool from '../config/config';

const userTable = ` CREATE TABLE IF NOT EXISTS users(
    id serial PRIMARY KEY,
    firstname text NOT NULL,
    lastname text NOT NULL,
    email text NOT NULL,
    hashpassword text NOT NULL,
    address text NOT NULL,
    isAdmin text NOT NULL
);
`;

async function create() {
  const createTable = `${userTable}`;
  const admin = {
    text: `INSERT INTO users (firstname, lastname, email, hashpassword, address, isadmin)
      VALUES($1, $2, $3, $4, $5, $6)`,
    values: ['Justin', 'Igugu', 'efejustin3@gmail.com', '$2a$06$IA8bQ5ZzEr4OJmXdL1Hz8O1ZLE7dinSSRFo0.poDt0.DsJUP7tmi6', '15 omo avenue', true],
  };
  try {
    await pool.query(createTable);
    await pool.query(admin);
    console.log('Tables Successful created');
  } catch (error) {
    console.log(error);
  }
}

create();
