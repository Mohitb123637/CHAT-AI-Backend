import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const mongoUrl = process.env.MONGO_URL;

mongoose
  .connect(mongoUrl)
  .then(() => console.log('Mongodb Connected'))
  .catch((error) => console.error('Mongodb connection error' + error));

const db = mongoose.connection;

db.on('error', (error) => {
  console.log('MongoDB error:', error);
});
