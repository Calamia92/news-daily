const express = require('express');
const router = express.Router();
const newsController = require('./newsController'); // Updated path

// Define the /news endpoint
router.get('/news', newsController.getNews);

module.exports = router;
