const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
    title:      { type: String, required: true },
    url:        { type: String, required: true },
    source:     { type: String },
    publishedAt:{ type: Date },
    viewedAt:   { type: Date, default: Date.now }
});

module.exports = mongoose.model('History', HistorySchema);
