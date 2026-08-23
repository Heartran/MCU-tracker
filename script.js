let dependencies = {};
let allMovies = [];
let movieMap = {};
let currentSort = 'chronology';
let currentPhase = 'all';
let currentSaga = 'all';

// ── stato "visto" ──
// Il server (server.js, /api/watched) lo condivide fra dispositivi. In un
// deploy statico puro (Netlify, come da README) l'endpoint non esiste:
// si scivola sul localStorage del browser, che è quello che c'era prima.
let watchedIds = new Set();
let watchedBackend = false;

async function loadWatched() {
  try {
    const r = await fetch('/api/watched');
    if (!r.ok) throw 0;
    const j = await r.json();
    watchedIds = new Set(Array.isArray(j.ids) ? j.ids : []);
    watchedBackend = true;
  } catch {
    watchedIds = new Set(JSON.parse(localStorage.getItem('watchedMCU') || '[]'));
    watchedBackend = false;
  }
}
async function saveWatched() {
  const ids = [...watchedIds];
  if (!watchedBackend) {
    localStorage.setItem('watchedMCU', JSON.stringify(ids));
    return;
  }
  try {
    const r = await fetch('/api/watched', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids }),
    });
    if (!r.ok) throw 0;
  } catch {
    // Il server c'era al caricamento e ora non risponde più: non perdere la
    // spunta, tienila almeno su questo dispositivo.
    localStorage.setItem('watchedMCU', JSON.stringify(ids));
  }
}

// L'API pubblica esterna sta giù per giorni, non minuti: /api/movies (lato
// server, server.js) tiene da parte l'ultima risposta buona e la riserve
// quando l'API non risponde, marcandola "stale" così l'utente sa che i dati
// sono vecchi invece di crederli aggiornati. Solo se non esiste NESSUNA
// copia (mai andato online, o deploy statico senza backend) si arriva a un
// vero errore, mostrato invece di un crash silenzioso.
async function loadMCU() {
  const res = await fetch('/api/movies');
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `richiesta fallita (${res.status})`);
  }
  const body = await res.json();
  allMovies = Array.isArray(body.data) ? body.data : [];
  if (!allMovies.length) throw new Error('nessun film ricevuto');
  showStaleness(body);
  movieMap = Object.fromEntries(allMovies.map(m => [m.title, m]));

  const phases = [...new Set(allMovies.map(m => m.phase).filter(Boolean))].sort((a, b) => a - b);
  const sagas = [...new Set(allMovies.map(m => m.saga).filter(Boolean))].sort();
  const phaseSel = document.getElementById('phase-filter');
  phases.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p;
    opt.textContent = `Fase ${p}`;
    phaseSel.appendChild(opt);
  });
  const sagaSel = document.getElementById('saga-filter');
  sagas.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s;
    opt.textContent = s;
    sagaSel.appendChild(opt);
  });

  const sorted = allMovies.slice().sort((a, b) => a.chronology - b.chronology);
  dependencies = {};
  sorted.forEach((m, i) => {
    if (i > 0) {
      dependencies[m.title] = [sorted[i - 1].title];
    }
  });
}

function updateProgress() {
  const el = document.getElementById('progress-counter');
  if (!el || !allMovies.length) return;
  el.textContent = `Visti ${watchedIds.size}/${allMovies.length}`;
}

