import express from "express";
import userRouter from './routes/user.routes';
import authRouter from './routes/auth.routes';
import mongoose from "./config/db";
import { PORT } from './config/config';

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.get('/', (req, res) => { res.send('Practica 4 - LAB SA') });
app.get('/test', async (req, res) => {
    const connectionState = mongoose.connection.readyState;
    if (connectionState === 1 || connectionState === 2) {
        res.json({ message: "Connected to MongoDB", status: connectionState });
        return;
    } else {
        res.status(500).json({ message: "Not connected to MongoDB", status: connectionState });
        return;
    }
});
app.use('/user', userRouter);
app.use('/auth', authRouter);


app.listen(PORT, () => {
    return console.log(`Express is listening at http://localhost:${PORT}`);
});