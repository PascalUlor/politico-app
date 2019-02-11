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
const url2 = '/api/v1/office';


describe('Test case for votes and results', () => {
  it('should allow user create votes', (done) => {
    request.post(`${url}`)
      .set('x-access-token', adminToken.data.token)
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
      .set('x-access-token', adminToken.data.token)
      .send({
        office: 'a',
        candidate: 'b',
      }) // request body not defined
      .expect(400)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.data[0]).to.have.property('office').eql('Invalid office, should be an integer');
        expect(res.body.data[0]).to.have.property('candidate').eql('Invalid candidate, should be an integer');
        if (err) done(err);
        done();
      });
  });

  it('should allow logged in user see election results', (done) => {
    request.get(`${url2}/${1}/result`)
      .set('x-access-token', adminToken.data.token)
      .send({})
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        // expect(res.body).to.have.property('data');
        if (err) done(err);
        done();
      });
  });

  it('should return 404 error if there is no result for a particular office', (done) => {
    request.get(`${url2}/${6}/result`)
      .set('x-access-token', adminToken.data.token)
      .send({})
      .expect(404)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.error).to.equal('No result found for this office');
        if (err) done(err);
        done();
      });
  });

  it('should not allow users who are not logged in to access result', (done) => {
    request.get(`${url2}/${1}/result`)
      .set('Content-Type', 'application/json')
      .send({})
      .expect(403)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('Access denied. You are not logged in');
        if (err) done(err);
        done();
      });
  });
});
