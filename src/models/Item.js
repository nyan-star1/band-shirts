const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true, maxlength: 100 },
  genre: { type: String, required: true }, // Add genre field
  image: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);
