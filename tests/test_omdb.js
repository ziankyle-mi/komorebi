const https = require('https');

const omdbKeys = ['trilogy', 'b7cdc5d0', '2a66e41b', '140e90bf', 'd5303c27'];

async function getOMDbPoster(title, year = "") {
  for (const key of omdbKeys) {
    const res = await new Promise((resolve) => {
      const url = `https://www.omdbapi.com/?apikey=${key}&t=${encodeURIComponent(title)}&y=${year}`;
      https.get(url, (resp) => {
        let data = '';
        resp.on('data', chunk => data += chunk);
        resp.on('end', () => {
          try {
            const j = JSON.parse(data);
            if (j.Response === 'True' && j.Poster && j.Poster !== 'N/A') {
              resolve(j);
            } else {
              resolve(null);
            }
          } catch(e) { resolve(null); }
        });
      }).on('error', () => resolve(null));
    });
    if (res) return res;
  }
  return null;
}

async function run() {
  const movieList = [
    { title: "Your Name.", year: "2016" },
    { title: "Interstellar", year: "2014" },
    { title: "Spirited Away", year: "2001" },
    { title: "Eternal Sunshine of the Spotless Mind", year: "2004" },
    { title: "Dungeons & Dragons: Honor Among Thieves", year: "2023" },
    { title: "Parasite", year: "2019" },
    { title: "Spider-Man: Across the Spider-Verse", year: "2023" },
    { title: "Avatar", year: "2009" },
    { title: "Soul", year: "2020" },
    { title: "Dune: Part Two", year: "2024" },
    { title: "The Lion King", year: "1994" },
    { title: "Titanic", year: "1997" },
    { title: "La La Land", year: "2016" },
    { title: "Everything Everywhere All at Once", year: "2022" },
    { title: "Oppenheimer", year: "2023" }
  ];

  console.log("=== OMDb API Fetch ===");
  for (const m of movieList) {
    const data = await getOMDbPoster(m.title, m.year);
    if (data) {
      console.log(`✓ [FOUND] ${data.Title} (${data.Year}): ${data.Poster}`);
    } else {
      console.log(`✗ [NOT FOUND] ${m.title}`);
    }
  }
}

run();
