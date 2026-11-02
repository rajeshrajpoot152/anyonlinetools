const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://anyonlinetools.com';
const locales = [
  'en', 'es', 'pt', 'id', 'ar', 'fr', 'de', 'ja', 'ru', 'tr', 'vi', 'th', 'it', 'ko', 'pl', 'nl', 'sv',
  'zh-cn', 'zh-tw', 'bg', 'ca', 'el', 'hi', 'ms', 'uk', 'sw'
];
const nonEnLocales = locales.filter(l => l !== 'en');

const catalog = require('../lib/tools.json');

const LEGAL_PAGES = [
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/cookies',
  '/education',
  '/business',
  '/guide',
  '/pricing',
  '/features',
  '/developers',
  '/all-tools'
];

function isToolTranslated(slug, locale) {
  if (locale === 'en') return true;
  const transPath = path.join(__dirname, '..', 'lib', 'translations', `${slug}.json`);
  if (!fs.existsSync(transPath)) return false;
  try {
    const data = JSON.parse(fs.readFileSync(transPath, 'utf8'));
    const lang = data[locale];
    if (!lang) return false;
    return Boolean(lang.name && lang.seoTitle && lang.howToUse && lang.howToUse.length > 0 && lang.faqs && lang.faqs.length > 0);
  } catch (e) {
    return false;
  }
}

const generateSitemap = () => {
  const now = new Date().toISOString();
  const publicDir = path.join(__dirname, '..', 'public');
  const outDir = path.join(__dirname, '..', 'out');

  // Root Homepage & Localized Homepages Hreflang Block
  let rootHreflang = `
    <xhtml:link rel="alternate" hreflang="en" href="${DOMAIN}/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${DOMAIN}/" />`;
  for (const altLocale of nonEnLocales) {
    rootHreflang += `
    <xhtml:link rel="alternate" hreflang="${altLocale}" href="${DOMAIN}/${altLocale}/" />`;
  }

  // -------------------------------------------------------------
  // 1. SITEMAP-MAIN.XML (Core Homepage & Legal Utility Pages)
  // -------------------------------------------------------------
  let mainEntries = `
  <url>
    <loc>${DOMAIN}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>${rootHreflang}
  </url>`;

  for (const page of LEGAL_PAGES) {
    mainEntries += `
  <url>
    <loc>${DOMAIN}${page}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`;
  }

  const sitemapMainXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${mainEntries.trim()}
</urlset>`;

  // -------------------------------------------------------------
  // 2. SITEMAP-TOOLS.XML (Primary Canonical English Tool Pages)
  // -------------------------------------------------------------
  let toolsEntries = '';
  for (const tool of catalog) {
    const slug = tool.slug;
    const activeToolLocales = nonEnLocales.filter(l => isToolTranslated(slug, l));

    let toolHreflang = `
    <xhtml:link rel="alternate" hreflang="en" href="${DOMAIN}/${slug}/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${DOMAIN}/${slug}/" />`;
    for (const altLocale of activeToolLocales) {
      toolHreflang += `
    <xhtml:link rel="alternate" hreflang="${altLocale}" href="${DOMAIN}/${altLocale}/${slug}/" />`;
    }

    toolsEntries += `
  <url>
    <loc>${DOMAIN}/${slug}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>${toolHreflang}
  </url>`;
  }

  const sitemapToolsXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${toolsEntries.trim()}
</urlset>`;

  // -------------------------------------------------------------
  // 3. SITEMAP-LOCALES.XML (Localized Homepages & Localized Tools)
  // -------------------------------------------------------------
  let localesEntries = '';

  // Localized Homepages (25 non-English locales)
  for (const locale of nonEnLocales) {
    localesEntries += `
  <url>
    <loc>${DOMAIN}/${locale}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>${rootHreflang}
  </url>`;
  }

  // Localized Tool URLs (Only verified, genuine translations)
  for (const tool of catalog) {
    const slug = tool.slug;
    const activeToolLocales = nonEnLocales.filter(l => isToolTranslated(slug, l));

    let toolHreflang = `
    <xhtml:link rel="alternate" hreflang="en" href="${DOMAIN}/${slug}/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${DOMAIN}/${slug}/" />`;
    for (const altLocale of activeToolLocales) {
      toolHreflang += `
    <xhtml:link rel="alternate" hreflang="${altLocale}" href="${DOMAIN}/${altLocale}/${slug}/" />`;
    }

    for (const locale of activeToolLocales) {
      localesEntries += `
  <url>
    <loc>${DOMAIN}/${locale}/${slug}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>${toolHreflang}
  </url>`;
    }
  }

  const sitemapLocalesXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${localesEntries.trim()}
</urlset>`;

  // -------------------------------------------------------------
  // 4. SITEMAP.XML (Google Search Console Master <sitemapindex>)
  // -------------------------------------------------------------
  const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${DOMAIN}/sitemap-main.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${DOMAIN}/sitemap-tools.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${DOMAIN}/sitemap-locales.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>
</sitemapindex>`;

  // Ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Write all sub-sitemaps and master sitemap index to public/
  fs.writeFileSync(path.join(publicDir, 'sitemap-main.xml'), sitemapMainXml.trim(), 'utf8');
  fs.writeFileSync(path.join(publicDir, 'sitemap-tools.xml'), sitemapToolsXml.trim(), 'utf8');
  fs.writeFileSync(path.join(publicDir, 'sitemap-locales.xml'), sitemapLocalesXml.trim(), 'utf8');
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapIndexXml.trim(), 'utf8');

  // If out/ directory exists, synchronize all of them to out/ as well
  if (fs.existsSync(outDir)) {
    fs.writeFileSync(path.join(outDir, 'sitemap-main.xml'), sitemapMainXml.trim(), 'utf8');
    fs.writeFileSync(path.join(outDir, 'sitemap-tools.xml'), sitemapToolsXml.trim(), 'utf8');
    fs.writeFileSync(path.join(outDir, 'sitemap-locales.xml'), sitemapLocalesXml.trim(), 'utf8');
    fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemapIndexXml.trim(), 'utf8');
  }

  const mainCount = (sitemapMainXml.match(/<loc>/g) || []).length;
  const toolsCount = (sitemapToolsXml.match(/<loc>/g) || []).length;
  const localesCount = (sitemapLocalesXml.match(/<loc>/g) || []).length;
  const totalUrls = mainCount + toolsCount + localesCount;

  console.log(`✅ [SITEMAP] Generated Master Sitemap Index (<sitemapindex>) at public/sitemap.xml`);
  console.log(`   📁 sitemap-main.xml:    ${mainCount} URLs (Homepage & Legal)`);
  console.log(`   📁 sitemap-tools.xml:   ${toolsCount} URLs (Canonical English Tools)`);
  console.log(`   📁 sitemap-locales.xml: ${localesCount} URLs (Localized Homepages & Tools)`);
  console.log(`   🎯 Total Indexable URLs Managed: ${totalUrls} across 3 sub-sitemaps (Scalable to 50,000+ URLs)`);
};

// Execute on load and export
generateSitemap();

module.exports = generateSitemap;
