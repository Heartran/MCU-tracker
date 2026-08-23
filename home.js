import { PRODUCTS, ROMAN, loadWatched, saveWatched, fmtDate, byRelease, nextUnwatched, trailerUrl, heroBackdrop } from './mcu-data.js';

const ICON_CHECK = '<svg width="14" height="14" viewBox="0 0 256 256" fill="currentColor"><path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path></svg>';
const ICON_CHECK_SM = ICON_CHECK.replace(/width="14" height="14"/, 'width="10" height="10"');
const ICON_CAL = '<svg width="13" height="13" viewBox="0 0 256 256" fill="currentColor"><path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Z"></path></svg>';
const ICON_CLOCK = '<svg width="13" height="13" viewBox="0 0 256 256" fill="currentColor"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path></svg>';
const ICON_CLOCK_SM = ICON_CLOCK.replace(/width="13" height="13"/, 'width="11" height="11"');
const ICON_PLAY = '<svg width="13" height="13" viewBox="0 0 256 256" fill="currentColor"><path d="M232.4,114.49,88.32,26.35a16,16,0,0,0-16.2-.3A15.86,15.86,0,0,0,64,40.12V215.88a15.94,15.94,0,0,0,23.53,14.08l144.9-88.13a16,16,0,0,0,0-27.34Z"></path></svg>';
const ICON_PLUS = '<svg width="15" height="15" viewBox="0 0 256 256" fill="currentColor"><path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path></svg>';

let watched = new Set();
const state = { query: '', type: 'all', phase: 'all', saga: 'all', sort: 'release', hideWatched: false };

function save() { saveWatched(watched); }

function renderHero() {
  const hero = document.getElementById('hero');
  const next = nextUnwatched(watched);
  if (!next) {
    hero.innerHTML = `
      <span class="hero-ghost">✓</span>
      <span class="card-kicker hero-kicker">Prossimo da guardare</span>
      <h1>Tutto visto!</h1>
      <p class="hero-overview">Hai completato la collezione.</p>`;
    return;
  }
  const bg = heroBackdrop(next);
  hero.innerHTML = `
    ${bg ? `<img class="hero-bg" src="${bg}" alt=""><div class="hero-scrim"></div>` : ''}
    <span class="hero-ghost">${ROMAN[next.phase] || next.phase}</span>
    <span class="card-kicker hero-kicker">Prossimo da guardare</span>
    <h1>${next.title}</h1>
    <div class="hero-meta">
      <span class="with-icon">${ICON_CAL} ${fmtDate(next.release)}</span>
      <span class="with-icon">${ICON_CLOCK} ${next.duration} min</span>
      <span class="tag tag-outline">${next.type}</span>
      <span class="tag tag-neutral">Fase ${next.phase}</span>
    </div>
    <p class="hero-overview">${next.overview}</p>
    <div class="hero-actions">
      <button type="button" class="btn btn-primary" id="hero-watch">${ICON_CHECK} Segna come visto</button>
      <a class="btn btn-secondary" href="${trailerUrl(next)}" target="_blank" rel="noopener">${ICON_PLAY} Trailer</a>
      <a class="btn btn-icon btn-secondary" href="dettaglio.html?id=${next.id}" aria-label="Dettagli">${ICON_PLUS}</a>
    </div>`;
  document.getElementById('hero-watch').onclick = () => {
    watched.add(next.id);
    save();
    renderAll();
  };
}

function renderUpNext() {
  const rail = document.getElementById('up-next');
  const unwatched = byRelease().filter(p => !watched.has(p.id));
  rail.innerHTML = unwatched.slice(1, 11).map((p, i) => `
    <a class="rail-item" href="dettaglio.html?id=${p.id}">
      <div class="tile">
        ${p.cover ? `<img class="tile-cover" src="${p.cover}" alt="" loading="lazy">` : ''}
        <span class="tile-roman">${ROMAN[p.phase] || p.phase}</span>
        <span class="tile-n">${String(i + 2).padStart(2, '0')}</span>
      </div>
      <div class="rail-item-title">${p.title}</div>
      <div class="text-muted rail-item-meta">${p.type} · ${p.duration} min</div>
    </a>`).join('');
}

