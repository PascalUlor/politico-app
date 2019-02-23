import dotenv from 'dotenv';
import databaseQuery from '../models/databaseConnection';
import requestHelper from '../helpers/requestHelper';
import Seeder from '../models/Seed';

dotenv.config();

const { databaseConnection } = databaseQuery;
const { Seed } = Seeder;


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
          return requestHelper.error(res, 401, 'Authentication failed');
        }
        return databaseConnection.query(userQuery, params)
          .then(newOffice => requestHelper.success(res, 201, 'office created successfully', newOffice.rows[0])
          ).catch(error => requestHelper.error(res, 500, 'Something went wrong', error.message));
      }).catch(error => requestHelper.error(res, 500, 'Something went wrong', error.message));
  }

  /**
 * API method GET all offices
 * @param {obj} req
 * @param {obj} res
 * @returns {obj} success message
 */
  static getAllOffices(req, res) {
    const userQuery = 'SELECT * FROM offices;';
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
        return requestHelper.error(res, 400, 'No Offices');
      }).catch(error => requestHelper.error(res, 500, 'Something went wrong', error.message));
  }

  /**
     * API method to GET a single Office
     * @param {obj} req
     * @param {obj} res
     * @returns {obj} success message
     */
  static getSingleOffice(req, res) {
    const id = parseInt(req.params.id, 10);
    const userQuery = 'SELECT * FROM offices WHERE id = $1 LIMIT 1;';
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
        return requestHelper.error(res, 400, 'Office does not exist');
      }).catch(error => requestHelper.error(res, 500, 'Something went wrong', error.message));
  }// getSingleOffice ends
}
