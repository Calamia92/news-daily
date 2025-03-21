import React, { useState, useEffect } from "react";
import FeaturedNews from "./components/FeaturedNews";
import NewsList from "./components/NewsList";
import HistoryDrawer from "./components/HistoryDrawer";
import logo from "./images/logo.webp";
import "./components/styles.css";

import { fetchNews } from "./services/news";
import { getHistory, addHistory, deleteHistory } from "./services/history";

function App() {
  const [news, setNews] = useState([]);
  const [history, setHistory] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setNews(await fetchNews());
      } catch (error) {
        console.error("Erreur API :", error);
      }
    })();
    (async () => {
      try {
        const res = await getHistory();
        setHistory(res.data);
      } catch (error) {
        console.error("Erreur chargement historique:", error);
      }
    })();
  }, []);

  const handleSelectNews = async (newsItem) => {
    try {
      await addHistory(newsItem);
      setHistory(prev => [newsItem, ...prev]);
      setIsDrawerOpen(true);
    } catch (error) {
      console.error("Erreur ajout historique:", error);
    }
  };

  const handleClearHistory = async () => {
    try {
      await deleteHistory();
      setHistory([]);
    } catch (error) {
      console.error("Erreur suppression historique:", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;
    try {
      setNews(await fetchNews({ keyword: query }));
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
    }
  };

  return (
      <div className="container">
        <header className="header-container">
          <img src={logo} alt="Logo du site" className="site-logo" />
          <form onSubmit={handleSearch} className="search-bar">
            <input
                type="text"
                placeholder="Rechercher une actualité..."
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
            <button type="submit">🔍</button>
          </form>
        </header>

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

        <button onClick={() => setIsDrawerOpen(true)} className="history-button">
          Voir l'historique
        </button>

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
