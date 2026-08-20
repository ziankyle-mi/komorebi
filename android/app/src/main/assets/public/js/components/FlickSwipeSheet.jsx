/**
 * ✦ MOVIE DATE — UNLIMITED TINDER-STYLE COUPLE MOVIE & TV SERIES SWIPER
 * 100% ULTRA-HD OFFICIAL POSTERS + FREE INFINITE TVMAZE & MOVIE DISCOVERY ENGINE
 * 120FPS ZERO-LATENCY DIRECT-DOM GESTURE ENGINE WITH IN-MEMORY PRELOADING
 */

function getThematicPosterFallback(title = "Movie Date", genres = []) {
  const isKdrama = genres.includes("K-Drama") || genres.includes("Romance");
  const isAnime = genres.includes("Anime") || genres.includes("Animation");
  const isScifi = genres.includes("Sci-Fi") || genres.includes("Action") || genres.includes("Science-Fiction");

  let accentColor = "%23f8cf65";
  let icon = "🎬";

  if (isKdrama) {
    accentColor = "%23fb7185";
    icon = "💖";
  } else if (isAnime) {
    accentColor = "%23f8cf65";
    icon = "⛩️";
  } else if (isScifi) {
    accentColor = "%2360a5fa";
    icon = "🚀";
  }

  const encodedTitle = encodeURIComponent(title);
  const genreText = encodeURIComponent(genres.slice(0, 2).join(' • ') || "Couple Pick");

  return `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='780' height='1170' viewBox='0 0 780 1170'><rect width='780' height='1170' fill='%23121626'/><circle cx='390' cy='460' r='160' fill='${accentColor}' opacity='0.2'/><text x='390' y='490' font-size='100' text-anchor='middle'>${icon}</text><text x='390' y='680' font-family='sans-serif' font-size='42' font-weight='800' text-anchor='middle' fill='%23ffffff'>${encodedTitle}</text><text x='390' y='740' font-family='sans-serif' font-size='24' font-weight='bold' text-anchor='middle' fill='${accentColor}'>${genreText}</text><text x='390' y='800' font-family='sans-serif' font-size='20' text-anchor='middle' fill='%23a1a7c0'>✦ Komorebi Movie Date ✦</text></svg>`;
}

const DEFAULT_MOVIE_POSTER = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='780' height='1170' viewBox='0 0 780 1170'><rect width='780' height='1170' fill='%23121626'/><circle cx='390' cy='460' r='150' fill='%23f8cf65' opacity='0.18'/><text x='390' y='490' font-size='100' text-anchor='middle'>🎬</text><text x='390' y='680' font-family='sans-serif' font-size='42' font-weight='800' text-anchor='middle' fill='%23ffffff'>Komorebi Cinema</text><text x='390' y='740' font-family='sans-serif' font-size='24' text-anchor='middle' fill='%23a1a7c0'>Couple Movie & Series Night</text></svg>";

