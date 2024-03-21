const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken')

const {authenticateToken, generateAccessToken, getUser} = require('../helpers')



router.post('/api/refresh', (req, res)=> {

})

router.post('/api/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const user = getUser(username, password)

    // check credential part for future use
    if(user){
        const accessToken = generateAccessToken(user)
        res.json({accessToken: accessToken})
    }

})



module.exports = router;