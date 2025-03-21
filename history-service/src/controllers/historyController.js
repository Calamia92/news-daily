const History = require('../models/history');

// POST /history — ajouter un article consulté
exports.add = async (req, res) => {
    const { userId, title, url, source, publishedAt } = req.body;
    if (!userId) return res.status(400).json({ error: 'userId requis' });

    try {
        const entry = await History.create({ userId, title, url, source, publishedAt });
        res.status(201).json(entry);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


// GET /history — récupérer tout l’historique trié par date décroissante
exports.getAll = async (req, res) => {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ error: 'userId requis' });

    try {
        const entries = await History.find({ userId }).sort({ viewedAt: -1 });
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