const INITIAL_COUPLE_CATALOG = [
  // --- TV SERIES, K-DRAMAS & ANIME (Official TVmaze High-Resolution Production Art) ---
  {
    id: "tv-crash-landing",
    title: "Crash Landing on You",
    mediaType: "tv",
    year: "2019 • 1 Season",
    rating: 8.8,
    genres: ["K-Drama", "Romance", "Comedy"],
    overview: "A paragliding mishap drops a South Korean heiress into North Korea—and into the life of an army officer, who decides to help her hide.",
    poster: "https://static.tvmaze.com/uploads/images/original_untouched/235/588087.jpg"
  },
  {
    id: "tv-queen-of-tears",
    title: "Queen of Tears",
    mediaType: "tv",
    year: "2024 • 1 Season",
    rating: 8.7,
    genres: ["K-Drama", "Romance", "Drama"],
    overview: "The queen of department stores and the prince of supermarkets weather a marital crisis until love miraculously begins to bloom again.",
    poster: "https://static.tvmaze.com/uploads/images/original_untouched/507/1269260.jpg"
  },
  {
    id: "tv-business-proposal",
    title: "Business Proposal",
    mediaType: "tv",
    year: "2022 • 1 Season",
    rating: 8.4,
    genres: ["K-Drama", "Romance", "Comedy"],
    overview: "In disguise as her friend, Ha-ri shows up to a blind date to scare him away. But plans go awry when he turns out to be her CEO.",
    poster: "https://static.tvmaze.com/uploads/images/original_untouched/394/986401.jpg"
  },
  {
    id: "tv-stranger-things",
    title: "Stranger Things",
    mediaType: "tv",
    year: "2016 • 4 Seasons",
    rating: 8.6,
    genres: ["Sci-Fi", "Mystery", "Drama"],
    overview: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
    poster: "https://static.tvmaze.com/uploads/images/original_untouched/595/1489169.jpg"
  },
  {
    id: "tv-arcane",
    title: "Arcane",
    mediaType: "tv",
    year: "2021 • 2 Seasons",
    rating: 9.0,
    genres: ["Anime", "Animation", "Sci-Fi", "Action"],
    overview: "Set in the utopian region of Piltover and the oppressed underground of Zaun, the story follows the origins of two iconic League champions.",
    poster: "https://static.tvmaze.com/uploads/images/original_untouched/536/1340287.jpg"
  },
  {
    id: "tv-spy-family",
    title: "Spy x Family",
    mediaType: "tv",
    year: "2022 • 2 Seasons",
    rating: 8.6,
    genres: ["Anime", "Comedy", "Action"],
    overview: "A spy on an undercover mission marries a telepathic girl and a professional assassin, with none of them knowing each other's secrets.",
    poster: "https://static.tvmaze.com/uploads/images/original_untouched/590/1477119.jpg"
  },
  {
    id: "tv-frieren",
    title: "Frieren: Beyond Journey's End",
    mediaType: "tv",
    year: "2023 • 1 Season",
    rating: 9.1,
    genres: ["Anime", "Fantasy", "Adventure"],
    overview: "An elven mage reflecting on the fleeting lives of her former human companions embarks on a new adventure across the realm.",
    poster: "https://static.tvmaze.com/uploads/images/original_untouched/479/1198409.jpg"
  },
  {
    id: "tv-demon-slayer",
    title: "Demon Slayer: Kimetsu no Yaiba",
    mediaType: "tv",
    year: "2019 • 4 Seasons",
    rating: 8.7,
    genres: ["Anime", "Action", "Fantasy"],
    overview: "A family is attacked by demons and only two members survive - Tanjiro and his sister Nezuko, who is turning into a demon herself.",
    poster: "https://static.tvmaze.com/uploads/images/original_untouched/456/1140750.jpg"
  },
  {
    id: "tv-jujutsu-kaisen",
    title: "Jujutsu Kaisen",
    mediaType: "tv",
    year: "2020 • 2 Seasons",
    rating: 8.6,
    genres: ["Anime", "Action", "Fantasy"],
    overview: "A boy swallows a cursed talisman - the finger of a demon - and becomes cursed himself.",
    poster: "https://static.tvmaze.com/uploads/images/original_untouched/608/1521905.jpg"
  },
  {
    id: "tv-attack-on-titan",
    title: "Attack on Titan",
    mediaType: "tv",
    year: "2013 • 4 Seasons",
    rating: 9.1,
    genres: ["Anime", "Action", "Fantasy"],
    overview: "After his hometown is destroyed and his mother is killed, young Eren Jaeger vows to cleanse the earth of the giant humanoid Titans.",
    poster: "https://static.tvmaze.com/uploads/images/original_untouched/632/1582290.jpg"
  },
  {
    id: "tv-last-of-us",
    title: "The Last of Us",
    mediaType: "tv",
    year: "2023 • 1 Season",
    rating: 8.6,
    genres: ["Drama", "Sci-Fi", "Action"],
    overview: "Twenty years after a fungal outbreak ravages the planet, survivors Joel and Ellie must journey across what remains of America.",
    poster: "https://static.tvmaze.com/uploads/images/original_untouched/563/1409008.jpg"
  },
  {
    id: "tv-wednesday",
    title: "Wednesday",
    mediaType: "tv",
    year: "2022 • 1 Season",
    rating: 8.1,
    genres: ["Comedy", "Fantasy", "Mystery"],
    overview: "Follows Wednesday Addams' years as a student, attempting to master her emerging psychic ability and solve a mystery.",
    poster: "https://static.tvmaze.com/uploads/images/original_untouched/586/1466410.jpg"
  },
  {
    id: "tv-bridgerton",
    title: "Bridgerton",
    mediaType: "tv",
    year: "2020 • 3 Seasons",
    rating: 7.4,
    genres: ["Romance", "Drama"],
    overview: "Wealth, lust, and betrayal set against the backdrop of Regency-era England, seen through the eyes of the powerful Bridgerton family.",
    poster: "https://static.tvmaze.com/uploads/images/original_untouched/614/1535959.jpg"
  },
  {
    id: "tv-modern-family",
    title: "Modern Family",
    mediaType: "tv",
    year: "2009 • 11 Seasons",
    rating: 8.5,
    genres: ["Comedy", "Family"],
    overview: "Three different but related families face trials and tribulations in their own uniquely comedic ways.",
    poster: "https://static.tvmaze.com/uploads/images/original_untouched/359/898320.jpg"
  },
  {
    id: "tv-avatar-airbender",
    title: "Avatar: The Last Airbender",
    mediaType: "tv",
    year: "2005 • 3 Seasons",
    rating: 8.8,
    genres: ["Anime", "Animation", "Fantasy", "Action"],
    overview: "In a war-torn world of elemental magic, a young boy reawakens to undertake a dangerous mystic quest to fulfill his destiny.",
    poster: "https://static.tvmaze.com/uploads/images/original_untouched/633/1582667.jpg"
  },

  // --- MOVIES (Official Ultra-HD 1000px Theatrical Release Posters) ---
  {
    id: "movie-your-name",
    title: "Your Name.",
    mediaType: "movie",
    year: "2016",
    rating: 8.5,
    genres: ["Anime", "Romance", "Drama"],
    overview: "High schoolers Mitsuha and Taki are complete strangers living separate lives until they suddenly switch bodies across time and space.",
    poster: "https://m.media-amazon.com/images/M/MV5BMjI1ODZkYTgtYTY3Yy00ZTJkLWFkOTgtZDUyYWM4MzQwNjk0XkEyXkFqcGc@._V1_SX1000.jpg"
  },
  {
    id: "movie-suzume",
    title: "Suzume",
    mediaType: "movie",
    year: "2022",
    rating: 7.7,
    genres: ["Anime", "Fantasy", "Adventure"],
    overview: "A modern action adventure road story where a 17-year-old girl named Suzume helps a mysterious young man close doors from disaster.",
    poster: "https://m.media-amazon.com/images/M/MV5BODhkNDhmNzktODFmMC00NDZiLWEzN2UtY2YwYzgzYTVlMWZmXkEyXkFqcGc@._V1_SX1000.jpg"
  },
  {
    id: "movie-howls-moving-castle",
    title: "Howl's Moving Castle",
    mediaType: "movie",
    year: "2004",
    rating: 8.2,
    genres: ["Anime", "Fantasy", "Adventure"],
    overview: "When an unconfident young woman is cursed with an old body by a spiteful witch, her only chance of breaking the spell lies with a self-indulgent wizard.",
    poster: "https://m.media-amazon.com/images/M/MV5BMTY1OTg0MjE3MV5BMl5BanBnXkFtZTcwNTUxMTkyMQ@@._V1_SX1000.jpg"
  },
  {
    id: "movie-spirited-away",
    title: "Spirited Away",
    mediaType: "movie",
    year: "2001",
    rating: 8.5,
    genres: ["Anime", "Fantasy", "Adventure"],
    overview: "A young girl wanders into a world ruled by gods, witches, and spirits, where humans are changed into beasts.",
    poster: "https://m.media-amazon.com/images/M/MV5BNTEyNmEwOWUtYzkyOC00ZTQ4LTllZmUtMjk0Y2YwOGUzYjRiXkEyXkFqcGc@._V1_SX1000.jpg"
  },
  {
    id: "movie-interstellar",
    title: "Interstellar",
    mediaType: "movie",
    year: "2014",
    rating: 8.7,
    genres: ["Sci-Fi", "Drama", "Adventure"],
    overview: "When Earth becomes uninhabitable, a team of explorers undertakes the most important mission in human history.",
    poster: "https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_SX1000.jpg"
  },
  {
    id: "movie-inception",
    title: "Inception",
    mediaType: "movie",
    year: "2010",
    rating: 8.8,
    genres: ["Action", "Sci-Fi", "Adventure"],
    overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea.",
    poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_QL75_UX380_CR0,0,380,562_.jpg"
  },
  {
    id: "movie-dark-knight",
    title: "The Dark Knight",
    mediaType: "movie",
    year: "2008",
    rating: 9.0,
    genres: ["Action", "Crime", "Drama"],
    overview: "When the menace known as the Joker wreaks havoc and chaos on Gotham City, Batman must accept one of the greatest tests of his ability to fight injustice.",
    poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_QL75_UX380_CR0,0,380,562_.jpg"
  },
  {
    id: "movie-about-time",
    title: "About Time",
    mediaType: "movie",
    year: "2013",
    rating: 7.8,
    genres: ["Romance", "Comedy", "Drama"],
    overview: "At the age of 21, Tim discovers he can travel in time and change what happens and has happened in his own life. His decision to make his world a better place by getting a girlfriend turns out not to be as easy as you might think.",
    poster: "https://m.media-amazon.com/images/M/MV5BMTA1ODUzMDA3NzFeQTJeQWpwZ15BbWU3MDgxMTYxNTk@._V1_SX1000.jpg"
  },
  {
    id: "movie-500-days-summer",
    title: "500 Days of Summer",
    mediaType: "movie",
    year: "2009",
    rating: 7.7,
    genres: ["Romance", "Comedy", "Drama"],
    overview: "An offbeat romantic comedy about a woman who doesn't believe true love exists, and the young man who falls for her.",
    poster: "https://m.media-amazon.com/images/M/MV5BMTk5MjM4OTU1OV5BMl5BanBnXkFtZTcwODkzNDIzMw@@._V1_SX1000.jpg"
  },
  {
    id: "movie-notebook",
    title: "The Notebook",
    mediaType: "movie",
    year: "2004",
    rating: 7.8,
    genres: ["Romance", "Drama"],
    overview: "An elderly man reads to a woman with dementia the story of two young lovers whose romance is threatened by the difference in their social classes.",
    poster: "https://m.media-amazon.com/images/M/MV5BZjE0ZjgzMzYtMTAxYi00NGMzLThmZDktNzFlMzA2MWRmYWQ0XkEyXkFqcGc@._V1_QL75_UX380_CR0,4,380,562_.jpg"
  },
  {
    id: "movie-eternal-sunshine",
    title: "Eternal Sunshine of the Spotless Mind",
    mediaType: "movie",
    year: "2004",
    rating: 8.1,
    genres: ["Romance", "Sci-Fi", "Drama"],
    overview: "When their relationship turns sour, a couple undergoes a medical procedure to have each other erased from their memories.",
    poster: "https://m.media-amazon.com/images/M/MV5BMTY4NzcwODg3Nl5BMl5BanBnXkFtZTcwNTEwOTMyMw@@._V1_SX1000.jpg"
  },
  {
    id: "movie-dnd",
    title: "Dungeons & Dragons: Honor Among Thieves",
    mediaType: "movie",
    year: "2023",
    rating: 7.4,
    genres: ["Action", "Comedy", "Adventure"],
    overview: "A charming thief and a band of unlikely adventurers undertake an epic heist to retrieve a lost relic.",
    poster: "https://m.media-amazon.com/images/M/MV5BOGRjMjQ0ZDAtODc0OS00MGY1LTkxMTMtODhhNjY5NTM4N2IwXkEyXkFqcGc@._V1_SX1000.jpg"
  },
  {
    id: "movie-parasite",
    title: "Parasite",
    mediaType: "movie",
    year: "2019",
    rating: 8.5,
    genres: ["Comedy", "Thriller", "Drama"],
    overview: "All unemployed, Ki-taek's family takes peculiar interest in the wealthy Parks until they get entangled in an unexpected incident.",
    poster: "https://m.media-amazon.com/images/M/MV5BYjk1Y2U4MjQtY2ZiNS00OWQyLWI3MmYtZWUwNmRjYWRiNWNhXkEyXkFqcGc@._V1_SX1000.jpg"
  },
  {
    id: "movie-spider-verse",
    title: "Spider-Man: Across the Spider-Verse",
    mediaType: "movie",
    year: "2023",
    rating: 8.4,
    genres: ["Animation", "Action", "Sci-Fi"],
    overview: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its existence.",
    poster: "https://m.media-amazon.com/images/M/MV5BNThiZjA3MjItZGY5Ni00ZmJhLWEwN2EtOTBlYTA4Y2E0M2ZmXkEyXkFqcGc@._V1_SX1000.jpg"
  },
  {
    id: "movie-spider-verse-1",
    title: "Spider-Man: Into the Spider-Verse",
    mediaType: "movie",
    year: "2018",
    rating: 8.4,
    genres: ["Animation", "Action", "Sci-Fi"],
    overview: "Teen Miles Morales becomes the new Spider-Man and joins other Spider-Heroes from various dimensions to stop a threat to all reality.",
    poster: "https://m.media-amazon.com/images/M/MV5BMjMwNDkxMTgzOF5BMl5BanBnXkFtZTgwNTkwNTQ3NjM@._V1_SX1000.jpg"
  },
  {
    id: "movie-avatar",
    title: "Avatar",
    mediaType: "movie",
    year: "2009",
    rating: 7.6,
    genres: ["Action", "Sci-Fi", "Adventure"],
    overview: "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between orders and protecting an alien world.",
    poster: "https://m.media-amazon.com/images/M/MV5BMDEzMmQwZjctZWU2My00MWNlLWE0NjItMDJlYTRlNGJiZjcyXkEyXkFqcGc@._V1_SX1000.jpg"
  },
  {
    id: "movie-soul",
    title: "Soul",
    mediaType: "movie",
    year: "2020",
    rating: 8.1,
    genres: ["Animation", "Comedy", "Fantasy"],
    overview: "A jazz musician who has lost his passion is transported out of his body and must find his way back.",
    poster: "https://m.media-amazon.com/images/M/MV5BZTZkYjA5MDEtMjY1ZC00ODk5LThjOTUtZDYxODEzYWNjMTU2XkEyXkFqcGc@._V1_SX1000.jpg"
  },
  {
    id: "movie-coco",
    title: "Coco",
    mediaType: "movie",
    year: "2017",
    rating: 8.4,
    genres: ["Animation", "Comedy", "Family", "Fantasy"],
    overview: "Aspiring musician Miguel, confronted with his family's ancestral ban on music, enters the Land of the Dead to find his great-great-grandfather.",
    poster: "https://m.media-amazon.com/images/M/MV5BMDIyM2E2NTAtMzlhNy00ZGUxLWI1NjgtZDY5MzhiMDc5NGU3XkEyXkFqcGc@._V1_QL75_UY562_CR7,0,380,562_.jpg"
  },
  {
    id: "movie-dune-2",
    title: "Dune: Part Two",
    mediaType: "movie",
    year: "2024",
    rating: 8.2,
    genres: ["Sci-Fi", "Adventure", "Action"],
    overview: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    poster: "https://m.media-amazon.com/images/M/MV5BNTc0YmQxMjEtODI5MC00NjFiLTlkMWUtOGQ5NjFmYWUyZGJhXkEyXkFqcGc@._V1_SX1000.jpg"
  },
  {
    id: "movie-lion-king",
    title: "The Lion King",
    mediaType: "movie",
    year: "1994",
    rating: 8.3,
    genres: ["Animation", "Drama", "Family"],
    overview: "A young lion prince flees his kingdom only to learn the true meaning of responsibility and bravery.",
    poster: "https://m.media-amazon.com/images/M/MV5BZGRiZDZhZjItM2M3ZC00Y2IyLTk3Y2MtMWY5YjliNDFkZTJlXkEyXkFqcGc@._V1_SX1000.jpg"
  },
  {
    id: "movie-titanic",
    title: "Titanic",
    mediaType: "movie",
    year: "1997",
    rating: 7.9,
    genres: ["Drama", "Romance"],
    overview: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
    poster: "https://m.media-amazon.com/images/M/MV5BYzYyN2FiZmUtYWYzMy00MzViLWJkZTMtOGY1ZjgzNWMwN2YxXkEyXkFqcGc@._V1_SX1000.jpg"
  },
  {
    id: "movie-lala-land",
    title: "La La Land",
    mediaType: "movie",
    year: "2016",
    rating: 8.0,
    genres: ["Comedy", "Drama", "Romance"],
    overview: "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations.",
    poster: "https://m.media-amazon.com/images/M/MV5BMzUzNDM2NzM2MV5BMl5BanBnXkFtZTgwNTM3NTg4OTE@._V1_SX1000.jpg"
  },
  {
    id: "movie-everything-everywhere",
    title: "Everything Everywhere All at Once",
    mediaType: "movie",
    year: "2022",
    rating: 7.8,
    genres: ["Action", "Adventure", "Comedy", "Sci-Fi"],
    overview: "A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save existence by exploring other universes.",
    poster: "https://m.media-amazon.com/images/M/MV5BOWNmMzAzZmQtNDQ1NC00Nzk5LTkyMmUtNGI2N2NkOWM4MzEyXkEyXkFqcGc@._V1_SX1000.jpg"
  },
  {
    id: "movie-oppenheimer",
    title: "Oppenheimer",
    mediaType: "movie",
    year: "2023",
    rating: 8.8,
    genres: ["Biography", "Drama", "History"],
    overview: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
    poster: "https://m.media-amazon.com/images/M/MV5BN2JkMDc5MGQtZjg3YS00NmFiLWIyZmQtZTJmNTM5MjVmYTQ4XkEyXkFqcGc@._V1_SX1000.jpg"
  }
];

