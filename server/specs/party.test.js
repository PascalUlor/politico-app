/**
 * Test for API endpoints
 */
import supertest from 'supertest';
import chai from 'chai';
import app from '../../app';
import inputs from './seeder/party.data';
import Token, { wrongToken } from './user.test';

const { expect } = chai;
const request = supertest(app);
const { adminToken, userToken } = Token;

const url = '/api/v1/parties';

const invalidID = 50;

describe('Test case for loading application home page', () => {
  it('should load the application home page', (done) => {
    request.get('/')
      .set('Content-Type', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        if (err) done(err);
        done();
      });
  });
});
// test invalid routes
describe('Test Case For Invalid Routes', () => {
  it('Should return a message when an invalid route is accessed', (done) => {
    request.get('/api/v1/some-rubbish')
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .expect(404)
      .end((err, res) => {
        expect(res.body).deep.equal({
          message: 'Invalid routes',
        });
        if (err) done(err);
        done();
      });
  });

  it('should fail to get route', (done) => {
    request.get('/api/v1')
      .set('Contet-Type', 'application/json')
      .expect(404)
      .end((err, res) => {
        expect(res.body).deep.equal({
          message: 'Invalid routes',
        });
        if (err) done(err);
        done();
      });
  });

  it('should return `404` page for all invalid routes', (done) => {
    request.get('/weconnect/recipes')
      .set('Content-Type', 'application/json')
      .expect(404)
      .end((err, res) => {
        expect(res.body).deep.equal({
          message: 'Invalid routes',
        });
        if (err) done(err);
        done();
      });
  });
});

