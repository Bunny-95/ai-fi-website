import express from 'express';
import { registerGFG, registerHackathon, registerMasterclass } from '../controllers/registrationController.js';

const router = express.Router();

router.post('/register-gfg', registerGFG);
router.post('/register-hackathon', registerHackathon);
router.post('/register-masterclass', registerMasterclass);

export default router;
