import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.secret;
const token = payload => jwt.sign(payload, secretKey, {
  expiresIn: '1d',
});
export default token;
