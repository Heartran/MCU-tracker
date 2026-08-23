import { PRODUCTS, DOOMSDAY, loadWatched, saveWatched, fmtDuration } from './mcu-data.js';

const ICON_CHECK = '<svg width="14" height="14" viewBox="0 0 256 256" fill="currentColor"><path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path></svg>';

const byId = Object.fromEntries(PRODUCTS.map(p => [p.id, p]));
let watched = new Set();

// Ogni voce della roadmap normalizzata: ids da spuntare, dati da mostrare.
// Le voci esterne (era Fox) non stanno in PRODUCTS ma i loro id finiscono
// nello stesso watched.json: interi come gli altri, il server non distingue.
function resolve(item) {
  if (item.ext) {
    const e = item.ext;
    return { ids: [e.id], title: e.title, cover: e.cover, duration: e.duration,
             meta: `${e.year} · ${fmtDuration(e.duration)}`, tag: e.tag, link: null, why: item.why };
  }
  const ids = item.refs || [item.ref];
  const ps = ids.map(id => byId[id]);
  const p = ps[0];
  const duration = ps.reduce((a, x) => a + x.duration, 0);
  const title = item.refs ? p.title.replace(/ – Stagione \d+$/, '') : p.title;
  return { ids, title, cover: p.cover, duration,
           meta: `${p.type} · ${new Date(p.release).getFullYear()} · ${fmtDuration(duration)}`,
           tag: null, link: `dettaglio.html?id=${p.id}`, why: item.why };
}

function seen(entry) { return entry.ids.every(id => watched.has(id)); }

function render() {
  const entries = DOOMSDAY.items.map(resolve);
  const done = entries.filter(seen);
  const total = entries.reduce((a, e) => a + e.duration, 0);
  const left = entries.filter(e => !seen(e)).reduce((a, e) => a + e.duration, 0);
  const giorni = Math.max(0, Math.ceil((new Date(DOOMSDAY.release + 'T00:00:00') - new Date()) / 86400000));
  const pct = Math.round(done.length / entries.length * 100);

  document.getElementById('dd-hero').innerHTML = `
    <span class="hero-ghost">${entries.length - done.length || '✓'}</span>
    <div class="hero-content">
      <span class="card-kicker hero-kicker">Dipendenze effettive · la lista ufficiale Disney+</span>
      <h1>Verso ${DOOMSDAY.event}</h1>
      <div class="hero-meta">
        <span>Esce il ${new Date(DOOMSDAY.release).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        <span class="tag tag-accent">${giorni} giorni</span>
      </div>
      <div class="dd-progress">
        <div class="dd-bar"><div class="dd-fill" style="width:${pct}%"></div></div>
        <span class="dd-progress-label">${done.length}/${entries.length} viste · ${left ? 'mancano ' + fmtDuration(left) : 'sei in pari'} <span class="text-muted">su ${fmtDuration(total)} totali</span></span>
      </div>
    </div>`;

  document.getElementById('dd-list').innerHTML = entries.map((e, i) => `
    <div class="dd-row ${seen(e) ? 'done' : ''}">
      <span class="dd-n">${String(i + 1).padStart(2, '0')}</span>
      <div class="dd-thumb">${e.cover ? `<img src="${e.cover}" alt="" loading="lazy">` : ''}</div>
      <div class="dd-main">
        <div class="dd-title">
          ${e.link ? `<a href="${e.link}">${e.title}</a>` : e.title}
          ${e.tag ? `<span class="tag tag-outline">${e.tag}</span>` : ''}
        </div>
        <div class="text-muted dd-meta">${e.meta}</div>
        <div class="dd-why">${e.why}</div>
      </div>
      <button type="button" class="btn btn-icon ${seen(e) ? 'btn-primary' : 'btn-secondary'}"
        data-i="${i}" aria-label="${seen(e) ? 'Segna da vedere' : 'Segna come vista'}"
        title="${seen(e) ? 'Segna da vedere' : 'Segna come vista'}">${ICON_CHECK}</button>
    </div>`).join('');

  document.getElementById('dd-source').textContent = 'Fonte: ' + DOOMSDAY.source +
    '. X-Men e X2 (era Fox) compaiono solo qui: la Libreria resta canone MCU.';

  document.querySelectorAll('#dd-list button[data-i]').forEach(btn => {
    btn.onclick = async () => {
      const e = entries[parseInt(btn.dataset.i)];
      const on = !seen(e);
      e.ids.forEach(id => on ? watched.add(id) : watched.delete(id));
      await saveWatched(watched);
      render();
    };
  });
}

watched = await loadWatched();
render();
