const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String },
  excerpt: { type: String },
  category: { type: String },
  tags: [{ type: String }],
  image: { type: String },
  imageCloud: { type: String },
  status: { type: String, enum: ['draft','published'], default: 'draft' },
  publishedAt: { type: Date },
  facebookPostId: { type: String },
  instagramPostId: { type: String },
  createdBy: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
