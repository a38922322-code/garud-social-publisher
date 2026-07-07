const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const allowedOrigins = [process.env.FRONTEND_URL, process.env.CORS_ORIGIN]
  .flatMap((value) => (value ? value.split(',') : []))
  .map((value) => value.trim())
  .filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (
      allowedOrigins.length === 0 ||
      allowedOrigins.includes(origin) ||
      /^http:\/\/localhost(:\d+)?$/.test(origin) ||
      /^http:\/\/127\.0\.0\.1(:\d+)?$/.test(origin)
    ) {
      return callback(null, true);
    }
    return callback(new Error(`Not allowed by CORS: ${origin}`));
  },
  credentials: true,
};

app.use(cors(corsOptions));
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
app.use('/uploads', express.static('uploads'));

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
