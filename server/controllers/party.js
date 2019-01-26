import testdb from '../models/testdb';

let { partydb } = testdb;
const { userdb } = testdb;
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
    let newPartyId;

    if (partydb.length === 0) {
      newPartyId = 1;
    } else {
      newPartyId = (partydb[partydb.length - 1].id) + 1;
    }
    const id = newPartyId;
    const date = new Date();

    if (parseInt(req.body.userId, 10) === userdb[0].id) {
      partydb.push({
        id, name, hqAddress, email, phonenumber, about, logoUrl, userId, date,
      });
      res.status(201);
      res.json({
        success: true,
        message: 'Request created successfully',
        data: partydb[partydb.length - 1],
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
     * API method to GET a single party
     * @param {obj} req
     * @param {obj} res
     * @returns {obj} success message
     */
  static getSingleParty(req, res) {
    const index = parseInt(req.params.id, 10);
    const findParty = partydb.find(party => party.id === index);
    if (findParty) {
      return res.status(200).json({
        success: true,
        message: 'Successfully Retrieved Request',
        data: findParty,
      });
    }
    return res.status(400).json({
      success: false,
      message: 'Request does not exist',
    });
  }// getSingleParty ends

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
      Object.assign(findparty, { name });
      return res.status(200).json({
        success: true,
        message: `Party with id ${index} successfully updated`,
        data: findparty,
      });
    }
    return res.status(400).json({
      success: false,
      message: `Party with id ${index} does not exist`,
    });
  } // Method to Update party name ends

  /**
 * API method to DELETE a political party
 * @param {obj} req
 * @param {obj} res
 * @returns {obj} insert success message
 */
  static deleteParty(req, res) {
    const index = parseInt(req.params.id, 10);
    const findParty = partydb.find(party => party.id === index);
    if (findParty) {
      const newPartyList = partydb.filter(party => party.id !== index);
      partydb = newPartyList;
      res.status(200);
      res.json({
        success: true,
        message: 'Party successfully deleted',
        data: partydb,
      });
    } else {
      res.status(400);
      res.json({
        success: false,
        message: `Party with id ${index}does not exist`,
      });
    }
  }
}
