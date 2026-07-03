const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

const fb = require('./services/facebook');
const ig = require('./services/instagram');

console.log('\n🔍 Environment Check:');
console.log('✓ Token loaded:', process.env.META_ACCESS_TOKEN?.substring(0, 20) + '...' || 'NOT LOADED');
console.log('✓ Facebook Page ID:', process.env.FB_PAGE_ID);
console.log('✓ Instagram Business ID:', process.env.IG_BUSINESS_ID);

console.log('\n🚀 Testing Facebook Posting...');

fb.publishToFacebook({
  message: 'Test: Garud Social Publisher - Automatic posting with new token!',
  imageUrl: 'http://localhost:5000/uploads/91c49eaeca81cda16032cae9f2373152',
  accessToken: process.env.META_ACCESS_TOKEN,
  pageId: process.env.FB_PAGE_ID
}).then(result => {
  console.log('✅ FACEBOOK SUCCESS!');
  console.log('Post ID:', result.post_id || result.id);
  
  console.log('\n🚀 Testing Instagram Posting...');
  
  return ig.createInstagramMedia({
    image_url: 'http://localhost:5000/uploads/91c49eaeca81cda16032cae9f2373152',
    caption: 'Test: Garud Social Publisher - Automatic Instagram post with new token!',
    accessToken: process.env.META_ACCESS_TOKEN,
    igBusinessId: process.env.IG_BUSINESS_ID
  });
}).then(result => {
  console.log('✅ Instagram Media Created!');
  console.log('Media Container ID:', result.id);
  
  return ig.publishInstagramMedia({
    creation_id: result.id,
    accessToken: process.env.META_ACCESS_TOKEN,
    igBusinessId: process.env.IG_BUSINESS_ID
  });
}).then(result => {
  console.log('✅ INSTAGRAM PUBLISHED!');
  console.log('Published Post ID:', result.id);
  console.log('\n✅✅ SUCCESS! Both Facebook and Instagram posts created!');
}).catch(err => {
  console.error('❌ Error:', err.response?.data?.error || err.message);
  process.exit(1);
});
