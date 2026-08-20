/**
 * ✦ KOMOREBI — Shimmer Skeleton Placeholders for Instant Perceived Performance
 */

function SkeletonBox({ width = '100%', height = '16px', borderRadius = '6px', style = {} }) {
  return (
    <div
      className="skeleton-shimmer"
      style={{
        width,
        height,
        borderRadius,
        ...style
      }}
    />
  );
}

function SkeletonBento() {
  return (
    <div className="bento-row">
      <div className="bento-card" style={{ gap: '8px' }}>
        <SkeletonBox width="60%" height="12px" />
        <SkeletonBox width="100%" height="45px" borderRadius="8px" />
      </div>
      <div className="bento-card" style={{ gap: '8px' }}>
        <SkeletonBox width="60%" height="12px" />
        <SkeletonBox width="100%" height="45px" borderRadius="8px" />
      </div>
    </div>
  );
}

function SkeletonFeedCard() {
  return (
    <div className="feed-card" style={{ gap: '10px', padding: '14px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <SkeletonBox width="36px" height="36px" borderRadius="50%" />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <SkeletonBox width="45%" height="12px" />
          <SkeletonBox width="70%" height="10px" />
        </div>
      </div>
      <SkeletonBox width="100%" height="32px" borderRadius="8px" />
    </div>
  );
}

function SkeletonChatRow({ incoming = false }) {
  return (
    <div className={`chat-message-row ${incoming ? 'incoming' : 'outgoing'}`} style={{ gap: '8px', padding: '4px 0' }}>
      {incoming && <SkeletonBox width="24px" height="24px" borderRadius="50%" />}
      <div style={{ width: '55%', display: 'flex', flexDirection: 'column', gap: '4px', alignItems: incoming ? 'flex-start' : 'flex-end' }}>
        <SkeletonBox width="100%" height="34px" borderRadius="14px" />
        <SkeletonBox width="30%" height="8px" />
      </div>
      {!incoming && <SkeletonBox width="24px" height="24px" borderRadius="50%" />}
    </div>
  );
}

window.SkeletonBox = SkeletonBox;
window.SkeletonBento = SkeletonBento;
window.SkeletonFeedCard = SkeletonFeedCard;
window.SkeletonChatRow = SkeletonChatRow;
