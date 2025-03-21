require('dotenv').config();
const express = require('express');
const cors = require('cors');
const newsRoutes = require('./routes/newsRoutes');

const app = express();

// Implémentation de CORS
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/news', newsRoutes);

// Health check route
app.get('/health', (req, res) => res.send('Aggregator service is running'));

module.exports = app;
