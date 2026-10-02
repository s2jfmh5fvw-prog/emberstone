# PAP Website Companion v4 – Fortsetzungsstand

Stand: 02.10.2026. Fortsetzung, kein Neustart. Die kontinuierliche v4-Figur ist jetzt an den bestehenden Astro-Website-Chat angeschlossen und lokal überprüfbar.

Vorschau: http://127.0.0.1:19083/
Checkout: C:\Users\licht\Documents\Codex\2026-10-01\er\work\emberstone-chatbot
Website: papsmp-website
Cloud: s2jfmh5fvw-prog/emberstone, Branch codex/pap-companion-v2

## Fertig

- Zwölf unveränderte v4-Bildteile, insgesamt 98.952 Byte; Canvas zeichnet die Posen direkt. Keine großen Animationsatlanten mehr im Website-Chat geladen.
- Ruhiges Atmen, Blinzeln, gedämpfter Blick zum Mauszeiger, einzelne Ohr- und Schwanzgesten, dreisekündiges Winken mit gegliedertem Arm, 1,65 Sekunden langer Hopser mit Vorbereitung und Landung.
- Ein einziger Gestenplaner: zufällige kleine Aktionen nach 12–28 Sekunden; Gruß und Hopser seltener. Beim Schreiben/Antworten keine Zusatzgesten, beim Ziehen still, bei geöffnetem Burger-Menü und verstecktem Dokument pausiert. Reduzierte Bewegung wird berücksichtigt.
- Kleine Figur mit Bodenschatten weiter unten; dezente PAP-BOT-Beschriftung. Desktop-Figurenfläche 144 px, schmale Ansicht 120 px, niedrige Fenster 88 px; der transparente Rand ist darin enthalten.
- Bestehender Chat: sechs Themen-Shortcuts, FAQ-Antworten, Verlauf, Entwurf, sichere Links, Java-Adresse kopieren, Verschieben, Ruhe und Einstellungen.
- Statisches Referenzbild als Fallback, falls die Animation nicht geladen werden kann. Abbau der Animation bei Astro-Seitenwechsel.
- Keine neue Abhängigkeit, kein kostenpflichtiger Dienst, keine externe KI. Antworten kommen weiterhin aus den PAP-Website-Informationen.

## Geprüft

50 FAQ-, Verhaltens-, Positions- und Renderer-Lifecycle-Prüfungen bestanden. Zusätzlich 1.089 Posen in neun Zuständen auf verankerte Pfote, Standfläche, verbundenen Schwanz, gültige Werte, Ruhe am Clipende und Sprungphasen geprüft. Astro-Prüfung: 0 Fehler, 0 Warnungen, 0 Hinweise; fünf Seiten gebaut.

Browser: Figur geladen; Java-Shortcut beantwortet; Winken über 24 zeitlich versetzte Bilder mit Pfotenhub 0 → 1 → 0; Burger-Menü pausiert bei unverändertem Bildzähler und erhält den Entwurf; nach Schließen läuft die Figur weiter; 390-px-Chat und sechs Shortcuts sichtbar; Verschieben um 120 px nach links/40 px nach oben ohne versehentliches Öffnen; Ruhe hält den Bildzähler an; keine Browser-Warnungen/Fehler beim abschließenden Lauf. Belege in browser-qa.json und den Screenshots.

47 öffentliche Marken-, Download- und Konfigurationsdateien stimmen mit dem bestehenden SHA-256-Baseline überein. Die standalone v4-, v3- und v2.1-Checkpoints wurden nicht verändert. Burger-Menü, Kontaktseite, VIP-Worker und Live-Seite wurden nicht bearbeitet.

Nicht nachgewiesen: reales Mobilgerät, echtes Betriebssystem-Umschalten von Reduced Motion, visuelle Nutzerfreigabe. Live-Veröffentlichung ist in diesem Schritt nicht erfolgt.

## Wieder aufnehmen

Zuerst diesen Stand öffnen, PAP im Website-Kontext beurteilen und auf Nutzerfeedback zu Charme, Gelenken und Größe reagieren. Für die große Figurenansicht bleiben die Dateien in outputs/PAP-Companion-v4 erhalten. Das Animationsmodell der Website liegt in src/scripts/pap-native.js und pap-native-math.js, der Chat und seine Zustandsregeln bleiben in pap-helper.ts/pap-motion.ts.

Im Website-Verzeichnis: npm run check, die fünf scripts/check-pap-*.mjs ausführen, npm run build. Anschließend den dist-Ordner lokal auf Port 19083 bereitstellen. Keine Zugangsdaten in Dokumente oder Sicherungen übernehmen. Cloud-Checkpoint und lokale Änderungs-ZIP sichern eine spätere Fortsetzung; nicht mit einer Veröffentlichung auf papsmp.de verwechseln.
