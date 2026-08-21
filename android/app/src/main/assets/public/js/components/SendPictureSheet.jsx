/**
 * ✦ KOMOREBI — Send Photo & Video Bottom Sheet Component
 */

function SendPictureSheet({ isOpen, onClose, onSendPicture, activeTraveler }) {
  const [caption, setCaption] = useState('');
  const [customMediaUrl, setCustomMediaUrl] = useState('');
  const [mediaList, setMediaList] = useState([]); // [{ id, url, type: 'image'|'video', name }]
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [fileError, setFileError] = useState('');
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const hasVideo = mediaList.some(m => m.type === 'video');
  const imageCount = mediaList.filter(m => m.type === 'image').length;

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setFileError('');

    // Check if any video is selected
    const videoFile = files.find(f => f.type.startsWith('video/'));
    if (videoFile) {
      if (videoFile.size > 25 * 1024 * 1024) {
        setFileError('Video size must be under 25MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        // Limit: 1 video cap
        setMediaList([{
          id: 'vid-' + Date.now(),
          url: event.target.result,
          type: 'video',
          name: videoFile.name
        }]);
      };
      reader.readAsDataURL(videoFile);
      return;
    }

    // Process image files (up to max 5 total)
    const imageFiles = files.filter(f => f.type.startsWith('image/'));
    const remainingSlots = Math.max(0, 5 - imageCount);

    if (imageFiles.length > remainingSlots) {
      setFileError(`You can upload at most 5 photos total (added first ${remainingSlots})`);
    }

    const filesToRead = imageFiles.slice(0, remainingSlots);
    filesToRead.forEach((file, idx) => {
      const validation = window.SecurityGuard ? window.SecurityGuard.validateImageFile(file) : { valid: true };
      if (!validation.valid) {
        setFileError(validation.error);
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setMediaList(prev => {
          // If previous was a video, replace it with photos
          const filtered = prev.filter(m => m.type === 'image');
          if (filtered.length >= 5) return filtered;
          return [...filtered, {
            id: 'img-' + Date.now() + '-' + idx + '-' + Math.random().toString(36).substring(2, 5),
            url: event.target.result,
            type: 'image',
            name: file.name
          }];
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveItem = (id) => {
    if (window.AudioEngine) AudioEngine.playTone(380);
    setMediaList(prev => prev.filter(m => m.id !== id));
  };

  const handleAddUrl = (e) => {
    e.preventDefault();
    if (!customMediaUrl.trim()) return;
    const cleanUrl = window.SecurityGuard ? window.SecurityGuard.sanitizeUrl(customMediaUrl.trim()) : customMediaUrl.trim();
    if (!cleanUrl) return;

    const isVid = cleanUrl.match(/\.(mp4|webm|mov)(\?.*)?$/i);
    if (isVid) {
      setMediaList([{
        id: 'url-vid-' + Date.now(),
        url: cleanUrl,
        type: 'video',
        name: 'Web Video'
      }]);
    } else {
      if (mediaList.some(m => m.type === 'video')) {
        setMediaList([{
          id: 'url-img-' + Date.now(),
          url: cleanUrl,
          type: 'image',
          name: 'Web Image'
        }]);
      } else if (imageCount < 5) {
        setMediaList(prev => [...prev, {
          id: 'url-img-' + Date.now(),
          url: cleanUrl,
          type: 'image',
          name: 'Web Image'
        }]);
      } else {
        setFileError('Max 5 photos reached');
      }
    }
    setCustomMediaUrl('');
    setShowUrlInput(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mediaList.length) return;

    if (window.AudioEngine) AudioEngine.playTone(720);
    const sanitizedCaption = window.SecurityGuard ? window.SecurityGuard.sanitizeText(caption, 70) : caption;
    onSendPicture({
      id: 'snap-' + Date.now(),
      items: mediaList,
      imageUrl: mediaList[0].url,
      isVideo: mediaList[0].type === 'video',
      caption: sanitizedCaption || (mediaList[0].type === 'video' ? 'Shared a video' : mediaList.length > 1 ? `Shared ${mediaList.length} photos` : 'Shared a photo'),
      sentBy: activeTraveler.name.toLowerCase(),
      time: window.formatCurrentTime ? window.formatCurrentTime() : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    setCaption('');
    setMediaList([]);
    setCustomMediaUrl('');
    setShowUrlInput(false);
    setFileError('');
    onClose();
  };

  const canAddMore = !hasVideo && imageCount < 5;

  return (
    <div className="profile-modal-sheet" onClick={onClose}>
      <div className="profile-sheet-body" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-header-row">
          <div>
            <span className="sheet-title">Share Photos & Video</span>
            <div style={{ fontSize: '10.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Send up to 5 photos or 1 video to partner's lockscreen
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="sheet-close-btn" 
            aria-label="Close share media"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {window.Icons ? <Icons.X size={16} /> : '✕'}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="sheet-form-layout">
          {/* Multi-Media Thumbnail Strip & Dropzone */}
          {mediaList.length > 0 ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span className="form-field-label" style={{ margin: 0 }}>
                  Selected Media ({hasVideo ? '1/1 Video' : `${imageCount}/5 Photos`})
                </span>
                {canAddMore && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                    aria-label="Add more media"
                    style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: '11px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px' }}
                  >
                    {window.Icons && <Icons.Plus size={11} />}
                    <span>Add More</span>
                  </button>
                )}
              </div>

              <div className="media-upload-strip">
                {mediaList.map((item) => (
                  <div key={item.id} className="media-thumb-preview">
                    {item.type === 'video' ? (
                      <video src={item.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <img src={item.url} alt="Thumbnail" />
                    )}
                    {item.type === 'video' && (
                      <div className="media-video-badge" style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                        {window.Icons && <Icons.Video size={10} />}
                        <span>Video</span>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      className="media-remove-btn"
                      title="Remove"
                      aria-label="Remove media item"
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      {window.Icons ? <Icons.X size={12} /> : '✕'}
                    </button>
                  </div>
                ))}

                {canAddMore && (
                  <div 
                    className="media-add-tile" 
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                    title="Add another photo"
                  >
                    {window.Icons && <Icons.Plus size={16} />}
                    <span>Add</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              className="minimal-photo-dropzone"
            >
              <div className="minimal-empty-dropzone">
                <div style={{ marginBottom: '6px', color: 'var(--color-primary)' }}>
                  {window.Icons && <Icons.Camera size={30} />}
                </div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff' }}>Choose Media</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Select up to 5 photos or 1 video
                </div>
              </div>
            </div>
          )}

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*,video/*"
            multiple
            style={{ display: 'none' }}
          />

          {fileError && (
            <div style={{ fontSize: '11px', color: '#fb7185', fontWeight: '600' }}>
              {fileError}
            </div>
          )}

          {/* Caption Field */}
          <div>
            <label className="form-field-label">Caption</label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Add a sweet message or note..."
              maxLength={70}
              className="form-input-text"
            />
          </div>

          {/* Paste Web Media URL Option */}
          <div>
            <button
              type="button"
              onClick={() => setShowUrlInput(!showUrlInput)}
              style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '11px', cursor: 'pointer', padding: '2px 0' }}
            >
              {showUrlInput ? 'Hide URL input' : 'Paste media URL instead'}
            </button>

            {showUrlInput && (
              <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
                <input
                  type="url"
                  value={customMediaUrl}
                  onChange={(e) => setCustomMediaUrl(e.target.value)}
                  placeholder="https://... image or .mp4 video"
                  className="form-input-text"
                  style={{ flex: 1 }}
                />
                <button
                  type="button"
                  onClick={handleAddUrl}
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid var(--android-border)', borderRadius: '10px', padding: '6px 12px', color: '#fff', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}
                >
                  Add URL
                </button>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn-minimal-submit"
            disabled={mediaList.length === 0}
          >
            {hasVideo ? 'Send Video Drop (1)' : `Send Photo Drop (${mediaList.length || 0}/5)`}
          </button>
        </form>
      </div>
    </div>
  );
}

window.SendPictureSheet = SendPictureSheet;
