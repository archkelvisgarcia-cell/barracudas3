/* ============================================================
   BARRACUDAS — App scripts
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
    result: null, score: null, innings: null, notes: '',
  },
  {
    date: '2026-05-30', time: '14:00', label: 'MAY 30 · 2026 · G2',
    opponent: 'Sissach Frogs', opponentLogo: 'assets/teams/frogs.png',
    location: 'Home · Heerenschürli', league: 'Gruppe A',
    result: null, score: null, innings: null, notes: '',
  },
  {
    date: '2026-06-02', time: '18:30', label: 'JUN 2 · 2026',
    opponent: 'Barracudas NLA', opponentLogo: 'assets/teams/BARLOGO.png',
    location: 'Home · Heerenschürli', league: 'NL vs NLA',
    result: null, score: null, innings: null, notes: '',
  },
  {
    date: '2026-06-07', time: '11:00', label: 'JUN 7 · 2026 · G1',
    opponent: 'Challengers 2', opponentLogo: 'assets/teams/challengers.png',
    location: 'Home · Heerenschürli', league: 'Gruppe A',
    result: null, score: null, innings: null, notes: '',
  },
  {
    date: '2026-06-07', time: '14:00', label: 'JUN 7 · 2026 · G2',
    opponent: 'Challengers 2', opponentLogo: 'assets/teams/challengers.png',
    location: 'Home · Heerenschürli', league: 'Gruppe A',
    result: null, score: null, innings: null, notes: '',
  },
];

// ── HERO BACKGROUND CAROUSEL — Pink Game photos ─────────────
const HERO_BG_IMAGES = [
  'assets/nightgame-1.jpg',
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
    id: 'pink-game-may5',
    date: 'May 5, 2026', tag: '🩷 Pink Game', tagColor: '#FF3EA5',
    headline: 'Barracudas 3 Fall 17–5 in Pink Game as NLA Squad Proves Too Strong',
    summary: 'Under the lights of Heerenschürli, the Barracudas 3 donned their pink uniforms for breast cancer awareness — but the NLA squad had other plans.',
    image: 'assets/news-pink-game-02.jpg',
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

// SHARE — copy current page URL to clipboard with visual feedback
function copyLink(btn) {
  navigator.clipboard.writeText(window.location.href).then(function () {
    btn.classList.add('copied');
    var prev = btn.title;
    btn.title = 'Copied!';
    setTimeout(function () {
      btn.classList.remove('copied');
      btn.title = prev;
    }, 2000);
  });
}

// THEME TOGGLE
(function () {
  const root = document.documentElement;
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;
  const stored = localStorage.getItem('barracudas-theme');
  if (stored) root.setAttribute('data-theme', stored);
  btn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('barracudas-theme', next);
  });
})();

// MOBILE MENU
(function () {
  const menu = document.getElementById('mobile-menu');
  const open  = document.getElementById('menu-open');
  const close = document.getElementById('menu-close');
  if (!menu) return;
  open  && open.addEventListener('click',  () => menu.classList.add('open'));
  close && close.addEventListener('click', () => menu.classList.remove('open'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
})();

// SCROLL REVEAL
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  els.forEach(e => io.observe(e));
})();

// ── i18n helper — reads current lang from _barLang ───────────
function _t(key) {
  return window._barLang ? window._barLang.t(key) : key;
}

// ── PLAYER REGISTRY — global lookup for modal ───────────────
const PLAYER_REGISTRY = new Map();

// ── EXTENDED STATS — keyed by player num ─────────────────────
const PLAYER_EXTENDED_DATA = {
  '20': { // Kelvis Garcia
    fullName: 'Garcia Rondon Kelvis Carmelo',
    age: 38, bats: 'R', throws: 'R',
    batting: {
      season: { G:7, PA:30, AB:27, R:12, H:10, '2B':2, '3B':0, HR:2, RBI:11, BB:3, SO:4, SB:1, CS:0, HBP:0, SF:0, AVG:'.370', OBP:'.433', SLG:'.667', OPS:'1.100' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',  spot:5, pos:'2B',       AB:3, R:0, H:1, '2B':0, HR:0, RBI:1, BB:1, SO:2, SB:0, AVG:'.370' },
        { date:'05/02', opp:'Luzern Eagles',   spot:5, pos:'2B',       AB:4, R:2, H:1, '2B':0, HR:0, RBI:0, BB:0, SO:1, SB:0, AVG:'.375' },
        { date:'05/02', opp:'Luzern Eagles',   spot:5, pos:'2B/3B',    AB:5, R:3, H:3, '2B':2, HR:1, RBI:3, BB:0, SO:0, SB:0, AVG:'.400' },
        { date:'04/26', opp:'Lausanne Indians', spot:5, pos:'2B/RF',   AB:4, R:2, H:2, '2B':0, HR:1, RBI:1, BB:0, SO:0, SB:0, AVG:'.333' },
        { date:'04/26', opp:'Lausanne Indians', spot:5, pos:'SS/2B/P', AB:6, R:3, H:3, '2B':0, HR:0, RBI:6, BB:0, SO:0, SB:1, AVG:'.273' },
        { date:'04/19', opp:'Therwil Flyers 2', spot:5, pos:'PH/P',   AB:1, R:0, H:0, '2B':0, HR:0, RBI:0, BB:0, SO:0, SB:0, AVG:'.000' },
      ],
    },
    pitching: {
      season: { G:2, GS:0, IP:'3.1', H:2, R:0, ER:0, BB:1, SO:7, HR:0, HBP:1, WP:1, BF:14, WL:'0-0', SV:0, OppAVG:'.167', WHIP:'0.90', ERA:'0.00' },
      log: [
        { date:'04/26', opp:'Lausanne Indians',  IP:'2.1', H:2, R:0, ER:0, BB:0, SO:5, HBP:0, WP:1, BF:9,  ERA:'0.00' },
        { date:'04/19', opp:'Therwil Flyers 2', IP:'1.0', H:0, R:0, ER:0, BB:1, SO:2, HBP:1, WP:0, BF:5,  ERA:'0.00' },
      ],
    },
    fielding: {
      season: { G:7, 'IP':'47.0', PO:13, A:9, E:2, DP:0, PB:0, RF:'4.21', FPct:'.917' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   pos:'2B',       IP:'7.0', PO:2, A:3, E:0, FPct:'1.000' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'2B',       IP:'7.0', PO:2, A:1, E:0, FPct:'1.000' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'2B/3B',    IP:'9.0', PO:3, A:1, E:2, FPct:'.667'  },
        { date:'04/26', opp:'Lausanne Indians', pos:'2B/RF',    IP:'8.0', PO:3, A:2, E:0, FPct:'1.000' },
        { date:'04/26', opp:'Lausanne Indians', pos:'2B/P/SS',  IP:'7.0', PO:2, A:2, E:0, FPct:'1.000' },
        { date:'04/19', opp:'Therwil Flyers 2', pos:'P/PH',    IP:'1.0', PO:0, A:0, E:0, FPct:'—'     },
      ],
    },
  },

  '27': { // Elvis Del Valle Diaz
    fullName: 'Del Valle Diaz Elvis', age: 31, bats: 'R', throws: 'R',
    batting: {
      season: { G:7, PA:37, AB:29, R:15, H:10, '2B':1, '3B':2, HR:0, RBI:4, BB:7, SO:5, SB:4, CS:0, HBP:1, SF:0, AVG:'.345', OBP:'.486', SLG:'.517', OPS:'1.004' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   spot:1, pos:'SS',     AB:3, R:2, H:1, '2B':0, HR:0, RBI:0, BB:1, SO:1, SB:0, AVG:'.345' },
        { date:'05/02', opp:'Luzern Eagles',    spot:1, pos:'SS',     AB:4, R:3, H:1, '2B':0, HR:0, RBI:0, BB:1, SO:1, SB:1, AVG:'.346' },
        { date:'05/02', opp:'Luzern Eagles',    spot:1, pos:'SS/2B',  AB:5, R:0, H:2, '2B':0, HR:0, RBI:1, BB:0, SO:0, SB:0, AVG:'.364' },
        { date:'04/26', opp:'Lausanne Indians', spot:1, pos:'SS',     AB:3, R:1, H:1, '2B':1, HR:0, RBI:0, BB:1, SO:1, SB:1, AVG:'.353' },
        { date:'04/26', opp:'Lausanne Indians', spot:1, pos:'P/SS',   AB:5, R:3, H:1, '2B':0, HR:0, RBI:1, BB:1, SO:0, SB:0, AVG:'.357' },
        { date:'04/19', opp:'Therwil Flyers 2', spot:1, pos:'SS',    AB:3, R:3, H:1, '2B':0, HR:0, RBI:0, BB:2, SO:0, SB:1, AVG:'.444' },
      ],
    },
    pitching: {
      season: { G:1, GS:1, IP:'0.2', H:2, R:8, ER:1, BB:3, SO:0, HR:0, HBP:1, WP:2, BF:11, WL:'0-0', SV:0, OppAVG:'.333', WHIP:'7.50', ERA:'10.50' },
      log: [
        { date:'04/26', opp:'Lausanne Indians', IP:'0.2', H:2, R:8, ER:1, BB:3, SO:0, HBP:1, WP:2, BF:11, ERA:'10.50' },
      ],
    },
    fielding: {
      season: { G:7, IP:'51.0', PO:12, A:18, E:4, DP:0, PB:0, RF:'5.29', FPct:'.882' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   pos:'SS',     IP:'7.0', PO:1, A:4, E:0, FPct:'.882' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'SS',     IP:'7.0', PO:3, A:3, E:0, FPct:'.862' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'2B/SS',  IP:'9.0', PO:2, A:3, E:0, FPct:'.826' },
        { date:'04/26', opp:'Lausanne Indians', pos:'SS',     IP:'8.0', PO:3, A:4, E:2, FPct:'.778' },
        { date:'04/26', opp:'Lausanne Indians', pos:'P/SS',   IP:'7.0', PO:1, A:0, E:1, FPct:'.778' },
        { date:'04/19', opp:'Therwil Flyers 2', pos:'SS',    IP:'5.0', PO:0, A:2, E:0, FPct:'.857' },
      ],
    },
  },

  '1': { // Juan Malchans
    fullName: 'Malchans Caridad Juan Leonel', bats: 'R', throws: 'R',
    batting: {
      season: { G:7, PA:36, AB:30, R:12, H:7, '2B':3, '3B':0, HR:0, RBI:12, BB:4, SO:3, SB:2, CS:0, HBP:2, SF:0, AVG:'.233', OBP:'.361', SLG:'.333', OPS:'.694' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   spot:2, pos:'DH/P',   AB:4, R:1, H:2, '2B':1, HR:0, RBI:2, BB:0, SO:1, SB:0, AVG:'.233' },
        { date:'05/02', opp:'Luzern Eagles',    spot:2, pos:'DH',     AB:5, R:1, H:2, '2B':1, HR:0, RBI:1, BB:0, SO:0, SB:0, AVG:'.192' },
        { date:'05/02', opp:'Luzern Eagles',    spot:2, pos:'DH',     AB:5, R:0, H:0, '2B':0, HR:0, RBI:0, BB:0, SO:1, SB:0, AVG:'.143' },
        { date:'04/26', opp:'Lausanne Indians', spot:2, pos:'DH/2B',  AB:4, R:0, H:0, '2B':0, HR:0, RBI:1, BB:1, SO:0, SB:0, AVG:'.188' },
        { date:'04/26', opp:'Lausanne Indians', spot:2, pos:'2B/P',   AB:6, R:4, H:1, '2B':0, HR:0, RBI:3, BB:0, SO:0, SB:0, AVG:'.250' },
        { date:'04/19', opp:'Therwil Flyers 2', spot:2, pos:'2B',    AB:3, R:3, H:1, '2B':0, HR:0, RBI:2, BB:2, SO:1, SB:0, AVG:'.333' },
      ],
    },
    pitching: {
      season: { G:2, GS:0, IP:'4.2', H:4, R:2, ER:1, BB:3, SO:4, HR:0, HBP:0, WP:4, BF:22, WL:'1-0', SV:0, OppAVG:'.211', WHIP:'1.50', ERA:'1.50' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   IP:'0.2', H:0, R:0, ER:0, BB:0, SO:0, HBP:0, WP:0, BF:2,  ERA:'1.50' },
        { date:'04/26', opp:'Lausanne Indians', IP:'4.0', H:4, R:2, ER:1, BB:3, SO:4, HBP:0, WP:4, BF:19, ERA:'1.75' },
      ],
    },
    fielding: {
      season: { G:7, IP:'22.2', PO:5, A:1, E:2, DP:0, PB:0, RF:'2.38', FPct:'.750' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   pos:'DH/P',  IP:'0.2', PO:0, A:0, E:0, FPct:'.750' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'DH',    IP:'0.0', PO:0, A:0, E:0, FPct:'.750' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'DH',    IP:'0.0', PO:0, A:0, E:0, FPct:'.750' },
        { date:'04/26', opp:'Lausanne Indians', pos:'2B/DH', IP:'2.0', PO:0, A:1, E:0, FPct:'.750' },
        { date:'04/26', opp:'Lausanne Indians', pos:'2B/P',  IP:'7.0', PO:1, A:0, E:1, FPct:'.714' },
        { date:'04/19', opp:'Therwil Flyers 2', pos:'2B',   IP:'5.0', PO:1, A:0, E:1, FPct:'.800' },
      ],
    },
  },

  '28': { // Francisco Robles Noa
    fullName: 'Francisco Robles Noa', age: 26, bats: 'R', throws: 'R',
    batting: {
      season: { G:6, PA:17, AB:13, R:4, H:1, '2B':0, '3B':0, HR:0, RBI:0, BB:3, SO:8, SB:1, CS:0, HBP:1, SF:0, AVG:'.077', OBP:'.294', SLG:'.077', OPS:'.371' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   spot:9, pos:'RF', AB:4, R:1, H:0, '2B':0, HR:0, RBI:0, BB:0, SO:3, SB:1, AVG:'.077' },
        { date:'05/02', opp:'Luzern Eagles',    spot:9, pos:'RF', AB:2, R:1, H:0, '2B':0, HR:0, RBI:0, BB:1, SO:0, SB:0, AVG:'.111' },
        { date:'04/26', opp:'Lausanne Indians', spot:9, pos:'RF', AB:2, R:0, H:0, '2B':0, HR:0, RBI:0, BB:0, SO:2, SB:0, AVG:'.143' },
        { date:'04/26', opp:'Lausanne Indians', spot:9, pos:'RF', AB:3, R:0, H:0, '2B':0, HR:0, RBI:0, BB:0, SO:2, SB:0, AVG:'.200' },
        { date:'04/19', opp:'Therwil Flyers 2', spot:9, pos:'RF', AB:2, R:2, H:1, '2B':0, HR:0, RBI:0, BB:2, SO:1, SB:0, AVG:'.500' },
      ],
    },
    pitching: null,
    fielding: {
      season: { G:6, IP:'29.1', PO:3, A:0, E:0, DP:0, PB:0, RF:'.92', FPct:'1.000' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   pos:'RF', IP:'7.0', PO:1, A:0, E:0, FPct:'1.000' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'RF', IP:'6.0', PO:0, A:0, E:0, FPct:'1.000' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'RF', IP:'0.1', PO:0, A:0, E:0, FPct:'1.000' },
        { date:'04/26', opp:'Lausanne Indians', pos:'RF', IP:'6.0', PO:1, A:0, E:0, FPct:'1.000' },
        { date:'04/26', opp:'Lausanne Indians', pos:'RF', IP:'5.0', PO:1, A:0, E:0, FPct:'1.000' },
        { date:'04/19', opp:'Therwil Flyers 2', pos:'RF', IP:'5.0', PO:0, A:0, E:0, FPct:'1.000' },
      ],
    },
  },

  '15': { // Jose Medina
    fullName: 'Medina Reyes Jose Antonio', age: 38, bats: 'S', throws: 'R', captain: true,
    batting: {
      season: { G:7, PA:33, AB:22, R:6, H:10, '2B':2, '3B':2, HR:0, RBI:11, BB:6, SO:2, SB:4, CS:0, HBP:4, SF:1, AVG:'.455', OBP:'.606', SLG:'.727', OPS:'1.333' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   spot:3, pos:'C', AB:4, R:0, H:2, '2B':0, HR:0, RBI:0, BB:0, SO:0, SB:0, AVG:'.455' },
        { date:'05/02', opp:'Luzern Eagles',    spot:3, pos:'C', AB:4, R:0, H:2, '2B':0, HR:0, RBI:2, BB:0, SO:1, SB:0, AVG:'.444' },
        { date:'05/02', opp:'Luzern Eagles',    spot:3, pos:'C', AB:2, R:0, H:0, '2B':0, HR:0, RBI:0, BB:0, SO:0, SB:0, AVG:'.429' },
        { date:'04/26', opp:'Lausanne Indians', spot:6, pos:'C', AB:2, R:0, H:1, '2B':1, HR:0, RBI:0, BB:1, SO:0, SB:2, AVG:'.500' },
        { date:'04/26', opp:'Lausanne Indians', spot:6, pos:'C', AB:2, R:1, H:1, '2B':0, HR:0, RBI:1, BB:3, SO:0, SB:0, AVG:'.500' },
        { date:'04/19', opp:'Therwil Flyers 2', spot:7, pos:'C', AB:4, R:2, H:2, '2B':0, HR:0, RBI:3, BB:1, SO:1, SB:0, AVG:'.500' },
      ],
    },
    pitching: null,
    fielding: {
      season: { G:7, IP:'47.0', PO:48, A:2, E:1, DP:0, PB:7, SBAtt:12, RF:'9.57', FPct:'.980' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   pos:'C', IP:'7.0', PO:3,  A:0, E:0, PB:2, SBAtt:2, FPct:'.980' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'C', IP:'7.0', PO:2,  A:0, E:0, PB:1, SBAtt:1, FPct:'.979' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'C', IP:'5.0', PO:5,  A:0, E:0, PB:0, SBAtt:2, FPct:'.978' },
        { date:'04/26', opp:'Lausanne Indians', pos:'C', IP:'8.0', PO:8,  A:0, E:0, PB:1, SBAtt:2, FPct:'.976' },
        { date:'04/26', opp:'Lausanne Indians', pos:'C', IP:'7.0', PO:9,  A:0, E:0, PB:3, SBAtt:2, FPct:'.970' },
        { date:'04/19', opp:'Therwil Flyers 2', pos:'C', IP:'5.0', PO:9,  A:2, E:0, PB:0, SBAtt:1, FPct:'.958' },
      ],
    },
  },

  '23': { // Sascha Litscher
    fullName: 'Litscher Sascha', age: 33, bats: 'R', throws: 'R',
    batting: {
      season: { G:2, PA:2, AB:2, R:1, H:1, '2B':0, '3B':0, HR:0, RBI:0, BB:0, SO:1, SB:1, CS:0, HBP:0, SF:0, AVG:'.500', OBP:'.500', SLG:'.500', OPS:'1.000' },
      log: [
        { date:'05/02', opp:'Luzern Eagles', spot:3, pos:'1B', AB:2, R:1, H:1, '2B':0, HR:0, RBI:0, BB:0, SO:1, SB:1, AVG:'.500' },
      ],
    },
    pitching: null,
    fielding: {
      season: { G:2, IP:'5.0', PO:4, A:1, E:1, DP:0, PB:0, RF:'9.00', FPct:'.833' },
      log: [
        { date:'05/02', opp:'Luzern Eagles', pos:'1B', IP:'1.0', PO:1, A:0, E:0, FPct:'.833' },
        { date:'05/02', opp:'Luzern Eagles', pos:'1B', IP:'4.0', PO:3, A:1, E:1, FPct:'.800' },
      ],
    },
  },

  '34': { // Jhomar Lima
    fullName: 'Rosa Lima Jhomar Bienvenido', age: 32, bats: 'R', throws: 'R',
    batting: {
      season: { G:7, PA:34, AB:27, R:9, H:15, '2B':2, '3B':0, HR:3, RBI:18, BB:6, SO:1, SB:1, CS:0, HBP:0, SF:1, AVG:'.556', OBP:'.618', SLG:'.963', OPS:'1.581' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   spot:4, pos:'3B',   AB:2, R:0, H:2, '2B':0, HR:0, RBI:1,  BB:1, SO:0, SB:0, AVG:'.556' },
        { date:'05/02', opp:'Luzern Eagles',    spot:4, pos:'3B',   AB:4, R:1, H:2, '2B':0, HR:0, RBI:2,  BB:1, SO:0, SB:0, AVG:'.520' },
        { date:'05/02', opp:'Luzern Eagles',    spot:4, pos:'3B/C', AB:4, R:3, H:2, '2B':0, HR:0, RBI:0,  BB:1, SO:0, SB:1, AVG:'.524' },
        { date:'04/26', opp:'Lausanne Indians', spot:4, pos:'3B',   AB:4, R:0, H:1, '2B':0, HR:0, RBI:0,  BB:0, SO:1, SB:0, AVG:'.529' },
        { date:'04/26', opp:'Lausanne Indians', spot:4, pos:'3B',   AB:5, R:2, H:3, '2B':2, HR:1, RBI:5,  BB:1, SO:0, SB:0, AVG:'.615' },
        { date:'04/19', opp:'Therwil Flyers 2', spot:4, pos:'3B',  AB:4, R:1, H:4, '2B':0, HR:1, RBI:6,  BB:1, SO:0, SB:0, AVG:'.625' },
      ],
    },
    pitching: null,
    fielding: {
      season: { G:7, IP:'50.0', PO:4, A:4, E:2, DP:0, PB:1, SBAtt:2, RF:'1.44', FPct:'.800' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   pos:'3B',   IP:'6.0', PO:2, A:0, E:0, FPct:'.800' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'3B',   IP:'7.0', PO:0, A:3, E:1, FPct:'.750' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'3B/C', IP:'9.0', PO:2, A:0, E:0, FPct:'.750' },
        { date:'04/26', opp:'Lausanne Indians', pos:'3B',   IP:'8.0', PO:0, A:0, E:0, FPct:'.500' },
        { date:'04/26', opp:'Lausanne Indians', pos:'3B',   IP:'7.0', PO:0, A:0, E:1, FPct:'.500' },
        { date:'04/19', opp:'Therwil Flyers 2', pos:'3B',  IP:'5.0', PO:0, A:0, E:0, FPct:'1.000' },
      ],
    },
  },

  '77': { // Jhon Arregoitia
    fullName: 'Arregoitia Villarreal Jhon Manuel', age: 32, bats: 'R', throws: 'R',
    batting: {
      season: { G:7, PA:35, AB:29, R:8, H:3, '2B':1, '3B':0, HR:0, RBI:6, BB:6, SO:7, SB:1, CS:0, HBP:0, SF:0, AVG:'.103', OBP:'.257', SLG:'.138', OPS:'.395' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   spot:6, pos:'1B',    AB:4, R:0, H:0, '2B':0, HR:0, RBI:0, BB:0, SO:3, SB:0, AVG:'.103' },
        { date:'05/02', opp:'Luzern Eagles',    spot:6, pos:'1B',    AB:4, R:0, H:1, '2B':1, HR:0, RBI:2, BB:0, SO:1, SB:0, AVG:'.120' },
        { date:'05/02', opp:'Luzern Eagles',    spot:6, pos:'1B/SS', AB:5, R:0, H:1, '2B':0, HR:0, RBI:1, BB:0, SO:0, SB:0, AVG:'.095' },
        { date:'04/26', opp:'Lausanne Indians', spot:3, pos:'1B',    AB:5, R:0, H:0, '2B':0, HR:0, RBI:0, BB:0, SO:2, SB:0, AVG:'.063' },
        { date:'04/26', opp:'Lausanne Indians', spot:3, pos:'1B',    AB:3, R:3, H:0, '2B':0, HR:0, RBI:1, BB:3, SO:0, SB:0, AVG:'.091' },
        { date:'04/19', opp:'Therwil Flyers 2', spot:3, pos:'1B',   AB:4, R:3, H:1, '2B':0, HR:0, RBI:2, BB:1, SO:1, SB:0, AVG:'.125' },
      ],
    },
    pitching: null,
    fielding: {
      season: { G:7, IP:'50.0', PO:25, A:1, E:3, DP:0, PB:0, RF:'4.68', FPct:'.897' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   pos:'1B',    IP:'7.0', PO:6, A:0, E:0, FPct:'.897' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'1B',    IP:'6.0', PO:5, A:0, E:0, FPct:'.870' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'1B/SS', IP:'9.0', PO:3, A:0, E:2, FPct:'.833' },
        { date:'04/26', opp:'Lausanne Indians', pos:'1B',    IP:'8.0', PO:5, A:0, E:0, FPct:'.923' },
        { date:'04/26', opp:'Lausanne Indians', pos:'1B',    IP:'7.0', PO:1, A:0, E:1, FPct:'.875' },
        { date:'04/19', opp:'Therwil Flyers 2', pos:'1B',   IP:'5.0', PO:3, A:0, E:0, FPct:'1.000' },
      ],
    },
  },

  '30': { // Carlos Moreno
    fullName: 'Moreno Carlos', age: 31, bats: 'R', throws: 'R',
    batting: {
      season: { G:7, PA:34, AB:29, R:8, H:7, '2B':2, '3B':0, HR:0, RBI:6, BB:2, SO:7, SB:9, CS:0, HBP:3, SF:0, AVG:'.241', OBP:'.353', SLG:'.310', OPS:'.663' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   spot:7, pos:'CF/3B', AB:3, R:1, H:1, '2B':1, HR:0, RBI:0, BB:0, SO:1, SB:1, AVG:'.241' },
        { date:'05/02', opp:'Luzern Eagles',    spot:7, pos:'CF',    AB:3, R:1, H:1, '2B':0, HR:0, RBI:0, BB:0, SO:2, SB:1, AVG:'.231' },
        { date:'05/02', opp:'Luzern Eagles',    spot:7, pos:'CF',    AB:5, R:0, H:1, '2B':0, HR:0, RBI:1, BB:0, SO:0, SB:1, AVG:'.217' },
        { date:'04/26', opp:'Lausanne Indians', spot:7, pos:'CF',    AB:3, R:0, H:1, '2B':0, HR:0, RBI:1, BB:0, SO:2, SB:2, AVG:'.222' },
        { date:'04/26', opp:'Lausanne Indians', spot:7, pos:'CF',    AB:6, R:2, H:1, '2B':0, HR:0, RBI:2, BB:0, SO:0, SB:1, AVG:'.200' },
        { date:'04/19', opp:'Therwil Flyers 2', spot:6, pos:'CF',   AB:4, R:2, H:1, '2B':0, HR:0, RBI:1, BB:1, SO:2, SB:0, AVG:'.222' },
      ],
    },
    pitching: null,
    fielding: {
      season: { G:7, IP:'51.0', PO:25, A:1, E:0, DP:0, PB:0, RF:'4.59', FPct:'1.000' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   pos:'3B/CF', IP:'7.0', PO:4, A:1, E:0, FPct:'1.000' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'CF',    IP:'7.0', PO:5, A:0, E:0, FPct:'1.000' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'CF',    IP:'9.0', PO:4, A:0, E:0, FPct:'1.000' },
        { date:'04/26', opp:'Lausanne Indians', pos:'CF',    IP:'8.0', PO:4, A:0, E:0, FPct:'1.000' },
        { date:'04/26', opp:'Lausanne Indians', pos:'CF',    IP:'7.0', PO:3, A:0, E:0, FPct:'1.000' },
        { date:'04/19', opp:'Therwil Flyers 2', pos:'CF',   IP:'5.0', PO:1, A:0, E:0, FPct:'1.000' },
      ],
    },
  },

  '11': { // Clemens Lombriser
    fullName: 'Lombriser Clemens', age: 46, bats: 'R', throws: 'R',
    batting: {
      season: { G:6, PA:24, AB:19, R:6, H:2, '2B':0, '3B':0, HR:0, RBI:5, BB:4, SO:2, SB:0, CS:0, HBP:1, SF:0, AVG:'.105', OBP:'.292', SLG:'.105', OPS:'.397' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   spot:8, pos:'LF', AB:4, R:0, H:0, '2B':0, HR:0, RBI:0, BB:0, SO:0, SB:0, AVG:'.105' },
        { date:'05/02', opp:'Luzern Eagles',    spot:8, pos:'LF', AB:4, R:1, H:1, '2B':0, HR:0, RBI:1, BB:0, SO:0, SB:0, AVG:'.133' },
        { date:'04/26', opp:'Lausanne Indians', spot:8, pos:'LF', AB:4, R:0, H:0, '2B':0, HR:0, RBI:0, BB:0, SO:1, SB:0, AVG:'.091' },
        { date:'04/26', opp:'Lausanne Indians', spot:8, pos:'LF', AB:4, R:2, H:0, '2B':0, HR:0, RBI:1, BB:2, SO:1, SB:0, AVG:'.143' },
        { date:'04/19', opp:'Therwil Flyers 2', spot:8, pos:'LF', AB:3, R:3, H:1, '2B':0, HR:0, RBI:3, BB:2, SO:0, SB:0, AVG:'.333' },
      ],
    },
    pitching: null,
    fielding: {
      season: { G:6, IP:'40.0', PO:7, A:1, E:1, DP:0, PB:0, RF:'1.80', FPct:'.889' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   pos:'LF', IP:'7.0', PO:1, A:1, E:0, FPct:'.889' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'LF', IP:'1.0', PO:0, A:0, E:0, FPct:'.857' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'LF', IP:'9.0', PO:3, A:0, E:0, FPct:'.857' },
        { date:'04/26', opp:'Lausanne Indians', pos:'LF', IP:'8.0', PO:0, A:0, E:0, FPct:'.750' },
        { date:'04/26', opp:'Lausanne Indians', pos:'LF', IP:'7.0', PO:3, A:0, E:1, FPct:'.750' },
        { date:'04/19', opp:'Therwil Flyers 2', pos:'LF', IP:'8.0', PO:0, A:0, E:0, FPct:'1.000' },
      ],
    },
  },

  '8': { // Rodriguez Martin Hansel
    fullName: 'Rodriguez Martin Hansel Martin', bats: 'R', throws: 'R',
    batting: {
      season: { G:6, PA:9, AB:8, R:3, H:4, '2B':1, '3B':0, HR:1, RBI:1, BB:0, SO:1, SB:1, CS:0, HBP:1, SF:1, AVG:'.500', OBP:'.556', SLG:'1.000', OPS:'1.556' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   spot:4,  pos:'PH/CF', AB:1, R:0, H:0, '2B':0, HR:0, RBI:0, BB:0, SO:0, SB:0, AVG:'.500' },
        { date:'05/02', opp:'Luzern Eagles',    spot:9,  pos:'RF/P',  AB:4, R:1, H:3, '2B':1, HR:0, RBI:0, BB:0, SO:1, SB:1, AVG:'.571' },
        { date:'04/26', opp:'Lausanne Indians', spot:10, pos:'P/PH',  AB:2, R:0, H:0, '2B':0, HR:0, RBI:0, BB:0, SO:0, SB:0, AVG:'.333' },
        { date:'04/26', opp:'Lausanne Indians', spot:9,  pos:'PH/RF', AB:1, R:2, H:1, '2B':0, HR:1, RBI:1, BB:0, SO:0, SB:0, AVG:'1.000' },
      ],
    },
    pitching: {
      season: { G:4, GS:0, IP:'7.2', H:10, R:11, ER:10, BB:10, SO:11, HR:1, HBP:1, WP:3, BF:45, WL:'0-1', SV:0, OppAVG:'.313', WHIP:'2.61', ERA:'9.13' },
      log: [
        { date:'05/02', opp:'Luzern Eagles',    IP:'1.0', H:2, R:3,  ER:3, BB:3, SO:0, HBP:0, WP:0, BF:8,  ERA:'9.13' },
        { date:'05/02', opp:'Luzern Eagles',    IP:'0.1', H:0, R:0,  ER:0, BB:1, SO:1, HBP:0, WP:0, BF:2,  ERA:'7.35' },
        { date:'04/26', opp:'Lausanne Indians', IP:'2.1', H:4, R:3,  ER:2, BB:2, SO:4, HBP:1, WP:2, BF:14, ERA:'7.74' },
        { date:'04/19', opp:'Therwil Flyers 2', IP:'4.0', H:4, R:5, ER:5, BB:4, SO:6, HBP:0, WP:1, BF:21, ERA:'8.75' },
      ],
    },
    fielding: {
      season: { G:6, IP:'19.1', PO:3, A:0, E:1, DP:0, PB:0, RF:'1.40', FPct:'.750' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   pos:'CF/PH', IP:'1.0', PO:1, A:0, E:1, FPct:'.750' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'P',     IP:'1.0', PO:0, A:0, E:0, FPct:'1.000' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'P/RF',  IP:'9.0', PO:2, A:0, E:0, FPct:'1.000' },
        { date:'04/26', opp:'Lausanne Indians', pos:'P/PH',  IP:'2.1', PO:0, A:0, E:0, FPct:'—' },
        { date:'04/26', opp:'Lausanne Indians', pos:'PH/RF', IP:'2.0', PO:0, A:0, E:0, FPct:'—' },
        { date:'04/19', opp:'Therwil Flyers 2', pos:'P',     IP:'4.0', PO:0, A:0, E:0, FPct:'—' },
      ],
    },
  },

  '36': { // Wilkin Peguero
    fullName: 'Peguero Wilkin', age: 27, bats: 'R', throws: 'R',
    batting: null,
    pitching: {
      season: { G:3, GS:2, IP:'8.0', H:10, R:11, ER:11, BB:11, SO:10, HR:0, HBP:1, WP:4, BF:45, WL:'1-2', SV:0, OppAVG:'.303', WHIP:'2.63', ERA:'9.62' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   IP:'0.2', H:1,  R:3, ER:3, BB:5, SO:0, HBP:0, WP:2, BF:8,  ERA:'9.62' },
        { date:'05/02', opp:'Luzern Eagles',    IP:'3.1', H:6,  R:8, ER:8, BB:5, SO:4, HBP:0, WP:1, BF:21, ERA:'7.64' },
        { date:'04/19', opp:'Therwil Flyers 2', IP:'4.0', H:3,  R:0, ER:0, BB:1, SO:6, HBP:1, WP:1, BF:16, ERA:'0.00' },
      ],
    },
    fielding: {
      season: { G:5, IP:'20.0', PO:4, A:1, E:1, DP:0, PB:0, RF:'2.25', FPct:'.833' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   pos:'P',     IP:'0.2', PO:0, A:0, E:0, FPct:'.833' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'LF/RF', IP:'7.0', PO:3, A:0, E:1, FPct:'.833' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'P',     IP:'3.1', PO:0, A:0, E:0, FPct:'1.000' },
        { date:'04/19', opp:'Therwil Flyers 2', pos:'LF',   IP:'5.0', PO:1, A:0, E:0, FPct:'1.000' },
        { date:'04/19', opp:'Therwil Flyers 2', pos:'P',    IP:'4.0', PO:0, A:1, E:0, FPct:'1.000' },
      ],
    },
  },

  '50': { // Andrea Girasole
    fullName: 'Girasole Andrea', age: 38, bats: 'R', throws: 'R',
    batting: null,
    pitching: {
      season: { G:2, GS:0, IP:'6.2', H:17, R:23, ER:11, BB:5, SO:4, HR:1, HBP:2, WP:5, BF:50, WL:'0-0', SV:0, OppAVG:'.405', WHIP:'3.30', ERA:'11.55' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   IP:'1.1', H:7,  R:8,  ER:6, BB:2, SO:2, HBP:0, WP:1, BF:14, ERA:'11.55' },
        { date:'05/02', opp:'Luzern Eagles',    IP:'5.1', H:10, R:15, ER:5, BB:3, SO:2, HBP:2, WP:2, BF:36, ERA:'6.56'  },
      ],
    },
    fielding: {
      season: { G:2, IP:'6.2', PO:0, A:1, E:0, DP:0, PB:0, RF:'1.35', FPct:'1.000' },
      log: [
        { date:'05/05', opp:'Barracudas NLA', pos:'P', IP:'1.1', PO:0, A:0, E:0, FPct:'1.000' },
        { date:'05/02', opp:'Luzern Eagles',  pos:'P', IP:'5.1', PO:0, A:1, E:0, FPct:'1.000' },
      ],
    },
  },

  '13': { // Angel Elias
    fullName: 'Elias Angel Marcial', bats: 'R', throws: 'R',
    batting: null,
    pitching: {
      season: { G:3, GS:1, IP:'8.0', H:7, R:11, ER:7, BB:7, SO:12, HR:2, HBP:3, WP:1, BF:42, WL:'1-0', SV:0, OppAVG:'.233', WHIP:'1.75', ERA:'6.13' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   IP:'1.1', H:2, R:4, ER:2, BB:2, SO:1,  HBP:0, WP:0, BF:8,  ERA:'6.13' },
        { date:'05/02', opp:'Luzern Eagles',    IP:'2.2', H:3, R:4, ER:2, BB:2, SO:2,  HBP:1, WP:1, BF:14, ERA:'5.25' },
        { date:'04/19', opp:'Therwil Flyers 2', IP:'4.0', H:2, R:3, ER:3, BB:3, SO:9,  HBP:2, WP:0, BF:19, ERA:'5.25' },
      ],
    },
    fielding: {
      season: { G:3, IP:'8.0', PO:0, A:0, E:2, DP:0, PB:0, RF:'0.00', FPct:'.000' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   pos:'P', IP:'1.1', PO:0, A:0, E:2, FPct:'.000' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'P', IP:'2.2', PO:0, A:0, E:0, FPct:'—'   },
        { date:'04/19', opp:'Therwil Flyers 2', pos:'P', IP:'4.0', PO:0, A:0, E:0, FPct:'—'   },
      ],
    },
  },

  '22': { // Michael Vasquez
    fullName: 'Vasquez Nuñez Michael', age: 31, bats: 'R', throws: 'R',
    batting: null,
    pitching: {
      season: { G:3, GS:3, IP:'12.0', H:11, R:11, ER:8, BB:11, SO:3, HR:0, HBP:3, WP:10, BF:61, WL:'0-1', SV:0, OppAVG:'.239', WHIP:'1.83', ERA:'4.67' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   IP:'3.0', H:1, R:2,  ER:2, BB:4, SO:0, HBP:2, WP:1, BF:15, ERA:'4.67' },
        { date:'05/02', opp:'Luzern Eagles',    IP:'3.1', H:2, R:3,  ER:2, BB:5, SO:0, HBP:0, WP:2, BF:18, ERA:'4.67' },
        { date:'04/26', opp:'Lausanne Indians', IP:'5.2', H:8, R:6,  ER:4, BB:2, SO:3, HBP:1, WP:7, BF:28, ERA:'4.94' },
      ],
    },
    fielding: {
      season: { G:3, IP:'12.0', PO:0, A:1, E:1, DP:0, PB:0, RF:'.75', FPct:'.500' },
      log: [
        { date:'05/05', opp:'Barracudas NLA',   pos:'P', IP:'3.0', PO:0, A:0, E:0, FPct:'.500' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'P', IP:'3.1', PO:0, A:1, E:0, FPct:'.500' },
        { date:'04/26', opp:'Lausanne Indians', pos:'P', IP:'5.2', PO:0, A:0, E:1, FPct:'.000' },
      ],
    },
  },
};

// ROSTER — render flip cards directly from JSON stats
(function () {
  const grid = document.querySelector('.roster-grid');
  const data = document.getElementById('roster-data');
  if (!grid || !data) return;

  let roster;
  try { roster = JSON.parse(data.textContent); } catch (e) { return; }

  // Register all players globally
  roster.forEach(p => PLAYER_REGISTRY.set(p.num, p));

  grid.innerHTML = roster.map((p, i) => `
    <div class="player reveal${p.captain ? ' is-captain' : ''}" data-delay="${i % 4}">
      <div class="player-inner">
        <div class="player-face player-front" style="background-image:url('${p.img}');">
          ${p.captain ? '<span class="captain-badge">★ Captain</span>' : ''}
          <span class="player-tap-hint" data-i18n="card_tap_flip">Tap to flip</span>
        </div>
        <div class="player-face player-back">
          <span class="num-back">#${p.num}</span>
          <div class="back-head">
            <div class="back-flag">${p.flag}${p.captain ? ' <span class="back-cap">★ Captain</span>' : ''}</div>
            <h4>${p.first}<br/>${p.last}</h4>
            <div class="pos">${p.pos} · ${p.country}</div>
          </div>
          <div class="stats">
            ${p.stats.map(s => `
              <div>
                <div class="k">${s.k}</div>
                <div class="v">${s.v}</div>
              </div>
            `).join('')}
          </div>
          <div class="back-foot">
            <button class="btn-view-profile" data-num="${p.num}" data-i18n="btn_view_profile">View Profile →</button>
            <span class="back-flip" data-i18n="card_flip_icon">↺ flip</span>
          </div>
          <span class="player-tap-hint" data-i18n="card_tap_back">Tap to flip back</span>
        </div>
      </div>
    </div>
  `).join('');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
    grid.querySelectorAll('.reveal').forEach(e => io.observe(e));
  } else {
    grid.querySelectorAll('.reveal').forEach(e => e.classList.add('in'));
  }

  grid.querySelectorAll('.player').forEach(card => {
    card.addEventListener('click', () => card.classList.toggle('flipped'));
  });

  // "Ver Perfil" buttons — stop propagation so card doesn't flip
  grid.querySelectorAll('.btn-view-profile').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const player = PLAYER_REGISTRY.get(btn.dataset.num);
      if (player) openPlayerModal(player);
    });
  });
})();

// LIGHTBOX
(function () {
  const items = document.querySelectorAll('[data-lightbox]');
  const lb = document.getElementById('lightbox');
  if (!lb || !items.length) return;
  const imgEl   = lb.querySelector('.lightbox-img');
  const counter = lb.querySelector('.lightbox-counter');
  let idx = 0;
  const srcs = Array.from(items).map(i => i.getAttribute('data-lightbox'));
  function show(i) {
    idx = (i + srcs.length) % srcs.length;
    if (imgEl)   imgEl.src = srcs[idx];
    if (counter) counter.textContent = `${String(idx+1).padStart(2,'0')} / ${String(srcs.length).padStart(2,'0')}`;
  }
  items.forEach((it, i) => it.addEventListener('click', () => { show(i); lb.classList.add('open'); }));
  lb.querySelector('.lightbox-close').addEventListener('click', () => lb.classList.remove('open'));
  lb.querySelector('.lightbox-nav.prev').addEventListener('click', () => show(idx - 1));
  lb.querySelector('.lightbox-nav.next').addEventListener('click', () => show(idx + 1));
  lb.addEventListener('click', (e) => { if (e.target === lb) lb.classList.remove('open'); });
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape')     lb.classList.remove('open');
    if (e.key === 'ArrowLeft')  show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });
})();

// PINK GAME GALLERY LIGHTBOX
(function () {
  const items = document.querySelectorAll('[data-pg-lightbox]');
  const lb = document.getElementById('lightbox-pg');
  if (!lb || !items.length) return;
  const imgEl   = lb.querySelector('.lightbox-img');
  const counter = lb.querySelector('.lightbox-counter');
  let idx = 0;
  const srcs = Array.from(items).map(i => i.getAttribute('data-pg-lightbox'));
  function show(i) {
    idx = (i + srcs.length) % srcs.length;
    if (imgEl)   imgEl.src = srcs[idx];
    if (counter) counter.textContent = `${String(idx+1).padStart(2,'0')} / ${String(srcs.length).padStart(2,'0')}`;
  }
  items.forEach((it, i) => it.addEventListener('click', () => { show(i); lb.classList.add('open'); }));
  lb.querySelector('.lightbox-close').addEventListener('click', () => lb.classList.remove('open'));
  lb.querySelector('.lightbox-nav.prev').addEventListener('click', () => show(idx - 1));
  lb.querySelector('.lightbox-nav.next').addEventListener('click', () => show(idx + 1));
  lb.addEventListener('click', (e) => { if (e.target === lb) lb.classList.remove('open'); });
  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape')     lb.classList.remove('open');
    if (e.key === 'ArrowLeft')  show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });
})();

// ── DYNAMIC NEXT GAME COUNTDOWN ─────────────────────────────
function initNextGameCountdown() {
  const games = Array.from(document.querySelectorAll('.schedule-game[data-date]'));
  if (!games.length) return;

  let countdownTimer = null;

  function getNextGame() {
    const now = new Date();
    return games
      .map(el => ({
        el,
        dt: new Date(`${el.dataset.date}T${el.dataset.time || '18:00'}:00`)
      }))
      .filter(g => g.dt > now)
      .sort((a, b) => a.dt - b.dt)[0] || null;
  }

  function updateCountdownDisplay(distance) {
    const vals = {
      d: Math.floor(distance / 86400000),
      h: Math.floor((distance % 86400000) / 3600000),
      m: Math.floor((distance % 3600000) / 60000),
      s: Math.floor((distance % 60000) / 1000)
    };
    document.querySelectorAll('[data-cd]').forEach(el => {
      el.textContent = String(vals[el.dataset.cd]).padStart(2, '0');
    });
  }

  function startCountdown() {
    if (countdownTimer) clearInterval(countdownTimer);

    games.forEach(el => {
      el.classList.remove('next-game');
      const b = el.querySelector('.next-game-badge');
      if (b) b.remove();
    });

    const next = getNextGame();

    if (!next) {
      const wrap = document.getElementById('countdown');
      if (wrap) wrap.innerHTML = `<p style="font-family:var(--mono);font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:var(--accent);" data-i18n="season_done_msg">Season Complete · See You in 2027 🦈</p>`;
      return;
    }

    next.el.classList.add('next-game');
    const badge = document.createElement('div');
    badge.className = 'next-game-badge';
    badge.textContent = 'Next Game';
    next.el.prepend(badge);

    const opponentEl = document.getElementById('nextGameOpponent');
    const metaEl     = document.getElementById('nextGameMeta');
    const eyebrowEl  = document.getElementById('nextGameEyebrow');
    if (opponentEl) opponentEl.textContent = 'vs ' + (next.el.dataset.opponent || '—');
    if (metaEl)     metaEl.textContent = 'Zürich · ' + (next.el.dataset.time || '—');
    if (eyebrowEl)  eyebrowEl.textContent = next.dt.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' }).toUpperCase();

    countdownTimer = setInterval(() => {
      const distance = next.dt - new Date();
      if (distance <= 0) {
        clearInterval(countdownTimer);
        setTimeout(startCountdown, 3000);
        return;
      }
      updateCountdownDisplay(distance);
    }, 1000);

    updateCountdownDisplay(Math.max(0, next.dt - new Date()));
  }

  startCountdown();
}

document.addEventListener('DOMContentLoaded', initNextGameCountdown);

// ── SCHEDULE FILTERS ─────────────────────────────────────────
function initScheduleFilters() {
  const games = Array.from(document.querySelectorAll('.schedule-game'));
  if (!games.length) return;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  games.forEach(game => {
    game.classList.remove('past', 'upcoming');
    const dateStr = game.dataset.date;
    if (!dateStr) return;
    const d = new Date(dateStr);
    d.setHours(0, 0, 0, 0);
    game.classList.add(d < today ? 'past' : 'upcoming');
  });

  function applyFilter(filter) {
    let visible = 0;
    games.forEach(game => {
      const show =
        filter === 'all'      ? true :
        filter === 'upcoming' ? game.classList.contains('upcoming') :
        filter === 'past'     ? game.classList.contains('past') :
        filter === 'home'     ? game.dataset.location === 'home' :
        filter === 'away'     ? game.dataset.location === 'away' : true;
      game.classList.toggle('hidden', !show);
      if (show) visible++;
    });
    const countEl = document.getElementById('schedFilterCount');
    if (countEl) countEl.textContent = `${visible} ${visible === 1 ? _t('sched_games_single') : _t('sched_games_plural')}`;
  }

  document.querySelectorAll('.sched-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sched-filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(btn.dataset.filter);
    });
  });

  const upcomingBtn = document.querySelector('.sched-filter-btn[data-filter="upcoming"]');
  if (upcomingBtn) {
    document.querySelectorAll('.sched-filter-btn').forEach(b => b.classList.remove('active'));
    upcomingBtn.classList.add('active');
  }
  applyFilter('upcoming');

  // Re-compute count text when language changes
  window._barLang?.onLang?.(() => {
    const active = document.querySelector('.sched-filter-btn.active');
    if (active) applyFilter(active.dataset.filter);
  });
}

document.addEventListener('DOMContentLoaded', initScheduleFilters);

// ── HERO BACKGROUND CAROUSEL + NEWS CTA ─────────────────────
function initHeroNews() {
  const slidesContainer     = document.getElementById('heroSlides');
  const ctaContainer        = document.getElementById('heroNewsCta');
  const indicatorsContainer = document.getElementById('heroSlideIndicators');

  // Hide dot indicators — background is decorative, no user controls needed
  if (indicatorsContainer) indicatorsContainer.style.display = 'none';

  // ── Background carousel (Pink Game photos) ──
  if (slidesContainer && HERO_BG_IMAGES.length) {
    slidesContainer.innerHTML = HERO_BG_IMAGES.map((src, i) =>
      `<div class="hero-slide${i === 0 ? ' active' : ''}" style="background-image: url('${src}');"></div>`
    ).join('');

    const slides = slidesContainer.querySelectorAll('.hero-slide');
    if (slides.length > 1) {
      let current = 0;
      setInterval(() => {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
      }, 4500);
    }
  }

  // ── CTA card (latest news article, static) ──
  if (ctaContainer && NEWS_ARTICLES.length) {
    const article = NEWS_ARTICLES[0];
    ctaContainer.innerHTML = `
      <a class="hero-news-cta-inner" href="${article.href}">
        <span class="hero-news-cta-tag" style="color:${article.tagColor || 'var(--accent)'};">
          <span class="hero-news-cta-dot"></span>
          ${article.tag} &nbsp;·&nbsp; ${article.date}
        </span>
        <span class="hero-news-cta-headline">${article.headline}</span>
        <span class="hero-news-cta-read">Read Full Article →</span>
      </a>
    `;
  }
}

document.addEventListener('DOMContentLoaded', initHeroNews);

// ── NEWS FEATURE CAROUSEL ────────────────────────────────────
(function () {
  const wrap = document.getElementById('newsFeatureCarousel');
  if (!wrap) return;
  const slides = wrap.querySelectorAll('.news-carousel-slide');
  const dots   = wrap.querySelectorAll('.ncd');
  if (!slides.length) return;
  let cur = 0;
  function goTo(i) {
    slides[cur].classList.remove('active');
    dots[cur] && dots[cur].classList.remove('active');
    cur = (i + slides.length) % slides.length;
    slides[cur].classList.add('active');
    dots[cur] && dots[cur].classList.add('active');
  }
  dots.forEach((d, i) => d.addEventListener('click', () => { clearInterval(t); goTo(i); t = setInterval(() => goTo(cur + 1), 4000); }));
  let t = setInterval(() => goTo(cur + 1), 4000);
})();

// ── NEWS CARD CLICK — navigate ignoring share bar ─────────────
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.news-card[data-article-href]').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', e => {
      if (e.target.closest('.share-bar')) return;
      window.location.href = card.dataset.articleHref;
    });
  });
});

// ── FIRST PITCH — next upcoming game card ────────────────────
function initFirstPitch() {
  const container = document.getElementById('firstPitchCard');
  if (!container) return;

  const now = new Date();
  const next = GAMES.find(g => new Date(`${g.date}T${g.time}:00`) > now);

  if (!next) {
    container.innerHTML = `<p style="color:var(--accent);font-family:'JetBrains Mono',monospace;font-size:0.8rem;letter-spacing:0.1em;" data-i18n="next_season_done">SEASON COMPLETE 🦈</p>`;
    return;
  }

  const dt = new Date(`${next.date}T${next.time}:00`);
  const dayStr = dt.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase();
  const timeStr = `${String(dt.getHours()).padStart(2,'0')}:${String(dt.getMinutes()).padStart(2,'0')}`;

  const nextIdx = GAMES.indexOf(next);
  const after = GAMES[nextIdx + 1];
  const afterStr = after
    ? `${new Date(after.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase()} · ${after.opponent.split(' ').pop().toUpperCase()}`
    : '—';

  container.className = 'match-card reveal in';
  container.innerHTML = `
    <div class="head">
      <span class="tag">${dayStr} · ${timeStr}</span>
      <span class="eyebrow">${next.league}</span>
    </div>
    <div class="vs">
      <div class="team us">
        <div class="crest"><img src="assets/logo.png" alt="" style="height:48px;width:auto;" /></div>
        <div class="name">Barracudas 3</div>
        <div class="sub">Gruppe A</div>
      </div>
      <div class="center">VS</div>
      <div class="team them">
        <div class="crest"><img src="${next.opponentLogo}" alt="${next.opponent}" style="height:48px;width:auto;" onerror="this.style.display='none'" /></div>
        <div class="name">${next.opponent}</div>
        <div class="sub">${next.location}</div>
      </div>
    </div>
    <div class="info-row">
      <div><div class="k">Date</div><div class="v">${new Date(next.date).toLocaleDateString('en-US',{month:'short',day:'numeric'}).toUpperCase()}</div></div>
      <div><div class="k">Next</div><div class="v">${afterStr}</div></div>
      <div><div class="k">League</div><div class="v">${next.league.split(' ·')[0]}</div></div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', initFirstPitch);

// ── RECENT RESULTS — last 3 played games ────────────────────
function initRecentResults() {
  const container = document.getElementById('recentResultsList');
  if (!container) return;

  const now = new Date();
  const played = GAMES.filter(g => {
    const dt = new Date(`${g.date}T${g.time || '23:59'}:00`);
    return g.result !== null && dt < now;
  }).reverse();

  const recent = played.slice(0, 3);

  if (!recent.length) {
    container.innerHTML = `<p style="font-family:'JetBrains Mono',monospace;font-size:0.75rem;color:var(--ink-mute);" data-i18n="res_no_games">No games played yet.</p>`;
    return;
  }

  container.innerHTML = recent.map(g => {
    const isWin = g.result === 'W';
    const isPink = g.notes && g.notes.includes('Pink Game');
    const recapLink = g.recapUrl
      ? `<a href="${g.recapUrl}" class="result-recap-link" data-i18n="res_read_recap">READ RECAP →</a>`
      : '';
    return `
      <div class="result-card${isPink ? ' result-card--pink' : ''}">
        <div class="result-card-header">
          <span class="result-card-date">${g.label} · ${g.location}</span>
          <span class="result-badge result-badge--${isWin ? 'win' : 'loss'}">${g.result}</span>
        </div>
        <div class="result-card-matchup">
          <div class="result-team">
            <img src="assets/logo.png" alt="B3" class="result-logo" onerror="this.style.display='none'" />
            <span class="result-team-name">BARRACUDAS 3</span>
            <span class="result-score${!isWin ? ' result-score--loss' : ''}">${g.score.us}</span>
          </div>
          <div class="result-team">
            <img src="${g.opponentLogo}" alt="${g.opponent}" class="result-logo" onerror="this.style.display='none'" />
            <span class="result-team-name">${g.opponent.toUpperCase()}</span>
            <span class="result-score${isWin ? ' result-score--loss' : ' result-score--win'}">${g.score.them}</span>
          </div>
        </div>
        <div class="result-card-footer">
          <span class="result-innings">${g.innings} INNINGS${g.notes ? ' · ' + g.notes : ''}</span>
          ${recapLink}
        </div>
      </div>
    `;
  }).join('');
}

document.addEventListener('DOMContentLoaded', initRecentResults);

// ── PLAYER STATS STRIP ────────────────────────────────────────
function initPlayerStats() {
  const container = document.getElementById('playerStrip');
  const dataEl    = document.getElementById('roster-data');
  if (!container || !dataEl) return;

  let roster;
  try { roster = JSON.parse(dataEl.textContent); } catch (e) { return; }

  // Top Batter — highest AVG among batters/both
  const batters = roster.filter(p => {
    const avg = p.stats.find(s => s.k === 'AVG');
    return avg && (p.type === 'batter' || p.type === 'both');
  });
  const topBatter = batters.reduce((best, p) => {
    const avg = parseFloat(p.stats.find(s => s.k === 'AVG').v);
    const bestAvg = parseFloat(best.stats.find(s => s.k === 'AVG').v);
    return avg > bestAvg ? p : best;
  }, batters[0]);

  // Top Pitcher — lowest ERA among players who have ERA stat
  const pitchers = roster.filter(p => p.stats.find(s => s.k === 'ERA'));
  const topPitcher = pitchers.reduce((best, p) => {
    const era = parseFloat(p.stats.find(s => s.k === 'ERA').v);
    const bestEra = parseFloat(best.stats.find(s => s.k === 'ERA').v);
    return era < bestEra ? p : best;
  }, pitchers[0]);

  // Hitting Streak — highest streak among non-pitchers
  const streakers = roster.filter(p => p.type !== 'pitcher' && (p.streak || 0) > 0);
  const streakLeader = streakers.length
    ? streakers.reduce((best, p) => (p.streak || 0) > (best.streak || 0) ? p : best, streakers[0])
    : null;

  function shortName(p) {
    return `${p.first.split(' ')[0][0]}. ${p.last}`;
  }

  function initials(p) {
    return `${p.first[0]}${p.last[0]}`.toUpperCase();
  }

  function card(labelKey, player, stat) {
    if (!player) return `<div class="ps-card"><div class="ps-info"><span class="ps-label" data-i18n="${labelKey}"></span><span class="ps-name">—</span></div></div>`;
    const img = player.img || '';
    const photoContent = img
      ? `<img src="${img}" alt="${shortName(player)}" onerror="this.parentNode.textContent='${initials(player)}'" />`
      : initials(player);
    return `
      <div class="ps-card" data-num="${player.num}">
        <div class="ps-photo">${photoContent}</div>
        <div class="ps-info">
          <span class="ps-label" data-i18n="${labelKey}"></span>
          <div class="ps-player-row">
            <span class="ps-num">#${player.num}</span>
            <span class="ps-name">${shortName(player)}</span>
          </div>
          <span class="ps-stat">${stat}</span>
        </div>
      </div>
    `;
  }

  const avgStat = topBatter
    ? topBatter.stats.find(s => s.k === 'AVG').v + ' AVG · ' + (topBatter.stats.find(s => s.k === 'RBI')?.v || '—') + ' RBI'
    : '—';
  const eraStat = topPitcher
    ? topPitcher.stats.find(s => s.k === 'ERA').v + ' ERA · ' + (topPitcher.stats.find(s => s.k === 'W-L')?.v || '') + ' W-L'
    : '—';
  const streakStat = streakLeader
    ? `${streakLeader.streak} ${_t('stat_streak_suffix')}`
    : '—';

  container.innerHTML = [
    card('stat_top_batter',    topBatter,    avgStat),
    card('stat_top_pitcher',   topPitcher,   eraStat),
    card('stat_hitting_streak', streakLeader, streakStat),
  ].join('');

  // Click on any player stat card opens the modal
  container.querySelectorAll('.ps-card[data-num]').forEach(el => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', () => {
      const player = PLAYER_REGISTRY.get(el.dataset.num);
      if (player) openPlayerModal(player);
    });
  });
}

document.addEventListener('DOMContentLoaded', initPlayerStats);

// ── AWARDS SECTION ────────────────────────────────────────────
function initAwards() {
  const grid    = document.getElementById('awardsGrid');
  const dataEl  = document.getElementById('roster-data');
  if (!grid || !dataEl) return;

  let roster;
  try { roster = JSON.parse(dataEl.textContent); } catch (e) { return; }

  function getStat(p, key) {
    const s = p.stats.find(s => s.k === key);
    return s ? parseFloat(s.v) : null;
  }
  function getExt(num) { return PLAYER_EXTENDED_DATA[num] || null; }

  function norm(val, min, max, invert) {
    if (val === null || val === undefined || isNaN(val)) return 0;
    const pct = Math.min(1, Math.max(0, (val - min) / (max - min)));
    return Math.round((invert ? 1 - pct : pct) * 100);
  }

  function weightedScore(items) {
    let num = 0, den = 0;
    items.forEach(({ val, min = 0, max, invert = false, w }) => {
      num += norm(val, min, max, invert) * w;
      den += w;
    });
    return den ? Math.round(num / den) : 0;
  }

  function scoreColor(s) {
    return s >= 80 ? 'var(--accent)' : s >= 55 ? 'oklch(0.72 0.12 160)' : 'var(--ink-mute)';
  }

  function renderPhoto(p, size, crown) {
    const ini = `${p.first[0]}${p.last[0]}`.toUpperCase();
    const img = p.img
      ? `<img src="${p.img}" alt="${p.first}" onerror="this.parentNode.textContent='${ini}'" />`
      : ini;
    return `<div class="award-photo award-photo--${size}">${img}${crown ? '<span class="award-crown">★</span>' : ''}</div>`;
  }

  function renderMetric(label, val, pct) {
    return `<div class="award-metric">
      <span class="award-metric-label">${label}</span>
      <div class="award-metric-track"><div class="award-metric-fill" style="width:${pct}%"></div></div>
      <span class="award-metric-val">${val ?? '—'}</span>
    </div>`;
  }

  // ── Award definitions ─────────────────────────────────────────
  const AWARDS = [
    {
      icon: '🏆', name: 'MVP', desc: 'Most Valuable Player',
      filter: p => (p.type === 'batter' || p.type === 'both') && getStat(p, 'OPS') !== null && getStat(p, 'AVG') > 0.05,
      score:  p => weightedScore([
        { val: getStat(p, 'OPS'),       max: 2.0, w: 40 },
        { val: getStat(p, 'RBI') || 0,  max: 20,  w: 35 },
        { val: getStat(p, 'AVG'),        max: 0.6, w: 25 },
      ]),
      metrics: p => [
        { label:'OPS', val: getStat(p,'OPS'), pct: norm(getStat(p,'OPS'), 0, 2.0) },
        { label:'RBI', val: getStat(p,'RBI'), pct: norm(getStat(p,'RBI')||0, 0, 20) },
        { label:'AVG', val: getStat(p,'AVG'), pct: norm(getStat(p,'AVG'), 0, 0.6) },
      ],
    },
    {
      icon: '⚾', name: 'Champion Bat', desc: 'Best Hitter',
      filter: p => (p.type === 'batter' || p.type === 'both') && getStat(p, 'AVG') > 0.05,
      score:  p => weightedScore([
        { val: getStat(p,'AVG'),         max: 0.6,  w: 40 },
        { val: getStat(p,'OBP') || getStat(p,'OPS') || 0, max: 0.7, w: 30 },
        { val: getStat(p,'OPS'),          max: 2.0,  w: 20 },
        { val: getStat(p,'HR') || 0,      max: 5,    w: 10 },
      ]),
      metrics: p => [
        { label:'AVG', val: getStat(p,'AVG'), pct: norm(getStat(p,'AVG'), 0, 0.6) },
        { label:'OBP', val: getStat(p,'OBP') ?? getStat(p,'OPS'), pct: norm(getStat(p,'OBP')||getStat(p,'OPS')||0, 0, 0.7) },
        { label:'OPS', val: getStat(p,'OPS'), pct: norm(getStat(p,'OPS'), 0, 2.0) },
      ],
    },
    {
      icon: '🥇', name: 'Best Pitcher', desc: 'Best Starting Pitcher',
      filter: p => {
        if (p.type !== 'pitcher' && p.type !== 'both') return false;
        if (getStat(p, 'ERA') === null) return false;
        const ext = getExt(p.num);
        const gs = ext?.pitching?.season?.GS;
        if (gs !== undefined && gs === 0) return false;
        return true;
      },
      score:  p => weightedScore([
        { val: getStat(p,'ERA'),  max: 12, invert: true, w: 40 },
        { val: getStat(p,'WHIP'), max: 3,  invert: true, w: 35 },
        { val: getStat(p,'K')||0, max: 15,               w: 25 },
      ]),
      metrics: p => [
        { label:'ERA',  val: getStat(p,'ERA'),  pct: norm(getStat(p,'ERA'),  0, 12, true) },
        { label:'WHIP', val: getStat(p,'WHIP'), pct: norm(getStat(p,'WHIP'), 0, 3,  true) },
        { label:'K',    val: getStat(p,'K'),    pct: norm(getStat(p,'K')||0, 0, 15) },
      ],
    },
    {
      icon: '🔥', name: 'Best Reliever', desc: 'Best Relief Pitcher',
      filter: p => {
        if (p.type !== 'pitcher' && p.type !== 'both') return false;
        if (getStat(p, 'ERA') === null) return false;
        const ext = getExt(p.num);
        const gs = ext?.pitching?.season?.GS;
        if (gs !== undefined && gs > 1) return false;
        return true;
      },
      score:  p => weightedScore([
        { val: getStat(p,'ERA'),  max: 10, invert: true, w: 45 },
        { val: getStat(p,'WHIP'), max: 3,  invert: true, w: 35 },
        { val: getStat(p,'K')||0, max: 12,               w: 20 },
      ]),
      metrics: p => [
        { label:'ERA',  val: getStat(p,'ERA'),  pct: norm(getStat(p,'ERA'),  0, 10, true) },
        { label:'WHIP', val: getStat(p,'WHIP'), pct: norm(getStat(p,'WHIP'), 0, 3,  true) },
        { label:'K',    val: getStat(p,'K'),    pct: norm(getStat(p,'K')||0, 0, 12) },
      ],
    },
    {
      icon: '🧤', name: 'Golden Glove', desc: 'Best Defender',
      filter: p => {
        const ext = getExt(p.num);
        return ext?.fielding?.season?.FPct != null;
      },
      score:  p => {
        const fs = getExt(p.num)?.fielding?.season;
        if (!fs) return 0;
        return weightedScore([
          { val: parseFloat(fs.FPct)||0, min: 0.7, max: 1.0,            w: 60 },
          { val: fs.E||0,               max: 6,   invert: true,          w: 40 },
        ]);
      },
      metrics: p => {
        const fs = getExt(p.num)?.fielding?.season || {};
        return [
          { label:'FPct', val: fs.FPct, pct: norm(parseFloat(fs.FPct)||0, 0.7, 1.0) },
          { label:'E',    val: fs.E,    pct: norm(fs.E||0, 0, 6, true) },
          { label:'PO',   val: fs.PO,   pct: norm(fs.PO||0, 0, 50) },
        ];
      },
    },
  ];

  // Build each card
  grid.innerHTML = AWARDS.map(award => {
    const candidates = roster
      .filter(award.filter)
      .map(p => ({ p, sc: award.score(p), mx: award.metrics(p) }))
      .filter(c => c.sc > 0)
      .sort((a, b) => b.sc - a.sc)
      .slice(0, 3);

    if (!candidates.length) return '';

    const [first, ...rest] = candidates;
    const col = scoreColor(first.sc);

    const winnerHTML = `
      <div class="award-winner award-clickable" data-player-num="${first.p.num}">
        ${renderPhoto(first.p, 'lg', first.sc >= 80)}
        <div class="award-details">
          <div class="award-player-name">${first.p.first} ${first.p.last}</div>
          <div class="award-player-pos">#${first.p.num} · ${first.p.pos}</div>
          <div class="award-metrics">${first.mx.map(m => renderMetric(m.label, m.val, m.pct)).join('')}</div>
        </div>
        <div class="award-score-badge" style="color:${col};border-color:${col}">
          <span class="award-score-num">${first.sc}</span>
          <span class="award-score-denom">/100</span>
        </div>
      </div>`;

    const runnersHTML = rest.length ? `
      <div class="award-runners">
        ${rest.map(c => {
          const sc2 = scoreColor(c.sc);
          return `<div class="award-runner award-clickable" data-player-num="${c.p.num}">
            ${renderPhoto(c.p, 'sm', false)}
            <div class="award-runner-info">
              <span class="award-player-name">${c.p.first[0]}. ${c.p.last}</span>
              <span class="award-score-sm" style="color:${sc2}">${c.sc}/100</span>
            </div>
            <div class="award-mini-metrics">
              ${c.mx.slice(0,2).map(m => `
                <div class="award-mini-bar">
                  <span>${m.label}</span>
                  <div class="award-metric-track"><div class="award-metric-fill" style="width:${m.pct}%"></div></div>
                  <span>${m.val ?? '—'}</span>
                </div>`).join('')}
            </div>
          </div>`;
        }).join('')}
      </div>` : '';

    return `<div class="award-card reveal">
      <div class="award-header">
        <span class="award-icon">${award.icon}</span>
        <div>
          <div class="award-name">${award.name}</div>
          <div class="award-desc">${award.desc}</div>
        </div>
      </div>
      ${winnerHTML}
      ${runnersHTML}
    </div>`;
  }).join('');

  // Click on any winner/runner opens player modal
  grid.querySelectorAll('.award-clickable').forEach(el => {
    el.addEventListener('click', () => {
      const player = PLAYER_REGISTRY.get(el.dataset.playerNum);
      if (player) openPlayerModal(player);
    });
  });

  // Wire scroll-reveal for new cards
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.1 });
    grid.querySelectorAll('.reveal').forEach(e => io.observe(e));
  } else {
    grid.querySelectorAll('.reveal').forEach(e => e.classList.add('in'));
  }
}

document.addEventListener('DOMContentLoaded', initAwards);

// ── ADD TO CALENDAR ───────────────────────────────────────────
function _calDateStr(date, time) {
  return date.replace(/-/g, '') + 'T' + time.replace(':', '') + '00';
}
function _calEndStr(date, time) {
  const [h, m] = time.split(':');
  const endH = String(parseInt(h) + 3).padStart(2, '0');
  return date.replace(/-/g, '') + 'T' + endH + m + '00';
}

function openGoogleCal(date, time, opponent, location) {
  const title = encodeURIComponent(`Barracudas 3 vs ${opponent}`);
  const det   = encodeURIComponent('NL Baseball Gruppe A 2026 — Zürich Barracudas');
  const loc   = encodeURIComponent(location);
  const url   = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${_calDateStr(date,time)}/${_calEndStr(date,time)}&details=${det}&location=${loc}`;
  window.open(url, '_blank', 'noopener');
}

function downloadIcs(date, time, opponent, location) {
  const start = _calDateStr(date, time);
  const end   = _calEndStr(date, time);
  const uid   = `barracudas-${date}-${time.replace(':','')}@barracudas3.netlify.app`;
  const ics   = [
    'BEGIN:VCALENDAR', 'VERSION:2.0',
    'PRODID:-//Zürich Barracudas//EN', 'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `DTSTART:${start}`, `DTEND:${end}`,
    `SUMMARY:Barracudas 3 vs ${opponent}`,
    'DESCRIPTION:NL Baseball Gruppe A 2026 — Zürich Barracudas',
    `LOCATION:${location}`,
    `UID:${uid}`,
    'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n');
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const a = Object.assign(document.createElement('a'), {
    href: URL.createObjectURL(blob),
    download: `barracudas-vs-${opponent.replace(/\s+/g,'-').toLowerCase()}.ics`,
  });
  a.click();
  URL.revokeObjectURL(a.href);
}

function initCalendarButtons() {
  document.querySelectorAll('.schedule-game[data-date]').forEach(game => {
    const date     = game.dataset.date;
    const time     = game.dataset.time || '12:00';
    const opponent = game.dataset.opponent || 'Opponent';
    const isHome   = game.dataset.location === 'home';
    const location = isHome ? 'Heerenschürli\\, Zürich\\, Switzerland' : `${opponent} Field`;
    const arrow    = game.querySelector('.cal-arrow');
    if (!arrow) return;

    const wrap = document.createElement('div');
    wrap.className = 'cal-add-wrap';
    wrap.innerHTML = `
      <button class="cal-add-btn" aria-label="Add to Calendar" title="Add to Calendar">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      </button>
      <div class="cal-dropdown" hidden>
        <button class="cal-dd-item" data-cal="google">🗓 Google Calendar</button>
        <button class="cal-dd-item" data-cal="ics">🍎 Apple / iCal</button>
      </div>`;

    arrow.before(wrap);

    wrap.querySelector('.cal-add-btn').addEventListener('click', e => {
      e.stopPropagation();
      const dd = wrap.querySelector('.cal-dropdown');
      document.querySelectorAll('.cal-dropdown:not([hidden])').forEach(d => { if (d !== dd) d.hidden = true; });
      dd.hidden = !dd.hidden;
    });

    wrap.querySelectorAll('.cal-dd-item').forEach(item => {
      item.addEventListener('click', e => {
        e.stopPropagation();
        wrap.querySelector('.cal-dropdown').hidden = true;
        if (item.dataset.cal === 'google') openGoogleCal(date, time, opponent, location);
        else downloadIcs(date, time, opponent, location);
      });
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.cal-dropdown:not([hidden])').forEach(d => { d.hidden = true; });
  });
}

document.addEventListener('DOMContentLoaded', initCalendarButtons);

// ── ONESIGNAL NOTIFICATION BELL ───────────────────────────────
(function () {
  // Inject bell into every page's nav-tools
  document.addEventListener('DOMContentLoaded', () => {
    const tools = document.querySelector('.nav-tools');
    if (!tools) return;
    const bell = document.createElement('button');
    bell.id = 'notifBell';
    bell.className = 'icon-btn notif-bell';
    bell.setAttribute('aria-label', 'Notifications');
    bell.title = 'Notifications';
    bell.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`;
    const themeBtn = tools.querySelector('#theme-toggle');
    if (themeBtn) tools.insertBefore(bell, themeBtn); else tools.prepend(bell);

    const refresh = async () => {
      try {
        if (window.OneSignal) {
          const sub = await OneSignal.User.PushSubscription.optedIn;
          bell.classList.toggle('notif-bell--on', !!sub);
        }
      } catch (e) {}
    };

    bell.addEventListener('click', async () => {
      try {
        if (!window.OneSignal) {
          window.OneSignalDeferred?.push?.(os => os.Slidedown?.promptPush?.());
          return;
        }
        const sub = await OneSignal.User.PushSubscription.optedIn;
        if (sub) await OneSignal.User.PushSubscription.optOut();
        else     await OneSignal.User.PushSubscription.optIn();
        refresh();
      } catch (e) {
        window.OneSignalDeferred?.push?.(os => os.Slidedown?.promptPush?.());
      }
    });

    window.addEventListener('load', refresh);
  });
})();

// ── DYNAMIC STATS FROM EASYSCORE API ─────────────────────────
// Fetches fresh data on load (5-min cache).
// Updates: team W-L record, fielding stats per player.
// Batting/pitching not available via /stats — stays hardcoded.
(function initDynamicStats() {
  const CACHE_KEY = 'bar3-sync-cache';
  const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  async function sync() {
    const cached = (() => {
      try {
        const s = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
        if (s.fetchedAt && Date.now() - s.fetchedAt < CACHE_TTL) return s;
      } catch {}
      return null;
    })();

    const data = cached || await (async () => {
      try {
        const r = await fetch('/.netlify/functions/sync-stats');
        if (!r.ok) return null;
        const d = await r.json();
        localStorage.setItem(CACHE_KEY, JSON.stringify({ ...d, fetchedAt: Date.now() }));
        return d;
      } catch { return null; }
    })();

    if (!data) return;

    // Update W-L record display
    if (data.record) {
      document.querySelectorAll('[data-i18n="strip_record"]').forEach(el => {
        const sibling = el.nextElementSibling;
        if (sibling) sibling.textContent = data.record.label;
      });
    }

    // Merge API fielding stats into PLAYER_EXTENDED_DATA
    if (data.players && typeof PLAYER_EXTENDED_DATA !== 'undefined') {
      data.players.forEach(p => {
        if (!p.playerID || !p.fielding) return;
        const num = String(p.uniformNr || '');
        if (!num) return;
        // Find by uniform number (maps to PLAYER_REGISTRY key)
        const existing = PLAYER_EXTENDED_DATA[num];
        if (existing && p.fielding) {
          existing.fielding = existing.fielding || {};
          // Update only the season totals from API; preserve per-game log
          existing.fielding.season = {
            ...(existing.fielding.season || {}),
            G:    p.fielding.G,
            IP:   p.fielding.IP,
            PO:   p.fielding.PO,
            A:    p.fielding.A,
            E:    p.fielding.E,
            DP:   p.fielding.DP,
            FPct: p.fielding.FPct,
          };
        }
        // Update player photo in registry if API has one
        if (p.photo) {
          const reg = typeof PLAYER_REGISTRY !== 'undefined' ? PLAYER_REGISTRY.get(num) : null;
          if (reg && !reg.img) reg.img = p.photo;
        }
      });
    }
  }

  document.addEventListener('DOMContentLoaded', sync);
})();

// ── LIVE SCORE (EasyScore API) ────────────────────────────────
function initLiveScore() {
  const wrap = document.getElementById('liveScoreWrap');
  if (!wrap) return;

  function logoEl(src, abbr) {
    if (!src) return `<div class="ls-logo-placeholder">${abbr[0]}</div>`;
    return `<img class="ls-logo" src="${src}" alt="${abbr}" onerror="this.outerHTML='<div class=\\"ls-logo-placeholder\\">${abbr[0]}</div>'" />`;
  }

  function renderLinescore(ls, bar3Side, currentInning) {
    if (!ls) return '';
    const inns = parseInt(ls.innings || 9);
    const cells = Array.from({ length: Math.max(inns, 9) }, (_, i) => i + 1);
    const bar3 = ls[bar3Side] || {};
    const opp  = bar3Side === 'away' ? (ls.home || {}) : (ls.away || {});
    const bar3line = bar3.line || {};
    const oppline  = opp.line  || {};
    const curI = currentInning ?? inns;

    function cell(val, inning) {
      if (val === undefined || val === null || val === '') return `<td class="ls-zero">·</td>`;
      const isCur = (inning === curI) ? ' ls-cur' : '';
      const isZero = val === 0 || val === '0';
      return `<td class="${isZero ? 'ls-zero' : ''}${isCur}">${val}</td>`;
    }

    return `<div class="ls-linescore-wrap">
      <table class="ls-table">
        <thead><tr>
          <th></th>
          ${cells.map(i => `<th>${i}</th>`).join('')}
          <th>R</th><th>H</th><th>E</th>
        </tr></thead>
        <tbody>
          <tr>
            <td>${bar3.abbr || 'BAR3'}</td>
            ${cells.map(i => cell(bar3line[i], i)).join('')}
            <td class="ls-total">${bar3.totals?.R ?? '—'}</td>
            <td>${bar3.totals?.H ?? '—'}</td>
            <td>${bar3.totals?.E ?? '—'}</td>
          </tr>
          <tr>
            <td>${opp.abbr || 'OPP'}</td>
            ${cells.map(i => cell(oppline[i], i)).join('')}
            <td class="ls-total">${opp.totals?.R ?? '—'}</td>
            <td>${opp.totals?.H ?? '—'}</td>
            <td>${opp.totals?.E ?? '—'}</td>
          </tr>
        </tbody>
      </table>
    </div>`;
  }

  function renderCard(g) {
    if (!g) return '';
    const isLive     = g.live;
    const bar3Ahead  = (g.bar3Score || 0) > (g.oppScore || 0);
    const inningNum  = g.lineScore?.innings ?? '';

    const statusLabel = isLive
      ? (inningNum ? `INN ${inningNum}` : 'IN PROGRESS')
      : (g.finished ? `FINAL · ${new Date(g.date).toLocaleDateString('en-US', { month:'short', day:'numeric' })}` : '');

    return `<div class="ls-card">
      <div class="ls-topbar">
        <span class="ls-badge ${isLive ? 'ls-badge--live' : 'ls-badge--final'}">${isLive ? '🔴 LIVE' : '✓ FINAL'}</span>
        ${statusLabel ? `<span class="ls-status-label">${statusLabel}</span>` : ''}
      </div>
      <div class="ls-score-row">
        <div class="ls-team">
          ${logoEl(g.bar3Logo, g.bar3Abbr || 'BAR3')}
          <div>
            <div class="ls-team-name">${g.bar3Abbr || 'BAR3'}</div>
            <div class="ls-team-sub">Barracudas 3</div>
          </div>
          <span class="ls-runs${bar3Ahead ? ' ls-runs--highlight' : ''}">${g.bar3Score ?? '—'}</span>
        </div>
        <span class="ls-dash">—</span>
        <div class="ls-team ls-team--home">
          ${logoEl(g.oppLogo, g.oppAbbr || 'OPP')}
          <div>
            <div class="ls-team-name">${g.oppAbbr || 'OPP'}</div>
            <div class="ls-team-sub">${(g.oppName || '').split(' ').slice(-1)[0] || ''}</div>
          </div>
          <span class="ls-runs${!bar3Ahead && g.oppScore > g.bar3Score ? ' ls-runs--highlight' : ''}">${g.oppScore ?? '—'}</span>
        </div>
      </div>
      ${renderLinescore(g.lineScore, g.bar3Side, isLive ? parseInt(inningNum) : null)}
      <a href="results.html" class="ls-cta">${_t('btn_all_boxscores') || 'ALL BOXSCORES →'}</a>
    </div>`;
  }

  async function load() {
    try {
      const res  = await fetch('/.netlify/functions/easyscore');
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      const game = data.live || data.recent || null;

      if (!game) { wrap.style.display = 'none'; return; }

      wrap.style.display = 'block';
      wrap.innerHTML = `<div class="ls-wrap"><div class="ls-card-container">${renderCard(game)}</div></div>`;

      // Poll every 60s only when live
      if (game.live) setTimeout(load, 60000);
    } catch {
      // Fallback: check localStorage for manual score (admin/score.html)
      const s = JSON.parse(localStorage.getItem('bar3-live') || '{}');
      if (!s.us && s.us !== 0) { wrap.style.display = 'none'; return; }
      const banner = document.createElement('div');
      banner.id = 'liveScoreBanner';
      banner.style.cssText = 'display:flex';
      banner.innerHTML = `<span class="live-pill">🔴 LIVE</span>
        <span class="live-score">BAR3 <b>${s.us}</b> — <b>${s.them}</b>${s.inning ? ' · ' + s.inning : ''}</span>
        <a href="results.html" class="live-link">→</a>`;
      wrap.style.display = 'block';
      wrap.appendChild(banner);
    }
  }

  load();
}

document.addEventListener('DOMContentLoaded', initLiveScore);

// Instagram feed rendered by Behold.so widget (see index.html)

// ── PLAYER PROFILE MODAL ──────────────────────────────────────
// ── Modal helpers ─────────────────────────────────────────────
function pmSummary(cells) {
  const HL = ['AVG','OBP','SLG','OPS','ERA','FPct','WHIP'];
  return `<div class="pm-summary">${cells.map(([k,v]) =>
    `<div class="pm-summary-cell">
      <span class="pm-summary-k">${k}</span>
      <span class="pm-summary-v${HL.includes(k) ? ' hl' : ''}">${v ?? '—'}</span>
    </div>`
  ).join('')}</div>`;
}

function pmTable(headers, rows, hlCols = [], minWidth = 560) {
  const head = headers.map(h => `<th>${h}</th>`).join('');
  const body = rows.map(row =>
    `<tr>${row.map((c, i) => `<td class="${hlCols.includes(i) ? 'hl' : ''}">${c ?? '—'}</td>`).join('')}</tr>`
  ).join('');
  return `<div class="pm-table-wrap"><table class="pm-table" style="min-width:${minWidth}px">
    <thead><tr>${head}</tr></thead><tbody>${body}</tbody>
  </table></div>`;
}

function pmBattingPane(ext, basicStats) {
  if (ext?.batting) {
    let html = '';
    const s = ext.batting.season;
    if (s) {
      html += pmSummary([['AVG',s.AVG],['HR',s.HR],['RBI',s.RBI],['OBP',s.OBP],['SLG',s.SLG],['OPS',s.OPS]]);
      const sh = ['','G','PA','AB','R','H','2B','3B','HR','RBI','BB','SO','SB','AVG','OBP','SLG','OPS'];
      const sr = ['2026',s.G,s.PA,s.AB,s.R,s.H,s['2B'],s['3B'],s.HR,s.RBI,s.BB,s.SO,s.SB,s.AVG,s.OBP,s.SLG,s.OPS];
      html += pmTable(sh, [sr], [13,14,15,16], 700);
    }
    if (ext.batting.log?.length) {
      const lh = ['Fecha','Rival','#','Pos','AB','R','H','2B','HR','RBI','BB','SO','SB','AVG'];
      const lr = ext.batting.log.map(g => [g.date,g.opp,g.spot,g.pos,g.AB,g.R,g.H,g['2B'],g.HR,g.RBI,g.BB,g.SO,g.SB,g.AVG]);
      html += `<div class="pm-log-label">${_t('modal_game_log')}</div>${pmTable(lh, lr, [13], 580)}`;
    }
    return html || `<p class="pm-no-data">${_t('modal_no_bat_data')}</p>`;
  }
  const batStats = basicStats.filter(s => ['AVG','HR','RBI','OBP','SLG','OPS','SB'].includes(s.k));
  if (!batStats.length) return `<p class="pm-no-data">${_t('modal_no_bat_data')}</p>`;
  return pmSummary(batStats.map(s => [s.k, s.v])) + `<p class="pm-no-data">${_t('modal_no_log')}</p>`;
}

function pmPitchingPane(ext, basicStats) {
  if (ext?.pitching) {
    let html = '';
    const s = ext.pitching.season;
    if (s) {
      html += pmSummary([['ERA',s.ERA],['W-L',s.WL],['IP',s.IP],['SO',s.SO],['WHIP',s.WHIP],['OppAVG',s.OppAVG]]);
      const sh = ['','G','GS','IP','H','R','ER','BB','SO','HR','HBP','WP','BF','OppAVG','WHIP','ERA'];
      const sr = ['2026',s.G,s.GS,s.IP,s.H,s.R,s.ER,s.BB,s.SO,s.HR,s.HBP,s.WP,s.BF,s.OppAVG,s.WHIP,s.ERA];
      html += pmTable(sh, [sr], [13,14,15], 620);
    }
    if (ext.pitching.log?.length) {
      const lh = ['Fecha','Rival','IP','H','R','ER','BB','SO','HBP','WP','BF','ERA'];
      const lr = ext.pitching.log.map(g => [g.date,g.opp,g.IP,g.H,g.R,g.ER,g.BB,g.SO,g.HBP,g.WP,g.BF,g.ERA]);
      html += `<div class="pm-log-label">${_t('modal_game_log')}</div>${pmTable(lh, lr, [11], 500)}`;
    }
    return html || `<p class="pm-no-data">${_t('modal_no_pit_data')}</p>`;
  }
  const pitStats = basicStats.filter(s => ['ERA','K','W-L','WHIP'].includes(s.k));
  if (!pitStats.length) return `<p class="pm-no-data">${_t('modal_no_pit_data')}</p>`;
  return pmSummary(pitStats.map(s => [s.k, s.v])) + `<p class="pm-no-data">${_t('modal_no_log')}</p>`;
}

function pmFieldingPane(ext) {
  if (!ext?.fielding) return `<p class="pm-no-data">${_t('modal_no_fld_data')}</p>`;
  let html = '';
  const s = ext.fielding.season;
  if (s) {
    const extraCols = s.PB != null ? [['PB',s.PB]] : [];
    const sbCols = s.SBAtt != null ? [['SBAtt',s.SBAtt]] : [];
    html += pmSummary([['G',s.G],['IP',s.IP],['PO',s.PO],['A',s.A],['E',s.E],['FPct',s.FPct],...extraCols,...sbCols]);
    const baseHeaders = ['','G','IP','PO','A','E','DP','RF','FPct'];
    const baseRow = ['2026',s.G,s.IP,s.PO,s.A,s.E,s.DP,s.RF,s.FPct];
    if (s.PB != null) { baseHeaders.push('PB'); baseRow.push(s.PB); }
    if (s.SBAtt != null) { baseHeaders.push('SBAtt'); baseRow.push(s.SBAtt); }
    html += pmTable(baseHeaders, [baseRow], [baseHeaders.length - 1], 440);
  }
  if (ext.fielding.log?.length) {
    const hasPB = ext.fielding.log.some(g => g.PB != null);
    const lh = ['Fecha','Rival','Pos','IP','PO','A','E','FPct', ...(hasPB ? ['PB','SBAtt'] : [])];
    const lr = ext.fielding.log.map(g => [g.date,g.opp,g.pos,g.IP,g.PO,g.A,g.E,g.FPct, ...(hasPB ? [g.PB,g.SBAtt] : [])]);
    html += `<div class="pm-log-label">${_t('modal_game_log')}</div>${pmTable(lh, lr, [7], 400)}`;
  }
  return html || `<p class="pm-no-data">${_t('modal_no_fld_data')}</p>`;
}

function openPlayerModal(player) {
  const modal   = document.getElementById('playerModal');
  const photoEl = document.getElementById('pmPhoto');
  const badgeEl = document.getElementById('pmBadge');
  const nameEl  = document.getElementById('pmName');
  const posEl   = document.getElementById('pmPos');
  const tabsEl  = document.getElementById('pmTabs');
  const contentEl = document.getElementById('pmTabContent');
  const extraEl = document.getElementById('pmExtra');
  const linksEl = document.getElementById('pmLinks');
  if (!modal) return;

  // Photo
  photoEl.innerHTML = '';
  if (player.img) {
    const img = document.createElement('img');
    img.src = player.img;
    img.alt = `${player.first} ${player.last}`;
    img.onerror = () => { photoEl.textContent = `${player.first[0]}${player.last[0]}`.toUpperCase(); };
    photoEl.appendChild(img);
  } else {
    photoEl.textContent = `${player.first[0]}${player.last[0]}`.toUpperCase();
  }

  // Identity
  const ext = PLAYER_EXTENDED_DATA[player.num] || null;
  const typeMap = { batter: 'modal_batter_type', pitcher: 'modal_pitcher_type', both: 'modal_two_way_type' };
  const typeLabel = _t(typeMap[player.type] || 'modal_batter_type');
  badgeEl.textContent = `#${player.num} · ${typeLabel}${ext?.age ? ' · ' + ext.age : ''}`;
  nameEl.textContent  = ext?.fullName || `${player.first} ${player.last}`;
  const meta = [player.pos, player.flag + ' ' + player.country];
  if (ext?.bats)   meta.push(`${_t('modal_bats')} ${ext.bats}`);
  if (ext?.throws) meta.push(`${_t('modal_throws')} ${ext.throws}`);
  posEl.textContent = meta.join(' · ');

  // Build tabs
  const tabs = [];
  if (player.type !== 'pitcher') tabs.push({ id:'batting',  label: _t('modal_tab_batting')  });
  if (player.type !== 'batter')  tabs.push({ id:'pitching', label: _t('modal_tab_pitching') });
  if (ext?.fielding)             tabs.push({ id:'fielding', label: _t('modal_tab_fielding') });

  tabsEl.innerHTML = tabs.map((t, i) =>
    `<button class="pm-tab-btn${i === 0 ? ' active' : ''}" data-tab="${t.id}">${t.label}</button>`
  ).join('');

  contentEl.innerHTML = tabs.map((t, i) => {
    let pane = '';
    if (t.id === 'batting')  pane = pmBattingPane(ext, player.stats);
    if (t.id === 'pitching') pane = pmPitchingPane(ext, player.stats);
    if (t.id === 'fielding') pane = pmFieldingPane(ext);
    return `<div class="pm-pane${i === 0 ? ' active' : ''}" data-pane="${t.id}">${pane}</div>`;
  }).join('');

  tabsEl.querySelectorAll('.pm-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      tabsEl.querySelectorAll('.pm-tab-btn').forEach(b => b.classList.remove('active'));
      contentEl.querySelectorAll('.pm-pane').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      contentEl.querySelector(`[data-pane="${btn.dataset.tab}"]`)?.classList.add('active');
    });
  });

  // Chips
  const chips = [];
  if (player.captain)    chips.push('★ Captain');
  if (player.streak > 0) chips.push(`${player.streak} ${_t('modal_streak_chip')}`);
  extraEl.innerHTML = chips.map(c => `<span class="pm-chip">${c}</span>`).join('');
  extraEl.style.display = chips.length ? '' : 'none';

  // EasyScore link
  linksEl.innerHTML = player.easyscoreId
    ? `<a class="pm-easyscore-link" href="https://www.easyscore.com/players/${player.easyscoreId}" target="_blank" rel="noopener">${_t('modal_easyscore')}</a>`
    : '';

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closePlayerModal() {
  const modal = document.getElementById('playerModal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('pmClose')?.addEventListener('click', closePlayerModal);
  document.getElementById('pmOverlay')?.addEventListener('click', closePlayerModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closePlayerModal(); });
});