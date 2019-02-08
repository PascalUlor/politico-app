/**
 * Test for User API endpoints
 */
import supertest from 'supertest';
import chai from 'chai';
import winston from '../config/winston';
import app from '../../app';
import inputs from './seeder/user.data';

export const request = supertest(app);
export const { expect } = chai;
export const wrongToken = 'ThisIsAWrongToken';

const userToken = { token: null };
const adminToken = { token: null };

describe('All Test cases for user Signup', () => {
  it('Should return `201` for unique email signups', (done) => {
    request.post('/api/v1/auth/signup')
      .set('Content-Type', 'application/json')
      .send(inputs.validInput1)
      .expect(201)
      .end((err, res) => {
        expect(res.body.success).to.equal(true);
        expect(res.body).to.haveOwnProperty('token');
        expect(res.body.message).to.equal('Signup successfull');
        expect(res.body.user).to.eql({
          userId: 2,
          fullName: 'Bruce Banner',
          email: 'banner@yahoo.com',
          is_admin: false,
        });
        if (err) done(err);
        done();
      });
  });
  it('Should return `201` when another unique email signups', (done) => {
    request.post('/api/v1/auth/signup')
      .set('Content-Type', 'application/json')
      .send(inputs.validInput2)
      .expect(201)
      .end((err, res) => {
        expect(res.body).to.have.property('success').equal(true);
        expect(res.body).to.haveOwnProperty('token');
        expect(res.body.message).to.equal('Signup successfull');
        expect(res.body.user).to.eql({
          userId: 3,
          fullName: 'Mike Owen',
          email: 'mk@yahoo.com',
          is_admin: false,
        });
        if (err) done(err);
        done();
      });
  });

  it('should return `400` if some fields are undefined', (done) => {
    request.post('/api/v1/auth/signup')
      .set('Content-Type', 'application/json')
      .send({
        password: '123',
      })
      .expect(400)
      .end((err, res) => {
        expect(res.body.firstName).to.equal('firstName field can not be blank');
        expect(res.body.lastName).to.equal('lastName field can not be blank');
        expect(res.body.email).to.equal('email field can not be blank');
        if (err) done(err);
        done();
      });
  });
  it('should return `400` if email already exists', (done) => {
    request.post('/api/v1/auth/signup')
      .set('Content-Type', 'application/json')
      .send(inputs.existingEmail)
      .expect(400)
      .end((err, res) => {
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('User with email already exist');
        done();
      });
  });
  it('should return `409` if user with phonenumber already exists', (done) => {
    request.post('/api/v1/auth/signup')
      .set('Content-Type', 'application/json')
      .send(inputs.duplicatePhone)
      .expect(409)
      .end((err, res) => {
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('User with phonenumber already exists');
        done();
      });
  });
  it('Should return `500` if password is not hashed', (done) => {
    request.post('/api/v1/auth/signup')
      .set('Content-Type', 'application/json')
      .send({})
      .expect(500)
      .end((err, res) => {
        expect(res.body.password).to.equal(undefined);
        expect(res.status).to.equal(500);
        done();
      });
  });

  it('should return `400` status code with errors message for empty request', (done) => {
    request.post('/api/v1/auth/signup')
      .set('Content-Type', 'application/json')
      .send(inputs.emptyData)
      .expect(400)
      .end((err, res) => {
        expect(res.body.firstName).to.eql('firstName field can not be blank');
        expect(res.body.lastName).to.eql('lastName field can not be blank');
        expect(res.body.email).to.eql('email field can not be blank');
        expect(res.body.password).to.eql('password field can not be blank');
        expect(res.body.phonenumber).to.eql('phonenumber field can not be blank');
        expect(res.status).to.equal(400);
        done();
      });
  });
});

describe('All Test cases for user login', () => {
  it('Should return `401` for wrong user input', (done) => {
    request.post('/api/v1/auth/login')
      .set('Content-Type', 'application/json')
      .send(inputs.invalidEmailPassword)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
  });
  it('Should return `401` and deny access if wrong userName not entered', (done) => {
    request.post('/api/v1/auth/login')
      .set('Content-Type', 'application/json')
      .send(inputs.noEmail)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
  });
  it('Should return `401` and deny access if wrong Password not entered', (done) => {
    request.post('/api/v1/auth/login')
      .set('Content-Type', 'application/json')
      .send(inputs.noPassword)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
  });
  it('Should return `200` for authenticated user details', (done) => {
    request.post('/api/v1/auth/login')
      .set('Content-Type', 'application/json')
      .send(inputs.userOneLogin)
      .end((err, res) => {
        winston.info('=========================');
        userToken.token = res.body.token;
        winston.info(userToken.token);
        expect(res.body).to.haveOwnProperty('token');
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('Should return `200` for admin user login', (done) => {
    request.post('/api/v1/auth/login')
      .set('Content-Type', 'application/json')
      .send(inputs.adminLogin)
      .end((err, res) => {
        winston.info('===================================');
        adminToken.token = res.body.token;
        winston.info(adminToken.token);
        expect(res.body).to.haveOwnProperty('token');
        expect(res.status).to.equal(200);
        done();
      });
  });
});

export default { userToken, adminToken };
