import dotenv from "dotenv"
dotenv.config( )
import express from "express";
import cors from "cors";

import mongoose from "mongoose";
import {userRouter} from "./routes/user.js";
import bodyParser from "body-parser";
import {productRouter} from "./routes/product.js";

const app = express();
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(cors());
app.use(bodyParser.json())

app.use("/user", userRouter);
app.use("/product",productRouter)
app.get("/",(req,res)=>{
    res.send("hello world")

})
const PORT = process.env.PORT
const MONGOURI= process.env.MONGOURI

mongoose
    .connect(MONGOURI, {
        useNewUrlParser: true,

    })
    .then(() => {
        console.log('Connected to Mongo!');
    })
    .catch((err) => {
        console.error('Error connecting to Mongo', err);
    });

app.listen(PORT, () => console.log("Server started"));