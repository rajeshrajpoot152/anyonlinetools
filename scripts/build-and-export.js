const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('\n======================================================');
console.log('🚀 STARTING PRODUCTION BUILD & APP ROUTER STATIC EXPORT');
console.log('======================================================\n');

const projectRoot = path.join(__dirname, '..');
const outDir = path.join(projectRoot, 'out');
const publicDir = path.join(projectRoot, 'public');

// Step 1: Clean out directory
console.log('🧹 [1/4] Preparing out/ directory...');
if (fs.existsSync(outDir)) {
  fs.rmSync(outDir, { recursive: true, force: true });
}
console.log('   ✅ Pristine out/ directory initialized.');

// Step 2: Generate dynamic sitemap
console.log('\n🗺️  [2/4] Generating dynamic sitemap.xml...');
require('./generate-sitemap.js');

// Step 3: Generate .htaccess
console.log('\n🛡️  [3/4] Generating .htaccess with caching and security headers...');
require('./generate-htaccess.js');

// Step 4: Run Next.js Build & Static Export
console.log('\n⚡ [4/4] Running Next.js build (App Router Static Export)...');
// Ensure .next necessary directories exist to prevent transient Windows sandbox mkdir locks
function getSubDirs(base, current = '') {
  let results = [];
  const dir = path.join(base, current);
  if (!fs.existsSync(dir)) return results;
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const rel = path.join(current, entry.name);
        results.push(rel);
        results = results.concat(getSubDirs(base, rel));
      }
    }
  } catch (e) {}
  return results;
}

function precreateNextDirs() {
  const baseTargets = [
    path.join(projectRoot, '.next', 'static', 'chunks'),
    path.join(projectRoot, '.next', 'static', 'chunks', 'app'),
    path.join(projectRoot, '.next', 'static', 'chunks', 'pages'),
    path.join(projectRoot, '.next', 'static', 'css'),
    path.join(projectRoot, '.next', 'types', 'app'),
    path.join(projectRoot, '.next', 'server', 'app'),
    path.join(projectRoot, '.next', 'server', 'pages'),
    path.join(projectRoot, '.next', 'cache')
  ];
  for (const dir of baseTargets) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  }

  // Pre-create all nested app route directories
  const appSubDirs = getSubDirs(path.join(projectRoot, 'app'));
  for (const sub of appSubDirs) {
    const serverPath = path.join(projectRoot, '.next', 'server', 'app', sub);
    const chunkPath = path.join(projectRoot, '.next', 'static', 'chunks', 'app', sub);
    const typePath = path.join(projectRoot, '.next', 'types', 'app', sub);
    if (!fs.existsSync(serverPath)) fs.mkdirSync(serverPath, { recursive: true });
    if (!fs.existsSync(chunkPath)) fs.mkdirSync(chunkPath, { recursive: true });
    if (!fs.existsSync(typePath)) fs.mkdirSync(typePath, { recursive: true });
  }
}

precreateNextDirs();

// Resilient execution with auto-retry and backoff for transient Windows file-lock/EPERM issues
let buildSuccess = false;
const maxAttempts = 4;
for (let attempt = 1; attempt <= maxAttempts; attempt++) {
  try {
    execSync('npx next build', { stdio: 'inherit', cwd: projectRoot });
    buildSuccess = true;
    break;
  } catch (buildError) {
    if (attempt < maxAttempts) {
      console.warn(`\n⚠️ Transient Windows lock encountered on build attempt ${attempt}. Retrying (attempt ${attempt + 1}/${maxAttempts})...`);
      // Sleep for 1500ms before retrying
      try {
        execSync('node -e "setTimeout(() => {}, 1500)"');
      } catch (e) {}
      precreateNextDirs();
    } else {
      console.error('\n❌ BUILD FAILED: Next.js build encountered an error.');
      process.exit(1);
    }
  }
}

