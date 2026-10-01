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

## Virtueller PAP-Chat

Der Chat verwendet eine Cloudflare Pages Function unter `/api/chat` und hält den API-Key serverseitig. Für Antworten `OPENAI_API_KEY` in den Cloudflare-Pages-Projekteinstellungen als Secret setzen; optional kann `OPENAI_MODEL` als Variable konfiguriert werden. Niemals den API-Key in `src/`, `public/` oder Browser-Code ablegen. Die Astro-Entwicklungsumgebung stellt Pages Functions nicht bereit; für lokale End-to-End-Tests Cloudflare Pages mit Wrangler ausführen. Vor Aktivierung in Production zusätzlich Datenschutzangaben und Kosten-/Rate-Limits prüfen.

## Offene Freigaben

Siehe `CONTENT_REQUIRED.md`. Die Produktionsseite kann ausdrücklich markierte Platzhalter enthalten; das ist keine rechtliche Freigabe. Vor dem regulären Betrieb müssen Impressum, Datenschutz, offene Links, Serverdaten und Resource-Pack-Hosting vervollständigt und geprüft werden.
