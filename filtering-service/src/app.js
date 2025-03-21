const express = require('express');
const filterRoutes = require('./routes/filterRoutes');

const app = express();
app.use(express.json());
app.use('/', filterRoutes);

// Health check route
app.get('/health', (req, res) => res.send('Filter service is running'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Filter service listening on port ${PORT}`);
});

module.exports = app;
