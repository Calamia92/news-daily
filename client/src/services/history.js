import axios from 'axios';

const baseURL = process.env.REACT_APP_HISTORY_URL;

function getUserId() {
    let id = localStorage.getItem('userId');
    if (!id) {
        id = crypto.randomUUID();
        localStorage.setItem('userId', id);
    }
    return id;
}

export const addHistory = entry =>
    axios.post(`${baseURL}/history`, { ...entry, userId: getUserId() });

export const getHistory = () =>
    axios.get(`${baseURL}/history`, { params: { userId: getUserId() } });

export const deleteHistory = () =>
    axios.delete(`${baseURL}/history`, { params: { userId: getUserId() } });

export const deleteEntry = id =>
    axios.delete(`${baseURL}/history/${id}`, { params: { userId: getUserId() } });
