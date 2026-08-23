import { PRODUCTS, ROMAN, loadWatched, saveWatched, fmtDate, fmtDuration, byChronology, nextUnwatched, trailerUrl, heroBackdrop } from './mcu-data.js';
import { DEPS } from './mcu-deps.js';

const ICON_CHECK = '<svg width="14" height="14" viewBox="0 0 256 256" fill="currentColor"><path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path></svg>';
const ICON_CHECK_SM = ICON_CHECK.replace(/width="14" height="14"/, 'width="10" height="10"');
const ICON_CAL = '<svg width="13" height="13" viewBox="0 0 256 256" fill="currentColor"><path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Z"></path></svg>';
const ICON_CLOCK = '<svg width="13" height="13" viewBox="0 0 256 256" fill="currentColor"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"></path></svg>';
const ICON_PLAY = '<svg width="13" height="13" viewBox="0 0 256 256" fill="currentColor"><path d="M232.4,114.49,88.32,26.35a16,16,0,0,0-16.2-.3A15.86,15.86,0,0,0,64,40.12V215.88a15.94,15.94,0,0,0,23.53,14.08l144.9-88.13a16,16,0,0,0,0-27.34Z"></path></svg>';

let watched = new Set();

function currentProduct() {
  const id = parseInt(new URLSearchParams(location.search).get('id'));
  return PRODUCTS.find(p => p.id === id)
    || nextUnwatched(watched)
    || PRODUCTS[0];
}

function neighborCard(p, showState = true) {
  const seen = watched.has(p.id);
  return `
    <a class="rail-item" href="dettaglio.html?id=${p.id}">
      <div class="tile tile--wide">
        ${p.cover ? `<img class="tile-cover" src="${p.cover}" alt="" loading="lazy">` : ''}
        <span class="tile-roman">${ROMAN[p.phase] || p.phase}</span>
        ${showState && seen ? `<span class="tag tag-accent tile-watched">${ICON_CHECK_SM} Visto</span>` : ''}
      </div>
      <div class="rail-item-title">${p.title}</div>
      <div class="text-muted rail-item-meta">${seen ? 'Visto' : 'Da vedere'} · ${p.type} · ${p.duration} min</div>
    </a>`;
}

function render() {
  const p = currentProduct();
  document.title = `MCU Tracker — ${p.title}`;
  const seen = watched.has(p.id);

  const bg = heroBackdrop(p);
  document.getElementById('hero').innerHTML = `
    ${bg ? `<img class="hero-bg" src="${bg}" alt=""><div class="hero-scrim"></div>` : ''}
    <span class="hero-ghost">${ROMAN[p.phase] || p.phase}</span>
    <div class="hero-content">
      <div class="hero-tags">
        <span class="tag tag-accent">${p.type}</span>
        <span class="tag tag-neutral">Fase ${p.phase}</span>
        <span class="tag tag-neutral">${p.saga}</span>
      </div>
      <h1>${p.title}</h1>
      <div class="hero-meta">
        <span class="with-icon">${ICON_CAL} ${fmtDate(p.release)}</span>
        <span class="with-icon">${ICON_CLOCK} ${fmtDuration(p.duration)}</span>
        <span>Regia di ${p.director}</span>
      </div>
      <p class="hero-overview">${p.overview}</p>
      <div class="hero-actions">
        <button type="button" class="btn btn-primary" id="toggle-watched">${ICON_CHECK} ${seen ? 'Visto ✓' : 'Segna come visto'}</button>
        <a class="btn btn-secondary" href="${trailerUrl(p)}" target="_blank" rel="noopener">${ICON_PLAY} Trailer</a>
      </div>
    </div>`;

  document.getElementById('toggle-watched').onclick = () => {
    watched.has(p.id) ? watched.delete(p.id) : watched.add(p.id);
    saveWatched(watched);
    render();
  };

  renderDeps(p);
}

const byId = Object.fromEntries(PRODUCTS.map(x => [x.id, x]));

// Le dipendenze effettive (mcu-deps.js) quando il titolo è coperto; i vicini
// cronologici come ripiego dichiarato quando non lo è. "Serve per" è il
// grafo letto al contrario: chi elenca questo titolo tra i suoi required.
function renderDeps(p) {
  const deps = DEPS[p.id];
  const beforeEl = document.getElementById('before');
  const extraEl = document.getElementById('before-extra');
  const afterEl = document.getElementById('after');
  const src = document.getElementById('deps-source');

  if (!deps) {
    document.getElementById('before-title').textContent = 'Prima di questo (cronologia)';
    document.getElementById('after-title').textContent = 'Dopo questo (cronologia)';
    const chrono = byChronology();
    const idx = chrono.findIndex(x => x.id === p.id);
    beforeEl.innerHTML = chrono.slice(Math.max(0, idx - 3), idx).map(x => neighborCard(x)).join('')
      || '<p class="text-muted" style="font-size:13px">Niente: si comincia da qui.</p>';
    extraEl.innerHTML = '';
    afterEl.innerHTML = chrono.slice(idx + 1, idx + 4).map(x => neighborCard(x, false)).join('')
      || '<p class="text-muted" style="font-size:13px">Fine della cronologia.</p>';
    src.textContent = 'Dipendenze non ancora catalogate per questo titolo: qui sopra vedi i vicini cronologici.';
    return;
  }

  document.getElementById('before-title').textContent = 'Dipendenze effettive';
  const interni = [];
  const esterni = [];
  for (const [cat, badge, label] of [['required', 'req', 'Richiesto'], ['optional', 'opt', 'Utile']]) {
    for (const d of deps[cat] || []) {
      if (typeof d === 'number' && byId[d]) interni.push({ p: byId[d], badge, label });
      else esterni.push({ t: d, label });
    }
  }
  beforeEl.innerHTML = interni.map(({ p: x, badge, label }) => `
    <a class="rail-item" href="dettaglio.html?id=${x.id}">
      <div class="tile tile--wide">
        ${x.cover ? `<img class="tile-cover" src="${x.cover}" alt="" loading="lazy">` : ''}
        <span class="tile-roman">${ROMAN[x.phase] || x.phase}</span>
        <span class="dep-badge ${badge} tile-watched">${label}</span>
      </div>
      <div class="rail-item-title">${x.title}</div>
      <div class="text-muted rail-item-meta">${watched.has(x.id) ? 'Visto ✓' : 'Da vedere'} · ${x.duration} min</div>
    </a>`).join('') || '<p class="text-muted" style="font-size:13px">Nessun prerequisito: parte da zero.</p>';

  const refs = (deps.references || []);
  extraEl.innerHTML = (esterni.length || refs.length) ? `<div class="dep-ext">
      ${esterni.map(e => `<span class="chip">${e.label.toLowerCase()}: ${typeof e.t === 'number' ? (byId[e.t]?.title ?? e.t) : e.t}</span>`).join('')}
      ${refs.map(r => `<span class="chip">rimando: ${typeof r === 'number' ? (byId[r]?.title ?? r) : r}</span>`).join('')}
    </div>` : '';

  document.getElementById('after-title').textContent = 'Serve per';
  const sblocca = Object.entries(DEPS)
    .filter(([, v]) => (v.required || []).includes(p.id))
    .map(([id]) => byId[parseInt(id)]).filter(Boolean);
  afterEl.innerHTML = sblocca.map(x => neighborCard(x, false)).join('')
    || '<p class="text-muted" style="font-size:13px">Nessun titolo lo richiede (per ora).</p>';

  src.textContent = 'Dipendenze dal dataset comunitario di mcuflowchart.app.';
}

watched = await loadWatched();
render();
