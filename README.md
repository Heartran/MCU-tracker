# MCU Tracker

A static multi-page site for tracking the Marvel Cinematic Universe — films, series and One-Shots — styled with the Nocturne design system (designed in Claude Design).

## Pages

- `index.html` — **Libreria**: hero with the next title to watch, an "up next" rail, and the full grid with search, type/phase/saga filters and sorting.
- `dettaglio.html?id=N` — **Dettaglio**: one title with its chronological neighbors ("watch before this" / "after this").
- `percorso.html` — **Percorso**: the full MCU chronology as a timeline, grouped by saga and phase, with a "you are here" marker.
- `statistiche.html` — **Statistiche**: watch progress by phase, type and saga.

## Data

Titles live in `mcu-data.js`, a self-contained dataset (field shape modeled on mcuapi, plus `type`, since the tracker also covers series and One-Shots that the movie-only API doesn't provide). No external API calls are needed to render the site.

Watched state is shared across devices through the bundled Node server (`/api/watched`); in a pure static deploy it falls back to the browser's localStorage.

## Styling

- `nocturne.css` — the Nocturne design-system stylesheet (tokens + component classes). Treat it as vendored: retune tokens there.
- `app.css` — the page layer built on those tokens.

## Local development

```bash
npm start        # Node server with shared watched-state persistence, port 3300
```

or, for a static-only preview:

```bash
python3 -m http.server 8000
```

## Deploying to Netlify

1. Log in to [Netlify](https://app.netlify.com/) and create a new site from your Git repository.
2. Keep the **Build command** empty and set **Publish directory** to `./`.

The included `netlify.toml` file sets the publish directory to the project root. On Netlify there is no backend, so watched state lives in localStorage.
