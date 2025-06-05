async function loadMCUData() {
  const res = await fetch('./data/mcu.json');
  const data = await res.json();

  // Sort movies by release date
  const movies = data.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));

  const watched = JSON.parse(localStorage.getItem('watchedMCU')) || [];
  const container = document.getElementById('app');
  container.innerHTML = '';

  movies.forEach(movie => {
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
    const list = movie.dependencies && movie.dependencies.length ? movie.dependencies.join(', ') : 'Nessuna';
    deps.innerHTML = `<em>Dipendenze:</em> ${list}`;

    div.appendChild(checkbox);
    div.appendChild(title);
    div.appendChild(deps);
    container.appendChild(div);
  });
}

loadMCUData();
