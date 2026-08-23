import { PRODUCTS, loadWatched } from './mcu-data.js';

const watched = await loadWatched();
const seen = PRODUCTS.filter(p => watched.has(p.id));
const minutes = arr => arr.reduce((s, p) => s + p.duration, 0);

document.getElementById('stat-cards').innerHTML = `
  <div class="card elev-sm">
    <span class="card-kicker">Visti</span>
    <span class="stat-value">${seen.length}</span>
    <span class="text-muted stat-sub">su ${PRODUCTS.length} titoli</span>
  </div>
  <div class="card elev-sm">
    <span class="card-kicker">Ore guardate</span>
    <span class="stat-value">${Math.round(minutes(seen) / 60)}</span>
    <span class="text-muted stat-sub">di Marvel Cinematic Universe</span>
  </div>
  <div class="card elev-sm">
    <span class="card-kicker">Ore rimanenti</span>
    <span class="stat-value">${Math.round(minutes(PRODUCTS.filter(p => !watched.has(p.id))) / 60)}</span>
    <span class="text-muted stat-sub">per completare la collezione</span>
  </div>`;

function bar(label, all, alt = false) {
  const done = all.filter(p => watched.has(p.id)).length;
  const pct = all.length ? Math.round((done / all.length) * 100) : 0;
  return `
  <div class="bar">
    <div class="bar-labels">
      <span>${label}</span>
      <span class="text-muted">${done} / ${all.length}</span>
    </div>
    <div class="bar-track"><div class="bar-fill${alt ? ' bar-fill--alt' : ''}" style="width:${pct}%"></div></div>
  </div>`;
}

const phases = [...new Set(PRODUCTS.map(p => p.phase))].sort((a, b) => a - b);
document.getElementById('bars-phase').innerHTML =
  phases.map(n => bar(`Fase ${n}`, PRODUCTS.filter(p => p.phase === n))).join('');

const types = [...new Set(PRODUCTS.map(p => p.type))];
document.getElementById('bars-type').innerHTML =
  types.map(t => bar(t, PRODUCTS.filter(p => p.type === t), true)).join('');

const sagas = [...new Set(PRODUCTS.map(p => p.saga))];
document.getElementById('bars-saga').innerHTML =
  sagas.map(s => bar(s, PRODUCTS.filter(p => p.saga === s))).join('');
