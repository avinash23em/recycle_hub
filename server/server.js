const express = require('express');
const cors = require('cors');
const router = express.Router();
const connectDB = require('./config/db');  
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to database
connectDB();

// Routes
app.use('/api/items', require('./routes/item'));  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
