require('dotenv').config()

const express = require('express');


const router = express.Router();

const jwt = require('jsonwebtoken')

const {generateToken, getUser, updateAccessToken, updateRefreshToken, generateRefreshToken, authenticateToken} = require('../helpers')



router.post('/api/refresh', authenticateToken, (req, res)=> {
    
    const {id, username, password, isAdmin, accessToken, refreshToken} = req.body
    const authuser = {id, username, password, isAdmin, accessToken, refreshToken}

    const decode = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    console.log(decode)
    const newToken = generateToken(authuser)
    const newRefreshToken = generateRefreshToken(authuser)

    updateAccessToken(authuser.id, newToken)
    updateRefreshToken(authuser.id, newRefreshToken)

    res.status(200).json({
        newToken,
        newRefreshToken
    })
})

router.post('/api/login', (req, res) => {
    const {username, password} = req.body

    const user = getUser(username, password)

    // check credential part for future use
    if(user){
        const accessToken = generateToken(user)
        const refreshToken = generateToken(user,'2h')
        updateAccessToken(user.id, accessToken)
        updateRefreshToken(user.id, refreshToken)
        

        res.json(user)
    }else{
        // Username or password is incorrect, provide an error response
        res.status(400).json({ error: 'Incorrect username or password' });
    }

})


router.post('/api/test', (req, res) => {
    
})





module.exports = router;