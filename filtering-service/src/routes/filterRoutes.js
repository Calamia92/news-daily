const express = require('express');
const { filterArticles } = require('../controllers/filterController');

const router = express.Router();

router.post('/', filterArticles);

module.exports = router;
