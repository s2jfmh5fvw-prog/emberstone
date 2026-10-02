# PAP Animation v3 — eigenständige 2D-Vorschau

## Neue Reihenfolge

**Position 1:** Den kleinen animierten PAP als eigenständigen Companion gestalten und visuell beurteilen.

**Position 2:** Erst anschließend den bestehenden Website-Chat mit dem ausgewählten Animationsasset verbinden. Website, VIP und Live-Veröffentlichung sind in dieser Lieferung unverändert.

Der ausführbare Auftrag steht in `ENTWICKLER-PROMPT.md` und wurde für diese Lieferung bereits ausgeführt. Dies ist eine erste eigenständige 2D-Animationsvorschau aus der vorhandenen PAP-Illustration. Kein neues 3D-Modell und keine generative Videoanimation. Die Wirkung von Mini dient als Timing-/Charakterreferenz; die Übereinstimmung der gewünschten Wirkung ist noch vom Nutzer zu beurteilen.

## Animationen

| Zustand | Dauer | Frames | Verhalten |
| --- | --- | --- | --- |
| idle | 6 s | 144 | Atmen, Blinzeln, kurzer Blick, versetzte Ohren |
| greeting | 3 s | 72 | Vorbereitung, Körperverlagerung, Arm anheben, Pfote drehen, zweimal winken, zurücksetzen |
| curious | 3,5 s | 84 | Kopf neigen, Blick und Ohr reagieren |
| thinking | 3 s | 72 | Blick nach oben/seitlich, Neigung und spätes Blinzeln |
| answer | 3 s | 72 | Ein kurzes Nicken mit Folgebewegung |

444 gerenderte Frames in fünf Zuständen. Die Figur erhält neue Zwischenposen über Kopf-/Brustbewegung, ein Gelenksystem für Schulter/Ellbogen/Pfote und eine kontinuierliche Verformung von Brust und Schwanz. Handdrehung wechselt die Pfotenansicht in schmaler Seitenansicht; keine Überblendung und keine doppelte Pfote am Boden. Ein kleiner Bodenschatten liegt separat im Browser und ist nicht in die transparenten Figurenexporte eingebrannt.

## Ansehen

Die laufende Vorschau: http://127.0.0.1:19084/

PAP anklicken oder „Kurze Folge“ wählen; die übrigen Texte spielen Einzelzustände. „Kleine Companion-Größe“ zeigt 142 px. „Bewegung pausieren“ hält die aktuelle Pose. Das Bedienfeld gehört nur zur Abnahmevorschau, nicht zum späteren Website-Companion.

Nach einem Neustart im Lieferordner einen lokalen Webserver starten, beispielsweise mit der vorhandenen Python-Laufzeit:

```text
python -m http.server 19084 --bind 127.0.0.1
```

Dann die obige Vorschau öffnen. `index.html` benötigt wegen Modul-/Manifestladen einen lokalen Webserver; direkter Doppelklick als Datei genügt nicht. Animierte WebP/APNG-Dateien lassen sich unabhängig ansehen.

## Dateien und spätere Verwendung

- `pap-begruessung.gif`: kompakte direkte Grußvorschau auf dunklem Hintergrund.
- `pap-companion-v3.gif`: kurze Folge auf dunklem Hintergrund.
- `pap-companion-v3.webp`: dieselbe Folge als transparentes animiertes WebP.
- `pap-STATE.webp`: transparenter Einzelzustand als animiertes WebP.
- `pap-greeting.png`: transparenter animierter PNG-Export (APNG).
- `pap-STATE-atlas.webp`, `animation.json`, `pap-player.js`: Einzelzustände für steuerbare Browserwiedergabe, 288 × 288 px je Frame, acht Spalten.
- `pap-neutral.png`: statische transparente Ruhepose.
- `pap-posen-pruefung.png`: wichtige Zwischenposen nebeneinander.
- `browser-vorschau.png`, `browser-kleine-groesse.png`, `browser-qa.json`, `browser-states-qa.json`: tatsächliche Browserbelege.
- `qa.json`: Prüfungen der erzeugten Frames.
- `tools/build-pap-animation-v3.py`, `reference/`: kostenloser reproduzierbarer Erstellungsweg und unveränderte Referenzen.

Der kleine Player lädt Zustandsatlanten bei Bedarf, spielt nach der echten Zeit und beendet seine Bildschleife bei Pause/Tab-Verbergen. Zwischen Idle-Schleifen liegt eine stille Pause. Das Betriebssystemsignal für reduzierte Bewegung zeigt die Neutralpose. Dieses Signal wurde nicht durch Änderung der Betriebssystemeinstellung getestet. Für die Website werden später zusätzlich Eingabezustände, Nutzer-Ruhemodus, Smartphone-Verhalten und Ladebudget integriert/geprüft.

```js
import { PapAnimation } from './pap-player.js';
const manifest = await fetch('./animation.json').then(r => r.json());
const pap = new PapAnimation(canvas, manifest, { baseUrl: document.baseURI });
await pap.play('greeting', { loop: false, onEnd: () => pap.play('idle') });
// pap.stop(); pap.destroy();
```

Die fünf Atlanten sind Vorschauassets und werden einzeln geladen. Dateigrößen stehen im Manifest. Vor Live-Integration die Assets auf die tatsächliche Companion-Größe zuschneiden/optimieren und Ladezeiten auf einem Mobilgerät prüfen. Keine neuen Laufzeitbibliotheken, API-Schlüssel oder bezahlten Animationsdienste.

## Reproduzieren

Python mit den bereits verfügbaren Bibliotheken Pillow und NumPy. Aus dem entpackten Lieferordner:

```text
python tools/build-pap-animation-v3.py --source reference --out rebuilt
```

`--quick` erstellt nur die Neutralpose und Posenübersicht zur schnellen Gelenkprüfung. Die Originale im bestehenden Website-Checkout wurden nicht überschrieben.

## Prüfung und nächster Schritt

Alle fünf Zustände haben unterschiedliche, nichtleere Frames, echte Alpha-Transparenz, Abstand zum Bildrand und identische neutrale Anfangs-/Endposen vor WebP-Kompression. Die komprimierten Exporte wurden erneut geöffnet und geprüft. Browser: Greeting-Frames laufen fort, kehren zu Idle zurück; Zuhören/Nachdenken/Antwort laufen; Pause hält denselben Frame, kleine Größe passt; keine Fehler im final geprüften Player. Keine echte Mobilgerät-Abnahme.

Als Nächstes die Charakterwirkung und den Gruß visuell beurteilen. Gewünschte Korrekturen zuerst am Animationsasset durchführen. Der Website-Chat bleibt Position 2. Gesicherter bisheriger Chat-Stand: `companion-checkpoints/PAP-Companion-v2.1` im Branch `codex/pap-companion-v2`.
