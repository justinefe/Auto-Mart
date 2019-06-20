import { verifyToken } from '../helpers/token';
import pool from '../config/config';


const isAuthenthicated = async (req, res, next) => {
  const { token } = req.headers;
  const { id } = verifyToken(token);
  try {
    if (id) {
      const checkUser = await pool.query('SELECT * from users where id = $1', [id]);
      if (!checkUser.rows[0]) {
        return res.status(401).json({
          status: 401,
          error: 'Unauthorised User',
        });
      }
      req.user = { id, email: checkUser.rows[0].email, isAdmin: checkUser.rows[0].isAdmin };
      return next();
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: 'Internal server error',
    });
  }
  return res.status(403).json({
    status: 403,
    error: 'Unauthorized',
  });
};

export default isAuthenthicated;
