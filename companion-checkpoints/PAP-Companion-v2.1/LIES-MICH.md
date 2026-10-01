# PAP Companion v2.1 — Vorschau

Fortsetzung von Variante A und der v2-Vorschau auf dem lokalen Branch `codex/pap-companion-v2`. Der aktuelle Website-Stand `e2454c4b236f7862d55b339a020bff86ecee645a` wurde zusammengeführt: neues Burger-Menü, dessen Fußbereich und die Kontaktseite sind enthalten. Diese übernommenen Website-Dateien wurden für den Companion nicht verändert. Keine Veröffentlichung oder Änderung des VIP-Workers.

## Erscheinungsbild und Bedienung

PAP steht tiefer (6 px Abstand zur nutzbaren Unterkante, einschließlich Safe Area) und ist kleiner: 122 px auf Desktop, 96 px auf schmalen Bildschirmen, 68 px bei sehr wenig Höhe. Ein kleiner weicher Bodenschatten und der dezente Schriftzug „PAP-BOT“ ergänzen die frei stehende Figur.

- Klick/Tap öffnet Sprechblasen; Enter oder „Senden“ stellt die Frage. Sechs anklickbare Themen stehen in der Sprechblase: Alpha, Java-IP, Bedrock, Packs, VIP und Discord. Ein bereits getippter Entwurf bleibt beim Anklicken eines Themas erhalten.
- Die Sprechblasen übernehmen dunkle Farben, goldene Akzente, Unschärfe und dezente Textbewegungen des aktuellen Burger-Menüs. Öffnet das Menü, wird das Gespräch ausgeblendet und die Bewegung pausiert; Entwurf und Gespräch bleiben erhalten. Ein Klick auf PAP schließt das Menü und zeigt das Gespräch wieder.
- Erneuter Klick oder Escape klappt ein; der Entwurf bleibt erhalten. Außerhalb schließen nur ohne Entwurf.
- Desktop ziehen ab 6 px, mit Pointer Capture und ohne anschließendes versehentliches Öffnen. Touch bleibt zunächst scrollbar; langes Halten öffnet Einstellungen und erlaubt anschließendes Ziehen, sofern der Browser die Touch-Geste noch nicht übernommen hat.
- Rechtsklick, langes Halten oder Shift+F10/Menütaste öffnet Textaktionen: Gespräch leeren, Position zurücksetzen, ruhig werden. Im Ruhemodus sitzt PAP mit geschlossenen Augen. Ein Klick weckt ihn.
- Verlauf ist begrenzt, aufklappbar und flüchtig; das Seiten-Neuladen löscht das Gespräch.

## Bewegung und Kosten

Sieben transparente 2D-Ebenen wurden lokal aus den bestehenden PAP-Bildern erstellt: Körper, zwei Ohren, Schwanz, normaler Arm, winkender Arm und Fellabschluss. Kleine verdeckte Anschlussflächen wurden lokal ergänzt. Originalatlanten und öffentliche Markenbilder bleiben unverändert. Keine Bildgenerierung, kostenpflichtigen Animationsdienste oder zusätzliche Bibliothek.

Ohrzucken (680 ms) und Schwanzwedeln (1,8 s) bewegen ausschließlich die jeweiligen Teile; der Körper bleibt stehen. Winken (1,54 s) hebt den vorhandenen Vorderarm und dreht die Pfote zum Besucher. Die ursprüngliche Vorderpfote wird vollständig mitgenommen: an ihrer Bodenposition bleibt keine zweite Pfote stehen. Die beiden Handansichten wechseln ohne Überblendung. Blinzeln (220 ms), neugierige Kopfneigung (1,05 s), kleiner Hopser (700 ms) und Ruhepose bleiben verfügbar.

Zufallsaktionen alle 12–28 Sekunden, seltene Gesten mit 90 Sekunden Pause, keine direkte Wiederholung. Nach drei Minuten ohne Interaktion verdoppeln sich die Abstände. Eingabe, Antwortsuche und Ziehen verdrängen Eigenaktionen; versteckte Tabs, reduzierte Bewegung, geöffnetes Navigationsmenü und Ruhemodus stoppen sie. Es gibt keinen dauernden JavaScript-Frame-Loop.

Zum gezielten Ausprobieren eingeben: „Kannst du winken?“, „Bewege deine Ohren“ oder „Wedel mit dem Schwanz“.

Lokale FAQ-Antworten und Kontextfolgefragen; kein ChatGPT-Anschluss, API-Key oder laufende KI-Kosten. Kopieraktion bestätigt erst den erfolgreichen Clipboard-Aufruf; bei Fehler wird die Adresse zum manuellen Kopieren gezeigt. Text wird als Text gerendert, ausgehende Links sind begrenzt. Beitritt, Zahlung und Tickets werden nicht vorgetäuscht.

## Prüfung

Astro-Prüfung und Produktionsbuild erfolgreich, ohne Fehler oder Warnungen. 50 gezielte Prüfungen in vier Skripten:

```text
npm run check
npm run build
node scripts/check-pap-helper.mjs
node scripts/check-pap-motion.mjs
node scripts/check-pap-position.mjs
node scripts/check-pap-renderer.mjs
```

Im realen Browser geprüft: native Bewegung der einzelnen Ebenen, keine doppelte Hand beim Winken, unveränderter Körper bei Ohr-/Schwanzbewegungen, Themenantworten, Erhalt des Entwurfs und Zusammenspiel mit dem aktuellen Burger-Menü nach dem Scrollen. Bei 320 und 390 px Breite sowie 320 × 360 px bleiben Eingabe und Themen erreichbar, ohne seitlichen Überlauf. Keine Browserfehler. Die GIF-Vorschau besteht aus tatsächlichen Browseraufnahmen der drei Gesten; keine synthetischen Zwischenbilder.

47 bestehende öffentliche Dateien sind per SHA-256 unverändert bestätigt. Keine Änderungen an VIP, Worker oder Zahlungsabläufen.

Keine echte Mobilgerät-Abnahme: Bildschirmtastatur, Touch-Langhalten/-Scrollen und Safari/iOS-Safe-Areas müssen auf einem echten Gerät noch bestätigt werden. Versteckter Tab/reduzierte Bewegung wurden in der kontrollierten Zustandssteuerung geprüft, nicht durch Ändern der Betriebssystemeinstellung. Keine Live-v2.1-Abnahme.

## Lieferung und Integration

Das Quellcode-ZIP enthält nur den Companion und seine gezielten Prüfungen. Die Patch-Datei basiert auf dem oben angegebenen aktuellen Website-Stand. Vorhandene neuere Website-Änderungen bei späterer Integration erhalten. Das Paket ersetzt kein vollständiges Repository und keine Abhängigkeiten.

`tools/build-companion-rig.py --website PFAD_ZUR_WEBSITE` baut die sieben Ebenen mit Python und Pillow aus den enthaltenen bestehenden Referenzen. Die Dateien im Liefermanifest begrenzen den Änderungsumfang. Die GIF- und Bildschirmvorschauen sowie das Manifest gehören zur separaten Lieferung.

Die lokale Vorschau läuft unter `http://127.0.0.1:19083/?v=21`. Erst nach visueller Freigabe über die bestehende Website-Pipeline veröffentlichen und Deployment sowie Live-Verhalten separat prüfen. Der VIP-Worker gehört nicht dazu.
