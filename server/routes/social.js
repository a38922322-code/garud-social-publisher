const express = require('express');
const router = express.Router();
const axios = require('axios');
const auth = require('../middleware/auth');

const lastErrors = []; // Simple in-memory store for last errors
const recordError = (error) => {
  const errorData = error.response?.data?.error || { message: error.message, code: error.code, status: error.response?.status };
  lastErrors.unshift({ error: errorData, timestamp: new Date() });
  if (lastErrors.length > 10) {
    lastErrors.pop();
  }
};

router.get('/test', auth, async (req, res) => {
  const accessToken = process.env.FACEBOOK_ACCESS_TOKEN || process.env.META_ACCESS_TOKEN;
  const fbPageId = process.env.FB_PAGE_ID;
  const igBusinessId = process.env.IG_BUSINESS_ID;
  const backendUrl = process.env.BACKEND_URL || `${req.protocol}://${req.get('host')}`;

  const response = {
    facebook: 'disconnected',
    instagram: 'disconnected',
    imagePublicAccess: false,
    lastErrors: lastErrors,
  };

  if (!accessToken || !fbPageId || !igBusinessId) {
    return res.status(400).json({ ...response, message: 'Required environment variables (FACEBOOK_ACCESS_TOKEN or META_ACCESS_TOKEN, FB_PAGE_ID, IG_BUSINESS_ID) are not set.' });
  }

  // 1. Test Facebook Connection
  try {
    const fbResp = await axios.get(`https://graph.facebook.com/v23.0/${fbPageId}`, {
      params: { fields: 'id,name', access_token: accessToken }
    });
    if (fbResp.data.id === fbPageId) {
      response.facebook = 'connected';
    }
  } catch (e) {
    recordError(e);
  }

  // 2. Test Instagram Connection
  try {
    const igResp = await axios.get(`https://graph.facebook.com/v23.0/${igBusinessId}`, {
      params: { fields: 'id,username', access_token: accessToken }
    });
    if (igResp.data.id === igBusinessId) {
      response.instagram = 'connected';
    }
  } catch (e) {
    recordError(e);
  }

  // 3. Test Public Image Access
  try {
    const testUrl = `${backendUrl}/api/social/health-check`;
    const publicAccessResp = await axios.get(testUrl, { timeout: 5000 });
    if (publicAccessResp.status === 200) {
      response.imagePublicAccess = true;
    }
  } catch (e) {
    response.imagePublicAccess = false;
    response.imageAccessError = `Failed to access backend URL (${backendUrl}). Error: ${e.message}`;
  }

  res.json(response);
});

// Simple health check endpoint for the public access test
router.get('/health-check', (req, res) => res.json({ status: 'ok' }));

module.exports = router;