const axios = require('axios');

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const postWithRetry = async (url, params) => {
  let attempt = 0;
  while (true) {
    try {
      const resp = await axios.post(url, null, { params });
      return resp.data;
    } catch (err) {
      attempt += 1;
      const status = err.response?.status;
      const isRetryable = !status || status >= 500;
      if (attempt >= 3 || !isRetryable) throw err;
      await wait(500 * attempt);
    }
  }
};

// Get page access token for better permission compatibility
const getPageAccessToken = async (userToken, pageId) => {
  try {
    const resp = await axios.get(`https://graph.facebook.com/v23.0/${pageId}`, {
      params: {
        fields: 'access_token',
        access_token: userToken
      }
    });
    return resp.data.access_token || userToken;
  } catch (err) {
    // If we can't get page token, fall back to user token
    return userToken;
  }
};

const publishToFacebook = async ({ message, imageUrl, accessToken, pageId }) => {
  if (!accessToken || !pageId) {
    throw new Error('Missing Facebook access token or page ID');
  }

  // Get page-specific access token for better compatibility
  let finalToken = accessToken;
  try {
    finalToken = await getPageAccessToken(accessToken, pageId);
  } catch (err) {
    console.log('⚠️  Could not retrieve page token, using provided token');
  }

  if (imageUrl) {
    const url = `https://graph.facebook.com/v23.0/${pageId}/photos`;
    const params = {
      caption: message,
      url: imageUrl,
      access_token: finalToken,
      published: true,
    };
    return postWithRetry(url, params);
  }

  const url = `https://graph.facebook.com/v23.0/${pageId}/feed`;
  const params = {
    message,
    access_token: finalToken,
  };
  return postWithRetry(url, params);
};

module.exports = { publishToFacebook };
