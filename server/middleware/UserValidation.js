import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import checkItem from '../helpers/checkInput';
import databaseQuery from '../models/databaseConnection';

const { databaseConnection } = databaseQuery;


dotenv.config();

/**
 * Validates all routes
 * @class Validator
 */
export default class userValidation {
  /**
     * Validates all user details
     * @param {obj} req
     * @param {obj} res
     * @param {obj} next
     * @returns {obj} Validation error messages or contents of req.body
     */
  static userInput(req, res, next) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      }
      const {
        firstName, lastName, otherName, email, phonenumber, passportUrl, password = hash,
      } = req.body;
      const userEmail = {
        text: 'SELECT * FROM users WHERE email = $1;',
        values: [req.body.email],
      };
      return databaseConnection.query(userEmail, (error, result) => {
        if (result.rows[0]) {
          return res.status(409).json({
            success: false,
            message: 'User with email already exist',
          });
        }

        const check = checkItem({
          firstName, lastName, otherName, email, phonenumber, passportUrl, password,
        });
        if (Object.keys(check).length > 0) {
          return res.status(400).json(check);
        } return next();
      });
    });
  }
}
