(function () {
  'use strict';

  const T = {
    en: {
      nav_home: 'Home', nav_schedule: 'Schedule', nav_results: 'Results',
      nav_news: 'News', nav_roster: 'Roster', nav_join: 'Join the Club →',

      hero_live: 'Live · Season 2026',
      hero_tagline: "Zurich's premier baseball club. Defending NL Baseball Gruppe A champions, 40 years of grinding through Swiss summers, dirt under the nails, ball in the glove.",
      btn_next_game: 'Next Game →', btn_meet_squad: 'Meet the Squad',

      strip_record: 'Record 2026', strip_league: 'League',
      strip_home: 'Home', strip_next: 'Next',

      next_eyebrow: '— Next Up',
      next_h1: 'First', next_h2: 'Pitch.',
      next_body: 'Tuesday matchup against the NLA Barracudas — the big dogs of Swiss baseball. A chance to test ourselves against the best in the country. Bite harder.',
      btn_full_schedule: 'Full Schedule →',

      results_h1: 'Recent', results_h2: 'Results.',
      btn_all_boxscores: 'All Boxscores →',

      roster_eyebrow: '— Active Roster',
      roster_h1: 'The', roster_h2: 'Squad.',
      roster_sub: 'Hover over any card to flip it and see real 2026 season stats.',

      join_h1: 'Swing', join_h2: 'For The Fence.',
      join_eyebrow: '— Open Tryouts',
      join_body: 'New players welcome at every level. Tryouts run March through April. Bring a glove, leave with a uniform. We train Tuesdays & Fridays at Heerenschürli.',
      btn_contact: 'Get In Touch →',

      footer_h_club: 'Club', footer_h_visit: 'Visit', footer_h_connect: 'Connect',
      footer_schedule: 'Schedule', footer_news: 'News',
      footer_roster: 'Roster', footer_join: 'Join Us', footer_directions: 'Directions',
      footer_desc: 'Zürich Barracudas Baseball Club. Founded 1986. Home of the 2024 NL Baseball Gruppe A Champions.',
      footer_copy: '© 2026 Zürich Barracudas Baseball Club',
      footer_tagline: 'Bite Harder · Est. 1986',

      sched_eyebrow: '— Season 2026',
      sched_lede: '24 regular season games, plus playoffs. Home games at Heerenschürli, Zürich. Tap any game for details, results, and lineups.',
      sched_next_tag: 'Next Game',
      cd_days: 'Days', cd_hrs: 'Hrs', cd_min: 'Min', cd_sec: 'Sec',
      filter_upcoming: 'UPCOMING', filter_past: 'PAST GAMES', filter_all: 'ALL',
      filter_home: 'HOME', filter_away: 'AWAY',

      news_eyebrow: '— Dispatches from the dugout',
      news_lede: 'Game recaps, roster updates, club stories. Filed straight from Heerenschürli.',

      res_eyebrow: '— Box scores · Season 2026',
      res_lede: 'Every game, every inning, every MVP. Barracudas 3 — official boxscores, recap notes, and player highlights pulled straight from EasyScore.',
      res_potg: '— Player of the Game',
      res_pitching: '— Pitching',
      btn_recap: 'Recap →',
      btn_full_boxscore: 'Full Boxscore ↗',
      btn_standings: 'League Standings ↗',
      btn_easyscore: 'Full Stats on EasyScore ↗',
    },

    es: {
      nav_home: 'Inicio', nav_schedule: 'Calendario', nav_results: 'Resultados',
      nav_news: 'Noticias', nav_roster: 'Plantilla', nav_join: 'Únete al Club →',

      hero_live: 'En Vivo · Temporada 2026',
      hero_tagline: 'El club de béisbol más destacado de Zúrich. Campeones defensores de Gruppe A, 40 años de lucha bajo el sol suizo, tierra en las manos, pelota en el guante.',
      btn_next_game: 'Próximo Partido →', btn_meet_squad: 'Conoce al Equipo',

      strip_record: 'Récord 2026', strip_league: 'Liga',
      strip_home: 'Local', strip_next: 'Próximo',

      next_eyebrow: '— Próximo Partido',
      next_h1: 'Primer', next_h2: 'Turno.',
      next_body: 'Partido del martes contra los Barracudas NLA — los grandes del béisbol suizo. Una oportunidad de medirnos contra los mejores del país. ¡Morder más fuerte!',
      btn_full_schedule: 'Ver Calendario →',

      results_h1: 'Recientes', results_h2: 'Resultados.',
      btn_all_boxscores: 'Todos los Boxscores →',

      roster_eyebrow: '— Plantilla Activa',
      roster_h1: 'El', roster_h2: 'Equipo.',
      roster_sub: 'Pasa el cursor sobre cualquier card para voltearla y ver los números reales de la temporada 2026.',

      join_h1: 'Juega', join_h2: 'Hasta el Fondo.',
      join_eyebrow: '— Pruebas Abiertas',
      join_body: 'Jugadores nuevos bienvenidos a todos los niveles. Las pruebas van de marzo a abril. Trae un guante, sal con un uniforme. Entrenamos martes y viernes en Heerenschürli.',
      btn_contact: 'Contáctanos →',

      footer_h_club: 'Club', footer_h_visit: 'Visitar', footer_h_connect: 'Redes',
      footer_schedule: 'Calendario', footer_news: 'Noticias',
      footer_roster: 'Plantilla', footer_join: 'Únete', footer_directions: 'Cómo llegar',
      footer_desc: 'Club de Béisbol Zürich Barracudas. Fundado en 1986. Campeones de NL Baseball Gruppe A 2024.',
      footer_copy: '© 2026 Club de Béisbol Zürich Barracudas',
      footer_tagline: 'Morder Más Fuerte · Est. 1986',

      sched_eyebrow: '— Temporada 2026',
      sched_lede: '24 partidos de temporada regular, más playoffs. Partidos en casa en Heerenschürli, Zúrich. Toca cualquier partido para ver detalles, resultados y alineaciones.',
      sched_next_tag: 'Próximo Juego',
      cd_days: 'Días', cd_hrs: 'Hrs', cd_min: 'Min', cd_sec: 'Seg',
      filter_upcoming: 'PRÓXIMOS', filter_past: 'PASADOS', filter_all: 'TODOS',
      filter_home: 'LOCAL', filter_away: 'VISITANTE',

      news_eyebrow: '— Desde el dugout',
      news_lede: 'Resúmenes de partidos, actualizaciones de plantilla, historias del club. Directo desde Heerenschürli.',

      res_eyebrow: '— Boxscores · Temporada 2026',
      res_lede: 'Cada partido, cada entrada, cada MVP. Barracudas 3 — boxscores oficiales y notas de resumen directamente de EasyScore.',
      res_potg: '— Jugador del Partido',
      res_pitching: '— Pitcheo',
      btn_recap: 'Resumen →',
      btn_full_boxscore: 'Boxscore completo ↗',
      btn_standings: 'Tabla de Posiciones ↗',
      btn_easyscore: 'Estadísticas en EasyScore ↗',
    },

    de: {
      nav_home: 'Home', nav_schedule: 'Spielplan', nav_results: 'Ergebnisse',
      nav_news: 'Neuigkeiten', nav_roster: 'Kader', nav_join: 'Dem Klub beitreten →',

      hero_live: 'Live · Saison 2026',
      hero_tagline: 'Zürichs führender Baseballklub. Amtierender NL Baseball Gruppe-A-Meister, 40 Jahre harte Arbeit, Dreck unter den Nägeln, Ball in der Hand.',
      btn_next_game: 'Nächstes Spiel →', btn_meet_squad: 'Das Team',

      strip_record: 'Bilanz 2026', strip_league: 'Liga',
      strip_home: 'Heimfeld', strip_next: 'Nächstes',

      next_eyebrow: '— Nächstes Spiel',
      next_h1: 'Nächster', next_h2: 'Aufschlag.',
      next_body: 'Dienstagsspiel gegen die NLA Barracudas — die Spitze des Schweizer Baseballs. Eine Chance, uns mit den Besten im Land zu messen. Härter zubeißen!',
      btn_full_schedule: 'Zum Spielplan →',

      results_h1: 'Aktuelle', results_h2: 'Ergebnisse.',
      btn_all_boxscores: 'Alle Boxscores →',

      roster_eyebrow: '— Aktiver Kader',
      roster_h1: 'Das', roster_h2: 'Team.',
      roster_sub: 'Fahre über eine Karte, um sie umzudrehen und die echten Saison-2026-Statistiken zu sehen.',

      join_h1: 'Spiel', join_h2: 'Über den Zaun.',
      join_eyebrow: '— Offene Probespiele',
      join_body: 'Neue Spieler aller Niveaus willkommen. Probespiele März bis April. Bring einen Handschuh, geh mit einem Trikot. Wir trainieren dienstags und freitags in Heerenschürli.',
      btn_contact: 'Kontakt aufnehmen →',

      footer_h_club: 'Klub', footer_h_visit: 'Besuchen', footer_h_connect: 'Folgen',
      footer_schedule: 'Spielplan', footer_news: 'Neuigkeiten',
      footer_roster: 'Kader', footer_join: 'Mitmachen', footer_directions: 'Anfahrt',
      footer_desc: 'Zürich Barracudas Baseball Club. Gegründet 1986. Heimat der NL Baseball Gruppe A Meister 2024.',
      footer_copy: '© 2026 Zürich Barracudas Baseball Club',
      footer_tagline: 'Härter zubeißen · Gegr. 1986',

      sched_eyebrow: '— Saison 2026',
      sched_lede: '24 reguläre Saisonspiele plus Playoffs. Heimspiele in Heerenschürli, Zürich. Tippe auf ein Spiel für Details, Ergebnisse und Aufstellungen.',
      sched_next_tag: 'Nächstes Spiel',
      cd_days: 'Tage', cd_hrs: 'Std', cd_min: 'Min', cd_sec: 'Sek',
      filter_upcoming: 'BEVORSTEHEND', filter_past: 'VERGANGENE', filter_all: 'ALLE',
      filter_home: 'HEIM', filter_away: 'AUSWÄRTS',

      news_eyebrow: '— Aus dem Dugout',
      news_lede: 'Spielberichte, Kaderupdates, Klubgeschichten. Direkt aus Heerenschürli.',

      res_eyebrow: '— Boxscores · Saison 2026',
      res_lede: 'Jedes Spiel, jedes Inning, jeder MVP. Barracudas 3 — offizielle Boxscores und Spielberichte direkt aus EasyScore.',
      res_potg: '— Spieler des Spiels',
      res_pitching: '— Pitching',
      btn_recap: 'Bericht →',
      btn_full_boxscore: 'Vollständiger Boxscore ↗',
      btn_standings: 'Liga-Tabelle ↗',
      btn_easyscore: 'Alle Stats auf EasyScore ↗',
    },
  };

  function apply(lang) {
    const t = T[lang];
    if (!t) return;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (t[key] != null) el.textContent = t[key];
    });
    document.querySelectorAll('.lang-btn').forEach(btn =>
      btn.classList.toggle('active', btn.dataset.lang === lang)
    );
    localStorage.setItem('bar3-lang', lang);
    document.documentElement.lang = lang;
  }

  function init() {
    const saved = localStorage.getItem('bar3-lang') || 'en';
    apply(saved);
    document.querySelectorAll('.lang-btn').forEach(btn =>
      btn.addEventListener('click', () => apply(btn.dataset.lang))
    );
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();
})();
