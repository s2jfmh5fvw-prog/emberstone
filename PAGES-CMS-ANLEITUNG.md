# PAP SMP selbst bearbeiten

## Einmalig verbinden

1. Öffne https://app.pagescms.org und melde dich mit dem GitHub-Konto an, dem `s2jfmh5fvw-prog/emberstone` gehört.
2. Falls Pages CMS noch keinen Zugriff hat, verbinde die offizielle Pages-CMS-GitHub-App. Wähle bei der Repository-Auswahl **nur emberstone** aus. Diesen Konto- und Zugriffsschritt führst du selbst aus.
3. Öffne `s2jfmh5fvw-prog / emberstone` und wähle den Branch **main**, sobald die CMS-Einrichtung dort veröffentlicht ist. Die vorhandene `.pages.yml` wird automatisch eingelesen. Keine neue Konfiguration erzeugen.

## Texte ändern

Links stehen die Bereiche in der Reihenfolge der Website. Öffne beispielsweise **01 · Startseite / Begrüßung**, danach **Texte**. Die Feldbeschriftung enthält den bisherigen Text zur Orientierung. Überschriften mit einem hervorgehobenen zweiten Teil besitzen zwei Textfelder. Bei formatierten Absätzen können mehrere Textfelder zusammengehören; Fettungen und Links bleiben dadurch erhalten.

Ändere den gewünschten Inhalt und speichere. Auf **main** löst Speichern den normalen Website-Build bei Cloudflare aus. Nach dessen erfolgreichem Abschluss erscheint die Änderung auf https://papsmp.de. Speichern ist keine garantierte Sofortveröffentlichung; bei einem fehlgeschlagenen Build bleibt die letzte erfolgreiche Website bestehen.

## Bilder austauschen

Im jeweiligen Bereich unter **Bilder und Animationen** ein Bild auswählen oder hochladen. Eigene Dateien liegen separat unter `public/uploads`; die bisherigen Originale werden nicht überschrieben. Verwende PNG, JPG, WebP, GIF oder AVIF und möglichst das bisherige Seitenverhältnis. Für Szenenbilder ist Querformat passend, für PAP und Emotes ein quadratisches Bild mit transparentem Hintergrund. Vermeide unnötig große Dateien.

Die **Bildbeschreibung** erklärt das Motiv für Menschen, die eine Vorlesefunktion verwenden. Bilder mit Animation haben getrennte Felder für die bewegte Variante und das Standbild. Möchtest du ein solches Motiv komplett ersetzen, ändere beide Varianten; bei PAPs Begrüßung zusätzlich das ruhende Ausgangsbild. Das Standbild für reduzierte Bewegung bleibt erhalten. Beim Herzbild schaltet ein eigener Bildpfad die bisherigen Auflösungsvarianten automatisch ab, damit das neue Bild auch wirklich angezeigt wird.

## Kleine Designänderungen

Unter **17 · Kleine Designänderungen** kannst du:

- die Abstände zwischen den Abschnitten kompakter oder luftiger wählen;
- die Ecken der großen Szenenbilder verändern;
- das Hintergrundvideo ein- oder ausblenden;
- seine Sichtbarkeit zwischen 0 und 60 Prozent einstellen (bisher 35).

Alle Ausgangswerte entsprechen dem bisherigen Design. Es ist ein Inhaltseditor mit ausgewählten Gestaltungsoptionen, kein freier Drag-and-drop-Seitenbaukasten. Positionen, Farben, Schriftarten und mobile Navigation bleiben im bestehenden Design.

## Karten und FAQ

Alpha-Fakten, Begleiter, Verteidigungsanlagen und FAQ besitzen eigene Kartenlisten. Dort lassen sich Einträge bearbeiten, hinzufügen, entfernen und umsortieren. Bei der FAQ-Frage zu Resource Packs bleibt **Antwort automatisch aus aktuellem Pack-Release** eingeschaltet: So passen die Versionsangaben zu den Downloads. Angezeigte Preise und Spielregeln ändern nur die Website und niemals die Einstellungen des Minecraft-Servers oder des Shops.

## Gemeinsam arbeiten und Änderungen zurücknehmen

Vor einer Bearbeitung den Bereich neu öffnen, damit der aktuelle Stand geladen wird. Wenn parallel technische Änderungen laufen, kurz abstimmen, wer welchen Bereich bearbeitet; nach einem Speicherkonflikt neu laden und Änderungen erneut eintragen. Im GitHub-Verlauf ist jede Speicherung nachvollziehbar und kann durch einen gezielten Folgecommit zurückgenommen werden. Nicht den gesamten Branch auf einen älteren Stand zurücksetzen, da dabei spätere Änderungen anderer verloren gehen können.

Zum Ausprobieren kannst du einen separaten Branch verwenden; er benötigt eine tatsächlich erfolgreiche Cloudflare-Vorschau. Änderungen dort erscheinen nicht auf der öffentlichen Domain, bevor sie nach `main` übernommen werden.

## Technische Grenzen

Die Download-Dateien, Release-Prüfsummen, IDs, bestehenden Links und Shop-/Serverfunktionen bleiben außerhalb der Editor-Konfiguration. Impressum, Datenschutz und das Kontaktformular werden in dieser Einrichtung nicht verändert. Der Build prüft alle freigegebenen Inhaltsfelder, lokale Bildpfade und Design-Auswahlwerte. Eigene Texte werden von Astro als Text ausgegeben; HTML oder Skripte in einem Textfeld werden nicht ausgeführt.

Die erste tatsächliche Anmeldung, Repository-Verbindung und Speicherung mit deinem Konto muss zusätzlich im CMS geprüft werden. Eine lokale Website-Prüfung bestätigt diese Kontoverbindung nicht.
