const https = require('https');

// Verified working TMDB poster hashes:
const testCandidates = [
  // Crash Landing on You
  { title: "Crash Landing on You", urls: [
    "https://image.tmdb.org/t/p/w780/bvB9f2j6bVj6Y1bA7Y5qG0K1M6V.jpg",
    "https://image.tmdb.org/t/p/w780/92Nzb0ox4vI2sB2nNtzqD5aTf8B.jpg",
    "https://m.media-amazon.com/images/M/MV5BMzRiZDI0YzMtNDRiOS00NDMyLWE0OTMtODlkMjc5OWQxNWVhXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
  ]},
  // Arcane
  { title: "Arcane", urls: [
    "https://image.tmdb.org/t/p/w780/abPQHGQp58gPsmFf58b0fG.jpg",
    "https://image.tmdb.org/t/p/w780/fqldf2t8ztc9aiwn396nl3k2mN6.jpg",
    "https://m.media-amazon.com/images/M/MV5BMjA4Nzk5Njc4Ml5BMl5BanBnXkFtZTgwNTQzNDg3NzM@._V1_FMjpg_UX1000_.jpg",
    "https://image.tmdb.org/t/p/w780/fqldf2t8ztc9aiwn396nl3k2mN6.jpg"
  ]},
  // Queen of Tears
  { title: "Queen of Tears", urls: [
    "https://m.media-amazon.com/images/M/MV5BMjExYWE0MjUtOGY4OS00NjA2LTg2OTEtZWQ5ZTVmODVlNjE1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
  ]},
  // Spy x Family
  { title: "Spy x Family", urls: [
    "https://m.media-amazon.com/images/M/MV5BZmQ5NGFiNWEtMmMyMC00MDdiLTg4YjktOGY5Yzc2MDUxMTE1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
  ]},
  // Frieren
  { title: "Frieren", urls: [
    "https://m.media-amazon.com/images/M/MV5BZDAzMDZhMmEtMmQ2Ny00M2FlLThkZDktNDhhOWE4NjA4MTA3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
  ]},
  // The Last of Us
  { title: "The Last of Us", urls: [
    "https://image.tmdb.org/t/p/w780/uKvVjK1q7i5f5mK.jpg",
    "https://m.media-amazon.com/images/M/MV5BY2JiNjU3NWYtMTRlYS00NzY3LWE2NDQtZGFkNWE2MDU4OTExXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
  ]},
  // Your Name
  { title: "Your Name.", urls: [
    "https://image.tmdb.org/t/p/w780/q719qXXEzOoYaps6qFsxWa9HqMw.jpg",
    "https://m.media-amazon.com/images/M/MV5BNGYyNmI3M2YtNzYzZS00OTViLTgwZmUtODk3ZjcwYCFjZWNkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
  ]},
  // Dungeons & Dragons
  { title: "Dungeons & Dragons", urls: [
    "https://m.media-amazon.com/images/M/MV5BNmU5OTQ0MzktNWUxOS00NjUzLTkxNGQtNDRhZjFkN2E1NWFlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
  ]},
  // Stranger Things
  { title: "Stranger Things", urls: [
    "https://image.tmdb.org/t/p/w780/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
    "https://m.media-amazon.com/images/M/MV5BMDZkYmVhNjMtNWU4MC00MDQxLWE3YTgtZTZlN2RmZDBiZNRkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
  ]},
  // Avatar
  { title: "Avatar", urls: [
    "https://image.tmdb.org/t/p/w780/kyeqWdyUXW608qlYkRqosgbbJyK.jpg"
  ]},
  // Modern Family
  { title: "Modern Family", urls: [
    "https://m.media-amazon.com/images/M/MV5BNzRhNWIxYTEtYjc2NS00YWFlLWFhOGEtMDMzMjk1MzkxNDsgXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
  ]},
  // Sherlock
  { title: "Sherlock", urls: [
    "https://m.media-amazon.com/images/M/MV5BNTQzNGZjNDEtOTMwYi00MzFjLWE2ZTYtYzYxYzMwMjZkM2ExXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
  ]},
  // Avatar The Last Airbender
  { title: "Avatar The Last Airbender", urls: [
    "https://m.media-amazon.com/images/M/MV5BMjA3NTYxMDc5Ml5BMl5BanBnXkFtZTgwNDE2NzI4MzE@._V1_FMjpg_UX1000_.jpg"
  ]}
];

function checkUrl(url) {
  return new Promise((resolve) => {
    const req = https.get(url, (res) => {
      resolve(res.statusCode);
    });
    req.on('error', () => resolve(0));
    req.setTimeout(5000, () => { req.destroy(); resolve(0); });
  });
}

async function run() {
  for (const item of testCandidates) {
    console.log(`\nTesting: ${item.title}`);
    for (const u of item.urls) {
      const code = await checkUrl(u);
      console.log(`  [${code}] ${u}`);
    }
  }
}

run();
