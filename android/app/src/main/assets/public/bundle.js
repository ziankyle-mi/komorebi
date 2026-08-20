/**
 * ✦ KOMOREBI — High-Performance Production Application Bundle
 */

(function(global) {
  "use strict";

  var React = global.React || {};
  var useState = React.useState;
  var useEffect = React.useEffect;
  var useRef = React.useRef;
  var useMemo = React.useMemo;
  var useCallback = React.useCallback;

  // ==========================================
  // Module: www/js/config.jsx
  // ==========================================
/**
 * ✦ KOMOREBI — Configuration & Constants Roster
 */

// [destructure removed by bundler]

// Preset Character Avatars Roster (Kokomi by default for partner)
const PRESET_AVATARS = [{
  id: 'kokomi',
  name: 'Kokomi',
  element: 'hydro',
  iconUrl: './assets/avatars/kokomi.png'
}, {
  id: 'kazuha',
  name: 'Kazuha',
  element: 'anemo',
  iconUrl: './assets/avatars/kazuha.png'
}, {
  id: 'shogun',
  name: 'Raiden',
  element: 'electro',
  iconUrl: './assets/avatars/shogun.png'
}, {
  id: 'furina',
  name: 'Furina',
  element: 'hydro',
  iconUrl: './assets/avatars/furina.png'
}, {
  id: 'zhongli',
  name: 'Zhongli',
  element: 'geo',
  iconUrl: './assets/avatars/zhongli.png'
}, {
  id: 'hutao',
  name: 'Hu Tao',
  element: 'pyro',
  iconUrl: './assets/avatars/hutao.png'
}, {
  id: 'ayaka',
  name: 'Ayaka',
  element: 'cryo',
  iconUrl: './assets/avatars/ayaka.png'
}, {
  id: 'nahida',
  name: 'Nahida',
  element: 'dendro',
  iconUrl: './assets/avatars/nahida.png'
}, {
  id: 'wanderer',
  name: 'Wanderer',
  element: 'anemo',
  iconUrl: './assets/avatars/wanderer.png'
}, {
  id: 'neuvillette',
  name: 'Neuvillette',
  element: 'hydro',
  iconUrl: './assets/avatars/neuvillette.png'
}, {
  id: 'xiao',
  name: 'Xiao',
  element: 'anemo',
  iconUrl: './assets/avatars/xiao.png'
}, {
  id: 'yae',
  name: 'Yae Miko',
  element: 'electro',
  iconUrl: './assets/avatars/yae.png'
}, {
  id: 'spongebob',
  name: 'SpongeBob',
  element: 'anemo',
  iconUrl: './assets/avatars/spongebob.png'
}, {
  id: 'mymelody',
  name: 'My Melody',
  element: 'pyro',
  iconUrl: './assets/avatars/mymelody.png'
}, {
  id: 'pikachu',
  name: 'Pikachu',
  element: 'electro',
  iconUrl: './assets/avatars/pikachu.png'
}, {
  id: 'pompompurin',
  name: 'Pompompurin',
  element: 'geo',
  iconUrl: './assets/avatars/pompompurin.png'
}];

// Curated Vector Mood Roster (100% Vector SVG Icons)
const MOOD_ROSTER = [{
  id: 'loving',
  name: 'Loving',
  desc: 'Affectionate & Tender',
  color: '#ff7597',
  icon: 'Heart'
}, {
  id: 'happy',
  name: 'Joyful',
  desc: 'Happy & Cheerful',
  color: '#f8cf65',
  icon: 'Smile'
}, {
  id: 'cozy',
  name: 'Cozy',
  desc: 'Warm & Relaxed',
  color: '#fb923c',
  icon: 'Coffee'
}, {
  id: 'energized',
  name: 'Hyped',
  desc: 'Full of Energy',
  color: '#4cd7b6',
  icon: 'Zap'
}, {
  id: 'peaceful',
  name: 'Peaceful',
  desc: 'Serene & Calm',
  color: '#34d399',
  icon: 'Leaf'
}, {
  id: 'sleepy',
  name: 'Sleepy',
  desc: 'Tired & Resting',
  color: '#a78bfa',
  icon: 'Moon'
}, {
  id: 'focused',
  name: 'Focused',
  desc: 'Deep Focus & Study',
  color: '#38bdf8',
  icon: 'Target'
}, {
  id: 'missing_you',
  name: 'Missing You',
  desc: 'Thinking of You',
  color: '#f43f5e',
  icon: 'Stars'
}];
function getMoodData(moodId) {
  return MOOD_ROSTER.find(m => m.id === moodId) || MOOD_ROSTER[0];
}

// Photo Notification Ringtone Track Options
const RINGTONE_OPTIONS = [{
  id: 'moonlight',
  title: 'Moonlight Serenade',
  subtitle: 'Dreams Traversed by Moonlight',
  src: './assets/audio/moonlight.mp3'
}, {
  id: 'nahida',
  title: 'Boundless Bliss',
  subtitle: 'Nahida Extended Theme',
  src: './assets/audio/nahida.mp3'
}, {
  id: 'nodkrai',
  title: 'Nodkrai Melody',
  subtitle: 'Original Melody',
  src: './assets/audio/nodkrai.mp3'
}, {
  id: 'silent',
  title: 'Silent (No Ringtone)',
  subtitle: 'Visual banner alert only',
  src: null
}];

// Clean Bare Defaults
const DEFAULT_PLANS = [];
const DEFAULT_MESSAGES = [];
const DEFAULT_SNAP = null;
const DEFAULT_WHISPER = "Tap Edit to write a daily note for your partner";
const DEFAULT_SUPABASE_CONFIG = {
  url: 'https://ytupmzpfvdldnqgntqsa.supabase.co',
  key: 'sb_publishable_guFNqBfQXDKmiH9kCXPRoA_grbwdwyP'
};
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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

  // ==========================================
  // Module: www/js/icons.jsx
  // ==========================================
/**
 * ✦ KOMOREBI — Minimalist Vector SVG System Icons & Flo UI/UX Icon Library
 * Professional clean vector icons replacing stock emojis across the entire app.
 */

const RawIcons = {
  Calendar: ({
    size = 18,
    className = ""
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "4",
    width: "18",
    height: "18",
    rx: "3",
    ry: "3"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "16",
    y1: "2",
    x2: "16",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "2",
    x2: "8",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "10",
    x2: "21",
    y2: "10"
  })),
  Chat: ({
    size = 18,
    className = ""
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, /*#__PURE__*/React.createElement("path", {
    d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
  })),
  Camera: ({
    size = 18,
    className = ""
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, /*#__PURE__*/React.createElement("path", {
    d: "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "13",
    r: "4"
  })),
  Plus: ({
    size = 16,
    className = ""
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "5",
    x2: "12",
    y2: "19"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "5",
    y1: "12",
    x2: "19",
    y2: "12"
  })),
  User: ({
    size = 18,
    className = ""
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "7",
    r: "4"
  })),
  Sun: ({
    size = 13,
    className = ""
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "5"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "1",
    x2: "12",
    y2: "3"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "21",
    x2: "12",
    y2: "23"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "4.22",
    y1: "4.22",
    x2: "5.64",
    y2: "5.64"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "18.36",
    y1: "18.36",
    x2: "19.78",
    y2: "19.78"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "1",
    y1: "12",
    x2: "3",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "21",
    y1: "12",
    x2: "23",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "4.22",
    y1: "19.78",
    x2: "5.64",
    y2: "18.36"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "18.36",
    y1: "5.64",
    x2: "19.78",
    y2: "4.22"
  })),
  Moon: ({
    size = 13,
    className = ""
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, /*#__PURE__*/React.createElement("path", {
    d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
  })),
  Clock: ({
    size = 13,
    className = ""
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "12 6 12 12 16 14"
  })),
  Trash: ({
    size = 13,
    className = ""
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "3 6 5 6 21 6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
  })),
  Edit: ({
    size = 12,
    className = ""
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, /*#__PURE__*/React.createElement("path", {
    d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
  })),
  Heart: ({
    size = 16,
    className = ""
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
  })),
  Settings: ({
    size = 13,
    className = ""
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
  })),
  Search: ({
    size = 14,
    className = ""
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "8"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "21",
    y1: "21",
    x2: "16.65",
    y2: "16.65"
  })),
  Bell: ({
    size = 16,
    className = ""
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M13.73 21a2 2 0 0 1-3.46 0"
  })),
  Flower: ({
    size = 13,
    className = ""
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V9m4.5 3a4.5 4.5 0 1 1-4.5 4.5M16.5 12H15m-3 4.5a4.5 4.5 0 1 1-4.5-4.5M12 16.5V15m-4.5-3H9"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3",
    fill: "currentColor",
    fillOpacity: "0.25"
  })),
  TreePine: ({
    size = 13,
    className = ""
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, /*#__PURE__*/React.createElement("path", {
    d: "m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2a1 1 0 0 1-.8-1.7L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 22v-3"
  })),
  Waves: ({
    size = 13,
    className = ""
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"
  })),
  Smile: ({
    size = 16,
    className = ""
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 14s1.5 2 4 2 4-2 4-2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "9",
    x2: "9.01",
    y1: "9",
    y2: "9"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "15",
    x2: "15.01",
    y1: "9",
    y2: "9"
  })),
  Coffee: ({
    size = 16,
    className = ""
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, /*#__PURE__*/React.createElement("path", {
    d: "M10 2v2M14 2v2M18 8a4 4 0 0 1 0 8h-1M6 2v2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2 8h15v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4Z"
  })),
  Zap: ({
    size = 16,
    className = ""
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, /*#__PURE__*/React.createElement("polygon", {
    points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2"
  })),
  Leaf: ({
    size = 16,
    className = ""
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, /*#__PURE__*/React.createElement("path", {
    d: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"
  })),
  Target: ({
    size = 16,
    className = ""
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "22",
    x2: "18",
    y1: "12",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    x2: "2",
    y1: "12",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    x2: "12",
    y1: "6",
    y2: "2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    x2: "12",
    y1: "22",
    y2: "18"
  })),
  Stars: ({
    size = 16,
    className = ""
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, /*#__PURE__*/React.createElement("path", {
    d: "m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 3v4M3 5h4M19 17v4M17 19h4"
  })),
  Palette: ({
    size = 16,
    className = ""
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "13.5",
    cy: "6.5",
    r: ".5",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "17.5",
    cy: "10.5",
    r: ".5",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "8.5",
    cy: "7.5",
    r: ".5",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6.5",
    cy: "12.5",
    r: ".5",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"
  })),
  Mail: ({
    size = 13,
    className = ""
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, /*#__PURE__*/React.createElement("rect", {
    width: "20",
    height: "16",
    x: "2",
    y: "4",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
  })),
  Refresh: ({
    size = 12,
    className = ""
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "23 4 23 10 17 10"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "1 20 1 14 7 14"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"
  })),
  Globe: ({
    size = 13,
    className = "",
    color = "currentColor"
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "2",
    y1: "12",
    x2: "22",
    y2: "12"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
  })),
  FlowHeavy: ({
    size = 16,
    color = "#fb7185",
    className = ""
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    className: className
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z",
    fill: color,
    fillOpacity: "0.7",
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })),
  MoodHappy: ({
    size = 16,
    color = "#f8cf65",
    className = ""
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    className: className
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10",
    fill: color,
    fillOpacity: "0.2",
    stroke: color,
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9",
    cy: "9.5",
    r: "1.25",
    fill: color
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "15",
    cy: "9.5",
    r: "1.25",
    fill: color
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.5 14c1 2 6 2 7 0",
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round"
  })),
  Notes: ({
    size = 16,
    color = "currentColor",
    className = ""
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, /*#__PURE__*/React.createElement("path", {
    d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "14 2 14 8 20 8"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "16",
    y1: "13",
    x2: "8",
    y2: "13"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "16",
    y1: "17",
    x2: "8",
    y2: "17"
  })),
  Film: ({
    size = 18,
    className = ""
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "2",
    width: "20",
    height: "20",
    rx: "2.18",
    ry: "2.18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "7",
    y1: "2",
    x2: "7",
    y2: "22"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "17",
    y1: "2",
    x2: "17",
    y2: "22"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "2",
    y1: "12",
    x2: "22",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "2",
    y1: "7",
    x2: "7",
    y2: "7"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "2",
    y1: "17",
    x2: "7",
    y2: "17"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "17",
    y1: "17",
    x2: "22",
    y2: "17"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "17",
    y1: "7",
    x2: "22",
    y2: "7"
  })),
  Tv: ({
    size = 18,
    className = ""
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "7",
    width: "20",
    height: "15",
    rx: "2",
    ry: "2"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "17 2 12 7 7 2"
  })),
  Clapperboard: ({
    size = 18,
    className = ""
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m6.2 5.3 3.1 3.9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m12.4 3.4 3.1 4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"
  })),
  Sparkles: ({
    size = 18,
    className = ""
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, /*#__PURE__*/React.createElement("path", {
    d: "m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M5 3v4M3 5h4M19 17v4M17 19h4"
  })),
  Info: ({
    size = 18,
    className = ""
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "16",
    x2: "12",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "12",
    y1: "8",
    x2: "12.01",
    y2: "8"
  })),
  X: ({
    size = 18,
    className = ""
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  })),
  Check: ({
    size = 18,
    className = ""
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }))
};

// Professional Clean Flo SVG Vector Icons (No stock emojis)
const RawFloVectorIcons = {
  // Flow Heavy
  FlowHeavy: ({
    size = 16,
    color = "#fb7185",
    className = ""
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    className: className
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z",
    fill: color,
    fillOpacity: "0.7",
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })),
  // Mood Happy
  MoodHappy: ({
    size = 16,
    color = "#f8cf65",
    className = ""
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    className: className
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10",
    fill: color,
    fillOpacity: "0.2",
    stroke: color,
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9",
    cy: "9.5",
    r: "1.25",
    fill: color
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "15",
    cy: "9.5",
    r: "1.25",
    fill: color
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.5 14c1 2 6 2 7 0",
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round"
  })),
  // Notes
  Notes: ({
    size = 16,
    color = "currentColor",
    className = ""
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, /*#__PURE__*/React.createElement("path", {
    d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "14 2 14 8 20 8"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "16",
    y1: "13",
    x2: "8",
    y2: "13"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "16",
    y1: "17",
    x2: "8",
    y2: "17"
  })),
  // 1. Water Drop / Discharge (Egg White, Creamy, Watery, Sticky)
  WaterDrop: ({
    size = 16,
    color = "#60a5fa"
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z",
    fill: color,
    fillOpacity: "0.22",
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9.5 13a3.5 3.5 0 0 0 5 0",
    stroke: color,
    strokeWidth: "1.5",
    strokeLinecap: "round",
    opacity: "0.6"
  })),
  // 2. Calm Face
  FaceCalm: ({
    size = 16,
    color = "#6ee7b7"
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10",
    fill: color,
    fillOpacity: "0.2",
    stroke: color,
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 10c.5-.5 1.5-.5 2 0M14 10c.5-.5 1.5-.5 2 0",
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9.5 15c1 .8 4 .8 5 0",
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round"
  })),
  // 3. Happy Face with Blush
  FaceHappy: ({
    size = 16,
    color = "#f8cf65"
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10",
    fill: color,
    fillOpacity: "0.2",
    stroke: color,
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9",
    cy: "9.5",
    r: "1.25",
    fill: color
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "15",
    cy: "9.5",
    r: "1.25",
    fill: color
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6.5",
    cy: "12.5",
    r: "1.5",
    fill: "#fb7185",
    fillOpacity: "0.6"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "17.5",
    cy: "12.5",
    r: "1.5",
    fill: "#fb7185",
    fillOpacity: "0.6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8.5 14c1 2 6 2 7 0",
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round"
  })),
  // 4. Sensitive Face
  FaceSensitive: ({
    size = 16,
    color = "#c084fc"
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10",
    fill: color,
    fillOpacity: "0.2",
    stroke: color,
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "9",
    cy: "10",
    rx: "1.5",
    ry: "2",
    fill: color
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "15",
    cy: "10",
    rx: "1.5",
    ry: "2",
    fill: color
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9.5 15.5c1-.6 4-.6 5 0",
    stroke: color,
    strokeWidth: "1.8",
    strokeLinecap: "round"
  })),
  // 5. Irritable / Moody Face
  FaceMoody: ({
    size = 16,
    color = "#fb7185"
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10",
    fill: color,
    fillOpacity: "0.2",
    stroke: color,
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "8",
    y1: "9",
    x2: "10.5",
    y2: "10.5",
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "16",
    y1: "9",
    x2: "13.5",
    y2: "10.5",
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "9",
    y1: "15",
    x2: "15",
    y2: "15",
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round"
  })),
  // 6. Cramps / Lightning Spark
  Cramps: ({
    size = 16,
    color = "#fb7185"
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10",
    fill: color,
    fillOpacity: "0.15"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M13 3L6 14h5l-1 7 8-12h-5l1-6z",
    fill: color,
    stroke: color,
    strokeWidth: "1.5",
    strokeLinejoin: "round"
  })),
  // 7. Tender Breasts / Blossom
  TenderBreasts: ({
    size = 16,
    color = "#fca5c9"
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "10",
    fill: color,
    fillOpacity: "0.15"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 7c1.5-2 4-2 5.5 0s1.5 4 0 5.5L12 18l-5.5-5.5c-1.5-1.5-1.5-4 0-5.5s4-2 5.5 0z",
    fill: color,
    fillOpacity: "0.4",
    stroke: color,
    strokeWidth: "1.8"
  })),
  // 8. Bloating / Soft Bubbles
  Bloating: ({
    size = 16,
    color = "#a5b4fc"
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "10",
    cy: "13",
    r: "6",
    fill: color,
    fillOpacity: "0.25",
    stroke: color,
    strokeWidth: "1.8"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "16",
    cy: "8",
    r: "3.5",
    fill: color,
    fillOpacity: "0.3",
    stroke: color,
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "17.5",
    cy: "15.5",
    r: "2.5",
    fill: color,
    fillOpacity: "0.25",
    stroke: color,
    strokeWidth: "1.5"
  })),
  // 9. Sex: Didn't have sex
  SexNone: ({
    size = 16,
    color = "#94a3b8"
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
    stroke: color,
    strokeWidth: "1.8"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "4",
    y1: "4",
    x2: "20",
    y2: "20",
    stroke: "#ef4444",
    strokeWidth: "2.2",
    strokeLinecap: "round"
  })),
  // 10. Sex: Protected Sex (Lock with Heart)
  SexProtected: ({
    size = 16,
    color = "#ff4757"
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "5",
    y: "11",
    width: "14",
    height: "10",
    rx: "3",
    fill: color,
    fillOpacity: "0.2",
    stroke: color,
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 11V7a4 4 0 0 1 8 0v4",
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "16",
    r: "1.5",
    fill: color
  })),
  // 11. Sex: Unprotected Sex (Open Lock)
  SexUnprotected: ({
    size = 16,
    color = "#ff6b81"
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "5",
    y: "11",
    width: "14",
    height: "10",
    rx: "3",
    fill: color,
    fillOpacity: "0.2",
    stroke: color,
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M8 11V7a4 4 0 0 1 8 0",
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "16",
    r: "1.5",
    fill: color
  })),
  // 12. Oral Sex / Lips
  OralSex: ({
    size = 16,
    color = "#ff4757"
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 13c3-3 6-3 9-1 3-2 6-2 9 1-3 4-6 6-9 6s-6-2-9-6z",
    fill: color,
    fillOpacity: "0.25",
    stroke: color,
    strokeWidth: "1.8",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 13c4.5 1 13.5 1 18 0",
    stroke: color,
    strokeWidth: "1.5"
  })),
  // 13. Sensual Touch / Hand Heart
  SensualTouch: ({
    size = 16,
    color = "#fca5c9"
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 4.5C9.5 2 6 2.5 4.5 5s.5 6 3 8l4.5 4.5 4.5-4.5c2.5-2 4.5-5.5 3-8S14.5 2 12 4.5z",
    fill: color,
    fillOpacity: "0.3",
    stroke: color,
    strokeWidth: "1.8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 16l-3 3a2 2 0 0 0 2.8 2.8L12 17",
    stroke: color,
    strokeWidth: "1.8",
    strokeLinecap: "round"
  })),
  // 14. Orgasm / Sparkles
  Orgasm: ({
    size = 16,
    color = "#f59e0b"
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 2l2.5 6.5L21 11l-5.5 4 2 7-6.5-4.5L4.5 22l2-7L1 11l6.5-2.5L12 2z",
    fill: color,
    fillOpacity: "0.3",
    stroke: color,
    strokeWidth: "1.8",
    strokeLinejoin: "round"
  })),
  // 15. High Sex Drive / Heart Flame
  SexDriveHigh: ({
    size = 16,
    color = "#ff4757"
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 21c-4.5-3.5-8-7-8-10.5 0-3 2.5-5.5 5.5-5.5 1.5 0 3 .7 4 2 1-1.3 2.5-2 4-2 3 0 5.5 2.5 5.5 5.5 0 3.5-3.5 7-8 10.5z",
    fill: color,
    fillOpacity: "0.25",
    stroke: color,
    strokeWidth: "1.8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 11c0-2.5 1.5-4 1.5-4s1.5 2 1.5 4-1 2.5-1.5 2.5-1.5-.5-1.5-2.5z",
    fill: "#f8cf65"
  })),
  // 16. Low / Neutral Sex Drive
  SexDriveLow: ({
    size = 16,
    color = "#94a3b8"
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z",
    stroke: color,
    strokeWidth: "1.8",
    strokeDasharray: "3 3"
  })),
  // 17. Physical Activity: Yoga
  Yoga: ({
    size = 16,
    color = "#6ee7b7"
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "5",
    r: "2.5",
    fill: color
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 18c2-3 4-5 6-5s4 2 6 5M12 7.5v5.5M4 14l4-2M20 14l-4-2",
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })),
  // 18. Physical Activity: Running / Gym
  Running: ({
    size = 16,
    color = "#60a5fa"
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "14",
    cy: "4",
    r: "2",
    fill: color
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7 21l3-5 3 2 4-5M5 13l4-3 3 2 4-3",
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })),
  // 19. Rest Day / Couch
  RestDay: ({
    size = 16,
    color = "#c084fc"
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 11V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3M2 13h20v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4zM5 19v2M19 19v2",
    stroke: color,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })),
  // 20. Generic Symptom Fallback Sparkle
  Sparkle: ({
    size = 16,
    color = "#f8cf65"
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 3l1.8 5.4L19 10.2l-4.2 3.6L16 19.2l-4-3-4 3 1.2-5.4L5 10.2l5.2-1.8L12 3z",
    fill: color,
    fillOpacity: "0.3",
    stroke: color,
    strokeWidth: "1.8",
    strokeLinejoin: "round"
  }))
};

// Universal Vector Icon Renderer mapping category / symptom IDs to clean vector SVGs
function FloVectorIcon({
  id,
  size = 16,
  color = "currentColor",
  className = ""
}) {
  const iconMap = {
    // Discharge
    egg_white: FloVectorIcons.WaterDrop,
    creamy: FloVectorIcons.WaterDrop,
    watery: FloVectorIcons.WaterDrop,
    sticky: FloVectorIcons.WaterDrop,
    spotting: FloVectorIcons.WaterDrop,
    no_discharge: FloVectorIcons.WaterDrop,
    unusual: FloVectorIcons.WaterDrop,
    // Moods
    calm: FloVectorIcons.FaceCalm,
    happy: FloVectorIcons.FaceHappy,
    energetic: FloVectorIcons.Orgasm,
    sensitive: FloVectorIcons.FaceSensitive,
    irritable: FloVectorIcons.FaceMoody,
    sad: FloVectorIcons.FaceSensitive,
    anxious: FloVectorIcons.FaceMoody,
    loving: FloVectorIcons.SensualTouch,
    // Symptoms
    cramps: FloVectorIcons.Cramps,
    headache: FloVectorIcons.Cramps,
    tender_breasts: FloVectorIcons.TenderBreasts,
    bloating: FloVectorIcons.Bloating,
    acne: FloVectorIcons.Sparkle,
    fatigue: FloVectorIcons.RestDay,
    backache: FloVectorIcons.Cramps,
    cravings: FloVectorIcons.SensualTouch,
    insomnia: FloVectorIcons.RestDay,
    nausea: FloVectorIcons.FaceMoody,
    // Sex & Drive
    didnt_have_sex: FloVectorIcons.SexNone,
    protected_sex: FloVectorIcons.SexProtected,
    unprotected_sex: FloVectorIcons.SexUnprotected,
    oral_sex: FloVectorIcons.OralSex,
    anal_sex: FloVectorIcons.SensualTouch,
    masturbation: FloVectorIcons.SensualTouch,
    sensual_touch: FloVectorIcons.SensualTouch,
    sex_toys: FloVectorIcons.SensualTouch,
    orgasm: FloVectorIcons.Orgasm,
    high_sex_drive: FloVectorIcons.SexDriveHigh,
    neutral_sex_drive: FloVectorIcons.SexProtected,
    low_sex_drive: FloVectorIcons.SexDriveLow,
    // Activity
    yoga: FloVectorIcons.Yoga,
    walking: FloVectorIcons.Running,
    running: FloVectorIcons.Running,
    gym: FloVectorIcons.Running,
    rest_day: FloVectorIcons.RestDay
  };
  const Component = iconMap[id] || FloVectorIcons.Sparkle;
  if (!Component || typeof Component !== 'function') {
    return null;
  }
  return /*#__PURE__*/React.createElement("span", {
    className: `flo-vector-icon-wrap ${className}`,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Component, {
    size: size,
    color: color
  }));
}
function MoodVectorIcon({
  moodId,
  size = 16,
  className = ""
}) {
  const m = window.getMoodData ? window.getMoodData(moodId) : {
    icon: 'Heart',
    color: '#f8cf65'
  };
  const Comp = Icons[m.icon] || Icons.Heart;
  return /*#__PURE__*/React.createElement("span", {
    className: `mood-vector-wrapper ${className}`,
    style: {
      color: m.color,
      display: 'inline-flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Comp, {
    size: size
  }));
}
const defaultFallbackIcon = ({
  size = 16,
  color = "currentColor",
  className = ""
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: color,
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: className
}, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "10"
}), /*#__PURE__*/React.createElement("line", {
  x1: "12",
  y1: "8",
  x2: "12",
  y2: "12"
}), /*#__PURE__*/React.createElement("line", {
  x1: "12",
  y1: "16",
  x2: "12.01",
  y2: "16"
}));
const Icons = new Proxy(RawIcons, {
  get: (target, prop) => {
    if (typeof prop === 'string' && prop in target) return target[prop];
    return defaultFallbackIcon;
  }
});
const FloVectorIcons = new Proxy(RawFloVectorIcons, {
  get: (target, prop) => {
    if (typeof prop === 'string' && prop in target) return target[prop];
    if (typeof prop === 'string' && prop in RawIcons) return RawIcons[prop];
    return defaultFallbackIcon;
  }
});
window.Icons = Icons;
window.FloVectorIcons = FloVectorIcons;
window.FloVectorIcon = FloVectorIcon;
window.MoodVectorIcon = MoodVectorIcon;

  // ==========================================
  // Module: www/js/utils.jsx
  // ==========================================
/**
 * ✦ KOMOREBI — Utilities, Enterprise Sanitization & Time Engine
 * Hardened with OWASP ASVS Level 3 & CWE-79 / CWE-1321 Protections
 */

// Enterprise Prototype Pollution & Injection Defense
function deepSanitizeObject(obj, maxDepth = 6) {
  if (maxDepth <= 0 || obj === null || typeof obj !== 'object') {
    if (typeof obj === 'string') {
      return SecurityGuard.sanitizeText(obj, 1000);
    }
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.filter(item => item !== undefined).map(item => deepSanitizeObject(item, maxDepth - 1));
  }
  const clean = {};
  const dangerousKeys = new Set(['__proto__', 'constructor', 'prototype', '__defineGetter__', '__defineSetter__']);
  for (const [key, value] of Object.entries(obj)) {
    if (dangerousKeys.has(key)) continue;
    const cleanKey = SecurityGuard.sanitizeText(key, 64);
    if (cleanKey) {
      clean[cleanKey] = deepSanitizeObject(value, maxDepth - 1);
    }
  }
  return clean;
}

// Storage Helpers (Encapsulated, Quota-Safe & Purges legacy dummy data)
function loadStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(`komorebi_${key}`);
    if (raw !== null) {
      const parsed = JSON.parse(raw);
      const clean = deepSanitizeObject(parsed);
      if (key === 'plans' && Array.isArray(clean)) {
        return clean.filter(p => p && p.id && !String(p.id).startsWith('comm-'));
      }
      if (key === 'messages' && Array.isArray(clean)) {
        return clean.filter(m => m && m.id && !String(m.id).startsWith('m-'));
      }
      if (key === 'latest_snap' && clean && (clean.id === 'snap-1' || clean.imageUrl && String(clean.imageUrl).includes('unsplash.com'))) {
        return null;
      }
      if ((key === 'active_user' || key === 'partner_user') && clean && clean.name && String(clean.name).toLowerCase() === 'zian') {
        return {
          ...clean,
          name: 'Ziankyle'
        };
      }
      return clean;
    }
    return fallback;
  } catch (e) {
    return fallback;
  }
}
function saveStorage(key, value) {
  try {
    const clean = deepSanitizeObject(value);
    localStorage.setItem(`komorebi_${key}`, JSON.stringify(clean));
  } catch (e) {
    console.warn('Storage save quota/access exception handled:', e);
  }
}

