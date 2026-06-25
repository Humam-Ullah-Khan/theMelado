const express = require('express');
const router = express.Router();
const CarouselCategory = require('../models/CarouselCategory');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const cats = await CarouselCategory.find().sort({ order: 1 });
    res.json(cats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { heading, image } = req.body;
    if (!heading || !image) return res.status(400).json({ message: 'Heading and image are required' });
    const count = await CarouselCategory.countDocuments();
    const cat = new CarouselCategory({ heading, image, order: count });
    const saved = await cat.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const cat = await CarouselCategory.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!cat) return res.status(404).json({ message: 'Not found' });
    res.json(cat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const cat = await CarouselCategory.findByIdAndDelete(req.params.id);
    if (!cat) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
