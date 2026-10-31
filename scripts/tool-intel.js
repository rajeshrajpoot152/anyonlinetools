#!/usr/bin/env node

/**
 * AnyOnlineTools - Tool Intelligence & GSC Lifecycle Management Engine
 * 
 * Manages the end-to-end lifecycle of 500–10,000+ tools:
 *  - Screenshot intake & competitor synthesis (10-100 screenshots per tool)
 *  - Unified single-folder architecture: tool-intel/tools/[slug]/
 *  - Post-launch Google Search Console (GSC) query and ranking ingestion
 * 
 * Commands:
 *   node scripts/tool-intel.js new <slug> [name] [category]
 *   node scripts/tool-intel.js migrate
 *   node scripts/tool-intel.js status
 *   node scripts/tool-intel.js sync-gsc <slug>
 */

const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const toolIntelRoot = path.join(projectRoot, 'tool-intel');
const platformIntelDir = path.join(toolIntelRoot, '_platform');
const toolsIntelDir = path.join(toolIntelRoot, 'tools');
const legacyBlueprintsDir = path.join(projectRoot, 'tool-blueprints');
const toolsJsonPath = path.join(projectRoot, 'lib', 'tools.json');

const args = process.argv.slice(2);
const command = args[0] ? args[0].toLowerCase().trim() : 'status';

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

ensureDir(toolIntelRoot);
ensureDir(platformIntelDir);
ensureDir(toolsIntelDir);

