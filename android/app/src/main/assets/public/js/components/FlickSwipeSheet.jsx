/**
 * ✦ FLICKSWIPE — TINDER-STYLE COUPLE MOVIE & TV SERIES SWIPER & MATCH ENGINE
 */

const DEFAULT_MOVIE_POSTER = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='780' height='1170' viewBox='0 0 780 1170'><rect width='780' height='1170' fill='%23131728'/><circle cx='390' cy='450' r='140' fill='%23f8cf65' opacity='0.15'/><text x='390' y='470' font-size='100' text-anchor='middle' fill='%23f8cf65'>🎬</text><text x='390' y='650' font-family='sans-serif' font-size='42' font-weight='bold' text-anchor='middle' fill='%23ffffff'>Komorebi Cinema</text><text x='390' y='710' font-family='sans-serif' font-size='26' text-anchor='middle' fill='%23a1a7c0'>Couple Movie & Series Night</text></svg>";

const CURATED_COUPLE_MOVIES = [
  // --- TV SERIES & K-DRAMAS & ANIME ---
  {
    id: "tv-85937",
    title: "Crash Landing on You",
    mediaType: "tv",
    year: "2019 • 1 Season",
    rating: 8.8,
    genres: ["K-Drama", "Romance", "Comedy"],
    overview: "A paragliding mishap drops a South Korean heiress into North Korea—and into the life of an army officer, who decides to help her hide.",
    poster: "https://image.tmdb.org/t/p/w780/bvB9f2j6bVj6Y1bA7Y5qG0K1M6V.jpg"
  },
  {
    id: "tv-66732",
    title: "Stranger Things",
    mediaType: "tv",
    year: "2016 • 4 Seasons",
    rating: 8.6,
    genres: ["Sci-Fi", "Mystery", "Drama"],
    overview: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
    poster: "https://image.tmdb.org/t/p/w780/49WJfeN0moxb9IPfGn8AIqMGskD.jpg"
  },
  {
    id: "tv-218230",
    title: "Queen of Tears",
    mediaType: "tv",
    year: "2024 • 1 Season",
    rating: 8.7,
    genres: ["K-Drama", "Romance", "Drama"],
    overview: "The queen of department stores and the prince of supermarkets weather a marital crisis until love miraculously begins to bloom again.",
    poster: "https://image.tmdb.org/t/p/w780/vmU1R5q8s1FhQ5v9v4Jqf2rR5y.jpg"
  },
  {
    id: "tv-94605",
    title: "Arcane",
    mediaType: "tv",
    year: "2021 • 2 Seasons",
    rating: 9.0,
    genres: ["Anime", "Animation", "Sci-Fi", "Action"],
    overview: "Set in the utopian region of Piltover and the oppressed underground of Zaun, the story follows the origins of two iconic League champions-and the power that will tear them apart.",
    poster: "https://image.tmdb.org/t/p/w780/abPQHGQp58gPsmFf58b0fG.jpg"
  },
  {
    id: "tv-120089",
    title: "Spy x Family",
    mediaType: "tv",
    year: "2022 • 2 Seasons",
    rating: 8.6,
    genres: ["Anime", "Comedy", "Action"],
    overview: "A spy on an undercover mission marries a telepathic girl and a professional assassin, with none of them knowing each other's secrets.",
    poster: "https://image.tmdb.org/t/p/w780/7BsvM0qF0rF1P1aA4oW9QZq5.jpg"
  },
  {
    id: "tv-209867",
    title: "Frieren: Beyond Journey's End",
    mediaType: "tv",
    year: "2023 • 1 Season",
    rating: 9.1,
    genres: ["Anime", "Fantasy", "Adventure"],
    overview: "An elven mage reflecting on the fleeting lives of her former human companions embarks on a new adventure across the realm.",
    poster: "https://image.tmdb.org/t/p/w780/dqZENchTd7lp5z6Gkyq5.jpg"
  },
  {
    id: "tv-100088",
    title: "The Last of Us",
    mediaType: "tv",
    year: "2023 • 1 Season",
    rating: 8.6,
    genres: ["Drama", "Sci-Fi", "Action"],
    overview: "Twenty years after a fungal outbreak ravages the planet, survivors Joel and Ellie must journey across what remains of America.",
    poster: "https://image.tmdb.org/t/p/w780/uKvVjK1q7i5f5mK.jpg"
  },
  {
    id: "tv-154825",
    title: "Business Proposal",
    mediaType: "tv",
    year: "2022 • 1 Season",
    rating: 8.4,
    genres: ["K-Drama", "Romance", "Comedy"],
    overview: "In disguise as her friend, Ha-ri shows up to a blind date to scare him away. But plans go awry when he turns out to be her CEO.",
    poster: "https://image.tmdb.org/t/p/w780/5pB9V9xGZzK9.jpg"
  },
  {
    id: "tv-1434",
    title: "Modern Family",
    mediaType: "tv",
    year: "2009 • 11 Seasons",
    rating: 8.5,
    genres: ["Comedy", "Family"],
    overview: "Three different but related families face trials and tribulations in their own uniquely comedic ways.",
    poster: "https://image.tmdb.org/t/p/w780/f7db0O6X5JbK9b8.jpg"
  },
  {
    id: "tv-19885",
    title: "Sherlock",
    mediaType: "tv",
    year: "2010 • 4 Seasons",
    rating: 8.5,
    genres: ["Mystery", "Crime", "Drama"],
    overview: "A modern update finds the famous sleuth and his doctor partner solving crime in 21st century London.",
    poster: "https://image.tmdb.org/t/p/w780/7WTsnDMafAWh9tTsT2.jpg"
  },
  {
    id: "tv-246",
    title: "Avatar: The Last Airbender",
    mediaType: "tv",
    year: "2005 • 3 Seasons",
    rating: 8.8,
    genres: ["Animation", "Fantasy", "Action"],
    overview: "In a war-torn world of elemental magic, a young boy reawakens to undertake a dangerous mystic quest to fulfill his destiny as the Avatar.",
    poster: "https://image.tmdb.org/t/p/w780/cHFZAew7taX.jpg"
  },

  // --- MOVIES ---
  {
    id: "movie-372058",
    title: "Your Name.",
    mediaType: "movie",
    year: "2016",
    rating: 8.5,
    genres: ["Anime", "Romance", "Drama"],
    overview: "High schoolers Mitsuha and Taki are complete strangers living separate lives until they suddenly switch bodies across time and space.",
    poster: "https://image.tmdb.org/t/p/w780/q719qXXEzOoYaps6qFsxWa9HqMw.jpg"
  },
  {
    id: "movie-157336",
    title: "Interstellar",
    mediaType: "movie",
    year: "2014",
    rating: 8.7,
    genres: ["Sci-Fi", "Drama", "Adventure"],
    overview: "When Earth becomes uninhabitable, a team of explorers undertakes the most important mission in human history: traveling beyond our galaxy.",
    poster: "https://image.tmdb.org/t/p/w780/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
  },
  {
    id: "movie-129",
    title: "Spirited Away",
    mediaType: "movie",
    year: "2001",
    rating: 8.5,
    genres: ["Anime", "Fantasy", "Adventure"],
    overview: "A young girl wanders into a world ruled by gods, witches, and spirits, where humans are changed into beasts.",
    poster: "https://image.tmdb.org/t/p/w780/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg"
  },
  {
    id: "movie-38",
    title: "Eternal Sunshine of the Spotless Mind",
    mediaType: "movie",
    year: "2004",
    rating: 8.1,
    genres: ["Romance", "Sci-Fi", "Drama"],
    overview: "When their relationship turns sour, a couple undergoes a medical procedure to have each other erased from their memories.",
    poster: "https://image.tmdb.org/t/p/w780/5MwkWH9tYHv3mV9OdYTMR5qreIz.jpg"
  },
  {
    id: "movie-493529",
    title: "Dungeons & Dragons: Honor Among Thieves",
    mediaType: "movie",
    year: "2023",
    rating: 7.4,
    genres: ["Action", "Comedy", "Adventure"],
    overview: "A charming thief and a band of unlikely adventurers undertake an epic heist to retrieve a lost relic.",
    poster: "https://image.tmdb.org/t/p/w780/A7LQDxwG4fKzZ8kC3p1d1W5Qj3.jpg"
  },
  {
    id: "movie-496243",
    title: "Parasite",
    mediaType: "movie",
    year: "2019",
    rating: 8.5,
    genres: ["Comedy", "Thriller", "Drama"],
    overview: "All unemployed, Ki-taek's family takes peculiar interest in the wealthy Parks for their livelihood until they get entangled in an unexpected incident.",
    poster: "https://image.tmdb.org/t/p/w780/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg"
  },
  {
    id: "movie-569094",
    title: "Spider-Man: Across the Spider-Verse",
    mediaType: "movie",
    year: "2023",
    rating: 8.4,
    genres: ["Animation", "Action", "Sci-Fi"],
    overview: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.",
    poster: "https://image.tmdb.org/t/p/w780/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg"
  },
  {
    id: "movie-19995",
    title: "Avatar",
    mediaType: "movie",
    year: "2009",
    rating: 7.6,
    genres: ["Action", "Sci-Fi", "Adventure"],
    overview: "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting an alien world.",
    poster: "https://image.tmdb.org/t/p/w780/kyeqWdyUXW608qlYkRqosgbbJyK.jpg"
  },
  {
    id: "movie-508442",
    title: "Soul",
    mediaType: "movie",
    year: "2020",
    rating: 8.1,
    genres: ["Animation", "Comedy", "Fantasy"],
    overview: "A jazz musician who has lost his passion for music is transported out of his body and must find his way back with the help of an infant soul.",
    poster: "https://image.tmdb.org/t/p/w780/hm58Jw4Lw8OIiv9I07AHguqqDXK.jpg"
  },
  {
    id: "movie-693134",
    title: "Dune: Part Two",
    mediaType: "movie",
    year: "2024",
    rating: 8.2,
    genres: ["Sci-Fi", "Adventure", "Action"],
    overview: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    poster: "https://image.tmdb.org/t/p/w780/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg"
  },
  {
    id: "movie-8587",
    title: "The Lion King",
    mediaType: "movie",
    year: "1994",
    rating: 8.3,
    genres: ["Animation", "Drama", "Family"],
    overview: "A young lion prince flees his kingdom only to learn the true meaning of responsibility and bravery.",
    poster: "https://image.tmdb.org/t/p/w780/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg"
  },
  {
    id: "movie-597",
    title: "Titanic",
    mediaType: "movie",
    year: "1997",
    rating: 7.9,
    genres: ["Drama", "Romance"],
    overview: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
    poster: "https://image.tmdb.org/t/p/w780/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg"
  }
];

