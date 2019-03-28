import dotenv from 'dotenv';
import databaseQuery from '../models/databaseConnection';

dotenv.config();

const { databaseConnection } = databaseQuery;

/**
 * Class for /api/routes
 * @class ElectionController
 */
export default class ElectionController {
  /**
         * API method to GET Election ressults
         * @param {obj} req
         * @param {obj} res
         * @returns {obj} success message
         */
  // eslint-disable-next-line consistent-return
  static async getElectionResult(req, res) {
    const { id: postId } = req.params;
    const query = `SELECT offices.id office_id, offices.name office_name,
                          users.firstName candidate_name, users.id candidate_id,
                          count(candidate) as election_results
                          FROM votes
                          INNER JOIN users on users.id = votes.candidate
                          INNER JOIN offices on offices.id = votes.office
                          WHERE offices.id = $1 GROUP BY candidate_id, office_id
                          `;
    try {
      // eslint-disable-next-line consistent-return
      await databaseConnection.query(query, [postId], (err, result) => {
        if (result.rowCount > 0) {
          return res.status(200).json({
            status: 200,
            data: result.rows,
          });
        }
        return res.status(404).json({
          status: 404,
          error: 'No result found for this office',
        });
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Something went wrong',
      });
    }
  }
}
