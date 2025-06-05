async function loadMCUData() {

  // Fetch movies from the public MCU API
  const res = await fetch('https://mcuapi.up.railway.app/api/v1/movies');
  const apiData = await res.json();

  // Extract and sort movies by release date
  const movies = apiData.data.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));

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

    const phaseInfo = document.createElement('p');
    phaseInfo.textContent = `Fase: ${movie.phase}`;

    div.appendChild(checkbox);
    div.appendChild(title);
    div.appendChild(phaseInfo);
    container.appendChild(div);
  });
}

loadMCUData();
