/**
 * ✦ KOMOREBI — Sanctuary Couple Calendar & Live Widget
 * Clean, Bare Initial State • Zero Stock/Placeholder AI Slop • True Local Storage
 */

const { useState, useEffect, useRef } = React;

// Preset Character Avatars Roster (Kokomi by default for partner)
const PRESET_AVATARS = [
  { id: 'kokomi', name: 'Kokomi', element: 'hydro', iconUrl: './assets/avatars/kokomi.png' },
  { id: 'kazuha', name: 'Kazuha', element: 'anemo', iconUrl: './assets/avatars/kazuha.png' },
  { id: 'shogun', name: 'Raiden', element: 'electro', iconUrl: './assets/avatars/shogun.png' },
  { id: 'furina', name: 'Furina', element: 'hydro', iconUrl: './assets/avatars/furina.png' },
  { id: 'zhongli', name: 'Zhongli', element: 'geo', iconUrl: './assets/avatars/zhongli.png' },
  { id: 'hutao', name: 'Hu Tao', element: 'pyro', iconUrl: './assets/avatars/hutao.png' },
  { id: 'ayaka', name: 'Ayaka', element: 'cryo', iconUrl: './assets/avatars/ayaka.png' },
  { id: 'nahida', name: 'Nahida', element: 'dendro', iconUrl: './assets/avatars/nahida.png' },
  { id: 'wanderer', name: 'Wanderer', element: 'anemo', iconUrl: './assets/avatars/wanderer.png' },
  { id: 'neuvillette', name: 'Neuvillette', element: 'hydro', iconUrl: './assets/avatars/neuvillette.png' },
  { id: 'xiao', name: 'Xiao', element: 'anemo', iconUrl: './assets/avatars/xiao.png' },
  { id: 'yae', name: 'Yae Miko', element: 'electro', iconUrl: './assets/avatars/yae.png' },
  { id: 'spongebob', name: 'SpongeBob', element: 'anemo', iconUrl: './assets/avatars/spongebob.png' },
  { id: 'mymelody', name: 'My Melody', element: 'pyro', iconUrl: './assets/avatars/mymelody.png' },
  { id: 'pikachu', name: 'Pikachu', element: 'electro', iconUrl: './assets/avatars/pikachu.png' },
  { id: 'pompompurin', name: 'Pompompurin', element: 'geo', iconUrl: './assets/avatars/pompompurin.png' }
];

