import express from 'express';
import PartyController from '../controllers/PartyController';
import validation from '../middleware/AssetValidations';
import OfficeController from '../controllers/OfficeController';

const router = express.Router();

router.route('/parties')
  .get(PartyController.getAllParty)
  .post(validation.createAssetValidation, PartyController.createParty);

router.route('/parties/:id/name')
  .patch(validation.updateAssetValidation, PartyController.updatePartyName);

router.route('/parties/:id')
  .delete(PartyController.deleteParty)
  .get(PartyController.getSingleParty);

router.route('/offices')
  .get(OfficeController.getAllOffices)
  .post(validation.createAssetValidation, OfficeController.createOffice);

router.route('/offices/:id')
  .get(OfficeController.getSingleOffice);

export default router;
