const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const slugify = require('slugify');
const Post = require('../models/Post');
const auth = require('../middleware/auth');
const cloudinary = require('cloudinary').v2;
const { publishToFacebook } = require('../services/facebook');
const { createInstagramMedia, publishInstagramMedia } = require('../services/instagram');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ dest: path.join(__dirname, '..', 'uploads/') });

const buildAbsoluteUrl = (req, relativePath) => {
  const baseUrl = process.env.BACKEND_URL || `${req.protocol}://${req.get('host')}`;
  return `${baseUrl}${relativePath}`;
};

const normalizePostImage = (post, req) => {
  if (!post) return post;
  const obj = post.toObject ? post.toObject() : { ...post };
  if (obj.image && obj.image.startsWith('/uploads/')) {
    obj.image = buildAbsoluteUrl(req, obj.image);
  }
  return obj;
};

const canUseCloudinary = Boolean(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET);

// Create post
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, content, excerpt, category, tags, status } = req.body;
    let imageUrl = req.body.image || null;
    let cloudImageUrl = null;

    if (req.file) {
      const localRelativeUrl = `/uploads/${req.file.filename}`;
      imageUrl = buildAbsoluteUrl(req, localRelativeUrl);
      if (canUseCloudinary) {
        try {
          const uploaded = await cloudinary.uploader.upload(req.file.path, { folder: 'garud_posts' });
          cloudImageUrl = uploaded.secure_url;
          imageUrl = cloudImageUrl;
        } catch (e) {
          console.error('Cloudinary upload failed', e?.message || e);
        }
      }
    }

    const slug = slugify(title, { lower: true, strict: true });
    const post = new Post({
      title,
      slug,
      content,
      excerpt,
      category,
      tags: tags ? (Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim())) : [],
      image: imageUrl,
      imageCloud: cloudImageUrl,
      status: status || 'draft',
      publishedAt: status === 'published' ? new Date() : null,
      createdBy: req.user.id,
    });

    await post.save();

    if (post.status === 'published') {
      const accessToken = process.env.FACEBOOK_ACCESS_TOKEN || process.env.META_ACCESS_TOKEN;
      const fbPageId = process.env.FB_PAGE_ID;
      const igBusinessId = process.env.IG_BUSINESS_ID;
      const caption = `${post.title}\n\n${post.excerpt || ''}`;
      
      // Use Cloudinary URL if available, otherwise use local absolute URL
      const socialImageUrl = (post.imageCloud && post.imageCloud.startsWith('http')) ? post.imageCloud : (post.image && post.image.startsWith('http') ? post.image : null);

      if (accessToken && fbPageId) {
        try {
          const fbRes = await publishToFacebook({ message: caption, imageUrl: socialImageUrl, accessToken, pageId: fbPageId });
          const facebookPostId = fbRes.post_id || fbRes.id;
          if (facebookPostId) {
            post.facebookPostId = facebookPostId;
            console.log('✅ Facebook post created', { postId: post._id.toString(), facebookId: facebookPostId });
          }
        } catch (e) {
          const errorData = e.response?.data?.error || { message: e.message, code: e.code };
          console.error('❌ Facebook publish error:', JSON.stringify(errorData, null, 2));
        }
      }

      if (socialImageUrl && accessToken && igBusinessId) {
        try {
          const creation = await createInstagramMedia({ image_url: socialImageUrl, caption, accessToken, igBusinessId });
          if (creation && creation.id) {
            const pub = await publishInstagramMedia({ creation_id: creation.id, accessToken, igBusinessId });
            if (pub && pub.id) {
              post.instagramPostId = pub.id;
              console.log('✅ Instagram post created', { postId: post._id.toString(), instagramId: pub.id });
            }
          }
        } catch (e) {
          const errorData = e.response?.data?.error || { message: e.message, code: e.code };
          console.error('❌ Instagram publish error:', JSON.stringify(errorData, null, 2));
        }
      }

      await post.save();
    }

    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update post
