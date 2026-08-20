/**
 * ✦ KOMOREBI — Authentic Flo Daily Category Logger Sheet
 * Direct implementation of Flo's "What are you feeling today?" & categorized symptom logger
 * Rendered with clean professional SVG vector icons (Zero stock emojis).
 */

function CycleLogSheet({
  isOpen,
  onClose,
  selectedDateStr,
  currentLog,
  cycleDayNumber = 1,
  onSaveLog,
  onDeleteLog,
  onPrevDate,
  onNextDate
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [flow, setFlow] = useState('none');
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (currentLog) {
      setFlow(currentLog.flow || 'none');
      const items = new Set();
      if (Array.isArray(currentLog.floItems)) {
        currentLog.floItems.forEach(id => items.add(id));
      }
      if (Array.isArray(currentLog.moods)) {
        currentLog.moods.forEach(id => items.add(id));
      }
      if (Array.isArray(currentLog.symptoms)) {
        currentLog.symptoms.forEach(id => items.add(id));
      }
      if (currentLog.intimateCategory) {
        items.add(currentLog.intimateCategory);
      }
      setSelectedItems(items);
      setNotes(currentLog.notes || '');
    } else {
      setFlow('none');
      setSelectedItems(new Set());
      setNotes('');
    }
  }, [currentLog, selectedDateStr, isOpen]);

  if (!isOpen) return null;

  const toggleItem = (id) => {
    if (window.AudioEngine) AudioEngine.playTone(560);
    setSelectedItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSave = (e) => {
    if (e) e.preventDefault();
    if (window.AudioEngine) AudioEngine.playTone(680);

    const itemsArray = Array.from(selectedItems);
    const logEntry = {
      date: selectedDateStr,
      flow,
      floItems: itemsArray,
      notes: window.SecurityGuard ? window.SecurityGuard.sanitizeText(notes, 300) : notes,
      updatedAt: Date.now()
    };

    onSaveLog(selectedDateStr, logEntry);
    onClose();
  };

  const handleDelete = () => {
    if (confirm('Clear all logged feelings and period data for this day?')) {
      if (window.AudioEngine) AudioEngine.playTone(380);
      onDeleteLog(selectedDateStr);
      onClose();
    }
  };

  const isToday = window.CycleEngine && selectedDateStr === window.CycleEngine.formatDate(new Date());
  const dateObj = new Date(selectedDateStr + 'T00:00:00');
  const formattedDayTitle = isToday
    ? 'Today'
    : dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  const categories = window.FLO_CATEGORIES || {};
  const feelingBubbles = window.FLO_FEELING_BUBBLES || [];
  const flowOptions = window.FLOW_OPTIONS || [];
  
  const filteredCategories = Object.entries(categories).map(([id, cat]) => ({
    id,
    ...cat,
    items: searchQuery 
      ? cat.items.filter(i => i.label.toLowerCase().includes(searchQuery.toLowerCase()))
      : cat.items
  })).filter(cat => cat.items.length > 0);

  const modalJSX = (
    <div className="profile-modal-sheet flo-modal-backdrop" onClick={onClose} style={{ zIndex: 120 }}>
      <div className="profile-sheet-body flo-log-sheet-surface" onClick={(e) => e.stopPropagation()}>
        {/* Flo Handle Bar */}
        <div className="sheet-handle-bar" style={{ background: 'rgba(255, 255, 255, 0.22)' }} />

        {/* 1. Header Navigation: < Today > with Cycle Day & Exit X */}
        <div className="flo-sheet-top-nav">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button
              type="button"
              className="flo-nav-arrow-btn"
              onClick={() => onPrevDate && onPrevDate()}
              title="Previous Day"
            >
              ‹
            </button>
            <button
              type="button"
              className="flo-nav-arrow-btn"
              onClick={() => onNextDate && onNextDate()}
              title="Next Day"
            >
              ›
            </button>
          </div>

          <div className="flo-sheet-date-header">
            <div className="flo-date-title">{formattedDayTitle}</div>
            <div className="flo-cycle-day-subtitle">Cycle day {cycleDayNumber}</div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="sheet-close-btn"
            aria-label="Close"
            style={{ margin: 0 }}
          >
            ✕
          </button>
        </div>

        {/* 2. Flo Search Input Bar */}
        <div className="flo-search-bar-wrap">
          <span className="flo-search-icon" style={{ color: '#94a3b8', display: 'flex', alignItems: 'center' }}>
            {window.Icons && <Icons.Search size={14} />}
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search symptoms, moods, discharge..."
            className="flo-search-input"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '12px' }}
            >
              ✕
            </button>
          )}
        </div>

        {/* 3. Scrollable List of Flo Symptom Categories */}
        <div className="flo-scroll-content">
          {/* Section A: Bleeding Flow Selector */}
          <div className="flo-category-section">
            <div className="flo-section-title">
              <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                {window.FloVectorIcons && <FloVectorIcons.FlowHeavy size={16} color="#fb7185" />}
              </span>
              <span>Period Bleeding Flow</span>
            </div>
            <div className="flo-flow-pills-row">
              {flowOptions.map(opt => {
                const isSelected = flow === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      if (window.HapticEngine) HapticEngine.trigger('selection');
                      if (window.AudioEngine) AudioEngine.playTone(opt.id === 'none' ? 400 : 550);
                      setFlow(opt.id);
                    }}
                    className={`flo-flow-pill ${isSelected ? 'active' : ''}`}
                    style={isSelected ? { borderColor: '#fb7185', background: 'rgba(251, 113, 133, 0.2)', color: '#fb7185' } : {}}
                  >
                    <span 
                      className="flo-flow-dot" 
                      style={{ background: opt.color || (opt.id === 'none' ? 'rgba(255,255,255,0.2)' : '#fb7185') }} 
                    />
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section B: What Are You Feeling Today? */}
          <div className="flo-category-section">
            <div className="flo-section-title">
              <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                {window.FloVectorIcons && <FloVectorIcons.MoodHappy size={16} color="#f8cf65" />}
              </span>
              <span>What are you feeling today?</span>
            </div>
            <div className="flo-chips-grid">
              {feelingBubbles.map(bubble => {
                const isSelected = selectedItems.has(bubble.id);
                return (
                  <button
                    key={bubble.id}
                    type="button"
                    onClick={() => toggleItem(bubble.id)}
                    className={`flo-chip-btn ${isSelected ? 'active' : ''}`}
                    style={isSelected ? { borderColor: bubble.color || 'var(--color-primary)', background: 'rgba(248, 207, 101, 0.18)', color: '#fff' } : {}}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                      {window.FloVectorIcon ? (
                        <FloVectorIcon id={bubble.id} size={16} color={isSelected ? (bubble.color || 'var(--color-primary)') : 'currentColor'} />
                      ) : (
                        <span>{bubble.icon || '✨'}</span>
                      )}
                    </span>
                    <span>{bubble.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section C: Categorized Flo Symptom Sections */}
          {filteredCategories.map(cat => (
            <div key={cat.id} className="flo-category-section">
              <div className="flo-section-title">
                <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                  {window.FloVectorIcon ? (
                    <FloVectorIcon id={cat.items[0]?.id || 'cramps'} size={16} color={cat.color || 'var(--color-primary)'} />
                  ) : (
                    <span>{cat.icon || '🌿'}</span>
                  )}
                </span>
                <span>{cat.title}</span>
              </div>
              <div className="flo-chips-grid">
                {cat.items.map(item => {
                  const isSelected = selectedItems.has(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleItem(item.id)}
                      className={`flo-chip-btn ${isSelected ? 'active' : ''}`}
                      style={isSelected ? { borderColor: cat.color || 'var(--color-primary)', background: 'rgba(255, 255, 255, 0.14)', color: '#fff' } : {}}
                    >
                      <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                        {window.FloVectorIcon ? (
                          <FloVectorIcon id={item.id} size={15} color={isSelected ? (cat.color || 'var(--color-primary)') : 'currentColor'} />
                        ) : (
                          <span>{item.icon || '•'}</span>
                        )}
                      </span>
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Section D: Notes Field */}
          <div className="flo-category-section">
            <div className="flo-section-title">
              <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                {window.Icons && <Icons.Notes size={16} />}
              </span>
              <span>Notes & Thoughts for Partner</span>
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="How's your energy? Anything your partner can do to help today..."
              className="flo-notes-textarea"
              rows={3}
            />
          </div>
        </div>

        {/* 4. Bottom Action Save & Clear Buttons */}
        <div className="flo-sheet-footer-actions">
          <button
            type="button"
            onClick={handleSave}
            className="flo-save-btn"
          >
            Save for {formattedDayTitle}
          </button>
          {currentLog && (
            <button
              type="button"
              onClick={handleDelete}
              className="flo-clear-btn"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const portalTarget = document.querySelector('.android-screen') || document.body;
  return typeof ReactDOM !== 'undefined' && ReactDOM.createPortal ? ReactDOM.createPortal(modalJSX, portalTarget) : modalJSX;
}

window.CycleLogSheet = CycleLogSheet;
