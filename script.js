async function loadMCUData() {
    const res = await fetch('./data/mcu.json');
    const data = await res.json();
    const watched = JSON.parse(localStorage.getItem('watchedMCU')) || [];
  
    const container = document.getElementById('app');
    container.innerHTML = '';
  
    data.forEach(item => {
      const div = document.createElement('div');
      div.className = 'mcu-item';
  
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = watched.includes(item.title);
      checkbox.addEventListener('change', () => {
        const updated = new Set(watched);
        checkbox.checked ? updated.add(item.title) : updated.delete(item.title);
        localStorage.setItem('watchedMCU', JSON.stringify([...updated]));
      });
  
      const title = document.createElement('strong');
      title.textContent = `${item.title} (${item.release_date})`;
  
      const deps = document.createElement('p');
      deps.innerHTML = `<em>Dipendenze:</em> ${item.dependencies.join(', ')}`;
  
      div.appendChild(checkbox);
      div.appendChild(title);
      div.appendChild(deps);
      container.appendChild(div);
    });
  }
  
  loadMCUData();
  