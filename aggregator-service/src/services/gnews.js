const axios = require('axios');

// Axios instance for GNews API
const gNewsClient = axios.create({
    baseURL: 'https://gnews.io/api/v4',
    params: { apikey: process.env.GNEWS_KEY }
});

/**
 * Fetch news articles from GNews API and normalize them.
 * @param {string} keyword - Optional search keyword
 * @returns {Promise<Array>} List of news articles with unified fields.
 */
async function getNews(keyword) {
    let endpoint = '/top-headlines';
    let params = { lang: 'en', country: 'us', max: 10, category: 'general' };
    
    // Si un mot-clé est fourni, utiliser l'endpoint search avec le mot-clé
    if (keyword) {
        endpoint = '/search';
        params = { q: keyword, lang: 'en', max: 10 };
    }
    
    const response = await gNewsClient.get(endpoint, { params });
    const data = response.data;
    const articles = data.articles || [];
    
    // Normalize the articles to a common format
    return articles.map(article => ({
        title: article.title,
        description: article.description,
        url: article.url,
        date: article.publishedAt,
        source: 'gnews'
    }));
}

module.exports = { getNews };