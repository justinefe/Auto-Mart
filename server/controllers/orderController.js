import pool from '../config/config';

class orderController {
  static async purchaseOrder(req, res) {
    const { priceOffered } = req.body;
    const { carId } = req.params;
    const { id } = req.user;
    const userId = id;
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
        buyer: userId,
        car_id: carId,
        price,
        price_offered: priceOffered,
        status: 'pending',
      };
      const keys = Object.keys(newOrders);
      const values = Object.values(newOrders);
      const insert = {
        text: `INSERT into orders (${[...keys]}) values ($1, $2, $3, $4, $5) returning *`, values,
      };
      const newOrder = await pool.query(insert);
      return res.status(201).json({
        status: 201,
        data: { ...newOrder.rows[0] },
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Internal server error',
      });
    }
  }

  static async updateOrderPrice(req, res) {
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


export default orderController;
