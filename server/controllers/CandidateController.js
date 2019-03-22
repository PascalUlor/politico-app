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
       * API method to (POST) Apply as candidate
       * @param {obj} req
       * @param {obj} res
       * @returns {obj} insertion error messages or success messages
       */
  static candidateApplication(req, res) {
    const { office, party } = req.body;
    const id = parseInt(req.params.id, 10);
    const candidate = 'SELECT * FROM candidates WHERE candidate = $1 LIMIT 1;';
    const values = [id];
    const userQuery = 'INSERT INTO candidates (office, party, candidate) VALUES ($1, $2, $3) RETURNING *';
    const params = [office, party, id];
    const { userId } = req.decoded;
    if (userId === id) {
      return databaseConnection.query(candidate, values)
        .then((result) => {
          if (result.rows[0]) {
            return requestHelper.error(res, 400, 'Not Allowed. You are already applied for an office');
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

  /**
       * API method to (POST) register as candidate
       * @param {obj} req
       * @param {obj} res
       * @returns {obj} insertion error messages or success messages
       */
  static registerCandidate(req, res) {
    // const { registered } = req.body;
    const id = parseInt(req.params.id, 10);
    const candidate = 'SELECT * FROM candidates WHERE candidate = $1 LIMIT 1;';
    const values = [id];
    const userQuery = 'UPDATE candidates SET registered = true WHERE id = $1 RETURNING *';
    const params = [id];
    const payload = req.decoded;
    // eslint-disable-next-line camelcase
    const { isAdmin } = payload;
    // eslint-disable-next-line camelcase
    if (payload && isAdmin === true) {
      return databaseConnection.query(candidate, values)
        .then((result) => {
          if (result.rows[0].registered === true) {
            return requestHelper.error(res, 400, 'Not Allowed. Candidate is already registered for an office');
          }
          return databaseConnection.query(userQuery, params)
            .then(newCandidate => res.status(200).json({
              status: 200,
              data: [
                newCandidate.rows[0],
              ],
            }));
        }).catch(error => requestHelper.error(res, 500, 'Candidate is does not exist', error.message));
    } return res.status(400).json({
      status: 400,
      error: 'You are not authorized to access this route',
    });
  }
}
