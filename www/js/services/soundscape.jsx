/**
 * ✦ KOMOREBI — ZERO-DEPENDENCY AMBIENT SOUNDSCAPE SYNTHESIZER
 * Synthesizes pure procedural relaxing audio (Sakura Rain, Fireside Camp, Starlight Waves, Zen Wind Chimes)
 * using Web Audio API nodes directly on device with zero network overhead.
 */

class SoundscapeSynthesizer {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.activeNodes = {};
    this.volumes = {
      rain: 0.5,
      fire: 0.0,
      waves: 0.0,
      chimes: 0.3
    };
    this.isPlaying = false;
    this.chimeInterval = null;
  }

  initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Pink Noise Generator for Rain / Water (Paul Kellet's filtered white noise algorithm)
  createPinkNoiseNode() {
    if (!this.ctx) return null;
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;
    return whiteNoise;
  }

  // Start Rain Soundscape
  startRain() {
    if (this.activeNodes.rain) return;
    const noise = this.createPinkNoiseNode();
    if (!noise) return;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1000, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(this.volumes.rain * 0.3, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(0);
    this.activeNodes.rain = { source: noise, gain, filter };
  }

  // Start Ocean Waves (Low frequency sine sweep + modulated noise)
  startWaves() {
    if (this.activeNodes.waves) return;
    const noise = this.createPinkNoiseNode();
    if (!noise) return;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, this.ctx.currentTime);

    // LFO to modulate wave surge
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime); // ~8s wave period

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(220, this.ctx.currentTime);
    lfo.connect(filter.frequency);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(this.volumes.waves * 0.4, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(0);
    lfo.start(0);
    this.activeNodes.waves = { source: noise, lfo, gain, filter };
  }

  // Play a random harmonic Zen Bell / Wind Chime
  playZenChime() {
    if (!this.ctx || !this.isPlaying || this.volumes.chimes <= 0.05) return;
    const frequencies = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50, 1174.66]; // C pentatonic major
    const freq = frequencies[Math.floor(Math.random() * frequencies.length)];

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    // Harmonic bell shimmer
    gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(this.volumes.chimes * 0.15, this.ctx.currentTime + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 2.5);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(this.ctx.currentTime);
    osc.stop(this.ctx.currentTime + 2.6);
  }

  // Start All Active Soundscapes
  startAll() {
    this.initContext();
    this.isPlaying = true;

    if (this.volumes.rain > 0) this.startRain();
    if (this.volumes.waves > 0) this.startWaves();

    // Start periodic wind chime generator (every 3 to 6 seconds)
    if (this.chimeInterval) clearInterval(this.chimeInterval);
    this.chimeInterval = setInterval(() => {
      if (Math.random() > 0.3) {
        this.playZenChime();
      }
    }, 3800);
  }

  // Stop All Soundscapes
  stopAll() {
    this.isPlaying = false;
    if (this.chimeInterval) {
      clearInterval(this.chimeInterval);
      this.chimeInterval = null;
    }

    for (const key in this.activeNodes) {
      const node = this.activeNodes[key];
      try {
        if (node.source) node.source.stop();
        if (node.lfo) node.lfo.stop();
        if (node.gain) node.gain.disconnect();
      } catch (_) {}
    }
    this.activeNodes = {};
  }

  setVolume(track, val) {
    this.volumes[track] = Math.max(0, Math.min(1, val));
    if (this.activeNodes[track] && this.ctx) {
      this.activeNodes[track].gain.gain.setValueAtTime(this.volumes[track] * 0.35, this.ctx.currentTime);
    }
    if (this.isPlaying && this.volumes[track] > 0 && !this.activeNodes[track]) {
      if (track === 'rain') this.startRain();
      if (track === 'waves') this.startWaves();
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.stopAll();
    } else {
      this.startAll();
    }
    return this.isPlaying;
  }
}

window.SoundscapeEngine = new SoundscapeSynthesizer();
