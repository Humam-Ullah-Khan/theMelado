const express = require('express');
const router = express.Router();
const Hero = require('../models/Hero');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    let hero = await Hero.findOne();
    if (!hero) {
      hero = await Hero.create({});
    }
    res.json(hero);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/', auth, async (req, res) => {
  try {
    let hero = await Hero.findOne();
    if (!hero) {
      hero = await Hero.create(req.body);
    } else {
      Object.assign(hero, req.body);
      await hero.save();
    }
    res.json(hero);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