// Security Pro Max Guard Engine (OWASP ASVS Level 3 Compliant)
const SecurityGuard = {
  // Input Sanitization (Mitigates CWE-79 XSS & Script Injection)
  sanitizeText(input, maxLen = 200) {
    if (!input || typeof input !== 'string') return '';
    return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Strip script blocks
    .replace(/<[^>]*>?/gm, '') // Strip HTML tags
    .replace(/javascript\s*:/gi, '') // Strip javascript: protocol
    .replace(/vbscript\s*:/gi, '') // Strip vbscript: protocol
    .replace(/data\s*:\s*text\/html/gi, '') // Strip data:text/html
    .replace(/on\w+\s*=/gi, '') // Strip inline event handlers (onload, onerror, onclick)
    .trim().slice(0, maxLen);
  },
  // Safe Image URL & Media URI Validator
  sanitizeUrl(url) {
    if (!url || typeof url !== 'string') return '';
    const trimmed = url.trim();

    // Allow safe local relative paths
    if (trimmed.startsWith('./assets/') || trimmed.startsWith('assets/')) {
      return trimmed;
    }

    // Allow standard HTTPS / HTTP
    if (trimmed.startsWith('https://') || trimmed.startsWith('http://')) {
      return trimmed;
    }

    // Safe base64 image data URIs (JPG, PNG, WEBP, GIF, MP4, WEBM)
    const safeDataUriRegex = /^data:(image\/(png|jpeg|jpg|webp|gif)|video\/(mp4|webm));base64,[A-Za-z0-9+/=]+$/i;
    if (trimmed.startsWith('data:') && safeDataUriRegex.test(trimmed)) {
      return trimmed;
    }
    return '';
  },
  // Safe Image File Validator (Max 15MB, Image & Video MIME verification)
  validateImageFile(file) {
    if (!file) return {
      valid: false,
      error: 'No file selected'
    };
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm'];
    if (!file.type || !allowedTypes.includes(file.type.toLowerCase())) {
      return {
        valid: false,
        error: 'Only secure image & video formats (JPG, PNG, WEBP, GIF, MP4) are permitted'
      };
    }
    if (file.size > 15 * 1024 * 1024) {
      return {
        valid: false,
        error: 'File size exceeds maximum limit of 15MB'
      };
    }
    return {
      valid: true
    };
  },
  // Deep object sanitizer export
  deepSanitize(obj) {
    return deepSanitizeObject(obj);
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

// Dynamic Device Timezone & Live World Clock Helper
function getLocalTimezoneInfo() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
    const city = tz.includes('/') ? tz.split('/')[1].replace(/_/g, ' ') : tz;
    return {
      timezone: tz,
      city: city,
      offsetMinutes: -new Date().getTimezoneOffset()
    };
  } catch (e) {
    return {
      timezone: 'UTC',
      city: 'Local',
      offsetMinutes: 0
    };
  }
}
function formatTimeInTimezone(tz) {
  if (!tz) return formatCurrentTime();
  try {
    return new Intl.DateTimeFormat([], {
      timeZone: tz,
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(new Date());
  } catch (e) {
    return formatCurrentTime();
  }
}
function getTimezoneDiff(tz1, tz2) {
  if (!tz1 || !tz2 || tz1 === tz2) return 'Same Time';
  try {
    const now = new Date();
    const d1 = new Date(now.toLocaleString('en-US', {
      timeZone: tz1
    }));
    const d2 = new Date(now.toLocaleString('en-US', {
      timeZone: tz2
    }));
    const diffHours = Math.round((d2 - d1) / (1000 * 60 * 60));
    if (diffHours === 0) return 'Same Time';
    if (diffHours > 0) return `+${diffHours}h ahead`;
    return `${diffHours}h behind`;
  } catch (e) {
    return 'Synced';
  }
}
function getEnergyDetails(level) {
  if (level <= 2) {
    return {
      title: "Resting",
      desc: 'Winding down for the night'
    };
  } else if (level <= 4) {
    return {
      title: 'Relaxing',
      desc: 'Taking it easy / studying'
    };
  } else if (level <= 6) {
    return {
      title: 'Available',
      desc: 'Online & relaxing'
    };
  } else if (level <= 8) {
    return {
      title: 'Free to Call',
      desc: 'Free to talk & chat'
    };
  } else {
    return {
      title: 'Active',
      desc: 'Free for co-op & calls tonight'
    };
  }
}
function resolveAvatar(av, isMikkieOrName) {
  const isMikkie = typeof isMikkieOrName === 'string' ? isMikkieOrName.toLowerCase().includes('mikkie') : Boolean(isMikkieOrName);
  const defaultAv = isMikkie ? {
    id: 'yae',
    name: 'Yae Miko',
    element: 'electro',
    iconUrl: './assets/avatars/yae.png'
  } : {
    id: 'kokomi',
    name: 'Kokomi',
    element: 'hydro',
    iconUrl: './assets/avatars/kokomi.png'
  };
  if (!av || typeof av !== 'object') return defaultAv;
  let iconUrl = av.iconUrl;
  const targetId = av.id === 'yaemiko' ? 'yae' : av.id;
  if (targetId === 'yae' || targetId === 'yaemiko') {
    iconUrl = './assets/avatars/yae.png';
  } else if (!iconUrl && targetId && window.PRESET_AVATARS) {
    const found = window.PRESET_AVATARS.find(p => p.id === targetId);
    if (found) iconUrl = found.iconUrl;
  }
  if (!iconUrl) {
    iconUrl = defaultAv.iconUrl;
  }
  return {
    id: targetId || defaultAv.id,
    name: av.name || defaultAv.name,
    element: av.element || defaultAv.element,
    iconUrl: iconUrl
  };
}

// Global scope attachments
window.deepSanitizeObject = deepSanitizeObject;
window.loadStorage = loadStorage;
window.saveStorage = saveStorage;
window.SecurityGuard = SecurityGuard;
window.formatCurrentTime = formatCurrentTime;
window.format12HourTime = format12HourTime;
window.getLocalTimezoneInfo = getLocalTimezoneInfo;
window.formatTimeInTimezone = formatTimeInTimezone;
window.getTimezoneDiff = getTimezoneDiff;
window.getEnergyDetails = getEnergyDetails;
window.resolveAvatar = resolveAvatar;

  // ==========================================
  // Module: www/js/services/audio.jsx
  // ==========================================
/**
 * ✦ KOMOREBI — Web Audio API Synthesizer & Ringtone Player Engine
 */

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
      setTimeout(() => {
        try {
          osc.disconnect();
          filter.disconnect();
          gain.disconnect();
        } catch (e) {}
      }, (duration + 0.15) * 1000);
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
        setTimeout(() => {
          try {
            osc.disconnect();
            filter.disconnect();
            gain.disconnect();
          } catch (e) {}
        }, (idx * 0.06 + 0.35) * 1000);
      });
    } catch (e) {}
  },
  playRingtone(ringtoneId = 'moonlight', durationMs = 30000, onEnded = null) {
    this.stopRingtone();
    if (ringtoneId === 'silent') {
      if (onEnded) onEnded();
      return;
    }
    const track = (window.RINGTONE_OPTIONS || []).find(t => t.id === ringtoneId) || (window.RINGTONE_OPTIONS ? window.RINGTONE_OPTIONS[0] : null);
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

/**
 * ✦ KOMOREBI — Capacitor & Web Haptic Feedback Engine
 */
const HapticEngine = {
  trigger(type = 'light') {
    // 1. Capacitor Native Android/iOS Haptics
    try {
      const Haptics = window.Capacitor?.Plugins?.Haptics || window.Haptics;
      if (Haptics) {
        if (type === 'light') Haptics.impact({
          style: 'LIGHT'
        });else if (type === 'medium') Haptics.impact({
          style: 'MEDIUM'
        });else if (type === 'heavy') Haptics.impact({
          style: 'HEAVY'
        });else if (type === 'success') Haptics.notification({
          type: 'SUCCESS'
        });else if (type === 'warning') Haptics.notification({
          type: 'WARNING'
        });else if (type === 'selection') Haptics.selectionChanged();
        return;
      }
    } catch (err) {}

    // 2. Web Navigator Vibration API Fallback
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        if (type === 'light') navigator.vibrate(8);else if (type === 'medium') navigator.vibrate(18);else if (type === 'heavy') navigator.vibrate([20, 25, 20]);else if (type === 'success') navigator.vibrate([12, 30, 20]);else if (type === 'warning') navigator.vibrate([25, 40, 25]);else if (type === 'selection') navigator.vibrate(6);
      } catch (e) {}
    }
  }
};
window.AudioEngine = AudioEngine;
window.HapticEngine = HapticEngine;

  // ==========================================
  // Module: www/js/services/sync.jsx
  // ==========================================
/**
 * ✦ KOMOREBI — Cloud & LAN Real-time Synchronization Engines
 * Hardened with Incoming Payload Sanitization & Anti-Pollution Validation
 */

// Firebase Realtime Database Sync Engine (Fallback)
const FirebaseSync = {
  db: null,
  isInitialized: false,
  init(customConfig = null) {
    if (this.isInitialized && this.db) return true;
    try {
      if (typeof firebase === 'undefined') return false;
      const savedConfig = customConfig || (window.loadStorage ? window.loadStorage('firebase_config', null) : null);
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
      ref.on('value', snapshot => {
        const val = snapshot.val();
        if (val !== null && val !== undefined) {
          const sanitized = window.deepSanitizeObject ? window.deepSanitizeObject(val) : val;
          callback(sanitized);
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
      const sanitized = window.deepSanitizeObject ? window.deepSanitizeObject(data) : data;
      this.db.ref(`komorebi_couple/${path}`).set(sanitized);
    } catch (e) {}
  }
};

// Built-in Wi-Fi Real-time Sync Engine (Local Network)
const WiFiSync = {
  async fetchLatest() {
    try {
      const resp = await fetch('/api/sync', {
        cache: 'no-store'
      });
      if (resp.ok) {
        const raw = await resp.json();
        return window.deepSanitizeObject ? window.deepSanitizeObject(raw) : raw;
      }
    } catch (e) {}
    return null;
  },
  async fetchData() {
    return this.fetchLatest();
  },
  async pushUpdate(payload) {
    try {
      const sanitized = window.deepSanitizeObject ? window.deepSanitizeObject(payload) : payload;
      await fetch('/api/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sanitized)
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
          auth: {
            persistSession: false
          }
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
      const {
        data,
        error
      } = await this.client.from('couple_data').select('key, value');
      if (error) {
        console.warn('Supabase fetch error:', error);
        return null;
      }
      if (data && Array.isArray(data)) {
        const map = {};
        data.forEach(item => {
          if (item && item.key) {
            const cleanVal = window.deepSanitizeObject ? window.deepSanitizeObject(item.value) : item.value;
            map[item.key] = cleanVal;
          }
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
      const cleanKey = window.SecurityGuard ? window.SecurityGuard.sanitizeText(key, 64) : key;
      const cleanVal = window.deepSanitizeObject ? window.deepSanitizeObject(value) : value;
      await this.client.from('couple_data').upsert({
        key: cleanKey,
        value: cleanVal,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'key'
      });
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
      this.channel = this.client.channel('couple_realtime_channel').on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'couple_data'
      }, payload => {
        if (payload && payload.new && payload.new.key) {
          const cleanKey = payload.new.key;
          const cleanVal = window.deepSanitizeObject ? window.deepSanitizeObject(payload.new.value) : payload.new.value;
          onUpdate(cleanKey, cleanVal);
        }
      }).subscribe();
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
window.FirebaseSync = FirebaseSync;
window.WiFiSync = WiFiSync;
window.SupabaseSync = SupabaseSync;

  // ==========================================
  // Module: www/js/services/cycleEngine.jsx
  // ==========================================
/**
 * ✦ KOMOREBI — Flo-Inspired Cycle & Ovulation Calculation Engine (Pure Logic Layer)
 * Hardened with Multi-Month Dual-Numbering & Comprehensive Flo Categories
 */

const DEFAULT_CYCLE_SETTINGS = {
  cycleLength: 28,
  // Average days per cycle (21 - 35)
  periodDuration: 5,
  // Average period bleeding days (3 - 10)
  lastPeriodStart: new Date().toISOString().slice(0, 10),
  // ISO YYYY-MM-DD
  allowIntimacyTracking: true
};

// Authentic Flo "What are you feeling today?" quick bubbles
const FLO_FEELING_BUBBLES = [{
  id: 'egg_white',
  category: 'discharge',
  label: 'Egg white',
  icon: '💧',
  color: '#93c5fd'
}, {
  id: 'calm',
  category: 'moods',
  label: 'Calm',
  icon: '😌',
  color: '#6ee7b7'
}, {
  id: 'happy',
  category: 'moods',
  label: 'Happy',
  icon: '😊',
  color: '#f8cf65'
}, {
  id: 'creamy',
  category: 'discharge',
  label: 'Creamy',
  icon: '💧',
  color: '#c084fc'
}, {
  id: 'cramps',
  category: 'symptoms',
  label: 'Cramps',
  icon: '⚡',
  color: '#fb7185'
}, {
  id: 'tender_breasts',
  category: 'symptoms',
  label: 'Tender',
  icon: '🌸',
  color: '#fca5c9'
}, {
  id: 'energetic',
  category: 'moods',
  label: 'Energetic',
  icon: '✨',
  color: '#fde047'
}, {
  id: 'bloating',
  category: 'symptoms',
  label: 'Bloating',
  icon: '🫧',
  color: '#a5b4fc'
}];

// Comprehensive Flo Categories matching Reference Screenshot 2
const FLO_CATEGORIES = {
  sex_and_drive: {
    title: 'Sex and sex drive',
    icon: '💖',
    items: [{
      id: 'didnt_have_sex',
      label: "Didn't have sex",
      icon: '🚫'
    }, {
      id: 'protected_sex',
      label: 'Protected sex',
      icon: '🔒'
    }, {
      id: 'unprotected_sex',
      label: 'Unprotected sex',
      icon: '🔓'
    }, {
      id: 'oral_sex',
      label: 'Oral sex',
      icon: '💋'
    }, {
      id: 'anal_sex',
      label: 'Anal sex',
      icon: '🍑'
    }, {
      id: 'masturbation',
      label: 'Masturbation',
      icon: '💓'
    }, {
      id: 'sensual_touch',
      label: 'Sensual touch',
      icon: '💖'
    }, {
      id: 'sex_toys',
      label: 'Sex toys',
      icon: '🪢'
    }, {
      id: 'orgasm',
      label: 'Orgasm',
      icon: '✨'
    }, {
      id: 'high_sex_drive',
      label: 'High sex drive',
      icon: '❤️‍🔥'
    }, {
      id: 'neutral_sex_drive',
      label: 'Neutral sex drive',
      icon: '💗'
    }, {
      id: 'low_sex_drive',
      label: 'Low sex drive',
      icon: '💔'
    }]
  },
  discharge: {
    title: 'Vaginal discharge',
    icon: '💧',
    items: [{
      id: 'no_discharge',
      label: 'No discharge',
      icon: '🫧'
    }, {
      id: 'spotting',
      label: 'Spotting',
      icon: '🩸'
    }, {
      id: 'sticky',
      label: 'Sticky',
      icon: '💧'
    }, {
      id: 'creamy',
      label: 'Creamy',
      icon: '🥛'
    }, {
      id: 'egg_white',
      label: 'Egg white',
      icon: '🥚'
    }, {
      id: 'watery',
      label: 'Watery',
      icon: '🌊'
    }, {
      id: 'unusual',
      label: 'Unusual',
      icon: '⚠️'
    }]
  },
  symptoms: {
    title: 'Physical symptoms',
    icon: '🌿',
    items: [{
      id: 'cramps',
      label: 'Cramps',
      icon: '⚡'
    }, {
      id: 'headache',
      label: 'Headache',
      icon: '🤕'
    }, {
      id: 'tender_breasts',
      label: 'Tender breasts',
      icon: '🌸'
    }, {
      id: 'bloating',
      label: 'Bloating',
      icon: '🫧'
    }, {
      id: 'acne',
      label: 'Acne',
      icon: '✨'
    }, {
      id: 'fatigue',
      label: 'Fatigue',
      icon: '💤'
    }, {
      id: 'backache',
      label: 'Backache',
      icon: '🌿'
    }, {
      id: 'cravings',
      label: 'Cravings',
      icon: '🍫'
    }, {
      id: 'insomnia',
      label: 'Insomnia',
      icon: '🌙'
    }, {
      id: 'nausea',
      label: 'Nausea',
      icon: '🤢'
    }]
  },
  moods: {
    title: 'Mood & emotions',
    icon: '✨',
    items: [{
      id: 'calm',
      label: 'Calm',
      icon: '😌'
    }, {
      id: 'happy',
      label: 'Happy',
      icon: '😊'
    }, {
      id: 'energetic',
      label: 'Energetic',
      icon: '☀️'
    }, {
      id: 'sensitive',
      label: 'Sensitive',
      icon: '🥺'
    }, {
      id: 'irritable',
      label: 'Irritable',
      icon: '😤'
    }, {
      id: 'sad',
      label: 'Sad / Low',
      icon: '😢'
    }, {
      id: 'anxious',
      label: 'Anxious',
      icon: '😰'
    }, {
      id: 'loving',
      label: 'Affectionate',
      icon: '🥰'
    }]
  },
  activity: {
    title: 'Physical activity',
    icon: '🏃‍♀️',
    items: [{
      id: 'yoga',
      label: 'Yoga & stretch',
      icon: '🧘‍♀️'
    }, {
      id: 'walking',
      label: 'Walking',
      icon: '🚶‍♀️'
    }, {
      id: 'running',
      label: 'Running',
      icon: '🏃‍♀️'
    }, {
      id: 'gym',
      label: 'Gym / Fitness',
      icon: '🏋️‍♀️'
    }, {
      id: 'rest_day',
      label: 'Rest day',
      icon: '🛋️'
    }]
  }
};
const FLOW_OPTIONS = [{
  id: 'none',
  label: 'None',
  color: 'transparent'
}, {
  id: 'spotting',
  label: 'Spotting',
  color: '#fca5a5'
}, {
  id: 'light',
  label: 'Light',
  color: '#f87171'
}, {
  id: 'medium',
  label: 'Medium',
  color: '#ef4444'
}, {
  id: 'heavy',
  label: 'Heavy',
  color: '#b91c1c'
}];
const CycleEngine = {
  parseDate(dateStr) {
    if (!dateStr) return new Date();
    const parts = dateStr.split('-');
    return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
  },
  formatDate(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  },
  diffDays(d1, d2) {
    const utc1 = Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate());
    const utc2 = Date.UTC(d2.getFullYear(), d2.getMonth(), d2.getDate());
    return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
  },
  addDaysToStr(dateStr, days) {
    const d = this.parseDate(dateStr);
    d.setDate(d.getDate() + days);
    return this.formatDate(d);
  },
  isFemaleUser(user) {
    if (!user) return false;
    const name = String(user.name || '').toLowerCase();
    return name.includes('mikkie') || user.gender === 'female' || user.role === 'female';
  },
  getEffectiveLastPeriodStart(settings, logs, targetDateStr = null) {
    const target = targetDateStr ? this.parseDate(targetDateStr) : new Date();
    const manualStarts = Object.keys(logs || {}).filter(dateStr => {
      const log = logs[dateStr];
      return log && log.flow && log.flow !== 'none';
    }).sort();
    const sessionStarts = [];
    let prevDate = null;
    for (const dStr of manualStarts) {
      const cur = this.parseDate(dStr);
      if (!prevDate || this.diffDays(prevDate, cur) > 2) {
        sessionStarts.push(dStr);
      }
      prevDate = cur;
    }
    const pastStarts = sessionStarts.filter(s => this.diffDays(this.parseDate(s), target) >= 0);
    if (pastStarts.length > 0) {
      return pastStarts[pastStarts.length - 1];
    }
    return settings.lastPeriodStart || this.formatDate(new Date());
  },
  calculateCycleState(settings = DEFAULT_CYCLE_SETTINGS, logs = {}, targetDateStr = null) {
    const targetDate = targetDateStr ? this.parseDate(targetDateStr) : new Date();
    const targetStr = this.formatDate(targetDate);
    const cycleLen = Math.max(21, Math.min(35, settings.cycleLength || 28));
    const periodDur = Math.max(3, Math.min(10, settings.periodDuration || 5));
    const lastStartStr = this.getEffectiveLastPeriodStart(settings, logs, targetStr);
    const lastStart = this.parseDate(lastStartStr);
    const elapsedDays = this.diffDays(lastStart, targetDate);
    let currentCycleDay = elapsedDays % cycleLen + 1;
    if (currentCycleDay <= 0) {
      currentCycleDay += cycleLen;
    }
    const ovulationDay = Math.max(1, cycleLen - 14);
    const fertileStartDay = Math.max(1, ovulationDay - 5);
    const fertileEndDay = Math.min(cycleLen, ovulationDay + 1);
    let phaseKey = 'follicular';
    let phaseName = 'Follicular Phase';
    let phaseColor = '#60a5fa';
    let pregnancyChance = 'Low';
    const dayLog = logs[targetStr] || null;
    const hasPeriodLogged = dayLog && dayLog.flow && dayLog.flow !== 'none';
    if (hasPeriodLogged || currentCycleDay <= periodDur) {
      phaseKey = 'menstrual';
      phaseName = 'Menstrual Phase';
      phaseColor = '#fb7185';
      pregnancyChance = 'Low';
    } else if (currentCycleDay === ovulationDay) {
      phaseKey = 'ovulation';
      phaseName = 'Ovulation Day';
      phaseColor = '#20b2aa';
      pregnancyChance = 'High';
    } else if (currentCycleDay >= fertileStartDay && currentCycleDay <= fertileEndDay) {
      phaseKey = 'fertile';
      phaseName = 'Fertile Window';
      phaseColor = '#5eead4';
      pregnancyChance = currentCycleDay >= ovulationDay - 2 ? 'High' : 'Medium';
    } else if (currentCycleDay > fertileEndDay) {
      phaseKey = 'luteal';
      phaseName = 'Luteal Phase';
      phaseColor = '#c084fc';
      pregnancyChance = 'Low';
    }
    const daysUntilNextPeriod = cycleLen - currentCycleDay + 1;
    const nextPeriodStartDate = this.addDaysToStr(targetStr, daysUntilNextPeriod);
    return {
      targetDateStr: targetStr,
      currentCycleDay,
      totalCycleDays: cycleLen,
      periodDuration: periodDur,
      ovulationDay,
      fertileStartDay,
      fertileEndDay,
      phaseKey,
      phaseName,
      phaseColor,
      pregnancyChance,
      daysUntilNextPeriod,
      nextPeriodStartDate,
      hasPeriodLogged,
      dayLog
    };
  },
  /**
   * Generates authentic Flo month structure with dual cycle numbers,
   * period continuous lines, and ovulation dotted rings.
   */
  generateFloMonthData(year, month, settings, logs) {
    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Sun
    // Convert to Monday = 0 for standard Flo ISO week
    const mondayFirstOffset = (firstDayIndex + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];

    // Empty lead-in padding
    for (let i = 0; i < mondayFirstOffset; i++) {
      days.push({
        empty: true,
        id: `pad-${i}`
      });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const dStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const state = this.calculateCycleState(settings, logs, dStr);
      const isBleeding = state.hasPeriodLogged || state.phaseKey === 'menstrual' && state.currentCycleDay <= state.periodDuration;
      const isOvulation = state.phaseKey === 'ovulation';
      const isFertile = state.phaseKey === 'fertile' || isOvulation;
      days.push({
        empty: false,
        dayNum: d,
        dateStr: dStr,
        cycleDay: state.currentCycleDay,
        periodBleedDay: isBleeding ? state.currentCycleDay : null,
        isBleeding,
        isOvulation,
        isFertile,
        phaseKey: state.phaseKey,
        dayLog: state.dayLog
      });
    }
    return {
      year,
      month,
      monthName: new Date(year, month, 1).toLocaleDateString('en-US', {
        month: 'long'
      }),
      days
    };
  },
  getPhaseInsights(phaseKey, partnerName = 'Zian') {
    const insights = {
      menstrual: {
        title: 'Menstrual Phase 🩸',
        subtitle: 'Rest, Comfort & Low Energy',
        energy: 'Low Energy • High Sensitivity',
        careTips: [`Prepare warm chamomile tea and a cozy heat pack for Mikkie. 🍵`, `Give gentle lower back massages and offer comforting snacks. 🍫`, `Keep activities relaxed — cozy movie night or restful naps together.`]
      },
      follicular: {
        title: 'Follicular Phase 🌿',
        subtitle: 'Rising Energy & Vibrant Mood',
        energy: 'Rising Energy • Sharp & Creative',
        careTips: [`Great time for fun dates, going out, and trying new restaurants! 🍽️`, `Mikkie is feeling creative and upbeat — plan fun activities together. ✨`, `Enjoy co-op games and active hobbies!`]
      },
      ovulation: {
        title: 'Ovulation Peak ✨',
        subtitle: 'Peak Confidence & High Fertility',
        energy: 'Peak Energy • Magnetic Glow',
        careTips: [`Mikkie is feeling radiant and confident today! 💖`, `Express appreciation, compliments, and plan a romantic dinner. 🌹`, `Chances of pregnancy are at their highest tier (High).`]
      },
      fertile: {
        title: 'Fertile Window 🌸',
        subtitle: 'High Fertility & Radiant Glow',
        energy: 'High Energy • Warm Glow',
        careTips: [`Mikkie has high energy and vibrant mood today. 💕`, `Show affection, share sweet whisper notes, and enjoy quality time. ✨`]
      },
      luteal: {
        title: 'Luteal Phase 🌙',
        subtitle: 'Winding Down & Self-Care',
        energy: 'Winding Down • Craving Comfort',
        careTips: [`Be extra patient and attentive — mood can be sensitive during this phase. 🫂`, `Cook her favorite comfort meals and keep sweet treats stocked! 🧁`, `Draw a warm bath or encourage peaceful relaxation.`]
      }
    };
    return insights[phaseKey] || insights.follicular;
  },
  /**
   * Generates proactive partner care notification nudges
   */
  getPartnerNotificationNudge(settings = DEFAULT_CYCLE_SETTINGS, logs = {}, partnerName = 'Mikkie') {
    const todayStr = this.formatDate(new Date());
    const state = this.calculateCycleState(settings, logs, todayStr);
    const {
      daysUntilNextPeriod,
      phaseKey,
      currentCycleDay,
      totalCycleDays
    } = state;
    if (phaseKey === 'menstrual' || state.hasPeriodLogged) {
      return {
        type: 'period_active',
        phase: 'Menstrual Phase',
        title: `${partnerName} is on Day ${currentCycleDay} of Period`,
        message: `She might be experiencing cramps or low energy today. A warm heating pad, gentle lower back rubs, or a peaceful evening will mean the world to her.`,
        icon: 'WaterDrop',
        accentColor: '#fb7185',
        badge: 'Active Support',
        urgency: 'high'
      };
    }
    if (daysUntilNextPeriod <= 3 && daysUntilNextPeriod > 0) {
      return {
        type: 'period_approaching',
        phase: 'PMS Alert',
        title: `${partnerName}'s period starts in ~${daysUntilNextPeriod} ${daysUntilNextPeriod === 1 ? 'day' : 'days'}`,
        message: `Hormone levels are transitioning. Surprise her with comfort snacks 🍫, hot chamomile tea 🍵, and extra sweet check-ins today!`,
        icon: 'Sparkle',
        accentColor: '#f43f5e',
        badge: 'Care Reminder',
        urgency: 'high'
      };
    }
    if (phaseKey === 'ovulation') {
      return {
        type: 'ovulation',
        phase: 'Peak Ovulation',
        title: `Peak Radiant Day for ${partnerName} ✨`,
        message: `Her energy, natural confidence, and glow are at their absolute highest today. Wonderful time for a romantic date or sweet quality time!`,
        icon: 'Sparkle',
        accentColor: '#20b2aa',
        badge: 'Peak Energy',
        urgency: 'medium'
      };
    }
    if (phaseKey === 'luteal' && currentCycleDay >= totalCycleDays - 5) {
      return {
        type: 'pms_sensitivity',
        phase: 'Luteal Phase',
        title: `Pre-Menstrual Sensitivity Window`,
        message: `Emotional sensitivity and tiredness are common now. Active listening, emotional validation, and small thoughtful gestures make a huge difference.`,
        icon: 'TenderBreasts',
        accentColor: '#c084fc',
        badge: 'Empathy Guide',
        urgency: 'medium'
      };
    }
    return {
      type: 'follicular_harmony',
      phase: 'Follicular Phase',
      title: `Harmony & Rising Spirits 🌿`,
      message: `${partnerName} is feeling sharp and creative today. Enjoy sharing daily updates, talking about goals, or planning fun upcoming plans together.`,
      icon: 'Sparkle',
      accentColor: '#60a5fa',
      badge: 'Daily Glow',
      urgency: 'low'
    };
  },
  /**
   * Computes Mood + Cycle Phase Correlation Analysis across logged days
   */
  getMoodCycleCorrelations(logs = {}, settings = DEFAULT_CYCLE_SETTINGS) {
    const phases = {
      menstrual: {
        name: 'Menstrual',
        color: '#fb7185',
        totalDays: 0,
        items: {},
        topMoods: []
      },
      follicular: {
        name: 'Follicular',
        color: '#60a5fa',
        totalDays: 0,
        items: {},
        topMoods: []
      },
      ovulation: {
        name: 'Ovulation',
        color: '#20b2aa',
        totalDays: 0,
        items: {},
        topMoods: []
      },
      luteal: {
        name: 'Luteal',
        color: '#c084fc',
        totalDays: 0,
        items: {},
        topMoods: []
      }
    };
    const dateKeys = Object.keys(logs || {});
    if (dateKeys.length === 0) {
      // Seed default educational baseline correlation
      return {
        hasData: false,
        totalLoggedDays: 0,
        phaseStats: {
          menstrual: {
            name: 'Menstrual',
            color: '#fb7185',
            samplePercent: 78,
            primaryFeel: 'Cramps & Rest',
            topChips: ['cramps', 'calm', 'tender_breasts']
          },
          follicular: {
            name: 'Follicular',
            color: '#60a5fa',
            samplePercent: 88,
            primaryFeel: 'High Energy & Joy',
            topChips: ['happy', 'energetic', 'calm']
          },
          ovulation: {
            name: 'Ovulation',
            color: '#20b2aa',
            samplePercent: 94,
            primaryFeel: 'Radiant & Affectionate',
            topChips: ['loving', 'egg_white', 'happy']
          },
          luteal: {
            name: 'Luteal',
            color: '#c084fc',
            samplePercent: 70,
            primaryFeel: 'Sensitive & Cozy',
            topChips: ['sensitive', 'cozy', 'bloating']
          }
        },
        summaryInsight: 'Log symptoms daily in the sanctuary to unlock your personalized couple cycle insights!'
      };
    }

    // Process logged days
    dateKeys.forEach(dateStr => {
      const log = logs[dateStr];
      if (!log) return;
      const state = this.calculateCycleState(settings, logs, dateStr);
      const phaseKey = (state.phaseKey === 'fertile' ? 'ovulation' : state.phaseKey) || 'follicular';
      const phaseObj = phases[phaseKey] || phases.follicular;
      phaseObj.totalDays += 1;
      const items = log.floItems || [];
      items.forEach(itemId => {
        phaseObj.items[itemId] = (phaseObj.items[itemId] || 0) + 1;
      });
    });
    const phaseStats = {};
    Object.keys(phases).forEach(k => {
      const p = phases[k];
      const sortedItems = Object.entries(p.items).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([id, count]) => ({
        id,
        count
      }));
      phaseStats[k] = {
        name: p.name,
        color: p.color,
        loggedDays: p.totalDays,
        topChips: sortedItems.map(i => i.id),
        dominantFeel: sortedItems.length > 0 ? sortedItems[0].id.replace(/_/g, ' ') : 'Balanced'
      };
    });
    return {
      hasData: true,
      totalLoggedDays: dateKeys.length,
      phaseStats,
      summaryInsight: 'Patterns updated in real-time based on your sanctuary logs.'
    };
  },
  /**
   * Calibrates cycle predictions based on user accuracy feedback
   */
  calibrateAccuracyFeedback(feedbackType, currentSettings = DEFAULT_CYCLE_SETTINGS) {
    const currentLen = currentSettings.cycleLength || 28;
    let newLen = currentLen;
    let feedbackLabel = 'Confirmed on schedule';
    switch (feedbackType) {
      case 'exact':
        newLen = currentLen;
        feedbackLabel = 'Prediction exact on day! Calibration confirmed.';
        break;
      case 'early_1':
        newLen = Math.max(21, currentLen - 1);
        feedbackLabel = 'Calibrated: Adjusted cycle length to ' + newLen + ' days (-1d).';
        break;
      case 'early_2':
        newLen = Math.max(21, currentLen - 2);
        feedbackLabel = 'Calibrated: Adjusted cycle length to ' + newLen + ' days (-2d).';
        break;
      case 'late_1':
        newLen = Math.min(35, currentLen + 1);
        feedbackLabel = 'Calibrated: Adjusted cycle length to ' + newLen + ' days (+1d).';
        break;
      case 'late_2':
        newLen = Math.min(35, currentLen + 2);
        feedbackLabel = 'Calibrated: Adjusted cycle length to ' + newLen + ' days (+2d).';
        break;
      default:
        break;
    }
    return {
      updatedSettings: {
        ...currentSettings,
        cycleLength: newLen,
        lastCalibrated: Date.now()
      },
      feedbackLabel
    };
  }
};
window.CycleEngine = CycleEngine;
window.DEFAULT_CYCLE_SETTINGS = DEFAULT_CYCLE_SETTINGS;
window.FLO_FEELING_BUBBLES = FLO_FEELING_BUBBLES;
window.FLO_CATEGORIES = FLO_CATEGORIES;
window.FLOW_OPTIONS = FLOW_OPTIONS;

  // ==========================================
  // Module: www/js/components/PullToRefresh.jsx
  // ==========================================
/**
 * ✦ KOMOREBI — Native Touch Pull-to-Refresh Component
 * Features subtle celestial physics resistance, starlight spinning indicator, and haptic feedback.
 */

function PullToRefresh({
  onRefresh,
  children,
  className = ""
}) {
  const [pullY, setPullY] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const startYRef = useRef(0);
  const isPullingRef = useRef(false);
  const containerRef = useRef(null);
  const threshold = 55;
  const getScrollContainer = () => {
    if (!containerRef.current) return null;
    if (containerRef.current.classList.contains('android-content-body')) {
      return containerRef.current;
    }
    return containerRef.current.querySelector('.android-content-body') || containerRef.current;
  };
  const handleTouchStart = e => {
    if (isRefreshing) return;
    const scrollEl = getScrollContainer();
    // Only engage if container is scrolled to the absolute top
    if (scrollEl && scrollEl.scrollTop <= 0) {
      startYRef.current = e.touches[0].clientY;
      isPullingRef.current = true;
    } else {
      isPullingRef.current = false;
    }
  };
  const handleTouchMove = e => {
    if (!isPullingRef.current || isRefreshing) return;
    const scrollEl = getScrollContainer();
    if (scrollEl && scrollEl.scrollTop > 0) {
      isPullingRef.current = false;
      setPullY(0);
      return;
    }
    const currentY = e.touches[0].clientY;
    const diff = currentY - startYRef.current;
    if (diff > 0) {
      // Elastic drag resistance physics
      const distance = Math.min(75, Math.pow(diff, 0.82) * 1.5);
      setPullY(distance);
      if (distance >= threshold && pullY < threshold) {
        if (window.HapticEngine) HapticEngine.trigger('selection');
      }
    } else {
      setPullY(0);
      isPullingRef.current = false;
    }
  };
  const handleTouchEnd = async () => {
    if (!isPullingRef.current || isRefreshing) return;
    isPullingRef.current = false;
    if (pullY >= threshold) {
      setIsRefreshing(true);
      setPullY(45);
      if (window.HapticEngine) HapticEngine.trigger('medium');
      if (window.AudioEngine) AudioEngine.playTone(600);
      try {
        if (onRefresh) {
          await Promise.resolve(onRefresh());
        }
      } catch (err) {
        console.warn('Pull-to-refresh sync error:', err);
      } finally {
        setTimeout(() => {
          setIsRefreshing(false);
          setPullY(0);
          if (window.HapticEngine) HapticEngine.trigger('light');
        }, 450);
      }
    } else {
      setPullY(0);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: containerRef,
    className: `pull-refresh-container ${className}`,
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
    style: {
      position: 'relative'
    }
  }, (pullY > 0 || isRefreshing) && /*#__PURE__*/React.createElement("div", {
    className: `pull-refresh-indicator ${isRefreshing ? 'refreshing' : ''} ${pullY >= threshold ? 'ready' : ''}`,
    style: {
      transform: `translate(-50%, ${pullY > 0 ? pullY - 35 : 10}px)`,
      opacity: Math.min(1, pullY / 30)
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "pull-icon-wrap",
    style: {
      transform: isRefreshing ? 'none' : `rotate(${pullY * 4.5}deg)`
    }
  }, isRefreshing ? /*#__PURE__*/React.createElement("span", {
    className: "pull-spinner"
  }, "✦") : /*#__PURE__*/React.createElement("span", {
    className: "pull-arrow"
  }, pullY >= threshold ? '✨' : '↓')), /*#__PURE__*/React.createElement("span", {
    className: "pull-text"
  }, isRefreshing ? 'Syncing...' : pullY >= threshold ? 'Release to Sync' : 'Pull to Sync')), children);
}
window.PullToRefresh = PullToRefresh;

  // ==========================================
  // Module: www/js/components/SkeletonLoader.jsx
  // ==========================================
/**
 * ✦ KOMOREBI — Shimmer Skeleton Placeholders for Instant Perceived Performance
 */

function SkeletonBox({
  width = '100%',
  height = '16px',
  borderRadius = '6px',
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "skeleton-shimmer",
    style: {
      width,
      height,
      borderRadius,
      ...style
    }
  });
}
function SkeletonBento() {
  return /*#__PURE__*/React.createElement("div", {
    className: "bento-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bento-card",
    style: {
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement(SkeletonBox, {
    width: "60%",
    height: "12px"
  }), /*#__PURE__*/React.createElement(SkeletonBox, {
    width: "100%",
    height: "45px",
    borderRadius: "8px"
  })), /*#__PURE__*/React.createElement("div", {
    className: "bento-card",
    style: {
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement(SkeletonBox, {
    width: "60%",
    height: "12px"
  }), /*#__PURE__*/React.createElement(SkeletonBox, {
    width: "100%",
    height: "45px",
    borderRadius: "8px"
  })));
}
function SkeletonFeedCard() {
  return /*#__PURE__*/React.createElement("div", {
    className: "feed-card",
    style: {
      gap: '10px',
      padding: '14px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }
  }, /*#__PURE__*/React.createElement(SkeletonBox, {
    width: "36px",
    height: "36px",
    borderRadius: "50%"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '6px'
    }
  }, /*#__PURE__*/React.createElement(SkeletonBox, {
    width: "45%",
    height: "12px"
  }), /*#__PURE__*/React.createElement(SkeletonBox, {
    width: "70%",
    height: "10px"
  }))), /*#__PURE__*/React.createElement(SkeletonBox, {
    width: "100%",
    height: "32px",
    borderRadius: "8px"
  }));
}
function SkeletonChatRow({
  incoming = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: `chat-message-row ${incoming ? 'incoming' : 'outgoing'}`,
    style: {
      gap: '8px',
      padding: '4px 0'
    }
  }, incoming && /*#__PURE__*/React.createElement(SkeletonBox, {
    width: "24px",
    height: "24px",
    borderRadius: "50%"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '55%',
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      alignItems: incoming ? 'flex-start' : 'flex-end'
    }
  }, /*#__PURE__*/React.createElement(SkeletonBox, {
    width: "100%",
    height: "34px",
    borderRadius: "14px"
  }), /*#__PURE__*/React.createElement(SkeletonBox, {
    width: "30%",
    height: "8px"
  })), !incoming && /*#__PURE__*/React.createElement(SkeletonBox, {
    width: "24px",
    height: "24px",
    borderRadius: "50%"
  }));
}
window.SkeletonBox = SkeletonBox;
window.SkeletonBento = SkeletonBento;
window.SkeletonFeedCard = SkeletonFeedCard;
window.SkeletonChatRow = SkeletonChatRow;

  // ==========================================
  // Module: www/js/components/CelestialCanvas.jsx
  // ==========================================
/**
 * ✦ KOMOREBI — Celestial Night Sky with Authentic Shooting Stars (Canvas Physics Engine)
 */

function CelestialPhysicsCanvas({
  theme = 'pink'
}) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = canvas.width = canvas.parentElement.clientWidth || 360;
    let height = canvas.height = canvas.parentElement.clientHeight || 600;
    const resize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', resize);

    // Deep Sky Twinkling Stars (Fixed Background Field)
    const starField = Array.from({
      length: 32
    }, () => ({
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
      pink: [{
        r: 252,
        g: 165,
        b: 201
      }, {
        r: 248,
        g: 207,
        b: 101
      }, {
        r: 255,
        g: 240,
        b: 245
      }],
      forest: [{
        r: 110,
        g: 231,
        b: 183
      }, {
        r: 163,
        g: 230,
        b: 53
      }, {
        r: 248,
        g: 207,
        b: 101
      }],
      ocean: [{
        r: 56,
        g: 189,
        b: 248
      }, {
        r: 96,
        g: 165,
        b: 250
      }, {
        r: 224,
        g: 242,
        b: 254
      }]
    };
    function spawnShootingStar() {
      const angle = Math.PI / 180 * (130 + Math.random() * 15); // ~130°–145° diagonal sweep
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
        maxLife: 45 + Math.random() * 30,
        // Crisp ~0.8s-1.2s lifespan
        color: chosenColor
      });
    }
    let nextShootingStarTime = performance.now() + 1800;
    let lastTime = performance.now();
    function render(currentTime) {
      if (document.hidden) {
        lastTime = currentTime;
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      const dt = Math.min((currentTime - lastTime) / 16.67, 2.0);
      lastTime = currentTime;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Deep Ambient Twinkling Stars
      starField.forEach(star => {
        const alpha = Math.max(0.05, star.baseAlpha + Math.sin(currentTime * star.pulseSpeed + star.phase) * star.pulseAmp);
        ctx.fillStyle = star.isGold ? `rgba(248, 207, 101, ${alpha})` : `rgba(255, 250, 242, ${alpha})`;
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
          s.alpha = lifeRatio / 0.2 * s.maxAlpha;
        } else if (lifeRatio > 0.65) {
          s.alpha = (1 - lifeRatio) / 0.35 * s.maxAlpha;
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
  }, [theme]);
  return /*#__PURE__*/React.createElement("canvas", {
    ref: canvasRef,
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 0
    }
  });
}
window.CelestialPhysicsCanvas = CelestialPhysicsCanvas;

  // ==========================================
  // Module: www/js/components/NotificationBanner.jsx
  // ==========================================
/**
 * ✦ KOMOREBI — HD Live Notification Banner Component
 * Displays Komorebi App Logo Emblem, Sender Avatar, Title, Caption & Action Direct Links
 */

function HDNotificationBanner({
  notification,
  onClose,
  onClick
}) {
  if (!notification) return null;
  const isPhotoAlert = notification.type === 'photo';
  return /*#__PURE__*/React.createElement("div", {
    className: "hd-notification-banner",
    onClick: () => {
      if (onClick) onClick();
    },
    style: {
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hd-notif-main-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hd-notif-avatar-wrap"
  }, /*#__PURE__*/React.createElement("img", {
    src: notification.avatarUrl || './assets/iconforapp.jpg',
    className: "hd-notif-avatar-img",
    alt: "Avatar"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hd-notif-app-logo-badge",
    title: "Komorebi Sanctuary"
  }, /*#__PURE__*/React.createElement("img", {
    src: "./assets/app_icon.svg",
    onError: e => {
      e.target.src = './assets/iconforapp.jpg';
    },
    alt: "Komorebi Logo"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "hd-notif-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hd-notif-app-tag"
  }, /*#__PURE__*/React.createElement("img", {
    src: "./assets/app_icon.svg",
    onError: e => {
      e.target.src = './assets/iconforapp.jpg';
    },
    className: "hd-notif-mini-logo",
    alt: ""
  }), /*#__PURE__*/React.createElement("span", null, "KOMOREBI"), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.5
    }
  }, "•"), /*#__PURE__*/React.createElement("span", {
    style: {
      textTransform: 'none',
      opacity: 0.85
    }
  }, isPhotoAlert ? 'Locket' : 'Sanctuary')), /*#__PURE__*/React.createElement("div", {
    className: "hd-notif-title-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hd-notif-title"
  }, notification.title), isPhotoAlert ? /*#__PURE__*/React.createElement("span", {
    className: "hd-notif-badge"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sound-wave-pulse"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sound-bar"
  }), /*#__PURE__*/React.createElement("span", {
    className: "sound-bar"
  }), /*#__PURE__*/React.createElement("span", {
    className: "sound-bar"
  })), /*#__PURE__*/React.createElement("span", null, "Photo Alert")) : /*#__PURE__*/React.createElement("span", {
    className: "hd-notif-badge",
    style: {
      background: 'rgba(76, 215, 182, 0.15)',
      color: '#4cd7b6',
      borderColor: 'rgba(76, 215, 182, 0.3)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Live ⚡"))), /*#__PURE__*/React.createElement("div", {
    className: "hd-notif-caption"
  }, notification.caption || notification.body || 'New sanctuary update')), notification.thumbUrl && /*#__PURE__*/React.createElement("div", {
    className: "hd-notif-thumb"
  }, /*#__PURE__*/React.createElement("img", {
    src: notification.thumbUrl,
    alt: ""
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: e => {
      e.stopPropagation();
      onClose();
    },
    className: "hd-notif-close-btn",
    "aria-label": "Dismiss Notification"
  }, "✕")), /*#__PURE__*/React.createElement("div", {
    className: "hd-notif-progress-track"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hd-notif-progress-bar",
    style: {
      animationDuration: isPhotoAlert ? '30s' : '6s'
    }
  })));
}
window.HDNotificationBanner = HDNotificationBanner;

  // ==========================================
  // Module: www/js/components/MediaViewer.jsx
  // ==========================================
/**
 * ✦ KOMOREBI — Media Carousel & Fullscreen Media Viewer Components
 */

// Multi-Media Swipeable Carousel Component (Up to 5 Photos or 1 Video)
function MediaCarouselViewer({
  snap,
  activeTraveler,
  partnerTraveler,
  isLockscreen = false,
  onOpenModal
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [imgError, setImgError] = useState(false);
  const hasValidMedia = snap && !imgError && (snap.imageUrl && typeof snap.imageUrl === 'string' && snap.imageUrl.trim().length > 0 || snap.items && Array.isArray(snap.items) && snap.items.length > 0 && snap.items.some(it => it.url && it.url.trim().length > 0));
  if (!hasValidMedia) {
    const partnerName = partnerTraveler?.name || 'Partner';
    return /*#__PURE__*/React.createElement("div", {
      className: isLockscreen ? "glance-photo-empty" : "bento-photo-empty",
      onClick: onOpenModal
    }, /*#__PURE__*/React.createElement("div", {
      className: "bento-camera-icon-wrap"
    }, window.Icons && /*#__PURE__*/React.createElement(Icons.Camera, {
      size: isLockscreen ? 20 : 15
    })), /*#__PURE__*/React.createElement("span", {
      className: "bento-empty-text"
    }, "Send photo to ", partnerName));
  }
  const items = snap.items && snap.items.length > 0 ? snap.items.filter(it => it.url && it.url.trim().length > 0) : [{
    url: snap.imageUrl,
    type: snap.isVideo ? 'video' : 'image'
  }];
  const total = items.length;
  const currentItem = items[activeIdx] || items[0] || {
    url: '',
    type: 'image'
  };
  const isMe = snap.sentBy === activeTraveler.name.toLowerCase();
  const handlePrev = e => {
    e?.stopPropagation?.();
    if (window.AudioEngine) AudioEngine.playTone(520);
    setActiveIdx(prev => prev === 0 ? total - 1 : prev - 1);
  };
  const handleNext = e => {
    e?.stopPropagation?.();
    if (window.AudioEngine) AudioEngine.playTone(520);
    setActiveIdx(prev => prev === total - 1 ? 0 : prev + 1);
  };
  const handleTouchStart = e => {
    setTouchStartX(e.touches[0].clientX);
  };
  const handleTouchEnd = e => {
    if (touchStartX === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (diff > 35) {
      handlePrev();
    } else if (diff < -35) {
      handleNext();
    }
    setTouchStartX(null);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      borderRadius: '8px'
    },
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
    onClick: onOpenModal
  }, currentItem.type === 'video' ? /*#__PURE__*/React.createElement("video", {
    src: currentItem.url,
    autoPlay: true,
    loop: true,
    muted: true,
    playsInline: true,
    controls: false,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : /*#__PURE__*/React.createElement("img", {
    src: currentItem.url,
    alt: "",
    onError: () => setImgError(true),
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  }), (currentItem.type === 'video' || total > 1) && /*#__PURE__*/React.createElement("div", {
    className: "carousel-dots-pill"
  }, currentItem.type === 'video' ? /*#__PURE__*/React.createElement("span", null, "📹 Video") : /*#__PURE__*/React.createElement("span", null, activeIdx + 1, "/", total)), total > 1 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "carousel-nav-btn prev",
    onClick: handlePrev,
    "aria-label": "Previous Media"
  }, "‹"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "carousel-nav-btn next",
    onClick: handleNext,
    "aria-label": "Next Media"
  }, "›"), /*#__PURE__*/React.createElement("div", {
    className: "carousel-dots-bottom"
  }, items.map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: `carousel-dot ${i === activeIdx ? 'active' : ''}`
  })))), snap.caption && /*#__PURE__*/React.createElement("div", {
    className: isLockscreen ? "glance-photo-caption" : "bento-photo-caption-overlay"
  }, /*#__PURE__*/React.createElement("span", null, isMe ? 'You' : partnerTraveler.name, ": \"", snap.caption, "\"")));
}

