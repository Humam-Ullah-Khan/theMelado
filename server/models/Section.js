const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  heading: { type: String, required: true, trim: true, unique: true },
  subheading: { type: String, default: '', trim: true },
  type: { type: String, enum: ['hero', 'category', 'custom'], default: 'custom' },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Section', sectionSchema);
