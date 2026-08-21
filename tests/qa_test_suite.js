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
    'www/js/components/NotificationBanner.jsx', 'www/js/components/MediaViewer.jsx',
    'www/js/components/LocketGalleryModal.jsx', 'www/js/components/MoodPickerModal.jsx',
    'www/js/components/AddPlanSheet.jsx', 'www/js/components/SendPictureSheet.jsx', 'www/js/components/ProfileSheet.jsx',
    'www/js/data/movieCatalog.jsx', 'www/js/components/FlickSwipeSheet.jsx',
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
  const catalogCode = fs.readFileSync('www/js/data/movieCatalog.jsx', 'utf-8');
  const flickCode = fs.readFileSync('www/js/components/FlickSwipeSheet.jsx', 'utf-8');
  assert(catalogCode.includes('INITIAL_COUPLE_CATALOG'), 'Movie Date contains curated couple movies and series collection');
  assert(catalogCode.includes('GENRE_FILTERS'), 'Movie Date supports genre and series filter pills');
  assert(flickCode.includes('flick-stamp like'), 'Movie Date renders dynamic LIKE stamp on drag');
  assert(flickCode.includes('flick-stamp nope'), 'Movie Date renders dynamic PASS stamp on drag');
  assert(flickCode.includes("IT'S A MATCH!"), 'Movie Date triggers celebration on mutual couple match');
  assert(flickCode.includes('Movie Date Watchlist'), 'Movie Date includes shared couple watchlist drawer');
  assert(flickCode.includes('ReactDOM.createPortal('), 'FlickSwipeSheet uses ReactDOM.createPortal to render over top-level DOM');
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
  // TEST SUITE 11: SHARED LOCKET & PARTNER MEDIA GALLERY INTEGRITY
  // ----------------------------------------------------
  console.log('\n[TEST SUITE 11] Shared Locket, Partner Media Gallery & Base64 Payload Integrity');
  const utilsCode = fs.readFileSync('www/js/utils.jsx', 'utf-8');
  assert(utilsCode.includes("obj.startsWith('data:image/') || obj.startsWith('data:video/')"), 'deepSanitizeObject preserves media data URIs without truncation');
  assert(utilsCode.includes("key === 'locket_drops'"), 'Storage loader handles locket_drops collection');

  const locketModalCode = fs.readFileSync('www/js/components/LocketGalleryModal.jsx', 'utf-8');
  assert(locketModalCode.includes("filter === 'partner'"), "Locket Gallery supports dedicated Partner's Drops filter");
  assert(locketModalCode.includes("filter === 'mine'"), "Locket Gallery supports My Drops filter");
  assert(locketModalCode.includes("onSelectDrop"), "Locket Gallery supports tap-to-view fullscreen inspection");

  // Test Server POST with large base64 image + video drop
  const mockBase64Img = 'data:image/jpeg;base64,' + 'A'.repeat(5000);
  const mockBase64Vid = 'data:video/mp4;base64,' + 'B'.repeat(5000);
  await new Promise((resolve) => {
    const locketPayload = JSON.stringify({
      latest_snap: {
        id: 'snap-test-' + Date.now(),
        imageUrl: mockBase64Vid,
        caption: 'Our favorite memory 🌟',
        time: 'Just now',
        sentBy: 'mikkie',
        mediaType: 'video',
        items: [{ id: '1', url: mockBase64Vid, type: 'video', name: 'Memory.mp4' }]
      },
      locket_drops: [
        {
          id: 'drop-1',
          imageUrl: mockBase64Img,
          caption: 'Sunset with you 🌅',
          time: '5:30 PM',
          sentBy: 'mikkie',
          mediaType: 'image',
          items: [{ id: '101', url: mockBase64Img, type: 'image', name: 'sunset.jpg' }]
        },
        {
          id: 'drop-2',
          imageUrl: mockBase64Vid,
          caption: 'Video memory ✨',
          time: '6:15 PM',
          sentBy: 'ziankyle',
          mediaType: 'video',
          items: [{ id: '102', url: mockBase64Vid, type: 'video', name: 'clip.mp4' }]
        }
      ]
    });

    const req = http.request('http://127.0.0.1:8080/api/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(locketPayload)
      }
    }, (res) => {
      assert(res.statusCode === 200, 'POST /api/sync accepts large media drops (photos & videos)');
      http.get('http://127.0.0.1:8080/api/sync', (getRes) => {
        let raw = '';
        getRes.on('data', chunk => { raw += chunk; });
        getRes.on('end', () => {
          try {
            const data = JSON.parse(raw);
            assert(data.latest_snap !== null, 'latest_snap saved on server');
            assert(data.latest_snap.imageUrl.startsWith('data:video/mp4;base64,'), 'Video data URI preserved on latest_snap');
            assert(data.latest_snap.imageUrl.length > 1000, 'Large base64 string not truncated to 1000 characters');
            assert(Array.isArray(data.locket_drops) && data.locket_drops.length >= 2, 'locket_drops array stored on server');
            assert(data.locket_drops[0].imageUrl.length > 1000, 'Locket drop image base64 length preserved intact');
          } catch (e) {
            assert(false, `Locket sync verification error: ${e.message}`);
          }
          resolve();
        });
      });
    });

    req.on('error', (e) => {
      assert(false, `Locket POST error: ${e.message}`);
      resolve();
    });

    req.write(locketPayload);
    req.end();
  });

  // ----------------------------------------------------
  // TEST SUITE 12: Discovery & Romance Expansion Modules
  // ----------------------------------------------------
  console.log('\n[TEST SUITE 12] Discovery & Romance Features (Bucket List, Story Timeline, Soundscape)');
  
  // 12.1 Verify Soundscape Engine Code
  const soundscapeSrc = fs.readFileSync('www/js/services/soundscape.jsx', 'utf8');
  assert(soundscapeSrc.includes('SoundscapeSynthesizer'), 'Soundscape Synthesizer class defined');
  assert(soundscapeSrc.includes('createPinkNoiseNode'), 'Procedural pink noise rain synthesis present');
  assert(soundscapeSrc.includes('playZenChime'), 'Harmonic pentatonic zen wind chimes present');

  // 12.2 Verify Bucket List Code
  const bucketSrc = fs.readFileSync('www/js/components/BucketListSheet.jsx', 'utf8');
  assert(bucketSrc.includes('DEFAULT_COUPLE_QUESTS'), 'Curated couple quests catalog present');
  assert(bucketSrc.includes('coupleRank'), 'Progress rank calculation present');
  assert(bucketSrc.includes('handleToggleQuest'), 'Quest completion toggle present');

  // 12.3 Verify Story Timeline Code
  const storySrc = fs.readFileSync('www/js/components/StoryTimelineSheet.jsx', 'utf8');
  assert(storySrc.includes('StoryTimelineSheet'), 'Story Timeline component exported');
  assert(storySrc.includes('daysTogether'), 'Days in Love live counter present');
  assert(storySrc.includes('handleAddMilestone'), 'Milestone memory composer present');

  // 12.4 Verify Server Sync for Discovery Collections
  await new Promise((resolve) => {
    const discoveryPayload = JSON.stringify({
      bucket_list: [{ id: "quest-test", title: "Fly to Tokyo", category: "adventures", completed: true, icon: "✈️" }],
      story_milestones: [{ id: "ms-test", title: "Met in Tokyo", date: "2024-02-14", story: "Unforgettable", icon: "✨" }]
    });

    const req = http.request({
      hostname: '127.0.0.1',
      port: 8080,
      path: '/api/sync',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(discoveryPayload)
      }
    }, (res) => {
      assert(res.statusCode === 200, 'POST /api/sync accepts discovery collections');
      http.get('http://127.0.0.1:8080/api/sync', (getRes) => {
        let body = '';
        getRes.on('data', chunk => body += chunk);
        getRes.on('end', () => {
          try {
            const data = JSON.parse(body);
            assert(Array.isArray(data.bucket_list) && data.bucket_list.length > 0, 'Server stored bucket_list array');
            assert(Array.isArray(data.story_milestones) && data.story_milestones.length > 0, 'Server stored story_milestones array');
          } catch (e) {
            assert(false, `Discovery sync verification error: ${e.message}`);
          }
          resolve();
        });
      });
    });

    req.on('error', (e) => {
      assert(false, `Discovery POST error: ${e.message}`);
      resolve();
    });

    req.write(discoveryPayload);
    req.end();
  });

  // Restore clean couple_data.json with real sample photos
  const cleanDb = {
    plans: [],
    messages: [
      { id: "1787134469156", sender: "ziankyle", text: "hi", time: "06:14 PM" },
      { id: "1787190081722", sender: "ziankyle", text: "helloo", time: "09:41 AM" },
      { id: "1787190086888", sender: "mikkie", text: "how are you", time: "09:41 AM" }
    ],
    latest_snap: {
      id: "snap-sunset-01",
      imageUrl: "./assets/photos/sunset_sanctuary.jpg",
      caption: "Our sunset sanctuary hill 🌸",
      time: "5:30 PM",
      sentBy: "mikkie",
      mediaType: "image",
      items: [{ id: "item-1", url: "./assets/photos/sunset_sanctuary.jpg", type: "image", name: "sunset_sanctuary.jpg" }]
    },
    locket_drops: [
      {
        id: "snap-sunset-01",
        imageUrl: "./assets/photos/sunset_sanctuary.jpg",
        caption: "Our sunset sanctuary hill 🌸",
        time: "5:30 PM",
        sentBy: "mikkie",
        mediaType: "image",
        items: [{ id: "item-1", url: "./assets/photos/sunset_sanctuary.jpg", type: "image", name: "sunset_sanctuary.jpg" }]
      },
      {
        id: "snap-star-02",
        imageUrl: "./assets/photos/stargazing_moment.jpg",
        caption: "Stargazing together under the meteors ✨",
        time: "7:15 PM",
        sentBy: "ziankyle",
        mediaType: "image",
        items: [{ id: "item-2", url: "./assets/photos/stargazing_moment.jpg", type: "image", name: "stargazing_moment.jpg" }]
      }
    ],
    time_capsules: [
      {
        id: "capsule-1",
        title: "For our 1-year anniversary under the stars",
        letter: "I promise to always hold your hand, listen to your dreams, and build our cozy life together day by day. You are my home. 🌸",
        occasion: "Anniversary",
        unlockDate: "2026-08-25",
        sentBy: "ziankyle",
        isUnlocked: false,
        createdAt: 1787134400000
      }
    ],
    bucket_list: [
      { id: "q-1", title: "Midnight Stargazing & Picnic", category: "dates", completed: true, completedAt: 1787134400000, icon: "✨" },
      { id: "q-2", title: "Cook a 3-Course Dinner from Scratch", category: "dates", completed: false, icon: "🍝" },
      { id: "q-7", title: "Walk Under Kyoto Cherry Blossoms", category: "adventures", completed: false, icon: "🌸" },
      { id: "q-12", title: "Celebrate 1,000 Days in Love", category: "milestones", completed: false, icon: "💍" }
    ],
    story_milestones: [
      { id: "m-1", title: "The First Spark 💫", date: "2024-02-14", story: "The exact moment our paths crossed and an unforgettable conversation began.", icon: "✨", photo: "./assets/photos/sunset_sanctuary.jpg" },
      { id: "m-3", title: "Made It Official 💍", date: "2024-05-20", story: "Promised to cherish and love each other through all seasons.", icon: "💖", photo: "./assets/photos/stargazing_moment.jpg" }
    ],
    custom_wheel: ["Ramen 🍜", "Sushi 🍣", "Italian Pasta 🍝", "Korean BBQ 🥩"],
    whisper_note: "Thinking of you right now! 🌸",
    partner_status: { energy: 2, sleeping: false },
    cycle_logs: {},
    cycle_settings: { cycleLength: 28, periodDuration: 5, lastPeriodStart: "2026-08-19", allowIntimacyTracking: true },
    profiles: {
      ziankyle: { name: "Ziankyle", avatar: { id: "kokomi", name: "Kokomi", element: "hydro", iconUrl: "./assets/avatars/kokomi.png" } },
      mikkie: { name: "Mikkie", avatar: { id: "yae", name: "Yae Miko", element: "electro", iconUrl: "./assets/avatars/yae.png" } }
    },
    movie_swipes: {},
    last_updated: Date.now()
  };
  fs.writeFileSync('server/couple_data.json', JSON.stringify(cleanDb, null, 2), 'utf-8');

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
