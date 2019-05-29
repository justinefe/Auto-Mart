import chai from 'chai';
import chaihttp from 'chai-http';
import app from '../app';
import users from './datas/user';

chai.use(chaihttp);
const { expect } = chai;
const server = () => chai.request(app);
const url = '/api/v1';

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
  it('Shonuld signup a new user', (done) => {
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

  it('Shonuld not signup a user with incorrect details', (done) => {
    server()
      .post(`${url}/auth/signup`)
      .send(users[1])
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});
