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

const url = '/api/v1/office/';

const invalidID = 50;

describe('Test case for registering candidate', () => {
  it('should create candidate on admins input only', (done) => {
    request.post(`${url}1/register`)
      .set('x-access-token', adminToken)
      .send({
        office: 1,
      }) // request body not defined
      .expect(201)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('data');
        if (err) done(err);
        done();
      });
  });

  it('should return error if user is not admin', (done) => {
    request.post(`${url}1/register`)
      .set('x-access-token', user2Token)
      .send({
        office: 1,
      }) // request body not defined
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
      .set('x-access-token', user2Token)
      .send({
        office: 1,
      }) // request body not defined
      .expect(400)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        if (err) done(err);
        done();
      });
  });
});
