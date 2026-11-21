# Context per a Claude (enganxa o adjunta aquest fitxer quan demanis canvis)

App web "Mobilitat Salomó": horaris de tren (R13) i bus (Empresa Plana) des de Salomó, més temps en cotxe. Idioma: català. Pensada per a mòbil (iPhone), sense servidor ni llibreries externes.

Fitxers:
- `data.js`: només DADES. Trens `tr(id, tipus, dies, costat_sortida, costat_arribada, "Parada hh:mm;...")`, busos `bus(...)`, i la llista `CAR` (cotxe: destí, minuts, km, carretera). Aquí es canvien els horaris.
- `app.js`: LÒGICA i pantalles (mapa, llista d’horaris, pestanyes, cotxe). Aquí s’afegeixen o es treuen funcions.
- `index.html`: estructura i estils (CSS amb variables, mode clar/fosc, zones segures de l’iPhone).
- `sw.js`: còpia sense connexió. Cada cop que canviïs qualsevol fitxer, puja el número de versió (`mobilitat-salomo-vN`).
- `manifest.json` i `icon-*.png`: instal·lació a la pantalla d’inici.

Regles: no usar localStorage ni xarxa; mantenir el codi en fitxers estàtics; apòstrofs tipogràfics (’) als textos visibles; Salomó sempre en verd (`--sal`). Quan canviïs un fitxer, torna’l sencer.
Dades pendents de verificar: bus (horari d’estiu 2023), tren (servei modificat per robatori de cable des del 28 de juliol), temps en cotxe (estimats).
