import express from 'express';
import validator from '../middleware/validator';
import userController from '../controllers/userController';
import auth from '../middleware/authenthication';
import carController from '../controllers/carController';
import autoController from '../controllers/autoController';

const route = express();
route.get('/', autoController.welcome);
route.post('/auth/signup', validator.signup, userController.signup);
route.post('/auth/signin', validator.signin, userController.signin);
route.post('/car', auth, validator.postAd, carController.postAd);

export default route;
