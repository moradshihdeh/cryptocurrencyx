const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/top-ten', async (req, res) => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        const data = response.data;
        res.send(data);
    } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);
        res.status(500).send('Error fetching cryptocurrency data');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
