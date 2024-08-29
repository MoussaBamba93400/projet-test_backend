const mongoose = require('mongoose');

const timerSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    time: { type: Number, required: true }, // Time in milliseconds
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Timer', timerSchema);
