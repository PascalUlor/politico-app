import express from 'express';
import partyController from '../controllers/party';
import validation from '../middleware/validations';
import officeController from '../controllers/office';

const router = express.Router();

router.route('/parties')
  .get(partyController.getAllParty)
  .post(validation.createAssetValidation, partyController.createParty);

router.route('/parties/:id/name')
  .patch(partyController.updatePartyName);

router.route('/parties/:id')
  .delete(partyController.deleteParty)
  .get(partyController.getSingleParty);

router.route('/offices')
  .get(officeController.getAllOffices)
  .post(validation.createAssetValidation, officeController.createOffice);

export default router;
