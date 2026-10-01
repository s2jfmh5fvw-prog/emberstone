# PAP Companion v2 – umsetzbarer Plan für den Work-Agenten

## Auftrag und Zielbild

Entwickle den bestehenden Website-Helfer auf papsmp.de zu einem hochwertigen kleinen PAP-Companion weiter. Ausgangspunkt ist die freigegebene Variante A. Er soll wie eine kleine Figur auf der Seite wirken: aufmerksam, verspielt, hilfreich und angenehm ruhig. Der Chat entsteht direkt an PAP in Sprechblasen.

Die aktuelle Aufgabe ist zunächst Planung. Der erste spätere Umsetzungsschritt ist eine lokale oder isolierte Vorschau; dieser Plan löst keine Produktionsänderung aus.

## 1. Ausgangsstand prüfen und sichern

Prüfe den tatsächlich aktiven Website-Stand und die Änderungen im Codespace, bevor du Dateien bearbeitest. Vorhandene Arbeiten und uncommittete Änderungen anderer Aufgaben erhalten. Kein Neustart des Projekts.

Im bisherigen Astro-Stand sind PapHelper.astro, pap-helper.ts für Verhalten und Antworten, pap-helper.css sowie die Atlanten pap-poses-v1.png und pap-smooth-v1.png vorhanden. Bestätigte Inhalte kommen aus faq.ts und site.ts. Diese Namen sind Einstiegspunkte, keine Aufforderung, einen inzwischen neueren Stand zu überschreiben.

Sichere die erlaubten Änderungsdateien. Bestehende Markenmaster, Resourcepacks, Downloads, VIP-Worker und Zahlungsfunktionen bleiben außerhalb dieser Änderung.

## 2. Figur und Bedienung

Im Ruhezustand ist ausschließlich die freigestellte PAP-Figur sichtbar: kein Sockel, Hintergrundkasten, dauerhafter „PAP fragen“-Text, Statuspunkt, Launcher-Badge, Themenbuttons oder schwebende Werkzeugleiste.

Ein kurzer Klick oder Tap auf PAP öffnet eine kompakte Frage-Sprechblase. Enter sendet; auf dem Handy die Senden-Taste der Bildschirmtastatur. Erneuter Klick auf PAP oder Escape klappt das Gespräch ein. Ein Klick außerhalb darf nur schließen, wenn kein ungesendeter Text verloren geht.

Desktop: PAP lässt sich ziehen. Ab etwa 6 px Bewegung beginnt Drag statt Klick; Pointer Capture nutzen und nach Drag kein Chat öffnen. Auf Touch-Geräten zunächst Tap und normales Scrollen zuverlässig halten; Ziehen nur nach bewusstem langen Halten aktivieren.

Die Position bleibt im sichtbaren Bereich. Beim Chatten bleibt PAP stehen. Sprechblasen folgen der Figur, wechseln bei Platzmangel die Seite und berücksichtigen Bildschirmtastatur und Safe Areas.

„Keine Buttons“ bedeutet keine sichtbaren Schaltflächenkästen. Der transparente Hitbereich der Figur bleibt semantisch ein zugänglicher Button mit Tastaturfokus und Beschriftung. Fokusmarkierung erscheint bei Tastaturbedienung.

Ein Kontextmenü erscheint nur auf ausdrücklichen Wunsch: Rechtsklick, langes Halten oder Tastatur-Menütaste. Als schlichte Textaktionen innerhalb einer Sprechblase: Gespräch leeren, Position zurücksetzen, ruhig werden. „Ruhig werden“ lässt PAP still sitzen; Anklicken weckt ihn wieder.

## 3. Sprechblasen im Website-Stil

Ersetze das rechteckige Chatpanel mit Kopfzeile durch einen kleinen Gesprächsverbund an PAP. Maximal zwei bis drei Nachrichten sind gleichzeitig prominent sichtbar. Ein lesbarer Verlauf lässt sich innerhalb der aktiven Blase aufklappen und scrollen.

PAP spricht in einer Blase mit einem kurzen Schweif zur Figur. Die eigene Frage erscheint kleiner daneben. Die Eingabe ist eine temporäre Sprechblase; sie verschwindet zusammen mit dem Gespräch.

Übernimm die tatsächlichen CSS-Tokens und Schriftfamilien der aktiven Website: dunkle Obsidianflächen, helle Schrift, zurückhaltende Gold-/Violettakzente. Oberfläche und Text müssen lesbar bleiben. Keine neuen Neonrahmen, großen Glows, fremden Systemschrift-Karten oder permanenten Beschriftungen. Fließtext bleibt gut lesbar, auch wenn Überschriften der Website eine dekorative Schrift nutzen.

