const https = require('https');

const extraMovies = [
  "Inception",
  "The Dark Knight",
  "Howl's Moving Castle",
  "Suzume",
  "500 Days of Summer",
  "About Time",
  "The Notebook",
  "Spider-Man: Into the Spider-Verse",
  "The Matrix",
  "The Batman",
  "Coco",
  "Up",
  "Shrek 2",
  "Deadpool",
  "Fight Club"
];

async function getPoster(title) {
  return new Promise((resolve) => {
    const url = `https://www.omdbapi.com/?apikey=trilogy&t=${encodeURIComponent(title)}`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        try {
          const j = JSON.parse(data);
          resolve({ title: j.Title, year: j.Year, rating: j.imdbRating, genres: j.Genre ? j.Genre.split(', ') : [], poster: j.Poster ? j.Poster.replace('_SX300', '_SX1000') : null });
        } catch(e) { resolve(null); }
      });
    }).on('error', () => resolve(null));
  });
}

async function run() {
  console.log("Fetching extra blockbuster movie metadata & posters...");
  const results = [];
  for (const t of extraMovies) {
    const p = await getPoster(t);
    if (p && p.poster) {
      console.log(`✓ ${p.title} (${p.year}): ${p.poster}`);
      results.push(p);
    }
  }
}

run();