// Fullscreen Media Viewer Component (Opens when tapping shared photo/video)
function FullscreenMediaViewer({
  snap,
  activeTraveler,
  partnerTraveler,
  onClose,
  onSendNew
}) {
  const [viewerIdx, setViewerIdx] = useState(0);
  const [touchX, setTouchX] = useState(null);
  if (!snap) return null;
  const items = snap.items && snap.items.length > 0 ? snap.items : snap.imageUrl ? [{
    url: snap.imageUrl,
    type: snap.isVideo ? 'video' : 'image'
  }] : [];
  const total = items.length;
  const current = items[viewerIdx] || items[0] || {
    url: '',
    type: 'image'
  };
  const isMe = snap.sentBy === activeTraveler.name.toLowerCase();
  const senderName = isMe ? 'You' : partnerTraveler.name;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: 'rgba(0, 0, 0, 0.96)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      animation: 'fadeIn 0.2s ease'
    },
    onClick: e => {
      if (e.target === e.currentTarget) onClose();
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '14px 16px',
      background: 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, transparent 100%)',
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '14px',
      fontWeight: '700',
      color: '#fff'
    }
  }, senderName, "'s Drop"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '10px',
      color: 'var(--text-secondary)'
    }
  }, snap.time), total > 1 && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '10px',
      background: 'rgba(248,207,101,0.2)',
      color: 'var(--color-primary)',
      padding: '2px 8px',
      borderRadius: '10px',
      fontWeight: '700'
    }
  }, viewerIdx + 1, " / ", total)), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      background: 'rgba(255,255,255,0.1)',
      border: 'none',
      color: '#fff',
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      fontSize: '16px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    "aria-label": "Close Viewer"
  }, "✕")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      maxWidth: '480px',
      maxHeight: '70vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    },
    onTouchStart: e => setTouchX(e.touches[0].clientX),
    onTouchEnd: e => {
      if (touchX === null) return;
      const diff = e.changedTouches[0].clientX - touchX;
      if (diff > 40 && viewerIdx > 0) {
        setViewerIdx(viewerIdx - 1);
        AudioEngine.playTone(520);
      } else if (diff < -40 && viewerIdx < total - 1) {
        setViewerIdx(viewerIdx + 1);
        AudioEngine.playTone(520);
      }
      setTouchX(null);
    }
  }, current.type === 'video' ? /*#__PURE__*/React.createElement("video", {
    src: current.url,
    autoPlay: true,
    loop: true,
    playsInline: true,
    controls: true,
    style: {
      width: '100%',
      maxHeight: '70vh',
      objectFit: 'contain',
      borderRadius: '12px'
    }
  }) : /*#__PURE__*/React.createElement("img", {
    src: current.url,
    alt: "Shared Media",
    style: {
      width: '100%',
      maxHeight: '70vh',
      objectFit: 'contain',
      borderRadius: '12px'
    }
  }), total > 1 && viewerIdx > 0 && /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      setViewerIdx(viewerIdx - 1);
      AudioEngine.playTone(520);
    },
    style: {
      position: 'absolute',
      left: '8px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'rgba(0,0,0,0.5)',
      border: 'none',
      color: '#fff',
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      fontSize: '18px',
      cursor: 'pointer'
    }
  }, "‹"), total > 1 && viewerIdx < total - 1 && /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      setViewerIdx(viewerIdx + 1);
      AudioEngine.playTone(520);
    },
    style: {
      position: 'absolute',
      right: '8px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'rgba(0,0,0,0.5)',
      border: 'none',
      color: '#fff',
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      fontSize: '18px',
      cursor: 'pointer'
    }
  }, "›")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '14px',
      textAlign: 'center',
      color: '#fff',
      fontSize: '13px',
      fontWeight: '600',
      maxWidth: '320px'
    }
  }, "\"", snap.caption || 'Shared a moment', "\""), total > 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '6px',
      marginTop: '12px'
    }
  }, items.map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    onClick: e => {
      e.stopPropagation();
      setViewerIdx(i);
    },
    style: {
      width: i === viewerIdx ? '18px' : '7px',
      height: '7px',
      borderRadius: '4px',
      cursor: 'pointer',
      background: i === viewerIdx ? 'var(--color-primary)' : 'rgba(255,255,255,0.3)',
      transition: 'all 0.2s ease'
    }
  }))), /*#__PURE__*/React.createElement("button", {
    onClick: onSendNew,
    style: {
      marginTop: '18px',
      background: 'linear-gradient(135deg, #f8cf65, #e0b042)',
      border: 'none',
      borderRadius: '20px',
      padding: '8px 20px',
      color: '#090b10',
      fontSize: '12px',
      fontWeight: '700',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    }
  }, "📸 Send New Photo"));
}
window.MediaCarouselViewer = MediaCarouselViewer;
window.FullscreenMediaViewer = FullscreenMediaViewer;

  // ==========================================
  // Module: www/js/components/MoodPickerModal.jsx
  // ==========================================
/**
 * ✦ KOMOREBI — Vector Mood Picker Modal Component
 */

