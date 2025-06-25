import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/user.js';
import dotenv from 'dotenv';

dotenv.config();
const auth = Router();

auth.post('/signup', async(req ,res)=>{
    try{
        const {name,email,password} = req.body;
        const existingUser = await User.findOne({email});
        if(!name || !email || !password ){
            return res.status(401).json({error : "All fields are required"});
           
        }

        else if(existingUser){
            console.log("User already exists");
            return res.status(400).json({error : "User already exists"});
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({
                name,
                email,
                password : hashedPassword,
                role : "user"
            });
            const token = jwt.sign({user_id : user._id},process.env.SECRET_KEY);
            await user.save();
            res.status(201).json({message : "User registered successfully" , token : token});
        }
    }
    catch(error){
        return res.status(500).json({error : error.message});
    }
});

auth.post('/login', async(req ,res)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        
        if(!user){
            return res.status(401).json({error : "User does not exist"});
        }
        const isValidPassword = await bcrypt.compare(password,user.password);
        if(!isValidPassword){
            return res.status(400).json({error : "Invalid password"});
        }


        const token = jwt.sign({user_id : user._id},process.env.SECRET_KEY);
        console.log("token from backend : ",token);
        res.status(200).json({
            message: "Login successful",
            token : token,   // <-- send token here
        });

    }
    catch(error){
        return res.status(500).json({error : error.message});
    }
});

export default auth;