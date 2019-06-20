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
}
export default carController;
