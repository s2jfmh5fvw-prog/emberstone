# Installation und Rückweg

Dieses Paket wurde mit Companion 1.1.2 geprüft. Der Companion selbst ist nicht enthalten
und wurde nicht geändert. Vor dem Einspielen dessen Version prüfen. Eine ältere oder
abweichende Companion-Fassung benötigt eine gesonderte Integrationsprüfung.

## Einspielen

1. Server vollständig stoppen. Die vorhandenen PAP-Packs, Mappings, Visual-JAR und
   die bisherigen Resourcepack-Einträge aus server.properties außerhalb des Uploadordners sichern.
2. Das neue Java-Full-Pack unter der bisherigen Server-Pack-URL bereitstellen.
   Die URL muss direkt diese ZIP liefern. In server.properties den Hash setzen:

```
resource-pack-sha1=b40aa4c2e14b1aab4fc6329f1fec274028e1e108
```

   Eine bestehende resource-pack-id kann erhalten bleiben. Die neue Prüfung erkennt
   die tatsächlich von Paper gesendete ID anhand dieses Releasehashes. Wer einen
   eigenen Packversender nutzt, muss dessen ID in der Visual-Konfiguration eintragen;
   Standard ist a6af5ca5-9ef6-5595-8c9a-e5f5c09a43b6. Zusätzliche Packversender/Stacks separat testen.
3. Den Geyser-Overlay entpacken. Nur die darin enthaltenen drei Nutzdateien in die
   gleichnamigen Zielpfade übertragen: Visual-JAR, MCPack und Custom-Mappings.
   Die alte PAP-Visual-JAR durch die neue ersetzen; genau eine Visual-JAR laden.
   Veraltete PAP-MCPack-Kopien entfernen; andere Packs/Mappings/Plugins erhalten.
4. In Geysers vorhandener Konfiguration prüfen:

```yaml
gameplay:
  force-resource-packs: true
```

   Bei älteren Geyser-Konfigurationen kann die Anordnung abweichen; die im Test
   verwendete Fassung war 2.11.3-b1247 mit Config-Version 8. Für dieses aktuelle
   Geyser auf Java 1.21.11 wurde ViaVersion 5.12.0 benötigt. Keine ganze Server-
   oder Geyser-Konfiguration durch eine Testkonfiguration ersetzen.
5. Server starten, frisch verbinden und `/papvisual status <Spieler>` prüfen.
   Erwartet: BEREIT mit dem passenden Java- bzw. Bedrock-Pack. Die Prüfung ist
   automatisch und bleibt aktiv; `/papvisual confirm` umgeht sie nicht.
6. Totem in beiden Händen und Ansichten sowie PAP/Bo einschließlich Schlaf,
   Bewegung und Rejoin ansehen. Erst die echte Sichtprüfung schließt diese Abnahme.

Das Travel-Menu-Pack ist im Java-Full-Pack bereits enthalten. Seine separate ZIP
ist für Installationen gedacht, die ausschließlich diese vorhandenen Menüassets
brauchen. Sie ergänzt keine Server-Menülogik. Beide müssen im Normalfall nicht
gleichzeitig als getrennte Packs geladen werden.

## Neuladen und Rückweg

`/papvisual reload` lädt die Visual-Konfiguration und bestätigt verbundene Java-
Spieler neu. Für ausgetauschte JARs/Packs den Server vollständig neu starten.
Plugin-JARs per Fremd-Hot-Reload aus- und wieder einzuschalten wird nicht unterstützt;
Paper schließt dabei den Klassenlader. Der freigegebene Testweg ist der vollständige
Neustart plus das gesondert geprüfte Visual-Konfigurationsneuladen.

Für den Rückweg Server stoppen, die gesicherten bisherigen PAP-Dateien und URL/
Hash-Einträge zusammen wiederherstellen und neu starten. Eine native Bedrock-
Version nicht bei gleicher UUID auf 1.0.0 zurücksetzen: Der Ressourcenstand 3.2.9
ist bewusst höher als 3.2.8, während Alpha v1.0 den Meilenstein bezeichnet.

Kein Produktiv-Upload wurde durchgeführt. Welten, Spielerdaten, Wirtschaft,
Companion-KI und übrige JARs bleiben außerhalb dieses Overlays.
