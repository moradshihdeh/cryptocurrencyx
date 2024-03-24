const express = require('express');
const router = express.Router();

const controller = require('../controller/site')
const {authenticateToken } = require('../db/users')

router.get('/top-ten', authenticateToken, controller.topten);

router.get('/home', authenticateToken, controller.homepage);


module.exports = router