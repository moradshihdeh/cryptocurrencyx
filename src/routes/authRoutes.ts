import * as express from 'express';
const router = express.Router();
import * as  authController from '../controllers/authController';
import {verifyAccessToken } from '../middlewares/middleware';

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh-token', verifyAccessToken, authController.refreshToken);


export = router;