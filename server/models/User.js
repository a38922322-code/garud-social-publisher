const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, unique: true, sparse: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin','editor','user'], default: 'admin' },
  refreshToken: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
