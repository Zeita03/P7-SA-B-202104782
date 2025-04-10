import express from 'express';
import { registerPayment } from '../controllers/payment.controller';

// Router
const paymentRouter = express.Router();
paymentRouter.post('/register', registerPayment);

export default paymentRouter;