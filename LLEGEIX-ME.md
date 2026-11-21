# Mobilitat Salomó (app web instal·lable)

## Fitxers
- `data.js`: els HORARIS i les dades de cotxe. `app.js`: la lògica i les pantalles. `index.html`: estructura i estils. `CONTEXT.md`: resum per donar a Claude quan demanis canvis.
- `manifest.json`, `sw.js`, `icon-*.png`: perquè es pugui instal·lar a l’iPhone i funcioni sense connexió.

## Instal·lar-la a l’iPhone (gratis, sense Mac)
1. Puja aquesta carpeta a un allotjament HTTPS gratuït. El més senzill, GitHub Pages:
   - Crea un compte a github.com i un repositori nou (p. ex. `mobilitat-salomo`).
   - "Add file → Upload files" i puja tots els fitxers d’aquesta carpeta.
   - Settings → Pages → Source: "Deploy from a branch" → `main` / `(root)`.
   - L’adreça serà `https://EL-TEU-USUARI.github.io/mobilitat-salomo/`.
2. Obre aquesta adreça amb **Safari** a l’iPhone.
3. Botó Compartir → **Afegeix a la pantalla d’inici**.

## Modificar-la
- Edita `index.html` directament a GitHub (llapis) o amb qualsevol editor de text.
- Horaris de tren: línies `tr("id","RE","all","LLE","BCN","Parada hh:mm;...")`.
- Horaris de bus: línies `bus(...)`. Cotxe: llista `CAR`.
- Després de canviar-ho, puja el número de versió a `sw.js` (`mobilitat-salomo-v2`...) perquè l’iPhone refresqui la còpia sense connexió.

## App nativa (opcional)
Cal un Mac amb Xcode: crea un projecte iOS "App" i carrega `index.html` en un `WKWebView`. Amb un Apple ID gratuït s’instal·la al teu iPhone 7 dies cada cop; per fer-ho permanent o publicar a l’App Store cal el programa de desenvolupadors d’Apple (99 €/any).
