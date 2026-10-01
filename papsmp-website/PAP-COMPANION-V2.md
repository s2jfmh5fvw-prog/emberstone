# PAP Companion v2 — Vorschau

Fortsetzung von Variante A auf Commit `605d459026f676d953c90aa4bb95ffc4e3ca8c11`, separater lokaler Branch `codex/pap-companion-v2`. Die nicht veröffentlichten Änderungen im Codespace wurden nicht übernommen oder überschrieben. Vor einer späteren Integration den dann aktuellen Website-Stand prüfen und Änderungen zusammenführen.

## Bedienung

- Nur PAP ist im Ruhezustand sichtbar. Klick/Tap öffnet Sprechblasen, Enter bzw. die mobile Senden-Taste stellt die Frage. Der sichtbare Senden-Text besitzt keinen Schaltflächenkasten.
- Erneuter Klick oder Escape klappt ein; der Entwurf bleibt erhalten. Außerhalb schließen nur ohne Entwurf.
- Desktop ziehen ab 6 px, mit Pointer Capture und ohne anschließendes versehentliches Öffnen. Touch bleibt zunächst scrollbar; langes Halten öffnet Einstellungen und erlaubt anschließendes Ziehen, sofern der Browser die Touch-Geste noch nicht übernommen hat.
- Rechtsklick, langes Halten oder Shift+F10/Menütaste öffnet Textaktionen: Gespräch leeren, Position zurücksetzen, ruhig werden. Im Ruhemodus sitzt PAP mit geschlossenen Augen. Ein Klick weckt ihn.
- Verlauf ist begrenzt, aufklappbar und flüchtig; das Seiten-Neuladen löscht das Gespräch.

## Animation und Kosten

Vorhandene PAP-Illustrationen wurden lokal beschnitten, von isolierten Alpha-Artefakten bereinigt und auf gemeinsame Höhe und Bodenlinie registriert. Keine Erzeugung neuer Bilder oder kostenpflichtige Dienste. Neutralframe 11 ersetzt den am rechten Fuß abgeschnittenen Frame 0; die anatomisch abweichende Pfote in Frame 6 wird nicht abgespielt. Die Originalatlanten bleiben unverändert.

Blinzeln (220 ms), neugierige Kopfneigung (1,05 s), Winken (1,37 s), kleiner Hopser (700 ms) und stille Ruhepose sind vorhanden. Keine überblendeten Doppelbilder. Zufallsaktionen alle 12–28 Sekunden, seltene Gesten mit 90 Sekunden Pause, keine direkte Wiederholung. Nach drei Minuten ohne Interaktion verdoppeln sich die Abstände. Eingabe, Antwortsuche und Ziehen verdrängen Eigenaktionen; versteckte Tabs, reduzierte Bewegung und Ruhemodus stoppen sie. Es gibt keinen dauernden JavaScript-Frame-Loop.

Einzelne echte Ohr- und Schwanzbewegungen sind **Ausbau**, kein fertiger Layer-Rig. Die Rasterreferenz bietet dafür keine zuverlässig verdeckten Gelenkflächen. Die vorhandenen Sprite-Gesten sind die ausdrücklich im Plan erlaubte erste Umsetzung. Kleine Unterschiede zwischen den gezeichneten Frames bleiben bei der visuellen Abnahme zu beurteilen.

Lokale FAQ-Antworten und Kontextfolgefragen; kein ChatGPT-Anschluss, kein API-Key und keine laufenden KI-Kosten. Kopieraktion bestätigt erst den erfolgreichen Clipboard-Aufruf; bei Fehler wird die Adresse zum manuellen Kopieren gezeigt. Text wird als Text gerendert, ausgehende Links sind begrenzt. Beitritt, Zahlung und Tickets werden nicht vorgetäuscht.

## Prüfung

`npm run check`, `npm run build`, `node scripts/check-pap-helper.mjs`, `node scripts/check-pap-motion.mjs`, `node scripts/check-pap-position.mjs`.

37 gezielte Prüfungen für FAQ/Kontext, Uhr/Timer, Unterbrechung, keine Überlappung, seltene Gesten, ausgeschlossene Pose, Ruhe, Positionsgrenzen und Größenwechsel. Astro: keine Fehler/Warnungen. Browser: Sprechblasen/FAQ/Kopieren, Abschnittslink, Entwurf/Escape, Kontext/Ruhe, Desktop-Drag, 320/390 px und wenig Höhe. Eigenaktion ohne Hover sowie Winken und Neugier wurden im realen Browser erfasst.

Keine echte Mobilgerät-Abnahme: Bildschirmtastatur, Touch-Langhalten/-Scrollen und Safari/iOS-Safe-Areas sind implementiert und teilweise durch Positionsprüfungen abgedeckt, müssen auf einem echten Gerät noch bestätigt werden. Versteckter Tab/reduzierte Bewegung wurden in der kontrollierten Zustandssteuerung geprüft, nicht durch Ändern der Betriebssystemeinstellung. Keine Live-v2-Abnahme.

## Integration

Nur die Dateien im Liefermanifest verändern. ZIP als gezielte Quelle verwenden; vorhandene neuere Website-Änderungen erhalten. Originalgrafiken, öffentliche Markenassets und Downloads sind durch Hash-Vergleich unverändert bestätigt; keine Worker-/VIP-/Zahlungsänderung.

Nach visueller Freigabe über die vorhandene Website-Pipeline veröffentlichen. Deployment und Live-Verhalten dann separat prüfen. Der VIP-Worker gehört nicht dazu. Das ZIP ersetzt kein vollständiges Repository und keine Abhängigkeiten.
