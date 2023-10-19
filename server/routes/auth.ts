import express from 'express'
const router = express.Router();
import {User} from "../db/auth";
import jwt from 'jsonwebtoken'
require('dotenv').config();

router.post("/signup", async (req,res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        if(!username || username.trim() === "")
            res.status(400).json({message: "Username can not be empty"});
        if(!password || password.trim() === "")
            res.status(400).json({message: "Password can not be empty"});

        const existingUser = await User.findOne({username});
        
        if(existingUser) {
            res.status(500).json({message:"User already present"});
        }

        const user = await new User({
            username,
            password
        })    
        if(!process.env.JWT_SECRET)
            return res.status(500).json({message:"Internal server error"});
        const jwtToken = jwt.sign({user}, process.env.JWT_SECRET, {expiresIn: '1h'})
        await user.save();
        res.status(200).json({message: "Singup Successful", jwtToken});
    } catch(error) {
        console.log(error)
        res.status(500).json({error:"An error occured while Signing Up"})
    }
})

router.post("/login", async (req,res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        if(!username || username.trim() === "")
            return res.status(400).json({message: "Username can not be empty"});
        if(!password || password.trim() === "")
            return res.status(400).json({message: "Password can not be empty"});

        const existingUser = await User.findOne({username, password});
        if(!existingUser)
            return res.status(404).json({error: "Either Username or password is not correct "});
        const user = await new User({
            username,
            password
        })  
        if(!process.env.JWT_SECRET)
            return res.status(500).json({message:"Internal server error"});
        const jwtToken = jwt.sign({user}, process.env.JWT_SECRET, {expiresIn: '1h'})
        res.status(200).json({message: "Login Successfully", jwtToken});
    }
    catch (error) {
        console.log(error)
        res.status(500).json({error:"An error occured while Loging In: " + error})
    }
})

export default router;