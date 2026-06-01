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

      art_press_desk: '— Barracudas Press Desk',
      art_coming_soon_label: 'Coming Soon',
      art_coming_soon_body: 'Full recap coming soon. Check the boxscore for the full game stats.',
      art_btn_boxscore: 'See Full Boxscores →',
      art_btn_back: '← Back to News',
      art_final_score: 'Final Score',
      art_read_full: 'Read Full Article →',

      hero_champs: 'Gruppe A Champions 2024',
      card_tap_flip: 'Tap to flip',
      card_tap_back: 'Tap to flip back',
      card_flip_icon: '↺ flip',
      btn_view_profile: 'View Profile →',
      tag_pink_game: '🩷 Pink Game',
      tag_game_recap: 'Game Recap',
      tag_player_profile: 'Player Profile',
      tag_roster_move: 'Roster Move',
      tag_pitching_cat: 'Pitching',
      tag_club_cat: 'Club',
      tag_captains_corner: "Captain's Corner",
      stat_top_batter: 'Top Batter 2026',
      stat_top_pitcher: 'Top Pitcher 2026',
      stat_golden_glove: 'Golden Glove 2026',
      stat_hitting_streak: 'Hitting Streak',
      stat_streak_suffix: 'consecutive hits',
      res_no_games: 'No games played yet.',
      res_read_recap: 'READ RECAP →',
      sched_games_plural: 'games',
      sched_games_single: 'game',
      next_season_done: 'SEASON COMPLETE 🦈',
      season_done_msg: 'Season Complete · See You in 2027 🦈',
      modal_batter_type: 'Batter',
      modal_pitcher_type: 'Pitcher',
      modal_two_way_type: 'Two-Way',
      modal_bats: 'Bats:',
      modal_throws: 'Throws:',
      modal_tab_batting: 'Batting',
      modal_tab_pitching: 'Pitching',
      modal_tab_fielding: 'Fielding',
      modal_game_log: 'Game Log',
      modal_no_bat_data: 'No batting stats available.',
      modal_no_pit_data: 'No pitching stats available.',
      modal_no_fld_data: 'No fielding stats available.',
      modal_no_log: 'Game log not available.',
      modal_easyscore: 'View full stats on EasyScore ↗',
      modal_streak_chip: 'game hit streak',
      ig_h1: 'Follow', ig_h2: 'The Journey.',

      standings_eyebrow: '— Gruppe A 2026',
      standings_h1: 'League', standings_h2: 'Standings.',
      standings_team: 'Team', standings_gp: 'GP', standings_w: 'W', standings_l: 'L', standings_pct: 'PCT',
      standings_updated: 'Updated',
      award_section_eyebrow: '— Season Awards',
      award_section_h1: 'Award', award_section_h2: 'Candidates.',
      award_section_sub: 'Calculated automatically from 2026 season statistics.',
      award_badge: 'CANDIDATE · SEASON IN PROGRESS',
      award_gg_name: 'Golden Glove', award_gg_desc: 'Best Defender',
      award_ss_name: 'Silver Slugger', award_ss_desc: 'Best Hitter',
      award_cy_name: 'Cy Young Award', award_cy_desc: 'Best Pitcher',
      award_mvp_name: 'Most Valuable Player', award_mvp_desc: 'Season MVP',
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

      art_press_desk: '— Mesa de Prensa Barracudas',
      art_coming_soon_label: 'Próximamente',
      art_coming_soon_body: 'Resumen completo próximamente. Consulta el boxscore para las estadísticas del juego.',
      art_btn_boxscore: 'Ver boxscores →',
      art_btn_back: '← Volver a noticias',
      art_final_score: 'Marcador Final',
      art_read_full: 'Leer artículo completo →',

      hero_champs: 'Campeones Gruppe A 2024',
      card_tap_flip: 'Toca para voltear',
      card_tap_back: 'Toca para voltear',
      card_flip_icon: '↺ voltear',
      btn_view_profile: 'Ver Perfil →',
      tag_pink_game: '🩷 Pink Game',
      tag_game_recap: 'Resumen de Partido',
      tag_player_profile: 'Perfil de Jugador',
      tag_roster_move: 'Movimiento de Plantilla',
      tag_pitching_cat: 'Pitcheo',
      tag_club_cat: 'Club',
      tag_captains_corner: 'Rincón del Capitán',
      stat_top_batter: 'Mejor Bateador 2026',
      stat_top_pitcher: 'Mejor Pitcher 2026',
      stat_golden_glove: 'Guante de Oro 2026',
      stat_hitting_streak: 'Racha de Hits',
      stat_streak_suffix: 'hits consecutivos',
      res_no_games: 'Aún no hay partidos jugados.',
      res_read_recap: 'VER RESUMEN →',
      sched_games_plural: 'partidos',
      sched_games_single: 'partido',
      next_season_done: 'TEMPORADA COMPLETA 🦈',
      season_done_msg: 'Temporada Completa · Hasta 2027 🦈',
      modal_batter_type: 'Bateador',
      modal_pitcher_type: 'Pitcher',
      modal_two_way_type: 'Dos Vías',
      modal_bats: 'Batea:',
      modal_throws: 'Lanza:',
      modal_tab_batting: 'Bateo',
      modal_tab_pitching: 'Pitcheo',
      modal_tab_fielding: 'Fildeo',
      modal_game_log: 'Registro de Partidos',
      modal_no_bat_data: 'Sin estadísticas de bateo disponibles.',
      modal_no_pit_data: 'Sin estadísticas de pitcheo disponibles.',
      modal_no_fld_data: 'Sin estadísticas de fildeo disponibles.',
      modal_no_log: 'Registro de partidos no disponible.',
      modal_easyscore: 'Ver stats completos en EasyScore ↗',
      modal_streak_chip: 'juegos con hit',
      ig_h1: 'Síguenos', ig_h2: 'En Instagram.',

      standings_eyebrow: '— Gruppe A 2026',
      standings_h1: 'Posiciones', standings_h2: 'Liga.',
      standings_team: 'Equipo', standings_gp: 'PJ', standings_w: 'G', standings_l: 'P', standings_pct: 'PCT',
      standings_updated: 'Actualizado',
      award_section_eyebrow: '— Premios de Temporada',
      award_section_h1: 'Premios', award_section_h2: 'Candidatos.',
      award_section_sub: 'Calculados automáticamente con las estadísticas reales de 2026.',
      award_badge: 'CANDIDATO · TEMPORADA EN CURSO',
      award_gg_name: 'Guante de Oro', award_gg_desc: 'Mejor Defensor',
      award_ss_name: 'Bateador de Plata', award_ss_desc: 'Mejor Bateador',
      award_cy_name: 'Premio Cy Young', award_cy_desc: 'Mejor Pitcher',
      award_mvp_name: 'Jugador Más Valioso', award_mvp_desc: 'MVP de Temporada',
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

      art_press_desk: '— Barracudas Pressestelle',
      art_coming_soon_label: 'Demnächst',
      art_coming_soon_body: 'Vollständiger Bericht kommt bald. Schau dir den Boxscore für die Spielstatistiken an.',
      art_btn_boxscore: 'Boxscores ansehen →',
      art_btn_back: '← Zurück zu Neuigkeiten',
      art_final_score: 'Endergebnis',
      art_read_full: 'Vollständigen Artikel lesen →',

      hero_champs: 'Gruppe-A-Meister 2024',
      card_tap_flip: 'Tippen zum Umdrehen',
      card_tap_back: 'Zurücktippen',
      card_flip_icon: '↺ drehen',
      btn_view_profile: 'Profil ansehen →',
      tag_pink_game: '🩷 Pink Game',
      tag_game_recap: 'Spielbericht',
      tag_player_profile: 'Spielerprofil',
      tag_roster_move: 'Kaderveränderung',
      tag_pitching_cat: 'Pitching',
      tag_club_cat: 'Klub',
      tag_captains_corner: 'Kapitäns-Ecke',
      stat_top_batter: 'Bester Schlagmann 2026',
      stat_top_pitcher: 'Bester Werfer 2026',
      stat_golden_glove: 'Goldener Handschuh 2026',
      stat_hitting_streak: 'Trefferserie',
      stat_streak_suffix: 'aufeinanderfolgende Treffer',
      res_no_games: 'Noch keine Spiele gespielt.',
      res_read_recap: 'BERICHT LESEN →',
      sched_games_plural: 'Spiele',
      sched_games_single: 'Spiel',
      next_season_done: 'SAISON ABGESCHLOSSEN 🦈',
      season_done_msg: 'Saison Abgeschlossen · Bis 2027 🦈',
      modal_batter_type: 'Schlagmann',
      modal_pitcher_type: 'Werfer',
      modal_two_way_type: 'Allrounder',
      modal_bats: 'Schlägt:',
      modal_throws: 'Wirft:',
      modal_tab_batting: 'Schlagen',
      modal_tab_pitching: 'Werfen',
      modal_tab_fielding: 'Feldspiel',
      modal_game_log: 'Spielprotokoll',
      modal_no_bat_data: 'Keine Schlagdaten verfügbar.',
      modal_no_pit_data: 'Keine Wurfdaten verfügbar.',
      modal_no_fld_data: 'Keine Feldspieldaten verfügbar.',
      modal_no_log: 'Spielprotokoll nicht verfügbar.',
      modal_easyscore: 'Vollständige Stats auf EasyScore ↗',
      modal_streak_chip: 'Spiele mit Treffer in Folge',
      ig_h1: 'Folge', ig_h2: 'Uns.',

      standings_eyebrow: '— Gruppe A 2026',
      standings_h1: 'Liga', standings_h2: 'Tabelle.',
      standings_team: 'Team', standings_gp: 'SP', standings_w: 'S', standings_l: 'N', standings_pct: 'PCT',
      standings_updated: 'Aktualisiert',
      award_section_eyebrow: '— Saisonauszeichnungen',
      award_section_h1: 'Auszeichnungs', award_section_h2: 'Kandidaten.',
      award_section_sub: 'Automatisch aus den Saison-2026-Statistiken berechnet.',
      award_badge: 'KANDIDAT · SAISON LÄUFT',
      award_gg_name: 'Golden Glove', award_gg_desc: 'Bester Feldspieler',
      award_ss_name: 'Silver Slugger', award_ss_desc: 'Bester Schlagmann',
      award_cy_name: 'Cy Young Preis', award_cy_desc: 'Bester Werfer',
      award_mvp_name: 'Wertvollster Spieler', award_mvp_desc: 'Saison-MVP',
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
    (window._langCallbacks || []).forEach(fn => { try { fn(lang); } catch (e) {} });
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

  // Expose globally for any page to read lang + translations + register callbacks
  window._barLang = {
    get: () => localStorage.getItem('bar3-lang') || 'en',
    T,
    t: (key) => {
      const lang = localStorage.getItem('bar3-lang') || 'en';
      return (T[lang] && T[lang][key]) || (T.en && T.en[key]) || key;
    },
    onLang: (fn) => {
      window._langCallbacks = window._langCallbacks || [];
      window._langCallbacks.push(fn);
    },
  };
})();
