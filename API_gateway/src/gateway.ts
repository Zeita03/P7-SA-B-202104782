import express, { Request, Response } from "express";
import userRouter from "./services/userService";
import productsRouter from "./services/productService";
import orderRouter from "./services/orderService";
import paymentRouter from "./services/paymentService";
import { PORT } from "./config/config";

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use('/users', userRouter);
app.use('/products', productsRouter);
app.use('/orders', orderRouter);
app.use('/payments', paymentRouter);

app.listen(PORT, () => {
    console.log(`API Gateway corriendo en http://localhost:${PORT}`);
});