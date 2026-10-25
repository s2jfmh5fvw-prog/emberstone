# PAP SMP 3.2.90 – Installation

Stand: 25.10.2026. Minecraft Java 1.21.11, Paper 1.21.11 und die vorhandene Geyser-/Floodgate-Kombination. Für den PAP-Alpha-Test vorbereitet; keine Clientmods erforderlich. Der Download des Packs ist keine Alpha-Zugangsberechtigung.

## Spieler

Java: Das vom Server angebotene aktuelle Pack annehmen. Für manuelle Installation die Java-ZIP unverändert in den Resourcepack-Ordner legen und aktivieren. Bedrock: Beim Geyser-Beitritt das angebotene Pack laden; die MCPACK kann auf unterstützten Geräten auch manuell importiert werden. Die Packdateien allein installieren keine Serverfunktionen. Öffentlicher Bedrock-Serverzugang und Freischaltung richten sich nach den aktuellen Zugangshinweisen.

## Serverbetreiber

1. Server regulär stoppen. Nur die betroffenen bisherigen JARs, Packdateien, Mapping-Datei und das Factions-Datapack mit relativen Pfaden und Prüfsummen außerhalb des Serverordners sichern. Welten und Spielerdateien nicht durch ein Update ersetzen.
2. Je genau eine Version installieren: Companion 1.2.0-schinken.pap.1, Companion-Visual 0.5.1-schinken.90, DefenseTrap 1.1.5-ward-r001. Alte Versionen dieser drei Plugins aus dem aktiven Plugin-Ordner nehmen. Andere PAP-Plugins, Geyser, Floodgate, UI und PacketEvents beibehalten. Die Ergänzungen benötigen die bestehende PAP-Serverumgebung; sie sind keine eigenständige Serversuite.
3. Genau ein aktuelles PAP-Bedrock-Pack unter `plugins/Geyser-Spigot/packs/` und eine aktuelle PAP-Mapping-Datei unter `plugins/Geyser-Spigot/custom_mappings/` verwenden. Andere, unabhängige Packs/Mappings behalten. Alte PAP-Kopien außerhalb der aktiven Ordner sichern, damit gleiche IDs nicht doppelt geladen werden.
4. `PAP_Factions-1.21.11.zip` in den Datapack-Ordner der tatsächlich verwendeten Hauptwelt legen. Der mitgelieferte Pfad `world/datapacks/` ist für eine Welt namens world. Keine zweite Kopie parallel aktiv lassen.
5. Companion-Konfiguration additiv um `companions.schinken` und die Schinken-Werte ergänzen; vorhandene PAP-/BO-Namen, Preise, Besitzstände und Pflegewerte behalten. Die eingebetteten Defaults ergänzen fehlende Werte beim regulären Start. Startpreis: 500 Shards; Geschwindigkeitsbonus: 0.05; Suchradius: 8; Anhalteabstand: 2; Suchintervall: 20 Ticks; Eingabepause: 30 Ticks; kalibrierter Navigationswert: 0.3130431713.
6. Doctor-Erwartungen nur für diese drei geänderten Plugin-Versionen aktualisieren. Die vorhandene Doctor-JAR nicht durch einen älteren Laborstand ersetzen.
7. Java-Pack-URL und SHA-1 gemeinsam einstellen. Dann bewusst regulär starten, Doctor/Packstatus ansehen und mit beiden Editionen beitreten. Dieses Paket führt keinen automatischen Start oder Upload aus.

Java-URL: https://papsmp.de/downloads/PAP-SMP-Full-Java-3.2.90-MC-1.21.11.zip
SHA-1: 6613be5c0d5f97deffe3d554cb48398bcf740a6e

## Krone und Maske

Nur zwei eigene Rüstungsteile bleiben: Krone der Peace und Maske der Purge. Brustpanzer-, Hosen- und Schuhrezepte der beiden Fraktionen entfallen. Alte Gegenstände werden nicht gelöscht; alte Körperteile verwenden normales Netherit-Aussehen. Beim Anlegen eines alten Fraktionshelms wird nur dessen frühere Equipment-Zuordnung normalisiert; Schaden, Verzauberungen und andere Daten bleiben erhalten. Ein Helm allein ersetzt die frühere Vollsatzbedingung im bestehenden Factions-Datapack.

Peace-Raster: Smaragdblock / Echoscherbe / Smaragdblock; Echoscherbe / Netherithelm / Echoscherbe; Smaragdblock / Echoscherbe / Smaragdblock. Purge entsprechend mit Redstoneblock und weinendem Obsidian. Komponenten eines eingesetzten Helms werden durch das bestehende Crafting-Rezept nicht automatisch auf das neu hergestellte Ergebnis übertragen.

## Rückweg

Server stoppen, nur die gesicherten betroffenen Dateien und die zugehörige alte Pack-URL samt SHA-1 zurücklegen. Keine veralteten Spieler-, Economy- oder Weltdaten zurückspielen. Neue Schinken-Besitzstände beim Rückweg auf eine Version ohne Schinken aufbewahren; sie bleiben in den aktuellen Companion-Dateien. Alte und neue Version desselben Plugins niemals parallel aktiv lassen.