const CURATED_COUPLE_MOVIES = INITIAL_COUPLE_CATALOG;

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
  const [moviesList, setMoviesList] = useState(INITIAL_COUPLE_CATALOG);
  const [matchedMovie, setMatchedMovie] = useState(null);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);
  const [watchlistFilter, setWatchlistFilter] = useState('matches');
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

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

  // Free API Discovery: Load 50+ Trending Shows from TVmaze
  const loadMoreTrendingShows = async () => {
    if (isFeedLoading) return;
    setIsFeedLoading(true);
    try {
      const nextPage = feedPage + 1;
      const res = await fetch(`https://api.tvmaze.com/shows?page=${nextPage}`);
      if (!res.ok) throw new Error("Could not load shows");
      const list = await res.json();
      
      const newItems = list
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

      setMoviesList(prev => {
        const existingIds = new Set(prev.map(p => p.id));
        const added = newItems.filter(it => !existingIds.has(it.id));
        return [...prev, ...added];
      });
      setFeedPage(nextPage);
    } catch (e) {
      console.warn("TVmaze auto-feed fallback:", e);
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

    setIsAnimatingOut(false);
  };

  // Hardware-accelerated smooth fly-out
  const flyCardOut = (direction) => {
    if (!currentMovie || isAnimatingOut) return;
    setIsAnimatingOut(true);
    const cardEl = cardRef.current;
    const nextCardEl = nextCardRef.current;
    const likeStamp = likeStampRef.current;
    const nopeStamp = nopeStampRef.current;
    const targetMovie = currentMovie;

    const throwX = direction === 'right' ? window.innerWidth * 1.3 : -window.innerWidth * 1.3;
    const throwRotate = direction === 'right' ? 32 : -32;

    if (cardEl) {
      cardEl.style.transition = 'transform 0.32s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.32s ease-out';
      cardEl.style.transform = `translate3d(${throwX}px, -40px, 0) rotate(${throwRotate}deg)`;
      cardEl.style.opacity = '0';
    }

    if (direction === 'right' && likeStamp) likeStamp.style.opacity = '1';
    if (direction === 'left' && nopeStamp) nopeStamp.style.opacity = '1';

    if (nextCardEl) {
      nextCardEl.style.transition = 'transform 0.32s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.32s ease-out';
      nextCardEl.style.transform = 'scale(1) translateY(0)';
      nextCardEl.style.opacity = '1';
      nextCardEl.style.filter = 'brightness(1)';
    }

    setTimeout(() => {
      commitSwipe(direction, targetMovie);
      if (cardEl) {
        cardEl.style.transition = 'none';
        cardEl.style.transform = 'translate3d(0,0,0) rotate(0deg)';
        cardEl.style.opacity = '1';
      }
      if (likeStamp) likeStamp.style.opacity = '0';
      if (nopeStamp) nopeStamp.style.opacity = '0';
    }, 320);
  };

  // Direct-DOM Pointer Drag Handler (60/120fps smooth)
  const onPointerDown = (e) => {
    if (isAnimatingOut || !currentMovie) return;
    e.preventDefault();
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
    if (!g.isDragging || isAnimatingOut) return;

    const now = performance.now();
    const dt = now - g.lastTime;
    if (dt > 10) {
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
      const rot = (dx / (window.innerWidth || 400)) * 26;

      if (cardRef.current) {
        cardRef.current.style.transform = `translate3d(${dx}px, ${dy * 0.4}px, 0) rotate(${rot}deg)`;
      }

      // Stamps opacity
      const likeOpacity = Math.min(1, Math.max(0, dx / 75));
      const nopeOpacity = Math.min(1, Math.max(0, -dx / 75));
      if (likeStampRef.current) likeStampRef.current.style.opacity = likeOpacity;
      if (nopeStampRef.current) nopeStampRef.current.style.opacity = nopeOpacity;

      // Scale up background card smoothly
      if (nextCardRef.current) {
        const progress = Math.min(1, Math.abs(dx) / 180);
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
    if (!g.isDragging || isAnimatingOut) return;
    g.isDragging = false;

    if (e.target && e.target.releasePointerCapture) {
      try { e.target.releasePointerCapture(e.pointerId); } catch (_) {}
    }

    const dx = g.currentX - g.startX;
    const isFlickFast = Math.abs(g.velocityX) > 0.45;
    const threshold = 90;

    if (dx > threshold || (isFlickFast && g.velocityX > 0)) {
      flyCardOut('right');
    } else if (dx < -threshold || (isFlickFast && g.velocityX < 0)) {
      flyCardOut('left');
    } else {
      // Elastic rubber-band spring recovery
      if (cardRef.current) {
        cardRef.current.style.transition = 'transform 0.42s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s ease';
        cardRef.current.style.transform = 'translate3d(0, 0, 0) rotate(0deg)';
      }
      if (likeStampRef.current) likeStampRef.current.style.opacity = '0';
      if (nopeStampRef.current) nopeStampRef.current.style.opacity = '0';
      if (nextCardRef.current) {
        nextCardRef.current.style.transition = 'transform 0.42s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s ease';
        nextCardRef.current.style.transform = 'scale(0.94) translateY(14px)';
        nextCardRef.current.style.opacity = '0.75';
        nextCardRef.current.style.filter = 'brightness(0.7)';
      }
    }
  };

  const handleResetDeck = () => {
    const updated = { ...movieSwipes, [activeKey]: {} };
    if (onSaveMovieSwipes) onSaveMovieSwipes(updated);
  };

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
              ref={nextCardRef}
              className="flick-card"
              style={{
                transform: 'scale(0.94) translateY(14px)',
                zIndex: 1,
                opacity: 0.75,
                filter: 'brightness(0.7)',
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
                  <span className="flick-rating-badge">★ {nextMovie.rating}</span>
                </div>
              </div>
            </div>
          )}

          {currentMovie ? (
            <div 
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
                LIKE ❤️
              </div>
              <div ref={nopeStampRef} className="flick-stamp nope" style={{ opacity: 0 }}>
                PASS ✕
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
                Check out your mutual matches, or tap below to fetch 50+ more trending shows!
              </div>
              <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                <button 
                  className="flick-reset-btn" 
                  onClick={loadMoreTrendingShows} 
                  disabled={isFeedLoading}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--color-primary)', color: '#101428' }}
                >
                  <span>⚡</span>
                  <span>{isFeedLoading ? 'Loading...' : 'Load 50+ More Shows'}</span>
                </button>
                <button className="flick-reset-btn" onClick={handleResetDeck} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  {window.Icons && <Icons.Refresh size={13} />}
                  <span>Reset Deck</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Action Controls Bar */}
        {currentMovie && (
          <div className="flick-actions-bar">
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

            {/* TMDB & TVmaze Required Attribution */}
            <div className="flick-disclaimer">
              This product uses the TMDB API and TVmaze API but is not endorsed or certified by TMDB.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

window.FlickSwipeSheet = FlickSwipeSheet;
window.CURATED_COUPLE_MOVIES = CURATED_COUPLE_MOVIES;
