async function loadMCU() {
  const res = await fetch('https://mcuapi.up.railway.app/api/v1/movies');
  const data = await res.json();
  const movies = data.data.sort((a, b) => a.chronology - b.chronology);

  const depsRes = await fetch('dependencies.json');
  const dependencies = await depsRes.json();

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

loadMCU();
