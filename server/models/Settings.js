const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  siteTitle: { type: String, default: 'Garud Social Publisher' },
  siteDescription: { type: String, default: '' },
  social: { type: Object, default: {} },
}, { timestamps: true });

module.exports = mongoose.model('Settings', SettingsSchema);
