const https = require('https');

// We can fetch from public TMDB mirror or open metadata endpoints
const titles = [
  "Your Name",
  "Interstellar",
  "Spirited Away",
  "Eternal Sunshine of the Spotless Mind",
  "Dungeons & Dragons: Honor Among Thieves",
  "Parasite",
  "Spider-Man: Across the Spider-Verse",
  "Avatar",
  "Soul",
  "Dune: Part Two",
  "The Lion King",
  "Titanic",
  "Crash Landing on You",
  "Stranger Things",
  "Queen of Tears",
  "Arcane",
  "Spy x Family",
  "Frieren: Beyond Journey's End",
  "The Last of Us",
  "Business Proposal",
  "Modern Family"
];

// Let's test standard TMDB posters
const tmdbKnown = [
  // Interstellar
  "https://image.tmdb.org/t/p/w780/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  // Spirited Away
  "https://image.tmdb.org/t/p/w780/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
  // Eternal Sunshine
  "https://image.tmdb.org/t/p/w780/5MwkWH9tYHv3mV9OdYTMR5qreIz.jpg",
  // Parasite
  "https://image.tmdb.org/t/p/w780/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
  // Across the Spider-Verse
  "https://image.tmdb.org/t/p/w780/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
  // Stranger Things
  "https://image.tmdb.org/t/p/w780/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
  // Arcane
  "https://image.tmdb.org/t/p/w780/fqldf2t8ztc9aiwn396nl3k2mN6.jpg",
  "https://image.tmdb.org/t/p/w780/abPQHGQp58gPsmFf58b0fG.jpg",
  "https://image.tmdb.org/t/p/w780/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg",
  // Your Name
  "https://image.tmdb.org/t/p/w780/vfJFvziLQAncuLQNczw1UkqL5nw.jpg",
  "https://image.tmdb.org/t/p/w780/q719qXXEzOoYaps6qFsxWa9HqMw.jpg",
  "https://image.tmdb.org/t/p/w780/kzpGLwMeqw6g5eF1VqB5R3q7UfK.jpg",
  // Crash Landing on You
  "https://image.tmdb.org/t/p/w780/92Nzb0ox4vI2sB2nNtzqD5aTf8B.jpg",
  "https://image.tmdb.org/t/p/w780/gL8mIbgjM7rGfH1uH7uI3u7fF3K.jpg",
  // Dune 2
  "https://image.tmdb.org/t/p/w780/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
  "https://image.tmdb.org/t/p/w780/czembW0RJJ1rBoPP2ZflW58Iyfl.jpg",
  // The Last of Us
  "https://image.tmdb.org/t/p/w780/uKvVjK1q7i5f5mK.jpg",
  "https://image.tmdb.org/t/p/w780/dRL2sM7EwK0P0y6nZ8C6iK4bX4f.jpg",
  // Queen of Tears
  "https://image.tmdb.org/t/p/w780/2rmK7mnchP9CoO7HZfK1S685mYQ.jpg",
  "https://image.tmdb.org/t/p/w780/x8y0k2jJ7O6nB5t6K2qZ5F1m8gL.jpg",
  // Spy x Family
  "https://image.tmdb.org/t/p/w780/nTvMglZeHNw0V5ID2rPez9IauRm.jpg",
  "https://image.tmdb.org/t/p/w780/7BsvM0qF0rF1P1aA4oW9QZq5.jpg",
  // Frieren
  "https://image.tmdb.org/t/p/w780/dqZENchTd7lp5z6Gkyq5.jpg",
  "https://image.tmdb.org/t/p/w780/63bHqf6bF2wG1k1bE4tA4K4uF3K.jpg",
  // Avatar
  "https://image.tmdb.org/t/p/w780/kyeqWdyUXW608qlYkRqosgbbJyK.jpg",
  "https://image.tmdb.org/t/p/w780/6EiRUJpuoeQPghrs3YNktfnq26B.jpg",
  // Soul
  "https://image.tmdb.org/t/p/w780/hm58Jw4Lw8OIiv9I07AHguqqDXK.jpg",
  // The Lion King
  "https://image.tmdb.org/t/p/w780/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg",
  // Titanic
  "https://image.tmdb.org/t/p/w780/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg"
];

function check(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({ url, code: res.statusCode });
    }).on('error', () => resolve({ url, code: 0 }));
  });
}

async function run() {
  for (const u of tmdbKnown) {
    const res = await check(u);
    if (res.code === 200) {
      console.log(`✓ 200: ${u}`);
    } else {
      console.log(`✗ ${res.code}: ${u}`);
    }
  }
}

run();
