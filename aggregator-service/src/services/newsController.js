const newsapiService = require('../services/newsapi');
const nytimesService = require('../services/nytimes');
const gnewsService = require('../services/gnews');

/**
 * Controller to get news from all sources, merge them, and return as JSON.
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

        // Respond with the combined list of articles as JSON
        res.json(aggregatedArticles);
    } catch (err) {
        // Unexpected error handling
        console.error('Unexpected error in aggregator:', err);
        res.status(500).json({ error: 'Failed to retrieve news articles' });
    }
};