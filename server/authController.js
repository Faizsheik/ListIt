
const register = require('module')
const User = require('./User')
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretkey = process.env.JWT_SECRET;


//const express = require('express') the files that are using express mongoode or anykind of oackage will installed in the nodemodules files so the file should also in the same directory



async function registerUser(req,res)  //It  sends both custom messages and actual error messages
{
    
    let {firstname,lastname,username,password} = req.body//destructing syntax
    
    try
    {
        const duplicate = await User.find({username});
        if(duplicate && duplicate.length >0)
        {
            return res.status(400).send({message:"User already reg bla Go and login" })
        }
        let user = new User({firstname,lastname,username,password});
        const result = await user.save();
        res.status(201).send({message:'User registered successfully'});
    }
    
    catch(err)
    {
        console.log("server side error")
        console.log(err);
        res.status(400).send(err)
    }
    
}





async function loginUser(req,res)
{
    
    let {firstname,lastname,username,password} = req.body//destructing syntax
    
    try
    {
        const {username,password} = req.body;
        const user  = await User.findOne({username});
        if(!user)
        {
           return res.status(404).send({message:"Authentiction failed."})

        }
        const isPasswordValid = await user.comparePassword(password)
        if(!isPasswordValid)
        {
            // return res.status(404).send({error:"Wrong password"});
            return res.status(404).send({message:"You entered Wrong password"});
             
        }
        let token = await jwt.sign({userId:user?._id},secretkey,{expiresIn:'1h'});
        let finalData = {
            userId: user?._id,
            username : user?.username,
            firstname : user?.firstname,
            lastname : user?.lastname,
            token 
             
        }
        res.send(finalData)
    }
    catch(err)
    {
        console.log(err);
        res.status(400).send(err)
    }
    
}





const AuthController = {
    registerUser,
    loginUser
}

module.exports = AuthController;