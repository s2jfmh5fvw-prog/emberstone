# Aktueller Fortsetzungsstand: PAP Companion v4

Fortsetzung des Nutzerauftrags vom 02.10.2026. **PAP-Animation bleibt Position 1; Website-Chat bleibt Position 2.** V4 wurde als nächste lokale Vorschau erstellt, nicht als visuell freigegebene Live-Version.

Neu: kontinuierliche 2D-Bewegung aus zwölf vorhandenen Bildteilen statt großer Spriteatlanten, gedämpfte Zeiger-/Kopfreaktion, gegliederter winkender Arm, verankerte Vorderpfote bei Körperbewegung, kleiner Hopser mit Vorbereitung und Landung, separate Schattenreaktion, Zufallsaktionen, Ziehen, Ruhe und Pose-Pause. 98.952 Byte Figurengrafiken; Canvas bis 30 FPS, im Browser ungefähr 28 FPS gemessen. Keine zusätzlichen kostenpflichtigen Dienste oder KI-Anbindung.

Lokale Lieferung: `C:\Users\licht\Documents\Codex\2026-10-01\er\outputs\PAP-Companion-v4`
Vorschau: http://127.0.0.1:19085/
Cloud-Checkpoint: `companion-checkpoints/PAP-Companion-v4` im Branch `codex/pap-companion-v2` von `s2jfmh5fvw-prog/emberstone`.
Checkout: `C:\Users\licht\Documents\Codex\2026-10-01\er\work\emberstone-chatbot`

Zehn physikalische/zeitliche Prüfungen über 726 Posen und sechs Zustände bestanden. Browser prüfte Blick von links/rechts, Winken, Flug und Landung, Pause, Ruhe und Drag ohne versehentlichen Gruß. Browserbelege und Export-QA liegen bei. 47 öffentliche Dateien und ursprüngliche PAP-Referenzen unverändert. Keine echte Mobilgerät-Abnahme und kein aktiv umgestelltes OS-Motion-/Tabwechsel-Signal.

Nächster Schritt: Bewegungscharme und Gelenke anhand der visuellen Nutzerbeurteilung nacharbeiten. Nicht eigenständig zur Website-Integration wechseln. Die ursprünglichen v2.1/v3-Checkpoints bleiben erhalten. Native Canvas-Vorschau ist für direkte Blickreaktion maßgeblich; Offline-Clips nutzen dasselbe lokale Gelenkprinzip, aber einen anderen Rasterizer und keinen interaktiven Blick. Dokumentation und Reproduktion in `LIES-MICH.md`.

Cloudflare, VIP, Zahlungen und Live-Veröffentlichung gehören nicht zu diesem Animationsschritt. Keine Zugangsdaten speichern.
