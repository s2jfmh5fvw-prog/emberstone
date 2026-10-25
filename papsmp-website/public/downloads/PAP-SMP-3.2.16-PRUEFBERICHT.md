# PAP SMP Ressourcenstand 3.2.90 – Prüfbericht

Stand: 25.10.2026. Abschlussstand für den bestehenden Alpha-Test. Dieser Bericht unterscheidet Dateiprüfungen, lokale Paper-Prüfungen und tatsächlich geöffnete Spielclients. Er ist keine pauschale Freigabe für sämtliche Geräte und Lastszenarien.

## Änderungen

Peace erhält die offene goldene Krone, Purge eine dunkel gepixelte Banditenmaske. Die Maske verwendet gröbere Stoffpixel und sitzt unter den Augen. Nur diese beiden eigenen Rüstungsteile und deren Rezepte bleiben. Die sechs Körperteilrezepte entfallen; vorhandene Gegenstände werden nicht gelöscht. Der bestehende Factions-Ablauf erkennt jetzt den passenden Helm allein. Die Zutaten der Helmrezepte bleiben erhalten.

Schinken erhält ein eigenes Chibi-Babyschwein-Modell mit großem Kopf, kompaktem Körper, kurzen Hufen, kleiner Ringelrute, Cowboyhut und Lederhalsband. Die nach Nutzerhinweis beanstandete Fassung 3.2.89 ist ersetzt: Augen sind ausschließlich auf der Vorderseite des Kopfes, Nasenlöcher ausschließlich auf der Vorderseite einer einzigen Schnauze. Die neue Baby-Textur wurde eigens erzeugt und auf die gemeinsam verwendeten Java-/Bedrock-Flächen verteilt. Normale Schweine werden nicht umtexturiert.

Die angenommenen PAP-/BO-Modelle, Schutzanlagen, PAP-Totem, das Herz mit Puls und die Phönix-Elytra bleiben enthalten. Die bestätigten Bewegungsanpassungen von PAP und BO sind mit dem Schinken-Plugin zusammengeführt. Drei passende Serverplugins gehören zum Update: Companion 1.2.0-schinken.pap.1, Companion-Visual 0.5.1-schinken.90 und DefenseTrap 1.1.5-ward-r001. Andere bestehende Plugins werden nicht ersetzt.

## Tatsächlich geprüft

- Java- und Bedrock-Archive: ZIP-Integrität, keine doppelten Dateinamen, alle JSON-Dateien lesbar, alle PNG-Dateien lesbar. Java: 295 Dateien; Bedrock: 247 Dateien.
- Alle sechs Schinken-Teile: Modell-/Texturpfade, gültige UV-Bereiche, eindeutige Geyser-Zuordnungen und passende Bedrock-Geometrien. Keine Überschreibung der gewöhnlichen Schweine.
- Frühere angenommene Texturen bleiben bytegleich; Ausnahmen sind die ausdrücklich ersetzten Helm-Icons und entfernte eigene Körperrüstungen. Vorhandene Server-Mapping-Definitionen bleiben bis auf die genehmigte Rüstungsänderung funktional enthalten.
- Die bestehenden PAP-/BO-Klassen im Visual-Plugin bleiben bytegleich. Im Companion-Plugin bleiben Schinken-Klassen gegenüber der gesondert geprüften Lieferung bytegleich; die angenommenen PAP-/BO-Korrekturen wurden gezielt ergänzt.
- Krone und Maske in echten Java- und Bedrock-Clients: Vorderseite, Rückseite und Inventar. Die lokale Vergleichsseite enthält zwölf unveränderte Nachher-Aufnahmen sowie zwölf Vorher-Aufnahmen. Helmtexturen und -geometrien sind in 3.2.90 gegenüber diesem Aufnahmestand unverändert.
- Lokales Paper: beide Helmrezepte registriert, sechs alte Körperrezepte nicht mehr registriert, Helm allein löst die vorhandene Fraktionszuordnung aus. Migration eines alten Helms behielt Verschleiß 37 und Schutz IV.
- Gesonderte Schinken-Basisprüfung: sieben automatisierte Tests und 46 tatsächliche Paper-Prüfungen, unter anderem Besitz, fremde Reiter, Vertrauensentzug, zwei Reiter, Kampf-Absteigen, sichere Ziele, Ein-Block-Stufe, Pflege, Kauf für 500 Shards und Persistenz. Gemessene Geschwindigkeit 4,53285 Blöcke/Sekunde bei Referenz 4,317; rund fünf Prozent Aufschlag.
- Echte Java-Sitzung: Pack angenommen, korrektes Pack bestätigt; eigenes Modell, Aufsteigen, automatische Annäherung an ein gewöhnliches Schwein und Ein-Block-Stufe mit tatsächlichem Spieler als Reiter. Die neue Baby-Textur aus 3.2.90 wurde zusätzlich von vorn und seitlich angesehen und aufgenommen.
- Echte Windows-Bedrock-Sitzung über Geyser: Pack 3.2.90 mit passendem Hash bestätigt; neues Baby-Modell mit einer Schnauze und Hut angezeigt; Rechtsklick-Aufsteigen mit dem endgültigen Modell. Automatische Fahrt von der unteren Ebene über die Ein-Block-Stufe auf Y=66 mit tatsächlichem Bedrock-Reiter; anschließend Weiterfahrt auf die obere Plattform. Die manuelle Bedrock-Bewegung hat der Nutzer ebenfalls ausdrücklich bestätigt.

## Grenzen und noch ausstehende Abnahmen

Die Messung und die 46 Paper-Prüfungen betreffen die Schinken-Basis; die Zusammenführung wurde zusätzlich per Klassenvergleich und den genannten lokalen Client-Prüfungen abgesichert. Daraus folgt keine vollständige erneute Abnahme aller Gameplay-Fälle im endgültigen Gesamtpaket.

Manuelle Java-Dauersteuerung, Touch- und Controller-Bedienung, Konsolenclients, viele gleichzeitig aktive Begleiter, Ablehnen/Wechseln des Packs während eines Ausritts sowie längere Mehrspielerläufe bleiben separate Alpha-Prüfungen. Die Bildschirmsteuerung sendet nur kurze Tastendrücke und ersetzt solche Dauerbedienung nicht. Die tatsächliche Herstellung beider Helme mit Verbrauch der Zutaten wurde noch nicht im geöffneten Client durchgespielt; Rezeptregistrierung und Ergebnisdaten wurden geprüft.

Schinken verwendet für sichere Fallbacks weiterhin das echte Baby-Schwein als Reittier. Sitzposition und Spielerpose folgen damit der Vanilla-/Geyser-Darstellung. Solange ein Spieler in derselben Welt kein bestätigtes Pack hat, fällt Schinken für alle Betrachter dort auf das gewöhnliche Baby-Schwein zurück. Das verhindert fehlende Modelle und ändert seine Besitz- und Reitregeln nicht.

Der benannte vollständige Serverordner erhält nur das abgegrenzte Dateiupdate. Welten, Spielerdaten, Besitzstände, Economy, Geheimnisse und nicht betroffene JARs gehören nicht zum Update. Der vollständige Server wird hier nicht gestartet oder neu gestartet; ein Remote-Host-Upload ist kein Nachweis dieses Berichts. Website-Veröffentlichung und Dateiübernahme werden im separaten Abschlussprotokoll mit Prüfsummen festgehalten.
