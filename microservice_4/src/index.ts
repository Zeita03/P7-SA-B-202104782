import express from "express";
import paymentRouter from './routes/payment.routes';
import mongoose from "./config/db";
import { PORT } from './config/config';

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.get('/', (req, res) => { res.send('Practica 4') });
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
app.use('/payments', paymentRouter);

app.listen(PORT, () => {
    return console.log(`Express is listening at http://localhost:${PORT}`);
});