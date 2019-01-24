import express from 'express';
import partyController from '../controllers/party';
import validation from '../middleware/validations'

const router = express.Router();

router.route('/parties')
  .post(validation.createPartyValidation, partyController.createParty);


export default router;
