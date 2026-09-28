# PAP SMP Website

Statische Astro-Website für PAP SMP. Der GitHub-Actions-Workflow `Deploy PAP SMP to Cloudflare Pages` veröffentlicht erfolgreiche Builds von `main` in Cloudflare Pages; er verändert keine bestehenden Projekte, bis die unten genannten Einstellungen gesetzt sind.

## Lokal

```bash
npm ci
npm run check
npm run build
npm run dev
```

Build-Ausgabe: `dist/`.

## Deployment einrichten

Der Workflow liegt unter `.github/workflows/deploy-papsmp.yml` und deployt Änderungen aus `papsmp-website/` nach erfolgreichem `npm run check` und `npm run build`. Für die erstmalige Einrichtung im GitHub-Repository unter **Settings → Secrets and variables → Actions** setzen:

- Repository-Secret `CLOUDFLARE_API_TOKEN` mit Cloudflare-Pages-Edit-Rechten
- Repository-Secret `CLOUDFLARE_ACCOUNT_ID`
- Repository-Variable `CLOUDFLARE_PAGES_PROJECT` mit dem existierenden Pages-Projektnamen

Das Cloudflare-Pages-Projekt muss `main` als Production-Branch verwenden und `papsmp.de` als Custom Domain zugeordnet haben. Danach lässt sich der Ablauf unter **Actions → Deploy PAP SMP to Cloudflare Pages → Run workflow** testen; spätere Änderungen im Projektverzeichnis deployen automatisch nach Merge auf `main`.

## Öffentliche Konfiguration

`src/data/site.ts` enthält nur bestätigte öffentliche Ziele. Fehlende Ziele bleiben `undefined`; deshalb werden keine toten Discord-, Whitelist-, Server-, Download- oder VIP-Buttons erzeugt.

## Offene Freigaben

Siehe `CONTENT_REQUIRED.md`. Rechtstexte, echte Links, Serverdaten und Resource-Pack-Hosting fehlen im Alpha-Arbeitsstand bewusst.
