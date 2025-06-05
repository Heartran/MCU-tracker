async function loadMCUData() {
  // Fetch movie list from the public MCU API
  const movieRes = await fetch('https://mcuapi.up.railway.app/api/v1/movies');
  const movieData = await movieRes.json();
  const movies = movieData.data;

  // Load dependency information from the local JSON file
  const depRes = await fetch('./data/dependencies.json');
  const dependencies = await depRes.json();

  const watched = JSON.parse(localStorage.getItem('watchedMCU')) || [];
  const container = document.getElementById('app');
  container.innerHTML = '';

  movies.forEach(movie => {
    const depsList = dependencies[movie.title] || [];

    const div = document.createElement('div');
    div.className = 'mcu-item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = watched.includes(movie.title);
    checkbox.addEventListener('change', () => {
      const updated = new Set(watched);
      checkbox.checked ? updated.add(movie.title) : updated.delete(movie.title);
      localStorage.setItem('watchedMCU', JSON.stringify([...updated]));
    });

    const title = document.createElement('strong');
    title.textContent = `${movie.title} (${movie.release_date})`;

    const deps = document.createElement('p');
    deps.innerHTML = `<em>Dipendenze:</em> ${depsList.join(', ') || 'Nessuna'}`;

    div.appendChild(checkbox);
    div.appendChild(title);
    div.appendChild(deps);
    container.appendChild(div);
  });
}

loadMCUData();
