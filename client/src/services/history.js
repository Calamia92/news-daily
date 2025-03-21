import axios from 'axios';

const baseURL = process.env.REACT_APP_HISTORY_URL;

export const addHistory = entry =>
    axios.post(`${baseURL}/history`, entry);

export const getHistory = () =>
    axios.get(`${baseURL}/history`);

export const deleteHistory = () =>
    axios.delete(`${baseURL}/history`);

export const deleteEntry = id =>
    axios.delete(`${baseURL}/history/${id}`);
