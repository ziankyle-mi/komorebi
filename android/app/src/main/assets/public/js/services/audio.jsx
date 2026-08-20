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
        if (type === 'light') Haptics.impact({ style: 'LIGHT' });
        else if (type === 'medium') Haptics.impact({ style: 'MEDIUM' });
        else if (type === 'heavy') Haptics.impact({ style: 'HEAVY' });
        else if (type === 'success') Haptics.notification({ type: 'SUCCESS' });
        else if (type === 'warning') Haptics.notification({ type: 'WARNING' });
        else if (type === 'selection') Haptics.selectionChanged();
        return;
      }
    } catch (err) {}

    // 2. Web Navigator Vibration API Fallback
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        if (type === 'light') navigator.vibrate(8);
        else if (type === 'medium') navigator.vibrate(18);
        else if (type === 'heavy') navigator.vibrate([20, 25, 20]);
        else if (type === 'success') navigator.vibrate([12, 30, 20]);
        else if (type === 'warning') navigator.vibrate([25, 40, 25]);
        else if (type === 'selection') navigator.vibrate(6);
      } catch (e) {}
    }
  }
};

window.AudioEngine = AudioEngine;
window.HapticEngine = HapticEngine;
