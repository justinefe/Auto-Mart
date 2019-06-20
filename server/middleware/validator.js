import joi from 'joi';
import schema from '../helpers/schema';

class Validator {
  static signup(req, res, next) {
    const isError = joi.validate(req.body, schema.signup, (err) => {
      if (err) { return err; }
    });
    if (isError) {
      return res.status(400).json({
        status: 400,
        error: isError.details[0].message,
      });
    }
    return next();
  }

  static signin(req, res, next) {
    joi.validate(req.body, schema.signin, (err) => {
      if (err) {
        const error = err.details[0].message;
        return res.status(400).json({
          status: 400,
          error: error.replace(/"/gi, ''),
        });
      }
      return next();
    });
  }
}

export default Validator;
