const mongoose = require('mongoose');

const matchSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    match: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    quantity: { type: Number, default: 1 }
});

module.exports = mongoose.model('Match', matchSchema);