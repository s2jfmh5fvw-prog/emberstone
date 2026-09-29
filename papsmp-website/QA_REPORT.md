# QA report

## Local result

| Check | Result |
| --- | --- |
| `npm run check` | BESTANDEN — 0 errors, 0 warnings, 0 hints |
| `npm run build` | BESTANDEN — 4 static routes generated |
| Desktop DOM smoke | BESTANDEN — semantic landmarks, one H1, 16 internal links |
| Mobile menu | BESTANDEN — button opens navigation at 390px; Escape closes and returns focus |
| 404 route | BESTANDEN — `/404/` resolves to the friendly 404 page |
| External destinations | NICHT KONFIGURIERT — no dead Discord/Whitelist/VIP/Download buttons |
| Public release | MIT PLATZHALTERN — Impressum und Datenschutz sind sichtbar markiert, aber nicht vervollständigt oder rechtlich freigegeben |

## Preview files

- `outputs/papsmp-desktop-preview.png`
- `outputs/papsmp-mobile-preview.png`
- `outputs/papsmp-desktop-preview-v2.png`
- `outputs/papsmp-mobile-preview-v2.png`

## Grenzen

Die Browser-Prüfung ist ein lokaler Chromium-/In-App-Browser-Smoke. Es ist keine Safari-, Lighthouse-, Cloudflare-Pages-, Server-, Geyser-, Discord- oder Live-Domain-Abnahme. Das OG-Bild verwendet den bereitgestellten Reveal-Poster-Asset; eine eigene Social-Card-Komposition kann nach Markenfreigabe ergänzt werden. Die Discord-Einladung und Java-Adresse wurden nach Nutzerangabe eingebaut; die Cloudflare-Dashboard-Anmeldung war in dieser Sitzung nicht abgeschlossen.
