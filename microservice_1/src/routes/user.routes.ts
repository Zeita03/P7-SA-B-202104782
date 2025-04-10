import express from 'express';
import { registerUser } from '../controllers/user.controller';

// Router
const userRouter = express.Router();
userRouter.post('/register', registerUser);

export default userRouter;