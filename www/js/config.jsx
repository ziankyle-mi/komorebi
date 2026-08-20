/**
 * ✦ KOMOREBI — Configuration & Constants Roster
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

// Curated Vector Mood Roster (100% Vector SVG Icons)
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

// Clean Bare Defaults
const DEFAULT_PLANS = [];
const DEFAULT_MESSAGES = [];
const DEFAULT_SNAP = null;
const DEFAULT_WHISPER = "Tap Edit to write a daily note for your partner";
const DEFAULT_SUPABASE_CONFIG = {
  url: 'https://ytupmzpfvdldnqgntqsa.supabase.co',
  key: 'sb_publishable_guFNqBfQXDKmiH9kCXPRoA_grbwdwyP'
};

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Attach to window for global scope accessibility
window.PRESET_AVATARS = PRESET_AVATARS;
window.MOOD_ROSTER = MOOD_ROSTER;
window.getMoodData = getMoodData;
window.RINGTONE_OPTIONS = RINGTONE_OPTIONS;
window.DEFAULT_PLANS = DEFAULT_PLANS;
window.DEFAULT_MESSAGES = DEFAULT_MESSAGES;
window.DEFAULT_SNAP = DEFAULT_SNAP;
window.DEFAULT_WHISPER = DEFAULT_WHISPER;
window.DEFAULT_SUPABASE_CONFIG = DEFAULT_SUPABASE_CONFIG;
window.MONTH_NAMES = MONTH_NAMES;
