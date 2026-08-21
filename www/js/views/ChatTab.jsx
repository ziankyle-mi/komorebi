/**
 * ✦ KOMOREBI — Realtime Chat Stream & Vibrant Messaging View
 * Enhanced with Rich 3-Ambiance Themes (Sakura Pink, Emerald Forest, Celestial Ocean), Pull-to-Refresh & Haptics
 */

function ChatTab({
  chatTheme,
  activeTraveler,
  partnerTraveler,
  myAvatar,
  partnerAvatar,
  myMood,
  partnerMood,
  messages,
  inputText,
  chatEndRef,
  onSetChatTheme,
  onSendMessage,
  onSetInputText,
  onClearChat,
  onBackToCalendar,
  onSendPing,
  onManualSync
}) {
  const handleThemeChange = (newTheme) => {
    if (window.HapticEngine) HapticEngine.trigger('selection');
    if (window.AudioEngine) {
      if (newTheme === 'pink') AudioEngine.playTone(550);
      else if (newTheme === 'forest') AudioEngine.playTone(450);
      else if (newTheme === 'ocean') AudioEngine.playTone(620);
    }
    onSetChatTheme(newTheme);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    if (window.HapticEngine) HapticEngine.trigger('light');
    if (window.AudioEngine) AudioEngine.playTone(640);
    onSendMessage(e);
  };

  const chatStreamContent = (
    <div className="chat-bubble-stream" style={{ flex: '1 1 0', minHeight: 0, overflowY: 'auto', maxHeight: 'none', zIndex: 2, padding: '4px 6px 12px' }}>
      {messages.length === 0 ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-tertiary)', textAlign: 'center', padding: '40px 20px' }}>
          <div style={{ marginBottom: '8px', color: 'var(--color-primary)' }}>
            {window.Icons && <Icons.Chat size={32} />}
          </div>
          <div style={{ fontSize: '14px', fontWeight: '700', color: '#fff' }}>Sanctuary Direct Chat</div>
          <div style={{ fontSize: '11px', maxWidth: '240px', marginTop: '4px', lineHeight: 1.4 }}>
            Your private couple chat space. Send sweet notes, whispers, and messages across both phones in realtime.
          </div>
        </div>
      ) : (
        messages.map((msg) => {
          const isMe = msg.sender === activeTraveler.name.toLowerCase();
          const isMikkiePartner = (partnerTraveler.name || '').toLowerCase().includes('mikkie');
          const fallbackSrc = isMikkiePartner ? './assets/avatars/yae.png' : './assets/avatars/kokomi.png';
          const partnerResolved = window.resolveAvatar ? window.resolveAvatar(partnerAvatar, isMikkiePartner) : partnerAvatar;
          const avatarUrl = partnerResolved?.iconUrl || fallbackSrc;

          return (
            <div key={msg.id} className={`chat-message-row ${isMe ? 'outgoing' : 'incoming'}`}>
              {!isMe && (
                <img
                  src={avatarUrl}
                  alt=""
                  className="chat-avatar"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = fallbackSrc;
                  }}
                />
              )}
              <div className={`chat-bubble ${isMe ? 'outgoing' : 'incoming'}`}>
                <div className="chat-text">{msg.text}</div>
                <div className="chat-timestamp">{msg.time}</div>
              </div>
            </div>
          );
        })
      )}
      <div ref={chatEndRef} />
    </div>
  );

  return (
    <div
      className={`android-content-body chat-screen-container chat-theme-${chatTheme}`}
      style={{ justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}
    >
      {/* 🌌 Celestial Night Sky with Authentic Shooting Stars */}
      {window.CelestialPhysicsCanvas && <CelestialPhysicsCanvas theme={chatTheme} />}

      {/* Chat Header Bar with Back Button, 3-Theme Switcher, and Ping Trigger */}
      <div className="chat-header-bar">
        <button
          onClick={onBackToCalendar}
          className="chat-back-btn"
          title="Back to Calendar"
        >
          <span>←</span> Sanctuary
        </button>

        {/* 3 Messaging Themes: Pink, Forest, Ocean */}
        <div className="chat-theme-picker" title="Switch Chat Theme">
          <button
            type="button"
            className={`theme-pill-btn pink-pill ${chatTheme === 'pink' ? 'active' : ''}`}
            onClick={() => handleThemeChange('pink')}
            title="Sakura Pink Theme"
          >
            {window.Icons && <Icons.Flower size={12} />}
            <span>Pink</span>
          </button>
          <button
            type="button"
            className={`theme-pill-btn forest-pill ${chatTheme === 'forest' ? 'active' : ''}`}
            onClick={() => handleThemeChange('forest')}
            title="Emerald Forest Theme"
          >
            {window.Icons && <Icons.TreePine size={12} />}
            <span>Forest</span>
          </button>
          <button
            type="button"
            className={`theme-pill-btn ocean-pill ${chatTheme === 'ocean' ? 'active' : ''}`}
            onClick={() => handleThemeChange('ocean')}
            title="Deep Ocean Theme"
          >
            {window.Icons && <Icons.Waves size={12} />}
            <span>Ocean</span>
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {/* Send Instant Notification Ping Button */}
          <button
            type="button"
            onClick={() => {
              if (window.HapticEngine) HapticEngine.trigger('medium');
              onSendPing();
            }}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              color: '#fff',
              borderRadius: '12px',
              padding: '3px 8px',
              fontSize: '10px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
            title="Send Instant Notification Ping"
          >
            {window.Icons && <Icons.Bell size={11} />}
            <span>Ping</span>
          </button>

          {messages.length > 0 && (
            <button
              type="button"
              onClick={onClearChat}
              aria-label="Clear chat history"
              style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', padding: '2px 4px', display: 'flex', alignItems: 'center' }}
              title="Clear Chat History"
            >
              {window.Icons ? <Icons.Trash2 size={13} /> : '✕'}
            </button>
          )}
        </div>
      </div>

      {/* Pull-To-Refresh Wrapped Stream */}
      {window.PullToRefresh ? (
        <PullToRefresh onRefresh={onManualSync} className="pull-refresh-container" style={{ flex: '1 1 0', minHeight: 0 }}>
          {chatStreamContent}
        </PullToRefresh>
      ) : (
        chatStreamContent
      )}

      {/* Message Composer Bar */}
      <form onSubmit={handleFormSubmit} className="chat-composer-bar" style={{ zIndex: 3 }}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => onSetInputText(e.target.value)}
          placeholder={`Message ${partnerTraveler.name}...`}
          maxLength={500}
          className="chat-composer-input"
        />
        <button
          type="submit"
          className="chat-send-btn"
          disabled={!inputText.trim()}
          aria-label="Send Message"
          style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <span>Send</span>
          {window.Icons && <Icons.Send size={12} />}
        </button>
      </form>
    </div>
  );
}

window.ChatTab = ChatTab;
