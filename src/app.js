import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';

const app = express();

app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// Define routes
app.get('/', (req, res) => {
    res.send('Welcome to the Portfolio Management System');
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);


export default app;