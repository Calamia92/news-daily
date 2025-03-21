import React from "react";

const SearchBar = ({ query, setQuery, onSearch }) => (
    <div className="search-container">
        <form onSubmit={onSearch} className="search-bar">
            <input
                type="text"
                placeholder="Rechercher une actualité..."
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
            <button type="submit">🔍</button>
        </form>
    </div>
);

export default SearchBar;
