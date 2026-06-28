const express = require('express');
const router = express.Router();
const Section = require('../models/Section');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const sections = await Section.find().sort({ order: 1 });
    res.json(sections);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/reorder', auth, async (req, res) => {
  try {
    const { orders } = req.body;
    if (!Array.isArray(orders)) return res.status(400).json({ message: 'orders must be an array' });
    for (const { _id, order } of orders) {
      await Section.findByIdAndUpdate(_id, { order });
    }
    const sections = await Section.find().sort({ order: 1 });
    res.json(sections);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { heading, subheading } = req.body;
    if (!heading || !heading.trim()) {
      return res.status(400).json({ message: 'Heading is required' });
    }
    const existing = await Section.findOne({ heading: heading.trim() });
    if (existing) {
      return res.status(400).json({ message: 'A section with this heading already exists' });
    }
    const count = await Section.countDocuments();
    const section = new Section({ heading: heading.trim(), subheading: subheading || '', order: count });
    const saved = await section.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const section = await Section.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!section) return res.status(404).json({ message: 'Section not found' });
    res.json(section);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const section = await Section.findByIdAndDelete(req.params.id);
    if (!section) return res.status(404).json({ message: 'Section not found' });
    await Product.updateMany({ category: section.heading }, { category: 'Uncategorized' });
    res.json({ message: 'Section deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
