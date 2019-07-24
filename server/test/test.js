import chai from 'chai';
import chaihttp from 'chai-http';
import fs from 'fs';
import sinon from 'sinon';
import app from '../app';
import users from './datas/user';
import cars from './datas/car';
import orders from './datas/order';

chai.use(chaihttp);
const { expect } = chai;
const server = () => chai.request(app);
const url = '/api/v1';
let userToken;
let adminToken;
let upload;

describe('Welcome', () => {
  it('should return a welcome message on start', (done) => {
    server()
      .get(`${url}/`)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
});

describe('Signup tests', () => {
  it('Should signup a new user', (done) => {
    server()
      .post(`${url}/auth/signup`)
      .send(users[0])
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('token');
        expect(res.body.data).to.have.property('id');
        done();
      });
  });

  it('Should not signup a user with incorrect details', (done) => {
    server()
      .post(`${url}/auth/signup`)
      .send(users[1])
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });
  it('Should not signup a user who already exist', (done) => {
    server()
      .post(`${url}/auth/signup`)
      .send(users[0])
      .end((err, res) => {
        expect(res.statusCode).to.equal(409);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});

describe('Login tests', () => {
  it('Should sign in an existing user', (done) => {
    server()
      .post(`${url}/auth/signin`)
      .send(users[8])
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('token');
        expect(res.body.data).to.have.property('id');
        userToken = res.body.data.token;
        done();
      });
  });

  it('Should sign in an existing admin', (done) => {
    server()
      .post(`${url}/auth/signin`)
      .send(users[6])
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('token');
        expect(res.body.data).to.have.property('id');
        adminToken = res.body.data.token;
        done();
      });
  });

  it('Should not signin a user with incorrect password', (done) => {
    server()
      .post(`${url}/auth/signin`)
      .send(users[5])
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  it('Should not signin a user with incorrect email', (done) => {
    server()
      .post(`${url}/auth/signin`)
      .send(users[7])
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});

describe('Post ads test', () => {
  after(() => {
    sinon.restore();
  });
  it('should be able to create an ads with correct details', (done) => {
    server()
      .post(`${url}/car`)
      .set('token', userToken)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .field('manufacturer', 'toyota')
      .field('state', 'new')
      .field('body_type', 'camry')
      .field('model', 'escapade')
      .field('price', '1542112')
      .attach('image_url', fs.readFileSync(`${__dirname}/test.jpg`), 'test.jpg')
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body.status).to.equal(201);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('id');
        done();
      });
  });

  it('should not create an ads of a user that is not authenticated', (done) => {
    server()
      .post(`${url}/car`)
      .send({
        ...cars[0],
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  it('should not create an ads without manufacturer', (done) => {
    server()
      .post(`${url}/car`)
      .set('token', userToken)
      .send({
        ...cars[0],
        manufacturer: '',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  it('should not create an ads with unauthorise token', (done) => {
    server()
      .post(`${url}/car`)
      .set('tok', userToken)
      .send({
        ...cars[0],
        manufacturer: '',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});

describe('creates purchase order', () => {
  it('should make a purchase order of an existing user', (done) => {
    server()
      .post(`${url}/order`)
      .set('token', userToken)
      .send(orders[0])
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body.status).to.equal(201);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('id');
        done();
      });
  });
  it('it should not make a purchase order of a user who is not authenticated', (done) => {
    server()
      .post(`${url}/order`)
      .send({
        ...orders[0],
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  it('should not create an order without a purchase price', (done) => {
    server()
      .post(`${url}/order`)
      .set('token', userToken)
      .send({
        ...orders[0],
        amount: '',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });
  it('should not create an order that can not be found', (done) => {
    server()
      .post(`${url}/order`)
      .set('token', userToken)
      .send({
        ...orders[5555566],
        amount: '6512545',
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(500);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});
describe('updatePurchase', () => {
  it('should create purchase order update', (done) => {
    server()
      .patch(`${url}/order/2/price`)
      .set('token', userToken)
      .send(orders[0])
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('id');
        done();
      });
  });
  it('should not update price of a user who is not authenticated', (done) => {
    server()
      .patch(`${url}/order/777/price`)
      .send(orders[2])
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body).to.a.property('error');
        done();
      });
  });
  it('should not update price of an order when the resource can not be found', (done) => {
    server()
      .patch(`${url}/order/888/price`)
      .set('token', userToken)
      .send(orders[1])
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  it('should not update price of an order without newPriceOffered', (done) => {
    server()
      .patch(`${url}/order/1/price`)
      .set('token', userToken)
      .send({ newPriceOffered: '' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});

describe('updateCarStatus', () => {
  it('should mark posted ads sold order update', (done) => {
    server()
      .patch(`${url}/car/4/status`)
      .set('token', userToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('id');
        done();
      });
  });
  it('should not update the car status of a user who is not authenticated', (done) => {
    server()
      .patch(`${url}/car/1/status`)
      .set('token', userToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(403);
        expect(res.body).to.a.property('error');
        done();
      });
  });
  it('should not update status of a sold car', (done) => {
    server()
      .patch(`${url}/car/4/status`)
      .set('token', userToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });
  it('should not update status of a car that can not be found', (done) => {
    server()
      .patch(`${url}/car/777/status`)
      .set('token', userToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});

describe('update Ads price', () => {
  it('it should update the price of a posted Ads', (done) => {
    server()
      .patch(`${url}/car/4/price`)
      .set('token', userToken)
      .send(cars[4])
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('id');
        done();
      });
  });
  it('should not update the price of a posted Ads of a user who is not authenticated', (done) => {
    server()
      .patch(`${url}/car/1/price`)
      .set('token', userToken)
      .send(cars[0])
      .end((err, res) => {
        expect(res.statusCode).to.equal(403);
        expect(res.body).to.a.property('error');
        done();
      });
  });
  it('should not update price of an Ads that does not exist', (done) => {
    server()
      .patch(`${url}/car/99/price`)
      .set('token', userToken)
      .send(cars[4])
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  it('should not update price of an Ads posted by another user', (done) => {
    server()
      .patch(`${url}/car/1/price`)
      .set('token', userToken)
      .send(cars[4])
      .end((err, res) => {
        expect(res.statusCode).to.equal(403);
        expect(res.body).to.have.property('error');
        done();
      });
  });
  it('should not update price of an Ads posted without the correct input field', (done) => {
    server()
      .patch(`${url}/car/4/price`)
      .set('token', userToken)
      .send(cars[6])
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});

describe('get a specific car', () => {
  it('should get a specific car', (done) => {
    server()
      .get(`${url}/car/1`)
      .set('token', userToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('id');
        done();
      });
  });

  it('should not view a car that can not be found', (done) => {
    server()
      .get(`${url}/car/88`)
      .set('token', userToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.have.property('error');
        done();
      });
  });
  it('Admin should not view a specific', (done) => {
    server()
      .get(`${url}/car/88`)
      .set('token', adminToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  it('should not view a car with invalid request parameter ', (done) => {
    server()
      .get(`${url}/car/g`)
      .set('token', userToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});
describe('User can view all unsold cars', () => {
  it('should view all unsold cars ', (done) => {
    server()
      .get(`${url}/car?status=available`)
      .set('token', userToken)
      .end((err, res) => {
        expect(res.body.status).to.equal(200);
        expect(res.body).to.have.property('data');
        done();
      });
  });

  it('should view all unsold cars within a given price range', (done) => {
    server()
      .get(`${url}/car?status=available&minPrice=2000000&maxPrice=5000000`)
      .set('token', userToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.status).to.equal(200);
        expect(res.body).to.have.property('data');
        done();
      });
  });

  it('should not view all unsold cars within a range when the maxPrice is not given', (done) => {
    server()
      .get(`${url}/car?status=available&maxPrice=4000000`)
      .set('token', userToken)
      .end((err, res) => {
        expect(res.body.status).to.equal(200);
        expect(res.body).to.have.property('data');
        done();
      });
  });
  it('Users should not view all cars', (done) => {
    server()
      .get(`${url}/car?status=pending`)
      .set('token', userToken)
      .end((err, res) => {
        expect(res.body.status).to.equal(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });
  it('Admin should not view cars by make or status or price range', (done) => {
    server()
      .get(`${url}/car?status=available&minPrice=2000000&maxPrice=5000000`)
      .set('token', adminToken)
      .end((err, res) => {
        expect(res.body.status).to.equal(403);
        expect(res.body).to.have.property('error');
        done();
      });
  });
  it('Admin should view all cars either available or sold', (done) => {
    server()
      .get(`${url}/car`)
      .set('token', adminToken)
      .end((err, res) => {
        expect(res.body.status).to.equal(200);
        expect(res.body).to.have.property('data');
        done();
      });
  });
});

describe('Admin can delete a posted Ad record', () => {
  it('Admin should delete a posted ad', (done) => {
    server()
      .delete(`${url}/car/1`)
      .set('token', adminToken)
      .end((err, res) => {
        expect(res.body.status).to.equal(200);
        expect(res.body).to.have.property('data');
        done();
      });
  });
  it('admin should not delete a car that can not  be found', (done) => {
    server()
      .delete(`${url}/car/8856556`)
      .set('token', adminToken)
      .end((err, res) => {
        expect(res.body.status).to.equal(404);
        expect(res.body).to.have.property('error');
        done();
      });
  });
  it('admin should not delete a car that can not  be found', (done) => {
    server()
      .delete(`${url}/car/1`)
      .set('token', userToken)
      .end((err, res) => {
        expect(res.body.status).to.equal(401);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});
