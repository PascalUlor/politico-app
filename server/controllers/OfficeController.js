import testDb from '../models/testDb';

const { officeDb } = testDb;
const { userDb } = testDb;

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
      name, type, userId,
    } = req.body;
    let newOfficeId;

    if (officeDb.length === 0) {
      newOfficeId = 1;
    } else {
      newOfficeId = (officeDb[officeDb.length - 1].id) + 1;
    }
    const id = newOfficeId;
    const date = new Date();

    if (parseInt(req.body.userId, 10) === userDb[0].id) {
      officeDb.push({
        id, name, type, userId, date,
      });
      res.status(201);
      res.json({
        success: true,
        message: 'Office created successfully',
        data: officeDb[officeDb.length - 1],
      });
    } else {
      res.status(400);
      res.json({
        success: false,
        message: 'You are not authorized to create offices',
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
