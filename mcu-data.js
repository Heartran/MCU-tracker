// Dataset MCU condiviso fra le pagine — forma dei campi ricalcata su mcuapi
// (title, phase, saga, release, duration, chronology, director, overview)
// più `type`, perché il tracker copre anche Serie e One-Shot che l'API
// (solo film) non fornisce. È la fonte dati del design Nocturne: statico,
// autonomo, funziona anche in un deploy senza backend.
export const PRODUCTS = [
  {id:37, cover:"https://cdn.marvel.com/content/2x/eyesofwakanda_lob_crd_02.jpg", title:"Eyes of Wakanda", type:"Serie", phase:5, saga:"Saga del Multiverso", release:"2025-08-01", duration:120, chronology:0.5, director:"Todd Harris", overview:"Guerrieri wakandiani attraverso i secoli recuperano manufatti di vibranio dispersi nel mondo."},
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
  {id:38, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1677418157/mcuapi/gallery/tv_shows/i_am_groot/posters/2.jpg", title:"I Am Groot", type:"Serie", phase:4, saga:"Saga dell'Infinito", release:"2022-08-10", duration:20, chronology:12.3, director:"Kirsten Lepore", overview:"Cinque corti sulle scorribande di Baby Groot tra una missione e l'altra dei Guardiani."},
  {id:39, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1698756081/mcuapi/gallery/tv_shows/i_am_groot/posters/season_2/1.jpg", title:"I Am Groot – Stagione 2", type:"Serie", phase:4, saga:"Saga dell'Infinito", release:"2023-11-06", duration:20, chronology:12.6, director:"Kirsten Lepore", overview:"Altri cinque corti: Groot esplora la galassia e combina disastri in miniatura."},
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
  {id:40, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1676219753/mcuapi/gallery/tv_shows/the_falcon_and_the_winter_soldier/posters/1.jpg", title:"The Falcon and the Winter Soldier", type:"Serie", phase:4, saga:"Saga del Multiverso", release:"2021-03-19", duration:300, chronology:25.5, director:"Kari Skogland", overview:"Sam Wilson e Bucky Barnes raccolgono l'eredità dello scudo dopo il Blip."},
  {id:26, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1676219908/mcuapi/gallery/tv_shows/loki/season_1/posters/1.jpg", title:"Loki", type:"Serie", phase:4, saga:"Saga del Multiverso", release:"2021-06-09", duration:290, chronology:26, director:"Kate Herron", overview:"Il Loki del 2012 finisce nella TVA e scopre il multiverso."},
  {id:41, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1676220025/mcuapi/gallery/tv_shows/what_if/season_1/posters/1.jpg", title:"What If...?", type:"Serie", phase:4, saga:"Saga del Multiverso", release:"2021-08-11", duration:270, chronology:26.3, director:"Bryan Andrews", overview:"L'Osservatore racconta universi in cui un solo momento è andato diversamente."},
  {id:27, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1675212103/mcuapi/gallery/Movies/shang-chi_and_the_legends_of_the_ten_rings/posters/1.jpg", title:"Shang-Chi e la leggenda dei Dieci Anelli", type:"Film", phase:4, saga:"Saga del Multiverso", release:"2021-09-01", duration:132, chronology:27, director:"Destin Daniel Cretton", overview:"Shang-Chi affronta il padre Wenwu e i Dieci Anelli."},
  {id:28, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1675212199/mcuapi/gallery/Movies/eternals/posters/1.jpg", title:"Eternals", type:"Film", phase:4, saga:"Saga del Multiverso", release:"2021-11-03", duration:156, chronology:28, director:"Chloé Zhao", overview:"Esseri immortali si riuniscono contro i Devianti dopo millenni."},
  {id:29, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1676220173/mcuapi/gallery/tv_shows/hawkeye/1.jpg", title:"Hawkeye", type:"Serie", phase:4, saga:"Saga del Multiverso", release:"2021-11-24", duration:300, chronology:29, director:"Rhys Thomas", overview:"Clint Barton e Kate Bishop contro la Tracksuit Mafia a Natale."},
  {id:33, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1675212281/mcuapi/gallery/Movies/spider-man_no_way_home/posters/1.jpg", title:"Spider-Man: No Way Home", type:"Film", phase:4, saga:"Saga del Multiverso", release:"2021-12-15", duration:148, chronology:30, director:"Jon Watts", overview:"Un incantesimo sbagliato apre il multiverso ai vecchi nemici di Spider-Man."},
  {id:42, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1675212381/mcuapi/gallery/Movies/doctor_strange_in_the_multiverse_of_madness/posters/2.jpg", title:"Doctor Strange nel Multiverso della Follia", type:"Film", phase:4, saga:"Saga del Multiverso", release:"2022-05-04", duration:126, chronology:30.1, director:"Sam Raimi", overview:"Strange e America Chavez in fuga nel multiverso, inseguiti da Wanda."},
  {id:43, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1677417882/mcuapi/gallery/tv_shows/moon_knight/posters/3.jpg", title:"Moon Knight", type:"Serie", phase:4, saga:"Saga del Multiverso", release:"2022-03-30", duration:280, chronology:30.2, director:"Mohamed Diab", overview:"Marc Spector, Steven Grant e il dio Khonshu si contendono lo stesso corpo."},
  {id:44, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1665238515/mcuapi/gallery/Movies/black_panther_wakanda_forever/posters/3.jpg", title:"Black Panther: Wakanda Forever", type:"Film", phase:4, saga:"Saga del Multiverso", release:"2022-11-09", duration:161, chronology:30.3, director:"Ryan Coogler", overview:"Il Wakanda in lutto per T'Challa affronta Namor e il regno sommerso di Talokan."},
  {id:45, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1677418904/mcuapi/gallery/tv_shows/echo/posters/2.jpg", title:"Echo", type:"Serie", phase:5, saga:"Marvel Spotlight", release:"2024-01-09", duration:210, chronology:30.4, director:"Sydney Freeland", overview:"Maya Lopez torna alle sue radici Choctaw inseguita dal passato con Kingpin."},
  {id:46, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1677418342/mcuapi/gallery/tv_shows/she_hulk_attorney_at_law/posters/2.jpg", title:"She-Hulk: Attorney at Law", type:"Serie", phase:4, saga:"Saga del Multiverso", release:"2022-08-18", duration:270, chronology:30.5, director:"Kat Coiro", overview:"Jennifer Walters, avvocata, gestisce cause di superumani e la propria trasformazione."},
  {id:47, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1677418034/mcuapi/gallery/tv_shows/ms_marvel/posters/1.jpg", title:"Ms. Marvel", type:"Serie", phase:4, saga:"Saga del Multiverso", release:"2022-06-08", duration:250, chronology:30.6, director:"Adil El Arbi, Bilall Fallah", overview:"Kamala Khan, fan di Captain Marvel, scopre poteri legati a un bracciale di famiglia."},
  {id:48, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1653410371/mcuapi/gallery/Movies/thor_love_and_thunder/3.jpg", title:"Thor: Love and Thunder", type:"Film", phase:4, saga:"Saga del Multiverso", release:"2022-07-06", duration:119, chronology:30.7, director:"Taika Waititi", overview:"Thor, Jane Foster col Mjolnir e Gorr il macellatore di dèi."},
  {id:49, cover:"https://cdn.marvel.com/content/2x/ironheart_lob_crd_04.jpg", title:"Ironheart", type:"Serie", phase:5, saga:"Saga del Multiverso", release:"2025-06-24", duration:240, chronology:30.8, director:"Sam Bailey, Angela Barnes", overview:"Riri Williams torna a Chicago con la sua armatura e incrocia la magia di The Hood."},
  {id:34, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1677418444/mcuapi/gallery/tv_shows/werewolf_by_night/posters/1.jpg", title:"Werewolf by Night", type:"One-Shot", phase:4, saga:"Saga del Multiverso", release:"2022-10-07", duration:53, chronology:31, director:"Michael Giacchino", overview:"Cacciatori di mostri competono per la Pietra di Sangue."},
  {id:50, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1677418587/mcuapi/gallery/tv_shows/the_guardians_of_the_galaxy_holiday_special/posters/1.jpg", title:"The Guardians of the Galaxy Holiday Special", type:"One-Shot", phase:4, saga:"Saga del Multiverso", release:"2022-11-25", duration:44, chronology:31.3, director:"James Gunn", overview:"Drax e Mantis rapiscono Kevin Bacon per regalare un Natale a Quill."},
  {id:51, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1666736814/mcuapi/gallery/Movies/ant-man_and_the_wasp_quantumania/posters/2.jpg", title:"Ant-Man and the Wasp: Quantumania", type:"Film", phase:5, saga:"Saga del Multiverso", release:"2023-02-15", duration:124, chronology:31.6, director:"Peyton Reed", overview:"La famiglia Lang-Pym intrappolata nel regno quantico di Kang il Conquistatore."},
  {id:35, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1676543203/mcuapi/gallery/Movies/guardians_of_the_galaxy_vol_3/posters/3.jpg", title:"Guardiani della Galassia Vol. 3", type:"Film", phase:5, saga:"Saga del Multiverso", release:"2023-05-03", duration:150, chronology:32, director:"James Gunn", overview:"Il passato di Rocket e l'Alto Evoluzionario. L'addio della famiglia."},
  {id:52, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1680562454/mcuapi/gallery/tv_shows/secret_invasion/posters/2.jpg", title:"Secret Invasion", type:"Serie", phase:5, saga:"Saga del Multiverso", release:"2023-06-21", duration:270, chronology:32.2, director:"Ali Selim", overview:"Fury contro una fazione di Skrull infiltrati ai vertici della Terra."},
  {id:53, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1679777423/mcuapi/gallery/Movies/the_marvels/posters/3.jpg", title:"The Marvels", type:"Film", phase:5, saga:"Saga del Multiverso", release:"2023-11-08", duration:105, chronology:32.4, director:"Nia DaCosta", overview:"Carol, Monica e Kamala si scambiano di posto a ogni uso dei poteri."},
  {id:54, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1698754888/mcuapi/gallery/tv_shows/loki/season_2/3.jpg", title:"Loki – Stagione 2", type:"Serie", phase:5, saga:"Saga del Multiverso", release:"2023-10-05", duration:290, chronology:32.6, director:"Justin Benson, Aaron Moorhead", overview:"Loki scivola nel tempo per salvare la TVA e tutti i suoi rami."},
  {id:55, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1700413035/mcuapi/gallery/tv_shows/what_if/season_2/posters/1.jpg", title:"What If...? – Stagione 2", type:"Serie", phase:5, saga:"Saga del Multiverso", release:"2023-12-22", duration:270, chronology:32.8, director:"Bryan Andrews", overview:"Nuovi universi divergenti sotto lo sguardo dell'Osservatore."},
  {id:36, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1723381548/mcuapi/gallery/Movies/deadpool_3/posters/3.jpg", title:"Deadpool & Wolverine", type:"Film", phase:5, saga:"Saga del Multiverso", release:"2024-07-24", duration:128, chronology:33, director:"Shawn Levy", overview:"Deadpool trascina un Wolverine riluttante attraverso il multiverso."},
  {id:56, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1721064409/mcuapi/gallery/tv_shows/agatha_all_along/posters/2.jpg", title:"Agatha All Along", type:"Serie", phase:5, saga:"Saga del Multiverso", release:"2024-09-18", duration:320, chronology:34, director:"Jac Schaeffer", overview:"Agatha Harkness, senza poteri, percorre la Strada delle Streghe con una congrega improvvisata."},
  {id:57, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1737320435/mcuapi/gallery/tv_shows/what_if/season_3/posters/1.jpg", title:"What If...? – Stagione 3", type:"Serie", phase:5, saga:"Saga del Multiverso", release:"2024-12-22", duration:240, chronology:35, director:"Bryan Andrews", overview:"Il capitolo finale dell'antologia dell'Osservatore."},
  {id:58, cover:"https://cdn.marvel.com/content/2x/yourfriendlyneighborhoodspiderman_lob_crd_03_0.webp", title:"Your Friendly Neighborhood Spider-Man", type:"Serie", phase:5, saga:"Saga del Multiverso", release:"2025-01-29", duration:250, chronology:35.5, director:"Jeff Trammell", overview:"Un Peter Parker alle prime armi, in un universo dove il mentore è Norman Osborn."},
  {id:59, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1737320729/mcuapi/gallery/tv_shows/daredevil_born_again/posters/2.jpg", title:"Daredevil: Born Again", type:"Serie", phase:5, saga:"Saga del Multiverso", release:"2025-03-04", duration:410, chronology:36, director:"Aaron Moorhead, Justin Benson", overview:"Matt Murdock riprende la maschera mentre Fisk diventa sindaco di New York."},
  {id:60, cover:"https://res.cloudinary.com/augustomarcelo/image/upload/v1737318872/mcuapi/gallery/Movies/captain_america_brave_new_order/posters/3.jpg", title:"Captain America: Brave New World", type:"Film", phase:5, saga:"Saga del Multiverso", release:"2025-02-12", duration:118, chronology:37, director:"Julius Onah", overview:"Sam Wilson, nuovo Captain America, contro un complotto che tocca la Casa Bianca."},
  {id:61, cover:"https://cdn.marvel.com/content/2x/thenewavengers_lob_crd_01.jpg", title:"Thunderbolts*", type:"Film", phase:5, saga:"Saga del Multiverso", release:"2025-04-30", duration:126, chronology:38, director:"Jake Schreier", overview:"Un gruppo di antieroi in missione suicida scopre di essere qualcosa di più."},
  {id:62, cover:"https://cdn.marvel.com/content/2x/thefantasticfourfirststeps_lob_crd_03.jpg", title:"I Fantastici 4: Gli Inizi", type:"Film", phase:6, saga:"Saga del Multiverso", release:"2025-07-23", duration:115, chronology:38.3, director:"Matt Shakman", overview:"La prima famiglia Marvel in un mondo retrofuturistico contro Galactus."},
  {id:63, cover:"https://cdn.marvel.com/content/2x/marvelzombies_lob_crd_03.webp", title:"Marvel Zombies", type:"Serie", phase:6, saga:"Saga del Multiverso", release:"2025-09-24", duration:130, chronology:38.6, director:"Bryan Andrews", overview:"L'universo di What If dove l'epidemia zombie ha vinto: gli eroi sopravvissuti resistono."},
  {id:64, cover:"https://cdn.marvel.com/content/2x/thepunisheronelastkill_lob_crd_01.jpg", title:"The Punisher: One Last Kill", type:"One-Shot", phase:6, saga:"Saga del Multiverso", release:"2026-05-12", duration:55, chronology:39, director:"Reinaldo Marcus Green", overview:"Frank Castle, un'ultima caccia: uno speciale secco e brutale."},
  {id:65, cover:"http://cdn.marvel.com/content/2x/daredevilbornagains2_lob_crd_01.jpg", title:"Daredevil: Born Again – Stagione 2", type:"Serie", phase:6, saga:"Saga del Multiverso", release:"2026-03-24", duration:360, chronology:40, director:"Aaron Moorhead, Justin Benson", overview:"La guerra tra Murdock e il sindaco Fisk esplode in strada."},
  {id:66, cover:"https://cdn.marvel.com/content/2x/wonderman_lob_crd_02.jpg", title:"Wonder Man", type:"Serie", phase:6, saga:"Saga del Multiverso", release:"2026-01-27", duration:240, chronology:41, director:"Destin Daniel Cretton", overview:"Simon Williams, attore e superuomo, tra i provini di Hollywood e i poteri ionici."},
  {id:67, cover:"https://cdn.marvel.com/content/2x/spidermanbrandnewday_lob_crd_02.webp", title:"Spider-Man: Brand New Day", type:"Film", phase:6, saga:"Saga del Multiverso", release:"2026-07-31", duration:145, chronology:42, director:"Destin Daniel Cretton", overview:"Peter Parker riparte da zero: nessuno ricorda chi è, e New York ha nuovi predatori."},
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

// ── Verso Doomsday ──
// La collezione ufficiale Disney+ "Countdown to Avengers: Doomsday"
// (16 agosto 2026): i 15 titoli che Marvel considera le dipendenze effettive
// del film. 13 stanno nel dataset (ref = id); X-Men e X2 sono era Fox, fuori
// dal canone del tracker, e vivono solo qui come voci esterne — id alti che
// finiscono comunque in watched.json, così anche loro si possono spuntare.
export const DOOMSDAY = {
  event: "Avengers: Doomsday",
  release: "2026-12-18",
  source: 'Collezione Disney+ "Countdown to Avengers: Doomsday", 16 agosto 2026',
  items: [
    { ext: { id: 9001, title: "X-Men", year: 2000, duration: 104, cover: "https://image.tmdb.org/t/p/w500/bRDAc4GogyS9ci3ow7UnInOcriN.jpg", tag: "Universo Fox" },
      why: "Il punto d'ingresso dei mutanti Fox: i volti che tornano in Doomsday nascono qui." },
    { ext: { id: 9002, title: "X2", year: 2003, duration: 133, cover: "https://image.tmdb.org/t/p/w500/bst4alFUXCxISwdRUKSMhhkrX1M.jpg", tag: "Universo Fox" },
      why: "Il capitolo centrale della trilogia mutante originale, con i fili che Doomsday riprende." },
    { ref: 1,  why: "L'origine di Steve Rogers e Peggy Carter, entrambi attesi al ritorno." },
    { ref: 7,  why: "La prima riunione: la dinamica di squadra su cui Doomsday costruisce." },
    { ref: 22, why: "Thanos e lo schiocco: le conseguenze multiversali partono da qui." },
    { ref: 23, why: "Chiude la Saga dell'Infinito e definisce lo status quo attuale." },
    { refs: [26, 54], why: "La TVA, le linee temporali, Colui che rimane: il manuale del multiverso (entrambe le stagioni)." },
    { ref: 27, why: "Shang-Chi è nel cast di Doomsday: la sua storia comincia qui." },
    { ref: 33, why: "Il multiverso si spalanca: le variant e le porte rimaste aperte." },
    { ref: 44, why: "Shuri e il Wakanda dopo T'Challa, presenze annunciate nel film." },
    { ref: 60, why: "Il Captain America di Sam Wilson, centrale nella nuova squadra." },
    { ref: 36, why: "Deadpool, Wolverine e il confine ormai poroso tra Fox e MCU." },
    { ref: 42, why: "Le incursioni tra universi di Strange e Wanda: la meccanica del disastro." },
    { ref: 61, why: "I New Avengers escono da qui ed entrano dritti in Doomsday." },
    { ref: 62, why: "I Fantastici 4 dell'universo 828: il ponte diretto verso Doomsday." },
  ],
};

export function trailerUrl(p) {
  // Il dataset non porta URL dei trailer: una ricerca YouTube sul titolo è
  // il modo più robusto di far funzionare il bottone per tutti i titoli.
  return 'https://www.youtube.com/results?search_query=' + encodeURIComponent(p.title + ' trailer ita');
}
