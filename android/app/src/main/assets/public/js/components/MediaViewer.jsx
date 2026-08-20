/**
 * ✦ KOMOREBI — Media Carousel & Fullscreen Media Viewer Components
 */

// Multi-Media Swipeable Carousel Component (Up to 5 Photos or 1 Video)
function MediaCarouselViewer({ snap, activeTraveler, partnerTraveler, isLockscreen = false, onOpenModal }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [imgError, setImgError] = useState(false);

  const hasValidMedia = snap && !imgError && (
    (snap.imageUrl && typeof snap.imageUrl === 'string' && snap.imageUrl.trim().length > 0) ||
    (snap.items && Array.isArray(snap.items) && snap.items.length > 0 && snap.items.some(it => it.url && it.url.trim().length > 0))
  );

  if (!hasValidMedia) {
    const partnerName = partnerTraveler?.name || 'Partner';
    return (
      <div className={isLockscreen ? "glance-photo-empty" : "bento-photo-empty"} onClick={onOpenModal}>
        <div className="bento-camera-icon-wrap">
          {window.Icons && <Icons.Camera size={isLockscreen ? 20 : 15} />}
        </div>
        <span className="bento-empty-text">Send photo to {partnerName}</span>
      </div>
    );
  }

  const items = (snap.items && snap.items.length > 0)
    ? snap.items.filter(it => it.url && it.url.trim().length > 0)
    : [{ url: snap.imageUrl, type: snap.isVideo ? 'video' : 'image' }];

  const total = items.length;
  const currentItem = items[activeIdx] || items[0] || { url: '', type: 'image' };
  const isMe = snap.sentBy === activeTraveler.name.toLowerCase();

  const handlePrev = (e) => {
    e?.stopPropagation?.();
    if (window.AudioEngine) AudioEngine.playTone(520);
    setActiveIdx((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e?.stopPropagation?.();
    if (window.AudioEngine) AudioEngine.playTone(520);
    setActiveIdx((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (diff > 35) {
      handlePrev();
    } else if (diff < -35) {
      handleNext();
    }
    setTouchStartX(null);
  };

  return (
    <div 
      style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', borderRadius: '8px' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={onOpenModal}
    >
      {/* Active Media Item */}
      {currentItem.type === 'video' ? (
        <video 
          src={currentItem.url} 
          autoPlay 
          loop 
          muted 
          playsInline 
          controls={false}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
      ) : (
        <img 
          src={currentItem.url} 
          alt="" 
          onError={() => setImgError(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
        />
      )}

      {/* Media Type / Pagination Badge ONLY when video or multiple photos */}
      {(currentItem.type === 'video' || total > 1) && (
        <div className="carousel-dots-pill">
          {currentItem.type === 'video' ? (
            <span>📹 Video</span>
          ) : (
            <span>{activeIdx + 1}/{total}</span>
          )}
        </div>
      )}

      {/* Previous / Next Arrow Controls (When Multiple Media) */}
      {total > 1 && (
        <>
          <button 
            type="button" 
            className="carousel-nav-btn prev" 
            onClick={handlePrev}
            aria-label="Previous Media"
          >
            ‹
          </button>
          <button 
            type="button" 
            className="carousel-nav-btn next" 
            onClick={handleNext}
            aria-label="Next Media"
          >
            ›
          </button>

          {/* Bottom Dot Indicators */}
          <div className="carousel-dots-bottom">
            {items.map((_, i) => (
              <div 
                key={i} 
                className={`carousel-dot ${i === activeIdx ? 'active' : ''}`} 
              />
            ))}
          </div>
        </>
      )}

      {/* Caption Overlay */}
      {snap.caption && (
        <div className={isLockscreen ? "glance-photo-caption" : "bento-photo-caption-overlay"}>
          <span>{isMe ? 'You' : partnerTraveler.name}: "{snap.caption}"</span>
        </div>
      )}
    </div>
  );
}

// Fullscreen Media Viewer Component (Opens when tapping shared photo/video)
function FullscreenMediaViewer({ snap, activeTraveler, partnerTraveler, onClose, onSendNew }) {
  const [viewerIdx, setViewerIdx] = useState(0);
  const [touchX, setTouchX] = useState(null);

  if (!snap) return null;

  const items = (snap.items && snap.items.length > 0)
    ? snap.items
    : (snap.imageUrl ? [{ url: snap.imageUrl, type: snap.isVideo ? 'video' : 'image' }] : []);
  const total = items.length;
  const current = items[viewerIdx] || items[0] || { url: '', type: 'image' };
  const isMe = snap.sentBy === activeTraveler.name.toLowerCase();
  const senderName = isMe ? 'You' : partnerTraveler.name;

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0, 0, 0, 0.96)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        animation: 'fadeIn 0.2s ease'
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Top Bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '14px 16px',
        background: 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, transparent 100%)',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '14px', fontWeight: '700', color: '#fff' }}>
            {senderName}'s Drop
          </span>
          <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{snap.time}</span>
          {total > 1 && (
            <span style={{ fontSize: '10px', background: 'rgba(248,207,101,0.2)', color: 'var(--color-primary)', padding: '2px 8px', borderRadius: '10px', fontWeight: '700' }}>
              {viewerIdx + 1} / {total}
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', width: '32px', height: '32px', borderRadius: '50%', fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          aria-label="Close Viewer"
        >
          ✕
        </button>
      </div>

      {/* Main Media Area */}
      <div
        style={{
          width: '100%', maxWidth: '480px', maxHeight: '70vh',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative'
        }}
        onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX === null) return;
          const diff = e.changedTouches[0].clientX - touchX;
          if (diff > 40 && viewerIdx > 0) { setViewerIdx(viewerIdx - 1); AudioEngine.playTone(520); }
          else if (diff < -40 && viewerIdx < total - 1) { setViewerIdx(viewerIdx + 1); AudioEngine.playTone(520); }
          setTouchX(null);
        }}
      >
        {current.type === 'video' ? (
          <video
            src={current.url}
            autoPlay loop playsInline controls
            style={{ width: '100%', maxHeight: '70vh', objectFit: 'contain', borderRadius: '12px' }}
          />
        ) : (
          <img
            src={current.url}
            alt="Shared Media"
            style={{ width: '100%', maxHeight: '70vh', objectFit: 'contain', borderRadius: '12px' }}
          />
        )}

        {/* Left / Right Nav Arrows */}
        {total > 1 && viewerIdx > 0 && (
          <button
            onClick={(e) => { e.stopPropagation(); setViewerIdx(viewerIdx - 1); AudioEngine.playTone(520); }}
            style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff', width: '36px', height: '36px', borderRadius: '50%', fontSize: '18px', cursor: 'pointer' }}
          >‹</button>
        )}
        {total > 1 && viewerIdx < total - 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); setViewerIdx(viewerIdx + 1); AudioEngine.playTone(520); }}
            style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff', width: '36px', height: '36px', borderRadius: '50%', fontSize: '18px', cursor: 'pointer' }}
          >›</button>
        )}
      </div>

      {/* Caption */}
      <div style={{ marginTop: '14px', textAlign: 'center', color: '#fff', fontSize: '13px', fontWeight: '600', maxWidth: '320px' }}>
        "{snap.caption || 'Shared a moment'}"
      </div>

      {/* Dot Indicators */}
      {total > 1 && (
        <div style={{ display: 'flex', gap: '6px', marginTop: '12px' }}>
          {items.map((_, i) => (
            <div
              key={i}
              onClick={(e) => { e.stopPropagation(); setViewerIdx(i); }}
              style={{
                width: i === viewerIdx ? '18px' : '7px', height: '7px',
                borderRadius: '4px', cursor: 'pointer',
                background: i === viewerIdx ? 'var(--color-primary)' : 'rgba(255,255,255,0.3)',
                transition: 'all 0.2s ease'
              }}
            />
          ))}
        </div>
      )}

      {/* Bottom: Send New Photo Button */}
      <button
        onClick={onSendNew}
        style={{
          marginTop: '18px', background: 'linear-gradient(135deg, #f8cf65, #e0b042)',
          border: 'none', borderRadius: '20px', padding: '8px 20px',
          color: '#090b10', fontSize: '12px', fontWeight: '700', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '6px'
        }}
      >
        📸 Send New Photo
      </button>
    </div>
  );
}

window.MediaCarouselViewer = MediaCarouselViewer;
window.FullscreenMediaViewer = FullscreenMediaViewer;