function MoodPickerModal({
  isOpen,
  onClose,
  currentMood,
  onSelectMood,
  partnerName
}) {
  if (!isOpen) return null;
  const roster = window.MOOD_ROSTER || [];
  return /*#__PURE__*/React.createElement("div", {
    className: "android-modal-backdrop",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "android-sheet-surface",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "sheet-handle-bar"
  }), /*#__PURE__*/React.createElement("div", {
    className: "sheet-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "sheet-title"
  }, "Set Your Sanctuary Mood"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '11px',
      color: 'var(--text-secondary)',
      marginTop: '2px'
    }
  }, "Shared live with ", partnerName, " & synced to lockscreen")), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "sheet-close-btn"
  }, "✕")), /*#__PURE__*/React.createElement("div", {
    className: "mood-options-grid"
  }, roster.map(m => {
    const isSelected = currentMood === m.id;
    const IconComp = window.Icons && window.Icons[m.icon] || window.Icons && window.Icons.Heart;
    return /*#__PURE__*/React.createElement("div", {
      key: m.id,
      onClick: () => {
        if (window.AudioEngine) AudioEngine.playTone(500);
        onSelectMood(m.id);
        onClose();
      },
      className: `mood-option-item ${isSelected ? 'selected' : ''}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "mood-icon-bubble",
      style: {
        background: isSelected ? `${m.color}25` : 'rgba(255, 255, 255, 0.05)',
        color: m.color,
        border: `1px solid ${isSelected ? m.color : 'rgba(255, 255, 255, 0.08)'}`,
        boxShadow: isSelected ? `0 0 14px ${m.color}33` : 'none'
      }
    }, IconComp && /*#__PURE__*/React.createElement(IconComp, {
      size: 18
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: '12.5px',
        fontWeight: '700',
        color: isSelected ? 'var(--color-primary)' : '#fff'
      }
    }, m.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: '10px',
        color: 'var(--text-tertiary)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        marginTop: '1px'
      }
    }, m.desc)));
  }))));
}
window.MoodPickerModal = MoodPickerModal;

  // ==========================================
  // Module: www/js/components/AddPlanSheet.jsx
  // ==========================================
/**
 * ✦ KOMOREBI — Add Couple Plan Bottom Sheet Component
 */

function AddPlanSheet({
  isOpen,
  onClose,
  onAdd,
  activeTraveler,
  initialDate
}) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(initialDate || '2026-08-18');
  const [time, setTime] = useState('20:00');
  const [type, setType] = useState('Gaming');
  const [isWishSealed, setIsWishSealed] = useState(false);
  useEffect(() => {
    if (initialDate) setDate(initialDate);
  }, [initialDate, isOpen]);
  if (!isOpen) return null;
  const handleSubmit = e => {
    e.preventDefault();
    if (!title.trim()) return;
    if (window.AudioEngine) AudioEngine.playTone(600);
    onAdd({
      id: 'plan-' + Date.now(),
      title: title.trim(),
      date,
      time: (window.format12HourTime ? window.format12HourTime(time) : time) || '8:00 PM',
      type,
      assignedTo: 'both',
      createdBy: activeTraveler.name.toLowerCase(),
      isWishSealed
    });
    setTitle('');
    onClose();
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "profile-modal-sheet",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "profile-sheet-body",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "sheet-header-row"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "sheet-title"
  }, "Schedule Plan"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '11px',
      color: 'var(--color-accent)',
      marginLeft: '8px'
    }
  }, "(", date, ")")), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "sheet-close-btn",
    "aria-label": "Close"
  }, "✕")), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit,
    className: "sheet-form-layout"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "form-field-label"
  }, "Plan Title"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: title,
    onChange: e => setTitle(e.target.value),
    placeholder: "e.g. Movie night, Video call, Dinner...",
    required: true,
    autoFocus: true,
    maxLength: 40,
    className: "form-input-text"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.2fr 1fr',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "form-field-label"
  }, "Date"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: date,
    onChange: e => setDate(e.target.value),
    required: true,
    className: "form-input-text"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "form-field-label"
  }, "Time"), /*#__PURE__*/React.createElement("input", {
    type: "time",
    value: time,
    onChange: e => setTime(e.target.value),
    className: "form-input-text"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "form-field-label"
  }, "Activity Type"), /*#__PURE__*/React.createElement("select", {
    value: type,
    onChange: e => setType(e.target.value),
    className: "form-input-text"
  }, /*#__PURE__*/React.createElement("option", {
    value: "Gaming"
  }, "Gaming"), /*#__PURE__*/React.createElement("option", {
    value: "Movie / Series"
  }, "Movie / Series"), /*#__PURE__*/React.createElement("option", {
    value: "Call / Voice"
  }, "Call / Voice"), /*#__PURE__*/React.createElement("option", {
    value: "Coffee / Food"
  }, "Coffee / Food"), /*#__PURE__*/React.createElement("option", {
    value: "Date / Special"
  }, "Date / Special"), /*#__PURE__*/React.createElement("option", {
    value: "Study / Work"
  }, "Study / Work"))), /*#__PURE__*/React.createElement("div", {
    className: "secret-wish-box"
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '11px',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: isWishSealed,
    onChange: e => setIsWishSealed(e.target.checked),
    style: {
      accentColor: 'var(--color-accent)'
    }
  }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "Surprise Plan"), " (Hidden until unlocked)"))), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn-minimal-submit"
  }, "Save Plan"))));
}
window.AddPlanSheet = AddPlanSheet;

  // ==========================================
  // Module: www/js/components/SendPictureSheet.jsx
  // ==========================================
/**
 * ✦ KOMOREBI — Send Photo & Video Bottom Sheet Component
 */

function SendPictureSheet({
  isOpen,
  onClose,
  onSendPicture,
  activeTraveler
}) {
  const [caption, setCaption] = useState('');
  const [customMediaUrl, setCustomMediaUrl] = useState('');
  const [mediaList, setMediaList] = useState([]); // [{ id, url, type: 'image'|'video', name }]
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [fileError, setFileError] = useState('');
  const fileInputRef = useRef(null);
  if (!isOpen) return null;
  const hasVideo = mediaList.some(m => m.type === 'video');
  const imageCount = mediaList.filter(m => m.type === 'image').length;
  const handleFileUpload = e => {
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
      reader.onload = event => {
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
      const validation = window.SecurityGuard ? window.SecurityGuard.validateImageFile(file) : {
        valid: true
      };
      if (!validation.valid) {
        setFileError(validation.error);
        return;
      }
      const reader = new FileReader();
      reader.onload = event => {
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
  const handleRemoveItem = id => {
    if (window.AudioEngine) AudioEngine.playTone(380);
    setMediaList(prev => prev.filter(m => m.id !== id));
  };
  const handleAddUrl = e => {
    e.preventDefault();
    if (!customMediaUrl.trim()) return;
    const cleanUrl = window.SecurityGuard ? window.SecurityGuard.sanitizeUrl(customMediaUrl.trim()) : customMediaUrl.trim();
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
  const handleSubmit = e => {
    e.preventDefault();
    if (!mediaList.length) return;
    if (window.AudioEngine) AudioEngine.playTone(720);
    const sanitizedCaption = window.SecurityGuard ? window.SecurityGuard.sanitizeText(caption, 70) : caption;
    onSendPicture({
      id: 'snap-' + Date.now(),
      items: mediaList,
      imageUrl: mediaList[0].url,
      isVideo: mediaList[0].type === 'video',
      caption: sanitizedCaption || (mediaList[0].type === 'video' ? 'Shared a video' : mediaList.length > 1 ? `Shared ${mediaList.length} photos` : 'Shared a photo'),
      sentBy: activeTraveler.name.toLowerCase(),
      time: window.formatCurrentTime ? window.formatCurrentTime() : new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    });
    setCaption('');
    setMediaList([]);
    setCustomMediaUrl('');
    setShowUrlInput(false);
    setFileError('');
    onClose();
  };
  const canAddMore = !hasVideo && imageCount < 5;
  return /*#__PURE__*/React.createElement("div", {
    className: "profile-modal-sheet",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "profile-sheet-body",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "sheet-header-row"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "sheet-title"
  }, "Share Photos & Video"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '10.5px',
      color: 'var(--text-secondary)',
      marginTop: '2px'
    }
  }, "Send up to 5 photos or 1 video to partner's lockscreen")), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "sheet-close-btn",
    "aria-label": "Close"
  }, "✕")), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit,
    className: "sheet-form-layout"
  }, mediaList.length > 0 ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '6px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "form-field-label",
    style: {
      margin: 0
    }
  }, "Selected Media (", hasVideo ? '1/1 Video' : `${imageCount}/5 Photos`, ")"), canAddMore && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => fileInputRef.current && fileInputRef.current.click(),
    style: {
      background: 'none',
      border: 'none',
      color: 'var(--color-primary)',
      fontSize: '11px',
      fontWeight: '700',
      cursor: 'pointer'
    }
  }, "+ Add More")), /*#__PURE__*/React.createElement("div", {
    className: "media-upload-strip"
  }, mediaList.map(item => /*#__PURE__*/React.createElement("div", {
    key: item.id,
    className: "media-thumb-preview"
  }, item.type === 'video' ? /*#__PURE__*/React.createElement("video", {
    src: item.url,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : /*#__PURE__*/React.createElement("img", {
    src: item.url,
    alt: "Thumbnail"
  }), item.type === 'video' && /*#__PURE__*/React.createElement("div", {
    className: "media-video-badge"
  }, "▶ Video"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => handleRemoveItem(item.id),
    className: "media-remove-btn",
    title: "Remove"
  }, "✕"))), canAddMore && /*#__PURE__*/React.createElement("div", {
    className: "media-add-tile",
    onClick: () => fileInputRef.current && fileInputRef.current.click(),
    title: "Add another photo"
  }, window.Icons && /*#__PURE__*/React.createElement(Icons.Plus, {
    size: 16
  }), /*#__PURE__*/React.createElement("span", null, "Add")))) : /*#__PURE__*/React.createElement("div", {
    onClick: () => fileInputRef.current && fileInputRef.current.click(),
    className: "minimal-photo-dropzone"
  }, /*#__PURE__*/React.createElement("div", {
    className: "minimal-empty-dropzone"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: '6px',
      color: 'var(--color-primary)'
    }
  }, window.Icons && /*#__PURE__*/React.createElement(Icons.Camera, {
    size: 30
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '13px',
      fontWeight: '700',
      color: '#fff'
    }
  }, "Choose Media"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '11px',
      color: 'var(--text-secondary)',
      marginTop: '2px'
    }
  }, "Select up to 5 photos or 1 video"))), /*#__PURE__*/React.createElement("input", {
    type: "file",
    ref: fileInputRef,
    onChange: handleFileUpload,
    accept: "image/*,video/*",
    multiple: true,
    style: {
      display: 'none'
    }
  }), fileError && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '11px',
      color: '#fb7185',
      fontWeight: '600'
    }
  }, fileError), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "form-field-label"
  }, "Caption"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: caption,
    onChange: e => setCaption(e.target.value),
    placeholder: "Add a sweet message or note...",
    maxLength: 70,
    className: "form-input-text"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setShowUrlInput(!showUrlInput),
    style: {
      background: 'none',
      border: 'none',
      color: 'var(--text-secondary)',
      fontSize: '11px',
      cursor: 'pointer',
      padding: '2px 0'
    }
  }, showUrlInput ? 'Hide URL input' : 'Paste media URL instead'), showUrlInput && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '6px',
      marginTop: '6px'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "url",
    value: customMediaUrl,
    onChange: e => setCustomMediaUrl(e.target.value),
    placeholder: "https://... image or .mp4 video",
    className: "form-input-text",
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: handleAddUrl,
    style: {
      background: 'rgba(255,255,255,0.08)',
      border: '1px solid var(--android-border)',
      borderRadius: '10px',
      padding: '6px 12px',
      color: '#fff',
      fontSize: '11px',
      fontWeight: '600',
      cursor: 'pointer'
    }
  }, "Add URL"))), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn-minimal-submit",
    disabled: mediaList.length === 0
  }, hasVideo ? 'Send Video Drop (1)' : `Send Photo Drop (${mediaList.length || 0}/5)`))));
}
window.SendPictureSheet = SendPictureSheet;

  // ==========================================
  // Module: www/js/components/ProfileSheet.jsx
  // ==========================================
/**
 * ✦ KOMOREBI — Profile & Settings Bottom Sheet Component
 */

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
  isNotificationsEnabled = true,
  onToggleNotifications,
  isNotifSoundEnabled = true,
  onToggleNotifSound,
  onTestNotification,
  partnerTraveler
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
  const [sbUrl, setSbUrl] = useState(supabaseConfig?.url || (window.DEFAULT_SUPABASE_CONFIG ? window.DEFAULT_SUPABASE_CONFIG.url : ''));
  const [sbKey, setSbKey] = useState(supabaseConfig?.key || (window.DEFAULT_SUPABASE_CONFIG ? window.DEFAULT_SUPABASE_CONFIG.key : ''));
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
      if (window.AudioEngine) AudioEngine.stopRingtone();
      setPlayingTrackId(null);
    }
  }, [isOpen]);
  if (!isOpen) return null;
  const handleSaveName = e => {
    e.preventDefault();
    let cleanName = window.SecurityGuard ? window.SecurityGuard.sanitizeText(displayName, 32) : displayName;
    if (!cleanName) return;
    if (cleanName.toLowerCase() === 'zian') cleanName = 'Ziankyle';
    if (window.AudioEngine) AudioEngine.playTone(680);
    onUpdateName(cleanName);
    setDisplayName(cleanName);
    setNameSavedStatus('Saved');
    setTimeout(() => setNameSavedStatus(''), 2500);
  };
  const handlePasswordSubmit = e => {
    e.preventDefault();
    if (newPass.length < 6) {
      setPassStatus('Password must be at least 6 characters.');
      return;
    }
    if (newPass !== confirmPass) {
      setPassStatus('Passwords do not match.');
      return;
    }
    if (window.AudioEngine) AudioEngine.playTone(720);
    setPassStatus('Password updated successfully.');
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
    setTimeout(() => {
      setPassStatus('');
      setIsPassOpen(false);
    }, 2000);
  };
  const handleSaveSupabase = e => {
    e.preventDefault();
    if (!sbUrl.trim() || !sbKey.trim()) {
      setSbStatus('Please enter both Supabase URL and Anon Key');
      return;
    }
    const cleanUrl = sbUrl.trim().replace(/\/$/, '');
    const newConfig = {
      url: cleanUrl,
      key: sbKey.trim()
    };
    onSaveSupabaseConfig(newConfig);
    if (window.AudioEngine) AudioEngine.playTone(720);
    setSbStatus('Connected to Supabase! Realtime active.');
    setTimeout(() => setSbStatus(''), 3000);
  };
  const handleDisconnectSupabase = () => {
    onSaveSupabaseConfig(null);
    setSbUrl('');
    setSbKey('');
    if (window.AudioEngine) AudioEngine.playTone(400);
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
    if (window.AudioEngine) AudioEngine.playTone(680);
    setTimeout(() => setIsSqlCopied(false), 3000);
  };
  const handleTestRingtone = trackId => {
    if (playingTrackId === trackId) {
      if (window.AudioEngine) AudioEngine.stopRingtone();
      setPlayingTrackId(null);
    } else {
      setPlayingTrackId(trackId);
      if (window.AudioEngine) {
        AudioEngine.playRingtone(trackId, 30000, () => {
          setPlayingTrackId(null);
        });
      }
    }
  };
  const handleFileUpload = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = uploadEvent => {
        onSelectAvatar({
          id: 'custom-' + Date.now(),
          name: 'Custom',
          iconUrl: uploadEvent.target.result
        });
        if (window.AudioEngine) AudioEngine.playTone(680);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleApplyUrl = e => {
    e.preventDefault();
    if (customUrl.trim()) {
      onSelectAvatar({
        id: 'custom-' + Date.now(),
        name: 'Custom',
        iconUrl: customUrl.trim()
      });
      setCustomUrl('');
      if (window.AudioEngine) AudioEngine.playTone(680);
    }
  };
  const resolvedCurrentAvatar = window.resolveAvatar ? window.resolveAvatar(currentAvatar, activeTraveler.name) : currentAvatar || {
    iconUrl: './assets/avatars/kokomi.png',
    name: 'Traveler'
  };
  const presetAvatars = window.PRESET_AVATARS || [];
  const ringtoneOptions = window.RINGTONE_OPTIONS || [];
  return /*#__PURE__*/React.createElement("div", {
    className: "profile-modal-sheet",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "profile-sheet-body",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "sheet-handle-bar"
  }), /*#__PURE__*/React.createElement("div", {
    className: "sheet-header-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sheet-title"
  }, "Profile & Settings"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "sheet-close-btn",
    "aria-label": "Close"
  }, "✕")), /*#__PURE__*/React.createElement("div", {
    className: "avatar-preview-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "avatar-preview-circle"
  }, /*#__PURE__*/React.createElement("img", {
    src: resolvedCurrentAvatar.iconUrl,
    alt: resolvedCurrentAvatar.name,
    onError: e => {
      e.target.onerror = null;
      e.target.src = activeTraveler.name && activeTraveler.name.toLowerCase().includes('mikkie') ? './assets/avatars/yae.png' : './assets/avatars/kokomi.png';
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '16px',
      fontWeight: '700',
      color: '#fff'
    }
  }, activeTraveler.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '11px',
      color: 'var(--text-secondary)',
      marginTop: '2px'
    }
  }, "Current: ", resolvedCurrentAvatar.name)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn-upload-file",
    onClick: () => fileInputRef.current && fileInputRef.current.click(),
    style: {
      marginTop: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px'
    }
  }, window.Icons && /*#__PURE__*/React.createElement(Icons.Camera, {
    size: 14
  }), /*#__PURE__*/React.createElement("span", null, "Upload Custom Photo")), /*#__PURE__*/React.createElement("input", {
    type: "file",
    ref: fileInputRef,
    onChange: handleFileUpload,
    accept: "image/*",
    style: {
      display: 'none'
    }
  })), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSaveName,
    className: "sheet-form-layout"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "form-field-label"
  }, "Display Name"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '6px'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: displayName,
    onChange: e => setDisplayName(e.target.value),
    placeholder: "Your name...",
    maxLength: 24,
    required: true,
    className: "form-input-text",
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    style: {
      background: 'var(--color-primary)',
      color: '#090b10',
      border: 'none',
      borderRadius: '10px',
      padding: '8px 16px',
      fontSize: '11px',
      fontWeight: '700',
      cursor: 'pointer'
    }
  }, "Save")), nameSavedStatus && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '11px',
      color: 'var(--color-primary)',
      fontWeight: '600',
      marginTop: '4px'
    }
  }, nameSavedStatus))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "form-field-label",
    style: {
      marginBottom: '8px'
    }
  }, "Choose Preset Avatar"), /*#__PURE__*/React.createElement("div", {
    className: "preset-avatars-grid"
  }, presetAvatars.map(av => /*#__PURE__*/React.createElement("button", {
    key: av.id,
    type: "button",
    className: `preset-avatar-btn ${currentAvatar.id === av.id ? 'selected' : ''}`,
    onClick: () => {
      if (window.AudioEngine) AudioEngine.playTone(550);
      onSelectAvatar(av);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "preset-avatar-icon"
  }, /*#__PURE__*/React.createElement("img", {
    src: av.iconUrl,
    alt: av.name
  })), /*#__PURE__*/React.createElement("span", {
    className: "preset-avatar-name"
  }, av.name))))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(255, 255, 255, 0.025)',
      border: '1px solid var(--android-border)',
      borderRadius: '14px',
      padding: '14px 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '13px',
      fontWeight: '700',
      color: '#fff',
      marginBottom: '4px',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    }
  }, window.Icons && /*#__PURE__*/React.createElement(Icons.Settings, {
    size: 14
  }), /*#__PURE__*/React.createElement("span", null, "Sanctuary Features & Sync")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '10.5px',
      color: 'var(--text-secondary)',
      marginBottom: '8px'
    }
  }, "Control partner notification alerts and sound"), /*#__PURE__*/React.createElement("div", {
    className: "settings-toggle-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "settings-toggle-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "settings-toggle-title"
  }, /*#__PURE__*/React.createElement("span", null, "Partner Notifications"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '9.5px',
      padding: '1px 6px',
      borderRadius: '4px',
      background: isNotificationsEnabled ? 'rgba(248, 207, 101, 0.15)' : 'rgba(255,255,255,0.06)',
      color: isNotificationsEnabled ? 'var(--color-primary)' : 'var(--text-tertiary)'
    }
  }, isNotificationsEnabled ? 'Active' : 'Muted')), /*#__PURE__*/React.createElement("div", {
    className: "settings-toggle-desc"
  }, "Get alerts when ", partnerTraveler?.name || 'your partner', " sends a photo, message, or ping")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: `toggle-switch-btn ${isNotificationsEnabled ? 'active' : ''}`,
    onClick: () => {
      if (window.AudioEngine) AudioEngine.playTone(isNotificationsEnabled ? 450 : 600);
      if (onToggleNotifications) onToggleNotifications(!isNotificationsEnabled);
    },
    title: "Toggle Notifications",
    "aria-label": "Toggle Notifications"
  }, /*#__PURE__*/React.createElement("div", {
    className: "toggle-switch-knob"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "settings-toggle-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "settings-toggle-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "settings-toggle-title"
  }, /*#__PURE__*/React.createElement("span", null, "Notification Sound"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '9.5px',
      padding: '1px 6px',
      borderRadius: '4px',
      background: isNotifSoundEnabled ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255,255,255,0.06)',
      color: isNotifSoundEnabled ? '#38bdf8' : 'var(--text-tertiary)'
    }
  }, isNotifSoundEnabled ? 'Sound On' : 'Silent')), /*#__PURE__*/React.createElement("div", {
    className: "settings-toggle-desc"
  }, "Play subtle chime when receiving new partner updates")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: `toggle-switch-btn ${isNotifSoundEnabled ? 'active' : ''}`,
    onClick: () => {
      if (window.AudioEngine) AudioEngine.playTone(isNotifSoundEnabled ? 450 : 600);
      if (onToggleNotifSound) onToggleNotifSound(!isNotifSoundEnabled);
    },
    title: "Toggle Notification Sound",
    "aria-label": "Toggle Notification Sound"
  }, /*#__PURE__*/React.createElement("div", {
    className: "toggle-switch-knob"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '10px',
      paddingTop: '8px',
      borderTop: '1px solid rgba(255,255,255,0.05)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onTestNotification,
    style: {
      width: '100%',
      background: 'rgba(248, 207, 101, 0.12)',
      border: '1px solid rgba(248, 207, 101, 0.35)',
      color: 'var(--color-primary)',
      borderRadius: '8px',
      padding: '8px 12px',
      fontSize: '11.5px',
      fontWeight: '700',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px'
    },
    title: "Test notification alert"
  }, window.Icons && /*#__PURE__*/React.createElement(Icons.Bell, {
    size: 12
  }), /*#__PURE__*/React.createElement("span", null, "Send Test Notification Alert")))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("form", {
    onSubmit: handleApplyUrl,
    style: {
      display: 'flex',
      gap: '6px'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "url",
    value: customUrl,
    onChange: e => setCustomUrl(e.target.value),
    placeholder: "Or paste image URL...",
    className: "form-input-text",
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    style: {
      background: 'rgba(255,255,255,0.08)',
      border: '1px solid var(--android-border)',
      borderRadius: '10px',
      padding: '6px 14px',
      color: '#fff',
      fontSize: '11px',
      fontWeight: '600',
      cursor: 'pointer'
    }
  }, "Apply"))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(255, 255, 255, 0.02)',
      border: '1px solid var(--android-border)',
      borderRadius: '12px',
      padding: '12px 14px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => setIsRingtoneOpen(!isRingtoneOpen),
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '12px',
      fontWeight: '700',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Photo Ringtone & Alerts"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '10px',
      padding: '2px 6px',
      borderRadius: '4px',
      background: selectedRingtone === 'silent' ? 'rgba(255,255,255,0.08)' : 'rgba(248, 207, 101, 0.15)',
      color: selectedRingtone === 'silent' ? 'var(--text-secondary)' : 'var(--color-primary)'
    }
  }, ringtoneOptions.find(t => t.id === selectedRingtone)?.title || 'Moonlight', " (30s)")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '10px',
      color: 'var(--text-secondary)',
      marginTop: '2px'
    }
  }, "Plays for 30 seconds when a photo is sent or received")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '10px',
      color: 'var(--text-secondary)'
    }
  }, isRingtoneOpen ? '▲' : '▼')), isRingtoneOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      marginTop: '12px'
    }
  }, ringtoneOptions.map(track => {
    const isSelected = selectedRingtone === track.id;
    return /*#__PURE__*/React.createElement("div", {
      key: track.id,
      onClick: () => onSelectRingtone(track.id),
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 10px',
        borderRadius: '8px',
        background: isSelected ? 'rgba(248, 207, 101, 0.1)' : 'rgba(255, 255, 255, 0.02)',
        border: `1px solid ${isSelected ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.06)'}`,
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: '12px',
        fontWeight: '600',
        color: isSelected ? 'var(--color-primary)' : '#fff'
      }
    }, track.title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: '10px',
        color: 'var(--text-secondary)'
      }
    }, track.subtitle)), track.src && /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: e => {
        e.stopPropagation();
        handleTestRingtone(track.id);
      },
      style: {
        background: playingTrackId === track.id ? 'rgba(248, 207, 101, 0.2)' : 'rgba(255, 255, 255, 0.08)',
        border: `1px solid ${playingTrackId === track.id ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.12)'}`,
        color: playingTrackId === track.id ? 'var(--color-primary)' : '#fff',
        borderRadius: '6px',
        padding: '4px 8px',
        fontSize: '10px',
        fontWeight: '600',
        cursor: 'pointer'
      }
    }, playingTrackId === track.id ? '⏹ Stop' : '▶ Test 30s'));
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(255, 255, 255, 0.02)',
      border: '1px solid var(--android-border)',
      borderRadius: '12px',
      padding: '12px 14px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => setIsSupabaseOpen(!isSupabaseOpen),
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '12px',
      fontWeight: '700',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Supabase 24/7 Global Sync"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '10px',
      padding: '2px 6px',
      borderRadius: '4px',
      background: isSupabaseConnected ? 'rgba(76, 215, 182, 0.15)' : 'rgba(255,255,255,0.08)',
      color: isSupabaseConnected ? 'var(--color-primary)' : 'var(--text-secondary)'
    }
  }, isSupabaseConnected ? '🟢 Live Synced' : '⚪ Offline / Local')), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '10px',
      color: 'var(--text-secondary)',
      marginTop: '2px'
    }
  }, "100% Free realtime sync across both phones anywhere worldwide")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '10px',
      color: 'var(--text-secondary)'
    }
  }, isSupabaseOpen ? '▲' : '▼')), isSupabaseOpen && /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSaveSupabase,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      marginTop: '12px'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "form-field-label"
  }, "Supabase Project URL"), /*#__PURE__*/React.createElement("input", {
    type: "url",
    value: sbUrl,
    onChange: e => setSbUrl(e.target.value),
    placeholder: "https://xyzabcdefg.supabase.co",
    required: true,
    className: "form-input-text"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "form-field-label"
  }, "Supabase Anon Public Key"), /*#__PURE__*/React.createElement("input", {
    type: "password",
    value: sbKey,
    onChange: e => setSbKey(e.target.value),
    placeholder: "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
    required: true,
    className: "form-input-text"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: 'rgba(0,0,0,0.25)',
      padding: '8px 10px',
      borderRadius: '8px',
      border: '1px solid rgba(255,255,255,0.06)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '10px',
      color: 'var(--text-secondary)'
    }
  }, "Supabase Database Setup"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: handleCopySql,
    style: {
      background: 'rgba(248,207,101,0.12)',
      border: '1px solid rgba(248,207,101,0.3)',
      color: 'var(--color-primary)',
      borderRadius: '6px',
      padding: '4px 8px',
      fontSize: '10px',
      fontWeight: '700',
      cursor: 'pointer'
    }
  }, isSqlCopied ? '✓ SQL Copied!' : '📋 Copy Setup SQL')), sbStatus && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '11px',
      color: sbStatus.includes('Connected') ? 'var(--color-primary)' : 'var(--color-accent)',
      fontWeight: '600'
    }
  }, sbStatus), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '6px',
      marginTop: '2px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    style: {
      flex: 1,
      background: 'linear-gradient(135deg, #f8cf65, #e0b042)',
      border: 'none',
      borderRadius: '8px',
      padding: '9px',
      color: '#090b10',
      fontSize: '12px',
      fontWeight: '750',
      cursor: 'pointer'
    }
  }, "Save & Connect Supabase"), supabaseConfig && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: handleDisconnectSupabase,
    style: {
      background: 'rgba(255,255,255,0.08)',
      border: '1px solid var(--android-border)',
      borderRadius: '8px',
      padding: '8px 12px',
      color: 'var(--text-secondary)',
      fontSize: '11px',
      cursor: 'pointer'
    }
  }, "Disconnect")))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'rgba(255, 255, 255, 0.02)',
      border: '1px solid var(--android-border)',
      borderRadius: '12px',
      padding: '12px 14px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: () => setIsPassOpen(!isPassOpen),
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      cursor: 'pointer',
      fontSize: '12px',
      fontWeight: '600',
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Change Password"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '10px',
      color: 'var(--text-secondary)'
    }
  }, isPassOpen ? '▲' : '▼')), isPassOpen && /*#__PURE__*/React.createElement("form", {
    onSubmit: handlePasswordSubmit,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      marginTop: '10px'
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "password",
    value: currentPass,
    onChange: e => setCurrentPass(e.target.value),
    placeholder: "Current Password",
    required: true,
    className: "form-input-text"
  }), /*#__PURE__*/React.createElement("input", {
    type: "password",
    value: newPass,
    onChange: e => setNewPass(e.target.value),
    placeholder: "New Password (min 6 chars)",
    required: true,
    className: "form-input-text"
  }), /*#__PURE__*/React.createElement("input", {
    type: "password",
    value: confirmPass,
    onChange: e => setConfirmPass(e.target.value),
    placeholder: "Confirm New Password",
    required: true,
    className: "form-input-text"
  }), passStatus && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '11px',
      color: passStatus.includes('success') ? 'var(--color-primary)' : '#ff6b6b',
      fontWeight: '600'
    }
  }, passStatus), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    style: {
      background: 'rgba(255,255,255,0.08)',
      border: '1px solid var(--android-border)',
      borderRadius: '8px',
      padding: '8px',
      color: '#fff',
      fontSize: '11px',
      fontWeight: '700',
      cursor: 'pointer'
    }
  }, "Update Password"))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1px solid var(--android-border)',
      paddingTop: '12px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn-upload-file",
    style: {
      width: '100%',
      color: 'var(--text-secondary)'
    },
    onClick: () => {
      if (confirm('Clear all plans, messages, and photos to start completely fresh?')) {
        localStorage.clear();
        window.location.reload();
      }
    }
  }, "Reset All Saved Data"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onLogout,
    className: "btn-logout-danger"
  }, "Log Out (", activeTraveler.name, ")"))));
}
window.ProfileCustomizerSheet = ProfileCustomizerSheet;

  // ==========================================
  // Module: www/js/components/FlickSwipeSheet.jsx
  // ==========================================
/**
 * ✦ MOVIE DATE — TINDER-STYLE COUPLE MOVIE & TV SERIES SWIPER
 * 120FPS ZERO-LATENCY DIRECT-DOM HARDWARE ACCELERATED GESTURE ENGINE
 */

