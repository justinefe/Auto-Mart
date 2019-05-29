import joi from 'joi';

const schema = {
  signup: joi.object().keys({
    firstName: joi.string().min(3).max(14).required(),
    lastName: joi.string().min(3).max(14).required(),
    email: joi.string().email(),
    password: joi.string().alphanum().min(6).max(8)
      .required(),
  }),
};

export default schema;
