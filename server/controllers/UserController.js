import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import requestHelper from '../helpers/requestHelper';
import databaseQuery from '../models/databaseConnection';
import createToken from '../helpers/createToken';

dotenv.config();


const { databaseConnection } = databaseQuery;

/**
 * Class for /api/routes
 * @class UserController
 */
export default class UserController {
  /**
     * API method to signup user
     * @param {obj} req
     * @param {obj} res
     * @returns {obj} success message
     */
  static userSignup(req, res) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      const {
        firstName, lastName, otherName, email, phonenumber, passportUrl,
      } = req.body;
      const password = hash;
      const userQuery = 'INSERT INTO users (firstName, lastName, otherName, email, phonenumber, passportUrl, password) VALUES ($1, $2, $3, $4, $5, $6, $7) returning *';
      const params = [firstName, lastName, otherName, email, phonenumber, passportUrl, password];
      databaseConnection.query(userQuery, params)
        .then(result => (createToken(
          res, 201,
          'Signup successfull', result,
        ))).catch(error => requestHelper.error(res, 500, error.message));
    });
  }
}
