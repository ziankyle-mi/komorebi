/**
 * ✦ KOMOREBI — Authentic Flo Single-Month Calendar & Partner Empathy View
 * Enhanced with Partner Care Notification Nudges, Mood+Cycle Correlation Chart, and Prediction Accuracy Calibration.
 */

function CycleTrackerView({
  settings,
  cycleLogs,
  onSaveLog,
  onDeleteLog,
  onSaveSettings,
  onResetAllCycleData,
  onBackToCalendar,
  activeTraveler,
  partnerTraveler
}) {
  const todayDate = new Date();
  const todayStr = window.CycleEngine ? window.CycleEngine.formatDate(todayDate) : '2026-08-19';

  const [selectedDateStr, setSelectedDateStr] = useState(todayStr);
  const [viewYear, setViewYear] = useState(todayDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(todayDate.getMonth());
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [viewMode, setViewMode] = useState('month'); // 'month' | 'year'

  // Role Determination: Mikkie = Female (Full Logging), Zian = Male (Partner Empathy View)
  const isFemale = window.CycleEngine ? window.CycleEngine.isFemaleUser(activeTraveler) : false;
  const femalePartnerName = isFemale ? activeTraveler.name : partnerTraveler.name;

  // Selected & Today States
  const selectedLog = cycleLogs ? cycleLogs[selectedDateStr] : null;
  const selectedState = window.CycleEngine ? window.CycleEngine.calculateCycleState(settings, cycleLogs, selectedDateStr) : {};
  const todayState = window.CycleEngine ? window.CycleEngine.calculateCycleState(settings, cycleLogs, todayStr) : {};
  const phaseInsights = window.CycleEngine ? window.CycleEngine.getPhaseInsights(selectedState.phaseKey, activeTraveler.name) : {};
  
  // Proactive Partner Care Notification Nudge
  const partnerNudge = window.CycleEngine ? window.CycleEngine.getPartnerNotificationNudge(settings, cycleLogs, femalePartnerName) : null;

  // Compute Current Single Month Data
  const currentMonthData = window.CycleEngine
    ? window.CycleEngine.generateFloMonthData(viewYear, viewMonth, settings, cycleLogs)
    : { year: viewYear, month: viewMonth, monthName: 'August', days: [] };

  const handlePrevMonth = () => {
    if (window.HapticEngine) HapticEngine.trigger('selection');
    if (window.AudioEngine) AudioEngine.playTone(450);
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(prev => prev - 1);
    } else {
      setViewMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (window.HapticEngine) HapticEngine.trigger('selection');
    if (window.AudioEngine) AudioEngine.playTone(550);
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(prev => prev + 1);
    } else {
      setViewMonth(prev => prev + 1);
    }
  };

  const handleTodayJump = () => {
    if (window.HapticEngine) HapticEngine.trigger('light');
    if (window.AudioEngine) AudioEngine.playTone(650);
    setSelectedDateStr(todayStr);
    setViewYear(todayDate.getFullYear());
    setViewMonth(todayDate.getMonth());
  };

  // Find all logged items for today / selected date
  const loggedFloItems = selectedLog ? (selectedLog.floItems || []) : [];

  return (
    <div className="flo-screen-wrapper">
      {/* 1. Header Navigation Bar */}
      <div className="flo-top-bar">
        {/* Left Close / Back */}
        <button
          type="button"
          onClick={onBackToCalendar}
          className="flo-close-btn"
          title="Back to Sanctuary"
        >
          <span>←</span>
          <span>Sanctuary</span>
        </button>

        {/* Center Switcher: [Month | Year] */}
        <div className="flo-view-switcher">
          <button
            type="button"
            className={`flo-switch-pill ${viewMode === 'month' ? 'active' : ''}`}
            onClick={() => {
              if (window.HapticEngine) HapticEngine.trigger('selection');
              setViewMode('month');
            }}
          >
            Month
          </button>
          <button
            type="button"
            className={`flo-switch-pill ${viewMode === 'year' ? 'active' : ''}`}
            onClick={() => {
              if (window.HapticEngine) HapticEngine.trigger('selection');
              setViewMode('year');
            }}
          >
            Year
          </button>
        </div>

        {/* Right Action: Today Jump / Settings */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            type="button"
            onClick={handleTodayJump}
            className="flo-today-link"
          >
            Today
          </button>
          {isFemale && (
            <button
              type="button"
              onClick={() => {
                if (window.HapticEngine) HapticEngine.trigger('light');
                if (window.AudioEngine) AudioEngine.playTone(550);
                setIsSettingsOpen(true);
              }}
              className="flo-settings-btn"
              title="Calibration Settings"
            >
              {window.Icons && <Icons.Settings size={13} />}
            </button>
          )}
        </div>
      </div>

      {/* 2. Partner Status Banner */}
      <div className="flo-role-banner">
        {isFemale ? (
          <div className="role-female-badge">
            <span style={{ display: 'inline-flex', alignItems: 'center' }}>
              {window.FloVectorIcons && <FloVectorIcons.TenderBreasts size={13} color="#fca5c9" />}
            </span>
            <span>Your Cycle • Day {todayState.currentCycleDay} of {todayState.totalCycleDays} ({todayState.phaseName})</span>
          </div>
        ) : (
          <div className="role-male-badge">
            <span style={{ display: 'inline-flex', alignItems: 'center' }}>
              {window.Icons && <Icons.Heart size={13} />}
            </span>
            <span>{femalePartnerName}'s Cycle • Day {todayState.currentCycleDay} of {todayState.totalCycleDays} ({todayState.phaseName})</span>
          </div>
        )}
      </div>

      {/* 3. Main Scrollable Container */}
      <div className="flo-months-scroll-container">
        {/* Partner Care Proactive Nudge Banner (Featured for Zian or approaching phases) */}
        {!isFemale && partnerNudge && (
          <div className={`partner-nudge-banner ${partnerNudge.type}`}>
            <div className="partner-nudge-header">
              <div className="partner-nudge-title" style={{ color: partnerNudge.accentColor }}>
                <span>💌</span>
                <span>{partnerNudge.title}</span>
              </div>
              <span className="nudge-badge-pill" style={{ borderColor: partnerNudge.accentColor, color: partnerNudge.accentColor }}>
                {partnerNudge.badge}
              </span>
            </div>
            <div className="partner-nudge-body">
              {partnerNudge.message}
            </div>
          </div>
        )}

        <div className="flo-month-section">
          {/* Month Arrow Navigation Header */}
          <div className="flo-single-month-header">
            <button
              type="button"
              className="flo-month-arrow-btn"
              onClick={handlePrevMonth}
              title="Previous Month"
            >
              ‹
            </button>

            <div className="flo-single-month-title">
              {currentMonthData.monthName} {viewYear !== todayDate.getFullYear() ? viewYear : ''}
            </div>

            <button
              type="button"
              className="flo-month-arrow-btn"
              onClick={handleNextMonth}
              title="Next Month"
            >
              ›
            </button>
          </div>

          {/* Weekday Column Header (M T W T F S S) */}
          <div className="flo-weekdays-bar">
            <span>M</span>
            <span>T</span>
            <span>W</span>
            <span>T</span>
            <span>F</span>
            <span>S</span>
            <span>S</span>
          </div>

          {/* Ambient Pink Glow Container for Bleeding Days */}
          <div className="flo-month-grid-wrap">
            <div className="flo-month-grid">
              {currentMonthData.days.map((day) => {
                if (day.empty) {
                  return <div key={day.id} className="flo-day-cell empty" />;
                }

                const isSelected = day.dateStr === selectedDateStr;
                const isToday = day.dateStr === todayStr;

                return (
                  <div
                    key={day.dateStr}
                    className={`flo-day-cell ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''} ${day.isBleeding ? 'bleeding-range' : ''} ${day.isFertile ? 'fertile-range' : ''}`}
                    onClick={() => {
                      if (window.HapticEngine) HapticEngine.trigger('light');
                      if (window.AudioEngine) AudioEngine.playTone(500);
                      setSelectedDateStr(day.dateStr);
                    }}
                  >
                    {/* Top: Small Cycle Day Number */}
                    <div className="flo-cycle-num">
                      {day.cycleDay}
                    </div>

                    {/* Middle: Calendar Date Number */}
                    <div className="flo-date-num-wrap">
                      {day.isOvulation ? (
                        /* Ovulation Dotted Teal Ring */
                        <div className="flo-ovulation-dotted-ring" title="Estimated Ovulation Day">
                          <span className="flo-date-text ovulation-teal">{day.dayNum}</span>
                        </div>
                      ) : day.isBleeding ? (
                        /* Bleeding Day Number */
                        <span className="flo-date-text bleeding-red">{day.dayNum}</span>
                      ) : (
                        <span className={`flo-date-text ${day.isFertile ? 'fertile-cyan' : ''}`}>
                          {day.dayNum}
                        </span>
                      )}
                    </div>

                    {/* Bottom Indicator: Bleed Day Connector or Log Dot */}
                    {day.isBleeding && (
                      <div className="flo-bleed-connector-bar" />
                    )}
                    {day.dayLog && !day.isBleeding && (
                      <div className="flo-logged-indicator-dot" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 📖 Visual Calendar Color & Symbol Legend */}
          <div className="flo-calendar-legend">
            <div className="legend-item" title="Predicted or logged period bleeding days">
              <span className="legend-sample period" />
              <span>Period</span>
            </div>
            <div className="legend-item" title="Higher chance of conception window">
              <span className="legend-sample fertile" />
              <span>Fertile Window</span>
            </div>
            <div className="legend-item" title="Peak estimated ovulation release day">
              <span className="legend-sample ovulation" />
              <span>Ovulation Peak</span>
            </div>
            <div className="legend-item" title="Day number within current cycle (1..28)">
              <span className="legend-sample cycle-num">1</span>
              <span>Cycle Day</span>
            </div>
          </div>
        </div>

        {/* 5. Empathy Care & Symptoms Glance Card */}
        <div className="flo-empathy-care-card">
          <div className="care-card-header">
            <div>
              <div className="care-card-title">
                {isFemale ? "Daily Check-in" : `How ${femalePartnerName} is Feeling Today`}
              </div>
              <div className="care-card-subtitle">
                {new Date(selectedDateStr + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} • Cycle Day {selectedState.currentCycleDay}
              </div>
            </div>
            <div className="care-phase-pill" style={{ color: selectedState.phaseColor, borderColor: selectedState.phaseColor }}>
              {selectedState.phaseName}
            </div>
          </div>

          {/* Logged Feelings / Symptoms */}
          {selectedLog && (loggedFloItems.length > 0 || selectedLog.flow !== 'none') ? (
            <div className="flo-chips-display-row">
              {selectedLog.flow && selectedLog.flow !== 'none' && (
                <span className="flo-glance-chip bleed-chip" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  {window.FloVectorIcons && <FloVectorIcons.WaterDrop size={12} color="#fb7185" />}
                  <span>Flow: {selectedLog.flow}</span>
                </span>
              )}
              {loggedFloItems.map(itemId => (
                <span key={itemId} className="flo-glance-chip feeling-chip" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  {window.FloVectorIcon && <FloVectorIcon id={itemId} size={12} color="#fca5c9" />}
                  <span>{itemId.replace(/_/g, ' ')}</span>
                </span>
              ))}
              {selectedLog.notes && (
                <div className="flo-glance-note">
                  "{selectedLog.notes}"
                </div>
              )}
            </div>
          ) : (
            <div className="flo-empty-feelings-hint">
              {isFemale
                ? 'No symptoms logged for this date yet. Tap "Log Symptoms & Feelings" below to record!'
                : `${femalePartnerName} has not logged specific symptoms for this date yet.`}
            </div>
          )}

          {/* Partner Care Advice (For Zian) */}
          {!isFemale && (
            <div className="partner-care-guide-box">
              <div className="guide-title">
                <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                  {window.FloVectorIcons && <FloVectorIcons.Sparkle size={13} color="#fca5c9" />}
                </span>
                <span>Ways to Support {femalePartnerName} Today</span>
              </div>
              <ul className="guide-list">
                {phaseInsights.careTips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 6. Mood + Cycle Phase Correlation Chart */}
        {window.MoodCycleChart && (
          <MoodCycleChart
            logs={cycleLogs}
            settings={settings}
            isFemale={isFemale}
          />
        )}

        {/* 7. Prediction Accuracy Feedback & Self-Calibration (For Mikkie) */}
        {isFemale && window.CycleAccuracyCard && (
          <CycleAccuracyCard
            settings={settings}
            onSaveSettings={onSaveSettings}
          />
        )}
      </div>

      {/* 8. Bottom Sticky Action Footer */}
      <div className="flo-bottom-sticky-bar">
        {isFemale ? (
          /* Mikkie's Active Logging Button */
          <button
            type="button"
            className="flo-edit-period-btn"
            onClick={() => {
              if (window.HapticEngine) HapticEngine.trigger('medium');
              if (window.AudioEngine) AudioEngine.playTone(650);
              setIsLogOpen(true);
            }}
          >
            Log Symptoms & Feelings
          </button>
        ) : (
          /* Zian's Read-Only Partner Glance Status */
          <div className="flo-partner-read-only-pill">
            <span style={{ display: 'inline-flex', alignItems: 'center' }}>
              {window.FloVectorIcons && <FloVectorIcons.SexProtected size={12} color="#64748b" />}
            </span>
            <span>Partner View • Real-time Sync with {femalePartnerName}</span>
          </div>
        )}
      </div>

      {/* Flo Daily Category Logger Sheet (Only accessible by female user) */}
      {isFemale && window.CycleLogSheet && (
        <CycleLogSheet
          isOpen={isLogOpen}
          onClose={() => setIsLogOpen(false)}
          selectedDateStr={selectedDateStr}
          currentLog={selectedLog}
          cycleDayNumber={selectedState?.currentCycleDay || 1}
          onSaveLog={onSaveLog}
          onDeleteLog={onDeleteLog}
          onPrevDate={() => {
            if (window.CycleEngine) {
              setSelectedDateStr(prev => window.CycleEngine.addDaysToStr(prev, -1));
            }
          }}
          onNextDate={() => {
            if (window.CycleEngine) {
              setSelectedDateStr(prev => window.CycleEngine.addDaysToStr(prev, 1));
            }
          }}
        />
      )}

      {/* Settings Modal (Only accessible by female user) */}
      {isFemale && window.CycleSettingsSheet && (
        <CycleSettingsSheet
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          settings={settings}
          onSaveSettings={onSaveSettings}
          onResetAllCycleData={onResetAllCycleData}
        />
      )}
    </div>
  );
}

window.CycleTrackerView = CycleTrackerView;