describe('All test cases for POSTing a new party', () => {
  it('should return `400` status code with for undefined requests', (done) => {
    request.post(url)
      .set('x-access-token', adminToken.data.token)
      .send({})
      .expect(422)
      .end((err, res) => {
        expect(res.body.data[0].name).to.eql('name field can not be blank');
        expect(res.body.data[0].email).to.eql('email field can not be blank');
        expect(res.body.data[0].hqAddress).to.eql('hqAddress field can not be blank');
        expect(res.body.data[0].phonenumber).to.eql('phonenumber field can not be blank');
        expect(res.body.data[0].about).to.eql('about field can not be blank');
        expect(res.body.data[0].logoUrl).to.eql('logoUrl field can not be blank');
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('should return `409` status code with for undefined requests', (done) => {
    request.post(url)
      .set('x-access-token', adminToken.data.token)
      .send(inputs.duplicateData2)
      .expect(409)
      .end((err, res) => {
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('User with phonenumber already exists');
        expect(res.status).to.equal(409);
        done();
      });
  });

  it('should return `400` status code with error messages for about less than 20 character', (done) => {
    request.post(url)
      .set('x-access-token', adminToken.data.token)
      .send({
        name: 'A',
        hqAddress: '32 Epic road',
        email: 'app@yahoo.com',
        phonenumber: '08061234567',
        about: 'Th',
        logoUrl: 'app.jpg',
      })
      .expect(400)
      .end((err, res) => {
        expect(res.body.data[0]).to.have.property('about').eql('about field must be between 20 to 1000 characters');
        expect(res.body.data[0]).to.have.property('name').eql('name must be between 3 to 50 characters');
        done();
      });
  });
  it('should return `400` status code with error messages if input is invalid', (done) => {
    request.post(url)
      .set('x-access-token', adminToken.data.token)
      .send(inputs.invalidData)
      .expect(400)
      .end((err, res) => {
        expect(res.body.data[0]).to.have.property('hqAddress').eql('Invalid hqAddress');
        expect(res.body.data[0]).to.have.property('phonenumber').eql('Invalid phonenumber');
        expect(res.body.data[0]).to.have.property('logoUrl').eql('Invalid logoUrl');
        expect(res.body.data[0]).to.have.property('email').eql('Invalid email');
        expect(res.body.data[0]).to.have.property('name').eql('name can only be alphabetical');
        done();
      });
  });

  it('should return `400` status code with error messages for none admin users', (done) => {
    request.post(url)
      .set('x-access-token', userToken.data.token)
      .send({
        name: 'APP',
        hqAddress: '32 Epic road',
        email: 'app@yahoo.com',
        phonenumber: '8061234567',
        about: 'This is a demo party for my project',
        logoUrl: 'app.jpg',
      })
      .expect(401)
      .end((err, res) => {
        expect(res.body.success).to.eql(false);
        expect(res.body.message).to.eql('Authentication failed. Token is invalid or expired');
        done();
      });
  });

  it('should return `401` status code for invalid token', (done) => {
    request.post(url)
      .set('x-access-token', wrongToken)
      .send(inputs.newParty)
      .expect(401)
      .end((err, res) => {
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Authentication failed');
        expect(res.status).to.equal(401);
        done();
      });
  });
  it('should return `403` status when on token s provided', (done) => {
    request.post(url)
      .set('Content-Type', 'application/json')
      .send(inputs.newParty)
      .expect(403)
      .end((err, res) => {
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Access denied. You are not logged in');
        expect(res.status).to.equal(403);
        done();
      });
  });

  it('should return `201` status code with success messages for successfull post', (done) => {
    request.post(url)
      .set('x-access-token', adminToken.data.token)
      .send({
        name: 'APP',
        hqAddress: '32 Epic road',
        email: 'app@yahoo.com',
        phonenumber: '8061234567',
        about: 'This is a demo party for my project',
        logoUrl: 'app.jpg',
      })
      .expect(201)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('data');
        done();
      });
  });
});// End of create party test

describe('All test cases for updating a party', () => {
  it('should return an error message for an invalid party id', (done) => {
    request.patch(`${url}/${invalidID}/name`)
      .set('x-access-token', adminToken.data.token)
      .send({ name: 'MDP' })
      .expect(400)
      .end((err, res) => {
        expect(res.body).deep.equal({
          message: 'Party does not exist',
          success: false,
          statusCode: 400,
        });
        done();
      });
  });

  it('should return an error message for none admin user', (done) => {
    request.patch(`${url}/${1}/name`)
      .set('x-access-token', userToken.data.token)
      .send({ name: 'MDP' })
      .expect(404)
      .end((err, res) => {
        expect(res.body).deep.equal({
          success: false,
          statusCode: 400,
          message: 'Access Denied. You are not authorized',
        });
        done();
      });
  });

  it('should return a `422` status code with error messages for undefined inputs', (done) => {
    request.patch(`${url}/${2}/name`)
      .set('x-access-token', adminToken.data.token)
      .send({ name: '' })
      .expect(422)
      .end((err, res) => {
        expect(res.body.data[0].name).to.eql('name field can not be blank');
        expect(res.status).to.equal(400);
        done();
      });
  });
  it('should return `400` if update data is invalid', (done) => {
    request.patch(`${url}/${2}/name`)
      .set('x-access-token', adminToken.data.token)
      .send({ name: '9' })
      .expect(400)
      .end((err, res) => {
        expect(res.body.data[0].name).to.eql('name can only be alphabetical');
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('should return `200` a success message for successfull update', (done) => {
    request.patch(`${url}/${1}/name`)
      .set('x-access-token', adminToken.data.token)
      .send({ name: 'gunit' })
      .expect(200)
      .end((err, res) => {
        expect(res.body.success).to.eql(true);
        expect(res.body.message).to.eql('Party updated successfully');
        expect(res.status).to.equal(200);
        done();
      });
  });
});// Update Test end

describe('test cases to Get parties for logged in user', () => {
  it('should return `200` status code with `res.body` success message', (done) => {
    request.get(`${url}`)
      .set('Content-Type', 'application/json')
      .send({})
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('data');
        done();
      });
  });

  it('Should return error single party qery with invalid id', (done) => {
    request.get(`${url}/${invalidID}`)
      .set('Content-Type', 'application/json')
      .send({})
      .expect(400)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Party does not exist');
        done();
      });
  });

  it('Should return success message when valid id is entered', (done) => {
    request.get(`${url}/${1}`)
      .set('Content-Type', 'application/json')
      .send({})
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('data');
        done();
      });
  });
});


describe('Test cases for deleting request', () => {
  it('should return an error message (400) for invalid Id', (done) => {
    request.delete(`${url}/${invalidID}`)
      .set('x-access-token', adminToken.data.token)
      .send({})
      .expect(400)
      .end((err, res) => {
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Party does not exist');
        done();
      });
  });

  it('should return an error message (400) for none admin user', (done) => {
    request.delete(`${url}/${1}`)
      .set('x-access-token', userToken.data.token)
      .send({})
      .expect(400)
      .end((err, res) => {
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Access Denied. You are not authorized');
        done();
      });
  });

  it('should return `200` status code with success message', (done) => {
    request.delete(`${url}/${1}`)
      .set('x-access-token', adminToken.data.token)
      .send({})
      .expect(200)
      .end((err, res) => {
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Party successfully deleted');
        done();
      });
  });
});
