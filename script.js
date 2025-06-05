let dependencies = {};
let allMovies = [];
let movieMap = {};
let currentSort = 'chronology';
let currentPhase = 'all';
let currentSaga = 'all';

async function loadMCU() {
  const res = await fetch('https://mcuapi.up.railway.app/api/v1/movies');
  const data = await res.json();
  allMovies = data.data;
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

  renderMovies();
}

function renderMovies() {
  const watched = JSON.parse(localStorage.getItem('watchedMCU') || '[]');
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
    const isChecked = watched.includes(movie.id);
    const card = document.createElement('div');
    card.className = 'bg-gray-800 rounded-lg shadow p-4 flex flex-col';

    const deps = dependencies[movie.title];
    const depsHTML = deps ? `<p class="text-sm text-yellow-400 mt-2"><strong>🔗 Dipendenze consigliate:</strong> ${deps.join(', ')}</p>` : '';

    card.innerHTML = `
      <img src="${movie.cover_url}" alt="${movie.title}" class="rounded mb-3 shadow">
      <h2 class="text-xl font-bold">${movie.title}</h2>
      <p class="text-sm text-gray-400 mb-2">📅 ${movie.release_date} • ⏱️ ${movie.duration || '?'} min</p>
      <p class="text-sm text-gray-300 mb-2"><strong>Fase:</strong> ${movie.phase} – <strong>Saga:</strong> ${movie.saga}</p>
      <p class="text-sm text-gray-400 mb-2"><strong>Regia:</strong> ${movie.directed_by || '?'}</p>
      <p class="text-sm mb-2">${movie.overview ? movie.overview.substring(0, 150) + '…' : 'Trama non disponibile.'}</p>
      ${movie.trailer_url ? `<a href="${movie.trailer_url}" target="_blank" class="text-blue-400 underline mb-2">🎬 Guarda Trailer</a>` : ''}
      ${depsHTML}
      <label class="flex items-center gap-2 mt-auto">
        <input type="checkbox" ${isChecked ? 'checked' : ''} class="form-checkbox h-4 w-4 text-green-500" data-id="${movie.id}">
        <span class="text-sm">Segnato come visto</span>
      </label>
    `;

    container.appendChild(card);
  });

  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.onchange = () => {
      const id = parseInt(checkbox.getAttribute('data-id'));
      const current = new Set(JSON.parse(localStorage.getItem('watchedMCU') || '[]'));
      checkbox.checked ? current.add(id) : current.delete(id);
      localStorage.setItem('watchedMCU', JSON.stringify([...current]));
    };
  });
}

function buildTree(title, visited = new Set()) {
  if (visited.has(title)) return '';
  visited.add(title);
  const movie = movieMap[title] || {};
  const poster = movie.cover_url ? `<img src="${movie.cover_url}" alt="${title}" class="w-16 h-auto rounded shadow mr-2">` : '';
  const deps = dependencies[title] || [];
  const children = deps.length
    ? `<ul class="ml-6 border-l border-gray-600 pl-4">${deps.map(d => buildTree(d, new Set(visited))).join('')}</ul>`
    : '';
  return `<li class="mb-4"><div class="flex items-center">${poster}<span>${title}</span></div>${children}</li>`;
}

function renderDependencyTree() {
  const container = document.getElementById('dep-tree');
  const items = allMovies.map(m => buildTree(m.title)).join('');
  container.innerHTML = `<ul class="list-none">${items}</ul>`;
}

function setupTabs() {
  const tabMovies = document.getElementById('tab-movies');
  const tabDeps = document.getElementById('tab-deps');
  const movieList = document.getElementById('movie-list');
  const depTree = document.getElementById('dep-tree');
  tabMovies.addEventListener('click', () => {
    tabMovies.classList.add('border-b-2', 'border-blue-400', 'text-blue-400');
    tabDeps.classList.remove('border-b-2', 'border-blue-400', 'text-blue-400');
    movieList.classList.remove('hidden');
    depTree.classList.add('hidden');
  });
  tabDeps.addEventListener('click', () => {
    tabDeps.classList.add('border-b-2', 'border-blue-400', 'text-blue-400');
    tabMovies.classList.remove('border-b-2', 'border-blue-400', 'text-blue-400');
    movieList.classList.add('hidden');
    depTree.classList.remove('hidden');
    renderDependencyTree();
  });
}

loadMCU().then(() => {
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
});
