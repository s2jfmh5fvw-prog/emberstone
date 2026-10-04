# PAP PET Website – erfolgreich live

Stand: 04.10.2026. Fortsetzung, kein Neustart.

- Website: https://papsmp.de/
- Produktionscommit: c407b0a040dab246b103d732b332686a39e8d59a
- Vorheriger Produktionscommit: aa0504cc2041f28cc558f8d1f67eb63027422dab
- Cloudflare Pages: emberstone; Deployment 5aacdbe0-bdac-4ecd-918b-5c5a1a0ffba5, completed / success.
- Veröffentlichung über das bestehende GitHub-Repository s2jfmh5fvw-prog/emberstone, main → Cloudflare Pages. Kein neuer Hostinganbieter.

## Veröffentlicht

Die PAP-Figur verwendet die originalen Animationsframes der freigegebenen PAP Desktop Companion Demo 0.9. 104 Clips mit 5.376 gegen die Demo geprüften, pixelidentischen Frames: Idle, Laufen und Übergänge nach links und rechts, Sitzen, Schlafen, Aufwachen und kurze Comic-Reaktionen. Kein Füttern, Spielen, Pflege-HUD oder Desktop-Programm auf der Website.

Ein gemeinsamer Verhaltensplaner löst im geschlossenen Chat nach unregelmäßigen 18–44 Sekunden kleine Aktionen aus. Laufen hat höheres Gewicht: PAP bewegt sich ein kurzes Stück nach links, hält an und kehrt zurück. Schritte folgen der Wegstrecke; Anlaufen, Abbremsen und Übergänge verwenden die Originalclips. Route und Sprechblasen bleiben innerhalb der Bildschirmgrenzen. Nach drei Minuten ohne Nutzerinteraktion folgt eine Schlafpause; Ansprechen weckt PAP. Schreiben, Antworten, Verschieben, ausgeblendete Seite und geöffnetes Burger-Menü berücksichtigen die Bewegung. Reduzierte Bewegung verwendet statische Posen.

Figur mit Schatten und dezenter PAP-BOT-Kennung: 202 px auf Desktop, 162 px mobil, 108 px in kompakter Ansicht. Chatgröße und Schrift werden nicht mitskaliert. Bestehender Chat mit sechs Themen-Shortcuts, FAQ-Antworten, Links, Kopierfunktion, Entwurf und Verlauf bleibt erhalten. Antworten stammen weiterhin aus den PAP-FAQ; keine ChatGPT-API wurde eingerichtet.

Assets: 25.751.337 Bytes insgesamt. Animationen werden bei Bedarf geladen; Bildcache auf vier Seiten begrenzt. Erste Idle-Seite 134.274 Bytes. Originalquelle: PAP_Desktop_Companion_Demo_0.9.zip, SHA-256 73000dc194da8380485bf12f3a73638d7c5889b25c70f71657ded90f98c2dce6.

## Prüfung und Nachweise

- 60 aktuelle Prüfungen bestanden: 21 FAQ, 13 Verhalten, 10 Position, 8 Renderer-Adapter und 8 PET-Lifecycle. Diese prüfen unter anderem Hin-/Rückweg, Chat-Unterbrechung, Pause/Fortsetzung, Schlafen/Aufwachen, reduzierte Bewegung, Verschieben, Cache und Abbau während des Ladens.
- Astro check: 0 Fehler, 0 Warnungen, 0 Hinweise. Produktionsbuild mit fünf Seiten erfolgreich.
- Alle 47 vorhandenen Dateien unter public bytegleich erhalten; public-preserved.json enthält den Vergleich. VIP-Worker, Zahlungen und bestehende Downloads wurden nicht verändert.
- Live-HTTP-Abgleich: 210 Prüfungen bestanden. HTML, JavaScript, CSS, WebP-Dateien, Poster, Kontakt-/Rechtsseiten und drei Downloads stimmen mit dem lokalen Build überein. Bei den Rechts-/Kontaktseiten wird ausschließlich die bestehende Cloudflare-E-Mail-Verschleierung für den Vergleich normalisiert; der Schutz bleibt aktiv. Nachweis: live-http-check.json.
- Live-Browser: renderer=pet-v09, ready=true; Desktopfigur 202 px. Java- und Bedrock-Antworten sowie sechs Shortcuts geprüft. Mobile Ansicht 390 × 844 px: Menü pausiert den Animationsframe; Schließen erhält den Entwurf „Entwurf für später“. Schlafübergang und wake_left → sit_left beobachtet. Keine Browserfehler oder Warnungen bei Abschluss. Nachweis: browser-live.json, PAP-live-desktop.png, PAP-live-390px.png.
- In der begrenzten autonomen Live-Messung wurden idle_left und butterfly_left erfasst. Ein kompletter zufälliger Hin-/Rückweg wurde in dieser Live-Messung nicht aufgezeichnet. Die vollständige Route ist im realen lokalen Demo-Browser und in den Tests des jetzt verwendeten PET-Renderers belegt; dies ist von einer vollständigen Live-Aufzeichnung zu unterscheiden.
- Kein Test auf einem physischen Mobilgerät. Frühere v4-Nachweise mit 1.089 Posen betreffen den alten Renderer und werden nicht als Prüfung der neuen PET-Frames ausgegeben.

## Sicherung und Fortsetzung

Checkout: C:\Users\licht\Documents\Codex\2026-10-01\er\work\emberstone-chatbot
Websiteordner: papsmp-website
Fortsetzungsbranch: codex/pap-companion-v2
Cloud-Nachweise: companion-checkpoints/PAP-PET-Website-Live
Lokale Sicherung: C:\Users\licht\Documents\Codex\2026-10-01\er\outputs\PAP-PET-Website-Live

website-before.zip enthält den zuvor gesicherten Quellcheckpoint de074d8ebd229dea09737a61cce7c5ccbb877190. Dieser enthält gegenüber dem vorherigen Produktionscommit auch die vorhandene Fortsetzungsdokumentation. PAP-PET-Website-Quellstand.zip enthält den veröffentlichten Website-Quellstand c407b0a samt neuen Assets und Skripten; unveränderte große öffentliche Downloads bleiben im Repository. ZIP-Prüfsummen: backup-sha256.json. Der Quellcommit ist auf GitHub main und auf dem Fortsetzungsbranch gesichert; der zusätzliche Nachweis-/Dokumentationscommit wird nur auf dem Fortsetzungsbranch gespeichert. main bleibt auf dem genannten Produktionscommit.

Bei Fortsetzung zuerst dieses Dokument und Nutzerfeedback lesen. Bestehende Vorschauen und Originalassets erhalten. pap-pet.js, pap-pet-walk.js und pap-renderer.ts steuern die Originalfigur; pap-motion.ts, pap-position.ts und pap-helper.ts steuern Verhalten, Position und Chat. In papsmp-website: npm run check; node scripts/check-pap-helper.mjs; node scripts/check-pap-motion.mjs; node scripts/check-pap-position.mjs; node scripts/check-pap-renderer.mjs; node scripts/check-pap-pet.mjs; npm run build. Historische native Tests bleiben erhalten, sind aber nicht die aktuelle PET-Prüfung. Veröffentlichung weiterhin nach Prüfung des aktuellen main-Stands über die bestehende Pages-Verknüpfung.

Rollback bei tatsächlichem Bedarf über einen nachvollziehbaren Revert des Quellcommits auf main und den bestehenden Pages-Build; kein erzwungenes Zurücksetzen der Git-Historie. Ein Rollback wurde nicht ausgeführt.
