import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors'
import mongoose from 'mongoose';
import { User_Router } from './src/Router/User_Router.js';
import { Recipe_Router } from './src/Router/Recipe_Router.js';

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("<h1>Hello World</h1>")
});

app.use("/auth",User_Router);
app.use("/recipes",Recipe_Router);

mongoose.connect(process.env.mongourl);

app.listen(PORT,()=>console.log(`Server started in port ${PORT}`))