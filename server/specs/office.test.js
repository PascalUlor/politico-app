/**
 * Test for dummy data API endpoints
 */
import supertest from 'supertest';
import chai from 'chai';
import app from '../../app';
import testDb from '../models/testDb';

const { expect } = chai;

const { officeDb } = testDb;

const request = supertest(app);

const url = '/api/v1/offices/';

const invalidID = 50;


describe('All test cases for POSTing an office', () => {
  describe('Negative test cases for posting an office', () => {
    it('should return `400` status code with for undefined requests', (done) => {
      request.post(url)
        .set('Content-Type', 'application/json')
        .send({}) // request body not defined
        .expect(422)
        .end((err, res) => {
          expect(res.body.name).to.eql('name field is undefined');
          expect(res.body.type).to.eql('type field is undefined');
          expect(res.body.userId).to.eql('userId field is undefined');
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('should return `400` status code with error messages if input is invalid', (done) => {
      request.post(url)
        .set('Content-Type', 'application/json')
        .send({
          userId: 'string',
          name: 'A23',
          type: 'ap2',
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body).to.have.property('userId').eql('Invalid userId');
          expect(res.body).to.have.property('type').eql('type can only be alphabetical');
          expect(res.body).to.have.property('name').eql('name can only be alphabetical');
          done();
        });
    });

    it('should return `400` status code with error messages if userId !== 1', (done) => {
      request.post(url)
        .set('Content-Type', 'application/json')
        .send({
          userId: '2',
          name: 'APP',
          type: 'abcde',
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body.success).to.eql(false);
          expect(res.body.message).to.eql('You are not authorized to create offices');
          done();
        });
    });
  });

  describe('Positive test case for adding an office', () => {
    it('should return `201` status code with success messages for successfull post', (done) => {
      request.post(url)
        .set('Content-Type', 'application/json')
        .send({
          userId: '1',
          name: 'APP',
          type: 'Epicroad',
        })
        .expect(201)
        .end((err, res) => {
          expect(res.body.success).to.eql(true);
          expect(res.body.message).to.eql('Office created successfully');
          expect(res.body.data).to.have.property('id').eql(officeDb[officeDb.length - 1].id);
          expect(res.body.data).to.have.property('name').eql(officeDb[officeDb.length - 1].name);
          expect(res.body.data).to.have.property('type').eql(officeDb[officeDb.length - 1].type);
          done();
        });
    });
  });
});// End of Add request test


describe('test cases to Get request for logged in user', () => {
  it('should return `200` status code with `res.body` success message', (done) => {
    request.get(url)
      .set('Content-Type', 'application/json')
      .send({})
      .expect(200)
      .end((err, res) => {
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Offices fetched successfully');
        done();
      });
  });

  it('should return `200` status code with `res.body` success message for single party', (done) => {
    request.get(`${url}${2}`)
      .set('Content-Type', 'application/json')
      .send({})
      .expect(200)
      .end((err, res) => {
        expect(res.body.success).to.equal(true);
        expect(res.body.message).to.equal('Office fetched successfully');
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
        expect(res.body.message).to.equal('Office does not exist');
        done();
      });
  });
});