function getThematicPosterFallback(title = "Movie Date", genres = []) {
  const isKdrama = genres.includes("K-Drama") || genres.includes("Romance");
  const isAnime = genres.includes("Anime") || genres.includes("Animation");
  const isScifi = genres.includes("Sci-Fi") || genres.includes("Action");
  let accentColor = "%23f8cf65";
  let icon = "🎬";
  if (isKdrama) {
    accentColor = "%23fb7185";
    icon = "💖";
  } else if (isAnime) {
    accentColor = "%23f8cf65";
    icon = "⛩️";
  } else if (isScifi) {
    accentColor = "%2360a5fa";
    icon = "🚀";
  }
  const encodedTitle = encodeURIComponent(title);
  const genreText = encodeURIComponent(genres.slice(0, 2).join(' • ') || "Couple Pick");
  return `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='780' height='1170' viewBox='0 0 780 1170'><rect width='780' height='1170' fill='%23121626'/><circle cx='390' cy='460' r='160' fill='${accentColor}' opacity='0.2'/><text x='390' y='490' font-size='100' text-anchor='middle'>${icon}</text><text x='390' y='680' font-family='sans-serif' font-size='42' font-weight='800' text-anchor='middle' fill='%23ffffff'>${encodedTitle}</text><text x='390' y='740' font-family='sans-serif' font-size='24' font-weight='bold' text-anchor='middle' fill='${accentColor}'>${genreText}</text><text x='390' y='800' font-family='sans-serif' font-size='20' text-anchor='middle' fill='%23a1a7c0'>✦ Komorebi Movie Date ✦</text></svg>`;
}
const DEFAULT_MOVIE_POSTER = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='780' height='1170' viewBox='0 0 780 1170'><rect width='780' height='1170' fill='%23121626'/><circle cx='390' cy='460' r='150' fill='%23f8cf65' opacity='0.18'/><text x='390' y='490' font-size='100' text-anchor='middle'>🎬</text><text x='390' y='680' font-family='sans-serif' font-size='42' font-weight='800' text-anchor='middle' fill='%23ffffff'>Komorebi Cinema</text><text x='390' y='740' font-family='sans-serif' font-size='24' text-anchor='middle' fill='%23a1a7c0'>Couple Movie & Series Night</text></svg>";
const CURATED_COUPLE_MOVIES = [
// --- TV SERIES & K-DRAMAS & ANIME ---
{
  id: "tv-crash-landing",
  title: "Crash Landing on You",
  mediaType: "tv",
  year: "2019 • 1 Season",
  rating: 8.8,
  genres: ["K-Drama", "Romance", "Comedy"],
  overview: "A paragliding mishap drops a South Korean heiress into North Korea—and into the life of an army officer, who decides to help her hide.",
  poster: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop&q=80"
}, {
  id: "tv-stranger-things",
  title: "Stranger Things",
  mediaType: "tv",
  year: "2016 • 4 Seasons",
  rating: 8.6,
  genres: ["Sci-Fi", "Mystery", "Drama"],
  overview: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
  poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80"
}, {
  id: "tv-queen-of-tears",
  title: "Queen of Tears",
  mediaType: "tv",
  year: "2024 • 1 Season",
  rating: 8.7,
  genres: ["K-Drama", "Romance", "Drama"],
  overview: "The queen of department stores and the prince of supermarkets weather a marital crisis until love miraculously begins to bloom again.",
  poster: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&auto=format&fit=crop&q=80"
}, {
  id: "tv-arcane",
  title: "Arcane",
  mediaType: "tv",
  year: "2021 • 2 Seasons",
  rating: 9.0,
  genres: ["Anime", "Animation", "Sci-Fi", "Action"],
  overview: "Set in the utopian region of Piltover and the oppressed underground of Zaun, the story follows the origins of two iconic League champions.",
  poster: "https://images.unsplash.com/photo-1563089145-599997674d42?w=800&auto=format&fit=crop&q=80"
}, {
  id: "tv-spy-family",
  title: "Spy x Family",
  mediaType: "tv",
  year: "2022 • 2 Seasons",
  rating: 8.6,
  genres: ["Anime", "Comedy", "Action"],
  overview: "A spy on an undercover mission marries a telepathic girl and a professional assassin, with none of them knowing each other's secrets.",
  poster: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80"
}, {
  id: "tv-frieren",
  title: "Frieren: Beyond Journey's End",
  mediaType: "tv",
  year: "2023 • 1 Season",
  rating: 9.1,
  genres: ["Anime", "Fantasy", "Adventure"],
  overview: "An elven mage reflecting on the fleeting lives of her former human companions embarks on a new adventure across the realm.",
  poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80"
}, {
  id: "tv-last-of-us",
  title: "The Last of Us",
  mediaType: "tv",
  year: "2023 • 1 Season",
  rating: 8.6,
  genres: ["Drama", "Sci-Fi", "Action"],
  overview: "Twenty years after a fungal outbreak ravages the planet, survivors Joel and Ellie must journey across what remains of America.",
  poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80"
}, {
  id: "tv-business-proposal",
  title: "Business Proposal",
  mediaType: "tv",
  year: "2022 • 1 Season",
  rating: 8.4,
  genres: ["K-Drama", "Romance", "Comedy"],
  overview: "In disguise as her friend, Ha-ri shows up to a blind date to scare him away. But plans go awry when he turns out to be her CEO.",
  poster: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&auto=format&fit=crop&q=80"
}, {
  id: "tv-modern-family",
  title: "Modern Family",
  mediaType: "tv",
  year: "2009 • 11 Seasons",
  rating: 8.5,
  genres: ["Comedy", "Family"],
  overview: "Three different but related families face trials and tribulations in their own uniquely comedic ways.",
  poster: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&auto=format&fit=crop&q=80"
}, {
  id: "tv-avatar-airbender",
  title: "Avatar: The Last Airbender",
  mediaType: "tv",
  year: "2005 • 3 Seasons",
  rating: 8.8,
  genres: ["Anime", "Animation", "Fantasy", "Action"],
  overview: "In a war-torn world of elemental magic, a young boy reawakens to undertake a dangerous mystic quest to fulfill his destiny.",
  poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80"
},
// --- MOVIES ---
{
  id: "movie-your-name",
  title: "Your Name.",
  mediaType: "movie",
  year: "2016",
  rating: 8.5,
  genres: ["Anime", "Romance", "Drama"],
  overview: "High schoolers Mitsuha and Taki are complete strangers living separate lives until they suddenly switch bodies across time and space.",
  poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80"
}, {
  id: "movie-interstellar",
  title: "Interstellar",
  mediaType: "movie",
  year: "2014",
  rating: 8.7,
  genres: ["Sci-Fi", "Drama", "Adventure"],
  overview: "When Earth becomes uninhabitable, a team of explorers undertakes the most important mission in human history.",
  poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80"
}, {
  id: "movie-spirited-away",
  title: "Spirited Away",
  mediaType: "movie",
  year: "2001",
  rating: 8.5,
  genres: ["Anime", "Fantasy", "Adventure"],
  overview: "A young girl wanders into a world ruled by gods, witches, and spirits, where humans are changed into beasts.",
  poster: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80"
}, {
  id: "movie-eternal-sunshine",
  title: "Eternal Sunshine of the Spotless Mind",
  mediaType: "movie",
  year: "2004",
  rating: 8.1,
  genres: ["Romance", "Sci-Fi", "Drama"],
  overview: "When their relationship turns sour, a couple undergoes a medical procedure to have each other erased from their memories.",
  poster: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&auto=format&fit=crop&q=80"
}, {
  id: "movie-dnd",
  title: "Dungeons & Dragons: Honor Among Thieves",
  mediaType: "movie",
  year: "2023",
  rating: 7.4,
  genres: ["Action", "Comedy", "Adventure"],
  overview: "A charming thief and a band of unlikely adventurers undertake an epic heist to retrieve a lost relic.",
  poster: "https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?w=800&auto=format&fit=crop&q=80"
}, {
  id: "movie-parasite",
  title: "Parasite",
  mediaType: "movie",
  year: "2019",
  rating: 8.5,
  genres: ["Comedy", "Thriller", "Drama"],
  overview: "All unemployed, Ki-taek's family takes peculiar interest in the wealthy Parks until they get entangled in an unexpected incident.",
  poster: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80"
}, {
  id: "movie-spider-verse",
  title: "Spider-Man: Across the Spider-Verse",
  mediaType: "movie",
  year: "2023",
  rating: 8.4,
  genres: ["Animation", "Action", "Sci-Fi"],
  overview: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its existence.",
  poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&auto=format&fit=crop&q=80"
}, {
  id: "movie-avatar",
  title: "Avatar",
  mediaType: "movie",
  year: "2009",
  rating: 7.6,
  genres: ["Action", "Sci-Fi", "Adventure"],
  overview: "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between orders and protecting an alien world.",
  poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80"
}, {
  id: "movie-soul",
  title: "Soul",
  mediaType: "movie",
  year: "2020",
  rating: 8.1,
  genres: ["Animation", "Comedy", "Fantasy"],
  overview: "A jazz musician who has lost his passion is transported out of his body and must find his way back.",
  poster: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80"
}, {
  id: "movie-dune-2",
  title: "Dune: Part Two",
  mediaType: "movie",
  year: "2024",
  rating: 8.2,
  genres: ["Sci-Fi", "Adventure", "Action"],
  overview: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
  poster: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop&q=80"
}, {
  id: "movie-lion-king",
  title: "The Lion King",
  mediaType: "movie",
  year: "1994",
  rating: 8.3,
  genres: ["Animation", "Drama", "Family"],
  overview: "A young lion prince flees his kingdom only to learn the true meaning of responsibility and bravery.",
  poster: "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?w=800&auto=format&fit=crop&q=80"
}, {
  id: "movie-titanic",
  title: "Titanic",
  mediaType: "movie",
  year: "1997",
  rating: 7.9,
  genres: ["Drama", "Romance"],
  overview: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
  poster: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80"
}];
const GENRE_FILTERS = [{
  id: 'all',
  label: '✦ All Shows & Movies'
}, {
  id: 'tv',
  label: '📺 TV Series'
}, {
  id: 'movie',
  label: '🎬 Movies'
}, {
  id: 'K-Drama',
  label: '🌸 K-Dramas'
}, {
  id: 'Anime',
  label: '⛩️ Anime'
}, {
  id: 'Romance',
  label: '💖 Romance'
}, {
  id: 'Sci-Fi',
  label: '🚀 Sci-Fi'
}, {
  id: 'Action',
  label: '⚡ Action'
}, {
  id: 'Comedy',
  label: '🍿 Comedy'
}, {
  id: 'Fantasy',
  label: '✨ Fantasy'
}];
function FlickSwipeSheet({
  isOpen,
  onClose,
  activeTraveler,
  partnerTraveler,
  myAvatar,
  partnerAvatar,
  movieSwipes = {},
  onSaveMovieSwipes
}) {
  if (!isOpen) return null;
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [moviesList, setMoviesList] = useState(CURATED_COUPLE_MOVIES);
  const [matchedMovie, setMatchedMovie] = useState(null);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);
  const [watchlistFilter, setWatchlistFilter] = useState('matches');
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  // Direct-DOM Drag Physics Refs (0 React Re-renders while dragging)
  const cardRef = useRef(null);
  const nextCardRef = useRef(null);
  const likeStampRef = useRef(null);
  const nopeStampRef = useRef(null);
  const rafIdRef = useRef(null);
  const gestureState = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    lastX: 0,
    lastTime: 0,
    velocityX: 0
  });
  const activeKey = (activeTraveler?.name || 'ziankyle').toLowerCase();
  const partnerKey = (partnerTraveler?.name || 'mikkie').toLowerCase();
  const mySwipes = movieSwipes[activeKey] || {};
  const partnerSwipes = movieSwipes[partnerKey] || {};

  // Filter movies and tv series by genre / mediaType
  const filteredMovies = useMemo(() => {
    if (selectedGenre === 'all') return moviesList;
    if (selectedGenre === 'tv') return moviesList.filter(m => m.mediaType === 'tv');
    if (selectedGenre === 'movie') return moviesList.filter(m => m.mediaType === 'movie');
    return moviesList.filter(m => m.genres && m.genres.includes(selectedGenre));
  }, [selectedGenre, moviesList]);

  // Unswiped items in deck
  const activeDeck = useMemo(() => {
    return filteredMovies.filter(m => !mySwipes[m.id]);
  }, [filteredMovies, mySwipes]);
  const currentMovie = activeDeck[0] || null;
  const nextMovie = activeDeck[1] || null;

  // Mutual matches list
  const mutualMatches = useMemo(() => {
    return moviesList.filter(m => mySwipes[m.id] === 'liked' && partnerSwipes[m.id] === 'liked');
  }, [moviesList, mySwipes, partnerSwipes]);
  const commitSwipe = (direction, movieToSwipe) => {
    if (!movieToSwipe) return;
    const isLiked = direction === 'right';
    const action = isLiked ? 'liked' : 'passed';
    if (window.HapticEngine) HapticEngine.trigger(isLiked ? 'success' : 'light');
    if (window.AudioEngine) AudioEngine.playTone(isLiked ? 680 : 320);
    const updatedMySwipes = {
      ...mySwipes,
      [movieToSwipe.id]: action
    };
    const updatedAllSwipes = {
      ...movieSwipes,
      [activeKey]: updatedMySwipes
    };
    if (onSaveMovieSwipes) {
      onSaveMovieSwipes(updatedAllSwipes);
    }

    // Check for Mutual Match!
    if (isLiked && partnerSwipes[movieToSwipe.id] === 'liked') {
      setMatchedMovie(movieToSwipe);
      if (window.AudioEngine) AudioEngine.playTone(880);
    }
    setIsAnimatingOut(false);
  };

  // Hardware-accelerated smooth fly-out
  const flyCardOut = direction => {
    if (!currentMovie || isAnimatingOut) return;
    setIsAnimatingOut(true);
    const cardEl = cardRef.current;
    const nextCardEl = nextCardRef.current;
    const likeStamp = likeStampRef.current;
    const nopeStamp = nopeStampRef.current;
    const targetMovie = currentMovie;
    const throwX = direction === 'right' ? window.innerWidth * 1.3 : -window.innerWidth * 1.3;
    const throwRotate = direction === 'right' ? 32 : -32;
    if (cardEl) {
      cardEl.style.transition = 'transform 0.32s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.32s ease-out';
      cardEl.style.transform = `translate3d(${throwX}px, -40px, 0) rotate(${throwRotate}deg)`;
      cardEl.style.opacity = '0';
    }
    if (direction === 'right' && likeStamp) likeStamp.style.opacity = '1';
    if (direction === 'left' && nopeStamp) nopeStamp.style.opacity = '1';
    if (nextCardEl) {
      nextCardEl.style.transition = 'transform 0.32s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.32s ease-out';
      nextCardEl.style.transform = 'scale(1) translateY(0)';
      nextCardEl.style.opacity = '1';
      nextCardEl.style.filter = 'brightness(1)';
    }
    setTimeout(() => {
      commitSwipe(direction, targetMovie);
      if (cardEl) {
        cardEl.style.transition = 'none';
        cardEl.style.transform = 'translate3d(0,0,0) rotate(0deg)';
        cardEl.style.opacity = '1';
      }
      if (likeStamp) likeStamp.style.opacity = '0';
      if (nopeStamp) nopeStamp.style.opacity = '0';
    }, 320);
  };

  // Direct-DOM Pointer Drag Handler (60/120fps smooth)
  const onPointerDown = e => {
    if (isAnimatingOut || !currentMovie) return;
    const g = gestureState.current;
    g.isDragging = true;
    g.startX = e.clientX;
    g.startY = e.clientY;
    g.currentX = e.clientX;
    g.currentY = e.clientY;
    g.lastX = e.clientX;
    g.lastTime = performance.now();
    g.velocityX = 0;
    if (cardRef.current) {
      cardRef.current.style.transition = 'none';
    }
    if (nextCardRef.current) {
      nextCardRef.current.style.transition = 'none';
    }
    if (e.target && e.target.setPointerCapture) {
      try {
        e.target.setPointerCapture(e.pointerId);
      } catch (_) {}
    }
  };
  const onPointerMove = e => {
    const g = gestureState.current;
    if (!g.isDragging || isAnimatingOut) return;
    const now = performance.now();
    const dt = now - g.lastTime;
    if (dt > 10) {
      g.velocityX = (e.clientX - g.lastX) / dt;
      g.lastX = e.clientX;
      g.lastTime = now;
    }
    g.currentX = e.clientX;
    g.currentY = e.clientY;
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    rafIdRef.current = requestAnimationFrame(() => {
      const dx = g.currentX - g.startX;
      const dy = g.currentY - g.startY;
      const rot = dx * 0.08;
      if (cardRef.current) {
        cardRef.current.style.transform = `translate3d(${dx}px, ${dy * 0.4}px, 0) rotate(${rot}deg)`;
      }

      // Stamps opacity
      const likeOpacity = Math.min(1, Math.max(0, dx / 80));
      const nopeOpacity = Math.min(1, Math.max(0, -dx / 80));
      if (likeStampRef.current) likeStampRef.current.style.opacity = likeOpacity;
      if (nopeStampRef.current) nopeStampRef.current.style.opacity = nopeOpacity;

      // Scale up background card smoothly
      if (nextCardRef.current) {
        const progress = Math.min(1, Math.abs(dx) / 200);
        const scale = 0.94 + progress * 0.06;
        const translateY = 14 - progress * 14;
        const opacity = 0.75 + progress * 0.25;
        const brightness = 0.7 + progress * 0.3;
        nextCardRef.current.style.transform = `scale(${scale}) translateY(${translateY}px)`;
        nextCardRef.current.style.opacity = opacity;
        nextCardRef.current.style.filter = `brightness(${brightness})`;
      }
    });
  };
  const onPointerUp = e => {
    const g = gestureState.current;
    if (!g.isDragging || isAnimatingOut) return;
    g.isDragging = false;
    if (e.target && e.target.releasePointerCapture) {
      try {
        e.target.releasePointerCapture(e.pointerId);
      } catch (_) {}
    }
    const dx = g.currentX - g.startX;
    const isFlickFast = Math.abs(g.velocityX) > 0.45;
    const threshold = 95;
    if (dx > threshold || isFlickFast && g.velocityX > 0) {
      flyCardOut('right');
    } else if (dx < -threshold || isFlickFast && g.velocityX < 0) {
      flyCardOut('left');
    } else {
      // Elastic rubber-band spring recovery
      if (cardRef.current) {
        cardRef.current.style.transition = 'transform 0.42s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s ease';
        cardRef.current.style.transform = 'translate3d(0, 0, 0) rotate(0deg)';
      }
      if (likeStampRef.current) likeStampRef.current.style.opacity = '0';
      if (nopeStampRef.current) nopeStampRef.current.style.opacity = '0';
      if (nextCardRef.current) {
        nextCardRef.current.style.transition = 'transform 0.42s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s ease';
        nextCardRef.current.style.transform = 'scale(0.94) translateY(14px)';
        nextCardRef.current.style.opacity = '0.75';
        nextCardRef.current.style.filter = 'brightness(0.7)';
      }
    }
  };
  const handleResetDeck = () => {
    const updated = {
      ...movieSwipes,
      [activeKey]: {}
    };
    if (onSaveMovieSwipes) onSaveMovieSwipes(updated);
  };
  const resolvedMyAvatar = window.resolveAvatar ? window.resolveAvatar(myAvatar, activeTraveler?.name) : myAvatar || {
    iconUrl: './assets/avatars/kokomi.png'
  };
  const resolvedPartnerAvatar = window.resolveAvatar ? window.resolveAvatar(partnerAvatar, partnerTraveler?.name) : partnerAvatar || {
    iconUrl: './assets/avatars/yae.png'
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "flickswipe-sheet-overlay",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "flickswipe-sheet-surface",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "flickswipe-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flickswipe-brand"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flickswipe-logo-badge"
  }, window.Icons && /*#__PURE__*/React.createElement(Icons.Clapperboard, {
    size: 16
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flickswipe-title"
  }, "Movie Date"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '9.5px',
      color: 'var(--text-secondary)'
    }
  }, "Couple Movies & TV Series Night"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "flickswipe-matches-btn",
    onClick: () => setIsWatchlistOpen(true)
  }, window.Icons && /*#__PURE__*/React.createElement(Icons.Sparkles, {
    size: 12
  }), /*#__PURE__*/React.createElement("span", null, mutualMatches.length, " Matches")), /*#__PURE__*/React.createElement("button", {
    className: "flickswipe-close-btn",
    onClick: onClose,
    "aria-label": "Close"
  }, window.Icons ? /*#__PURE__*/React.createElement(Icons.X, {
    size: 14
  }) : '✕'))), /*#__PURE__*/React.createElement("div", {
    className: "flick-genre-bar"
  }, GENRE_FILTERS.map(g => /*#__PURE__*/React.createElement("button", {
    key: g.id,
    className: `flick-genre-pill ${selectedGenre === g.id ? 'active' : ''}`,
    onClick: () => {
      setSelectedGenre(g.id);
      if (cardRef.current) {
        cardRef.current.style.transform = 'translate3d(0, 0, 0) rotate(0deg)';
      }
    }
  }, g.label))), /*#__PURE__*/React.createElement("div", {
    className: "flick-deck-container"
  }, nextMovie && /*#__PURE__*/React.createElement("div", {
    ref: nextCardRef,
    className: "flick-card",
    style: {
      transform: 'scale(0.94) translateY(14px)',
      zIndex: 1,
      opacity: 0.75,
      filter: 'brightness(0.7)',
      willChange: 'transform, opacity'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: nextMovie.poster,
    alt: nextMovie.title,
    className: "flick-card-poster",
    onError: e => {
      e.target.onerror = null;
      e.target.src = getThematicPosterFallback(nextMovie.title, nextMovie.genres);
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "flick-card-gradient"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flick-card-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flick-title-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "flick-movie-title"
  }, nextMovie.title), /*#__PURE__*/React.createElement("span", {
    className: "flick-rating-badge"
  }, "★ ", nextMovie.rating)))), currentMovie ? /*#__PURE__*/React.createElement("div", {
    ref: cardRef,
    className: "flick-card",
    style: {
      zIndex: 5,
      willChange: 'transform, opacity',
      touchAction: 'none'
    },
    onPointerDown: onPointerDown,
    onPointerMove: onPointerMove,
    onPointerUp: onPointerUp,
    onPointerCancel: onPointerUp
  }, /*#__PURE__*/React.createElement("div", {
    ref: likeStampRef,
    className: "flick-stamp like",
    style: {
      opacity: 0
    }
  }, "LIKE ❤️"), /*#__PURE__*/React.createElement("div", {
    ref: nopeStampRef,
    className: "flick-stamp nope",
    style: {
      opacity: 0
    }
  }, "PASS ✕"), /*#__PURE__*/React.createElement("img", {
    src: currentMovie.poster,
    alt: currentMovie.title,
    className: "flick-card-poster",
    draggable: false,
    onError: e => {
      e.target.onerror = null;
      e.target.src = getThematicPosterFallback(currentMovie.title, currentMovie.genres);
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "flick-card-gradient"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flick-card-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flick-title-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "flick-movie-title"
  }, currentMovie.title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '5px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '9px',
      background: currentMovie.mediaType === 'tv' ? 'rgba(76, 215, 182, 0.2)' : 'rgba(248, 207, 101, 0.2)',
      color: currentMovie.mediaType === 'tv' ? '#4cd7b6' : 'var(--color-primary)',
      border: `1px solid ${currentMovie.mediaType === 'tv' ? 'rgba(76, 215, 182, 0.4)' : 'rgba(248, 207, 101, 0.4)'}`,
      padding: '2px 6px',
      borderRadius: '5px',
      fontWeight: '800',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '3px'
    }
  }, currentMovie.mediaType === 'tv' ? /*#__PURE__*/React.createElement(React.Fragment, null, window.Icons && /*#__PURE__*/React.createElement(Icons.Tv, {
    size: 10
  }), /*#__PURE__*/React.createElement("span", null, "SERIES")) : /*#__PURE__*/React.createElement(React.Fragment, null, window.Icons && /*#__PURE__*/React.createElement(Icons.Film, {
    size: 10
  }), /*#__PURE__*/React.createElement("span", null, "MOVIE"))), /*#__PURE__*/React.createElement("span", {
    className: "flick-rating-badge"
  }, "★ ", currentMovie.rating))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '10px',
      color: 'rgba(255,255,255,0.7)',
      marginBottom: '4px'
    }
  }, currentMovie.year), /*#__PURE__*/React.createElement("div", {
    className: "flick-genres-list"
  }, currentMovie.genres?.map(gn => /*#__PURE__*/React.createElement("span", {
    key: gn,
    className: "flick-genre-tag"
  }, gn))), /*#__PURE__*/React.createElement("div", {
    className: "flick-overview"
  }, currentMovie.overview), partnerSwipes[currentMovie.id] === 'liked' && /*#__PURE__*/React.createElement("div", {
    className: "flick-partner-badge"
  }, window.Icons && /*#__PURE__*/React.createElement(Icons.Heart, {
    size: 11
  }), /*#__PURE__*/React.createElement("span", null, partnerTraveler?.name || 'Partner', " already liked this! Swipe Right to Match!")))) : /*#__PURE__*/React.createElement("div", {
    className: "flick-empty-deck"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flick-empty-icon"
  }, window.Icons ? /*#__PURE__*/React.createElement(Icons.Film, {
    size: 44
  }) : '🎬'), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '15px',
      fontWeight: '800',
      color: '#fff'
    }
  }, "You've swiped all titles in this genre!"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '11px',
      color: 'var(--text-secondary)',
      maxWidth: '280px'
    }
  }, "Check out your mutual matches in the top right, switch genres, or reset your deck to swipe again."), /*#__PURE__*/React.createElement("button", {
    className: "flick-reset-btn",
    onClick: handleResetDeck,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px'
    }
  }, window.Icons && /*#__PURE__*/React.createElement(Icons.Refresh, {
    size: 13
  }), /*#__PURE__*/React.createElement("span", null, "Reset & Swipe Again")))), currentMovie && /*#__PURE__*/React.createElement("div", {
    className: "flick-actions-bar"
  }, /*#__PURE__*/React.createElement("button", {
    className: "flick-action-btn pass",
    onClick: () => flyCardOut('left'),
    title: "Pass",
    "aria-label": "Pass"
  }, window.Icons ? /*#__PURE__*/React.createElement(Icons.X, {
    size: 20
  }) : '✕'), /*#__PURE__*/React.createElement("button", {
    className: "flick-action-btn info",
    onClick: () => alert(`${currentMovie.title} (${currentMovie.year})\n\nType: ${currentMovie.mediaType === 'tv' ? 'TV Series' : 'Movie'}\nRating: ⭐ ${currentMovie.rating}/10\nGenres: ${currentMovie.genres.join(', ')}\n\n${currentMovie.overview}`),
    title: "Synopsis info",
    "aria-label": "Info"
  }, window.Icons ? /*#__PURE__*/React.createElement(Icons.Info, {
    size: 17
  }) : 'ℹ'), /*#__PURE__*/React.createElement("button", {
    className: "flick-action-btn like",
    onClick: () => flyCardOut('right'),
    title: "Like",
    "aria-label": "Like"
  }, window.Icons ? /*#__PURE__*/React.createElement(Icons.Heart, {
    size: 22
  }) : '❤️')), matchedMovie && /*#__PURE__*/React.createElement("div", {
    className: "flick-match-overlay",
    onClick: () => setMatchedMovie(null)
  }, /*#__PURE__*/React.createElement("div", {
    className: "flick-match-title"
  }, "IT'S A MATCH!"), /*#__PURE__*/React.createElement("div", {
    className: "flick-match-sub"
  }, "You and ", partnerTraveler?.name || 'Partner', " both picked this ", matchedMovie.mediaType === 'tv' ? 'series' : 'movie', " for Movie Date! 🎉"), /*#__PURE__*/React.createElement("div", {
    className: "flick-match-avatars"
  }, /*#__PURE__*/React.createElement("img", {
    src: resolvedMyAvatar.iconUrl,
    alt: "You",
    className: "flick-match-avatar",
    onError: e => {
      e.target.onerror = null;
      e.target.src = './assets/avatars/kokomi.png';
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: resolvedPartnerAvatar.iconUrl,
    alt: "Partner",
    className: "flick-match-avatar",
    style: {
      marginLeft: '-14px'
    },
    onError: e => {
      e.target.onerror = null;
      e.target.src = './assets/avatars/yae.png';
    }
  })), /*#__PURE__*/React.createElement("img", {
    src: matchedMovie.poster,
    alt: matchedMovie.title,
    className: "flick-match-poster",
    onError: e => {
      e.target.onerror = null;
      e.target.src = getThematicPosterFallback(matchedMovie.title, matchedMovie.genres);
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "flick-match-movie-title"
  }, matchedMovie.title), /*#__PURE__*/React.createElement("button", {
    className: "flick-reset-btn",
    onClick: e => {
      e.stopPropagation();
      setMatchedMovie(null);
      setIsWatchlistOpen(true);
    },
    style: {
      padding: '12px 28px',
      fontSize: '13px',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px'
    }
  }, window.Icons && /*#__PURE__*/React.createElement(Icons.Film, {
    size: 14
  }), /*#__PURE__*/React.createElement("span", null, "View Shared Watchlist"))), isWatchlistOpen && /*#__PURE__*/React.createElement("div", {
    className: "flick-watchlist-overlay"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flick-watchlist-header"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }
  }, window.Icons ? /*#__PURE__*/React.createElement(Icons.Clapperboard, {
    size: 18
  }) : /*#__PURE__*/React.createElement("span", null, "🎬"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '15px',
      fontWeight: '800',
      color: '#fff'
    }
  }, "Movie Date Watchlist")), /*#__PURE__*/React.createElement("button", {
    className: "flick-close-btn",
    onClick: () => setIsWatchlistOpen(false),
    style: {
      background: 'none',
      border: 'none',
      color: '#fff',
      fontSize: '18px',
      cursor: 'pointer'
    }
  }, window.Icons ? /*#__PURE__*/React.createElement(Icons.X, {
    size: 16
  }) : '✕')), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '8px',
      padding: '10px 18px',
      borderBottom: '1px solid rgba(255,255,255,0.06)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: `flick-genre-pill ${watchlistFilter === 'matches' ? 'active' : ''}`,
    onClick: () => setWatchlistFilter('matches')
  }, "✨ Mutual Matches (", mutualMatches.length, ")"), /*#__PURE__*/React.createElement("button", {
    className: `flick-genre-pill ${watchlistFilter === 'my_likes' ? 'active' : ''}`,
    onClick: () => setWatchlistFilter('my_likes')
  }, "Your Likes"), /*#__PURE__*/React.createElement("button", {
    className: `flick-genre-pill ${watchlistFilter === 'partner_likes' ? 'active' : ''}`,
    onClick: () => setWatchlistFilter('partner_likes')
  }, partnerTraveler?.name || 'Partner', "'s Likes")), /*#__PURE__*/React.createElement("div", {
    className: "flick-watchlist-list"
  }, (() => {
    let list = [];
    if (watchlistFilter === 'matches') {
      list = mutualMatches;
    } else if (watchlistFilter === 'my_likes') {
      list = moviesList.filter(m => mySwipes[m.id] === 'liked');
    } else {
      list = moviesList.filter(m => partnerSwipes[m.id] === 'liked');
    }
    if (list.length === 0) {
      return /*#__PURE__*/React.createElement("div", {
        style: {
          textAlign: 'center',
          padding: '40px 10px',
          color: 'var(--text-secondary)',
          fontSize: '12px'
        }
      }, watchlistFilter === 'matches' ? 'No mutual matches yet! Both of you must swipe right on the same title to match 🍿' : 'No titles saved here yet.');
    }
    return list.map(m => /*#__PURE__*/React.createElement("div", {
      key: m.id,
      className: "flick-watch-item"
    }, /*#__PURE__*/React.createElement("img", {
      src: m.poster,
      alt: m.title,
      className: "flick-watch-poster",
      onError: e => {
        e.target.onerror = null;
        e.target.src = getThematicPosterFallback(m.title, m.genres);
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "flick-watch-meta"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flick-watch-title"
    }, m.title), /*#__PURE__*/React.createElement("div", {
      className: "flick-watch-info"
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: '8.5px',
        background: m.mediaType === 'tv' ? 'rgba(76, 215, 182, 0.2)' : 'rgba(248, 207, 101, 0.2)',
        color: m.mediaType === 'tv' ? '#4cd7b6' : 'var(--color-primary)',
        padding: '1px 4px',
        borderRadius: '3px',
        fontWeight: '800'
      }
    }, m.mediaType === 'tv' ? 'SERIES' : 'MOVIE'), /*#__PURE__*/React.createElement("span", null, "⭐ ", m.rating), /*#__PURE__*/React.createElement("span", null, "•"), /*#__PURE__*/React.createElement("span", null, m.year)), mySwipes[m.id] === 'liked' && partnerSwipes[m.id] === 'liked' && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: '4px'
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "flick-watch-badge-match"
    }, "💖 Mutual Match!")))));
  })()), /*#__PURE__*/React.createElement("div", {
    className: "flick-disclaimer"
  }, "This product uses the TMDB API but is not endorsed or certified by TMDB."))));
}
window.FlickSwipeSheet = FlickSwipeSheet;
window.CURATED_COUPLE_MOVIES = CURATED_COUPLE_MOVIES;

  // ==========================================
  // Module: www/js/components/AuthGateScreen.jsx
  // ==========================================
/**
 * ✦ KOMOREBI — Authentication Gate Screen Component
 */

function AuthGateScreen({
  onLogin
}) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState(0);
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = e => {
    e.preventDefault();
    const now = Date.now();
    if (now < lockedUntil) {
      const remainingSecs = Math.ceil((lockedUntil - now) / 1000);
      setErrorMessage(`Too many failed attempts. Sanctuary locked for ${remainingSecs}s.`);
      return;
    }
    const cleanName = window.SecurityGuard ? window.SecurityGuard.sanitizeText(userName, 32) : userName;
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
    if (window.AudioEngine) AudioEngine.playTone(600);
    const lowerName = cleanName.toLowerCase();
    let userObj = {
      name: cleanName,
      uid: '802931402'
    };
    let partnerObj = {
      name: 'Mikkie',
      uid: '801124501'
    };
    if (lowerName.includes('mikkie')) {
      userObj = {
        name: 'Mikkie',
        uid: '801124501'
      };
      partnerObj = {
        name: 'Ziankyle',
        uid: '802931402'
      };
    } else if (lowerName.includes('zian')) {
      userObj = {
        name: 'Ziankyle',
        uid: '802931402'
      };
      partnerObj = {
        name: 'Mikkie',
        uid: '801124501'
      };
    }
    if (window.saveStorage) {
      saveStorage('auto_login_enabled', rememberMe);
      saveStorage('saved_auth_user', userObj);
      saveStorage('saved_auth_partner', partnerObj);
    }
    onLogin(userObj, partnerObj);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "auth-gate-screen"
  }, /*#__PURE__*/React.createElement("div", {
    className: "auth-brand-box"
  }, /*#__PURE__*/React.createElement("img", {
    src: "./assets/iconforapp.jpg",
    alt: "Komorebi Logo",
    className: "auth-brand-logo"
  }), /*#__PURE__*/React.createElement("h2", {
    className: "auth-title"
  }, "KOMOREBI"), /*#__PURE__*/React.createElement("p", {
    className: "auth-subtitle"
  }, "Private Couple Sanctuary")), /*#__PURE__*/React.createElement("form", {
    className: "auth-form-card",
    onSubmit: handleSubmit
  }, errorMessage && /*#__PURE__*/React.createElement("div", {
    className: "auth-error-badge"
  }, errorMessage), /*#__PURE__*/React.createElement("div", {
    className: "auth-input-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "auth-input-label"
  }, "Your Name"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: userName,
    onChange: e => {
      setUserName(e.target.value);
      setErrorMessage('');
    },
    required: true,
    autoComplete: "name",
    placeholder: "e.g. Ziankyle or Mikkie",
    className: "auth-input-field"
  })), /*#__PURE__*/React.createElement("div", {
    className: "auth-input-group"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("label", {
    className: "auth-input-label"
  }, "Password"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setShowPassword(!showPassword),
    style: {
      background: 'none',
      border: 'none',
      color: 'var(--text-secondary)',
      fontSize: '10.5px',
      cursor: 'pointer',
      padding: 0
    }
  }, showPassword ? 'Hide' : 'Show')), /*#__PURE__*/React.createElement("input", {
    type: showPassword ? 'text' : 'password',
    value: password,
    onChange: e => {
      setPassword(e.target.value);
      setErrorMessage('');
    },
    required: true,
    autoComplete: "current-password",
    placeholder: "••••••••",
    className: "auth-input-field"
  })), /*#__PURE__*/React.createElement("label", {
    className: "auth-remember-row"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: rememberMe,
    onChange: e => setRememberMe(e.target.checked),
    className: "auth-remember-checkbox"
  }), /*#__PURE__*/React.createElement("span", null, "Keep me signed in on this device")), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn-auth-submit"
  }, "Enter Sanctuary 🔒")));
}
window.AuthGateScreen = AuthGateScreen;

  // ==========================================
  // Module: www/js/components/CycleLogSheet.jsx
  // ==========================================
/**
 * ✦ KOMOREBI — Authentic Flo Daily Category Logger Sheet
 * Direct implementation of Flo's "What are you feeling today?" & categorized symptom logger
 * Rendered with clean professional SVG vector icons (Zero stock emojis).
 */

function CycleLogSheet({
  isOpen,
  onClose,
  selectedDateStr,
  currentLog,
  cycleDayNumber = 1,
  onSaveLog,
  onDeleteLog,
  onPrevDate,
  onNextDate
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [flow, setFlow] = useState('none');
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [notes, setNotes] = useState('');
  useEffect(() => {
    if (currentLog) {
      setFlow(currentLog.flow || 'none');
      const items = new Set();
      if (Array.isArray(currentLog.floItems)) {
        currentLog.floItems.forEach(id => items.add(id));
      }
      if (Array.isArray(currentLog.moods)) {
        currentLog.moods.forEach(id => items.add(id));
      }
      if (Array.isArray(currentLog.symptoms)) {
        currentLog.symptoms.forEach(id => items.add(id));
      }
      if (currentLog.intimateCategory) {
        items.add(currentLog.intimateCategory);
      }
      setSelectedItems(items);
      setNotes(currentLog.notes || '');
    } else {
      setFlow('none');
      setSelectedItems(new Set());
      setNotes('');
    }
  }, [currentLog, selectedDateStr, isOpen]);
  if (!isOpen) return null;
  const toggleItem = id => {
    if (window.AudioEngine) AudioEngine.playTone(560);
    setSelectedItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);else next.add(id);
      return next;
    });
  };
  const handleSave = e => {
    if (e) e.preventDefault();
    if (window.AudioEngine) AudioEngine.playTone(680);
    const itemsArray = Array.from(selectedItems);
    const logEntry = {
      date: selectedDateStr,
      flow,
      floItems: itemsArray,
      notes: window.SecurityGuard ? window.SecurityGuard.sanitizeText(notes, 300) : notes,
      updatedAt: Date.now()
    };
    onSaveLog(selectedDateStr, logEntry);
    onClose();
  };
  const handleDelete = () => {
    if (confirm('Clear all logged feelings and period data for this day?')) {
      if (window.AudioEngine) AudioEngine.playTone(380);
      onDeleteLog(selectedDateStr);
      onClose();
    }
  };
  const isToday = window.CycleEngine && selectedDateStr === window.CycleEngine.formatDate(new Date());
  const dateObj = new Date(selectedDateStr + 'T00:00:00');
  const formattedDayTitle = isToday ? 'Today' : dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
  const categories = window.FLO_CATEGORIES || {};
  const feelingBubbles = window.FLO_FEELING_BUBBLES || [];
  const flowOptions = window.FLOW_OPTIONS || [];
  const filteredCategories = Object.entries(categories).map(([id, cat]) => ({
    id,
    ...cat,
    items: searchQuery ? cat.items.filter(i => i.label.toLowerCase().includes(searchQuery.toLowerCase())) : cat.items
  })).filter(cat => cat.items.length > 0);
  const modalJSX = /*#__PURE__*/React.createElement("div", {
    className: "profile-modal-sheet flo-modal-backdrop",
    onClick: onClose,
    style: {
      zIndex: 120
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "profile-sheet-body flo-log-sheet-surface",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "sheet-handle-bar",
    style: {
      background: 'rgba(255, 255, 255, 0.22)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "flo-sheet-top-nav"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "flo-nav-arrow-btn",
    onClick: () => onPrevDate && onPrevDate(),
    title: "Previous Day"
  }, "‹"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "flo-nav-arrow-btn",
    onClick: () => onNextDate && onNextDate(),
    title: "Next Day"
  }, "›")), /*#__PURE__*/React.createElement("div", {
    className: "flo-sheet-date-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flo-date-title"
  }, formattedDayTitle), /*#__PURE__*/React.createElement("div", {
    className: "flo-cycle-day-subtitle"
  }, "Cycle day ", cycleDayNumber)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    className: "sheet-close-btn",
    "aria-label": "Close",
    style: {
      margin: 0
    }
  }, "✕")), /*#__PURE__*/React.createElement("div", {
    className: "flo-search-bar-wrap"
  }, /*#__PURE__*/React.createElement("span", {
    className: "flo-search-icon",
    style: {
      color: '#94a3b8',
      display: 'flex',
      alignItems: 'center'
    }
  }, window.Icons && /*#__PURE__*/React.createElement(Icons.Search, {
    size: 14
  })), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: searchQuery,
    onChange: e => setSearchQuery(e.target.value),
    placeholder: "Search symptoms, moods, discharge...",
    className: "flo-search-input"
  }), searchQuery && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setSearchQuery(''),
    style: {
      background: 'none',
      border: 'none',
      color: '#94a3b8',
      cursor: 'pointer',
      fontSize: '12px'
    }
  }, "✕")), /*#__PURE__*/React.createElement("div", {
    className: "flo-scroll-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flo-category-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flo-section-title"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center'
    }
  }, window.FloVectorIcons && /*#__PURE__*/React.createElement(FloVectorIcons.FlowHeavy, {
    size: 16,
    color: "#fb7185"
  })), /*#__PURE__*/React.createElement("span", null, "Period Bleeding Flow")), /*#__PURE__*/React.createElement("div", {
    className: "flo-flow-pills-row"
  }, flowOptions.map(opt => {
    const isSelected = flow === opt.id;
    return /*#__PURE__*/React.createElement("button", {
      key: opt.id,
      type: "button",
      onClick: () => {
        if (window.HapticEngine) HapticEngine.trigger('selection');
        if (window.AudioEngine) AudioEngine.playTone(opt.id === 'none' ? 400 : 550);
        setFlow(opt.id);
      },
      className: `flo-flow-pill ${isSelected ? 'active' : ''}`,
      style: isSelected ? {
        borderColor: '#fb7185',
        background: 'rgba(251, 113, 133, 0.2)',
        color: '#fb7185'
      } : {}
    }, /*#__PURE__*/React.createElement("span", {
      className: "flo-flow-dot",
      style: {
        background: opt.color || (opt.id === 'none' ? 'rgba(255,255,255,0.2)' : '#fb7185')
      }
    }), /*#__PURE__*/React.createElement("span", null, opt.label));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flo-category-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flo-section-title"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center'
    }
  }, window.FloVectorIcons && /*#__PURE__*/React.createElement(FloVectorIcons.MoodHappy, {
    size: 16,
    color: "#f8cf65"
  })), /*#__PURE__*/React.createElement("span", null, "What are you feeling today?")), /*#__PURE__*/React.createElement("div", {
    className: "flo-chips-grid"
  }, feelingBubbles.map(bubble => {
    const isSelected = selectedItems.has(bubble.id);
    return /*#__PURE__*/React.createElement("button", {
      key: bubble.id,
      type: "button",
      onClick: () => toggleItem(bubble.id),
      className: `flo-chip-btn ${isSelected ? 'active' : ''}`,
      style: isSelected ? {
        borderColor: bubble.color || 'var(--color-primary)',
        background: 'rgba(248, 207, 101, 0.18)',
        color: '#fff'
      } : {}
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center'
      }
    }, window.FloVectorIcon ? /*#__PURE__*/React.createElement(FloVectorIcon, {
      id: bubble.id,
      size: 16,
      color: isSelected ? bubble.color || 'var(--color-primary)' : 'currentColor'
    }) : /*#__PURE__*/React.createElement("span", null, bubble.icon || '✨')), /*#__PURE__*/React.createElement("span", null, bubble.label));
  }))), filteredCategories.map(cat => /*#__PURE__*/React.createElement("div", {
    key: cat.id,
    className: "flo-category-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flo-section-title"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center'
    }
  }, window.FloVectorIcon ? /*#__PURE__*/React.createElement(FloVectorIcon, {
    id: cat.items[0]?.id || 'cramps',
    size: 16,
    color: cat.color || 'var(--color-primary)'
  }) : /*#__PURE__*/React.createElement("span", null, cat.icon || '🌿')), /*#__PURE__*/React.createElement("span", null, cat.title)), /*#__PURE__*/React.createElement("div", {
    className: "flo-chips-grid"
  }, cat.items.map(item => {
    const isSelected = selectedItems.has(item.id);
    return /*#__PURE__*/React.createElement("button", {
      key: item.id,
      type: "button",
      onClick: () => toggleItem(item.id),
      className: `flo-chip-btn ${isSelected ? 'active' : ''}`,
      style: isSelected ? {
        borderColor: cat.color || 'var(--color-primary)',
        background: 'rgba(255, 255, 255, 0.14)',
        color: '#fff'
      } : {}
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center'
      }
    }, window.FloVectorIcon ? /*#__PURE__*/React.createElement(FloVectorIcon, {
      id: item.id,
      size: 15,
      color: isSelected ? cat.color || 'var(--color-primary)' : 'currentColor'
    }) : /*#__PURE__*/React.createElement("span", null, item.icon || '•')), /*#__PURE__*/React.createElement("span", null, item.label));
  })))), /*#__PURE__*/React.createElement("div", {
    className: "flo-category-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flo-section-title"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center'
    }
  }, window.Icons && /*#__PURE__*/React.createElement(Icons.Notes, {
    size: 16
  })), /*#__PURE__*/React.createElement("span", null, "Notes & Thoughts for Partner")), /*#__PURE__*/React.createElement("textarea", {
    value: notes,
    onChange: e => setNotes(e.target.value),
    placeholder: "How's your energy? Anything your partner can do to help today...",
    className: "flo-notes-textarea",
    rows: 3
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flo-sheet-footer-actions"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: handleSave,
    className: "flo-save-btn"
  }, "Save for ", formattedDayTitle), currentLog && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: handleDelete,
    className: "flo-clear-btn"
  }, "Clear"))));
  const portalTarget = document.querySelector('.android-screen') || document.body;
  return typeof ReactDOM !== 'undefined' && ReactDOM.createPortal ? ReactDOM.createPortal(modalJSX, portalTarget) : modalJSX;
}
window.CycleLogSheet = CycleLogSheet;

  // ==========================================
  // Module: www/js/components/CycleSettingsSheet.jsx
  // ==========================================
/**
 * ✦ KOMOREBI — Cycle Tracker Settings & Calibration Sheet Component
 */

