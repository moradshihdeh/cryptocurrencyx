
const jwt = require('jsonwebtoken')

const usersdb = [
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

const tokendb = [

]

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

const updateAccessToken = (targetid, newToken) => {
    const targetObj = tokendb.find(user => user.id === targetid);
    if (targetObj) {
        targetObj.accessToken = newToken;
    }else{
        tokendb.push({id:targetid,accessToken:newToken, refreshToken:null});
    }
};

const updateRefreshToken = (targetid, newToken) => {
    const targetObj = tokendb.find(user => user.id === targetid);
    if (targetObj) {
        targetObj.refreshToken = newToken;
        return targetObj;
    }else{
        const tokenobj = {id:targetid,accessToken:null, refreshToken:targetid}
        tokendb.push(tokenobj);
        return tokenobj;
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