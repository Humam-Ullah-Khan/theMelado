const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
  desktopBanner: { type: String, default: '/images/DesktopBanner.jfif' },
  mobileBanner: { type: String, default: '/images/MobileBanner.jpg' }
}, { timestamps: true });

module.exports = mongoose.model('Hero', heroSchema);
