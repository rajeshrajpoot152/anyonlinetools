const fs = require('fs');
const path = require('path');

// Clean .next if a previous production build or stale cache exists
const nextDir = path.join(__dirname, '..', '.next');
const buildIdFile = path.join(nextDir, 'BUILD_ID');
const nextCacheDir = path.join(nextDir, 'cache');

// Apply Webpack React Refresh defensive runtime patch
try {
  require('./patch-webpack-refresh.js');
} catch (e) {
  console.warn('⚠️ Webpack patch error:', e.message);
}

if (fs.existsSync(buildIdFile) || fs.existsSync(nextCacheDir)) {
  try {
    fs.rmSync(nextDir, { recursive: true, force: true });
    console.log('🧹 Cleaned .next for pristine development mode & CSS compilation.');
  } catch (e) {}
}

console.log('\n🚀 Starting Development Server with Synced SEO Files...');
try {
  require('./generate-sitemap.js');
  require('./generate-htaccess.js');
} catch (e) {
  console.warn('⚠️ Warning syncing SEO files in dev:', e.message);
}

console.log('\n--------------------------------------------------------------');
console.log('📌 NOTE: Next.js dev server runs dynamically in memory.');
console.log('👉 To generate static export for live site deployment, run:');
console.log('   npm run build');
console.log('--------------------------------------------------------------\n');
