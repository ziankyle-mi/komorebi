/**
 * ✦ KOMOREBI — CURATED COUPLE MOVIE & TV SERIES CATALOG
 * High-Resolution TMDB & TVmaze Production Art Fallbacks
 */

function getThematicPosterFallback(title = "Movie Date", genres = []) {
  const isKdrama = genres.includes("K-Drama") || genres.includes("Romance");
  const isAnime = genres.includes("Anime") || genres.includes("Animation");
  const isScifi = genres.includes("Sci-Fi") || genres.includes("Action") || genres.includes("Science-Fiction");

  let accentColor = "%23f8cf65";

  if (isKdrama) {
    accentColor = "%23fb7185";
  } else if (isAnime) {
    accentColor = "%23fca5c9";
  } else if (isScifi) {
    accentColor = "%2360a5fa";
  }

  const encodedTitle = encodeURIComponent(title.length > 28 ? title.substring(0, 26) + "..." : title);
  const genreText = encodeURIComponent(genres.slice(0, 2).join(' • ') || "Couple Pick");

  return `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='780' height='1170' viewBox='0 0 780 1170'><defs><linearGradient id='bg' x1='0%25' y1='0%25' x2='100%25' y2='100%25'><stop offset='0%25' stop-color='%23181d33'/><stop offset='100%25' stop-color='%230e1120'/></linearGradient><radialGradient id='glow' cx='50%25' cy='42%25' r='50%25'><stop offset='0%25' stop-color='${accentColor}' stop-opacity='0.25'/><stop offset='100%25' stop-color='%23000000' stop-opacity='0'/></radialGradient></defs><rect width='780' height='1170' fill='url(%23bg)'/><rect width='780' height='1170' fill='url(%23glow)'/><rect x='40' y='40' width='700' height='1090' rx='28' fill='none' stroke='%23ffffff' stroke-opacity='0.08' stroke-width='2'/><circle cx='390' cy='460' r='140' fill='none' stroke='${accentColor}' stroke-width='2.5' stroke-dasharray='12 8'/><circle cx='390' cy='460' r='110' fill='${accentColor}' fill-opacity='0.06' stroke='${accentColor}' stroke-opacity='0.4' stroke-width='1.5'/><circle cx='390' cy='460' r='30' fill='${accentColor}' fill-opacity='0.3'/><polygon points='380,442 408,460 380,478' fill='${accentColor}'/><text x='390' y='690' font-family='sans-serif' font-size='44' font-weight='800' text-anchor='middle' fill='%23ffffff'>${encodedTitle}</text><text x='390' y='750' font-family='sans-serif' font-size='22' font-weight='700' text-anchor='middle' fill='${accentColor}' letter-spacing='2'>${genreText}</text><text x='390' y='810' font-family='sans-serif' font-size='16' text-anchor='middle' fill='%238e95b3' letter-spacing='3'>✦ KOMOREBI CINEMA NIGHT ✦</text></svg>`;
}

const DEFAULT_MOVIE_POSTER = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='780' height='1170' viewBox='0 0 780 1170'><defs><linearGradient id='bg' x1='0%25' y1='0%25' x2='100%25' y2='100%25'><stop offset='0%25' stop-color='%23181d33'/><stop offset='100%25' stop-color='%230e1120'/></linearGradient></defs><rect width='780' height='1170' fill='url(%23bg)'/><rect x='40' y='40' width='700' height='1090' rx='28' fill='none' stroke='%23ffffff' stroke-opacity='0.08' stroke-width='2'/><circle cx='390' cy='460' r='120' fill='%23f8cf65' fill-opacity='0.08' stroke='%23f8cf65' stroke-width='2'/><polygon points='376,436 414,460 376,484' fill='%23f8cf65'/><text x='390' y='680' font-family='sans-serif' font-size='44' font-weight='800' text-anchor='middle' fill='%23ffffff'>Komorebi Cinema</text><text x='390' y='740' font-family='sans-serif' font-size='22' text-anchor='middle' fill='%23f8cf65' letter-spacing='2'>COUPLE MOVIE NIGHT</text></svg>";

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

window.getThematicPosterFallback = getThematicPosterFallback;
window.DEFAULT_MOVIE_POSTER = DEFAULT_MOVIE_POSTER;
window.INITIAL_COUPLE_CATALOG = INITIAL_COUPLE_CATALOG;
window.CURATED_COUPLE_MOVIES = INITIAL_COUPLE_CATALOG;
window.GENRE_FILTERS = GENRE_FILTERS;
