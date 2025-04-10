import express from 'express';
import { loginUser } from '../controllers/auth.controller';

// Routes
const authRouter = express.Router();

authRouter.post('/login', loginUser);

export default authRouter;