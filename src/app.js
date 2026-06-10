import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// Define routes
app.get('/', (req, res) => {
    res.send('Welcome to the Portfolio Management System');
});

app.use('/api/auth', authRoutes);


export default app;