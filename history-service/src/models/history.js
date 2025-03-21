const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
    userId:     { type: String, required: true },
    title:      { type: String, required: true },
    url:        { type: String, required: true },
    source:     String,
    publishedAt: Date,
    viewedAt:   { type: Date, default: Date.now }
});


module.exports = mongoose.model('History', HistorySchema);
