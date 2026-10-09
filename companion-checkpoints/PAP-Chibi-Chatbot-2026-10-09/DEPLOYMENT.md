# Chibi-PAP Website – Fortsetzung vom 09.10.2026

Der bisherige Website-PAP ist auf https://papsmp.de/ durch die neue Chibi-Figur mit den Originalanimationen der Desktop-Test-Alpha 1.2.0 ersetzt.

Quellchat: codex://threads/01a0fc0e-018f-71b1-97bb-ac3a0b772a25. Verifizierte Quelle: PAP_Desktop_Companion_Chibi_v1.2.0_Quellcode.zip und dessen Assets/animations.json. Alle ausgewählten Frames und das Manifest stimmen mit dem tatsächlich ausgelieferten Quellcode-ZIP überein. Die Originaldateien wurden nicht verändert.

## Umsetzung

7.936 unveränderte RGBA-Frames in 238 Clips und 352 verlustfreien WebP-Seiten. Enthalten: Idle, Laufen links/rechts mit phasengenauen Stopps, Sitzen, Zuhören, kompakter Schlaf mit kopfgebundenen z/Z, Wecken und kurze Comic-Reaktionen. Die neue Zuhöranimation bleibt beim Schreiben und Antworten erhalten. Beim Öffnen des Chats während des Laufens wird ein zum aktuellen Schritt passender Übergang verwendet; beim Einschlafen aus dem Zuhören folgt ein Übergang über Idle. Die Schlaf-/Weckfolge wird beim Aktualisieren des Chat-Zustands nicht abgebrochen.

Bestehender zufälliger Gestenplaner und kurze Hin-/Rückwege bleiben erhalten. Im offenen Chat hat das Gespräch Vorrang. Menü, verborgener Tab, reduzierte Bewegung, Verschieben, Schatten, Größen 202/162/108 px und unabhängige Chatgröße bleiben berücksichtigt. Keine Übernahme von Füttern, Spielen, Pflege-HUD, Bedürfnissen oder Bo. Sechs Themen-Shortcuts, FAQ-Antworten, Links, Kopieren, Entwurf und Verlauf bleiben erhalten. Keine externe KI-Anbindung eingerichtet.

Der WebP-Bestand umfasst 28.712.862 Bytes, die erste Idle-Seite 80.020 Bytes. Es werden nur gerade benötigte Seiten geladen; der Bildcache hält höchstens vier Seiten. Die alte Demo-0.9-Figur bleibt als Quelle archiviert und wird vom aktuellen Chat nicht mehr importiert oder geladen. Aktive Assets: papsmp-website/src/assets/chatbot/pet-chibi-v12.

## Stand und Prüfung

