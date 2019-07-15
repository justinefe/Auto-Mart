import { hash, unhash } from '../helpers/passwordHash';
import { token } from '../helpers/token';
import pool from '../config/config';

class userController {
  static async signup(req, res) {
    const {
      first_name, last_name, address, email, password,
    } = req.body;
    let newUser;
    try {
      const checkUser = await pool.query('SELECT* from users where email = $1', [email]);
      if (checkUser.rows[0]) {
        return res.status(409).json({
          status: 409,
          error: 'User already exists',
        });
      }

      const is_admin = false;
      const hash_password = hash(password);
      newUser = {
        first_name, last_name, email, address, hash_password, is_admin,
      };
      const keys = Object.keys(newUser);
      const values = Object.values(newUser);
      const insert = {
        text: `INSERT into users (${[...keys]}) values ($1, $2, $3, $4, $5, $6) returning id`, values,
      };

      newUser = await pool.query(insert);
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Internal server error',
      });
    }
    const { id } = newUser.rows[0];
    return res.status(201).json({
      status: 201,
      data: {
        token: token({ id }), id, first_name, last_name, email,
      },
    });
  }

  static async signin(req, res) {
    const {
      email, password,
    } = req.body;
    try {
      const checkUser = await pool.query('SELECT * from users where email = $1', [email]);
      if (checkUser.rows[0]) {
        const passwordState = unhash(password, checkUser.rows[0].hash_password);
        if (passwordState) {
          return res.status(200).json({
            status: 200,
            data: {
              token: token({ id: checkUser.rows[0].id }),
              id: checkUser.rows[0].id,
              first_name: checkUser.rows[0].first_name,
              last_name: checkUser.rows[0].last_name,
              email: checkUser.rows[0].email,
            },
          });
        }
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Internal server error',
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'Account Not Found',
    });
  }
}

export default userController;
