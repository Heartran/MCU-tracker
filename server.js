// Server statico a zero dipendenze: il repo è puro HTML/CSS/JS. L'unica
// cosa che il server aggiunge è la persistenza dei film segnati come visti
// (altrimenti vivrebbero solo nel localStorage del browser che li ha
// spuntati, invisibili da qualsiasi altro dispositivo).
import { createServer } from "http";
import { readFile, writeFile, rename } from "fs/promises";
import { existsSync, statSync } from "fs";
import { join, dirname, extname } from "path";
import { fileURLToPath } from "url";
import { networkInterfaces } from "os";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3300;
const WATCHED_FILE = join(__dirname, "watched.json");
const MOVIES_CACHE_FILE = join(__dirname, "movies-cache.json");
const MCU_API_URL = "https://mcuapi.up.railway.app/api/v1/movies";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

function getLanIP() {
  for (const ifaces of Object.values(networkInterfaces())) {
    for (const addr of ifaces) {
      if (addr.family === "IPv4" && !addr.internal) return addr.address;
    }
  }
  return "–";
}

// L'API pubblica esterna (non nostra) va giù per giorni, non minuti: senza
// una copia dell'ultima risposta buona il tracker resta vuoto per tutto quel
// tempo. Il server fa da proxy e tiene da parte l'ultimo dato utile.
async function fetchMovies() {
  const r = await fetch(MCU_API_URL, { signal: AbortSignal.timeout(10000) });
  if (!r.ok) throw new Error(`upstream ha risposto ${r.status}`);
  const json = await r.json();
  if (!Array.isArray(json?.data)) throw new Error("upstream: forma della risposta inattesa");
  return json.data;
}

async function readMoviesCache() {
  if (!existsSync(MOVIES_CACHE_FILE)) return null;
  try {
    const raw = JSON.parse(await readFile(MOVIES_CACHE_FILE, "utf-8"));
    return Array.isArray(raw.data) && raw.fetchedAt ? raw : null;
  } catch {
    return null;
  }
}

async function writeMoviesCache(data) {
  const tmp = MOVIES_CACHE_FILE + ".tmp";
  await writeFile(tmp, JSON.stringify({ data, fetchedAt: new Date().toISOString() }, null, 2), "utf-8");
  await rename(tmp, MOVIES_CACHE_FILE);
}

async function readWatched() {
  if (!existsSync(WATCHED_FILE)) return [];
  try {
    const raw = JSON.parse(await readFile(WATCHED_FILE, "utf-8"));
    return Array.isArray(raw.ids) ? raw.ids.filter(Number.isInteger) : [];
  } catch {
    return [];
  }
}

async function writeWatched(ids) {
  // tmp + rename: un'interruzione a metà scrittura lascia il file vecchio
  // intatto invece di un JSON troncato.
  const tmp = WATCHED_FILE + ".tmp";
  await writeFile(tmp, JSON.stringify({ ids }, null, 2), "utf-8");
  await rename(tmp, WATCHED_FILE);
}

function readJsonBody(req, maxBytes = 100_000) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on("data", (c) => {
      size += c.length;
      if (size > maxBytes) { req.destroy(); reject(new Error("payload troppo grande")); return; }
      chunks.push(c);
    });
    req.on("end", () => {
      try { resolve(JSON.parse(Buffer.concat(chunks).toString("utf-8") || "{}")); }
      catch { reject(new Error("JSON non valido")); }
    });
    req.on("error", reject);
  });
}

function sendJson(res, status, obj) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(obj));
}

const server = createServer(async (req, res) => {
  if (req.url === "/health") return sendJson(res, 200, { ok: true });

  if (req.url === "/api/movies" && req.method === "GET") {
    try {
      const data = await fetchMovies();
      await writeMoviesCache(data);
      return sendJson(res, 200, { data, stale: false });
    } catch (e) {
      const cached = await readMoviesCache();
      if (cached) {
        return sendJson(res, 200, { data: cached.data, stale: true, fetchedAt: cached.fetchedAt });
      }
      return sendJson(res, 502, { error: `MCU API non raggiungibile (${e.message}) e nessuna copia salvata.` });
    }
  }

  if (req.url === "/api/watched" && req.method === "GET") {
    return sendJson(res, 200, { ids: await readWatched() });
  }
  if (req.url === "/api/watched" && req.method === "POST") {
    let body;
    try { body = await readJsonBody(req); }
    catch (e) { return sendJson(res, 400, { error: e.message }); }
    if (!Array.isArray(body.ids) || !body.ids.every(Number.isInteger)) {
      return sendJson(res, 400, { error: "ids deve essere un array di interi" });
    }
    await writeWatched([...new Set(body.ids)]);
    return sendJson(res, 200, { ok: true });
  }

  if (req.method !== "GET") return sendJson(res, 405, { error: "metodo non ammesso" });

  // Niente path traversal: si resta dentro __dirname sempre.
  let path = decodeURIComponent(req.url.split("?")[0]);
  if (path === "/") path = "/index.html";
  const full = join(__dirname, path);
  if (!full.startsWith(__dirname) || !existsSync(full) || !statSync(full).isFile()) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    return res.end("Not found");
  }

  try {
    const body = await readFile(full);
    res.writeHead(200, { "Content-Type": MIME[extname(full)] || "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Server error");
  }
});

server.listen(PORT, "0.0.0.0", () => {
  const lan = getLanIP();
  console.log(`\n  MCU Tracker – in ascolto`);
  console.log(`\n  ➜  Locale:  http://localhost:${PORT}`);
  console.log(`  ➜  Rete:    http://${lan}:${PORT}\n`);
});
