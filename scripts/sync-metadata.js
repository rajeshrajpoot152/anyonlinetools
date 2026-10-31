const fs = require('fs');
const path = require('path');

console.log('\n🔄 [METADATA SYNC] Synchronizing sitemap, htaccess, and SEO files...');

try {
  // 1. Generate dynamic sitemap
  require('./generate-sitemap.js');

  // 2. Generate updated .htaccess
  require('./generate-htaccess.js');

  // 3. Confirm robots.txt
  const robotsPath = path.join(__dirname, '..', 'public', 'robots.txt');
  if (fs.existsSync(robotsPath)) {
    console.log('✅ public/robots.txt verified.');
  } else {
    console.warn('⚠️ WARNING: public/robots.txt not found.');
  }

  console.log('✅ [METADATA SYNC] All SEO & configuration files synchronized successfully!\n');
} catch (error) {
  process.exitCode = 1;
  console.error('❌ [METADATA SYNC ERROR]:', error.message);
}
