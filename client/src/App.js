import React, { useState, useEffect } from "react";
import FeaturedNews from "./components/FeaturedNews.js";
import NewsList from "./components/NewsList.js";
import "./components/styles.css";
import HistoryDrawer from "./components/HistoryDrawer.js";
import { addHistory, getHistory, deleteHistory } from "./services/history";



const API_KEY = process.env.REACT_APP_API_KEY_NEWSAPI;
const API_URL = `https://newsapi.org/v2/top-headlines?country=fr&category=general&apiKey=${API_KEY}`;

function App() {
  const [news, setNews] = useState([]);
  const [history, setHistory] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setNews(data.articles || []);
      })
      .catch((error) => console.error("Erreur lors du chargement des actualités :", error));
  }, []);

  useEffect(() => {
    getHistory().then(response => setHistory(response.data)).catch(err => console.error("Erreur chargement historique:", err));
  }, []);

  const handleSelectNews = (newsItem) => {
    setHistory([newsItem, ...history]);
    setIsDrawerOpen(true);
    addHistory(newsItem).catch(err => console.error("Erreur ajout historique:", err));
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleClearHistory = () => {
    deleteHistory()
      .then(() => setHistory([]))
      .catch(err => console.error("Erreur suppression historique:", err));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query) return;
    fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        setNews(data.articles || []);
      })
      .catch((error) => console.error("Erreur lors de la recherche :", error));
  };

  return (
    <div className="container">
      {/* Barre de recherche centrée */}
      <div className="search-container">
        <form onSubmit={handleSearch} className="search-bar">
          <input
            type="text"
            placeholder="Rechercher une actualité..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">🔍</button>
        </form>
      </div>

      <main>
        {news.length > 0 ? (
          <>
            <FeaturedNews news={news[0]} />
            <NewsList news={news.slice(1)} onSelect={handleSelectNews} />
          </>
        ) : (
          <p>Chargement des actualités...</p>
        )}
      </main>

      {/* Bouton pour ouvrir le drawer */}
      <button onClick={toggleDrawer} className="history-button">
        Voir l'historique
      </button>

      {/* Drawer pour afficher l'historique */}
      <HistoryDrawer open={isDrawerOpen} onClose={toggleDrawer} history={history} onClear={handleClearHistory} />
    </div>
  );
}

export default App;
