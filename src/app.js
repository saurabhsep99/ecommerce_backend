import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
// Example: import userRoutes from './routes/userRoutes.js';
// app.use('/api/users', userRoutes);

// Root endpoint
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});