const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const toDoRoutes  = require('./ToDoRoutes');
const authRoutes = require('./authroutes');

require('dotenv').config();

const PORT = process.env.PORT||5000;





app.use(cors());
//Middleware
app.use(express.json());

app.use('/api',authRoutes);
app.use('/api/todo',toDoRoutes);

mongoose.connect(process.env.DB_URL).then((result)=>
{
    console.log("Database connected");
}).catch((err)=>
{
    console.log("Db not connected successfully",err);
})

app.listen(PORT,()=>
{
    console.log(`server started at port ${PORT}`);
})