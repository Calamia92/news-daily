import React from "react";
import NewsItem from "./NewsItem";

function NewsList({ news, onSelect }) {
  return (
    <div className="news-list">
      {news.map((item) => (
        <NewsItem key={item.id} news={item} onClick={() => onSelect(item)} />
      ))}
    </div>
  );
}

export default NewsList;
