import pool from '../config/config';

class carController {
  static async postAd(req, res) {
    const {
      manufacturer, model, price, state, bodyType, imageUrl,
    } = req.body;
    const { id } = req.user;
    let newAd;
    try {
      const newAds = {
        owner: id,
        state,
        status: 'available',
        price,
        manufacturer,
        model,
        bodyType,
        image_url: imageUrl,
      };
      const keys = Object.keys(newAds);
      const values = Object.values(newAds);
      const insert = {
        text: `INSERT into cars (${[...keys]}) values ($1, $2, $3, $4, $5, $6, $7, $8) returning *`, values,
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

  static async updateCarStatus(req, res) {
    const { carId } = req.params;
    const { id } = req.user;
    const carDetails = await pool.query('SELECT * from cars where id = $1', [Number(carId)]);
    if (!carDetails.rows[0]) {
      return res.status(404).json({
        status: 404,
        error: 'Car Not Found',
      });
    }
    if (id !== carDetails.rows[0].owner) {
      return res.status(403).json({
        status: 403,
        error: 'Unauthorized user',
      });
    }

    if (carDetails.rows[0].status !== 'sold') {
      await pool.query('UPDATE cars SET status = \'sold\' WHERE id = $1', [Number(carId)]);
      return res.status(201).json({
        status: 201,
        data: carDetails.rows[0],
      });
    }
    return res.status(400).json({
      status: 400,
      error: 'Car Already Sold',
    });
  }
}
export default carController;
