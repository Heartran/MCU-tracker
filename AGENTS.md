# AGENT Instructions

Questo repository contiene un sito statico multi-pagina per segnare i titoli visti del Marvel Cinematic Universe (film, serie e One-Shot).

## Struttura

- Pagine: `index.html` (Libreria), `dettaglio.html`, `percorso.html`, `statistiche.html`, ognuna con il proprio modulo JS (`home.js`, `dettaglio.js`, `percorso.js`, `statistiche.js`).
- Dati: `mcu-data.js` — dataset statico condiviso + persistenza dello stato "visto" (server `/api/watched` con fallback localStorage).
- Stile: `nocturne.css` è il design system Nocturne (vendored, i token sono lì); `app.css` è il layer di pagina. Non introdurre colori o misure fuori dai token.

## Avvio locale

1. Posizionati nella cartella del progetto.
2. `npm start` avvia il server Node su porta 3300 (persistenza "visto" condivisa), oppure `python3 -m http.server 8000` per una preview solo statica.
3. Apri il sito in un browser.

Per ogni modifica assicurati di controllare `git status` e `git diff` prima di effettuare un commit.
