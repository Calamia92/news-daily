const axios = require('axios');

// Axios instance for NewsAPI
const newsApiClient = axios.create({
    baseURL: 'https://newsapi.org/v2',
    params: { apiKey: process.env.NEWSAPI_KEY }
});

/**
 * Fetch news articles from NewsAPI and normalize them.
 * @returns {Promise<Array>} List of news articles with unified fields.
 */
async function getNews() {
    // Example: fetch top headlines (country and category can be adjusted)
    const response = await newsApiClient.get('/top-headlines', {
        params: { country: 'us', category: 'general' }
    });
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