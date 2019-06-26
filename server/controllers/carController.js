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
      return res.status(201).json({
        status: 201,
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
        return res.status(201).json({
          status: 201,
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
          error: 'Unauthorized user',
        });
      }
      const newCarDetails = await pool.query('UPDATE cars SET price = $1 WHERE id = $2 RETURNING id, created_on, manufacturer, model, price, state, status', [newPrice, Number(carId)]);
      newCarDetails.rows[0].email = email;
      return res.status(201).json({
        status: 201,
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
      return res.status(201).json({
        status: 201,
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
    const { status, minPrice, maxPrice } = req.query;
    const { isAdmin } = req.user;
    const allAvailableUnsoldCars = await pool.query('SELECT * from cars WHERE status = \'available\'');
    try {
      if (!isAdmin && (status || minPrice || maxPrice)) {
        if (allAvailableUnsoldCars.rows[0] && minPrice && !maxPrice) {
          return res.status(400).json({
            status: 400,
            error: 'No Available Cars',
          });
        }

        if (allAvailableUnsoldCars.rows[0] && !minPrice && maxPrice) {
          return res.status(400).json({
            status: 400,
            error: 'No Available Cars',
          });
        }

        if (allAvailableUnsoldCars.rows[0] && !minPrice && !maxPrice) {
          return res.status(201).json({
            status: 201,
            data: allAvailableUnsoldCars.rows,
          });
        }
        const allAvailableUnsoldCarsWithinRange = await pool.query('SELECT * FROM cars WHERE status = \'available\' AND price BETWEEN  $1 AND  $2', [Number(minPrice), Number(maxPrice)]);
        if (!allAvailableUnsoldCarsWithinRange.rows[0]) {
          return res.status(404).json({
            status: 404,
            error: 'Cars Not Found',
          });
        }
        return res.status(201).json({
          status: 201,
          data: allAvailableUnsoldCarsWithinRange.rows,
        });
      }
      if (isAdmin && (!status && !minPrice && !maxPrice)) {
        const cars = await pool.query('SELECT * from cars');
        return res.status(201).json({
          status: 201,
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
      return res.status(201).json({
        status: 201,
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
