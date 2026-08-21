/**
 * ✦ KOMOREBI — Calendar & Feed View (Bento Grid Architecture)
 */

function CalendarTab({
  activeTraveler,
  partnerTraveler,
  myAvatar,
  partnerAvatar,
  myEnergy,
  isSleeping,
  myMood,
  partnerMood,
  myTimezoneInfo,
  partnerTimezoneInfo,
  calYear,
  calMonth,
  selectedDateStr,
  todayDateStr,
  plans,
  quickPlanTitle,
  whisperNote,
  tempWhisper,
  isEditingWhisper,
  latestSnap,
  cycleState,
  onToggleSleeping,
  onUpdateEnergy,
  onOpenMoodModal,
  onPrevMonth,
  onNextMonth,
  onTodayJump,
  onSelectDate,
  onOpenAddModal,
  onQuickAddPlan,
  onSetQuickPlanTitle,
  onDeletePlan,
  onToggleRevealPlan,
  onSetIsEditingWhisper,
  onSetTempWhisper,
  onSaveWhisper,
  onOpenMediaViewer,
  onOpenSnapModal,
  onOpenLocketGallery,
  locketDrops = [],
  onOpenCycleTracker,
  onOpenFlickSwipe,
  movieSwipes = {},
  onOpenBucketList,
  onOpenStoryTimeline,
  onOpenSoundscapeMixer,
  bucketList = [],
  storyMilestones = [],
  onManualSync
}) {
  const dayPlans = plans.filter(c => c.date === selectedDateStr);
  const energyInfo = window.getEnergyDetails ? window.getEnergyDetails(myEnergy) : { title: 'Resting', desc: '' };
  const monthNames = window.MONTH_NAMES || [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const activeKey = (activeTraveler?.name || 'ziankyle').toLowerCase();
  const partnerKey = (partnerTraveler?.name || 'mikkie').toLowerCase();
  const mySwipes = movieSwipes?.[activeKey] || {};
  const partnerSwipes = movieSwipes?.[partnerKey] || {};
  const mutualMatchCount = Object.keys(mySwipes).filter(mId => mySwipes[mId] === 'liked' && partnerSwipes[mId] === 'liked').length;

  const completedQuestCount = bucketList?.filter(q => q.completed)?.length || 0;
  const totalQuests = bucketList?.length || 15;

  const resolvedMyAvatar = window.resolveAvatar ? window.resolveAvatar(myAvatar, activeTraveler?.name) : (myAvatar || { iconUrl: './assets/avatars/kokomi.png' });
  const effectiveCycleState = cycleState || (window.CycleEngine ? window.CycleEngine.calculateCycleState(window.DEFAULT_CYCLE_SETTINGS, {}, selectedDateStr || todayDateStr) : null);

  const content = (
    <div className="android-content-body">
      {/* 1. TOP BENTO ROW: Partner Status + Dual Clock Widget */}
      <div className="bento-row-split">
        {/* Left Tile: Presence & Mood */}
        <div className="bento-card">
          <div className="bento-partner-header">
            <div className="bento-avatar-wrap">
              <img 
                src={resolvedMyAvatar.iconUrl} 
                alt={activeTraveler.name} 
                className="bento-avatar-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = activeTraveler.name && activeTraveler.name.toLowerCase().includes('mikkie') ? './assets/avatars/yae.png' : './assets/avatars/kokomi.png';
                }}
              />
            </div>
            <div className="bento-partner-meta">
              <div className="bento-partner-name">{activeTraveler.name}</div>
              <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>
                {energyInfo.title}
              </div>
            </div>
            <button
              onClick={onToggleSleeping}
              className="bento-sleep-btn"
              title="Toggle sleep status"
            >
              {isSleeping ? <Icons.Moon size={11} /> : <Icons.Sun size={11} />}
              <span>{isSleeping ? 'Sleep' : 'Awake'}</span>
            </button>
          </div>

          <div>
            <input
              type="range"
              min="1"
              max="10"
              value={myEnergy}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                onUpdateEnergy(val);
                if (window.AudioEngine) AudioEngine.playTone(300 + val * 40);
              }}
              className="energy-slider-scrubber"
              aria-label="Energy level"
            />
            <div className="bento-energy-info">
              <span>Energy: <strong style={{ color: 'var(--color-primary)' }}>{myEnergy * 10}%</strong></span>
              <button 
                onClick={() => {
                  if (window.AudioEngine) AudioEngine.playTone(550);
                  onOpenMoodModal();
                }}
                className="bento-mood-btn"
                title="Change mood status"
              >
                {window.MoodVectorIcon ? <MoodVectorIcon moodId={myMood} size={13} /> : <span>{window.getMoodData ? window.getMoodData(myMood).icon : '✨'}</span>}
                <span>{window.getMoodData ? window.getMoodData(myMood).name : 'Happy'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Tile: Dual Timezones Live */}
        <div className="bento-card">
          <div className="bento-tz-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Icons.Globe size={13} color="var(--color-primary)" />
              <span style={{ fontSize: '11px', fontWeight: '750', color: '#fff' }}>Dual Clock</span>
            </div>
            <span className="bento-tz-diff-pill">
              {window.getTimezoneDiff ? window.getTimezoneDiff(myTimezoneInfo.timezone, partnerTimezoneInfo.timezone) : 'Synced'}
            </span>
          </div>

          <div className="bento-tz-grid">
            <div className="bento-tz-box">
              <div className="bento-tz-label">
                <span className="bento-tz-indicator my-dot" />
                <span>You ({myTimezoneInfo.city})</span>
              </div>
              <div className="bento-tz-time">{window.formatTimeInTimezone ? window.formatTimeInTimezone(myTimezoneInfo.timezone) : ''}</div>
            </div>
            <div className="bento-tz-box">
              <div className="bento-tz-label">
                <span className="bento-tz-indicator partner-dot" />
                <span>{partnerTraveler.name} ({partnerTimezoneInfo.city})</span>
              </div>
              <div className="bento-tz-time">{window.formatTimeInTimezone ? window.formatTimeInTimezone(partnerTimezoneInfo.timezone) : ''}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. FLO-INSPIRED CYCLE GLANCE WIDGET TILE */}
      {effectiveCycleState && (
        <div 
          className="bento-card"
          onClick={() => {
            if (window.HapticEngine) HapticEngine.trigger('light');
            if (window.AudioEngine) AudioEngine.playTone(600);
            if (onOpenCycleTracker) onOpenCycleTracker();
          }}
          style={{ 
            cursor: 'pointer',
            background: 'linear-gradient(135deg, rgba(252, 165, 201, 0.09) 0%, rgba(19, 23, 38, 0.92) 100%)',
            borderColor: effectiveCycleState.daysUntilNextPeriod <= 3 ? 'rgba(251, 113, 133, 0.45)' : 'rgba(252, 165, 201, 0.25)',
            padding: '10px 14px',
            boxShadow: effectiveCycleState.daysUntilNextPeriod <= 3 ? '0 4px 18px rgba(251, 113, 133, 0.12)' : 'none'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                {window.FloVectorIcons && <FloVectorIcons.TenderBreasts size={18} color="#fca5c9" />}
              </span>
              <div>
                <div style={{ fontSize: '12px', fontWeight: '750', color: '#fff', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>Cycle Sanctuary</span>
                  <span style={{ fontSize: '9.5px', background: `${effectiveCycleState.phaseColor || '#fca5c9'}22`, color: effectiveCycleState.phaseColor || '#fca5c9', padding: '1px 6px', borderRadius: '6px', fontWeight: '700', border: `1px solid ${effectiveCycleState.phaseColor || '#fca5c9'}44` }}>
                    Day {effectiveCycleState.currentCycleDay}
                  </span>
                  {effectiveCycleState.daysUntilNextPeriod <= 3 && effectiveCycleState.daysUntilNextPeriod > 0 && (
                    <span className="nudge-badge-pill" style={{ fontSize: '9px', padding: '1px 6px' }}>
                      🍫 In {effectiveCycleState.daysUntilNextPeriod}d
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '1px' }}>
                  {effectiveCycleState.phaseName} • {effectiveCycleState.phaseKey === 'menstrual' ? `Period Day ${effectiveCycleState.currentCycleDay}` : `Period in ${effectiveCycleState.daysUntilNextPeriod}d`}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10.5px', color: '#fca5c9', fontWeight: '700' }}>
              <span>View Flo</span>
              <span>→</span>
            </div>
          </div>
        </div>
      )}

      {/* 3. CENTER STAGE: Dynamic Multi-Month Calendar Grid & Daily Schedule */}
      <div className="calendar-card">
        <div className="calendar-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="month-label" style={{ fontSize: '15px', fontWeight: '800' }}>
              {monthNames[calMonth]} {calYear}
            </span>
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <button
                type="button"
                onClick={onPrevMonth}
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--android-border)', color: '#fff', borderRadius: '6px', width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '11px' }}
                title="Previous Month"
              >
                ◀
              </button>
              <button
                type="button"
                onClick={onNextMonth}
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--android-border)', color: '#fff', borderRadius: '6px', width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '11px' }}
                title="Next Month"
              >
                ▶
              </button>
              <button
                type="button"
                onClick={onTodayJump}
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--android-border)', color: 'var(--color-primary)', borderRadius: '6px', padding: '0 8px', height: '26px', fontSize: '10px', fontWeight: '700', cursor: 'pointer' }}
                title="Jump to Today"
              >
                Today
              </button>
            </div>
          </div>

          <button
            onClick={onOpenAddModal}
            style={{ background: 'rgba(248, 207, 101, 0.12)', border: '1px solid rgba(248, 207, 101, 0.35)', color: 'var(--color-primary)', borderRadius: '8px', padding: '5px 10px', fontSize: '11px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            {window.Icons && <Icons.Plus size={13} />}
            <span>Add Plan</span>
          </button>
        </div>

        <div className="cal-mini-weekdays">
          <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
        </div>

        <div className="cal-mini-grid">
          {Array.from({ length: new Date(calYear, calMonth, 1).getDay() }).map((_, idx) => (
            <div key={`empty-${idx}`} className="cal-mini-day empty" style={{ opacity: 0.15, pointerEvents: 'none' }} />
          ))}
          {Array.from({ length: new Date(calYear, calMonth + 1, 0).getDate() }, (_, i) => i + 1).map(d => {
            const dStr = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            const dayEvents = plans.filter(c => c.date === dStr);
            const isSelected = selectedDateStr === dStr;
            const isToday = dStr === todayDateStr;

            return (
              <div
                key={dStr}
                className={`cal-mini-day ${isSelected ? 'selected' : ''} ${isToday && !isSelected ? 'today' : ''} ${dayEvents.length > 0 ? 'has-plan' : ''}`}
                onClick={() => {
                  if (window.AudioEngine) AudioEngine.playTone(500);
                  if (selectedDateStr === dStr) {
                    onOpenAddModal();
                  } else {
                    onSelectDate(dStr);
                  }
                }}
                onDoubleClick={() => {
                  if (window.AudioEngine) AudioEngine.playTone(650);
                  onSelectDate(dStr);
                  onOpenAddModal();
                }}
                title={dayEvents.length > 0 ? `${monthNames[calMonth]} ${d}: ${dayEvents.map(e => e.title).join(', ')}` : `${monthNames[calMonth]} ${d}`}
              >
                <div className="cal-day-num">{d}</div>
                {dayEvents.length > 0 && (
                  <div className="cal-event-dots-row">
                    <span className="cal-event-dot" />
                    {dayEvents.length > 1 && <span className="cal-event-dot" />}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Day's Plans List & Quick Add */}
        <div className="daily-events-section" style={{ marginTop: '6px', borderTop: '1px solid var(--android-border)', paddingTop: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="section-label">
              Plans • {new Date(selectedDateStr + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
            <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>
              {dayPlans.length} {dayPlans.length === 1 ? 'event' : 'events'}
            </span>
          </div>

          {/* Instant Inline Plan Input */}
          <form onSubmit={onQuickAddPlan} className="quick-plan-bar">
            <input
              type="text"
              value={quickPlanTitle}
              onChange={(e) => onSetQuickPlanTitle(e.target.value)}
              placeholder={`Add a plan for ${new Date(selectedDateStr + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}...`}
              className="quick-plan-input"
            />
            <button type="submit" className="quick-plan-btn" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {window.Icons && <Icons.Plus size={12} />}
              <span>Add</span>
            </button>
          </form>

          {dayPlans.length === 0 ? (
            <div style={{ padding: '12px', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '12px' }}>
              No plans for {new Date(selectedDateStr + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}.
            </div>
          ) : (
            dayPlans.map(plan => {
              const isHiddenSurprise = plan.isWishSealed && !plan.isRevealed;
              return (
                <div
                  key={plan.id}
                  className="event-list-item"
                  onClick={() => plan.isWishSealed && onToggleRevealPlan(plan.id)}
                  style={{ cursor: plan.isWishSealed ? 'pointer' : 'default' }}
                >
                  <div className="event-emoji-box">{plan.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div className="event-title">
                      {isHiddenSurprise ? 'Surprise Plan (Tap to reveal)' : plan.title}
                    </div>
                    <div className="event-time-tag">
                      {plan.time} • {plan.type} • Added by {plan.createdBy === activeTraveler.name.toLowerCase() ? 'You' : partnerTraveler.name}
                    </div>
                  </div>
                  <button
                    onClick={(e) => onDeletePlan(plan.id, e)}
                    style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', padding: '6px 8px', borderRadius: '6px', display: 'flex', alignItems: 'center' }}
                    title="Delete plan"
                    aria-label="Delete plan"
                  >
                    {window.Icons && <Icons.Trash size={13} />}
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* 4. BOTTOM QUICK BENTO ROW: Daily Note & Shared Photo */}
      <div className="bento-row-equal">
        {/* Left Tile: Today's Note */}
        <div className="bento-card">
          <div className="bento-tile-header">
            <span className="bento-tile-title">
              {window.Icons && <Icons.Edit size={11} />}
              <span>Daily Note</span>
            </span>
            <button
              onClick={() => {
                if (isEditingWhisper) {
                  onSaveWhisper();
                } else {
                  onSetTempWhisper(whisperNote);
                  onSetIsEditingWhisper(true);
                }
              }}
              style={{ background: 'none', border: 'none', color: 'var(--color-accent)', fontSize: '10px', cursor: 'pointer', fontWeight: '700' }}
            >
              {isEditingWhisper ? 'Save' : 'Edit'}
            </button>
          </div>

          {isEditingWhisper ? (
            <input
              type="text"
              value={tempWhisper}
              onChange={(e) => onSetTempWhisper(e.target.value)}
              maxLength={70}
              autoFocus
              className="form-input-text"
              style={{ padding: '6px 8px', fontSize: '11px' }}
            />
          ) : (
            <div className="bento-note-body">"{whisperNote || 'Tap Edit to write a note'}"</div>
          )}
        </div>

        {/* Right Tile: Shared Photo & Video Locket */}
        {(() => {
          const hasPhoto = latestSnap && (latestSnap.imageUrl || (latestSnap.items && latestSnap.items.length > 0));
          const totalMoments = locketDrops?.length || (hasPhoto ? 1 : 0);
          return (
            <div className="bento-card" onClick={() => (onOpenLocketGallery ? onOpenLocketGallery() : (hasPhoto ? onOpenMediaViewer() : onOpenSnapModal()))} style={{ cursor: 'pointer' }}>
              <div className="bento-tile-header">
                <span className="bento-tile-title">
                  {window.Icons && <Icons.Camera size={11} />}
                  <span>
                    {hasPhoto
                      ? (latestSnap.sentBy !== activeTraveler.name.toLowerCase() ? `${partnerTraveler.name}'s Photo` : 'Your Photo')
                      : 'Photo Locket'}
                  </span>
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {totalMoments > 0 && (
                    <span style={{ fontSize: '9px', background: 'rgba(248,207,101,0.15)', color: 'var(--color-primary)', padding: '1px 5px', borderRadius: '6px', fontWeight: '700' }}>
                      {totalMoments} {totalMoments === 1 ? 'drop' : 'drops'}
                    </span>
                  )}
                </div>
              </div>

              <div className="bento-photo-thumb">
                <MediaCarouselViewer
                  snap={latestSnap}
                  activeTraveler={activeTraveler}
                  partnerTraveler={partnerTraveler}
                  isLockscreen={false}
                  onOpenModal={() => (onOpenLocketGallery ? onOpenLocketGallery() : (hasPhoto ? onOpenMediaViewer() : onOpenSnapModal()))}
                />
              </div>
            </div>
          );
        })()}
      </div>

      {/* 5. MOVIE DATE: Couple Movie & TV Series Swiper Bento Tile */}
      <div 
        className="bento-card"
        onClick={() => {
          if (window.HapticEngine) HapticEngine.trigger('light');
          if (window.AudioEngine) AudioEngine.playTone(650);
          if (onOpenFlickSwipe) onOpenFlickSwipe();
        }}
        style={{
          cursor: 'pointer',
          background: 'linear-gradient(135deg, rgba(248, 207, 101, 0.04) 0%, rgba(19, 23, 38, 0.95) 100%)',
          borderColor: mutualMatchCount > 0 ? 'rgba(248, 207, 101, 0.4)' : 'rgba(255, 255, 255, 0.08)',
          padding: '12px 14px',
          marginTop: '10px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ 
              width: '32px', 
              height: '32px', 
              borderRadius: '9px', 
              background: 'rgba(248, 207, 101, 0.08)',
              border: '1px solid rgba(248, 207, 101, 0.22)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-primary)',
              flexShrink: 0
            }}>
              {window.Icons && <Icons.MovieDateLogo size={18} />}
            </div>
            <div>
              <div style={{ fontSize: '12.5px', fontWeight: '800', color: '#fff', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>Movie Date</span>
                {mutualMatchCount > 0 && (
                  <span style={{ fontSize: '9.5px', background: 'rgba(248, 207, 101, 0.2)', color: 'var(--color-primary)', padding: '1px 6px', borderRadius: '6px', fontWeight: '800', border: '1px solid rgba(248, 207, 101, 0.4)', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                    {window.Icons && <Icons.Sparkles size={9} />}
                    <span>{mutualMatchCount} Matched!</span>
                  </span>
                )}
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Swipe movies & TV shows together to pick what to watch
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--color-primary)', fontWeight: '700' }}>
            <span>Swipe</span>
            {window.Icons && <Icons.ChevronRight size={14} />}
          </div>
        </div>
      </div>

      {/* 6. DISCOVERY & ROMANCE 2-COLUMN BENTO TILES */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '10px' }}>
        {/* Tile A: Bucket List */}
        <div
          className="bento-card"
          onClick={() => {
            if (window.HapticEngine) HapticEngine.trigger('light');
            if (window.AudioEngine) AudioEngine.playTone(620);
            if (onOpenBucketList) onOpenBucketList();
          }}
          style={{ cursor: 'pointer', padding: '12px 14px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ color: '#4cd7b6', display: 'flex', alignItems: 'center' }}>
              {window.Icons ? <Icons.Compass size={20} /> : '🗺️'}
            </span>
            <span style={{ fontSize: '9.5px', background: 'rgba(76, 215, 182, 0.2)', color: '#4cd7b6', padding: '1px 6px', borderRadius: '6px', fontWeight: '800' }}>
              {completedQuestCount}/{totalQuests}
            </span>
          </div>
          <div style={{ fontSize: '12.5px', fontWeight: '800', color: '#fff', marginTop: '6px' }}>
            Bucket List
          </div>
          <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Dream quests & adventures
          </div>
        </div>

        {/* Tile B: Our Story Timeline */}
        <div
          className="bento-card"
          onClick={() => {
            if (window.HapticEngine) HapticEngine.trigger('light');
            if (window.AudioEngine) AudioEngine.playTone(660);
            if (onOpenStoryTimeline) onOpenStoryTimeline();
          }}
          style={{ cursor: 'pointer', padding: '12px 14px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--color-accent)', display: 'flex', alignItems: 'center' }}>
              {window.Icons ? <Icons.BookOpen size={20} /> : '📜'}
            </span>
            <span style={{ fontSize: '9.5px', color: 'var(--color-accent)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '2px' }}>
              <span>Story</span>
              {window.Icons && <Icons.ChevronRight size={11} />}
            </span>
          </div>
          <div style={{ fontSize: '12.5px', fontWeight: '800', color: '#fff', marginTop: '6px' }}>
            Our Story
          </div>
          <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Milestones & memories
          </div>
        </div>
      </div>

      {/* 7. SOUNDSCAPE AMBIENT SANCTUARY PILL */}
      <div 
        className="bento-card"
        onClick={() => {
          if (window.HapticEngine) HapticEngine.trigger('light');
          if (window.AudioEngine) AudioEngine.playTone(520);
          if (onOpenSoundscapeMixer) onOpenSoundscapeMixer();
        }}
        style={{
          cursor: 'pointer',
          background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.06) 0%, rgba(16, 20, 36, 0.95) 100%)',
          borderColor: 'rgba(96, 165, 250, 0.25)',
          padding: '10px 14px',
          marginTop: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ color: '#60a5fa', display: 'flex', alignItems: 'center' }}>
            {window.Icons ? <Icons.Music size={18} /> : '🎵'}
          </span>
          <div>
            <div style={{ fontSize: '12px', fontWeight: '800', color: '#fff' }}>
              Sanctuary Soundscapes
            </div>
            <div style={{ fontSize: '9.5px', color: '#60a5fa' }}>
              Sakura Rain, Fireside Camp & Zen Wind Chimes
            </div>
          </div>
        </div>

        <span style={{ fontSize: '11px', color: '#60a5fa', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '2px' }}>
          <span>Mixer</span>
          {window.Icons && <Icons.ChevronRight size={12} />}
        </span>
      </div>
    </div>
  );

  return window.PullToRefresh ? (
    <PullToRefresh onRefresh={onManualSync} className="pull-refresh-container">
      {content}
    </PullToRefresh>
  ) : (
    content
  );
}

window.CalendarTab = CalendarTab;
