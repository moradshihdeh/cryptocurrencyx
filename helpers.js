
const jwt = require('jsonwebtoken')

const users = [
    { 
        id: 1, 
        username: 'admin', 
        password: 'secret',
        isAdmin: true
    },
    { 
        id: 2, 
        username: 'user2', 
        password: 'secret',
        isAdmin: false
    }
];

function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn:"1h"})
}

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

function getUser(username, password) {
    const user = users.find(u => u.username === username && u.password === password)
    return user
}


// Export the functions
module.exports = {
    generateAccessToken,
    authenticateToken,
    getUser
};