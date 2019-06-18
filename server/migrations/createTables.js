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
  const user = {
    text: `INSERT INTO users (firstname, lastname, email, hashpassword, address, isadmin)
      VALUES($1, $2, $3, $4, $5, $6)`,
    values: ['amos', 'oruaroghene', 'amos@gmail.com', 'gghjhghj5765656', '5674 gggggg', false],
  };

  try {
    await pool.query(createTable);
    await pool.query(user);
    console.log('Tables Successful created');
  } catch (error) {
    console.log(error);
  }
}

create();