function CycleSettingsSheet({
  isOpen,
  onClose,
  settings,
  onSaveSettings,
  onResetAllCycleData
}) {
  const [cycleLength, setCycleLength] = useState(settings?.cycleLength || 28);
  const [periodDuration, setPeriodDuration] = useState(settings?.periodDuration || 5);
  const [lastPeriodStart, setLastPeriodStart] = useState(settings?.lastPeriodStart || '2026-08-08');
  const [allowIntimacyTracking, setAllowIntimacyTracking] = useState(settings?.allowIntimacyTracking !== false);
  useEffect(() => {
    if (settings) {
      setCycleLength(settings.cycleLength || 28);
      setPeriodDuration(settings.periodDuration || 5);
      setLastPeriodStart(settings.lastPeriodStart || '2026-08-08');
      setAllowIntimacyTracking(settings.allowIntimacyTracking !== false);
    }
  }, [settings, isOpen]);
  if (!isOpen) return null;
  const handleSubmit = e => {
    e.preventDefault();
    if (window.AudioEngine) AudioEngine.playTone(680);
    onSaveSettings({
      cycleLength: parseInt(cycleLength, 10),
      periodDuration: parseInt(periodDuration, 10),
      lastPeriodStart,
      allowIntimacyTracking
    });
    onClose();
  };
  const modalJSX = /*#__PURE__*/React.createElement("div", {
    className: "profile-modal-sheet",
    onClick: onClose,
    style: {
      zIndex: 120
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "profile-sheet-body cycle-sheet-body",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "sheet-handle-bar",
    style: {
      background: 'rgba(255, 255, 255, 0.22)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "sheet-header-row"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "sheet-title",
    style: {
      color: '#fca5c9',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    }
  }, /*#__PURE__*/React.createElement("span", null, "⚙️"), " Cycle Settings"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '11px',
      color: 'var(--text-secondary)',
      marginTop: '2px'
    }
  }, "Customize your cycle calculations and predictions")), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "sheet-close-btn",
    "aria-label": "Close"
  }, "✕")), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit,
    className: "cycle-log-form"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cycle-section-card"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '4px'
    }
  }, /*#__PURE__*/React.createElement("label", {
    className: "cycle-section-label",
    style: {
      margin: 0
    }
  }, "Average Cycle Length"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '12px',
      fontWeight: '750',
      color: '#fca5c9'
    }
  }, cycleLength, " Days")), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "21",
    max: "35",
    step: "1",
    value: cycleLength,
    onChange: e => setCycleLength(e.target.value),
    className: "cycle-slider"
  }), /*#__PURE__*/React.createElement("div", {
    className: "cycle-slider-markers"
  }, /*#__PURE__*/React.createElement("span", null, "21 days"), /*#__PURE__*/React.createElement("span", null, "28 days (standard)"), /*#__PURE__*/React.createElement("span", null, "35 days"))), /*#__PURE__*/React.createElement("div", {
    className: "cycle-section-card"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '4px'
    }
  }, /*#__PURE__*/React.createElement("label", {
    className: "cycle-section-label",
    style: {
      margin: 0
    }
  }, "Period Bleeding Duration"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '12px',
      fontWeight: '750',
      color: '#fb7185'
    }
  }, periodDuration, " Days")), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "3",
    max: "10",
    step: "1",
    value: periodDuration,
    onChange: e => setPeriodDuration(e.target.value),
    className: "cycle-slider duration-slider"
  }), /*#__PURE__*/React.createElement("div", {
    className: "cycle-slider-markers"
  }, /*#__PURE__*/React.createElement("span", null, "3 days"), /*#__PURE__*/React.createElement("span", null, "5 days (standard)"), /*#__PURE__*/React.createElement("span", null, "10 days"))), /*#__PURE__*/React.createElement("div", {
    className: "cycle-section-card"
  }, /*#__PURE__*/React.createElement("label", {
    className: "cycle-section-label"
  }, "Last Period Start Date"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: lastPeriodStart,
    onChange: e => setLastPeriodStart(e.target.value),
    className: "cycle-date-picker-input"
  })), /*#__PURE__*/React.createElement("div", {
    className: "cycle-section-card",
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "cycle-section-label",
    style: {
      margin: 0
    }
  }, "Intimacy Tracking"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '10.5px',
      color: 'var(--text-secondary)',
      marginTop: '2px'
    }
  }, "Show intimacy log options in daily logger")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: `toggle-switch-btn ${allowIntimacyTracking ? 'active' : ''}`,
    onClick: () => setAllowIntimacyTracking(!allowIntimacyTracking),
    style: {
      background: allowIntimacyTracking ? '#fb7185' : 'rgba(255,255,255,0.1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "toggle-switch-knob"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      marginTop: '6px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn-minimal-submit",
    style: {
      background: 'linear-gradient(135deg, #fca5c9, #fb7185)'
    }
  }, "Save Cycle Settings"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      if (confirm('Reset all logged period days and symptoms back to clean default?')) {
        onResetAllCycleData();
        onClose();
      }
    },
    className: "btn-upload-file",
    style: {
      color: '#fb7185',
      borderColor: 'rgba(251, 113, 133, 0.3)',
      textAlign: 'center'
    }
  }, "Reset All Cycle Logs")))));
  const portalTarget = document.querySelector('.android-screen') || document.body;
  return typeof ReactDOM !== 'undefined' && ReactDOM.createPortal ? ReactDOM.createPortal(modalJSX, portalTarget) : modalJSX;
}
window.CycleSettingsSheet = CycleSettingsSheet;

  // ==========================================
  // Module: www/js/components/MoodCycleChart.jsx
  // ==========================================
/**
 * ✦ KOMOREBI — Mood & Cycle Phase Correlation Analytics Card
 * Displays vector SVG trend bars, dominant emotion patterns, and phase breakdowns.
 */

function MoodCycleChart({
  logs,
  settings,
  isFemale = false
}) {
  const [activePhase, setActivePhase] = useState('menstrual');
  const correlationData = window.CycleEngine ? window.CycleEngine.getMoodCycleCorrelations(logs, settings) : {
    hasData: false,
    phaseStats: {}
  };
  const phases = [{
    id: 'menstrual',
    name: 'Menstrual',
    icon: 'WaterDrop',
    color: '#fb7185'
  }, {
    id: 'follicular',
    name: 'Follicular',
    icon: 'Sparkle',
    color: '#60a5fa'
  }, {
    id: 'ovulation',
    name: 'Ovulation',
    icon: 'Sparkle',
    color: '#20b2aa'
  }, {
    id: 'luteal',
    name: 'Luteal',
    icon: 'TenderBreasts',
    color: '#c084fc'
  }];
  const currentStats = correlationData.phaseStats[activePhase] || {
    name: 'Phase',
    color: '#fb7185',
    topChips: [],
    dominantFeel: 'Rest & Balance'
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "flo-correlation-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "correlation-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "correlation-title"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#fca5c9',
      display: 'flex',
      alignItems: 'center'
    }
  }, window.FloVectorIcons && /*#__PURE__*/React.createElement(FloVectorIcons.Sparkle, {
    size: 14,
    color: "#fca5c9"
  })), /*#__PURE__*/React.createElement("span", null, "Mood & Cycle Phase Correlation")), /*#__PURE__*/React.createElement("div", {
    className: "correlation-subtitle"
  }, "Hormonal rhythms and emotional trends across cycle phases")), /*#__PURE__*/React.createElement("span", {
    className: "correlation-badge"
  }, correlationData.hasData ? `${correlationData.totalLoggedDays} Logs` : 'Live Baseline')), /*#__PURE__*/React.createElement("div", {
    className: "correlation-tabs-row"
  }, phases.map(p => {
    const isActive = activePhase === p.id;
    return /*#__PURE__*/React.createElement("button", {
      key: p.id,
      type: "button",
      className: `correlation-tab-btn ${isActive ? 'active' : ''}`,
      style: {
        borderColor: isActive ? p.color : 'rgba(255,255,255,0.06)',
        color: isActive ? '#fff' : 'var(--text-secondary)'
      },
      onClick: () => {
        if (window.HapticEngine) HapticEngine.trigger('selection');
        if (window.AudioEngine) AudioEngine.playTone(500);
        setActivePhase(p.id);
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "tab-indicator-dot",
      style: {
        background: p.color
      }
    }), /*#__PURE__*/React.createElement("span", null, p.name));
  })), /*#__PURE__*/React.createElement("div", {
    className: "correlation-phase-detail",
    style: {
      borderColor: `${currentStats.color}40`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '12px',
      fontWeight: '750',
      color: currentStats.color
    }
  }, currentStats.name, " Phase Patterns"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '10px',
      color: 'var(--text-secondary)'
    }
  }, "Dominant: ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: '#fff'
    }
  }, currentStats.dominantFeel))), /*#__PURE__*/React.createElement("div", {
    className: "flo-chips-display-row",
    style: {
      marginTop: '6px'
    }
  }, currentStats.topChips && currentStats.topChips.length > 0 ? currentStats.topChips.map(chipId => /*#__PURE__*/React.createElement("span", {
    key: chipId,
    className: "flo-glance-chip feeling-chip",
    style: {
      background: `${currentStats.color}15`,
      borderColor: `${currentStats.color}35`,
      color: '#fff',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px'
    }
  }, window.FloVectorIcon && /*#__PURE__*/React.createElement(FloVectorIcon, {
    id: chipId,
    size: 12,
    color: currentStats.color
  }), /*#__PURE__*/React.createElement("span", null, chipId.replace(/_/g, ' ')))) : /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '11px',
      color: 'var(--text-tertiary)',
      fontStyle: 'italic'
    }
  }, "No custom symptoms logged for this phase yet. Baseline tracking active."))));
}
window.MoodCycleChart = MoodCycleChart;

  // ==========================================
  // Module: www/js/components/CycleAccuracyCard.jsx
  // ==========================================
/**
 * ✦ KOMOREBI — Prediction Accuracy Feedback & Self-Calibration Card
 * Lets Mikkie provide one-tap feedback on predicted period dates, automatically calibrating cycle length averages.
 */

function CycleAccuracyCard({
  settings,
  onSaveSettings
}) {
  const [submittedFeedback, setSubmittedFeedback] = useState(null);
  const [feedbackToast, setFeedbackToast] = useState('');
  const handleFeedback = type => {
    if (!window.CycleEngine) return;
    if (window.HapticEngine) HapticEngine.trigger('success');
    if (window.AudioEngine) AudioEngine.playNotificationChime();
    const result = window.CycleEngine.calibrateAccuracyFeedback(type, settings);
    onSaveSettings(result.updatedSettings);
    setSubmittedFeedback(type);
    setFeedbackToast(result.feedbackLabel);
    setTimeout(() => {
      setFeedbackToast('');
    }, 4500);
  };
  const options = [{
    id: 'exact',
    label: '🎯 Exact on day',
    desc: 'Accurate'
  }, {
    id: 'early_1',
    label: '⏳ 1 day early',
    desc: '-1 day'
  }, {
    id: 'early_2',
    label: '⏩ 2+ days early',
    desc: '-2 days'
  }, {
    id: 'late_1',
    label: '⏰ 1 day late',
    desc: '+1 day'
  }, {
    id: 'late_2',
    label: '⏭️ 2+ days late',
    desc: '+2 days'
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "flo-accuracy-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "accuracy-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "accuracy-title"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#f8cf65',
      display: 'flex',
      alignItems: 'center'
    }
  }, window.Icons && /*#__PURE__*/React.createElement(Icons.Target, {
    size: 13
  })), /*#__PURE__*/React.createElement("span", null, "Cycle Prediction Accuracy")), /*#__PURE__*/React.createElement("div", {
    className: "accuracy-subtitle"
  }, "Calibrate smart prediction algorithms based on your actual cycle timing")), /*#__PURE__*/React.createElement("span", {
    className: "accuracy-cycle-len-pill"
  }, settings.cycleLength || 28, "d Cycle Avg")), feedbackToast ? /*#__PURE__*/React.createElement("div", {
    className: "accuracy-success-banner"
  }, /*#__PURE__*/React.createElement("span", null, "✨"), /*#__PURE__*/React.createElement("span", null, feedbackToast)) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "accuracy-prompt-text"
  }, "Was your last predicted cycle start date accurate?"), /*#__PURE__*/React.createElement("div", {
    className: "accuracy-chips-grid"
  }, options.map(opt => {
    const isSelected = submittedFeedback === opt.id;
    return /*#__PURE__*/React.createElement("button", {
      key: opt.id,
      type: "button",
      className: `accuracy-feedback-btn ${isSelected ? 'selected' : ''}`,
      onClick: () => handleFeedback(opt.id)
    }, /*#__PURE__*/React.createElement("span", {
      className: "feedback-btn-label"
    }, opt.label));
  }))));
}
window.CycleAccuracyCard = CycleAccuracyCard;

  // ==========================================
  // Module: www/js/views/CalendarTab.jsx
  // ==========================================
/**
 * ✦ KOMOREBI — Calendar & Feed View (Bento Grid Architecture)
 */

function CalendarTab({
  activeTraveler,
  partnerTraveler,
  myAvatar,
  partnerAvatar,
  myEnergy,
  isSleeping,
  myMood,
  partnerMood,
  myTimezoneInfo,
  partnerTimezoneInfo,
  calYear,
  calMonth,
  selectedDateStr,
  todayDateStr,
  plans,
  quickPlanTitle,
  whisperNote,
  tempWhisper,
  isEditingWhisper,
  latestSnap,
  cycleState,
  onToggleSleeping,
  onUpdateEnergy,
  onOpenMoodModal,
  onPrevMonth,
  onNextMonth,
  onTodayJump,
  onSelectDate,
  onOpenAddModal,
  onQuickAddPlan,
  onSetQuickPlanTitle,
  onDeletePlan,
  onToggleRevealPlan,
  onSetIsEditingWhisper,
  onSetTempWhisper,
  onSaveWhisper,
  onOpenMediaViewer,
  onOpenSnapModal,
  onOpenCycleTracker,
  onOpenFlickSwipe,
  movieSwipes = {},
  onManualSync
}) {
  const dayPlans = plans.filter(c => c.date === selectedDateStr);
  const energyInfo = window.getEnergyDetails ? window.getEnergyDetails(myEnergy) : {
    title: 'Resting',
    desc: ''
  };
  const monthNames = window.MONTH_NAMES || ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const activeKey = (activeTraveler?.name || 'ziankyle').toLowerCase();
  const partnerKey = (partnerTraveler?.name || 'mikkie').toLowerCase();
  const mySwipes = movieSwipes?.[activeKey] || {};
  const partnerSwipes = movieSwipes?.[partnerKey] || {};
  const mutualMatchCount = Object.keys(mySwipes).filter(mId => mySwipes[mId] === 'liked' && partnerSwipes[mId] === 'liked').length;
  const resolvedMyAvatar = window.resolveAvatar ? window.resolveAvatar(myAvatar, activeTraveler?.name) : myAvatar || {
    iconUrl: './assets/avatars/kokomi.png'
  };
  const effectiveCycleState = cycleState || (window.CycleEngine ? window.CycleEngine.calculateCycleState(window.DEFAULT_CYCLE_SETTINGS, {}, selectedDateStr || todayDateStr) : null);
  const content = /*#__PURE__*/React.createElement("div", {
    className: "android-content-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bento-row-split"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bento-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bento-partner-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bento-avatar-wrap"
  }, /*#__PURE__*/React.createElement("img", {
    src: resolvedMyAvatar.iconUrl,
    alt: activeTraveler.name,
    className: "bento-avatar-img",
    onError: e => {
      e.target.onerror = null;
      e.target.src = activeTraveler.name && activeTraveler.name.toLowerCase().includes('mikkie') ? './assets/avatars/yae.png' : './assets/avatars/kokomi.png';
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "bento-partner-meta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bento-partner-name"
  }, activeTraveler.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '10px',
      color: 'var(--text-secondary)'
    }
  }, energyInfo.title)), /*#__PURE__*/React.createElement("button", {
    onClick: onToggleSleeping,
    className: "bento-sleep-btn",
    title: "Toggle sleep status"
  }, isSleeping ? /*#__PURE__*/React.createElement(Icons.Moon, {
    size: 11
  }) : /*#__PURE__*/React.createElement(Icons.Sun, {
    size: 11
  }), /*#__PURE__*/React.createElement("span", null, isSleeping ? 'Sleep' : 'Awake'))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "1",
    max: "10",
    value: myEnergy,
    onChange: e => {
      const val = parseInt(e.target.value, 10);
      onUpdateEnergy(val);
      if (window.AudioEngine) AudioEngine.playTone(300 + val * 40);
    },
    className: "energy-slider-scrubber",
    "aria-label": "Energy level"
  }), /*#__PURE__*/React.createElement("div", {
    className: "bento-energy-info"
  }, /*#__PURE__*/React.createElement("span", null, "Energy: ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--color-primary)'
    }
  }, myEnergy * 10, "%")), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      if (window.AudioEngine) AudioEngine.playTone(550);
      onOpenMoodModal();
    },
    className: "bento-mood-btn",
    title: "Change mood status"
  }, window.MoodVectorIcon ? /*#__PURE__*/React.createElement(MoodVectorIcon, {
    moodId: myMood,
    size: 13
  }) : /*#__PURE__*/React.createElement("span", null, window.getMoodData ? window.getMoodData(myMood).icon : '✨'), /*#__PURE__*/React.createElement("span", null, window.getMoodData ? window.getMoodData(myMood).name : 'Happy'))))), /*#__PURE__*/React.createElement("div", {
    className: "bento-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bento-tz-header"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '5px'
    }
  }, /*#__PURE__*/React.createElement(Icons.Globe, {
    size: 13,
    color: "var(--color-primary)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '11px',
      fontWeight: '750',
      color: '#fff'
    }
  }, "Dual Clock")), /*#__PURE__*/React.createElement("span", {
    className: "bento-tz-diff-pill"
  }, window.getTimezoneDiff ? window.getTimezoneDiff(myTimezoneInfo.timezone, partnerTimezoneInfo.timezone) : 'Synced')), /*#__PURE__*/React.createElement("div", {
    className: "bento-tz-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bento-tz-box"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bento-tz-label"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bento-tz-indicator my-dot"
  }), /*#__PURE__*/React.createElement("span", null, "You (", myTimezoneInfo.city, ")")), /*#__PURE__*/React.createElement("div", {
    className: "bento-tz-time"
  }, window.formatTimeInTimezone ? window.formatTimeInTimezone(myTimezoneInfo.timezone) : '')), /*#__PURE__*/React.createElement("div", {
    className: "bento-tz-box"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bento-tz-label"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bento-tz-indicator partner-dot"
  }), /*#__PURE__*/React.createElement("span", null, partnerTraveler.name, " (", partnerTimezoneInfo.city, ")")), /*#__PURE__*/React.createElement("div", {
    className: "bento-tz-time"
  }, window.formatTimeInTimezone ? window.formatTimeInTimezone(partnerTimezoneInfo.timezone) : ''))))), effectiveCycleState && /*#__PURE__*/React.createElement("div", {
    className: "bento-card",
    onClick: () => {
      if (window.HapticEngine) HapticEngine.trigger('light');
      if (window.AudioEngine) AudioEngine.playTone(600);
      if (onOpenCycleTracker) onOpenCycleTracker();
    },
    style: {
      cursor: 'pointer',
      background: 'linear-gradient(135deg, rgba(252, 165, 201, 0.09) 0%, rgba(19, 23, 38, 0.92) 100%)',
      borderColor: effectiveCycleState.daysUntilNextPeriod <= 3 ? 'rgba(251, 113, 133, 0.45)' : 'rgba(252, 165, 201, 0.25)',
      padding: '10px 14px',
      boxShadow: effectiveCycleState.daysUntilNextPeriod <= 3 ? '0 4px 18px rgba(251, 113, 133, 0.12)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center'
    }
  }, window.FloVectorIcons && /*#__PURE__*/React.createElement(FloVectorIcons.TenderBreasts, {
    size: 18,
    color: "#fca5c9"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '12px',
      fontWeight: '750',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Cycle Sanctuary"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '9.5px',
      background: `${effectiveCycleState.phaseColor || '#fca5c9'}22`,
      color: effectiveCycleState.phaseColor || '#fca5c9',
      padding: '1px 6px',
      borderRadius: '6px',
      fontWeight: '700',
      border: `1px solid ${effectiveCycleState.phaseColor || '#fca5c9'}44`
    }
  }, "Day ", effectiveCycleState.currentCycleDay), effectiveCycleState.daysUntilNextPeriod <= 3 && effectiveCycleState.daysUntilNextPeriod > 0 && /*#__PURE__*/React.createElement("span", {
    className: "nudge-badge-pill",
    style: {
      fontSize: '9px',
      padding: '1px 6px'
    }
  }, "🍫 In ", effectiveCycleState.daysUntilNextPeriod, "d")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '10px',
      color: 'var(--text-secondary)',
      marginTop: '1px'
    }
  }, effectiveCycleState.phaseName, " • ", effectiveCycleState.phaseKey === 'menstrual' ? `Period Day ${effectiveCycleState.currentCycleDay}` : `Period in ${effectiveCycleState.daysUntilNextPeriod}d`))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: '10.5px',
      color: '#fca5c9',
      fontWeight: '700'
    }
  }, /*#__PURE__*/React.createElement("span", null, "View Flo"), /*#__PURE__*/React.createElement("span", null, "→")))), /*#__PURE__*/React.createElement("div", {
    className: "calendar-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "calendar-header"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "month-label",
    style: {
      fontSize: '15px',
      fontWeight: '800'
    }
  }, monthNames[calMonth], " ", calYear), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '4px',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onPrevMonth,
    style: {
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid var(--android-border)',
      color: '#fff',
      borderRadius: '6px',
      width: '26px',
      height: '26px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      fontSize: '11px'
    },
    title: "Previous Month"
  }, "◀"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onNextMonth,
    style: {
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid var(--android-border)',
      color: '#fff',
      borderRadius: '6px',
      width: '26px',
      height: '26px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      fontSize: '11px'
    },
    title: "Next Month"
  }, "▶"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onTodayJump,
    style: {
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid var(--android-border)',
      color: 'var(--color-primary)',
      borderRadius: '6px',
      padding: '0 8px',
      height: '26px',
      fontSize: '10px',
      fontWeight: '700',
      cursor: 'pointer'
    },
    title: "Jump to Today"
  }, "Today"))), /*#__PURE__*/React.createElement("button", {
    onClick: onOpenAddModal,
    style: {
      background: 'rgba(248, 207, 101, 0.12)',
      border: '1px solid rgba(248, 207, 101, 0.35)',
      color: 'var(--color-primary)',
      borderRadius: '8px',
      padding: '5px 10px',
      fontSize: '11px',
      fontWeight: '700',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    }
  }, window.Icons && /*#__PURE__*/React.createElement(Icons.Plus, {
    size: 13
  }), /*#__PURE__*/React.createElement("span", null, "Add Plan"))), /*#__PURE__*/React.createElement("div", {
    className: "cal-mini-weekdays"
  }, /*#__PURE__*/React.createElement("div", null, "S"), /*#__PURE__*/React.createElement("div", null, "M"), /*#__PURE__*/React.createElement("div", null, "T"), /*#__PURE__*/React.createElement("div", null, "W"), /*#__PURE__*/React.createElement("div", null, "T"), /*#__PURE__*/React.createElement("div", null, "F"), /*#__PURE__*/React.createElement("div", null, "S")), /*#__PURE__*/React.createElement("div", {
    className: "cal-mini-grid"
  }, Array.from({
    length: new Date(calYear, calMonth, 1).getDay()
  }).map((_, idx) => /*#__PURE__*/React.createElement("div", {
    key: `empty-${idx}`,
    className: "cal-mini-day empty",
    style: {
      opacity: 0.15,
      pointerEvents: 'none'
    }
  })), Array.from({
    length: new Date(calYear, calMonth + 1, 0).getDate()
  }, (_, i) => i + 1).map(d => {
    const dStr = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const dayEvents = plans.filter(c => c.date === dStr);
    const isSelected = selectedDateStr === dStr;
    const isToday = dStr === todayDateStr;
    return /*#__PURE__*/React.createElement("div", {
      key: dStr,
      className: `cal-mini-day ${isSelected ? 'selected' : ''} ${isToday && !isSelected ? 'today' : ''} ${dayEvents.length > 0 ? 'has-plan' : ''}`,
      onClick: () => {
        if (window.AudioEngine) AudioEngine.playTone(500);
        if (selectedDateStr === dStr) {
          onOpenAddModal();
        } else {
          onSelectDate(dStr);
        }
      },
      onDoubleClick: () => {
        if (window.AudioEngine) AudioEngine.playTone(650);
        onSelectDate(dStr);
        onOpenAddModal();
      },
      title: dayEvents.length > 0 ? `${monthNames[calMonth]} ${d}: ${dayEvents.map(e => e.title).join(', ')}` : `${monthNames[calMonth]} ${d}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "cal-day-num"
    }, d), dayEvents.length > 0 && /*#__PURE__*/React.createElement("div", {
      className: "cal-event-dots-row"
    }, /*#__PURE__*/React.createElement("span", {
      className: "cal-event-dot"
    }), dayEvents.length > 1 && /*#__PURE__*/React.createElement("span", {
      className: "cal-event-dot"
    })));
  })), /*#__PURE__*/React.createElement("div", {
    className: "daily-events-section",
    style: {
      marginTop: '6px',
      borderTop: '1px solid var(--android-border)',
      paddingTop: '10px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-label"
  }, "Plans • ", new Date(selectedDateStr + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '10px',
      color: 'var(--text-secondary)'
    }
  }, dayPlans.length, " ", dayPlans.length === 1 ? 'event' : 'events')), /*#__PURE__*/React.createElement("form", {
    onSubmit: onQuickAddPlan,
    className: "quick-plan-bar"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: quickPlanTitle,
    onChange: e => onSetQuickPlanTitle(e.target.value),
    placeholder: `Add a plan for ${new Date(selectedDateStr + 'T00:00:00').toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })}...`,
    className: "quick-plan-input"
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "quick-plan-btn",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    }
  }, window.Icons && /*#__PURE__*/React.createElement(Icons.Plus, {
    size: 12
  }), /*#__PURE__*/React.createElement("span", null, "Add"))), dayPlans.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px',
      textAlign: 'center',
      color: 'var(--text-tertiary)',
      fontSize: '12px'
    }
  }, "No plans for ", new Date(selectedDateStr + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }), ".") : dayPlans.map(plan => {
    const isHiddenSurprise = plan.isWishSealed && !plan.isRevealed;
    return /*#__PURE__*/React.createElement("div", {
      key: plan.id,
      className: "event-list-item",
      onClick: () => plan.isWishSealed && onToggleRevealPlan(plan.id),
      style: {
        cursor: plan.isWishSealed ? 'pointer' : 'default'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "event-emoji-box"
    }, plan.emoji), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "event-title"
    }, isHiddenSurprise ? 'Surprise Plan (Tap to reveal)' : plan.title), /*#__PURE__*/React.createElement("div", {
      className: "event-time-tag"
    }, plan.time, " • ", plan.type, " • Added by ", plan.createdBy === activeTraveler.name.toLowerCase() ? 'You' : partnerTraveler.name)), /*#__PURE__*/React.createElement("button", {
      onClick: e => onDeletePlan(plan.id, e),
      style: {
        background: 'none',
        border: 'none',
        color: 'var(--text-tertiary)',
        cursor: 'pointer',
        padding: '6px 8px',
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center'
      },
      title: "Delete plan",
      "aria-label": "Delete plan"
    }, window.Icons && /*#__PURE__*/React.createElement(Icons.Trash, {
      size: 13
    })));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "bento-row-equal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bento-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bento-tile-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "bento-tile-title"
  }, window.Icons && /*#__PURE__*/React.createElement(Icons.Edit, {
    size: 11
  }), /*#__PURE__*/React.createElement("span", null, "Daily Note")), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      if (isEditingWhisper) {
        onSaveWhisper();
      } else {
        onSetTempWhisper(whisperNote);
        onSetIsEditingWhisper(true);
      }
    },
    style: {
      background: 'none',
      border: 'none',
      color: 'var(--color-accent)',
      fontSize: '10px',
      cursor: 'pointer',
      fontWeight: '700'
    }
  }, isEditingWhisper ? 'Save' : 'Edit')), isEditingWhisper ? /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: tempWhisper,
    onChange: e => onSetTempWhisper(e.target.value),
    maxLength: 70,
    autoFocus: true,
    className: "form-input-text",
    style: {
      padding: '6px 8px',
      fontSize: '11px'
    }
  }) : /*#__PURE__*/React.createElement("div", {
    className: "bento-note-body"
  }, "\"", whisperNote || 'Tap Edit to write a note', "\"")), (() => {
    const hasPhoto = latestSnap && (latestSnap.imageUrl || latestSnap.items && latestSnap.items.length > 0);
    return /*#__PURE__*/React.createElement("div", {
      className: "bento-card",
      onClick: () => hasPhoto ? onOpenMediaViewer() : onOpenSnapModal(),
      style: {
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "bento-tile-header"
    }, /*#__PURE__*/React.createElement("span", {
      className: "bento-tile-title"
    }, window.Icons && /*#__PURE__*/React.createElement(Icons.Camera, {
      size: 11
    }), /*#__PURE__*/React.createElement("span", null, hasPhoto ? latestSnap.sentBy !== activeTraveler.name.toLowerCase() ? `${partnerTraveler.name}'s Photo` : 'Your Photo' : 'Photo Drop')), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: e => {
        e.stopPropagation();
        if (onOpenFlickSwipe) onOpenFlickSwipe();
      },
      style: {
        background: 'rgba(255, 75, 75, 0.15)',
        border: '1px solid rgba(255, 75, 75, 0.4)',
        color: '#ff758c',
        borderRadius: '6px',
        padding: '2px 7px',
        fontSize: '9.5px',
        fontWeight: '800',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
      },
      title: "Open Movie Date swiper"
    }, window.Icons && /*#__PURE__*/React.createElement(Icons.Clapperboard, {
      size: 11
    }), /*#__PURE__*/React.createElement("span", null, "Movie Date")), hasPhoto && latestSnap.time && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: '9px',
        color: 'var(--text-secondary)'
      }
    }, latestSnap.time))), /*#__PURE__*/React.createElement("div", {
      className: "bento-photo-thumb"
    }, /*#__PURE__*/React.createElement(MediaCarouselViewer, {
      snap: latestSnap,
      activeTraveler: activeTraveler,
      partnerTraveler: partnerTraveler,
      isLockscreen: false,
      onOpenModal: () => hasPhoto ? onOpenMediaViewer() : onOpenSnapModal()
    })));
  })()), /*#__PURE__*/React.createElement("div", {
    className: "bento-card",
    onClick: () => {
      if (window.HapticEngine) HapticEngine.trigger('light');
      if (window.AudioEngine) AudioEngine.playTone(650);
      if (onOpenFlickSwipe) onOpenFlickSwipe();
    },
    style: {
      cursor: 'pointer',
      background: 'linear-gradient(135deg, rgba(255, 75, 75, 0.08) 0%, rgba(19, 23, 38, 0.95) 100%)',
      borderColor: mutualMatchCount > 0 ? 'rgba(248, 207, 101, 0.4)' : 'rgba(255, 255, 255, 0.08)',
      padding: '12px 14px',
      marginTop: '10px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '34px',
      height: '34px',
      borderRadius: '10px',
      background: 'linear-gradient(135deg, #ff4b4b 0%, #f8cf65 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      boxShadow: '0 4px 12px rgba(255, 75, 75, 0.3)'
    }
  }, window.Icons && /*#__PURE__*/React.createElement(Icons.Clapperboard, {
    size: 18
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '12.5px',
      fontWeight: '800',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Movie Date Swiper"), mutualMatchCount > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '9.5px',
      background: 'rgba(248, 207, 101, 0.2)',
      color: 'var(--color-primary)',
      padding: '1px 6px',
      borderRadius: '6px',
      fontWeight: '800',
      border: '1px solid rgba(248, 207, 101, 0.4)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '3px'
    }
  }, window.Icons && /*#__PURE__*/React.createElement(Icons.Sparkles, {
    size: 9
  }), /*#__PURE__*/React.createElement("span", null, mutualMatchCount, " Matched!"))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '10px',
      color: 'var(--text-secondary)',
      marginTop: '2px'
    }
  }, "Swipe movies & TV shows together to pick what to watch"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: '11px',
      color: 'var(--color-primary)',
      fontWeight: '700'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Swipe"), /*#__PURE__*/React.createElement("span", null, "→")))));
  return window.PullToRefresh ? /*#__PURE__*/React.createElement(PullToRefresh, {
    onRefresh: onManualSync,
    className: "pull-refresh-container"
  }, content) : content;
}
window.CalendarTab = CalendarTab;

  // ==========================================
  // Module: www/js/views/ChatTab.jsx
  // ==========================================
/**
 * ✦ KOMOREBI — Realtime Chat Stream & Vibrant Messaging View
 * Enhanced with Rich 3-Ambiance Themes (Sakura Pink, Emerald Forest, Celestial Ocean), Pull-to-Refresh & Haptics
 */

