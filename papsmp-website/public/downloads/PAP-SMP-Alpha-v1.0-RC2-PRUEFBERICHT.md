# Änderungs- und Prüfbericht · Alpha v1.0 RC2

## Bestand und Schutz

Ausgangspunkt: zuletzt bestätigte lokale PAP-SMP-Alpha-v1.0-RC1-Lieferung, Ressourcenrevision 3.2.9; nicht die älteren Download-Anhänge 3.2.8. Alle 24 Dateien des RC1-Manifests wurden vor Erweiterung verifiziert. Java-/Bedrock-Artefakte, Archive, Namespace-/Glyph-Belegung, Metadaten und geschützte Inhalte wurden inventarisiert. Der neue Namespace und U+E600–U+E607 waren unbelegt.

Backup außerhalb des Lieferordners: `work/backups/EVENT_UI_RC1_BASELINE_2026_10_05/`; acht Originalkopien einschließlich Schnittstellenvertrag und Quelle. Jede Kopie wurde über SHA-256 mit ihrer Quelle verglichen. Die Baseline liegt zusätzlich als Bericht in `06_PRUEFUNG/BACKUP_SHA256_BASELINE.json`; Originaldateien und Backup liegen nicht im Serveroverlay.

## Begrenzte Erweiterung

- Acht Java-PNGs + isolierter Font; acht native Bedrock-PNGs. Keine bestehenden Assetdateien verändert.
- Java `pack.mcmeta`: nur Beschreibung aktualisiert; Format 75.0 für 1.21.11 bewahrt.
- Bedrock `manifest.json`: Header-/Modulversion von 3.2.9 auf 3.2.10 erhöht; Name/Beschreibung ergänzt; UUIDs und Mindestengine unverändert.
- Geyser: eingebettetes natives Pack aktualisiert; Mappings byteidentisch, weiterhin 28 PAP-/Travel-Einträge. Keine neuen Event-Item-Mappings notwendig.
- Bestehender Visual-Zusatz 0.3.1-alpha: Metadaten und exakte Packhashes aktualisiert, damit neue Packs die bestehende PAP-/Bo-Prüfung bestehen. Ausschließlich die veraltete feste Ressourcenrevision in einer Diagnosemeldung neutralisiert; alle anderen Klassen byteidentisch, Plugin-Abhängigkeiten unverändert. Sauberer Neuaufbau erzeugte dasselbe JAR-SHA-256 `8584555e33ac89da3d99bc0c1f1fd2d98fc8a66bc2e7b0b22a9567936a8eae49`.
- Travel-Menu 1.4.0-alpha.2 byteidentisch. Worldevents-JAR, Eventlogik, dauerhafte Spieler-Einstellungen und Datapack-Funktionen nicht verändert.

Bedrock-UUID Header: `db742887-aab4-45b8-a41a-58433fd13b5b`; Modul: `4fd19e2a-2f73-43bf-ab37-024ecb55a831`. Die separaten reinen Bedrock-Grafiktests haben bewusst eigene UUIDs und ersetzen das native Full-Pack nicht.

## Technische Ergebnisse

**1.583 statische Prüfungen bestanden.** JSON, PNG-Dekodierung, RGBA-Transparenz (Alpha nur 0/255, transparenter Rand), Font/Glyph-/Dateipfade, Archivwurzel/CRC/Pfadsicherheit, bestehende Schutzdateien und Overlay-Gleichheit geprüft. Differenzen auf Archiveintrags-Ebene stehen in `DATEI_HASH_DIFFERENZEN.csv`: 16 PNG-Zugänge, ein Font-Zugang, zwei vorhandene Metadatendateien verändert; keine Änderungen an existierenden Assetdateien oder Mappings.

**51 Paper-/Worldevents-Prüfungen und 38 Protokollprüfungen bestanden.** Isolierter loopback-Test mit Paper 1.21.11-132, Java 21, Geyser 2.11.3 Build 1247, Floodgate und dem unveränderten Worldevents 1.0.1-hud.1. Java-Pack tatsächlich per HTTP geladen und SHA-1 bestätigt; genau UUID `a6af5ca5-9ef6-5595-8c9a-e5f5c09a43b6` angeboten. Protokoll-ACK `SUCCESSFULLY_LOADED` erreichte Worldevents und die vorhandene Visual-Packprüfung. Falsche UUID / fehlender erfolgreicher Status schalten nicht auf Custom-Font; diese Negativzweige wurden durch gezielte Status-Injektion geprüft, nicht durch einen nativen Klick auf „Ablehnen“.

Bedrock-Pack tatsächlich in 34 Geyser-Blöcken übertragen, SHA-256 `0bb81f0767ea0ef8d98c554ecdb2649e5b616e0e229134357237b21089abd8f5` bestätigt, Session gespawnt und alle 28 bisherigen PAP-/Travel-Items registriert. Acht native Worldevents-Floodgate-SimpleForms mit korrektem PATH, ausgeschriebenem Eventnamen, Aufgabe und drei Buttons empfangen. Zusätzlich ein vollständiges bildloses Formular empfangen. Die Probe nutzte die originale Formularimplementierung; sie startete keine echten Worldevents und prüfte keine Teilnahme-/Belohnungslogik.

**20 Prüfungen der Einspielhilfe bestanden**, nur in einem Wegwerf-Serverabbild: Vorschau ohne Schreibzugriff, begrenzte Dateien/Schlüssel, aktivierte Bilder, unveränderte Auth-/Fremdkonfiguration, geprüfte unabhängige Backups, geschützte Welt-/Zustands-/Schlüssel-/Logdateien, Ersetzen ausschließlich der alten Visual-JAR und identischer Wiederholungslauf ohne Änderungen.

## Offene native Abnahme

Diese Tests verwenden keine rendernden Minecraft-Clients. Die künstliche Protokollquittung beweist keine tatsächliche native Fontladung. Offen bleiben native Java-Dialoge mit dem separat gelieferten Datapack, GUI-Skalierungen, Bildauflösung auf Bedrock, Touch-/Gamepad-/Mausbedienung, Packablehnung im Spiel und parallele Purge-/Peace-Anzeige. Die Vorschauen sind Offline-Designansichten. Details: `06_PRUEFUNG/CLIENT_ABNAHMEMATRIX.csv`.

Die vom Nutzer gewünschte Alpha-Aktivierung liefert **`bedrock-images-enabled: true`**. Bei Bedarf lässt sie sich gezielt auf false zurückstellen. Keine behauptete Produktions-/Clientfreigabe und kein Minecraft-Live-Upload. Die lokale vorhandene Alpha-Serverkopie wurde nur gelesen; ihre ältere Worldevents-Version/Java-Pack-URL wird erst beim bewussten Einspielen durch den Nutzer ersetzt.

## Primärquellen

[Paper-Dialoge](https://docs.papermc.io/paper/dev/dialogs/), [Geyser-Pack-Auslieferung](https://geysermc.org/wiki/geyser/packs/), [Geyser/Floodgate-Formulare](https://geysermc.org/wiki/geyser/forms/). Der kopierte lokale Schnittstellenvertrag enthält die verbindlichen Projekt-IDs, Bildpfade und Funktionsnamen.
