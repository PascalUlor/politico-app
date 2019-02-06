import dotenv from 'dotenv';
import databaseQuery from '../models/databaseConnection';
import seeder from '../models/Seed';

dotenv.config();

const { databaseConnection } = databaseQuery;
const { seedQuery } = seeder;

/**
 * Class for /api/routes
 * @class VoteController
 */
class VoteController {
  /**
    * API method to (POST) to cast vote
    * @param {obj} req
    * @param {obj} res
    * @returns {obj} insertion error messages or success messages
    */
  static async makeVote(req, res) {
    const { office, candidate } = req.body;
    const { userId: voter } = req.decoded;
    const voteStatus = await seedQuery('votes', candidate, voter);
    const candidateStatus = await seedQuery('candidates', candidate, office);
    const userQuery = 'INSERT INTO votes (office, candidate, voter) VALUES($1, $2, $3) RETURNING *';
    const params = [office, candidate, voter];
    if (voteStatus.rowCount > 0) {
      return res.status(400).json({
        status: 400,
        error: 'You have already voted for this candidate',
      });
    }
    if (candidateStatus.rowCount < 1) {
      return res.status(400).json({
        status: 400,
        error: 'Candidate is not running for this office',
      });
    }
    try {
      const { rows } = await databaseConnection.query(userQuery, params);
      return res.status(201).json({
        status: 201,
        data: [rows[0]],
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.toString()
        // : 'Something went wrong with the database',
      });
    }
  }
}
export default VoteController;
