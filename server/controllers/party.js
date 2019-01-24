import testdb from '../models/testdb';

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
    const id = testdb.partydb[testdb.partydb.length - 1].id + 1;
    const date = new Date();
    const newParty = {
      id, name, hqAddress, email, phonenumber, about, logoUrl, userId, date,
    };
    if (parseInt(req.body.userId, 10) === testdb.userdb[0].id) {
      testdb.partydb.push({
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
}
