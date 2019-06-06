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
route.post('/order/:carId', auth.isAuthenthicated, validator.purchaseOrder, carController.purchaseOrder);
route.patch('/order/:orderId/price', auth.isAuthenthicated, validator.updateOrder, carController.updateOrder);
route.patch('/car/:carId/status', auth.isAuthenthicated, carController.updateStatus);
route.patch('/car/:carId/price', auth.isAuthenthicated, validator.updateAd, carController.updateAd);
route.get('/car/:carId', auth.isAuthenthicated, validator.viewACar, carController.viewACar);
export default route;
