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

const invalidID = 50;

describe('Test case for registering candidate', () => {
  it('should register candidate for an office on admins input only', (done) => {
    request.post(`${url}${1}/register`)
      .set('x-access-token', adminToken.data.token)
      .send({
        office: '1',
      })
      .expect(201)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        if (err) done(err);
        done();
      });
  });

  it('should return error if user is not admin', (done) => {
    request.post(`${url}${1}/register`)
      .set('x-access-token', userToken.data.token)
      .send({
        office: '1',
      })
      .expect(400)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('You are not authorized to access this route');
        if (err) done(err);
        done();
      });
  });
  it('should return error if candidate id does not exist', (done) => {
    request.post(`${url}${invalidID}/register`)
      .set('x-access-token', adminToken.data.token)
      .send({
        office: '1',
      })
      .expect(500)
      .end((err, res) => {
        expect(res.status).to.equal(500);
        if (err) done(err);
        done();
      });
  });
});
