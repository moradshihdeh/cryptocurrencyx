require('dotenv').config()

const express = require('express');
const axios = require('axios');

const jwt = require('jsonwebtoken')

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json())

app.get('/top-ten', async (req, res) => {
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
    res.json(posts)
})
app.post('/login', (req, res) => {
    const username = req.body.username
    const user = { name: username }

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET) 
    res.json({accessToken: accessToken})

})

function authenticateToken(req, res, next){
    const authHeader = req.headers['Authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, precess.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
