# PAP SMP 3.2.13 – Änderungs- und Prüfbericht

PAP und Bo verwenden weiterhin die gelieferten Chibi-Modelle und unveränderten Atlanten. Der Java-Visual-Zusatz gleicht die zusätzliche Y-Drehung um 180 Grad im Minecraft ItemDisplayRenderer aus, ohne Pivot, Platzierung oder UVs zu verändern. Vorher-/Nachher-Vergleich im echten Java-Client bestätigt die korrekte Frontansicht.

Die drei Bedrock-Ringe erhalten jeweils einen eigenen Kindknochen unter der vorhandenen Head-Slot-Bindung. Native Animationen drehen obere/untere Ringe gegenläufig zum mittleren Ring in einem 4,2-Sekunden-Zyklus. Der Server übernimmt weiterhin Platzierung und vertikale Bewegung; für Ringe entfällt die redundante ArmorStand-Kopfdrehung. Würfel und UVs sind bytegleich im Inhalt erhalten.

Nur das Scoreboard verwendet das tatsächliche Website-Header-Logo. Die frühere Logo-/Zeilenüberschneidung ist durch passenden Schrift-Ascent behoben. Ein schlichtes dunkles Panel ersetzt den alten Rahmen; feste Titelbreite und Rücksprungweite sind aufeinander abgestimmt. TAB-Spielerliste, Header/Footer, Pausemenü und RTP-Oberflächen bleiben erhalten. Bedrock ergänzt ausschließlich den nativen PAP-Sidebar um eine bedingt sichtbare Logo-Grafik.

26 falsch dekodierte Teleport-Anzeigetexte werden als UTF-8 korrigiert; Platzhalter, RTP-Entfernungen, Kosten, Cooldowns, Sicherheitsbedingungen und TPA-Verhalten bleiben erhalten. Diese Konfigurationskorrektur wird separat auf dem Server eingespielt.

72 statische Prüfungen einschließlich ZIP-Integrität, JSON, Delta-Allowlist, UUIDs, unveränderter Atlanten, Animationsreferenzen, TAB-Scope, Textplatzhaltern und übereinstimmenden Pack-Hashes sind bestanden. Der Java-Grafikclient bestätigt Figuren und Scoreboard auch bei großer GUI-Skalierung. Ein Bedrock-Grafikclient ist für die neue Ringbewegung und den nativen Sidebar noch erforderlich; Alpha-Zugang bleibt geschlossen.
