const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const infoRoutes = require('./routes/infoRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/', infoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});