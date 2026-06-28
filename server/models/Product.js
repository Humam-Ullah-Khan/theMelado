const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  prices: {
    cup: { type: Number, default: 0 },
    cone: { type: Number, default: 0 },
    tub: { type: Number, default: 0 }
  },
  singlePrice: { type: Number, default: 0 },
  image: { type: String, default: '' },
  video: { type: String, default: '' },
  available: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  isNew: { type: Boolean, default: false },
  tags: [String],
  order: { type: Number, default: 0 }
}, { timestamps: true, collection: 'products' });

module.exports = mongoose.model('Product', productSchema);
