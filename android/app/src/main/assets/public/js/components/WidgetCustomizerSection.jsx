/**
 * ✦ KOMOREBI — Lockscreen & Home Widget Customizer Component
 * Features Live Interactive Mockup, Curated Ambiance Themes, Element Toggles & Corner Radius Controls
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
    showMood: widgetConfig?.showMood !== undefined ? widgetConfig.showMood : true,
    showNote: widgetConfig?.showNote !== undefined ? widgetConfig.showNote : true,
    showPhoto: widgetConfig?.showPhoto !== undefined ? widgetConfig.showPhoto : true,
    showCycle: widgetConfig?.showCycle !== undefined ? widgetConfig.showCycle : true,
    showClocks: widgetConfig?.showClocks !== undefined ? widgetConfig.showClocks : true,
    clockStyle: widgetConfig?.clockStyle || 'digital'
  }));
  const [saveSuccess, setSaveSuccess] = useState(false);

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
    { id: 'pill', label: 'Pill Round (32px)' },
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
    e.preventDefault();
    if (window.HapticEngine) HapticEngine.trigger('success');
    if (window.AudioEngine) AudioEngine.playNotificationChime();
    if (onSaveWidgetConfig) onSaveWidgetConfig(localConfig);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const currentThemeObj = themes.find(t => t.id === localConfig.theme) || themes[0];
  const partnerMoodData = window.getMoodData ? window.getMoodData(partnerMood) : { name: 'Happy', color: '#f8cf65' };

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
            <span>Customize Lockscreen & Home Widget</span>
            <span style={{ fontSize: '9.5px', padding: '1px 6px', borderRadius: '4px', background: `${currentThemeObj.color}22`, color: currentThemeObj.color, fontWeight: '700', border: `1px solid ${currentThemeObj.color}44` }}>
              {currentThemeObj.name}
            </span>
          </div>
          <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Personalize themes, displayed cards, and glassmorphism styling
          </div>
        </div>
        <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{isOpen ? '▲' : '▼'}</span>
      </div>

      {isOpen && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '14px' }}>
          {/* 1. Interactive Live Widget Mockup Preview */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ fontSize: '10.5px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Live Widget Preview
            </div>
            
            <div
              className={`widget-preview-mockup widget-theme-${localConfig.theme} widget-radius-${localConfig.cornerRadius}`}
              style={{
                background: localConfig.theme === 'minimal' ? '#090b10' : `radial-gradient(ellipse at 50% 0%, ${currentThemeObj.glow} 0%, rgba(17, 21, 34, 0.95) 75%)`,
                border: `1px solid ${currentThemeObj.color}44`,
                borderRadius: localConfig.cornerRadius === 'pill' ? '28px' : localConfig.cornerRadius === 'modern' ? '10px' : '18px',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                boxShadow: `0 8px 30px rgba(0,0,0,0.6), 0 0 20px ${currentThemeObj.glow}`
              }}
            >
              {/* Header inside Mockup */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <img
                    src={partnerAvatar?.iconUrl || './assets/avatars/kokomi.png'}
                    alt={partnerTraveler?.name}
                    style={{ width: '24px', height: '24px', borderRadius: '50%', border: `1px solid ${currentThemeObj.color}` }}
                  />
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: '750', color: '#fff' }}>{partnerTraveler?.name}</div>
                    {localConfig.showMood && (
                      <div style={{ fontSize: '9.5px', color: currentThemeObj.color, fontWeight: '600' }}>
                        {partnerMoodData.name} Mood
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ fontSize: '9.5px', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: '6px' }}>
                  {isSleeping ? '💤 Resting' : `⚡ ${myEnergy * 10}%`}
                </div>
              </div>

              {/* Note in Mockup */}
              {localConfig.showNote && (
                <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', padding: '6px 10px' }}>
                  <div style={{ fontSize: '8.5px', color: currentThemeObj.color, fontWeight: '700', textTransform: 'uppercase' }}>Daily Note</div>
                  <div style={{ fontSize: '10.5px', color: '#fff', fontStyle: 'italic' }}>
                    "{whisperNote || 'Tap Edit to write a note'}"
                  </div>
                </div>
              )}

              {/* Photo & Cycle Badges in Mockup */}
              <div style={{ display: 'flex', gap: '6px' }}>
                {localConfig.showCycle && (
                  <div style={{ flex: 1, background: `${currentThemeObj.color}15`, border: `1px solid ${currentThemeObj.color}35`, borderRadius: '8px', padding: '6px 8px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span style={{ fontSize: '11px' }}>🌸</span>
                    <span style={{ fontSize: '9.5px', color: '#fff', fontWeight: '600' }}>Cycle Sanctuary</span>
                  </div>
                )}
                {localConfig.showPhoto && (
                  <div style={{ flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '6px 8px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span style={{ fontSize: '11px' }}>📷</span>
                    <span style={{ fontSize: '9.5px', color: '#fff', fontWeight: '600' }}>Photo Drop</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 2. Choose Theme Ambiance */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div className="form-field-label">Choose Widget Theme & Palette</div>
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
                      <div style={{ fontSize: '11px', fontWeight: '700', color: isSelected ? '#fff' : 'var(--text-primary)' }}>{t.name}</div>
                      <div style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>{t.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Corner Radius Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div className="form-field-label">Corner Radius & Framing</div>
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
            <div className="form-field-label">Widget Cards & Data Toggles</div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {[
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
                    checked={localConfig[item.key]}
                    onChange={(e) => handleUpdateField(item.key, e.target.checked)}
                    style={{ accentColor: currentThemeObj.color, cursor: 'pointer' }}
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={handleSaveAll}
              style={{
                flex: 1,
                background: `linear-gradient(135deg, ${currentThemeObj.color}, var(--color-warmth))`,
                color: '#0c0e17',
                border: 'none',
                borderRadius: '10px',
                padding: '9px',
                fontSize: '11.5px',
                fontWeight: '750',
                cursor: 'pointer',
                boxShadow: `0 4px 14px ${currentThemeObj.glow}`
              }}
            >
              {saveSuccess ? '✓ Saved!' : 'Save Widget'}
            </button>

            {onOpenLockscreen && (
              <button
                type="button"
                onClick={() => {
                  handleSaveAll({ preventDefault: () => {} });
                  setTimeout(() => {
                    onOpenLockscreen();
                  }, 150);
                }}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: `1px solid ${currentThemeObj.color}`,
                  color: '#fff',
                  borderRadius: '10px',
                  padding: '9px 12px',
                  fontSize: '11px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <span>👁️ View Lockscreen</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

window.WidgetCustomizerSection = WidgetCustomizerSection;
