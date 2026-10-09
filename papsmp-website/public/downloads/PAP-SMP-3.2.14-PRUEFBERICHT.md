# PAP SMP 3.2.14 – Prüfbericht

Die vom Benutzer gewählte Scoreboard-Variante 2 wird mit dem unveränderten Original-Website-Logo umgesetzt. Der Logo-Ausschnitt entfernt transparente Außenränder; die Marke wird nicht neu gezeichnet. Karten ordnen Cash und Shards nebeneinander, während Statistikwerte rechts ausgerichtet bleiben. Im Java-Scoreboard wurden Leerzeilen für die große GUI-Skalierung verdichtet.

Die Änderung betrifft die Sidebar und zugehörige Pack-Metadaten. TAB-Spielerliste, Nametags, Header/Footer, RTP-Oberflächen, Pausemenü und sämtliche Modelle, Texturen und Animationen von PAP/Bo bleiben unverändert. Kein neuer Besitz, keine neuen Modell-IDs und keine neue Pack-UUID. Geld wird aus derselben vorhandenen Economy gelesen; der zusätzliche UI-Formatter besitzt keine eigenen Konten oder Daten.

30 statische Prüfungen bestätigen ZIP-Integrität, gültiges JSON, unveränderte Companion-/Totem-/Elytra-Dateien und Shader, UUIDs, enge Config-Allowlist und passende Metadaten. 28 UI-Regressionsprüfungen bestätigen Pack-Gates, Textgrenzen und pixelgenaue Cash-Ausrichtung über mehrere Größenordnungen. Native Java-Screenshots bei GUI 2, 3 und 4 werden dem privaten Server-Prüfbericht beigefügt. Bedrock-JSON und Geyser-Packübertragung lassen sich technisch prüfen; die grafische Abnahme im Bedrock-Client bleibt separat erforderlich.
