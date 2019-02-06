import express from 'express';
import PartyController from '../controllers/PartyController';
import validation from '../middleware/AssetValidations';
import OfficeController from '../controllers/OfficeController';
import userController from '../controllers/UserController';
import verify from '../middleware/UserValidation';
import AuthenticateToken from '../middleware/AuthenticateToken';
import CandidateController from '../controllers/CandidateController';
import Vote from '../controllers/VoteController';

const router = express.Router();

router.route('/parties')
  .get(PartyController.getAllParty)
  .post(AuthenticateToken, validation.createAssetValidation, PartyController.createParty);

router.route('/parties/:id/name')
  .patch(AuthenticateToken, validation.updateAssetValidation, PartyController.updatePartyName);

router.route('/parties/:id')
  .delete(AuthenticateToken, PartyController.deleteParty)
  .get(PartyController.getSingleParty);

router.route('/offices')
  .get(OfficeController.getAllOffices)
  .post(AuthenticateToken, validation.createAssetValidation, OfficeController.createOffice);

router.route('/offices/:id')
  .get(OfficeController.getSingleOffice);

router.route('/auth/signup')
  .post(verify.userInput, userController.userSignup);
router.route('/auth/login')
  .post(userController.userLogin);

router.route('/office/:id/register')
  .post(AuthenticateToken, validation.voteAssetValidation, CandidateController.registerCandidate);

router.route('/votes/')
  .post(AuthenticateToken, validation.voteAssetValidation, Vote.makeVote);

export default router;
