import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL; // Assure-toi que cette variable est définie dans ton fichier .env

export const filterArticles = async (articles, filters) => {
    try {
        const response = await axios.post(`${baseURL}/articles/filter`, {
            articles,
            ...filters
        });
        return response.data.filtered; // Retourne uniquement les articles filtrés
    } catch (error) {
        console.error("Erreur lors du filtrage des articles:", error);
        return [];
    }
};
