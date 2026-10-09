# Installation und Rückweg · Alpha v1.0 RC2

Ziel: Paper/Minecraft Java 1.21.11, Java 21, bestehender Geyser/Floodgate-Server. Die Ressourcen ergänzen den bestätigten RC1-Stand, Revision 3.2.9. Keine neue Plugin-Abhängigkeit, kein Behavior-Pack, keine globale JSON-UI.

## Vor dem Einspielen

Server stoppen. Die vorhandene Worldevents-Version muss **1.0.1-hud.1** sein; das Plugin und der Java-Dialog-Datapack werden im jeweiligen anderen Chat geliefert. Companion 1.1.2 und der bestehende Geyser/Floodgate-Aufbau bleiben erforderlich. Nicht sämtliche Dateien dieses Gesamtpakets in den Serverordner kopieren.

## Einspielhilfe am lokalen Serverabbild

Python 3.10 oder neuer; nur Standardbibliothek. Vom Ordner `07_AKTIVIERTES_UPDATE` aus:

```powershell
py -3 .\AKTIVIEREN_ALPHA.py --server-root "C:\Pfad\zum\Alpha-Server"
py -3 .\AKTIVIEREN_ALPHA.py --server-root "C:\Pfad\zum\Alpha-Server" --apply
```

Die erste Zeile liest nur und zeigt die geplanten Änderungen. Die zweite Zeile ist für den gestoppten Server. Sie prüft alle drei Payload-Prüfsummen, erstellt geprüfte Backupkopien neben der Serverwurzel unter `PAP-EventsUI-Backups/<Zeitstempel>/`, ergänzt ausschließlich die unten genannten Werte und installiert die drei Nutzdateien. Nur frühere JARs mit Pluginname `PAP-SMP-Companion-Visual` werden nach Sicherung ersetzt. Andere JARs, Welten, Spieler-/Eventzustände und Sicherheitseinstellungen bleiben erhalten. Ein zweiter identischer Lauf ändert nichts.

Bei Inline-YAML, doppelten Schlüsseln oder anderen uneindeutigen Einstellungen bricht die Hilfe vor dem Schreiben ab. Dann die folgenden Werte gezielt manuell ergänzen. Der Installer wurde ausschließlich in einem Wegwerf-Testordner erprobt; dein Desktop-Alpha-Server wurde nicht verändert.

## Manueller Upload / G-Portal

Aus `07_AKTIVIERTES_UPDATE/plugins/` nur diese drei Dateien an die gleichen relativen Serverpfade übertragen:

| Datei | Zweck |
|---|---|
| `Geyser-Spigot/packs/PAP-SMP-Bedrock-Alpha.mcpack` | Vollständiges natives Bedrock-Pack 3.2.10 |
| `Geyser-Spigot/custom_mappings/PAP-SMP-Custom-Mappings.json` | 28 bestehende Mappings, byteidentisch |
| `pap-smp-companion-visual-0.3.1-alpha.jar` | Bestehende PAP-/Bo-Packprüfung mit neuen Hashes |

Vorher betroffene Originaldateien und Konfigurationen außerhalb des Liefer-/Serverordners sichern und Prüfsummen erfassen. Alte Visual-JAR ersetzen, keine zweite Version parallel laden. Im Geyser-Packs-Ordner genau eine aktive Kopie des PAP-Full-Packs mit UUID `db742887-aab4-45b8-a41a-58433fd13b5b` behalten. Andere native Packs bewahren; alte PAP-Dubletten nur nach gesicherter Bestandsprüfung aus dem aktiven Ordner nehmen. Für diese Eventbilder keine zusätzlichen Mappings hinzufügen.

In `server.properties` ausschließlich:

```properties
resource-pack=https://papsmp.de/downloads/PAP-SMP-Full-Java-3.2.10-Alpha-v1.0-RC2-MC-1.21.11.zip
resource-pack-sha1=f7075040436793bc3968f1649070e99d35c5fd63
resource-pack-id=a6af5ca5-9ef6-5595-8c9a-e5f5c09a43b6
```

Der bestehende Wert `require-resource-pack` bleibt erhalten. Packablehnung erlaubt nur dann eine Verbindung, wenn die vorhandene Serverpolitik das zulässt. Die lesbare Dialogvariante ist bei fehlendem Ladestatus vorbereitet.

In der vorhandenen `plugins/PAP-SMP-Worldevents/config.yml` die Werte aus `07_AKTIVIERTES_UPDATE/KONFIGURATION_ERGAENZEN.yml` unter `presentation.invitation` einpflegen. Insbesondere **`bedrock-images-enabled: true`** für den ausdrücklich gewünschten Alpha-Test. **Keine vollständige Konfiguration ersetzen.** Gespeicherte Spieler-Abschaltungen bleiben wirksam; wer bereits deaktiviert hat, kann selbst `/events hud on` wählen. Dafür keine `state.yml` löschen.

In der bestehenden Geyser-Konfiguration `gameplay.force-resource-packs: true`. Bestehendes `java.auth-type: floodgate`, Schlüssel und Loginvalidierung bewahren. Keine loopback-only QA-Konfigurationen aus Arbeitsordnern übernehmen. Geyser liefert native Bedrock-Packs aus seinem `packs/`-Ordner; ein Java-Pack wird dadurch nicht konvertiert. [Offizielle Pack-Auslieferung](https://geysermc.org/wiki/geyser/packs/).

Der Java-Dialog-Datapack gehört in den Datapack-Ordner der Hauptwelt. Bei Ordnerinstallation: `file/PAP-Events-UI`; bei ZIP: `file/PAP-Events-UI.zip`. Die Einspielhilfe erkennt diese beiden vorhandenen Namen, kopiert oder implementiert den Datapack aber nicht. Fehlend: nativer Java-Ersatzdialog mit Standardtext.

## Test und Rückweg

Vollständig neu starten, vorhandene Plugin-Befehle `/events hud status` und `/events hud on` nutzen. Keine neuen Event-/Testbefehle oder Gameplay-Automationen werden mitgeliefert. GUI-Skalierungen, Packablehnung, acht Eventtypen, Bedrock-Geräte und parallele Purge-Anzeige anhand der Abnahmematrix prüfen.

Für den Rückweg Server stoppen. `BACKUP_MANIFEST.json` nennt jeden zuvor vorhandenen und jeden neu angelegten Zielpfad. Gesicherte Dateien an exakt ihre ursprünglichen Pfade zurückkopieren; Dateien mit `existed: false` entfernen. Die neue Visual-JAR entfernen, die gesicherte vorherige wiederherstellen. Keine Welt-/Spielerdaten zurückrollen. Die bisherigen RC1-Web-Downloads bleiben erreichbar. Bei einer Bedrock-Rückstufung kann die lokale Packcache-Version bereinigt werden müssen; UUIDs nicht wechseln, um den Cache zu umgehen.
