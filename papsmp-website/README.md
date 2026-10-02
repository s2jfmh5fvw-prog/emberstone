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

`src/components/PapHelper.astro` enthält die freistehende PAP-Figur mit Sprechblasen und sechs Themen-Shortcuts. Die Antworten liegen in `src/data/pap-helper.ts` und verwenden die bestehenden FAQs und öffentlichen Ziele aus `site.ts`. `src/scripts/pap-helper.ts` steuert Bedienung und Chat-Zustände; `pap-motion.ts` plant kleine zufällige Gesten nach 12–28 Sekunden, seltene Grüße und Hopser mit größeren Abständen. `pap-native.js` zeichnet die flüssigen Körper-, Arm-, Ohr-, Schwanz- und Blickbewegungen aus zwölf Bildteilen (98.952 Byte) mit bis zu 30 Bildern pro Sekunde. Große Animationsatlanten werden vom aktuellen Chat nicht geladen. In verborgenen Tabs, bei geöffnetem Burger-Menü und mit reduzierter Bewegung pausiert PAP. Beim Schreiben/Antworten bleiben Zusatzgesten aus; Verschieben und Ruhe werden berücksichtigt. Ein Referenzbild bleibt bei Ladefehlern sichtbar. Chatnachrichten und Entwürfe bestehen nur bis zum Neuladen der Seite.

Antworten vor einer Veröffentlichung prüfen:

```bash
node scripts/check-pap-helper.mjs
node scripts/check-pap-motion.mjs
node scripts/check-pap-position.mjs
node scripts/check-pap-renderer.mjs
node scripts/check-pap-native.mjs
node scripts/check-pap-lifecycle.mjs
```

Eine echte KI-Anbindung benötigt einen getrennten serverseitigen Endpunkt und eine eigene Kostenfreigabe; der Browser darf keinen API-Key enthalten.

## Offene Freigaben

Siehe `CONTENT_REQUIRED.md`. Die Produktionsseite kann ausdrücklich markierte Platzhalter enthalten; das ist keine rechtliche Freigabe. Vor dem regulären Betrieb müssen Impressum, Datenschutz, offene Links, Serverdaten und Resource-Pack-Hosting vervollständigt und geprüft werden.
