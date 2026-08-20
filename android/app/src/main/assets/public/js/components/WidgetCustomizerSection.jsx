/**
 * ✦ KOMOREBI — Lockscreen Notification Card & Widget Customizer Component
 * Customizes the live notification card displayed on the Android lockscreen & notification center.
 * Features Komorebi App Logo emblem, live interactive mockup, 5 ambiance themes, and instant notification push.
 */

function WidgetCustomizerSection({
  widgetConfig = {},
  onSaveWidgetConfig,
  activeTraveler,
  partnerTraveler,
  partnerAvatar,
  partnerMood,
  whisperNote,
  myEnergy,
  isSleeping,
  onOpenLockscreen
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [localConfig, setLocalConfig] = useState(() => ({
    theme: widgetConfig?.theme || 'sakura',
    style: widgetConfig?.style || 'glass',
    cornerRadius: widgetConfig?.cornerRadius || 'rounded',
    showAppLogo: widgetConfig?.showAppLogo !== undefined ? widgetConfig.showAppLogo : true,
    showMood: widgetConfig?.showMood !== undefined ? widgetConfig.showMood : true,
    showNote: widgetConfig?.showNote !== undefined ? widgetConfig.showNote : true,
    showPhoto: widgetConfig?.showPhoto !== undefined ? widgetConfig.showPhoto : true,
    showCycle: widgetConfig?.showCycle !== undefined ? widgetConfig.showCycle : true,
    showClocks: widgetConfig?.showClocks !== undefined ? widgetConfig.showClocks : true,
    clockStyle: widgetConfig?.clockStyle || 'digital'
  }));
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [pushedNotif, setPushedNotif] = useState(false);

  useEffect(() => {
    if (widgetConfig) {
      setLocalConfig(prev => ({ ...prev, ...widgetConfig }));
    }
  }, [widgetConfig]);

  const themes = [
    { id: 'sakura', name: 'Sakura Rose', color: '#fca5c9', glow: 'rgba(251, 113, 133, 0.25)', desc: 'Rose Gold & Midnight' },
    { id: 'forest', name: 'Emerald Dusk', color: '#6ee7b7', glow: 'rgba(52, 211, 153, 0.25)', desc: 'Mint Emerald Glass' },
    { id: 'ocean', name: 'Celestial Azure', color: '#38bdf8', glow: 'rgba(56, 189, 248, 0.25)', desc: 'Starry Cyan Starlight' },
    { id: 'gilded', name: 'Gilded Gold', color: '#f8cf65', glow: 'rgba(248, 207, 101, 0.25)', desc: 'Obsidian & Gold Trim' },
    { id: 'minimal', name: 'OLED Pure', color: '#e2e8f0', glow: 'rgba(255, 255, 255, 0.1)', desc: 'Clean Dark Minimal' }
  ];

  const corners = [
    { id: 'pill', label: 'Pill (28px)' },
    { id: 'rounded', label: 'Classic (16px)' },
    { id: 'modern', label: 'Modern (8px)' }
  ];

  const handleUpdateField = (key, value) => {
    if (window.HapticEngine) HapticEngine.trigger('selection');
    if (window.AudioEngine) AudioEngine.playTone(550);
    const updated = { ...localConfig, [key]: value };
    setLocalConfig(updated);
    if (onSaveWidgetConfig) onSaveWidgetConfig(updated);
  };

  const handleSaveAll = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (window.HapticEngine) HapticEngine.trigger('success');
    if (window.AudioEngine) AudioEngine.playNotificationChime();
    if (onSaveWidgetConfig) onSaveWidgetConfig(localConfig);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handlePushLiveNotification = () => {
    if (window.HapticEngine) HapticEngine.trigger('medium');
    if (window.AudioEngine) AudioEngine.playTone(720);
    handleSaveAll({ preventDefault: () => {} });

    try {
      if (window.KomorebiNative && window.KomorebiNative.updateWidget) {
        const payload = JSON.stringify({
          whisper: whisperNote || 'Thinking of you today! 🌸',
          energy: myEnergy || 3,
          mood: partnerMood || 'happy',
          partnerMood: partnerMood || 'happy',
          moodLabel: window.getMoodData ? window.getMoodData(partnerMood).name : partnerMood,
          photoUrl: '',
          partnerName: partnerTraveler?.name || 'Partner',
          partnerAvatar: partnerAvatar?.iconUrl || '',
          lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        window.KomorebiNative.updateWidget(payload);
      }
    } catch (e) {
      console.warn('Native notification push:', e);
    }

    setPushedNotif(true);
    setTimeout(() => setPushedNotif(false), 3500);
  };

  const [previewMode, setPreviewMode] = useState('lockscreen'); // 'lockscreen' | 'drawer'
  const currentThemeObj = themes.find(t => t.id === localConfig.theme) || themes[0];
  const partnerMoodData = window.getMoodData ? window.getMoodData(partnerMood) : { name: 'Happy', color: '#f8cf65' };
  const currentTimeFormatted = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const currentDateFormatted = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  return (
    <div className="widget-customizer-card" style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--android-border)', borderRadius: '12px', padding: '12px 14px' }}>
      {/* Header Accordion Bar */}
      <div
        onClick={() => {
          if (window.HapticEngine) HapticEngine.trigger('light');
          setIsOpen(!isOpen);
        }}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
      >
        <div>
          <div style={{ fontSize: '12px', fontWeight: '750', color: '#fff', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: currentThemeObj.color }}>
              {window.Icons && <Icons.Palette size={13} />}
            </span>
            <span>Customize Lockscreen Notification Card</span>
            <span style={{ fontSize: '9.5px', padding: '1px 6px', borderRadius: '4px', background: `${currentThemeObj.color}22`, color: currentThemeObj.color, fontWeight: '700', border: `1px solid ${currentThemeObj.color}44` }}>
              {currentThemeObj.name}
            </span>
          </div>
          <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Live preview of the literal Android lockscreen notification card with Komorebi Logo
          </div>
        </div>
        <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{isOpen ? '▲' : '▼'}</span>
      </div>

      {isOpen && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '14px' }}>
          {/* 1. Literal Android Lockscreen Notification Display Preview */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '10.5px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                📱 Literal Phone Lockscreen Display
              </div>
              
              {/* Preview Mode Switcher */}
              <div style={{ display: 'flex', background: 'rgba(255,255,255,0.06)', borderRadius: '6px', padding: '2px', gap: '2px' }}>
                <button
                  type="button"
                  onClick={() => setPreviewMode('lockscreen')}
                  style={{
                    border: 'none',
                    borderRadius: '4px',
                    padding: '2px 7px',
                    fontSize: '9.5px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    background: previewMode === 'lockscreen' ? 'rgba(255,255,255,0.18)' : 'transparent',
                    color: previewMode === 'lockscreen' ? '#fff' : 'var(--text-secondary)'
                  }}
                >
                  🔒 Lockscreen
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewMode('drawer')}
                  style={{
                    border: 'none',
                    borderRadius: '4px',
                    padding: '2px 7px',
                    fontSize: '9.5px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    background: previewMode === 'drawer' ? 'rgba(255,255,255,0.18)' : 'transparent',
                    color: previewMode === 'drawer' ? '#fff' : 'var(--text-secondary)'
                  }}
                >
                  🔔 Notification Tray
                </button>
              </div>
            </div>

            {/* Literal Phone Chassis Frame */}
            <div
              style={{
                borderRadius: '18px',
                border: '1.5px solid rgba(255, 255, 255, 0.12)',
                background: previewMode === 'lockscreen'
                  ? 'linear-gradient(180deg, #070913 0%, #151a2e 50%, #0d101d 100%)'
                  : '#0b0e17',
                padding: '12px 10px 14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                boxShadow: '0 12px 36px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.1)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Android System Status Bar (Clock, WiFi, 5G, Battery) */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10px', color: 'rgba(255,255,255,0.85)', padding: '0 4px', fontWeight: '600' }}>
                <span>{currentTimeFormatted}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '9px' }}>
                  <span>5G 📶</span>
                  <span>100% 🔋</span>
                </div>
              </div>

              {/* Lockscreen Large Clock & Date (When in Lockscreen Mode) */}
              {previewMode === 'lockscreen' && (
                <div style={{ textAlign: 'center', padding: '6px 0 4px' }}>
                  <div style={{ fontSize: '32px', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.5px', lineHeight: 1 }}>
                    {currentTimeFormatted}
                  </div>
                  <div style={{ fontSize: '10.5px', color: 'rgba(255,255,255,0.7)', marginTop: '4px', fontWeight: '500' }}>
                    {currentDateFormatted}
                  </div>
                </div>
              )}

              {/* LITERAL ANDROID NOTIFICATION CARD (MATCHING komorebi_widget.xml) */}
              <div
                style={{
                  background: 'rgba(22, 27, 40, 0.95)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: `1px solid ${currentThemeObj.color}44`,
                  borderRadius: localConfig.cornerRadius === 'pill' ? '22px' : localConfig.cornerRadius === 'modern' ? '10px' : '16px',
                  padding: '10px 12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  boxShadow: `0 6px 24px rgba(0,0,0,0.5), 0 0 16px ${currentThemeObj.glow}`
                }}
              >
                {/* 1. Android System Notification Header Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {/* App Icon Emblem */}
                    <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: `1.5px solid ${currentThemeObj.color}`, overflow: 'hidden', flexShrink: 0, boxShadow: `0 0 8px ${currentThemeObj.glow}` }}>
                      <img
                        src="./assets/iconforapp.jpg"
                        alt="Komorebi Logo"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '0.6px', color: '#fff' }}>
                      KOMOREBI
                    </span>
                    <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)' }}>•</span>
                    <span style={{ fontSize: '9.5px', color: 'rgba(255,255,255,0.6)', fontWeight: '600' }}>now</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ fontSize: '9px', background: `${currentThemeObj.color}22`, color: currentThemeObj.color, border: `1px solid ${currentThemeObj.color}44`, padding: '1px 6px', borderRadius: '6px', fontWeight: '700' }}>
                      {partnerTraveler?.name} • Live ⚡
                    </div>
                    <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)' }}>▼</span>
                  </div>
                </div>

                {/* 2. Partner Banner Row (Matching RemoteViews XML) */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#161B26', borderRadius: '8px', padding: '6px 8px', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <img
                      src={partnerAvatar?.iconUrl || './assets/avatars/kokomi.png'}
                      alt={partnerTraveler?.name}
                      style={{ width: '24px', height: '24px', borderRadius: '50%', border: `1.5px solid ${currentThemeObj.color}`, objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: '750', color: '#fff' }}>
                        {partnerTraveler?.name} • {partnerMoodData.name}
                      </div>
                    </div>
                  </div>
                  
                  {localConfig.showMood && (
                    <div style={{ fontSize: '9px', background: 'rgba(248, 207, 101, 0.15)', color: '#f8cf65', border: '1px solid rgba(248, 207, 101, 0.3)', padding: '2px 6px', borderRadius: '6px', fontWeight: '700' }}>
                      {isSleeping ? '💤 Resting' : `⚡ ${myEnergy * 10}% Energy`}
                    </div>
                  )}
                </div>

                {/* 3. Daily Whisper Note (Matching RemoteViews XML) */}
                {localConfig.showNote && (
                  <div style={{ background: '#1A1813', border: '1px solid rgba(248, 207, 101, 0.25)', borderRadius: '8px', padding: '6px 8px' }}>
                    <div style={{ fontSize: '8.5px', color: '#f8cf65', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                      💌 DAILY NOTE
                    </div>
                    <div style={{ fontSize: '10.5px', color: '#fff', fontStyle: 'italic', marginTop: '2px', lineHeight: 1.3 }}>
                      "{whisperNote || 'Thinking of you today! 🌸'}"
                    </div>
                  </div>
                )}

                {/* 4. Photo Locket / Cycle Status Badges */}
                <div style={{ display: 'flex', gap: '6px' }}>
                  {localConfig.showCycle && (
                    <div style={{ flex: 1, background: `${currentThemeObj.color}15`, border: `1px solid ${currentThemeObj.color}35`, borderRadius: '6px', padding: '5px 8px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <span style={{ fontSize: '11px' }}>🌸</span>
                      <span style={{ fontSize: '9.5px', color: '#fff', fontWeight: '600' }}>Cycle Sanctuary</span>
                    </div>
                  )}
                  {localConfig.showPhoto && (
                    <div style={{ flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '5px 8px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <span style={{ fontSize: '11px' }}>📷</span>
                      <span style={{ fontSize: '9.5px', color: '#fff', fontWeight: '600' }}>Locket Drop</span>
                    </div>
                  )}
                </div>

                {/* 5. Android Quick Action Buttons */}
                <div style={{ display: 'flex', gap: '6px', paddingTop: '2px' }}>
                  <button
                    type="button"
                    style={{
                      flex: 1,
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '6px',
                      padding: '4px 6px',
                      color: 'rgba(255,255,255,0.85)',
                      fontSize: '9.5px',
                      fontWeight: '600',
                      cursor: 'default'
                    }}
                  >
                    💬 Open Chat
                  </button>
                  <button
                    type="button"
                    style={{
                      flex: 1,
                      background: `${currentThemeObj.color}20`,
                      border: `1px solid ${currentThemeObj.color}40`,
                      borderRadius: '6px',
                      padding: '4px 6px',
                      color: currentThemeObj.color,
                      fontSize: '9.5px',
                      fontWeight: '700',
                      cursor: 'default'
                    }}
                  >
                    🌸 View Sanctuary
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Choose Theme Ambiance Palette */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div className="form-field-label">Notification Theme Palette</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px' }}>
              {themes.map(t => {
                const isSelected = localConfig.theme === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => handleUpdateField('theme', t.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 10px',
                      borderRadius: '10px',
                      background: isSelected ? `${t.color}20` : 'rgba(255, 255, 255, 0.03)',
                      border: `1px solid ${isSelected ? t.color : 'rgba(255, 255, 255, 0.06)'}`,
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: t.color, flexShrink: 0, boxShadow: `0 0 6px ${t.color}` }} />
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: '750', color: isSelected ? '#fff' : 'var(--text-primary)' }}>{t.name}</div>
                      <div style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>{t.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Corner Radius Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div className="form-field-label">Notification Card Shape</div>
            <div style={{ display: 'flex', gap: '6px' }}>
              {corners.map(c => {
                const isSelected = localConfig.cornerRadius === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleUpdateField('cornerRadius', c.id)}
                    style={{
                      flex: 1,
                      padding: '7px 4px',
                      borderRadius: '8px',
                      fontSize: '10px',
                      fontWeight: '700',
                      background: isSelected ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                      border: `1px solid ${isSelected ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.06)'}`,
                      color: isSelected ? '#fff' : 'var(--text-secondary)',
                      cursor: 'pointer'
                    }}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Display Element Toggles */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div className="form-field-label">Notification Card Elements</div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {[
                { key: 'showAppLogo', label: 'Komorebi App Logo Emblem', icon: '🌿' },
                { key: 'showMood', label: "Partner's Live Mood & Energy", icon: '💖' },
                { key: 'showNote', label: 'Daily Whisper Note', icon: '💌' },
                { key: 'showPhoto', label: 'Shared Photo & Video Locket', icon: '📷' },
                { key: 'showCycle', label: 'Cycle Sanctuary Status & Phase', icon: '🌸' }
              ].map(item => (
                <label
                  key={item.key}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ fontSize: '11px', color: '#fff', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={localConfig[item.key] !== false}
                    onChange={(e) => handleUpdateField(item.key, e.target.checked)}
                    style={{ accentColor: currentThemeObj.color, cursor: 'pointer' }}
                  />
                </label>
              ))}
            </div>
          </div>

          {/* 5. Live Notification Push & Save Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '2px' }}>
            <button
              type="button"
              onClick={handlePushLiveNotification}
              style={{
                width: '100%',
                background: `linear-gradient(135deg, ${currentThemeObj.color}, var(--color-warmth))`,
                color: '#0c0e17',
                border: 'none',
                borderRadius: '10px',
                padding: '10px',
                fontSize: '12px',
                fontWeight: '800',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                boxShadow: `0 4px 16px ${currentThemeObj.glow}`
              }}
            >
              <span>📲</span>
              <span>{pushedNotif ? '✓ Notification Pushed to Lockscreen!' : 'Push Live Lockscreen Notification'}</span>
            </button>

            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                type="button"
                onClick={handleSaveAll}
                style={{
                  flex: 1,
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid var(--android-border)',
                  color: '#fff',
                  borderRadius: '8px',
                  padding: '9px',
                  fontSize: '11.5px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                {saveSuccess ? '✓ Saved Notification Style!' : 'Save Style'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

window.WidgetCustomizerSection = WidgetCustomizerSection;
