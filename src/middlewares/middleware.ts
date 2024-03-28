// middleware.js
import * as jwt from 'jsonwebtoken';
import { Client } from 'pg';

const accessTokenSecret = 'secret_key';

const connectionString = 'postgresql://testuser:password@localhost:4998/cryptodb';
const client = new Client({
  connectionString: connectionString
});

client.connect();

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
  const selectQuery = 'SELECT * FROM tokens WHERE refresh_token = $1';
  const result = await client.query(selectQuery, [refreshToken]);

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