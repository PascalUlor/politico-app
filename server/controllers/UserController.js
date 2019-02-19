import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import requestHelper from '../helpers/requestHelper';
import databaseQuery from '../models/databaseConnection';
import createToken from '../helpers/createToken';
import winston from '../config/winston';

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
        email, phonenumber, passportUrl,
      } = req.body;
      const password = hash;
      const firstName = req.body.firstName.trim();
      const lastName = req.body.lastName.trim();
      const otherName = req.body.otherName.trim();
      const userQuery = 'INSERT INTO users (firstName, lastName, otherName, email, phonenumber, passportUrl, password) VALUES ($1, $2, $3, $4, $5, $6, $7) returning *';
      const params = [firstName, lastName, otherName, email, phonenumber, passportUrl, password];
      databaseConnection.query(userQuery, params)
        .then(result => (createToken(
          res, 201,
          'Signup successfull', result,
        // eslint-disable-next-line consistent-return
        ))).catch((error) => {
          if (error.routine === '_bt_check_unique') {
            return requestHelper.error(res, 409, 'User with phonenumber already exists');
          }
          return requestHelper.error(res, 500, 'Something went wrong', error.message);
        });
    });
  }

  /**
       * API method for user login
       * @param {obj} req
       * @param {obj} res
       * @returns {obj} success message
       */
  static userLogin(req, res) {
    const { email, password } = req.body;
    const errors = { form: 'Invalid email or password' };
    const userQuery = 'SELECT * FROM users WHERE email = $1 LIMIT 1;';
    const params = [email];
    databaseConnection.query(userQuery, params)
      .then((result) => {
        if (result.rows[0]) {
          winston.info(result.rows[0]);
          winston.info('====================');
          const getPassword = bcrypt.compareSync(password, result.rows[0].password);
          if (getPassword) {
            return createToken(res, 200, 'User login Successfull', result);
          }
          return res.status(401).json({
            success: false,
            errors,
          });
        }
        return requestHelper.error(res, 401, errors);
      }).catch(error => requestHelper.error(res, 500, 'Something went wrong', error.message));
  }

  /**
 * API method to update user role to admin
 * @param {obj} req
 * @param {obj} res
 * @param {obj} newStatus
 * @returns {obj} success message
 */
  static userRole(req, res, newRole) {
    const id = parseInt(req.params.id, 10);
    const checkId = 'SELECT * FROM users WHERE id = 1 LIMIT 1';
    const { userId } = req.decoded;
    const userQuery = 'UPDATE users SET isAdmin = $1 WHERE id = $2 returning *';
    const params = [newRole, id];

    databaseConnection.query(checkId)
      .then((result) => {
        if (userId !== result.rows[0].id) {
          return requestHelper.error(res, 401, 'Authentication failed');
        }
        return databaseConnection.query(userQuery, params)
          .then(state => res.status(201).json({
            status: 200,
            data: [{
              id: state.rows[0].id,
              firstName: state.rows[0].firstname,
              email: state.rows[0].email,
              isAdmin: state.rows[0].isadmin,
            }],
          }))
          .catch(error => requestHelper.error(res, 500, 'Something went wrong', error.message));
      }).catch(error => requestHelper.error(res, 500, 'Something went wrong', error.message));
  }
}
