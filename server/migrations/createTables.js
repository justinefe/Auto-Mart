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
const carTable = `CREATE TABLE IF NOT EXISTS cars(
  id serial PRIMARY KEY,
  email text NOT NULL,
  created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  state text NOT NULL,
  status text NOT NULL,
  price float,
  manufacturer text NOT NULL,
  model text NOT NULL,
  bodytype text NOT NULL 
);
`;

const createTable = async () => {
  const create = `${userTable}${carTable}`;
  const user = {
    text: `INSERT INTO users (firstname, lastname, email, hashpassword, address, isadmin)
      VALUES($1, $2, $3, $4, $5, $6)`,
    values: ['amos', 'oruaroghene', 'amos@gmail.com', 'gghjhghj5765656', '5674 gggggg', false],
  };

  const admin = {
    text: `INSERT INTO users (firstname, lastname, email, hashpassword, address, isadmin)
      VALUES($1, $2, $3, $4, $5, $6)`,
    values: ['Justin', 'Igugu', 'efejustin3@gmail.com', '$2a$06$IA8bQ5ZzEr4OJmXdL1Hz8O1ZLE7dinSSRFo0.poDt0.DsJUP7tmi6', '15 omo avenue', true],
  };
  const car = {
    text: `INSERT INTO cars (email, state, status, price, manufacturer, model, bodytype)
      VALUES($1, $2, $3, $4, $5, $6, $7)`,
    values: ['email@email.com', 'new', 'available', '2000000', 'Toyota', 'pathfinder', 'car'],
  };

  try {
    await pool.query(create);
    await pool.query(admin);
    await pool.query(user);
    await pool.query(car);
    console.log('Tables Successful created');
  } catch (error) {
    console.log(error);
  }
};

createTable();
