const express = require('express');
const router = express.Router();
const {User} = require("../db/auth");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (username) => {
    const data = {username};
    return jwt.sign(data, process.env.JWT_SECRET, {expiresIn: '1h'})
}

router.get("/signup", async (req,res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        const existingUser = await User.findOne({username});
        
        if(existingUser) {
            res.status(500).json({message:"User already present"});
        }

        const user = await new User({
            username,
            password
        })
        const jwtToken = generateToken(username);
        await user.save();
        res.status(200).json({message: "Singup Successful", jwtToken});
    } catch(error) {
        console.log(error)
        res.status(500).json({error:"An error occured while Signing Up"})
    }
})

module.exports = router 