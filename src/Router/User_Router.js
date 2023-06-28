import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/Users.js';

const router = express.Router();

router.post("/register",async (req,res) => {

    try {
        const { username,password } = req.body;
        const user = await UserModel.findOne({ username });
        if(user){
            return res.json({ message  : "User already exsists" })
        }
        const salt = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(password,salt);
        const new_user = new UserModel({ username, password : hash_password });
        await new_user.save();
        res.json({ message : "User added Successfully" });
    } catch (error) {
        res.status(500).json({ message : error.message });
    }
})

router.post("/login",async (req,res) => {

    try {
        const { username, password } = req.body;
        const user = await UserModel.findOne({ username });
        if(!user){
            return res.status(500).json({ message : "User Not Found , Please register to Continue" });
        }
        const compare_password = await bcrypt.compare(password,user.password);
        if(!compare_password){
            return es.status(500).json({ message : "Invalid Password" });
        }
        const gen_token = jwt.sign({ id : user._id },process.env.secret_key);
        res.status(200).json({ token : gen_token, id : user._id });
    } catch (error) {
        res.status(500).json({ Error : error.message });
    }
})

export const User_Router = router;