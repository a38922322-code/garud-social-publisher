const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log('✅ MongoDB Atlas connected successfully');
})
.catch((err) => {
  console.error('❌ MongoDB connection failed:', err.message || err);
  process.exit(1);
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api/social', require('./routes/social'));

// Serve uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => res.json({ ok: true, name: 'Garud Social Publisher API' }));

// Ensure default admin exists
const ensureAdmin = async () => {
  try {
    const User = require('./models/User');
    const admin = await User.findOne({ username: 'admin' });
    if (!admin) {
      const bcrypt = require('bcrypt');
      const hash = await bcrypt.hash('admin123', 10);
      await User.create({ username: 'admin', password: hash, role: 'admin' });
      console.log('✅ Default admin user created: admin / admin123');
    }
  } catch (err) {
    console.error('Error ensuring admin user:', err.message || err);
  }
};

ensureAdmin();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
