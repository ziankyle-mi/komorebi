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
      ref.on('value', (snapshot) => {
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
      const resp = await fetch('/api/sync', { cache: 'no-store' });
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
        headers: { 'Content-Type': 'application/json' },
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

      await this.client
        .from('couple_data')
        .upsert({ key: cleanKey, value: cleanVal, updated_at: new Date().toISOString() }, { onConflict: 'key' });
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
              const cleanKey = payload.new.key;
              const cleanVal = window.deepSanitizeObject ? window.deepSanitizeObject(payload.new.value) : payload.new.value;
              onUpdate(cleanKey, cleanVal);
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

window.FirebaseSync = FirebaseSync;
window.WiFiSync = WiFiSync;
window.SupabaseSync = SupabaseSync;
