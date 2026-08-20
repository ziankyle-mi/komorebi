/**
 * ✦ KOMOREBI — Android Lockscreen Widget & Live Glance Mode View
 * Features Fully Customizable Widget Themes (Sakura, Forest, Ocean, Gilded, Minimal), Corner Radius & Card Toggles
 */

function LockscreenView({
  liveTime,
  activeTraveler,
  partnerTraveler,
  myAvatar,
  partnerAvatar,
  myMood,
  partnerMood,
  myEnergy,
  isSleeping,
  whisperNote,
  latestSnap,
  cycleState,
  widgetConfig = {},
  onUnlock,
  onOpenMediaViewer,
  onOpenSnapModal
}) {
  const themeKey = widgetConfig?.theme || 'sakura';
  const cornerRadius = widgetConfig?.cornerRadius || 'rounded';
  const showMood = widgetConfig?.showMood !== false;
  const showNote = widgetConfig?.showNote !== false;
  const showPhoto = widgetConfig?.showPhoto !== false;
  const showCycle = widgetConfig?.showCycle !== false;

  const partnerMoodData = window.getMoodData ? window.getMoodData(partnerMood) : { name: 'Happy', color: '#f8cf65' };

  return (
    <div className={`lockscreen-viewport widget-theme-${themeKey} widget-radius-${cornerRadius}`}>
      {/* 🌌 Celestial Night Sky */}
      {window.CelestialPhysicsCanvas && (
        <CelestialPhysicsCanvas theme={themeKey === 'forest' ? 'forest' : themeKey === 'ocean' ? 'ocean' : 'pink'} />
      )}

      {/* Lockscreen Clock */}
      <div className="lockscreen-clock-card">
        <div className="lockscreen-time">{liveTime}</div>
        <div className="lockscreen-date">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Glance Card 1: Partner Presence & Status */}
      {(showMood || showNote) && (
        <div className="glance-widget-surface">
          {showMood && (
            <div className="glance-partner-badge">
              <img 
                src={partnerAvatar?.iconUrl || (partnerTraveler.name.toLowerCase().includes('mikkie') ? './assets/avatars/yae.png' : './assets/avatars/kokomi.png')} 
                alt="" 
                className="glance-avatar-img" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = partnerTraveler.name.toLowerCase().includes('mikkie') ? './assets/avatars/yae.png' : './assets/avatars/kokomi.png';
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: '750', color: '#fff' }}>
                  {partnerTraveler.name}
                </div>
                <div style={{ fontSize: '10.5px', color: partnerMoodData.color, fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '1px' }}>
                  <MoodVectorIcon moodId={partnerMood} size={11} />
                  <span>{partnerMoodData.name} Mood</span>
                </div>
              </div>
              <div style={{ fontSize: '10px', background: 'rgba(255,255,255,0.06)', padding: '3px 8px', borderRadius: '10px', color: 'var(--text-secondary)' }}>
                {isSleeping ? '💤 Resting' : `⚡ ${myEnergy * 10}%`}
              </div>
            </div>
          )}

          {/* Daily Whisper Note */}
          {showNote && (
            <div className="glance-note-bubble">
              <div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--color-accent)', fontWeight: '750', marginBottom: '3px' }}>
                Daily Note
              </div>
              <div style={{ fontSize: '12px', color: '#fff', fontStyle: 'italic', lineHeight: '1.35' }}>
                "{whisperNote || 'Tap Edit to write a note'}"
              </div>
            </div>
          )}
        </div>
      )}

      {/* Glance Card 2: Cycle Sanctuary Status */}
      {showCycle && cycleState && (
        <div className="glance-widget-surface" style={{ padding: '10px 14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                {window.FloVectorIcons && <FloVectorIcons.TenderBreasts size={16} color="#fca5c9" />}
              </span>
              <div>
                <div style={{ fontSize: '11.5px', fontWeight: '750', color: '#fff', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span>Cycle Sanctuary</span>
                  <span style={{ fontSize: '9px', background: `${cycleState.phaseColor || '#fca5c9'}22`, color: cycleState.phaseColor || '#fca5c9', padding: '1px 5px', borderRadius: '5px', fontWeight: '700' }}>
                    Day {cycleState.currentCycleDay}
                  </span>
                </div>
                <div style={{ fontSize: '9.5px', color: 'var(--text-secondary)' }}>
                  {cycleState.phaseName}
                </div>
              </div>
            </div>
            <div style={{ fontSize: '10px', color: '#fca5c9', fontWeight: '700' }}>
              {cycleState.phaseKey === 'menstrual' ? 'Period Active' : `Period in ${cycleState.daysUntilNextPeriod}d`}
            </div>
          </div>
        </div>
      )}

      {/* Glance Card 3: Shared Photo / Video Locket */}
      {showPhoto && (
        <div 
          className="glance-widget-surface glance-photo-card" 
          onClick={() => latestSnap ? onOpenMediaViewer() : onOpenSnapModal()}
          style={{ cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px 6px' }}>
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#fff', display: 'flex', alignItems: 'center', gap: '6px' }}>
              {window.Icons && <Icons.Camera size={12} />}
              <span>{partnerTraveler.name}'s Photo Drop</span>
            </div>
            {latestSnap && (
              <span style={{ fontSize: '9.5px', color: 'var(--text-secondary)' }}>{latestSnap.time}</span>
            )}
          </div>

          <div className="glance-photo-body">
            <MediaCarouselViewer
              snap={latestSnap}
              activeTraveler={activeTraveler}
              partnerTraveler={partnerTraveler}
              isLockscreen={true}
              onOpenModal={() => latestSnap ? onOpenMediaViewer() : onOpenSnapModal()}
            />
          </div>
        </div>
      )}

      {/* Unlock / Open App Bar */}
      <div className="lockscreen-unlock-bar" onClick={onUnlock}>
        <span>Swipe up or tap to enter sanctuary</span>
        <div className="unlock-handle-pill" />
      </div>
    </div>
  );
}

window.LockscreenView = LockscreenView;
