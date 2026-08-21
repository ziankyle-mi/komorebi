/**
 * ✦ KOMOREBI — OUR STORY CHRONICLE & RELATIONSHIP MILESTONES
 * A vertical visual constellation timeline celebrating your journey from day one to eternity.
 */

const DEFAULT_STORY_MILESTONES = [
  {
    id: 'm-1',
    title: 'The First Spark 💫',
    date: '2024-02-14',
    story: 'The exact moment our paths crossed and an unforgettable conversation began.',
    icon: '✨',
    photo: './assets/photos/sunset_sanctuary.jpg'
  },
  {
    id: 'm-2',
    title: 'Our First Official Date ☕',
    date: '2024-03-01',
    story: 'Coffee that turned into hours of walking and laughing until late at night.',
    icon: '☕',
    photo: ''
  },
  {
    id: 'm-3',
    title: 'Made It Official 💍',
    date: '2024-05-20',
    story: 'Promised to cherish and love each other through all seasons.',
    icon: '💖',
    photo: './assets/photos/stargazing_moment.jpg'
  },
  {
    id: 'm-4',
    title: 'First Stargazing Trip 🌌',
    date: '2024-08-15',
    story: 'Escaped the city to watch shooting stars and meteors under cozy blankets.',
    icon: '🌠',
    photo: ''
  },
  {
    id: 'm-5',
    title: 'Built Komorebi Sanctuary 🌸',
    date: '2026-08-20',
    story: 'Our private digital home for whispered notes, shared moments, and endless love.',
    icon: '🏡',
    photo: './assets/photos/sunset_sanctuary.jpg'
  }
];

