import express from 'express';
import autoController from '../controllers/autoController';
import validator from '../middleware/validator';
import userController from '../controllers/userController';

const route = express();

route.get('/', autoController.welcome);

route.post('/auth/signup', validator.signup, userController.signup);
route.post('/auth/signin', validator.signin, userController.signin);

export default route;
