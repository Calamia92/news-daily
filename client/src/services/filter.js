import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL; 

export const filterArticles = async (articles, filters) => {
    try {
        const response = await axios.post(`${baseURL}/articles/filter`, {
            articles,
            ...filters
        });
        return response.data.filtered; 
    } catch (error) {
        console.error("Erreur lors du filtrage des articles:", error);
        return [];
    }
};
