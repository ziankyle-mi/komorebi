/**
 * ✦ KOMOREBI — SHARED COUPLE BUCKET LIST & DREAM QUEST BOARD
 * An interactive milestone quest tracker for dates, travel adventures, and lifelong dreams.
 */

const DEFAULT_COUPLE_QUESTS = [
  // 🌸 Romantic Dates
  { id: 'q-1', title: 'Midnight Stargazing & Picnic', category: 'dates', completed: true, completedAt: 1787134400000, icon: '✨' },
  { id: 'q-2', title: 'Cook a 3-Course Dinner from Scratch', category: 'dates', completed: false, icon: '🍝' },
  { id: 'q-3', title: 'Watch Sunrise on the Beach in Blankets', category: 'dates', completed: false, icon: '🌅' },
  { id: 'q-4', title: 'Bake Matcha Cookies & Late-Night Tea', category: 'dates', completed: true, completedAt: 1787189000000, icon: '🍪' },
  { id: 'q-5', title: 'Build an Epic Living Room Blanket Fort', category: 'dates', completed: false, icon: '🏰' },
  { id: 'q-6', title: 'Couple Paint & Sip Night', category: 'dates', completed: false, icon: '🎨' },

  // ✈️ Adventures & Travel
  { id: 'q-7', title: 'Walk Under Kyoto Cherry Blossoms', category: 'adventures', completed: false, icon: '🌸' },
  { id: 'q-8', title: 'Cozy Mountain Cabin Weekend Getaway', category: 'adventures', completed: false, icon: '🏡' },
  { id: 'q-9', title: 'Road Trip with No Final Destination', category: 'adventures', completed: false, icon: '🚗' },
  { id: 'q-10', title: 'Ride a Hot Air Balloon at Dawn', category: 'adventures', completed: false, icon: '🎈' },
  { id: 'q-11', title: 'Campfire Beach Bonfire with Marshmallows', category: 'adventures', completed: true, completedAt: 1787190000000, icon: '🔥' },

  // 💎 Life Milestones
  { id: 'q-12', title: 'Celebrate 1,000 Days in Love', category: 'milestones', completed: false, icon: '💍' },
  { id: 'q-13', title: 'Adopt Our First Furry Best Friend', category: 'milestones', completed: false, icon: '🐾' },
  { id: 'q-14', title: 'Print & Frame Our 100 Best Memories', category: 'milestones', completed: false, icon: '🖼️' },
  { id: 'q-15', title: 'Create Our Cozy Dream Sanctuary Home', category: 'milestones', completed: false, icon: '✨' }
];

const EMOJI_PRESETS = ['✨', '🌸', '🏖️', '✈️', '🌅', '🍝', '🏡', '🎈', '💍', '🐾', '🎨', '🍿', '🏕️', '🚗', '💖', '🏰', '🍣', '🎡', '☕'];

