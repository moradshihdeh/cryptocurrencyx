require('dotenv').config()

const express = require('express');
const axios = require('axios');

const loginroute = require('./routes/auth')

const jwt = require('jsonwebtoken')

const {authenticateToken, generateAccessToken, getUser} = require('./helpers')

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json())


//routes 
app.use('/', loginroute)
app.get('/top-ten', authenticateToken, async (req, res) => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        const data = response.data;
        res.json(data);
    } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);
        res.status(500).send('Error fetching cryptocurrency data');
    }
});

app.get('/home', authenticateToken, (req, res) => {
    res.json({"loged": true})
})




// test change
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
