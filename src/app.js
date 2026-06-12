import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import portfolioRoutes from './routes/portfolio.routes.js';

import config from './config/config.js';

const app = express();

const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];
if (config.FRONTEND_URL) {
    const urls = config.FRONTEND_URL.split(',').map(url => url.trim());
    allowedOrigins.push(...urls);
}

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// Serve static public folder (for uploaded avatars and project images)
app.use(express.static('public'));

// Define routes
app.get('/', (req, res) => {
    res.send('Welcome to the Portfolio Management System');
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/portfolio', portfolioRoutes);


export default app;