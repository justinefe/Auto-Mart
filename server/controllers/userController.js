import { hash, unhash } from '../helpers/passwordHash';
import { token } from '../helpers/token';
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
      id, firstName, lastName, email, hashPassword, role: 'user',
    };

    users.push(newUser);

    return res.status(201).json({
      status: 201,
      data: {
        token: token({ id }), id, firstName, lastName, email,
      },
    });
  }

  static signin(req, res) {
    const {
      email, password,
    } = req.body;
    const checkUser = users.find(user => user.email === email);
    if (checkUser) {
      const passwordState = unhash(password, checkUser.hashPassword);
      if (passwordState) {
        return res.status(200).json({
          status: 200,
          data: {
            token: token({ id: checkUser.id }),
            id: checkUser.id,
            firstName: checkUser.firstName,
            lastName: checkUser.lastName,
            email: checkUser.email,
          },
        });
      }
    }
    return res.status(400).json({
      status: 400,
      error: 'Email or password is incorrect',
    });
  }
}

export default userController;
