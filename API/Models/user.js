const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    price: { type: Number, required: true },
    userImage: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
