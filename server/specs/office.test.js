/**
 * Test for dummy data API endpoints
 */
import supertest from 'supertest';
import chai from 'chai';
import app from '../../app';

const { expect } = chai;

const request = supertest(app);

const url = '/api/v1/offices/';

const invalidID = 50;
const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImZ1bGxOYW1lIjoiUGFzY2FsIFVsb3IiLCJlbWFpbCI6InBhc2NhbEBhbmRlbGEuY29tIiwiaXNfYWRtaW4iOnRydWUsImlhdCI6MTU0OTQyMTcwNCwiZXhwIjoxNTU0NjA1NzA0fQ.Oeic4DhH0LO6XWso6r8DA4E8TKvyedvPRvSrWXi7wIM';
const user2Token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImZ1bGxOYW1lIjoiQmFycnkgQWxsZW4iLCJlbWFpbCI6ImRwcGFzY2FsQGFuZGVsYS5jb20iLCJpc19hZG1pbiI6ZmFsc2UsImlhdCI6MTU0OTQyMTU2NywiZXhwIjoxNTU0NjA1NTY3fQ.b5oG9bQ68sK661cfFsVw-GHeaq0DBBDIAVnsity-3Is';


describe('All test cases for POSTing an office', () => {
  describe('Negative test cases for posting an office', () => {
    it('should return `400` status code with for undefined requests', (done) => {
      request.post(url)
        .set('x-access-token', adminToken)
        .send({})
        .expect(422)
        .end((err, res) => {
          expect(res.body.name).to.eql('name field is undefined');
          expect(res.body.type).to.eql('type field is undefined');
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('should return `400` status code with error messages if input is invalid', (done) => {
      request.post(url)
        .set('x-access-token', adminToken)
        .send({
          name: 'A23',
          type: 'ap2',
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('type').eql('type can only be alphabetical');
          expect(res.body).to.have.property('name').eql('name can only be alphabetical');
          done();
        });
    });

    it('should return `400` status code with error messages if none admin user', (done) => {
      request.post(url)
        .set('x-access-token', user2Token)
        .send({
          name: 'APP',
          type: 'abcde',
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body.success).to.eql(false);
          expect(res.body.errors).to.eql('Authentication failed. Token is invalid or expired');
          done();
        });
    });
  });

  describe('Positive test case for adding an office', () => {
    it('should return `201` status code with success messages for successfull post', (done) => {
      request.post(url)
        .set('x-access-token', adminToken)
        .send({
          name: 'APP',
          type: 'Epicroad',
        })
        .expect(201)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('data');
          done();
        });
    });
  });
});// End of Add request test


describe('test cases to Get offices for logged in user', () => {
  it('should return `200` status code with `res.body` success message', (done) => {
    request.get(url)
      .set('Content-Type', 'application/json')
      .send({})
      .expect(200)
      .end((err, res) => {
        expect(res.body.status).to.equal(200);
        expect(res.body).to.have.property('data');
        done();
      });
  });

  it('should return `200` status code with `res.body` success message for single party', (done) => {
    request.get(`${url}${2}`)
      .set('Content-Type', 'application/json')
      .send({})
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('data');
        done();
      });
  });

  it('should return `400` status code with `res.body` message for invalid party id', (done) => {
    request.get(`${url}${invalidID}`)
      .set('Content-Type', 'application/json')
      .send({})
      .expect(200)
      .end((err, res) => {
        expect(res.body.success).to.equal(false);
        expect(res.body.errors).to.equal('Office does not exist');
        done();
      });
  });
});
