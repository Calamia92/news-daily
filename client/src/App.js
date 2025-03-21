import React, { useState, useEffect } from "react";
import FeaturedNews from "./components/FeaturedNews.js";
import NewsList from "./components/NewsList.js";
import HistoryDrawer from "./components/HistoryDrawer.js";
import logo from "./images/logo.webp";
import "./components/styles.css";
import axios from "axios";


function App() {
  const [news, setNews] = useState([]);
  const [history, setHistory] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios.get("/news")
      .then((response) => setNews(response.data.articles || []))
      .catch((error) => console.error("Erreur API :", error));
  }, []);

  useEffect(() => {
    axios.get("/history")
      .then((response) => setHistory(response.data))
      .catch((error) => console.error("Erreur chargement historique:", error));
  }, []);

  const handleSelectNews = async (newsItem) => {
    try {
      await axios.post("/history", newsItem);
      setHistory([newsItem, ...history]);
      setIsDrawerOpen(true);
    } catch (error) {
      console.error("Erreur ajout historique:", error);
    }
  };

  const handleClearHistory = async () => {
    try {
      await axios.delete("/history");
      setHistory([]);
    } catch (error) {
      console.error("Erreur suppression historique:", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;
    try {
      const response = await axios.get(`/search?q=${query}`);
      setNews(response.data.articles || []);
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
    }
  };

  return (
    <div className="container">
      {/* Logo et barre de recherche */}
      <div className="header-container">
        <img src={logo} alt="Logo du site" className="site-logo" />
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

      {/* Bouton pour ouvrir l'historique */}
      <button onClick={() => setIsDrawerOpen(true)} className="history-button">
        Voir l'historique
      </button>

      {/* Drawer pour afficher l'historique */}
      <HistoryDrawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        history={history}
        onClear={handleClearHistory}
      />
    </div>
  );
}

export default App;
