const axios = require('axios');

// Axios instance for NewsAPI
const newsApiClient = axios.create({
    baseURL: 'https://newsapi.org/v2',
    params: { apiKey: process.env.NEWSAPI_KEY }
});

/**
 * Fetch news articles from NewsAPI and normalize them.
 * @param {string} keyword - Optional search keyword
 * @returns {Promise<Array>} List of news articles with unified fields.
 */
async function getNews(keyword) {
    let endpoint = '/top-headlines';
    let params = { country: 'us', category: 'general' };
    
    // Si un mot-clé est fourni, utiliser l'endpoint everything avec le mot-clé comme requête
    if (keyword) {
        endpoint = '/everything';
        params = { q: keyword, language: 'en', sortBy: 'publishedAt' };
    }
    
    const response = await newsApiClient.get(endpoint, { params });
    const data = response.data;
    const articles = data.articles || [];
    
    // Normalize the articles to a common format
    return articles.map(article => ({
        title: article.title,
        description: article.description,
        url: article.url,
        date: article.publishedAt,
        source: 'newsapi'
    }));
}

module.exports = { getNews };