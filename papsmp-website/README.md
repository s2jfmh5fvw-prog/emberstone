# PAP SMP Website

Lokale, statische Astro-Website für den PAP-SMP-Alpha-Arbeitsstand. Dieses Projekt veröffentlicht nichts und verändert keine bestehenden Emberstone-, GitHub- oder Cloudflare-Projekte.

## Lokal

```bash
npm ci
npm run check
npm run build
npm run dev
```

Build-Ausgabe: `dist/`. Cloudflare Pages kann später mit `npm run build` und Output `dist` verbunden werden, aber erst nach Inhalt-, Rechts- und Plattformabnahme.

## Öffentliche Konfiguration

`src/data/site.ts` enthält nur bestätigte öffentliche Ziele. Fehlende Ziele bleiben `undefined`; deshalb werden keine toten Discord-, Whitelist-, Server-, Download- oder VIP-Buttons erzeugt.

## Offene Freigaben

Siehe `CONTENT_REQUIRED.md`. Rechtstexte, echte Links, Serverdaten und Resource-Pack-Hosting fehlen im Alpha-Arbeitsstand bewusst.
