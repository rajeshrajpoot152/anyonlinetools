const fs = require('fs');
const path = require('path');

const pluginPath = path.join(__dirname, '..', 'node_modules', 'next', 'dist', 'compiled', '@next', 'react-refresh-utils', 'dist', 'ReactRefreshWebpackPlugin.js');

if (fs.existsSync(pluginPath)) {
  let content = fs.readFileSync(pluginPath, 'utf8');
  const target = `Template.indent('originalFactory.call(this, moduleObject, moduleExports, webpackRequire);')`;
  const replacement = `Template.indent('if (typeof originalFactory === "function") { originalFactory.call(this, moduleObject, moduleExports, webpackRequire); }')`;

  if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync(pluginPath, content, 'utf8');
    console.log('🛡️ [PATCH] Successfully safeguarded ReactRefreshWebpackPlugin against undefined originalFactory!');
  } else if (content.includes(replacement)) {
    console.log('🛡️ [PATCH] ReactRefreshWebpackPlugin is already safeguarded.');
  } else {
    console.warn('⚠️ [PATCH] Target pattern not found in ReactRefreshWebpackPlugin.');
  }
} else {
  console.log('ℹ️ [PATCH] ReactRefreshWebpackPlugin not found, skipping patch.');
}
