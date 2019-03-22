/**
 * Test for API endpoints
 */
import supertest from 'supertest';
import chai from 'chai';
import app from '../../app';
import Token from './user.test';

const { adminToken, userToken } = Token;

const { expect } = chai;
const request = supertest(app);

const url = '/api/v1/office/';
const url2 = '/api/v1/candidates';

const invalidID = 50;

describe('Test case for candidate application', () => {
  it('should make user a proposed candidate', (done) => {
    request.post(`${url}${1}/apply`)
      .set('x-access-token', adminToken.data.token)
      .send({
        office: '1',
        party: '1',
      })
      .expect(201)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        if (err) done(err);
        done();
      });
  });

  it('should return error if user id is wrong', (done) => {
    request.post(`${url}${invalidID}/apply`)
      .set('x-access-token', userToken.data.token)
      .send({
        office: '1',
        party: '1',
      })
      .expect(400)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('You are not authorized to access this route');
        if (err) done(err);
        done();
      });
  });
  it('should return error if candidate tries to apply twice', (done) => {
    request.post(`${url}${1}/apply`)
      .set('x-access-token', adminToken.data.token)
      .send({
        office: '1',
        party: '1',
      })
      .expect(400)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Not Allowed. You are already applied for an office');
        if (err) done(err);
        done();
      });
  });
});

describe('Test case for registering a candidate', () => {
  it('should register a candidate for an office', (done) => {
    request.patch(`${url}${1}/register`)
      .set('x-access-token', adminToken.data.token)
      .send({})
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        if (err) done(err);
        done();
      });
  });

  it('should return error if candidate is registered twice', (done) => {
    request.patch(`${url}${1}/register`)
      .set('x-access-token', adminToken.data.token)
      .send({})
      .expect(400)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Not Allowed. Candidate is already registered for an office');
        if (err) done(err);
        done();
      });
  });

  it('should return error if user is not an admin', (done) => {
    request.patch(`${url}${1}/register`)
      .set('x-access-token', userToken.data.token)
      .send({})
      .expect(400)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('You are not authorized to access this route');
        if (err) done(err);
        done();
      });
  });

  it('should return error if candidate id does not exist', (done) => {
    request.patch(`${url}${invalidID}/register`)
      .set('x-access-token', adminToken.data.token)
      .send({})
      .expect(500)
      .end((err, res) => {
        expect(res.status).to.equal(500);
        expect(res.body.message).to.equal('Candidate is does not exist');
        if (err) done(err);
        done();
      });
  });
});

describe('Test case for getting candidates', () => {
  it('should return `200` and candidate data if it exist', (done) => {
    request.get(`${url2}`)
      .set('x-access-token', adminToken.data.token)
      .send({})
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        if (err) done(err);
        done();
      });
  });
});
