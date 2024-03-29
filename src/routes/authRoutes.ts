import * as express from 'express';
import * as  authController from '../controllers/authController';
import {verifyAccessToken } from '../middlewares/middleware';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh-token', verifyAccessToken, authController.refreshToken);


export = router;