// Configurazione per l'API
const CONFIG = {
  TMDB_API_KEY: process.env.TMDB_API_KEY,
  DEFAULT_LANGUAGE: 'it-IT',
  FALLBACK_LANGUAGE: 'en-US'
};

// Funzione per ottenere la lingua preferita dall'utente
function getLanguage() {
  return localStorage.getItem('preferredLanguage') || CONFIG.DEFAULT_LANGUAGE;
}

// Funzione per impostare la lingua preferita
function setLanguage(lang) {
  localStorage.setItem('preferredLanguage', lang);
  window.location.reload();
}
