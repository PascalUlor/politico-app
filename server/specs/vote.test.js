/**
 * Test for API endpoints
 */
import supertest from 'supertest';
import chai from 'chai';
import app from '../../app';

const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImZ1bGxOYW1lIjoiUGFzY2FsIFVsb3IiLCJlbWFpbCI6InBhc2NhbEBhbmRlbGEuY29tIiwiaXNfYWRtaW4iOnRydWUsImlhdCI6MTU0OTQyMTcwNCwiZXhwIjoxNTU0NjA1NzA0fQ.Oeic4DhH0LO6XWso6r8DA4E8TKvyedvPRvSrWXi7wIM';
const user2Token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImZ1bGxOYW1lIjoiQmFycnkgQWxsZW4iLCJlbWFpbCI6ImRwcGFzY2FsQGFuZGVsYS5jb20iLCJpc19hZG1pbiI6ZmFsc2UsImlhdCI6MTU0OTQyMTU2NywiZXhwIjoxNTU0NjA1NTY3fQ.b5oG9bQ68sK661cfFsVw-GHeaq0DBBDIAVnsity-3Is';

const { expect } = chai;
const request = supertest(app);

const url = '/api/v1/votes/';


describe('Test case for creating vote', () => {
  it('should allow user create votes', (done) => {
    request.post(`${url}`)
      .set('x-access-token', adminToken)
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
      .set('x-access-token', user2Token)
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
