const https = require('https');

// TVmaze free API test for series:
async function getTVMazePoster(showName) {
  return new Promise((resolve) => {
    const url = `https://api.tvmaze.com/singlesearch/shows?q=${encodeURIComponent(showName)}`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.image?.original || json.image?.medium || null);
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

// Wikidata / Wikipedia lead image test:
async function getWikiLeadImage(title) {
  return new Promise((resolve) => {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
    https.get(url, { headers: { 'User-Agent': 'KomorebiApp/1.0 (ziankyle@komorebi.app)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.originalimage?.source || json.thumbnail?.source || null);
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

async function run() {
  const tvShows = [
    "Crash Landing on You",
    "Stranger Things",
    "Queen of Tears",
    "Arcane",
    "Spy x Family",
    "Frieren: Beyond Journey's End",
    "The Last of Us",
    "Business Proposal",
    "Modern Family",
    "Avatar: The Last Airbender"
  ];

  console.log("=== Testing TVmaze API for TV Shows ===");
  for (const show of tvShows) {
    const poster = await getTVMazePoster(show);
    console.log(`[TV Show] ${show} -> ${poster}`);
  }

  const movies = [
    { title: "Your Name", wiki: "Your_Name" },
    { title: "Interstellar", wiki: "Interstellar_(film)" },
    { title: "Spirited Away", wiki: "Spirited_Away" },
    { title: "Eternal Sunshine", wiki: "Eternal_Sunshine_of_the_Spotless_Mind" },
    { title: "Dungeons & Dragons", wiki: "Dungeons_%26_Dragons:_Honor_Among_Thieves" },
    { title: "Parasite", wiki: "Parasite_(2019_film)" },
    { title: "Across the Spider-Verse", wiki: "Spider-Man:_Across_the_Spider-Verse" },
    { title: "Avatar", wiki: "Avatar_(2009_film)" },
    { title: "Soul", wiki: "Soul_(2020_film)" },
    { title: "Dune: Part Two", wiki: "Dune:_Part_Two" },
    { title: "The Lion King", wiki: "The_Lion_King_(1994_film)" },
    { title: "Titanic", wiki: "Titanic_(1997_film)" }
  ];

  console.log("\n=== Testing Wikipedia REST API for Movies ===");
  for (const movie of movies) {
    const poster = await getWikiLeadImage(movie.wiki);
    console.log(`[Movie] ${movie.title} -> ${poster}`);
  }
}

run();
