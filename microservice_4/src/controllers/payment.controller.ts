import { Request, Response } from 'express';
import Payment from '../schemas/payment.schemas';

export const registerPayment = async (req: Request, res: Response) => {
    try {

        const { order_id, total } = req.body;

        // Validate that the parameters exist
        if (!order_id || !total) {
            res.status(201).send({ status: false, status_payment: "failed", message: "Todos los campos son obligatorios" });
            return;
        }

        // Create the payment in the database
        const newPayment = new Payment({ order_id, total, status: "paid" });
        await newPayment.save();

        res.status(201).send({ status: true, status_payment: "paid", message: "Pago realizado exitosamente" });

    } catch (error) {
        console.error(error);
        res.status(500).send({ status: false, status_payment: "failed", message: "Ha ocurrido un error al efectuar el pago" });
    }
}