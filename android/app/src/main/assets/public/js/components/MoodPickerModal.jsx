/**
 * ✦ KOMOREBI — Vector Mood Picker Modal Component
 */

function MoodPickerModal({ isOpen, onClose, currentMood, onSelectMood, partnerName }) {
  if (!isOpen) return null;

  const roster = window.MOOD_ROSTER || [];

  return (
    <div className="android-modal-backdrop" onClick={onClose}>
      <div className="android-sheet-surface" onClick={e => e.stopPropagation()}>
        <div className="sheet-handle-bar" />
        
        <div className="sheet-header">
          <div>
            <h3 className="sheet-title">Set Your Sanctuary Mood</h3>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Shared live with {partnerName} & synced to lockscreen
            </div>
          </div>
          <button onClick={onClose} className="sheet-close-btn">✕</button>
        </div>

        <div className="mood-options-grid">
          {roster.map(m => {
            const isSelected = currentMood === m.id;
            const IconComp = (window.Icons && window.Icons[m.icon]) || (window.Icons && window.Icons.Heart);
            return (
              <div
                key={m.id}
                onClick={() => {
                  if (window.AudioEngine) AudioEngine.playTone(500);
                  onSelectMood(m.id);
                  onClose();
                }}
                className={`mood-option-item ${isSelected ? 'selected' : ''}`}
              >
                <div 
                  className="mood-icon-bubble" 
                  style={{ 
                    background: isSelected ? `${m.color}25` : 'rgba(255, 255, 255, 0.05)',
                    color: m.color,
                    border: `1px solid ${isSelected ? m.color : 'rgba(255, 255, 255, 0.08)'}`,
                    boxShadow: isSelected ? `0 0 14px ${m.color}33` : 'none'
                  }}
                >
                  {IconComp && <IconComp size={18} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '12.5px', fontWeight: '700', color: isSelected ? 'var(--color-primary)' : '#fff' }}>
                    {m.name}
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: '1px' }}>
                    {m.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

window.MoodPickerModal = MoodPickerModal;
