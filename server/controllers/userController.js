import { hash } from '../helpers/passwordHash';
import token from '../helpers/token';
import users from '../model/user';

class userController {
  static signup(req, res) {
    const {
      firstName, lastName, email, password,
    } = req.body;

    const checkUser = users.some(user => user.email === email);

    if (checkUser) {
      return res.status(409).json({
        status: 409,
        error: 'User already exists',
      });
    }

    const hashPassword = hash(password);
    const id = users.length + 1;
    const newUser = {
      id, firstName, lastName, email, hashPassword,
    };

    users.push(newUser);

    return res.status(201).json({
      status: 201,
      data: {
        token: token({ id }), id, firstName, lastName, email,
      },
    });
  }
}

export default userController;
