import express, { Request, Response } from "express";
import axios from "axios";
import { USER_SERVICE_URL } from "../config/config";

// Router
const userRouter = express.Router();

// Redirect requests to the user service
userRouter.post("/registro", async (req: Request, res: Response) => {
    try {
        const response = await axios.post(`${USER_SERVICE_URL}/user/register`, req.body);
        res.send(response.data);
    } catch (error: any) {
        if (error.response) {
            res.status(error.response.status).send(error.response.data);
        } else {
            res.status(500).send({ status: false, message: "Error en la comunicación con el microservicio de usuarios" });
        }
    }
});

userRouter.post("/iniciar", async (req: Request, res: Response) => {
    try {
        const response = await axios.post(`${USER_SERVICE_URL}/auth/login`, req.body);
        res.send(response.data);
    } catch (error: any) {
        if (error.response) {
            res.status(error.response.status).send(error.response.data);
        } else {
            res.status(500).send({ status: false, message: "Error en la comunicación con el microservicio de usuarios" });
        }
    }
});

export default userRouter;