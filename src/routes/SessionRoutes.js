import express from 'express';
import passport from 'passport';
import SessionController from '../controllers/SessionController.js';

const router = express.Router();
const sessionController = new SessionController();

router.post('/login', sessionController.login); 
router.get('/logout', sessionController.logout); 
router.get('/current', passport.authenticate("jwt", { session: false }), sessionController.current);

export default router;
