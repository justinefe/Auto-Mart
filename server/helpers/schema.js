import joi from 'joi';

const schema = {
  signup: joi.object().keys({
    firstName: joi.string().min(3).max(14).required(),
    lastName: joi.string().min(3).max(14).required(),
    email: joi.string().email().required(),
    password: joi.string().alphanum().min(6).max(8)
      .required(),
    address: joi.string().required(),
  }),
  signin: joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().alphanum().min(6).max(8)
      .required(),
  }),
  postAd: joi.object().keys({
    manufacturer: joi.string().required(),
    state: joi.string().required(),
    model: joi.string().required(),
    price: joi.number().required(),
    body_type: joi.string().required(),
    image_url: joi.string().required(),
  }),
  purchaseOrder: joi.object().keys({
    priceOffered: joi.number().required(),
  }),
  updateOrderPrice: joi.object().keys({
    newPriceOffered: joi.number().required(),
  }),
  updateAd: joi.object().keys({
    newPrice: joi.number().required(),
  }),
  viewACar: joi.object().keys({
    carId: joi.number().required(),
  }),
};

export default schema;
