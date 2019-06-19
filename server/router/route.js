import express from 'express';
import validator from '../middleware/validator';
import userController from '../controllers/userController';
import autoController from '../controllers/autoController';

const route = express();
route.get('/', autoController.welcome);
route.post('/auth/signup', validator.signup, userController.signup);
route.post('/auth/signin', validator.signin, userController.signin);

export default route;
