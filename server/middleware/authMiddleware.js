const jwt = require('jsonwebtoken')
require('dotenv').config();

const authenticateJwtToken = (req,res,next) => {
    const accessToken = req.header("token");
    if(accessToken) {
        const token = accessToken.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if(err)
            {
                return res.status(403).json({message: "Got Authentication Error"});
            }
            req.user = user;
            next();
        })
    }
    else {
        res.status(404).json({message: "Provide Jwt token"})
    }
}

module.exports = { authenticateJwtToken };