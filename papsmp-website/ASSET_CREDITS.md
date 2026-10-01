# Asset credits

Die verwendeten PAP-Motive stammen aus `PAP_SMP_Alpha_Arbeitsstand_28-09-2026 (4).zip` und wurden als nutzerbereitgestellte Arbeitsassets behandelt. Originalmaster und interne QA-Dateien liegen unter `source-media/PAP_SMP_Alpha_Assets/` außerhalb von `public/`; verwendet werden nur die konkreten Website-Motive in optimierter Kopie.

Verwendet werden das animierte PAP-Duality-Logo, beide Szenenbilder (eine davon als Hero-Hintergrund), die drei Story-Motive (`ankunft.png`, `purge-flucht.png`, `morgen.png`), PAP-Emotes und Sigils sowie das Reveal-Poster mit pausierbarem MP4-Player. Das 11-MB-Hero-GIF wird nicht mehr geladen; das Reveal-Video lädt erst nach Nutzeraktion. Interne Audit-/QA-Dateien und das Comic-Archiv bleiben außerhalb von `public/`.

## Ergänzte Motive (Alpha-Asset-Paket, September 2026)

- `pap/pap_idle_loop.gif` und `pap/pap_curious_loop.gif`: Hero-Illustration mit dezenter Idle-Schleife und Curious-Crossfade bei Hover. Lädt nur bei `prefers-reduced-motion: no-preference`; ansonsten bleibt die bestehende statische `pap_character.webp`.
- `sigils/peace_loop.webp` und `sigils/purge_loop.webp`: animierte Sigil-Schleifen im Konzept-Bereich, ebenfalls nur ohne reduzierte Bewegung geladen.
- `emotes/pap-win.png` und `emotes/yuuh92-win.png`: neue Feature-Badges im Drei-Punkte-Grid.
