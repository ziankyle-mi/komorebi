const https = require('https');

const allItems = [
  {
    id: "tv-crash-landing",
    title: "Crash Landing on You",
    mediaType: "tv",
    year: "2019 • 1 Season",
    rating: 8.8,
    genres: ["K-Drama", "Romance", "Comedy"],
    overview: "A paragliding mishap drops a South Korean heiress into North Korea—and into the life of an army officer, who decides to help her hide.",
    poster: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "tv-stranger-things",
    title: "Stranger Things",
    mediaType: "tv",
    year: "2016 • 4 Seasons",
    rating: 8.6,
    genres: ["Sci-Fi", "Mystery", "Drama"],
    overview: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
    poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "tv-queen-of-tears",
    title: "Queen of Tears",
    mediaType: "tv",
    year: "2024 • 1 Season",
    rating: 8.7,
    genres: ["K-Drama", "Romance", "Drama"],
    overview: "The queen of department stores and the prince of supermarkets weather a marital crisis until love miraculously begins to bloom again.",
    poster: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "tv-arcane",
    title: "Arcane",
    mediaType: "tv",
    year: "2021 • 2 Seasons",
    rating: 9.0,
    genres: ["Anime", "Animation", "Sci-Fi", "Action"],
    overview: "Set in the utopian region of Piltover and the oppressed underground of Zaun, the story follows the origins of two iconic League champions.",
    poster: "https://images.unsplash.com/photo-1563089145-599997674d42?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "tv-spy-family",
    title: "Spy x Family",
    mediaType: "tv",
    year: "2022 • 2 Seasons",
    rating: 8.6,
    genres: ["Anime", "Comedy", "Action"],
    overview: "A spy on an undercover mission marries a telepathic girl and a professional assassin, with none of them knowing each other's secrets.",
    poster: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "tv-frieren",
    title: "Frieren: Beyond Journey's End",
    mediaType: "tv",
    year: "2023 • 1 Season",
    rating: 9.1,
    genres: ["Anime", "Fantasy", "Adventure"],
    overview: "An elven mage reflecting on the fleeting lives of her former human companions embarks on a new adventure across the realm.",
    poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "tv-last-of-us",
    title: "The Last of Us",
    mediaType: "tv",
    year: "2023 • 1 Season",
    rating: 8.6,
    genres: ["Drama", "Sci-Fi", "Action"],
    overview: "Twenty years after a fungal outbreak ravages the planet, survivors Joel and Ellie must journey across what remains of America.",
    poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "tv-business-proposal",
    title: "Business Proposal",
    mediaType: "tv",
    year: "2022 • 1 Season",
    rating: 8.4,
    genres: ["K-Drama", "Romance", "Comedy"],
    overview: "In disguise as her friend, Ha-ri shows up to a blind date to scare him away. But plans go awry when he turns out to be her CEO.",
    poster: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "tv-modern-family",
    title: "Modern Family",
    mediaType: "tv",
    year: "2009 • 11 Seasons",
    rating: 8.5,
    genres: ["Comedy", "Family"],
    overview: "Three different but related families face trials and tribulations in their own uniquely comedic ways.",
    poster: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "tv-avatar-airbender",
    title: "Avatar: The Last Airbender",
    mediaType: "tv",
    year: "2005 • 3 Seasons",
    rating: 8.8,
    genres: ["Anime", "Animation", "Fantasy", "Action"],
    overview: "In a war-torn world of elemental magic, a young boy reawakens to undertake a dangerous mystic quest to fulfill his destiny.",
    poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "movie-your-name",
    title: "Your Name.",
    mediaType: "movie",
    year: "2016",
    rating: 8.5,
    genres: ["Anime", "Romance", "Drama"],
    overview: "High schoolers Mitsuha and Taki are complete strangers living separate lives until they suddenly switch bodies across time and space.",
    poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "movie-interstellar",
    title: "Interstellar",
    mediaType: "movie",
    year: "2014",
    rating: 8.7,
    genres: ["Sci-Fi", "Drama", "Adventure"],
    overview: "When Earth becomes uninhabitable, a team of explorers undertakes the most important mission in human history.",
    poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "movie-spirited-away",
    title: "Spirited Away",
    mediaType: "movie",
    year: "2001",
    rating: 8.5,
    genres: ["Anime", "Fantasy", "Adventure"],
    overview: "A young girl wanders into a world ruled by gods, witches, and spirits, where humans are changed into beasts.",
    poster: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "movie-eternal-sunshine",
    title: "Eternal Sunshine of the Spotless Mind",
    mediaType: "movie",
    year: "2004",
    rating: 8.1,
    genres: ["Romance", "Sci-Fi", "Drama"],
    overview: "When their relationship turns sour, a couple undergoes a medical procedure to have each other erased from their memories.",
    poster: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "movie-dnd",
    title: "Dungeons & Dragons: Honor Among Thieves",
    mediaType: "movie",
    year: "2023",
    rating: 7.4,
    genres: ["Action", "Comedy", "Adventure"],
    overview: "A charming thief and a band of unlikely adventurers undertake an epic heist to retrieve a lost relic.",
    poster: "https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "movie-parasite",
    title: "Parasite",
    mediaType: "movie",
    year: "2019",
    rating: 8.5,
    genres: ["Comedy", "Thriller", "Drama"],
    overview: "All unemployed, Ki-taek's family takes peculiar interest in the wealthy Parks until they get entangled in an unexpected incident.",
    poster: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "movie-spider-verse",
    title: "Spider-Man: Across the Spider-Verse",
    mediaType: "movie",
    year: "2023",
    rating: 8.4,
    genres: ["Animation", "Action", "Sci-Fi"],
    overview: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its existence.",
    poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "movie-avatar",
    title: "Avatar",
    mediaType: "movie",
    year: "2009",
    rating: 7.6,
    genres: ["Action", "Sci-Fi", "Adventure"],
    overview: "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between orders and protecting an alien world.",
    poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "movie-soul",
    title: "Soul",
    mediaType: "movie",
    year: "2020",
    rating: 8.1,
    genres: ["Animation", "Comedy", "Fantasy"],
    overview: "A jazz musician who has lost his passion is transported out of his body and must find his way back.",
    poster: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "movie-dune-2",
    title: "Dune: Part Two",
    mediaType: "movie",
    year: "2024",
    rating: 8.2,
    genres: ["Sci-Fi", "Adventure", "Action"],
    overview: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    poster: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "movie-lion-king",
    title: "The Lion King",
    mediaType: "movie",
    year: "1994",
    rating: 8.3,
    genres: ["Animation", "Drama", "Family"],
    overview: "A young lion prince flees his kingdom only to learn the true meaning of responsibility and bravery.",
    poster: "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: "movie-titanic",
    title: "Titanic",
    mediaType: "movie",
    year: "1997",
    rating: 7.9,
    genres: ["Drama", "Romance"],
    overview: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
    poster: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80"
  }
];

function check(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve(res.statusCode);
    }).on('error', () => resolve(0));
  });
}

async function run() {
  console.log(`Checking ${allItems.length} poster URLs...`);
  let okCount = 0;
  for (const item of allItems) {
    const code = await check(item.poster);
    if (code === 200) {
      okCount++;
      console.log(`✓ [200] ${item.title}`);
    } else {
      console.log(`✗ [${code}] ${item.title}: ${item.poster}`);
    }
  }
  console.log(`\nResult: ${okCount}/${allItems.length} verified 200 OK!`);
}

run();
