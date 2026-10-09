# Übergabe an den Event-Datapack-Chat

Fontdatei: `assets/pap_events_ui/font/icons.json`. **Vollständiger Fontschlüssel: `pap_events_ui:icons`**; `pap_events_ui` ist der Namespace, nicht ein ersatzweiser Fontname. Acht Bitmap-Provider, PNG 64 × 64 RGBA, Font-Höhe 16, Ascent 12, unveränderlicher Bereich U+E600 bis U+E607.

| Event-ID | Name | Glyph | Bedrock-PATH ohne Endung |
|---|---|---|---|
| lost-cargo | Verlorene Fracht | U+E600 | `textures/pap_events_ui/lost-cargo` |
| traveling-trader | Wandernder Tauschhändler | U+E601 | `textures/pap_events_ui/traveling-trader` |
| stray-fox | Fuchs auf Abwegen | U+E602 | `textures/pap_events_ui/stray-fox` |
| glowing-fishing-spot | Leuchtende Angelstelle | U+E603 | `textures/pap_events_ui/glowing-fishing-spot` |
| supply-drop | Versorgungslieferung | U+E604 | `textures/pap_events_ui/supply-drop` |
| lost-caravan | Verirrte Karawane | U+E605 | `textures/pap_events_ui/lost-caravan` |
| starfall | Sternenfall | U+E606 | `textures/pap_events_ui/starfall` |
| world-rift | Weltenriss | U+E607 | `textures/pap_events_ui/world-rift` |

`ICON_ZUORDNUNG.csv` / `.json` enthält Aufgaben und Mindestteilnehmer aus dem vorhandenen `EventType.java`. `BEISPIEL_TEXTKOMPONENTEN.json` liefert für jeden Typ `title`, `pack_heading`, `plain_heading` und `task`. Das sind Textkomponenten, keine vollständigen Dialogdefinitionen und kein Datapack.

## Native Java-Dialoggrenzen

Titel, Eventname, Aufgabe, Countdown-/Ortsangaben und Aktionen bleiben Standardtext. Nur das einzelne Icon verwendet den Custom-Font, Weiß als Tint, `bold:false`, `italic:false`. Die Beispielüberschrift reserviert über eine Standardfont-Leerzeile davor und danach Platz für den 16-Pixel-Glyph; diese Polsterung beibehalten, um Überlappung mit nativen 9-Pixel-Textzeilen zu vermeiden. Lange Namen wie „Wandernder Tauschhändler“ und „Leuchtende Angelstelle“ separat bei kleinen GUI-Flächen prüfen.

Empfohlene Body-Breite: 300 innerhalb des nativen Dialogs; keine riesige Hintergrund-Glyphe, negativen Space-Provider oder globale Fontänderungen. Native `minecraft:multi_action`-Struktur und Standardbuttons verwenden. Icons ergänzen ausgeschriebene Namen; die Plain-Variante enthält keine U+E6xx-Zeichen. Die Plugin-Bossbar bleibt Standardtext. Diese Regeln orientieren sich an den [Paper-Dialogen](https://docs.papermc.io/paper/dev/dialogs/); native Darstellung bei GUI-Skalierungen 1/2/3/4/Auto bleibt offen.

## Status und Vertrag

Bestätigte Java-Pack-UUID aus dem lokalen Alpha-`server.properties`: **`a6af5ca5-9ef6-5595-8c9a-e5f5c09a43b6`**. Im isolierten Paper-Transporttest hat der Server genau diese UUID zusammen mit SHA-1 `f7075040436793bc3968f1649070e99d35c5fd63` angeboten; Worldevents hat den entsprechenden `SUCCESSFULLY_LOADED`-Protokollstatus empfangen. Dies belegt Angebot/Statusverdrahtung, nicht das Rendering eines nativen Spielclients und nicht die aktuelle Installation eines entfernten G-Portal-Servers.

`presentation.invitation.java-resource-pack-id` muss genau diese UUID verwenden. Worldevents wählt `invite_pack` ausschließlich nach `SUCCESSFULLY_LOADED` dieses Packs; ein anderes geladenes Pack reicht nicht. Ohne passenden Status: `invite_plain`. Ohne nutzbaren Datapack bzw. bei fehlgeschlagenem Funktionsaufruf: vorhandener nativer Ersatzdialog. Die Zuordnungslogik wurde für alle acht `invite_pack/<event-id>`- und `invite_plain/<event-id>`-Endpunkte geprüft; tatsächliche Datapack-Dialogausführung ist hier nicht implementiert/geprüft.

Der Originalvertrag `PAP-Events-UI-Vertrag-v1-ORIGINAL.md` bleibt verbindlich für Ticket-Makros, Rückgabewert, `return run dialog show`, drei Aktionen, ESC, dauerhafte Abschaltung und Zuständigkeiten. Darin enthaltene Anweisungen ändern nicht den hier beauftragten Umfang: keine Datapack-/Worldevents-Implementierung. Der Nutzer hat die Bedrock-Bildaktivierung für den Alpha-Test anschließend ausdrücklich freigegeben. Deshalb ist der ausgelieferte Wert **true**, abweichend vom ursprünglichen konservativen false-Gate. Die native Geräteabnahme bleibt getrennt offen.

## Bedrock

Die acht PNGs befinden sich separat im nativen Pack unter `textures/pap_events_ui/<event-id>.png`. Bestehende Worldevents-SimpleForms verwenden Bildtyp PATH und den obigen Pfad **ohne Dateiendung**. Alle acht Pfade, vollständige Aufgabentexte und die drei Buttons wurden nach tatsächlicher Packübertragung durch Geyser/Floodgate in Bedrock-Protokollpaketen empfangen. Eine zusätzliche text-only Form hatte alle drei Buttons und keine Bildangabe. Keine Bedrock-JSON-UI, kein Behavior-Pack und keine zusätzliche Plugin-Abhängigkeit. [Offizielle Geyser/Floodgate-Formulare](https://geysermc.org/wiki/geyser/forms/).

Die native Bildauflösung, das Rendering, Touch-/Gamepad-Fokus und Buttoninteraktion bleiben zu testen. Falls Bilder auf einem Gerät fehlen, `bedrock-images-enabled: false` als gezielten Darstellungsrückweg setzen; Texte und Aktionen bleiben vollständig. Keine allgemeinen Standardbutton-Texturen austauschen.
