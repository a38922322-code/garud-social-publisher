const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const fb = require('./services/facebook');
const ig = require('./services/instagram');

console.log('\n🔍 Testing Text-Only Post to Facebook\n');

fb.publishToFacebook({
  message: 'Test: Garud Social Publisher - Text-only post (no image) - All systems working!',
  imageUrl: null, // No image
  accessToken: process.env.META_ACCESS_TOKEN,
  pageId: process.env.FB_PAGE_ID
}).then(result => {
  console.log('✅ SUCCESS! Text-only Facebook post created!');
  console.log('   Post ID:', result.post_id || result.id);
  console.log('\n✅ FACEBOOK POSTING IS WORKING!');
  console.log('\n📝 Image Posting Limitation:');
  console.log('   - Meta servers cannot access localhost URLs');
  console.log('   - For image posting, deploy to public server (e.g., Railway)');
  console.log('   - Localhost is only for development/testing');
}).catch(err => {
  const errMsg = err.response?.data?.error?.message || err.message;
  console.error('❌ Error:', errMsg);
  
  if (errMsg.includes('permissions')) {
    console.error('\n💡 Issue: Still missing permissions');
  }
});