Zeige „FAQ-Helfer; keine externe KI“ einmal unaufdringlich beim ersten geöffneten Gespräch und in der abrufbaren Information. Keine dauerhafte Fußzeile unter PAP.

## 4. Kostenfreie Animation

Verwende vorhandene PAP-Grafiken und native Browsertechnik: CSS, Web Animations API, kleine TypeScript-Steuerung und bei Bedarf einen selbst erstellten 2D-Layer-Aufbau. Keine kostenpflichtige Bild-/Videoerzeugung, keine externen Animationsdienste oder laufenden KI-Aufrufe.

Prüfe zunächst, welche bestehenden Frames sauber registriert und anatomisch stimmig sind. Gleiche Bodenpunkt, Größe und Ausrichtung ab. Die bisher ausgelassene Pose mit wechselnder erhobener Pfote nicht ungeprüft aktivieren.

Für feinere Bewegung leite aus vorhandener, geeigneter Referenz editierbare Ebenen ab: Körper, Kopf, Augenlider, Ohren, Schwanz und gegebenenfalls Vorderpfote. Trenne nur Teile, deren Überlappungen sauber hergestellt werden können. Geeignete kostenlose lokale Bild-/Vektorwerkzeuge oder manuelle SVG-Arbeit sind erlaubt. Ein SVG muss die PAP-Identität erhalten; kein vereinfachter Ersatzfuchs.

Verwende Sprite-Sequenzen für stärkere Gesten, kontinuierliche Layer-Bewegung für feine Details. Keine sichtbaren Doppelkonturen durch lange Überblendungen; Frames mit verändertem Gesicht nicht weich übereinanderlegen. Bewegungen brauchen Vorbereitung, eigentliche Aktion und ruhigen Ausklang.

| Aktion | Ziel und ungefährer Umfang |
| --- | --- |
| Blinzeln | 0,15–0,3 s; vorhandene Lidframes, gelegentlich Doppelblinzeln |
| Ohren lauschen | 0,4–0,8 s; kleine echte Ohrbewegung, kein Ganzkörperwackeln |
| Schwanz bewegen | 1–2 s; ruhiger Bogen am richtigen Ansatz |
| Neugierig schauen | 0,8–1,4 s; Kopf leicht neigen, kurze Pause, zurück |
| Begrüßen | 1–1,8 s; klare Pfotengeste aus vorhandenen passenden Frames |
| Sich freuen / ausruhen | kurzer kleiner Hopser bzw. geschlossene Augen und ruhige Haltung |

Ohren-/Schwanzbewegung hängt von einem sauberen Layer-Aufbau ab. Wenn dieser mit der Referenz nicht überzeugend gelingt, liefere zuerst die guten vorhandenen Gesten und kennzeichne den Rest als Ausbau. Keine angeblich fertige Animation aus reinem Pan/Zoom oder Glühen.

Markentreue: cremefarbenes Fell, dunkle Ohren/Pfoten, violette Akzente, genau ein Schwanz. Frontal bernsteinfarbenes Auge links im Bild, violettes rechts. Nicht blind spiegeln.

## 5. Verhalten und Persönlichkeit

Trenne Bewegungsdarstellung, Verhalten und FAQ-Antworten. Implementiere eine kleine Zustandssteuerung: ruhig, aufmerksam, gezogen, Frage eingeben, FAQ beantworten, freuen, ausruhen.

Priorität: Ziehen und aktive Eingabe vor direkter Reaktion, direkte Reaktion vor Zufallsaktion. Aktionen überlappen sich nicht. Timer und Animationen bei Zustandswechsel sauber abbrechen.

Zufällige Eigenaktionen ungefähr alle 12–28 Sekunden, gewichtet: oft blinzeln, manchmal neugierig schauen oder Schwanz bewegen, selten winken/hüpfen. Wiederholungen vermeiden; Winken/Hüpfen mit längeren Sperrzeiten. Bei aktiver Texteingabe keine ablenkende Bewegung. Bei längerer Ruhe nimmt die Aktivität ab.

Eine sanfte Blickreaktion erfolgt nur bei Mausnähe zur Figur. Kein dauerhaftes Verfolgen über die ganze Seite, keine unkontrollierte Wanderung. Reaktionen sollen innerhalb weniger Zehntelsekunden beginnen.

