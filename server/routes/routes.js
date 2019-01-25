import express from 'express';
import partyController from '../controllers/party';
import validation from '../middleware/validations'

const router = express.Router();

router.route('/parties')
  .get(partyController.getAllParty)
  .post(validation.createPartyValidation, partyController.createParty);


export default router;
