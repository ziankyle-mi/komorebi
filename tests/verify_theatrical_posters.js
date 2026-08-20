const https = require('https');

const posters = [
  // TV Shows & K-Dramas & Anime (TVmaze official posters)
  { title: "Crash Landing on You", url: "https://static.tvmaze.com/uploads/images/original_untouched/235/588087.jpg" },
  { title: "Stranger Things", url: "https://static.tvmaze.com/uploads/images/original_untouched/595/1489169.jpg" },
  { title: "Queen of Tears", url: "https://static.tvmaze.com/uploads/images/original_untouched/507/1269260.jpg" },
  { title: "Arcane", url: "https://static.tvmaze.com/uploads/images/original_untouched/536/1340287.jpg" },
  { title: "Spy x Family", url: "https://static.tvmaze.com/uploads/images/original_untouched/590/1477119.jpg" },
  { title: "Frieren: Beyond Journey's End", url: "https://static.tvmaze.com/uploads/images/original_untouched/479/1198409.jpg" },
  { title: "The Last of Us", url: "https://static.tvmaze.com/uploads/images/original_untouched/563/1409008.jpg" },
  { title: "Business Proposal", url: "https://static.tvmaze.com/uploads/images/original_untouched/394/986401.jpg" },
  { title: "Modern Family", url: "https://static.tvmaze.com/uploads/images/original_untouched/359/898320.jpg" },
  { title: "Avatar: The Last Airbender", url: "https://static.tvmaze.com/uploads/images/original_untouched/633/1582667.jpg" },

  // Movies (Official Wikimedia / Wikipedia original theatrical posters)
  { title: "Your Name.", url: "https://upload.wikimedia.org/wikipedia/en/0/0b/Your_Name_poster.png" },
  { title: "Interstellar", url: "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg" },
  { title: "Spirited Away", url: "https://upload.wikimedia.org/wikipedia/en/d/db/Spirited_Away_Japanese_poster.png" },
  { title: "Eternal Sunshine", url: "https://upload.wikimedia.org/wikipedia/en/a/a4/Eternal_Sunshine_of_the_Spotless_Mind.png" },
  { title: "Dungeons & Dragons", url: "https://upload.wikimedia.org/wikipedia/en/0/03/Theatrical_poster_for_Dungeons_and_Dragons%2C_Honor_Among_Thieves.jpg" },
  { title: "Parasite", url: "https://upload.wikimedia.org/wikipedia/en/5/53/Parasite_%282019_film%29.png" },
  { title: "Across the Spider-Verse", url: "https://upload.wikimedia.org/wikipedia/en/b/b4/Spider-Man-_Across_the_Spider-Verse_poster.jpg" },
  { title: "Avatar", url: "https://upload.wikimedia.org/wikipedia/en/d/d6/Avatar_%282009_film%29_poster.jpg" },
  { title: "Soul", url: "https://upload.wikimedia.org/wikipedia/en/3/39/Soul_%282020_film%29_poster.jpg" },
  { title: "Dune: Part Two", url: "https://upload.wikimedia.org/wikipedia/en/5/52/Dune_Part_Two_poster.jpeg" },
  { title: "The Lion King", url: "https://upload.wikimedia.org/wikipedia/en/3/3d/The_Lion_King_poster.jpg" },
  { title: "Titanic", url: "https://upload.wikimedia.org/wikipedia/en/1/18/Titanic_%281997_film%29_poster.png" },
  { title: "La La Land", url: "https://upload.wikimedia.org/wikipedia/en/a/ab/La_La_Land_%28film%29.png" }
];

function check(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      resolve(res.statusCode);
    }).on('error', () => resolve(0));
  });
}

async function run() {
  console.log(`Checking ${posters.length} official theatrical posters...`);
  let count = 0;
  for (const p of posters) {
    const code = await check(p.url);
    if (code === 200) {
      count++;
      console.log(`✓ [200] ${p.title}`);
    } else {
      console.log(`✗ [${code}] ${p.title}: ${p.url}`);
    }
  }
  console.log(`\nResult: ${count}/${posters.length} official theatrical posters verified 200 OK!`);
}

run();
