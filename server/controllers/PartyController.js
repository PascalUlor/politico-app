import dotenv from 'dotenv';
import testDb from '../models/testdb';
import databaseQuery from '../models/databaseConnection';
import requestHelper from '../helpers/requestHelper';
import Seed from '../models/Seed';

dotenv.config();

const { databaseConnection } = databaseQuery;
let { partyDb } = testDb;

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
    const userQuery = Seed.partyQuery;
    const params = [name, userId, hqAddress, about, email, phonenumber, logoUrl];
    databaseConnection.query(userQuery, params)
      .then((result) => {
        if (result.rows[0].userid === 1) {
          return res.status(201).json({
            status: 201,
            data: [
              result.rows[0],
            ],
          });
        }
        return res.status(400).json({
          success: false,
          message: 'You are not authorized to create parties',
        });
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
          // return requestHelper.success(res, 200, 'Parties fetched successfully', [result.rows]);
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
