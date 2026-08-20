/**
 * ✦ KOMOREBI — Add Couple Plan Bottom Sheet Component
 */

function AddPlanSheet({ isOpen, onClose, onAdd, activeTraveler, initialDate }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(initialDate || '2026-08-18');
  const [time, setTime] = useState('20:00');
  const [type, setType] = useState('Gaming');
  const [isWishSealed, setIsWishSealed] = useState(false);

  useEffect(() => {
    if (initialDate) setDate(initialDate);
  }, [initialDate, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (window.AudioEngine) AudioEngine.playTone(600);
    onAdd({
      id: 'plan-' + Date.now(),
      title: title.trim(),
      date,
      time: (window.format12HourTime ? window.format12HourTime(time) : time) || '8:00 PM',
      type,
      assignedTo: 'both',
      createdBy: activeTraveler.name.toLowerCase(),
      isWishSealed
    });
    setTitle('');
    onClose();
  };

  return (
    <div className="profile-modal-sheet" onClick={onClose}>
      <div className="profile-sheet-body" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-header-row">
          <div>
            <span className="sheet-title">Schedule Plan</span>
            <span style={{ fontSize: '11px', color: 'var(--color-accent)', marginLeft: '8px' }}>({date})</span>
          </div>
          <button onClick={onClose} className="sheet-close-btn" aria-label="Close">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="sheet-form-layout">
          <div>
            <label className="form-field-label">Plan Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Movie night, Video call, Dinner..."
              required
              autoFocus
              maxLength={40}
              className="form-input-text"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '8px' }}>
            <div>
              <label className="form-field-label">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="form-input-text"
              />
            </div>
            <div>
              <label className="form-field-label">Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="form-input-text"
              />
            </div>
          </div>

          <div>
            <label className="form-field-label">Activity Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="form-input-text"
            >
              <option value="Gaming">Gaming</option>
              <option value="Movie / Series">Movie / Series</option>
              <option value="Call / Voice">Call / Voice</option>
              <option value="Coffee / Food">Coffee / Food</option>
              <option value="Date / Special">Date / Special</option>
              <option value="Study / Work">Study / Work</option>
            </select>
          </div>

          <div className="secret-wish-box">
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={isWishSealed}
                onChange={(e) => setIsWishSealed(e.target.checked)}
                style={{ accentColor: 'var(--color-accent)' }}
              />
              <span><strong>Surprise Plan</strong> (Hidden until unlocked)</span>
            </label>
          </div>

          <button type="submit" className="btn-minimal-submit">
            Save Plan
          </button>
        </form>
      </div>
    </div>
  );
}

window.AddPlanSheet = AddPlanSheet;
