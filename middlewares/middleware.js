// middleware.js
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

const accessTokenSecret = 'secret_key';

function verifyAccessToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const accessToken = authHeader && authHeader.split(' ')[1];

  if (!accessToken) {
    return res.status(401).json({ message: 'Access token is missing' });
  }

  jwt.verify(accessToken, accessTokenSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid access token' });
    }
    req.user = user;
    next(); 
  });
}

async function refreshToken(refreshToken) {
  const selectQuery = 'SELECT * FROM tokens WHERE refresh_token = $1';
  const result = await UserModel.query(selectQuery, [refreshToken]);

  if (result.rows.length === 0) {
    return null;
  }

  const user = result.rows[0];
  const newAccessToken = jwt.sign({ username: user.username, email: user.email }, accessTokenSecret, { expiresIn: '15m' });
  return newAccessToken;
}

module.exports = {
  verifyAccessToken,
  refreshToken
};