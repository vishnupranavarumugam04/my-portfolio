const http = require('http');
const app = require('./src/app');
const { connectDB } = require('./src/config/db');

async function runTests() {
  console.log('🧪 Starting API integration tests...');
  try {
    await connectDB();

    const server = http.createServer(app);
    await new Promise((resolve) => server.listen(5099, resolve));
    console.log('✅ Test server listening on port 5099');

    const base = 'http://127.0.0.1:5099/api';

    // 1. Test GET /api/site
    console.log('Testing GET /api/site...');
    const siteRes = await fetch(`${base}/site`);
    const siteJson = await siteRes.json();
    console.log('GET /api/site -> Status:', siteRes.status, 'Storage:', siteJson.storage);
    if (!siteJson.success || !siteJson.data?.hero?.headline) {
      throw new Error('GET /api/site failed');
    }
    console.log('Headline:', siteJson.data.hero.headline);
    console.log('✅ GET /api/site passed');

    // 2. Test PUT /api/site
    console.log('\nTesting PUT /api/site...');
    const updatedData = {
      ...siteJson.data,
      hero: {
        ...siteJson.data.hero,
        headlineHighlight: 'craftsmanship & elegance.'
      }
    };
    const putRes = await fetch(`${base}/site`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData)
    });
    const putJson = await putRes.json();
    console.log('PUT /api/site -> Status:', putRes.status, 'Updated highlight:', putJson.data?.hero?.headlineHighlight);
    if (!putJson.success || putJson.data?.hero?.headlineHighlight !== 'craftsmanship & elegance.') {
      throw new Error('PUT /api/site failed');
    }
    console.log('✅ PUT /api/site passed');

    // 3. Test GET /api/github/:username/repos
    console.log('\nTesting GET /api/github/facebook/repos...');
    const ghRes = await fetch(`${base}/github/facebook/repos`);
    const ghJson = await ghRes.json();
    console.log('GET /api/github/facebook/repos -> Status:', ghRes.status, 'Repos count:', ghJson.data?.length);
    if (!ghJson.success || !Array.isArray(ghJson.data) || ghJson.data.length === 0) {
      throw new Error('GET /api/github repos failed');
    }
    console.log('First repo name:', ghJson.data[0]?.name);
    console.log('✅ GET /api/github repos passed');

    // 4. Test Health
    console.log('\nTesting GET /api/health...');
    const healthRes = await fetch(`${base}/health`);
    const healthJson = await healthRes.json();
    console.log('GET /api/health -> status:', healthJson.status);
    console.log('✅ GET /api/health passed');

    console.log('\n🎉 ALL BACKEND API INTEGRATION TESTS PASSED SUCCESSFULLY!');
    server.close(() => {
      process.exit(0);
    });
  } catch (err) {
    console.error('❌ Test failed:', err);
    process.exit(1);
  }
}

runTests();
