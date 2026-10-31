#!/usr/bin/env node

/**
 * AnyOnlineTools - Automated 26-Language Translation Pipeline Engine
 * 
 * Takes a tool slug, extracts English baseline metadata from lib/tools.json,
 * translates all user-facing content (Title, SEO, HowTo, FAQs, UI, Features)
 * into all 25 international languages, and saves lib/translations/[slug].json.
 * Also registers the translation into lib/tool-localization.ts automatically.
 * 
 * Usage:
 *   node scripts/translate-tool.js <slug>
 * 
 * Example:
 *   node scripts/translate-tool.js text-repeater
 */

const fs = require('fs');
const path = require('path');
const { translate } = require('@vitalets/google-translate-api');

const projectRoot = path.resolve(__dirname, '..');
const toolsJsonPath = path.join(projectRoot, 'lib', 'tools.json');
const translationsDir = path.join(projectRoot, 'lib', 'translations');
const localizationRegistryPath = path.join(projectRoot, 'lib', 'tool-localization.ts');

const args = process.argv.slice(2);
const slug = args[0] ? args[0].toLowerCase().trim() : null;

if (!slug) {
  console.log(`
Usage:
  node scripts/translate-tool.js <slug>

Example:
  node scripts/translate-tool.js word-counter
`);
  process.exit(1);
}

if (!fs.existsSync(toolsJsonPath)) {
  console.error('❌ Error: lib/tools.json not found!');
  process.exit(1);
}

const tools = JSON.parse(fs.readFileSync(toolsJsonPath, 'utf8'));
const tool = tools.find(t => t.slug === slug);

if (!tool) {
  console.error(`❌ Error: Tool with slug "${slug}" not found in lib/tools.json!`);
  process.exit(1);
}

const LOCALES = [
  'en', 'es', 'pt', 'id', 'ar', 'fr', 'de', 'ja', 'ru', 'tr',
  'vi', 'th', 'it', 'ko', 'pl', 'nl', 'sv', 'zh-cn', 'zh-tw',
  'bg', 'ca', 'el', 'hi', 'ms', 'uk', 'sw'
];

const GOOGLE_LANG_MAP = {
  'zh-cn': 'zh-CN',
  'zh-tw': 'zh-TW',
  'he': 'iw',
};

function getGoogleLangCode(code) {
  return GOOGLE_LANG_MAP[code] || code;
}

// Sleep helper
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Robust translation with retry
async function translateText(text, targetLang, maxRetries = 3) {
  if (!text || typeof text !== 'string' || text.trim() === '') return text;
  const langCode = getGoogleLangCode(targetLang);

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const res = await translate(text, { to: langCode });
      return res.text;
    } catch (err) {
      if (attempt === maxRetries) {
        console.warn(`⚠️ Warning: Translation to ${targetLang} failed for "${text.slice(0, 30)}...": ${err.message}`);
        return text; // fallback to English
      }
      await sleep(1000 * attempt);
    }
  }
  return text;
}

// Batch translate an array of strings
async function translateArray(arr, targetLang) {
  const result = [];
  for (const item of arr) {
    const t = await translateText(item, targetLang);
    result.push(t);
  }
  return result;
}

