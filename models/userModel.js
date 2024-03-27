const { Client } = require('pg');

const connectionString = 'postgresql://testuser:password@localhost:4998/cryptodb';
const client = new Client({
  connectionString: connectionString
});

client.connect();

async function create({ username, password, email }) {
  const insertQuery = 'INSERT INTO users(username, password, email) VALUES($1, $2, $3) RETURNING *';
  const values = [username, password, email];

  const result = await client.query(insertQuery, values);
  return result.rows[0];
}

async function findByUsername(username) {
  const selectQuery = 'SELECT * FROM users WHERE username = $1';
  const result = await client.query(selectQuery, [username]);
  return result.rows[0];
}

async function saveToken(userId, accessToken, refreshToken) {
  const insertTokenQuery = 'INSERT INTO tokens(user_id, access_token, refresh_token, expiry_timestamp) VALUES($1, $2, $3, NOW() + INTERVAL \'15 minutes\')';
  await client.query(insertTokenQuery, [userId, accessToken, refreshToken]);
}

module.exports = { create, findByUsername, saveToken };
