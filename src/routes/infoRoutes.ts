import * as  express from 'express';
const router = express.Router();

import * as  controller from '../controllers/infoController';
import {verifyAccessToken } from '../middlewares/middleware';

router.get('/top-ten', verifyAccessToken, controller.topten);

router.get('/home', verifyAccessToken, controller.homepage);


export = router