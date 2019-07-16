import { verifyToken } from '../helpers/token';
import pool from '../config/config';


const isAuthenthicated = async (req, res, next) => {
  const { token } = req.headers;
  const { id } = verifyToken(token);
  if (id) {
    const checkUser = await pool.query('SELECT * from users where id = $1', [id]);
    if (!checkUser) {
      return res.status(401).json({
        status: 401,
        error: 'Unauthorised User',
      });
    }
    req.user = { id, email: checkUser.rows[0].email, is_admin: checkUser.rows[0].is_admin };
    return next();
  }
  return res.status(401).json({
    status: 401,
    error: 'Unauthorized',
  });
};
const isAdministrator = (req, res, next) => {
  const { is_admin } = req.user;
  if (!is_admin) {
    return res.status(401).json({
      status: 401,
      error: 'Unauthorized route',
    });
  }
  return next();
};

const isUser = (req, res, next) => {
  const { is_admin } = req.user;
  if (is_admin) {
    return res.status(401).json({
      status: 401,
      error: 'Unauthorized route',
    });
  }
  return next();
};
export default { isAuthenthicated, isAdministrator, isUser };
