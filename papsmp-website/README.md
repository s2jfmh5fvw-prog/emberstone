# PAP SMP Website

Statische Astro-Website für PAP SMP. Cloudflare Pages ist direkt mit diesem GitHub-Repository verbunden: Pull Requests erhalten Vorschau-Deployments, Merges nach `main` veröffentlichen die Produktionsseite `papsmp.de`.

## Lokal

```bash
npm ci
npm run check
npm run build
npm run dev
```

Build-Ausgabe: `dist/`.

## Deployment

Der bestehende Cloudflare-Pages-GitHub-Connect übernimmt Build, Vorschau und Production-Deployment. Der Branch `main` ist der Production-Branch und `papsmp.de` die Custom Domain. Ein zusätzlicher API-Token-Workflow ist nicht erforderlich.

## Öffentliche Konfiguration

`src/data/site.ts` enthält nur bestätigte öffentliche Ziele. Fehlende Ziele bleiben `undefined`; deshalb werden keine toten Discord-, Whitelist-, Server-, Download- oder VIP-Buttons erzeugt.

## Offene Freigaben

Siehe `CONTENT_REQUIRED.md`. Rechtstexte, echte Links, Serverdaten und Resource-Pack-Hosting fehlen im Alpha-Arbeitsstand bewusst.
