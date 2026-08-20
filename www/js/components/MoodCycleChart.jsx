/**
 * ✦ KOMOREBI — Mood & Cycle Phase Correlation Analytics Card
 * Displays vector SVG trend bars, dominant emotion patterns, and phase breakdowns.
 */

function MoodCycleChart({ logs, settings, isFemale = false }) {
  const [activePhase, setActivePhase] = useState('menstrual');

  const correlationData = window.CycleEngine
    ? window.CycleEngine.getMoodCycleCorrelations(logs, settings)
    : { hasData: false, phaseStats: {} };

  const phases = [
    { id: 'menstrual', name: 'Menstrual', icon: 'WaterDrop', color: '#fb7185' },
    { id: 'follicular', name: 'Follicular', icon: 'Sparkle', color: '#60a5fa' },
    { id: 'ovulation', name: 'Ovulation', icon: 'Sparkle', color: '#20b2aa' },
    { id: 'luteal', name: 'Luteal', icon: 'TenderBreasts', color: '#c084fc' }
  ];

  const currentStats = correlationData.phaseStats[activePhase] || {
    name: 'Phase',
    color: '#fb7185',
    topChips: [],
    dominantFeel: 'Rest & Balance'
  };

  return (
    <div className="flo-correlation-card">
      <div className="correlation-header">
        <div>
          <div className="correlation-title">
            <span style={{ color: '#fca5c9', display: 'flex', alignItems: 'center' }}>
              {window.FloVectorIcons && <FloVectorIcons.Sparkle size={14} color="#fca5c9" />}
            </span>
            <span>Mood & Cycle Phase Correlation</span>
          </div>
          <div className="correlation-subtitle">
            Hormonal rhythms and emotional trends across cycle phases
          </div>
        </div>
        <span className="correlation-badge">
          {correlationData.hasData ? `${correlationData.totalLoggedDays} Logs` : 'Live Baseline'}
        </span>
      </div>

      {/* 4 Phase Select Tabs */}
      <div className="correlation-tabs-row">
        {phases.map(p => {
          const isActive = activePhase === p.id;
          return (
            <button
              key={p.id}
              type="button"
              className={`correlation-tab-btn ${isActive ? 'active' : ''}`}
              style={{
                borderColor: isActive ? p.color : 'rgba(255,255,255,0.06)',
                color: isActive ? '#fff' : 'var(--text-secondary)'
              }}
              onClick={() => {
                if (window.HapticEngine) HapticEngine.trigger('selection');
                if (window.AudioEngine) AudioEngine.playTone(500);
                setActivePhase(p.id);
              }}
            >
              <span className="tab-indicator-dot" style={{ background: p.color }} />
              <span>{p.name}</span>
            </button>
          );
        })}
      </div>

      {/* Active Phase Analytics Breakdown */}
      <div className="correlation-phase-detail" style={{ borderColor: `${currentStats.color}40` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: '750', color: currentStats.color }}>
            {currentStats.name} Phase Patterns
          </span>
          <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>
            Dominant: <strong style={{ color: '#fff' }}>{currentStats.dominantFeel}</strong>
          </span>
        </div>

        {/* Top Feel Chips */}
        <div className="flo-chips-display-row" style={{ marginTop: '6px' }}>
          {currentStats.topChips && currentStats.topChips.length > 0 ? (
            currentStats.topChips.map(chipId => (
              <span
                key={chipId}
                className="flo-glance-chip feeling-chip"
                style={{
                  background: `${currentStats.color}15`,
                  borderColor: `${currentStats.color}35`,
                  color: '#fff',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                {window.FloVectorIcon && <FloVectorIcon id={chipId} size={12} color={currentStats.color} />}
                <span>{chipId.replace(/_/g, ' ')}</span>
              </span>
            ))
          ) : (
            <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
              No custom symptoms logged for this phase yet. Baseline tracking active.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

window.MoodCycleChart = MoodCycleChart;