function BucketListSheet({
  isOpen,
  onClose,
  activeTraveler,
  partnerTraveler,
  bucketList = [],
  onSaveBucketList
}) {
  if (!isOpen) return null;

  const [activeCategory, setActiveCategory] = useState('all');
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('dates');
  const [newIcon, setNewIcon] = useState('✨');
  const [showAddForm, setShowAddForm] = useState(false);

  const activeName = (activeTraveler?.name || 'Ziankyle');
  const partnerName = (partnerTraveler?.name || 'Partner');

  // Initialize quests with defaults if empty
  const quests = bucketList.length > 0 ? bucketList : DEFAULT_COUPLE_QUESTS;

  const completedCount = quests.filter(q => q.completed).length;
  const progressPercent = Math.round((completedCount / (quests.length || 1)) * 100);

  // Couple Tier
  let coupleRank = '🌱 Sweet Explorers';
  if (progressPercent >= 75) coupleRank = '👑 Legendary Soulmates';
  else if (progressPercent >= 50) coupleRank = '💖 Inseparable Adventurers';
  else if (progressPercent >= 25) coupleRank = '✨ Dreamer Duo';

  const filteredQuests = useMemo(() => {
    if (activeCategory === 'all') return quests;
    if (activeCategory === 'completed') return quests.filter(q => q.completed);
    return quests.filter(q => q.category === activeCategory);
  }, [quests, activeCategory]);

  const handleToggleQuest = (id) => {
    const updated = quests.map(q => {
      if (q.id === id) {
        const nextState = !q.completed;
        if (nextState) {
          if (window.HapticEngine) HapticEngine.trigger('success');
          if (window.AudioEngine) AudioEngine.playTone(880);
        } else {
          if (window.HapticEngine) HapticEngine.trigger('light');
        }
        return {
          ...q,
          completed: nextState,
          completedAt: nextState ? Date.now() : null,
          completedBy: nextState ? activeName : null
        };
      }
      return q;
    });

    if (onSaveBucketList) onSaveBucketList(updated);
  };

  const handleAddQuest = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!newTitle.trim()) return;

    const newQuest = {
      id: 'quest-' + Date.now(),
      title: newTitle.trim(),
      category: newCategory,
      icon: newIcon || '✨',
      completed: false,
      createdBy: activeName
    };

    const updated = [newQuest, ...quests];
    if (onSaveBucketList) onSaveBucketList(updated);

    if (window.HapticEngine) HapticEngine.trigger('success');
    if (window.AudioEngine) AudioEngine.playTone(650);

    setNewTitle('');
    setShowAddForm(false);
  };

  const handleDeleteQuest = (id, e) => {
    e.stopPropagation();
    if (confirm('Delete this bucket list quest?')) {
      const updated = quests.filter(q => q.id !== id);
      if (onSaveBucketList) onSaveBucketList(updated);
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
        {/* Top Header Row */}
        <div className="sheet-header-row" style={{ paddingBottom: '12px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(76, 215, 182, 0.2), rgba(248, 207, 101, 0.2))',
              border: '1px solid rgba(76, 215, 182, 0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#4cd7b6'
            }}>
              {window.Icons ? <Icons.Compass size={18} /> : '🗺️'}
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: '850', color: '#fff', letterSpacing: '-0.02em' }}>
                Couple Bucket List
              </div>
              <div style={{ fontSize: '11px', color: '#4cd7b6', fontWeight: '700' }}>
                {coupleRank} • {completedCount}/{quests.length} Completed ({progressPercent}%)
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Prominent Header Add Button */}
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              aria-label="Add new quest"
              style={{
                padding: '6px 12px',
                borderRadius: '10px',
                background: showAddForm ? '#4cd7b6' : 'rgba(76, 215, 182, 0.16)',
                border: '1px solid #4cd7b6',
                color: showAddForm ? '#090b10' : '#4cd7b6',
                fontSize: '11.5px',
                fontWeight: '800',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                transition: 'all 0.2s ease'
              }}
            >
              {window.Icons ? (showAddForm ? <Icons.X size={13} /> : <Icons.Plus size={13} />) : (showAddForm ? '✕' : '+')}
              <span>{showAddForm ? 'Close' : 'Add Quest'}</span>
            </button>

            <button 
              onClick={onClose}
              aria-label="Close bucket list"
              style={{
                background: 'rgba(255,255,255,0.06)', border: 'none',
                width: '32px', height: '32px', borderRadius: '50%',
                color: 'var(--text-secondary)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
            >
              {window.Icons ? <Icons.X size={16} /> : '✕'}
            </button>
          </div>
        </div>

        {/* Progress Meter */}
        <div style={{ padding: '10px 4px 6px' }}>
          <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{
              width: `${progressPercent}%`, height: '100%',
              background: 'linear-gradient(90deg, #4cd7b6, #f8cf65)',
              borderRadius: '3px', transition: 'width 0.3s ease'
            }} />
          </div>
        </div>

        {/* Category Pills Bar */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', overflowX: 'auto', gap: '6px' }}>
          {[
            { id: 'all', label: 'All Quests', icon: null },
            { id: 'dates', label: 'Dates', icon: 'Flower2' },
            { id: 'adventures', label: 'Travel', icon: 'Plane' },
            { id: 'milestones', label: 'Life Goals', icon: 'Gem' },
            { id: 'completed', label: 'Done', icon: 'Check' }
          ].map(cat => {
            const IconComp = cat.icon && window.Icons ? window.Icons[cat.icon] : null;
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: '6px 12px', borderRadius: '8px', border: 'none',
                  background: isSelected ? '#4cd7b6' : 'rgba(255,255,255,0.05)',
                  color: isSelected ? '#090b10' : 'var(--text-secondary)',
                  fontSize: '11px', fontWeight: '750', cursor: 'pointer', whiteSpace: 'nowrap',
                  display: 'flex', alignItems: 'center', gap: '5px'
                }}
              >
                {IconComp && <IconComp size={12} />}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Prominent Add Bucket List Composer */}
        {showAddForm && (
          <form 
            onSubmit={handleAddQuest} 
            style={{ 
              margin: '10px 0 6px',
              padding: '14px 16px', 
              background: 'linear-gradient(135deg, rgba(76, 215, 182, 0.08) 0%, rgba(18, 26, 42, 0.95) 100%)', 
              border: '1px solid rgba(76, 215, 182, 0.35)', 
              borderRadius: '14px',
              display: 'flex', 
              flexDirection: 'column', 
              gap: '12px' 
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '12px', fontWeight: '800', color: '#4cd7b6', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>✨</span>
                <span>Add a New Bucket List Item</span>
              </span>
              <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>
                Added by {activeName}
              </span>
            </div>

            {/* Input & Icon Preview */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <div style={{
                width: '38px', height: '38px', borderRadius: '10px',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '18px', flexShrink: 0
              }}>
                {newIcon}
              </div>

              <input
                type="text"
                placeholder="e.g. Watch midnight fireworks together..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                autoFocus
                required
                style={{
                  flex: 1, background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px',
                  padding: '10px 12px', color: '#fff', fontSize: '12.5px', outline: 'none'
                }}
              />
            </div>

            {/* Category Selector Pills */}
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <span style={{ fontSize: '10.5px', color: 'var(--text-secondary)', marginRight: '4px' }}>Category:</span>
              {[
                { id: 'dates', label: '🌸 Date Idea' },
                { id: 'adventures', label: '✈️ Travel Trip' },
                { id: 'milestones', label: '💎 Life Goal' }
              ].map(c => (
                <button
                  type="button"
                  key={c.id}
                  onClick={() => setNewCategory(c.id)}
                  style={{
                    padding: '4px 9px', borderRadius: '7px',
                    background: newCategory === c.id ? 'rgba(76, 215, 182, 0.25)' : 'rgba(255,255,255,0.04)',
                    border: newCategory === c.id ? '1px solid #4cd7b6' : '1px solid rgba(255,255,255,0.1)',
                    color: newCategory === c.id ? '#4cd7b6' : 'var(--text-secondary)',
                    fontSize: '10.5px', fontWeight: '700', cursor: 'pointer'
                  }}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Emoji Quick Picker */}
            <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px', alignItems: 'center' }}>
              <span style={{ fontSize: '10.5px', color: 'var(--text-secondary)', marginRight: '4px', whiteSpace: 'nowrap' }}>Icon:</span>
              {EMOJI_PRESETS.map(em => (
                <button
                  type="button"
                  key={em}
                  onClick={() => setNewIcon(em)}
                  style={{
                    padding: '3px 6px', borderRadius: '6px',
                    background: newIcon === em ? 'rgba(76, 215, 182, 0.3)' : 'rgba(255,255,255,0.04)',
                    border: newIcon === em ? '1px solid #4cd7b6' : '1px solid rgba(255,255,255,0.08)',
                    fontSize: '13px', cursor: 'pointer'
                  }}
                >
                  {em}
                </button>
              ))}
            </div>

            {/* Form Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', paddingTop: '4px' }}>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                style={{
                  background: 'rgba(255,255,255,0.05)', border: 'none',
                  borderRadius: '8px', padding: '7px 14px',
                  color: 'var(--text-secondary)', fontSize: '11px', cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  background: '#4cd7b6', color: '#090b10', border: 'none',
                  borderRadius: '8px', padding: '7px 16px', fontSize: '11.5px', fontWeight: '800', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '5px'
                }}
              >
                <span>➕</span>
                <span>Add to Bucket List</span>
              </button>
            </div>
          </form>
        )}

        {/* Quests List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '10px 0', minHeight: 0 }}>
          {/* Quick inline button if form is closed */}
          {!showAddForm && (
            <div
              onClick={() => setShowAddForm(true)}
              style={{
                marginBottom: '10px',
                padding: '11px 14px',
                background: 'rgba(76, 215, 182, 0.05)',
                border: '1px dashed rgba(76, 215, 182, 0.35)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                color: '#4cd7b6',
                fontSize: '12px',
                fontWeight: '750',
                cursor: 'pointer'
              }}
            >
              {window.Icons ? <Icons.Plus size={15} /> : '+'}
              <span>Add a New Bucket List Item</span>
            </div>
          )}

          {filteredQuests.length === 0 ? (
            <div style={{ padding: '30px 20px', textAlign: 'center', color: 'var(--text-secondary)' }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>🌸</div>
              <div style={{ fontSize: '13px', fontWeight: '750', color: '#fff', marginBottom: '4px' }}>
                No quests in this category yet
              </div>
              <div style={{ fontSize: '11px', marginBottom: '14px' }}>
                Add your dream date, travel destination, or couple goal!
              </div>
              <button
                onClick={() => setShowAddForm(true)}
                style={{
                  padding: '7px 16px', borderRadius: '8px',
                  background: '#4cd7b6', color: '#090b10', border: 'none',
                  fontSize: '11.5px', fontWeight: '800', cursor: 'pointer'
                }}
              >
                + Add New Quest
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {filteredQuests.map(quest => (
                <div
                  key={quest.id}
                  onClick={() => handleToggleQuest(quest.id)}
                  style={{
                    background: quest.completed ? 'rgba(76, 215, 182, 0.08)' : 'rgba(255, 255, 255, 0.04)',
                    border: quest.completed ? '1px solid rgba(76, 215, 182, 0.35)' : '1px solid rgba(255, 255, 255, 0.07)',
                    borderRadius: '13px', padding: '11px 13px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    cursor: 'pointer', transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '11px', flex: 1, minWidth: 0 }}>
                    {/* Checkbox Icon */}
                    <div style={{
                      width: '26px', height: '26px', borderRadius: '8px',
                      background: quest.completed ? '#4cd7b6' : 'rgba(255,255,255,0.06)',
                      border: quest.completed ? 'none' : '1px solid rgba(255,255,255,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#090b10', fontSize: '13px', fontWeight: '900', flexShrink: 0
                    }}>
                      {quest.completed && (window.Icons ? <Icons.Check size={14} /> : '✓')}
                    </div>

                    {/* Quest Icon */}
                    <span style={{ fontSize: '17px', flexShrink: 0 }}>
                      {quest.icon || '✨'}
                    </span>

                    {/* Title & Metadata */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: '12.5px', fontWeight: '750',
                        color: quest.completed ? 'rgba(255,255,255,0.55)' : '#fff',
                        textDecoration: quest.completed ? 'line-through' : 'none',
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                      }}>
                        {quest.title}
                      </div>
                      <div style={{ fontSize: '10px', color: quest.completed ? '#4cd7b6' : 'var(--text-secondary)', marginTop: '2px', fontWeight: '600' }}>
                        {quest.completed ? (
                          `Completed together ${quest.completedAt ? `• ${new Date(quest.completedAt).toLocaleDateString()}` : ''}`
                        ) : (
                          quest.createdBy ? `Added by ${quest.createdBy}` : 'Dream quest'
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Delete Action */}
                  <button
                    onClick={(e) => handleDeleteQuest(quest.id, e)}
                    aria-label="Delete quest"
                    style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.25)', cursor: 'pointer', padding: '6px', display: 'flex', alignItems: 'center', flexShrink: 0 }}
                  >
                    {window.Icons ? <Icons.Trash2 size={14} /> : '🗑️'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

window.BucketListSheet = BucketListSheet;
