/**
 * ✦ MOVIE DATE — UNLIMITED TINDER-STYLE COUPLE MOVIE & TV SERIES SWIPER
 * 100% ULTRA-HD OFFICIAL POSTERS + FREE INFINITE TVMAZE & MOVIE DISCOVERY ENGINE
 * 120FPS ZERO-LATENCY DIRECT-DOM GESTURE ENGINE WITH IN-MEMORY PRELOADING
 */

function FlickSwipeSheet({
  isOpen,
  onClose,
  activeTraveler,
  partnerTraveler,
  myAvatar,
  partnerAvatar,
  movieSwipes = {},
  onSaveMovieSwipes
}) {
  if (!isOpen) return null;

  const GENRE_FILTERS = window.GENRE_FILTERS || [];
  const INITIAL_CATALOG = window.INITIAL_COUPLE_CATALOG || [];
  const getThematicPoster = window.getThematicPosterFallback || ((t) => '');

  const [selectedGenre, setSelectedGenre] = useState('all');
  const [moviesList, setMoviesList] = useState(INITIAL_CATALOG);
  const [matchedMovie, setMatchedMovie] = useState(null);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);
  const [watchlistFilter, setWatchlistFilter] = useState('matches');
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [lastSwipedMovieId, setLastSwipedMovieId] = useState(null);

  // Dynamic Discovery & Live Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isFeedLoading, setIsFeedLoading] = useState(false);
  const [feedPage, setFeedPage] = useState(0);
  const [showSearchBar, setShowSearchBar] = useState(false);

  // Direct-DOM Drag Physics Refs (0 React Re-renders while dragging)
  const cardRef = useRef(null);
  const nextCardRef = useRef(null);
  const likeStampRef = useRef(null);
  const nopeStampRef = useRef(null);
  const rafIdRef = useRef(null);

  const gestureState = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    lastX: 0,
    lastTime: 0,
    velocityX: 0
  });

  const activeKey = (activeTraveler?.name || 'ziankyle').toLowerCase();
  const partnerKey = (partnerTraveler?.name || 'mikkie').toLowerCase();

  const mySwipes = movieSwipes[activeKey] || {};
  const partnerSwipes = movieSwipes[partnerKey] || {};

  const passedTitles = useMemo(() => {
    return moviesList.filter(m => mySwipes[m.id] === 'passed');
  }, [moviesList, mySwipes]);

  // Filter movies and tv series by genre / mediaType
  const filteredMovies = useMemo(() => {
    if (selectedGenre === 'all') return moviesList;
    if (selectedGenre === 'tv') return moviesList.filter(m => m.mediaType === 'tv');
    if (selectedGenre === 'movie') return moviesList.filter(m => m.mediaType === 'movie');
    return moviesList.filter(m => m.genres && (m.genres.includes(selectedGenre) || (selectedGenre === 'Sci-Fi' && m.genres.includes('Science-Fiction'))));
  }, [selectedGenre, moviesList]);

  // Unswiped items in deck
  const activeDeck = useMemo(() => {
    return filteredMovies.filter(m => !mySwipes[m.id]);
  }, [filteredMovies, mySwipes]);

  const currentMovie = activeDeck[0] || null;
  const nextMovie = activeDeck[1] || null;
  const thirdMovie = activeDeck[2] || null;

  // Free API Discovery: Load 50+ Trending Shows from TVmaze (with offline resilient fallback)
  const loadMoreTrendingShows = async () => {
    if (isFeedLoading) return;
    setIsFeedLoading(true);
    if (window.HapticEngine) HapticEngine.trigger('light');
    if (window.AudioEngine) AudioEngine.playTone(560);

    // Auto-reset category to 'all' so new incoming shows are immediately visible in the active deck
    setSelectedGenre('all');

    try {
      const nextPage = feedPage + 1;
      let newItems = [];

      try {
        const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
        const timeoutId = controller ? setTimeout(() => controller.abort(), 4000) : null;
        const res = await fetch(`https://api.tvmaze.com/shows?page=${nextPage}`, {
          signal: controller ? controller.signal : undefined
        });
        if (timeoutId) clearTimeout(timeoutId);

        if (res && res.ok) {
          const list = await res.json();
          if (Array.isArray(list) && list.length > 0) {
            newItems = list
              .filter(s => s.image && (s.image.original || s.image.medium))
              .slice(0, 50)
              .map(s => {
                let cleanOverview = s.summary ? s.summary.replace(/<[^>]*>?/gm, '') : "A captivating television series.";
                return {
                  id: `tvmaze-${s.id}`,
                  title: s.name,
                  mediaType: 'tv',
                  year: s.premiered ? `${s.premiered.substring(0, 4)} • Series` : 'TV Series',
                  rating: s.rating?.average || 7.8,
                  genres: s.genres && s.genres.length ? s.genres : ['Drama'],
                  overview: cleanOverview.substring(0, 220) + (cleanOverview.length > 220 ? '...' : ''),
                  poster: s.image.original || s.image.medium
                };
              });
          }
        }
      } catch (fetchErr) {
        console.warn("TVmaze live fetch fallback used:", fetchErr);
      }

      // If online fetch returned few or no items, append from our verified offline pack with unique IDs
      if (!newItems || newItems.length < 5) {
        newItems = FALLBACK_TRENDING_EXPANSION_PACK.map((item, idx) => ({
          ...item,
          id: `${item.id}-${nextPage}-${idx}`
        }));
      }

      setMoviesList(prev => {
        const existingIds = new Set(prev.map(p => p.id));
        const added = newItems.filter(it => !existingIds.has(it.id));
        return [...prev, ...added];
      });

      setFeedPage(nextPage);
      if (window.HapticEngine) HapticEngine.trigger('success');
      if (window.AudioEngine) AudioEngine.playTone(750);
    } catch (e) {
      console.warn("Error loading shows:", e);
    } finally {
      setIsFeedLoading(false);
    }
  };

  // Auto-fetch 50+ top shows on mount so the deck is immediately packed with hundreds of titles!
  useEffect(() => {
    loadMoreTrendingShows();
  }, []);

  // Preload upcoming HD images into browser cache for instant rendering
  useEffect(() => {
    if (nextMovie && nextMovie.poster) {
      const img1 = new Image();
      img1.src = nextMovie.poster;
    }
    if (thirdMovie && thirdMovie.poster) {
      const img2 = new Image();
      img2.src = thirdMovie.poster;
    }
  }, [nextMovie, thirdMovie]);

  // Mutual matches list
  const mutualMatches = useMemo(() => {
    return moviesList.filter(m => mySwipes[m.id] === 'liked' && partnerSwipes[m.id] === 'liked');
  }, [moviesList, mySwipes, partnerSwipes]);

  // Free API Live Search across 50,000+ Shows & Anime
  const handleLiveSearch = async (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;
    setIsSearching(true);
    try {
      const res = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`);
      if (res.ok) {
        const results = await res.json();
        const found = results
          .filter(r => r.show && r.show.image && (r.show.image.original || r.show.image.medium))
          .map(r => {
            const s = r.show;
            let cleanOverview = s.summary ? s.summary.replace(/<[^>]*>?/gm, '') : `Official series ${s.name}.`;
            return {
              id: `tvmaze-${s.id}`,
              title: s.name,
              mediaType: 'tv',
              year: s.premiered ? `${s.premiered.substring(0, 4)} • Series` : 'TV Series',
              rating: s.rating?.average || 8.0,
              genres: s.genres && s.genres.length ? s.genres : ['Drama'],
              overview: cleanOverview.substring(0, 220) + (cleanOverview.length > 220 ? '...' : ''),
              poster: s.image.original || s.image.medium
            };
          });

        if (found.length > 0) {
          setMoviesList(prev => {
            const existingIds = new Set(prev.map(p => p.id));
            const newFound = found.filter(it => !existingIds.has(it.id));
            // Prepend found items to the top of the swipe deck immediately!
            return [...newFound, ...prev];
          });
          setSearchQuery('');
          setShowSearchBar(false);
        } else {
          alert(`No shows found for "${query}". Try searching for another title!`);
        }
      }
    } catch (err) {
      console.warn("Search error:", err);
    } finally {
      setIsSearching(false);
    }
  };

  const pendingMovieRef = useRef(null);
  const pendingDirectionRef = useRef(null);
  const animationTimerRef = useRef(null);

  const commitSwipe = (direction, movieToSwipe) => {
    if (!movieToSwipe) return;
    const isLiked = direction === 'right';
    const action = isLiked ? 'liked' : 'passed';

    if (window.HapticEngine) HapticEngine.trigger(isLiked ? 'success' : 'light');
    if (window.AudioEngine) AudioEngine.playTone(isLiked ? 680 : 320);

    const updatedMySwipes = { ...mySwipes, [movieToSwipe.id]: action };
    const updatedAllSwipes = {
      ...movieSwipes,
      [activeKey]: updatedMySwipes
    };

    setLastSwipedMovieId(movieToSwipe.id);

    if (onSaveMovieSwipes) {
      onSaveMovieSwipes(updatedAllSwipes);
    }

    // Check for Mutual Match!
    if (isLiked && partnerSwipes[movieToSwipe.id] === 'liked') {
      setMatchedMovie(movieToSwipe);
      if (window.AudioEngine) AudioEngine.playTone(880);
    }
  };

  // Ultra-fluid Snappy Swipe (140ms with queue flushing for rapid clicks)
  const flyCardOut = (direction) => {
    if (!currentMovie) return;

    // Flush any pending in-flight swipe instantly
    if (pendingMovieRef.current) {
      if (animationTimerRef.current) clearTimeout(animationTimerRef.current);
      commitSwipe(pendingDirectionRef.current, pendingMovieRef.current);
      pendingMovieRef.current = null;
      pendingDirectionRef.current = null;
    }

    const cardEl = cardRef.current;
    const nextCardEl = nextCardRef.current;
    const likeStamp = likeStampRef.current;
    const nopeStamp = nopeStampRef.current;
    const targetMovie = currentMovie;

    pendingMovieRef.current = targetMovie;
    pendingDirectionRef.current = direction;

    const throwX = direction === 'right' ? (window.innerWidth || 400) * 1.25 : -(window.innerWidth || 400) * 1.25;
    const throwRotate = direction === 'right' ? 24 : -24;

    if (cardEl) {
      cardEl.style.transition = 'transform 0.14s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.14s ease-out';
      cardEl.style.transform = `translate3d(${throwX}px, -20px, 0) rotate(${throwRotate}deg)`;
      cardEl.style.opacity = '0';
    }

    if (direction === 'right' && likeStamp) likeStamp.style.opacity = '1';
    if (direction === 'left' && nopeStamp) nopeStamp.style.opacity = '1';

    if (nextCardEl) {
      nextCardEl.style.transition = 'transform 0.14s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.14s ease-out';
      nextCardEl.style.transform = 'scale(1) translateY(0)';
      nextCardEl.style.opacity = '1';
      nextCardEl.style.filter = 'brightness(1)';
    }

    animationTimerRef.current = setTimeout(() => {
      if (pendingMovieRef.current === targetMovie) {
        commitSwipe(direction, targetMovie);
        pendingMovieRef.current = null;
        pendingDirectionRef.current = null;
      }
    }, 140);
  };

  // Direct-DOM Pointer Drag Handler (120fps smooth with zero react re-renders)
  const onPointerDown = (e) => {
    if (!currentMovie) return;
    const g = gestureState.current;
    g.isDragging = true;
    g.startX = e.clientX;
    g.startY = e.clientY;
    g.currentX = e.clientX;
    g.currentY = e.clientY;
    g.lastX = e.clientX;
    g.lastTime = performance.now();
    g.velocityX = 0;

    if (cardRef.current) {
      cardRef.current.style.transition = 'none';
    }
    if (nextCardRef.current) {
      nextCardRef.current.style.transition = 'none';
    }

    if (e.target && e.target.setPointerCapture) {
      try { e.target.setPointerCapture(e.pointerId); } catch (_) {}
    }
  };

  const onPointerMove = (e) => {
    const g = gestureState.current;
    if (!g.isDragging) return;

    const now = performance.now();
    const dt = now - g.lastTime;
    if (dt > 8) {
      g.velocityX = (e.clientX - g.lastX) / dt;
      g.lastX = e.clientX;
      g.lastTime = now;
    }

    g.currentX = e.clientX;
    g.currentY = e.clientY;

    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    rafIdRef.current = requestAnimationFrame(() => {
      const dx = g.currentX - g.startX;
      const dy = g.currentY - g.startY;
      const rot = (dx / (window.innerWidth || 400)) * 22;

      if (cardRef.current) {
        cardRef.current.style.transform = `translate3d(${dx}px, ${dy * 0.35}px, 0) rotate(${rot}deg)`;
      }

      // Stamps opacity
      const likeOpacity = Math.min(1, Math.max(0, dx / 65));
      const nopeOpacity = Math.min(1, Math.max(0, -dx / 65));
      if (likeStampRef.current) likeStampRef.current.style.opacity = likeOpacity;
      if (nopeStampRef.current) nopeStampRef.current.style.opacity = nopeOpacity;

      // Scale up background card smoothly
      if (nextCardRef.current) {
        const progress = Math.min(1, Math.abs(dx) / 140);
        const scale = 0.94 + progress * 0.06;
        const translateY = 14 - progress * 14;
        const opacity = 0.75 + progress * 0.25;
        const brightness = 0.7 + progress * 0.3;
        nextCardRef.current.style.transform = `scale(${scale}) translateY(${translateY}px)`;
        nextCardRef.current.style.opacity = opacity;
        nextCardRef.current.style.filter = `brightness(${brightness})`;
      }
    });
  };

  const onPointerUp = (e) => {
    const g = gestureState.current;
    if (!g.isDragging) return;
    g.isDragging = false;

    if (e.target && e.target.releasePointerCapture) {
      try { e.target.releasePointerCapture(e.pointerId); } catch (_) {}
    }

    const dx = g.currentX - g.startX;
    const isFlickFast = Math.abs(g.velocityX) > 0.35;
    const threshold = 70;

    if (dx > threshold || (isFlickFast && g.velocityX > 0)) {
      flyCardOut('right');
    } else if (dx < -threshold || (isFlickFast && g.velocityX < 0)) {
      flyCardOut('left');
    } else {
      // Elastic rubber-band spring recovery
      if (cardRef.current) {
        cardRef.current.style.transition = 'transform 0.28s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.2s ease';
        cardRef.current.style.transform = 'translate3d(0, 0, 0) rotate(0deg)';
      }
      if (likeStampRef.current) likeStampRef.current.style.opacity = '0';
      if (nopeStampRef.current) nopeStampRef.current.style.opacity = '0';
      if (nextCardRef.current) {
        nextCardRef.current.style.transition = 'transform 0.28s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.2s ease';
        nextCardRef.current.style.transform = 'scale(0.94) translateY(14px)';
        nextCardRef.current.style.opacity = '0.75';
        nextCardRef.current.style.filter = 'brightness(0.7)';
      }
    }
  };

  const handleResetDeck = () => {
    const updated = { ...movieSwipes, [activeKey]: {} };
    if (onSaveMovieSwipes) onSaveMovieSwipes(updated);
    setLastSwipedMovieId(null);
  };

  const handleResetPassesOnly = () => {
    const updatedMySwipes = { ...mySwipes };
    for (const id in updatedMySwipes) {
      if (updatedMySwipes[id] === 'passed') {
        delete updatedMySwipes[id];
      }
    }
    const updatedAllSwipes = {
      ...movieSwipes,
      [activeKey]: updatedMySwipes
    };
    if (onSaveMovieSwipes) onSaveMovieSwipes(updatedAllSwipes);
    setLastSwipedMovieId(null);
    if (window.HapticEngine) HapticEngine.trigger('success');
    if (window.AudioEngine) AudioEngine.playTone(540);
  };

  const handleRewindLastSwipe = () => {
    if (!lastSwipedMovieId) return;
    const updatedMySwipes = { ...mySwipes };
    delete updatedMySwipes[lastSwipedMovieId];
    const updatedAllSwipes = {
      ...movieSwipes,
      [activeKey]: updatedMySwipes
    };
    if (onSaveMovieSwipes) onSaveMovieSwipes(updatedAllSwipes);
    setLastSwipedMovieId(null);
    if (window.HapticEngine) HapticEngine.trigger('light');
    if (window.AudioEngine) AudioEngine.playTone(520);
  };

  const handleRemoveLike = (movieId) => {
    const updatedMySwipes = { ...mySwipes };
    delete updatedMySwipes[movieId];
    const updatedAllSwipes = {
      ...movieSwipes,
      [activeKey]: updatedMySwipes
    };
    if (onSaveMovieSwipes) onSaveMovieSwipes(updatedAllSwipes);
    if (window.HapticEngine) HapticEngine.trigger('light');
    if (window.AudioEngine) AudioEngine.playTone(380);
  };

  const handleConvertPassToLike = (movieId) => {
    const updatedMySwipes = { ...mySwipes, [movieId]: 'liked' };
    const updatedAllSwipes = {
      ...movieSwipes,
      [activeKey]: updatedMySwipes
    };
    if (onSaveMovieSwipes) onSaveMovieSwipes(updatedAllSwipes);
    if (partnerSwipes[movieId] === 'liked') {
      const matched = moviesList.find(m => m.id === movieId);
      if (matched) setMatchedMovie(matched);
    }
    if (window.HapticEngine) HapticEngine.trigger('success');
    if (window.AudioEngine) AudioEngine.playTone(680);
  };

  const resolvedMyAvatar = window.resolveAvatar ? window.resolveAvatar(myAvatar, activeTraveler?.name) : (myAvatar || { iconUrl: './assets/avatars/kokomi.png' });
  const resolvedPartnerAvatar = window.resolveAvatar ? window.resolveAvatar(partnerAvatar, partnerTraveler?.name) : (partnerAvatar || { iconUrl: './assets/avatars/yae.png' });

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
          padding: '0',
          background: '#0e121e',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div className="flickswipe-header">
          <div className="flickswipe-brand">
            <div className="flickswipe-logo-badge">
              {window.Icons && <Icons.MovieDateLogo size={18} />}
            </div>
            <div>
              <div className="flickswipe-title">Movie Date</div>
              <div style={{ fontSize: '9.5px', color: 'var(--text-secondary)' }}>Couple Movies & TV Series Night</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button 
              className="flickswipe-matches-btn"
              onClick={() => setShowSearchBar(!showSearchBar)}
              style={{ background: showSearchBar ? 'rgba(248, 207, 101, 0.25)' : undefined }}
              title="Search movies & series"
            >
              {window.Icons && <Icons.Search size={12} />}
              <span>Search</span>
            </button>
            <button 
              className="flickswipe-matches-btn"
              onClick={() => setIsWatchlistOpen(true)}
            >
              {window.Icons && <Icons.Sparkles size={12} />}
              <span>{mutualMatches.length} Matches</span>
            </button>
            <button className="flickswipe-close-btn" onClick={onClose} aria-label="Close">
              {window.Icons ? <Icons.X size={14} /> : '✕'}
            </button>
          </div>
        </div>

        {/* Live Search Input Drawer */}
        {showSearchBar && (
          <form onSubmit={handleLiveSearch} style={{ display: 'flex', gap: '8px', padding: '6px 16px 10px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <input 
              type="text" 
              placeholder="Search any movie, anime or series..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '8px',
                padding: '7px 12px',
                color: '#fff',
                fontSize: '12px',
                outline: 'none'
              }}
              autoFocus
            />
            <button
              type="submit"
              disabled={isSearching}
              style={{
                background: 'var(--color-primary)',
                color: '#101428',
                border: 'none',
                borderRadius: '8px',
                padding: '7px 14px',
                fontWeight: '800',
                fontSize: '11px',
                cursor: 'pointer'
              }}
            >
              {isSearching ? '...' : 'Add to Deck'}
            </button>
          </form>
        )}

        {/* Genre & Media Type Bar */}
        <div className="flick-genre-bar">
          {GENRE_FILTERS.map(g => (
            <button
              key={g.id}
              className={`flick-genre-pill ${selectedGenre === g.id ? 'active' : ''}`}
              onClick={() => {
                setSelectedGenre(g.id);
                if (cardRef.current) {
                  cardRef.current.style.transform = 'translate3d(0, 0, 0) rotate(0deg)';
                }
              }}
            >
              {g.label}
            </button>
          ))}
        </div>

        {/* Swipe Card Deck */}
        <div className="flick-deck-container">
          {nextMovie && (
            <div 
              key={nextMovie.id}
              ref={nextCardRef}
              className="flick-card"
              style={{
                transform: 'scale(0.96) translateY(8px)',
                zIndex: 1,
                opacity: 0.8,
                filter: 'brightness(0.75)',
                willChange: 'transform, opacity'
              }}
            >
              <img 
                src={nextMovie.poster} 
                alt={nextMovie.title} 
                className="flick-card-poster"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = getThematicPosterFallback(nextMovie.title, nextMovie.genres);
                }}
              />
              <div className="flick-card-gradient" />
              <div className="flick-card-info">
                <div className="flick-title-row">
                  <span className="flick-movie-title">{nextMovie.title}</span>
                  <span className="flick-rating-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                    {window.Icons ? <Icons.Star size={11} fill="currentColor" /> : '★'}
                    <span>{nextMovie.rating}</span>
                  </span>
                </div>
              </div>
            </div>
          )}

          {currentMovie ? (
            <div 
              key={currentMovie.id}
              ref={cardRef}
              className="flick-card"
              style={{
                zIndex: 5,
                willChange: 'transform, opacity',
                touchAction: 'none'
              }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
            >
              {/* Dynamic Like/Nope Stamp */}
              <div ref={likeStampRef} className="flick-stamp like" style={{ opacity: 0 }}>
                LIKE
              </div>
              <div ref={nopeStampRef} className="flick-stamp nope" style={{ opacity: 0 }}>
                PASS
              </div>

              <img 
                src={currentMovie.poster} 
                alt={currentMovie.title} 
                className="flick-card-poster"
                draggable={false}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = getThematicPosterFallback(currentMovie.title, currentMovie.genres);
                }}
              />
              <div className="flick-card-gradient" />

              <div className="flick-card-info">
                <div className="flick-title-row">
                  <span className="flick-movie-title">{currentMovie.title}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span style={{ 
                      fontSize: '9px', 
                      background: currentMovie.mediaType === 'tv' ? 'rgba(76, 215, 182, 0.2)' : 'rgba(248, 207, 101, 0.2)', 
                      color: currentMovie.mediaType === 'tv' ? '#4cd7b6' : 'var(--color-primary)', 
                      border: `1px solid ${currentMovie.mediaType === 'tv' ? 'rgba(76, 215, 182, 0.4)' : 'rgba(248, 207, 101, 0.4)'}`,
                      padding: '2px 6px',
                      borderRadius: '5px',
                      fontWeight: '800',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '3px'
                    }}>
                      {currentMovie.mediaType === 'tv' ? (
                        <>
                          {window.Icons && <Icons.Tv size={10} />}
                          <span>SERIES</span>
                        </>
                      ) : (
                        <>
                          {window.Icons && <Icons.Film size={10} />}
                          <span>MOVIE</span>
                        </>
                      )}
                    </span>
                    <span className="flick-rating-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                      {window.Icons ? <Icons.Star size={11} fill="currentColor" /> : '★'}
                      <span>{currentMovie.rating}</span>
                    </span>
                  </div>
                </div>

                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.7)', marginBottom: '4px' }}>
                  {currentMovie.year}
                </div>

                <div className="flick-genres-list">
                  {currentMovie.genres?.map(gn => (
                    <span key={gn} className="flick-genre-tag">{gn}</span>
                  ))}
                </div>

                <div className="flick-overview">
                  {currentMovie.overview}
                </div>

                {partnerSwipes[currentMovie.id] === 'liked' && (
                  <div className="flick-partner-badge">
                    {window.Icons && <Icons.Heart size={11} />}
                    <span>{partnerTraveler?.name || 'Partner'} already liked this! Swipe Right to Match!</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flick-empty-deck">
              <div className="flick-empty-icon">
                {window.Icons ? <Icons.Film size={44} /> : '🎬'}
              </div>
              <div style={{ fontSize: '15px', fontWeight: '800', color: '#fff' }}>
                You've swiped all titles in this genre!
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', maxWidth: '280px' }}>
                Check out your mutual matches, or tap below to fetch 50+ more trending shows!
              </div>
              <div className="flick-empty-actions">
                <button 
                  className="flick-reset-btn" 
                  onClick={loadMoreTrendingShows} 
                  disabled={isFeedLoading}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--color-primary)', color: '#101428' }}
                >
                  {window.Icons && <Icons.Zap size={14} fill="currentColor" />}
                  <span>{isFeedLoading ? 'Loading...' : 'Load 50+ More Shows'}</span>
                </button>
                {passedTitles.length > 0 && (
                  <button 
                    className="flick-reset-btn" 
                    onClick={handleResetPassesOnly} 
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(248, 207, 101, 0.15)', border: '1px solid rgba(248, 207, 101, 0.35)', color: 'var(--color-primary)' }}
                  >
                    {window.Icons && <Icons.RotateCcw size={13} />}
                    <span>Re-Swipe Passed Titles ({passedTitles.length})</span>
                  </button>
                )}
                <button className="flick-reset-btn" onClick={handleResetDeck} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.06)', color: 'var(--text-secondary)' }}>
                  {window.Icons && <Icons.Refresh size={13} />}
                  <span>Reset All Swipes</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Action Controls Bar */}
        {currentMovie && (
          <div className="flick-actions-bar">
            <button 
              className="flick-action-btn rewind" 
              onClick={handleRewindLastSwipe}
              disabled={!lastSwipedMovieId}
              title="Undo last swipe"
              aria-label="Rewind"
            >
              {window.Icons ? <Icons.RotateCcw size={16} /> : '↺'}
            </button>
            <button 
              className="flick-action-btn pass" 
              onClick={() => flyCardOut('left')}
              title="Pass"
              aria-label="Pass"
            >
              {window.Icons ? <Icons.X size={20} /> : '✕'}
            </button>
            <button 
              className="flick-action-btn info" 
              onClick={() => alert(`${currentMovie.title} (${currentMovie.year})\n\nType: ${currentMovie.mediaType === 'tv' ? 'TV Series' : 'Movie'}\nRating: ⭐ ${currentMovie.rating}/10\nGenres: ${currentMovie.genres.join(', ')}\n\n${currentMovie.overview}`)}
              title="Synopsis info"
              aria-label="Info"
            >
              {window.Icons ? <Icons.Info size={17} /> : 'ℹ'}
            </button>
            <button 
              className="flick-action-btn like" 
              onClick={() => flyCardOut('right')}
              title="Like"
              aria-label="Like"
            >
              {window.Icons ? <Icons.Heart size={22} /> : '❤️'}
            </button>
          </div>
        )}

        {/* It's a Match Celebration Overlay */}
        {matchedMovie && (
          <div className="flick-match-overlay" onClick={() => setMatchedMovie(null)}>
            <div className="flick-match-title">IT'S A MATCH!</div>
            <div className="flick-match-sub">
              You and {partnerTraveler?.name || 'Partner'} both picked this {matchedMovie.mediaType === 'tv' ? 'series' : 'movie'} for Movie Date! 🎉
            </div>

            <div className="flick-match-avatars">
              <img 
                src={resolvedMyAvatar.iconUrl} 
                alt="You" 
                className="flick-match-avatar"
                onError={(e) => { e.target.onerror = null; e.target.src = './assets/avatars/kokomi.png'; }}
              />
              <img 
                src={resolvedPartnerAvatar.iconUrl} 
                alt="Partner" 
                className="flick-match-avatar" 
                style={{ marginLeft: '-14px' }}
                onError={(e) => { e.target.onerror = null; e.target.src = './assets/avatars/yae.png'; }}
              />
            </div>

            <img 
              src={matchedMovie.poster} 
              alt={matchedMovie.title} 
              className="flick-match-poster"
              onError={(e) => { e.target.onerror = null; e.target.src = getThematicPosterFallback(matchedMovie.title, matchedMovie.genres); }}
            />
            <div className="flick-match-movie-title">{matchedMovie.title}</div>

            <button 
              className="flick-reset-btn" 
              onClick={(e) => {
                e.stopPropagation();
                setMatchedMovie(null);
                setIsWatchlistOpen(true);
              }}
              style={{ padding: '12px 28px', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              {window.Icons && <Icons.Film size={14} />}
              <span>View Shared Watchlist</span>
            </button>
          </div>
        )}

        {/* Watchlist & Matches Drawer */}
        {isWatchlistOpen && (
          <div className="flick-watchlist-overlay">
            <div className="flick-watchlist-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {window.Icons ? <Icons.Clapperboard size={18} /> : <span>🎬</span>}
                <span style={{ fontSize: '15px', fontWeight: '800', color: '#fff' }}>Movie Date Watchlist</span>
              </div>
              <button 
                className="flick-close-btn" 
                onClick={() => setIsWatchlistOpen(false)} 
                aria-label="Close watchlist"
                style={{ background: 'none', border: 'none', color: '#fff', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              >
                {window.Icons ? <Icons.X size={16} /> : '✕'}
              </button>
            </div>

            <div style={{ display: 'flex', gap: '8px', padding: '10px 18px', borderBottom: '1px solid rgba(255,255,255,0.06)', overflowX: 'auto' }}>
              <button 
                className={`flick-genre-pill ${watchlistFilter === 'matches' ? 'active' : ''}`}
                onClick={() => setWatchlistFilter('matches')}
                style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                {window.Icons && <Icons.Sparkles size={12} />}
                <span>Mutual Matches ({mutualMatches.length})</span>
              </button>
              <button 
                className={`flick-genre-pill ${watchlistFilter === 'my_likes' ? 'active' : ''}`}
                onClick={() => setWatchlistFilter('my_likes')}
              >
                Your Likes
              </button>
              <button 
                className={`flick-genre-pill ${watchlistFilter === 'partner_likes' ? 'active' : ''}`}
                onClick={() => setWatchlistFilter('partner_likes')}
              >
                {partnerTraveler?.name || 'Partner'}'s Likes
              </button>
              <button 
                className={`flick-genre-pill ${watchlistFilter === 'passed' ? 'active' : ''}`}
                onClick={() => setWatchlistFilter('passed')}
                style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                {window.Icons && <Icons.X size={11} />}
                <span>Passed ({passedTitles.length})</span>
              </button>
            </div>

            {/* Passed tab Restore All Header */}
            {watchlistFilter === 'passed' && passedTitles.length > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 18px', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.15)' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                  {passedTitles.length} passed title{passedTitles.length === 1 ? '' : 's'}
                </span>
                <button
                  type="button"
                  className="flick-restore-all-btn"
                  onClick={handleResetPassesOnly}
                  title="Restore all passed titles back to active deck"
                  aria-label="Restore all passed titles"
                >
                  {window.Icons && <Icons.RotateCcw size={12} />}
                  <span>Restore All</span>
                </button>
              </div>
            )}

            <div className="flick-watchlist-list">
              {(() => {
                let list = [];
                if (watchlistFilter === 'matches') {
                  list = mutualMatches;
                } else if (watchlistFilter === 'my_likes') {
                  list = moviesList.filter(m => mySwipes[m.id] === 'liked');
                } else if (watchlistFilter === 'partner_likes') {
                  list = moviesList.filter(m => partnerSwipes[m.id] === 'liked');
                } else {
                  list = passedTitles;
                }

                if (list.length === 0) {
                  return (
                    <div style={{ textAlign: 'center', padding: '40px 10px', color: 'var(--text-secondary)', fontSize: '12px' }}>
                      {watchlistFilter === 'matches'
                        ? 'No mutual matches yet! Both of you must swipe right on the same title to match 🍿'
                        : watchlistFilter === 'passed'
                        ? 'No passed titles. Whenever you swipe left, passed titles show up here so you can change your mind!'
                        : 'No titles saved here yet.'}
                    </div>
                  );
                }

                return list.map(m => (
                  <div key={m.id} className="flick-watch-item">
                    <img 
                      src={m.poster} 
                      alt={m.title} 
                      className="flick-watch-poster"
                      onError={(e) => { e.target.onerror = null; e.target.src = getThematicPosterFallback(m.title, m.genres); }}
                    />
                    <div className="flick-watch-meta">
                      <div className="flick-watch-title">{m.title}</div>
                      <div className="flick-watch-info">
                        <span style={{ 
                          fontSize: '8.5px', 
                          background: m.mediaType === 'tv' ? 'rgba(76, 215, 182, 0.2)' : 'rgba(248, 207, 101, 0.2)', 
                          color: m.mediaType === 'tv' ? '#4cd7b6' : 'var(--color-primary)', 
                          padding: '1px 4px', 
                          borderRadius: '3px',
                          fontWeight: '800'
                        }}>
                          {m.mediaType === 'tv' ? 'SERIES' : 'MOVIE'}
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                          {window.Icons ? <Icons.Star size={10} fill="currentColor" /> : '⭐'}
                          <span>{m.rating}</span>
                        </span>
                        <span>•</span>
                        <span>{m.year}</span>
                      </div>
                      {mySwipes[m.id] === 'liked' && partnerSwipes[m.id] === 'liked' && (
                        <div style={{ marginTop: '4px' }}>
                          <span className="flick-watch-badge-match" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            {window.Icons && <Icons.Heart size={11} fill="currentColor" />}
                            <span>Mutual Match!</span>
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Unlike / Remove Button for your likes & mutual matches */}
                    {(watchlistFilter === 'my_likes' || (watchlistFilter === 'matches' && mySwipes[m.id] === 'liked')) && (
                      <button
                        type="button"
                        className="flick-watch-unlike-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveLike(m.id);
                        }}
                        title="Remove like"
                        aria-label="Unlike"
                      >
                        {window.Icons ? <Icons.HeartCrack size={13} /> : '✕'}
                        <span>Unlike</span>
                      </button>
                    )}

                    {/* Passed Items: Restore to Deck or Convert to Like */}
                    {watchlistFilter === 'passed' && (
                      <div className="flick-watch-actions">
                        <button
                          type="button"
                          className="flick-watch-unlike-btn restore"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveLike(m.id);
                          }}
                          title="Restore to active deck"
                          aria-label="Restore"
                        >
                          {window.Icons && <Icons.RotateCcw size={11} />}
                          <span>Restore</span>
                        </button>
                        <button
                          type="button"
                          className="flick-watch-unlike-btn like-action"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleConvertPassToLike(m.id);
                          }}
                          title="Change to Like"
                          aria-label="Like"
                        >
                          {window.Icons && <Icons.Heart size={11} />}
                          <span>Like</span>
                        </button>
                      </div>
                    )}
                  </div>
                ));
              })()}
            </div>

            {/* TMDB & TVmaze Required Attribution */}
            <div className="flick-disclaimer">
              This product uses the TMDB API and TVmaze API but is not endorsed or certified by TMDB.
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

window.FlickSwipeSheet = FlickSwipeSheet;
