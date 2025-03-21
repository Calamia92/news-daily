const History = require('../models/history');

// POST /history — ajouter un article consulté
exports.add = async (req, res) => {
    try {
        const newEntry = await History.create(req.body);
        res.status(201).json(newEntry);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// GET /history — récupérer tout l’historique trié par date décroissante
exports.getAll = async (req, res) => {
    try {
        const entries = await History.find().sort({ viewedAt: -1 });
        res.json(entries);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Supprimer tout l’historique
exports.deleteAll = async (req, res) => {
    try {
        await History.deleteMany({});
        res.status(200).json({ message: 'Historique vidé.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Supprimer une seule entrée
exports.deleteOne = async (req, res) => {
    try {
        const deleted = await History.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Entrée non trouvée.' });
        res.status(200).json({ message: 'Entrée supprimée.', deleted });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
