const axios = require('axios');

// Axios instance for GNews API
const gNewsClient = axios.create({
    baseURL: 'https://gnews.io/api/v4',
    params: { apikey: process.env.GNEWS_KEY }
});

/**
 * Fetch news articles from GNews API and normalize them.
 * @returns {Promise<Array>} List of news articles with unified fields.
 */
async function getNews() {
    // Example: fetch top headlines (language, country and category can be adjusted)
    const response = await gNewsClient.get('/top-headlines', {
        params: { lang: 'en', country: 'us', max: 10, category: 'general' }
    });
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