// ---------------------------------------------------------------------------
// COMMAND: NEW <slug> [name] [category]
// ---------------------------------------------------------------------------
if (command === 'new') {
  const slug = args[1] ? args[1].toLowerCase().trim() : null;
  const name = args[2] || (slug ? slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'New Tool');
  const category = args[3] || 'text';

  if (!slug) {
    console.error('❌ Error: Please specify a tool slug. Example: node scripts/tool-intel.js new word-counter "Word Counter" text');
    process.exit(1);
  }

  const toolFolder = path.join(toolsIntelDir, slug);
  const screenshotsDir = path.join(toolFolder, 'screenshots');
  const specPath = path.join(toolFolder, 'spec.md');
  const gscPath = path.join(toolFolder, 'gsc.md');

  ensureDir(toolFolder);
  ensureDir(screenshotsDir);

  // 1. Create spec.md template
  if (!fs.existsSync(specPath)) {
    const specTemplate = `# Tool Specification & Competitor Synthesis: ${name}
> **Slug:** \`${slug}\` | **Category:** \`${category}\` | **Engine:** 100% In-Browser (0 Bytes Uploaded)
> **Directory:** \`tool-intel/tools/${slug}/\`

---

## 1. COMPETITOR SCREENSHOT SYNTHESIS (50–100 SCREENSHOTS ANALYSIS)
*Drop raw competitor screenshots into \`tool-intel/tools/${slug}/screenshots/\`.*

### A. Analyzed Features & Competitor Workflows
- **Common Inputs:** (e.g. Textarea, File Drag-Drop, Numeric inputs, Sliders)
- **Controls & Options:** (e.g. Presets, Delimiters, Case switches, Formatting options)
- **Output Formats:** (e.g. One-click Copy, .txt Download, WhatsApp Share)

### B. Fatal Competitor Friction Points (What We DEMOLISH)
| Competitor Flaw | AnyOnlineTools Counter-Advantage ($0 Sovereign Architecture) |
| :--- | :--- |
| Cloud upload required | **100% Client-Side:** Executed in browser RAM via Web Workers/Canvas. |
| Daily usage paywall | **Unlimited & Free Forever (\$0):** Zero quotas, zero signups. |
| Slow server queue | **0ms Latency:** Instant device-native CPU computation. |
| Intrusive popup ads | **Clean Ergonomics:** Dedicated non-intrusive ad containers. |

---

## 2. FUNCTIONAL SPECIFICATION & MATH LOGIC
- **Input Parameters:**
- **Boundary Handling & Limits:** (e.g. \`maxLength=500000\` to prevent tab freezing)
- **Deterministic Output Algorithm:**

---

## 3. 26-LANGUAGE FULL-PAGE INTENT TARGETING
- **English H1 & Title:** \`${name} Online – Free & Private In-Browser Utility\`
- **Target Keywords (5–7):** \`${slug.replace(/-/g, ' ')}\`, \`${slug.replace(/-/g, ' ')} online\`, \`free ${slug.replace(/-/g, ' ')}\`
- **Core User Problem Solved:**

---

## 4. UI/UX CONTROLS & SHARED COMPONENT MAP
- Uses \`components/layouts/ToolLayout.tsx\`
- Uses \`components/ui/ActionPanel.tsx\` (Copy, Clear, Download)
- Tool Component: \`components/tools/${slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')}.tsx\`
`;
    fs.writeFileSync(specPath, specTemplate, 'utf8');
  }

  // 2. Create gsc.md template
  if (!fs.existsSync(gscPath)) {
    const gscTemplate = `# Google Search Console (GSC) Performance & Optimization Log: ${name}
> **Tool Slug:** \`${slug}\` | **Live Canonical URL:** \`https://anyonlinetools.com/${slug}/\`
> **Tracking Status:** Active Monitoring

---

## 📈 1. GSC PERFORMANCE TELEMETRY SNAPSHOTS

| Date | Total Clicks | Total Impressions | Avg CTR | Avg Position | Top 3 Queries |
| :--- | :--- | :--- | :--- | :--- | :--- |
| ${new Date().toISOString().split('T')[0]} | 0 | 0 | 0.0% | 0.0 | Tool newly initialized |

---

## 🎯 2. HIGH-IMPRESSION USER SEARCH QUERIES (GSC Query Mining)
*Paste queries extracted from Google Search Console Performance Report below:*

\`\`\`tsv
Query	Clicks	Impressions	CTR	Position
${slug.replace(/-/g, ' ')}	0	0	0%	0
\`\`\`

---

## 🚀 3. ACTIONABLE SEO OPTIMIZATION LOG
- [ ] **Keyword Ingestion:** Add newly discovered high-volume queries to \`lib/tools.json\` and \`lib/translations/${slug}.json\`.
- [ ] **FAQ Expansion:** Answer high-frequency questions users search on Google directly in tool FAQs.
- [ ] **Preset Enhancements:** Add quick-fill preset buttons for common user phrases discovered in GSC.
`;
    fs.writeFileSync(gscPath, gscTemplate, 'utf8');
  }

  console.log(`\n🎉 Tool Intelligence Workspace created for "${name}" (${slug})!`);
  console.log(`📁 Workspace Folder: tool-intel/tools/${slug}/`);
  console.log(`   ├── spec.md        (Competitor synthesis & feature spec)`);
  console.log(`   ├── gsc.md         (GSC performance, query logs & SEO tracking)`);
  console.log(`   └── screenshots/   (Drop 10-100 competitor screenshots here)`);
  console.log('\n👉 You can now drop screenshots into the folder and analyze them cleanly.\n');
  process.exit(0);
}

// ---------------------------------------------------------------------------
// COMMAND: MIGRATE (Organize legacy tool-blueprints/)
// ---------------------------------------------------------------------------
if (command === 'migrate') {
  console.log('\n📦 Checking migration status into tool-intel/...\n');
  if (!fs.existsSync(legacyBlueprintsDir)) {
    console.log('✅ All blueprints have already been migrated into tool-intel/. Legacy tool-blueprints/ directory is safely removed.');
    process.exit(0);
  }

  const files = fs.readdirSync(legacyBlueprintsDir).filter(f => f.endsWith('.md') && f !== 'README.md');
  let toolCount = 0;
  let platformCount = 0;

  // Platform/system patterns
  const platformKeywords = [
    'hub', 'platform', 'policy', 'terms', 'privacy', 'cookie', 
    'compliance', 'playbook', 'story', 'eeat', 'billing', 'directory', 
    'curated', 'freemium', 'support', 'dictionary', 'ecosystem'
  ];

  for (const file of files) {
    const src = path.join(legacyBlueprintsDir, file);
    const base = file.replace('.md', '');
    const isPlatform = platformKeywords.some(kw => base.includes(kw));

    if (isPlatform) {
      const dest = path.join(platformIntelDir, file);
      fs.copyFileSync(src, dest);
      platformCount++;
    } else {
      // It's a specific tool
      const toolDir = path.join(toolsIntelDir, base);
      ensureDir(toolDir);
      ensureDir(path.join(toolDir, 'screenshots'));
      const dest = path.join(toolDir, 'spec.md');
      fs.copyFileSync(src, dest);

      // Create gsc.md if missing
      const gscPath = path.join(toolDir, 'gsc.md');
      if (!fs.existsSync(gscPath)) {
        const toolTitle = base.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        fs.writeFileSync(gscPath, `# GSC Performance Log: ${toolTitle}\n> Slug: \`${base}\`\n\n## Performance Snapshots\n\n## High-Impression Queries\n`, 'utf8');
      }
      toolCount++;
    }
  }

  console.log(`✅ Migration complete!`);
  console.log(`   - ${platformCount} platform/system architecture specs moved to tool-intel/_platform/`);
  console.log(`   - ${toolCount} tool workspaces created in tool-intel/tools/[slug]/ (with spec.md, gsc.md, screenshots/)`);
  console.log(`   - Legacy blueprints preserved safely in tool-blueprints/ for complete backward compatibility.\n`);
  process.exit(0);
}

