import pool from '../config/config';

const userTable = ` CREATE TABLE IF NOT EXISTS users(
    id serial PRIMARY KEY,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text unique NOT NULL,
    hash_password text NOT NULL,
    address text NOT NULL,
    is_admin boolean NOT NULL
);
`;
const carTable = `CREATE TABLE IF NOT EXISTS cars(
  id serial PRIMARY KEY,
  owner integer NOT NULL,
  created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  state text NOT NULL,
  status text NOT NULL,
  price float,
  manufacturer text NOT NULL,
  model text NOT NULL,
  body_type text NOT NULL,
  image_url VARCHAR 
);
`;
const orderTable = `CREATE TABLE IF NOT EXISTS orders(
  id serial PRIMARY KEY,
  buyer integer NOT NULL,
  car_id integer NOT NULL,
  created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  price float NOT NULL,
  price_offered float NOT NULL,
  status text NOT NULL
);
`;
const createTable = async () => {
  const create = `${userTable}${carTable}${orderTable}`;
  const user1 = {
    text: `INSERT INTO users (first_name, last_name, email, hash_password, address, is_admin)
      VALUES($1, $2, $3, $4, $5, $6)`,
    values: ['Justin', 'Igugu', 'efejustin3@gmail.com', '$2a$06$IA8bQ5ZzEr4OJmXdL1Hz8O1ZLE7dinSSRFo0.poDt0.DsJUP7tmi6', '15 omo avenue', true],
  };

  const user2 = {
    text: `INSERT INTO users (first_name, last_name, email, hash_password, address, is_admin)
      VALUES($1, $2, $3, $4, $5, $6)`,
    values: ['Nonso', 'Amos', 'fejude3@gmail.com', '$2a$06$IA8bQ5ZzEr4OJmXdL1Hz8O1ZLE7dinSSRFo0.poDt0.DsJUP7tmi6', '15 uloho avenue', false],
  };

  const user3 = {
    text: `INSERT INTO users (first_name, last_name, email, hash_password, address, is_admin)
      VALUES($1, $2, $3, $4, $5, $6)`,
    values: ['Kanayo', 'Aass', 'fejude3@rocketmail.com', '$2a$06$IA8bQ5ZzEr4OJmXdL1Hz8O1ZLE7dinSSRFo0.poDt0.DsJUP7tmi6', '15 airport road', false],
  };
  const car1 = {
    text: `INSERT INTO cars (owner, state, status, price, manufacturer, model, body_type, image_url)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)`,
    values: [1, 'new', 'available', '2000000', 'Toyota', 'pathfinder', 'car', 'wwwrfgyjmg'],
  };
  const car2 = {
    text: `INSERT INTO cars (owner, state, status, price, manufacturer, model, body_type, image_url)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)`,
    values: [2, 'new', 'available', '2500000', 'Toyota', 'hilux', 'truck', 'jhfjgf'],
  };

  const car3 = {
    text: `INSERT INTO cars (owner, state, status, price, manufacturer, model, body_type, image_url)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)`,
    values: [3, 'new', 'available', '2000000', 'Toyota', 'pathfinder', 'car', 'hgfhgf'],
  };

  const car4 = {
    text: `INSERT INTO cars (owner, state, status, price, manufacturer, model, body_type, image_url)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)`,
    values: [4, 'new', 'available', '5000000', 'Toyota', 'hilux', 'truck', 'yfjffgh'],
  };

  const car5 = {
    text: `INSERT INTO cars (owner, state, status, price, manufacturer, model, body_type, image_url)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)`,
    values: [2, 'new', 'sold', '5000000', 'Toyota', 'pathfinder', 'car', 'fjhkjjjjjjjh'],
  };

  const car6 = {
    text: `INSERT INTO cars (owner, state, status, price, manufacturer, model, body_type, image_url)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)`,
    values: [2, 'used', 'sold', '4000000', 'Toyota', '530', 'SUV', 'fjhkjjjjjjjh'],
  };

  const order1 = {
    text: `INSERT INTO orders (buyer, car_id, price, price_offered, status)
      VALUES($1, $2, $3, $4, $5)`,
    values: ['2', '1', '600000.58', '600000.23', 'pending'],
  };
  const order2 = {
    text: `INSERT INTO orders (buyer, car_id, price, price_offered, status)
      VALUES($1, $2, $3, $4, $5)`,
    values: ['2', '2', '400000.58', '600000.23', 'pending'],
  };
  const order3 = {
    text: `INSERT INTO orders (buyer, car_id, price, price_offered, status)
      VALUES($1, $2, $3, $4, $5)`,
    values: ['2', '2', '400000.58', '600000.23', 'approved'],
  };

  const order4 = {
    text: `INSERT INTO orders (buyer, car_id, price, price_offered, status)
      VALUES($1, $2, $3, $4, $5)`,
    values: ['80', '2', '400000.58', '600000.23', 'approved'],
  };

  try {
    await pool.query(create);
    await pool.query(user1);
    await pool.query(user2);
    await pool.query(user3);
    await pool.query(car1);
    await pool.query(car2);
    await pool.query(car3);
    await pool.query(car4);
    await pool.query(car5);
    await pool.query(car6);
    await pool.query(order1);
    await pool.query(order2);
    await pool.query(order3);
    await pool.query(order4);

    console.log('Tables Successful created');
  } catch (error) {
    console.log(error);
  }
};

createTable();
