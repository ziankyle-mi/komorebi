/**
 * ✦ KOMOREBI — Native Touch Pull-to-Refresh Component
 * Features subtle celestial physics resistance, starlight spinning indicator, and haptic feedback.
 */

function PullToRefresh({ onRefresh, children, className = "" }) {
  const [pullY, setPullY] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const startYRef = useRef(0);
  const isPullingRef = useRef(false);
  const containerRef = useRef(null);
  const threshold = 55;

  const handleTouchStart = (e) => {
    if (isRefreshing) return;
    const container = containerRef.current;
    // Only engage if container is scrolled to the very top
    if (container && container.scrollTop <= 0) {
      startYRef.current = e.touches[0].clientY;
      isPullingRef.current = true;
    }
  };

  const handleTouchMove = (e) => {
    if (!isPullingRef.current || isRefreshing) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - startYRef.current;

    if (diff > 0) {
      // Elastic drag resistance physics
      const distance = Math.min(75, Math.pow(diff, 0.82) * 1.5);
      setPullY(distance);

      if (distance >= threshold && pullY < threshold) {
        if (window.HapticEngine) HapticEngine.trigger('selection');
      }
    } else {
      setPullY(0);
      isPullingRef.current = false;
    }
  };

  const handleTouchEnd = async () => {
    if (!isPullingRef.current || isRefreshing) return;
    isPullingRef.current = false;

    if (pullY >= threshold) {
      setIsRefreshing(true);
      setPullY(45);
      if (window.HapticEngine) HapticEngine.trigger('medium');
      if (window.AudioEngine) AudioEngine.playTone(600);

      try {
        if (onRefresh) {
          await Promise.resolve(onRefresh());
        }
      } catch (err) {
        console.warn('Pull-to-refresh sync error:', err);
      } finally {
        setTimeout(() => {
          setIsRefreshing(false);
          setPullY(0);
          if (window.HapticEngine) HapticEngine.trigger('light');
        }, 450);
      }
    } else {
      setPullY(0);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`pull-refresh-container ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ position: 'relative' }}
    >
      {/* Pull Indicator Pill */}
      {(pullY > 0 || isRefreshing) && (
        <div
          className={`pull-refresh-indicator ${isRefreshing ? 'refreshing' : ''} ${pullY >= threshold ? 'ready' : ''}`}
          style={{
            transform: `translate(-50%, ${pullY > 0 ? pullY - 35 : 10}px)`,
            opacity: Math.min(1, pullY / 30)
          }}
        >
          <div className="pull-icon-wrap" style={{ transform: isRefreshing ? 'none' : `rotate(${pullY * 4.5}deg)` }}>
            {isRefreshing ? (
              <span className="pull-spinner">✦</span>
            ) : (
              <span className="pull-arrow">{pullY >= threshold ? '✨' : '↓'}</span>
            )}
          </div>
          <span className="pull-text">
            {isRefreshing ? 'Syncing...' : pullY >= threshold ? 'Release to Sync' : 'Pull to Sync'}
          </span>
        </div>
      )}

      {children}
    </div>
  );
}

window.PullToRefresh = PullToRefresh;
