import express from 'express';
import validator from '../middleware/validator';
import userController from '../controllers/userController';
import auth from '../middleware/authenthication';
import carController from '../controllers/carController';
import orderController from '../controllers/orderController';
import autoController from '../controllers/autoController';

const route = express();
route.get('/', autoController.welcome);
route.post('/auth/signup', validator.signup, userController.signup);
route.post('/auth/signin', validator.signin, userController.signin);
route.post('/car', auth.isAuthenthicated, validator.postAd, carController.postAd);
route.post('/order/:carId', auth.isAuthenthicated, validator.purchaseOrder, orderController.purchaseOrder);
route.patch('/order/:orderId/price', auth.isAuthenthicated, validator.updateOrderPrice, orderController.updateOrderPrice);
route.patch('/car/:carId/status', auth.isAuthenthicated, carController.updateCarStatus);
route.patch('/car/:carId/price', auth.isAuthenthicated, validator.updateAd, carController.updateAd);
route.get('/car/:carId', auth.isAuthenthicated, validator.viewACar, carController.viewACar);
route.get('/car', auth.isAuthenthicated, validator.viewCars, carController.viewCars);
route.delete('/car/:carId', auth.isAuthenthicated, auth.isAdministrator, carController.adminDelete);


export default route;
