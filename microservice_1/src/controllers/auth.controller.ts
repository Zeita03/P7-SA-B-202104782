import { Request, Response } from 'express';
import User from '../schemas/user.schemas';
import bcrypt from "bcrypt";

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        //Validate username and password
        if (!username || !password) {
            res.status(400).json({ status: false, message: "Todos los campos son obligatorios" });
            return;
        }

        // Find user in database
        const user = await User.findOne({ username });
        if (!user) {
            res.status(401).json({ status: false, message: "Credenciales incorrectas" });
            return;
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ status: false, message: "Credenciales incorrectas" });
            return;
        }

        // Successful login
        res.status(200).json({ status: true, message: "Login exitoso" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Error en el servidor" });
    }
};