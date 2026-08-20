const https = require('https');

const posters = [
  { title: "Crash Landing on You", url: "https://image.tmdb.org/t/p/w780/92Nzb0ox4vI2sB2nNtzqD5aTf8B.jpg" },
  { title: "Stranger Things", url: "https://image.tmdb.org/t/p/w780/49WJfeN0moxb9IPfGn8AIqMGskD.jpg" },
  { title: "Queen of Tears", url: "https://image.tmdb.org/t/p/w780/2rmK7mnchP9CoO7HZfK1S685mYQ.jpg" },
  { title: "Arcane", url: "https://image.tmdb.org/t/p/w780/fqldf2t8ztc9aiwn396nl3k2mN6.jpg" },
  { title: "Spy x Family", url: "https://image.tmdb.org/t/p/w780/nTvMglZeHNw0V5ID2rPez9IauRm.jpg" },
  { title: "Frieren", url: "https://image.tmdb.org/t/p/w780/dqZENchTd7lp5z6Gkyq5.jpg" },
  { title: "The Last of Us", url: "https://image.tmdb.org/t/p/w780/uKvVjK1q7i5f5mK.jpg" },
  { title: "Your Name.", url: "https://image.tmdb.org/t/p/w780/q719qXXEzOoYaps6qFsxWa9HqMw.jpg" },
  { title: "Interstellar", url: "https://image.tmdb.org/t/p/w780/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg" },
  { title: "Spirited Away", url: "https://image.tmdb.org/t/p/w780/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg" },
  { title: "Eternal Sunshine", url: "https://image.tmdb.org/t/p/w780/5MwkWH9tYHv3mV9OdYTMR5qreIz.jpg" },
  { title: "Dungeons & Dragons", url: "https://image.tmdb.org/t/p/w780/A7LQDxwG4fKzZ8kC3p1d1W5Qj3.jpg" },
  { title: "Parasite", url: "https://image.tmdb.org/t/p/w780/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg" },
  { title: "Spider-Man Spider-Verse", url: "https://image.tmdb.org/t/p/w780/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg" },
  { title: "Avatar", url: "https://image.tmdb.org/t/p/w780/kyeqWdyUXW608qlYkRqosgbbJyK.jpg" },
  { title: "Soul", url: "https://image.tmdb.org/t/p/w780/hm58Jw4Lw8OIiv9I07AHguqqDXK.jpg" },
  { title: "Dune 2", url: "https://image.tmdb.org/t/p/w780/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg" },
  { title: "The Lion King", url: "https://image.tmdb.org/t/p/w780/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg" },
  { title: "Titanic", url: "https://image.tmdb.org/t/p/w780/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg" }
];

async function checkUrl(item) {
  return new Promise((resolve) => {
    https.get(item.url, (res) => {
      resolve({ title: item.title, url: item.url, statusCode: res.statusCode });
    }).on('error', (err) => {
      resolve({ title: item.title, url: item.url, error: err.message });
    });
  });
}

async function run() {
  console.log("Checking posters...");
  for (const item of posters) {
    const res = await checkUrl(item);
    console.log(`${res.statusCode === 200 ? '✓' : '✗'} [${res.statusCode || 'ERR'}] ${res.title}: ${res.url}`);
  }
}

run();
