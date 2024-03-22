require('dotenv').config()

const express = require('express');


const authroute = require('./routes/auth')
const siteroute = require('./routes/site')


const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json())


//routes 
app.use('/', authroute)
app.use('/', siteroute)




// test change
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