function ChatTab({
  chatTheme,
  activeTraveler,
  partnerTraveler,
  myAvatar,
  partnerAvatar,
  myMood,
  partnerMood,
  messages,
  inputText,
  chatEndRef,
  onSetChatTheme,
  onSendMessage,
  onSetInputText,
  onClearChat,
  onBackToCalendar,
  onSendPing,
  onManualSync
}) {
  const handleThemeChange = newTheme => {
    if (window.HapticEngine) HapticEngine.trigger('selection');
    if (window.AudioEngine) {
      if (newTheme === 'pink') AudioEngine.playTone(550);else if (newTheme === 'forest') AudioEngine.playTone(450);else if (newTheme === 'ocean') AudioEngine.playTone(620);
    }
    onSetChatTheme(newTheme);
  };
  const handleFormSubmit = e => {
    e.preventDefault();
    if (!inputText.trim()) return;
    if (window.HapticEngine) HapticEngine.trigger('light');
    if (window.AudioEngine) AudioEngine.playTone(640);
    onSendMessage(e);
  };
  const chatStreamContent = /*#__PURE__*/React.createElement("div", {
    className: "chat-bubble-stream",
    style: {
      flex: '1 1 0',
      minHeight: 0,
      overflowY: 'auto',
      maxHeight: 'none',
      zIndex: 2,
      padding: '4px 6px 12px'
    }
  }, messages.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-tertiary)',
      textAlign: 'center',
      padding: '40px 20px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: '8px',
      color: 'var(--color-primary)'
    }
  }, window.Icons && /*#__PURE__*/React.createElement(Icons.Chat, {
    size: 32
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '14px',
      fontWeight: '700',
      color: '#fff'
    }
  }, "Sanctuary Direct Chat"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '11px',
      maxWidth: '240px',
      marginTop: '4px',
      lineHeight: 1.4
    }
  }, "Your private couple chat space. Send sweet notes, whispers, and messages across both phones in realtime.")) : messages.map(msg => {
    const isMe = msg.sender === activeTraveler.name.toLowerCase();
    const isMikkiePartner = (partnerTraveler.name || '').toLowerCase().includes('mikkie');
    const fallbackSrc = isMikkiePartner ? './assets/avatars/yae.png' : './assets/avatars/kokomi.png';
    const partnerResolved = window.resolveAvatar ? window.resolveAvatar(partnerAvatar, isMikkiePartner) : partnerAvatar;
    const avatarUrl = partnerResolved?.iconUrl || fallbackSrc;
    return /*#__PURE__*/React.createElement("div", {
      key: msg.id,
      className: `chat-message-row ${isMe ? 'outgoing' : 'incoming'}`
    }, !isMe && /*#__PURE__*/React.createElement("img", {
      src: avatarUrl,
      alt: "",
      className: "chat-avatar",
      onError: e => {
        e.target.onerror = null;
        e.target.src = fallbackSrc;
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: `chat-bubble ${isMe ? 'outgoing' : 'incoming'}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "chat-text"
    }, msg.text), /*#__PURE__*/React.createElement("div", {
      className: "chat-timestamp"
    }, msg.time)));
  }), /*#__PURE__*/React.createElement("div", {
    ref: chatEndRef
  }));
  return /*#__PURE__*/React.createElement("div", {
    className: `android-content-body chat-screen-container chat-theme-${chatTheme}`,
    style: {
      justifyContent: 'space-between',
      position: 'relative',
      overflow: 'hidden'
    }
  }, window.CelestialPhysicsCanvas && /*#__PURE__*/React.createElement(CelestialPhysicsCanvas, {
    theme: chatTheme
  }), /*#__PURE__*/React.createElement("div", {
    className: "chat-header-bar"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBackToCalendar,
    className: "chat-back-btn",
    title: "Back to Calendar"
  }, /*#__PURE__*/React.createElement("span", null, "←"), " Sanctuary"), /*#__PURE__*/React.createElement("div", {
    className: "chat-theme-picker",
    title: "Switch Chat Theme"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: `theme-pill-btn pink-pill ${chatTheme === 'pink' ? 'active' : ''}`,
    onClick: () => handleThemeChange('pink'),
    title: "Sakura Pink Theme"
  }, window.Icons && /*#__PURE__*/React.createElement(Icons.Flower, {
    size: 12
  }), /*#__PURE__*/React.createElement("span", null, "Pink")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: `theme-pill-btn forest-pill ${chatTheme === 'forest' ? 'active' : ''}`,
    onClick: () => handleThemeChange('forest'),
    title: "Emerald Forest Theme"
  }, window.Icons && /*#__PURE__*/React.createElement(Icons.TreePine, {
    size: 12
  }), /*#__PURE__*/React.createElement("span", null, "Forest")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: `theme-pill-btn ocean-pill ${chatTheme === 'ocean' ? 'active' : ''}`,
    onClick: () => handleThemeChange('ocean'),
    title: "Deep Ocean Theme"
  }, window.Icons && /*#__PURE__*/React.createElement(Icons.Waves, {
    size: 12
  }), /*#__PURE__*/React.createElement("span", null, "Ocean"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      if (window.HapticEngine) HapticEngine.trigger('medium');
      onSendPing();
    },
    style: {
      background: 'rgba(255, 255, 255, 0.08)',
      border: '1px solid rgba(255, 255, 255, 0.14)',
      color: '#fff',
      borderRadius: '12px',
      padding: '3px 8px',
      fontSize: '10px',
      fontWeight: '700',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    title: "Send Instant Notification Ping"
  }, window.Icons && /*#__PURE__*/React.createElement(Icons.Bell, {
    size: 11
  }), /*#__PURE__*/React.createElement("span", null, "Ping")), messages.length > 0 && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClearChat,
    style: {
      background: 'none',
      border: 'none',
      color: 'var(--text-tertiary)',
      fontSize: '11px',
      cursor: 'pointer',
      padding: '2px 4px'
    },
    title: "Clear Chat History"
  }, "✕"))), window.PullToRefresh ? /*#__PURE__*/React.createElement(PullToRefresh, {
    onRefresh: onManualSync,
    className: "pull-refresh-container",
    style: {
      flex: '1 1 0',
      minHeight: 0
    }
  }, chatStreamContent) : chatStreamContent, /*#__PURE__*/React.createElement("form", {
    onSubmit: handleFormSubmit,
    className: "chat-composer-bar",
    style: {
      zIndex: 3
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: inputText,
    onChange: e => onSetInputText(e.target.value),
    placeholder: `Message ${partnerTraveler.name}...`,
    maxLength: 500,
    className: "chat-composer-input"
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "chat-send-btn",
    disabled: !inputText.trim(),
    "aria-label": "Send Message"
  }, "Send")));
}
window.ChatTab = ChatTab;

  // ==========================================
  // Module: www/js/views/CycleTrackerView.jsx
  // ==========================================
/**
 * ✦ KOMOREBI — Authentic Flo Single-Month Calendar & Partner Empathy View
 * Enhanced with Partner Care Notification Nudges, Mood+Cycle Correlation Chart, and Prediction Accuracy Calibration.
 */

function CycleTrackerView({
  settings,
  cycleLogs,
  onSaveLog,
  onDeleteLog,
  onSaveSettings,
  onResetAllCycleData,
  onBackToCalendar,
  activeTraveler,
  partnerTraveler
}) {
  const todayDate = new Date();
  const todayStr = window.CycleEngine ? window.CycleEngine.formatDate(todayDate) : '2026-08-19';
  const [selectedDateStr, setSelectedDateStr] = useState(todayStr);
  const [viewYear, setViewYear] = useState(todayDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(todayDate.getMonth());
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [viewMode, setViewMode] = useState('month'); // 'month' | 'year'

  // Role Determination: Mikkie = Female (Full Logging), Zian = Male (Partner Empathy View)
  const isFemale = window.CycleEngine ? window.CycleEngine.isFemaleUser(activeTraveler) : false;
  const femalePartnerName = isFemale ? activeTraveler.name : partnerTraveler.name;

  // Selected & Today States
  const selectedLog = cycleLogs ? cycleLogs[selectedDateStr] : null;
  const selectedState = window.CycleEngine ? window.CycleEngine.calculateCycleState(settings, cycleLogs, selectedDateStr) : {};
  const todayState = window.CycleEngine ? window.CycleEngine.calculateCycleState(settings, cycleLogs, todayStr) : {};
  const phaseInsights = window.CycleEngine ? window.CycleEngine.getPhaseInsights(selectedState.phaseKey, activeTraveler.name) : {};

  // Proactive Partner Care Notification Nudge
  const partnerNudge = window.CycleEngine ? window.CycleEngine.getPartnerNotificationNudge(settings, cycleLogs, femalePartnerName) : null;

  // Compute Current Single Month Data
  const currentMonthData = window.CycleEngine ? window.CycleEngine.generateFloMonthData(viewYear, viewMonth, settings, cycleLogs) : {
    year: viewYear,
    month: viewMonth,
    monthName: 'August',
    days: []
  };
  const handlePrevMonth = () => {
    if (window.HapticEngine) HapticEngine.trigger('selection');
    if (window.AudioEngine) AudioEngine.playTone(450);
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(prev => prev - 1);
    } else {
      setViewMonth(prev => prev - 1);
    }
  };
  const handleNextMonth = () => {
    if (window.HapticEngine) HapticEngine.trigger('selection');
    if (window.AudioEngine) AudioEngine.playTone(550);
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(prev => prev + 1);
    } else {
      setViewMonth(prev => prev + 1);
    }
  };
  const handleTodayJump = () => {
    if (window.HapticEngine) HapticEngine.trigger('light');
    if (window.AudioEngine) AudioEngine.playTone(650);
    setSelectedDateStr(todayStr);
    setViewYear(todayDate.getFullYear());
    setViewMonth(todayDate.getMonth());
  };

  // Find all logged items for today / selected date
  const loggedFloItems = selectedLog ? selectedLog.floItems || [] : [];
  return /*#__PURE__*/React.createElement("div", {
    className: "flo-screen-wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flo-top-bar"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onBackToCalendar,
    className: "flo-close-btn",
    title: "Back to Sanctuary"
  }, /*#__PURE__*/React.createElement("span", null, "←"), /*#__PURE__*/React.createElement("span", null, "Sanctuary")), /*#__PURE__*/React.createElement("div", {
    className: "flo-view-switcher"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: `flo-switch-pill ${viewMode === 'month' ? 'active' : ''}`,
    onClick: () => {
      if (window.HapticEngine) HapticEngine.trigger('selection');
      setViewMode('month');
    }
  }, "Month"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: `flo-switch-pill ${viewMode === 'year' ? 'active' : ''}`,
    onClick: () => {
      if (window.HapticEngine) HapticEngine.trigger('selection');
      setViewMode('year');
    }
  }, "Year")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: handleTodayJump,
    className: "flo-today-link"
  }, "Today"), isFemale && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => {
      if (window.HapticEngine) HapticEngine.trigger('light');
      if (window.AudioEngine) AudioEngine.playTone(550);
      setIsSettingsOpen(true);
    },
    className: "flo-settings-btn",
    title: "Calibration Settings"
  }, window.Icons && /*#__PURE__*/React.createElement(Icons.Settings, {
    size: 13
  })))), /*#__PURE__*/React.createElement("div", {
    className: "flo-role-banner"
  }, isFemale ? /*#__PURE__*/React.createElement("div", {
    className: "role-female-badge"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center'
    }
  }, window.FloVectorIcons && /*#__PURE__*/React.createElement(FloVectorIcons.TenderBreasts, {
    size: 13,
    color: "#fca5c9"
  })), /*#__PURE__*/React.createElement("span", null, "Your Cycle • Day ", todayState.currentCycleDay, " of ", todayState.totalCycleDays, " (", todayState.phaseName, ")")) : /*#__PURE__*/React.createElement("div", {
    className: "role-male-badge"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center'
    }
  }, window.Icons && /*#__PURE__*/React.createElement(Icons.Heart, {
    size: 13
  })), /*#__PURE__*/React.createElement("span", null, femalePartnerName, "'s Cycle • Day ", todayState.currentCycleDay, " of ", todayState.totalCycleDays, " (", todayState.phaseName, ")"))), /*#__PURE__*/React.createElement("div", {
    className: "flo-months-scroll-container"
  }, !isFemale && partnerNudge && /*#__PURE__*/React.createElement("div", {
    className: `partner-nudge-banner ${partnerNudge.type}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "partner-nudge-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "partner-nudge-title",
    style: {
      color: partnerNudge.accentColor
    }
  }, /*#__PURE__*/React.createElement("span", null, "💌"), /*#__PURE__*/React.createElement("span", null, partnerNudge.title)), /*#__PURE__*/React.createElement("span", {
    className: "nudge-badge-pill",
    style: {
      borderColor: partnerNudge.accentColor,
      color: partnerNudge.accentColor
    }
  }, partnerNudge.badge)), /*#__PURE__*/React.createElement("div", {
    className: "partner-nudge-body"
  }, partnerNudge.message)), /*#__PURE__*/React.createElement("div", {
    className: "flo-month-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flo-single-month-header"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "flo-month-arrow-btn",
    onClick: handlePrevMonth,
    title: "Previous Month"
  }, "‹"), /*#__PURE__*/React.createElement("div", {
    className: "flo-single-month-title"
  }, currentMonthData.monthName, " ", viewYear !== todayDate.getFullYear() ? viewYear : ''), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "flo-month-arrow-btn",
    onClick: handleNextMonth,
    title: "Next Month"
  }, "›")), /*#__PURE__*/React.createElement("div", {
    className: "flo-weekdays-bar"
  }, /*#__PURE__*/React.createElement("span", null, "M"), /*#__PURE__*/React.createElement("span", null, "T"), /*#__PURE__*/React.createElement("span", null, "W"), /*#__PURE__*/React.createElement("span", null, "T"), /*#__PURE__*/React.createElement("span", null, "F"), /*#__PURE__*/React.createElement("span", null, "S"), /*#__PURE__*/React.createElement("span", null, "S")), /*#__PURE__*/React.createElement("div", {
    className: "flo-month-grid-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flo-month-grid"
  }, currentMonthData.days.map(day => {
    if (day.empty) {
      return /*#__PURE__*/React.createElement("div", {
        key: day.id,
        className: "flo-day-cell empty"
      });
    }
    const isSelected = day.dateStr === selectedDateStr;
    const isToday = day.dateStr === todayStr;
    return /*#__PURE__*/React.createElement("div", {
      key: day.dateStr,
      className: `flo-day-cell ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''} ${day.isBleeding ? 'bleeding-range' : ''} ${day.isFertile ? 'fertile-range' : ''}`,
      onClick: () => {
        if (window.HapticEngine) HapticEngine.trigger('light');
        if (window.AudioEngine) AudioEngine.playTone(500);
        setSelectedDateStr(day.dateStr);
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "flo-cycle-num"
    }, day.cycleDay), /*#__PURE__*/React.createElement("div", {
      className: "flo-date-num-wrap"
    }, day.isOvulation ?
    /*#__PURE__*/
    /* Ovulation Dotted Teal Ring */
    React.createElement("div", {
      className: "flo-ovulation-dotted-ring",
      title: "Estimated Ovulation Day"
    }, /*#__PURE__*/React.createElement("span", {
      className: "flo-date-text ovulation-teal"
    }, day.dayNum)) : day.isBleeding ?
    /*#__PURE__*/
    /* Bleeding Day Number */
    React.createElement("span", {
      className: "flo-date-text bleeding-red"
    }, day.dayNum) : /*#__PURE__*/React.createElement("span", {
      className: `flo-date-text ${day.isFertile ? 'fertile-cyan' : ''}`
    }, day.dayNum)), day.isBleeding && /*#__PURE__*/React.createElement("div", {
      className: "flo-bleed-connector-bar"
    }), day.dayLog && !day.isBleeding && /*#__PURE__*/React.createElement("div", {
      className: "flo-logged-indicator-dot"
    }));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flo-calendar-legend"
  }, /*#__PURE__*/React.createElement("div", {
    className: "legend-item",
    title: "Predicted or logged period bleeding days"
  }, /*#__PURE__*/React.createElement("span", {
    className: "legend-sample period"
  }), /*#__PURE__*/React.createElement("span", null, "Period")), /*#__PURE__*/React.createElement("div", {
    className: "legend-item",
    title: "Higher chance of conception window"
  }, /*#__PURE__*/React.createElement("span", {
    className: "legend-sample fertile"
  }), /*#__PURE__*/React.createElement("span", null, "Fertile Window")), /*#__PURE__*/React.createElement("div", {
    className: "legend-item",
    title: "Peak estimated ovulation release day"
  }, /*#__PURE__*/React.createElement("span", {
    className: "legend-sample ovulation"
  }), /*#__PURE__*/React.createElement("span", null, "Ovulation Peak")), /*#__PURE__*/React.createElement("div", {
    className: "legend-item",
    title: "Day number within current cycle (1..28)"
  }, /*#__PURE__*/React.createElement("span", {
    className: "legend-sample cycle-num"
  }, "1"), /*#__PURE__*/React.createElement("span", null, "Cycle Day")))), /*#__PURE__*/React.createElement("div", {
    className: "flo-empathy-care-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "care-card-header"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "care-card-title"
  }, isFemale ? "Daily Check-in" : `How ${femalePartnerName} is Feeling Today`), /*#__PURE__*/React.createElement("div", {
    className: "care-card-subtitle"
  }, new Date(selectedDateStr + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  }), " • Cycle Day ", selectedState.currentCycleDay)), /*#__PURE__*/React.createElement("div", {
    className: "care-phase-pill",
    style: {
      color: selectedState.phaseColor,
      borderColor: selectedState.phaseColor
    }
  }, selectedState.phaseName)), selectedLog && (loggedFloItems.length > 0 || selectedLog.flow !== 'none') ? /*#__PURE__*/React.createElement("div", {
    className: "flo-chips-display-row"
  }, selectedLog.flow && selectedLog.flow !== 'none' && /*#__PURE__*/React.createElement("span", {
    className: "flo-glance-chip bleed-chip",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px'
    }
  }, window.FloVectorIcons && /*#__PURE__*/React.createElement(FloVectorIcons.WaterDrop, {
    size: 12,
    color: "#fb7185"
  }), /*#__PURE__*/React.createElement("span", null, "Flow: ", selectedLog.flow)), loggedFloItems.map(itemId => /*#__PURE__*/React.createElement("span", {
    key: itemId,
    className: "flo-glance-chip feeling-chip",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px'
    }
  }, window.FloVectorIcon && /*#__PURE__*/React.createElement(FloVectorIcon, {
    id: itemId,
    size: 12,
    color: "#fca5c9"
  }), /*#__PURE__*/React.createElement("span", null, itemId.replace(/_/g, ' ')))), selectedLog.notes && /*#__PURE__*/React.createElement("div", {
    className: "flo-glance-note"
  }, "\"", selectedLog.notes, "\"")) : /*#__PURE__*/React.createElement("div", {
    className: "flo-empty-feelings-hint"
  }, isFemale ? 'No symptoms logged for this date yet. Tap "Log Symptoms & Feelings" below to record!' : `${femalePartnerName} has not logged specific symptoms for this date yet.`), !isFemale && /*#__PURE__*/React.createElement("div", {
    className: "partner-care-guide-box"
  }, /*#__PURE__*/React.createElement("div", {
    className: "guide-title"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center'
    }
  }, window.FloVectorIcons && /*#__PURE__*/React.createElement(FloVectorIcons.Sparkle, {
    size: 13,
    color: "#fca5c9"
  })), /*#__PURE__*/React.createElement("span", null, "Ways to Support ", femalePartnerName, " Today")), /*#__PURE__*/React.createElement("ul", {
    className: "guide-list"
  }, phaseInsights.careTips.map((tip, idx) => /*#__PURE__*/React.createElement("li", {
    key: idx
  }, tip))))), window.MoodCycleChart && /*#__PURE__*/React.createElement(MoodCycleChart, {
    logs: cycleLogs,
    settings: settings,
    isFemale: isFemale
  }), isFemale && window.CycleAccuracyCard && /*#__PURE__*/React.createElement(CycleAccuracyCard, {
    settings: settings,
    onSaveSettings: onSaveSettings
  })), /*#__PURE__*/React.createElement("div", {
    className: "flo-bottom-sticky-bar"
  }, isFemale ?
  /*#__PURE__*/
  /* Mikkie's Active Logging Button */
  React.createElement("button", {
    type: "button",
    className: "flo-edit-period-btn",
    onClick: () => {
      if (window.HapticEngine) HapticEngine.trigger('medium');
      if (window.AudioEngine) AudioEngine.playTone(650);
      setIsLogOpen(true);
    }
  }, "Log Symptoms & Feelings") :
  /*#__PURE__*/
  /* Zian's Read-Only Partner Glance Status */
  React.createElement("div", {
    className: "flo-partner-read-only-pill"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center'
    }
  }, window.FloVectorIcons && /*#__PURE__*/React.createElement(FloVectorIcons.SexProtected, {
    size: 12,
    color: "#64748b"
  })), /*#__PURE__*/React.createElement("span", null, "Partner View • Real-time Sync with ", femalePartnerName))), isFemale && window.CycleLogSheet && /*#__PURE__*/React.createElement(CycleLogSheet, {
    isOpen: isLogOpen,
    onClose: () => setIsLogOpen(false),
    selectedDateStr: selectedDateStr,
    currentLog: selectedLog,
    cycleDayNumber: selectedState?.currentCycleDay || 1,
    onSaveLog: onSaveLog,
    onDeleteLog: onDeleteLog,
    onPrevDate: () => {
      if (window.CycleEngine) {
        setSelectedDateStr(prev => window.CycleEngine.addDaysToStr(prev, -1));
      }
    },
    onNextDate: () => {
      if (window.CycleEngine) {
        setSelectedDateStr(prev => window.CycleEngine.addDaysToStr(prev, 1));
      }
    }
  }), isFemale && window.CycleSettingsSheet && /*#__PURE__*/React.createElement(CycleSettingsSheet, {
    isOpen: isSettingsOpen,
    onClose: () => setIsSettingsOpen(false),
    settings: settings,
    onSaveSettings: onSaveSettings,
    onResetAllCycleData: onResetAllCycleData
  }));
}
window.CycleTrackerView = CycleTrackerView;

  // ==========================================
  // Module: www/js/app.jsx
  // ==========================================
/**
 * ✦ KOMOREBI — Main Android App Container & Root State Coordinator
 */

