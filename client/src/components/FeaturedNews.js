import React from "react";

const FeaturedNews = ({ news }) => {
  return (
    <div>
      <h2>{news.title}</h2>
        <p>{news.description}</p>
      <img src={news.image} alt={news.title} />
    </div>
  );
};

export default FeaturedNews;