function renderGrid() {
  const { query, type, phase, saga, sort, hideWatched } = state;
  let list = PRODUCTS.slice();
  if (query) list = list.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));
  if (type !== 'all') list = list.filter(p => p.type === type);
  if (phase !== 'all') list = list.filter(p => p.phase === parseInt(phase));
  if (saga !== 'all') list = list.filter(p => p.saga === saga);
  if (hideWatched) list = list.filter(p => !watched.has(p.id));
  list.sort((a, b) => {
    switch (sort) {
      case 'chronology': return a.chronology - b.chronology;
      case 'phase': return a.phase - b.phase;
      case 'title': return a.title.localeCompare(b.title);
      default: return new Date(a.release) - new Date(b.release);
    }
  });

  document.getElementById('count-line').textContent =
    `${list.length} titoli${hideWatched ? ' · i visti sono nascosti' : ''}`;

  const grid = document.getElementById('grid');
  grid.innerHTML = list.map(p => {
    const seen = watched.has(p.id);
    return `
    <article>
      <a class="tile-link" href="dettaglio.html?id=${p.id}">
        <div class="tile" style="opacity:${seen ? '0.55' : '1'}">
          ${p.cover ? `<img class="tile-cover" src="${p.cover}" alt="" loading="lazy">` : ''}
          <span class="tile-roman">${ROMAN[p.phase] || p.phase}</span>
          ${seen ? `<span class="tag tag-accent tile-watched">${ICON_CHECK_SM} Visto</span>` : ''}
        </div>
      </a>
      <div class="grid-card-row">
        <div class="grid-card-main">
          <span class="card-kicker">${p.type.toUpperCase()} · FASE ${p.phase}</span>
          <a class="grid-card-title" href="dettaglio.html?id=${p.id}">${p.title}</a>
          <div class="card-meta">${ICON_CLOCK_SM} ${fmtDate(p.release)} · ${p.duration} min</div>
        </div>
        <button type="button" class="btn btn-icon ${seen ? 'btn-primary' : 'btn-secondary'}"
          data-id="${p.id}" aria-label="${seen ? 'Segna da vedere' : 'Segna come visto'}"
          title="${seen ? 'Segna da vedere' : 'Segna come visto'}">${ICON_CHECK}</button>
      </div>
    </article>`;
  }).join('');

  grid.querySelectorAll('button[data-id]').forEach(btn => {
    btn.onclick = () => {
      const id = parseInt(btn.dataset.id);
      watched.has(id) ? watched.delete(id) : watched.add(id);
      save();
      renderAll();
    };
  });
}

function renderAll() {
  renderHero();
  renderUpNext();
  renderGrid();
}

function setupControls() {
  const phases = [...new Set(PRODUCTS.map(p => p.phase))].sort((a, b) => a - b);
  const phaseSel = document.getElementById('phase-filter');
  phases.forEach(n => {
    const opt = document.createElement('option');
    opt.value = n;
    opt.textContent = `Fase ${n}`;
    phaseSel.appendChild(opt);
  });
  const sagas = [...new Set(PRODUCTS.map(p => p.saga))];
  const sagaSel = document.getElementById('saga-filter');
  sagas.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s;
    opt.textContent = s;
    sagaSel.appendChild(opt);
  });

  document.getElementById('search').addEventListener('input', e => { state.query = e.target.value; renderGrid(); });
  document.querySelectorAll('#type-seg input[name="tipo"]').forEach(r =>
    r.addEventListener('change', () => { state.type = r.value; renderGrid(); }));
  phaseSel.addEventListener('change', e => { state.phase = e.target.value; renderGrid(); });
  sagaSel.addEventListener('change', e => { state.saga = e.target.value; renderGrid(); });
  document.getElementById('sort-select').addEventListener('change', e => { state.sort = e.target.value; renderGrid(); });
  document.getElementById('hide-watched').addEventListener('change', e => { state.hideWatched = e.target.checked; renderGrid(); });
}

watched = await loadWatched();
setupControls();
renderAll();
