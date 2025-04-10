import express, { Request, Response } from "express";
import axios from "axios";
import { PAYMENT_SERVICE_URL } from "../config/config";

// Router
const paymentRouter = express.Router();

// Redirect requests to the user service
paymentRouter.post("/registrar", async (req: Request, res: Response) => {
    try {
        const response = await axios.post(`${PAYMENT_SERVICE_URL}/payments/register`, req.body);
        res.send(response.data);
    } catch (error: any) {
        if (error.response) {
            res.status(error.response.status).send(error.response.data);
        } else {
            res.status(500).send({ status: false, message: "Error en la comunicación con el microservicio de usuarios" });
        }
    }
});

export default paymentRouter;