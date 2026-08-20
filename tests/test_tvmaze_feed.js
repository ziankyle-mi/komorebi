const https = require('https');

async function testTVMazeFeed() {
  return new Promise((resolve) => {
    const url = 'https://api.tvmaze.com/shows?page=0';
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const shows = JSON.parse(data);
          console.log(`Fetched ${shows.length} shows from TVmaze page 0!`);
          const samples = shows.slice(0, 5).map(s => ({
            id: `tv-${s.id}`,
            title: s.name,
            rating: s.rating?.average || 8.0,
            genres: s.genres,
            poster: s.image?.original || s.image?.medium
          }));
          console.log("Sample shows:", samples);
          resolve(shows.length);
        } catch(e) {
          console.error("Parse error:", e);
          resolve(0);
        }
      });
    }).on('error', (err) => {
      console.error("Fetch error:", err);
      resolve(0);
    });
  });
}

testTVMazeFeed();
