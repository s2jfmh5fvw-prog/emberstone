# PAP SMP 3.2.16 – Karten & Werte

Kompaktes überlappendes Original-Website-Logo, halbtransparentes Panel, Phasenstreifen mit Countdown, zwei Cash-/Shards-Karten und lesbare Statistikzeilen. Die Anzeige ist 126 native Pixel breit und 197 Pixel hoch (vorher 148 × 246): etwa 15 % schmaler und 20 % niedriger. Bei GUI 3 beträgt die Breite einschließlich Rand 378 Bildschirm-Pixel statt 444. Die Schriftgröße bleibt erhalten, das Logo misst 90 × 82 native Pixel.

Java verwendet 15 native Zeilen einschließlich leerer Abstandszeilen. Dadurch liegt Minecrafts eigener Hintergrund vollständig innerhalb des Panels. Die Hauptfläche nutzt Alpha 128/255 und ergibt mit dem gewöhnlichen nativen Hintergrund etwa 65 % Deckkraft. Die tatsächliche Deckkraft hängt auch von den Text-Hintergrundeinstellungen des Clients ab. Bei maximaler Hintergrunddeckkraft im Client kann der native Hintergrund weiterhin deckend sein. Bedrock verwendet für das eigene Panel Alpha 166/255. Währungskarten bleiben etwas kräftiger. Es gibt keine globalen Shader-Änderungen und keine erzwungenen Client-Einstellungen. Die Alpha bleibt geschlossen.

## Bestehenden Server aktualisieren

1. Server ordentlich stoppen und Konfigurationen, UI-/Visual-JARs und Bedrock-Pack außerhalb aktiver Verzeichnisse sichern.
2. Genau eine UI-Version und einen Visual-Zusatz aktiv halten: pap-smp-ui-1.0.3-card.1.jar sowie pap-smp-companion-visual-0.4.5-ui.1.jar. Companion 1.1.2 bleibt erhalten.
3. Genau ein PAP-Bedrock-Pack mit UUID db742887-aab4-45b8-a41a-58433fd13b5b verwenden: PAP-SMP-Bedrock-3.2.16-Karten.mcpack. Alte Packdatei aus dem aktiven Geyser-packs-Verzeichnis nehmen.
4. Die vorhandenen 42 Custom-Mappings bleiben bytegleich. Bei bestehenden Servern keine zweite Mapping-Datei daneben installieren. Die mitgelieferte Mapping-Datei ist für eine Neuinstallation vorgesehen.
5. server.properties: bestehende resource-pack-id behalten, URL und Hash gemeinsam ersetzen:
   resource-pack=https://papsmp.de/downloads/PAP-SMP-Full-Java-3.2.16-Karten-MC-1.21.11.zip
   resource-pack-sha1=f34971b99265a50ef1ca4b40ad3de47db86a1d0b
6. PAP-SMP-UI/config.yml pack.sha1 und PAP-SMP-Teleport/config.yml menu-resourcepack.full-pack-sha1 auf dieselbe SHA-1 setzen. Bedrock-Pfad: packs/PAP-SMP-Bedrock-3.2.16-Karten.mcpack; SHA-256: c7af02462a5341a93a8a66b21ee082568b01fba38444577250151a29b61578a5.
7. Den scoreboard-Abschnitt der geprüften privaten TAB-Konfiguration einsetzen. Spielerliste, Header/Footer und übrige TAB-Einstellungen bleiben erhalten. Doctor erwartet UI 1.0.3-card.1 und Visual 0.4.5-ui.1.
8. Server starten, papdoctor und Pack-Gates prüfen. Spieler vollständig neu verbinden und das aktualisierte Pack laden.

## Rückweg

Gesicherte Konfigurationen, alte UI-/Visual-JARs und altes Pack als zusammengehörigen Stand wiederherstellen. Welten, Inventare, Geld, Shards und Companion-Besitz werden durch das Update nicht ersetzt. Frühere öffentliche Downloads bleiben unverändert.