- Figurentausch-Commit: b311975603384130fd0ffaa54ca53812e812eca1.
- Vorheriger main-Stand: 7569e7090183400341afd8624532e77158523763. Die seit der letzten Chatbot-Version hinzugekommenen Website-Inhalte und Downloads wurden vor dem Figurentausch übernommen.
- Während der Live-Prüfung kam parallel die Veröffentlichung der Pack-Version 3.2.14 hinzu. Gemeinsamer geprüfter main-Stand: d611b9d8cc7f327d310ca4a073e949332db8ca99. Dieser enthält den unveränderten Figurentausch. Die Pack-Veröffentlichung stammt aus einer anderen Aufgabe.
- Cloudflare Pages emberstone: Deployment b5781ce1-e16a-4a8c-8bcd-f9a1125c6190, completed / success. Bestehender Weg GitHub s2jfmh5fvw-prog/emberstone → main → Cloudflare Pages; kein neuer Hostinganbieter.
- Live-HTTP-Abgleich: 368 Prüfungen bestanden; HTML, JavaScript, CSS, alle neuen WebP-Seiten, Poster, Kontakt-/Rechtsseiten und aktuelle 3.2.14-Downloads stimmen mit dem Build des gemeinsamen Stands überein. Bei den Kontakt-/Rechtsseiten wird ausschließlich die bestehende Cloudflare-E-Mail-Verschleierung für den Vergleich normalisiert; der Schutz bleibt aktiv. Die geprüften Download-Dateien umfassen 63.573.106 Bytes. Beleg: live-http-check.json.
- 64 aktuelle Prüfungen bestanden: 22 FAQ, 13 Verhalten, 10 Position, 8 Renderer und 11 PET-Lifecycle. Darunter Hin-/Rückweg, Chat-Unterbrechung, Pause/Fortsetzung, Laden während Pause, Cachegrenze, reduzierte Bewegung, Abbau, Zuhören beim Schreiben und phasengenaue Übergänge zum Zuhören sowie Schlafen/Wecken.
- Astro check: 46 Dateien, 0 Fehler, 0 Warnungen, 0 Hinweise; fünf Seiten gebaut. Nach der parallelen 3.2.14-Veröffentlichung wurden Check, Build und die 22 FAQ-Prüfungen nochmals auf dem gemeinsamen Stand ausgeführt.
- Alle 164 bei Beginn vorhandenen öffentlichen Dateien wurden beim Figurentausch bytegleich erhalten. Die später zusätzlich veröffentlichten 3.2.14-Dateien gehören zur parallelen Pack-Aufgabe. Bestehende Server-, Pack-, VIP- und Zahlungsquellen wurden in diesem Auftrag nicht geändert.
- Lokaler vollständiger Website-Browser: neue Figur ready=true; Java-Antwort, sechs Shortcuts, Zuhören, sleep_left und wake_left → listen_left geprüft. Bei 390 × 844 px pausiert das Menü den Frame und erhält „Entwurf für später“. Keine Browserfehler oder Warnungen.
- Live-Browser: renderer=pet-chibi-v12, ready=true; Java-Antwort und sechs Shortcuts, Schlaf-/Weckfolge und anschließendes listen_right geprüft. Nach Neuladen auch aktuelle Pack-Version 3.2.14 bestätigt. Screenshot PAP-Chibi-live.png zeigt den tatsächlichen veröffentlichten Stand.
- Der vollständige zufällige Lauf-Hin-/Rückweg wurde in dieser Live-Sichtprüfung nicht als zusammenhängende Aufnahme erfasst; er ist im Test des tatsächlich verwendeten Renderers geprüft. Kein Test auf einem physischen Mobilgerät. Desktop-EXE und Ingame-Client wurden in diesem Website-Auftrag nicht ausgeführt.

## Sicherung und Fortsetzung

Checkout: C:\Users\licht\Documents\Codex\2026-10-01\er\work\emberstone-chatbot
Website: papsmp-website
Fortsetzungsbranch: codex/pap-companion-v2
Lokale Belege: C:\Users\licht\Documents\Codex\2026-10-01\er\outputs\PAP-Chibi-Chatbot-2026-10-09
Cloud-Belege: companion-checkpoints/PAP-Chibi-Chatbot-2026-10-09

chatbot-before.zip enthält die vor dem Austausch vorhandenen Chatbot-Assets und betroffenen Quellen. PAP-Chibi-Website-Source.zip enthält die neuen Assets, Chatbot-Skripte, Prüfskripte und Website-Konfiguration des Figurentausch-Commits; es ist eine scoped Sicherung für das bestehende Repository. Das vollständige Website-Repository mit Downloads liegt weiterhin auf GitHub. Prüfsummen stehen in backup-sha256.json. Exportwerkzeug und Quellenvergleich werden mit den Belegen auf dem Fortsetzungsbranch gesichert. Der zusätzliche Dokumentationscommit wird ausschließlich auf diesem Branch veröffentlicht; main wird dafür nicht verändert.

Bei Fortsetzung zuerst Nutzerfeedback, dieses Dokument und aktuellen origin/main-Stand prüfen. pap-pet.js, pap-pet-walk.js und pap-renderer.ts steuern die Figur; pap-motion.ts, pap-position.ts und pap-helper.ts steuern Verhalten und Chat. Bestehende Originale und frühere Vorschauen erhalten. Vor Veröffentlichung npm run check, die fünf aktuellen check-pap-helper/motion/position/renderer/pet.mjs und npm run build ausführen. Frühere native/v4-Prüfungen betreffen den alten Renderer.

Bei der Veröffentlichung war die Namensauflösung einzelner Netzwerkbibliotheken gestört. Frische Windows-DNS-Ergebnisse wurden ausschließlich pro Git-/Prüfprozess verwendet. System-DNS, TLS-Hostname und Zertifikatsprüfung wurden nicht verändert.

Rollback bei tatsächlichem Bedarf: nachvollziehbarer Revert des Figurentausch-Commits auf aktuellem main. Parallel veröffentlichte Website-/Pack-Änderungen erhalten; kein Zurücksetzen auf einen alten Gesamtstand oder Force-Push. Ein Rollback wurde nicht ausgeführt.
