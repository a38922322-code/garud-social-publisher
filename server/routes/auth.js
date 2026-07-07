const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');
const auth = require('../middleware/auth');

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ success: false, message: 'Username and password are required' });

    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, admin.password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id, username: admin.username, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({
      success: true,
      token,
      admin: { id: admin._id, username: admin.username, createdAt: admin.createdAt, updatedAt: admin.updatedAt },
    });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// Profile
router.get('/profile', auth, async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select('-password');
    if (!admin) return res.status(404).json({ message: 'Admin not found' });
    res.json({ admin });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// Admin count for dashboard
router.get('/admins/count', auth, async (req, res) => {
  try {
    const total = await Admin.countDocuments();
    res.json({ total });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
