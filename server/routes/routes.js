import express from 'express';
import partyController from '../controllers/party';

const router = express.Router();

router.route('/parties')
  .post(partyController.createParty);


export default router;
