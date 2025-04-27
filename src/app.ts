import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import incidentRoutes from './routes/incident.routes';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/incidents', incidentRoutes);

mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

export default app;
