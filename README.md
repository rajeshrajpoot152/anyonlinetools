# AnyOnlineTools (anyonlinetools.com)

A high-performance Next.js 14 web application providing fast, free, and 100% private in-browser utilities for developers, writers, students, and digital professionals.

---

## 🏗️ Architecture: Native Next.js App Router (Single Source of Truth)

All tools reside natively inside the main Next.js App Router (`app/`) architecture. There is zero code duplication, zero external sync scripts, and 100% unified global state (Dark Mode, Header, Footer, PWA, SEO).

### Key Architectural Standards
- **100% Client-Side Privacy:** All processing runs locally in browser memory (RAM) via Web APIs, Web Workers, or Canvas. No user data is ever uploaded or stored on servers.
- **Master Tool Template:** Every tool uses `components/layouts/ToolLayout.tsx` for consistent UI, responsive ad slots, quick start steps, and FAQ accordions.
- **Shared UI Kit:** `components/ui/` contains reusable components (`CopyButton`, `ActionPanel`, `Dropzone`) to prevent redundant code.
- **Static Export Harmony:** Pure static export to `out/` with automated SEO sitemap generation and `.htaccess` protection.

---

## ⚡ Quick CLI: Add or Remove Tools in 1 Second (Scalable to 50,000 Tools)

You can create or delete tools instantly with zero human error using our native CLI scripts:

### 1. Add a New Tool (Instant Scaffolding)
```bash
npm run tool:add word-counter "Word Counter" "text" "Count words and characters in real time." "Type"
```
**What this does automatically:**
- Registers metadata in `lib/tools.json`.
- Scaffolds `components/tools/WordCounter.tsx` with `ActionPanel` and `CopyButton`.
- Registers in `components/tools/registry.ts`.
- Automatically connects to Homepage, All Tools directory, `sitemap.xml`, and dynamic multi-language routing!
- Zero router file sprawl in `app/`!

### 2. Remove a Tool (Clean Deletion)
```bash
npm run tool:remove word-counter
```
**What this does automatically:**
- Safely removes the entry from `lib/tools.json`.
- Deletes `components/tools/WordCounter.tsx`.
- Unregisters from `components/tools/registry.ts`.
- Ensures zero dead links or orphan references exist.

---

## 🚀 How to Add a New Tool Manually (In 2 Simple Steps)

With our dynamic routing engine (`app/[locale]/[slug]/page.tsx`), you never need to create or touch page routes in `app/`:

### Step 1: Register in `lib/tools.json`
Add your tool metadata to `lib/tools.json`:
```json
{
  "slug": "word-counter",
  "name": "Word Counter",
  "category": "text",
  "categoryLabel": "Text Utilities",
  "shortDesc": "Count words, characters, sentences, and reading time in real time.",
  "description": "Fast, private in-browser word counter. Analyze text length, paragraphs, reading time, and speaking time with zero server uploads.",
  "icon": "Type",
  "badge": "Popular",
  "seoTitle": "Word Counter Online – Free Word & Character Counter",
  "seoDesc": "Count words, characters, sentences, and paragraphs in real time. 100% free and private client-side word count tool.",
  "keywords": ["word counter", "character counter", "word count online"]
}
```

### Step 2: Create Tool Component & Register
1. Create `components/tools/WordCounter.tsx`:
   ```tsx
   'use client';
   import React, { useState } from 'react';
   import ActionPanel from '../ui/ActionPanel';

   export default function WordCounter() {
     const [text, setText] = useState('');
     return (
       <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8">
         <textarea value={text} onChange={(e) => setText(e.target.value)} />
         <ActionPanel content={text} onClear={() => setText('')} />
       </div>
     );
   }
   ```
2. Register in `components/tools/registry.ts`:
   ```ts
   import WordCounter from './WordCounter';
   export const TOOL_REGISTRY = {
     'word-counter': WordCounter,
   };
   ```
---

## 🗑️ How to Remove a Tool (In 2 Seconds)
1. Remove the entry from `lib/tools.json`.
2. Delete `components/tools/[ToolName].tsx` and remove its line from `components/tools/registry.ts`.
3. Run `npm run build`. Sitemaps, directory cards, header search, and category grids update automatically!

---

## 🛠️ Development & Build Commands

```bash
# Start local development server
npm run dev

# Full production build & static export to out/
npm run build

# Synchronize sitemap and .htaccess
npm run sync

# Code style & validity check
npm run lint
```
