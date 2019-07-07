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
    req.user = { id, email: checkUser.rows[0].email, isAdmin: checkUser.rows[0].isadmin };
    return next();
  }
  return res.status(401).json({
    status: 401,
    error: 'Unauthorized',
  });
};
const isAdministrator = (req, res, next) => {
  const { isAdmin } = req.user;
  if (!isAdmin) {
    return res.status(401).json({
      status: 401,
      error: 'Unauthorized route',
    });
  }
  return next();
};

const isUser = (req, res, next) => {
  const { isAdmin } = req.user;
  if (isAdmin) {
    return res.status(401).json({
      status: 401,
      error: 'Unauthorized route',
    });
  }
  return next();
};
export default { isAuthenthicated, isAdministrator, isUser };
