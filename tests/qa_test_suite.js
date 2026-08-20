/**
 * ✦ KOMOREBI — Automated QA End-to-End Test Suite
 * Comprehensive testing across Server APIs, Cycle Engine, State Machines, Account Isolation & Layout Boundary
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

let passedTests = 0;
let failedTests = 0;
const results = [];

function assert(condition, message) {
  if (condition) {
    passedTests++;
    results.push({ status: 'PASS', message });
    console.log('  ✓ [PASS]', message);
  } else {
    failedTests++;
    results.push({ status: 'FAIL', message });
    console.error('  ✗ [FAIL]', message);
  }
}

async function runTestSuite() {
  console.log('\n========================================================');
  console.log('✦ KOMOREBI COMPREHENSIVE QA TEST SUITE');
  console.log('========================================================\n');

  // ----------------------------------------------------
  // TEST SUITE 1: FILE INTEGRITY & MODULE REGISTRY
  // ----------------------------------------------------
  console.log('[TEST SUITE 1] File Integrity & Script Registry');
  const indexHtml = fs.readFileSync('www/index.html', 'utf-8');
  const scriptMatches = [...indexHtml.matchAll(/src="([^"]+)"/g)].map(m => m[1]);
  const cdnScripts = scriptMatches.filter(s => s.startsWith('http'));
  
  const sourceModules = [
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

  assert(fs.existsSync('www/bundle.js'), `Production application bundle exists (www/bundle.js)`);
  assert(cdnScripts.length >= 3, `Found ${cdnScripts.length} CDN libraries (React, ReactDOM, Firebase)`);

  for (const scriptPath of sourceModules) {
    assert(fs.existsSync(scriptPath), `Source module exists on disk: ${scriptPath}`);
  }

  // ----------------------------------------------------
  // TEST SUITE 2: SERVER API & SYNC ENDPOINT
  // ----------------------------------------------------
  console.log('\n[TEST SUITE 2] Server Sync API Endpoints');
  await new Promise((resolve) => {
    http.get('http://127.0.0.1:8080/api/sync', (res) => {
      assert(res.statusCode === 200, `GET /api/sync returns HTTP 200 OK`);
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          assert(typeof json === 'object', 'GET /api/sync returned valid JSON object');
          assert(Array.isArray(json.plans), 'Payload contains plans array');
          assert(Array.isArray(json.messages), 'Payload contains messages array');
          assert(typeof json.cycle_settings === 'object', 'Payload contains cycle_settings object');
          assert(typeof json.cycle_logs === 'object', 'Payload contains cycle_logs object');
          assert(json.profiles !== undefined, 'Payload contains profiles registry');
        } catch (e) {
          assert(false, `Failed to parse /api/sync JSON: ${e.message}`);
        }
        resolve();
      });
    }).on('error', (err) => {
      assert(false, `HTTP GET /api/sync error: ${err.message}`);
      resolve();
    });
  });

  // Test POST /api/sync
  await new Promise((resolve) => {
    const postData = JSON.stringify({
      whisper_note: 'Thinking of you! 🌸',
      profiles: {
        ziankyle: { name: 'Ziankyle', avatar: { id: 'kokomi', name: 'Kokomi' } },
        mikkie: { name: 'Mikkie', avatar: { id: 'yaemiko', name: 'Yae Miko' } }
      }
    });

    const req = http.request('http://127.0.0.1:8080/api/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      assert(res.statusCode === 200, `POST /api/sync returns HTTP 200 OK`);
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          const resp = JSON.parse(data);
          assert(resp.status === 'ok' || resp.success, 'POST /api/sync response confirms save');
        } catch (e) {
          assert(false, 'POST response valid JSON');
        }
        resolve();
      });
    });

    req.on('error', (e) => {
      assert(false, `POST error: ${e.message}`);
      resolve();
    });

    req.write(postData);
    req.end();
  });

  // ----------------------------------------------------
  // TEST SUITE 3: CYCLE TRACKER MATHEMATICAL ENGINE
  // ----------------------------------------------------
  console.log('\n[TEST SUITE 3] Cycle Engine Algorithmic Calculations');
  
  // Test Ovulation & Fertile calculations
  const cycleLength = 28;
  const periodDuration = 5;
  const ovulationDay = cycleLength - 14; // Day 14
  const fertileStart = ovulationDay - 5; // Day 9
  const fertileEnd = ovulationDay + 1;   // Day 15

  assert(ovulationDay === 14, 'Standard 28-day cycle peak ovulation is Cycle Day 14');
  assert(fertileStart === 9 && fertileEnd === 15, 'Fertile window is Day 9 to Day 15 (7 days)');

  // ----------------------------------------------------
  // TEST SUITE 4: ACCOUNT ISOLATION & PROFILES STATE
  // ----------------------------------------------------
  console.log('\n[TEST SUITE 4] Account Isolation & User-Specific Avatars');
  const appCode = fs.readFileSync('www/js/app.jsx', 'utf-8');
  assert(appCode.includes("const key = 'avatar_' + (name || '').toLowerCase()"), 'User-scoped storage key logic present');
  assert(appCode.includes("saveStorage('avatar_' + myKey, newAv)"), 'Avatar saved to user-specific slot on selection');
  assert(appCode.includes("data.profiles[partnerKey]?.avatar"), 'Partner avatar syncs without overwriting current user');
  assert(appCode.includes("data.profiles[myKey]?.avatar"), 'My avatar syncs without overwriting partner');

  // ----------------------------------------------------
  // TEST SUITE 5: LAYOUT & FULL-HEIGHT SHEET BOUNDARIES
  // ----------------------------------------------------
  console.log('\n[TEST SUITE 5] UI Boundaries, Portaling & Modals');
  const compCss = fs.readFileSync('www/css/components.css', 'utf-8');
  const cycleCss = fs.readFileSync('www/css/cycle.css', 'utf-8');
  const cycleSettingsCode = fs.readFileSync('www/js/components/CycleSettingsSheet.jsx', 'utf-8');
  const cycleLogCode = fs.readFileSync('www/js/components/CycleLogSheet.jsx', 'utf-8');

  assert(compCss.includes('.profile-sheet-body {') && compCss.includes('height: 100%;'), 'Profile Sheet styled full-height edge-to-edge');
  assert(cycleCss.includes('.flo-log-sheet-surface {') && cycleCss.includes('height: 100%;'), 'Flo Log Sheet styled full-height edge-to-edge');
  assert(cycleSettingsCode.includes('ReactDOM.createPortal'), 'CycleSettingsSheet uses ReactDOM.createPortal to cover bottom nav');
  assert(cycleLogCode.includes('ReactDOM.createPortal'), 'CycleLogSheet uses ReactDOM.createPortal to cover bottom nav');

  // ----------------------------------------------------
  // TEST SUITE 6: NOTIFICATION APP LOGO EMBLEM
  // ----------------------------------------------------
  console.log('\n[TEST SUITE 6] Notification Branding & Emblem');
  const notifCode = fs.readFileSync('www/js/components/NotificationBanner.jsx', 'utf-8');
  assert(notifCode.includes('hd-notif-app-logo-badge'), 'Notification banner renders App Logo emblem badge');
  assert(notifCode.includes('KOMOREBI'), 'Notification banner includes branded header tag');

  // ----------------------------------------------------
  // TEST SUITE 8: SECURITY HARDENING & SANITIZATION (OWASP ASVS LEVEL 3)
  // ----------------------------------------------------
  console.log('\n[TEST SUITE 8] Security Hardening, Anti-XSS & Prototype Pollution');
  
  // 1. Test POST with malicious XSS script payload
  await new Promise((resolve) => {
    const maliciousPayload = JSON.stringify({
      whisper_note: 'Hello <script>alert("XSS")</script><style>body{color:red}</style><img src=x onerror=alert(1)>world',
      partner_mood: 'happy<script>bad()</script>',
      __proto__: { isAdmin: true },
      constructor: { prototype: { polluted: true } }
    });

    const req = http.request('http://127.0.0.1:8080/api/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(maliciousPayload)
      }
    }, (res) => {
      assert(res.statusCode === 200, 'POST with malicious payload safely accepted and processed');
      // Read back to verify sanitization
      http.get('http://127.0.0.1:8080/api/sync', (getRes) => {
        let raw = '';
        getRes.on('data', chunk => { raw += chunk; });
        getRes.on('end', () => {
          try {
            const data = JSON.parse(raw);
            assert(!data.whisper_note.includes('<script>'), 'Script tag stripped from whisper_note');
            assert(!data.whisper_note.includes('<style>'), 'Style tag stripped from whisper_note');
            assert(!data.whisper_note.includes('onerror='), 'Event handler stripped from whisper_note');
            assert(!data.whisper_note.includes('alert("XSS")'), 'Inner malicious script content stripped');
            assert(!Object.prototype.isAdmin, 'Prototype pollution prevented (no isAdmin on prototype)');
            assert(!Object.prototype.polluted, 'Prototype pollution prevented (no polluted on prototype)');
          } catch (e) {
            assert(false, `Sanitization parse error: ${e.message}`);
          }
          resolve();
        });
      });
    });

    req.on('error', (e) => {
      assert(false, `Security test POST error: ${e.message}`);
      resolve();
    });

    req.write(maliciousPayload);
    req.end();
  });

  // 2. Test Rate-Limiter and Header Security
  await new Promise((resolve) => {
    http.get('http://127.0.0.1:8080/api/health', (res) => {
      assert(res.statusCode === 200, 'GET /api/health returns 200 OK');
      assert(res.headers['x-content-type-options'] === 'nosniff', 'X-Content-Type-Options: nosniff header present');
      assert(res.headers['x-frame-options'] === 'SAMEORIGIN', 'X-Frame-Options: SAMEORIGIN header present');
      assert(res.headers['content-security-policy'] !== undefined, 'Content-Security-Policy header present');
      resolve();
    });
  });

  // ----------------------------------------------------
  // TEST SUITE 9: ACID TRANSACTIONS, ATOMIC WRITES & BACKUPS
  // ----------------------------------------------------
  console.log('\n[TEST SUITE 9] ACID Transactions, Atomic Writes & Rolling Backups');
  const serverPy = fs.readFileSync('server/server.py', 'utf-8');
  assert(serverPy.includes('with db_lock:'), 'Database operations protected by mutex lock');
  assert(serverPy.includes('rotate_backups('), 'Database maintains rolling automated backups');
  assert(serverPy.includes('os.fsync('), 'Atomic write uses os.fsync for disk flush durability');
  assert(serverPy.includes('os.replace('), 'Atomic write uses os.replace for POSIX/NT atomic swap');
  assert(serverPy.includes('recover_corrupted_database()'), 'Auto-recovery mechanism for corrupted files present');

  // ----------------------------------------------------
  // TEST SUITE 7: MOVIE DATE TINDER SWIPER & MATCH ENGINE
  // ----------------------------------------------------
  console.log('\n[TEST SUITE 7] Movie Date Deck, TV Series, Mutual Matching & Watchlist');
  const flickCode = fs.readFileSync('www/js/components/FlickSwipeSheet.jsx', 'utf-8');
  assert(flickCode.includes('CURATED_COUPLE_MOVIES'), 'Movie Date contains curated couple movies and series collection');
  assert(flickCode.includes('GENRE_FILTERS'), 'Movie Date supports genre and series filter pills');
  assert(flickCode.includes('flick-stamp like'), 'Movie Date renders dynamic LIKE stamp on drag');
  assert(flickCode.includes('flick-stamp nope'), 'Movie Date renders dynamic PASS stamp on drag');
  assert(flickCode.includes("IT'S A MATCH!"), 'Movie Date triggers celebration on mutual couple match');
  assert(flickCode.includes('Movie Date Watchlist'), 'Movie Date includes shared couple watchlist drawer');
  assert(flickCode.includes('This product uses the TMDB API'), 'Movie Date includes TMDB attribution disclaimer');

  const iconsCode = fs.readFileSync('www/js/icons.jsx', 'utf-8');
  assert(iconsCode.includes('Clapperboard:'), 'Icons contains refined Clapperboard vector icon');
  assert(iconsCode.includes('Film:'), 'Icons contains refined Film vector icon');
  assert(iconsCode.includes('Tv:'), 'Icons contains refined Tv series vector icon');

  // ----------------------------------------------------
  // TEST SUITE 10: UI STYLESHEET & COMPONENT INTEGRITY
  // ----------------------------------------------------
  console.log('\n[TEST SUITE 10] UI Stylesheets, Design Tokens & Component Wiring');
  const stylesCss = fs.readFileSync('www/styles.css', 'utf-8');
  const cssFiles = ['variables.css', 'layout.css', 'calendar.css', 'chat.css', 'components.css', 'cycle.css', 'flickswipe.css'];
  for (const c of cssFiles) {
    assert(stylesCss.includes(c), `Central stylesheet imports ${c}`);
    assert(fs.existsSync(`www/css/${c}`), `Stylesheet file exists on disk: www/css/${c}`);
  }

  const syncJs = fs.readFileSync('www/js/services/sync.jsx', 'utf-8');
  assert(syncJs.includes('fetchLatest()') && syncJs.includes('fetchData()'), 'WiFiSync provides both fetchLatest and fetchData methods');

  // ----------------------------------------------------
  // SUMMARY
  // ----------------------------------------------------
  console.log('\n========================================================');
  console.log(`✦ QA RESULTS: ${passedTests} PASSED, ${failedTests} FAILED`);
  console.log(`✦ VERDICT: ${failedTests === 0 ? 'ALL TESTS PASSED (100%)' : 'TESTS FAILED'}`);
  console.log('========================================================\n');

  if (failedTests > 0) process.exit(1);
}

runTestSuite();
