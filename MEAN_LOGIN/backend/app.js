import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import todoRoutes from './routes/todoRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/todos', todoRoutes);
app.use('/api/users', userRoutes);

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mean_login';

mongoose.connect(MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
