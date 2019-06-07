import { verifyToken } from '../helpers/token';
import users from '../model/user';


const authenticateAdmin = (req, res, next) => {
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
    if (checkUser.isAdmin) {
      return next();
    }
    return res.status(403).json({
      status: 403,
      message: 'authorized access, please login as admin',
    });
  }
  return res.status(403).json({
    status: 403,
    error: 'Unauthorized',
  });
};
export default authenticateAdmin;
