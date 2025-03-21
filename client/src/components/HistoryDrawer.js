import React from "react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

const HistoryDrawer = ({ open, onClose, history, onClear }) => {
  return (
      <Drawer open={open} onClose={onClose} direction="right" size={350}>
        <div style={{ 
          padding: "20px", 
          backgroundColor: "#333",
          color: "#fff",
          height: "100%"
        }}>
          <h3 style={{ 
            borderBottom: "2px solid #4A90E2", 
            paddingBottom: "10px",
            fontSize: "22px"
          }}>
            Historique
          </h3>
          
          {history.length > 0 ? (
              <ul style={{ 
                listStyleType: "none", 
                padding: 0, 
                margin: "15px 0",
                maxHeight: "calc(100vh - 160px)",
                overflowY: "auto"
              }}>
                {history.map(news => (
                    <li key={news.url} style={{ 
                      padding: "12px 8px", 
                      borderBottom: "1px solid #555",
                      fontSize: "16px",
                      lineHeight: "1.4"
                    }}>
                      {news.title}
                    </li>
                ))}
              </ul>
          ) : (
              <p style={{ color: "#ccc", fontStyle: "italic", margin: "25px 0" }}>
                Aucun historique de consultation
              </p>
          )}
          
          <div style={{ 
            display: "flex", 
            gap: "10px", 
            marginTop: "20px" 
          }}>
            <button 
              onClick={onClear} 
              style={{ 
                backgroundColor: "#FF6F61",
                color: "white",
                border: "none",
                padding: "10px 15px",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
                flex: 1
              }}>
              Effacer l'historique
            </button>
            <button 
              onClick={onClose} 
              style={{ 
                backgroundColor: "#4A90E2",
                color: "white",
                border: "none",
                padding: "10px 15px",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
                flex: 1
              }}>
              Fermer
            </button>
          </div>
        </div>
      </Drawer>
  );
};

export default HistoryDrawer;
