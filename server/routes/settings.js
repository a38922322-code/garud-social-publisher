const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json(settings);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

router.put('/', auth, async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) settings = new Settings(req.body);
    Object.assign(settings, req.body);
    await settings.save();
    res.json(settings);
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
