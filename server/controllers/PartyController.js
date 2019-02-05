import dotenv from 'dotenv';
import testDb from '../models/testdb';
import databaseQuery from '../models/databaseConnection';
import requestHelper from '../helpers/requestHelper';
import Seed from '../models/Seed';

dotenv.config();

const { databaseConnection } = databaseQuery;
const { partyDb } = testDb;

/**
 * Class for /api/routes
 * @class partyController
 */
export default class PartyController {
  /**
       * API method to (POST) create a party
       * @param {obj} req
       * @param {obj} res
       * @returns {obj} insertion error messages or success messages
       */
  static createParty(req, res) {
    const {
      name, hqAddress, email, phonenumber, about, logoUrl,
    } = req.body;
    const { userId } = req.decoded;
    const checkId = 'SELECT * FROM users WHERE id = 1 LIMIT 1';
    const userQuery = Seed.partyQuery;
    const params = [name, userId, hqAddress, about, email, phonenumber, logoUrl];
    databaseConnection.query(checkId)
      // eslint-disable-next-line consistent-return
      .then((result) => {
        if (userId !== result.rows[0].id) {
          return requestHelper.error(res, 401, 'Authentication failed. Token is invalid or expired');
        }
        return databaseConnection.query(userQuery, params)
          .then(newParty => res.status(201).json({
            status: 201,
            data: [
              newParty.rows[0],
            ],
          })).catch(error => requestHelper.error(res, 500, error.message));
      }).catch(error => requestHelper.error(res, 500, error.message));
  }

  /**
 * API method GET all parties
 * @param {obj} req
 * @param {obj} res
 * @returns {obj} success message
 */
  static getAllParty(req, res) {
    const userQuery = 'SELECT * FROM parties;';
    databaseConnection.query(userQuery)
      .then((result) => {
        if (result.rows.length > 0) {
          return res.status(200).json({
            status: 200,
            data: [
              result.rows,
            ],
          });
        }
        return requestHelper.error(res, 400, 'No party available');
      }).catch(error => requestHelper.error(res, 500, error.toString()));
  }

  /**
     * API method to GET a single party
     * @param {obj} req
     * @param {obj} res
     * @returns {obj} success message
     */
  static getSingleParty(req, res) {
    const id = parseInt(req.params.id, 10);
    const userQuery = 'SELECT * FROM parties WHERE id = $1 LIMIT 1;';
    const value = [id];
    databaseConnection.query(userQuery, value)
      .then((result) => {
        if (result.rows[0]) {
          return res.status(200).json({
            status: 200,
            data: [
              result.rows[0],
            ],
          });
        }
        return requestHelper.error(res, 400, 'Party does not exist');
      }).catch(error => requestHelper.error(res, 500, error.toString()));
  }// getSingleParty ends

  /**
 * API method to (PUT) update a Political Party
 * @param {obj} req
 * @param {obj} res
 * @returns {obj} with success or error message
 */
  static updatePartyName(req, res) {
    const { name } = req.body;
    const { userId } = req.decoded;
    const id = parseInt(req.params.id, 10);
    const checkId = 'SELECT * FROM parties WHERE id = $1 LIMIT 1;';
    const value = [id];
    const userQuery = 'UPDATE parties SET name = $1 WHERE id = $2 RETURNING *';
    const params = [name, id];
    databaseConnection.query(checkId, value)
      .then((result) => {
        if (!result.rows[0]) {
          return requestHelper.error(res, 400, 'Party does not exist');
        } if (userId !== result.rows[0].userid) {
          return requestHelper.error(res, 400, 'Access Denied. You are not authorized');
        }
        return databaseConnection.query(userQuery, params)
          .then(update => requestHelper.success(res, 200, 'Party updated successfully', update.rows[0]))
          .catch(error => requestHelper.error(res, 500, error.toString()));
      }).catch(error => requestHelper.error(res, 500, error.toString()));
  } // Method to Update party name ends

  /**
 * API method to DELETE a political party
 * @param {obj} req
 * @param {obj} res
 * @returns {obj} insert success message
 */
  static deleteParty(req, res) {
    const { userId } = req.decoded;
    const id = parseInt(req.params.id, 10);
    const userQuery = 'DELETE FROM parties WHERE id = $1';
    const checkUser = 'SELECT * FROM parties WHERE id = $1 LIMIT 1;';
    const value = [id];
    databaseConnection.query(checkUser, value)
      .then((result) => {
        if (!result.rows[0]) {
          return requestHelper.error(res, 400, 'Party does not exist');
        } if (userId !== result.rows[0].userid) {
          return requestHelper.error(res, 400, 'Access Denied. You are not authorized');
        }
        return databaseConnection.query(userQuery, value)
          .then(() => requestHelper.success(res, 200, 'Party successfully deleted'))
          .catch(error => requestHelper.error(res, 500, error.toString()));
      }).catch(error => requestHelper.error(res, 500, error.toString()));
  }
}
