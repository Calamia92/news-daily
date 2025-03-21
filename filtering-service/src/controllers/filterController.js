const filterArticles = (req, res) => {
    const { articles, keyword, category, dateStart, dateEnd, source } = req.body;

    if (!articles || !Array.isArray(articles)) {
        return res.status(400).json({ error: 'Liste d\'articles invalide' });
    }

    let filtered = articles;

    if (keyword) {
        filtered = filtered.filter(article =>
            article.title.toLowerCase().includes(keyword.toLowerCase()) ||
            article.description.toLowerCase().includes(keyword.toLowerCase())
        );
    }

    if (category) {
        filtered = filtered.filter(article => article.category && article.category.toLowerCase() === category.toLowerCase());
    }

    if (dateStart) {
        filtered = filtered.filter(article => new Date(article.publishedAt) >= new Date(dateStart));
    }

    if (dateEnd) {
        filtered = filtered.filter(article => new Date(article.publishedAt) <= new Date(dateEnd));
    }

    if (source) {
        filtered = filtered.filter(article => article.source && article.source.name.toLowerCase().includes(source.toLowerCase()));
    }

    res.json({ filtered });
};

module.exports = { filterArticles };
