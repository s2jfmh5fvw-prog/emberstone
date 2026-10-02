# Ausführbarer Entwicklerauftrag: PAP Animation v3

## Priorität 1 — animierten PAP erstellen

Erstelle einen kurzen, hochwertigen PAP-Companion als eigenständiges Animationsasset. Ziel ist der lebendige, zurückhaltende Charme eines kleinen Desktop-Companions wie Mini: Aufmerksamkeit, Antizipation, Gewichtsverlagerung, Blinzeln und ein freundlicher kurzer Gruß müssen als zusammenhängendes Verhalten erkennbar sein. Mini ist eine Referenz für Timing und Charakterwirkung; PAP behält seine eigene Gestalt und Marke.

Bewahre die freigegebene PAP-Identität: cremefarbenes Fell, kantige Fellzeichnung, orange/violette Augen und Akzente, dunkle Pfoten und der große buschige Schwanz. Verwende bestehende PAP-Referenzen. Bestehende Originale und der gesicherte Website-Stand werden nicht überschrieben.

Umsetzung ausschließlich lokal mit vorhandenen Werkzeugen und kostenloser 2D-Animation. Keine externen kostenpflichtigen Video-/Bilddienste, keine API-Schlüssel und keine bezahlte Chat-Anbindung. Liefere transparente Bilder und einen kleinen Browser-Player ohne neue Laufzeitbibliothek.

Animierte Zustände:
1. Idle: ruhiges Atmen, versetztes Blinzeln, gelegentliche Aufmerksamkeit, sekundäre Ohr-/Schwanzbewegung; kein dauerndes Wippen.
2. Greeting: erst Blickkontakt und Gewichtsverlagerung, dann Anheben eines Vorderarms, zwei kleine Pfotengesten, Rückkehr und Nachschwingen. Schulter, Ellbogen und Pfote wirken gemeinsam; keine zweite Pfote am Boden.
3. Curious/listening: Kopf leicht neigen, ein Ohr reagiert, ein kurzer Blick, Rückkehr zur neutralen Pose.
4. Thinking: Blick nach oben/seitlich, ruhige kleine Kopfbewegung, spätes Blinzeln.
5. Answer: kurzer freundlicher Blick/Nicken mit ruhiger Folgebewegung.

Arbeite mit definierten Gelenken, kurzen Übergängen, echten Zwischenposen und zeitlich versetztem Nachschwingen. Kein reines Verschieben oder Drehen der gesamten Figur als Ersatz für Charakteranimation. Kopf, Brust, Armabschnitte, Pfote, Ohren und Schwanz müssen nachvollziehbar aufeinander reagieren. Halte Füße und Bodenlinie stabil, außer bei ausdrücklich gestalteter Verlagerung. Kein Crossfade zwischen verschiedenen Figurenzeichnungen, keine zusätzlichen Gliedmaßen, abgeschnittenen Konturen oder sichtbaren Gelenklücken.

Die kurze Gesamtvorschau zeigt PAP ohne Chatfenster, Texte oder Schaltflächen an der Figur. Ein kleiner Bodenschatten darf in der gesonderten Vorschau liegen; exportierte Figurenbilder bleiben transparent und der Schatten wird separat behandelt. Zeige sowohl die Einzelzustände als auch eine automatische Folge. Browser-Steuerung für die Abnahme darf als getrenntes Bedienfeld erscheinen.

Lieferung: ausführbarer Prompt, transparente animierte WebP/APNG-Dateien, Browser-Spriteatlanten mit Zustandsmanifest, schlanker Player, GIF zur direkten Sichtprüfung, dokumentierter Erstellungsweg und QA-Nachweis. Prüfe echte Transparenz, nichtleere/verschiedene Frames, Bildgrenzen, zeitlichen Ablauf, neutrale Anschlussposen und Wiedergabe im Browser. Beschreibe ehrlich, dass dies eine lokale 2D-Animation aus bestehenden Bildern ist und kein neu gerendertes 3D-Modell.

## Priorität 2 — später in den Website-Chat integrieren

Die bisherige Website-Chatbot-Entwicklung bleibt gesichert und wird in diesem Auftrag nicht weiterentwickelt oder veröffentlicht. Nach visueller Beurteilung der neuen PAP-Animation können die Zustände an die vorhandenen FAQ, Eingabe-/Antwortzustände, Themen-Shortcuts und zufälligen Eigenaktionen angeschlossen werden. Bestehendes Burger-Menü, Entwürfe, Barrierefreiheit und reduzierte Bewegung erhalten. Main, Cloudflare, VIP-Worker, Zahlungsabläufe und Original-Markenassets bleiben während der Animationsproduktion unberührt.

## Arbeitsweise

Prompt jetzt ausführen, zuerst vorhandene Referenzen prüfen, lokal produzieren und eine benutzbare Vorschau liefern. Bei sichtbaren Gelenk-/Pfotenfehlern vor Lieferung korrigieren. Die visuelle Zustimmung zum Ergebnis nicht vorwegnehmen. Fortsetzung, kein Neustart.
