# PAP Companion v4 – erfolgreich live

Stand: 02.10.2026. Fortsetzung, kein Neustart.

Website: https://papsmp.de/
Produktionscommit: aa0504cc2041f28cc558f8d1f67eb63027422dab
Cloudflare-Pages-Deployment: b9e0ce5b-cb70-4916-b905-e4d4028405a7
Status: completed / success. Veröffentlichung über GitHub main und die bestehende Pages-Verknüpfung.

## Veröffentlicht

Kontinuierlich animierte PAP-Figur aus zwölf Bildteilen: Atmen, Blinzeln, Blick, eigene Ohr- und Schwanzgesten, gegliedertes Winken und kurzer Hopser. Ein Gestenplaner führt kleine Aktionen nach zufälligen 12–28 Sekunden aus. Schreiben, Antworten, Verschieben, Ruhe, reduzierte Bewegung, ausgeblendete Seite und geöffnetes Burger-Menü werden berücksichtigt. Das Lade-Fallback funktioniert auch bei bereits pausierter Figur.

Kleine Figur unten mit Schatten und dezenter PAP-BOT-Kennung. Website-Chat mit sechs Themen-Shortcuts, FAQ-Antworten, Entwurf und Verlauf. Keine externe KI-Anbindung oder neue kostenpflichtige Animationsdienste. Der mobile Menüknopf liegt jetzt über der geöffneten Menüfläche und kann sie schließen.

## Nachweise

- 58 FAQ-, Verhaltens-, Positions- und Lifecycle-Prüfungen bestanden; 1.089 Posen in neun Zuständen geprüft.
- Astro: 0 Fehler, Warnungen und Hinweise; fünf Seiten gebaut.
- Live-HTTP-Abgleich: 17 Prüfungen bestanden. Website, geladene Assets und drei Downloads stimmen mit dem Build überein. Auf der Kontaktseite wird ausschließlich die vorhandene Cloudflare-E-Mail-Verschleierung vor dem Abgleich zurückgerechnet; deren Schutz bleibt aktiv.
- Alle 47 geschützten öffentlichen Marken-, Download- und Konfigurationsdateien bytegleich erhalten.
- Browser: Winken hebt und senkt die Pfote; autonomer Schwanzimpuls ohne Hover über 28,476 Sekunden beobachtet. Menü pausiert die Figur; Schließen setzt sie fort und erhält den Entwurf. Sechs Shortcuts und Chat bei 390 × 844 px sichtbar; niedrige Ansicht zusätzlich lokal geprüft. Desktop-Geometrie bei 1280 × 800 px geprüft. Keine abschließenden Browserfehler oder Warnungen.
- Kein Test auf einem physischen Mobilgerät. Screenshots zeigen den tatsächlich sichtbaren Browserausschnitt; Desktop-Ausschnitt ist keine vollständige Desktopaufnahme.

Belege: cloudflare-deployment.json, live-http-check.json, public-preserved.json, browser-live.json, autonomous-final.json und PAP-live-390px.png.

## Sicherung und Fortsetzung

Checkout: C:\Users\licht\Documents\Codex\2026-10-01\er\work\emberstone-chatbot
Cloud-Repository: s2jfmh5fvw-prog/emberstone
Fortsetzungsbranch: codex/pap-companion-v2
Cloud-Nachweise: companion-checkpoints/PAP-Companion-v4-Live
Lokale Sicherung: C:\Users\licht\Documents\Codex\2026-10-01\er\outputs\PAP-Companion-v4-Live

production-before.zip enthält den vorherigen Produktionsstand e2454c4b236f7862d55b339a020bff86ecee645a. PAP-Companion-v4-Release.zip enthält den finalen Website-Quellstand; große öffentliche Downloads liegen weiterhin unverändert im Repository. ZIP-Prüfsummen stehen in backup-sha256.json. Der Dokumentationscheckpoint wird auf dem Fortsetzungsbranch gespeichert; main bleibt auf dem oben genannten Live-Commit.

Bei Fortsetzung zuerst diesen Stand und Nutzerfeedback lesen. Bestehende v2/v3/v4-Vorschauen und Originalassets erhalten. pap-native.js / pap-native-math.js betreffen die Figur; pap-helper.ts / pap-motion.ts betreffen Chat und Verhalten. Im Websiteordner npm run check, die sechs scripts/check-pap-*.mjs und npm run build ausführen. Veröffentlichung weiterhin über main nach Prüfung des aktuellen Produktionsstands. VIP-Worker und Zahlungsfunktionen gehören nicht zu dieser Änderung.

Rollback bei tatsächlichem Bedarf: den vorherigen Produktionsstand über einen nachvollziehbaren Revert auf main und den bestehenden Pages-Build wiederherstellen; kein erzwungenes Zurücksetzen der Git-Historie. Ein Rollback wurde nicht ausgeführt.
