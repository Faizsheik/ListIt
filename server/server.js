const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const toDoRoutes = require('./ToDoRoutes');
const authRoutes = require('./authroutes');

require('dotenv').config();

const allowedOrigins = [
   // "http://localhost:3000",
  //    "https://list-6yzuunj7a-faizsheiks-projects.vercel.app"
//    "https://list-it-chi.vercel.app"
   "https://list-it-client.vercel.app"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Manual Preflight Handler - Add this before routes!
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, POST, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(express.json());
app.get('/', (req, res) => res.send("Server is up!"));

app.use('/api', authRoutes);
app.use('/api/todo', toDoRoutes);


mongoose.connect(process.env.DB_URL)
    .then(() => console.log("✅ DB connected"))
    .catch((err) => console.log("❌ DB error", err));

//     const PORT = 5000;
// app.listen(PORT, () => {
//     console.log(`🚀 Server running locally at http://localhost:${PORT}`);
// });

module.exports = app;