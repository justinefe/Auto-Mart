import express from 'express';
import validator from '../middleware/validator';
import userController from '../controllers/userController';
import auth from '../middleware/authenthication';
import carController from '../controllers/carController';
import orderController from '../controllers/orderController';
import autoController from '../controllers/autoController';
import upload from '../config/cloudinaryConfig';


const route = express();
route.get('/', autoController.welcome);
route.post('/auth/signup', validator.signup, userController.signup);
route.post('/auth/signin', validator.signin, userController.signin);
route.post('/car', auth.isAuthenthicated, auth.isUser, upload.single('image_url'), validator.postAd, carController.postAd);
route.post('/order', auth.isAuthenthicated, auth.isUser, validator.purchaseOrder, orderController.purchaseOrder);
route.patch('/order/:order_id/price', auth.isAuthenthicated, auth.isUser, validator.updateOrderPrice, orderController.updateOrderPrice);
route.patch('/car/:car_id/status', auth.isAuthenthicated, auth.isUser, carController.updateCarStatus);
route.patch('/car/:car_id/price', auth.isAuthenthicated, auth.isUser, validator.updateAd, carController.updateAd);
route.get('/car/:car_id', auth.isAuthenthicated, auth.isUser, validator.viewACar, carController.viewACar);
route.get('/car', auth.isAuthenthicated, validator.viewCars, carController.viewCars);
route.delete('/car/:car_id', auth.isAuthenthicated, auth.isAdministrator, carController.adminDelete);


export default route;
