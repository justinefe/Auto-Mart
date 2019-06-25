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

  static postAd(req, res, next) {
    const {
      manufacturer, state, model, price, body_type, image_url,
    } = req.body;
    const newObject = {
      manufacturer, state, model, price, body_type, image_url,
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

  static updateOrderPrice(req, res, next) {
    const { newPriceOffered } = req.body;
    const obj = { newPriceOffered };
    joi.validate(obj, schema.updateOrderPrice, (err) => {
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

  static viewACar(req, res, next) {
    const { carId } = req.params;
    const obj = { carId };
    joi.validate(obj, schema.viewACar, (err) => {
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

  static viewCars(req, res, next) {
    const { status, minPrice, maxPrice } = req.query;
    const obj = { status, minPrice, maxPrice };
    const { isAdmin } = req.user;
    if (isAdmin === false) {
      joi.validate(obj, schema.viewCars, (err) => {
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
    return next();
  }
}

export default Validator;
