import { verifyToken } from '../helpers/token';
import users from '../model/user';


const isAuthenthicated = (req, res, next) => {
  const { token } = req.headers;
  const { id } = verifyToken(token);
  if (id) {
    const checkUser = users.find(user => user.id === id);
    if (!checkUser) {
      return res.status(401).json({
        status: 401,
        error: 'Unauthorised User',
      });
    }
    req.user = { id, email: checkUser.email, isAdmin: checkUser.isAdmin };
    return next();
  }
  return res.status(403).json({
    status: 403,
    error: 'Unauthorizedhjklkl',
  });
};

const isAdministrator = (req, res, next) => {
  const { isAdmin } = req.user;
  if (isAdmin === false) {
    return res.status(403).json({
      status: 403,
      error: 'Unauthorized route',
    });
  }
  return next();
};

export default { isAuthenthicated, isAdministrator };
