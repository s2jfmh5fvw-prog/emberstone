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

Der PAP-Chatbot durchsucht ausschließlich die bestätigten Website-FAQs und läuft vollständig im Browser. Es gibt keine externe KI-Anbindung, keinen API-Key und keine Übertragung oder Speicherung der Chatnachrichten durch den Chatbot. Bei unbekannten Fragen verweist PAP auf den Discord.

`src/components/PapHelper.astro` enthält die freistehende PAP-Figur mit Chatfenster (freigegebene Variante A). Die Antworten liegen in `src/data/pap-helper.ts` und verwenden die bestehenden FAQs und öffentlichen Ziele aus `site.ts`. `src/scripts/pap-helper.ts` steuert Bedienung, Zustände und zufällige Blink-, Wink- und Neugier-Animationen im Abstand von 7–18 Sekunden. In verborgenen Tabs, bei ausgeblendetem PAP und mit reduzierter Bewegung pausieren die automatischen Animationen. Die beiden Sprite-Atlanten in `src/assets/chatbot/` werden beim Build zu WebP optimiert; das zusätzliche Animationsbild lädt verzögert.

Antworten vor einer Veröffentlichung prüfen:

```bash
node scripts/check-pap-helper.mjs
node scripts/check-pap-motion.mjs
```

Eine echte KI-Anbindung benötigt einen getrennten serverseitigen Endpunkt und eine eigene Kostenfreigabe; der Browser darf keinen API-Key enthalten.

## Offene Freigaben

Siehe `CONTENT_REQUIRED.md`. Die Produktionsseite kann ausdrücklich markierte Platzhalter enthalten; das ist keine rechtliche Freigabe. Vor dem regulären Betrieb müssen Impressum, Datenschutz, offene Links, Serverdaten und Resource-Pack-Hosting vervollständigt und geprüft werden.
