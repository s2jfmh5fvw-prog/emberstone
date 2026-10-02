# Hier fortsetzen — PAP Animation zuerst

Neuer Auftrag des Nutzers am 02.10.2026: **Position 1 ist die eigenständige PAP-Animation, Position 2 die Website-Chatbot-Entwicklung.** Der Nutzer empfand v2.1 als zu wenig lebendig gegenüber Mini. Die v2.1-Animation wurde nicht visuell freigegeben; den Website-Chat nicht automatisch weiterentwickeln oder veröffentlichen.

Der neue Entwicklerprompt wurde gespeichert und ausgeführt. Lieferung v3: fünf lokale 2D-Zustände mit 444 Frames, bewegtem Kopf/Blick/Brust, Gelenken für Schulter/Ellbogen/Pfote, zeitlich versetzten Ohren und gekrümmter Schwanzbewegung. Keine kostenpflichtige Generierung, keine neue API-Anbindung. Transparente WebP/APNG-Exporte, Spriteatlanten, Zustandsmanifest und separater Browser-Player liegen in diesem Ordner. Dies ist ein Prototyp zur visuellen Beurteilung, kein neues 3D-Modell und keine behauptete exakte Mini-Animation.

Vorschau: http://127.0.0.1:19084/
Lokale Lieferung: `C:\Users\licht\Documents\Codex\2026-10-01\er\outputs\PAP-Animation-v3`
Cloud-Sicherung: `companion-checkpoints/PAP-Animation-v3` im GitHub-Branch `codex/pap-companion-v2` des Repositorys `s2jfmh5fvw-prog/emberstone`.
Website-Checkout: `C:\Users\licht\Documents\Codex\2026-10-01\er\work\emberstone-chatbot`

Browserprüfung: echte fortlaufende Greeting-Frames, automatische Rückkehr zu Idle, Zustandwechsel, Pause hält Frame 19, kleine Darstellung 142 px ohne Überlauf. Exportprüfung: 72 Greeting-APNG-Frames, transparente kodierte Exporte, alle fünf Zustände mit neutralen Anschlussposen vor Kompression, 47 öffentliche Website-Dateien und vorhandene Referenzen unverändert. Browser- und Frame-QA sind als JSON/Bilder gespeichert. Keine OS-Änderung zur Prüfung reduzierter Bewegung und keine echte Mobilgerät-Abnahme.

Nächster Schritt: Nutzer beurteilt zuerst den Bewegungscharme. Bei Korrekturen am eigenständigen Asset weiterarbeiten; keine Rückkehr zur Website als erster Priorität. Die vorhandene Illustration und Markenidentität beibehalten, Originale nicht überschreiben. V2.1 bleibt unverändert als historischer Chatbot-Checkpoint. Erst nach Auswahl einer passenden Animation die spätere Chat-Integration planen/umsetzen, einschließlich tatsächlicher Zielgröße, Asset-Ladebudget und Mobilprüfung.

`LIES-MICH.md` beschreibt das Wiederöffnen und den reproduzierbaren Erstellungsweg. Weitere Server-/Cloudflare-/VIP-Arbeit gehört nicht zum aktuellen Animationsauftrag.
