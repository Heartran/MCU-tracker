let dependencies = {};
let allMovies = [];
let movieMap = {};

async function loadMCU() {
  const res = await fetch('https://mcuapi.up.railway.app/api/v1/movies');
  const data = await res.json();
  const movies = data.data.sort((a, b) => a.chronology - b.chronology);
  allMovies = movies;
  movieMap = Object.fromEntries(movies.map(m => [m.title, m]));

  const depsRes = await fetch('dependencies.json');
  dependencies = await depsRes.json();

  const watched = JSON.parse(localStorage.getItem('watchedMCU') || '[]');
  const container = document.getElementById('movie-list');
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
    checkbox.addEventListener('change', () => {
      const id = parseInt(checkbox.getAttribute('data-id'));
      const current = new Set(JSON.parse(localStorage.getItem('watchedMCU') || '[]'));
      checkbox.checked ? current.add(id) : current.delete(id);
      localStorage.setItem('watchedMCU', JSON.stringify([...current]));
    });
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

loadMCU().then(setupTabs);
