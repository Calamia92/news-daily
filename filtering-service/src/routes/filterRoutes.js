const express = require('express');
const router = express.Router();

// Liste des mots‑clés interdits
const forbiddenKeywords = ['scandale', 'rumeur', 'fake news'];
const trustedSources = ['BBC', 'Le Monde', 'The Guardian', 'New York Times'];

router.post('/filter', (req, res) => {
    const { articles } = req.body;
    if (!Array.isArray(articles)) {
        return res.status(400).json({ error: "Invalid articles format" });
    }

    // 1️⃣ Suppression doublons
    const seen = new Set();
    let filtered = articles.filter(a => a.url && !seen.has(a.url) && seen.add(a.url));

    // 2️⃣ Blacklist mots clés
    filtered = filtered.filter(a =>
        !forbiddenKeywords.some(k =>
            a.title.toLowerCase().includes(k) ||
            (a.description?.toLowerCase().includes(k))
        )
    );

    // 3️⃣ Filtre sources fiables
    const bySource = filtered.filter(a =>
        trustedSources.some(src => a.source?.toLowerCase().includes(src.toLowerCase()))
    );

    // 4️⃣ Fallback si rien ne passe → premiers 5 articles originaux
    filtered = bySource.length ? bySource : articles.slice(0, 5);

    return res.json({ filteredArticles: filtered });
});

module.exports = router;
