/**
 * ✦ KOMOREBI — Shared Locket Feed & Partner Media Gallery Modal
 * A dedicated sanctuary space to view and browse all photos and videos shared by both partners.
 */

function LocketGalleryModal({
  isOpen,
  onClose,
  locketDrops = [],
  activeTraveler,
  partnerTraveler,
  myAvatar,
  partnerAvatar,
  onSelectDrop,
  onOpenSendModal,
  onDeleteDrop
}) {
  const [filter, setFilter] = useState('all'); // 'all' | 'partner' | 'mine'

  if (!isOpen) return null;

  const activeName = (activeTraveler?.name || 'You').toLowerCase();
  const partnerName = (partnerTraveler?.name || 'Partner');

  const filteredDrops = locketDrops.filter(drop => {
    if (!drop) return false;
    const sentBy = (drop.sentBy || '').toLowerCase();
    if (filter === 'partner') {
      return sentBy !== activeName;
    }
    if (filter === 'mine') {
      return sentBy === activeName;
    }
    return true;
  });

  const partnerDropsCount = locketDrops.filter(d => (d?.sentBy || '').toLowerCase() !== activeName).length;
  const myDropsCount = locketDrops.filter(d => (d?.sentBy || '').toLowerCase() === activeName).length;

  return ReactDOM.createPortal(
    <div className="profile-modal-sheet" onClick={onClose} style={{ zIndex: 9999 }}>
      <div 
        className="profile-sheet-body" 
        onClick={(e) => e.stopPropagation()}
        style={{ height: '100%', maxHeight: '100%', display: 'flex', flexDirection: 'column', padding: '16px 18px 24px', background: '#0e121e' }}
      >
        {/* Header */}
        <div className="sheet-header-row" style={{ paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'rgba(248, 207, 101, 0.12)',
              border: '1px solid rgba(248, 207, 101, 0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--color-primary)'
            }}>
              {window.Icons && <Icons.Camera size={19} />}
            </div>
            <div>
              <span className="sheet-title" style={{ fontSize: '15px' }}>Shared Locket Gallery</span>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                {locketDrops.length} moments saved between {activeTraveler.name} & {partnerTraveler.name}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              onClick={() => {
                if (window.AudioEngine) AudioEngine.playTone(650);
                if (onOpenSendModal) onOpenSendModal();
              }}
              style={{
                background: 'linear-gradient(135deg, var(--color-primary) 0%, #e5b338 100%)',
                border: 'none',
                color: '#12151f',
                borderRadius: '8px',
                padding: '6px 10px',
                fontSize: '11px',
                fontWeight: '800',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                boxShadow: '0 2px 8px rgba(248, 207, 101, 0.3)'
              }}
              title="Send new photo or video"
              aria-label="Drop new photo or video"
            >
              {window.Icons && <Icons.Plus size={12} />}
              <span>Drop</span>
            </button>
            <button 
              onClick={onClose} 
              className="sheet-close-btn" 
              aria-label="Close locket gallery"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {window.Icons ? <Icons.X size={16} /> : '✕'}
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', padding: '12px 0 8px 0' }}>
          <button
            type="button"
            className={`nav-filter-pill ${filter === 'all' ? 'active' : ''}`}
            onClick={() => {
              if (window.AudioEngine) AudioEngine.playTone(550);
              setFilter('all');
            }}
            style={{
              padding: '5px 12px',
              borderRadius: '20px',
              border: filter === 'all' ? '1px solid var(--color-primary)' : '1px solid rgba(255,255,255,0.1)',
              background: filter === 'all' ? 'rgba(248, 207, 101, 0.15)' : 'rgba(255,255,255,0.04)',
              color: filter === 'all' ? 'var(--color-primary)' : 'var(--text-secondary)',
              fontSize: '11px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            All Moments ({locketDrops.length})
          </button>

          <button
            type="button"
            className={`nav-filter-pill ${filter === 'partner' ? 'active' : ''}`}
            onClick={() => {
              if (window.AudioEngine) AudioEngine.playTone(550);
              setFilter('partner');
            }}
            style={{
              padding: '5px 12px',
              borderRadius: '20px',
              border: filter === 'partner' ? '1px solid #fca5c9' : '1px solid rgba(255,255,255,0.1)',
              background: filter === 'partner' ? 'rgba(252, 165, 201, 0.18)' : 'rgba(255,255,255,0.04)',
              color: filter === 'partner' ? '#fca5c9' : 'var(--text-secondary)',
              fontSize: '11px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <span>{partnerName}'s Drops</span>
            <span style={{ fontSize: '9.5px', background: 'rgba(255,255,255,0.15)', padding: '1px 5px', borderRadius: '8px' }}>
              {partnerDropsCount}
            </span>
          </button>

          <button
            type="button"
            className={`nav-filter-pill ${filter === 'mine' ? 'active' : ''}`}
            onClick={() => {
              if (window.AudioEngine) AudioEngine.playTone(550);
              setFilter('mine');
            }}
            style={{
              padding: '5px 12px',
              borderRadius: '20px',
              border: filter === 'mine' ? '1px solid var(--color-accent)' : '1px solid rgba(255,255,255,0.1)',
              background: filter === 'mine' ? 'rgba(167, 139, 250, 0.18)' : 'rgba(255,255,255,0.04)',
              color: filter === 'mine' ? 'var(--color-accent)' : 'var(--text-secondary)',
              fontSize: '11px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <span>My Drops</span>
            <span style={{ fontSize: '9.5px', background: 'rgba(255,255,255,0.15)', padding: '1px 5px', borderRadius: '8px' }}>
              {myDropsCount}
            </span>
          </button>
        </div>

        {/* Media Grid & Feed */}
        <div style={{ flex: 1, overflowY: 'auto', paddingRight: '2px', marginTop: '4px' }}>
          {filteredDrops.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 16px' }}>
              <div style={{ color: 'var(--color-primary)', marginBottom: '10px', opacity: 0.8 }}>
                {window.Icons && <Icons.Camera size={38} />}
              </div>
              <div style={{ fontSize: '13px', fontWeight: '750', color: '#fff' }}>
                {filter === 'partner' ? `No photos from ${partnerName} yet` : filter === 'mine' ? 'You haven\'t dropped any media yet' : 'Your Locket is Empty'}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px', maxWidth: '260px', margin: '4px auto 16px' }}>
                {filter === 'partner' ? `Whenever ${partnerName} shares photos or videos, they will stay preserved right here.` : 'Drop a selfie, memory, or video clip to light up your partner\'s sanctuary.'}
              </div>
              <button
                type="button"
                onClick={() => {
                  if (onOpenSendModal) onOpenSendModal();
                }}
                style={{
                  background: 'rgba(248, 207, 101, 0.15)',
                  border: '1px solid var(--color-primary)',
                  color: 'var(--color-primary)',
                  borderRadius: '10px',
                  padding: '8px 16px',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                + Send First Photo
              </button>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '10px',
              paddingBottom: '16px'
            }}>
              {filteredDrops.map((drop, idx) => {
                const isMine = (drop.sentBy || '').toLowerCase() === activeName;
                const authorName = isMine ? 'You' : partnerName;
                const hasVideo = drop.mediaType === 'video' || (drop.items && drop.items.some(i => i.type === 'video'));
                const totalItems = (drop.items && drop.items.length) || 1;
                const thumbUrl = drop.imageUrl || (drop.items && drop.items[0]?.url) || '';

                return (
                  <div
                    key={drop.id || idx}
                    onClick={() => {
                      if (window.AudioEngine) AudioEngine.playTone(550);
                      if (onSelectDrop) onSelectDrop(drop);
                    }}
                    style={{
                      position: 'relative',
                      background: 'rgba(255, 255, 255, 0.04)',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      border: isMine ? '1px solid rgba(167, 139, 250, 0.25)' : '1px solid rgba(252, 165, 201, 0.28)',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
                      cursor: 'pointer',
                      transition: 'transform 0.15s ease',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    {/* Media Thumbnail Container */}
                    <div style={{ position: 'relative', width: '100%', height: '130px', background: 'linear-gradient(135deg, #131722 0%, #1e2436 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                      {hasVideo ? (
                        <video
                          src={thumbUrl}
                          playsInline
                          muted
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <img
                          src={thumbUrl}
                          alt=""
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            if (e.target.parentElement) {
                              const fallback = document.createElement('div');
                              fallback.style.cssText = 'color: var(--color-primary); opacity: 0.6; font-size: 24px; display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;';
                              fallback.innerText = '📷';
                              e.target.parentElement.appendChild(fallback);
                            }
                          }}
                        />
                      )}

                      {/* Video / Multi-item badge */}
                      {hasVideo && (
                        <div style={{
                          position: 'absolute', top: '6px', left: '6px',
                          background: 'rgba(0, 0, 0, 0.65)',
                          backdropFilter: 'blur(4px)',
                          color: '#fff', fontSize: '9px', fontWeight: '800',
                          padding: '2px 6px', borderRadius: '6px'
                        }}>
                          ▶ Video
                        </div>
                      )}
                      {!hasVideo && totalItems > 1 && (
                        <div style={{
                          position: 'absolute', top: '6px', left: '6px',
                          background: 'rgba(0, 0, 0, 0.65)',
                          backdropFilter: 'blur(4px)',
                          color: '#fff', fontSize: '9px', fontWeight: '800',
                          padding: '2px 6px', borderRadius: '6px'
                        }}>
                          📷 {totalItems} Photos
                        </div>
                      )}

                      {/* Sender Pill */}
                      <div style={{
                        position: 'absolute', bottom: '6px', left: '6px',
                        background: isMine ? 'rgba(167, 139, 250, 0.85)' : 'rgba(252, 165, 201, 0.85)',
                        color: '#12151f',
                        fontSize: '9px', fontWeight: '850',
                        padding: '2px 7px', borderRadius: '10px'
                      }}>
                        {authorName}
                      </div>

                      {/* Time */}
                      {drop.time && (
                        <div style={{
                          position: 'absolute', bottom: '6px', right: '6px',
                          background: 'rgba(0, 0, 0, 0.6)',
                          color: '#eee', fontSize: '8.5px', fontWeight: '600',
                          padding: '1px 5px', borderRadius: '4px'
                        }}>
                          {drop.time}
                        </div>
                      )}
                    </div>

                    {/* Caption & Controls */}
                    <div style={{ padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, justifyContent: 'space-between' }}>
                      <div style={{
                        fontSize: '11px',
                        color: '#fff',
                        fontWeight: '600',
                        lineHeight: '1.3',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        "{drop.caption || 'Shared a moment'}"
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                        <span style={{ fontSize: '10.5px', color: 'var(--color-primary)', fontWeight: '750', display: 'flex', alignItems: 'center', gap: '3px' }}>
                          <span>View Full</span>
                          {window.Icons && <Icons.ChevronRight size={11} />}
                        </span>
                        {onDeleteDrop && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (confirm('Remove this photo from Locket gallery?')) {
                                if (window.AudioEngine) AudioEngine.playTone(380);
                                onDeleteDrop(drop.id);
                              }
                            }}
                            style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', padding: '2px 4px', display: 'flex', alignItems: 'center' }}
                            title="Delete"
                            aria-label="Delete drop"
                          >
                            {window.Icons ? <Icons.Trash2 size={13} /> : '✕'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

window.LocketGalleryModal = LocketGalleryModal;
