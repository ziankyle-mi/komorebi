const fs = require('fs');
const path = require('path');
const https = require('https');

const vm = require('vm');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(fetchUrl(res.headers.location));
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function checkAll() {
  console.log('--- Checking all JSX modules ---');
  
  const babelUrl = 'https://unpkg.com/@babel/standalone@7.24.0/babel.min.js';
  const babelCode = await fetchUrl(babelUrl);

  const sandbox = { console, setTimeout, clearTimeout };
  vm.createContext(sandbox);
  vm.runInContext(babelCode, sandbox);
  const loadedBabel = sandbox.Babel;

  const buildScript = fs.readFileSync('scripts/build.js', 'utf8');
  const matchFiles = [...buildScript.matchAll(/'(www\/js\/[^']+)'/g)].map(m => m[1]);
  const scripts = matchFiles.length > 0 ? matchFiles : [
    'www/js/config.jsx', 'www/js/icons.jsx', 'www/js/utils.jsx',
    'www/js/services/audio.jsx', 'www/js/services/sync.jsx', 'www/js/services/cycleEngine.jsx',
    'www/js/components/PullToRefresh.jsx', 'www/js/components/SkeletonLoader.jsx', 'www/js/components/CelestialCanvas.jsx',
    'www/js/components/NotificationBanner.jsx', 'www/js/components/MediaViewer.jsx', 'www/js/components/MoodPickerModal.jsx',
    'www/js/components/AddPlanSheet.jsx', 'www/js/components/SendPictureSheet.jsx', 'www/js/components/ProfileSheet.jsx',
    'www/js/components/FlickSwipeSheet.jsx',
    'www/js/components/AuthGateScreen.jsx', 'www/js/components/CycleLogSheet.jsx', 'www/js/components/CycleSettingsSheet.jsx',
    'www/js/components/MoodCycleChart.jsx', 'www/js/components/CycleAccuracyCard.jsx',
    'www/js/views/CalendarTab.jsx', 'www/js/views/ChatTab.jsx',
    'www/js/views/CycleTrackerView.jsx', 'www/js/app.jsx'
  ];

  console.log(`Found ${scripts.length} Babel scripts to compile:`);

  let errorCount = 0;
  for (const s of scripts) {
    const filePath = path.resolve(s);
    const code = fs.readFileSync(filePath, 'utf8');
    try {
      loadedBabel.transform(code, {
        presets: ['react']
      });
      console.log(`✓ [OK] ${s}`);
    } catch (err) {
      console.error(`✗ [ERROR in ${s}]:`, err.message);
      errorCount++;
    }
  }

  if (errorCount === 0) {
    console.log(`\n✦ ALL ${scripts.length} SCRIPTS COMPILED CLEANLY WITH ZERO SYNTAX ERRORS!`);
  } else {
    console.error(`\n✗ FOUND ${errorCount} COMPILATION ERRORS!`);
    process.exit(1);
  }
}

checkAll().catch(err => {
  console.error('Test runner failed:', err);
  process.exit(1);
});
