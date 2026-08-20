/**
 * ✦ KOMOREBI — Minimalist Vector SVG System Icons & Flo UI/UX Icon Library
 * Professional clean vector icons replacing stock emojis across the entire app.
 */

const RawIcons = {
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
  Settings: ({ size = 13, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
  ),
  Search: ({ size = 14, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  ),
  Bell: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
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
  Palette: ({ size = 16, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle>
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle>
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle>
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path>
    </svg>
  ),
  Mail: ({ size = 13, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  Refresh: ({ size = 12, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="23 4 23 10 17 10"></polyline>
      <polyline points="1 20 1 14 7 14"></polyline>
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
    </svg>
  ),
  Globe: ({ size = 13, className = "", color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
  ),
  FlowHeavy: ({ size = 16, color = "#fb7185", className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" fill={color} fillOpacity="0.7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  MoodHappy: ({ size = 16, color = "#f8cf65", className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2" />
      <circle cx="9" cy="9.5" r="1.25" fill={color} />
      <circle cx="15" cy="9.5" r="1.25" fill={color} />
      <path d="M8.5 14c1 2 6 2 7 0" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  Notes: ({ size = 16, color = "currentColor", className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
    </svg>
  ),
  Film: ({ size = 18, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
      <line x1="7" y1="2" x2="7" y2="22"></line>
      <line x1="17" y1="2" x2="17" y2="22"></line>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <line x1="2" y1="7" x2="7" y2="7"></line>
      <line x1="2" y1="17" x2="7" y2="17"></line>
      <line x1="17" y1="17" x2="22" y2="17"></line>
      <line x1="17" y1="7" x2="22" y2="7"></line>
    </svg>
  ),
  Tv: ({ size = 18, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
      <polyline points="17 2 12 7 7 2"></polyline>
    </svg>
  ),
  Clapperboard: ({ size = 18, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z"></path>
      <path d="m6.2 5.3 3.1 3.9"></path>
      <path d="m12.4 3.4 3.1 4"></path>
      <path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"></path>
    </svg>
  ),
  Sparkles: ({ size = 18, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
      <path d="M5 3v4M3 5h4M19 17v4M17 19h4"></path>
    </svg>
  ),
  Info: ({ size = 18, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  ),
  X: ({ size = 18, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  ),
  Check: ({ size = 18, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  ),
  Search: ({ size = 18, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  ),
  MinimalFilm: ({ size = 18, color = "currentColor", className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="4" width="18" height="16" rx="3"></rect>
      <path d="M7 4v16"></path>
      <path d="M17 4v16"></path>
      <path d="M3 12h18"></path>
      <path d="M3 8h4"></path>
      <path d="M3 16h4"></path>
      <path d="M17 8h4"></path>
      <path d="M17 16h4"></path>
    </svg>
  ),
  MovieTicket: ({ size = 18, color = "currentColor", className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"></path>
      <path d="M13 5v2"></path>
      <path d="M13 17v2"></path>
      <path d="M13 11v2"></path>
    </svg>
  ),
  Trash: ({ size = 16, color = "currentColor", className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      <line x1="10" y1="11" x2="10" y2="17"></line>
      <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
  ),
  RotateCcw: ({ size = 18, color = "currentColor", className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
      <path d="M3 3v5h5"></path>
    </svg>
  )
};

// Professional Clean Flo SVG Vector Icons (No stock emojis)
const RawFloVectorIcons = {
  // Flow Heavy
  FlowHeavy: ({ size = 16, color = "#fb7185", className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" fill={color} fillOpacity="0.7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  // Mood Happy
  MoodHappy: ({ size = 16, color = "#f8cf65", className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2" />
      <circle cx="9" cy="9.5" r="1.25" fill={color} />
      <circle cx="15" cy="9.5" r="1.25" fill={color} />
      <path d="M8.5 14c1 2 6 2 7 0" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),

  // Notes
  Notes: ({ size = 16, color = "currentColor", className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
    </svg>
  ),
  // 1. Water Drop / Discharge (Egg White, Creamy, Watery, Sticky)
  WaterDrop: ({ size = 16, color = "#60a5fa" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" fill={color} fillOpacity="0.22" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.5 13a3.5 3.5 0 0 0 5 0" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    </svg>
  ),

  // 2. Calm Face
  FaceCalm: ({ size = 16, color = "#6ee7b7" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2" />
      <path d="M8 10c.5-.5 1.5-.5 2 0M14 10c.5-.5 1.5-.5 2 0" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M9.5 15c1 .8 4 .8 5 0" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),

  // 3. Happy Face with Blush
  FaceHappy: ({ size = 16, color = "#f8cf65" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2" />
      <circle cx="9" cy="9.5" r="1.25" fill={color} />
      <circle cx="15" cy="9.5" r="1.25" fill={color} />
      <circle cx="6.5" cy="12.5" r="1.5" fill="#fb7185" fillOpacity="0.6" />
      <circle cx="17.5" cy="12.5" r="1.5" fill="#fb7185" fillOpacity="0.6" />
      <path d="M8.5 14c1 2 6 2 7 0" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),

  // 4. Sensitive Face
  FaceSensitive: ({ size = 16, color = "#c084fc" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2" />
      <ellipse cx="9" cy="10" rx="1.5" ry="2" fill={color} />
      <ellipse cx="15" cy="10" rx="1.5" ry="2" fill={color} />
      <path d="M9.5 15.5c1-.6 4-.6 5 0" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),

  // 5. Irritable / Moody Face
  FaceMoody: ({ size = 16, color = "#fb7185" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2" />
      <line x1="8" y1="9" x2="10.5" y2="10.5" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="9" x2="13.5" y2="10.5" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="9" y1="15" x2="15" y2="15" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),

  // 6. Cramps / Lightning Spark
  Cramps: ({ size = 16, color = "#fb7185" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill={color} fillOpacity="0.15" />
      <path d="M13 3L6 14h5l-1 7 8-12h-5l1-6z" fill={color} stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),

  // 7. Tender Breasts / Blossom
  TenderBreasts: ({ size = 16, color = "#fca5c9" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill={color} fillOpacity="0.15" />
      <path d="M12 7c1.5-2 4-2 5.5 0s1.5 4 0 5.5L12 18l-5.5-5.5c-1.5-1.5-1.5-4 0-5.5s4-2 5.5 0z" fill={color} fillOpacity="0.4" stroke={color} strokeWidth="1.8" />
    </svg>
  ),

  // 8. Bloating / Soft Bubbles
  Bloating: ({ size = 16, color = "#a5b4fc" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="10" cy="13" r="6" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="1.8" />
      <circle cx="16" cy="8" r="3.5" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.5" />
      <circle cx="17.5" cy="15.5" r="2.5" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="1.5" />
    </svg>
  ),

  // 9. Sex: Didn't have sex
  SexNone: ({ size = 16, color = "#94a3b8" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" stroke={color} strokeWidth="1.8" />
      <line x1="4" y1="4" x2="20" y2="20" stroke="#ef4444" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  ),

  // 10. Sex: Protected Sex (Lock with Heart)
  SexProtected: ({ size = 16, color = "#ff4757" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="5" y="11" width="14" height="10" rx="3" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="16" r="1.5" fill={color} />
    </svg>
  ),

  // 11. Sex: Unprotected Sex (Open Lock)
  SexUnprotected: ({ size = 16, color = "#ff6b81" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="5" y="11" width="14" height="10" rx="3" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="16" r="1.5" fill={color} />
    </svg>
  ),

  // 12. Oral Sex / Lips
  OralSex: ({ size = 16, color = "#ff4757" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M3 13c3-3 6-3 9-1 3-2 6-2 9 1-3 4-6 6-9 6s-6-2-9-6z" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M3 13c4.5 1 13.5 1 18 0" stroke={color} strokeWidth="1.5" />
    </svg>
  ),

  // 13. Sensual Touch / Hand Heart
  SensualTouch: ({ size = 16, color = "#fca5c9" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 4.5C9.5 2 6 2.5 4.5 5s.5 6 3 8l4.5 4.5 4.5-4.5c2.5-2 4.5-5.5 3-8S14.5 2 12 4.5z" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.8" />
      <path d="M7 16l-3 3a2 2 0 0 0 2.8 2.8L12 17" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),

  // 14. Orgasm / Sparkles
  Orgasm: ({ size = 16, color = "#f59e0b" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2l2.5 6.5L21 11l-5.5 4 2 7-6.5-4.5L4.5 22l2-7L1 11l6.5-2.5L12 2z" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  ),

  // 15. High Sex Drive / Heart Flame
  SexDriveHigh: ({ size = 16, color = "#ff4757" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 21c-4.5-3.5-8-7-8-10.5 0-3 2.5-5.5 5.5-5.5 1.5 0 3 .7 4 2 1-1.3 2.5-2 4-2 3 0 5.5 2.5 5.5 5.5 0 3.5-3.5 7-8 10.5z" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="1.8" />
      <path d="M12 11c0-2.5 1.5-4 1.5-4s1.5 2 1.5 4-1 2.5-1.5 2.5-1.5-.5-1.5-2.5z" fill="#f8cf65" />
    </svg>
  ),

  // 16. Low / Neutral Sex Drive
  SexDriveLow: ({ size = 16, color = "#94a3b8" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z" stroke={color} strokeWidth="1.8" strokeDasharray="3 3" />
    </svg>
  ),

  // 17. Physical Activity: Yoga
  Yoga: ({ size = 16, color = "#6ee7b7" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="5" r="2.5" fill={color} />
      <path d="M6 18c2-3 4-5 6-5s4 2 6 5M12 7.5v5.5M4 14l4-2M20 14l-4-2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  // 18. Physical Activity: Running / Gym
  Running: ({ size = 16, color = "#60a5fa" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="14" cy="4" r="2" fill={color} />
      <path d="M7 21l3-5 3 2 4-5M5 13l4-3 3 2 4-3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  // 19. Rest Day / Couch
  RestDay: ({ size = 16, color = "#c084fc" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 11V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3M2 13h20v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4zM5 19v2M19 19v2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  // 20. Generic Symptom Fallback Sparkle
  Sparkle: ({ size = 16, color = "#f8cf65" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 3l1.8 5.4L19 10.2l-4.2 3.6L16 19.2l-4-3-4 3 1.2-5.4L5 10.2l5.2-1.8L12 3z" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  )
};

// Universal Vector Icon Renderer mapping category / symptom IDs to clean vector SVGs
function FloVectorIcon({ id, size = 16, color = "currentColor", className = "" }) {
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

  return (
    <span className={`flo-vector-icon-wrap ${className}`} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <Component size={size} color={color} />
    </span>
  );
}

function MoodVectorIcon({ moodId, size = 16, className = "" }) {
  const m = window.getMoodData ? window.getMoodData(moodId) : { icon: 'Heart', color: '#f8cf65' };
  const Comp = Icons[m.icon] || Icons.Heart;
  return (
    <span className={`mood-vector-wrapper ${className}`} style={{ color: m.color, display: 'inline-flex', alignItems: 'center' }}>
      <Comp size={size} />
    </span>
  );
}

const defaultFallbackIcon = ({ size = 16, color = "currentColor", className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

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
