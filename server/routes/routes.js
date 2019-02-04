import express from 'express';
import PartyController from '../controllers/PartyController';
import validation from '../middleware/AssetValidations';
import OfficeController from '../controllers/OfficeController';
import userController from '../controllers/UserController';
import verify from '../middleware/UserValidation';
import AuthenticateToken from '../middleware/AuthenticateToken';

const router = express.Router();

router.route('/parties')
  .get(PartyController.getAllParty)
  .post(AuthenticateToken, validation.createAssetValidation, PartyController.createParty);

router.route('/parties/:id/name')
  .patch(AuthenticateToken, validation.updateAssetValidation, PartyController.updatePartyName);

router.route('/parties/:id')
  .delete(PartyController.deleteParty)
  .get(PartyController.getSingleParty);

router.route('/offices')
  .get(OfficeController.getAllOffices)
  .post(validation.createAssetValidation, OfficeController.createOffice);

router.route('/offices/:id')
  .get(OfficeController.getSingleOffice);

router.route('/auth/signup')
  .post(verify.userInput, userController.userSignup);
router.route('/auth/login')
  .post(userController.userLogin);

export default router;
