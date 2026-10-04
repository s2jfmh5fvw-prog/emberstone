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

`src/components/PapHelper.astro` enthält die freistehende Original-PAP-Figur der Desktop-Demo 0.9 mit Sprechblasen und sechs Themen-Shortcuts. Die Antworten liegen in `src/data/pap-helper.ts` und verwenden die bestehenden FAQs und öffentlichen Ziele aus `site.ts`. `src/scripts/pap-helper.ts` steuert Bedienung und Chat-Zustände; der einzige Gestenplaner `pap-motion.ts` wählt Aktionen nach 18–44 Sekunden. PAP läuft gelegentlich ein kleines Stück nach links, pausiert und kehrt zurück. Die Pfotenphase folgt der zurückgelegten Strecke. Im offenen Chat läuft PAP nicht; Schreiben, Antworten und Verschieben haben Vorrang. Nach drei Minuten ohne Nutzerinteraktion kann er bei geschlossenem Chat einschlafen; Anklicken weckt ihn mit der Original-Weckanimation.

`pap-pet.js` und `pap-pet-walk.js` zeichnen die originalen 224×150-Posen aus `src/assets/chatbot/pet-v09`. 5.376 Frames in 104 Clips wurden verlustfrei aus der benannten Demo 0.9 übernommen und pixelgleich geprüft; Quellhashes stehen in `SOURCE-QA.json`. Die Frames liegen auf kleinen WebP-Seiten, die erst bei Bedarf geladen werden; der eigene Bildcache hält höchstens vier Seiten. Der vollständige Kandidatenbestand (25.751.337 Byte) wird nicht beim Seitenstart geladen. Die erste Idle-Seite benötigt 134.274 Byte. Füttern, Spielen, Desktop-HUD, Pflegewerte und Bo werden nicht übernommen. Kein Besucher benötigt eine EXE oder .NET. Originale und frühere v4-Assets bleiben erhalten, werden aber vom aktuellen Chat nicht geladen.

In verborgenen Tabs und bei geöffnetem Burger-Menü pausiert PAP. Reduzierte Bewegung zeigt passende statische Posen. Ein originales Referenzbild bleibt bei Ladefehlern sichtbar. Die Figur ist 202 px breit, mobil 162 px, bei niedrigen Fenstern 108 px; Sprechblasen bleiben unabhängig davon begrenzt. Verlauf, Entwurf, Verschieben, Positionsreset und Einstellungen bleiben vorhanden. Chatnachrichten und Entwürfe bestehen nur bis zum Neuladen der Seite. Creator: yuuh92; siehe die mitgeführten Asset-Lizenzhinweise.

Antworten vor einer Veröffentlichung prüfen:

```bash
node scripts/check-pap-helper.mjs
node scripts/check-pap-motion.mjs
node scripts/check-pap-position.mjs
node scripts/check-pap-renderer.mjs
node scripts/check-pap-pet.mjs
node scripts/check-pap-native.mjs
node scripts/check-pap-lifecycle.mjs
```

Eine echte KI-Anbindung benötigt einen getrennten serverseitigen Endpunkt und eine eigene Kostenfreigabe; der Browser darf keinen API-Key enthalten.

## Offene Freigaben

Siehe `CONTENT_REQUIRED.md`. Die Produktionsseite kann ausdrücklich markierte Platzhalter enthalten; das ist keine rechtliche Freigabe. Vor dem regulären Betrieb müssen Impressum, Datenschutz, offene Links, Serverdaten und Resource-Pack-Hosting vervollständigt und geprüft werden.