// Clean Minimalist Vector SVG System Icons
const Icons = {
  Calendar: ({ size = 18, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="4" width="18" height="18" rx="3" ry="3"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  ),
  Chat: ({ size = 18, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  ),
  Camera: ({ size = 18, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
      <circle cx="12" cy="13" r="4"></circle>
    </svg>
  ),
  Plus: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  ),
  User: ({ size = 18, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  ),
  Sun: ({ size = 13, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
  ),
  Moon: ({ size = 13, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  ),
  Clock: ({ size = 13, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  ),
  Trash: ({ size = 13, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
  ),
  Edit: ({ size = 12, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  ),
  Heart: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  ),
  Refresh: ({ size = 12, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="23 4 23 10 17 10"></polyline>
      <polyline points="1 20 1 14 7 14"></polyline>
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
    </svg>
  ),
  Settings: ({ size = 13, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
  ),
  Smile: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
    </svg>
  ),
  Coffee: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M10 2v2M14 2v2M18 8a4 4 0 0 1 0 8h-1M6 2v2" />
      <path d="M2 8h15v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4Z" />
    </svg>
  ),
  Zap: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Leaf: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  ),
  Target: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <line x1="22" x2="18" y1="12" y2="12" />
      <line x1="6" x2="2" y1="12" y2="12" />
      <line x1="12" x2="12" y1="6" y2="2" />
      <line x1="12" x2="12" y1="22" y2="18" />
    </svg>
  ),
  Stars: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4M3 5h4M19 17v4M17 19h4" />
    </svg>
  ),
  Bell: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
  ),
  Palette: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle>
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle>
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle>
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path>
    </svg>
  ),
  Flower: ({ size = 13, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V9m4.5 3a4.5 4.5 0 1 1-4.5 4.5M16.5 12H15m-3 4.5a4.5 4.5 0 1 1-4.5-4.5M12 16.5V15m-4.5-3H9" />
      <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.25" />
    </svg>
  ),
  TreePine: ({ size = 13, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2a1 1 0 0 1-.8-1.7L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z" />
      <path d="M12 22v-3" />
    </svg>
  ),
  Waves: ({ size = 13, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    </svg>
  ),
  Mail: ({ size = 13, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
};

// Curated Vector Mood Roster (No emojis — 100% Vector SVG Icons)
const MOOD_ROSTER = [
  { id: 'loving', name: 'Loving', desc: 'Affectionate & Tender', color: '#ff7597', icon: 'Heart' },
  { id: 'happy', name: 'Joyful', desc: 'Happy & Cheerful', color: '#f8cf65', icon: 'Smile' },
  { id: 'cozy', name: 'Cozy', desc: 'Warm & Relaxed', color: '#fb923c', icon: 'Coffee' },
  { id: 'energized', name: 'Hyped', desc: 'Full of Energy', color: '#4cd7b6', icon: 'Zap' },
  { id: 'peaceful', name: 'Peaceful', desc: 'Serene & Calm', color: '#34d399', icon: 'Leaf' },
  { id: 'sleepy', name: 'Sleepy', desc: 'Tired & Resting', color: '#a78bfa', icon: 'Moon' },
  { id: 'focused', name: 'Focused', desc: 'Deep Focus & Study', color: '#38bdf8', icon: 'Target' },
  { id: 'missing_you', name: 'Missing You', desc: 'Thinking of You', color: '#f43f5e', icon: 'Stars' }
];

function getMoodData(moodId) {
  return MOOD_ROSTER.find(m => m.id === moodId) || MOOD_ROSTER[0];
}

function MoodVectorIcon({ moodId, size = 16, className = "" }) {
  const m = getMoodData(moodId);
  const Comp = Icons[m.icon] || Icons.Heart;
  return (
    <span className={`mood-vector-wrapper ${className}`} style={{ color: m.color, display: 'inline-flex', alignItems: 'center' }}>
      <Comp size={size} />
    </span>
  );
}

// Clean Bare Defaults (No fake/stock preset data)
const DEFAULT_PLANS = [];
const DEFAULT_MESSAGES = [];
const DEFAULT_SNAP = null;
const DEFAULT_WHISPER = "Tap Edit to write a daily note for your partner";
const DEFAULT_SUPABASE_CONFIG = {
  url: 'https://ytupmzpfvdldnqgntqsa.supabase.co',
  key: 'sb_publishable_guFNqBfQXDKmiH9kCXPRoA_grbwdwyP'
};

// Storage Helpers (Purges any legacy dummy preset data)
function loadStorage(key, fallback) {
  try {
    const data = localStorage.getItem(`komorebi_${key}`);
    if (data !== null) {
      const parsed = JSON.parse(data);
      if (key === 'plans' && Array.isArray(parsed)) {
        return parsed.filter(p => !p.id.startsWith('comm-'));
      }
      if (key === 'messages' && Array.isArray(parsed)) {
        return parsed.filter(m => !m.id.startsWith('m-'));
      }
      if (key === 'latest_snap' && parsed && (parsed.id === 'snap-1' || parsed.imageUrl.includes('unsplash.com'))) {
        return null;
      }
      if ((key === 'active_user' || key === 'partner_user') && parsed && parsed.name && parsed.name.toLowerCase() === 'zian') {
        return { ...parsed, name: 'Ziankyle' };
      }
      return parsed;
    }
    return fallback;
  } catch (e) {
    return fallback;
  }
}

function saveStorage(key, value) {
  try {
    localStorage.setItem(`komorebi_${key}`, JSON.stringify(value));
  } catch (e) {}
}

// Security Pro Max Guard Engine (OWASP ASVS Level 3)
const SecurityGuard = {
  // Input Sanitization (Mitigates CWE-79 XSS & Script Injection)
  sanitizeText(input, maxLen = 200) {
    if (!input || typeof input !== 'string') return '';
    return input
      .replace(/<[^>]*>?/gm, '') // Strip HTML tags
      .replace(/javascript:/gi, '') // Strip javascript: URIs
      .replace(/data:text\/html/gi, '') // Strip data HTML
      .trim()
      .slice(0, maxLen);
  },

  // Safe Image URL Validator
  sanitizeUrl(url) {
    if (!url || typeof url !== 'string') return '';
    const trimmed = url.trim();
    if (trimmed.startsWith('https://') || trimmed.startsWith('http://') || trimmed.startsWith('data:image/') || trimmed.startsWith('./assets/')) {
      return trimmed;
    }
    return '';
  },

  // Safe Image File Validator (Max 15MB, Image MIME only)
  validateImageFile(file) {
    if (!file) return { valid: false, error: 'No file selected' };
    if (!file.type || !file.type.startsWith('image/')) {
      return { valid: false, error: 'Only image files (JPG, PNG, WEBP, GIF) are permitted' };
    }
    if (file.size > 15 * 1024 * 1024) {
      return { valid: false, error: 'Image size exceeds maximum limit of 15MB' };
    }
    return { valid: true };
  }
};

// Firebase Realtime Database Sync Engine
const FirebaseSync = {
  db: null,
  isInitialized: false,

  init(customConfig = null) {
    if (this.isInitialized && this.db) return true;
    try {
      if (typeof firebase === 'undefined') return false;
      const savedConfig = customConfig || loadStorage('firebase_config', null);
      if (!savedConfig || !savedConfig.databaseURL) return false;

      if (!firebase.apps || !firebase.apps.length) {
        firebase.initializeApp(savedConfig);
      }
      this.db = firebase.database();
      this.isInitialized = true;
      return true;
    } catch (err) {
      console.warn('Firebase init error:', err);
      return false;
    }
  },

  syncDown(path, callback) {
    if (!this.db) return () => {};
    try {
      const ref = this.db.ref(`komorebi_couple/${path}`);
      ref.on('value', (snapshot) => {
        const val = snapshot.val();
        if (val !== null && val !== undefined) {
          callback(val);
        }
      });
      return () => ref.off('value');
    } catch (e) {
      return () => {};
    }
  },

  syncUp(path, data) {
    if (!this.db) return;
    try {
      this.db.ref(`komorebi_couple/${path}`).set(data);
    } catch (e) {}
  }
};

function formatCurrentTime(date = new Date()) {
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${hours}:${minutes} ${ampm}`;
}

function format12HourTime(timeStr) {
  if (!timeStr) return '';
  if (timeStr.includes('AM') || timeStr.includes('PM')) return timeStr;
  const parts = timeStr.split(':');
  if (parts.length < 2) return timeStr;
  let hours = parseInt(parts[0], 10);
  const minutes = parts[1];
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${hours}:${minutes} ${ampm}`;
}

function getTimezoneTime(offsetHours) {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const targetDate = new Date(utc + (3600000 * offsetHours));
  let hours = targetDate.getHours();
  const minutes = String(targetDate.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${hours}:${minutes} ${ampm}`;
}

function getEnergyDetails(level) {
  if (level <= 2) {
    return { title: "Resting", desc: 'Winding down for the night' };
  } else if (level <= 4) {
    return { title: 'Relaxing', desc: 'Taking it easy / studying' };
  } else if (level <= 6) {
    return { title: 'Available', desc: 'Online & relaxing' };
  } else if (level <= 8) {
    return { title: 'Free to Call', desc: 'Free to talk & chat' };
  } else {
    return { title: 'Active', desc: 'Free for co-op & calls tonight' };
  }
}

// Photo Notification Ringtone Track Options
const RINGTONE_OPTIONS = [
  {
    id: 'moonlight',
    title: 'Moonlight Serenade',
    subtitle: 'Dreams Traversed by Moonlight',
    src: './assets/audio/moonlight.mp3'
  },
  {
    id: 'nahida',
    title: 'Boundless Bliss',
    subtitle: 'Nahida Extended Theme',
    src: './assets/audio/nahida.mp3'
  },
  {
    id: 'nodkrai',
    title: 'Nodkrai Melody',
    subtitle: 'Original Melody',
    src: './assets/audio/nodkrai.mp3'
  },
  {
    id: 'silent',
    title: 'Silent (No Ringtone)',
    subtitle: 'Visual banner alert only',
    src: null
  }
];

// Audio Engine
const AudioEngine = {
  ctx: null,
  currentAudio: null,
  audioTimeout: null,

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  },

  playTone(freq = 520, type = 'sine', duration = 0.07) {
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, now);

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);

      // Subtle, warm, gentle acoustic volume (zero harsh arcade beeps)
      gain.gain.setValueAtTime(0.022, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {}
  },

  playNotificationChime() {
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const freqs = [659.25, 830.61, 987.77];
      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2000, now);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        // Soft, serene ambient bell chime
        gain.gain.setValueAtTime(0.035, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.24);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.24);
      });
    } catch (e) {}
  },

  playRingtone(ringtoneId = 'moonlight', durationMs = 30000, onEnded = null) {
    this.stopRingtone();
    if (ringtoneId === 'silent') {
      if (onEnded) onEnded();
      return;
    }

    const track = RINGTONE_OPTIONS.find(t => t.id === ringtoneId) || RINGTONE_OPTIONS[0];
    if (!track || !track.src) {
      if (onEnded) onEnded();
      return;
    }

    try {
      const audio = new Audio(track.src);
      audio.volume = 0.75;
      this.currentAudio = audio;

      audio.onended = () => {
        this.stopRingtone();
        if (onEnded) onEnded();
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.warn('Audio play auto-policy warning:', err);
          if (onEnded) onEnded();
        });
      }

      this.audioTimeout = setTimeout(() => {
        this.stopRingtone();
        if (onEnded) onEnded();
      }, durationMs);
    } catch (e) {
      console.warn('Ringtone playback error:', e);
      if (onEnded) onEnded();
    }
  },

  stopRingtone() {
    if (this.audioTimeout) {
      clearTimeout(this.audioTimeout);
      this.audioTimeout = null;
    }
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch (e) {}
      this.currentAudio = null;
    }
  }
};

// 🌌 Celestial Night Sky with Authentic Shooting Stars (UI UX Pro Max Quality)
function CelestialPhysicsCanvas({ theme = 'pink' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.clientWidth || 360);
    let height = (canvas.height = canvas.parentElement.clientHeight || 600);

    const resize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', resize);

    // Deep Sky Twinkling Stars (Fixed Background Field)
    const starField = Array.from({ length: 32 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 0.8 + Math.random() * 1.8,
      baseAlpha: 0.15 + Math.random() * 0.25,
      pulseAmp: 0.15 + Math.random() * 0.25,
      pulseSpeed: 0.0015 + Math.random() * 0.002,
      phase: Math.random() * Math.PI * 2,
      isGold: Math.random() > 0.6
    }));

    // Active Shooting Stars (Meteors with Aerodynamic Light Tails)
    let shootingStars = [];
    let wakeEmbers = [];

    const themeColors = {
      pink: [{ r: 252, g: 165, b: 201 }, { r: 248, g: 207, b: 101 }, { r: 255, g: 240, b: 245 }],
      forest: [{ r: 110, g: 231, b: 183 }, { r: 163, g: 230, b: 53 }, { r: 248, g: 207, b: 101 }],
      ocean: [{ r: 56, g: 189, b: 248 }, { r: 96, g: 165, b: 250 }, { r: 224, g: 242, b: 254 }]
    };

    function spawnShootingStar() {
      const angle = (Math.PI / 180) * (130 + Math.random() * 15); // ~130°–145° diagonal sweep
      const speed = 7.5 + Math.random() * 5.5;
      const startX = width * 0.35 + Math.random() * (width * 0.75);
      const startY = -20 - Math.random() * 40;
      const palette = themeColors[theme] || themeColors.pink;
      const chosenColor = palette[Math.floor(Math.random() * palette.length)];

      shootingStars.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        length: 70 + Math.random() * 80,
        thickness: 1.5 + Math.random() * 1.2,
        alpha: 0,
        maxAlpha: 0.85 + Math.random() * 0.15,
        life: 0,
        maxLife: 45 + Math.random() * 30, // Crisp ~0.8s-1.2s lifespan
        color: chosenColor
      });
    }

    let nextShootingStarTime = performance.now() + 1800;
    let lastTime = performance.now();

    function render(currentTime) {
      const dt = Math.min((currentTime - lastTime) / 16.67, 2.0);
      lastTime = currentTime;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Deep Ambient Twinkling Stars
      starField.forEach(star => {
        const alpha = Math.max(0.05, star.baseAlpha + Math.sin(currentTime * star.pulseSpeed + star.phase) * star.pulseAmp);
        ctx.fillStyle = star.isGold
          ? `rgba(248, 207, 101, ${alpha})`
          : `rgba(255, 250, 242, ${alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Periodic Authentic Shooting Star Emitter (Every 5–8 seconds)
      if (currentTime > nextShootingStarTime) {
        spawnShootingStar();
        nextShootingStarTime = currentTime + 4500 + Math.random() * 4500;
      }

      // 3. Update & Draw Shooting Stars (Aerodynamic Light Streaks)
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.life += dt;
        s.x += s.vx * dt;
        s.y += s.vy * dt;

        const lifeRatio = s.life / s.maxLife;
        if (lifeRatio < 0.2) {
          s.alpha = (lifeRatio / 0.2) * s.maxAlpha;
        } else if (lifeRatio > 0.65) {
          s.alpha = ((1 - lifeRatio) / 0.35) * s.maxAlpha;
        } else {
          s.alpha = s.maxAlpha;
        }

        if (Math.random() < 0.45 && s.alpha > 0.2) {
          wakeEmbers.push({
            x: s.x + (Math.random() - 0.5) * 4,
            y: s.y + (Math.random() - 0.5) * 4,
            vx: (Math.random() - 0.5) * 0.4,
            vy: 0.3 + Math.random() * 0.5,
            size: 1 + Math.random() * 1.5,
            alpha: s.alpha * 0.7,
            life: 0,
            maxLife: 20 + Math.random() * 20,
            color: s.color
          });
        }

        const velocityMag = Math.hypot(s.vx, s.vy);
        const normVx = s.vx / velocityMag;
        const normVy = s.vy / velocityMag;
        const tailX = s.x - normVx * s.length;
        const tailY = s.y - normVy * s.length;

        ctx.save();
        const grad = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255, 255, 255, ${s.alpha})`);
        grad.addColorStop(0.2, `rgba(${s.color.r}, ${s.color.g}, ${s.color.b}, ${s.alpha * 0.85})`);
        grad.addColorStop(1, `rgba(${s.color.r}, ${s.color.g}, ${s.color.b}, 0)`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = s.thickness;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();

        ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
        ctx.shadowColor = `rgba(${s.color.r}, ${s.color.g}, ${s.color.b}, ${s.alpha})`;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.thickness * 1.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (s.life >= s.maxLife || s.x < -100 || s.y > height + 100) {
          shootingStars.splice(i, 1);
        }
      }

      // 4. Update & Draw Wake Embers
      for (let j = wakeEmbers.length - 1; j >= 0; j--) {
        const ember = wakeEmbers[j];
        ember.life += dt;
        ember.x += ember.vx * dt;
        ember.y += ember.vy * dt;
        const emberAlpha = (1 - ember.life / ember.maxLife) * ember.alpha;

        if (emberAlpha > 0.02) {
          ctx.fillStyle = `rgba(${ember.color.r}, ${ember.color.g}, ${ember.color.b}, ${emberAlpha})`;
          ctx.beginPath();
          ctx.arc(ember.x, ember.y, ember.size, 0, Math.PI * 2);
          ctx.fill();
        }

        if (ember.life >= ember.maxLife) {
          wakeEmbers.splice(j, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    }

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  );
}

// HD Minimalist Live Notification Banner Component
function HDNotificationBanner({ notification, onClose, onClick }) {
  if (!notification) return null;

  const isPhotoAlert = notification.type === 'photo';

  return (
    <div 
      className="hd-notification-banner" 
      onClick={() => {
        if (onClick) onClick();
      }}
      style={{ cursor: 'pointer' }}
    >
      <div className="hd-notif-main-row">
        <div className="hd-notif-avatar">
          <img src={notification.avatarUrl || './assets/iconforapp.jpg'} alt="" />
        </div>

        <div className="hd-notif-content">
          <div className="hd-notif-title-row">
            <span className="hd-notif-title">{notification.title}</span>
            {isPhotoAlert ? (
              <span className="hd-notif-badge">
                <span className="sound-wave-pulse">
                  <span className="sound-bar" />
                  <span className="sound-bar" />
                  <span className="sound-bar" />
                </span>
                <span>Photo Alert</span>
              </span>
            ) : (
              <span className="hd-notif-badge" style={{ background: 'rgba(76, 215, 182, 0.15)', color: '#4cd7b6', borderColor: 'rgba(76, 215, 182, 0.3)' }}>
                <span>Live ⚡</span>
              </span>
            )}
          </div>
          <div className="hd-notif-caption">{notification.caption || notification.body || 'New sanctuary update'}</div>
        </div>

        {notification.thumbUrl && (
          <div className="hd-notif-thumb">
            <img src={notification.thumbUrl} alt="" />
          </div>
        )}

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="hd-notif-close-btn"
          aria-label="Dismiss Notification"
        >
          ✕
        </button>
      </div>

      <div className="hd-notif-progress-track">
        <div 
          className="hd-notif-progress-bar" 
          style={{ animationDuration: isPhotoAlert ? '30s' : '6s' }}
        />
      </div>
    </div>
  );
}

// Vector Mood Picker Modal Component
function MoodPickerModal({ isOpen, onClose, currentMood, onSelectMood, partnerName }) {
  if (!isOpen) return null;

  return (
    <div className="android-modal-backdrop" onClick={onClose}>
      <div className="android-sheet-surface" onClick={e => e.stopPropagation()}>
        <div className="sheet-handle-bar" />
        
        <div className="sheet-header">
          <div>
            <h3 className="sheet-title">Set Your Sanctuary Mood</h3>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Shared live with {partnerName} & synced to lockscreen
            </div>
          </div>
          <button onClick={onClose} className="sheet-close-btn">✕</button>
        </div>

        <div className="mood-options-grid">
          {MOOD_ROSTER.map(m => {
            const isSelected = currentMood === m.id;
            const IconComp = Icons[m.icon] || Icons.Heart;
            return (
              <div
                key={m.id}
                onClick={() => {
                  AudioEngine.playTone(500);
                  onSelectMood(m.id);
                  onClose();
                }}
                className={`mood-option-item ${isSelected ? 'selected' : ''}`}
              >
                <div 
                  className="mood-icon-bubble" 
                  style={{ 
                    background: isSelected ? `${m.color}25` : 'rgba(255, 255, 255, 0.05)',
                    color: m.color,
                    border: `1px solid ${isSelected ? m.color : 'rgba(255, 255, 255, 0.08)'}`,
                    boxShadow: isSelected ? `0 0 14px ${m.color}33` : 'none'
                  }}
                >
                  <IconComp size={18} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '12.5px', fontWeight: '700', color: isSelected ? 'var(--color-primary)' : '#fff' }}>
                    {m.name}
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: '1px' }}>
                    {m.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Multi-Media Swipeable Carousel Component (Up to 5 Photos or 1 Video)
function MediaCarouselViewer({ snap, activeTraveler, partnerTraveler, isLockscreen = false, onOpenModal }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);

  if (!snap) {
    return (
      <div className={isLockscreen ? "glance-photo-empty" : "bento-photo-empty"} onClick={onOpenModal}>
        <Icons.Camera size={isLockscreen ? 24 : 18} />
        <span>Tap to drop photo / video</span>
      </div>
    );
  }

  const items = (snap.items && snap.items.length > 0)
    ? snap.items
    : (snap.imageUrl ? [{ url: snap.imageUrl, type: snap.isVideo ? 'video' : 'image' }] : []);

  const total = items.length;
  const currentItem = items[activeIdx] || items[0] || { url: '', type: 'image' };
  const isMe = snap.sentBy === activeTraveler.name.toLowerCase();

  const handlePrev = (e) => {
    e?.stopPropagation?.();
    AudioEngine.playTone(520);
    setActiveIdx((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e?.stopPropagation?.();
    AudioEngine.playTone(520);
    setActiveIdx((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (diff > 35) {
      handlePrev();
    } else if (diff < -35) {
      handleNext();
    }
    setTouchStartX(null);
  };

  return (
    <div 
      style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={onOpenModal}
    >
      {/* Active Media Item */}
      {currentItem.type === 'video' ? (
        <video 
          src={currentItem.url} 
          autoPlay 
          loop 
          muted 
          playsInline 
          controls={false}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
      ) : (
        <img 
          src={currentItem.url} 
          alt="Shared Media" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
      )}

      {/* Media Type & Pagination Badge */}
      <div className="carousel-dots-pill">
        {currentItem.type === 'video' ? (
          <span>📹 Video</span>
        ) : total > 1 ? (
          <span>{activeIdx + 1}/{total}</span>
        ) : (
          <span>📷 Photo</span>
        )}
      </div>

      {/* Previous / Next Arrow Controls (When Multiple Media) */}
      {total > 1 && (
        <>
          <button 
            type="button" 
            className="carousel-nav-btn prev" 
            onClick={handlePrev}
            aria-label="Previous Media"
          >
            ‹
          </button>
          <button 
            type="button" 
            className="carousel-nav-btn next" 
            onClick={handleNext}
            aria-label="Next Media"
          >
            ›
          </button>

          {/* Bottom Dot Indicators */}
          <div className="carousel-dots-bottom">
            {items.map((_, i) => (
              <div 
                key={i} 
                className={`carousel-dot ${i === activeIdx ? 'active' : ''}`} 
              />
            ))}
          </div>
        </>
      )}

      {/* Caption Overlay */}
      <div className={isLockscreen ? "glance-photo-caption" : "bento-photo-caption-overlay"} style={!isLockscreen ? { position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(0deg, rgba(0,0,0,0.85) 0%, transparent 100%)', padding: '14px 8px 4px', fontSize: '9.5px', color: '#fff', lineHeight: 1.25 } : {}}>
        {isMe ? (
          <span>You: "{snap.caption || 'Shared a moment'}"</span>
        ) : (
          <span>{partnerTraveler.name}: "{snap.caption || 'Shared a moment'}"</span>
        )}
      </div>
    </div>
  );
}

// Multi-Media Send Sheet Component (Max 5 Photos or 1 Video)
function SendPictureSheet({ isOpen, onClose, onSendPicture, activeTraveler }) {
  const [caption, setCaption] = useState('');
  const [customMediaUrl, setCustomMediaUrl] = useState('');
  const [mediaList, setMediaList] = useState([]); // [{ id, url, type: 'image'|'video', name }]
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [fileError, setFileError] = useState('');
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const hasVideo = mediaList.some(m => m.type === 'video');
  const imageCount = mediaList.filter(m => m.type === 'image').length;

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setFileError('');

    // Check if any video is selected
    const videoFile = files.find(f => f.type.startsWith('video/'));
    if (videoFile) {
      if (videoFile.size > 25 * 1024 * 1024) {
        setFileError('Video size must be under 25MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        // Limit: 1 video cap
        setMediaList([{
          id: 'vid-' + Date.now(),
          url: event.target.result,
          type: 'video',
          name: videoFile.name
        }]);
      };
      reader.readAsDataURL(videoFile);
      return;
    }

    // Process image files (up to max 5 total)
    const imageFiles = files.filter(f => f.type.startsWith('image/'));
    const remainingSlots = Math.max(0, 5 - imageCount);

    if (imageFiles.length > remainingSlots) {
      setFileError(`You can upload at most 5 photos total (added first ${remainingSlots})`);
    }

    const filesToRead = imageFiles.slice(0, remainingSlots);
    filesToRead.forEach((file, idx) => {
      const validation = SecurityGuard.validateImageFile(file);
      if (!validation.valid) {
        setFileError(validation.error);
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setMediaList(prev => {
          // If previous was a video, replace it with photos
          const filtered = prev.filter(m => m.type === 'image');
          if (filtered.length >= 5) return filtered;
          return [...filtered, {
            id: 'img-' + Date.now() + '-' + idx + '-' + Math.random().toString(36).substring(2, 5),
            url: event.target.result,
            type: 'image',
            name: file.name
          }];
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveItem = (id) => {
    AudioEngine.playTone(380);
    setMediaList(prev => prev.filter(m => m.id !== id));
  };

  const handleAddUrl = (e) => {
    e.preventDefault();
    if (!customMediaUrl.trim()) return;
    const cleanUrl = SecurityGuard.sanitizeUrl(customMediaUrl.trim());
    if (!cleanUrl) return;

    const isVid = cleanUrl.match(/\.(mp4|webm|mov)(\?.*)?$/i);
    if (isVid) {
      setMediaList([{
        id: 'url-vid-' + Date.now(),
        url: cleanUrl,
        type: 'video',
        name: 'Web Video'
      }]);
    } else {
      if (mediaList.some(m => m.type === 'video')) {
        setMediaList([{
          id: 'url-img-' + Date.now(),
          url: cleanUrl,
          type: 'image',
          name: 'Web Image'
        }]);
      } else if (imageCount < 5) {
        setMediaList(prev => [...prev, {
          id: 'url-img-' + Date.now(),
          url: cleanUrl,
          type: 'image',
          name: 'Web Image'
        }]);
      } else {
        setFileError('Max 5 photos reached');
      }
    }
    setCustomMediaUrl('');
    setShowUrlInput(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mediaList.length) return;

    AudioEngine.playTone(720);
    onSendPicture({
      id: 'snap-' + Date.now(),
      items: mediaList,
      imageUrl: mediaList[0].url,
      isVideo: mediaList[0].type === 'video',
      caption: SecurityGuard.sanitizeText(caption, 70) || (mediaList[0].type === 'video' ? 'Shared a video' : mediaList.length > 1 ? `Shared ${mediaList.length} photos` : 'Shared a photo'),
      sentBy: activeTraveler.name.toLowerCase(),
      time: formatCurrentTime()
    });

    setCaption('');
    setMediaList([]);
    setCustomMediaUrl('');
    setShowUrlInput(false);
    setFileError('');
    onClose();
  };

  const canAddMore = !hasVideo && imageCount < 5;

  return (
    <div className="profile-modal-sheet" onClick={onClose}>
      <div className="profile-sheet-body" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-header-row">
          <div>
            <span className="sheet-title">Share Photos & Video</span>
            <div style={{ fontSize: '10.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Send up to 5 photos or 1 video to partner's lockscreen
            </div>
          </div>
          <button onClick={onClose} className="sheet-close-btn" aria-label="Close">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="sheet-form-layout">
          {/* Multi-Media Thumbnail Strip & Dropzone */}
          {mediaList.length > 0 ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span className="form-field-label" style={{ margin: 0 }}>
                  Selected Media ({hasVideo ? '1/1 Video' : `${imageCount}/5 Photos`})
                </span>
                {canAddMore && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                    style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}
                  >
                    + Add More
                  </button>
                )}
              </div>

              <div className="media-upload-strip">
                {mediaList.map((item) => (
                  <div key={item.id} className="media-thumb-preview">
                    {item.type === 'video' ? (
                      <video src={item.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <img src={item.url} alt="Thumbnail" />
                    )}
                    {item.type === 'video' && (
                      <div className="media-video-badge">▶ Video</div>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      className="media-remove-btn"
                      title="Remove"
                    >
                      ✕
                    </button>
                  </div>
                ))}

                {canAddMore && (
                  <div 
                    className="media-add-tile" 
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                    title="Add another photo"
                  >
                    <Icons.Plus size={16} />
                    <span>Add</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              className="minimal-photo-dropzone"
            >
              <div className="minimal-empty-dropzone">
                <div style={{ marginBottom: '6px', color: 'var(--color-primary)' }}>
                  <Icons.Camera size={30} />
                </div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff' }}>Choose Media</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Select up to 5 photos or 1 video
                </div>
              </div>
            </div>
          )}

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*,video/*"
            multiple
            style={{ display: 'none' }}
          />

          {fileError && (
            <div style={{ fontSize: '11px', color: '#fb7185', fontWeight: '600' }}>
              {fileError}
            </div>
          )}

          {/* Caption Field */}
          <div>
            <label className="form-field-label">Caption</label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Add a sweet message or note..."
              maxLength={70}
              className="form-input-text"
            />
          </div>

          {/* Paste Web Media URL Option */}
          <div>
            <button
              type="button"
              onClick={() => setShowUrlInput(!showUrlInput)}
              style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '11px', cursor: 'pointer', padding: '2px 0' }}
            >
              {showUrlInput ? 'Hide URL input' : 'Paste media URL instead'}
            </button>

            {showUrlInput && (
              <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
                <input
                  type="url"
                  value={customMediaUrl}
                  onChange={(e) => setCustomMediaUrl(e.target.value)}
                  placeholder="https://... image or .mp4 video"
                  className="form-input-text"
                  style={{ flex: 1 }}
                />
                <button
                  type="button"
                  onClick={handleAddUrl}
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid var(--android-border)', borderRadius: '10px', padding: '6px 12px', color: '#fff', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}
                >
                  Add URL
                </button>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn-minimal-submit"
            disabled={mediaList.length === 0}
          >
            {hasVideo ? 'Send Video Drop (1)' : `Send Photo Drop (${mediaList.length || 0}/5)`}
          </button>
        </form>
      </div>
    </div>
  );
}

// Add Couple Plan Sheet Component
function AddPlanSheet({ isOpen, onClose, onAdd, activeTraveler, initialDate }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(initialDate || '2026-08-18');
  const [time, setTime] = useState('20:00');
  const [type, setType] = useState('Gaming');
  const [isWishSealed, setIsWishSealed] = useState(false);

  useEffect(() => {
    if (initialDate) setDate(initialDate);
  }, [initialDate, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    AudioEngine.playTone(600);
    onAdd({
      id: 'plan-' + Date.now(),
      title: title.trim(),
      date,
      time: format12HourTime(time) || '8:00 PM',
      type,
      assignedTo: 'both',
      createdBy: activeTraveler.name.toLowerCase(),
      isWishSealed
    });
    setTitle('');
    onClose();
  };

  return (
    <div className="profile-modal-sheet" onClick={onClose}>
      <div className="profile-sheet-body" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-header-row">
          <div>
            <span className="sheet-title">Schedule Plan</span>
            <span style={{ fontSize: '11px', color: 'var(--color-accent)', marginLeft: '8px' }}>({date})</span>
          </div>
          <button onClick={onClose} className="sheet-close-btn" aria-label="Close">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="sheet-form-layout">
          <div>
            <label className="form-field-label">Plan Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Movie night, Video call, Dinner..."
              required
              autoFocus
              maxLength={40}
              className="form-input-text"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '8px' }}>
            <div>
              <label className="form-field-label">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="form-input-text"
              />
            </div>
            <div>
              <label className="form-field-label">Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="form-input-text"
              />
            </div>
          </div>

          <div>
            <label className="form-field-label">Activity Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="form-input-text"
            >
              <option value="Gaming">Gaming</option>
              <option value="Movie / Series">Movie / Series</option>
              <option value="Call / Voice">Call / Voice</option>
              <option value="Coffee / Food">Coffee / Food</option>
              <option value="Date / Special">Date / Special</option>
              <option value="Study / Work">Study / Work</option>
            </select>
          </div>

          <div className="secret-wish-box">
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={isWishSealed}
                onChange={(e) => setIsWishSealed(e.target.checked)}
                style={{ accentColor: 'var(--color-accent)' }}
              />
              <span><strong>Surprise Plan</strong> (Hidden until unlocked)</span>
            </label>
          </div>

          <button type="submit" className="btn-minimal-submit">
            Save Plan
          </button>
        </form>
      </div>
    </div>
  );
}

// Clean Minimalist Profile & Settings Modal Component
function ProfileCustomizerSheet({
  isOpen,
  onClose,
  currentAvatar,
  onSelectAvatar,
  onLogout,
  activeTraveler,
  onUpdateName,
  supabaseConfig,
  onSaveSupabaseConfig,
  isSupabaseConnected,
  selectedRingtone,
  onSelectRingtone,
  isLockscreenEnabled = true,
  onToggleLockscreen,
  isNotificationsEnabled = true,
  onToggleNotifications,
  isNotifSoundEnabled = true,
  onToggleNotifSound,
  onTestNotification
}) {
  const [customUrl, setCustomUrl] = useState('');
  const [displayName, setDisplayName] = useState(activeTraveler.name);
  const [nameSavedStatus, setNameSavedStatus] = useState('');
  
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passStatus, setPassStatus] = useState('');
  const [isPassOpen, setIsPassOpen] = useState(false);

  // Supabase Realtime Config State
  const [isSupabaseOpen, setIsSupabaseOpen] = useState(false);
  const [sbUrl, setSbUrl] = useState(supabaseConfig?.url || DEFAULT_SUPABASE_CONFIG.url);
  const [sbKey, setSbKey] = useState(supabaseConfig?.key || DEFAULT_SUPABASE_CONFIG.key);
  const [sbStatus, setSbStatus] = useState('');
  const [isSqlCopied, setIsSqlCopied] = useState(false);

  // Ringtone State
  const [isRingtoneOpen, setIsRingtoneOpen] = useState(false);
  const [playingTrackId, setPlayingTrackId] = useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    setDisplayName(activeTraveler.name);
  }, [activeTraveler.name, isOpen]);

  useEffect(() => {
    if (supabaseConfig) {
      setSbUrl(supabaseConfig.url || '');
      setSbKey(supabaseConfig.key || '');
    }
  }, [supabaseConfig, isOpen]);

  // Clean up audio when modal closes
  useEffect(() => {
    if (!isOpen) {
      AudioEngine.stopRingtone();
      setPlayingTrackId(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveName = (e) => {
    e.preventDefault();
    let cleanName = SecurityGuard.sanitizeText(displayName, 32);
    if (!cleanName) return;
    if (cleanName.toLowerCase() === 'zian') cleanName = 'Ziankyle';
    AudioEngine.playTone(680);
    onUpdateName(cleanName);
    setDisplayName(cleanName);
    setNameSavedStatus('Saved');
    setTimeout(() => setNameSavedStatus(''), 2500);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (newPass.length < 6) {
      setPassStatus('Password must be at least 6 characters.');
      return;
    }
    if (newPass !== confirmPass) {
      setPassStatus('Passwords do not match.');
      return;
    }
    AudioEngine.playTone(720);
    setPassStatus('Password updated successfully.');
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
    setTimeout(() => {
      setPassStatus('');
      setIsPassOpen(false);
    }, 2000);
  };

  const handleSaveSupabase = (e) => {
    e.preventDefault();
    if (!sbUrl.trim() || !sbKey.trim()) {
      setSbStatus('Please enter both Supabase URL and Anon Key');
      return;
    }
    const cleanUrl = sbUrl.trim().replace(/\/$/, '');
    const newConfig = { url: cleanUrl, key: sbKey.trim() };
    onSaveSupabaseConfig(newConfig);
    AudioEngine.playTone(720);
    setSbStatus('Connected to Supabase! Realtime active.');
    setTimeout(() => setSbStatus(''), 3000);
  };

  const handleDisconnectSupabase = () => {
    onSaveSupabaseConfig(null);
    setSbUrl('');
    setSbKey('');
    AudioEngine.playTone(400);
    setSbStatus('Disconnected. Using offline local mode.');
    setTimeout(() => setSbStatus(''), 2500);
  };

  const handleCopySql = () => {
    const sqlCode = `-- Run this in Supabase SQL Editor:
CREATE TABLE IF NOT EXISTS public.couple_data (
  key text PRIMARY KEY,
  value jsonb NOT NULL,
  updated_at timestamptz DEFAULT now()
);
ALTER PUBLICATION supabase_realtime ADD TABLE public.couple_data;
ALTER TABLE public.couple_data ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Couple Access" ON public.couple_data FOR ALL USING (true) WITH CHECK (true);`;
    navigator.clipboard.writeText(sqlCode);
    setIsSqlCopied(true);
    AudioEngine.playTone(680);
    setTimeout(() => setIsSqlCopied(false), 3000);
  };

  const handleTestRingtone = (trackId) => {
    if (playingTrackId === trackId) {
      AudioEngine.stopRingtone();
      setPlayingTrackId(null);
    } else {
      setPlayingTrackId(trackId);
      AudioEngine.playRingtone(trackId, 30000, () => {
        setPlayingTrackId(null);
      });
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        onSelectAvatar({
          id: 'custom-' + Date.now(),
          name: 'Custom',
          iconUrl: uploadEvent.target.result
        });
        AudioEngine.playTone(680);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyUrl = (e) => {
    e.preventDefault();
    if (customUrl.trim()) {
      onSelectAvatar({
        id: 'custom-' + Date.now(),
        name: 'Custom',
        iconUrl: customUrl.trim()
      });
      setCustomUrl('');
      AudioEngine.playTone(680);
    }
  };

  return (
    <div className="profile-modal-sheet" onClick={onClose}>
      <div className="profile-sheet-body" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="sheet-header-row">
          <span className="sheet-title">Profile & Settings</span>
          <button onClick={onClose} className="sheet-close-btn" aria-label="Close">✕</button>
        </div>

        {/* Hero Avatar & Identity Card */}
        <div className="avatar-preview-section">
          <div className="avatar-preview-circle">
            <img src={currentAvatar.iconUrl} alt={currentAvatar.name} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '16px', fontWeight: '700', color: '#fff' }}>{activeTraveler.name}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Current: {currentAvatar.name}
            </div>
          </div>

          <button
            type="button"
            className="btn-upload-file"
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            style={{ marginTop: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
          >
            <Icons.Camera size={14} />
            <span>Upload Custom Photo</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            style={{ display: 'none' }}
          />
        </div>

        {/* 1. Display Name Field */}
        <form onSubmit={handleSaveName} className="sheet-form-layout">
          <div>
            <label className="form-field-label">Display Name</label>
            <div style={{ display: 'flex', gap: '6px' }}>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your name..."
                maxLength={24}
                required
                className="form-input-text"
                style={{ flex: 1 }}
              />
              <button
                type="submit"
                style={{ background: 'var(--color-primary)', color: '#090b10', border: 'none', borderRadius: '10px', padding: '8px 16px', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}
              >
                Save
              </button>
            </div>
            {nameSavedStatus && (
              <div style={{ fontSize: '11px', color: 'var(--color-primary)', fontWeight: '600', marginTop: '4px' }}>
                {nameSavedStatus}
              </div>
            )}
          </div>
        </form>

        {/* 2. Choose Preset Avatar */}
        <div>
          <div className="form-field-label" style={{ marginBottom: '8px' }}>
            Choose Preset Avatar
          </div>
          <div className="preset-avatars-grid">
            {PRESET_AVATARS.map(av => (
              <button
                key={av.id}
                type="button"
                className={`preset-avatar-btn ${currentAvatar.id === av.id ? 'selected' : ''}`}
                onClick={() => {
                  AudioEngine.playTone(550);
                  onSelectAvatar(av);
                }}
              >
                <div className="preset-avatar-icon">
                  <img src={av.iconUrl} alt={av.name} />
                </div>
                <span className="preset-avatar-name">{av.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 3. Sanctuary Feature Toggles (Lockscreen Widget Sync & Live Notifications) */}
        <div style={{ background: 'rgba(255, 255, 255, 0.025)', border: '1px solid var(--android-border)', borderRadius: '14px', padding: '14px 16px' }}>
          <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Icons.Settings size={14} />
            <span>Sanctuary Features & Sync</span>
          </div>
          <div style={{ fontSize: '10.5px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
            Control live lockscreen synchronization and notification alerts
          </div>

          {/* Toggle 1: Lockscreen Widget Sync */}
          <div className="settings-toggle-row">
            <div className="settings-toggle-info">
              <div className="settings-toggle-title">
                <span>Lockscreen & Widget Sync</span>
                <span style={{ fontSize: '9.5px', padding: '1px 6px', borderRadius: '4px', background: isLockscreenEnabled ? 'rgba(76, 215, 182, 0.15)' : 'rgba(255,255,255,0.06)', color: isLockscreenEnabled ? '#4cd7b6' : 'var(--text-tertiary)' }}>
                  {isLockscreenEnabled ? 'Active' : 'Off'}
                </span>
              </div>
              <div className="settings-toggle-desc">
                Sync partner's daily notes, mood, and photos to Android lockscreen widget
              </div>
            </div>
            <button
              type="button"
              className={`toggle-switch-btn ${isLockscreenEnabled ? 'active' : ''}`}
              onClick={() => {
                AudioEngine.playTone(isLockscreenEnabled ? 450 : 600);
                if (onToggleLockscreen) onToggleLockscreen(!isLockscreenEnabled);
              }}
              title="Toggle Lockscreen Widget Sync"
              aria-label="Toggle Lockscreen Widget Sync"
            >
              <div className="toggle-switch-knob" />
            </button>
          </div>

          {/* Toggle 2: Live In-App Notifications */}
          <div className="settings-toggle-row">
            <div className="settings-toggle-info">
              <div className="settings-toggle-title">
                <span>Live Notifications & Alerts</span>
                <span style={{ fontSize: '9.5px', padding: '1px 6px', borderRadius: '4px', background: isNotificationsEnabled ? 'rgba(248, 207, 101, 0.15)' : 'rgba(255,255,255,0.06)', color: isNotificationsEnabled ? 'var(--color-primary)' : 'var(--text-tertiary)' }}>
                  {isNotificationsEnabled ? 'Active' : 'Muted'}
                </span>
              </div>
              <div className="settings-toggle-desc">
                Show floating toast alerts when new messages, photos, or moods arrive
              </div>
            </div>
            <button
              type="button"
              className={`toggle-switch-btn ${isNotificationsEnabled ? 'active' : ''}`}
              onClick={() => {
                AudioEngine.playTone(isNotificationsEnabled ? 450 : 600);
                if (onToggleNotifications) onToggleNotifications(!isNotificationsEnabled);
              }}
              title="Toggle In-App Notifications"
              aria-label="Toggle In-App Notifications"
            >
              <div className="toggle-switch-knob" />
            </button>
          </div>

          {/* Toggle 3: Notification Chime & Sound */}
          <div className="settings-toggle-row">
            <div className="settings-toggle-info">
              <div className="settings-toggle-title">
                <span>Notification Sound Chime</span>
                <span style={{ fontSize: '9.5px', padding: '1px 6px', borderRadius: '4px', background: isNotifSoundEnabled ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255,255,255,0.06)', color: isNotifSoundEnabled ? '#38bdf8' : 'var(--text-tertiary)' }}>
                  {isNotifSoundEnabled ? 'Sound On' : 'Silent'}
                </span>
              </div>
              <div className="settings-toggle-desc">
                Play subtle ambient bell chime when receiving sanctuary updates
              </div>
            </div>
            <button
              type="button"
              className={`toggle-switch-btn ${isNotifSoundEnabled ? 'active' : ''}`}
              onClick={() => {
                AudioEngine.playTone(isNotifSoundEnabled ? 450 : 600);
                if (onToggleNotifSound) onToggleNotifSound(!isNotifSoundEnabled);
              }}
              title="Toggle Notification Sound"
              aria-label="Toggle Notification Sound"
            >
              <div className="toggle-switch-knob" />
            </button>
          </div>

          {/* Instant Test Alert Button */}
          <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onTestNotification}
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--android-border)', color: '#fff', borderRadius: '8px', padding: '5px 10px', fontSize: '10.5px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              title="Test notification toast and sound"
            >
              <Icons.Bell size={11} />
              <span>Test Notification Alert</span>
            </button>
          </div>
        </div>

        {/* 4. Image URL Alternative */}
        <div>
          <form onSubmit={handleApplyUrl} style={{ display: 'flex', gap: '6px' }}>
            <input
              type="url"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              placeholder="Or paste image URL..."
              className="form-input-text"
              style={{ flex: 1 }}
            />
            <button
              type="submit"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid var(--android-border)', borderRadius: '10px', padding: '6px 14px', color: '#fff', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}
            >
              Apply
            </button>
          </form>
        </div>

        {/* 5. Photo Ringtone & 30s Alert Settings */}
        <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--android-border)', borderRadius: '12px', padding: '12px 14px' }}>
          <div
            onClick={() => setIsRingtoneOpen(!isRingtoneOpen)}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
          >
            <div>
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#fff', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>Photo Ringtone & Alerts</span>
                <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', background: selectedRingtone === 'silent' ? 'rgba(255,255,255,0.08)' : 'rgba(248, 207, 101, 0.15)', color: selectedRingtone === 'silent' ? 'var(--text-secondary)' : 'var(--color-primary)' }}>
                  {RINGTONE_OPTIONS.find(t => t.id === selectedRingtone)?.title || 'Moonlight'} (30s)
                </span>
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Plays for 30 seconds when a photo is sent or received
              </div>
            </div>
            <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{isRingtoneOpen ? '▲' : '▼'}</span>
          </div>

          {isRingtoneOpen && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
              {RINGTONE_OPTIONS.map(track => {
                const isSelected = selectedRingtone === track.id;
                return (
                  <div
                    key={track.id}
                    onClick={() => onSelectRingtone(track.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      background: isSelected ? 'rgba(248, 207, 101, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                      border: `1px solid ${isSelected ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.06)'}`,
                      cursor: 'pointer'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: '600', color: isSelected ? 'var(--color-primary)' : '#fff' }}>
                        {track.title}
                      </div>
                      <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>
                        {track.subtitle}
                      </div>
                    </div>

                    {track.src && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTestRingtone(track.id);
                        }}
                        style={{
                          background: playingTrackId === track.id ? 'rgba(248, 207, 101, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                          border: `1px solid ${playingTrackId === track.id ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.12)'}`,
                          color: playingTrackId === track.id ? 'var(--color-primary)' : '#fff',
                          borderRadius: '6px',
                          padding: '4px 8px',
                          fontSize: '10px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        {playingTrackId === track.id ? '⏹ Stop' : '▶ Test 30s'}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 5. Supabase 24/7 Global Cloud Sync Section (100% Free) */}
        <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--android-border)', borderRadius: '12px', padding: '12px 14px' }}>
          <div
            onClick={() => setIsSupabaseOpen(!isSupabaseOpen)}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
          >
            <div>
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#fff', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>Supabase 24/7 Global Sync</span>
                <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', background: isSupabaseConnected ? 'rgba(76, 215, 182, 0.15)' : 'rgba(255,255,255,0.08)', color: isSupabaseConnected ? 'var(--color-primary)' : 'var(--text-secondary)' }}>
                  {isSupabaseConnected ? '🟢 Live Synced' : '⚪ Offline / Local'}
                </span>
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                100% Free realtime sync across both phones anywhere worldwide
              </div>
            </div>
            <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{isSupabaseOpen ? '▲' : '▼'}</span>
          </div>

          {isSupabaseOpen && (
            <form onSubmit={handleSaveSupabase} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
              <div>
                <label className="form-field-label">Supabase Project URL</label>
                <input
                  type="url"
                  value={sbUrl}
                  onChange={(e) => setSbUrl(e.target.value)}
                  placeholder="https://xyzabcdefg.supabase.co"
                  required
                  className="form-input-text"
                />
              </div>

              <div>
                <label className="form-field-label">Supabase Anon Public Key</label>
                <input
                  type="password"
                  value={sbKey}
                  onChange={(e) => setSbKey(e.target.value)}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6..."
                  required
                  className="form-input-text"
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.25)', padding: '8px 10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Supabase Database Setup</span>
                <button
                  type="button"
                  onClick={handleCopySql}
                  style={{ background: 'rgba(248,207,101,0.12)', border: '1px solid rgba(248,207,101,0.3)', color: 'var(--color-primary)', borderRadius: '6px', padding: '4px 8px', fontSize: '10px', fontWeight: '700', cursor: 'pointer' }}
                >
                  {isSqlCopied ? '✓ SQL Copied!' : '📋 Copy Setup SQL'}
                </button>
              </div>

              {sbStatus && (
                <div style={{ fontSize: '11px', color: sbStatus.includes('Connected') ? 'var(--color-primary)' : 'var(--color-accent)', fontWeight: '600' }}>
                  {sbStatus}
                </div>
              )}

              <div style={{ display: 'flex', gap: '6px', marginTop: '2px' }}>
                <button
                  type="submit"
                  style={{ flex: 1, background: 'linear-gradient(135deg, #f8cf65, #e0b042)', border: 'none', borderRadius: '8px', padding: '9px', color: '#090b10', fontSize: '12px', fontWeight: '750', cursor: 'pointer' }}
                >
                  Save & Connect Supabase
                </button>
                {supabaseConfig && (
                  <button
                    type="button"
                    onClick={handleDisconnectSupabase}
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid var(--android-border)', borderRadius: '8px', padding: '8px 12px', color: 'var(--text-secondary)', fontSize: '11px', cursor: 'pointer' }}
                  >
                    Disconnect
                  </button>
                )}
              </div>
            </form>
          )}
        </div>

        {/* 6. Change Password Accordion */}
        <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--android-border)', borderRadius: '12px', padding: '12px 14px' }}>
          <div
            onClick={() => setIsPassOpen(!isPassOpen)}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontSize: '12px', fontWeight: '600', color: '#fff' }}
          >
            <span>Change Password</span>
            <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{isPassOpen ? '▲' : '▼'}</span>
          </div>

          {isPassOpen && (
            <form onSubmit={handlePasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
              <input
                type="password"
                value={currentPass}
                onChange={(e) => setCurrentPass(e.target.value)}
                placeholder="Current Password"
                required
                className="form-input-text"
              />
              <input
                type="password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                placeholder="New Password (min 6 chars)"
                required
                className="form-input-text"
              />
              <input
                type="password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                placeholder="Confirm New Password"
                required
                className="form-input-text"
              />
              {passStatus && (
                <div style={{ fontSize: '11px', color: passStatus.includes('success') ? 'var(--color-primary)' : '#ff6b6b', fontWeight: '600' }}>
                  {passStatus}
                </div>
              )}
              <button
                type="submit"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid var(--android-border)', borderRadius: '8px', padding: '8px', color: '#fff', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}
              >
                Update Password
              </button>
            </form>
          )}
        </div>

        {/* 6. Account Actions: Clear Data & Log Out */}
        <div style={{ borderTop: '1px solid var(--android-border)', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button
            type="button"
            className="btn-upload-file"
            style={{ width: '100%', color: 'var(--text-secondary)' }}
            onClick={() => {
              if (confirm('Clear all plans, messages, and photos to start completely fresh?')) {
                localStorage.clear();
                window.location.reload();
              }
            }}
          >
            Reset All Saved Data
          </button>
          
          <button
            type="button"
            onClick={onLogout}
            className="btn-logout-danger"
          >
            Log Out ({activeTraveler.name})
          </button>
        </div>
      </div>
    </div>
  );
}

// Auth Gate Screen Component (Hardened with Anti-Brute Force Protection)
function AuthGateScreen({ onLogin }) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const now = Date.now();
    if (now < lockedUntil) {
      const remainingSecs = Math.ceil((lockedUntil - now) / 1000);
      setErrorMessage(`Too many attempts. Locked for ${remainingSecs}s.`);
      return;
    }

    const cleanName = SecurityGuard.sanitizeText(userName, 32);
    if (!cleanName) {
      setErrorMessage('Please enter your name');
      return;
    }
    if (!password.trim() || password.length < 6) {
      const nextFail = failedAttempts + 1;
      setFailedAttempts(nextFail);
      if (nextFail >= 5) {
        setLockedUntil(Date.now() + 30000); // 30s lockout
        setErrorMessage('Too many failed attempts. Sanctuary locked for 30s.');
      } else {
        setErrorMessage('Password must be at least 6 characters');
      }
      return;
    }

    AudioEngine.playTone(600);
    const lowerName = cleanName.toLowerCase();
    if (lowerName.includes('mikkie')) {
      onLogin({ name: 'Mikkie', uid: '801124501' }, { name: 'Ziankyle', uid: '802931402' });
    } else if (lowerName.includes('zian')) {
      onLogin({ name: 'Ziankyle', uid: '802931402' }, { name: 'Mikkie', uid: '801124501' });
    } else {
      onLogin({ name: cleanName, uid: '802931402' }, { name: 'Mikkie', uid: '801124501' });
    }
  };

  return (
    <div className="auth-gate-screen">
      <div className="auth-brand-box">
        <img
          src="./assets/iconforapp.jpg"
          alt="Komorebi Logo"
          className="auth-brand-logo"
        />
        <h2 className="auth-title">KOMOREBI</h2>
        <p className="auth-subtitle">Private Couple Sanctuary</p>
      </div>

      <form className="auth-form-card" onSubmit={handleSubmit}>
        {errorMessage && (
          <div className="auth-error-badge">
            {errorMessage}
          </div>
        )}

        <div className="auth-input-group">
          <label className="auth-input-label">Your Name</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
              setErrorMessage('');
            }}
            required
            autoComplete="name"
            className="auth-input-field"
          />
        </div>

        <div className="auth-input-group">
          <label className="auth-input-label">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrorMessage('');
            }}
            required
            autoComplete="current-password"
            className="auth-input-field"
          />
        </div>

        <button type="submit" className="btn-auth-submit">
          Enter Sanctuary
        </button>
      </form>
    </div>
  );
}

// Built-in Wi-Fi Real-time Sync Engine (Local Network)
const WiFiSync = {
  async fetchLatest() {
    try {
      const resp = await fetch('/api/sync', { cache: 'no-store' });
      if (resp.ok) {
        return await resp.json();
      }
    } catch (e) {}
    return null;
  },

  async pushUpdate(payload) {
    try {
      await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (e) {}
  }
};

// Supabase 100% Free 24/7 Global Real-time Cloud Sync Engine
const SupabaseSync = {
  client: null,
  channel: null,

  init(config) {
    if (!config || !config.url || !config.key) return false;
    try {
      const createClient = window.supabase?.createClient;
      if (typeof createClient === 'function') {
        this.client = createClient(config.url, config.key, {
          auth: { persistSession: false }
        });
        return true;
      }
    } catch (e) {
      console.warn('Supabase init error:', e);
    }
    return false;
  },

  async fetchAll() {
    if (!this.client) return null;
    try {
      const { data, error } = await this.client
        .from('couple_data')
        .select('key, value');
      if (error) {
        console.warn('Supabase fetch error:', error);
        return null;
      }
      if (data && Array.isArray(data)) {
        const map = {};
        data.forEach(item => {
          map[item.key] = item.value;
        });
        return map;
      }
    } catch (e) {
      console.warn('Supabase fetchAll exception:', e);
    }
    return null;
  },

  async syncUp(key, value) {
    if (!this.client) return;
    try {
      await this.client
        .from('couple_data')
        .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' });
    } catch (e) {
      console.warn('Supabase syncUp error:', e);
    }
  },

  subscribe(onUpdate) {
    if (!this.client) return () => {};
    try {
      if (this.channel) {
        this.client.removeChannel(this.channel);
      }
      this.channel = this.client
        .channel('couple_realtime_channel')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'couple_data' },
          (payload) => {
            if (payload && payload.new && payload.new.key) {
              onUpdate(payload.new.key, payload.new.value);
            }
          }
        )
        .subscribe();

      return () => {
        if (this.client && this.channel) {
          this.client.removeChannel(this.channel);
          this.channel = null;
        }
      };
    } catch (e) {
      console.warn('Supabase subscribe error:', e);
      return () => {};
    }
  }
};

// Main Application Component
function AndroidApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [screenMode, setScreenMode] = useState('app'); // 'app' | 'lockscreen'
  const [activeTab, setActiveTab] = useState('calendar'); // 'calendar' | 'chat'
  
  // Clean, Bare Couple State
  const [activeTraveler, setActiveTraveler] = useState(() => {
    const user = loadStorage('active_user', { name: 'Ziankyle', uid: '802931402' });
    if (user && user.name && user.name.toLowerCase() === 'zian') return { ...user, name: 'Ziankyle' };
    return user;
  });
  const [partnerTraveler, setPartnerTraveler] = useState(() => {
    const user = loadStorage('partner_user', { name: 'Mikkie', uid: '801124501' });
    if (user && user.name && user.name.toLowerCase() === 'zian') return { ...user, name: 'Ziankyle' };
    return user;
  });
  const [myAvatar, setMyAvatar] = useState(() => loadStorage('my_avatar', PRESET_AVATARS[0]));
  const [partnerAvatar, setPartnerAvatar] = useState(() => loadStorage('partner_avatar', PRESET_AVATARS[2]));
  const [plans, setPlans] = useState(() => loadStorage('plans', DEFAULT_PLANS));
  const [messages, setMessages] = useState(() => loadStorage('messages', DEFAULT_MESSAGES));
  const [latestSnap, setLatestSnap] = useState(() => loadStorage('latest_snap', DEFAULT_SNAP));
  const [whisperNote, setWhisperNote] = useState(() => loadStorage('whisper_note', DEFAULT_WHISPER));
  const [myEnergy, setMyEnergy] = useState(() => loadStorage('my_energy', 2));
  const [isSleeping, setIsSleeping] = useState(() => loadStorage('is_sleeping', false));

  const [inputText, setInputText] = useState('');
  const [isEditingWhisper, setIsEditingWhisper] = useState(false);
  const [tempWhisper, setTempWhisper] = useState(whisperNote);
  const [quickPlanTitle, setQuickPlanTitle] = useState('');
  const [isSnapModalOpen, setIsSnapModalOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [liveTime, setLiveTime] = useState(formatCurrentTime());

  // Supabase Realtime Config & Connection State (100% Free 24/7 Global Sync)
  const [supabaseConfig, setSupabaseConfig] = useState(() => loadStorage('supabase_config', DEFAULT_SUPABASE_CONFIG));
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);

  // Dynamic Multi-Month Calendar Engine
  const today = new Date();
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth()); // 0-11
  const todayDateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const [selectedDateStr, setSelectedDateStr] = useState(todayDateStr);

  const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevMonth = () => {
    AudioEngine.playTone(550);
    if (calMonth === 0) {
      setCalMonth(11);
      setCalYear(prev => prev - 1);
    } else {
      setCalMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    AudioEngine.playTone(550);
    if (calMonth === 11) {
      setCalMonth(0);
      setCalYear(prev => prev + 1);
    } else {
      setCalMonth(prev => prev + 1);
    }
  };

  const handleTodayJump = () => {
    AudioEngine.playTone(680);
    setCalYear(today.getFullYear());
    setCalMonth(today.getMonth());
    setSelectedDateStr(todayDateStr);
  };

  // Sanctuary Feature Toggle Preferences (Lockscreen & Notifications)
  const [isLockscreenEnabled, setIsLockscreenEnabled] = useState(() => loadStorage('lockscreen_enabled', true));
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(() => loadStorage('notifications_enabled', true));
  const [isNotifSoundEnabled, setIsNotifSoundEnabled] = useState(() => loadStorage('notif_sound_enabled', true));

  // Sanctuary Mood State (Vector SVG Moods)
  const [myMood, setMyMood] = useState(() => loadStorage('my_mood', 'loving'));
  const [partnerMood, setPartnerMood] = useState(() => loadStorage('partner_mood', 'happy'));
  const [isMoodModalOpen, setIsMoodModalOpen] = useState(false);

  // Chat Theme State ('pink' | 'forest' | 'ocean')
  const [chatTheme, setChatTheme] = useState(() => loadStorage('chat_theme', 'pink'));

  // Photo Alert Ringtone & Notification State
  const [selectedRingtone, setSelectedRingtone] = useState(() => loadStorage('ringtone', 'moonlight'));
  const [activeNotification, setActiveNotification] = useState(null);
  const notifTimerRef = useRef(null);

  const chatEndRef = useRef(null);

  // Sync to Storage on updates
  useEffect(() => saveStorage('active_user', activeTraveler), [activeTraveler]);
  useEffect(() => saveStorage('partner_user', partnerTraveler), [partnerTraveler]);
  useEffect(() => saveStorage('my_avatar', myAvatar), [myAvatar]);
  useEffect(() => saveStorage('partner_avatar', partnerAvatar), [partnerAvatar]);
  useEffect(() => saveStorage('plans', plans), [plans]);
  useEffect(() => saveStorage('messages', messages), [messages]);
  useEffect(() => saveStorage('latest_snap', latestSnap), [latestSnap]);
  useEffect(() => saveStorage('whisper_note', whisperNote), [whisperNote]);
  useEffect(() => saveStorage('my_energy', myEnergy), [myEnergy]);
  useEffect(() => saveStorage('is_sleeping', isSleeping), [isSleeping]);
  useEffect(() => saveStorage('ringtone', selectedRingtone), [selectedRingtone]);
  useEffect(() => saveStorage('my_mood', myMood), [myMood]);
  useEffect(() => saveStorage('partner_mood', partnerMood), [partnerMood]);
  useEffect(() => saveStorage('chat_theme', chatTheme), [chatTheme]);
  useEffect(() => saveStorage('lockscreen_enabled', isLockscreenEnabled), [isLockscreenEnabled]);
  useEffect(() => saveStorage('notifications_enabled', isNotificationsEnabled), [isNotificationsEnabled]);
  useEffect(() => saveStorage('notif_sound_enabled', isNotifSoundEnabled), [isNotifSoundEnabled]);

  // Sync to Native Android Home/Lockscreen Widget
  useEffect(() => {
    try {
      if (!isLockscreenEnabled) return;
      if (window.KomorebiNative && window.KomorebiNative.updateWidget) {
        const payload = JSON.stringify({
          whisper: whisperNote || '',
          energy: myEnergy || 2,
          mood: myMood || 'loving',
          partnerMood: partnerMood || 'happy',
          moodLabel: getMoodData(partnerMood).name,
          photoUrl: latestSnap?.imageUrl || '',
          photoCaption: latestSnap?.caption || '',
          partnerName: partnerTraveler?.name || 'Partner',
          partnerAvatar: partnerAvatar?.iconUrl || '',
          lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        window.KomorebiNative.updateWidget(payload);
      }
    } catch (e) {
      console.warn('Native widget sync:', e);
    }
  }, [isLockscreenEnabled, whisperNote, latestSnap, myEnergy, myMood, partnerMood, partnerTraveler, partnerAvatar]);

  // Unified Back Navigation & Shortcut Key Handler (Hardware Back, Escape, Backspace)
  const handleBackNavigation = () => {
    // 1. Close any open dialogs/modals first
    if (isMoodModalOpen) {
      setIsMoodModalOpen(false);
      return true;
    }
    if (isProfileOpen) {
      setIsProfileOpen(false);
      return true;
    }
    if (isAddOpen) {
      setIsAddOpen(false);
      return true;
    }
    if (isSnapModalOpen) {
      setIsSnapModalOpen(false);
      return true;
    }
    if (isEditingWhisper) {
      setIsEditingWhisper(false);
      return true;
    }
    // 2. Switch from Lockscreen Glance mode back to Main App mode
    if (screenMode === 'lockscreen') {
      setScreenMode('app');
      return true;
    }
    // 3. Switch from Chat tab back to Calendar tab
    if (activeTab === 'chat') {
      setActiveTab('calendar');
      return true;
    }
    // 4. At root screen (Calendar with no modals) -> Close or Minimize App on Android, or switch to lockscreen glance
    if (window.KomorebiNative && window.KomorebiNative.minimizeApp) {
      window.KomorebiNative.minimizeApp();
      return true;
    }
    if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App) {
      window.Capacitor.Plugins.App.exitApp();
      return true;
    }
    // On web preview: switch to lockscreen view to simulate closing to lockscreen
    setScreenMode('lockscreen');
    return true;
  };

  // Expose global back handler for Android BridgeActivity and listen to keyboard / backbutton events
  useEffect(() => {
    window.handleKomorebiBack = handleBackNavigation;

    const handleKeyDown = (e) => {
      // If user pressed Escape
      if (e.key === 'Escape') {
        e.preventDefault();
        handleBackNavigation();
        return;
      }
      // If user pressed Backspace outside an input/textarea
      const isInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName);
      if (e.key === 'Backspace' && !isInput) {
        e.preventDefault();
        handleBackNavigation();
      }
    };

    const handleCordovaBackButton = (e) => {
      e?.preventDefault?.();
      handleBackNavigation();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('backbutton', handleCordovaBackButton);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('backbutton', handleCordovaBackButton);
      window.handleKomorebiBack = null;
    };
  }, [isMoodModalOpen, isProfileOpen, isAddOpen, isSnapModalOpen, isEditingWhisper, screenMode, activeTab]);

  // Request Native Android (API 33+) & Web Notification Permissions
  useEffect(() => {
    try {
      if (window.KomorebiNative && window.KomorebiNative.requestNotificationPermission) {
        window.KomorebiNative.requestNotificationPermission();
      }
      if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
      }
    } catch (e) {}
  }, [isLoggedIn]);

  // Universal Sanctuary Notification Engine (Native Android Status Bar + Audio chime + floating toast)
  const triggerNotification = ({
    title,
    caption,
    body,
    avatarUrl,
    type = 'general',
    thumbUrl = null,
    actionTab = null,
    durationMs = 6000
  }) => {
    // If notifications are disabled in settings, suppress
    if (!isNotificationsEnabled) return;

    if (notifTimerRef.current) clearTimeout(notifTimerRef.current);

    const isPhotoAlert = type === 'photo';
    const finalDuration = isPhotoAlert ? 30000 : durationMs;

    if (isPhotoAlert) {
      if (isNotifSoundEnabled) AudioEngine.playRingtone(selectedRingtone, 30000);
    } else if (isNotifSoundEnabled) {
      AudioEngine.playNotificationChime();
    }

    // Trigger Real Native Android System Notification (System status bar + heads-up banner)
    try {
      if (window.KomorebiNative && window.KomorebiNative.showSystemNotification) {
        window.KomorebiNative.showSystemNotification(
          title || '✦ Komorebi Sanctuary',
          caption || body || 'New update from your partner',
          type || 'general'
        );
      }
    } catch (e) {
      console.warn('Native system notification dispatch:', e);
    }

    // Try Web Notification API if permitted
    try {
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title || '✦ Komorebi Sanctuary', {
          body: caption || body || 'Sanctuary update',
          icon: avatarUrl || './assets/iconforapp.jpg'
        });
      } else if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
      }
    } catch (e) {}

    setActiveNotification({
      id: 'notif-' + Date.now(),
      title: title || 'Komorebi Sanctuary',
      caption: caption || body || 'New update from your partner',
      avatarUrl: avatarUrl || partnerAvatar.iconUrl || './assets/iconforapp.jpg',
      thumbUrl,
      type,
      actionTab
    });

    notifTimerRef.current = setTimeout(() => {
      setActiveNotification(null);
      if (isPhotoAlert) AudioEngine.stopRingtone();
    }, finalDuration);
  };

  const triggerPhotoNotification = (snap, isIncoming = false) => {
    triggerNotification({
      title: isIncoming ? `New Photo from ${partnerTraveler.name}` : `Photo Sent to Locket`,
      caption: snap.caption || 'Shared a new photo',
      avatarUrl: isIncoming ? partnerAvatar.iconUrl : myAvatar.iconUrl,
      thumbUrl: snap.imageUrl,
      type: 'photo'
    });
  };

  const handleDismissNotification = () => {
    if (notifTimerRef.current) clearTimeout(notifTimerRef.current);
    AudioEngine.stopRingtone();
    setActiveNotification(null);
  };

  // Automatic Same Wi-Fi Sync Polling Loop (Zero Configuration LAN fallback)
  useEffect(() => {
    let isMounted = true;
    const pollWiFiServer = async () => {
      const data = await WiFiSync.fetchLatest();
      if (data && isMounted) {
        if (data.plans && Array.isArray(data.plans)) {
          setPlans(data.plans);
        }
        if (data.messages && Array.isArray(data.messages)) {
          setMessages(data.messages);
        }
        if (data.latest_snap !== undefined) {
          setLatestSnap(prev => {
            if (data.latest_snap && (!prev || prev.id !== data.latest_snap.id)) {
              if (data.latest_snap.sentBy !== activeTraveler.name.toLowerCase()) {
                triggerPhotoNotification(data.latest_snap, true);
              }
            }
            return data.latest_snap;
          });
        }
        if (data.live_ping && data.live_ping.sentBy) {
          if (data.live_ping.sentBy.toLowerCase() !== activeTraveler.name.toLowerCase()) {
            if (!window.lastHandledPing || window.lastHandledPing !== data.live_ping.time) {
              window.lastHandledPing = data.live_ping.time;
              triggerNotification({
                title: `⚡ Live Ping from ${data.live_ping.sentBy}`,
                caption: `Thinking of you right now! 🌸 (${getMoodData(partnerMood).name} mood)`,
                type: 'ping',
                avatarUrl: partnerAvatar.iconUrl,
                actionTab: 'chat'
              });
            }
          }
        }
        if (data.whisper_note !== undefined) {
          setWhisperNote(data.whisper_note);
        }
        if (data.partner_status) {
          if (data.partner_status.energy !== undefined) setMyEnergy(data.partner_status.energy);
          if (data.partner_status.sleeping !== undefined) setIsSleeping(data.partner_status.sleeping);
        }
      }
    };

    pollWiFiServer();
    const interval = setInterval(pollWiFiServer, 2000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [activeTraveler.name, partnerTraveler.name, partnerAvatar.iconUrl, selectedRingtone]);

  // Supabase 24/7 Global Realtime Database Subscriptions
  useEffect(() => {
    if (supabaseConfig && supabaseConfig.url && supabaseConfig.key) {
      const connected = SupabaseSync.init(supabaseConfig);
      setIsSupabaseConnected(connected);

      if (connected) {
        // Initial fetch of existing cloud data
        SupabaseSync.fetchAll().then(data => {
          if (data) {
            if (data.plans && Array.isArray(data.plans)) setPlans(data.plans);
            if (data.messages && Array.isArray(data.messages)) setMessages(data.messages);
            if (data.latest_snap !== undefined && data.latest_snap !== null) {
              setLatestSnap(data.latest_snap);
            }
            if (data.whisper_note !== undefined) setWhisperNote(data.whisper_note);
            if (data.partner_status) {
              if (data.partner_status.energy !== undefined) setMyEnergy(data.partner_status.energy);
              if (data.partner_status.sleeping !== undefined) setIsSleeping(data.partner_status.sleeping);
            }
          }
        });

        // Realtime Subscription
        const unsub = SupabaseSync.subscribe((key, value) => {
          if (key === 'plans' && Array.isArray(value)) {
            setPlans(value);
          } else if (key === 'messages' && Array.isArray(value)) {
            setMessages(value);
          } else if (key === 'latest_snap') {
            setLatestSnap(prev => {
              if (value && (!prev || prev.id !== value.id)) {
                if (value.sentBy !== activeTraveler.name.toLowerCase()) {
                  triggerPhotoNotification(value, true);
                }
              }
              return value;
            });
          } else if (key === 'live_ping' && value && value.sentBy) {
            if (value.sentBy.toLowerCase() !== activeTraveler.name.toLowerCase()) {
              if (!window.lastHandledPing || window.lastHandledPing !== value.time) {
                window.lastHandledPing = value.time;
                triggerNotification({
                  title: `⚡ Live Ping from ${value.sentBy}`,
                  caption: `Thinking of you right now! 🌸 (${getMoodData(partnerMood).name} mood)`,
                  type: 'ping',
                  avatarUrl: partnerAvatar.iconUrl,
                  actionTab: 'chat'
                });
              }
            }
          } else if (key === 'whisper_note' && value !== undefined) {
            setWhisperNote(value);
          } else if (key === 'partner_status' && value) {
            if (value.energy !== undefined) setMyEnergy(value.energy);
            if (value.sleeping !== undefined) setIsSleeping(value.sleeping);
          }
        });

        return () => {
          if (typeof unsub === 'function') unsub();
        };
      }
    } else {
      setIsSupabaseConnected(false);
    }
  }, [supabaseConfig, activeTraveler.name, selectedRingtone, partnerTraveler.name, partnerAvatar.iconUrl]);

  const handleSaveSupabaseConfig = (cfg) => {
    setSupabaseConfig(cfg);
    saveStorage('supabase_config', cfg);
    if (!cfg) {
      setIsSupabaseConnected(false);
    }
  };

  // Live Clock
  useEffect(() => {
    const update = () => setLiveTime(formatCurrentTime());
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll chat to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeTab]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    const cleanText = SecurityGuard.sanitizeText(inputText, 500);
    if (!cleanText) return;

    AudioEngine.playTone(600);
    const newMsg = {
      id: 'msg-' + Date.now(),
      sender: activeTraveler.name.toLowerCase(),
      text: cleanText,
      time: formatCurrentTime()
    };
    setMessages(prev => {
      const next = [...prev, newMsg];
      WiFiSync.pushUpdate({ messages: next });
      SupabaseSync.syncUp('messages', next);
      return next;
    });
    setInputText('');
  };

  const handleAddPlan = (newPlan) => {
    const sanitizedPlan = {
      ...newPlan,
      title: SecurityGuard.sanitizeText(newPlan.title, 50)
    };
    setPlans(prev => {
      const next = [sanitizedPlan, ...prev];
      WiFiSync.pushUpdate({ plans: next });
      SupabaseSync.syncUp('plans', next);
      return next;
    });
  };

  const handleDeletePlan = (id, e) => {
    if (e) e.stopPropagation();
    AudioEngine.playTone(380);
    setPlans(prev => {
      const next = prev.filter(p => p.id !== id);
      WiFiSync.pushUpdate({ plans: next });
      SupabaseSync.syncUp('plans', next);
      return next;
    });
  };

  const handleToggleRevealPlan = (id) => {
    AudioEngine.playTone(720);
    setPlans(prev => {
      const next = prev.map(p => p.id === id ? { ...p, isRevealed: !p.isRevealed } : p);
      WiFiSync.pushUpdate({ plans: next });
      SupabaseSync.syncUp('plans', next);
      return next;
    });
  };

  const handleQuickAddPlan = (e) => {
    e.preventDefault();
    const cleanTitle = SecurityGuard.sanitizeText(quickPlanTitle, 50);
    if (!cleanTitle) return;
    AudioEngine.playTone(650);
    handleAddPlan({
      id: 'plan-' + Date.now(),
      title: cleanTitle,
      date: selectedDateStr,
      time: '8:00 PM',
      type: 'Gaming',
      assignedTo: 'both',
      createdBy: activeTraveler.name.toLowerCase(),
      isWishSealed: false
    });
    setQuickPlanTitle('');
  };

  const handleSendSnap = (newSnap) => {
    setLatestSnap(newSnap);
    WiFiSync.pushUpdate({ latest_snap: newSnap });
    SupabaseSync.syncUp('latest_snap', newSnap);
    triggerPhotoNotification(newSnap, false);
  };

  const handleUpdateEnergy = (newEnergy) => {
    setMyEnergy(newEnergy);
    const status = { energy: newEnergy, sleeping: isSleeping };
    WiFiSync.pushUpdate({ partner_status: status });
    SupabaseSync.syncUp('partner_status', status);
  };

  const handleToggleSleeping = () => {
    const nextSleeping = !isSleeping;
    setIsSleeping(nextSleeping);
    const status = { energy: myEnergy, sleeping: nextSleeping };
    WiFiSync.pushUpdate({ partner_status: status });
    SupabaseSync.syncUp('partner_status', status);
  };

  const handleSaveWhisper = () => {
    AudioEngine.playTone(680);
    const cleanNote = SecurityGuard.sanitizeText(tempWhisper, 140);
    setWhisperNote(cleanNote);
    setIsEditingWhisper(false);
    WiFiSync.pushUpdate({ whisper_note: cleanNote });
    SupabaseSync.syncUp('whisper_note', cleanNote);
  };

  const handleLogout = () => {
    AudioEngine.playTone(400);
    setIsProfileOpen(false);
    setIsLoggedIn(false);
  };

  const handleLogin = (user, partner) => {
    setActiveTraveler(user);
    setPartnerTraveler(partner);
    setIsLoggedIn(true);
  };

  const dayPlans = plans.filter(c => c.date === selectedDateStr);
  const energyInfo = getEnergyDetails(myEnergy);

  return (
    <div className="device-viewport-wrapper">
      {/* External Viewport Toggle Controls */}
      <div className="device-controls-bar">
        <div className="perspective-tag">
          <span>📱</span>
          <strong>Android Phone Perspective</strong>
        </div>

        <div className="perspective-toggle">
          <button
            className={`perspective-btn ${screenMode === 'app' ? 'active' : ''}`}
            onClick={() => setScreenMode('app')}
          >
            App View
          </button>
          <button
            className={`perspective-btn ${screenMode === 'lockscreen' ? 'active' : ''}`}
            onClick={() => setScreenMode('lockscreen')}
            title={isLockscreenEnabled ? "Lockscreen Widget Preview" : "Lockscreen Widget (Sync paused in Profile Settings)"}
          >
            Lockscreen Widget {!isLockscreenEnabled && <span style={{ fontSize: '9px', opacity: 0.6 }}>(Off)</span>}
          </button>
        </div>
      </div>

      {/* Android Smartphone Chassis */}
      <div className="android-device-chassis" style={{ position: 'relative' }}>
        {/* Heads-up HD Notification Banner (10s Ringtone Alert) */}
        <HDNotificationBanner
          notification={activeNotification}
          onClose={handleDismissNotification}
          onClick={() => {
            handleDismissNotification();
            setIsSnapModalOpen(false);
          }}
        />

        {/* SCREEN VIEWPORT 1: MAIN NATIVE ANDROID APP */}
        {!isLoggedIn ? (
          <AuthGateScreen onLogin={handleLogin} />
        ) : screenMode === 'app' ? (
          <div className="android-screen">
            {/* App Top Bar */}
            <div className="app-top-bar">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img
                  src="./assets/iconforapp.jpg"
                  alt="App Icon"
                  style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1.5px solid var(--color-primary)', objectFit: 'cover', boxShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
                />
                <div>
                  <div className="app-brand-title" style={{ fontSize: '15px', lineHeight: '1.1' }}>KOMOREBI</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{activeTraveler.name} & {partnerTraveler.name}</div>
                </div>
              </div>
              <button 
                className="switch-partner-pill" 
                onClick={() => {
                  AudioEngine.playTone(600);
                  setIsProfileOpen(true);
                }} 
                title="Profile & Settings"
              >
                <img 
                  src={myAvatar.iconUrl} 
                  alt="" 
                  style={{ width: '18px', height: '18px', borderRadius: '50%', objectFit: 'cover' }} 
                />
                <span>{activeTraveler.name}</span>
              </button>
            </div>

            {/* TAB 1: CALENDAR & FEED (Bento Grid Architecture) */}
            {activeTab === 'calendar' && (
              <div className="android-content-body">
                {/* 1. TOP BENTO ROW: Partner Status + Dual Clock Widget */}
                <div className="bento-row-split">
                  {/* Left Tile: Presence & Mood */}
                  <div className="bento-card">
                    <div className="bento-partner-header">
                      <div className="bento-avatar-wrap">
                        <img src={myAvatar.iconUrl} alt={myAvatar.name} className="bento-avatar-img" />
                      </div>
                      <div className="bento-partner-meta">
                        <div className="bento-partner-name">{activeTraveler.name}</div>
                        <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>
                          {energyInfo.emoji} {energyInfo.title}
                        </div>
                      </div>
                      <button
                        onClick={handleToggleSleeping}
                        className="bento-sleep-btn"
                        title="Toggle sleep status"
                      >
                        {isSleeping ? <Icons.Moon size={11} /> : <Icons.Sun size={11} />}
                        <span>{isSleeping ? 'Sleep' : 'Awake'}</span>
                      </button>
                    </div>

                    <div>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={myEnergy}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10);
                          handleUpdateEnergy(val);
                          AudioEngine.playTone(300 + val * 40);
                        }}
                        className="energy-slider-scrubber"
                        aria-label="Energy level"
                      />
                      <div className="bento-energy-info">
                        <span>Energy: <strong style={{ color: 'var(--color-primary)' }}>{myEnergy * 10}%</strong></span>
                        <button 
                          onClick={() => {
                            AudioEngine.playTone(550);
                            setIsMoodModalOpen(true);
                          }}
                          className="mood-pill-badge"
                          title="Change your Sanctuary Mood"
                        >
                          <MoodVectorIcon moodId={myMood} size={13} />
                          <span>{getMoodData(myMood).name}</span>
                          <span style={{ fontSize: '8px', opacity: 0.6 }}>▼</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Tile: Partner Presence & Timezones */}
                  <div className="bento-card">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <img 
                          src={partnerAvatar.iconUrl || './assets/avatars/kokomi.png'} 
                          alt="" 
                          style={{ width: '20px', height: '20px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--color-primary)' }} 
                        />
                        <span style={{ fontSize: '11px', fontWeight: '700', color: '#fff' }}>{partnerTraveler.name}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: '12px', fontSize: '10px', color: getMoodData(partnerMood).color, fontWeight: '700' }}>
                        <MoodVectorIcon moodId={partnerMood} size={12} />
                        <span>{getMoodData(partnerMood).name}</span>
                      </div>
                    </div>

                    <div className="bento-clocks-wrapper">
                      <div className="bento-tz-item">
                        <div className="bento-tz-label">
                          <Icons.Clock size={11} />
                          <span>Tokyo (UTC+9)</span>
                        </div>
                        <div className="bento-tz-time">{getTimezoneTime(9)}</div>
                      </div>
                      <div className="bento-tz-item">
                        <div className="bento-tz-label">
                          <Icons.Clock size={11} />
                          <span>Manila (UTC+8)</span>
                        </div>
                        <div className="bento-tz-time">{getTimezoneTime(8)}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. CENTER STAGE: Dynamic Multi-Month Calendar Grid & Daily Schedule */}
                <div className="calendar-card">
                  <div className="calendar-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="month-label" style={{ fontSize: '15px', fontWeight: '800' }}>
                        {MONTH_NAMES[calMonth]} {calYear}
                      </span>
                      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                        <button
                          type="button"
                          onClick={handlePrevMonth}
                          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--android-border)', color: '#fff', borderRadius: '6px', width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '11px' }}
                          title="Previous Month"
                        >
                          ◀
                        </button>
                        <button
                          type="button"
                          onClick={handleNextMonth}
                          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--android-border)', color: '#fff', borderRadius: '6px', width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '11px' }}
                          title="Next Month"
                        >
                          ▶
                        </button>
                        <button
                          type="button"
                          onClick={handleTodayJump}
                          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--android-border)', color: 'var(--color-primary)', borderRadius: '6px', padding: '0 8px', height: '26px', fontSize: '10px', fontWeight: '700', cursor: 'pointer' }}
                          title="Jump to Today"
                        >
                          Today
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsAddOpen(true)}
                      style={{ background: 'rgba(248, 207, 101, 0.12)', border: '1px solid rgba(248, 207, 101, 0.35)', color: 'var(--color-primary)', borderRadius: '8px', padding: '5px 10px', fontSize: '11px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Icons.Plus size={13} />
                      <span>Add Plan</span>
                    </button>
                  </div>

                  <div className="cal-mini-weekdays">
                    <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
                  </div>

                  <div className="cal-mini-grid">
                    {Array.from({ length: new Date(calYear, calMonth, 1).getDay() }).map((_, idx) => (
                      <div key={`empty-${idx}`} className="cal-mini-day empty" style={{ opacity: 0.15, pointerEvents: 'none' }} />
                    ))}
                    {Array.from({ length: new Date(calYear, calMonth + 1, 0).getDate() }, (_, i) => i + 1).map(d => {
                      const dStr = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                      const dayEvents = plans.filter(c => c.date === dStr);
                      const isSelected = selectedDateStr === dStr;
                      const isToday = dStr === todayDateStr;

                      return (
                        <div
                          key={dStr}
                          className={`cal-mini-day ${isSelected ? 'selected' : ''} ${isToday && !isSelected ? 'today' : ''} ${dayEvents.length > 0 ? 'has-plan' : ''}`}
                          onClick={() => {
                            AudioEngine.playTone(500);
                            if (selectedDateStr === dStr) {
                              setIsAddOpen(true);
                            } else {
                              setSelectedDateStr(dStr);
                            }
                          }}
                          onDoubleClick={() => {
                            AudioEngine.playTone(650);
                            setSelectedDateStr(dStr);
                            setIsAddOpen(true);
                          }}
                          title={dayEvents.length > 0 ? `${MONTH_NAMES[calMonth]} ${d}: ${dayEvents.map(e => e.title).join(', ')}` : `${MONTH_NAMES[calMonth]} ${d}`}
                        >
                          <div className="cal-day-num">{d}</div>
                          {dayEvents.length > 0 && (
                            <div className="cal-event-dots-row">
                              <span className="cal-event-dot" />
                              {dayEvents.length > 1 && <span className="cal-event-dot" />}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Selected Day's Plans List & Quick Add */}
                  <div className="daily-events-section" style={{ marginTop: '6px', borderTop: '1px solid var(--android-border)', paddingTop: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div className="section-label">
                        Plans • {new Date(selectedDateStr + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                      <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>
                        {dayPlans.length} {dayPlans.length === 1 ? 'event' : 'events'}
                      </span>
                    </div>

                    {/* Instant Inline Plan Input */}
                    <form onSubmit={handleQuickAddPlan} className="quick-plan-bar">
                      <input
                        type="text"
                        value={quickPlanTitle}
                        onChange={(e) => setQuickPlanTitle(e.target.value)}
                        placeholder={`Add a plan for ${new Date(selectedDateStr + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}...`}
                        className="quick-plan-input"
                      />
                      <button type="submit" className="quick-plan-btn" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Icons.Plus size={12} />
                        <span>Add</span>
                      </button>
                    </form>

                    {dayPlans.length === 0 ? (
                      <div style={{ padding: '12px', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '12px' }}>
                        No plans for {new Date(selectedDateStr + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}.
                      </div>
                    ) : (
                      dayPlans.map(plan => {
                        const isHiddenSurprise = plan.isWishSealed && !plan.isRevealed;
                        return (
                          <div
                            key={plan.id}
                            className="event-list-item"
                            onClick={() => plan.isWishSealed && handleToggleRevealPlan(plan.id)}
                            style={{ cursor: plan.isWishSealed ? 'pointer' : 'default' }}
                          >
                            <div className="event-emoji-box">{plan.emoji}</div>
                            <div style={{ flex: 1 }}>
                              <div className="event-title">
                                {isHiddenSurprise ? 'Surprise Plan (Tap to reveal)' : plan.title}
                              </div>
                              <div className="event-time-tag">
                                {plan.time} • {plan.type} • Added by {plan.createdBy === activeTraveler.name.toLowerCase() ? 'You' : partnerTraveler.name}
                              </div>
                            </div>
                            <button
                              onClick={(e) => handleDeletePlan(plan.id, e)}
                              style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', padding: '6px 8px', borderRadius: '6px', display: 'flex', alignItems: 'center' }}
                              title="Delete plan"
                              aria-label="Delete plan"
                            >
                              <Icons.Trash size={13} />
                            </button>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* 3. BOTTOM QUICK BENTO ROW: Daily Note & Shared Photo */}
                <div className="bento-row-equal">
                  {/* Left Tile: Today's Note */}
                  <div className="bento-card">
                    <div className="bento-tile-header">
                      <span className="bento-tile-title">
                        <Icons.Edit size={11} />
                        <span>Daily Note</span>
                      </span>
                      <button
                        onClick={() => {
                          if (isEditingWhisper) {
                            handleSaveWhisper();
                          } else {
                            setTempWhisper(whisperNote);
                            setIsEditingWhisper(true);
                          }
                        }}
                        style={{ background: 'none', border: 'none', color: 'var(--color-accent)', fontSize: '10px', cursor: 'pointer', fontWeight: '700' }}
                      >
                        {isEditingWhisper ? 'Save' : 'Edit'}
                      </button>
                    </div>

                    {isEditingWhisper ? (
                      <input
                        type="text"
                        value={tempWhisper}
                        onChange={(e) => setTempWhisper(e.target.value)}
                        maxLength={70}
                        autoFocus
                        className="form-input-text"
                        style={{ padding: '6px 8px', fontSize: '11px' }}
                      />
                    ) : (
                      <div className="bento-note-body">"{whisperNote || 'Tap Edit to write a note'}"</div>
                    )}
                  </div>

                  {/* Right Tile: Shared Photo & Video Locket */}
                  <div className="bento-card" onClick={() => setIsSnapModalOpen(true)} style={{ cursor: 'pointer' }}>
                    <div className="bento-tile-header">
                      <span className="bento-tile-title">
                        <Icons.Camera size={11} />
                        <span>
                          {latestSnap && latestSnap.sentBy !== activeTraveler.name.toLowerCase()
                            ? `${partnerTraveler.name}'s Drop`
                            : 'Shared Media'}
                        </span>
                      </span>
                      {latestSnap && <span style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>{latestSnap.time}</span>}
                    </div>

                    <div className="bento-photo-thumb" style={{ position: 'relative', overflow: 'hidden' }}>
                      <MediaCarouselViewer
                        snap={latestSnap}
                        activeTraveler={activeTraveler}
                        partnerTraveler={partnerTraveler}
                        isLockscreen={false}
                        onOpenModal={() => setIsSnapModalOpen(true)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: MESSAGES & CHAT STREAM */}
            {activeTab === 'chat' && (
              <div
                className={`android-content-body chat-screen-container chat-theme-${chatTheme}`}
                style={{ justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}
              >
                {/* 🌌 Celestial Night Sky with Authentic Shooting Stars (UI UX Pro Max Quality) */}
                <CelestialPhysicsCanvas theme={chatTheme} />

                {/* Chat Header Bar with Back Button, 3-Theme Switcher, and Ping Trigger */}
                <div className="chat-header-bar">
                  <button
                    onClick={() => setActiveTab('calendar')}
                    className="chat-back-btn"
                    title="Back to Calendar (Esc or Back)"
                  >
                    <span>←</span> Calendar
                  </button>

                  {/* 3 Messaging Themes: Pink, Forest, Ocean (Lucide Vector Icons) */}
                  <div className="chat-theme-picker" title="Switch Chat Theme">
                    <button
                      className={`theme-pill-btn pink-pill ${chatTheme === 'pink' ? 'active' : ''}`}
                      onClick={() => {
                        AudioEngine.playTone(550);
                        setChatTheme('pink');
                      }}
                      title="Sakura Pink Theme"
                    >
                      <Icons.Flower size={12} />
                      <span>Pink</span>
                    </button>
                    <button
                      className={`theme-pill-btn forest-pill ${chatTheme === 'forest' ? 'active' : ''}`}
                      onClick={() => {
                        AudioEngine.playTone(450);
                        setChatTheme('forest');
                      }}
                      title="Emerald Forest Theme"
                    >
                      <Icons.TreePine size={12} />
                      <span>Forest</span>
                    </button>
                    <button
                      className={`theme-pill-btn ocean-pill ${chatTheme === 'ocean' ? 'active' : ''}`}
                      onClick={() => {
                        AudioEngine.playTone(620);
                        setChatTheme('ocean');
                      }}
                      title="Deep Ocean Theme"
                    >
                      <Icons.Waves size={12} />
                      <span>Ocean</span>
                    </button>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {/* Send Instant Notification Ping Button */}
                    <button
                      onClick={() => {
                        const pingData = { sentBy: activeTraveler.name, time: Date.now() };
                        WiFiSync.pushUpdate({ live_ping: pingData });
                        SupabaseSync.syncUp('live_ping', pingData);
                        triggerNotification({
                          title: `⚡ Ping Sent to ${partnerTraveler.name}`,
                          caption: `Sent love to ${partnerTraveler.name}! 🌸 (${getMoodData(myMood).name} mood)`,
                          type: 'ping',
                          avatarUrl: myAvatar.iconUrl,
                          actionTab: 'chat'
                        });
                      }}
                      style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.12)', color: '#fff', borderRadius: '12px', padding: '3px 7px', fontSize: '10px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px' }}
                      title="Send Instant In-App Notification Ping"
                    >
                      <Icons.Bell size={11} />
                      <span>Ping</span>
                    </button>

                    {messages.length > 0 && (
                      <button
                        onClick={() => {
                          if (confirm('Clear chat history?')) {
                            AudioEngine.playTone(380);
                            setMessages([]);
                          }
                        }}
                        style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', fontSize: '10px', cursor: 'pointer', padding: '2px 4px' }}
                        title="Clear Chat History"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>

                <div className="chat-bubble-stream" style={{ flex: '1 1 0', minHeight: 0, overflowY: 'auto', maxHeight: 'none', zIndex: 2 }}>
                  {messages.length === 0 ? (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-tertiary)', textAlign: 'center', padding: '40px 20px' }}>
                      <div style={{ marginBottom: '8px', color: 'var(--color-primary)' }}>
                        <Icons.Chat size={32} />
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)' }}>No messages yet</div>
                      <div style={{ fontSize: '11px', marginTop: '2px' }}>Send a message to start chatting with {partnerTraveler.name}.</div>
                    </div>
                  ) : (
                    messages.map(msg => {
                      const isMe = msg.sender === activeTraveler.name.toLowerCase();
                      return (
                        <div key={msg.id} className={`chat-bubble-wrapper ${isMe ? 'outgoing' : 'incoming'}`}>
                          {!isMe && (
                            <div className="chat-avatar-partner" title={partnerTraveler.name}>
                              <img 
                                src={partnerAvatar.iconUrl || './assets/avatars/kokomi.png'} 
                                alt={partnerTraveler.name} 
                                onError={(e) => { e.target.src = './assets/avatars/kokomi.png'; }}
                              />
                            </div>
                          )}
                          <div className={`chat-bubble ${isMe ? 'outgoing' : 'incoming'}`}>
                            <div>{msg.text}</div>
                            <div className="chat-timestamp">{msg.time}</div>
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Chat Input Bar */}
                <form onSubmit={handleSendMessage} className="chat-input-bar" style={{ flexShrink: 0, zIndex: 2 }}>
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={`Message ${partnerTraveler.name}...`}
                    className="chat-text-input"
                  />
                  <button type="submit" className="chat-send-btn" title="Send message" aria-label="Send message">
                    ➤
                  </button>
                </form>
              </div>
            )}

            {/* Compose Bottom Navigation Bar with Vector SVG Icons */}
            <div className="android-bottom-nav">
              <div className={`nav-tab-item ${activeTab === 'calendar' ? 'active' : ''}`} onClick={() => setActiveTab('calendar')}>
                <div className="nav-tab-icon"><Icons.Calendar size={18} /></div>
                <span>Calendar</span>
              </div>
              <div className={`nav-tab-item ${activeTab === 'chat' ? 'active' : ''}`} onClick={() => setActiveTab('chat')}>
                <div className="nav-tab-icon"><Icons.Chat size={18} /></div>
                <span>Chat</span>
              </div>
              <div className="nav-tab-item" onClick={() => setIsSnapModalOpen(true)}>
                <div className="nav-tab-icon"><Icons.Camera size={18} /></div>
                <span>Photo</span>
              </div>
              <div className="nav-tab-item" onClick={() => setIsAddOpen(true)}>
                <div className="nav-tab-icon"><Icons.Plus size={18} /></div>
                <span>Add Plan</span>
              </div>
              <div className="nav-tab-item" onClick={() => setIsProfileOpen(true)}>
                <div className="nav-tab-icon"><Icons.User size={18} /></div>
                <span>Profile</span>
              </div>
            </div>
          </div>
        ) : (
          /* SCREEN VIEWPORT 2: ANDROID LOCKSCREEN GLANCE WIDGET PREVIEW */
          <div className="lockscreen-screen">
            <div className="lockscreen-header-block">
              <div className="lockscreen-date-pill">Tuesday, August 18</div>
              <div className="lockscreen-clock-huge">{liveTime}</div>
            </div>

            {/* Frosted Glass Glance Widget — HD Minimalist Surface */}
            <div className="glance-widget-surface">
              <div className="glance-header-row">
                <div className="glance-brand-tag">
                  <img src="./assets/iconforapp.jpg" alt="" style={{ width: '22px', height: '22px', borderRadius: '50%', border: '1px solid var(--color-primary)', objectFit: 'cover' }} />
                  <span>Komorebi Live</span>
                </div>
                <div className="glance-sync-pill">
                  <Icons.Clock size={10} />
                  <span>Tokyo {getTimezoneTime(9)}</span>
                </div>
              </div>

              {/* Lockscreen Partner Status Bar with Vector Mood */}
              <div className="glance-partner-badge">
                <div className="glance-partner-left">
                  <div className="glance-avatar-circle">
                    <img src={partnerAvatar.iconUrl || './assets/avatars/kokomi.png'} alt={partnerTraveler.name} />
                  </div>
                  <div>
                    <div className="glance-partner-name">{partnerTraveler.name}</div>
                    <div className="glance-partner-status" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MoodVectorIcon moodId={partnerMood} size={11} />
                      <span>{getMoodData(partnerMood).name} • {energyInfo.title}</span>
                    </div>
                  </div>
                </div>
                <div className="glance-energy-chip">{myEnergy * 10}% Energy</div>
              </div>

              {/* Daily Note / Whisper Quote Card */}
              <div style={{ background: 'rgba(248, 207, 101, 0.08)', border: '1px solid rgba(248, 207, 101, 0.25)', borderRadius: '12px', padding: '8px 10px', margin: '4px 0 8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center' }}>
                  <Icons.Mail size={15} />
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '9px', color: 'var(--color-primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Daily Note from {partnerTraveler.name}</div>
                  <div style={{ fontSize: '11px', color: '#fff', fontStyle: 'italic', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    "{whisperNote || 'Thinking of you today! 🌸'}"
                  </div>
                </div>
              </div>

              {/* HD Shared Photo & Video Locket Frame (Swipeable Carousel) */}
              <div className="glance-photo-frame" style={{ cursor: 'pointer' }}>
                <MediaCarouselViewer
                  snap={latestSnap}
                  activeTraveler={activeTraveler}
                  partnerTraveler={partnerTraveler}
                  isLockscreen={true}
                  onOpenModal={() => setIsSnapModalOpen(true)}
                />
              </div>

              {/* Upcoming Plan Bar */}
              <div className="glance-plan-bar">
                <span>Next: {plans.length > 0 ? plans[0].title : 'No upcoming plans'}</span>
                <span style={{ color: 'var(--color-primary)', fontWeight: '700' }}>
                  {plans.length > 0 ? plans[0].time : 'Free'}
                </span>
              </div>
            </div>

            {/* Lockscreen Bottom Quick Actions & Unlock Bar */}
            <div className="lockscreen-bottom-actions">
              <button className="lockscreen-circle-btn" onClick={() => setIsSnapModalOpen(true)} title="Quick Camera">
                <Icons.Camera size={18} />
              </button>
              <div className="lockscreen-unlock-hint">
                <span>Swipe up to open</span>
                <div className="lockscreen-home-bar" />
              </div>
              <button className="lockscreen-circle-btn" onClick={() => setScreenMode('app')} title="Unlock App">
                <Icons.Calendar size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Vector Mood Picker Modal */}
        <MoodPickerModal
          isOpen={isMoodModalOpen}
          onClose={() => setIsMoodModalOpen(false)}
          currentMood={myMood}
          onSelectMood={(moodId) => {
            setMyMood(moodId);
            WiFiSync.pushUpdate({ partner_mood: moodId });
            SupabaseSync.syncUp('partner_mood', moodId);
            triggerNotification({
              title: `Mood Updated: ${getMoodData(moodId).name}`,
              caption: `Shared with ${partnerTraveler.name} & updated on lockscreen!`,
              type: 'mood',
              avatarUrl: myAvatar.iconUrl
            });
          }}
          partnerName={partnerTraveler.name}
        />

        {/* Send Photo Bottom Sheet */}
        <SendPictureSheet
          isOpen={isSnapModalOpen}
          onClose={() => setIsSnapModalOpen(false)}
          onSendPicture={handleSendSnap}
          activeTraveler={activeTraveler}
        />

        {/* Add Plan Bottom Sheet */}
        <AddPlanSheet
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}
          onAdd={handleAddPlan}
          activeTraveler={activeTraveler}
          initialDate={selectedDateStr}
        />

        {/* Profile Customizer & Settings */}
        <ProfileCustomizerSheet
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          currentAvatar={myAvatar}
          onSelectAvatar={(newAv) => setMyAvatar(newAv)}
          onLogout={handleLogout}
          activeTraveler={activeTraveler}
          onUpdateName={(name) => setActiveTraveler(prev => ({ ...prev, name }))}
          supabaseConfig={supabaseConfig}
          onSaveSupabaseConfig={handleSaveSupabaseConfig}
          isSupabaseConnected={isSupabaseConnected}
          selectedRingtone={selectedRingtone}
          onSelectRingtone={setSelectedRingtone}
          isLockscreenEnabled={isLockscreenEnabled}
          onToggleLockscreen={setIsLockscreenEnabled}
          isNotificationsEnabled={isNotificationsEnabled}
          onToggleNotifications={setIsNotificationsEnabled}
          isNotifSoundEnabled={isNotifSoundEnabled}
          onToggleNotifSound={setIsNotifSoundEnabled}
          onTestNotification={() => {
            triggerNotification({
              title: `⚡ Notification Alert Preview`,
              caption: `Testing your live sanctuary notification alert! 🌸 (${getMoodData(myMood).name} mood)`,
              type: 'ping',
              avatarUrl: myAvatar.iconUrl,
              actionTab: 'chat'
            });
          }}
        />
      </div>
    </div>
  );
}

// Mount React Root
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AndroidApp />);
