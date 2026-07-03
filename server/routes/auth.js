const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Missing fields' });
    const exists = await User.findOne({ username });
    if (exists) return res.status(400).json({ message: 'User exists' });
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hash, role: 'admin' });
    await user.save();
    res.json({ message: 'User created', user: { id: user._id, username: user.username } });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ $or: [{ username }, { email: username }] });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    // create simple refresh token (long lived)
    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '14d' });
    user.refreshToken = refreshToken;
    await user.save();
    res.json({ token, refreshToken, user: { id: user._id, username: user.username, role: user.role } });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// Refresh
router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ message: 'Missing token' });
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) return res.status(401).json({ message: 'Invalid refresh token' });
    const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (err) { console.error(err); res.status(401).json({ message: 'Invalid token' }); }
});

// Profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password -refreshToken');
    res.json({ user });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// User count for dashboard
router.get('/users/count', auth, async (req, res) => {
  try {
    const total = await User.countDocuments();
    res.json({ total });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
