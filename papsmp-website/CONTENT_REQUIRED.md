# Alpha-v2: noch benötigte Freigaben

Stand: 06.10.2026. Technische/designbezogene Vorschau, keine Produktionsfreigabe.

- Alpha-Start geplant am 01.11.2026. Kein bestätigter Öffnungstermin.
- Original-Skeleton von Yuuh bleibt verbindlich. Sichtprüfung neuer Illustrationen und Layouts offen.
- Infobuch: 12 Kapitel aus aktuellem lokalen Guide/Pluginunterlagen. Keine Live-Serverabnahme behauptet.
- Regelbuch: 6 Kapitel als Entwurf. Ausnahmen, Raid-Methoden, erlaubte Mods und Moderationsabläufe vervollständigen.
- Purge-Zeitzone: Guide Europe/Berlin, Konfiguration America/Los_Angeles; widersprüchlich. Keine feste Uhrzeit auf der Website.
- Impressum, Datenschutz, Shopbedingungen, Widerruf und Formular: zentral in src/data/legal.ts vervollständigen und prüfen. Elektronische Widerrufsfunktion im aktiven Checkout berücksichtigen.
- VIP geplant 4,99 EUR; Monats-/Einmal-Abrechnung und 500-Shards-Zyklus nicht bestätigt. Bestehende lokale Worker-Konfiguration noch 3,99 EUR/Monat.
- 150 Shards 1,99 EUR; 1 shop-key 0,99 EUR: Angebote dargestellt, neue Zahlungs- und Lieferroutinen nicht verifiziert.
- VIP-Crate/shop-key: Beute, Chancen und Minecraft-Monetarisierungsregeln vor Freischaltung prüfen.
- Windows-Pet-Demo: echter Downloadzugang, technische Voraussetzungen und Lizenzbedingungen ergänzen.
- Discord-Einladung vorhanden. Whitelist-Freischaltung erfolgt separat, bis zu 20 gleichzeitige Spieler vorgesehen.
- Java-Adresse vorhanden. Aktuelle Erreichbarkeit/Freischaltung und Bedrock/Geyser-Verbindung separat prüfen.
- Pack-Dateien/Metadaten unverändert. Native Java-/Bedrock-Sichtprüfung weiterhin offen.

Prüfung: npm run check; npm run build; node scripts/check-alpha-release.mjs.
Produktionsprüfung: node scripts/check-alpha-release.mjs --release. Der Befehl scheitert solange Rechte-/Kauf-Freigaben oder gerenderte Platzhalter fehlen.
