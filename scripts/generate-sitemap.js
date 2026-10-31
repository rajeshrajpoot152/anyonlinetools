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
  let urlEntries = '';
  const now = new Date().toISOString();

  // Root Homepage & Localized Homepages Hreflang Block
  let rootHreflang = `
    <xhtml:link rel="alternate" hreflang="en" href="${DOMAIN}/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${DOMAIN}/" />`;
  for (const altLocale of nonEnLocales) {
    rootHreflang += `
    <xhtml:link rel="alternate" hreflang="${altLocale}" href="${DOMAIN}/${altLocale}/" />`;
  }

  // 1. Primary English Root Homepage
  urlEntries += `
  <url>
    <loc>${DOMAIN}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>${rootHreflang}
  </url>`;

  // 2. Localized Homepages (25 non-English locales)
  for (const locale of nonEnLocales) {
    urlEntries += `
  <url>
    <loc>${DOMAIN}/${locale}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>${rootHreflang}
  </url>`;
  }

  // 3. Dedicated Tool Pages (Only canonical, indexable URLs)
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

    // Primary English Tool URL (Canonical)
    urlEntries += `
  <url>
    <loc>${DOMAIN}/${slug}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>${toolHreflang}
  </url>`;

    // Localized Tool URLs (Only those with verified, genuine translations)
    for (const locale of activeToolLocales) {
      urlEntries += `
  <url>
    <loc>${DOMAIN}/${locale}/${slug}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>${toolHreflang}
  </url>`;
    }
  }

  // 4. Legal & Static Utility Pages (All canonical with trailing slashes)
  for (const page of LEGAL_PAGES) {
    urlEntries += `
  <url>
    <loc>${DOMAIN}${page}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`;
  }

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries.trim()}
</urlset>`;

  const publicSitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  fs.writeFileSync(publicSitemapPath, sitemapXml.trim(), 'utf8');

  // Count total URLs
  const urlCount = (sitemapXml.match(/<loc>/g) || []).length;
  console.log(`✅ [SITEMAP] Generated clean sitemap with ${urlCount} primary canonical URLs at ${publicSitemapPath}`);
};

// Execute on load and export
generateSitemap();

module.exports = generateSitemap;
