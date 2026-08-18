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
  { id: 'yae', name: 'Yae Miko', element: 'electro', iconUrl: './assets/avatars/yae.png' }
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
  Heart: ({ size = 13, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
  ),
  Refresh: ({ size = 12, className = "" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="23 4 23 10 17 10"></polyline>
      <polyline points="1 20 1 14 7 14"></polyline>
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
    </svg>
  )
};

// Clean Bare Defaults (No fake/stock preset data)
const DEFAULT_PLANS = [];
const DEFAULT_MESSAGES = [];
const DEFAULT_SNAP = null;
const DEFAULT_WHISPER = "Tap Edit to write a daily note for your partner";

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
    src: './assets/audio/Dreams Traversed by Moonlight _ Genshin Impact #GenshinImpact #Columbina #GenshinMoonInvitation.mp3'
  },
  {
    id: 'nahida',
    title: 'Boundless Bliss',
    subtitle: 'Nahida Extended Theme (tnbee mix)',
    src: './assets/audio/Nahida Theme Music EXTENDED - Boundless Bliss (tnbee mix) _ Genshin Impact.mp3'
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

  playTone(freq, type = 'sine', duration = 0.18) {
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  },

  playRingtone(ringtoneId = 'moonlight', durationMs = 10000) {
    this.stopRingtone();
    if (ringtoneId === 'silent') return;

    const track = RINGTONE_OPTIONS.find(t => t.id === ringtoneId) || RINGTONE_OPTIONS[0];
    if (!track || !track.src) return;

    try {
      const audio = new Audio(track.src);
      audio.volume = 0.65;
      this.currentAudio = audio;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.warn('Audio play auto-policy warning:', err);
        });
      }

      this.audioTimeout = setTimeout(() => {
        this.stopRingtone();
      }, durationMs);
    } catch (e) {
      console.warn('Ringtone playback error:', e);
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
function CelestialPhysicsCanvas() {
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

    function spawnShootingStar() {
      const angle = (Math.PI / 180) * (130 + Math.random() * 15); // ~130°–145° diagonal sweep
      const speed = 7.5 + Math.random() * 5.5;
      const startX = width * 0.35 + Math.random() * (width * 0.75);
      const startY = -20 - Math.random() * 40;

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
        color: Math.random() > 0.35 ? { r: 248, g: 207, b: 101 } : { r: 252, g: 165, b: 201 }
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

// HD Minimalist Photo Alert Notification Banner Component
function HDNotificationBanner({ notification, onClose, onClick }) {
  if (!notification) return null;

  return (
    <div className="hd-notification-banner" onClick={onClick}>
      <div className="hd-notif-main-row">
        <div className="hd-notif-avatar">
          <img src={notification.avatarUrl || './assets/iconforapp.jpg'} alt="" />
        </div>

        <div className="hd-notif-content">
          <div className="hd-notif-title-row">
            <span className="hd-notif-title">{notification.title}</span>
            <span className="hd-notif-badge">
              <span className="sound-wave-pulse">
                <span className="sound-bar" />
                <span className="sound-bar" />
                <span className="sound-bar" />
              </span>
              <span>10s Alert</span>
            </span>
          </div>
          <div className="hd-notif-caption">{notification.caption || 'Shared a new photo'}</div>
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
        <div className="hd-notif-progress-bar" />
      </div>
    </div>
  );
}

// Minimalist Send Picture Modal Component
function SendPictureSheet({ isOpen, onClose, onSendPicture, activeTraveler }) {
  const [caption, setCaption] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [previewSrc, setPreviewSrc] = useState(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewSrc(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalImage = previewSrc || photoUrl.trim();
    if (!finalImage) return;

    AudioEngine.playTone(720);
    onSendPicture({
      id: 'snap-' + Date.now(),
      imageUrl: finalImage,
      caption: caption.trim() || 'Shared a photo',
      sentBy: activeTraveler.name.toLowerCase(),
      time: formatCurrentTime()
    });
    setCaption('');
    setPreviewSrc(null);
    setPhotoUrl('');
    setShowUrlInput(false);
    onClose();
  };

  const hasPhoto = Boolean(previewSrc || photoUrl.trim());

  return (
    <div className="profile-modal-sheet" onClick={onClose}>
      <div className="profile-sheet-body" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-header-row">
          <span className="sheet-title">Share Photo</span>
          <button onClick={onClose} className="sheet-close-btn" aria-label="Close">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="sheet-form-layout">
          {/* Clean Modern Dropzone / Preview */}
          <div
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            className="minimal-photo-dropzone"
          >
            {hasPhoto ? (
              <div className="minimal-photo-preview-wrap">
                <img src={previewSrc || photoUrl} alt="Preview" className="minimal-photo-preview-img" />
                <div className="minimal-change-photo-badge">Tap to change</div>
              </div>
            ) : (
              <div className="minimal-empty-dropzone">
                <div style={{ marginBottom: '6px', color: 'var(--color-primary)' }}>
                  <Icons.Camera size={28} />
                </div>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#fff' }}>Choose a photo</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>Tap to select from device</div>
              </div>
            )}
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            style={{ display: 'none' }}
          />

          {/* Simple Caption Field */}
          <div>
            <label className="form-field-label">Caption</label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Add a caption..."
              maxLength={70}
              className="form-input-text"
            />
          </div>

          {/* Clean URL toggle */}
          <div>
            <button
              type="button"
              onClick={() => setShowUrlInput(!showUrlInput)}
              style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '11px', cursor: 'pointer', padding: '2px 0' }}
            >
              {showUrlInput ? 'Hide URL input' : 'Paste image URL instead'}
            </button>

            {showUrlInput && (
              <input
                type="url"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder="https://..."
                className="form-input-text"
                style={{ marginTop: '6px' }}
              />
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn-minimal-submit"
            disabled={!hasPhoto}
          >
            Send Photo
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <div>
              <label className="form-field-label">Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="form-input-text"
              />
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
  firebaseConfig,
  onSaveFirebaseConfig,
  isFirebaseConnected,
  selectedRingtone,
  onSelectRingtone
}) {
  const [customUrl, setCustomUrl] = useState('');
  const [displayName, setDisplayName] = useState(activeTraveler.name);
  const [nameSavedStatus, setNameSavedStatus] = useState('');
  
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passStatus, setPassStatus] = useState('');
  const [isPassOpen, setIsPassOpen] = useState(false);

  // Firebase Config State
  const [isFirebaseOpen, setIsFirebaseOpen] = useState(false);
  const [fbDbUrl, setFbDbUrl] = useState(firebaseConfig?.databaseURL || '');
  const [fbApiKey, setFbApiKey] = useState(firebaseConfig?.apiKey || '');
  const [fbProjectId, setFbProjectId] = useState(firebaseConfig?.projectId || '');
  const [fbStatus, setFbStatus] = useState('');

  // Ringtone State
  const [isRingtoneOpen, setIsRingtoneOpen] = useState(false);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    setDisplayName(activeTraveler.name);
  }, [activeTraveler.name, isOpen]);

  useEffect(() => {
    if (firebaseConfig) {
      setFbDbUrl(firebaseConfig.databaseURL || '');
      setFbApiKey(firebaseConfig.apiKey || '');
      setFbProjectId(firebaseConfig.projectId || '');
    }
  }, [firebaseConfig, isOpen]);

  if (!isOpen) return null;

  const handleSaveName = (e) => {
    e.preventDefault();
    if (!displayName.trim()) return;
    AudioEngine.playTone(680);
    onUpdateName(displayName.trim());
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

  const handleSaveFirebase = (e) => {
    e.preventDefault();
    if (!fbDbUrl.trim()) {
      setFbStatus('Please enter your Firebase Database URL');
      return;
    }
    const newConfig = {
      databaseURL: fbDbUrl.trim(),
      apiKey: fbApiKey.trim() || 'AIzaSyDemoKey',
      projectId: fbProjectId.trim() || 'komorebi-app'
    };
    onSaveFirebaseConfig(newConfig);
    AudioEngine.playTone(720);
    setFbStatus('Connected & Synced! Live across both phones.');
    setTimeout(() => setFbStatus(''), 3000);
  };

  const handleDisconnectFirebase = () => {
    onSaveFirebaseConfig(null);
    setFbDbUrl('');
    setFbApiKey('');
    setFbProjectId('');
    AudioEngine.playTone(400);
    setFbStatus('Disconnected. Using offline local mode.');
    setTimeout(() => setFbStatus(''), 2500);
  };

  const handleTestRingtone = (trackId) => {
    if (isPlayingPreview) {
      AudioEngine.stopRingtone();
      setIsPlayingPreview(false);
    } else {
      setIsPlayingPreview(true);
      AudioEngine.playRingtone(trackId, 10000);
      setTimeout(() => setIsPlayingPreview(false), 10000);
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

        {/* 3. Image URL Alternative */}
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

        {/* 4. Photo Ringtone & 10s Alert Settings */}
        <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--android-border)', borderRadius: '12px', padding: '12px 14px' }}>
          <div
            onClick={() => setIsRingtoneOpen(!isRingtoneOpen)}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
          >
            <div>
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#fff', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>Photo Ringtone & Alerts</span>
                <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', background: selectedRingtone === 'silent' ? 'rgba(255,255,255,0.08)' : 'rgba(248, 207, 101, 0.15)', color: selectedRingtone === 'silent' ? 'var(--text-secondary)' : 'var(--color-primary)' }}>
                  {RINGTONE_OPTIONS.find(t => t.id === selectedRingtone)?.title || 'Moonlight'} (10s)
                </span>
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Plays for 10 seconds when a photo is sent or received
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
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          color: '#fff',
                          borderRadius: '6px',
                          padding: '4px 8px',
                          fontSize: '10px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        {isPlayingPreview ? '⏹ Stop' : '▶ Test 10s'}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 5. Firebase Realtime 24/7 Global Sync Section */}
        <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--android-border)', borderRadius: '12px', padding: '12px 14px' }}>
          <div
            onClick={() => setIsFirebaseOpen(!isFirebaseOpen)}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
          >
            <div>
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#fff', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>Firebase Realtime Sync</span>
                <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', background: isFirebaseConnected ? 'rgba(76, 215, 182, 0.15)' : 'rgba(255,255,255,0.08)', color: isFirebaseConnected ? 'var(--color-primary)' : 'var(--text-secondary)' }}>
                  {isFirebaseConnected ? 'Live Synced' : 'Offline / Local'}
                </span>
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Instant real-time sync across both of your phones
              </div>
            </div>
            <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{isFirebaseOpen ? '▲' : '▼'}</span>
          </div>

          {isFirebaseOpen && (
            <form onSubmit={handleSaveFirebase} style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
              <div>
                <label className="form-field-label">Realtime Database URL</label>
                <input
                  type="url"
                  value={fbDbUrl}
                  onChange={(e) => setFbDbUrl(e.target.value)}
                  placeholder="https://your-project-default-rtdb.firebaseio.com"
                  required
                  className="form-input-text"
                />
              </div>

              <div>
                <label className="form-field-label">API Key (Optional / Web API Key)</label>
                <input
                  type="text"
                  value={fbApiKey}
                  onChange={(e) => setFbApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="form-input-text"
                />
              </div>

              {fbStatus && (
                <div style={{ fontSize: '11px', color: fbStatus.includes('Connected') ? 'var(--color-primary)' : 'var(--color-accent)', fontWeight: '600' }}>
                  {fbStatus}
                </div>
              )}

              <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                <button
                  type="submit"
                  style={{ flex: 1, background: 'var(--color-primary)', border: 'none', borderRadius: '8px', padding: '8px', color: '#090b10', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}
                >
                  Save & Connect Sync
                </button>
                {firebaseConfig && (
                  <button
                    type="button"
                    onClick={handleDisconnectFirebase}
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

// Auth Gate Screen Component
function AuthGateScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    AudioEngine.playTone(600);
    onLogin({ name: 'Mikkie', uid: '801124501' }, { name: 'Zian', uid: '802931402' });
  };

  return (
    <div className="auth-gate-screen">
      <div className="auth-brand-box">
        <img
          src="./assets/iconforapp.jpg"
          alt="Komorebi App Icon"
          style={{ width: '72px', height: '72px', borderRadius: '50%', marginBottom: '8px', border: '2px solid var(--color-primary)', boxShadow: '0 8px 24px rgba(248, 207, 101, 0.3)', objectFit: 'cover' }}
        />
        <h2 className="auth-title">KOMOREBI</h2>
        <p className="auth-subtitle">Couple Sanctuary & Shared Calendar</p>
      </div>

      <form className="auth-form-card" onSubmit={handleSubmit}>
        <div className="auth-input-group">
          <label className="auth-input-label">Email or Traveler UID</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="mikkie@teyvat.realm"
            required
            className="auth-input-field"
          />
        </div>

        <div className="auth-input-group">
          <label className="auth-input-label">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="auth-input-field"
          />
        </div>

        <button type="submit" className="btn-auth-submit">
          Enter Sanctuary ✦
        </button>

        <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
          <button
            type="button"
            style={{ flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--android-border)', borderRadius: '8px', padding: '6px', color: 'var(--text-secondary)', fontSize: '11px', cursor: 'pointer' }}
            onClick={() => onLogin({ name: 'Mikkie', uid: '801124501' }, { name: 'Zian', uid: '802931402' })}
          >
            Demo: Mikkie
          </button>
          <button
            type="button"
            style={{ flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--android-border)', borderRadius: '8px', padding: '6px', color: 'var(--text-secondary)', fontSize: '11px', cursor: 'pointer' }}
            onClick={() => onLogin({ name: 'Zian', uid: '802931402' }, { name: 'Mikkie', uid: '801124501' })}
          >
            Demo: Zian
          </button>
        </div>
      </form>
    </div>
  );
}

// Built-in Wi-Fi Real-time Sync Engine
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

// Main Application Component
function AndroidApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [screenMode, setScreenMode] = useState('app'); // 'app' | 'lockscreen'
  const [activeTab, setActiveTab] = useState('calendar'); // 'calendar' | 'chat'
  
  // Clean, Bare Couple State
  const [activeTraveler, setActiveTraveler] = useState(() => loadStorage('active_user', { name: 'Mikkie', uid: '801124501' }));
  const [partnerTraveler, setPartnerTraveler] = useState(() => loadStorage('partner_user', { name: 'Zian', uid: '802931402' }));
  const [myAvatar, setMyAvatar] = useState(() => loadStorage('my_avatar', PRESET_AVATARS[0]));
  const [partnerAvatar, setPartnerAvatar] = useState(() => loadStorage('partner_avatar', PRESET_AVATARS[2]));
  const [plans, setPlans] = useState(() => loadStorage('plans', DEFAULT_PLANS));
  const [messages, setMessages] = useState(() => loadStorage('messages', DEFAULT_MESSAGES));
  const [latestSnap, setLatestSnap] = useState(() => loadStorage('latest_snap', DEFAULT_SNAP));
  const [whisperNote, setWhisperNote] = useState(() => loadStorage('whisper_note', DEFAULT_WHISPER));
  const [myEnergy, setMyEnergy] = useState(() => loadStorage('my_energy', 2));
  const [isSleeping, setIsSleeping] = useState(() => loadStorage('is_sleeping', false));

  const [selectedDay, setSelectedDay] = useState(18);
  const [inputText, setInputText] = useState('');
  const [isEditingWhisper, setIsEditingWhisper] = useState(false);
  const [tempWhisper, setTempWhisper] = useState(whisperNote);
  const [quickPlanTitle, setQuickPlanTitle] = useState('');
  const [isSnapModalOpen, setIsSnapModalOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [liveTime, setLiveTime] = useState(formatCurrentTime());

  // Firebase Realtime Config & Connection State
  const [firebaseConfig, setFirebaseConfig] = useState(() => loadStorage('firebase_config', null));
  const [isFirebaseConnected, setIsFirebaseConnected] = useState(false);

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

  // Trigger 10-second notification banner & ringtone
  const triggerPhotoNotification = (snap, isIncoming = false) => {
    if (notifTimerRef.current) clearTimeout(notifTimerRef.current);

    AudioEngine.playRingtone(selectedRingtone, 10000);
    setActiveNotification({
      id: snap.id || 'snap-' + Date.now(),
      title: isIncoming ? `New Photo from ${partnerTraveler.name}` : `Photo Sent to Locket`,
      caption: snap.caption || 'Shared a new photo',
      avatarUrl: isIncoming ? partnerAvatar.iconUrl : myAvatar.iconUrl,
      thumbUrl: snap.imageUrl
    });

    notifTimerRef.current = setTimeout(() => {
      setActiveNotification(null);
      AudioEngine.stopRingtone();
    }, 10000);
  };

  const handleDismissNotification = () => {
    if (notifTimerRef.current) clearTimeout(notifTimerRef.current);
    AudioEngine.stopRingtone();
    setActiveNotification(null);
  };

  // Automatic Same Wi-Fi Sync Polling Loop (Zero Configuration)
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

  // Firebase Realtime Database Subscriptions
  useEffect(() => {
    if (firebaseConfig && firebaseConfig.databaseURL) {
      const connected = FirebaseSync.init(firebaseConfig);
      setIsFirebaseConnected(connected);

      if (connected) {
        const unsubPlans = FirebaseSync.syncDown('plans', (data) => {
          if (data && Array.isArray(data)) setPlans(data);
        });
        const unsubMsgs = FirebaseSync.syncDown('messages', (data) => {
          if (data && Array.isArray(data)) setMessages(data);
        });
        const unsubSnap = FirebaseSync.syncDown('latest_snap', (data) => {
          if (data !== undefined && data !== null) {
            setLatestSnap(prev => {
              if (!prev || prev.id !== data.id) {
                if (data.sentBy !== activeTraveler.name.toLowerCase()) {
                  triggerPhotoNotification(data, true);
                }
              }
              return data;
            });
          }
        });
        const unsubWhisper = FirebaseSync.syncDown('whisper_note', (data) => {
          if (data !== undefined) setWhisperNote(data);
        });
        const unsubPartner = FirebaseSync.syncDown('partner_status', (data) => {
          if (data) {
            if (data.energy !== undefined) setMyEnergy(data.energy);
            if (data.sleeping !== undefined) setIsSleeping(data.sleeping);
          }
        });

        return () => {
          unsubPlans();
          unsubMsgs();
          unsubSnap();
          unsubWhisper();
          unsubPartner();
        };
      }
    }
  }, [firebaseConfig, selectedRingtone, activeTraveler.name, partnerTraveler.name, partnerAvatar.iconUrl]);

  const handleSaveFirebaseConfig = (cfg) => {
    setFirebaseConfig(cfg);
    saveStorage('firebase_config', cfg);
    if (!cfg) {
      setIsFirebaseConnected(false);
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

  const handleSwitchTraveler = () => {
    AudioEngine.playTone(550);
    const tempT = activeTraveler;
    setActiveTraveler(partnerTraveler);
    setPartnerTraveler(tempT);

    const tempA = myAvatar;
    setMyAvatar(partnerAvatar);
    setPartnerAvatar(tempA);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    AudioEngine.playTone(600);
    const newMsg = {
      id: 'msg-' + Date.now(),
      sender: activeTraveler.name.toLowerCase(),
      text: inputText.trim(),
      time: formatCurrentTime()
    };
    setMessages(prev => {
      const next = [...prev, newMsg];
      WiFiSync.pushUpdate({ messages: next });
      FirebaseSync.syncUp('messages', next);
      return next;
    });
    setInputText('');
  };

  const handleAddPlan = (newPlan) => {
    setPlans(prev => {
      const next = [newPlan, ...prev];
      WiFiSync.pushUpdate({ plans: next });
      FirebaseSync.syncUp('plans', next);
      return next;
    });
  };

  const handleDeletePlan = (id, e) => {
    if (e) e.stopPropagation();
    AudioEngine.playTone(380);
    setPlans(prev => {
      const next = prev.filter(p => p.id !== id);
      WiFiSync.pushUpdate({ plans: next });
      FirebaseSync.syncUp('plans', next);
      return next;
    });
  };

  const handleToggleRevealPlan = (id) => {
    AudioEngine.playTone(720);
    setPlans(prev => {
      const next = prev.map(p => p.id === id ? { ...p, isRevealed: !p.isRevealed } : p);
      WiFiSync.pushUpdate({ plans: next });
      FirebaseSync.syncUp('plans', next);
      return next;
    });
  };

  const handleQuickAddPlan = (e) => {
    e.preventDefault();
    if (!quickPlanTitle.trim()) return;
    AudioEngine.playTone(650);
    handleAddPlan({
      id: 'plan-' + Date.now(),
      title: quickPlanTitle.trim(),
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
    FirebaseSync.syncUp('latest_snap', newSnap);
    triggerPhotoNotification(newSnap, false);
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

  const selectedDateStr = `2026-08-${String(selectedDay).padStart(2, '0')}`;
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
          >
            Lockscreen Widget
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
              <button className="switch-partner-pill" onClick={handleSwitchTraveler} title="Switch active profile">
                <Icons.Refresh size={11} />
                <span>Switch to {partnerTraveler.name}</span>
              </button>
            </div>

            {/* TAB 1: CALENDAR & FEED (Bento Grid Architecture) */}
            {activeTab === 'calendar' && (
              <div className="android-content-body">
                {/* 1. TOP BENTO ROW: Partner Status + Dual Clock Widget */}
                <div className="bento-row-split">
                  {/* Left Tile: Partner Presence */}
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
                        onClick={() => setIsSleeping(!isSleeping)}
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
                          setMyEnergy(parseInt(e.target.value, 10));
                          AudioEngine.playTone(300 + parseInt(e.target.value, 10) * 40);
                        }}
                        className="energy-slider-scrubber"
                        aria-label="Energy level"
                      />
                      <div className="bento-energy-info">
                        <span>Energy</span>
                        <span style={{ color: 'var(--color-primary)', fontWeight: '700' }}>{myEnergy * 10}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Tile: Dual Timezones Widget */}
                  <div className="bento-card">
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

                {/* 2. CENTER STAGE: Monthly Calendar Grid & Daily Schedule */}
                <div className="calendar-card">
                  <div className="calendar-header">
                    <span className="month-label">August 2026</span>
                    <button
                      onClick={() => setIsAddOpen(true)}
                      style={{ background: 'rgba(248, 207, 101, 0.1)', border: '1px solid rgba(248, 207, 101, 0.3)', color: 'var(--color-primary)', borderRadius: '8px', padding: '4px 10px', fontSize: '11px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Icons.Plus size={13} />
                      <span>Add Plan</span>
                    </button>
                  </div>

                  <div className="cal-mini-weekdays">
                    <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
                  </div>

                  <div className="cal-mini-grid">
                    {Array.from({ length: 31 }, (_, i) => i + 1).map(d => {
                      const dStr = `2026-08-${String(d).padStart(2, '0')}`;
                      const dayEvents = plans.filter(c => c.date === dStr);
                      const isSelected = selectedDay === d;
                      const isToday = d === 18;

                      return (
                        <div
                          key={d}
                          className={`cal-mini-day ${isSelected ? 'selected' : ''} ${isToday && !isSelected ? 'today' : ''} ${dayEvents.length > 0 ? 'has-plan' : ''}`}
                          onClick={() => {
                            AudioEngine.playTone(500);
                            if (selectedDay === d) {
                              setIsAddOpen(true);
                            } else {
                              setSelectedDay(d);
                            }
                          }}
                          onDoubleClick={() => {
                            AudioEngine.playTone(650);
                            setSelectedDay(d);
                            setIsAddOpen(true);
                          }}
                          title={dayEvents.length > 0 ? `August ${d}: ${dayEvents.map(e => e.title).join(', ')}` : `August ${d}`}
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
                        Plans • August {selectedDay}
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
                        placeholder={`Add a plan for Aug ${selectedDay}...`}
                        className="quick-plan-input"
                      />
                      <button type="submit" className="quick-plan-btn" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Icons.Plus size={12} />
                        <span>Add</span>
                      </button>
                    </form>

                    {dayPlans.length === 0 ? (
                      <div style={{ padding: '12px', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '12px' }}>
                        No plans for August {selectedDay}.
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
                            setWhisperNote(tempWhisper);
                            setIsEditingWhisper(false);
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

                  {/* Right Tile: Shared Photo Locket */}
                  <div className="bento-card" onClick={() => setIsSnapModalOpen(true)} style={{ cursor: 'pointer' }}>
                    <div className="bento-tile-header">
                      <span className="bento-tile-title">
                        <Icons.Camera size={11} />
                        <span>Shared Photo</span>
                      </span>
                      {latestSnap && <span style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>{latestSnap.time}</span>}
                    </div>

                    <div className="bento-photo-thumb">
                      {latestSnap ? (
                        <img src={latestSnap.imageUrl} alt="Shared Photo" />
                      ) : (
                        <div className="bento-photo-empty">
                          <Icons.Camera size={16} />
                          <span>Tap to share</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: MESSAGES & CHAT STREAM */}
            {activeTab === 'chat' && (
              <div
                className="android-content-body"
                style={{ justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}
              >
                {/* 🌌 Celestial Night Sky with Authentic Shooting Stars (UI UX Pro Max Quality) */}
                <CelestialPhysicsCanvas />

                {messages.length > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 4px', marginBottom: '-4px', zIndex: 2 }}>
                    <button
                      onClick={() => {
                        if (confirm('Clear chat history?')) {
                          AudioEngine.playTone(380);
                          setMessages([]);
                        }
                      }}
                      style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', fontSize: '10px', cursor: 'pointer' }}
                    >
                      Clear Chat ✕
                    </button>
                  </div>
                )}

                <div className="chat-bubble-stream" style={{ flex: '1 1 0', minHeight: 0, overflowY: 'auto', maxHeight: 'none', zIndex: 2 }}>
                  {messages.length === 0 ? (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-tertiary)', textAlign: 'center', padding: '40px 20px' }}>
                      <div style={{ marginBottom: '8px', color: 'var(--color-primary)' }}>
                        <Icons.Chat size={32} />
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)' }}>No messages yet</div>
                      <div style={{ fontSize: '11px', marginTop: '2px' }}>Send a message to start chatting.</div>
                    </div>
                  ) : (
                    messages.map(msg => {
                      const isMe = msg.sender === activeTraveler.name.toLowerCase();
                      return (
                        <div key={msg.id} className={`chat-bubble-wrapper ${isMe ? 'outgoing' : 'incoming'}`}>
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
                    placeholder="Type a message..."
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

              {/* Lockscreen Partner Status Bar */}
              <div className="glance-partner-badge">
                <div className="glance-partner-left">
                  <div className="glance-avatar-circle">
                    <img src={myAvatar.iconUrl} alt="" />
                  </div>
                  <div>
                    <div className="glance-partner-name">{activeTraveler.name}</div>
                    <div className="glance-partner-status">{energyInfo.title}</div>
                  </div>
                </div>
                <div className="glance-energy-chip">{myEnergy * 10}% Energy</div>
              </div>

              {/* HD Shared Photo Locket Frame */}
              <div className="glance-photo-frame" onClick={() => setIsSnapModalOpen(true)} style={{ cursor: 'pointer' }}>
                {latestSnap ? (
                  <>
                    <img src={latestSnap.imageUrl} alt="Shared Photo" />
                    <div className="glance-photo-caption">
                      "{latestSnap.caption}"
                    </div>
                  </>
                ) : (
                  <div className="glance-photo-empty">
                    <Icons.Camera size={24} />
                    <span>Tap to drop today's photo</span>
                  </div>
                )}
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
          firebaseConfig={firebaseConfig}
          onSaveFirebaseConfig={handleSaveFirebaseConfig}
          isFirebaseConnected={isFirebaseConnected}
          selectedRingtone={selectedRingtone}
          onSelectRingtone={setSelectedRingtone}
        />
      </div>
    </div>
  );
}

// Mount React Root
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AndroidApp />);