function renderMovies() {
  const container = document.getElementById('movie-list');
  let movies = allMovies.slice();

  if (currentPhase !== 'all') {
    movies = movies.filter(m => m.phase === parseInt(currentPhase));
  }
  if (currentSaga !== 'all') {
    movies = movies.filter(m => m.saga === currentSaga);
  }

  movies.sort((a, b) => {
    switch (currentSort) {
      case 'release':
        return new Date(a.release_date) - new Date(b.release_date);
      case 'phase':
        return a.phase - b.phase;
      case 'saga':
        return a.saga.localeCompare(b.saga);
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return a.chronology - b.chronology;
    }
  });

  container.innerHTML = '';
  movies.forEach(movie => {
    const isChecked = watchedIds.has(movie.id);
    const card = document.createElement('article');
    card.className = 'card' + (isChecked ? ' is-watched' : '');

    const num = String(movie.chronology ?? '·').padStart(2, '0');
    const deps = dependencies[movie.title];
    const depsHTML = deps
      ? `<p class="dep-line"><strong>Prerequisito</strong>${deps.join(', ')}</p>`
      : '';

    card.innerHTML = `
      <div class="card-head">
        <span class="card-num">#${num}</span>
        <span>Fase ${movie.phase} · ${movie.saga || '?'}</span>
      </div>
      <div class="poster-wrap">
        <img src="${movie.cover_url}" alt="${movie.title}" loading="lazy">
        <span class="stamp">Visto</span>
      </div>
      <div class="card-body">
        <h2 class="card-title">${movie.title}</h2>
        <dl class="specs">
          <div><dt>Uscita</dt><dd>${movie.release_date || '?'}</dd></div>
          <div><dt>Durata</dt><dd>${movie.duration || '?'} min</dd></div>
          <div><dt>Regia</dt><dd>${movie.directed_by || '?'}</dd></div>
        </dl>
        <p class="overview">${movie.overview ? movie.overview.substring(0, 150) + '…' : 'Trama non disponibile.'}</p>
        ${depsHTML}
        <div class="card-actions">
          ${movie.trailer_url ? `<a href="${movie.trailer_url}" target="_blank" class="btn">Trailer ↗</a>` : ''}
          <label class="watch-toggle">
            <input type="checkbox" ${isChecked ? 'checked' : ''} data-id="${movie.id}">
            <span class="btn"><span class="label-off">Segna visto</span><span class="label-on">Visto ✓</span></span>
          </label>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  container.querySelectorAll('.watch-toggle input').forEach(checkbox => {
    checkbox.onchange = () => {
      const id = parseInt(checkbox.getAttribute('data-id'));
      checkbox.checked ? watchedIds.add(id) : watchedIds.delete(id);
      checkbox.closest('.card').classList.toggle('is-watched', checkbox.checked);
      updateProgress();
      saveWatched();
    };
  });

  updateProgress();
}

function buildTree(title, visited = new Set()) {
  if (visited.has(title)) return '';
  visited.add(title);
  const movie = movieMap[title] || {};
  const poster = movie.cover_url ? `<img src="${movie.cover_url}" alt="${title}" loading="lazy">` : '';
  const deps = dependencies[title] || [];
  const children = deps.length
    ? `<ul class="tree-children">${deps.map(d => buildTree(d, new Set(visited))).join('')}</ul>`
    : '';
  return `<li class="tree-node"><div class="tree-row">${poster}<span class="tree-title">${title}</span></div>${children}</li>`;
}

function renderDependencyTree() {
  const container = document.getElementById('dep-tree');
  const items = allMovies.map(m => buildTree(m.title)).join('');
  container.innerHTML = `<ul class="tree-root">${items}</ul>`;
}

function setupTabs() {
  const tabMovies = document.getElementById('tab-movies');
  const tabDeps = document.getElementById('tab-deps');
  const movieList = document.getElementById('movie-list');
  const depTree = document.getElementById('dep-tree');
  const filters = document.getElementById('filters');
  tabMovies.addEventListener('click', () => {
    tabMovies.classList.add('is-active');
    tabDeps.classList.remove('is-active');
    movieList.classList.remove('hidden');
    filters.classList.remove('hidden');
    depTree.classList.add('hidden');
  });
  tabDeps.addEventListener('click', () => {
    tabDeps.classList.add('is-active');
    tabMovies.classList.remove('is-active');
    movieList.classList.add('hidden');
    filters.classList.add('hidden');
    depTree.classList.remove('hidden');
    renderDependencyTree();
  });
}

function showStaleness(body) {
  const note = document.getElementById('source-note');
  const quando = (iso) => iso
    ? new Date(iso).toLocaleString('it-IT', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
    : 'data sconosciuta';

  if (body.source === 'mirror') {
    // Non è un guasto: lo specchio CDN è la strategia di resilienza
    // ufficiale del progetto stesso, aggiornata settimanalmente — un
    // avviso informativo, non un allarme come i dati vecchi della nostra
    // cache locale.
    note.textContent = `Avviso — l'MCU API live non risponde: dati dallo specchio CDN ufficiale del progetto (generato il ${quando(body.generatedAt)}).`;
    note.classList.add('note-info');
    return;
  }
  if (body.stale) {
    note.textContent = `Attenzione — MCU API e specchio CDN sono entrambi irraggiungibili in questo momento: stai vedendo l'ultima copia salvata da questo server (${quando(body.fetchedAt)}).`;
    note.classList.add('note-warn');
  }
}

function showLoadError(err) {
  document.getElementById('movie-list').innerHTML = `
    <div class="error-box">
      <p class="error-title">Errore</p>
      <p class="error-msg">Impossibile caricare i film. ${err.message || err}</p>
      <button onclick="location.reload()" class="btn">Riprova</button>
    </div>`;
}

Promise.all([loadWatched(), loadMCU()]).then(() => {
  // renderMovies parte solo quando ANCHE lo stato "visto" è arrivato: se
  // fosse dentro loadMCU (com'era prima), con un /api/watched lento le
  // spunte comparirebbero vuote al primo paint.
  renderMovies();
  setupTabs();
  document.getElementById('sort-select').addEventListener('change', e => {
    currentSort = e.target.value;
    renderMovies();
  });
  document.getElementById('phase-filter').addEventListener('change', e => {
    currentPhase = e.target.value;
    renderMovies();
  });
  document.getElementById('saga-filter').addEventListener('change', e => {
    currentSaga = e.target.value;
    renderMovies();
  });
}).catch(showLoadError);
