import cars from '../model/car';
import orders from '../model/order';

class carController {
  static postAd(req, res) {
    const {
      manufacturer, model, price, state,
    } = req.body;
    const { email } = req.user;
    const userId = req.user.id;
    const id = cars.length + 1;
    const newAds = {
      id, userId, email, createdOn: new Date(), manufacturer, price, model, state, status: 'available',
    };
    cars.push(newAds);
    const newAd = cars.find(car => car.id === id);
    return res.status(201).json({
      status: 201,
      data: {
        ...newAd,
      },
    });
  }

  static purchaseOrder(req, res) {
    const { priceOffered } = req.body;
    const { carId } = req.params;
    const carDetails = cars.filter(car => car.id === Number(carId));
    if (!carDetails[0]) {
      return res.status(404).json({
        status: 404,
        error: 'Car Not Found',
      });
    }
    const id = orders.length + 1;
    const { price } = carDetails[0];
    const newOrders = {
      id, carId, createdOn: new Date(), status: 'available', price, priceOffered,
    };
    orders.push(newOrders);
    const newOrder = orders.find(order => order.id === id);
    return res.status(201).json({
      status: 201,
      data: newOrder,
    });
  }
}

export default carController;
