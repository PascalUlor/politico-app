import testDb from '../models/testDb';


let { partyDb } = testDb;
const { userDb } = testDb;
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
      name, hqAddress, email, phonenumber, about, logoUrl, userId,
    } = req.body;
    let newPartyId;

    if (partyDb.length === 0) {
      newPartyId = 1;
    } else {
      newPartyId = (partyDb[partyDb.length - 1].id) + 1;
    }
    const id = newPartyId;
    const date = new Date();

    if (parseInt(req.body.userId, 10) === userDb[0].id) {
      partyDb.push({
        id, name, hqAddress, email, phonenumber, about, logoUrl, userId, date,
      });
      return res.status(201).json({
        success: true,
        message: 'Party created successfully',
        data: partyDb[partyDb.length - 1],
      });
    }
    return res.status(400).json({
      success: false,
      message: 'You are not authorized to create parties',
    });
  }

  /**
 * API method GET all parties
 * @param {obj} req
 * @param {obj} res
 * @returns {obj} success message
 */
  static getAllParty(req, res) {
    if (partyDb.length !== 0) {
      if (!req.query.sort) {
        res.status(200);
        res.json({
          success: true,
          message: 'Parties fetched successfully',
          data: partyDb,
        });
      }
    } else {
      res.status(404);
      res.json({
        success: false,
        message: 'No party available',
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
    const findParty = partyDb.find(party => party.id === index);
    if (findParty) {
      return res.status(200).json({
        success: true,
        message: 'Party fetched successfully',
        data: findParty,
      });
    }
    return res.status(400).json({
      success: false,
      message: 'Party does not exist',
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
    const findparty = partyDb.find(party => party.id === index);
    if (findparty) {
      Object.assign(findparty, { name });
      return res.status(200).json({
        success: true,
        message: 'Party updated successfully',
        data: findparty,
      });
    }
    return res.status(400).json({
      success: false,
      message: 'Party does not exist',
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
    const findParty = partyDb.find(party => party.id === index);
    if (findParty) {
      const newPartyList = partyDb.filter(party => party.id !== index);
      partyDb = newPartyList;
      res.status(200);
      res.json({
        success: true,
        message: 'Party successfully deleted',
      });
    } else {
      res.status(400);
      res.json({
        success: false,
        message: 'Party does not exist',
      });
    }
  }
}
