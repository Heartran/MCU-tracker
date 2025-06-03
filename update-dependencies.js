require('dotenv').config();
const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const OUTPUT_FILE = 'dependencies.json';
const MOVIES_FILE = 'mcu-movies.json';
const AUTO_UPDATE_DAYS = 7; // Aggiorna automaticamente la lista ogni 7 giorni

if (!TMDB_API_KEY) {
  console.error('Errore: TMDB_API_KEY non trovata nel file .env');
  process.exit(1);
}

// Configurazione di axios per TMDB
const tmdb = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: TMDB_API_KEY,
    language: 'it-IT',
  },
});

// Funzione per caricare la lista dei film dal file
async function loadMoviesList() {
  try {
    const data = await fs.readFile(MOVIES_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Errore nel caricamento di ${MOVIES_FILE}:`, error.message);
    return null;
  }
}

// Funzione per salvare la lista aggiornata dei film
async function saveMoviesList(moviesData) {
  try {
    const data = {
      last_updated: new Date().toISOString(),
      movies: moviesData
    };
    await fs.writeFile(MOVIES_FILE, JSON.stringify(data, null, 2));
    console.log(`✅ Lista film aggiornata in ${MOVIES_FILE}`);
    return true;
  } catch (error) {
    console.error(`Errore nel salvataggio di ${MOVIES_FILE}:`, error.message);
    return false;
  }
}

// Funzione per verificare se è necessario aggiornare la lista
function needsUpdate(lastUpdated) {
  if (!lastUpdated) return true;
  const lastUpdate = new Date(lastUpdated);
  const daysSinceUpdate = (Date.now() - lastUpdate) / (1000 * 60 * 60 * 24);
  return daysSinceUpdate >= AUTO_UPDATE_DAYS;
}

// Funzione per aggiornare la lista dei film da TMDB
async function updateMoviesList() {
  try {
    console.log('🔍 Ricerca della collezione ufficiale MCU su TMDB...');
    
    // Cerca la collezione ufficiale del MCU
    const searchResponse = await tmdb.get('/search/collection', {
      params: {
        query: 'Marvel Cinematic Universe',
      },
    });

    const collectionId = searchResponse.data.results[0]?.id;
    if (!collectionId) {
      throw new Error('Collezione MCU non trovata');
    }

    // Ottieni i dettagli della collezione
    const collectionResponse = await tmdb.get(`/collection/${collectionId}`);
    const movies = collectionResponse.data.parts || [];

    if (movies.length === 0) {
      throw new Error('Nessun film trovato nella collezione');
    }

    // Formatta i dati per il salvataggio
    const moviesData = movies
      .filter(movie => movie.poster_path) // Solo film con locandina
      .map(movie => ({
        id: movie.id,
        title: movie.title,
        release_date: movie.release_date
      }))
      .sort((a, b) => new Date(a.release_date) - new Date(b.release_date));

    // Salva la nuova lista
    await saveMoviesList(moviesData);
    return moviesData;
  } catch (error) {
    console.error('Errore nell\'aggiornamento della lista dei film:', error.message);
    return null;
  }
}

// Funzione per ottenere tutti i film del MCU
async function getMCUMovies(forceUpdate = false) {
  try {
    console.log('📂 Caricamento lista film MCU...');
    
    // Carica la lista esistente
    let moviesList = await loadMoviesList();
    let moviesData = moviesList?.movies || [];
    
    // Verifica se è necessario aggiornare
    const shouldUpdate = forceUpdate || !moviesList || needsUpdate(moviesList.last_updated);
    
    if (shouldUpdate) {
      console.log('🔄 Aggiornamento della lista dei film...');
      const updatedMovies = await updateMoviesList();
      if (updatedMovies) {
        moviesData = updatedMovies;
      } else if (moviesData.length === 0) {
        throw new Error('Impossibile recuperare la lista dei film');
      }
    } else {
      console.log('✅ Utilizzo lista film aggiornata al', new Date(moviesList.last_updated).toLocaleDateString());
    }
    
    // Recupera i dettagli completi per ogni film
    const movies = [];
    
    for (const movie of moviesData) {
      try {
        const response = await tmdb.get(`/movie/${movie.id}`);
        movies.push({
          ...response.data,
          // Manteniamo l'ID originale e la data di uscita dalla nostra lista
          id: movie.id,
          release_date: movie.release_date,
          // Sovrascriviamo il titolo con quello ufficiale
          title: movie.title
        });
        console.log(`✅ ${movie.title} (${movie.release_date})`);
      } catch (error) {
        console.error(`❌ Errore nel recupero di ${movie.title}:`, error.message);
      }
    }
    
    return movies.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
  } catch (error) {
    console.error('Errore nel recupero dei film:', error.message);
    return [];
  }
}

// Analizza le dipendenze di un film
async function analyzeDependencies(movie, allMovies) {
  const dependencies = {
    dependencies: [],
    type: 'movie',
    importance: 'medium',
    release_date: movie.release_date
  };

  try {
    // Ottieni i dettagli del film con i crediti
    const details = await tmdb.get(`/movie/${movie.id}`, {
      params: {
        append_to_response: 'credits,keywords',
      },
    });

    const data = details.data;

    // Se è un sequel, aggiungi il film precedente come dipendenza
    if (data.belongs_to_collection) {
      const collectionMovies = allMovies.filter(
        m => m.belongs_to_collection?.id === data.belongs_to_collection.id && 
             m.id !== movie.id
      );
      
      // Aggiungi solo i film della stessa saga usciti prima
      const previousMovies = collectionMovies
        .filter(m => new Date(m.release_date) < new Date(movie.release_date))
        .sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
      
      if (previousMovies.length > 0) {
        // Prendi solo l'ultimo film della saga
        dependencies.dependencies.push(previousMovies[0].title);
      }
    }

    // Controlla i personaggi principali
    const mainCharacters = data.credits?.cast?.slice(0, 5).map(c => c.name) || [];
    
    // Cerca altri film con gli stessi personaggi
    for (const character of mainCharacters) {
      const actorMovies = await searchActorMovies(character);
      const previousMovies = actorMovies.filter(
        m => m.release_date && 
             new Date(m.release_date) < new Date(movie.release_date) &&
             m.id !== movie.id
      );
      
      // Aggiungi al massimo 2 film precedenti dello stesso attore
      previousMovies.slice(0, 2).forEach(m => {
        if (!dependencies.dependencies.includes(m.title)) {
          dependencies.dependencies.push(m.title);
        }
      });
    }

    // Imposta l'importanza in base al numero di dipendenze
    if (dependencies.dependencies.length > 2) {
      dependencies.importance = 'high';
    } else if (dependencies.dependencies.length === 0) {
      dependencies.importance = 'low';
    }

  } catch (error) {
    console.error(`Errore nell'analisi di ${movie.title}:`, error.message);
  }

  return dependencies;
}

// Cerca i film di un attore
async function searchActorMovies(actorName) {
  try {
    const searchResponse = await tmdb.get('/search/person', {
      params: {
        query: actorName,
      },
    });

    const personId = searchResponse.data.results[0]?.id;
    if (!personId) return [];

    const creditsResponse = await tmdb.get(`/person/${personId}/movie_credits`);
    return creditsResponse.data.cast || [];
  } catch (error) {
    console.error(`Errore nella ricerca di ${actorName}:`, error.message);
    return [];
  }
}

// Funzione principale
async function main() {
  console.log('🚀 Inizio aggiornamento dipendenze MCU...');
  
  // Ottieni tutti i film del MCU
  console.log('📽️  Recupero la lista dei film...');
  const movies = await getMCUMovies();
  
  if (movies.length === 0) {
    console.error('❌ Nessun film trovato');
    return;
  }
  
  console.log(`✅ Trovati ${movies.length} film`);
  
  // Analizza le dipendenze per ogni film
  const dependencies = {};
  
  for (const movie of movies) {
    console.log(`🔍 Analisi di: ${movie.title}...`);
    const movieDeps = await analyzeDependencies(movie, movies);
    if (movieDeps.dependencies.length > 0) {
      dependencies[movie.title] = movieDeps;
    }
  }
  
  // Salva il file
  await fs.writeFile(OUTPUT_FILE, JSON.stringify(dependencies, null, 2));
  console.log(`\n🎉 File ${OUTPUT_FILE} aggiornato con successo!`);
  console.log(`📊 Statistiche:`);
  console.log(`   - Film analizzati: ${movies.length}`);
  console.log(`   - Film con dipendenze: ${Object.keys(dependencies).length}`);
  
  const totalDeps = Object.values(dependencies).reduce(
    (sum, deps) => sum + deps.dependencies.length, 0
  );
  console.log(`   - Dipendenze totali: ${totalDeps}`);
}

// Esegui lo script
main().catch(console.error);
