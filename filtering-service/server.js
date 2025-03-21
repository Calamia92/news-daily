require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/filter', require('./src/routes/filterRoutes'));

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Filter Service running on port ${PORT}`));
