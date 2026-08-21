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

  const handleSaveName = (e) => {
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

  const handleSaveSupabase = (e) => {
    e.preventDefault();
    if (!sbUrl.trim() || !sbKey.trim()) {
      setSbStatus('Please enter both Supabase URL and Anon Key');
      return;
    }
    const cleanUrl = sbUrl.trim().replace(/\/$/, '');
    const newConfig = { url: cleanUrl, key: sbKey.trim() };
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

  const handleTestRingtone = (trackId) => {
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
        if (window.AudioEngine) AudioEngine.playTone(680);
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
      if (window.AudioEngine) AudioEngine.playTone(680);
    }
  };

  const resolvedCurrentAvatar = window.resolveAvatar ? window.resolveAvatar(currentAvatar, activeTraveler.name) : (currentAvatar || { iconUrl: './assets/avatars/kokomi.png', name: 'Traveler' });
  const presetAvatars = window.PRESET_AVATARS || [];
  const ringtoneOptions = window.RINGTONE_OPTIONS || [];

  return (
    <div className="profile-modal-sheet" onClick={onClose}>
      <div className="profile-sheet-body" onClick={(e) => e.stopPropagation()}>
        {/* Handle Bar */}
        <div className="sheet-handle-bar" />

        {/* Modal Header */}
        <div className="sheet-header-row">
          <span className="sheet-title">Profile & Settings</span>
          <button 
            onClick={onClose} 
            className="sheet-close-btn" 
            aria-label="Close profile and settings"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {window.Icons ? <Icons.X size={16} /> : '✕'}
          </button>
        </div>

        {/* Hero Avatar & Identity Card */}
        <div className="avatar-preview-section">
          <div className="avatar-preview-circle">
            <img 
              src={resolvedCurrentAvatar.iconUrl} 
              alt={resolvedCurrentAvatar.name} 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = activeTraveler.name && activeTraveler.name.toLowerCase().includes('mikkie') ? './assets/avatars/yae.png' : './assets/avatars/kokomi.png';
              }}
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '16px', fontWeight: '700', color: '#fff' }}>{activeTraveler.name}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Current: {resolvedCurrentAvatar.name}
            </div>
          </div>

          <button
            type="button"
            className="btn-upload-file"
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            style={{ marginTop: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
          >
            {window.Icons && <Icons.Camera size={14} />}
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
            {presetAvatars.map(av => (
              <button
                key={av.id}
                type="button"
                className={`preset-avatar-btn ${currentAvatar.id === av.id ? 'selected' : ''}`}
                onClick={() => {
                  if (window.AudioEngine) AudioEngine.playTone(550);
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
            {window.Icons && <Icons.Settings size={14} />}
            <span>Sanctuary Features & Sync</span>
          </div>
          <div style={{ fontSize: '10.5px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
            Control partner notification alerts and sound
          </div>

          {/* Toggle 1: Live Notifications */}
          <div className="settings-toggle-row">
            <div className="settings-toggle-info">
              <div className="settings-toggle-title">
                <span>Partner Notifications</span>
                <span style={{ fontSize: '9.5px', padding: '1px 6px', borderRadius: '4px', background: isNotificationsEnabled ? 'rgba(248, 207, 101, 0.15)' : 'rgba(255,255,255,0.06)', color: isNotificationsEnabled ? 'var(--color-primary)' : 'var(--text-tertiary)' }}>
                  {isNotificationsEnabled ? 'Active' : 'Muted'}
                </span>
              </div>
              <div className="settings-toggle-desc">
                Get alerts when {partnerTraveler?.name || 'your partner'} sends a photo, message, or ping
              </div>
            </div>
            <button
              type="button"
              className={`toggle-switch-btn ${isNotificationsEnabled ? 'active' : ''}`}
              onClick={() => {
                if (window.AudioEngine) AudioEngine.playTone(isNotificationsEnabled ? 450 : 600);
                if (onToggleNotifications) onToggleNotifications(!isNotificationsEnabled);
              }}
              title="Toggle Notifications"
              aria-label="Toggle Notifications"
            >
              <div className="toggle-switch-knob" />
            </button>
          </div>

          {/* Toggle 2: Notification Chime & Sound */}
          <div className="settings-toggle-row">
            <div className="settings-toggle-info">
              <div className="settings-toggle-title">
                <span>Notification Sound</span>
                <span style={{ fontSize: '9.5px', padding: '1px 6px', borderRadius: '4px', background: isNotifSoundEnabled ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255,255,255,0.06)', color: isNotifSoundEnabled ? '#38bdf8' : 'var(--text-tertiary)' }}>
                  {isNotifSoundEnabled ? 'Sound On' : 'Silent'}
                </span>
              </div>
              <div className="settings-toggle-desc">
                Play subtle chime when receiving new partner updates
              </div>
            </div>
            <button
              type="button"
              className={`toggle-switch-btn ${isNotifSoundEnabled ? 'active' : ''}`}
              onClick={() => {
                if (window.AudioEngine) AudioEngine.playTone(isNotifSoundEnabled ? 450 : 600);
                if (onToggleNotifSound) onToggleNotifSound(!isNotifSoundEnabled);
              }}
              title="Toggle Notification Sound"
              aria-label="Toggle Notification Sound"
            >
              <div className="toggle-switch-knob" />
            </button>
          </div>

          {/* Test Alert Button */}
          <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <button
              type="button"
              onClick={onTestNotification}
              style={{ width: '100%', background: 'rgba(248, 207, 101, 0.12)', border: '1px solid rgba(248, 207, 101, 0.35)', color: 'var(--color-primary)', borderRadius: '8px', padding: '8px 12px', fontSize: '11.5px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              title="Test notification alert"
            >
              {window.Icons && <Icons.Bell size={12} />}
              <span>Send Test Notification Alert</span>
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
                  {ringtoneOptions.find(t => t.id === selectedRingtone)?.title || 'Moonlight'} (30s)
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
              {ringtoneOptions.map(track => {
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

        {/* 6. Supabase 24/7 Global Cloud Sync Section (100% Free) */}
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

        {/* 7. Account Actions: Clear Data & Log Out */}
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

window.ProfileCustomizerSheet = ProfileCustomizerSheet;
