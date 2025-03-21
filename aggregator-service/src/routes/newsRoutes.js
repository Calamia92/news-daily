const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

// Endpoint pour récupérer les nouvelles agrégées
router.get('/', newsController.getNews);

module.exports = router;