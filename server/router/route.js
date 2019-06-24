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
route.post('/car', auth, validator.postAd, carController.postAd);
route.post('/order/:carId', auth, validator.purchaseOrder, orderController.purchaseOrder);
route.patch('/order/:orderId/price', auth, validator.updateOrderPrice, orderController.updateOrderPrice);
route.patch('/car/:carId/status', auth, carController.updateCarStatus);
route.patch('/car/:carId/price', auth, validator.updateAd, carController.updateAd);


export default route;
