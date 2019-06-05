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

  static postAd(req, res, next) {
    const {
      manufacturer, state, model, price,
    } = req.body;
    const newObject = {
      manufacturer, state, model, price,
    };
    joi.validate(newObject, schema.postAd, (err) => {
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

  static purchaseOrder(req, res, next) {
    const { priceOffered } = req.body;
    const obj = { priceOffered };
    joi.validate(obj, schema.purchaseOrder, (err) => {
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

  static updateOrder(req, res, next) {
    const { newPriceOffered } = req.body;
    const obj = { newPriceOffered };
    joi.validate(obj, schema.updateOrder, (err) => {
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

  static updateAd(req, res, next) {
    const { newPrice } = req.body;
    const obj = { newPrice };
    joi.validate(obj, schema.updateAd, (err) => {
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