function StoryTimelineSheet({
  isOpen,
  onClose,
  activeTraveler,
  partnerTraveler,
  storyMilestones = [],
  onSaveStoryMilestones
}) {
  if (!isOpen) return null;

  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [story, setStory] = useState('');
  const [icon, setIcon] = useState('💖');
  const [photo, setPhoto] = useState('');

  const milestones = storyMilestones.length > 0 ? storyMilestones : DEFAULT_STORY_MILESTONES;

  // Calculate Days Together (Based on earliest milestone)
  const earliestDate = milestones.reduce((min, m) => {
    const t = new Date(m.date).getTime();
    return t < min ? t : min;
  }, Date.now());

  const daysTogether = Math.max(1, Math.floor((Date.now() - earliestDate) / (1000 * 60 * 60 * 24)));

  const handleAddMilestone = (e) => {
    e.preventDefault();
    if (!title.trim() || !date) return;

    const newMilestone = {
      id: 'ms-' + Date.now(),
      title: title.trim(),
      date,
      story: story.trim(),
      icon: icon || '💖',
      photo
    };

    const sorted = [...milestones, newMilestone].sort((a, b) => new Date(a.date) - new Date(b.date));
    if (onSaveStoryMilestones) onSaveStoryMilestones(sorted);

    if (window.HapticEngine) HapticEngine.trigger('success');
    if (window.AudioEngine) AudioEngine.playTone(880);

    setTitle('');
    setStory('');
    setPhoto('');
    setShowAddModal(false);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhoto(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleDeleteMilestone = (id, e) => {
    e.stopPropagation();
    if (confirm('Delete this milestone from your story?')) {
      const updated = milestones.filter(m => m.id !== id);
      if (onSaveStoryMilestones) onSaveStoryMilestones(updated);
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
              background: 'linear-gradient(135deg, rgba(251, 113, 133, 0.2), rgba(248, 207, 101, 0.2))',
              border: '1px solid rgba(251, 113, 133, 0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--color-accent)'
            }}>
              {window.Icons ? <Icons.BookOpen size={18} /> : '📜'}
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: '850', color: '#fff', letterSpacing: '-0.02em' }}>
                Our Love Story
              </div>
              <div style={{ fontSize: '11px', color: 'var(--color-accent)', fontWeight: '700' }}>
                Day {daysTogether} in Sanctuary • {milestones.length} Milestones
              </div>
            </div>
          </div>

          <button 
            onClick={onClose}
            aria-label="Close story timeline"
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

        {/* Hero Days in Love Card */}
        <div style={{ padding: '12px 20px 6px' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(251, 113, 133, 0.15), rgba(248, 207, 101, 0.12))',
            border: '1px solid rgba(251, 113, 133, 0.3)',
            borderRadius: '16px', padding: '12px 16px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '10px', fontWeight: '800', color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                ✦ TOGETHER FOREVER ✦
              </div>
              <div style={{ fontSize: '18px', fontWeight: '900', color: '#fff', marginTop: '2px' }}>
                {daysTogether} Days of Love
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Next milestone: {Math.ceil(daysTogether / 100) * 100} Days (in {(Math.ceil(daysTogether / 100) * 100) - daysTogether} days)
              </div>
            </div>

            <button
              onClick={() => setShowAddModal(!showAddModal)}
              aria-label="Add new chapter"
              style={{
                padding: '7px 14px', borderRadius: '10px',
                background: 'var(--color-accent)', color: '#fff',
                border: 'none', fontSize: '11.5px', fontWeight: '800', cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(251, 113, 133, 0.4)',
                display: 'flex', alignItems: 'center', gap: '4px'
              }}
            >
              {window.Icons && <Icons.Plus size={12} />}
              <span>Add Chapter</span>
            </button>
          </div>
        </div>

        {/* Add Chapter Form Drawer */}
        {showAddModal && (
          <form onSubmit={handleAddMilestone} style={{ padding: '12px 20px', background: 'rgba(251, 113, 133, 0.05)', borderBottom: '1px solid rgba(251, 113, 133, 0.2)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '8px' }}>
              <input
                type="text"
                placeholder="Milestone Title (e.g. First Roadtrip)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '8px 12px', color: '#fff', fontSize: '12px', outline: 'none' }}
              />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '8px', color: '#fff', fontSize: '11px', outline: 'none' }}
              />
            </div>
            <textarea
              rows={2}
              placeholder="What made this moment special..."
              value={story}
              onChange={(e) => setStory(e.target.value)}
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '8px 12px', color: '#fff', fontSize: '12px', outline: 'none', resize: 'none' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <input type="file" accept="image/*" onChange={handlePhotoUpload} id="story-file" style={{ display: 'none' }} />
              <label htmlFor="story-file" style={{ fontSize: '11px', color: 'var(--color-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                {window.Icons && <Icons.Camera size={13} />}
                <span>{photo ? 'Photo Attached ✓' : '+ Attach Photo'}</span>
              </label>
              <button
                type="submit"
                style={{ background: 'var(--color-accent)', color: '#fff', border: 'none', borderRadius: '8px', padding: '6px 14px', fontSize: '11px', fontWeight: '800', cursor: 'pointer' }}
              >
                Save Chapter
              </button>
            </div>
          </form>
        )}

        {/* Vertical Constellation Timeline */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', minHeight: 0 }}>
          <div style={{ position: 'relative', paddingLeft: '28px' }}>
            {/* Timeline Vertical Line */}
            <div style={{
              position: 'absolute', top: '10px', bottom: '10px', left: '11px',
              width: '2px', background: 'linear-gradient(180deg, #fb7185, #f8cf65, #60a5fa)',
              opacity: 0.5
            }} />

            {milestones.map((item, idx) => (
              <div key={item.id || idx} style={{ position: 'relative', marginBottom: '22px' }}>
                {/* Constellation Glowing Node */}
                <div style={{
                  position: 'absolute', left: '-28px', top: '2px',
                  width: '22px', height: '22px', borderRadius: '50%',
                  background: '#131728', border: '2px solid #fb7185',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 0 10px rgba(251, 113, 133, 0.5)',
                  color: 'var(--color-accent)'
                }}>
                  {window.Icons ? <Icons.Sparkles size={11} /> : '✨'}
                </div>

                {/* Milestone Content Card */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '14px', padding: '12px 14px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontSize: '10px', fontWeight: '800', color: 'var(--color-primary)' }}>
                        {new Date(item.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                      <div style={{ fontSize: '13.5px', fontWeight: '800', color: '#fff', marginTop: '2px' }}>
                        {item.title}
                      </div>
                    </div>
                    <button
                      onClick={(e) => handleDeleteMilestone(item.id, e)}
                      aria-label="Delete milestone"
                      style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', padding: '2px', display: 'flex', alignItems: 'center' }}
                    >
                      {window.Icons ? <Icons.Trash2 size={13} /> : '✕'}
                    </button>
                  </div>

                  {item.story && (
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: '1.45' }}>
                      {item.story}
                    </div>
                  )}

                  {item.photo && (
                    <div style={{ marginTop: '10px', borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <img src={item.photo} alt="" style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', display: 'block' }} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

window.StoryTimelineSheet = StoryTimelineSheet;
