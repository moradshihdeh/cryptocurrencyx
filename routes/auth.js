require('dotenv').config()

const express = require('express');
const router = express.Router();
const controller = require('../controller/auth');
const { authenticateToken } = require('../db/users')

router.post('/api/refresh', authenticateToken, controller.refreshToken)
router.post('/api/login', controller.login)

module.exports = router;