async function run() {
  console.log('\n======================================================');
  console.log(`🌍 TRANSLATING TOOL: "${tool.name}" (${slug}) ACROSS 26 LOCALES`);
  console.log('======================================================\n');

  // Load existing translations if file exists (to preserve manual edits)
  const translationFilePath = path.join(translationsDir, `${slug}.json`);
  let existingTranslations = {};
  if (fs.existsSync(translationFilePath)) {
    try {
      existingTranslations = JSON.parse(fs.readFileSync(translationFilePath, 'utf8'));
      console.log(`ℹ️ Found existing translations file for "${slug}". Updating/filling missing languages...\n`);
    } catch (e) {}
  }

  // Base English content
  const baseEnglish = {
    name: tool.name,
    seoTitle: tool.seoTitle || `${tool.name} Online – Free & Private In-Browser Utility`,
    seoDesc: tool.seoDesc || tool.description,
    keywords: tool.keywords || [slug.replace(/-/g, ' '), `${slug.replace(/-/g, ' ')} online`, `free ${slug.replace(/-/g, ' ')}`],
    heading: tool.name + ' Online',
    subheading: tool.description,
    badge: '100% Free · Client-Side Processing · No Upload',
    howToUse: tool.howToUse || [
      { step: 1, title: 'Enter Input', desc: 'Type, paste, or drag your input into the workspace.' },
      { step: 2, title: 'Instant Processing', desc: 'Processing happens live inside your browser memory without server delay.' },
      { step: 3, title: 'Export or Copy', desc: 'Copy results to clipboard or download file with one click.' }
    ],
    faqs: tool.faqs || [
      {
        q: 'Is my data safe and private?',
        a: 'Yes, 100%. All processing executes completely in your local browser memory. No data is ever transmitted to remote servers.'
      },
      {
        q: 'Is this tool completely free?',
        a: 'Yes, AnyOnlineTools utilities are 100% free forever without subscriptions, quotas, or account sign-ups.'
      }
    ],
    features: [
      {
        title: '100% Client-Side Privacy',
        desc: 'Your text and files never leave your device. All computations execute directly in your browser memory via native Web APIs.'
      },
      {
        title: 'Hardware-Accelerated Speed',
        desc: 'Zero server roundtrips, no API latency, and no queue waiting. Instant local processing powered by your device CPU.'
      },
      {
        title: 'Free Forever & Unlimited',
        desc: 'No account creation, no subscriptions, no credit card, and zero rate limits. Open the tool and get your work done instantly.'
      }
    ],
    useCases: tool.useCases || [],
    comparisonTable: tool.comparisonTable || null,
    ui: {
      inputLabel: 'Input',
      inputPlaceholder: 'Type or paste here...',
      outputLabel: 'Output Result',
      outputPlaceholder: 'Results will appear here automatically...',
      copyButton: 'Copy',
      copiedToast: 'Copied!',
      downloadButton: 'Download',
      clearButton: 'Clear',
      backToAll: 'All Tools Directory',
      quickStart: 'Quick Start Guide',
      howToUseTitle: `How to Use ${tool.name}`,
      faqBadge: 'Questions & Answers',
      faqTitle: 'Frequently Asked Questions'
    }
  };

  const finalTranslations = {
    en: existingTranslations.en || baseEnglish
  };

  // Translate into each language
  for (let i = 0; i < LOCALES.length; i++) {
    const locale = LOCALES[i];
    if (locale === 'en') continue;

    process.stdout.write(`⏳ [${i + 1}/${LOCALES.length}] Translating to [${locale}]... `);

    // If already fully translated and has all keys, we can keep it
    if (existingTranslations[locale] && existingTranslations[locale].name && existingTranslations[locale].faqs) {
      finalTranslations[locale] = existingTranslations[locale];
      if (!finalTranslations[locale].useCases && baseEnglish.useCases) {
        finalTranslations[locale].useCases = baseEnglish.useCases;
      }
      if (!finalTranslations[locale].comparisonTable && baseEnglish.comparisonTable) {
        finalTranslations[locale].comparisonTable = baseEnglish.comparisonTable;
      }
      console.log('✅ (cached)');
      continue;
    }

    try {
      const name = await translateText(baseEnglish.name, locale);
      const heading = await translateText(baseEnglish.heading, locale);
      const subheading = await translateText(baseEnglish.subheading, locale);
      const seoTitle = await translateText(baseEnglish.seoTitle, locale);
      const seoDesc = await translateText(baseEnglish.seoDesc, locale);
      const badge = await translateText(baseEnglish.badge, locale);
      const keywords = await translateArray(baseEnglish.keywords, locale);

      // HowTo
      const howToUse = [];
      for (const item of baseEnglish.howToUse) {
        howToUse.push({
          step: item.step,
          title: await translateText(item.title, locale),
          desc: await translateText(item.desc, locale)
        });
      }

      // FAQs
      const faqs = [];
      for (const item of baseEnglish.faqs) {
        faqs.push({
          q: await translateText(item.q, locale),
          a: await translateText(item.a, locale)
        });
      }

      // Features
      const features = [];
      for (const item of baseEnglish.features) {
        features.push({
          title: await translateText(item.title, locale),
          desc: await translateText(item.desc, locale)
        });
      }

      // UI
      const ui = {
        inputLabel: await translateText(baseEnglish.ui.inputLabel, locale),
        inputPlaceholder: await translateText(baseEnglish.ui.inputPlaceholder, locale),
        outputLabel: await translateText(baseEnglish.ui.outputLabel, locale),
        outputPlaceholder: await translateText(baseEnglish.ui.outputPlaceholder, locale),
        copyButton: await translateText(baseEnglish.ui.copyButton, locale),
        copiedToast: await translateText(baseEnglish.ui.copiedToast, locale),
        downloadButton: await translateText(baseEnglish.ui.downloadButton, locale),
        clearButton: await translateText(baseEnglish.ui.clearButton, locale),
        backToAll: await translateText(baseEnglish.ui.backToAll, locale),
        quickStart: await translateText(baseEnglish.ui.quickStart, locale),
        howToUseTitle: await translateText(baseEnglish.ui.howToUseTitle, locale),
        faqBadge: await translateText(baseEnglish.ui.faqBadge, locale),
        faqTitle: await translateText(baseEnglish.ui.faqTitle, locale),
      };

      // Use Cases
      let useCases = undefined;
      if (baseEnglish.useCases && baseEnglish.useCases.length > 0) {
        useCases = [];
        for (const item of baseEnglish.useCases) {
          useCases.push({
            tag: item.tag ? await translateText(item.tag, locale) : undefined,
            title: await translateText(item.title, locale),
            desc: await translateText(item.desc, locale)
          });
        }
      }

      // Comparison Table
      let comparisonTable = undefined;
      if (baseEnglish.comparisonTable) {
        const ct = baseEnglish.comparisonTable;
        const rows = [];
        for (const row of (ct.rows || [])) {
          rows.push({
            feature: await translateText(row.feature, locale),
            us: await translateText(row.us, locale),
            traditional: await translateText(row.traditional, locale)
          });
        }
        comparisonTable = {
          title: ct.title ? await translateText(ct.title, locale) : undefined,
          subtitle: ct.subtitle ? await translateText(ct.subtitle, locale) : undefined,
          ourLabel: ct.ourLabel ? await translateText(ct.ourLabel, locale) : undefined,
          traditionalLabel: ct.traditionalLabel ? await translateText(ct.traditionalLabel, locale) : undefined,
          rows
        };
      }

      finalTranslations[locale] = {
        name,
        seoTitle,
        seoDesc,
        keywords,
        heading,
        subheading,
        badge,
        howToUse,
        faqs,
        features,
        useCases,
        comparisonTable,
        ui
      };

      console.log('✅ Done');
      await sleep(250); // Small interval to prevent rate limit
    } catch (e) {
      console.log(`❌ Error: ${e.message}`);
      finalTranslations[locale] = baseEnglish; // Fallback
    }
  }

  // Save JSON
  if (!fs.existsSync(translationsDir)) {
    fs.mkdirSync(translationsDir, { recursive: true });
  }
  fs.writeFileSync(translationFilePath, JSON.stringify(finalTranslations, null, 2) + '\n', 'utf8');
  console.log(`\n🎉 Successfully saved 26-language translation dictionary to:`);
  console.log(`   lib/translations/${slug}.json (${(fs.statSync(translationFilePath).size / 1024).toFixed(1)} KB)`);

  // Auto-register in lib/tool-localization.ts
  if (fs.existsSync(localizationRegistryPath)) {
    let locCode = fs.readFileSync(localizationRegistryPath, 'utf8');
    const varName = slug.split('-').map((w, idx) => idx === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)).join('') + 'Translations';
    const importStatement = `import ${varName} from './translations/${slug}.json';`;

    if (!locCode.includes(importStatement)) {
      locCode = `${importStatement}\n${locCode}`;
    }

    const regMarker = 'const TRANSLATION_REGISTRY: Record<string, Record<string, any>> = {';
    if (locCode.includes(regMarker) && !locCode.includes(`'${slug}':`)) {
      locCode = locCode.replace(
        regMarker,
        `${regMarker}\n  '${slug}': ${varName},`
      );
    }

    fs.writeFileSync(localizationRegistryPath, locCode, 'utf8');
    console.log(`✅ Registered "${slug}" in lib/tool-localization.ts TRANSLATION_REGISTRY.\n`);
  }
}

run().catch(err => {
  console.error('\n❌ Translation pipeline failed:', err);
  process.exit(1);
});
