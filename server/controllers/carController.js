import cars from '../model/car';

class carController {
  static postAd(req, res) {
    const {
      manufacturer, model, price, state,
    } = req.body;
    const { email } = req.user;
    const userId = req.user.id;
    const id = cars.length + 1;
    const newCar = {
      id, userId, email, createdOn: new Date(), manufacturer, price, model, state, status: 'available',
    };
    cars.push(newCar);
    const newAd = cars.find(car => car.id === id);
    return res.status(201).json({
      status: 201,
      data: {
        ...newAd,
      },
    });
  }
}

export default carController;
