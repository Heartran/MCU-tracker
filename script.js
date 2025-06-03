// Dizionario delle traduzioni
const TRANSLATIONS = {
  'it-IT': {
    'watched': 'Segnato come visto',
    'director': 'Regia',
    'phase': 'Fase',
    'saga': 'Saga',
    'trailer': '🎬 Guarda Trailer',
    'no_plot': 'Trama non disponibile.',
    'to_understand_better': '📌 Per capire meglio:',
    'loading': 'Caricamento in corso...',
    'error': 'Errore nel caricamento dei dati',
    'minutes': 'min',
    'released': 'Uscito il',
    'duration': 'Durata',
    'language': 'Lingua:',
    'reload': 'Ricarica la pagina'
  },
  'en-US': {
    'watched': 'Mark as watched',
    'director': 'Director',
    'phase': 'Phase',
    'saga': 'Saga',
    'trailer': '🎬 Watch Trailer',
    'no_plot': 'Plot not available.',
    'to_understand_better': '📌 To better understand:',
    'loading': 'Loading...',
    'error': 'Error loading data',
    'minutes': 'min',
    'released': 'Released',
    'duration': 'Duration',
    'language': 'Language:',
    'reload': 'Reload page'
  }
};

// Funzione per ottenere la traduzione
function t(key, lang = getLanguage()) {
  const langDict = TRANSLATIONS[lang] || TRANSLATIONS['en-US'];
  return langDict[key] || key;
}

// Inizializza il selettore di lingua
document.addEventListener('DOMContentLoaded', () => {
  const langSelector = document.getElementById('language-selector');
  if (langSelector) {
    langSelector.value = getLanguage();
    langSelector.addEventListener('change', (e) => {
      setLanguage(e.target.value);
    });
  }
  
  // Carica i film all'avvio
  loadMCU();
});

async function loadMCU() {
  const container = document.getElementById('movie-list');
  container.innerHTML = `<div class="col-span-3 text-center py-10">${t('loading')}</div>`;
  
  try {
    // Carica i film e le dipendenze in parallelo
    const [moviesRes, depsRes] = await Promise.all([
      fetch('https://mcuapi.up.railway.app/api/v1/movies'),
      fetch('dependencies.json')
    ]);
    
    if (!moviesRes.ok || !depsRes.ok) {
      throw new Error('Failed to fetch data');
    }
    
    const moviesData = await moviesRes.json();
    const movies = moviesData.data.sort((a, b) => a.chronology - b.chronology);
    const dependencies = await depsRes.json();
    const watched = JSON.parse(localStorage.getItem("watchedMCU") || "[]");
    
    container.innerHTML = '';
    
    for (const movie of movies) {
      const isChecked = watched.includes(movie.id);
      const card = document.createElement('div');
      card.className = `bg-gray-800 rounded-lg shadow p-4 flex flex-col h-full`;
      
      // Formatta la data di uscita
      const releaseDate = movie.release_date ? new Date(movie.release_date).toLocaleDateString(getLanguage()) : '?';
      
      // Ottieni la descrizione localizzata
      const overview = await getLocalizedOverview(movie);
      
      card.innerHTML = `
        <img src="${movie.cover_url}" alt="${movie.title}" class="rounded mb-3 shadow w-full h-64 object-cover">
        <h2 class="text-xl font-bold mb-2">${movie.title}</h2>
        <p class="text-sm text-gray-400 mb-2">
          <span title="${t('released')}">📅 ${releaseDate}</span> • 
          <span title="${t('duration')}">⏱️ ${movie.duration || '?'} ${t('minutes')}</span>
        </p>
        <p class="text-sm text-gray-300 mb-2">
          <strong>${t('phase')}:</strong> ${movie.phase} – 
          <strong>${t('saga')}:</strong> ${movie.saga}
        </p>
        <p class="text-sm text-gray-400 mb-2">
          <strong>${t('director')}:</strong> ${movie.directed_by || "?"}
        </p>
        <p class="text-sm mb-3 flex-grow">
          ${overview ? (overview.length > 150 ? overview.substring(0, 150) + '…' : overview) : t('no_plot')}
        </p>
        ${movie.trailer_url ? 
          `<a href="${movie.trailer_url}" target="_blank" class="text-blue-400 hover:text-blue-300 underline mb-3 inline-block">
            ${t('trailer')}
          </a>` : ''}
        <label class="flex items-center gap-2 mt-auto">
          <input type="checkbox" ${isChecked ? 'checked' : ''} 
                 class="form-checkbox h-4 w-4 text-green-500 rounded focus:ring-green-400" 
                 data-id="${movie.id}">
          <span class="text-sm">${t('watched')}</span>
        </label>
        ${dependencies[movie.title] ? `
          <div class="mt-3 p-2 bg-gray-700/50 rounded text-sm border-l-4 border-yellow-500">
            <p class="text-yellow-400 font-medium">${t('to_understand_better')}</p>
            <ul class="list-disc list-inside mt-1 space-y-1">
              ${dependencies[movie.title].map(dep => 
                `<li class="text-gray-300">${dep}</li>`
              ).join('')}
            </ul>
          </div>
        ` : ''}
      `;
      
      container.appendChild(card);
    }
    
    // Gestione degli eventi per le checkbox
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        const id = parseInt(checkbox.getAttribute('data-id'));
        const current = new Set(JSON.parse(localStorage.getItem("watchedMCU") || "[]"));
        checkbox.checked ? current.add(id) : current.delete(id);
        localStorage.setItem("watchedMCU", JSON.stringify([...current]));
      });
    });
    
  } catch (error) {
    console.error('Errore nel caricamento dei dati:', error);
    container.innerHTML = `
      <div class="col-span-3 text-center py-10 text-red-400">
        <p class="text-xl font-bold mb-2">${t('error')}</p>
        <p class="text-sm">${error.message}</p>
        <button onclick="window.location.reload()" class="mt-4 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">
          ${t('reload')}
        </button>
      </div>
    `;
  }
}

