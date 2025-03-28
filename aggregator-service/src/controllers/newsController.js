const newsapiService = require('../services/newsapi');
const nytimesService = require('../services/nytimes');
const gnewsService = require('../services/gnews');
const axios = require('axios');

async function sendToFilterService(articles) {
  try {
    const response = await axios.post('http://localhost:5002/api/filter/filter', { articles });
    return response.data.filteredArticles;
  } catch (error) {
    console.error("Erreur lors de l'envoi au Filter Service :", error);
    return articles;
  }
}

/**
 * Controller to get news from all sources, merge them, and return as JSON.
 */
exports.getNews = async (req, res) => {
    try {
        // Récupérer le terme de recherche depuis la requête
        const { keyword } = req.query;
        
        // Fetch data from all three services in parallel
        const [newsapiResult, nytimesResult, gnewsResult] = await Promise.allSettled([
            newsapiService.getNews(keyword),
            nytimesService.getNews(keyword),
            gnewsService.getNews(keyword)
        ]);

        // Merge results into one array, include only fulfilled results
        let aggregatedArticles = [];
        if (newsapiResult.status === 'fulfilled') {
            aggregatedArticles = aggregatedArticles.concat(newsapiResult.value);
        } else {
            console.error('Error fetching from NewsAPI:', newsapiResult.reason);
        }
        if (nytimesResult.status === 'fulfilled') {
            aggregatedArticles = aggregatedArticles.concat(nytimesResult.value);
        } else {
            console.error('Error fetching from NYTimes:', nytimesResult.reason);
        }
        if (gnewsResult.status === 'fulfilled') {
            aggregatedArticles = aggregatedArticles.concat(gnewsResult.value);
        } else {
            console.error('Error fetching from GNews:', gnewsResult.reason);
        }

        // Si un mot-clé est fourni, filtrer les articles localement
        if (keyword) {
            const keywordLower = keyword.toLowerCase();
            aggregatedArticles = aggregatedArticles.filter(article => 
                article.title.toLowerCase().includes(keywordLower) || 
                (article.description && article.description.toLowerCase().includes(keywordLower))
            );
        }

        // Appel du Filter Service
        const filteredArticles = await sendToFilterService(aggregatedArticles);

        res.json({ articles: filteredArticles });
    } catch (err) {
        console.error('Unexpected error in aggregator:', err);
        res.status(500).json({ error: 'Failed to retrieve news articles' });
    }
};