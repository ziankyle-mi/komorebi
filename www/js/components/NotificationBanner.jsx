/**
 * ✦ KOMOREBI — HD Live Notification Banner Component
 * Displays Komorebi App Logo Emblem, Sender Avatar, Title, Caption & Action Direct Links
 */

function HDNotificationBanner({ notification, onClose, onClick }) {
  if (!notification) return null;

  const isPhotoAlert = notification.type === 'photo';

  return (
    <div 
      className="hd-notification-banner" 
      onClick={() => {
        if (onClick) onClick();
      }}
      style={{ cursor: 'pointer' }}
    >
      <div className="hd-notif-main-row">
        {/* Avatar with Overlaid Komorebi App Logo Badge */}
        <div className="hd-notif-avatar-wrap">
          <img 
            src={notification.avatarUrl || './assets/iconforapp.jpg'} 
            className="hd-notif-avatar-img" 
            alt="Avatar" 
          />
          <div className="hd-notif-app-logo-badge" title="Komorebi Sanctuary">
            <img 
              src="./assets/app_icon.svg" 
              onError={(e) => { e.target.src = './assets/iconforapp.jpg'; }} 
              alt="Komorebi Logo" 
            />
          </div>
        </div>

        <div className="hd-notif-content">
          {/* App Brand Header */}
          <div className="hd-notif-app-tag">
            <img 
              src="./assets/app_icon.svg" 
              onError={(e) => { e.target.src = './assets/iconforapp.jpg'; }} 
              className="hd-notif-mini-logo" 
              alt="" 
            />
            <span>KOMOREBI</span>
            <span style={{ opacity: 0.5 }}>•</span>
            <span style={{ textTransform: 'none', opacity: 0.85 }}>{isPhotoAlert ? 'Locket' : 'Sanctuary'}</span>
          </div>

          <div className="hd-notif-title-row">
            <span className="hd-notif-title">{notification.title}</span>
            {isPhotoAlert ? (
              <span className="hd-notif-badge">
                <span className="sound-wave-pulse">
                  <span className="sound-bar" />
                  <span className="sound-bar" />
                  <span className="sound-bar" />
                </span>
                <span>Photo Alert</span>
              </span>
            ) : (
              <span className="hd-notif-badge" style={{ background: 'rgba(76, 215, 182, 0.15)', color: '#4cd7b6', borderColor: 'rgba(76, 215, 182, 0.3)' }}>
                <span>Live ⚡</span>
              </span>
            )}
          </div>
          <div className="hd-notif-caption">{notification.caption || notification.body || 'New sanctuary update'}</div>
        </div>

        {notification.thumbUrl && (
          <div className="hd-notif-thumb">
            <img src={notification.thumbUrl} alt="" />
          </div>
        )}

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="hd-notif-close-btn"
          aria-label="Dismiss Notification"
        >
          ✕
        </button>
      </div>

      <div className="hd-notif-progress-track">
        <div 
          className="hd-notif-progress-bar" 
          style={{ animationDuration: isPhotoAlert ? '30s' : '6s' }}
        />
      </div>
    </div>
  );
}

window.HDNotificationBanner = HDNotificationBanner;
