# PAP Companion — hier fortsetzen

Gesichert am 02.10.2026. Fortsetzung des bestehenden PAP-Webseiten-Companions, kein Neustart.

## Gesicherter Stand

- Website-Repository: https://github.com/s2jfmh5fvw-prog/emberstone
- Eigener Sicherungsbranch: `codex/pap-companion-v2` (kein Merge nach main).
- Fertiger Implementierungsstand: `cd2702b3e2a162197aa6fad282e418c940c2e431`.
- Aktuelles Burger-Menü und Kontaktseite aus main `e2454c4b236f7862d55b339a020bff86ecee645a` sind bereits übernommen.
- Code liegt in `papsmp-website`; Anleitung: `papsmp-website/PAP-COMPANION-V2.md`.
- Diese Sicherungsmappe enthält Quellcode-ZIP, Patch, Vorschaubilder, echte Browseraufnahme als GIF und Prüfmanifest. Der Branch enthält den vollständigen Projektcode und die Vorgeschichte.

## Fertig

Separate Ohr- und Schwanzbewegungen aus vorhandenen PAP-Bildern; Winken mit tatsächlich angehobener Vorderpfote, ohne doppelte Pfote am Boden. Kleinere Figur (122/96/68 px je nach Bildschirm), tieferer Stand, weicher Schatten und dezentes PAP-BOT. Sechs anklickbare Chat-Themen: Alpha, Java-IP, Bedrock, Packs, VIP, Discord. Sprechblasen passen zum aktuellen Burger-Menü; Menü und Chat bewahren den Entwurf. Zufällige kurze Gesten, Ruhemodus und Unterbrechung bei Eingabe bleiben erhalten.

50 gezielte Prüfungen, Astro-Prüfung und Build bestanden. Browserprüfung einschließlich 320/390 px, sehr geringer Höhe, Menü/Entwurf und echter Einzelteilbewegungen; keine Browserfehler. 47 öffentliche Marken-/Download-Dateien per SHA-256 unverändert.

## Lokal weiterarbeiten

Aktueller Checkout: `C:\Users\licht\Documents\Codex\2026-10-01\er\work\emberstone-chatbot`
Lieferung: `C:\Users\licht\Documents\Codex\2026-10-01\er\outputs\PAP-Companion-v2.1`
Vorschau: http://127.0.0.1:19083/?v=21
Falls die Vorschau nach Neustart nicht läuft, `Start-Vorschau.ps1` in der Lieferung starten. Es verwendet den vorhandenen lokalen Build. Alternativ im Website-Ordner Abhängigkeiten installieren, `npm run check` und `npm run build`, dann den Build lokal bereitstellen.

Auf einem anderen Computer den Sicherungsbranch klonen:

```text
git clone --branch codex/pap-companion-v2 https://github.com/s2jfmh5fvw-prog/emberstone.git
cd emberstone/papsmp-website
npm ci
npm run check
npm run build
```

## Noch offen

Visuelle Freigabe des jetzigen Stands durch den Nutzer. Danach gegebenenfalls nacharbeiten und die Veröffentlichung über die bestehende Website-Pipeline separat durchführen. Bis dahin main und die Live-Website unverändert lassen. Echte Mobilgeräte mit Bildschirmtastatur, Touch und iOS/Safari-Safe-Areas sind noch zu prüfen.

Der Chat beantwortet derzeit lokale FAQ; es gibt keine ChatGPT-Anbindung, keinen API-Key und keine laufenden KI-Kosten. Keine kostenpflichtigen Bild-/Animationsdienste verwenden. Bestehende PAP-Marke und Originalassets bewahren. VIP-Worker, Zahlungsabläufe und Cloudflare-Zugriffsrechte sind nicht Teil der Companion-Änderungen. Zugangsdaten werden nicht in diese Sicherung aufgenommen.
