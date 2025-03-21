const axios = require('axios');

// Axios instance for New York Times Article Search API
const nyTimesClient = axios.create({
    baseURL: 'https://api.nytimes.com/svc/search/v2',
    params: { 'api-key': process.env.NYTIMES_KEY }
});

/**
 * Fetch news articles from NYTimes Article Search API and normalize them.
 * @returns {Promise<Array>} List of news articles with unified fields.
 */
async function getNews() {
    // Example: fetch latest news articles (using a broad query term)
    const response = await nyTimesClient.get('/articlesearch.json', {
        params: { q: 'news', sort: 'newest' }
    });
    const data = response.data.response;
    const docs = data && data.docs ? data.docs : [];
    // Normalize the articles to a common format
    return docs.map(doc => ({
        title: doc.headline.main,
        description: doc.abstract || doc.snippet || '',
        url: doc.web_url,
        date: doc.pub_date,
        source: 'nytimes'
    }));
}

module.exports = { getNews };