import dotenv from 'dotenv';
import databaseQuery from '../models/databaseConnection';
import requestHelper from '../helpers/requestHelper';
import Seed from '../models/Seed';
import testDb from '../models/testDb';

dotenv.config();

const { databaseConnection } = databaseQuery;


const { officeDb } = testDb;

/**
 * Class for /api/routes
 * @class OfficeController
 */
export default class OfficeController {
  /**
       * API method to (POST) create a office
       * @param {obj} req
       * @param {obj} res
       * @returns {obj} insertion error messages or success messages
       */
  static createOffice(req, res) {
    const {
      name, type,
    } = req.body;
    const { userId } = req.decoded;
    const checkId = 'SELECT * FROM users WHERE id = 1 LIMIT 1';
    const userQuery = Seed.officeQuery;
    const params = [name, userId, type];
    databaseConnection.query(checkId)
      // eslint-disable-next-line consistent-return
      .then((result) => {
        if (userId !== result.rows[0].id) {
          return requestHelper.error(res, 401, 'Authentication failed. Token is invalid or expired');
        }
        return databaseConnection.query(userQuery, params)
          .then(newOffice => res.status(201).json({
            status: 201,
            data: [
              newOffice.rows[0],
            ],
          })).catch(error => requestHelper.error(res, 500, error.message));
      }).catch(error => requestHelper.error(res, 500, error.message));
  }

  /**
 * API method GET all offices
 * @param {obj} req
 * @param {obj} res
 * @returns {obj} success message
 */
  static getAllOffices(req, res) {
    if (officeDb.length !== 0) {
      if (!req.query.sort) {
        res.status(200);
        res.json({
          success: true,
          message: 'Offices fetched successfully',
          data: officeDb,
        });
      }
    } else {
      res.status(404);
      res.json({
        success: false,
        message: 'No party',
      });
    }
  }

  /**
     * API method to GET a single Office
     * @param {obj} req
     * @param {obj} res
     * @returns {obj} success message
     */
  static getSingleOffice(req, res) {
    const index = parseInt(req.params.id, 10);
    const findOffice = officeDb.find(office => office.id === index);
    if (findOffice) {
      return res.status(200).json({
        success: true,
        message: 'Office fetched successfully',
        data: findOffice,
      });
    }
    return res.status(400).json({
      success: false,
      message: 'Office does not exist',
    });
  }// getSingleOfficet ends
}
