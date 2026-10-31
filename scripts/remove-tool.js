#!/usr/bin/env node

/**
 * AnyOnlineTools - Native Tool Remover (10,000+ Tools Scale Architecture)
 * 
 * Usage:
 *   node scripts/remove-tool.js <slug>
 * 
 * Example:
 *   node scripts/remove-tool.js word-counter
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const toolsJsonPath = path.join(rootDir, 'lib', 'tools.json');
const registryPath = path.join(rootDir, 'components', 'tools', 'registry.ts');

const slug = process.argv[2] ? process.argv[2].toLowerCase().trim() : null;

if (!slug) {
  console.log(`
Usage:
  node scripts/remove-tool.js <slug>

Example:
  node scripts/remove-tool.js word-counter
`);
  process.exit(1);
}

function toPascalCase(str) {
  return str
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

const componentName = toPascalCase(slug);

// 1. Remove from lib/tools.json
if (fs.existsSync(toolsJsonPath)) {
  let tools = JSON.parse(fs.readFileSync(toolsJsonPath, 'utf8'));
  const initialLength = tools.length;
  tools = tools.filter(t => t.slug !== slug);

  if (tools.length === initialLength) {
    console.log(`⚠️ Warning: "${slug}" was not found in lib/tools.json`);
  } else {
    fs.writeFileSync(toolsJsonPath, JSON.stringify(tools, null, 2) + '\n', 'utf8');
    console.log(`✅ [1/3] Removed "${slug}" from lib/tools.json`);
  }
}

// 2. Remove component file
const componentFilePath = path.join(rootDir, 'components', 'tools', `${componentName}.tsx`);
if (fs.existsSync(componentFilePath)) {
  fs.rmSync(componentFilePath, { force: true });
  console.log(`✅ [2/3] Deleted components/tools/${componentName}.tsx`);
} else {
  console.log(`ℹ️ Component file components/tools/${componentName}.tsx does not exist (skipped)`);
}

// 3. Unregister from components/tools/registry.ts
if (fs.existsSync(registryPath)) {
  let regContent = fs.readFileSync(registryPath, 'utf8');
  
  // Remove import
  const importRegex = new RegExp(`import\\s+${componentName}\\s+from\\s+'\\.\\/${componentName}';\\r?\\n?`, 'g');
  regContent = regContent.replace(importRegex, '');

  // Remove registry map entry
  const entryRegex = new RegExp(`\\s*'${slug}':\\s*${componentName},?\\r?\\n?`, 'g');
  regContent = regContent.replace(entryRegex, '\n');

  fs.writeFileSync(registryPath, regContent, 'utf8');
  console.log(`✅ [3/3] Unregistered from components/tools/registry.ts`);
}

console.log(`
🗑️ TOOL "${slug}" REMOVED CLEANLY!
----------------------------------
Run "npm run build" to update sitemap and static export with zero broken links.
`);
