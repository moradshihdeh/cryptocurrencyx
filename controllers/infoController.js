const axios = require('axios');

const homepage = (req, res) => {
    res.json({"loged": true})
}


const topten = async (req, res) => {
        try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        const data = response.data;
        console.log(req.user)
        res.json({data, user: req.user});
    } catch (error) {
        console.error('Error fetching cryptocurrency data:', error);
        res.status(500).send('Error fetching cryptocurrency data');
    }
}

async function protectedRoute(req, res) {
    res.status(200).json({ message: 'Protected route accessed', user: req.user });
}



module.exports = {homepage, topten}