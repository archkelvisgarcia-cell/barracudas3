/* ============================================================
   BARRACUDAS — Schedule & News Data
   GAMES[], HERO_BG_IMAGES[], NEWS_ARTICLES[]
============================================================ */

// ── GAMES — single source of truth ──────────────────────────
const GAMES = [
  {
    date: '2026-04-19', time: '14:00', label: 'APR 19 · 2026',
    opponent: 'Zürich Flyers', opponentLogo: 'assets/teams/flyers.png',
    location: 'Away · Zürich', league: 'Gruppe A',
    result: 'L', score: { us: 4, them: 14 }, innings: 7, notes: '',
  },
  {
    date: '2026-04-26', time: '14:00', label: 'APR 26 · 2026',
    opponent: 'Therwil Indians', opponentLogo: 'assets/teams/indians.png',
    location: 'Away · Therwil', league: 'Gruppe A',
    result: 'L', score: { us: 3, them: 15 }, innings: 7, notes: '',
  },
  {
    date: '2026-05-02', time: '12:00', label: 'MAY 2 · 2026 · G1',
    opponent: 'Luzern Eagles', opponentLogo: 'assets/teams/eagles.png',
    location: 'Home · Heerenschürli', league: 'Gruppe A',
    result: 'L', score: { us: 9, them: 23 }, innings: 9, notes: 'HR · K.Garcia',
  },
  {
    date: '2026-05-02', time: '15:00', label: 'MAY 2 · 2026 · G2',
    opponent: 'Luzern Eagles', opponentLogo: 'assets/teams/eagles.png',
    location: 'Home · Heerenschürli', league: 'Gruppe A',
    result: 'L', score: { us: 9, them: 10 }, innings: 9, notes: '2B · J.Rosa Lima · 2 RBI',
  },
  {
    date: '2026-05-05', time: '18:30', label: 'MAY 5 · 2026',
    opponent: 'Barracudas NLA', opponentLogo: 'assets/teams/BARLOGO.png',
    location: 'Home · Heerenschürli', league: 'NL vs NLA · Pink Game',
    result: 'L', score: { us: 5, them: 17 }, innings: 7,
    notes: '🩷 Pink Game', recapUrl: 'pink-game-recap.html',
  },
  {
    date: '2026-05-30', time: '11:00', label: 'MAY 30 · 2026 · G1',
    opponent: 'Sissach Frogs', opponentLogo: 'assets/teams/frogs.png',
    location: 'Home · Heerenschürli', league: 'Gruppe A',
    result: 'W', score: { us: 27, them: 0 }, innings: 4,
    notes: 'Mercy Rule · M.Vasquez P', recapUrl: 'article.html?id=frogs-doubleheader-may30',
  },
  {
    date: '2026-05-30', time: '14:00', label: 'MAY 30 · 2026 · G2',
    opponent: 'Sissach Frogs', opponentLogo: 'assets/teams/frogs.png',
    location: 'Home · Heerenschürli', league: 'Gruppe A',
    result: 'W', score: { us: 21, them: 1 }, innings: 3,
    notes: 'Mercy Rule · A.Elias P', recapUrl: 'article.html?id=frogs-doubleheader-may30',
  },
  {
    date: '2026-06-02', time: '18:30', label: 'JUN 2 · 2026',
    opponent: 'Barracudas NLA', opponentLogo: 'assets/teams/BARLOGO.png',
    location: 'Home · Heerenschürli', league: 'NL vs NLA',
    result: 'L', score: { us: 3, them: 17 }, innings: 7, notes: '',
  },
  {
    date: '2026-06-07', time: '11:00', label: 'JUN 7 · 2026 · G1',
    opponent: 'Challengers 2', opponentLogo: 'assets/teams/challengers.png',
    location: 'Home · Heerenschürli', league: 'Gruppe A',
    result: 'W', score: { us: 23, them: 13 }, innings: 8, notes: 'Girasole starts · Rosa Lima HR', recapUrl: 'article.html?id=challengers-g1-june7',
  },
  {
    date: '2026-06-07', time: '14:00', label: 'JUN 7 · 2026 · G2',
    opponent: 'Challengers 2', opponentLogo: 'assets/teams/challengers.png',
    location: 'Home · Heerenschürli', league: 'Gruppe A',
    result: 'W', score: { us: 15, them: 7 }, innings: 7, notes: 'Vasquez W · Sweep', recapUrl: 'article.html?id=challengers-g2-june7',
  },
  {
    date: '2026-06-14', time: '11:00', label: 'JUN 14 · 2026',
    opponent: 'TBD', opponentLogo: null,
    location: 'TBD', league: 'TOP 6 — Swiss League',
    result: null, score: null, innings: null, notes: '',
  },
  {
    date: '2026-06-28', time: '11:00', label: 'JUN 28 · 2026',
    opponent: 'TBD', opponentLogo: null,
    location: 'TBD', league: 'TOP 6 — Swiss League',
    result: null, score: null, innings: null, notes: 'Fecha por confirmar',
  },
  {
    date: '2026-07-12', time: '11:00', label: 'JUL 12 · 2026',
    opponent: 'TBD', opponentLogo: null,
    location: 'TBD', league: 'TOP 6 — Swiss League',
    result: null, score: null, innings: null, notes: 'Fecha por confirmar',
  },
  {
    date: '2026-07-26', time: '11:00', label: 'JUL 26 · 2026',
    opponent: 'TBD', opponentLogo: null,
    location: 'TBD', league: 'Semifinal — Swiss League',
    result: null, score: null, innings: null, notes: 'Fecha por confirmar',
  },
  {
    date: '2026-08-16', time: '11:00', label: 'AGO 16 · 2026',
    opponent: 'TBD', opponentLogo: null,
    location: 'TBD', league: 'Final — Swiss League',
    result: null, score: null, innings: null, notes: 'Fecha por confirmar',
  },
];

// ── HERO BACKGROUND CAROUSEL — Pink Game photos ─────────────
const HERO_BG_IMAGES = [
  'assets/nightgame-3.jpg',
  'assets/nightgame-7.jpg',
  'assets/nightgame-9.jpg',
  'assets/nightgame-14.jpg',
  'assets/nightgame-16.jpg',
  'assets/nightgame-20.jpg',
  'assets/nightgame-22.jpg',
  'assets/nightgame-24.jpg',
  'assets/nightgame-26.jpg',
  'assets/pink-game-team.jpg',
  'assets/news-pink-game-02.jpg',
  'assets/news-pink-game-10.jpg',
  'assets/pink-game-22.jpg',
];

