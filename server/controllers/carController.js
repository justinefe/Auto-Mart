/* eslint-disable camelcase */
import pool from '../config/config';

class carController {
  static async postAd(req, res) {
    const {
      manufacturer, model, price, state, body_type, image_url,
    } = req.body;
    const { id } = req.user;
    try {
      const newAds = {
        owner: id,
        state,
        status: 'available',
        price,
        manufacturer,
        model,
        body_type,
        image_url,
      };
      const keys = Object.keys(newAds);
      const values = Object.values(newAds);
      const insert = {
        text: `INSERT into cars (${[...keys]}) values ($1, $2, $3, $4, $5, $6, $7, $8) returning id, owner, created_on, state, status, price, manufacturer, model, body_type`, values,
      };
      const newAd = await pool.query(insert);
      return res.status(200).json({
        status: 200,
        data: newAd.rows[0],
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Internal server error',
      });
    }
  }

  static async updateCarStatus(req, res) {
    const { carId } = req.params;
    const { id, email } = req.user;
    try {
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
        const newCarDetails = await pool.query('UPDATE cars SET status = \'sold\' WHERE id = $1   RETURNING id, created_on, manufacturer, model, price, state, status', [Number(carId)]);
        newCarDetails.rows[0].email = email;
        return res.status(200).json({
          status: 200,
          data: newCarDetails.rows[0],
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Internal server error',
      });
    }
    return res.status(400).json({
      status: 400,
      error: 'Car Already Sold',
    });
  }

  static async updateAd(req, res) {
    const { newPrice } = req.body;
    const { carId } = req.params;
    const { id, email } = req.user;
    try {
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
          error: 'Access denied',
        });
      }
      const newCarDetails = await pool.query('UPDATE cars SET price = $1 WHERE id = $2 RETURNING id, created_on, manufacturer, model, price, state, status', [newPrice, Number(carId)]);
      newCarDetails.rows[0].email = email;
      return res.status(200).json({
        status: 200,
        data: newCarDetails.rows[0],
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Internal server error',
      });
    }
  }

  static async viewACar(req, res) {
    const { carId } = req.params;
    try {
      const carDetails = await pool.query('SELECT id, owner, created_on, state, status, price, manufacturer, model, body_type from cars where id = $1', [Number(carId)]);
      if (!carDetails.rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'Car Not Found',
        });
      }
      return res.status(200).json({
        status: 200,
        data: carDetails.rows[0],
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Internal server error',
      });
    }
  }

  static async viewCars(req, res) {
    const {
      status, minPrice, maxPrice, manufacturer,
    } = req.query;
    const { isAdmin } = req.user;
    try {
      if (!isAdmin && status) {
        const allAvailableUnsoldCars = await pool.query('SELECT * from cars WHERE status = $1', [status]);
        if (!allAvailableUnsoldCars.rows[0]) {
          return res.status(404).json({
            status: 404,
            error: 'No Available Cars',
          });
        }
        if (!minPrice && !maxPrice && !manufacturer) {
          return res.status(200).json({
            status: 200,
            data: allAvailableUnsoldCars.rows,
          });
        }
        let foundCars;
        if (manufacturer) {
          foundCars = await pool.query('SELECT * from cars WHERE status = $1 AND manufacturer = $2', [status, manufacturer]);
        } else {
          foundCars = await pool.query('SELECT * FROM cars WHERE status = $1 AND price BETWEEN  $2 AND  $3', [status, Number(minPrice), Number(maxPrice)]);
        }
        if (!foundCars) {
          return res.status(404).json({
            status: 404,
            error: 'Cars Not Found',
          });
        }
        return res.status(200).json({
          status: 200,
          data: foundCars.rows,
        });
      }
      if (isAdmin && !status) {
        const cars = await pool.query('SELECT * from cars');
        return res.status(200).json({
          status: 200,
          data: cars.rows,
        });
      } return res.status(403).json({
        status: 403,
        error: 'Unauthorized route',
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Internal server error',
      });
    }
  }

  static async adminDelete(req, res) {
    const { carId } = req.params;
    try {
      const carDetails = await pool.query('SELECT * from cars where id = $1', [Number(carId)]);
      if (!carDetails.rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'Car Not Found',
        });
      }
      await pool.query('DELETE FROM cars where id = $1 RETURNING id = $1', [Number(carId)]);
      return res.status(200).json({
        status: 200,
        data: 'Car Ad successfully deleted',
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
