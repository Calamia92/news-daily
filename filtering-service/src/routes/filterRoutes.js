const express = require('express');
const router = express.Router();

// Liste des mots-clés interdits (exemple)
const forbiddenKeywords = ['scandale', 'rumeur', 'fake news']; 

// Liste des sources fiables (exemple)
const trustedSources = ['BBC', 'Le Monde', 'The Guardian', 'New York Times']; 

router.post('/filter', (req, res) => {
    let { articles } = req.body;

    if (!articles || !Array.isArray(articles)) {
        return res.status(400).json({ error: "Invalid articles format" });
    }

    // ✅ 1. Suppression des articles en double (basé sur l'URL)
    const seenUrls = new Set();
    articles = articles.filter(article => {
        if (!article.url || seenUrls.has(article.url)) return false;
        seenUrls.add(article.url);
        return true;
    });

    // ✅ 2. Filtrage des articles contenant des mots interdits
    articles = articles.filter(article => {
        return !forbiddenKeywords.some(keyword => 
            article.title.toLowerCase().includes(keyword) || 
            (article.description && article.description.toLowerCase().includes(keyword))
        );
    });

    // ✅ 3. Ne garder que les articles venant de sources fiables
    articles = articles.filter(article => {
        return trustedSources.some(source => article.source && article.source.includes(source));
    });

    res.json({ filteredArticles: articles });
});

module.exports = router;