const GENRE_FILTERS = [
  { id: 'all', label: '✦ All Shows & Movies' },
  { id: 'tv', label: '📺 TV Series' },
  { id: 'movie', label: '🎬 Movies' },
  { id: 'K-Drama', label: '🌸 K-Dramas' },
  { id: 'Anime', label: '⛩️ Anime' },
  { id: 'Romance', label: '💖 Romance' },
  { id: 'Sci-Fi', label: '🚀 Sci-Fi' },
  { id: 'Action', label: '⚡ Action' },
  { id: 'Comedy', label: '🍿 Comedy' },
  { id: 'Fantasy', label: '✨ Fantasy' }
];

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

  const [selectedGenre, setSelectedGenre] = useState('all');
  const [moviesList, setMoviesList] = useState(CURATED_COUPLE_MOVIES);
  const [matchedMovie, setMatchedMovie] = useState(null);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);
  const [watchlistFilter, setWatchlistFilter] = useState('matches');

  // Swipe Animation & Gesture State
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [flyDirection, setFlyDirection] = useState(null); // 'right' | 'left' | null
  const dragStartRef = useRef({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const activeKey = (activeTraveler?.name || 'ziankyle').toLowerCase();
  const partnerKey = (partnerTraveler?.name || 'mikkie').toLowerCase();

  const mySwipes = movieSwipes[activeKey] || {};
  const partnerSwipes = movieSwipes[partnerKey] || {};

  // Filter movies and tv series by genre / mediaType
  const filteredMovies = useMemo(() => {
    if (selectedGenre === 'all') return moviesList;
    if (selectedGenre === 'tv') return moviesList.filter(m => m.mediaType === 'tv');
    if (selectedGenre === 'movie') return moviesList.filter(m => m.mediaType === 'movie');
    return moviesList.filter(m => m.genres && m.genres.includes(selectedGenre));
  }, [selectedGenre, moviesList]);

  // Unswiped items in deck
  const activeDeck = useMemo(() => {
    return filteredMovies.filter(m => !mySwipes[m.id]);
  }, [filteredMovies, mySwipes]);

  const currentMovie = activeDeck[0] || null;
  const nextMovie = activeDeck[1] || null;

  // Mutual matches list
  const mutualMatches = useMemo(() => {
    return moviesList.filter(m => mySwipes[m.id] === 'liked' && partnerSwipes[m.id] === 'liked');
  }, [moviesList, mySwipes, partnerSwipes]);

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

    if (onSaveMovieSwipes) {
      onSaveMovieSwipes(updatedAllSwipes);
    }

    // Check for Mutual Match!
    if (isLiked && partnerSwipes[movieToSwipe.id] === 'liked') {
      setMatchedMovie(movieToSwipe);
      if (window.AudioEngine) AudioEngine.playTone(880);
    }

    setFlyDirection(null);
    setDragOffset({ x: 0, y: 0 });
    setIsDragging(false);
  };

  const triggerFlySwipe = (direction) => {
    if (!currentMovie || flyDirection) return;
    setFlyDirection(direction);
    const targetMovie = currentMovie;
    setTimeout(() => {
      commitSwipe(direction, targetMovie);
    }, 240);
  };

  // Unified Pointer Gestures (Touch + Mouse)
  const handlePointerDown = (e) => {
    if (flyDirection) return;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    setIsDragging(true);
    if (e.target && e.target.setPointerCapture) {
      try { e.target.setPointerCapture(e.pointerId); } catch (_) {}
    }
  };

  const handlePointerMove = (e) => {
    if (!isDragging || flyDirection) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setDragOffset({ x: dx, y: dy });
  };

  const handlePointerUp = (e) => {
    if (!isDragging || flyDirection) return;
    setIsDragging(false);
    if (e.target && e.target.releasePointerCapture) {
      try { e.target.releasePointerCapture(e.pointerId); } catch (_) {}
    }

    const threshold = 85;
    if (dragOffset.x > threshold) {
      triggerFlySwipe('right');
    } else if (dragOffset.x < -threshold) {
      triggerFlySwipe('left');
    } else {
      setDragOffset({ x: 0, y: 0 });
    }
  };

  const handleResetDeck = () => {
    const updated = { ...movieSwipes, [activeKey]: {} };
    if (onSaveMovieSwipes) onSaveMovieSwipes(updated);
  };

  // Calculate Card Transform
  let cardTransform = 'translate3d(0, 0, 0) rotate(0deg)';
  let cardTransition = 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.28s ease-out';
  let cardOpacity = 1;

  if (flyDirection === 'right') {
    cardTransform = 'translate3d(550px, -40px, 0) rotate(26deg)';
    cardOpacity = 0;
  } else if (flyDirection === 'left') {
    cardTransform = 'translate3d(-550px, -40px, 0) rotate(-26deg)';
    cardOpacity = 0;
  } else if (isDragging) {
    const rotationDeg = dragOffset.x * 0.08;
    cardTransform = `translate3d(${dragOffset.x}px, ${dragOffset.y * 0.4}px, 0) rotate(${rotationDeg}deg)`;
    cardTransition = 'none';
  }

  const likeOpacity = flyDirection === 'right' ? 1 : Math.min(1, Math.max(0, dragOffset.x / 70));
  const nopeOpacity = flyDirection === 'left' ? 1 : Math.min(1, Math.max(0, -dragOffset.x / 70));

  const resolvedMyAvatar = window.resolveAvatar ? window.resolveAvatar(myAvatar, activeTraveler?.name) : (myAvatar || { iconUrl: './assets/avatars/kokomi.png' });
  const resolvedPartnerAvatar = window.resolveAvatar ? window.resolveAvatar(partnerAvatar, partnerTraveler?.name) : (partnerAvatar || { iconUrl: './assets/avatars/yae.png' });

  return (
    <div className="flickswipe-sheet-overlay" onClick={onClose}>
      <div 
        className="flickswipe-sheet-surface" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flickswipe-header">
          <div className="flickswipe-brand">
            <div className="flickswipe-logo-badge">
              {window.Icons && <Icons.Clapperboard size={16} />}
            </div>
            <div>
              <div className="flickswipe-title">Movie Date</div>
              <div style={{ fontSize: '9.5px', color: 'var(--text-secondary)' }}>Couple Movies & TV Series Night</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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

        {/* Genre & Media Type Bar */}
        <div className="flick-genre-bar">
          {GENRE_FILTERS.map(g => (
            <button
              key={g.id}
              className={`flick-genre-pill ${selectedGenre === g.id ? 'active' : ''}`}
              onClick={() => {
                setSelectedGenre(g.id);
                setDragOffset({ x: 0, y: 0 });
                setFlyDirection(null);
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
              className="flick-card"
              style={{
                transform: 'scale(0.95) translateY(14px)',
                zIndex: 1,
                opacity: 0.75,
                filter: 'brightness(0.7)'
              }}
            >
              <img 
                src={nextMovie.poster} 
                alt={nextMovie.title} 
                className="flick-card-poster"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = DEFAULT_MOVIE_POSTER;
                }}
              />
              <div className="flick-card-gradient" />
              <div className="flick-card-info">
                <div className="flick-title-row">
                  <span className="flick-movie-title">{nextMovie.title}</span>
                  <span className="flick-rating-badge">⭐ {nextMovie.rating}</span>
                </div>
              </div>
            </div>
          )}

          {currentMovie ? (
            <div 
              ref={cardRef}
              className="flick-card"
              style={{
                transform: cardTransform,
                transition: cardTransition,
                opacity: cardOpacity,
                zIndex: 5
              }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              {/* Dynamic Like/Nope Stamp */}
              <div className="flick-stamp like" style={{ opacity: likeOpacity }}>
                LIKE ❤️
              </div>
              <div className="flick-stamp nope" style={{ opacity: nopeOpacity }}>
                PASS ✕
              </div>

              <img 
                src={currentMovie.poster} 
                alt={currentMovie.title} 
                className="flick-card-poster"
                draggable={false}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = DEFAULT_MOVIE_POSTER;
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
                    <span className="flick-rating-badge">★ {currentMovie.rating}</span>
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
                Check out your mutual matches in the top right, switch genres, or reset your deck to swipe again.
              </div>
              <button className="flick-reset-btn" onClick={handleResetDeck} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                {window.Icons && <Icons.Refresh size={13} />}
                <span>Reset & Swipe Again</span>
              </button>
            </div>
          )}
        </div>

        {/* Action Controls Bar */}
        {currentMovie && (
          <div className="flick-actions-bar">
            <button 
              className="flick-action-btn pass" 
              onClick={() => triggerFlySwipe('left')}
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
              onClick={() => triggerFlySwipe('right')}
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
              onError={(e) => { e.target.onerror = null; e.target.src = DEFAULT_MOVIE_POSTER; }}
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
              <button className="flick-close-btn" onClick={() => setIsWatchlistOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '18px', cursor: 'pointer' }}>
                {window.Icons ? <Icons.X size={16} /> : '✕'}
              </button>
            </div>

            <div style={{ display: 'flex', gap: '8px', padding: '10px 18px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <button 
                className={`flick-genre-pill ${watchlistFilter === 'matches' ? 'active' : ''}`}
                onClick={() => setWatchlistFilter('matches')}
              >
                ✨ Mutual Matches ({mutualMatches.length})
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
            </div>

            <div className="flick-watchlist-list">
              {(() => {
                let list = [];
                if (watchlistFilter === 'matches') {
                  list = mutualMatches;
                } else if (watchlistFilter === 'my_likes') {
                  list = moviesList.filter(m => mySwipes[m.id] === 'liked');
                } else {
                  list = moviesList.filter(m => partnerSwipes[m.id] === 'liked');
                }

                if (list.length === 0) {
                  return (
                    <div style={{ textAlign: 'center', padding: '40px 10px', color: 'var(--text-secondary)', fontSize: '12px' }}>
                      {watchlistFilter === 'matches'
                        ? 'No mutual matches yet! Both of you must swipe right on the same title to match 🍿'
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
                      onError={(e) => { e.target.onerror = null; e.target.src = DEFAULT_MOVIE_POSTER; }}
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
                        <span>⭐ {m.rating}</span>
                        <span>•</span>
                        <span>{m.year}</span>
                      </div>
                      {mySwipes[m.id] === 'liked' && partnerSwipes[m.id] === 'liked' && (
                        <div style={{ marginTop: '4px' }}>
                          <span className="flick-watch-badge-match">💖 Mutual Match!</span>
                        </div>
                      )}
                    </div>
                  </div>
                ));
              })()}
            </div>

            {/* TMDB Required Attribution */}
            <div className="flick-disclaimer">
              This product uses the TMDB API but is not endorsed or certified by TMDB.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

window.FlickSwipeSheet = FlickSwipeSheet;
window.CURATED_COUPLE_MOVIES = CURATED_COUPLE_MOVIES;