router.put('/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Not found' });

    const { title, content, excerpt, category, tags, status } = req.body;
    if (title && title !== post.title) {
      post.title = title;
      post.slug = slugify(title, { lower: true, strict: true });
    }
    post.content = content || post.content;
    post.excerpt = excerpt || post.excerpt;
    post.category = category || post.category;
    post.tags = tags ? (Array.isArray(tags) ? tags : tags.split(',').map(t=>t.trim())) : post.tags;

    if (req.file) {
      const localRelativeUrl = `/uploads/${req.file.filename}`;
      post.image = buildAbsoluteUrl(req, localRelativeUrl);
      if (canUseCloudinary) {
        try {
          const uploaded = await cloudinary.uploader.upload(req.file.path, { folder: 'garud_posts' });
          post.image = uploaded.secure_url;
          post.imageCloud = uploaded.secure_url;
        } catch (e) {
          console.error('Cloudinary upload failed', e?.message || e);
        }
      }
      fs.unlink(req.file.path, () => {});
    }

    const wasDraft = post.status === 'draft';
    post.status = status || post.status;
    if (wasDraft && post.status === 'published') post.publishedAt = new Date();

    await post.save();

    if (wasDraft && post.status === 'published') {
      const accessToken = process.env.FACEBOOK_ACCESS_TOKEN || process.env.META_ACCESS_TOKEN;
      const fbPageId = process.env.FB_PAGE_ID;
      const igBusinessId = process.env.IG_BUSINESS_ID;
      const caption = `${post.title}\n\n${post.excerpt || ''}`;
      
      // Use Cloudinary URL if available, otherwise use local absolute URL
      const socialImageUrl = (post.imageCloud && post.imageCloud.startsWith('http')) ? post.imageCloud : (post.image && post.image.startsWith('http') ? post.image : null);

      if (accessToken && fbPageId) {
        try {
          const fbRes = await publishToFacebook({ message: caption, imageUrl: socialImageUrl, accessToken, pageId: fbPageId });
          const facebookPostId = fbRes.post_id || fbRes.id;
          if (facebookPostId) {
            post.facebookPostId = facebookPostId;
            console.log('✅ Facebook post created', { postId: post._id.toString(), facebookId: facebookPostId });
          }
        } catch (e) {
          const errorData = e.response?.data?.error || { message: e.message, code: e.code };
          console.error('❌ Facebook publish error:', JSON.stringify(errorData, null, 2));
        }
      }

      if (socialImageUrl && accessToken && igBusinessId) {
        try {
          const creation = await createInstagramMedia({ image_url: socialImageUrl, caption, accessToken, igBusinessId });
          if (creation && creation.id) {
            const pub = await publishInstagramMedia({ creation_id: creation.id, accessToken, igBusinessId });
            if (pub && pub.id) {
              post.instagramPostId = pub.id;
              console.log('✅ Instagram post created', { postId: post._id.toString(), instagramId: pub.id });
            }
          }
        } catch (e) {
          const errorData = e.response?.data?.error || { message: e.message, code: e.code };
          console.error('❌ Instagram publish error:', JSON.stringify(errorData, null, 2));
        }
      }
      await post.save();
    }

    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get by id
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Not found' });
    res.json(normalizePostImage(post, req));
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

// Delete post
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Not found' });
    await post.remove();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Public list
router.get('/', async (req, res) => {
  try {
    const { q, category, tag } = req.query;
    const filter = { status: 'published' };
    if (category) filter.category = category;
    if (tag) filter.tags = tag;
    if (q) filter.$or = [ { title: new RegExp(q, 'i') }, { content: new RegExp(q, 'i') }, { excerpt: new RegExp(q, 'i') } ];
    const posts = await Post.find(filter).sort({ publishedAt: -1 });
    res.json(posts.map(post => normalizePostImage(post, req)));
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

// Get by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug, status: 'published' });
    if (!post) return res.status(404).json({ message: 'Not found' });
    res.json(normalizePostImage(post, req));
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

// Admin list
router.get('/admin/all', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts.map(post => normalizePostImage(post, req)));
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
