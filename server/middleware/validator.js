import joi from 'joi';
import schema from '../helpers/schema';

class Validator {
  static signup(req, res, next) {
    // const { firstName,lastName, email, password } = req.body;
    joi.validate(req.body, schema.signup, (err) => {
      if (err) {
        return res.status(400).json({
          status: 400,
          error: err.details[0].message,
        });
      }
      return true;
    });
    return next();
  }
}

export default Validator;
