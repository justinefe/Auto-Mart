/* eslint-disable camelcase */
import pool from '../config/config';

class carController {
  static async postAd(req, res) {
    const {
      manufacturer, model, price, state, bodyType,
    } = req.body;
    const { email } = req.user;
    let newAd;
    try {
      const newAds = {
        email,
        manufacturer,
        price,
        model,
        state,
        status: 'available',
        bodyType,
      };
      const keys = Object.keys(newAds);
      const values = Object.values(newAds);
      const insert = {
        text: `INSERT into cars (${[...keys]}) values ($1, $2, $3, $4, $5, $6, $7) returning *`, values,
      };
      newAd = await pool.query(insert);
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Internal server error',
      });
    }
    return res.status(201).json({
      status: 201,
      data:
        newAd.rows[0]
      ,
    });
  }

  static async purchaseOrder(req, res) {
    const { priceOffered } = req.body;
    const { carId } = req.params;
    const { email } = req.user;
    let newOrder;
    try {
      const orderDetails = await pool.query('SELECT * from cars where id = $1', [Number(carId)]);

      if (!orderDetails.rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'Car Not Found',
        });
      }
      const { price } = orderDetails.rows[0];
      const newOrders = {
        car_id: carId,
        email,
        status: 'pending',
        price,
        price_offered: priceOffered,
      };
      const keys = Object.keys(newOrders);
      const values = Object.values(newOrders);
      const insert = {
        text: `INSERT into orders (${[...keys]}) values ($1, $2, $3, $4, $5) returning *`, values,
      };
      newOrder = await pool.query(insert);
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Internal server error',
      });
    }

    return res.status(201).json({
      status: 201,
      data: newOrder.rows[0],
    });
  }

  static async updateOrder(req, res) {
    const { newPriceOffered } = req.body;
    const { orderId } = req.params;
    try {
      const orderDetails = await pool.query('SELECT * from orders where (id = $1) and (status = \'pending\')', [Number(orderId)]);
      if (!orderDetails.rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'Order Not Found',
        });
      }
      await pool.query('UPDATE orders SET price_offered = $1 WHERE id = $2', [newPriceOffered, Number(orderId)]);
      const { car_id, status, price_offered } = orderDetails.rows[0];
      return res.status(201).json({
        status: 201,
        data: {
          orderId,
          car_id,
          status,
          old_price_offered: price_offered,
          new_price_offered: newPriceOffered,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Internal server error',
      });
    }
  }
}
export default carController;
