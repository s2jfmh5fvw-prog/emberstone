## Bedrock-Hotfix vom 19.10.2026 – interner Packstand 3.2.17

Die bisherigen Dateinamen und Downloadadressen bleiben unverändert. Die Bedrock-Pack-UUID bleibt erhalten; Header und Modulversion steigen auf 3.2.17, damit Clients den neuen Stand erkennen.

Der PAP-Eingriff in das native Pausemenü wurde entfernt. Speichern und Beenden verwendet wieder die Vanilla-Oberfläche. Bei den Bo-Chibi-Ringen wurde die zusätzliche clientseitige Drehung entfernt: Die zugehörige Serverdarstellung steuert diese Ringe bereits über separate Armor-Stands. Modelle, UVs, Texturen und die PAP-Identität wurden dabei erhalten. Die funktionalen Mapping-IDs bleiben gleich; die Downloadfassung korrigiert nur fehlerhafte Sonderzeichen in Anzeigenamen.

Die Pack-Struktur, Archive und Ressourcenverweise sind technisch geprüft. Eine grafische Java-/Bedrock-Abnahme sowie die Bedienprüfung im echten Bedrock-Client sind offen. Insbesondere ist damit keine vollständige Behebung aller gemeldeten PAP-/Bo-Darstellungsfehler nachgewiesen.

Nachfolgend die historische Beschreibung des Kartenstands 3.2.16; die obigen Hotfix-Hinweise gehen vor.

# PAP SMP 3.2.16 – Prüfbericht

Die vom Benutzer gewählte Scoreboard-Variante 2 ist kompakter und durchscheinend. Das Original-Website-Logo wird unverändert aus der Quelle abgeleitet. Karten ordnen Cash und Shards nebeneinander, während Statistikwerte rechts ausgerichtet bleiben. Das Panel misst 126 × 197 native Pixel. Vier nahtlose Logo-Kacheln vermeiden mehrfache Verkleinerung. Ein Raster mit 15 nativen Zeilen hält Minecrafts Hintergrund innerhalb der gestalteten Fläche. Es werden keine Shader oder globalen Schriftarten geändert.

Die Änderung betrifft die Sidebar und zugehörige Pack-Metadaten. TAB-Spielerliste, Nametags, Header/Footer, RTP-Oberflächen, Pausemenü und sämtliche Modelle, Texturen und Animationen von PAP/Bo bleiben unverändert. Kein neuer Besitz, keine neuen Modell-IDs und keine neue Pack-UUID. Geld wird aus derselben vorhandenen Economy gelesen; der zusätzliche UI-Formatter besitzt keine eigenen Konten oder Daten.

30 statische Prüfungen bestätigen ZIP-Integrität, gültiges JSON, unveränderte Companion-/Totem-/Elytra-Dateien und Shader, UUIDs, enge Config-Allowlist und passende Metadaten. 43 UI-Regressionsprüfungen bestätigen Pack-Gates, Textgrenzen und Cash-Ausrichtung einschließlich sehr großer und negativer Beträge. Lange Team-/Rangtexte und große Zähler werden ausschließlich für die Sidebar gekürzt; die zugrunde liegenden Konten und Daten bleiben unverändert. Native Java-Sichtprüfung: Vollbild, GUI 3 und FOV 90; Schrift, Logo, Transparenz und gehaltenes Werkzeug. Bedrock-JSON und Geyser-Packübertragung lassen sich technisch prüfen; die grafische Abnahme im Bedrock-Client bleibt separat erforderlich.
