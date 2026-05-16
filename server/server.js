const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const toDoRoutes = require('./ToDoRoutes');
const authRoutes = require('./authroutes');

require('dotenv').config();

app.use(cors());
app.use(express.json());

// 2. Health Check
app.get('/', (req, res) => res.send("Server is up!"));

// 3. Routes
app.use('/api', authRoutes);
app.use('/api/todo', toDoRoutes);

// 4. Database Connection (MUST fixed in MongoDB Atlas first)
mongoose.connect(process.env.DB_URL)
    .then(() => console.log("✅ DB connected"))
    .catch((err) => console.log("❌ DB error", err));

module.exports = app;