Einmaliger Hinweis nach einer ruhigen Anfangsphase: „Brauchst du eine Pfote beim Einstieg?“ Kontexttipps nur selten und passend, etwa im Downloadbereich. Höchstens ein proaktiver Hinweis pro Seitenbesuch im ersten Prototyp. Keine ungefragten Witze oder wechselnden Werbetexte.

## 6. Nützliche Helferfunktionen

Erhalte die bestätigten FAQ-Antworten. Formuliere sie kürzer und freundlicher; unbekannte Fakten bleiben unbekannt. Folgefragen dürfen sich auf das zuletzt erkannte Thema beziehen, etwa „und Bedrock?“ nach einer Java-Frage.

Als kleine Werkzeuge kann PAP zur richtigen Website-Sektion führen, die Java-Adresse nach ausdrücklicher Nutzeraktion kopieren und die passenden Resourcepack-Downloads erklären. Aktionen erscheinen als Textlinks innerhalb der aktiven Sprechblase. „Adresse kopiert“ erst nach erfolgreichem Clipboard-Aufruf anzeigen; bei Fehler die Adresse zum manuellen Kopieren ausgeben.

PAP kann auf Bitte einen Witz erzählen. Er darf keine Anmeldung, Zahlung, Ticket-Erstellung oder Serverfreischaltung vortäuschen. Chatnachrichten bleiben flüchtig; keine externe KI-Anbindung und keine API-Kosten. Eine spätere KI-Anbindung ist eine getrennte Entscheidung.

## 7. Technik und Prüfung

Bleibe bei Astro und schlankem TypeScript. Nutze Browser-Animationen statt einer schweren zusätzlichen Engine. Pointer Events für direkte Interaktion; kleine getrennte Module für Zustand, Darstellung, Position und Dialog.

Das Overlay fängt außerhalb von PAP und geöffneten Blasen keine Klicks oder Scrollgesten ab. Keine Animationen in verborgenem Tab oder bei reduzierter Bewegung; ruhiger Modus stoppt Eigenaktionen. Kein dauerhafter JavaScript-Frame-Loop für einen stillen PAP.

Zielbudget vor Transportkompression: Companion-Code samt Antwortdaten höchstens ungefähr 25 KB; Grafikpaket möglichst unter 500 KB, höchstens ungefähr 750 KB. Zusätzliche Grafiken verzögert laden. Tatsächliche Größen messen, statt Zielwerte als Ergebnis auszugeben.

Prüfe Desktop und 320/390 px breite Handyansichten: Tap, Drag ohne versehentliches Öffnen, Scrollen, Bildschirmtastatur, lange Antworten, lange Links, Tastaturbedienung, Fokus, Ruhemodus, Tabwechsel und reduzierte Bewegung. Frageinhalte als Text rendern. Zustandskonflikte und Timer mit kontrollierbarer Uhr testen; visuelle Qualität zusätzlich im Browser prüfen.

## 8. Lieferfolge und Abnahme

Erste Lieferung: eine überzeugende Vorschau auf dem aktuellen Website-Hintergrund. Zeige PAP allein, eine eigenständige kurze Aktion ohne Hover und eine vollständige Frage-Antwort-Interaktion in Sprechblasen. Wenn zwei Grafikrichtungen nötig sind, höchstens zwei gut ausgearbeitete Varianten: bestehender Raster-PAP und eine referenztreue 2D-Layer-Variante.

Liefere Screenshots und eine kurze echte Browseraufnahme, falls das vorhandene kostenlose Aufnahmeverfahren verfügbar ist. Ein statischer Screenshot belegt keine Bewegung. Fehlende Aufnahme ehrlich benennen und die interaktive Vorschau zum Prüfen bereitstellen.

Abnahmekriterien: PAP ist ohne permanente UI als Helfer bedienbar; mindestens drei überzeugende kurze Gesten; feine Bewegung nur mit sauberen Ebenen; automatische Aktion ohne Hover; Sprechblasen passen zur Website und bleiben im Bildschirm; FAQ und Werkzeuge funktionieren; keine zusätzlichen kostenpflichtigen Dienste; keine Behinderung der Website.

Erst nach visueller Freigabe die neue Companion-Oberfläche in die Live-Seite übernehmen. Veröffentlichung über die vorhandene Website-Pipeline, mit Prüfung des erfolgreichen Cloudflare-Deployments und des Live-Verhaltens. Der VIP-Worker gehört nicht zu diesem Deployment.
