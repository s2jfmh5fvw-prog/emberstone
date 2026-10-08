# PAP SMP – Sichtkorrekturen 3.2.13

Die Alpha ist weiterhin geschlossen. Das Pack gewährt keinen Serverzugang.

## Inhalt

Java 1.21.11: korrigierte PAP-/Bo-Ausrichtung durch Visual-Zusatz 0.4.2-ui.1; Website-Logo im Scoreboard und ein gleichmäßig dunkler Hintergrund. Bedrock: eigenständige, gegenläufige Bo-Ringanimationen und das Header-Logo als bedingte Erweiterung des nativen Scoreboards. Die vorhandenen Chibi-Texturen, Modell-IDs und Pack-UUIDs bleiben erhalten.

Die UTF-8-Fehler in RTP-/TPA-Texten werden zusätzlich in der bestehenden Teleport-Konfiguration behoben. Diese private Server-Konfiguration ist kein Bestandteil der öffentlichen Packs.

## Einspielen auf einen bestehenden Server

1. Server ordentlich stoppen. Aktuelle Konfigurationen, alten Visual-Zusatz und Bedrock-Pack außerhalb aktiver Plugin-/Pack-Verzeichnisse sichern.
2. Genau einen Visual-Zusatz verwenden: die alte Version aus plugins entfernen und pap-smp-companion-visual-0.4.2-ui.1.jar einsetzen. Companion 1.1.2 bleibt unverändert.
3. Genau ein PAP-Bedrock-Pack mit UUID db742887-aab4-45b8-a41a-58433fd13b5b aktiv halten. Die alte 3.2.12-Datei aus Geyser-Spigot/packs entfernen und PAP-SMP-Bedrock-3.2.13-UI-Chibi-Fix.mcpack einsetzen.
4. Die bereits vorhandenen 42 Custom-Mappings bleiben bytegleich. Keine zweite Mapping-Datei mit denselben IDs daneben legen. Bei einer Neuinstallation genau eine Datei mit den mitgelieferten Mappings verwenden.
5. In server.properties nur resource-pack und resource-pack-sha1 aktualisieren. Die bestehende resource-pack-id bleibt erhalten:
   resource-pack=https://papsmp.de/downloads/PAP-SMP-Full-Java-3.2.13-UI-Chibi-Fix-MC-1.21.11.zip
   resource-pack-sha1=7531c3e2f01d3278ba105af770bab76a71e6fcdf
6. PAP-SMP-UI/config.yml: pack.sha1 auf dieselbe SHA-1 setzen. In PAP-SMP-Teleport/config.yml menu-resourcepack.full-pack-sha1, bedrock-pack-path und bedrock-pack-sha256 abgleichen. Keine fremde vollständige Konfiguration über bestehende Spiel-/Wirtschaftseinstellungen kopieren.
   Bedrock-Datei: packs/PAP-SMP-Bedrock-3.2.13-UI-Chibi-Fix.mcpack
   Bedrock-SHA-256: 9dc7b9549adf1956824fe1e07d82ac08fa85fa607352d4c739637e4854863679
7. Für das neue Java-Scoreboard den geprüften scoreboard-Abschnitt aus dem privaten Server-Update verwenden; TAB-Spielerliste, Header und Footer bleiben unverändert. Ein reines Client-Pack kann die TAB-Konfiguration nicht ersetzen.
8. Server starten, Pack-Downloads und papdoctor/papui/papvisual prüfen. Java- und Bedrock-Spieler müssen vollständig neu verbinden und die neue Pack-Version laden.

## Prüfstand

72 statische Prüfungen bestanden. In einem echten Java-1.21.11-Testclient sind die korrigierten Figuren und das Scoreboard bei GUI-Skalierung 2, 3 und 4 geprüft. Paper startet mit dem passenden Visual-Zusatz; Geyser bestätigt die Pack-/Mapping-Konfiguration. Die Sichtprüfung der neuen Bedrock-Ringe und des nativen Bedrock-Scoreboards im Grafikclient bleibt eine eigene Abnahme. Ein Protokolltest ist keine Sichtprüfung.

## Rückweg

Alten Visual-Zusatz, altes Bedrock-Pack, zuvor gesicherte Konfigurationen und deren zusammengehörige Hashes gemeinsam wiederherstellen. Alte öffentliche Download-URLs bleiben bytegleich erreichbar. Welten sowie Spieler-, Geld-, Shard- und Companion-Besitzdaten werden durch dieses Update nicht ersetzt.
