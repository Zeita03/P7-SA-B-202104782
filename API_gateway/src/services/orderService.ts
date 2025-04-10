import express, { Request, Response } from "express";
import axios from "axios";
import { ORDER_SERVICE_URL } from "../config/config";

// Router
const orderRouter = express.Router();

orderRouter.post("/crear", async (req: Request, res: Response) => {
    try {
        const { userId, productIds, paymentMethod } = req.body;

        // Mutation to create an order
        const graphqlQuery = {
            query: `
                mutation CreateOrder($userId: String!, $productIds: [String!]!, $paymentMethod: String!) {
                    createOrder(userId: $userId, productIds: $productIds, paymentMethod: $paymentMethod) {
                        id
                        userId
                        productIds
                        status
                        paymentMethod
                    }
                }
            `,
            variables: { userId, productIds, paymentMethod }
        };

        // Request to the order service
        const response = await axios.post(`${ORDER_SERVICE_URL}/orders`, graphqlQuery, {
            headers: { "Content-Type": "application/json" }
        });
        res.send(response.data);

    } catch (error: any) {
        if (error.response) {
            res.status(error.response.status).send(error.response.data);
        } else {
            res.status(500).send({ status: false, message: "Error en la comunicación con el microservicio de órdenes" });
        }
    }
});

export default orderRouter;

