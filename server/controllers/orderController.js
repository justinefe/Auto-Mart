import pool from '../config/config';
/* eslint-disable camelcase */

class orderController {
  static async purchaseOrder(req, res) {
    const { car_id } = req.body;
    const price_offered = req.body.amount;
    const { id } = req.user;
    const userId = id;
    try {
      const orderDetails = await pool.query('SELECT * from cars where id = $1', [Number(car_id)]);

      if (!orderDetails.rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'Car Not Found',
        });
      }
      const { price } = orderDetails.rows[0];
      const newOrders = {
        buyer: userId,
        car_id,
        price,
        price_offered,
        status: 'pending',
      };
      const keys = Object.keys(newOrders);
      const values = Object.values(newOrders);
      const insert = {
        text: `INSERT into orders (${[...keys]}) values ($1, $2, $3, $4, $5) returning *`, values,
      };
    console.log('newOrder', newOrder);
      const newOrder = await pool.query(insert);
      console.log('newOrder', newOrder);
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
    const new_price_offered = req.body.price;
    const { order_id } = req.params;
    console.log('response body', req.body);
    try {
      const orderDetails = await pool.query('SELECT * from orders where (id = $1) and (status = \'pending\')', [Number(order_id)]);
      if (!orderDetails.rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'Order Not Found',
        });
      }
      const { price_offered } = orderDetails.rows[0];
      const newOrderDetails = await pool.query('UPDATE orders SET price_offered = $1 WHERE id = $2 RETURNING id, car_id, status', [new_price_offered, Number(order_id)]);
      newOrderDetails.rows[0].old_price_offered = price_offered;
      newOrderDetails.rows[0].new_price_offered = new_price_offered;
      return res.status(200).json({
        status: 200,
        data: newOrderDetails.rows[0],
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
