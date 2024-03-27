const express = require('express');
const router = express.Router();

const controller = require('../controllers/infoController')
const {verifyAccessToken } = require('../middlewares/middleware')

router.get('/top-ten', verifyAccessToken, controller.topten);

router.get('/home', verifyAccessToken, controller.homepage);


module.exports = router