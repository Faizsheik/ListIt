// // This is middleware
// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const secretkey = process.env.JWT_SECRET;

// const AuthenticateToken = async (req,res,next) =>
// {
//     let token = req.header('Authorization');
//     if(!token)
//     {
//         return res.status(401).send({message:'Authentictaion failed'});
//     }
//     jwt.verify(token,secretkey,(err,user)=>
//     {
//         if(err) return res.status(403).send({message:"Token is not valid! Please Login again"});
//         req.user = user;
//         next();   // go to next middleware
//     })
// }

// module.exports = AuthenticateToken;



const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretkey = process.env.JWT_SECRET;

const AuthenticateToken = async (req, res, next) => {
    // 1. Always allow OPTIONS requests to pass through without authentication
    // This is crucial for fixing the CORS preflight error
    if (req.method === 'OPTIONS') {
        return next();
    }

    let authHeader = req.header('Authorization');
    
    // 2. Check if header exists and handle "Bearer <token>" format
    const token = authHeader && authHeader.startsWith('Bearer ') 
        ? authHeader.split(' ')[1] 
        : authHeader;

    if (!token) {
        return res.status(401).send({ message: 'Authentication failed: No token provided' });
    }

    jwt.verify(token, secretkey, (err, user) => {
        if (err) {
            return res.status(403).send({ message: "Token is not valid! Please Login again" });
        }
        req.user = user;
        next();
    });
}

module.exports = AuthenticateToken;