const https = require('https');

async function testSpiritedAway() {
  const titles = [
    "Sen to Chihiro no Kamikakushi",
    "Spirited Away",
    "tt0245429"
  ];

  for (const t of titles) {
    const isId = t.startsWith("tt");
    const param = isId ? `i=${t}` : `t=${encodeURIComponent(t)}`;
    const url = `https://www.omdbapi.com/?apikey=trilogy&${param}`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        try {
          const j = JSON.parse(data);
          console.log(`${t} -> ${j.Poster}`);
        } catch(e) {}
      });
    });
  }
}

testSpiritedAway();
