import express from 'express';
import autoController from '../controllers/autoController';
import carController from '../controllers/carController';
import validator from '../middleware/validator';
import auth from '../middleware/authenthication';
import userController from '../controllers/userController';

const route = express();

route.get('/', autoController.welcome);

route.post('/auth/signup', validator.signup, userController.signup);
route.post('/auth/signin', validator.signin, userController.signin);
route.post('/car', auth.isAuthenthicated, validator.postAd, carController.postAd);

export default route;
