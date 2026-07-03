const dotenv = require('dotenv');
const path = require('path');
const axios = require('axios');

// Load environment from file
dotenv.config({ path: path.join(__dirname, '.env') });

const fb = require('./services/facebook');
const ig = require('./services/instagram');

const token = process.env.META_ACCESS_TOKEN;
const pageId = process.env.FB_PAGE_ID;
const igBusinessId = process.env.IG_BUSINESS_ID;

// Helper to mask token for display
const maskToken = (t) => {
  if (!t) return 'NOT LOADED';
  return t.substring(0, 10) + '...' + t.substring(t.length - 10);
};

console.log('\n' + '='.repeat(80));
console.log('📋 GARUD SOCIAL PUBLISHER - COMPLETE DIAGNOSTICS');
console.log('='.repeat(80));

// ============================================================================
// 1. VERIFY ENVIRONMENT LOADING
// ============================================================================
console.log('\n1️⃣  ENVIRONMENT VERIFICATION');
console.log('-'.repeat(80));
console.log(`✓ Token loaded: ${maskToken(token)}`);
console.log(`✓ Facebook Page ID: ${pageId}`);
console.log(`✓ Instagram Business ID: ${igBusinessId}`);

if (!token || !pageId || !igBusinessId) {
  console.error('❌ FATAL: Environment variables not loaded correctly');
  process.exit(1);
}

// ============================================================================
// 2. VERIFY TOKEN PERMISSIONS
// ============================================================================
console.log('\n2️⃣  TOKEN PERMISSIONS CHECK');
console.log('-'.repeat(80));

