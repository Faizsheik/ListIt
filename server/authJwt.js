// This is middleware
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretkey = process.env.JWT_SECRET;

const AuthenticateToken = async (req,res,next) =>
{
    let token = req.header('Authorization');
    if(!token)
    {
        return res.status(401).send({message:'Authentictaion failed'});
    }
    jwt.verify(token,secretkey,(err,user)=>
    {
        if(err) return res.status(403).send({message:"Token is not valid! Please Login again"});
        req.user = user;
        next();   // go to next middleware
    })
}

module.exports = AuthenticateToken;