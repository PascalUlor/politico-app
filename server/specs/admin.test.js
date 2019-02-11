/**
 * Test for API endpoints
 */
import supertest from 'supertest';
import chai from 'chai';
import app from '../../app';
import Token from './user.test';

const { expect } = chai;
const request = supertest(app);
const { adminToken, userToken } = Token;


describe('test cases for user role', () => {
  it('should return `200` status code with `res.body` success message', (done) => {
    request.put('/api/v1/admin/2/true')
      .set('x-access-token', adminToken.data.token)
      .expect(200)
      .end((err, res) => {
        expect(res.body.status).to.equal(200);
        done();
      });
  });
  it('should return 401 status code with `res.body` failure message if user is not admin', (done) => {
    request.put('/api/v1/admin/2/true')
      .set('x-access-token', userToken.data.token)
      .expect(401)
      .end((err, res) => {
        expect(res.body.success).to.equal(false);
        expect(res.body.message).to.equal('Authentication failed');
        expect(res.status).to.equal(401);
        done();
      });
  });
});
