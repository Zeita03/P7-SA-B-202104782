import { Request, Response } from 'express';
import User from '../schemas/user.schemas';
import bcrypt from "bcrypt";

export const registerUser = async (req: Request, res: Response) => {
    try {

        const { name, lastname, email, password, age, username } = req.body;

        // Validate that the parameters exist
        if (!name || !lastname || !email || !password || !age || !username) {
            res.status(400).send({ status: false, message: "Todos los campos son obligatorios" });
            return;
        }

        // Validat that username is unique
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            res.status(400).send({ status: false, message: "El usuario ya existe" });
            return;
        }

        // Enncrypt the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Crear el usuario en la base de datos
        const newUser = new User({ name, lastname, email, password: hashedPassword, age, username });
        await newUser.save();

        res.status(201).send({ status: true, message: "Registrado exitosamente" });

    } catch (error) {
        console.error(error);
        res.status(500).send({ status: false, message: "Ha ocurrido un error en el servidor" });
    }
}