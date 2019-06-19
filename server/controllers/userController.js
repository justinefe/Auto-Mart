import hash from '../helpers/passwordHash';
import token from '../helpers/token';
import pool from '../config/config';

class userController {
  static async signup(req, res) {
    const {
      firstName, lastName, address, email, password,
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

      const isAdmin = false;
      const hashPassword = hash.hash(password);
      newUser = {
        firstName, lastName, email, address, hashPassword, isAdmin,
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
        token: token.token({ id }), id, firstName, lastName, email,
      },
    });
  }
}

export default userController;
