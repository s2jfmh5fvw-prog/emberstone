# Emberstone

## Projektübersicht

Diese Repository enthält eine statische Landingpage für Emberstone Survival mit einem Early-Whitelist-Call-to-Action. Das Projekt ist so vorbereitet, dass es über Cloudflare Pages gehostet werden kann und zusätzlich einen Cloudflare Worker für zukünftige API- oder Formularfunktionen bereitstellt.

## Inhalt

- `index.html` – Haupt-Landingpage
- `styles.css` – Styling für die Seite
- `assets/` – Bilddateien und visuelle Assets
- `package.json` – NPM-Skripte für lokale Entwicklung und Deployment
- `wrangler.toml` – Cloudflare Workers Konfiguration
- `worker.js` – Beispiel-Worker mit `/api` und `/api/whitelist`

## Vorbereitung

1. Installiere die Abhängigkeiten:

```bash
npm install
```

2. Melde dich bei Cloudflare an:

```bash
npx wrangler login
```

3. Trage deine Cloudflare `account_id` in `wrangler.toml` ein.
   Diese findest du im Cloudflare Dashboard unter "Overview" deines Accounts.

## Lokale Entwicklung

- Erstelle die statischen Dateien für Pages:

```bash
npm run build
```

- Starte lokale Pages-Entwicklung:

```bash
npm run dev:pages
```

- Starte lokale Worker-Entwicklung:

```bash
npm run dev:worker
```

## Cloudflare Pages Deployment

Die statische Landingpage kann mit Cloudflare Pages deployed werden.

1. Erstelle im Cloudflare Dashboard ein neues Pages-Projekt.
2. Verbinde dein Repository und wähle den Projektordner aus.
3. Setze den Build-Befehl auf:

```bash
npm install && npm run build
```

4. Setze das Output-Verzeichnis auf:

```
dist
```

> Wichtig: Verwende für Pages nicht `npx wrangler deploy`, denn das ist für Worker-Deployments gedacht. Dadurch entsteht der Fehler "Could not detect a directory containing static files".

> Optional: Du kannst auch direkt `npx wrangler pages publish . --project-name emberstone` ausführen.

## Cloudflare Worker Deployment

Der Worker kann separat deployed werden und liefert einen API-Endpunkt für zukünftige Funktionen.

1. Öffne `wrangler.toml` und ergänze dort deine `account_id`.
2. Optional: aktiviere die Route für deine eigene Domain:

```toml
route = "emberstonesurvival.com/api/*"
```

3. Deploye den Worker mit:

```bash
npm run publish:worker
```

## Worker-Endpunkte

Der Worker stellt aktuell folgende Endpunkte bereit:

- `GET /api` – Grundlegende Status-Antwort
- `POST /api/whitelist` – verarbeitet JSON-Anfragen für eine Whitelist-Anmeldung
- `OPTIONS /api/whitelist` – CORS-Preflight für Browseranfragen

Beispiel:

```bash
curl -X POST https://<dein-worker-url>/api/whitelist \
  -H 'Content-Type: application/json' \
  -d '{"name":"Max Mustermann","email":"max@example.com"}'
```

## Integration von Pages & Worker

- Pages übernimmt das Hosting deiner statischen Seite.
- Der Worker kann parallel verwendet werden für API-Aufrufe, Whitelist-Formulare oder Backend-Logik.
- Mit einer Route wie `emberstonesurvival.com/api/*` kannst du den Worker unter deiner Domain verfügbar machen.

## Nächste Schritte

- Ersetze Platzhalterbilder durch finale Assets im `assets/`-Ordner.
- Ergänze in `index.html` ein echtes Whitelist-Formular, das Daten an `/api/whitelist` sendet.
- Falls gewünscht, erweitere den Worker um E-Mail-Versand, Discord-Webhook oder Speicherung in einer Datenbank.
