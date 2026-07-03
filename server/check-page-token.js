const dotenv = require('dotenv');
const path = require('path');
const axios = require('axios');

dotenv.config({ path: path.join(__dirname, '.env') });

const token = process.env.META_ACCESS_TOKEN;
const pageId = process.env.FB_PAGE_ID;

const maskToken = (t) => {
  if (!t) return 'NOT LOADED';
  return t.substring(0, 10) + '...' + t.substring(t.length - 10);
};

console.log('\n📋 FACEBOOK PAGE TOKEN RETRIEVAL\n');

// Get page access token from page itself
axios.get(`https://graph.facebook.com/v23.0/${pageId}`, {
  params: {
    fields: 'id,name,access_token',
    access_token: token
  }
}).then(resp => {
  const pageAccessToken = resp.data.access_token;
  
  if (!pageAccessToken) {
    console.error('❌ No page access token returned');
    console.error('   This might mean the system user is not properly assigned to the page');
    console.log('\nSolution:');
    console.log('1. Go to https://business.facebook.com/settings/people');
    console.log('2. Find "apnaautopost01" system user');
    console.log('3. Assign to Page: ApnaBussiness');
    console.log('4. Set role to: Admin or Page Admin');
    return;
  }

  console.log('✅ Page Access Token Retrieved!');
  console.log('   Token: ' + maskToken(pageAccessToken));
  
  console.log('\n📝 Testing with Page Token...\n');

  // Test with page token
  return axios.post(
    `https://graph.facebook.com/v23.0/${pageId}/feed`,
    null,
    {
      params: {
        message: 'Test: Page Token posting - Garud Social Publisher',
        access_token: pageAccessToken
      }
    }
  ).then(result => {
    console.log('✅ SUCCESS! Page token can post!');
    console.log('   Post ID:', result.data.post_id || result.data.id);
    console.log('\n💡 SOLUTION:');
    console.log('   You must update server/.env to use PAGE TOKEN instead of USER/SYSTEM TOKEN');
    console.log('\n   Add or update in .env:');
    console.log('   FB_PAGE_ACCESS_TOKEN=' + pageAccessToken);
    console.log('\n   Then update facebook.js to use FB_PAGE_ACCESS_TOKEN fallback');
  });
}).catch(err => {
  const errMsg = err.response?.data?.error?.message || err.message;
  console.error('❌ Error:', errMsg);
  
  if (errMsg.includes('access_token')) {
    console.log('\n📋 Analysis:');
    console.log('   The System User token does not have the ability to retrieve page tokens');
    console.log('   OR the system user is not assigned to the page');
    console.log('\nSolution:');
    console.log('1. Go to: https://business.facebook.com/settings/people');
    console.log('2. Find system user: apnaautopost01');
    console.log('3. Assign page: ApnaBussiness');
    console.log('4. Set role: Admin');
    console.log('5. Wait 5-10 minutes for permissions to sync');
    console.log('6. Then try again');
  }
});
