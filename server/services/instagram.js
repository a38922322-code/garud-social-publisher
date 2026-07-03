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

const createInstagramMedia = async ({ image_url, caption, accessToken, igBusinessId }) => {
  if (!accessToken || !igBusinessId) {
    throw new Error('Missing Instagram access token or Instagram business ID');
  }
  const url = `https://graph.facebook.com/v23.0/${igBusinessId}/media`;
  const params = {
    image_url,
    caption,
    access_token: accessToken,
  };
  return postWithRetry(url, params);
};

const publishInstagramMedia = async ({ creation_id, accessToken, igBusinessId }) => {
  if (!accessToken || !igBusinessId) {
    throw new Error('Missing Instagram access token or Instagram business ID');
  }
  const url = `https://graph.facebook.com/v23.0/${igBusinessId}/media_publish`;
  const params = {
    creation_id,
    access_token: accessToken,
  };
  return postWithRetry(url, params);
};

module.exports = { createInstagramMedia, publishInstagramMedia };
