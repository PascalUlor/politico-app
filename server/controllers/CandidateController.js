import dotenv from 'dotenv';
import databaseQuery from '../models/databaseConnection';
import requestHelper from '../helpers/requestHelper';

dotenv.config();

const { databaseConnection } = databaseQuery;

/**
 * Class for /api/routes
 * @class CandidateController
 */

export default class CandidateController {
  /**
       * API method to (POST) register as candidate
       * @param {obj} req
       * @param {obj} res
       * @returns {obj} insertion error messages or success messages
       */
  static registerCandidate(req, res) {
    const { office } = req.body;
    const id = parseInt(req.params.id, 10);
    const candidate = 'SELECT * FROM candidates WHERE id = $1 LIMIT 1;';
    const values = [id];
    const userQuery = 'INSERT INTO candidates (office, candidate) VALUES ($1, $2) RETURNING *';
    const params = [office, id];
    const payload = req.decoded;
    // eslint-disable-next-line camelcase
    const { isAdmin } = payload;
    // eslint-disable-next-line camelcase
    if (payload && isAdmin === true) {
      return databaseConnection.query(candidate, values)
        .then((result) => {
          if (result.rows[0]) {
            return requestHelper.error(res, 400, 'Candidate is currently running for an office');
          }
          return databaseConnection.query(userQuery, params)
            .then(newCandidate => res.status(201).json({
              status: 201,
              data: [
                newCandidate.rows[0],
              ],
            }));
        }).catch(error => requestHelper.error(res, 500, 'Something went wrong', error.message));
    } return res.status(400).json({
      status: 400,
      error: 'You are not authorized to access this route',
    });
  }
}
