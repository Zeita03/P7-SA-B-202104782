import express, { Request, Response } from "express";
import axios from "axios";
import { PRODUCT_SERVICE_URL } from "../config/config";

// Router
const productRouter = express.Router();

// Redirect requests to the product service
productRouter.post("/registrar", async (req: Request, res: Response) => {
    try {
        const { name, price, quantity, category, brand } = req.body;

        // Mutation to create a product
        const graphqlQuery = {
            query: `
                mutation {
                    createProduct(name: "${name}", price: ${price}, quantity: ${quantity}, category: "${category}", brand: "${brand}") {
                        id
                        name
                        price
                        quantity
                        category
                        brand
                    }
                }
            `
        };

        // Request to the product service
        const response = await axios.post(`${PRODUCT_SERVICE_URL}/products`, graphqlQuery, {
            headers: { "Content-Type": "application/json" }
        });
        res.send(response.data);

    } catch (error: any) {
        if (error.response) {
            res.status(error.response.status).send(error.response.data);
        } else {
            res.status(500).send({ status: false, message: "Error en la comunicación con el microservicio de productos" });
        }
    }
});

export default productRouter;