# Actualizar Stats de Jugadores

Correr esto en la terminal despues de cada serie de juegos.

---

## Todos los jugadores (lo normal)

```bash
npm run sync
```

Abre EasyScore automaticamente, extrae los stats de los 15 jugadores,
actualiza data-players.js, flip cards, y hace commit + push a Netlify.
Tarda ~4 minutos.

---

## Un solo jugador

```bash
node scripts/sync-player-stats.js --player=NUMERO
```

Ejemplos:
```bash
node scripts/sync-player-stats.js --player=15   # Medina
node scripts/sync-player-stats.js --player=34   # Lima
node scripts/sync-player-stats.js --player=20   # Garcia
```

---

## Ver que cambiaria sin escribir nada (dry-run)

```bash
node scripts/sync-player-stats.js --player=all --dry-run
```

---

## Numeros de jugadores

| # | Jugador         |
|---|-----------------|
| 1 | Malchans Juan   |
| 8 | Rodriguez Martin|
| 11| Lombriser       |
| 13| Elias Angel     |
| 15| Medina Jose     |
| 16| Pedroso         |
| 20| Garcia Kelvis   |
| 22| Vasquez Michael |
| 23| Litscher Sascha |
| 27| Del Valle Elvis |
| 28| Noa Francisco   |
| 30| Moreno Carlos   |
| 34| Rosa Lima Jhomar|
| 36| Peguero Wilkin  |
| 77| Arregoitia Jhon |
