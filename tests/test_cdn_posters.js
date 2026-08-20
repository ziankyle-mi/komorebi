const https = require('https');

const candidates = [
  { name: "Your Name", url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80" },
  { name: "Interstellar", url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80" },
  { name: "Spirited Away", url: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80" },
  { name: "Stranger Things", url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80" },
  { name: "Arcane", url: "https://images.unsplash.com/photo-1563089145-599997674d42?w=800&auto=format&fit=crop&q=80" },
  { name: "Dune", url: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop&q=80" },
  { name: "Crash Landing", url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop&q=80" },
  { name: "Queen of Tears", url: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&auto=format&fit=crop&q=80" }
];

async function check(item) {
  return new Promise((resolve) => {
    https.get(item.url, (res) => {
      resolve({ name: item.name, code: res.statusCode });
    }).on('error', () => resolve({ name: item.name, code: 0 }));
  });
}

async function run() {
  for (const c of candidates) {
    const res = await check(c);
    console.log(`${res.name}: ${res.code}`);
  }
}

run();
