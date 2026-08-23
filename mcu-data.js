// Dataset MCU condiviso fra le pagine — forma dei campi ricalcata su mcuapi
// (title, phase, saga, release, duration, chronology, director, overview)
// più `type`, perché il tracker copre anche Serie e One-Shot che l'API
// (solo film) non fornisce. È la fonte dati del design Nocturne: statico,
// autonomo, funziona anche in un deploy senza backend.
export const PRODUCTS = [
  {id:1, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1675207074/mcuapi/gallery/Movies/captain_america_the_first_avenger/posters/1.jpg", title:"Captain America: Il primo Vendicatore", type:"Film", phase:1, saga:"Saga dell'Infinito", release:"2011-07-22", duration:124, chronology:1, director:"Joe Johnston", overview:"Steve Rogers diventa il supersoldato americano durante la Seconda guerra mondiale."},
  {id:2, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1675211712/mcuapi/gallery/Movies/captain_marvel/posters/1.jpg", title:"Captain Marvel", type:"Film", phase:3, saga:"Saga dell'Infinito", release:"2019-03-06", duration:124, chronology:2, director:"Anna Boden, Ryan Fleck", overview:"Carol Danvers scopre le sue origini tra Kree e Skrull negli anni '90."},
  {id:3, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1675206317/mcuapi/gallery/Movies/iron_man/posters/1.jpg", title:"Iron Man", type:"Film", phase:1, saga:"Saga dell'Infinito", release:"2008-04-30", duration:126, chronology:3, director:"Jon Favreau", overview:"Tony Stark costruisce un'armatura per fuggire dalla prigionia e diventa Iron Man."},
  {id:4, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1675206796/mcuapi/gallery/Movies/iron_man_2/posters/1.jpg", title:"Iron Man 2", type:"Film", phase:1, saga:"Saga dell'Infinito", release:"2010-04-28", duration:125, chronology:4, director:"Jon Favreau", overview:"Stark affronta Whiplash e il governo che rivuole la sua tecnologia."},
  {id:5, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1675206567/mcuapi/gallery/Movies/the_incredible_hulk/posters/1.jpg", title:"L'incredibile Hulk", type:"Film", phase:1, saga:"Saga dell'Infinito", release:"2008-06-12", duration:112, chronology:5, director:"Louis Leterrier", overview:"Bruce Banner in fuga cerca una cura mentre nasce Abominio."},
  {id:6, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1675206905/mcuapi/gallery/Movies/thor/posters/1.jpg", title:"Thor", type:"Film", phase:1, saga:"Saga dell'Infinito", release:"2011-04-27", duration:115, chronology:6, director:"Kenneth Branagh", overview:"Il dio del tuono viene esiliato sulla Terra e impara l'umiltà."},
  {id:7, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1675207189/mcuapi/gallery/Movies/the_avengers/posters/1.jpg", title:"The Avengers", type:"Film", phase:1, saga:"Saga dell'Infinito", release:"2012-04-25", duration:143, chronology:7, director:"Joss Whedon", overview:"I primi Vendicatori si uniscono contro Loki e i Chitauri a New York."},
  {id:30, title:"Item 47", type:"One-Shot", phase:1, saga:"Saga dell'Infinito", release:"2012-09-13", duration:12, chronology:7.5, director:"Louis D'Esposito", overview:"Una coppia trova un'arma Chitauri rimasta dopo la battaglia di New York."},
  {id:8, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1675207306/mcuapi/gallery/Movies/iron_man_3/posters/1.jpg", title:"Iron Man 3", type:"Film", phase:2, saga:"Saga dell'Infinito", release:"2013-04-24", duration:130, chronology:8, director:"Shane Black", overview:"Stark, senza armatura, affronta il Mandarino e i suoi traumi."},
  {id:31, title:"Agent Carter", type:"One-Shot", phase:2, saga:"Saga dell'Infinito", release:"2013-09-03", duration:15, chronology:8.5, director:"Louis D'Esposito", overview:"Peggy Carter in missione solitaria un anno dopo la guerra."},
  {id:9, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1675207480/mcuapi/gallery/Movies/thor_the_dark_world/posters/1.jpg", title:"Thor: The Dark World", type:"Film", phase:2, saga:"Saga dell'Infinito", release:"2013-10-30", duration:112, chronology:9, director:"Alan Taylor", overview:"Thor e Loki alleati contro Malekith e l'Aether."},
  {id:10, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1675207589/mcuapi/gallery/Movies/captain_america_the_winter_soldier/posters/1.jpg", title:"Captain America: The Winter Soldier", type:"Film", phase:2, saga:"Saga dell'Infinito", release:"2014-03-26", duration:136, chronology:10, director:"Anthony e Joe Russo", overview:"Steve scopre l'HYDRA dentro lo S.H.I.E.L.D. e ritrova Bucky."},
  {id:32, title:"All Hail the King", type:"One-Shot", phase:2, saga:"Saga dell'Infinito", release:"2014-02-04", duration:14, chronology:10.5, director:"Drew Pearce", overview:"Trevor Slattery in prigione dopo gli eventi di Iron Man 3."},
  {id:11, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1675207727/mcuapi/gallery/Movies/guardians_of_the_galaxy/posters/1.jpg", title:"Guardiani della Galassia", type:"Film", phase:2, saga:"Saga dell'Infinito", release:"2014-07-30", duration:121, chronology:11, director:"James Gunn", overview:"Star-Lord e una banda di disadattati rubano un'Orb ambita da Ronan."},
  {id:12, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1675208240/mcuapi/gallery/Movies/guardians_of_galaxy_vol_2/posters/1.jpg", title:"Guardiani della Galassia Vol. 2", type:"Film", phase:3, saga:"Saga dell'Infinito", release:"2017-04-25", duration:136, chronology:12, director:"James Gunn", overview:"Quill incontra suo padre Ego e la famiglia si mette alla prova."},
  {id:13, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1675207859/mcuapi/gallery/Movies/avengers_age_of_ultron/posters/1.jpg", title:"Avengers: Age of Ultron", type:"Film", phase:2, saga:"Saga dell'Infinito", release:"2015-04-22", duration:141, chronology:13, director:"Joss Whedon", overview:"Un'IA creata da Stark decide che la pace richiede l'estinzione umana."},
  {id:14, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1675207953/mcuapi/gallery/Movies/ant-man/posters/1.jpg", title:"Ant-Man", type:"Film", phase:2, saga:"Saga dell'Infinito", release:"2015-07-14", duration:117, chronology:14, director:"Peyton Reed", overview:"Scott Lang ruba la tuta di Hank Pym e impara a rimpicciolirsi."},
  {id:15, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1675208047/mcuapi/gallery/Movies/captain_america_civil_war/posters/1.jpg", title:"Captain America: Civil War", type:"Film", phase:3, saga:"Saga dell'Infinito", release:"2016-04-27", duration:147, chronology:15, director:"Anthony e Joe Russo", overview:"Gli Accordi di Sokovia spaccano i Vendicatori in due fazioni."},
  {id:16, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1675212009/mcuapi/gallery/Movies/black_widow/posters/1.jpg", title:"Black Widow", type:"Film", phase:4, saga:"Saga del Multiverso", release:"2021-07-07", duration:134, chronology:16, director:"Cate Shortland", overview:"Natasha regola i conti con la Red Room tra Civil War e Infinity War."},
  {id:17, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1675211435/mcuapi/gallery/Movies/black_panther/posters/1.jpg", title:"Black Panther", type:"Film", phase:3, saga:"Saga dell'Infinito", release:"2018-02-13", duration:134, chronology:17, director:"Ryan Coogler", overview:"T'Challa difende il trono del Wakanda da Killmonger."},
  {id:18, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1675208337/mcuapi/gallery/Movies/spider-man_homecoming/posters/1.jpg", title:"Spider-Man: Homecoming", type:"Film", phase:3, saga:"Saga dell'Infinito", release:"2017-07-05", duration:133, chronology:18, director:"Jon Watts", overview:"Peter Parker bilancia liceo e Avvoltoio sotto l'ala di Stark."},
  {id:19, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1675208132/mcuapi/gallery/Movies/doctor_strange/posters/1.jpg", title:"Doctor Strange", type:"Film", phase:3, saga:"Saga dell'Infinito", release:"2016-10-25", duration:115, chronology:19, director:"Scott Derrickson", overview:"Un chirurgo arrogante diventa Stregone Supremo a Kamar-Taj."},
  {id:20, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1675211289/mcuapi/gallery/Movies/thor_ragnarok/posters/1.jpg", title:"Thor: Ragnarok", type:"Film", phase:3, saga:"Saga dell'Infinito", release:"2017-10-25", duration:130, chronology:20, director:"Taika Waititi", overview:"Thor gladiatore su Sakaar mentre Hela conquista Asgard."},
  {id:21, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1675211606/mcuapi/gallery/Movies/ant-man_and_the_wasp/posters/1.jpg", title:"Ant-Man and the Wasp", type:"Film", phase:3, saga:"Saga dell'Infinito", release:"2018-07-04", duration:118, chronology:21, director:"Peyton Reed", overview:"Scott e Hope cercano Janet nel regno quantico."},
  {id:22, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1675211514/mcuapi/gallery/Movies/avengers_infinity_war/posters/1.jpg", title:"Avengers: Infinity War", type:"Film", phase:3, saga:"Saga dell'Infinito", release:"2018-04-25", duration:149, chronology:22, director:"Anthony e Joe Russo", overview:"Thanos raccoglie le Gemme dell'Infinito. Lo schiocco."},
  {id:23, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1675211808/mcuapi/gallery/Movies/avengers_endgame/posters/1.jpg", title:"Avengers: Endgame", type:"Film", phase:3, saga:"Saga dell'Infinito", release:"2019-04-24", duration:181, chronology:23, director:"Anthony e Joe Russo", overview:"I sopravvissuti tentano la rapina nel tempo per annullare lo schiocco."},
  {id:24, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1675211910/mcuapi/gallery/Movies/spider-man_far_from_home/posters/1.jpg", title:"Spider-Man: Far From Home", type:"Film", phase:3, saga:"Saga dell'Infinito", release:"2019-07-02", duration:129, chronology:24, director:"Jon Watts", overview:"Peter in gita in Europa affronta Mysterio e il lutto per Stark."},
  {id:25, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1676219587/mcuapi/gallery/tv_shows/wandavision/posters/1.jpg", title:"WandaVision", type:"Serie", phase:4, saga:"Saga del Multiverso", release:"2021-01-15", duration:350, chronology:25, director:"Matt Shakman", overview:"Wanda e Visione in una sitcom perfetta che nasconde Westview."},
  {id:26, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1676219908/mcuapi/gallery/tv_shows/loki/season_1/posters/1.jpg", title:"Loki", type:"Serie", phase:4, saga:"Saga del Multiverso", release:"2021-06-09", duration:290, chronology:26, director:"Kate Herron", overview:"Il Loki del 2012 finisce nella TVA e scopre il multiverso."},
  {id:27, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1675212103/mcuapi/gallery/Movies/shang-chi_and_the_legends_of_the_ten_rings/posters/1.jpg", title:"Shang-Chi e la leggenda dei Dieci Anelli", type:"Film", phase:4, saga:"Saga del Multiverso", release:"2021-09-01", duration:132, chronology:27, director:"Destin Daniel Cretton", overview:"Shang-Chi affronta il padre Wenwu e i Dieci Anelli."},
  {id:28, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1675212199/mcuapi/gallery/Movies/eternals/posters/1.jpg", title:"Eternals", type:"Film", phase:4, saga:"Saga del Multiverso", release:"2021-11-03", duration:156, chronology:28, director:"Chloé Zhao", overview:"Esseri immortali si riuniscono contro i Devianti dopo millenni."},
  {id:29, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1676220173/mcuapi/gallery/tv_shows/hawkeye/1.jpg", title:"Hawkeye", type:"Serie", phase:4, saga:"Saga del Multiverso", release:"2021-11-24", duration:300, chronology:29, director:"Rhys Thomas", overview:"Clint Barton e Kate Bishop contro la Tracksuit Mafia a Natale."},
  {id:33, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1675212281/mcuapi/gallery/Movies/spider-man_no_way_home/posters/1.jpg", title:"Spider-Man: No Way Home", type:"Film", phase:4, saga:"Saga del Multiverso", release:"2021-12-15", duration:148, chronology:30, director:"Jon Watts", overview:"Un incantesimo sbagliato apre il multiverso ai vecchi nemici di Spider-Man."},
  {id:34, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1677418444/mcuapi/gallery/tv_shows/werewolf_by_night/posters/1.jpg", title:"Werewolf by Night", type:"One-Shot", phase:4, saga:"Saga del Multiverso", release:"2022-10-07", duration:53, chronology:31, director:"Michael Giacchino", overview:"Cacciatori di mostri competono per la Pietra di Sangue."},
  {id:35, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1676543203/mcuapi/gallery/Movies/guardians_of_the_galaxy_vol_3/posters/3.jpg", title:"Guardiani della Galassia Vol. 3", type:"Film", phase:5, saga:"Saga del Multiverso", release:"2023-05-03", duration:150, chronology:32, director:"James Gunn", overview:"Il passato di Rocket e l'Alto Evoluzionario. L'addio della famiglia."},
  {id:36, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1723381548/mcuapi/gallery/Movies/deadpool_3/posters/3.jpg", title:"Deadpool & Wolverine", type:"Film", phase:5, saga:"Saga del Multiverso", release:"2024-07-24", duration:128, chronology:33, director:"Shawn Levy", overview:"Deadpool trascina un Wolverine riluttante attraverso il multiverso."},
];

export const ROMAN = { 1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V' };

// ── stato "visto" ──
// Il server (server.js, /api/watched) lo condivide fra dispositivi. In un
// deploy statico puro (Netlify) l'endpoint non esiste: si scivola sul
// localStorage del browser. La chiave è nuova perché gli id di questo
// dataset non coincidono con quelli della vecchia MCU API.
export const STORAGE_KEY = 'nocturne-mcu-watched-v1';
let backend = false;

export async function loadWatched() {
  try {
    const r = await fetch('/api/watched');
    if (!r.ok) throw 0;
    const j = await r.json();
    backend = true;
    return new Set(Array.isArray(j.ids) ? j.ids : []);
  } catch {
    backend = false;
    try {
      const v = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (Array.isArray(v)) return new Set(v);
    } catch { /* localStorage assente o corrotto */ }
    return new Set();
  }
}

export async function saveWatched(set) {
  const ids = [...set];
  if (!backend) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(ids)); } catch {}
    return;
  }
  try {
    const r = await fetch('/api/watched', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids }),
    });
    if (!r.ok) throw 0;
  } catch {
    // Il server c'era al caricamento e ora non risponde più: non perdere la
    // spunta, tienila almeno su questo dispositivo.
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(ids)); } catch {}
  }
}

export function fmtDate(iso) {
  return new Date(iso).toLocaleDateString('it-IT', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function fmtDuration(min) {
  return min >= 60 ? `${Math.floor(min / 60)}h ${min % 60} min` : `${min} min`;
}

export function byRelease() {
  return PRODUCTS.slice().sort((a, b) => new Date(a.release) - new Date(b.release));
}

export function byChronology() {
  return PRODUCTS.slice().sort((a, b) => a.chronology - b.chronology);
}

// Il "prossimo da guardare" è il primo non visto in ordine di uscita: è lo
// stesso criterio in tutte le pagine (hero della Libreria, "Sei qui" del
// Percorso, fallback del Dettaglio).
export function nextUnwatched(watched) {
  return byRelease().find(p => !watched.has(p.id)) || null;
}

// Sfondo orizzontale della hero, derivato dalla locandina: le cover stanno
// su Cloudinary, che ritaglia on-the-fly via URL. c_fill,g_auto inquadra i
// volti da solo — nessuna seconda fonte di immagini da mantenere.
export function heroBackdrop(p) {
  if (!p.cover || !p.cover.includes('/image/upload/')) return null;
  return p.cover.replace('/image/upload/', '/image/upload/w_1200,h_500,c_fill,g_auto,q_auto/');
}

export function trailerUrl(p) {
  // Il dataset non porta URL dei trailer: una ricerca YouTube sul titolo è
  // il modo più robusto di far funzionare il bottone per tutti i titoli.
  return 'https://www.youtube.com/results?search_query=' + encodeURIComponent(p.title + ' trailer ita');
}
