const https = require('https');

const searchTerms = [
  { id: 'your_name', query: 'Your Name 2016' },
  { id: 'interstellar', query: 'Interstellar 2014' },
  { id: 'spirited_away', query: 'Spirited Away 2001' },
  { id: 'eternal_sunshine', query: 'Eternal Sunshine of the Spotless Mind' },
  { id: 'dnd', query: 'Dungeons & Dragons Honor Among Thieves' },
  { id: 'parasite', query: 'Parasite 2019' },
  { id: 'spider_verse', query: 'Spider-Man Across the Spider-Verse' },
  { id: 'avatar', query: 'Avatar 2009' },
  { id: 'soul', query: 'Soul 2020' },
  { id: 'dune_2', query: 'Dune Part Two 2024' },
  { id: 'lion_king', query: 'The Lion King 1994' },
  { id: 'titanic', query: 'Titanic 1997' },
  { id: 'crash_landing', query: 'Crash Landing on You' },
  { id: 'stranger_things', query: 'Stranger Things' },
  { id: 'queen_of_tears', query: 'Queen of Tears 2024' },
  { id: 'arcane', query: 'Arcane 2021' },
  { id: 'spy_family', query: 'Spy x Family' },
  { id: 'frieren', query: 'Frieren Beyond Journeys End' },
  { id: 'last_of_us', query: 'The Last of Us 2023' },
  { id: 'business_proposal', query: 'Business Proposal 2022' },
  { id: 'modern_family', query: 'Modern Family' },
  { id: 'avatar_airbender', query: 'Avatar The Last Airbender 2005' },
  { id: 'sherlock', query: 'Sherlock 2010' }
];

// Query Wikimedia Commons / Public Movie Database API
async function fetchWikiPoster(title) {
  return new Promise((resolve) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=800`;
    https.get(url, { headers: { 'User-Agent': 'KomorebiApp/1.0 (contact@komorebi.app)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          const pages = parsed.query?.pages || {};
          const firstKey = Object.keys(pages)[0];
          const thumb = pages[firstKey]?.thumbnail?.source;
          resolve(thumb || null);
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

async function run() {
  const wikiTitles = {
    'your_name': 'Your Name',
    'interstellar': 'Interstellar (film)',
    'spirited_away': 'Spirited Away',
    'eternal_sunshine': 'Eternal Sunshine of the Spotless Mind',
    'dnd': 'Dungeons & Dragons: Honor Among Thieves',
    'parasite': 'Parasite (2019 film)',
    'spider_verse': 'Spider-Man: Across the Spider-Verse',
    'avatar': 'Avatar (2009 film)',
    'soul': 'Soul (2020 film)',
    'dune_2': 'Dune: Part Two',
    'lion_king': 'The Lion King',
    'titanic': 'Titanic (1997 film)',
    'crash_landing': 'Crash Landing on You',
    'stranger_things': 'Stranger Things',
    'queen_of_tears': 'Queen of Tears',
    'arcane': 'Arcane (TV series)',
    'spy_family': 'Spy × Family',
    'frieren': 'Frieren',
    'last_of_us': 'The Last of Us (TV series)',
    'business_proposal': 'Business Proposal',
    'modern_family': 'Modern Family',
    'avatar_airbender': 'Avatar: The Last Airbender',
    'sherlock': 'Sherlock (TV series)'
  };

  console.log("Fetching verified high-res poster links from Wikipedia / MediaWiki API...");
  const results = {};
  for (const [key, wTitle] of Object.entries(wikiTitles)) {
    const poster = await fetchWikiPoster(wTitle);
    console.log(`${key}: ${poster}`);
    results[key] = poster;
  }
}

run();