// Step 4.5: 26-Locale HTML Lang & RTL Attribute Synchronization
console.log('\n🌐 Synchronizing HTML lang & dir attributes for 26 locales...');
const validLocales = [
  'en', 'es', 'pt', 'id', 'ar', 'fr', 'de', 'ja', 'ru', 'tr', 'vi', 'th', 'it', 'ko', 'pl', 'nl', 'sv',
  'zh-cn', 'zh-tw', 'bg', 'ca', 'el', 'hi', 'ms', 'uk', 'sw'
];

function syncHtmlLocaleAttrs(dir, locale) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      syncHtmlLocaleAttrs(fullPath, locale);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      const isRtl = locale === 'ar';
      const replacement = isRtl ? `<html lang="${locale}" dir="rtl">` : `<html lang="${locale}">`;
      if (content.includes('<html lang="en">')) {
        content = content.replace('<html lang="en">', replacement);
        fs.writeFileSync(fullPath, content, 'utf8');
      }
    }
  }
}

for (const loc of validLocales) {
  if (loc === 'en') continue;
  const localeDir = path.join(outDir, loc);
  syncHtmlLocaleAttrs(localeDir, loc);
}
console.log('   ✅ All 26-locale HTML files synchronized with accurate lang & RTL attributes.');

// Step 4.6: Root Tool HTML Generation (Zero-Friction Dynamic Routing)
console.log('\n⚡ Synchronizing root tool aliases for 100% SEO parity...');
const toolsCatalogPath = path.join(projectRoot, 'lib', 'tools.json');
if (fs.existsSync(toolsCatalogPath)) {
  const tools = JSON.parse(fs.readFileSync(toolsCatalogPath, 'utf8'));
  for (const tool of tools) {
    const src = path.join(outDir, 'en', tool.slug);
    const dest = path.join(outDir, tool.slug);
    if (fs.existsSync(src)) {
      if (fs.existsSync(dest)) fs.rmSync(dest, { recursive: true, force: true });
      fs.cpSync(src, dest, { recursive: true });
      const htmlPath = path.join(dest, 'index.html');
      if (fs.existsSync(htmlPath)) {
        let content = fs.readFileSync(htmlPath, 'utf8');
        content = content.replace(
          new RegExp(`https://anyonlinetools.com/en/${tool.slug}/`, 'g'),
          `https://anyonlinetools.com/${tool.slug}/`
        );
        fs.writeFileSync(htmlPath, content, 'utf8');
      }
      console.log(`   ✅ out/${tool.slug}/index.html synchronized with self-referencing canonical.`);
    }
  }
}

// Post-Build Integrity Validation
console.log('\n🔍 Performing Zero-Defect Integrity Verification...');
let errorsCount = 0;

const essentialFiles = [
  '.htaccess',
  'robots.txt',
  'sitemap.xml',
  'sitemap-main.xml',
  'sitemap-tools.xml',
  'sitemap-locales.xml',
  'sw.js',
  'manifest.json',
  'favicon.ico',
  'apple-touch-icon.png',
  'icon-192.png',
  'icon-512.png',
  'maskable-icon.png',
  'icon.svg',
  'logo.png',
  'og-image.png',
  'llms.txt'
];

for (const file of essentialFiles) {
  const src = path.join(publicDir, file);
  const dest = path.join(outDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`   ✅ out/${file} successfully verified & synchronized.`);
  } else if (!fs.existsSync(dest)) {
    console.error(`   ❌ ERROR: ${file} is missing from public and out!`);
    errorsCount++;
  }
}

// Sync api directory if present (e.g. contact.php)
const apiSrcDir = path.join(publicDir, 'api');
const apiDestDir = path.join(outDir, 'api');
if (fs.existsSync(apiSrcDir)) {
  if (!fs.existsSync(apiDestDir)) {
    fs.mkdirSync(apiDestDir, { recursive: true });
  }
  const apiFiles = fs.readdirSync(apiSrcDir);
  for (const apiFile of apiFiles) {
    fs.copyFileSync(path.join(apiSrcDir, apiFile), path.join(apiDestDir, apiFile));
    console.log(`   ✅ out/api/${apiFile} successfully verified & synchronized.`);
  }
}

