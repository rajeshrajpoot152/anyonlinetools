# ANYONLINETOOLS – FOUNDATIONAL TOOLING & AUTOMATION UPGRADE PLAN

## 1. Goal Description

The user has explicitly instructed:
1. **Hold Tool Additions:** Do NOT add any new tools yet; maintain strictly the single, fully verified tool (`text-repeater`) for now.
2. **User Keyword Research:** The user will provide custom keyword research and specific tool specifications before we create new tools.
3. **Fix Remaining Tooling & Plumbing:** Complete and upgrade all remaining foundational engines, scaffolding scripts (`create-tool.js`), translation pipelines (`translate-tool.js`), and component templates so that when the user provides the keywords, new tools can be generated with 100% 10-layer architectural perfection in 1 second.

---

## 2. User Review Required

> [!IMPORTANT]
> **Zero New Tools Ingested in this Step:**
> In accordance with your instruction, no new tools (such as `ai-token-counter`, `invisible-text-generator`, `case-converter`, or `jwt-debugger`) will be added to `lib/tools.json` or the production build during this step. We will strictly polish the underlying automation and page plumbing.

> [!NOTE]
> **What This Plan Accomplishes:**
> When you provide your researched keywords and tools in the future, running `npm run tool:add <slug>` will instantly generate:
> 1. Complete metadata with 8 Deep Technical FAQs, 4 Use Cases, and a Comparison Matrix.
> 2. Above-the-fold desktop side-by-side workspace (`lg:grid-cols-12`) with `MobileStickyActionBar` mounted by default.
> 3. Automatic 26-language translation readiness for all content blocks.

---

## 3. Proposed Changes

### Component 1: Native Tool Scaffolder (`scripts/create-tool.js`)
#### [MODIFY] [`scripts/create-tool.js`](file:///d:/new-learning/Pizza/anyonlinetools/scripts/create-tool.js)
- **Upgrade Metadata Template (`newToolEntry`):**
  - Replace the outdated 2-FAQ template with the **8 Deep Technical FAQs Standard** (covering In-Browser RAM execution, zero server uploads, tab freeze prevention, mobile WhatsApp/chat buffer limits, UTF-8/emoji fidelity, offline PWA access, zero subscription cost, and file export).
  - Add **4 Practical Real-World Use Cases** (QA & Testing, Developer Workflows, Social & Content, Data Formatting).
  - Add **Feature Comparison Matrix Table** (AnyOnlineTools client-side vs traditional ad-heavy tools).
- **Upgrade React Component Template (`componentCode`):**
  - Upgrade from the old single-column layout to the **Universal Desktop Above-the-Fold Side-by-Side Workspace** (`lg:grid lg:grid-cols-12 lg:gap-6 items-start`).
  - Wire `lg:col-span-5` for inputs, controls, and presets.
  - Wire `lg:col-span-7` for live output, stats, and ActionPanel.
  - Wire and mount `<MobileStickyActionBar output={output} onClear={...} toolName="${toolName}" />` (`sm:hidden fixed bottom-0 z-40`).

---

### Component 2: 26-Language Translation Engine (`scripts/translate-tool.js`)
#### [MODIFY] [`scripts/translate-tool.js`](file:///d:/new-learning/Pizza/anyonlinetools/scripts/translate-tool.js)
- **Extend Translation Loop:**
  - Add batch translation for `useCases` (translating title, desc, tag across all 25 non-English languages).
  - Add batch translation for `comparisonTable` (translating title, subtitle, column headers, and feature rows).
  - Preserve English fallback gracefully if third-party translation API encounters transient rate limits.

---

### Component 3: Single Source of Truth Synchronization (`plan.md`)
#### [MODIFY] [`plan.md`](file:///d:/new-learning/Pizza/anyonlinetools/plan.md)
- Ensure all sections reflect that the single live anchor tool is `text-repeater` and that the roadmap tools will be introduced systematically once the user provides their researched keyword list.

---

## 4. Verification Plan

### Automated Tests
1. **TypeScript Typecheck:**
   ```bash
   npx tsc --noEmit
   ```
   *Expected result: 0 errors.*

2. **AI Quality Gate (30-Mistake Guard):**
   ```bash
   npm run ai:check
   ```
   *Expected result: 20/20 checks passed.*

3. **Google SEO Indexing Gate:**
   ```bash
   npm run seo:check
   ```
   *Expected result: 24/25 checks passed.*

4. **Production Build & Zero Broken Links:**
   ```bash
   npm run build
   node scratch/check-links.js
   ```
   *Expected result: Build passes cleanly with code 0, 66 HTML files, 0 broken internal links.*

### Manual Verification
- Test `scripts/create-tool.js` dry-run logic to ensure newly generated tool components compile cleanly with TypeScript.
