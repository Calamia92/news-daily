import React from "react";

function NewsItem({ news, onClick }) {
  // Vérifie si `news` est bien défini avant d'afficher quoi que ce soit
  if (!news) {
    console.error("NewsItem : la prop 'news' est undefined !");
    return null;
  }

  return (
    <div 
      className="news-item" 
      onClick={() => {
        if (onClick) {
          console.log("News sélectionnée :", news);
          onClick();
        } else {
          console.warn("NewsItem : `onClick` non défini !");
        }
      }} 
      style={{ cursor: "pointer", padding: "10px", borderBottom: "1px solid #ddd" }}
    >
      <h3>{news.title}</h3>
      <p>{news.content}</p>
      {news.image && <img src={news.image} alt={news.title} style={{ width: "100px", height: "auto" }} />}
    </div>
  );
}

export default NewsItem;
