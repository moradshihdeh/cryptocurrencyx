import * as dotenv from 'dotenv';
dotenv.config();

// middleware.js
import * as jwt from 'jsonwebtoken';
import { getRefreshToken } from '../models/userModel';

const accessTokenSecret = process.env.SECRET_KEY || 'sercret key';


function verifyAccessToken(req:any, res:any, next:any) {
  const authHeader = req.headers['authorization'];
  const accessToken = authHeader && authHeader.split(' ')[1];

  if (!accessToken) {
    return res.status(401).json({ message: 'Access token is missing' });
  }

  jwt.verify(accessToken, accessTokenSecret, (err:any, user:any) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid access token' });
    }
    req.user = user;
    next(); 
  });
}

async function refreshToken(refreshToken:any) {
  
  const result = await getRefreshToken(refreshToken);

  if (result.rows.length === 0) {
    return null;
  }

  const user = result.rows[0];
  const newAccessToken = jwt.sign({ username: user.username, email: user.email }, accessTokenSecret, { expiresIn: '15m' });
  return newAccessToken;
}

export {
  verifyAccessToken,
  refreshToken
};