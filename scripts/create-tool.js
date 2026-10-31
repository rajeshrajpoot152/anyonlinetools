#!/usr/bin/env node

/**
 * AnyOnlineTools - Native Tool Scaffolder (10,000+ Tools Scale Architecture)
 * 
 * Usage:
 *   node scripts/create-tool.js <slug> [name] [category] [description] [icon]
 * 
 * Example:
 *   node scripts/create-tool.js word-counter "Word Counter" "text" "Count words and characters in real time." "Type"
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const toolsJsonPath = path.join(rootDir, 'lib', 'tools.json');
const registryPath = path.join(rootDir, 'components', 'tools', 'registry.ts');

const args = process.argv.slice(2);
const slug = args[0] ? args[0].toLowerCase().trim() : null;

// Reserved routes that cannot be used as tool slugs
const RESERVED_SLUGS = [
  'about', 'contact', 'privacy', 'terms', 'cookies', 'education', 
  'business', 'guide', 'pricing', 'features', 'developers', 'all-tools', 
  'api', 'legal', 'favicon', 'robots', 'sitemap'
];

if (!slug) {
  console.log(`
Usage:
  node scripts/create-tool.js <slug> [name] [category] [description] [icon]

Example:
  node scripts/create-tool.js word-counter "Word Counter" "text" "Count words and characters in real time." "Type"
`);
  process.exit(1);
}

if (RESERVED_SLUGS.includes(slug)) {
  console.error(`❌ Error: "${slug}" is a reserved system route and cannot be used as a tool slug!`);
  process.exit(1);
}

function toPascalCase(str) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

function toTitleCase(str) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const componentName = toPascalCase(slug);
const toolName = args[1] || toTitleCase(slug);
const category = args[2] || 'text';
const description = args[3] || `Fast, private in-browser ${toolName.toLowerCase()}. 100% client-side processing with zero server uploads.`;
const icon = args[4] || 'Sparkles';

// 1. Update lib/tools.json
let tools = [];
if (fs.existsSync(toolsJsonPath)) {
  tools = JSON.parse(fs.readFileSync(toolsJsonPath, 'utf8'));
}

if (tools.some(t => t.slug === slug)) {
  console.error(`❌ Tool with slug "${slug}" already exists in lib/tools.json!`);
  process.exit(1);
}

const categoryLabels = {
  text: 'Text Utilities',
  developer: 'Developer Tools',
  security: 'Privacy & Security',
  calculator: 'Calculators',
  media: 'Media Utilities'
};

const newToolEntry = {
  slug: slug,
  name: toolName,
  category: category,
  categoryLabel: categoryLabels[category] || `${category.charAt(0).toUpperCase() + category.slice(1)} Tools`,
  shortDesc: description.slice(0, 80) + (description.length > 80 ? '...' : ''),
  description: description,
  href: `/${slug}/`,
  icon: icon,
  badge: 'Trending',
  seoTitle: `${toolName} Online – Free & Private In-Browser Utility`,
  seoDesc: `${description} 100% free, private client-side processing with instant results and zero server uploads.`,
  keywords: [
    slug.replace(/-/g, ' '),
    `${slug.replace(/-/g, ' ')} online`,
    `free ${slug.replace(/-/g, ' ')}`,
    toolName.toLowerCase(),
    'in-browser tool'
  ],
  howToUse: [
    { step: 1, title: 'Enter Input', desc: 'Type, paste, or configure your input parameters in the left panel.' },
    { step: 2, title: 'Instant Processing', desc: 'Computations run live inside your browser memory without server delay.' },
    { step: 3, title: 'Inspect & Customize', desc: 'Review the live output preview, stats, and adjust options in real time.' },
    { step: 4, title: 'Export or Copy', desc: 'Click Copy to clipboard, share to mobile apps, or download as an offline file.' }
  ],
  faqs: [
    {
      q: 'Is my data safe, private, or uploaded to any server?',
      a: 'Never. AnyOnlineTools processes 100% of your input locally inside your client browser memory using native Web APIs. Zero bytes are uploaded to remote servers, zero activity logs are kept, and all data is wiped as soon as you close or refresh the tab.'
    },
    {
      q: 'Will processing large inputs crash my browser or mobile phone?',
      a: 'No. The tool enforces defensive memory constraints and non-blocking string/chunk processing to ensure memory allocation stays safe. Large inputs are handled smoothly without freezing your user interface or exhausting device RAM.'
    },
    {
      q: 'How does performance hold up on mobile devices?',
      a: 'The user interface is optimized specifically for mobile viewports with lightweight DOM nodes, high-contrast touch targets, and a sticky mobile action bar. Processing runs entirely on your device hardware with zero network roundtrip lag.'
    },
    {
      q: 'Are emojis, multi-byte Unicode characters, and international scripts supported?',
      a: 'Yes. Full UTF-8 and UTF-16 Unicode character encodings are supported, ensuring accurate processing of Asian languages, Arabic script, mathematical notation, accents, and complex emoji sequences without encoding corruption.'
    },
    {
      q: 'What should I do if the generated output is too large for the clipboard?',
      a: 'Operating systems and mobile web browsers enforce varying clipboard memory thresholds (typically 1 MB to 4 MB). If your generated content exceeds these limits, simply use our direct "Download" button to save it as a clean offline file.'
    },
    {
      q: 'Can I use this tool offline without an active internet connection?',
      a: 'Yes. AnyOnlineTools functions as an offline-first Progressive Web Application (PWA). Once cached upon your first visit, you can install it to your home screen or bookmark it and run it completely offline with zero internet access.'
    },
    {
      q: 'Is this tool completely free with no hidden fees or subscriptions?',
      a: 'Yes, 100% free forever. We operate on a zero-cloud-compute model where all tasks run on client hardware, meaning we have zero server processing costs and will never charge subscriptions, impose artificial daily limits, or demand user signups.'
    },
    {
      q: 'Can I use the output for commercial software, client projects, and academic work?',
      a: 'Absolutely. All results generated by this tool belong entirely to you with zero royalty fees, licensing restrictions, or attribution requirements. You are free to use the output in commercial software, databases, designs, and academic projects.'
    }
  ],
  useCases: [
    {
      tag: 'QA & Engineering',
      title: 'Software QA & Boundary Testing',
      desc: 'Quickly stress-test database column limits, API input payloads, form validators, and responsive UI layouts with precision.'
    },
    {
      tag: 'Developer Workflows',
      title: 'Developer Productivity & Code Prep',
      desc: 'Format, inspect, and transform raw payloads, strings, and data structures for integration into codebases and automation scripts.'
    },
    {
      tag: 'Content & Social',
      title: 'Content Creation & Messaging',
      desc: 'Prepare clean, consistent text, captions, and structured content ready for pasting across messaging apps and social platforms.'
    },
    {
      tag: 'Data & Operations',
      title: 'Data Preparation & Spreadsheet Prep',
      desc: 'Clean, standardize, and format mock datasets, CSV values, and operational fixtures for spreadsheet formulas and database seeding.'
    }
  ],
  comparisonTable: {
    title: `AnyOnlineTools ${toolName} vs Traditional Online Tools`,
    subtitle: 'Transparent technical comparison showing why client-side processing outperforms legacy server-based utilities.',
    ourLabel: 'AnyOnlineTools (Client-Side)',
    traditionalLabel: 'Traditional Tools (Server-Side)',
    rows: [
      {
        feature: 'Data Privacy & Storage',
        us: '100% In-Memory RAM (0 Bytes Uploaded)',
        traditional: 'Transferred & retained on cloud servers'
      },
      {
        feature: 'Processing Latency',
        us: 'Instant 0ms (Local device CPU)',
        traditional: 'Slow network uploads & server queues'
      },
      {
        feature: 'Usage Limits & Quotas',
        us: 'Unlimited & Free Forever ($0)',
        traditional: 'Daily caps, paywalls & subscription tiers'
      },
      {
        feature: 'Account Registration',
        us: 'None required (0 clicks to start)',
        traditional: 'Mandatory email signup or credit card'
      },
      {
        feature: 'Offline Capability',
        us: 'Full PWA offline execution',
        traditional: 'Fails without active internet'
      },
      {
        feature: 'Advertising Clutter',
        us: 'Clean SaaS interface, zero intrusive ads',
        traditional: 'Popups, fake download buttons & deceptive banners'
      }
    ]
  }
};

tools.push(newToolEntry);
fs.writeFileSync(toolsJsonPath, JSON.stringify(tools, null, 2) + '\n', 'utf8');
console.log(`✅ [1/3] Added "${slug}" to lib/tools.json`);

// 2. Create components/tools/[ComponentName].tsx
const componentFilePath = path.join(rootDir, 'components', 'tools', `${componentName}.tsx`);
const componentCode = `'use client';

import React, { useState, useMemo } from 'react';
import ActionPanel from '../ui/ActionPanel';
import MobileStickyActionBar from '../ui/MobileStickyActionBar';

interface ${componentName}Props {
  locale?: string;
  ui?: any;
}

export default function ${componentName}({ locale = 'en', ui }: ${componentName}Props) {
  const [input, setInput] = useState<string>('');

  const output = useMemo(() => {
    if (!input) return '';
    return input.trim();
  }, [input]);

  const stats = useMemo(() => {
    const chars = output.length;
    const words = output ? output.trim().split(/\\s+/).filter(Boolean).length : 0;
    return [
      { label: 'Words', value: words.toLocaleString() },
      { label: 'Characters', value: chars.toLocaleString() },
      { label: 'Processing', value: 'Client RAM' },
    ];
  }, [output]);

  const handleClear = () => {
    setInput('');
  };

  return (
    <div className="w-full space-y-6">
      {/* Desktop Above-the-Fold 12-Column Responsive Workspace */}
      <div className="lg:grid lg:grid-cols-12 lg:gap-6 items-start">
        
        {/* Left Column: Input and Controls */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200">
                {ui?.inputLabel || 'Input'}
              </label>
              {input && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-xs text-rose-500 hover:text-rose-600 font-medium transition-colors"
                >
                  {ui?.clearButton || 'Clear'}
                </button>
              )}
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={ui?.inputPlaceholder || 'Type or paste your content here...'}
              rows={8}
              maxLength={500000}
              className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm text-slate-800 dark:text-slate-200 resize-y"
            />
          </div>
        </div>

        {/* Right Column: Live Output & Action Panel */}
        <div className="lg:col-span-7 space-y-4 mt-6 lg:mt-0">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-200">
                {ui?.outputLabel || 'Output Result'}
              </label>
            </div>
            
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 min-h-[180px] max-h-[360px] overflow-y-auto font-mono text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap break-words">
              {output || (
                <span className="text-slate-400 italic">
                  {ui?.outputPlaceholder || 'Results will appear here automatically...'}
                </span>
              )}
            </div>

            {/* Action Panel */}
            <ActionPanel
              content={output}
              stats={stats}
              downloadFileName="${slug}-output.txt"
              onClear={handleClear}
              className="mt-4"
            />
          </div>
        </div>
      </div>

      {/* Mobile Sticky Quick Action Bar (Fixed Bottom sm:hidden) */}
      <MobileStickyActionBar
        output={output}
        onClear={handleClear}
        toolName="${toolName}"
      />
    </div>
  );
}
`;

fs.writeFileSync(componentFilePath, componentCode, 'utf8');
console.log(`✅ [2/3] Created client component at components/tools/${componentName}.tsx`);

// 3. Register in components/tools/registry.ts
if (fs.existsSync(registryPath)) {
  let regContent = fs.readFileSync(registryPath, 'utf8');
  
  // Add import if not present
  const importLine = `import ${componentName} from './${componentName}';`;
  if (!regContent.includes(importLine)) {
    regContent = `${importLine}\n${regContent}`;
  }

  // Add to TOOL_REGISTRY map
  const regMarker = 'export const TOOL_REGISTRY: Record<string, React.ComponentType<any>> = {';
  if (regContent.includes(regMarker) && !regContent.includes(`'${slug}':`)) {
    regContent = regContent.replace(
      regMarker,
      `${regMarker}\n  '${slug}': ${componentName},`
    );
  }

  fs.writeFileSync(registryPath, regContent, 'utf8');
  console.log(`✅ [3/4] Registered "${slug}" in components/tools/registry.ts`);
}

// 4. Auto-scaffold Tool Intelligence & GSC workspace if missing
const toolIntelDir = path.join(rootDir, 'tool-intel', 'tools', slug);
if (!fs.existsSync(toolIntelDir)) {
  const { execSync } = require('child_process');
  try {
    execSync(`node "${path.join(__dirname, 'tool-intel.js')}" new ${slug} "${toolName}" "${category}"`, { stdio: 'inherit' });
    console.log(`✅ [4/4] Scaffolded Tool Intelligence workspace in tool-intel/tools/${slug}/`);
  } catch (e) {
    console.warn(`⚠️ Could not auto-scaffold tool-intel: ${e.message}`);
  }
} else {
  console.log(`✅ [4/4] Existing Tool Intelligence workspace verified at tool-intel/tools/${slug}/`);
}

console.log(`
🎉 TOOL "${toolName}" (${slug}) SUCCESSFULLY CREATED!
------------------------------------------------------
⚡ Scalable Dynamic Routing: 
  - Automatically routed via app/[locale]/[slug] & app/[slug]
  - Zero router file sprawl in app/!
  - 100% ready for build and live export.
`);
