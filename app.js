import express from "express";
import route from "./route/route.js";
import dotenv from "dotenv";
import connectDB from "./db/database.js";
import cors from 'cors'
import auth from "./route/auth.js";
dotenv.config();

const app = express();
app.use(cors())
app.use(express.json());
app.use('/api', auth)
app.use('/api', route)



connectDB();
app.listen(process.env.PORT, () => {
    console.log('Server is running on ', process.env.PORT);
});