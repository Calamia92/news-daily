require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const historyRoutes = require('./routes/history');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ MongoDB connecté'))
    .catch(err => console.error('❌ Erreur MongoDB', err));

app.use('/history', historyRoutes);

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`🚀 History service lancé sur port ${PORT}`));