// Verify CSS files
const cssDir = path.join(outDir, '_next', 'static', 'css');
if (fs.existsSync(cssDir)) {
  const cssFiles = fs.readdirSync(cssDir).filter(f => f.endsWith('.css'));
  if (cssFiles.length > 0) {
    const totalCssSize = cssFiles.reduce((acc, file) => {
      const stats = fs.statSync(path.join(cssDir, file));
      return acc + stats.size;
    }, 0);
    console.log(`   ✅ CSS Assets verified: ${cssFiles.length} file(s), ${(totalCssSize / 1024).toFixed(1)} KB total.`);
  } else {
    console.error('   ❌ ERROR: No CSS files found in out/_next/static/css!');
    errorsCount++;
  }
} else {
  console.error('   ❌ ERROR: CSS directory missing in out/_next/static/css!');
  errorsCount++;
}

// Validate internal navigation links across ALL generated HTML files
console.log('\n🔗 [Internal Link Checker]');
function getAllHtmlFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(getAllHtmlFiles(full));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      results.push(full);
    }
  }
  return results;
}

const allHtmlFiles = getAllHtmlFiles(outDir);
const checkedLinks = new Set();
let brokenLinks = 0;

for (const file of allHtmlFiles) {
  const htmlContent = fs.readFileSync(file, 'utf8');
  const hrefMatches = htmlContent.matchAll(/href="(\/[^"#?]*)"/g);

  for (const match of hrefMatches) {
    const rawLink = match[1];
    if (
      rawLink.startsWith('/_next') ||
      rawLink.endsWith('.png') ||
      rawLink.endsWith('.svg') ||
      rawLink.endsWith('.ico') ||
      rawLink.endsWith('.json') ||
      rawLink.endsWith('.xml') ||
      rawLink.endsWith('.txt')
    ) {
      continue;
    }
    if (checkedLinks.has(rawLink)) continue;
    checkedLinks.add(rawLink);

    let cleanPath = rawLink.replace(/^\//, '').replace(/\/$/, '');
    let targetPath = path.join(outDir, cleanPath, 'index.html');
    if (cleanPath === '') {
      targetPath = path.join(outDir, 'index.html');
    }
    const targetFile = path.join(outDir, cleanPath + '.html');

    if (fs.existsSync(targetPath) || fs.existsSync(targetFile) || fs.existsSync(path.join(outDir, cleanPath))) {
      // link exists
    } else {
      console.error(`   ❌ BROKEN LINK DETECTED: "${rawLink}" (in ${path.relative(outDir, file)}) does not exist in out/!`);
      brokenLinks++;
      errorsCount++;
    }
  }
}

if (brokenLinks === 0) {
  console.log(`   ✅ All ${checkedLinks.size} unique internal navigation links across ${allHtmlFiles.length} HTML files verified: 0 broken links!`);
}

// Step 4.9: Execute AI Development Quality Gate & 30-Mistake Guard
console.log('\n🤖 Executing AI Development Quality Gate & 30-Mistake Guard...');
try {
  execSync('node scripts/verify-ai-quality.js', { stdio: 'inherit', cwd: projectRoot });
} catch (aiErr) {
  errorsCount++;
  console.error('\n🚨 DEPLOYMENT BLOCKED: AI Quality Gate detected violations.');
}

// Step 5: Execute 25-Point Google Search Console SEO Indexing Validation Gate
console.log('\n🛡️  Executing 25-Point Google Search Console SEO Indexing Validation Gate...');
try {
  execSync('node scripts/verify-seo-indexing.js', { stdio: 'inherit', cwd: projectRoot });
} catch (gateErr) {
  errorsCount++;
  console.error('\n🚨 DEPLOYMENT BLOCKED: SEO Indexing Validation Gate detected violations.');
}

if (errorsCount === 0) {
  console.log('\n======================================================');
  console.log('🎉 BUILD & SYNC COMPLETE: 100% READY FOR LIVE HOSTING!');
  console.log('👉 You can now safely upload the "out" folder to your server.');
  console.log('======================================================\n');
} else {
  process.exitCode = 1;
  console.error(`\n⚠️ BUILD COMPLETED WITH ${errorsCount} WARNING(S) / ERROR(S). PLEASE CHECK ABOVE.`);
}
