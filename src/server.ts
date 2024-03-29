import * as dotenv from 'dotenv';
dotenv.config();

// Import Express
import * as express from 'express';
import * as authRoutes from './routes/authRoutes';
import * as infoRoutes from './routes/infoRoutes';
import * as bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/', infoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});