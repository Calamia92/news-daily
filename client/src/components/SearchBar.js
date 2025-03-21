import React from "react";
import "./SearchBar.css"; // Import du fichier CSS
import logo from "./assets/images/logo.png"; // Assure-toi du bon chemin du logo

const SearchBar = () => {
  return (
    <div className="search-container">
      {/* Logo */}
      <img src={logo} alt="Logo Actualité" className="logo" />

      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="Rechercher une actualité..."
        className="search-bar"
      />
    </div>
  );
};

export default SearchBar;
