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
}

export default Validator;
