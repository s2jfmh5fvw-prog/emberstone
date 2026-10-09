# PAP SMP – umgesetzte Korrekturen und Qualitätsverbesserungen

**Alpha v1.0 RC1, Ressourcenrevision 3.2.9, Visual-Addon 0.3.0-alpha.**
Die fünf gelieferten Originale bleiben unverändert und sind zusätzlich in einem
getrennten Arbeitsbackup mit SHA-256 gesichert. Alle vorhandenen PNG-Dateien,
HUD-Masken, die PAP-Grafiken und die Pack-UUIDs bleiben bytegleich erhalten.

## Was geändert wurde

| Bereich | Vorher | Neue Fassung |
|---|---|---|
| Bedrock-Totem | Slotbindung unter Geometrieschema 1.12.0; keine eigene Handhaltung | Unterstütztes Schema 1.16.0, explizite Haupt-/Nebenhand und Ego-/Drittperson-Haltungen |
| Bedrock-Modelle | Abweichende X-Koordinaten, Drehungen und Ober-/Unterseiten-UVs | Alle 15 Custom-Geometrien aus den vorhandenen Java-Modellen abgestimmt, einschließlich Ohr-/Schwanz-Pivots und Totemkontur |
| Companion-Helmteile | Kein expliziter Ausgleich des gebundenen Kopfkoordinatenraums | Gemeinsame Kopfslot-Haltung; Sichtgrenzen berücksichtigen die angehobenen Teile |
| Java-Totem im Inventar | Vollständiges 3D-Konturmodell in der GUI | Ein flaches Element mit Vorder-/Rückfläche und vorhandener Frontgrafik; das gehaltene 3D-Modell bleibt bytegleich |
| Bedrock-Packprüfung | Feste Erwartung 3.2.7 bei gelieferten Packs 3.2.8 | Release-Metadaten mit UUID, Version und exaktem SHA-256; verbundene Sitzung und erzwungene Packs erforderlich |
| Java-Packprüfung | Fest eingetragene Pack-ID und frühe Bestätigung ohne nutzbaren Callback | Tatsächliche Paper-Pack-ID anhand Release-SHA-1 erkennen; gezielte Bestätigung über Paper nach Beitritt |
| PAP-/Bo-Skins | Beide hängen von derselben Packbereitschaft ab | Gemeinsame Prüfung korrigiert; vorhandener Bo-Renderer im unveränderten Companion 1.1.2 genutzt |
| PAP-Last | Acht Java- und acht Bedrock-Teile auch bei nur einer Edition | Nur benötigte Edition erzeugen: 10 statt 18 Hilfsobjekte, 44,4 % weniger; gemischte Sitzungen behalten beide Darstellungen |
| Laufzeitqualität | Wiederholte Integrationssuche und unklare Fehlersignale | Zwischengespeicherte Methoden/Packprüfungen, begrenzte Diagnosemeldungen, Original-Fallback und eigenes Konfigurationsneuladen |
| Guide/Veröffentlichung | Beschädigter Gedankenstrich und veraltete Versionsangaben | Korrektes UTF-8, konsistente Packkopien, reproduzierbare Archive und Installations-/Rollback-Angaben |

Bo ist im gelieferten Visual-Addon kein eigener Renderer. Die anschließend
ermittelte Companion-1.1.2-Quelle enthält ihn bereits und nutzt die gemeinsame
assetsReady-Prüfung. Deshalb wurde kein zweiter Bo-Renderer ergänzt und keine
Companion-KI ersetzt. Dass gerade euer Produktivserver dieselbe Version benutzt,
muss beim Einspielen geprüft werden.

## Nachweise und ihre Grenzen

- **2811 statische Einzelprüfungen bestanden:** JSON ohne doppelte Schlüssel,
  Java-Verweise gegen den offiziellen 1.21.11-Client, Bedrock-Verweise/UV-Grenzen,
  Cube-Koordinaten/Pivots/Drehungen gegen die Java-Vorlagen, unveränderte PNGs,
  identische Travel-Assets und unveränderte Downloads.
- **55 Laufzeitprüfungen bestanden**, ohne Fehler in diesem abschließenden
  Testlauf. Verwendet wurden Paper 1.21.11, Java 21, Geyser 2.11.3-b1247,
  ViaVersion 5.12.0 und der unveränderte Companion 1.1.2.
- Java-Protokollclient 1.21.11 und Bedrock-Protokollclient 1.26.51 haben die tatsächlichen
  Packbytes empfangen und ihre Hashes überprüft. Geyser registriert alle **28** erwarteten
  Custom-IDs. Alle **12** verwendeten PAP-/Bo-Helmteil-Varianten einschließlich
  Schlafkopf wurden als passende Custom-Items im Bedrock-Datenstrom nachgewiesen.
- Geprüft wurden automatische Bereitschaft, PAP/Bo, getrennte und gemischte Editionen,
  Schlaf-/Namensdaten, Wiederherstellung nach simuliertem Java-Packfehler,
  fehlender Bypass, Neuladen sowie vollständiges Aufräumen. Negative Java-Statusfälle
  wurden als Bukkit-Ereignisse injiziert; der normale Download/Bestätigungspfad
  lief über die tatsächliche Verbindung.
- Pack-Neubau und unabhängig sauber kompilierte Addon-JAR sind bytegleich.
  Archive und Standalone-/Overlay-Kopien werden abschließend auf CRC und Hash geprüft.

Die Protokollclients zeichnen keine Bilder. Damit sind Packtransport, Zuordnung und
Serververhalten belegt, jedoch noch keine sichtbare Totem-Handposition, perfekte
PAP-/Bo-Pose oder grafische Menü-/HUD-Abnahme. Windows/Java sowie Bedrock-Desktop,
Mobilgerät und Konsole benötigen die Sichtprüfung. Auch Floodgate-Authentifizierung,
zusätzliche produktive Packversender/Geyser-Erweiterungen und der echte Host wurden
hier nicht getestet. Die vollständigen 81 bisherigen Abnahmeszenarien bleiben
nachweisbezogen erhalten; grafische Tests werden durch statische Belege nicht geschlossen.

## Unmittelbar verbleibende Abnahme

Zuerst Totem in Haupt- und Nebenhand, Ego- und Drittpersonansicht sowie Auslösung
ansehen. Danach PAP/Bo von vorn, hinten und seitlich prüfen, einschließlich Laufen,
Sitzen/Schlafen, Namensanzeige und Rejoin. Abschließend Rüstung/Elytra, sämtliche
Herz-/Hungerzustände, Travel-Symbole und Startmenü auf den tatsächlich unterstützten
Geräten prüfen. Alpha v1.0 erhält erst danach den endgültigen Freigabestatus.

Weitere Raster-Neugestaltung, ein Austausch des Manga-Menüs oder eine neue PAP-
Identität sind in diesem Kandidaten nicht enthalten. Die vorhandenen Inhalte wurden
gezielt technisch verbessert; Bildänderungen wären nach der Sichtprüfung gesondert
zu bewerten. Vorhandene Peace-/Purge-Farben und Glanzvorgaben bleiben erhalten.

Die unterstützte Bindung/Animationsstruktur folgt der [Microsoft-Attachable-Referenz](https://learn.microsoft.com/en-us/minecraft/creator/documents/attachables?view=minecraft-bedrock-stable).
Koordinaten- und UV-Konventionen wurden mit dem [Geyser-Rainbow-Konverter](https://github.com/GeyserMC/Rainbow/blob/master/rainbow/src/main/java/org/geysermc/rainbow/mapping/geometry/GeometryMapper.java) abgeglichen.
