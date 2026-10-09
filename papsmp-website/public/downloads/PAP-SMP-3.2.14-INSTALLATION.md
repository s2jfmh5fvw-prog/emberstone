# PAP SMP 3.2.14 – Karten & Werte

Großes überlappendes Original-Website-Logo, Phasenstreifen mit Countdown, zwei Cash-/Shards-Karten und kompakte Statistikzeilen. Java verwendet 13 native Scoreboardzeilen. Bedrock erhält eine auf PAP-SMP-Ziele begrenzte Sidebar mit nativen Spieler-Bindungen. Die Alpha bleibt geschlossen.

## Bestehenden Server aktualisieren

1. Server ordentlich stoppen und Konfigurationen, UI-/Visual-JARs und Bedrock-Pack außerhalb aktiver Verzeichnisse sichern.
2. Genau eine UI-Version und einen Visual-Zusatz aktiv halten: pap-smp-ui-1.0.1-card.1.jar sowie pap-smp-companion-visual-0.4.3-ui.1.jar. Companion 1.1.2 bleibt erhalten.
3. Genau ein PAP-Bedrock-Pack mit UUID db742887-aab4-45b8-a41a-58433fd13b5b verwenden: PAP-SMP-Bedrock-3.2.14-Karten.mcpack. Alte Packdatei aus dem aktiven Geyser-packs-Verzeichnis nehmen.
4. Die vorhandenen 42 Custom-Mappings bleiben bytegleich. Bei bestehenden Servern keine zweite Mapping-Datei daneben installieren. Die mitgelieferte Mapping-Datei ist für eine Neuinstallation vorgesehen.
5. server.properties: bestehende resource-pack-id behalten, URL und Hash gemeinsam ersetzen:
   resource-pack=https://papsmp.de/downloads/PAP-SMP-Full-Java-3.2.14-Karten-MC-1.21.11.zip
   resource-pack-sha1=965b3c7ca489f083b88573f2644ab07a66941521
6. PAP-SMP-UI/config.yml pack.sha1 und PAP-SMP-Teleport/config.yml menu-resourcepack.full-pack-sha1 auf dieselbe SHA-1 setzen. Bedrock-Pfad: packs/PAP-SMP-Bedrock-3.2.14-Karten.mcpack; SHA-256: bcf7bf20d6ef59b0c99db9aca3c08fc48b110132c4a2aaa0916f88ca227fe9a3.
7. Den scoreboard-Abschnitt der geprüften privaten TAB-Konfiguration einsetzen. Spielerliste, Header/Footer und übrige TAB-Einstellungen bleiben erhalten. Doctor erwartet UI 1.0.1-card.1 und Visual 0.4.3-ui.1.
8. Server starten, papdoctor und Pack-Gates prüfen. Spieler vollständig neu verbinden und das aktualisierte Pack laden.

## Rückweg

Gesicherte Konfigurationen, alte UI-/Visual-JARs und altes Pack als zusammengehörigen Stand wiederherstellen. Welten, Inventare, Geld, Shards und Companion-Besitz werden durch das Update nicht ersetzt. Frühere öffentliche Downloads bleiben unverändert.
