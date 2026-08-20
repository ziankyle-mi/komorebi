/**
 * ✦ KOMOREBI — Prediction Accuracy Feedback & Self-Calibration Card
 * Lets Mikkie provide one-tap feedback on predicted period dates, automatically calibrating cycle length averages.
 */

function CycleAccuracyCard({ settings, onSaveSettings }) {
  const [submittedFeedback, setSubmittedFeedback] = useState(null);
  const [feedbackToast, setFeedbackToast] = useState('');

  const handleFeedback = (type) => {
    if (!window.CycleEngine) return;
    if (window.HapticEngine) HapticEngine.trigger('success');
    if (window.AudioEngine) AudioEngine.playNotificationChime();

    const result = window.CycleEngine.calibrateAccuracyFeedback(type, settings);
    onSaveSettings(result.updatedSettings);
    setSubmittedFeedback(type);
    setFeedbackToast(result.feedbackLabel);

    setTimeout(() => {
      setFeedbackToast('');
    }, 4500);
  };

  const options = [
    { id: 'exact', label: '🎯 Exact on day', desc: 'Accurate' },
    { id: 'early_1', label: '⏳ 1 day early', desc: '-1 day' },
    { id: 'early_2', label: '⏩ 2+ days early', desc: '-2 days' },
    { id: 'late_1', label: '⏰ 1 day late', desc: '+1 day' },
    { id: 'late_2', label: '⏭️ 2+ days late', desc: '+2 days' }
  ];

  return (
    <div className="flo-accuracy-card">
      <div className="accuracy-header">
        <div>
          <div className="accuracy-title">
            <span style={{ color: '#f8cf65', display: 'flex', alignItems: 'center' }}>
              {window.Icons && <Icons.Target size={13} />}
            </span>
            <span>Cycle Prediction Accuracy</span>
          </div>
          <div className="accuracy-subtitle">
            Calibrate smart prediction algorithms based on your actual cycle timing
          </div>
        </div>
        <span className="accuracy-cycle-len-pill">
          {settings.cycleLength || 28}d Cycle Avg
        </span>
      </div>

      {feedbackToast ? (
        <div className="accuracy-success-banner">
          <span>✨</span>
          <span>{feedbackToast}</span>
        </div>
      ) : (
        <>
          <div className="accuracy-prompt-text">
            Was your last predicted cycle start date accurate?
          </div>
          <div className="accuracy-chips-grid">
            {options.map(opt => {
              const isSelected = submittedFeedback === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  className={`accuracy-feedback-btn ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleFeedback(opt.id)}
                >
                  <span className="feedback-btn-label">{opt.label}</span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

window.CycleAccuracyCard = CycleAccuracyCard;
