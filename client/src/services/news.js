import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_AGGREGATOR_URL });

export const fetchNews = async (filters = {}) => {
    const { data } = await API.get('/api/news', { params: filters });
    return data.articles || [];
};