axios.get('https://graph.facebook.com/v23.0/me/permissions', {
  params: { access_token: token }
}).then(resp => {
  const perms = resp.data.data || [];
  const permDict = {};
  perms.forEach(p => {
    permDict[p.permission] = p.status;
  });

  console.log('Available Permissions:');
  const requiredPerms = [
    'pages_manage_posts',
    'pages_read_engagement',
    'instagram_basic',
    'instagram_content_publish',
    'business_management'
  ];

  let allPermissionsGranted = true;
  requiredPerms.forEach(perm => {
    const status = permDict[perm] || 'NOT_GRANTED';
    const icon = status === 'granted' ? '✅' : '❌';
    console.log(`  ${icon} ${perm}: ${status}`);
    if (status !== 'granted') allPermissionsGranted = false;
  });

  console.log('\nFull permission list:', perms.length, 'permissions');
  if (allPermissionsGranted) {
    console.log('✅ All required permissions granted!');
  } else {
    console.log('⚠️  Some permissions are missing. Check Facebook App Dashboard.');
  }

  // ============================================================================
  // 3. VERIFY BUSINESS ASSETS
  // ============================================================================
  console.log('\n3️⃣  BUSINESS ASSETS VERIFICATION');
  console.log('-'.repeat(80));

  return Promise.all([
    axios.get(`https://graph.facebook.com/v23.0/${pageId}`, {
      params: { fields: 'id,name,access_token', access_token: token }
    }),
    axios.get(`https://graph.facebook.com/v23.0/${igBusinessId}`, {
      params: { fields: 'id,name,username', access_token: token }
    })
  ]);
}).then(([fbResp, igResp]) => {
  console.log('✅ Facebook Page:');
  console.log(`   ID: ${fbResp.data.id}`);
  console.log(`   Name: ${fbResp.data.name}`);
  console.log(`   Has Page Token: ${!!fbResp.data.access_token}`);

  console.log('\n✅ Instagram Business Account:');
  console.log(`   ID: ${igResp.data.id}`);
  console.log(`   Name: ${igResp.data.name}`);
  console.log(`   Username: ${igResp.data.username}`);

  // ============================================================================
  // 4. TEST FACEBOOK TEXT POST
  // ============================================================================
  console.log('\n4️⃣  FACEBOOK TEXT POST TEST');
  console.log('-'.repeat(80));

  return axios.post(
    `https://graph.facebook.com/v23.0/${pageId}/feed`,
    null,
    {
      params: {
        message: 'Test: Garud Social Publisher - Text post (diagnostic)',
        access_token: token
      }
    }
  );
}).then(resp => {
  console.log('✅ Facebook text post created!');
  console.log(`   Post ID: ${resp.data.post_id || resp.data.id}`);

  // ============================================================================
  // 5. TEST FACEBOOK PHOTO POST
  // ============================================================================
  console.log('\n5️⃣  FACEBOOK PHOTO POST TEST');
  console.log('-'.repeat(80));

  const imageUrl = 'http://localhost:5000/uploads/91c49eaeca81cda16032cae9f2373152';
  return axios.post(
    `https://graph.facebook.com/v23.0/${pageId}/photos`,
    null,
    {
      params: {
        caption: 'Test: Garud Social Publisher - Photo post with uploaded image',
        url: imageUrl,
        access_token: token
      }
    }
  ).then(result => {
    console.log('✅ Facebook photo post created!');
    console.log(`   Photo ID: ${result.data.photo_id || result.data.id}`);
    return result.data;
  });
}).then(fbData => {
  // ============================================================================
  // 6. TEST INSTAGRAM MEDIA CREATION & PUBLISHING
  // ============================================================================
  console.log('\n6️⃣  INSTAGRAM MEDIA CREATION TEST');
  console.log('-'.repeat(80));

  const imageUrl = 'http://localhost:5000/uploads/91c49eaeca81cda16032cae9f2373152';
  return axios.post(
    `https://graph.facebook.com/v23.0/${igBusinessId}/media`,
    null,
    {
      params: {
        image_url: imageUrl,
        caption: 'Test: Garud Social Publisher - Instagram media container',
        access_token: token
      }
    }
  );
}).then(resp => {
  const mediaContainerId = resp.data.id;
  console.log('✅ Instagram media container created!');
  console.log(`   Container ID: ${mediaContainerId}`);

  console.log('\n7️⃣  INSTAGRAM MEDIA PUBLISHING TEST');
  console.log('-'.repeat(80));

  return axios.post(
    `https://graph.facebook.com/v23.0/${igBusinessId}/media_publish`,
    null,
    {
      params: {
        creation_id: mediaContainerId,
        access_token: token
      }
    }
  );
}).then(resp => {
  console.log('✅ Instagram media published!');
  console.log(`   Post ID: ${resp.data.id}`);

  // ============================================================================
  // 8. FINAL SUMMARY
  // ============================================================================
  console.log('\n' + '='.repeat(80));
  console.log('✅ ALL DIAGNOSTICS PASSED!');
  console.log('='.repeat(80));
  console.log('\nStatus:');
  console.log('✅ Environment variables loaded correctly');
  console.log('✅ Token permissions verified');
  console.log('✅ Business assets accessible');
  console.log('✅ Facebook text posting works');
  console.log('✅ Facebook photo posting works');
  console.log('✅ Instagram media creation works');
  console.log('✅ Instagram media publishing works');
  console.log('\n✅ Ready for end-to-end testing!\n');

  process.exit(0);
}).catch(err => {
  console.error('\n❌ DIAGNOSTIC FAILED');
  console.error('='.repeat(80));
  
  const errorData = err.response?.data?.error || err.message;
  console.error('Error:', JSON.stringify(errorData, null, 2));
  
  if (err.response?.status === 400) {
    console.error('\n📋 Analysis:');
    const msg = errorData.message || '';
    if (msg.includes('pages_manage_posts')) {
      console.error('Missing: pages_manage_posts permission');
    }
    if (msg.includes('pages_read_engagement')) {
      console.error('Missing: pages_read_engagement permission');
    }
    if (msg.includes('publish_actions')) {
      console.error('Issue: publish_actions is deprecated');
    }
    if (msg.includes('permissions not available')) {
      console.error('Issue: Token lacks required permissions');
    }
  }

  if (err.response?.status === 400 && (errorData.code === 200 || errorData.code === 190)) {
    console.error('\n💡 Solution: Token permissions are insufficient.');
    console.error('   Regenerate token with: pages_manage_posts, pages_read_engagement');
  }

  process.exit(1);
});
