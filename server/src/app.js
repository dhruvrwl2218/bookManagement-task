import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/error.middleware.js';
import userRouter from './routes/userRoutes.js';
import bookRouter from './routes/bookRoutes.js'
import transactionRouter from './routes/transactionRoutes.js';
const app = express(); //express server

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
    credentials: true, // Allow credentials (cookies)
    exposedHeaders: [], // Expose these headers to the client
}))

app.use(express.json())
app.use(errorHandler);

app.use('/api/v1/user',userRouter);
app.use('/api/v1/books',bookRouter);
app.use('/api/v1/transaction',transactionRouter);

export {app}
