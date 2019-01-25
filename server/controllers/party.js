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

  /**
 * API method to (PUT) update a Political Party
 * @param {obj} req
 * @param {obj} res
 * @returns {obj} with success or error message
 */
  static updatePartyName(req, res) {
    const { name } = req.body;
    const index = parseInt(req.params.id, 10);
    const findparty = partydb.find(party => party.id === index);
    if (findparty) {
      partydb[index - 1].name = name || partydb[index - 1].name;
      return res.status(200).json({
        success: true,
        message: `Party with id ${index} successfully updated`,
        data: partydb[index - 1],
      });
    }
    return res.status(400).json({
      success: false,
      message: `Party with id ${index} does not exist`,
    });
  } // Method to Update party name ends
}
