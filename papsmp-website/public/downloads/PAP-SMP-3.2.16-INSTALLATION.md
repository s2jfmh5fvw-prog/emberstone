# PAP SMP – Packstand 3.2.18 · Naturwerk

Stand: 20.10.2026. Die bekannten Dateinamen mit `3.2.16` bleiben für bestehende Verknüpfungen erhalten. Ihr Inhalt hat jetzt Ressourcenstand **3.2.18**. Pack-UUIDs und vorhandene Modellzuordnungen bleiben bestehen.

Diese Ausgabe ergänzt sieben freigegebene Darstellungen: zwei Wurzelbarrikaden, Dornengestrüpp, Windglocke, Reifblüte, Wurzelbogen und Hainanker. Die Packs liefern die Optik ohne Client-Mods. Die dazugehörige Serverfunktion benötigt separat `PAP-SMP-DefenseTrap 1.1.0-alpha.1`; ein importiertes Pack allein erzeugt keine Anlage und keine neue Kollision.

## Als Spieler

Java-Spieler laden beim Verbinden das aktualisierte Serverpack. Bedrock-Spieler erhalten das Pack über Geyser oder importieren die aktuelle MCPACK-Datei. Bei einem veralteten Cache vollständig neu verbinden und den aktualisierten Packstand laden. Die Bedrock-Version ist 3.2.18 bei unveränderter Pack-UUID.

## Bestehenden Server gezielt aktualisieren

1. Server regulär stoppen. Betroffene Plugin-, Pack-, Mapping- und Konfigurationsdateien mit Prüfsummen außerhalb der aktiven Verzeichnisse sichern. Welten, Inventare, Economy, Teams, Claims und Herzregister werden nicht ersetzt.
2. Genau eine DefenseTrap-JAR aktiv halten. Die Packs enthalten diese JAR nicht. Andere funktionierende PAP-JARs werden für dieses Packupdate nicht pauschal ausgetauscht.
3. Java-Pack unter der bestehenden Adresse ersetzen und URL sowie SHA-1 gemeinsam abgleichen. Die bestehende `resource-pack-id` bleibt erhalten:

   ```properties
   resource-pack=https://papsmp.de/downloads/PAP-SMP-Full-Java-3.2.16-Karten-MC-1.21.11.zip
   resource-pack-sha1=604554fab749e76564f7ed27e406c2865b08126e
   ```

   Bereits verwendete Pack-Hash-Felder in `plugins/PAP-SMP-UI/config.yml` und `plugins/PAP-SMP-Teleport/config.yml` müssen denselben neuen Java-Hash referenzieren. Übrige Konfigurationen beibehalten.
4. Das vorhandene Bedrock-Pack in `plugins/Geyser-Spigot/packs/` durch `PAP-SMP-Bedrock-3.2.16-Karten.mcpack` ersetzen. Keine zweite Kopie derselben Pack-UUID daneben aktivieren. Bedrock-SHA-256: `2ab2259b079078d5fb010eaa81d01c8ca8caf987cc9ca30e40727d476d101407`.
5. Die neuen Inhalte aus `PAP-SMP-Custom-Mappings-3.2.16.json` in die **bereits aktive** PAP-Mappingdatei übernehmen bzw. diese gezielt ersetzen. Auf Bloom kann deren bisheriger Dateiname `3.2.12` enthalten; dieser Name ist kein Grund, eine zweite aktive Mappingdatei hinzuzufügen. Das Download-Overlay enthält genau eine Mappingdatei mit dem stabilen Downloadnamen `3.2.16` und ist für vorhandene Server kein blindes Voll-Overlay.
6. Bei einem geplanten regulären Start `/defense doctor` und die vorhandenen PAP-Pack-/Doctor-Prüfungen ausführen. Kein globales `/reload` verwenden. Anschließend in echten Java- und Bedrock-Clients neu verbinden, alle Anlagen ansehen und Fußkontakt, Blickrichtung, Höhenversatz und Kollision prüfen.

## Prüfgrenze

Archivstruktur, Referenzen und Modellgeometrie sind statisch geprüft. Die Darstellung verwendet unsichtbare Helmträger; deren tatsächliche Höhe und Orientierung müssen in Java und Bedrock noch grafisch kalibriert werden. Diese Ausgabe ist **keine bestandene Client-Abnahme**. Insbesondere sind offene Bedrock-Pausemenü-/PAP-/Bo-Grafiktests aus dem vorherigen Stand weiterhin getrennt zu beurteilen.

Der Hotfix aus 3.2.17 bleibt enthalten: kein PAP-Eingriff in das native Bedrock-Pausemenü und keine zusätzliche doppelte Bo-Ringanimation. Bestehende Herz-, Rüstungs-, Elytra-, HUD- und Companion-Ressourcen werden durch Naturwerk nicht neu gestaltet.

## Rückweg

Gesicherte zusammengehörige Plugin-, Pack-, Mapping- und Hash-Konfigurationen wiederherstellen. Dabei weder Spielerkonten noch Welt-, Claim-, Team- oder Herz-Daten durch alte Datenstände überschreiben. Diese Veröffentlichung ist kein Nachweis eines bereits abgeschlossenen Austauschs auf dem Live-Server.
