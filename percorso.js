import { loadWatched, byChronology, nextUnwatched } from './mcu-data.js';

const watched = await loadWatched();
const chrono = byChronology();
const next = nextUnwatched(watched);
const nextId = next ? next.id : null;

const groups = [];
chrono.forEach((p, i) => {
  const label = `${p.saga} · Fase ${p.phase}`;
  let g = groups[groups.length - 1];
  if (!g || g.label !== label) { g = { label, items: [] }; groups.push(g); }
  g.items.push({ p, i });
});

document.getElementById('timeline').innerHTML = groups.map(g => `
  <h6 class="timeline-group-label">${g.label}</h6>
  <div class="timeline-group">
    ${g.items.map(({ p, i }) => {
      const seen = watched.has(p.id);
      return `
      <div class="timeline-row">
        <div class="timeline-rail">
          <div class="rail-line${i === 0 ? ' rail-line--hidden' : ''}"></div>
          <span class="timeline-dot${seen ? ' timeline-dot--done' : ''}"></span>
          <div class="rail-line${i === chrono.length - 1 ? ' rail-line--hidden' : ''}"></div>
        </div>
        <div class="timeline-body">
          <span class="text-muted timeline-n">${String(i + 1).padStart(2, '0')}</span>
          <a class="timeline-title" href="dettaglio.html?id=${p.id}">${p.title}</a>
          <span class="tag tag-neutral">${p.type}</span>
          ${p.id === nextId ? '<span class="tag tag-outline">Sei qui</span>' : ''}
          <span class="text-muted timeline-meta">${p.duration} min · ${seen ? 'visto' : 'da vedere'}</span>
        </div>
      </div>`;
    }).join('')}
  </div>`).join('');
