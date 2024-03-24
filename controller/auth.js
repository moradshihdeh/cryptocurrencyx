require('dotenv').config()

const jwt = require('jsonwebtoken')

const {generateToken, getUser, updateAccessToken, updateRefreshToken, generateRefreshToken, authenticateToken} = require('../db/users')


const refreshToken = (req, res) =>{
    
    const {id, username, password, isAdmin} = req.body.user
    const authuser = {id, username, password, isAdmin}

    const accessToken = req.body.tokenobj.accessToken
    const refreshToken = req.body.tokenobj.refreshToken

    const newToken = generateToken(authuser)
    const newRefreshToken = generateRefreshToken(authuser)

    updateAccessToken(authuser.id, newToken)
    updateRefreshToken(authuser.id, newRefreshToken)

    res.status(200).json({
        newToken,
        newRefreshToken
    })
}

const login = (req, res) => {
    const {username, password} = req.body

    const user = getUser(username, password)

    // check credential part for future use
    if(user){
        const accessToken = generateToken(user)
        const refreshToken = generateToken(user,'2h')
        updateAccessToken(user.id, accessToken)
        const tokenobj = updateRefreshToken(user.id, refreshToken)
        

        res.json({user, tokenobj})
    }else{
        // Username or password is incorrect, provide an error response
        res.status(400).json({ error: 'Incorrect username or password' });
    }

}

module.exports = { refreshToken, login}