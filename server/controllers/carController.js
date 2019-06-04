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
    const userId = req.user.id;
    const orderDetails = cars.find(car => car.id === Number(carId));
    if (!orderDetails) {
      return res.status(404).json({
        status: 404,
        error: 'Car Not Found',
      });
    }
    const id = orders.length + 1;
    const { price } = orderDetails;
    const buyer = userId;
    const newOrders = {
      id, carId, buyer, createdOn: new Date(), status: 'pending', price, priceOffered,
    };
    orders.push(newOrders);
    const newOrder = orders.find(order => order.id === id);
    return res.status(201).json({
      status: 201,
      data: newOrder,
    });
  }

  static updateOrder(req, res) {
    const { newPriceOffered } = req.body;
    const { orderId } = req.params;
    const { id } = req.user;
    const orderDetails = orders.find(order => order.id === Number(orderId));
    if (!orderDetails) {
      return res.status(404).json({
        status: 404,
        error: 'Order Not Found',
      });
    }
    if (id !== orderDetails.buyer) {
      return res.status(403).json({
        status: 403,
        error: 'unauthorized user',
      });
    }
    const objectPosition = orders.findIndex(order => order.id === Number(orderId));
    if (orders[objectPosition].status === 'pending') {
      orders[objectPosition].oldPriceOffered = orders[objectPosition].priceOffered;
      orders[objectPosition].newPriceOffered = newPriceOffered;
      delete orders[objectPosition].priceOffered;
      return res.status(201).json({
        status: 201,
        data: orders[objectPosition],
      });
    } return res.status(400).json({
      status: 400,
      error: 'Order Already Approved',
    });
  }

  static updateStatus(req, res) {
    const { carId } = req.params;
    const { email } = req.user;
    const carDetails = cars.find(car => car.id === Number(carId));
    if (!carDetails) {
      return res.status(404).json({
        status: 404,
        error: 'Car Not Found',
      });
    }

    if (email !== carDetails.email) {
      return res.status(403).json({
        status: 403,
        error: 'unauthorized user',
      });
    }

    const objectPosition = cars.findIndex(car => car.id === Number(carId));
    if (cars[objectPosition].status !== 'sold') {
      cars[objectPosition].status = 'sold';
      return res.status(201).json({
        status: 201,
        data: cars[objectPosition],
      });
    }
    return res.status(400).json({
      status: 400,
      error: 'Car Already Sold',
    });
  }
}

export default carController;
