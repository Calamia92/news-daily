import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
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
        const res = await getHistory();
        setHistory(res.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setNews(await fetchNews({ keyword: query }));
  };

  const handleSelectNews = async (item) => {
    await addHistory(item);
    setHistory(prev => [item, ...prev]);
    setIsDrawerOpen(true);
  };

  const handleClearHistory = async () => {
    await deleteHistory();
    setHistory([]);
  };

  return (
      <div className="container">
        <header className="header-container">
          <img src={logo} alt="Logo" className="site-logo" />
          <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
        </header>
        <main>
          {news.length ? (
              <>
                <FeaturedNews news={news[0]} />
                <NewsList news={news.slice(1)} onSelect={handleSelectNews} />
              </>
          ) : <p>Chargement…</p>}
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
