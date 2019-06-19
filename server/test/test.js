import chai from 'chai';
import chaihttp from 'chai-http';
import app from '../app';
import users from './datas/user';

chai.use(chaihttp);
const { expect } = chai;
const server = () => chai.request(app);
const url = '/api/v1';
let userToken;
let adminToken;

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
        console.log(res.body);
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
        console.log(res.body);
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
        console.log(res.body);
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});
