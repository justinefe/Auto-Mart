import joi from 'joi';
import schema from '../helpers/schema';

class Validator {
  static signup(req, res, next) {
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

  static signin(req, res, next) {
    const validate = joi.validate(req.body, schema.signin, (err) => {
      if (err) {
        return err;
      }
      return true;
    });
    if (validate !== true) {
      return res.status(400).json({
        status: 400,
        error: validate.details[0].message,
      });
    }
    return next();
  }
}

export default Validator;
