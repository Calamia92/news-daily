# News Daily — Agrégateur d’Actualités (MERN Microservices)

Ce projet est un agrégateur d’actualités filtrable avec historique de consultation, développé en architecture microservices (MERN) dans le cadre d’un projet scolaire. Chaque microservice est indépendant et communique via HTTP. Le front‑end React consomme directement les endpoints exposés par les services.

---
## 📁 Structure du dépôt
```
my-aggregator-news/
├── aggregator-service/     # Service d’agrégation des news depuis plusieurs APIs externes
├── filtering-service/      # Service de filtrage et recherche sur les news agrégées
├── history-service/        # Service d’historique (CRUD sur les consultations)
└── client/                 # Application front‑end React
```

---
## ⚙️ Technologies
| Service            | Stack                        |
|--------------------|------------------------------|
| Aggregator Service | Node.js, Express, Axios      |
| Filtering Service  | Node.js, Express             |
| History Service    | Node.js, Express, Mongoose   |
| Client             | React (Create React App), Axios |
| Base de données    | MongoDB Atlas                |

---
## 🚀 Prérequis
- Node.js v16+ et npm
- Compte MongoDB Atlas
- Clés API pour les sources d’actualités : NewsAPI, NYTimes, GNews

---
## 🔧 Configuration des variables d’environnement
Crée un fichier `.env` dans chaque service et dans `client/` avec les variables suivantes :

### aggregator-service/.env
```
NEWSAPI_KEY=<clé-newsapi>
NYT_API_KEY=<clé-nytimes>
GNEWS_API_KEY=<clé-gnews>
PORT=5001
```

### filtering-service/.env
```
PORT=5002
```

### history-service/.env
```
MONGO_URI=<ton-mongo-uri>
PORT=5003
```

### client/.env
```
REACT_APP_AGGREGATOR_URL=http://localhost:5001
REACT_APP_FILTERING_URL=http://localhost:5002
REACT_APP_HISTORY_URL=http://localhost:5003
```

---
## 📦 Installation
Depuis la racine du dépôt :
```bash
npm install
```
Puis pour chaque service (ou utilisez un seul script avec `concurrently`) :
```bash
cd aggregator-service && npm install
cd filtering-service && npm install
cd history-service && npm install
cd client && npm install
```

---
## ▶️ Lancement
### Méthode manuelle (4 terminaux)
```bash
cd aggregator-service && npm run dev
cd filtering-service && npm run dev
cd history-service && npm run dev
cd client && npm start
```

### Méthode unique (racine)
Ajoute dans `package.json` racine :
```jsonc
"scripts": { "start": "concurrently \"npm run dev --prefix aggregator-service\" \"npm run dev --prefix filtering-service\" \"npm run dev --prefix history-service\" \"npm start --prefix client\"" }
```
Puis :
```bash
npm start
```

---
## 📡 Endpoints

### History Service (5003)
- `POST /history` — Ajouter une entrée (body JSON { userId, title, url, source, publishedAt })
- `GET /history?userId=<id>` — Récupérer l’historique d’un utilisateur
- `DELETE /history?userId=<id>` — Vider l’historique
- `DELETE /history/:id?userId=<id>` — Supprimer une entrée

### Client (3000)
Ouvre http://localhost:3000 dans ton navigateur pour accéder à l’interface.

---
## 📖 Exemple cURL
```bash
curl -X POST http://localhost:5003/history -H 'Content-Type: application/json' -d '{"userId":"123","title":"Titre","url":"https://...","source":"newsapi","publishedAt":"2025-03-20T00:00:00Z"}'
```

---
## 🤝 Contributions
- Respectez la structure de dossiers
- Commitez fréquemment et poussez sur GitHub
