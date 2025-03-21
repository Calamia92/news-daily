import React from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

const HistoryDrawer = ({ open, onClose, history, onClear }) => {
  return (
      <Drawer open={open} onClose={onClose} direction="right" size={300}>
        <div style={{ padding: "20px" }}>
          <h3>Historique</h3>
          {history.length > 0 ? (
              <ul>
                {history.map(news => (
                    <li key={news.url}>{news.title}</li>
                ))}
              </ul>
          ) : (
              <p>Aucun historique</p>
          )}
          <button onClick={onClear} style={{ marginTop: "10px", marginRight: "8px" }}>
            Effacer l’historique
          </button>
          <button onClick={onClose} style={{ marginTop: "10px" }}>
            Fermer
          </button>
        </div>
      </Drawer>
  );
};

export default HistoryDrawer;
