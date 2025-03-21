require('dotenv').config();  // Load environment variables from .env
const express = require('express');
const newsRoutes = require('./services/newsRoutes'); // Updated path

const app = express();
app.use(express.json());

// Use the news routes
app.use('/', newsRoutes);

// Health check route (optional)
app.get('/health', (req, res) => res.send('Aggregator service is running'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`aggregator-service listening on port ${PORT}`);
});
