import mongoose from "mongoose";
import { DB_HOST } from "./config";

mongoose.connect(DB_HOST as string)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Error connecting to MongoDB', err));

export default mongoose;