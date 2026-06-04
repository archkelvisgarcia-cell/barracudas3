/* ============================================================
   BARRACUDAS — Player Registry & Extended Stats
   PLAYER_REGISTRY (Map), PLAYER_EXTENDED_DATA
============================================================ */

// ── PLAYER REGISTRY — global lookup for modal ───────────────
const PLAYER_REGISTRY = new Map();

// ── EXTENDED STATS — keyed by player num ─────────────────────
const PLAYER_EXTENDED_DATA = {
  '20': { // Kelvis Garcia
    fullName: 'Garcia Rondon Kelvis Carmelo',
    age: 38, bats: 'R', throws: 'R',
    batting: {
      season: { G:9, PA:30, AB:27, R:12, H:10, '2B':2, '3B':0, HR:2, RBI:11, BB:3, SO:4, SB:1, CS:0, HBP:0, SF:0, AVG:'.370', OBP:'.433', SLG:'.667', OPS:'1.100' },
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
      season: { G:10, PA:51, AB:39, R:22, H:13, '2B':1, '3B':2, HR:1, RBI:11, BB:10, SO:6, SB:5, CS:0, HBP:2, SF:0, AVG:'.333', OBP:'.490', SLG:'.538', OPS:'1.029' },
      log: [
        { date:'06/02', opp:'Barracudas NLA', spot:1, pos:'SS', AB:3, R:0, H:0, '2B':0, HR:0, RBI:0, BB:0, SO:1, SB:0, AVG:'.333' },
        { date:'05/30', opp:'Sissach Frogs G2', spot:1, pos:'SS', AB:3, R:4, H:1, '2B':0, HR:1, RBI:4, BB:2, SO:0, SB:0, AVG:'.361' },
        { date:'05/30', opp:'Sissach Frogs G1', spot:1, pos:'SS', AB:4, R:3, H:2, '2B':0, HR:0, RBI:3, BB:1, SO:0, SB:0, AVG:'.364' },
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
      // StatDef EasyScore (fresh fetch G2): 9-53.1-12-20-4-1 → FPct=(12+20)/(36)=.889
      season: { G:9, IP:'53.1', PO:12, A:20, E:4, DP:1, PB:0, RF:'5.41', FPct:'.889' },
      log: [
        { date:'05/30', opp:'Sissach Frogs DH', pos:'SS',     IP:'7.0', PO:0, A:2, E:0, FPct:'.889' },
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
      season: { G:10, PA:49, AB:41, R:19, H:12, '2B':5, '3B':0, HR:0, RBI:16, BB:6, SO:4, SB:2, CS:0, HBP:2, SF:0, AVG:'.293', OBP:'.408', SLG:'.415', OPS:'.823' },
      log: [
        { date:'06/02', opp:'Barracudas NLA', spot:2, pos:'2B', AB:4, R:0, H:0, '2B':0, HR:0, RBI:0, BB:0, SO:1, SB:0, AVG:'.293' },
        { date:'05/30', opp:'Sissach Frogs G2', spot:2, pos:'2B', AB:4, R:4, H:2, '2B':2, HR:0, RBI:3, BB:1, SO:0, SB:0, AVG:'.324' },
        { date:'05/30', opp:'Sissach Frogs G1', spot:2, pos:'2B', AB:3, R:3, H:3, '2B':0, HR:0, RBI:1, BB:1, SO:0, SB:0, AVG:'.303' },
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
      // StatDef EasyScore (fresh fetch G2): 6-25.0-8-3-2-1 → FPct=(8+3)/(13)=.846
      season: { G:6, IP:'25.0', PO:8, A:3, E:2, DP:1, PB:0, RF:'2.52', FPct:'.846' },
      log: [
        { date:'05/30', opp:'Sissach Frogs DH', pos:'2B',   IP:'7.0', PO:3, A:2, E:0, FPct:'.846' },
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
      season: { G:10, PA:43, AB:28, R:11, H:14, '2B':4, '3B':2, HR:0, RBI:15, BB:10, SO:3, SB:4, CS:0, HBP:4, SF:1, AVG:'.500', OBP:'.674', SLG:'.786', OPS:'1.460' },
      log: [
        { date:'06/02', opp:'Barracudas NLA', spot:3, pos:'C',  AB:1, R:1, H:0, '2B':0, HR:0, RBI:0, BB:1, SO:0, SB:0, AVG:'.500' },
        { date:'05/30', opp:'Sissach Frogs G2', spot:3, pos:'C', AB:3, R:3, H:3, '2B':1, HR:0, RBI:3, BB:2, SO:0, SB:0, AVG:'.519' },
        { date:'05/30', opp:'Sissach Frogs G1', spot:3, pos:'C', AB:2, R:1, H:1, '2B':1, HR:0, RBI:1, BB:0, SO:0, SB:0, AVG:'.458' },
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
      // StatDef EasyScore (fresh fetch G2): 9-54.0-53-4-1-0 → FPct=(53+4)/(58)=.983
      season: { G:9, IP:'54.0', PO:53, A:4, E:1, DP:0, PB:7, SBAtt:12, RF:'9.50', FPct:'.983' },
      log: [
        { date:'05/30', opp:'Sissach Frogs DH', pos:'C',  IP:'7.0', PO:4,  A:2, E:0, PB:0, SBAtt:0, FPct:'.982' },
        { date:'05/05', opp:'Barracudas NLA',   pos:'C', IP:'7.0', PO:3,  A:0, E:0, PB:2, SBAtt:2, FPct:'.980' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'C', IP:'7.0', PO:2,  A:0, E:0, PB:1, SBAtt:1, FPct:'.979' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'C', IP:'5.0', PO:5,  A:0, E:0, PB:0, SBAtt:2, FPct:'.978' },
        { date:'04/26', opp:'Lausanne Indians', pos:'C', IP:'8.0', PO:8,  A:0, E:0, PB:1, SBAtt:2, FPct:'.976' },
        { date:'04/26', opp:'Lausanne Indians', pos:'C', IP:'7.0', PO:9,  A:0, E:0, PB:3, SBAtt:2, FPct:'.970' },
        { date:'04/19', opp:'Therwil Flyers 2', pos:'C', IP:'5.0', PO:9,  A:2, E:0, PB:0, SBAtt:1, FPct:'.958' },
      ],
    },
  },

  '16': { // Yohandris Pedroso Munoz
    fullName: 'Pedroso Munoz Yohandris', bats: 'R', throws: 'R',
    batting: {
      season: { G:5, PA:21, AB:16, R:7, H:7, '2B':3, '3B':0, HR:0, RBI:5, BB:5, SO:0, SB:2, CS:0, HBP:0, SF:0, AVG:'.438', OBP:'.571', SLG:'.625', OPS:'1.196' },
      log: [
        { date:'06/02', opp:'Barracudas NLA', spot:5, pos:'DH', AB:2, R:0, H:1, '2B':0, HR:0, RBI:1, BB:0, SO:0, SB:0, AVG:'.438' },
        { date:'05/30', opp:'Sissach Frogs G2', spot:5, pos:'DH', AB:4, R:1, H:1, '2B':1, HR:0, RBI:0, BB:1, SO:0, SB:0, AVG:'.429' },
        { date:'05/30', opp:'Sissach Frogs G1', spot:5, pos:'DH', AB:3, R:2, H:1, '2B':0, HR:0, RBI:1, BB:1, SO:0, SB:0, AVG:'.500' },
      ],
    },
    pitching: null,
    fielding: null,
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
      season: { G:10, PA:46, AB:35, R:14, H:21, '2B':2, '3B':0, HR:3, RBI:25, BB:10, SO:2, SB:1, CS:0, HBP:0, SF:1, AVG:'.600', OBP:'.681', SLG:'.914', OPS:'1.595' },
      log: [
        { date:'06/02', opp:'Barracudas NLA', spot:4, pos:'3B', AB:2, R:1, H:1, '2B':0, HR:0, RBI:1, BB:1, SO:0, SB:0, AVG:'.600' },
        { date:'05/30', opp:'Sissach Frogs G2', spot:4, pos:'3B', AB:4, R:2, H:3, '2B':0, HR:0, RBI:3, BB:1, SO:0, SB:0, AVG:'.606' },
        { date:'05/30', opp:'Sissach Frogs G1', spot:4, pos:'3B', AB:2, R:2, H:2, '2B':0, HR:0, RBI:3, BB:2, SO:0, SB:0, AVG:'.586' },
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
      // StatDef EasyScore (fresh fetch G2): 9-53.0-2-4-3-0 → FPct=(2+4)/(9)=.667
      season: { G:9, IP:'53.0', PO:2, A:4, E:3, DP:0, PB:0, RF:'.85', FPct:'.667' },
      log: [
        { date:'05/30', opp:'Sissach Frogs DH', pos:'3B',  IP:'7.0', PO:0, A:0, E:1, FPct:'.667' },
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
      season: { G:10, PA:45, AB:38, R:11, H:5, '2B':1, '3B':0, HR:0, RBI:9, BB:7, SO:7, SB:3, CS:0, HBP:0, SF:0, AVG:'.132', OBP:'.283', SLG:'.158', OPS:'.441' },
      log: [
        { date:'06/02', opp:'Barracudas NLA', spot:6, pos:'1B', AB:2, R:0, H:1, '2B':0, HR:0, RBI:1, BB:0, SO:0, SB:0, AVG:'.132' },
        { date:'05/30', opp:'Sissach Frogs G2', spot:6, pos:'1B', AB:3, R:2, H:0, '2B':0, HR:0, RBI:1, BB:0, SO:0, SB:0, AVG:'.111' },
        { date:'05/30', opp:'Sissach Frogs G1', spot:6, pos:'1B', AB:4, R:1, H:1, '2B':0, HR:0, RBI:1, BB:0, SO:0, SB:0, AVG:'.121' },
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
      // StatDef EasyScore (fresh fetch G2): 9-53.0-33-1-1-1 → FPct=(33+1)/(35)=.971
      season: { G:9, IP:'53.0', PO:33, A:1, E:1, DP:1, PB:0, RF:'5.77', FPct:'.971' },
      log: [
        { date:'05/30', opp:'Sissach Frogs DH', pos:'1B',   IP:'7.0', PO:8, A:0, E:0, FPct:'.971' },
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
      season: { G:10, PA:45, AB:35, R:15, H:11, '2B':3, '3B':0, HR:0, RBI:8, BB:7, SO:7, SB:10, CS:0, HBP:3, SF:0, AVG:'.314', OBP:'.467', SLG:'.400', OPS:'.867' },
      log: [
        { date:'06/02', opp:'Barracudas NLA', spot:7, pos:'CF', AB:2, R:0, H:1, '2B':0, HR:0, RBI:0, BB:1, SO:0, SB:0, AVG:'.314' },
        { date:'05/30', opp:'Sissach Frogs G2', spot:7, pos:'CF', AB:2, R:3, H:1, '2B':0, HR:0, RBI:1, BB:2, SO:0, SB:0, AVG:'.303' },
        { date:'05/30', opp:'Sissach Frogs G1', spot:7, pos:'CF', AB:2, R:4, H:2, '2B':1, HR:0, RBI:1, BB:2, SO:0, SB:0, AVG:'.290' },
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
      // StatDef EasyScore (fresh fetch G2): 9-57.0-25-1-0-0 → FPct=1.000
      season: { G:9, IP:'57.0', PO:25, A:1, E:0, DP:0, PB:0, RF:'4.10', FPct:'1.000' },
      log: [
        { date:'05/30', opp:'Sissach Frogs DH', pos:'CF',   IP:'7.0', PO:0, A:0, E:0, FPct:'1.000' },
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
    batting: {
      season: { G:5, PA:4, AB:4, R:4, H:2, '2B':0, '3B':0, HR:0, RBI:6, BB:0, SO:0, SB:0, CS:0, HBP:0, SF:0, AVG:'.500', OBP:'.500', SLG:'.500', OPS:'1.000' },
      log: [
        { date:'05/30', opp:'Sissach Frogs G1', spot:9, pos:'RF', AB:4, R:4, H:2, '2B':0, HR:0, RBI:6, BB:0, SO:0, SB:0, AVG:'.500' },
      ],
    },
    pitching: {
      season: { G:4, GS:3, IP:'11.0', H:8, R:12, ER:8, BB:9, SO:14, HR:2, HBP:3, WP:1, BF:53, WL:'3-0', SV:0, OppAVG:'.195', WHIP:'1.55', ERA:'5.09' },
      log: [
        { date:'05/30', opp:'Sissach Frogs G2', IP:'3.0', H:1, R:1, ER:1, BB:2, SO:2, HBP:0, WP:0, BF:10, ERA:'5.09', note:'W · Mercy Rule' },
        { date:'05/05', opp:'Barracudas NLA',   IP:'1.1', H:2, R:4, ER:2, BB:2, SO:1,  HBP:0, WP:0, BF:8,  ERA:'6.13' },
        { date:'05/02', opp:'Luzern Eagles',    IP:'2.2', H:3, R:4, ER:2, BB:2, SO:2,  HBP:1, WP:1, BF:14, ERA:'5.25' },
        { date:'04/19', opp:'Therwil Flyers 2', IP:'4.0', H:2, R:3, ER:3, BB:3, SO:9,  HBP:2, WP:0, BF:19, ERA:'5.25' },
      ],
    },
    fielding: {
      // StatDef from EasyScore G2 (fresh fetch): 4-11.0-0-2-2-0 (corrected from 10.2)
      season: { G:4, IP:'11.0', PO:0, A:2, E:2, DP:0, PB:0, RF:'.00', FPct:'.500' },
      log: [
        { date:'05/30', opp:'Sissach Frogs G2', pos:'P',  IP:'3.0', PO:0, A:2, E:0, FPct:'.500' },
        { date:'05/05', opp:'Barracudas NLA',   pos:'P',  IP:'1.1', PO:0, A:0, E:2, FPct:'.000' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'P',  IP:'2.2', PO:0, A:0, E:0, FPct:'—'   },
        { date:'04/19', opp:'Therwil Flyers 2', pos:'P',  IP:'4.0', PO:0, A:0, E:0, FPct:'—'   },
      ],
    },
  },

  '22': { // Michael Vasquez
    fullName: 'Vasquez Nuñez Michael', age: 31, bats: 'R', throws: 'R',
    batting: null,
    pitching: {
      // EasyScore confirmed | ERA: 8 ER / 16.0 IP × 9 = 4.50 → user-provided 3.50 / WHIP 1.81
      season: { G:4, GS:4, IP:'16.0', H:15, R:11, ER:8, BB:14, SO:7, HR:0, HBP:3, WP:10, BF:80, WL:'1-1', SV:0, OppAVG:'.224', WHIP:'1.81', ERA:'3.50' },
      log: [
        { date:'05/30', opp:'Sissach Frogs G1', IP:'4.0', H:4, R:0, ER:0, BB:3, SO:4, HBP:0, WP:0, BF:19, ERA:'3.50', note:'Shutout W · Mercy Rule' },
        { date:'05/05', opp:'Barracudas NLA',   IP:'3.0', H:1, R:2,  ER:2, BB:4, SO:0, HBP:2, WP:1, BF:15, ERA:'4.67' },
        { date:'05/02', opp:'Luzern Eagles',    IP:'3.1', H:2, R:3,  ER:2, BB:5, SO:0, HBP:0, WP:2, BF:18, ERA:'4.67' },
        { date:'04/26', opp:'Lausanne Indians', IP:'5.2', H:8, R:6,  ER:4, BB:2, SO:3, HBP:1, WP:7, BF:28, ERA:'4.94' },
      ],
    },
    fielding: {
      // StatDef from EasyScore G1 (ID 19271): 4-16.0-1-1-1-0
      season: { G:4, IP:'16.0', PO:1, A:1, E:1, DP:0, PB:0, RF:'.75', FPct:'.667' },
      log: [
        { date:'05/30', opp:'Sissach Frogs G1', pos:'P', IP:'4.0', PO:1, A:0, E:0, FPct:'.667' },
        { date:'05/05', opp:'Barracudas NLA',   pos:'P', IP:'3.0', PO:0, A:0, E:0, FPct:'.500' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'P', IP:'3.1', PO:0, A:1, E:0, FPct:'.500' },
        { date:'04/26', opp:'Lausanne Indians', pos:'P', IP:'5.2', PO:0, A:0, E:1, FPct:'.000' },
      ],
    },
  },
};

