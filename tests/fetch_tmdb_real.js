const https = require('https');

// Public TMDB key for movie metadata discovery
const TMDB_KEY = "8414301a6136d8f8d55a306443c223c2";

const moviesToFetch = [
  "Your Name 2016",
  "Interstellar 2014",
  "Spirited Away 2001",
  "Eternal Sunshine of the Spotless Mind 2004",
  "Dungeons & Dragons Honor Among Thieves 2023",
  "Parasite 2019",
  "Spider-Man Across the Spider-Verse 2023",
  "Avatar 2009",
  "Soul 2020",
  "Dune Part Two 2024",
  "The Lion King 1994",
  "Titanic 1997",
  "La La Land 2016",
  "Everything Everywhere All at Once 2022",
  "Oppenheimer 2023"
];

async function getTMDBPoster(query) {
  return new Promise((resolve) => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&query=${encodeURIComponent(query)}`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const first = json.results?.[0];
          if (first && first.poster_path) {
            resolve({
              title: first.title,
              year: first.release_date?.substring(0, 4),
              rating: first.vote_average,
              overview: first.overview,
              poster: `https://image.tmdb.org/t/p/w780${first.poster_path}`
            });
          } else {
            resolve(null);
          }
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

async function run() {
  console.log("Fetching exact TMDB official theatrical posters with live TMDB discovery...");
  for (const q of moviesToFetch) {
    const res = await getTMDBPoster(q);
    if (res) {
      console.log(`[MOVIE FOUND] ${res.title} (${res.year}) -> ${res.poster}`);
    } else {
      console.log(`[NOT FOUND] ${q}`);
    }
  }
}

run();
