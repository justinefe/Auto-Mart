import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.secret;
const token = payload => jwt.sign(payload, secretKey, {
  expiresIn: '1d',
});

const verifyToken = tokenString => jwt.verify(tokenString, secretKey, (err, data) => {
  if (err) return false;
  return (data);
});

export { token, verifyToken };
