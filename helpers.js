
const jwt = require('jsonwebtoken')

const usersdb = [
    { 
        id: 1, 
        username: 'admin', 
        password: 'secret',
        isAdmin: true,
        accessToken: null,
        refreshToken: null
    },
    { 
        id: 2, 
        username: 'user2', 
        password: 'secret',
        isAdmin: false,
        accessToken: null,
        refreshToken: null
    }
];

function generateToken(user, expiresIn='1h'){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn})
}

function generateRefreshToken(user){
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
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
    const user = usersdb.find(u => u.username === username && u.password === password)
    return user
}

const updateAccessToken = (targetId, newToken) => {
    const targetObj = usersdb.find(user => user.id === targetId);
    if (targetObj) {
        targetObj.accessToken = newToken;
    }
};

const updateRefreshToken = (targetId, newToken) => {
    const targetObj = usersdb.find(user => user.id === targetId);
    if (targetObj) {
        targetObj.refreshToken = newToken;
    }
};

// Export the functions
module.exports = {
    generateToken,
    generateRefreshToken,
    authenticateToken,
    updateAccessToken,
    updateRefreshToken,
    getUser
};