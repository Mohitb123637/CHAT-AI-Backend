import express from 'express';
import dotenv from 'dotenv';
import userRoute from './route/user.route.js';
import aiRoutes from './route/ai.route.js';
import cors from 'cors';
import './db.js';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5005;

app.use('/user', userRoute);
app.use('/ai', aiRoutes);

app.use('/', (req, res) => {
  res.send('Welcome to Chat App');
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
