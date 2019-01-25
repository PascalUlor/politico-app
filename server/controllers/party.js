import testdb from '../models/testdb';

const { partydb, userdb } = testdb;

/**
 * Class for /api/routes
 * @class partyController
 */
export default class partyController {
  /**
       * API method to (POST) create a party
       * @param {obj} req
       * @param {obj} res
       * @returns {obj} insertion error messages or success messages
       */
  static createParty(req, res) {
    const {
      name, hqAddress, email, phonenumber, about, logoUrl, userId,
    } = req.body;
    const id = partydb.length + 1;
    const date = new Date();
    const newParty = {
      id, name, hqAddress, email, phonenumber, about, logoUrl, userId, date,
    };
    if (parseInt(req.body.userId, 10) === userdb[0].id) {
      partydb.push({
        newParty,
      });
      res.status(201);
      res.json({
        success: true,
        message: 'Request created successfully',
        data: newParty,
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
 * API method GET all parties
 * @param {obj} req
 * @param {obj} res
 * @returns {obj} success message
 */
  static getAllParty(req, res) {
    if (partydb.length !== 0) {
      if (!req.query.sort) {
        res.status(200);
        res.json({
          success: true,
          message: 'Successfully Retrieved parties',
          data: partydb,
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
