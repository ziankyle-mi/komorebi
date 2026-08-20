const fs = require('fs');
const path = require('path');
const babel = require('@babel/standalone');

const orderedFiles = [
  'www/js/config.jsx',
  'www/js/icons.jsx',
  'www/js/utils.jsx',
  'www/js/services/audio.jsx',
  'www/js/services/sync.jsx',
  'www/js/services/cycleEngine.jsx',
  'www/js/components/PullToRefresh.jsx',
  'www/js/components/SkeletonLoader.jsx',
  'www/js/components/CelestialCanvas.jsx',
  'www/js/components/NotificationBanner.jsx',
  'www/js/components/MediaViewer.jsx',
  'www/js/components/MoodPickerModal.jsx',
  'www/js/components/AddPlanSheet.jsx',
  'www/js/components/SendPictureSheet.jsx',
  'www/js/components/ProfileSheet.jsx',
  'www/js/components/FlickSwipeSheet.jsx',
  'www/js/components/AuthGateScreen.jsx',
  'www/js/components/CycleLogSheet.jsx',
  'www/js/components/CycleSettingsSheet.jsx',
  'www/js/components/MoodCycleChart.jsx',
  'www/js/components/CycleAccuracyCard.jsx',
  'www/js/views/CalendarTab.jsx',
  'www/js/views/ChatTab.jsx',
  'www/js/views/CycleTrackerView.jsx',
  'www/js/app.jsx'
];

const bundleParts = [
  '/**\n * ✦ KOMOREBI — High-Performance Production Application Bundle\n */\n\n',
  '(function(global) {\n',
  '  "use strict";\n\n',
  '  var React = global.React || {};\n',
  '  var useState = React.useState;\n',
  '  var useEffect = React.useEffect;\n',
  '  var useRef = React.useRef;\n',
  '  var useMemo = React.useMemo;\n',
  '  var useCallback = React.useCallback;\n\n'
];

for (const relPath of orderedFiles) {
  const filePath = path.resolve(__dirname, '..', relPath);
  let code = fs.readFileSync(filePath, 'utf8');
  
  // Remove any redundant local destructuring of React hooks to avoid duplicate declaration collisions
  code = code.replace(/const\s*\{\s*useState[^}]*\}\s*=\s*React\s*;?/g, '// [destructure removed by bundler]');
  code = code.replace(/var\s*\{\s*useState[^}]*\}\s*=\s*React\s*;?/g, '// [destructure removed by bundler]');

  // Transform JSX with classic React runtime
  const compiled = babel.transform(code, {
    presets: [['react', { runtime: 'classic' }]]
  }).code;

  bundleParts.push(`  // ==========================================\n  // Module: ${relPath}\n  // ==========================================\n`);
  bundleParts.push(compiled);
  bundleParts.push('\n\n');
}

bundleParts.push('})(typeof window !== "undefined" ? window : globalThis);\n');

const bundleContent = bundleParts.join('');
const outPath = path.resolve(__dirname, '..', 'www', 'bundle.js');
fs.writeFileSync(outPath, bundleContent, 'utf8');
console.log(`[✓] Successfully compiled www/bundle.js (${(bundleContent.length / 1024).toFixed(1)} KB)`);
