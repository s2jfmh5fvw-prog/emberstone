# PAP SMP Alpha – Ressourcenstand 3.2.24 · 21.10.2026

Java 1.21.11 und Bedrock 26.52 wurden mit echten Clients an einer lokalen Paper-/Geyser-Kopie geprüft. Das ist ein gezielter Alpha-Test, kein Mehrspieler-Lasttest oder Test jeder Bedrock-Plattform.

Korrekturen: erreichbare Java-Texturen für alle sieben Naturmodelle; gemeinsame Achsenumrechnung der nativen Bedrock-Geometrie; normale unsichtbare Modellträger gegen schwarze Geyser-Modelle; streng passende Companion-Pack-Erkennung; ruhigere Körperdrehung, begrenzte Schrittfrequenz und geglättete Java-Posen; PAP mit schmalerer Schnauze und abgestuften Fuchsohren; getrennte Java-/Bedrock-Blickrichtung für PAP und BO sowie korrigierte native Höhe. Ursprüngliche Texturen, Farben, Pack-UUIDs, Modell-IDs und Downloadadressen bleiben erhalten.

Sechs Anlagen: Wurzelbarrikade, Windglocke, Reifblüte, Dornengestrüpp, Wurzelbogen und Hainanker. Echte Servertests bestätigen Zaunkollision, Alarm, Verlangsamung, Dornen-/Wächterschaden und Projektilabfang mit vorheriger Ladungsbuchung. Besitzer-, Team-, Trust- und Neulingsschutz sowie Purge-Bedingungen bleiben maßgeblich.

## Installation auf einem bestehenden Server

1. Die tatsächlich ersetzten Dateien separat sichern. Welten, Spieler-, Wirtschafts-, Claim- und Companion-Daten behalten.
2. Java-Pack unter der bisherigen öffentlichen Adresse veröffentlichen. `resource-pack-sha1=70568d5f857fdd6cf4527fd3502b34e451f407f9` setzen; vorhandene `resource-pack-id` behalten.
3. Bedrock-Pack unter `plugins/Geyser-Spigot/packs/PAP-SMP-Bedrock-3.2.16-Karten.mcpack` ersetzen. Genau eine bestehende aktive Mappingdatei verwenden; keine zweite Kopie installieren. Die Definitionen sind in diesem Update unverändert.
4. Alte Defense-/Companion-Visual-JARs außerhalb von `plugins/` sichern und durch Defense 1.1.1-alpha.1 und Companion-Visual 0.4.6-alpha.1 ersetzen. Companion 1.1.2 und seine Daten bleiben erhalten. Doctor-Erwartungswerte entsprechend anpassen.
5. Regulär neu starten, anschließend mit beiden Editionen neu verbinden und das aktualisierte Pack annehmen. Kein globales Plugin-Reload.

Die stabilen 3.2.16-Dateinamen dienen vorhandenen Verknüpfungen; ihr Inhalt ist 3.2.24. Bedrock-Manifestversion: 3.2.24. Java- und Bedrock-Pack werden getrennt benötigt.

## Grenzen des Tests

Geprüft wurde die lokale, isolierte Kopie mit produktiven Plugin-Versionen und eigenen Wegwerf-Daten. Live-Start, öffentliche Downloads und Serverkonfiguration sind gesondert nach der Bereitstellung zu prüfen. Konsolen, Mobilgeräte und fremde Shader wurden nicht getestet.
