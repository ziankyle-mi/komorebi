/**
 * ✦ KOMOREBI — Cycle Tracker Settings & Calibration Sheet Component
 */

function CycleSettingsSheet({
  isOpen,
  onClose,
  settings,
  onSaveSettings,
  onResetAllCycleData
}) {
  const [cycleLength, setCycleLength] = useState(settings?.cycleLength || 28);
  const [periodDuration, setPeriodDuration] = useState(settings?.periodDuration || 5);
  const [lastPeriodStart, setLastPeriodStart] = useState(settings?.lastPeriodStart || '2026-08-08');
  const [allowIntimacyTracking, setAllowIntimacyTracking] = useState(settings?.allowIntimacyTracking !== false);

  useEffect(() => {
    if (settings) {
      setCycleLength(settings.cycleLength || 28);
      setPeriodDuration(settings.periodDuration || 5);
      setLastPeriodStart(settings.lastPeriodStart || '2026-08-08');
      setAllowIntimacyTracking(settings.allowIntimacyTracking !== false);
    }
  }, [settings, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (window.AudioEngine) AudioEngine.playTone(680);

    onSaveSettings({
      cycleLength: parseInt(cycleLength, 10),
      periodDuration: parseInt(periodDuration, 10),
      lastPeriodStart,
      allowIntimacyTracking
    });
    onClose();
  };

  const modalJSX = (
    <div className="profile-modal-sheet" onClick={onClose} style={{ zIndex: 120 }}>
      <div className="profile-sheet-body cycle-sheet-body" onClick={(e) => e.stopPropagation()}>
        {/* Top Handle Bar */}
        <div className="sheet-handle-bar" style={{ background: 'rgba(255, 255, 255, 0.22)' }} />

        {/* Header */}
        <div className="sheet-header-row">
          <div>
            <span className="sheet-title" style={{ color: '#fca5c9', display: 'flex', alignItems: 'center', gap: '8px' }}>
              {window.Icons ? <Icons.Settings size={18} /> : '⚙️'}
              <span>Cycle Settings</span>
            </span>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Customize your cycle calculations and predictions
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="sheet-close-btn" 
            aria-label="Close cycle settings"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {window.Icons ? <Icons.X size={16} /> : '✕'}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="cycle-log-form">
          {/* 1. Cycle Length Slider */}
          <div className="cycle-section-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <label className="cycle-section-label" style={{ margin: 0 }}>
                Average Cycle Length
              </label>
              <span style={{ fontSize: '12px', fontWeight: '750', color: '#fca5c9' }}>
                {cycleLength} Days
              </span>
            </div>
            <input
              type="range"
              min="21"
              max="35"
              step="1"
              value={cycleLength}
              onChange={(e) => setCycleLength(e.target.value)}
              className="cycle-slider"
            />
            <div className="cycle-slider-markers">
              <span>21 days</span>
              <span>28 days (standard)</span>
              <span>35 days</span>
            </div>
          </div>

          {/* 2. Period Duration Slider */}
          <div className="cycle-section-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <label className="cycle-section-label" style={{ margin: 0 }}>
                Period Bleeding Duration
              </label>
              <span style={{ fontSize: '12px', fontWeight: '750', color: '#fb7185' }}>
                {periodDuration} Days
              </span>
            </div>
            <input
              type="range"
              min="3"
              max="10"
              step="1"
              value={periodDuration}
              onChange={(e) => setPeriodDuration(e.target.value)}
              className="cycle-slider duration-slider"
            />
            <div className="cycle-slider-markers">
              <span>3 days</span>
              <span>5 days (standard)</span>
              <span>10 days</span>
            </div>
          </div>

          {/* 3. Last Period Start Date Picker */}
          <div className="cycle-section-card">
            <label className="cycle-section-label">
              Last Period Start Date
            </label>
            <input
              type="date"
              value={lastPeriodStart}
              onChange={(e) => setLastPeriodStart(e.target.value)}
              className="cycle-date-picker-input"
            />
          </div>

          {/* 4. Intimacy Tracking Feature Toggle */}
          <div className="cycle-section-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div className="cycle-section-label" style={{ margin: 0 }}>
                Intimacy Tracking
              </div>
              <div style={{ fontSize: '10.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Show intimacy log options in daily logger
              </div>
            </div>
            <button
              type="button"
              className={`toggle-switch-btn ${allowIntimacyTracking ? 'active' : ''}`}
              onClick={() => setAllowIntimacyTracking(!allowIntimacyTracking)}
              style={{ background: allowIntimacyTracking ? '#fb7185' : 'rgba(255,255,255,0.1)' }}
            >
              <div className="toggle-switch-knob" />
            </button>
          </div>

          {/* Submit & Reset Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
            <button type="submit" className="btn-minimal-submit" style={{ background: 'linear-gradient(135deg, #fca5c9, #fb7185)' }}>
              Save Cycle Settings
            </button>
            <button
              type="button"
              onClick={() => {
                if (confirm('Reset all logged period days and symptoms back to clean default?')) {
                  onResetAllCycleData();
                  onClose();
                }
              }}
              className="btn-upload-file"
              style={{ color: '#fb7185', borderColor: 'rgba(251, 113, 133, 0.3)', textAlign: 'center' }}
            >
              Reset All Cycle Logs
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const portalTarget = document.querySelector('.android-screen') || document.body;
  return typeof ReactDOM !== 'undefined' && ReactDOM.createPortal ? ReactDOM.createPortal(modalJSX, portalTarget) : modalJSX;
}

window.CycleSettingsSheet = CycleSettingsSheet;
