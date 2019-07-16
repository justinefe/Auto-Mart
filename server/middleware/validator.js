/* eslint-disable camelcase */
import joi from 'joi';
import schema from '../helpers/schema';

const validateJoi = (reqBody, resSchema) => {
  const error = joi.validate(reqBody, resSchema, (err) => {
    if (err) {
      let joiError = err.details[0].message;
      joiError = joiError.replace(/"/gi, '');
      return joiError;
    }
    return undefined;
  });
  return error;
};

class Validator {
  static signup(req, res, next) {
    console.log('sign up req.body>>>>>>', req.body);
    const error = validateJoi(req.body, schema.signup);
    if (error) {
      console.log('validation error', error);
      return res.status(400).json({
        status: 400,
        error,
      });
    }
    return next();
  }

  static signin(req, res, next) {
    const error = validateJoi(req.body, schema.signin);
    if (error) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }
    return next();
  }

  static postAd(req, res, next) {
    const {
      manufacturer, state, model, price, body_type, image_url,
    } = req.body;
    const newObject = {
      manufacturer, state, model, price, body_type, image_url,
    };
    const error = validateJoi(newObject, schema.postAd);
    if (error) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }
    return next();
  }

  static purchaseOrder(req, res, next) {
    const { price_offered } = req.body;
    const obj = { price_offered };
    const error = validateJoi(obj, schema.purchaseOrder);
    if (error) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }
    return next();
  }

  static updateOrderPrice(req, res, next) {
    const { new_price_offered } = req.body;
    const obj = { new_price_offered };
    const error = validateJoi(obj, schema.updateOrderPrice);
    if (error) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }
    return next();
  }

  static updateAd(req, res, next) {
    const { new_price } = req.body;
    const obj = { new_price };
    const error = validateJoi(obj, schema.updateAd);
    if (error) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }
    return next();
  }

  static viewACar(req, res, next) {
    const { car_id } = req.params;
    const obj = { car_id };
    const error = validateJoi(obj, schema.viewACar);
    if (error) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }
    return next();
  }

  static viewCars(req, res, next) {
    const { status, min_price, max_price } = req.query;
    const obj = { status, min_price, max_price };
    const error = validateJoi(obj, schema.viewCars);
    if (error) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }
    return next();
  }
}

export default Validator;