// ── NEWS ARTICLES — single source of truth ──────────────────
const NEWS_ARTICLES = [
  {
    id: 'challengers-g2-june7',
    date: 'June 7, 2026', tag: 'Game Recap', tagColor: '#F0B429',
    headline: 'Vasquez Dominates, BAR3 Complete Sweep with 15–7 Win in Game 2',
    summary: 'Michael Vasquez threw four dominant shutout innings and BAR3\'s offense erupted in the third and sixth to clinch the Sunday sweep over Challengers 2 at Heerenschürli.',
    image: 'assets/news-player-glove.jpg', imagePosition: 'center 15%',
    carouselImages: ['assets/news-player-glove.jpg', 'assets/news/recap-june7-dugout-vibes.jpg', 'assets/news/recap-june7-batter-swing.jpg', 'assets/news/recap-june7-ondeck.jpg', 'assets/news/recap-june7-full-dugout.jpg'],
    href: 'article.html?id=challengers-g2-june7',
    score: { us: 15, them: 7 }, opponent: 'Zürich Challengers 2', location: 'Away · Heerenschürli',
    notes: 'G2 · 7 innings · Vasquez W',
    body: '<p>With the Game 1 momentum squarely in their corner, the Zürich Barracudas 3 made it a perfect Sunday at Heerenschürli — a crisp 15–7 victory and a complete doubleheader sweep over Zürich Challengers 2. Michael Vasquez was the story in Game 2, setting the tone with four flawless shutout innings that kept Challengers completely off the board through the first four frames. BAR3\'s bats responded with a five-run third and a five-run sixth inning to provide the cushion Vasquez and the bullpen needed.</p><figure class="art-figure"><img src="assets/news/recap-june7-pitcher.jpg" alt="Vasquez deals on the mound" loading="lazy" /><figcaption class="art-caption">Kelvis Garcia (#20) steps in to stop the bleeding after a turbulent fifth inning.</figcaption></figure><p>The only blemish came in the fifth: Challengers erupted for six runs to briefly make it a contest, chasing Vasquez with two outs. Kelvis Garcia stepped on the mound and stopped the bleeding, then Yohandris Pedroso — primarily a DH — took the ball for the final two innings and surrendered just a single run, completing a composed bullpen effort. The Barracudas answered the fifth-inning scare immediately, piling five more runs in the sixth to push the lead back to double digits. Jhomar Rosa Lima stayed white-hot with two hits and three RBI across the afternoon continuation, while Del Valle and Medina kept delivering from the top of the order.</p><figure class="art-figure"><img src="assets/news/recap-june7-dugout-vibes.jpg" alt="BAR3 dugout celebration" loading="lazy" /><figcaption class="art-caption">The BAR3 dugout was electric after locking up the sweep — two wins, 38 combined runs on the day.</figcaption></figure><p>The final score of 15–7 brings BAR3\'s Gruppe A record to 7–5 and cements June 7 as one of the best days of the season. With 31 combined hits across both games and a pitching staff that — aside from two rough innings — handled Challengers with authority, BAR3 heads into the second half of the campaign with genuine momentum. The sweep also snaps a two-game losing streak from the previous inter-club matchups. Next up: the Gruppe A schedule resumes and the Barracudas will look to keep pressing.</p>',
    i18n: {
      es: {
        tag: 'Resumen de Partido',
        headline: 'Vasquez domina y BAR3 completa la barrida con victoria 15-7 en el Juego 2',
        summary: 'Michael Vasquez lanzó cuatro entradas de blanqueada y la ofensiva de BAR3 estalló en el tercero y sexto inning para completar la barrida del domingo ante los Challengers 2.',
        body: '<p>Con el impulso del Juego 1 de su lado, los Zürich Barracudas 3 sellaron un perfecto domingo en el Heerenschürli con una victoria 15–7 sobre los Zürich Challengers 2, completando la barrida del doble juego. Michael Vasquez fue la figura del Juego 2, dominando con cuatro entradas perfectas de blanqueada antes de que Challengers explotara para seis carreras en el quinto inning. La respuesta de BAR3 fue inmediata: cinco carreras en el tercero y cinco más en el sexto aseguraron el resultado.</p><p>Kelvis Garcia y Yohandris Pedroso cerraron el partido desde el montículo, mientras Jhomar Rosa Lima continuó su racha brillante con dos hits y tres impulsadas. La victoria eleva el récord de BAR3 en Gruppe A a 7-5, con 31 hits combinados en el día y el impulso firmemente del lado barracuda rumbo a la segunda mitad de temporada.</p>',
      },
      de: {
        tag: 'Spielbericht',
        headline: 'Vasquez glänzt, BAR3 komplettiert Sweep mit 15:7-Sieg in Spiel 2',
        summary: 'Michael Vasquez warf vier dominante Shutout-Innings und BAR3\'s Offense explodierte im dritten und sechsten Inning, um den Sonntags-Sweep gegen die Challengers 2 zu sichern.',
        body: '<p>Mit dem Rückenwind aus Spiel 1 machten die Zürich Barracudas 3 den perfekten Sonntag perfekt — ein 15:7-Sieg und ein vollständiger Doubleheader-Sweep gegen die Zürich Challengers 2 im Heerenschürli. Michael Vasquez lieferte mit vier makellosen Shutout-Innings die Vorlage, bevor Challengers im fünften Inning für sechs Läufe sorgten. BAR3 antwortete sofort mit fünf Runs im sechsten Inning und sicherte so den Sieg. Kelvis Garcia und Yohandris Pedroso sorgten vom Mound aus für die Kontrolle, während Jhomar Rosa Lima mit zwei Hits und drei RBI weiter in Topform blieb. Der Sieg verbessert BAR3s Gruppe-A-Bilanz auf 7–5.</p>',
      },
    },
  },
  {
    id: 'challengers-g1-june7',
    date: 'June 7, 2026', tag: 'Game Recap', tagColor: '#F0B429',
    headline: 'Barracudas 3 Outlast Challengers in Wild 23–13 Eight-Inning Battle',
    summary: 'BAR3 exploded for 23 runs and 19 hits, withstanding a pair of Challengers surges to claim Game 1 of the Sunday doubleheader — Rosa Lima\'s HR the exclamation mark on a dominant offensive afternoon.',
    image: 'assets/news/recap-june7-scoreboard.jpg', imagePosition: 'center 45%',
    carouselImages: ['assets/news/recap-june7-scoreboard.jpg', 'assets/news/recap-june7-rosa-lima.jpg', 'assets/news/recap-june7-batter-swing.jpg', 'assets/news/recap-june7-ondeck.jpg', 'assets/news/recap-june7-full-dugout.jpg'],
    href: 'article.html?id=challengers-g1-june7',
    score: { us: 23, them: 13 }, opponent: 'Zürich Challengers 2', location: 'Away · Heerenschürli',
    notes: 'G1 · 8 innings · Girasole starts',
    body: '<p>The Zürich Barracudas 3 came out firing on all cylinders in Game 1 of Sunday\'s doubleheader, ambushing the Zürich Challengers 2 for four runs in the opening frame and never looked back. A 19-hit offensive onslaught across eight innings — punctuated by Jhomar Rosa Lima\'s towering home run in the fourth inning — gave BAR3 a 23–13 victory that set the tone for the afternoon sweep. Rosa Lima finished with three hits and five RBI, the undisputed catalyst of a lineup that saw every spot in the order contribute.</p><figure class="art-figure"><img src="assets/news/recap-june7-rosa-lima.jpg" alt="Jhomar Rosa Lima rounds the bases" loading="lazy" /><figcaption class="art-caption">Jhomar Rosa Lima (#34) rounds the bases after his fourth-inning home run — his three-hit, five-RBI day powered the BAR3 attack.</figcaption></figure><p>Andrea Girasole took the ball to start and worked through four innings as BAR3 built a commanding lead, though Challengers made things briefly interesting with a four-run second and another three-run push in the seventh. Each time, the BAR3 offense answered the call. Elvis Del Valle sparked the table from the leadoff spot, José Medina drove in three from behind the dish, and the middle of the lineup — Pedroso, Garcia, Moreno — kept the pressure relentless. Hansel Rodriguez, Juan Malchans, and Wilkin Peguero handled the bullpen duties in turns, with Peguero completing a clean eighth to seal the result.</p><figure class="art-figure"><img src="assets/news/recap-june7-batter-swing.jpg" alt="BAR3 batter connects" loading="lazy" /><figcaption class="art-caption">BAR3 connected for 19 hits — the lineup produced in every inning except the fifth as the Challengers defense committed seven errors.</figcaption></figure><p>The Challengers\' seven fielding errors proved costly, repeatedly extending BAR3 innings and turning would-be third outs into crooked numbers on the scoreboard. The final score of 23–13 in eight innings was a testament to BAR3\'s discipline at the plate — 19 clean hits regardless of the errors gifted to them. The team wasted no time regrouping between games: Game 2 was scheduled to begin at 14:00 with Michael Vasquez taking the mound.</p>',
    i18n: {
      es: {
        tag: 'Resumen de Partido',
        headline: 'Barracudas 3 superan a los Challengers en una batalla de 23-13 en ocho entradas',
        summary: 'BAR3 explotó para 23 carreras y 19 hits, resistiendo dos amenazas de los Challengers para llevarse el Juego 1 del doble juego del domingo — el jonrón de Rosa Lima fue el punto de exclamación de una tarde ofensiva dominante.',
        body: '<p>Los Zürich Barracudas 3 salieron disparados en el Juego 1 del doble juego del domingo, anotando cuatro carreras en el primer inning y nunca miraron atrás. Un ataque de 19 hits en ocho entradas — coronado por el jonrón de Jhomar Rosa Lima en el cuarto — le dio a BAR3 una victoria 23–13 sobre los Zürich Challengers 2. Rosa Lima terminó con tres hits y cinco impulsadas, siendo el catalizador indiscutible de una alineación donde todos los spots contribuyeron.</p><p>Elvis Del Valle encendió el partido desde el primero en el orden, José Medina produjo tres carreras desde detrás del plato, y el medio de la alineación — Pedroso, García, Moreno — mantuvo la presión constante. Andrea Girasole inició y trabajó cuatro entradas mientras BAR3 construía su ventaja. Hansel Rodriguez, Juan Malchans y Wilkin Peguero se relevaron en el montículo, con Peguero cerrando una octava entrada limpia para sellar el resultado. Los siete errores de los Challengers resultaron costosos, extendiendo repetidamente las entradas de BAR3.</p>',
      },
      de: {
        tag: 'Spielbericht',
        headline: 'Barracudas 3 bezwingen Challengers in wildem 23:13-Acht-Innings-Duell',
        summary: 'BAR3 explodierte für 23 Runs und 19 Hits und widerstand zwei Challengers-Surges, um Spiel 1 des Sonntags-Doubleheaders zu gewinnen — Rosa Limas Home Run war das Ausrufezeichen des Tages.',
        body: '<p>Die Zürich Barracudas 3 starteten mit einem Feuerwerk in Spiel 1 des Sonntags-Doubleheaders: Vier Runs im ersten Inning setzten den Ton, und ein 19-Hit-Angriff über acht Innings — gekrönt von Jhomar Rosa Limas monströsem Home Run im vierten Inning — brachte BAR3 einen 23:13-Sieg über die Zürich Challengers 2. Rosa Lima schloss den Tag mit drei Hits und fünf RBI ab und war der unbestrittene Motor des BAR3-Angriffs.</p><p>Elvis Del Valle zündete das Feuer vom Leadoff-Spot aus, José Medina lieferte drei RBI hinter dem Schläger, und die Mitte des Line-ups — Pedroso, Garcia, Moreno — hielt den Druck konstant. Andrea Girasole startete und arbeitete vier Innings, während die Bullpen-Trio Rodriguez, Malchans und Peguero die letzten vier Innings sauber verwalteten. Sieben Challengers-Fehler öffneten zusätzliche Türen, aber BAR3 hätte den Sieg auch ohne sie verdient.</p>',
      },
    },
  },
  {
    id: 'nla-june2',
    date: 'June 2, 2026', tag: 'Game Recap', tagColor: '#F0B429',
    headline: 'NLA Barracudas Overpower BAR3 17–3 in Lopsided Inter-Club Clash',
    summary: 'Zürich\'s NLA squad handed BAR3 a humbling 17–3 defeat at Heerenschürli on Tuesday evening, exposing the gap between the club\'s top and development squads.',
    body: 'It was a tough Tuesday night at Heerenschürli as the Zürich Barracudas NLA — the club\'s top squad — came calling and left no room for doubt, handing BAR3 a 17–3 defeat in a NL Baseball Gruppe A contest. From the opening inning, the NLA\'s superior pitching and disciplined approach at the plate kept BAR3\'s bats cold. The offense managed just three runs on the night, with Jhomar Rosa Lima (1-for-2, 1 RBI), Yohandris Pedroso (1-for-2, 1 RBI), and Jhon Arregoitia (1-for-2, 1 RBI) providing the only bright spots in an otherwise difficult evening. Carlos Moreno added a base hit but the lineup couldn\'t string together the big innings BAR3 has shown in recent weeks. Elvis Del Valle, Juan Malchans, and José Medina were kept off the hit column entirely. On the mound, BAR3 struggled to contain the NLA\'s potent lineup as the visitors piled up 17 runs across seven innings. Despite the loss, the outing serves as a valuable benchmark — the NLA represents the highest level within the club, and facing them sharpens the competitive edge BAR3 needs heading into the second half of the Gruppe A season. BAR3 returns to action June 7 at home against Challengers 2 in a crucial doubleheader with playoff positioning on the line.',
    image: 'assets/news/recap-june2-ondeck.jpg', imagePosition: 'center 20%',
    carouselImages: ['assets/news/recap-june2-ondeck.jpg', 'assets/news/recap-june2-batter.jpg', 'assets/news/recap-june2-coaches.jpg', 'assets/news/recap-june2-base.jpg', 'assets/news/recap-june2-dugout.jpg'],
    href: 'article.html?id=nla-june2',
    score: { us: 3, them: 17 }, opponent: 'Barracudas NLA', location: 'Home · Heerenschürli',
    notes: '7 innings · NL vs NLA inter-club',
    body: '<p>It was a tough Tuesday night at Heerenschürli as the Zürich Barracudas NLA — the club\'s first squad and a powerhouse in their own right — came calling and left no room for doubt, handing BAR3 a 17–3 defeat in a NL Baseball Gruppe A inter-club contest. From the opening pitch, the NLA\'s polished pitching staff kept BAR3\'s bats cold, allowing just five hits across seven innings.</p><figure class="art-figure"><img src="assets/news/recap-june2-batter.jpg" alt="BAR3 batter faces NLA pitching" loading="lazy" /><figcaption class="art-caption">A BAR3 batter works against the NLA\'s dominant pitching staff at Heerenschürli.</figcaption></figure><p>The NLA wasted no time establishing superiority on both sides of the ball. Their lineup generated runs in bunches, taking advantage of every opportunity while BAR3 struggled to string hits together. By the middle innings, the deficit had grown to double digits, and the tactical focus shifted to limiting damage and keeping the squad\'s confidence intact for the second half of the Gruppe A season.</p><figure class="art-figure"><img src="assets/news/recap-june2-coaches.jpg" alt="BAR3 coaching staff strategizes" loading="lazy" /><figcaption class="art-caption">The coaching staff communicates adjustments during a pitching change in the middle innings.</figcaption></figure><p>Bright spots were few but meaningful. Jhomar Rosa Lima came up with a clutch 1-for-2 night including an RBI — showing the kind of production BAR3 needs from the middle of its order. Yohandris Pedroso and Jhon Arregoitia each delivered an RBI base hit, reminding the bench that quality at-bats are possible even against superior pitching.</p><figure class="art-figure"><img src="assets/news/recap-june2-base.jpg" alt="BAR3 player reaches base" loading="lazy" /><figcaption class="art-caption">Jhomar Rosa Lima reaches base — one of BAR3\'s five hits on the night.</figcaption></figure><p>Despite the lopsided scoreline, the inter-club clash against the NLA serves as a valuable measuring stick heading into the second half of the campaign. Carlos Moreno chipped in a base hit and José Medina scored a run despite going hitless. BAR3 now turns its full focus to the June 7 doubleheader against Challengers 2 at Heerenschürli — a must-win situation with playoff positioning on the line.</p><figure class="art-figure"><img src="assets/news/recap-june2-dugout.jpg" alt="BAR3 dugout stays focused" loading="lazy" /><figcaption class="art-caption">The BAR3 dugout stays focused late in the game, already looking ahead to June 7.</figcaption></figure>',
    i18n: {
      es: {
        tag: 'Resumen de Partido',
        headline: 'Los Barracudas NLA dominan a BAR3 17-3 en el duelo interclub',
        summary: 'El equipo NLA de Zürich infligió una derrota 17-3 a BAR3 en Heerenschürli el martes por la noche, evidenciando la diferencia entre el primer equipo del club y el equipo de desarrollo.',
        body: '<p>Fue una difícil noche del martes en Heerenschürli cuando los Zürich Barracudas NLA — el primer equipo del club — se hicieron presentes y no dejaron margen de duda, venciendo a BAR3 por 17-3 en un partido de la NL Baseball Gruppe A. Desde el primer lanzamiento, el superior cuerpo de pitcheo del NLA mantuvo los bates de BAR3 fríos, permitiendo solo cinco hits en siete entradas.</p><figure class="art-figure"><img src="assets/news/recap-june2-batter.jpg" alt="Bateador de BAR3 frente al pitcheo del NLA" loading="lazy" /><figcaption class="art-caption">Un bateador de BAR3 enfrenta el dominante cuerpo de pitcheo del NLA en Heerenschürli.</figcaption></figure><p>El NLA no tardó en establecer su superioridad en ambos lados del campo. Su lineup generó carreras en rachas, aprovechando cada oportunidad mientras BAR3 luchaba por conectar hits seguidos. A mediados del partido, la diferencia había crecido a dos dígitos y el enfoque táctico se desplazó a limitar el daño y mantener la confianza del equipo.</p><figure class="art-figure"><img src="assets/news/recap-june2-coaches.jpg" alt="Cuerpo técnico de BAR3" loading="lazy" /><figcaption class="art-caption">El cuerpo técnico de BAR3 realiza ajustes durante un cambio de pitcheo en los innings centrales.</figcaption></figure><p>Los puntos positivos fueron escasos pero significativos. Jhomar Rosa Lima tuvo una noche destacada de 1-de-2 con una impulsada, mostrando el tipo de producción que BAR3 necesita de la parte central de su alineación. Yohandris Pedroso y Jhon Arregoitia también conectaron un hit con impulsada cada uno, recordando al banco que los turnos de calidad son posibles incluso contra un pitcheo superior.</p><figure class="art-figure"><img src="assets/news/recap-june2-base.jpg" alt="Jugador de BAR3 llega a base" loading="lazy" /><figcaption class="art-caption">Jhomar Rosa Lima llega a base — uno de los cinco hits de BAR3 en la noche.</figcaption></figure><p>A pesar del marcador adverso, el duelo interclub contra el NLA sirve como un valioso punto de referencia. Carlos Moreno sumó un hit y José Medina anotó una carrera. BAR3 enfoca ahora toda su atención en el doble juego del 7 de junio contra los Challengers 2 en el Heerenschürli — un encuentro decisivo para la clasificación.</p><figure class="art-figure"><img src="assets/news/recap-june2-dugout.jpg" alt="Dugout de BAR3" loading="lazy" /><figcaption class="art-caption">El dugout de BAR3 mantiene el enfoque al final del partido, con la vista ya en el 7 de junio.</figcaption></figure>',
      },
      de: {
        tag: 'Spielbericht',
        headline: 'NLA Barracudas bezwingen BAR3 17:3 im klaren Clubduell',
        summary: 'Zürichs NLA-Mannschaft erteilte BAR3 am Dienstagabend im Heerenschürli eine deutliche 17:3-Niederlage und demonstrierte den Klassenunterschied zwischen den beiden Clubteams.',
        body: '<p>Es war ein harter Dienstagabend im Heerenschürli, als die Zürich Barracudas NLA — die Erstmannschaft des Clubs — zu Besuch kamen und keinen Zweifel aufkommen ließen: 17:3-Sieg im NL Baseball Gruppe A-Duell. Vom ersten Wurf an hielt das überlegene NLA-Pitching-Staff die BAR3-Schlagmänner kalt und erlaubte in sieben Innings nur fünf Hits.</p><figure class="art-figure"><img src="assets/news/recap-june2-batter.jpg" alt="BAR3-Schlagmann gegen NLA-Pitching" loading="lazy" /><figcaption class="art-caption">Ein BAR3-Schlagmann arbeitet sich gegen das dominante NLA-Pitching-Staff im Heerenschürli.</figcaption></figure><p>Das NLA-Team verschwendete keine Zeit damit, seine Überlegenheit auf beiden Seiten zu zeigen. Die Offensive erzielte Runs in Serie und nutzte jede Gelegenheit, während BAR3 Schwierigkeiten hatte, Hits aneinanderzureihen. Im Mittelteil des Spiels war der Rückstand zweistellig, und der taktische Fokus verschob sich auf Schadensbegrenzung.</p><figure class="art-figure"><img src="assets/news/recap-june2-coaches.jpg" alt="BAR3-Trainerstab" loading="lazy" /><figcaption class="art-caption">Der Trainerstab kommuniziert Anpassungen während eines Pitcherwechsels in den mittleren Innings.</figcaption></figure><p>Lichtblicke gab es wenige, aber sie waren bedeutsam. Jhomar Rosa Lima schlug 1-für-2 mit einem RBI und zeigte die Produktion, die BAR3 vom Herzstück seiner Aufstellung braucht. Yohandris Pedroso und Jhon Arregoitia lieferten ebenfalls je einen RBI-Hit und bewiesen, dass gute At-Bats auch gegen überlegenes Pitching möglich sind.</p><figure class="art-figure"><img src="assets/news/recap-june2-base.jpg" alt="BAR3-Spieler erreicht die Base" loading="lazy" /><figcaption class="art-caption">Jhomar Rosa Lima erreicht die Base — einer der fünf BAR3-Hits des Abends.</figcaption></figure><p>Trotz des deutlichen Spielstands dient das Clubduell gegen das NLA als wertvoller Maßstab für die zweite Saisonhälfte. Carlos Moreno steuerte einen Hit bei, José Medina erzielte einen Lauf. BAR3 richtet nun seine volle Aufmerksamkeit auf das Doppelspiel am 7. Juni gegen die Challengers 2 im Heerenschürli — ein entscheidendes Spiel für die Playoff-Positionierung.</p><figure class="art-figure"><img src="assets/news/recap-june2-dugout.jpg" alt="BAR3-Dugout fokussiert" loading="lazy" /><figcaption class="art-caption">Der BAR3-Dugout bleibt bis zum Schluss konzentriert und blickt bereits auf den 7. Juni voraus.</figcaption></figure>',
      },
    },
  },
  {
    id: 'frogs-doubleheader-may30',
    date: 'May 30, 2026', tag: '🧹 Doubleheader Sweep', tagColor: '#F0B429',
    headline: 'Barracudas 3 Sweep Frogs with Back-to-Back Mercy Rule Annihilations — 48 Runs, 7 Innings',
    summary: 'Vasquez and Elias each delivered mercy-rule gems as BAR3 outscored Sissach 48–1 across both games, capitalizing on 11 Frogs errors to post the most dominant doubleheader in recent memory.',
    body: 'Zürich Barracudas 3 made it a day to remember at Heerenschürli on May 30, sweeping the Sissach Frogs in a historic doubleheader that left absolutely no doubt about who the better team was. In Game 1, Michael Vasquez was untouchable on the mound, holding the Frogs scoreless on four hits over four innings while seven Sissach errors opened the floodgates for a thunderous 27–0 BAR3 mercy-rule victory — 15 hits and 27 runs in four frames. Game 2 brought more of the same. Angel Elias stepped in and picked up right where Vasquez left off, working three efficient innings and allowing just one run as the offense piled on another 21 runs on 17 hits for a 21–1 final. Across seven combined innings, the Barracudas outscored Sissach 48–1, collected 32 hits, and watched the Frogs commit 11 errors. Elvis Del Valle was a force at shortstop all day, Jhomar Rosa Lima anchored third base through both games, and José Medina was a pillar behind the plate. The sweep pushes BAR3\'s Gruppe A record to 5–4. Next up: Challengers 2 at Heerenschürli on June 7.',
    image: 'assets/nightgame-7.jpg',
    carouselImages: ['assets/nightgame-7.jpg', 'assets/nightgame-14.jpg', 'assets/nightgame-20.jpg', 'assets/nightgame-22.jpg'],
    href: 'article.html?id=frogs-doubleheader-may30',
    score: { us: 48, them: 1 }, opponent: 'Sissach Frogs', location: 'Home · Heerenschürli',
    notes: 'G1: 27-0 (4 inn) · G2: 21-1 (3 inn) · Mercy Rule sweep',
    i18n: {
      es: {
        tag: '🧹 Barrida en Doble Juego',
        headline: 'Barracudas 3 barren a los Frogs con dos victorias por la regla de misericordia — 48 carreras en 7 entradas',
        summary: 'Vasquez y Elias cada uno completó una salida dominante mientras BAR3 superó a Sissach 48-1 en ambos juegos, capitalizando 11 errores de los Frogs en la jornada más dominante de la temporada.',
        body: 'Los Zürich Barracudas 3 hicieron del 30 de mayo un día para recordar en el Heerenschürli, barriendo a los Sissach Frogs en un histórico doble juego que no dejó ninguna duda sobre quién era el mejor equipo. En el Juego 1, Michael Vasquez fue intocable en el montículo, dejando a los Frogs en cero carreras con cuatro hits en cuatro entradas mientras siete errores de Sissach abrieron las compuertas para una demoledora victoria 27-0 por la regla de misericordia. El Juego 2 trajo más de lo mismo. Angel Elias entró a continuación y recogió donde Vasquez lo dejó, lanzando tres entradas eficientes y permitiendo solo una carrera mientras la ofensiva acumuló otras 21 carreras para un marcador final de 21-1. En siete entradas combinadas, los Barracudas superaron a Sissach 48-1, acumularon 32 hits y observaron cómo los Frogs cometían 11 errores. Elvis Del Valle fue una fuerza en el campo corto todo el día, Jhomar Rosa Lima ancló la tercera base en ambos juegos, y José Medina fue un pilar detrás del plato. La barrida eleva el récord de BAR3 en Gruppe A a 5-4. El próximo partido: Challengers 2 en el Heerenschürli el 7 de junio.',
      },
      de: {
        tag: '🧹 Doppelspiel-Sweep',
        headline: 'Barracudas 3 fegen Frogs mit zwei Mercy-Rule-Siegen weg — 48 Läufe in 7 Innings',
        summary: 'Vasquez und Elias lieferten jeweils dominante Auftritte, während BAR3 Sissach 48-1 in beiden Spielen übertraf und 11 Frogs-Fehler ausnutzte.',
        body: 'Die Zürich Barracudas 3 machten den 30. Mai im Heerenschürli zu einem unvergesslichen Tag und fegten die Sissach Frogs in einem historischen Doppelspiel weg. Im Spiel 1 war Michael Vasquez auf dem Mound unantastbar — vier Innings, null Läufe, vier Hits, während sieben Sissach-Fehler die Fluttore für einen donnernden 27-0-Mercy-Rule-Sieg öffneten. Spiel 2 brachte dasselbe: Angel Elias arbeitete drei effiziente Innings und ließ nur einen Lauf zu, während die Offensive weitere 21 Läufe auf 17 Hits erzielte — Endstand 21-1. Über sieben kombinierte Innings erzielten die Barracudas 48-1 gegen Sissach, sammelten 32 Hits und sahen die Frogs elf Fehler begehen. Elvis Del Valle war am Shortstop den ganzen Tag über eine starke Kraft, Jhomar Rosa Lima verankerte die dritte Base in beiden Spielen, und José Medina war hinter dem Schläger ein unverzichtbarer Rückhalt. Der Sweep verbessert BAR3s Gruppe-A-Bilanz auf 5-4. Als nächstes kommen die Challengers 2 am 7. Juni ins Heerenschürli.',
      },
    },
  },
  {
    id: 'pink-game-may5',
    date: 'May 5, 2026', tag: '🩷 Pink Game', tagColor: '#FF3EA5',
    headline: 'Barracudas 3 Fall 17–5 in Pink Game as NLA Squad Proves Too Strong',
    summary: 'Under the lights of Heerenschürli, the Barracudas 3 donned their pink uniforms for breast cancer awareness — but the NLA squad had other plans.',
    image: 'assets/news-pink-game-02.jpg',
    carouselImages: ['assets/nightgame-2.jpg', 'assets/nightgame-7.jpg', 'assets/nightgame-14.jpg', 'assets/nightgame-20.jpg', 'assets/nightgame-22.jpg', 'assets/pink-game-team.jpg', 'assets/news-pink-game-02.jpg'],
    href: 'pink-game-recap.html', featured: true,
    score: { us: 5, them: 17 }, opponent: 'Barracudas NLA', location: 'Home · Heerenschürli',
    i18n: {
      es: {
        tag: '🩷 Pink Game',
        headline: 'Barracudas 3 caen 17-5 en el Pink Game ante el equipo NLA',
        summary: 'Bajo las luces de Heerenschürli, los Barracudas 3 vistieron sus uniformes rosas por una causa especial — concientizar sobre el cáncer de mama — pero el equipo NLA tenía otros planes.',
        body: 'Bajo las luces de Heerenschürli, los Barracudas 3 vistieron sus uniformes rosas por una causa especial — concientizar sobre el cáncer de mama — pero el equipo NLA tenía otros planes. Los Zürich Barracudas NLA se impusieron 17-5 en el duelo entre clubes, impulsados por una actuación dominante de Nicholas Michael Miceli, quien lanzó 3.0 entradas perfectas con 7 ponches en solo 30 lanzamientos. Los Barracudas 3 mostraron pelea temprana, igualando 3-3 hasta el segundo inning, pero todo se derrumbó en el sexto cuando el NLA anotó ocho carreras. Peguero tomó la derrota tras solo 0.2 entradas. En el lado positivo: Malchans fue 2-de-4 con 2 carreras impulsadas, Medina continuó su racha caliente con 2 hits, Rosa Lima agregó 2 hits y una impulsada, y García aportó una impulsada clave. El Pink Game recaudó fondos para la investigación del cáncer de mama. Próximo partido: 30 de mayo vs Sissach Frogs.',
      },
      de: {
        tag: '🩷 Pink Game',
        headline: 'Barracudas 3 verlieren 17-5 im Pink Game gegen NLA-Team',
        summary: 'Unter den Lichtern des Heerenschürli traten die Barracudas 3 in ihren pinken Trikots für Brustkrebsvorsorge an — doch das NLA-Team hatte andere Pläne.',
        body: 'Unter den Lichtern des Heerenschürli traten die Barracudas 3 in ihren pinken Trikots für Brustkrebsvorsorge an — doch das NLA-Team hatte andere Pläne. Die Zürich Barracudas NLA gewannen klar mit 17-5, angetrieben von einer dominanten Pitching-Leistung von Nicholas Michael Miceli, der perfekte 3.0 Innings mit 7 Strikeouts in nur 30 Würfen warf. Die Barracudas 3 zeigten frühen Kampfgeist und hielten bis zum zweiten Inning mit 3-3 mit, aber im sechsten Inning brach alles zusammen, als das NLA-Team acht Läufe erzielte. Peguero kassierte die Niederlage nach nur 0.2 Innings. Auf der positiven Seite: Malchans ging 2-für-4 mit 2 RBI, Medina setzte seine heiße Serie fort, Rosa Lima fügte 2 Hits und ein RBI hinzu, und Garcia steuerte ein entscheidendes RBI bei. Das Pink Game sammelte Spenden für die Brustkrebsforschung. Nächstes Spiel: 30. Mai gegen Sissach Frogs.',
      },
    },
  },
  {
    id: 'eagles-game1-may2',
    date: 'May 2, 2026', tag: 'Game Recap', tagColor: '#F0B429',
    headline: 'Eagles explode for 23 in Game 1 shellacking',
    summary: 'The Barracudas dropped Game 1 of the home doubleheader 23–9 at Heerenschürli. Kelvis Garcia was the lone bright spot — 3-for-5 with a home run, 2 doubles and 3 RBI.',
    body: 'The Barracudas dropped Game 1 of the home doubleheader 23–9 at Heerenschürli. Kelvis Garcia was the lone bright spot — 3-for-5 with a home run, 2 doubles and 3 RBI. Hansel Rodriguez added 3 hits off the bench. Wilkin Peguero took the loss, lasting 3.1 innings and allowing 8 earned runs. The Cudas went 6-for-19 with RISP and stranded 8.',
    image: 'assets/news-game1-batter.jpg',
    href: 'article.html?id=eagles-game1-may2',
    score: { us: 9, them: 23 }, opponent: 'Luzern Eagles', location: 'Home · Heerenschürli',
    notes: 'HR · K.Garcia · 9 innings',
    i18n: {
      es: {
        tag: 'Resumen de Partido',
        headline: 'Las Águilas explotan con 23 carreras en la paliza del Juego 1',
        summary: 'Los Barracudas cayeron en el primer juego del doubleheader en casa, 23-9 en Heerenschürli. Kelvis Garcia fue el único punto brillante — 3-de-5 con un jonrón, 2 dobles y 3 carreras impulsadas.',
        body: 'Los Barracudas cayeron en el primer juego del doubleheader en casa, 23-9 en Heerenschürli. Kelvis Garcia fue el único punto brillante — 3-de-5 con un jonrón, 2 dobles y 3 carreras impulsadas. Hansel Rodriguez agregó 3 hits desde el banco. Wilkin Peguero tomó la derrota, lanzando 3.1 entradas y permitiendo 8 carreras limpias. Los Cudas fueron 6-de-19 con corredores en posición anotadora y dejaron 8 en base.',
      },
      de: {
        tag: 'Spielbericht',
        headline: 'Eagles erzielen 23 Läufe in dominantem Spiel 1',
        summary: 'Die Barracudas verloren Spiel 1 des Heim-Doubleheaders 23-9 im Heerenschürli. Kelvis Garcia war der einzige Lichtblick — 3-für-5 mit einem Home Run, 2 Doubles und 3 RBI.',
        body: 'Die Barracudas verloren Spiel 1 des Heim-Doubleheaders 23-9 im Heerenschürli. Kelvis Garcia war der einzige Lichtblick — 3-für-5 mit einem Home Run, 2 Doubles und 3 RBI. Hansel Rodriguez steuerte 3 Hits als Ersatzspieler bei. Wilkin Peguero kassierte die Niederlage und warf 3,1 Innings mit 8 zugelassenen Runs. Die Cudas waren 6-für-19 mit Läufern in Scoring Position und ließen 8 auf den Bases.',
      },
    },
  },
  {
    id: 'eagles-game2-may2',
    date: 'May 2, 2026', tag: 'Game Recap', tagColor: '#F0B429',
    headline: 'Barracudas fall in heartbreaker, 10–9 in seven',
    summary: 'In a much tighter Game 2, the Cudas fought back repeatedly but fell 10–9 in seven innings. Zürich led 7–3 after four before the Eagles answered with 6 runs over the final three frames.',
    body: 'In a much tighter Game 2, the Cudas fought back repeatedly but fell 10–9 in seven innings. Zürich led 7–3 after four before the Eagles answered with 6 runs over the final three frames. Jhomar Rosa Lima led the offense (2-for-4, 2 RBI). Elvis Del Valle scored three times and swiped a bag. Vasquez started, gave way to Elias and Rodriguez — the bullpen couldn\'t seal it.',
    image: 'assets/news-game1-slide.jpg',
    href: 'article.html?id=eagles-game2-may2',
    score: { us: 9, them: 10 }, opponent: 'Luzern Eagles', location: 'Home · Heerenschürli',
    notes: '2B · J.Rosa Lima · 2 RBI · 7 innings',
    i18n: {
      es: {
        tag: 'Resumen de Partido',
        headline: 'Los Barracudas caen en una batalla cerrada, 10-9 en siete entradas',
        summary: 'En un Juego 2 mucho más disputado, los Cudas respondieron repetidamente pero cayeron 10-9 en siete entradas. Zürich lideró 7-3 al cuarto inning antes de que las Águilas respondieran con 6 carreras.',
        body: 'En un Juego 2 mucho más disputado, los Cudas respondieron repetidamente pero cayeron 10-9 en siete entradas. Zürich lideró 7-3 al cuarto inning antes de que las Águilas respondieran con 6 carreras en los últimos tres innings. Jhomar Rosa Lima lideró la ofensiva (2-de-4, 2 RBI). Elvis Del Valle anotó tres veces y robó una base. Vasquez abrió, cedió a Elias y Rodriguez — el bullpen no pudo cerrar.',
      },
      de: {
        tag: 'Spielbericht',
        headline: 'Barracudas verlieren knappes Spiel, 10-9 nach sieben Innings',
        summary: 'Im viel ausgeglicheneren Spiel 2 kämpften sich die Cudas immer wieder zurück, verloren aber 10-9 nach sieben Innings. Zürich führte 7-3 nach vier Innings, bevor die Eagles 6 Läufe erzielten.',
        body: 'Im viel ausgeglicheneren Spiel 2 kämpften sich die Cudas immer wieder zurück, verloren aber 10-9 nach sieben Innings. Zürich führte 7-3 nach vier Innings, bevor die Eagles in den letzten drei Innings 6 Läufe erzielten. Jhomar Rosa Lima führte die Offensive an (2-für-4, 2 RBI). Elvis Del Valle punktete dreimal und stahl eine Base. Vasquez startete, machte Platz für Elias und Rodriguez — das Bullpen konnte das Spiel nicht sichern.',
      },
    },
  },
  {
    id: 'cardinals-bern',
    date: 'Sep 21, 2024', tag: 'Game Recap', tagColor: '#F0B429',
    headline: 'Late rally sinks Cardinals in Bern',
    summary: 'A clutch late-inning rally on the road sealed the win for the Barracudas against Bern Cardinals.',
    image: 'assets/news-vs-eagles-2023.jpg',
    href: 'article.html?id=cardinals-bern',
    i18n: {
      es: {
        tag: 'Resumen de Partido',
        headline: 'Un rally tardío hunde a los Cardenales en Berna',
        summary: 'Un oportuno rally en las últimas entradas fuera de casa selló la victoria de los Barracudas contra los Bern Cardinals.',
      },
      de: {
        tag: 'Spielbericht',
        headline: 'Späte Aufholjagd versenkt Cardinals in Bern',
        summary: 'Eine entscheidende Aufholjagd in den späten Innings auf fremdem Feld sicherte den Sieg der Barracudas gegen die Bern Cardinals.',
      },
    },
  },
  {
    id: 'arregoitia-profile',
    date: 'Sep 12, 2024', tag: 'Player Profile', tagColor: '#F0B429',
    headline: 'Inside #77\'s monster summer at the plate',
    summary: 'Jhon Arregoitia put together an impressive stretch in the second half of the 2024 season, anchoring the lineup at first base.',
    image: 'assets/news-two-players.jpg',
    href: 'article.html?id=arregoitia-profile',
    i18n: {
      es: {
        tag: 'Perfil de Jugador',
        headline: 'El descomunal verano de #77 en el plato',
        summary: 'Jhon Arregoitia protagonizó una racha impresionante en la segunda mitad de la temporada 2024, siendo el pilar de la alineación en primera base.',
      },
      de: {
        tag: 'Spielerprofil',
        headline: 'Ein Blick in Arregoitias starken Sommer am Schläger',
        summary: 'Jhon Arregoitia zeigte eine beeindruckende Leistung in der zweiten Hälfte der Saison 2024 und verankerte die Aufstellung an der ersten Base.',
      },
    },
  },
  {
    id: 'garcia-signing',
    date: 'Aug 30, 2024', tag: 'Roster Move', tagColor: '#F0B429',
    headline: 'Garcia signs on for 2026 season',
    summary: 'Kelvis Garcia officially re-signs with the Barracudas 3 ahead of the 2026 season, set to bring his two-way skill set back to Heerenschürli.',
    image: 'assets/news-batter-action.jpg',
    href: 'article.html?id=garcia-signing',
    i18n: {
      es: {
        tag: 'Movimiento de Plantilla',
        headline: 'García firma para la temporada 2026',
        summary: 'Kelvis García renueva oficialmente con los Barracudas 3 de cara a la temporada 2026, listo para traer su habilidad como two-way player de vuelta a Heerenschürli.',
      },
      de: {
        tag: 'Kaderveränderung',
        headline: 'Garcia verlängert für die Saison 2026',
        summary: 'Kelvis Garcia verlängert offiziell seinen Vertrag mit den Barracudas 3 vor der Saison 2026 und bringt seine Fähigkeiten als Two-Way-Spieler zurück nach Heerenschürli.',
      },
    },
  },
  {
    id: 'peguero-cg',
    date: 'Aug 24, 2024', tag: 'Pitching', tagColor: '#F0B429',
    headline: 'Peguero\'s complete game shuts the door',
    summary: 'Wilkin Peguero delivered a dominant complete-game performance, shutting out the opposition and giving the Barracudas a statement win.',
    image: 'assets/news-pitcher.jpg',
    href: 'article.html?id=peguero-cg',
    i18n: {
      es: {
        tag: 'Pitcheo',
        headline: 'El juego completo de Peguero cierra la puerta',
        summary: 'Wilkin Peguero entregó una actuación dominante de juego completo, dejando en cero a la oposición y dando a los Barracudas una victoria contundente.',
      },
      de: {
        tag: 'Pitching',
        headline: 'Pegueros Complete Game sichert den Sieg',
        summary: 'Wilkin Peguero lieferte eine dominante Complete-Game-Leistung, hielt den Gegner blank und bescherte den Barracudas einen überzeugenden Sieg.',
      },
    },
  },
  {
    id: 'open-tryouts',
    date: 'Aug 12, 2024', tag: 'Club', tagColor: '#F0B429',
    headline: 'Open tryouts: how to join the Barracudas',
    summary: 'Everything you need to know about joining Zürich\'s premier baseball club — from tryout dates to what to bring and what to expect.',
    image: 'assets/news-game1-dugout.jpg',
    href: 'article.html?id=open-tryouts',
    i18n: {
      es: {
        tag: 'Club',
        headline: 'Pruebas abiertas: cómo unirte a los Barracudas',
        summary: 'Todo lo que necesitas saber para unirte al club de béisbol más destacado de Zúrich — desde fechas de pruebas hasta qué traer y qué esperar.',
      },
      de: {
        tag: 'Klub',
        headline: 'Offene Probespiele: Wie du den Barracudas beitritts',
        summary: 'Alles, was du wissen musst, um Zürichs führendem Baseballklub beizutreten — von Probespielterminen bis hin zu dem, was du mitbringen solltest.',
      },
    },
  },
  {
    id: 'rivera-leadership',
    date: 'Jul 28, 2024', tag: 'Captain\'s Corner', tagColor: '#F0B429',
    headline: 'Rivera on leadership, language, the long season',
    summary: 'An inside look at how the Barracudas captain navigates a multilingual locker room, the grind of a full Swiss season, and what it means to lead.',
    image: 'assets/news-player-field.jpg',
    href: 'article.html?id=rivera-leadership',
    i18n: {
      es: {
        tag: 'Rincón del Capitán',
        headline: 'Rivera sobre liderazgo, idioma y la larga temporada',
        summary: 'Una mirada interna sobre cómo el capitán de los Barracudas navega un vestuario multilingüe, el desgaste de una temporada completa suiza y lo que significa liderar.',
      },
      de: {
        tag: 'Kapitäns-Ecke',
        headline: 'Rivera über Führung, Sprache und die lange Saison',
        summary: 'Ein Einblick, wie der Barracudas-Kapitän einen mehrsprachigen Umkleideraum navigiert, den Kampf durch eine volle Schweizer Saison und was es bedeutet, zu führen.',
      },
    },
  },
  // ← New articles go here, newest first
];
