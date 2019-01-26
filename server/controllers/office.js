import testdb from '../models/testdb';

const { officedb } = testdb;
const { userdb } = testdb;

/**
 * Class for /api/routes
 * @class officeController
 */
export default class officeController {
  /**
       * API method to (POST) create a office
       * @param {obj} req
       * @param {obj} res
       * @returns {obj} insertion error messages or success messages
       */
  static createOffice(req, res) {
    const {
      name, type, userId,
    } = req.body;
    let newOfficeId;

    if (officedb.length === 0) {
      newOfficeId = 1;
    } else {
      newOfficeId = (officedb[officedb.length - 1].id) + 1;
    }
    const id = newOfficeId;
    const date = new Date();

    if (parseInt(req.body.userId, 10) === userdb[0].id) {
      officedb.push({
        id, name, type, userId, date,
      });
      res.status(201);
      res.json({
        success: true,
        message: 'Request created successfully',
        data: officedb[officedb.length - 1],
      });
    } else {
      res.status(400);
      res.json({
        success: false,
        message: 'You are not authorized to create parties',
      });
    }
  }

  /**
 * API method GET all offices
 * @param {obj} req
 * @param {obj} res
 * @returns {obj} success message
 */
  static getAllOffices(req, res) {
    if (officedb.length !== 0) {
      if (!req.query.sort) {
        res.status(200);
        res.json({
          success: true,
          message: 'Successfully Retrieved parties',
          data: officedb,
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
}
