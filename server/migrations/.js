const user = {
    text: `INSERT INTO users (firstname, lastname, email, hashpassword, address, isadmin)
      VALUES($1, $2, $3, $4, $5, $6)`,
    values: ['Justin', 'Igugu', 'efejustin3@gmail.com', '$2a$06$IA8bQ5ZzEr4OJmXdL1Hz8O1ZLE7dinSSRFo0.poDt0.DsJUP7tmi6', '15 omo avenue', true],
  };
  const man = {
    text: `INSERT INTO users (firstname, lastname, email, hashpassword, address, isadmin)
  VALUES($1, $2, $3, $4, $5, $6)`,
    values: ['Nonso', 'Amos', 'fejude3@gmail.com', '$2a$06$IA8bQ5ZzEr4OJmXdL1Hz8O1ZLE7dinSSRFo0.poDt0.DsJUP7tmi6', '15 uloho avenue', false],
  };
  const woman = {
    text: `INSERT INTO users (firstname, lastname, email, hashpassword, address, isadmin)
  VALUES($1, $2, $3, $4, $5, $6)`,
    values: ['Kanayo', 'Aass', 'fejude3@rocketmail.com', '$2a$06$IA8bQ5ZzEr4OJmXdL1Hz8O1ZLE7dinSSRFo0.poDt0.DsJUP7tmi6', '15 airport road', false],
  };
  // const admin = {
  //   text: `INSERT INTO users (firstname, lastname, email, hashpassword, address, isadmin)
  //     VALUES($1, $2, $3, $4, $5, $6)`,
  //   values: ['Justin', 'Igugu', 'efejustin3@gmail.com', '$2a$06$IA8bQ5ZzEr4OJmXdL1Hz8O1ZLE7dinSSRFo0.poDt0.DsJUP7tmi6', '15 omo avenue', true],
  // };
  const benz = {
    text: `INSERT INTO cars (owner, state, status, price, manufacturer, model, bodytype, image_url)
      VALUES($1, $2, $3, $4, $5, $6, $7)`,
    values: ['1', 'new', 'available', '2000000', 'Toyota', 'pathfinder', 'car', 'wwwrfgyjmg'],
  };
  const toyo = {
    text: `INSERT INTO cars (owner, state, status, price, manufacturer, model, bodytype, image_url)
      VALUES($1, $2, $3, $4, $5, $6, $7)`,
    values: ['2', 'new', 'available', '2500000', 'Toyota', 'hilux', 'truck', 'jhfjgf'],
  };
  const pugo = {
    text: `INSERT INTO cars (owner, state, status, price, manufacturer, model, bodytype, image_url)
      VALUES($1, $2, $3, $4, $5, $6, $7)`,
    values: ['3', 'new', 'available', '2000000', 'Toyota', 'pathfinder', 'car', 'hgfhgf'],
  };
  const dd = {
    text: `INSERT INTO cars (owner, state, status, price, manufacturer, model, bodytype, image_url)
      VALUES($1, $2, $3, $4, $5, $6, $7)`,
    values: ['4', 'new', 'available', '5000000', 'Toyota', 'hilux', 'truck', 'yfjffgh'],
  };
  const yoyo = {
    text: `INSERT INTO cars (owner, state, status, price, manufacturer, model, bodytype, image_url)
      VALUES($1, $2, $3, $4, $5, $6, $7)`,
    values: ['2', 'new', 'sold', '5000000', 'Toyota', 'pathfinder', 'car', 'fjhkjjjjjjjh'],
  };

  const yos = {
    text: `INSERT INTO cars (owner, state, status, price, manufacturer, model, bodytype, image_url)
      VALUES($1, $2, $3, $4, $5, $6, $7)`,
    values: ['2', 'used', 'sold', '4000000', 'Toyota', '530', 'SUV', 'fjhkjjjjjjjh'],
  };

  const order = {
    text: `INSERT INTO orders (buyer, car_id, price, price_offered, status)
      VALUES($1, $2, $3, $4, $5)`,
    values: ['2', '1', '600000.58', '600000.23', 'pending'],
  };
  const ord = {
    text: `INSERT INTO orders (buyer, car_id, price, price_offered, status)
      VALUES($1, $2, $3, $4, $5)`,
    values: ['2', '2', '400000.58', '600000.23', 'pending'],
  };
  const orde = {
    text: `INSERT INTO orders (buyer, car_id, price, price_offered, status)
      VALUES($1, $2, $3, $4, $5)`,
    values: ['2', '2', '400000.58', '600000.23', 'approved'],
  };

  const or = {
    text: `INSERT INTO orders (buyer, car_id, price, price_offered, status)
      VALUES($1, $2, $3, $4, $5)`,
    values: ['80', '2', '400000.58', '600000.23', 'approved'],
  };
  try {
    await pool.query(create);
    await pool.query(man);
    await pool.query(woman);
    await pool.query(user);
    await pool.query(benz);
    await pool.query(yos);
    await pool.query(dd);
    await pool.query(yoyo);
    await pool.query(pugo);
    await pool.query(toyo);
    await pool.query(order);
    await pool.query(ord);
    await pool.query(orde);
    await pool.query(or);