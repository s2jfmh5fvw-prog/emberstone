# Asset credits

## Aktueller Alpha-v2-Kandidat (06.10.2026)

Neue Blockillustrationen: peace-build, purge-night, alpha-camp, pack-workbench, community-lodge. Neue transparente Emotes: yuuh-ready, pap-curious. Neue 8-Posen-Animationen: pap-wave und yuuh-cheer. Tatsächlich separat mit dem eingebauten OpenAI ImageGen erzeugt; keine Filter-Neufassungen alter Motive. Identitätsreferenzen sind der ursprüngliche Skeleton-Master von Yuuh92 und der kanonische PAPI-Master. Die zwischenzeitlich hochgeladene neue Skin-Datei wurde auf Nutzerwunsch verworfen.

Einbindung ausschließlich aus `public/alpha-v2/` als komprimierte WebP-Dateien. Master-PNGs, GIFs, Einzelbilder, Manifest und genaue Prompts sind im ausgelieferten Asset-Paket dokumentiert. Neues Artwork ist Illustration, kein Server-Screenshot. Der neue Social-Export ist ein Formatderivat von peace-build. Die drei Shop-Symbole sind neu erstellte SVG-UI-Grafiken im Komponentenquelltext.

Bestehendes freigegebenes PAP-Logo: verkleinerte statische Kopie `brand-logo.webp`. Original bleibt unverändert. Das Alpha-Hintergrundvideo v023 mit 0,75×/35 % Deckkraft, alle Packdateien und der originale PET-Renderer sind erhalten und werden nicht als neu generiert ausgegeben.

Schrift: Inter, lokal eingebunden; Quelle Google Fonts / Rasmus Andersson, SIL Open Font License. Lizenzdatei: `public/alpha-v2/Inter-OFL.txt`. Keine externen Google-Fonts-Aufrufe mehr.

## Historischer Stand der bisher veröffentlichten Gestaltung

Die verwendeten PAP-Motive stammen aus `PAP_SMP_Alpha_Arbeitsstand_28-09-2026 (4).zip` und wurden als nutzerbereitgestellte Arbeitsassets behandelt. Originalmaster und interne QA-Dateien liegen unter `source-media/PAP_SMP_Alpha_Assets/` außerhalb von `public/`; verwendet werden nur die konkreten Website-Motive in optimierter Kopie.

Verwendet werden das animierte PAP-Duality-Logo, beide Szenenbilder (eine davon als Hero-Hintergrund), die drei Story-Motive (`ankunft.png`, `purge-flucht.png`, `morgen.png`), PAP-Emotes und Sigils sowie das Reveal-Poster mit pausierbarem MP4-Player. Das 11-MB-Hero-GIF wird nicht mehr geladen; das Reveal-Video lädt erst nach Nutzeraktion. Interne Audit-/QA-Dateien und das Comic-Archiv bleiben außerhalb von `public/`.

## Ergänzte Motive (Alpha-Asset-Paket, September 2026)

- `pap/pap_idle_loop.gif` und `pap/pap_curious_loop.gif`: Hero-Illustration mit dezenter Idle-Schleife und Curious-Crossfade bei Hover. Lädt nur bei `prefers-reduced-motion: no-preference`; ansonsten bleibt die bestehende statische `pap_character.webp`.
- `sigils/peace_loop.webp` und `sigils/purge_loop.webp`: animierte Sigil-Schleifen im Konzept-Bereich, ebenfalls nur ohne reduzierte Bewegung geladen.
- `emotes/pap-win.png` und `emotes/yuuh92-win.png`: neue Feature-Badges im Drei-Punkte-Grid.

## Website-Helfer PAP (Oktober 2026)

- `src/assets/chatbot/pap-poses-v1.png`: die acht mit OpenAI ImageGen erzeugten PAP-Posen aus der vom Nutzer freigegebenen Vorschau A. Die bestehende PAP-Fuchsidentität diente als Referenz.
- `src/assets/chatbot/pap-smooth-v1.png`: ergänzender 4×4-Atlas mit echten Zwischenposen für Blinzeln, Winken und neugierige Kopfbewegungen, ebenfalls mit OpenAI ImageGen aus der freigegebenen Referenz erstellt. Eine Pose mit Wechsel der erhobenen Pfote wird in der Winksequenz ausgelassen. Beide Atlanten erhalten beim Astro-Build optimierte WebP-Versionen; die Originale und bestehenden Markenassets werden nicht überschrieben.
