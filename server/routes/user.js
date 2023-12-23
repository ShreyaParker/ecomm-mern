import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv"
dotenv.config()


import {UserModel} from "../models/user.js";


const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }
        const user = await UserModel.findOne({ username });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({ username, password: hashedPassword });
        await newUser.save();
        res.json({ message: "User registered successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.get("/register",async (req, res)=>{
    const getAllUser = await UserModel.find()
    res.send(getAllUser)
})

router.post("/login",async (req,res)=>{
    const {username,password} = req.body
    try {
        const user = await UserModel.findOne({username})
        if(!user){
            return res.status(400).json({message:"username not found"})
        }
        const isPassword = await bcrypt.compare(password,user.password)

        if (!isPassword){
            return res.status(400).json({message:"password wrong"})

        }

        const token = jwt.sign({id:user._id},process.env.SECRET)

        res.status(200).json({token,userId:user._id})


    }catch (e) {
        return res.status(400).json({message:e.message})
    }


})


export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        jwt.verify(authHeader, "secret", (err) => {
            if (err) {
                return res.sendStatus(403);
            }
            next();
        });
    } else {
        res.sendStatus(401);
    }
};
router.get("/available-money/:userID",verifyToken , async (req,res)=>{
    const {userID}= req.params
    console.log(userID)
    try {
        const user = await UserModel.findById(userID)

        if(!user){
            res.status(400).json({message:"user not found"})
        }

        res.json({availableMoney:user.availableMoney})
    } catch (e) {
        res.status(500).json({message:e.message})
    }
})


export { router as userRouter };