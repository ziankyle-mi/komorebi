/**
 * ✦ KOMOREBI — SANCTUARY SOUNDSCAPES & LO-FI AMBIENT MIXER
 * Multi-layer ambient audio synthesizer with live volume faders and listening sync.
 */

function SoundscapeMixerSheet({
  isOpen,
  onClose,
  activeTraveler,
  partnerTraveler
}) {
  if (!isOpen) return null;

  const [isPlaying, setIsPlaying] = useState(() => window.SoundscapeEngine?.isPlaying || false);
  const [rainVol, setRainVol] = useState(() => window.SoundscapeEngine?.volumes.rain ?? 0.5);
  const [wavesVol, setWavesVol] = useState(() => window.SoundscapeEngine?.volumes.waves ?? 0.0);
  const [chimesVol, setChimesVol] = useState(() => window.SoundscapeEngine?.volumes.chimes ?? 0.3);

  const handleTogglePlay = () => {
    if (!window.SoundscapeEngine) return;
    const playing = window.SoundscapeEngine.toggle();
    setIsPlaying(playing);
    if (window.HapticEngine) HapticEngine.trigger('medium');
  };

  const handleVolumeChange = (track, val) => {
    const num = parseFloat(val);
    if (track === 'rain') setRainVol(num);
    if (track === 'waves') setWavesVol(num);
    if (track === 'chimes') setChimesVol(num);
    if (window.SoundscapeEngine) {
      window.SoundscapeEngine.setVolume(track, num);
    }
  };

  return ReactDOM.createPortal(
    <div className="profile-modal-sheet" onClick={onClose} style={{ zIndex: 9999 }}>
      <div 
        className="profile-sheet-body" 
        onClick={(e) => e.stopPropagation()}
        style={{
          height: '100%',
          maxHeight: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '16px 18px 24px',
          background: '#0e121e'
        }}
      >
        {/* Header */}
        <div className="sheet-header-row" style={{ paddingBottom: '12px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.2), rgba(248, 207, 101, 0.2))',
              border: '1px solid rgba(96, 165, 250, 0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#60a5fa'
            }}>
              {window.Icons ? <Icons.Music size={18} /> : '🎵'}
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: '850', color: '#fff', letterSpacing: '-0.02em' }}>
                Sanctuary Soundscapes
              </div>
              <div style={{ fontSize: '11px', color: '#60a5fa' }}>
                {isPlaying ? '● Playing ambient audio live' : 'Procedural relaxing background mixer'}
              </div>
            </div>
          </div>

          <button 
            onClick={onClose}
            aria-label="Close soundscape mixer"
            style={{
              background: 'rgba(255,255,255,0.06)', border: 'none',
              width: '30px', height: '30px', borderRadius: '50%',
              color: 'var(--text-secondary)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
          >
            {window.Icons ? <Icons.X size={16} /> : '✕'}
          </button>
        </div>

        {/* Master Play Button */}
        <div style={{ padding: '16px 20px 8px' }}>
          <button
            onClick={handleTogglePlay}
            aria-label={isPlaying ? 'Pause soundscapes' : 'Play ambient sanctuary'}
            style={{
              width: '100%', padding: '12px', borderRadius: '14px', border: 'none',
              background: isPlaying ? 'linear-gradient(135deg, #fb7185, #f8cf65)' : 'linear-gradient(135deg, #60a5fa, #38bdf8)',
              color: '#090b10', fontSize: '13.5px', fontWeight: '850', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              boxShadow: isPlaying ? '0 4px 18px rgba(251, 113, 133, 0.35)' : '0 4px 18px rgba(96, 165, 250, 0.35)'
            }}
          >
            {isPlaying ? (
              <>
                {window.Icons && <Icons.Pause size={16} fill="currentColor" />}
                <span>Pause Soundscapes</span>
              </>
            ) : (
              <>
                {window.Icons && <Icons.Play size={16} fill="currentColor" />}
                <span>Play Ambient Sanctuary</span>
              </>
            )}
          </button>
        </div>

        {/* Volume Faders */}
        <div style={{ padding: '12px 20px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* 1. Sakura Rain */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '130px' }}>
              <span style={{ color: '#60a5fa', display: 'flex', alignItems: 'center' }}>
                {window.Icons ? <Icons.CloudRain size={18} /> : '🌧️'}
              </span>
              <div>
                <div style={{ fontSize: '12px', fontWeight: '750', color: '#fff' }}>Sakura Rain</div>
                <div style={{ fontSize: '9.5px', color: 'var(--text-secondary)' }}>Soft precipitation</div>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={rainVol}
              onChange={(e) => handleVolumeChange('rain', e.target.value)}
              aria-label="Sakura Rain volume"
              style={{ flex: 1, accentColor: '#60a5fa', cursor: 'pointer' }}
            />
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)', width: '32px', textAlign: 'right' }}>
              {Math.round(rainVol * 100)}%
            </span>
          </div>

          {/* 2. Starlit Ocean Waves */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '130px' }}>
              <span style={{ color: '#38bdf8', display: 'flex', alignItems: 'center' }}>
                {window.Icons ? <Icons.Waves size={18} /> : '🌊'}
              </span>
              <div>
                <div style={{ fontSize: '12px', fontWeight: '750', color: '#fff' }}>Ocean Tides</div>
                <div style={{ fontSize: '9.5px', color: 'var(--text-secondary)' }}>Rhythmic waves</div>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={wavesVol}
              onChange={(e) => handleVolumeChange('waves', e.target.value)}
              aria-label="Ocean Tides volume"
              style={{ flex: 1, accentColor: '#38bdf8', cursor: 'pointer' }}
            />
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)', width: '32px', textAlign: 'right' }}>
              {Math.round(wavesVol * 100)}%
            </span>
          </div>

          {/* 3. Zen Wind Chimes */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '130px' }}>
              <span style={{ color: '#f8cf65', display: 'flex', alignItems: 'center' }}>
                {window.Icons ? <Icons.Wind size={18} /> : '🎐'}
              </span>
              <div>
                <div style={{ fontSize: '12px', fontWeight: '750', color: '#fff' }}>Zen Chimes</div>
                <div style={{ fontSize: '9.5px', color: 'var(--text-secondary)' }}>Harmonic bells</div>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={chimesVol}
              onChange={(e) => handleVolumeChange('chimes', e.target.value)}
              aria-label="Zen Chimes volume"
              style={{ flex: 1, accentColor: '#f8cf65', cursor: 'pointer' }}
            />
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)', width: '32px', textAlign: 'right' }}>
              {Math.round(chimesVol * 100)}%
            </span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

window.SoundscapeMixerSheet = SoundscapeMixerSheet;