// ---------------------------------------------------------------------------
// COMMAND: STATUS (Dashboard Overview)
// ---------------------------------------------------------------------------
if (command === 'status') {
  console.log('\n======================================================================');
  console.log('📊 ANYONLINETOOLS - TOOL INTELLIGENCE & GSC CONTROL CENTER');
  console.log('======================================================================\n');

  let toolsList = [];
  if (fs.existsSync(toolsJsonPath)) {
    toolsList = JSON.parse(fs.readFileSync(toolsJsonPath, 'utf8'));
  }

  const intelTools = fs.existsSync(toolsIntelDir) ? fs.readdirSync(toolsIntelDir).filter(f => fs.statSync(path.join(toolsIntelDir, f)).isDirectory()) : [];
  const platformSpecs = fs.existsSync(platformIntelDir) ? fs.readdirSync(platformIntelDir).filter(f => f.endsWith('.md')) : [];

  console.log(`📌 Registered Production Tools: ${toolsList.length}`);
  console.log(`📁 Tool Intelligence Workspaces: ${intelTools.length}`);
  console.log(`🏛️ Platform Architecture Specs:  ${platformSpecs.length}\n`);

  console.log('----------------------------------------------------------------------');
  console.log('SLUG                 | SPEC | SCREENSHOTS | GSC LOG | PRODUCTION STATUS');
  console.log('----------------------------------------------------------------------');

  const allSlugs = Array.from(new Set([...toolsList.map(t => t.slug), ...intelTools]));

  for (const slug of allSlugs) {
    const isLive = toolsList.some(t => t.slug === slug);
    const toolDir = path.join(toolsIntelDir, slug);
    const hasSpec = fs.existsSync(path.join(toolDir, 'spec.md'));
    const hasGsc = fs.existsSync(path.join(toolDir, 'gsc.md'));
    let ssCount = 0;
    const ssDir = path.join(toolDir, 'screenshots');
    if (fs.existsSync(ssDir)) {
      ssCount = fs.readdirSync(ssDir).filter(f => /\.(png|jpg|jpeg|webp)$/i.test(f)).length;
    }

    const padSlug = slug.padEnd(20).slice(0, 20);
    const specIcon = hasSpec ? '✅ Yes' : '❌ No ';
    const ssText = (ssCount + ' files').padEnd(11);
    const gscIcon = hasGsc ? '✅ Active' : '❌ None  ';
    const prodIcon = isLive ? '🟢 LIVE (out/)' : '⚪ In Design';

    console.log(`${padSlug} | ${specIcon} | ${ssText} | ${gscIcon} | ${prodIcon}`);
  }

  console.log('----------------------------------------------------------------------\n');
  console.log('💡 Quick Commands:');
  console.log('   npm run intel:new <slug> [name] [category]  -> Scaffold new tool workspace');
  console.log('   npm run intel:migrate                       -> Clean & organize loose blueprints');
  console.log('   npm run intel:status                        -> Show this dashboard\n');
}
