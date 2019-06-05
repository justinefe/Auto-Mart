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
    req.user = { id, email: checkUser.email, role: checkUser.role };
    return next();
  }
  return res.status(403).json({
    status: 403,
    error: 'Unauthorized',
  });
};

// const isUser = (req, res, next) => {
//   const { role } = req.user;
//   if (role !== 'user') {
//     return res.status(403).json({
//       status: 403,
//       error: 'unauthorized route',
//     });
//   }
//   return next();
// };
// //   isAdmin: async (req, res, next) => {
//     const { role } = req.user;
//     if (role !== 'admin') {
//       return res.status(403).json({
//         status: 403,
//         error: 'unauthorized route',
//       });
//     }
//     return next();
//   };

export default { isAuthenthicated };