// Funzione per ottenere la descrizione nella lingua corretta
async function getLocalizedOverview(movie) {
  const currentLang = getLanguage();
  
  // Se non c'è una descrizione, restituisci il messaggio di errore
  if (!movie.overview) {
    return t('no_plot');
  }
  
  // Se la lingua è inglese, restituisci la descrizione originale
  if (currentLang === 'en-US') {
    return movie.overview;
  }
  
  // Altrimenti, prova a tradurre la descrizione in italiano
  try {
    // Usa la cache delle traduzioni se disponibile
    if (!window.translationCache) {
      window.translationCache = new Map();
    }
    
    const cacheKey = `${movie.id}_${currentLang}`;
    if (window.translationCache.has(cacheKey)) {
      return window.translationCache.get(cacheKey);
    }
    
    // Traduci solo i primi 200 caratteri per performance
    const textToTranslate = movie.overview.length > 200 
      ? movie.overview.substring(0, 200) + '...' 
      : movie.overview;
      
    const translatedText = await translateText(textToTranslate, 'en', currentLang.split('-')[0]);
    
    // Salva nella cache
    if (translatedText) {
      window.translationCache.set(cacheKey, translatedText);
      return translatedText;
    }
    
    return movie.overview;
  } catch (error) {
    console.error('Errore nella traduzione della descrizione:', error);
    return movie.overview; // In caso di errore, restituisci il testo originale
  }
}

// Funzione per tradurre il testo usando LibreTranslate
async function translateText(text, sourceLang, targetLang) {
  if (!text || sourceLang === targetLang) return text;
  
  try {
    const response = await fetch('https://libretranslate.de/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source: sourceLang,
        target: targetLang,
        format: 'text',
        api_key: '' // Non richiesto per il server pubblico
      })
    });
    
    if (!response.ok) {
      console.error('Errore nella traduzione:', await response.text());
      return text; // In caso di errore, restituisci il testo originale
    }
    
    const data = await response.json();
    return data.translatedText || text;
  } catch (error) {
    console.error('Errore durante la traduzione:', error);
    return text; // In caso di errore, restituisci il testo originale
  }
}

// Funzione per ottenere la lingua corrente
function getLanguage() {
  return localStorage.getItem('preferredLanguage') || 'it-IT';
}

// Funzione per impostare la lingua
function setLanguage(lang) {
  localStorage.setItem('preferredLanguage', lang);
  window.location.reload();
}
