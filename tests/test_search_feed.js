const https = require('https');

async function testSearch(q) {
  return new Promise((resolve) => {
    const url = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(q)}`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        try {
          const list = JSON.parse(data);
          const results = list.slice(0, 3).map(item => ({
            id: `tv-${item.show.id}`,
            title: item.show.name,
            year: item.show.premiered ? item.show.premiered.substring(0, 4) : 'TV Series',
            rating: item.show.rating?.average || 8.0,
            genres: item.show.genres,
            poster: item.show.image?.original || item.show.image?.medium
          }));
          resolve(results);
        } catch(e) {
          resolve([]);
        }
      });
    }).on('error', () => resolve([]));
  });
}

async function run() {
  const queries = ["Demon Slayer", "Jujutsu Kaisen", "Crash Landing", "Bridgerton", "Wednesday", "Goblins", "Attack on Titan"];
  for (const q of queries) {
    const res = await testSearch(q);
    console.log(`Search "${q}": Found ${res.length} items. First: ${res[0]?.title} (${res[0]?.poster})`);
  }
}

run();
