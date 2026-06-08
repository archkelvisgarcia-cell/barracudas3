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
      season: { G:10, PA:40, AB:34, R:16, H:14, '2B':2, '3B':0, HR:2, RBI:13, BB:4, SO:4, SB:2, CS:0, HBP:1, SF:1, AVG:'.412', OBP:'.475', SLG:'.647', OPS:'1.122' },
      log: [
        { date:'06/07', opp:'Challengers 2 G2', spot:10, pos:'P/2B',  AB:0, R:0, H:0, '2B':0, HR:0, RBI:0, BB:0, SO:0, SB:0, HBP:1, AVG:'.412' },
        { date:'06/07', opp:'Challengers 2 G1', spot:6,  pos:'RF',    AB:5, R:3, H:3, '2B':0, HR:0, RBI:2, BB:1, SO:0, SB:1, SF:1, AVG:'.412' },
        { date:'05/05', opp:'Barracudas NLA',  spot:5, pos:'2B',       AB:3, R:0, H:1, '2B':0, HR:0, RBI:1, BB:1, SO:2, SB:0, AVG:'.370' },
        { date:'05/02', opp:'Luzern Eagles',   spot:5, pos:'2B',       AB:4, R:2, H:1, '2B':0, HR:0, RBI:0, BB:0, SO:1, SB:0, AVG:'.375' },
        { date:'05/02', opp:'Luzern Eagles',   spot:5, pos:'2B/3B',    AB:5, R:3, H:3, '2B':2, HR:1, RBI:3, BB:0, SO:0, SB:0, AVG:'.400' },
        { date:'04/26', opp:'Lausanne Indians', spot:5, pos:'2B/RF',   AB:4, R:2, H:2, '2B':0, HR:1, RBI:1, BB:0, SO:0, SB:0, AVG:'.333' },
        { date:'04/26', opp:'Lausanne Indians', spot:5, pos:'SS/2B/P', AB:6, R:3, H:3, '2B':0, HR:0, RBI:6, BB:0, SO:0, SB:1, AVG:'.273' },
        { date:'04/19', opp:'Therwil Flyers 2', spot:5, pos:'PH/P',   AB:1, R:0, H:0, '2B':0, HR:0, RBI:0, BB:0, SO:0, SB:0, AVG:'.000' },
      ],
    },
    pitching: {
      season: { G:3, GS:0, IP:'4.0', H:4, R:2, ER:0, BB:3, SO:7, HR:0, HBP:1, WP:2, BF:20, WL:'0-0', SV:0, OppAVG:'.267', WHIP:'1.75', ERA:'0.00' },
      log: [
        { date:'06/07', opp:'Challengers 2 G2', IP:'0.2', H:2, R:2, ER:0, BB:2, SO:0, HBP:0, WP:1, BF:6,  ERA:'0.00' },
        { date:'04/26', opp:'Lausanne Indians',  IP:'2.1', H:2, R:0, ER:0, BB:0, SO:5, HBP:0, WP:1, BF:9,  ERA:'0.00' },
        { date:'04/19', opp:'Therwil Flyers 2', IP:'1.0', H:0, R:0, ER:0, BB:1, SO:2, HBP:1, WP:0, BF:5,  ERA:'0.00' },
      ],
    },
    fielding: {
      season: { G:9, IP:'56.0', PO:15, A:10, E:2, DP:0, PB:0, RF:'4.46', FPct:'.926' },
      log: [
        { date:'06/07', opp:'Challengers 2 G2', pos:'2B',      IP:'2.0', PO:1, A:1, E:0, FPct:'1.000' },
        { date:'06/07', opp:'Challengers 2 G1', pos:'RF',      IP:'8.0', PO:1, A:0, E:0, FPct:'1.000' },
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
      season: { G:12, PA:61, AB:46, R:27, H:17, '2B':2, '3B':2, HR:1, RBI:15, BB:13, SO:6, SB:6, CS:0, HBP:2, SF:0, AVG:'.370', OBP:'.525', SLG:'.565', OPS:'1.090' },
      log: [
        { date:'06/07', opp:'Challengers 2 G2', spot:1, pos:'SS', AB:3, R:2, H:2, '2B':1, HR:0, RBI:2, BB:1, SO:0, SB:0, AVG:'.370' },
        { date:'06/07', opp:'Challengers 2 G1', spot:1, pos:'SS', AB:4, R:3, H:2, '2B':0, HR:0, RBI:2, BB:2, SO:0, SB:1, AVG:'.370' },
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
      season: { G:11, PA:52, AB:44, R:20, H:13, '2B':5, '3B':0, HR:0, RBI:17, BB:6, SO:4, SB:2, CS:0, HBP:2, SF:0, AVG:'.295', OBP:'.404', SLG:'.409', OPS:'.813' },
      log: [
        { date:'06/07', opp:'Challengers 2 G2', spot:6, pos:'2B', AB:3, R:1, H:1, '2B':0, HR:0, RBI:1, BB:0, SO:0, SB:0, AVG:'.295' },
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
      season: { G:3, GS:0, IP:'5.2', H:6, R:5, ER:4, BB:4, SO:4, HR:0, HBP:0, WP:4, BF:28, WL:'1-0', SV:0, OppAVG:'.250', WHIP:'1.76', ERA:'6.35' },
      log: [
        { date:'06/07', opp:'Challengers 2 G1', IP:'1.0', H:2, R:3, ER:3, BB:1, SO:0, HBP:0, WP:0, BF:6,  ERA:'6.35' },
        { date:'05/05', opp:'Barracudas NLA',   IP:'0.2', H:0, R:0, ER:0, BB:0, SO:0, HBP:0, WP:0, BF:2,  ERA:'1.50' },
        { date:'04/26', opp:'Lausanne Indians', IP:'4.0', H:4, R:2, ER:1, BB:3, SO:4, HBP:0, WP:4, BF:19, ERA:'1.75' },
      ],
    },
    fielding: {
      season: { G:8, IP:'43.1', PO:9, A:7, E:2, DP:1, PB:0, RF:'2.91', FPct:'.889' },
      log: [
        { date:'06/07', opp:'Challengers 2 G2', pos:'2B',  IP:'5.0', PO:1, A:4, E:0, FPct:'.889' },
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

  '7': { // Arberim Rudaj
    fullName: 'Rudaj Arberim', bats: 'R', throws: 'R',
    batting: {
      season: { G:2, PA:7, AB:7, R:3, H:3, '2B':1, '3B':0, HR:0, RBI:2, BB:0, SO:1, SB:0, CS:0, HBP:0, SF:0, AVG:'.429', OBP:'.429', SLG:'.571', OPS:'1.000' },
      log: [
        { date:'06/07', opp:'Challengers 2 G2', spot:2, pos:'RF/CF', AB:3, R:1, H:1, '2B':0, HR:0, RBI:0, BB:0, SO:0, SB:0, AVG:'.429' },
        { date:'06/07', opp:'Challengers 2 G1', spot:2, pos:'2B',    AB:4, R:2, H:2, '2B':1, HR:0, RBI:2, BB:0, SO:1, SB:0, AVG:'.429' },
      ],
    },
    pitching: null,
    fielding: {
      season: { G:2, IP:'15.0', PO:8, A:1, E:0, DP:0, PB:0, RF:'6.00', FPct:'1.000' },
      log: [
        { date:'06/07', opp:'Challengers 2 G2', pos:'RF/CF', IP:'7.0', PO:5, A:0, E:0, FPct:'1.000' },
        { date:'06/07', opp:'Challengers 2 G1', pos:'2B',    IP:'8.0', PO:3, A:1, E:0, FPct:'1.000' },
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
      season: { G:12, PA:58, AB:35, R:20, H:16, '2B':4, '3B':3, HR:0, RBI:19, BB:14, SO:3, SB:4, CS:0, HBP:8, SF:1, AVG:'.457', OBP:'.655', SLG:'.743', OPS:'1.398' },
      log: [
        { date:'06/07', opp:'Challengers 2 G2', spot:3, pos:'C', AB:4, R:4, H:1, '2B':0, '3B':1, HR:0, RBI:1, BB:0, HBP:1, SO:0, SB:0, AVG:'.457' },
        { date:'06/07', opp:'Challengers 2 G1', spot:3, pos:'C', AB:3, R:5, H:1, '2B':0, '3B':0, HR:0, RBI:3, BB:4, SO:0, SB:0, AVG:'.457' },
        { date:'06/02', opp:'Barracudas NLA', spot:3, pos:'C',  AB:1, R:1, H:0, '2B':0, HR:0, RBI:0, BB:2, SO:1, HBP:1, SB:0, AVG:'.500' },
        { date:'05/30', opp:'Sissach Frogs G1', spot:3, pos:'C', AB:2, R:1, H:1, '2B':1, HR:0, RBI:1, BB:0, SO:0, SB:0, AVG:'.458' },
        { date:'05/30', opp:'Sissach Frogs G2', spot:3, pos:'C', AB:3, R:3, H:3, '2B':1, HR:0, RBI:3, BB:2, SO:0, SB:0, AVG:'.519' },
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
      season: { G:12, IP:'75.0', PO:63, A:7, E:3, DP:1, PB:8, SBAtt:25, CS:3, RF:'8.40', FPct:'.959' },
      log: [
        { date:'06/07', opp:'Challengers 2 G2', pos:'C', IP:'7.0',  PO:2,  A:0, E:1, DP:0, PB:0, SBAtt:2,  CS:0, FPct:'.959' },
        { date:'06/07', opp:'Challengers 2 G1', pos:'C', IP:'8.0',  PO:4,  A:2, E:1, DP:1, PB:1, SBAtt:8,  CS:2, FPct:'.959' },
        { date:'06/02', opp:'Barracudas NLA',   pos:'C', IP:'6.0',  PO:4,  A:1, E:0, DP:1, PB:0, SBAtt:2,  CS:0, FPct:'.982' },
        { date:'05/30', opp:'Sissach Frogs G1', pos:'C', IP:'7.0',  PO:4,  A:2, E:0, DP:0, PB:0, SBAtt:0,  CS:0, FPct:'.982' },
        { date:'05/05', opp:'Barracudas NLA',   pos:'C', IP:'7.0',  PO:3,  A:0, E:0, DP:0, PB:2, SBAtt:2,  CS:0, FPct:'.980' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'C', IP:'7.0',  PO:2,  A:0, E:0, DP:0, PB:1, SBAtt:1,  CS:0, FPct:'.979' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'C', IP:'5.0',  PO:5,  A:0, E:0, DP:0, PB:0, SBAtt:2,  CS:0, FPct:'.978' },
        { date:'04/26', opp:'Lausanne Indians', pos:'C', IP:'8.0',  PO:8,  A:0, E:0, DP:0, PB:1, SBAtt:2,  CS:0, FPct:'.976' },
        { date:'04/26', opp:'Lausanne Indians', pos:'C', IP:'7.0',  PO:9,  A:0, E:0, DP:0, PB:3, SBAtt:2,  CS:0, FPct:'.970' },
        { date:'04/19', opp:'Therwil Flyers 2', pos:'C', IP:'5.0',  PO:9,  A:2, E:0, DP:0, PB:0, SBAtt:1,  CS:0, FPct:'.958' },
      ],
    },
  },

  '16': { // Yohandris Pedroso Munoz
    fullName: 'Pedroso Munoz Yohandris', bats: 'R', throws: 'R',
    batting: {
      season: { G:7, PA:28, AB:22, R:10, H:10, '2B':4, '3B':0, HR:0, RBI:8, BB:7, SO:0, SB:2, CS:0, HBP:0, SF:0, AVG:'.455', OBP:'.607', SLG:'.636', OPS:'1.243' },
      log: [
        { date:'06/07', opp:'Challengers 2 G2', spot:5, pos:'DH/P', AB:2, R:1, H:1, '2B':0, HR:0, RBI:1, BB:1, SO:0, SB:0, AVG:'.455' },
        { date:'06/07', opp:'Challengers 2 G1', spot:5, pos:'DH',   AB:4, R:2, H:2, '2B':1, HR:0, RBI:2, BB:1, SO:0, SB:0, AVG:'.455' },
        { date:'06/02', opp:'Barracudas NLA', spot:5, pos:'DH', AB:2, R:0, H:1, '2B':0, HR:0, RBI:1, BB:0, SO:0, SB:0, AVG:'.438' },
        { date:'05/30', opp:'Sissach Frogs G2', spot:5, pos:'DH', AB:4, R:1, H:1, '2B':1, HR:0, RBI:0, BB:1, SO:0, SB:0, AVG:'.429' },
        { date:'05/30', opp:'Sissach Frogs G1', spot:5, pos:'DH', AB:3, R:2, H:1, '2B':0, HR:0, RBI:1, BB:1, SO:0, SB:0, AVG:'.500' },
      ],
    },
    pitching: {
      season: { G:1, GS:0, IP:'2.0', H:2, R:1, ER:1, BB:0, SO:0, HR:0, HBP:0, WP:0, BF:8, WL:'0-0', SV:0, OppAVG:'.286', WHIP:'1.00', ERA:'4.50' },
      log: [
        { date:'06/07', opp:'Challengers 2 G2', IP:'2.0', H:2, R:1, ER:1, BB:0, SO:0, HBP:0, WP:0, BF:8, ERA:'4.50' },
      ],
    },
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
      season: { G:12, PA:55, AB:42, R:19, H:26, '2B':2, '3B':0, HR:4, RBI:33, BB:12, SO:2, SB:1, CS:0, HBP:0, SF:1, AVG:'.619', OBP:'.691', SLG:'.952', OPS:'1.643' },
      log: [
        { date:'06/07', opp:'Challengers 2 G2', spot:4, pos:'3B', AB:3, R:2, H:2, '2B':0, HR:0, RBI:3, BB:1, SO:0, SB:0, AVG:'.619' },
        { date:'06/07', opp:'Challengers 2 G1', spot:4, pos:'3B', AB:4, R:3, H:3, '2B':0, HR:1, RBI:5, BB:1, SO:0, SB:0, AVG:'.619' },
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
      season: { G:12, PA:57, AB:46, R:13, H:7, '2B':1, '3B':0, HR:0, RBI:11, BB:9, SO:9, SB:3, CS:0, HBP:2, SF:0, AVG:'.152', OBP:'.316', SLG:'.174', OPS:'.490' },
      log: [
        { date:'06/07', opp:'Challengers 2 G2', spot:8, pos:'1B', AB:3, R:1, H:1, '2B':0, HR:0, RBI:2, BB:0, SO:1, SB:0, AVG:'.178' },
        { date:'06/07', opp:'Challengers 2 G1', spot:8, pos:'1B', AB:4, R:2, H:2, '2B':0, HR:0, RBI:3, BB:0, SO:1, SB:0, AVG:'.178' },
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
      season: { G:0, GS:0, IP:'0', H:0, R:0, ER:0, BB:0, SO:0, HR:0, HBP:0, WP:0, BF:0, WL:'0', SV:0, OppAVG:'.000', WHIP:'0', ERA:'0' },
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
      season: { G:12, PA:54, AB:42, R:19, H:14, '2B':3, '3B':0, HR:0, RBI:11, BB:9, SO:7, SB:11, CS:0, HBP:3, SF:0, AVG:'.333', OBP:'.481', SLG:'.405', OPS:'.886' },
      log: [
        { date:'06/07', opp:'Challengers 2 G2', spot:7, pos:'CF', AB:3, R:2, H:1, '2B':0, HR:0, RBI:1, BB:1, SO:0, SB:0, AVG:'.333' },
        { date:'06/07', opp:'Challengers 2 G1', spot:7, pos:'CF', AB:4, R:2, H:2, '2B':0, HR:0, RBI:2, BB:1, SO:0, SB:1, AVG:'.333' },
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
      season: { G:7, PA:29, AB:23, R:9, H:4, '2B':0, '3B':0, HR:0, RBI:7, BB:5, SO:2, SB:0, CS:0, HBP:1, SF:0, AVG:'.174', OBP:'.345', SLG:'.174', OPS:'.519' },
      log: [
        { date:'06/07', opp:'Challengers 2 G1', spot:9, pos:'LF', AB:4, R:3, H:2, '2B':0, HR:0, RBI:2, BB:1, SO:0, SB:0, AVG:'.174' },
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
      season: { G:6, PA:9, AB:8, R:3, H:4, '2B':1, '3B':0, HR:1, RBI:1, BB:0, SO:1, SB:1, CS:0, HBP:1, SF:1, AVG:'.500', OBP:'.556', SLG:'1.000', OPS:'1.556' }, // no AB in G1 (pitched only)
      log: [
        { date:'05/05', opp:'Barracudas NLA',   spot:4,  pos:'PH/CF', AB:1, R:0, H:0, '2B':0, HR:0, RBI:0, BB:0, SO:0, SB:0, AVG:'.500' },
        { date:'05/02', opp:'Luzern Eagles',    spot:9,  pos:'RF/P',  AB:4, R:1, H:3, '2B':1, HR:0, RBI:0, BB:0, SO:1, SB:1, AVG:'.571' },
        { date:'04/26', opp:'Lausanne Indians', spot:10, pos:'P/PH',  AB:2, R:0, H:0, '2B':0, HR:0, RBI:0, BB:0, SO:0, SB:0, AVG:'.333' },
        { date:'04/26', opp:'Lausanne Indians', spot:9,  pos:'PH/RF', AB:1, R:2, H:1, '2B':0, HR:1, RBI:1, BB:0, SO:0, SB:0, AVG:'1.000' },
      ],
    },
    pitching: {
      season: { G:5, GS:0, IP:'9.2', H:13, R:14, ER:13, BB:11, SO:12, HR:1, HBP:1, WP:3, BF:57, WL:'0-1', SV:0, OppAVG:'.310', WHIP:'2.48', ERA:'12.10' },
      log: [
        { date:'06/07', opp:'Challengers 2 G1', IP:'2.0', H:3, R:3,  ER:3, BB:1, SO:1, HBP:0, WP:0, BF:12, ERA:'12.10' },
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
    batting: {
      season: { G:1, PA:3, AB:3, R:2, H:1, '2B':0, '3B':0, HR:0, RBI:2, BB:0, SO:0, SB:0, CS:0, HBP:0, SF:0, AVG:'.333', OBP:'.333', SLG:'.333', OPS:'.667' },
      log: [
        { date:'06/07', opp:'Challengers 2 G2', spot:9, pos:'LF', AB:3, R:2, H:1, '2B':0, HR:0, RBI:2, BB:0, SO:0, SB:0, AVG:'.333' },
      ],
    },
    pitching: {
      season: { G:4, GS:2, IP:'9.0', H:11, R:12, ER:12, BB:11, SO:10, HR:0, HBP:1, WP:4, BF:51, WL:'1-2', SV:0, OppAVG:'.297', WHIP:'2.44', ERA:'12.00' },
      log: [
        { date:'06/07', opp:'Challengers 2 G1', IP:'1.0', H:1, R:1, ER:1, BB:0, SO:0, HBP:0, WP:0, BF:6,  ERA:'12.00' },
        { date:'05/05', opp:'Barracudas NLA',   IP:'0.2', H:1,  R:3, ER:3, BB:5, SO:0, HBP:0, WP:2, BF:8,  ERA:'9.62' },
        { date:'05/02', opp:'Luzern Eagles',    IP:'3.1', H:6,  R:8, ER:8, BB:5, SO:4, HBP:0, WP:1, BF:21, ERA:'7.64' },
        { date:'04/19', opp:'Therwil Flyers 2', IP:'4.0', H:3,  R:0, ER:0, BB:1, SO:6, HBP:1, WP:1, BF:16, ERA:'0.00' },
      ],
    },
    fielding: {
      season: { G:7, IP:'30.0', PO:4, A:1, E:1, DP:0, PB:0, RF:'1.50', FPct:'.833' },
      log: [
        { date:'06/07', opp:'Challengers 2 G2', pos:'LF', IP:'7.0', PO:0, A:0, E:0, FPct:'.833' },
        { date:'06/07', opp:'Challengers 2 G1', pos:'P',  IP:'1.0', PO:0, A:0, E:0, FPct:'.833' },
        { date:'05/05', opp:'Barracudas NLA',   pos:'P',     IP:'0.2', PO:0, A:0, E:0, FPct:'.833' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'LF/RF', IP:'7.0', PO:3, A:0, E:1, FPct:'.833' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'P',     IP:'3.1', PO:0, A:0, E:0, FPct:'1.000' },
        { date:'04/19', opp:'Therwil Flyers 2', pos:'LF',   IP:'5.0', PO:1, A:0, E:0, FPct:'1.000' },
        { date:'04/19', opp:'Therwil Flyers 2', pos:'P',    IP:'4.0', PO:0, A:1, E:0, FPct:'1.000' },
      ],
    },
  },

  '50': { // Andrea Girasole (uniform #38)
    fullName: 'Girasole Andrea', age: 38, bats: 'R', throws: 'R',
    batting: null,
    pitching: {
      season: { G:3, GS:1, IP:'10.2', H:23, R:29, ER:16, BB:7, SO:6, HR:1, HBP:2, WP:5, BF:64, WL:'0-0', SV:0, OppAVG:'.390', WHIP:'2.81', ERA:'13.50' },
      log: [
        { date:'06/07', opp:'Challengers 2 G1', IP:'4.0', H:6, R:6, ER:5, BB:2, SO:2, HBP:0, WP:0, BF:20, ERA:'13.50' },
        { date:'05/05', opp:'Barracudas NLA',   IP:'1.1', H:7,  R:8,  ER:6, BB:2, SO:2, HBP:0, WP:1, BF:14, ERA:'11.55' },
        { date:'05/02', opp:'Luzern Eagles',    IP:'5.1', H:10, R:15, ER:5, BB:3, SO:2, HBP:2, WP:2, BF:36, ERA:'6.56'  },
      ],
    },
    fielding: {
      season: { G:3, IP:'10.2', PO:0, A:1, E:0, DP:0, PB:0, RF:'.84', FPct:'1.000' },
      log: [
        { date:'06/07', opp:'Challengers 2 G1', pos:'P', IP:'4.0', PO:0, A:0, E:0, FPct:'1.000' },
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
      season: { G:5, GS:5, IP:'20.1', H:24, R:17, ER:14, BB:17, SO:9, HR:0, HBP:3, WP:10, BF:100, WL:'1-1', SV:0, OppAVG:'.279', WHIP:'2.02', ERA:'6.20' },
      log: [
        { date:'06/07', opp:'Challengers 2 G2', IP:'4.1', H:9, R:6, ER:6, BB:3, SO:2, HBP:0, WP:0, BF:26, ERA:'6.20' },
        { date:'05/30', opp:'Sissach Frogs G1', IP:'4.0', H:4, R:0, ER:0, BB:3, SO:4, HBP:0, WP:0, BF:19, ERA:'3.50', note:'Shutout W · Mercy Rule' },
        { date:'05/05', opp:'Barracudas NLA',   IP:'3.0', H:1, R:2,  ER:2, BB:4, SO:0, HBP:2, WP:1, BF:15, ERA:'4.67' },
        { date:'05/02', opp:'Luzern Eagles',    IP:'3.1', H:2, R:3,  ER:2, BB:5, SO:0, HBP:0, WP:2, BF:18, ERA:'4.67' },
        { date:'04/26', opp:'Lausanne Indians', IP:'5.2', H:8, R:6,  ER:4, BB:2, SO:3, HBP:1, WP:7, BF:28, ERA:'4.94' },
      ],
    },
    fielding: {
      season: { G:5, IP:'20.1', PO:1, A:2, E:1, DP:0, PB:0, RF:'.59', FPct:'.750' },
      log: [
        { date:'06/07', opp:'Challengers 2 G2', pos:'P', IP:'4.1', PO:0, A:1, E:0, FPct:'.750' },
        { date:'05/30', opp:'Sissach Frogs G1', pos:'P', IP:'4.0', PO:1, A:0, E:0, FPct:'.667' },
        { date:'05/05', opp:'Barracudas NLA',   pos:'P', IP:'3.0', PO:0, A:0, E:0, FPct:'.500' },
        { date:'05/02', opp:'Luzern Eagles',    pos:'P', IP:'3.1', PO:0, A:1, E:0, FPct:'.500' },
        { date:'04/26', opp:'Lausanne Indians', pos:'P', IP:'5.2', PO:0, A:0, E:1, FPct:'.000' },
      ],
    },
  },
};

