import React from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

const HistoryDrawer = ({ open, onClose, history }) => {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      direction="right"
      size={300} // Taille du drawer
    >
      <div style={{ padding: "20px" }}>
        <h3>Historique</h3>
        <ul>
          {history.length > 0 ? (
            history.map((news, index) => <li key={index}>{news.title}</li>)
          ) : (
            <p>Aucun historique</p>
          )}
        </ul>
        <button onClick={onClose} style={{ marginTop: "10px" }}>
          Fermer
        </button>
      </div>
    </Drawer>
  );
};

export default HistoryDrawer;
