import express from 'express';
import PartyController from '../controllers/PartyController';
import validation from '../middleware/AssetValidations';
import OfficeController from '../controllers/OfficeController';
import userController from '../controllers/UserController';
import verify from '../middleware/UserValidation';
import AuthenticateToken from '../middleware/AuthenticateToken';
import CandidateController from '../controllers/CandidateController';
import Vote from '../controllers/VoteController';
import ElectionResult from '../controllers/ElectionController';
import upload from '../config/fileloader';

const router = express.Router();

router.route('/parties')
  .get(PartyController.getAllParty)
  .post(upload.single('logoUrl'), AuthenticateToken, validation.createAssetValidation, PartyController.createParty);

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
  .post(upload.single('passportUrl'), verify.userInput, userController.userSignup);
router.route('/auth/login')
  .post(userController.userLogin);
router.route('/auth/forgotpassword')
  .post(userController.passwordReset);
router.route('/auth/resetpassword')
  .patch(AuthenticateToken, userController.newPassword);

router.route('/office/:id/register')
  .patch(AuthenticateToken, validation.voteAssetValidation, CandidateController.registerCandidate);

router.route('/office/:id/apply')
  .post(AuthenticateToken,
    validation.voteAssetValidation,
    CandidateController.candidateApplication);


router.route('/votes/')
  .post(AuthenticateToken, validation.voteAssetValidation, Vote.makeVote);

router.route('/office/:id/result')
  .get(AuthenticateToken, ElectionResult.getElectionResult);

router.route('/admin/:id/true')
  .put(AuthenticateToken, (req, res) => userController.userRole(req, res, 'true'));

export default router;
