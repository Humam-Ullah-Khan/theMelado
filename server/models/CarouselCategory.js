const mongoose = require('mongoose');

const carouselCategorySchema = new mongoose.Schema({
  heading: { type: String, required: true, trim: true },
  image: { type: String, required: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('CarouselCategory', carouselCategorySchema);
