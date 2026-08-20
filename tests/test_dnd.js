const https = require('https');

async function getWiki(title) {
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
  const titles = [
    "Dungeons_%26_Dragons:_Honor_Among_Thieves",
    "Dungeons_and_Dragons:_Honor_Among_Thieves",
    "Spider-Man:_Across_the_Spider-Verse",
    "Lala_Land",
    "La_La_Land_(film)",
    "Everything_Everywhere_All_at_Once",
    "Oppenheimer_(film)",
    "Barbie_(film)"
  ];
  for (const t of titles) {
    const res = await getWiki(t);
    console.log(`${t} -> ${res}`);
  }
}

run();
