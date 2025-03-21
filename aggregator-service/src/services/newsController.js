const axios = require('axios');
const newsapiService = require('../services/newsapi');
const nytimesService = require('../services/nytimes');
const gnewsService = require('../services/gnews');

/**
 * Envoie la liste d'articles au service de filtrage via une requête POST.
 * @param {Array} articles - Tableau d'articles à filtrer
 * @returns {Promise<Array>} Tableau d'articles filtrés
 */
async function sendToFilterService(articles) {
    try {
        const response = await axios.post('http://localhost:4000/filter', { articles });
        // On suppose que le service renvoie un objet { filteredArticles: [...] }
        return response.data.filteredArticles;
    } catch (error) {
        console.error('Erreur lors de l\'envoi au Filter Service :', error);
        // En cas d'erreur, on renvoie les articles bruts pour ne pas tout bloquer
        return articles;
    }
}
/**
 * Controller to get news from all sources, merge them, optionally filter them, and return as JSON.
 */
exports.getNews = async (req, res) => {
    try {
        // Fetch data from all three services in parallel
        const [newsapiResult, nytimesResult, gnewsResult] = await Promise.allSettled([
            newsapiService.getNews(),
            nytimesService.getNews(),
            gnewsService.getNews()
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

        // 🔴 Appel du Filter Service (optionnel si tu souhaites filtrer avant la réponse)
        const filteredArticles = await sendToFilterService(aggregatedArticles);

        // On renvoie le résultat final (filtré ou brut en cas d'erreur)
        res.json(filteredArticles);
    } catch (err) {
        console.error('Unexpected error in aggregator:', err);
        res.status(500).json({ error: 'Failed to retrieve news articles' });
    }
};