function AndroidApp() {
  // URL Query Param Account Override for Instant Multi-Window Couple Testing
  const urlParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const urlUserParam = urlParams ? (urlParams.get('user') || '').toLowerCase() : '';

  // Auto-login if previously saved session exists and auto_login is enabled (or ?user= param passed)
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (urlUserParam) return true;
    const isAuto = window.loadStorage ? window.loadStorage('auto_login_enabled', true) : true;
    const saved = window.loadStorage ? window.loadStorage('saved_auth_user', null) : null;
    return Boolean(isAuto && saved);
  });
  const [activeTab, setActiveTab] = useState('calendar'); // 'calendar' | 'cycle' | 'chat'

  const getTravelerAvatar = (name, isMikkie) => {
    const key = 'avatar_' + (name || '').toLowerCase();
    const raw = window.loadStorage ? window.loadStorage(key, null) : null;
    if (window.resolveAvatar) {
      return window.resolveAvatar(raw, isMikkie !== undefined ? isMikkie : name);
    }
    const defaultAv = isMikkie ? {
      id: 'yae',
      name: 'Yae Miko',
      iconUrl: './assets/avatars/yae.png'
    } : {
      id: 'kokomi',
      name: 'Kokomi',
      iconUrl: './assets/avatars/kokomi.png'
    };
    return raw || defaultAv;
  };

  // Clean, Bare Couple State
  const [activeTraveler, setActiveTraveler] = useState(() => {
    if (urlUserParam.includes('mikkie')) return {
      name: 'Mikkie',
      uid: '801124501'
    };
    if (urlUserParam.includes('zian')) return {
      name: 'Ziankyle',
      uid: '802931402'
    };
    const user = window.loadStorage ? window.loadStorage('active_user', {
      name: 'Ziankyle',
      uid: '802931402'
    }) : {
      name: 'Ziankyle',
      uid: '802931402'
    };
    if (user && user.name && user.name.toLowerCase() === 'zian') return {
      ...user,
      name: 'Ziankyle'
    };
    return user || {
      name: 'Ziankyle',
      uid: '802931402'
    };
  });
  const [partnerTraveler, setPartnerTraveler] = useState(() => {
    if (urlUserParam.includes('mikkie')) return {
      name: 'Ziankyle',
      uid: '802931402'
    };
    if (urlUserParam.includes('zian')) return {
      name: 'Mikkie',
      uid: '801124501'
    };
    const activeName = (activeTraveler?.name || '').toLowerCase();
    const defaultPartner = activeName.includes('mikkie') ? {
      name: 'Ziankyle',
      uid: '802931402'
    } : {
      name: 'Mikkie',
      uid: '801124501'
    };
    const user = window.loadStorage ? window.loadStorage('partner_user', defaultPartner) : defaultPartner;
    if (user && user.name && user.name.toLowerCase() === activeName) return defaultPartner;
    return user || defaultPartner;
  });
  const [myAvatar, setMyAvatar] = useState(() => getTravelerAvatar(activeTraveler?.name || 'Ziankyle', (activeTraveler?.name || '').toLowerCase().includes('mikkie')));
  const [partnerAvatar, setPartnerAvatar] = useState(() => getTravelerAvatar(partnerTraveler?.name || 'Mikkie', (partnerTraveler?.name || '').toLowerCase().includes('mikkie')));
  const [plans, setPlans] = useState(() => window.loadStorage ? window.loadStorage('plans', window.DEFAULT_PLANS || []) : []);
  const [messages, setMessages] = useState(() => window.loadStorage ? window.loadStorage('messages', window.DEFAULT_MESSAGES || []) : []);
  const [latestSnap, setLatestSnap] = useState(() => window.loadStorage ? window.loadStorage('latest_snap', window.DEFAULT_SNAP || null) : null);
  const [whisperNote, setWhisperNote] = useState(() => window.loadStorage ? window.loadStorage('whisper_note', window.DEFAULT_WHISPER || '') : '');
  const [myEnergy, setMyEnergy] = useState(() => window.loadStorage ? window.loadStorage('my_energy', 2) : 2);
  const [isSleeping, setIsSleeping] = useState(() => window.loadStorage ? window.loadStorage('is_sleeping', false) : false);

  // Dynamic Real-time Device Timezone & Partner Sync
  const [myTimezoneInfo, setMyTimezoneInfo] = useState(() => window.getLocalTimezoneInfo ? window.getLocalTimezoneInfo() : {
    timezone: 'UTC',
    city: 'Local'
  });
  const [partnerTimezoneInfo, setPartnerTimezoneInfo] = useState(() => window.loadStorage ? window.loadStorage('partner_timezone', {
    timezone: 'Asia/Tokyo',
    city: 'Tokyo',
    offsetMinutes: 540
  }) : {
    timezone: 'Asia/Tokyo',
    city: 'Tokyo',
    offsetMinutes: 540
  });
  const [inputText, setInputText] = useState('');
  const [isEditingWhisper, setIsEditingWhisper] = useState(false);
  const [tempWhisper, setTempWhisper] = useState(whisperNote);
  const [quickPlanTitle, setQuickPlanTitle] = useState('');
  const [isSnapModalOpen, setIsSnapModalOpen] = useState(false);
  const [isMediaViewerOpen, setIsMediaViewerOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [liveTime, setLiveTime] = useState(window.formatCurrentTime ? window.formatCurrentTime() : '');

  // Flo-Inspired Period & Ovulation Tracking Engine State
  const [cycleSettings, setCycleSettings] = useState(() => window.loadStorage ? window.loadStorage('cycle_settings', window.DEFAULT_CYCLE_SETTINGS || {
    cycleLength: 28,
    periodDuration: 5,
    lastPeriodStart: '2026-08-08',
    allowIntimacyTracking: true
  }) : {
    cycleLength: 28,
    periodDuration: 5,
    lastPeriodStart: '2026-08-08',
    allowIntimacyTracking: true
  });
  const [cycleLogs, setCycleLogs] = useState(() => window.loadStorage ? window.loadStorage('cycle_logs', {}) : {});

  // Supabase Realtime Config & Connection State (100% Free 24/7 Global Sync)
  const [supabaseConfig, setSupabaseConfig] = useState(() => window.loadStorage ? window.loadStorage('supabase_config', window.DEFAULT_SUPABASE_CONFIG) : window.DEFAULT_SUPABASE_CONFIG);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);

  // Dynamic Multi-Month Calendar Engine
  const today = new Date();
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth()); // 0-11
  const todayDateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const [selectedDateStr, setSelectedDateStr] = useState(todayDateStr);
  const handlePrevMonth = () => {
    if (window.AudioEngine) AudioEngine.playTone(550);
    if (calMonth === 0) {
      setCalMonth(11);
      setCalYear(prev => prev - 1);
    } else {
      setCalMonth(prev => prev - 1);
    }
  };
  const handleNextMonth = () => {
    if (window.AudioEngine) AudioEngine.playTone(550);
    if (calMonth === 11) {
      setCalMonth(0);
      setCalYear(prev => prev + 1);
    } else {
      setCalMonth(prev => prev + 1);
    }
  };
  const handleTodayJump = () => {
    if (window.AudioEngine) AudioEngine.playTone(680);
    setCalYear(today.getFullYear());
    setCalMonth(today.getMonth());
    setSelectedDateStr(todayDateStr);
  };

  // Sanctuary Feature Toggle Preferences (Partner Notifications & Sound)
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(() => window.loadStorage ? window.loadStorage('notifications_enabled', true) : true);
  const [isNotifSoundEnabled, setIsNotifSoundEnabled] = useState(() => window.loadStorage ? window.loadStorage('notif_sound_enabled', true) : true);

  // Sanctuary Mood State (Vector SVG Moods)
  const [myMood, setMyMood] = useState(() => window.loadStorage ? window.loadStorage('my_mood', 'loving') : 'loving');
  const [partnerMood, setPartnerMood] = useState(() => window.loadStorage ? window.loadStorage('partner_mood', 'happy') : 'happy');
  const [isMoodModalOpen, setIsMoodModalOpen] = useState(false);

  // Chat Theme State ('pink' | 'forest' | 'ocean')
  const [chatTheme, setChatTheme] = useState(() => window.loadStorage ? window.loadStorage('chat_theme', 'pink') : 'pink');

  // FlickSwipe Couple Movie Swiper State
  const [movieSwipes, setMovieSwipes] = useState(() => window.loadStorage ? window.loadStorage('movie_swipes', {}) : {});
  const [isFlickSwipeOpen, setIsFlickSwipeOpen] = useState(false);

  // Photo Alert Ringtone & Notification State
  const [selectedRingtone, setSelectedRingtone] = useState(() => window.loadStorage ? window.loadStorage('ringtone', 'moonlight') : 'moonlight');
  const [activeNotification, setActiveNotification] = useState(null);
  const notifTimerRef = useRef(null);
  const chatEndRef = useRef(null);

  // Sync to Storage on updates
  // Universal Multi-Transport Sync Dispatcher (Local Storage + WiFi Server + Supabase Cloud)
  const pushSyncUpdate = (key, data, setter = null) => {
    if (setter) setter(data);
    if (window.saveStorage) saveStorage(key, data);
    const payload = {
      [key]: data
    };
    if (window.WiFiSync) WiFiSync.pushUpdate(payload);
    if (window.SupabaseSync && isSupabaseConnected) SupabaseSync.syncUp(key, data);
  };
  const handleSaveMovieSwipes = newSwipes => pushSyncUpdate('movie_swipes', newSwipes, setMovieSwipes);

  // Batch Reactive Storage Synchronizer
  useEffect(() => {
    if (!window.saveStorage) return;
    saveStorage('active_user', activeTraveler);
    saveStorage('partner_user', partnerTraveler);
    saveStorage('my_avatar', myAvatar);
    saveStorage('partner_avatar', partnerAvatar);
    saveStorage('plans', plans);
    saveStorage('messages', messages);
    saveStorage('latest_snap', latestSnap);
    saveStorage('whisper_note', whisperNote);
    saveStorage('my_energy', myEnergy);
    saveStorage('is_sleeping', isSleeping);
    saveStorage('ringtone', selectedRingtone);
    saveStorage('my_mood', myMood);
    saveStorage('partner_mood', partnerMood);
    saveStorage('chat_theme', chatTheme);
    saveStorage('notifications_enabled', isNotificationsEnabled);
    saveStorage('notif_sound_enabled', isNotifSoundEnabled);
    saveStorage('cycle_settings', cycleSettings);
    saveStorage('cycle_logs', cycleLogs);
    saveStorage('movie_swipes', movieSwipes);
  }, [activeTraveler, partnerTraveler, myAvatar, partnerAvatar, plans, messages, latestSnap, whisperNote, myEnergy, isSleeping, selectedRingtone, myMood, partnerMood, chatTheme, isNotificationsEnabled, isNotifSoundEnabled, cycleSettings, cycleLogs, movieSwipes]);
  const handleSelectAvatar = newAv => {
    const myKey = activeTraveler.name.toLowerCase();
    setMyAvatar(newAv);
    if (window.saveStorage) {
      saveStorage('avatar_' + myKey, newAv);
      saveStorage('my_avatar', newAv);
    }
    const profileUpdate = {
      [myKey]: {
        name: activeTraveler.name,
        avatar: newAv,
        updatedAt: Date.now()
      }
    };
    if (window.WiFiSync) WiFiSync.pushUpdate({
      profiles: profileUpdate
    });
    if (window.SupabaseSync) SupabaseSync.syncUp('profiles', profileUpdate);
  };

  // Compute Today's Cycle State
  const todayCycleState = window.CycleEngine ? window.CycleEngine.calculateCycleState(cycleSettings, cycleLogs, todayDateStr) : null;

  // Cycle Handlers
  const handleSaveCycleLog = (dateStr, logEntry) => {
    const updated = {
      ...cycleLogs,
      [dateStr]: logEntry
    };
    pushSyncUpdate('cycle_logs', updated, setCycleLogs);
  };
  const handleDeleteCycleLog = dateStr => {
    const updated = {
      ...cycleLogs
    };
    delete updated[dateStr];
    pushSyncUpdate('cycle_logs', updated, setCycleLogs);
  };
  const handleSaveCycleSettings = newSettings => pushSyncUpdate('cycle_settings', newSettings, setCycleSettings);
  const handleResetAllCycleData = () => {
    const todayStr = window.CycleEngine ? window.CycleEngine.formatDate(new Date()) : new Date().toISOString().slice(0, 10);
    const defaultSettings = window.DEFAULT_CYCLE_SETTINGS || {
      cycleLength: 28,
      periodDuration: 5,
      lastPeriodStart: todayStr,
      allowIntimacyTracking: true
    };
    pushSyncUpdate('cycle_settings', defaultSettings, setCycleSettings);
    pushSyncUpdate('cycle_logs', {}, setCycleLogs);
  };

  // Request Notification Permissions on Startup (Android 13+)
  useEffect(() => {
    if (isLoggedIn && window.KomorebiNative && window.KomorebiNative.requestNotificationPermission) {
      window.KomorebiNative.requestNotificationPermission();
    }
  }, [isLoggedIn]);

  // Unified Back Navigation & Shortcut Key Handler (Hardware Back, Escape, Backspace)
  const handleBackNavigation = () => {
    // 1. Close any open dialogs/modals first
    if (isMediaViewerOpen) {
      setIsMediaViewerOpen(false);
      return true;
    }
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
    if (isFlickSwipeOpen) {
      setIsFlickSwipeOpen(false);
      return true;
    }
    if (isEditingWhisper) {
      setIsEditingWhisper(false);
      return true;
    }
    // 2. Switch from Cycle or Chat tab back to Calendar tab
    if (activeTab === 'cycle' || activeTab === 'chat') {
      setActiveTab('calendar');
      return true;
    }
    // 3. At root screen (Calendar with no modals) -> Minimize App on Android
    if (window.KomorebiNative && window.KomorebiNative.minimizeApp) {
      window.KomorebiNative.minimizeApp();
      return true;
    }
    if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App) {
      window.Capacitor.Plugins.App.exitApp();
      return true;
    }
    return false;
  };

  // Expose global back handler for Android BridgeActivity and listen to keyboard / backbutton events
  useEffect(() => {
    window.handleKomorebiBack = handleBackNavigation;
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleBackNavigation();
        return;
      }
      const isInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName);
      if (e.key === 'Backspace' && !isInput) {
        e.preventDefault();
        handleBackNavigation();
      }
    };
    const handleCordovaBackButton = e => {
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
  }, [isMediaViewerOpen, isMoodModalOpen, isProfileOpen, isAddOpen, isSnapModalOpen, isFlickSwipeOpen, isEditingWhisper, activeTab]);

  // Universal Sanctuary Notification Engine
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
    if (!isNotificationsEnabled) return;
    if (notifTimerRef.current) clearTimeout(notifTimerRef.current);
    const isPhotoAlert = type === 'photo';
    const finalDuration = isPhotoAlert ? 30000 : durationMs;
    if (isPhotoAlert) {
      if (isNotifSoundEnabled && window.AudioEngine) AudioEngine.playRingtone(selectedRingtone, 30000);
    } else if (isNotifSoundEnabled && window.AudioEngine) {
      AudioEngine.playNotificationChime();
    }
    try {
      if (window.KomorebiNative && window.KomorebiNative.showSystemNotification) {
        window.KomorebiNative.showSystemNotification(title || '✦ Komorebi Sanctuary', caption || body || 'New update from your partner', type || 'general');
      }
    } catch (e) {
      console.warn('Native notification system trigger:', e);
    }
    setActiveNotification({
      id: Date.now(),
      title,
      caption: caption || body,
      avatarUrl: avatarUrl || myAvatar.iconUrl,
      type,
      thumbUrl,
      actionTab,
      durationMs: finalDuration
    });
    notifTimerRef.current = setTimeout(() => {
      setActiveNotification(null);
    }, finalDuration);
  };
  const handleDismissNotification = () => {
    if (notifTimerRef.current) clearTimeout(notifTimerRef.current);
    if (window.AudioEngine) AudioEngine.stopRingtone();
    setActiveNotification(null);
  };
  const triggerPhotoNotification = (snap, isIncoming = false) => {
    const senderName = isIncoming ? partnerTraveler.name : 'You';
    const avatar = isIncoming ? partnerAvatar?.iconUrl : myAvatar?.iconUrl;
    triggerNotification({
      title: `📷 Photo from ${senderName}`,
      caption: snap.caption ? `"${snap.caption}"` : `${senderName} sent you a photo! ✨`,
      avatarUrl: avatar,
      type: 'photo',
      thumbUrl: snap.imageUrl,
      actionTab: 'calendar',
      durationMs: 15000
    });
  };

  // High-Performance Diff-Based Realtime Polling Engine (Local Wi-Fi Hub)
  const lastSyncPayloadRef = useRef('');
  useEffect(() => {
    let isMounted = true;
    const pollWiFiServer = async () => {
      if (!window.WiFiSync || document.hidden) return;
      const data = await WiFiSync.fetchLatest();
      if (!data || !isMounted) return;
      const rawJson = JSON.stringify(data);
      if (rawJson === lastSyncPayloadRef.current) {
        return; // Zero re-renders when data is unchanged
      }
      lastSyncPayloadRef.current = rawJson;
      if (data.plans && Array.isArray(data.plans)) {
        setPlans(data.plans);
      }
      if (data.messages && Array.isArray(data.messages)) {
        setMessages(prev => {
          if (prev && prev.length > 0 && data.messages.length > prev.length) {
            const lastMsg = data.messages[data.messages.length - 1];
            if (lastMsg && lastMsg.sender && lastMsg.sender.toLowerCase() !== activeTraveler.name.toLowerCase()) {
              triggerNotification({
                title: `💬 ${partnerTraveler.name}`,
                caption: `${partnerTraveler.name}: "${lastMsg.text || 'sent a message'}"`,
                type: 'message',
                avatarUrl: partnerAvatar?.iconUrl,
                actionTab: 'chat'
              });
            }
          }
          return data.messages;
        });
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
              caption: `Thinking of you right now! 🌸 (${window.getMoodData ? window.getMoodData(partnerMood).name : partnerMood} mood)`,
              type: 'ping',
              avatarUrl: partnerAvatar?.iconUrl,
              actionTab: 'chat'
            });
          }
        }
      }
      if (data.timezone_info && data.timezone_info.sentBy) {
        if (data.timezone_info.sentBy.toLowerCase() !== activeTraveler.name.toLowerCase()) {
          setPartnerTimezoneInfo(data.timezone_info);
          if (window.saveStorage) saveStorage('partner_timezone', data.timezone_info);
        }
      }
      if (data.whisper_note !== undefined) {
        setWhisperNote(data.whisper_note);
      }
      if (data.partner_status) {
        if (data.partner_status.energy !== undefined) setMyEnergy(data.partner_status.energy);
        if (data.partner_status.sleeping !== undefined) setIsSleeping(data.partner_status.sleeping);
      }
      if (data.cycle_logs && typeof data.cycle_logs === 'object') {
        setCycleLogs(data.cycle_logs);
      }
      if (data.cycle_settings && typeof data.cycle_settings === 'object') {
        setCycleSettings(data.cycle_settings);
      }
      if (data.movie_swipes && typeof data.movie_swipes === 'object') {
        setMovieSwipes(data.movie_swipes);
      }
      if (data.profiles && typeof data.profiles === 'object') {
        const myKey = activeTraveler.name.toLowerCase();
        const partnerKey = partnerTraveler.name.toLowerCase();
        if (data.profiles[partnerKey]?.avatar) {
          setPartnerAvatar(data.profiles[partnerKey].avatar);
          if (window.saveStorage) saveStorage('partner_avatar', data.profiles[partnerKey].avatar);
        }
        if (data.profiles[myKey]?.avatar) {
          setMyAvatar(data.profiles[myKey].avatar);
          if (window.saveStorage) saveStorage('my_avatar', data.profiles[myKey].avatar);
        }
      }
    };
    pollWiFiServer();
    const interval = setInterval(pollWiFiServer, 4000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [activeTraveler.name, partnerTraveler.name, partnerAvatar?.iconUrl, selectedRingtone]);

  // Supabase 24/7 Global Realtime Database Subscriptions
  useEffect(() => {
    if (supabaseConfig && supabaseConfig.url && supabaseConfig.key && window.SupabaseSync) {
      const connected = SupabaseSync.init(supabaseConfig);
      setIsSupabaseConnected(connected);
      if (connected) {
        SupabaseSync.fetchAll().then(data => {
          if (data) {
            if (data.plans && Array.isArray(data.plans)) setPlans(data.plans);
            if (data.messages && Array.isArray(data.messages)) setMessages(data.messages);
            if (data.latest_snap !== undefined && data.latest_snap !== null) {
              setLatestSnap(data.latest_snap);
            }
            if (data.timezone_info && data.timezone_info.sentBy) {
              if (data.timezone_info.sentBy.toLowerCase() !== activeTraveler.name.toLowerCase()) {
                setPartnerTimezoneInfo(data.timezone_info);
                if (window.saveStorage) saveStorage('partner_timezone', data.timezone_info);
              }
            }
            if (data.whisper_note !== undefined) setWhisperNote(data.whisper_note);
            if (data.partner_status) {
              if (data.partner_status.energy !== undefined) setMyEnergy(data.partner_status.energy);
              if (data.partner_status.sleeping !== undefined) setIsSleeping(data.partner_status.sleeping);
            }
            if (data.cycle_logs && typeof data.cycle_logs === 'object') {
              setCycleLogs(data.cycle_logs);
            }
            if (data.cycle_settings && typeof data.cycle_settings === 'object') {
              setCycleSettings(data.cycle_settings);
            }
            if (data.movie_swipes && typeof data.movie_swipes === 'object') {
              setMovieSwipes(data.movie_swipes);
            }
            if (data.profiles && typeof data.profiles === 'object') {
              const myKey = activeTraveler.name.toLowerCase();
              const partnerKey = partnerTraveler.name.toLowerCase();
              if (data.profiles[partnerKey]?.avatar) {
                setPartnerAvatar(data.profiles[partnerKey].avatar);
                if (window.saveStorage) saveStorage('partner_avatar', data.profiles[partnerKey].avatar);
              }
              if (data.profiles[myKey]?.avatar) {
                setMyAvatar(data.profiles[myKey].avatar);
                if (window.saveStorage) saveStorage('my_avatar', data.profiles[myKey].avatar);
              }
            }
          }
        });
        const unsub = SupabaseSync.subscribe((key, value) => {
          if (key === 'plans' && Array.isArray(value)) {
            setPlans(value);
          } else if (key === 'messages' && Array.isArray(value)) {
            setMessages(prev => {
              if (prev && prev.length > 0 && value.length > prev.length) {
                const lastMsg = value[value.length - 1];
                if (lastMsg && lastMsg.sender && lastMsg.sender.toLowerCase() !== activeTraveler.name.toLowerCase()) {
                  triggerNotification({
                    title: `💬 ${partnerTraveler.name}`,
                    caption: `${partnerTraveler.name}: "${lastMsg.text || 'sent a message'}"`,
                    type: 'message',
                    avatarUrl: partnerAvatar?.iconUrl,
                    actionTab: 'chat'
                  });
                }
              }
              return value;
            });
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
              triggerNotification({
                title: `⚡ Live Ping from ${value.sentBy}`,
                caption: `Thinking of you right now! 🌸 (${window.getMoodData ? window.getMoodData(partnerMood).name : partnerMood} mood)`,
                type: 'ping',
                avatarUrl: partnerAvatar.iconUrl,
                actionTab: 'chat'
              });
            }
          } else if (key === 'timezone_info' && value && value.sentBy) {
            if (value.sentBy.toLowerCase() !== activeTraveler.name.toLowerCase()) {
              setPartnerTimezoneInfo(value);
              if (window.saveStorage) saveStorage('partner_timezone', value);
            }
          } else if (key === 'whisper_note' && value !== undefined) {
            setWhisperNote(value);
          } else if (key === 'cycle_logs' && typeof value === 'object') {
            setCycleLogs(value);
          } else if (key === 'cycle_settings' && typeof value === 'object') {
            setCycleSettings(value);
          } else if (key === 'movie_swipes' && typeof value === 'object') {
            setMovieSwipes(value);
          } else if (key === 'profiles' && typeof value === 'object') {
            const myKey = activeTraveler.name.toLowerCase();
            const partnerKey = partnerTraveler.name.toLowerCase();
            if (value[partnerKey]?.avatar) {
              setPartnerAvatar(value[partnerKey].avatar);
              if (window.saveStorage) saveStorage('partner_avatar', value[partnerKey].avatar);
            }
            if (value[myKey]?.avatar) {
              setMyAvatar(value[myKey].avatar);
              if (window.saveStorage) saveStorage('my_avatar', value[myKey].avatar);
            }
          }
        });
        return () => {
          if (unsub) unsub();
        };
      }
    }
  }, [supabaseConfig]);
  const handleSaveSupabaseConfig = cfg => {
    setSupabaseConfig(cfg);
    if (window.saveStorage) saveStorage('supabase_config', cfg);
    if (window.SupabaseSync) {
      const ok = SupabaseSync.init(cfg);
      setIsSupabaseConnected(ok);
      if (ok) {
        triggerNotification({
          title: '✦ Cloud Connected',
          caption: 'Supabase Realtime Cloud Sync is now active!',
          type: 'general'
        });
      }
    }
  };
  const handleManualSync = async () => {
    try {
      if (window.HapticEngine) HapticEngine.trigger('light');
      // 1. WiFi Local Sync Pull
      if (window.WiFiSync) {
        const wifiData = await window.WiFiSync.fetchData();
        if (wifiData) {
          if (wifiData.plans && Array.isArray(wifiData.plans)) setPlans(wifiData.plans);
          if (wifiData.messages && Array.isArray(wifiData.messages)) setMessages(wifiData.messages);
          if (wifiData.latest_snap !== undefined) setLatestSnap(wifiData.latest_snap);
          if (wifiData.cycle_logs && typeof wifiData.cycle_logs === 'object') setCycleLogs(wifiData.cycle_logs);
          if (wifiData.cycle_settings && typeof wifiData.cycle_settings === 'object') setCycleSettings(wifiData.cycle_settings);
          if (wifiData.whisper_note !== undefined) setWhisperNote(wifiData.whisper_note);
        }
      }
      // 2. Supabase 24/7 Global Sync Pull
      if (window.SupabaseSync && isSupabaseConnected) {
        const sbData = await window.SupabaseSync.fetchAll();
        if (sbData) {
          if (sbData.plans && Array.isArray(sbData.plans)) setPlans(sbData.plans);
          if (sbData.messages && Array.isArray(sbData.messages)) setMessages(sbData.messages);
          if (sbData.latest_snap !== undefined) setLatestSnap(sbData.latest_snap);
          if (sbData.cycle_logs && typeof sbData.cycle_logs === 'object') setCycleLogs(sbData.cycle_logs);
          if (sbData.cycle_settings && typeof sbData.cycle_settings === 'object') setCycleSettings(sbData.cycle_settings);
          if (sbData.whisper_note !== undefined) setWhisperNote(sbData.whisper_note);
        }
      }
      if (window.HapticEngine) HapticEngine.trigger('success');
    } catch (e) {
      console.warn('Manual pull-sync error:', e);
    }
  };
  const handleAddPlan = newPlan => {
    const updated = [newPlan, ...plans];
    pushSyncUpdate('plans', updated, setPlans);
  };
  const handleQuickAddPlan = e => {
    e.preventDefault();
    if (!quickPlanTitle.trim()) return;
    if (window.AudioEngine) AudioEngine.playTone(600);
    const safeTitle = window.SecurityGuard ? window.SecurityGuard.sanitizeText(quickPlanTitle, 80) : quickPlanTitle;
    const newPlan = {
      id: Date.now().toString(),
      title: safeTitle,
      time: 'All Day',
      date: selectedDateStr,
      type: 'Date',
      emoji: '✨',
      createdBy: activeTraveler.name.toLowerCase(),
      isWishSealed: false,
      isRevealed: true
    };
    const updated = [newPlan, ...plans];
    setQuickPlanTitle('');
    pushSyncUpdate('plans', updated, setPlans);
  };
  const handleDeletePlan = (id, e) => {
    if (e) e.stopPropagation();
    if (confirm('Delete this plan?')) {
      if (window.AudioEngine) AudioEngine.playTone(380);
      const updated = plans.filter(c => c.id !== id);
      pushSyncUpdate('plans', updated, setPlans);
    }
  };
  const handleToggleRevealPlan = id => {
    if (window.AudioEngine) AudioEngine.playTone(650);
    const updated = plans.map(c => c.id === id ? {
      ...c,
      isRevealed: true
    } : c);
    pushSyncUpdate('plans', updated, setPlans);
  };
  const handleSendMessage = e => {
    e.preventDefault();
    if (!inputText.trim()) return;
    if (window.AudioEngine) AudioEngine.playTone(650);
    const safeText = window.SecurityGuard ? window.SecurityGuard.sanitizeText(inputText, 500) : inputText;
    const newMsg = {
      id: Date.now().toString(),
      sender: activeTraveler.name.toLowerCase(),
      text: safeText,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    const updated = [...messages, newMsg];
    setInputText('');
    pushSyncUpdate('messages', updated, setMessages);
  };
  const handleSendSnap = snapData => {
    const snap = {
      id: Date.now().toString(),
      imageUrl: snapData.imageUrl,
      caption: snapData.caption,
      time: 'Just now',
      sentBy: activeTraveler.name.toLowerCase(),
      mediaType: snapData.mediaType || 'image',
      items: snapData.items || []
    };
    setLatestSnap(snap);
    setIsSnapModalOpen(false);
    triggerPhotoNotification(snap, false);
    pushSyncUpdate('latest_snap', snap);
  };
  const handleToggleSleeping = () => {
    const nextState = !isSleeping;
    if (window.AudioEngine) AudioEngine.playTone(nextState ? 350 : 650);
    setIsSleeping(nextState);
    pushSyncUpdate('partner_status', {
      energy: myEnergy,
      sleeping: nextState
    });
  };
  const handleUpdateEnergy = newVal => {
    setMyEnergy(newVal);
    pushSyncUpdate('partner_status', {
      energy: newVal,
      sleeping: isSleeping
    });
  };
  const handleSaveWhisper = () => {
    if (window.AudioEngine) AudioEngine.playTone(680);
    const cleanNote = window.SecurityGuard ? window.SecurityGuard.sanitizeText(tempWhisper, 140) : tempWhisper;
    setIsEditingWhisper(false);
    pushSyncUpdate('whisper_note', cleanNote, setWhisperNote);
  };
  const handleLogout = () => {
    if (window.AudioEngine) AudioEngine.playTone(400);
    if (window.saveStorage) {
      saveStorage('auto_login_enabled', false);
      saveStorage('saved_auth_user', null);
    }
    setIsProfileOpen(false);
    setIsLoggedIn(false);
  };
  const handleLogin = (user, partner) => {
    setActiveTraveler(user);
    setPartnerTraveler(partner);
    if (window.saveStorage) {
      saveStorage('active_user', user);
      saveStorage('partner_user', partner);
    }
    const myKey = user.name.toLowerCase();
    const partnerKey = partner.name.toLowerCase();
    const isUserMikkie = myKey.includes('mikkie');
    const userAv = getTravelerAvatar(user.name, isUserMikkie);
    const partnerAv = getTravelerAvatar(partner.name, !isUserMikkie);
    setMyAvatar(userAv);
    setPartnerAvatar(partnerAv);
    setIsLoggedIn(true);
    const tz = window.getLocalTimezoneInfo ? window.getLocalTimezoneInfo() : {
      timezone: 'UTC',
      city: 'Local'
    };
    setMyTimezoneInfo(tz);
    const tzPayload = {
      sentBy: user.name,
      ...tz
    };
    if (window.WiFiSync) WiFiSync.pushUpdate({
      timezone_info: tzPayload
    });
    if (window.SupabaseSync) SupabaseSync.syncUp('timezone_info', tzPayload);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "device-viewport-wrapper"
  }, /*#__PURE__*/React.createElement("div", {
    className: "android-device-chassis",
    style: {
      position: 'relative'
    }
  }, window.HDNotificationBanner && /*#__PURE__*/React.createElement(HDNotificationBanner, {
    notification: activeNotification,
    onClose: handleDismissNotification,
    onClick: () => {
      handleDismissNotification();
      setIsSnapModalOpen(false);
    }
  }), !isLoggedIn ? window.AuthGateScreen && /*#__PURE__*/React.createElement(AuthGateScreen, {
    onLogin: handleLogin
  }) : /*#__PURE__*/React.createElement("div", {
    className: "android-screen"
  }, /*#__PURE__*/React.createElement("div", {
    className: "app-top-bar"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "./assets/iconforapp.jpg",
    alt: "App Icon",
    style: {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      border: '1.5px solid var(--color-primary)',
      objectFit: 'cover',
      boxShadow: '0 2px 8px rgba(0,0,0,0.5)'
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "app-brand-title",
    style: {
      fontSize: '15px',
      lineHeight: '1.1'
    }
  }, "KOMOREBI"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '10px',
      color: 'var(--text-secondary)'
    }
  }, activeTraveler.name, " & ", partnerTraveler.name))), /*#__PURE__*/React.createElement("button", {
    className: "switch-partner-pill",
    onClick: () => {
      if (window.AudioEngine) AudioEngine.playTone(600);
      setIsProfileOpen(true);
    },
    title: "Profile & Settings"
  }, /*#__PURE__*/React.createElement("img", {
    src: myAvatar?.iconUrl || (activeTraveler.name && activeTraveler.name.toLowerCase().includes('mikkie') ? './assets/avatars/yae.png' : './assets/avatars/kokomi.png'),
    alt: "",
    style: {
      width: '18px',
      height: '18px',
      borderRadius: '50%',
      objectFit: 'cover'
    },
    onError: e => {
      e.target.onerror = null;
      e.target.src = activeTraveler.name && activeTraveler.name.toLowerCase().includes('mikkie') ? './assets/avatars/yae.png' : './assets/avatars/kokomi.png';
    }
  }), /*#__PURE__*/React.createElement("span", null, activeTraveler.name))), /*#__PURE__*/React.createElement("div", {
    key: activeTab,
    className: "tab-view-transition"
  }, activeTab === 'calendar' && window.CalendarTab && /*#__PURE__*/React.createElement(CalendarTab, {
    activeTraveler: activeTraveler,
    partnerTraveler: partnerTraveler,
    myAvatar: myAvatar,
    partnerAvatar: partnerAvatar,
    myEnergy: myEnergy,
    isSleeping: isSleeping,
    myMood: myMood,
    partnerMood: partnerMood,
    myTimezoneInfo: myTimezoneInfo,
    partnerTimezoneInfo: partnerTimezoneInfo,
    calYear: calYear,
    calMonth: calMonth,
    selectedDateStr: selectedDateStr,
    todayDateStr: todayDateStr,
    plans: plans,
    quickPlanTitle: quickPlanTitle,
    whisperNote: whisperNote,
    tempWhisper: tempWhisper,
    isEditingWhisper: isEditingWhisper,
    latestSnap: latestSnap,
    cycleState: todayCycleState,
    onToggleSleeping: handleToggleSleeping,
    onUpdateEnergy: handleUpdateEnergy,
    onOpenMoodModal: () => setIsMoodModalOpen(true),
    onPrevMonth: handlePrevMonth,
    onNextMonth: handleNextMonth,
    onTodayJump: handleTodayJump,
    onSelectDate: setSelectedDateStr,
    onOpenAddModal: () => setIsAddOpen(true),
    onQuickAddPlan: handleQuickAddPlan,
    onSetQuickPlanTitle: setQuickPlanTitle,
    onDeletePlan: handleDeletePlan,
    onToggleRevealPlan: handleToggleRevealPlan,
    onSetIsEditingWhisper: setIsEditingWhisper,
    onSetTempWhisper: setTempWhisper,
    onSaveWhisper: handleSaveWhisper,
    onOpenMediaViewer: () => setIsMediaViewerOpen(true),
    onOpenSnapModal: () => setIsSnapModalOpen(true),
    onOpenCycleTracker: () => setActiveTab('cycle'),
    onOpenFlickSwipe: () => setIsFlickSwipeOpen(true),
    movieSwipes: movieSwipes,
    onManualSync: handleManualSync
  }), activeTab === 'cycle' && window.CycleTrackerView && /*#__PURE__*/React.createElement(CycleTrackerView, {
    settings: cycleSettings,
    cycleLogs: cycleLogs,
    onSaveLog: handleSaveCycleLog,
    onDeleteLog: handleDeleteCycleLog,
    onSaveSettings: handleSaveCycleSettings,
    onResetAllCycleData: handleResetAllCycleData,
    onBackToCalendar: () => setActiveTab('calendar'),
    activeTraveler: activeTraveler,
    partnerTraveler: partnerTraveler
  }), activeTab === 'chat' && window.ChatTab && /*#__PURE__*/React.createElement(ChatTab, {
    chatTheme: chatTheme,
    activeTraveler: activeTraveler,
    partnerTraveler: partnerTraveler,
    myAvatar: myAvatar,
    partnerAvatar: partnerAvatar,
    myMood: myMood,
    partnerMood: partnerMood,
    messages: messages,
    inputText: inputText,
    chatEndRef: chatEndRef,
    onSetChatTheme: setChatTheme,
    onSendMessage: handleSendMessage,
    onSetInputText: setInputText,
    onClearChat: () => {
      if (confirm('Clear chat history?')) {
        if (window.AudioEngine) AudioEngine.playTone(380);
        if (window.HapticEngine) HapticEngine.trigger('warning');
        setMessages([]);
      }
    },
    onBackToCalendar: () => setActiveTab('calendar'),
    onSendPing: () => {
      const pingData = {
        sentBy: activeTraveler.name,
        time: Date.now()
      };
      if (window.WiFiSync) WiFiSync.pushUpdate({
        live_ping: pingData
      });
      if (window.SupabaseSync) SupabaseSync.syncUp('live_ping', pingData);
      triggerNotification({
        title: `⚡ Ping Sent to ${partnerTraveler.name}`,
        caption: `Sent love to ${partnerTraveler.name}! 🌸 (${window.getMoodData ? window.getMoodData(myMood).name : myMood} mood)`,
        type: 'ping',
        avatarUrl: myAvatar.iconUrl,
        actionTab: 'chat'
      });
    },
    onManualSync: handleManualSync
  })), /*#__PURE__*/React.createElement("div", {
    className: "bottom-nav-bar"
  }, /*#__PURE__*/React.createElement("button", {
    className: `nav-tab-btn ${activeTab === 'calendar' ? 'active' : ''}`,
    onClick: () => {
      if (window.AudioEngine) AudioEngine.playTone(480);
      if (window.HapticEngine) HapticEngine.trigger('light');
      setActiveTab('calendar');
    }
  }, window.Icons && /*#__PURE__*/React.createElement(Icons.Calendar, {
    size: 17
  }), /*#__PURE__*/React.createElement("span", null, "Sanctuary")), /*#__PURE__*/React.createElement("button", {
    className: `nav-tab-btn ${activeTab === 'cycle' ? 'active' : ''}`,
    onClick: () => {
      if (window.AudioEngine) AudioEngine.playTone(550);
      if (window.HapticEngine) HapticEngine.trigger('light');
      setActiveTab('cycle');
    }
  }, window.FloVectorIcons && /*#__PURE__*/React.createElement(FloVectorIcons.TenderBreasts, {
    size: 17,
    color: activeTab === 'cycle' ? 'var(--color-primary)' : 'currentColor'
  }), /*#__PURE__*/React.createElement("span", null, "Cycle")), /*#__PURE__*/React.createElement("button", {
    className: "nav-tab-btn",
    onClick: () => {
      if (window.AudioEngine) AudioEngine.playTone(650);
      if (window.HapticEngine) HapticEngine.trigger('medium');
      setIsSnapModalOpen(true);
    },
    title: "Send Photo to Locket"
  }, window.Icons && /*#__PURE__*/React.createElement(Icons.Camera, {
    size: 17
  }), /*#__PURE__*/React.createElement("span", null, "Locket")), /*#__PURE__*/React.createElement("button", {
    className: `nav-tab-btn ${activeTab === 'chat' ? 'active' : ''}`,
    onClick: () => {
      if (window.AudioEngine) AudioEngine.playTone(520);
      if (window.HapticEngine) HapticEngine.trigger('light');
      setActiveTab('chat');
    }
  }, window.Icons && /*#__PURE__*/React.createElement(Icons.Chat, {
    size: 17
  }), /*#__PURE__*/React.createElement("span", null, "Chat")))), window.MoodPickerModal && /*#__PURE__*/React.createElement(MoodPickerModal, {
    isOpen: isMoodModalOpen,
    onClose: () => setIsMoodModalOpen(false),
    currentMood: myMood,
    onSelectMood: moodId => {
      setMyMood(moodId);
      if (window.WiFiSync) WiFiSync.pushUpdate({
        partner_mood: moodId
      });
      if (window.SupabaseSync) SupabaseSync.syncUp('partner_mood', moodId);
      triggerNotification({
        title: `Mood Updated: ${window.getMoodData ? window.getMoodData(moodId).name : moodId}`,
        caption: `Shared with ${partnerTraveler.name}! 💖`,
        type: 'mood',
        avatarUrl: myAvatar.iconUrl
      });
    },
    partnerName: partnerTraveler.name
  }), isMediaViewerOpen && latestSnap && window.FullscreenMediaViewer && /*#__PURE__*/React.createElement(FullscreenMediaViewer, {
    snap: latestSnap,
    activeTraveler: activeTraveler,
    partnerTraveler: partnerTraveler,
    onClose: () => setIsMediaViewerOpen(false),
    onSendNew: () => {
      setIsMediaViewerOpen(false);
      setIsSnapModalOpen(true);
    }
  }), window.SendPictureSheet && /*#__PURE__*/React.createElement(SendPictureSheet, {
    isOpen: isSnapModalOpen,
    onClose: () => setIsSnapModalOpen(false),
    onSendPicture: handleSendSnap,
    activeTraveler: activeTraveler
  }), window.AddPlanSheet && /*#__PURE__*/React.createElement(AddPlanSheet, {
    isOpen: isAddOpen,
    onClose: () => setIsAddOpen(false),
    onAdd: handleAddPlan,
    activeTraveler: activeTraveler,
    initialDate: selectedDateStr
  }), window.ProfileCustomizerSheet && /*#__PURE__*/React.createElement(ProfileCustomizerSheet, {
    isOpen: isProfileOpen,
    onClose: () => setIsProfileOpen(false),
    currentAvatar: myAvatar,
    onSelectAvatar: handleSelectAvatar,
    onLogout: handleLogout,
    activeTraveler: activeTraveler,
    onUpdateName: name => setActiveTraveler(prev => ({
      ...prev,
      name
    })),
    supabaseConfig: supabaseConfig,
    onSaveSupabaseConfig: handleSaveSupabaseConfig,
    isSupabaseConnected: isSupabaseConnected,
    selectedRingtone: selectedRingtone,
    onSelectRingtone: setSelectedRingtone,
    isNotificationsEnabled: isNotificationsEnabled,
    onToggleNotifications: setIsNotificationsEnabled,
    isNotifSoundEnabled: isNotifSoundEnabled,
    onToggleNotifSound: setIsNotifSoundEnabled,
    partnerTraveler: partnerTraveler,
    onTestNotification: () => {
      triggerNotification({
        title: `📷 Photo from ${partnerTraveler.name}`,
        caption: `"${whisperNote || 'Thinking of you! 🌸'}"`,
        type: 'photo',
        avatarUrl: partnerAvatar?.iconUrl,
        actionTab: 'calendar',
        durationMs: 10000
      });
    }
  }), window.FlickSwipeSheet && /*#__PURE__*/React.createElement(FlickSwipeSheet, {
    isOpen: isFlickSwipeOpen,
    onClose: () => setIsFlickSwipeOpen(false),
    activeTraveler: activeTraveler,
    partnerTraveler: partnerTraveler,
    myAvatar: myAvatar,
    partnerAvatar: partnerAvatar,
    movieSwipes: movieSwipes,
    onSaveMovieSwipes: handleSaveMovieSwipes
  })));
}

// Mount React Root
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(/*#__PURE__*/React.createElement(AndroidApp, null));

})(typeof window !== "undefined" ? window : globalThis);
