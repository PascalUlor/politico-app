/**
 * Test for API endpoints
 */
import supertest from 'supertest';
import chai from 'chai';
import app from '../../app';
import Token from './user.test';

const { adminToken } = Token;


const { expect } = chai;
const request = supertest(app);

const url = '/api/v1/votes/';


describe('Test case for creating vote', () => {
  it('should allow user create votes', (done) => {
    request.post(`${url}`)
      .set('x-access-token', adminToken.token)
      .send({
        office: '1',
        candidate: '1',
      })
      .expect(201)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('data');
        if (err) done(err);
        done();
      });
  });


  it('should return error for wrong input', (done) => {
    request.post(`${url}`)
      .set('x-access-token', adminToken.token)
      .send({
        office: 'a',
        candidate: 'b',
      }) // request body not defined
      .expect(400)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('office').eql('Invalid office, should be an integer');
        expect(res.body).to.have.property('candidate').eql('Invalid candidate, should be an integer');
        if (err) done(err);
        done();
      });
  });
});
