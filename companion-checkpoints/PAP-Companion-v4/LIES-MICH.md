# PAP Companion v4 — direkt reagierende 2D-Animation

Fortsetzung des gesicherten v3-Standes. **Position 1 bleibt die PAP-Animation; Website-Chat und Veröffentlichung bleiben Position 2.** Die alten Lieferungen v2.1 und v3 sind erhalten. Die Marke wurde beibehalten; diese Fassung verwendet die vorhandene PAP-Illustration und verdeckte, lokal ergänzte Gelenkflächen. Keine kostenpflichtige Bild-/Videoerzeugung, keine API-Anbindung und keine neue Browserbibliothek.

## Was weiterentwickelt wurde

- Kontinuierlich berechnete Bewegungen anstelle großer vorgerechneter Spriteatlanten. Zwölf transparente Bildteile ergeben zusammen 98.952 Byte Figurengrafiken. Der schlanke Player benötigt die Bildteile nur einmal.
- Blick und Kopf folgen dem Zeiger mit gedämpfter Bewegung und kehren nach kurzer Zeit zurück. PAP reagiert auch außerhalb seiner eigenen Fläche.
- Beim Winken bewegt sich ein gegliederter Arm. Die Pfote dreht sich kurz über die Seitenansicht zum Betrachter; am Boden bleibt keine zweite Vorderpfote stehen.
- Außerhalb des Winkens wird die Vorderpfote am Boden verankert. Schulter und Ellbogen passen sich an Körperverlagerung und Landung an. Die übrigen Fußflächen bleiben an der Bodenlinie.
- Ein kleiner Hopser erhält Vorbereitung, Absprung, kurze Flugphase, Landekompression und versetztes Nachschwingen von Kopf, Ohren und Schwanz. Der getrennte Schatten bleibt am Boden und wird in der Browser-Flugphase kleiner und heller.
- Ruhiges Atmen und unregelmäßiges Blinzeln. Eigenaktionen alle 12–28 Sekunden; Winken/Hopser höchstens alle 90 Sekunden als automatische Gesten. Manuelle Gesten sind sofort abrufbar.
- PAP lässt sich ziehen. Ziehen unterbricht Gesten und löst beim Loslassen keinen versehentlichen Gruß aus. Ruhe und Pause halten die Animation an; das Betriebssystemsignal für reduzierte Bewegung wird respektiert.

Dies ist eine animierte 2D-Figur, kein neues 3D-Modell. Die gewünschte Mini-ähnliche Charakterwirkung ist weiterhin visuell vom Nutzer zu beurteilen.

## Vorschau

http://127.0.0.1:19085/

PAP anklicken zum Winken, Zeiger bewegen für Blickreaktionen, PAP ziehen für Positionswechsel. Die Textaktionen und Checkboxen unterhalb sind ausschließlich Bedienung der Abnahmevorschau. Sie gehören nicht zu einem späteren Website-Companion.

Die Standardgröße beträgt 172 px Canvasfläche; durch transparente Ränder ist die Figur selbst etwa 125 px hoch. „Groß ansehen“ vergrößert sie zur Gelenkprüfung. Ruhemodus und Pose-Pause sind getrennte Funktionen.

Falls die laufende Vorschau nach einem Neustart fehlt, im Lieferordner lokal bereitstellen:

```text
python -m http.server 19085 --bind 127.0.0.1
```

Direkter Doppelklick auf index.html reicht wegen Modul-/Manifestladen nicht. Die animierten WebP/APNG-Dateien funktionieren unabhängig vom Browser-Player.

## Animationsasset und Schnittstelle

`assets/`, `rig.json`, `pap-motion-math.js` und `pap-companion.js` bilden die eigentliche steuerbare Figur. Zustände: idle, greeting, curious, thinking, answer und hop. Kopf, Blick, Ohren, Brust, Schwanz und Gelenke werden kontinuierlich berechnet; Bildschleife maximal 30 Bilder/s. In der geprüften Browserprobe wurden etwa 28 tatsächliche Bilder/s gemessen. Pause, Ruhe und versteckte Seiten stoppen die Bildschleife. Ruhe wird durch Tabwechsel nicht aufgehoben.

```js
import { PapCompanion } from './pap-companion.js';
const manifest = await fetch('./rig.json').then(r => r.json());
const pap = await new PapCompanion(canvas, manifest, {
  baseUrl: document.baseURI,
  onState: state => console.log(state),
  shadow: true,
}).load();
pap.play('greeting');
pap.track(pointerX, pointerY);
// pap.setQuiet(true); pap.stop(); pap.resume(); pap.destroy();
```

`shadow: false` rendert die Figur ohne Bodenschatten. Die Bildteile selbst sind transparent und enthalten keinen Schatten. Der Website-Chat ist hier noch nicht angeschlossen.

`pap-greeting.webp` und `pap-hop.webp` sind separate transparente Offline-Clips aus demselben lokalen Gelenkmodell. `pap-hop.png` ist APNG. Die Offline-Clips besitzen keinen interaktiven Blick und verwenden einen anderen Rasterizer als Canvas; die Browser-Vorschau ist für das direkte Companion-Verhalten maßgeblich. `pap-winkt-und-hopst.gif` zeigt beide Gesten auf dunklem Hintergrund.

## Prüfung

Zehn Bewegungsprüfungen über 726 Posen und sechs Zustände: verankerte Pfote, Fußfläche, Schwanzwurzel, endliche Gelenkwerte, neutrale Anschlüsse sowie Vorbereitung, Flug, Landung, unterschiedliche Ohrreaktionen und tatsächliches Anheben beim Gruß. `node check-motion.mjs` kann diese Invarianten erneut prüfen.

Browser: Winken, Absprung und Rückkehr zu Idle, Blickwerte von links bis rechts, Pause hält denselben Renderstand, Ruhe unterbindet Winken, Ziehen verschiebt die Figur ohne Gruß beim Loslassen, kleine Darstellung; keine Browserfehler. Browserbelege liegen als JSON und Bilder bei. Kopf-/Pfotenübergänge wurden in großen Browseraufnahmen und der Posenübersicht visuell geprüft.

Transparente Exporte und Abstand zum Bildrand sind geprüft. 47 öffentliche Website-Dateien und die ursprünglichen Referenzen sind per SHA-256 unverändert. Keine echte Smartphone-/Touch-Abnahme; Betriebssystemeinstellung für reduzierte Bewegung und Tabwechsel wurden nicht aktiv umgestellt. Die Schutzlogik ist implementiert, diese Plattformprüfung bleibt offen.

## Reproduzieren und später fortsetzen

Python mit vorhandenem Pillow und NumPy:

```text
python tools/build-pap-companion-v4.py --source reference --out rebuilt
```

`--quick` exportiert nur die zwölf Bildteile und das Rig-Manifest; ohne diese Option entstehen zusätzlich die kurzen transparenten Clips und Posenübersicht. Der Erstellungsprompt steht in `FORTSETZUNGS-AUFTRAG.md`. Weitere Arbeit zunächst am Bewegungscharme und den Gelenken anhand der Nutzerbeurteilung; Website-Integration und Mobilprüfung anschließend. Main, Live-Website, VIP-Worker und Zahlungsabläufe bleiben unverändert.
