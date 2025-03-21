const express = require('express');
const router = express.Router();

router.post('/filter', (req, res) => {
    const { articles } = req.body;

    // Exemple de filtre : Ne garder que les articles contenant le mot 'AI'
    const filteredArticles = articles.filter(article => article.title.includes('AI'));

    res.json({ filteredArticles });
});

module.exports = router;