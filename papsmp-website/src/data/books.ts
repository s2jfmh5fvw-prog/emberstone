export type Chapter = { id: string; title: string; intro: string; paragraphs: readonly string[]; commands?: readonly string[] };
export const infoChapters: Chapter[] = [
  { id: 'anfang', title: 'Dein erster Spielabend', intro: 'PAP SMP verbindet einen eigenen Bauplatz mit einer Nacht, auf die du dich vorbereiten musst.', paragraphs: [
    'Du suchst dir einen Platz in der Wildnis, baust eine Base und organisierst Vorräte. In der Peace helfen Claims beim Schutz deiner Sachen. Sobald die Purge beginnt, ändern sich die Bedingungen: PvP wird aktiv und Claims sind offen.',
    'Das passt zu dir, wenn du gern baust, mit anderen handelst und gelegentlich ein Risiko eingehst. Wer einen dauerhaft geschützten Bau-Server sucht, sollte den Purge-Teil vorher genau lesen.',
    'Zum Einstieg: /guide lesen, mit /rtp einen Bauplatz suchen, /claim öffnen und mit /sethome 1 einen Rückweg anlegen. Käufe im Spiel und Reisen können Ingame-Geld kosten. Das jeweilige Menü zeigt dir die Bedingungen.'
  ], commands: ['/menu', '/guide', '/guide book', '/rtp', '/claim', '/sethome 1'] },
  { id: 'phasen', title: 'Peace & Purge', intro: 'Bauzeit und Risiko gehören zur selben Welt.', paragraphs: [
    'In der Peace ist normales PvP in den Survival-Welten ausgeschaltet. Du kannst bauen, erkunden, handeln und dich für die nächste Purge vorbereiten. Eine freiwillige Arena hat eigene Regeln.',
    'In der Purge wird PvP in den Survival-Welten aktiv. Claims verlieren dabei ihren Schutz: Andere können deine Base angreifen und Kisten plündern. Plane deinen Bauplatz, Vorräte und Rückwege entsprechend.',
    'Die Phasenanzeige im Spiel und /pap status sind dein Bezugspunkt. Feste Uhrzeiten werden erst veröffentlicht, wenn die Zeitkonfiguration für den Alpha-Start bestätigt ist. Die Nacht lässt sich im Konzept nicht durch Schlafen überspringen.'
  ], commands: ['/pap status', '/pap hud'] },
  { id: 'claims', title: 'Claims & Vertrauen', intro: 'Ein Claim schützt deinen Chunk während der Peace.', paragraphs: [
    'Mit /claim verwaltest du beanspruchte Chunks. Ein Chunk ist eine Fläche von 16 × 16 Blöcken. Im aktuellen Alpha-Stand sind Claims für die Hauptwelt vorgesehen.',
    'Während der Peace schützen sie Bauen, Kisten und Interaktionen vor nicht berechtigten Spielern. Gib deshalb nur Personen Zugriff, denen du vertraust. Anzahl, Kosten und Berechtigungen stehen im Menü.',
    'Während der Purge bleibt ein Claim dein Gebiet, ist aber angreifbar. Er ist kein dauerhafter Schutz vor Raids. Ein Verteidiger aus der Workforce kann helfen; stirbt er in der Purge, endet sein Vertrag.'
  ], commands: ['/claim', '/claiminfo'] },
  { id: 'herzen', title: 'Korrupte Herzen', intro: 'Ein Purge-Kampf kann über den Tod hinaus Folgen haben.', paragraphs: [
    'Das Herzsystem ist Teil des Alpha-Konzepts: Ein Spieler-Kill während der Purge kann dem Opfer ein Grundherz nehmen und ein korruptes Herz als Gegenstand erzeugen. Grenzen und Ausnahmen stehen im Spiel.',
    'Ein fremdes Herz kann dir beim Verwenden ein Zusatzherz geben. Das eigene zurückgewonnene Herz stellt nach dem aktuellen Guide ein Grundherz wieder her. Herzen lassen sich lagern und handeln.',
    'Der Herzsucher hilft nach einem Purge-Tod beim Auffinden eines gestohlenen Herzens. /pap compass bietet Ersatz; /pap hearts zeigt deinen Stand. Rückgabe- und Wiederherstellungsrituale sind im Alpha-Guide beschrieben.'
  ], commands: ['/pap hearts', '/pap compass', '/pap ritual return', '/pap ritual recover'] },
  { id: 'reisen', title: 'Homes, Teams & Reisen', intro: 'Mach aus einer langen Strecke einen verlässlichen Rückweg.', paragraphs: [
    '/sethome 1 setzt einen Home-Punkt, /home öffnet deine Rückreise. Homes und Team-Homes sind im aktuellen Guide auf die Hauptwelt begrenzt. Kosten und verfügbare Slots prüfst du im Menü.',
    'Mit /teams gründest und verwaltest du eine Gruppe. Prüft gemeinsam eure Zugriffsrechte und die Einstellung für Team-PvP. Ein Team ersetzt keine sichere Vorbereitung auf die Purge.',
    '/tpa fragt einen anderen Spieler nach einem Teleport, /tpaccept nimmt an. /rtp führt in die Wildnis. Bewegung oder Schaden können eine Reisevorbereitung abbrechen; im Kampf gelten zusätzliche Sperren.'
  ], commands: ['/home', '/sethome 1', '/teams', '/tpa <Name>', '/tpaccept', '/tpdeny', '/rtp'] },
  { id: 'handel', title: 'Geld, Handel & Shards', intro: 'Verkaufe Beute, handle mit Spielern und plane deine Ausgaben.', paragraphs: [
    'Ingame-Geld und Shards sind verschiedene Guthaben. /shop öffnet den Ingame-Shop; /sell zeigt Verkaufswerte und /ah den Handel zwischen Spielern. Lies die Bestätigung, bevor du etwas verkaufst.',
    'Shards werden unter anderem für Workforce-Verträge eingesetzt. Aufgaben und Aktivitäten können Belohnungen geben. Welche Mengen verfügbar sind, wird während der Alpha angepasst.',
    'Der Echtgeld-Shop auf dieser Website ist davon getrennt. Er zeigt die geplanten Angebote. Ein Kauf muss vor Zahlung deinem Minecraft-Konto zugeordnet sein; ein Name allein ist keine verlässliche Kontoprüfung.'
  ], commands: ['/shop', '/sell', '/worth', '/ah', '/balance', '/shards'] },
  { id: 'crates', title: 'Crates, Keys & Kits', intro: 'Virtuelle Kisten und Ausrüstung erreichst du über die Menüs.', paragraphs: [
    '/crates zeigt deine Keys und die verfügbaren virtuellen Crates. /keyall informiert über die nächste Aktivitätsbelohnung. AFK-Zeit zählt nach dem aktuellen Guide nicht als aktive Teilnahme.',
    '/kits öffnet die Kit-Auswahl. Voraussetzungen, Inhalt und Wartezeiten prüfst du direkt dort. Die Website verspricht keine zusätzlichen Kit-Inhalte.',
    'Für den geplanten shop-key werden die zugehörige Crate, Beute und gegebenenfalls Chancen vor Aktivierung des Kaufs festgelegt. Der Platzhalter ist noch kein verfügbares Kaufangebot.'
  ], commands: ['/crates', '/keyall', '/kits'] },
  { id: 'workforce', title: 'Deine Workforce', intro: 'Farmer, Sammler und Verteidiger übernehmen unterschiedliche Aufgaben.', paragraphs: [
    '/workforce öffnet die Verwaltung deiner Angestellten. Farmer und Sammler werden mit einem Lager verknüpft. Verträge kosten Shards und gelten für die im Menü angegebene Dauer.',
    'Verteidiger unterstützen deinen eigenen Claim. In der Purge riskieren sie den endgültigen Tod; danach musst du einen neuen Vertrag abschließen. Es gibt keine garantierte Raid-Abwehr.',
    'Arbeitsbereich, Limits und verfügbare Rollen sind Alpha-Einstellungen. Prüfe sie im Menü, bevor du einen Vertrag abschließt.'
  ], commands: ['/workforce'] },
  { id: 'aufgaben', title: 'Aufträge, Projekte & Ereignisse', intro: 'Ein Bauprojekt braucht Material. Ein Auftrag gibt dir ein nächstes Ziel.', paragraphs: [
    '/contracts zeigt tägliche und wöchentliche Aufgaben. Die Menüs halten Fortschritt, Voraussetzungen und Belohnung fest. Gemeinsame Projekte sollen Versorgung und Vorbereitung in der Peace unterstützen.',
    '/chronik zeigt Kapitelziele; /ereignis informiert über öffentliche Aktivitäten. Für die Alpha sind unter anderem verlorene Fracht, Händler, Versorgungslieferungen und besondere Fundorte vorgesehen.',
    'Diese Systeme werden während der Alpha getestet. Ein vorgesehenes Ereignis ist kein Versprechen für einen festen Termin oder eine bestimmte Belohnung.'
  ], commands: ['/contracts', '/chronik', '/ereignis'] },
  { id: 'begleiter', title: 'PAP, Begleiter & weitere Menüs', intro: 'PAP begleitet die Gestaltung — im Spiel gibt es zusätzlich ein Begleitersystem.', paragraphs: [
    'Das Alpha-System für Begleiter sieht Verwaltung und Futtersuche vor. Verfügbarkeit und Freischaltung werden im Spiel erklärt. Ein Begleiter ist kein automatisch im VIP-Paket enthaltenes Ingame-Kampftier.',
    'Die PAP-Pet-Demo aus dem geplanten VIP-Angebot ist eine separate virtuelle Windows-Anwendung (.exe). Sie ist weder ein Minecraft-Mod noch mit dem Website-FAQ-Helfer gleichzusetzen.',
    'Über /menu findest du weitere Bereiche. /afk führt in den AFK-Bereich; Bewegung beendet ihn nach dem Guide. /pvp <Name> fragt ein freiwilliges Duell an. Arena, AFK und Survival können unterschiedliche Regeln haben.'
  ], commands: ['/menu', '/afk', '/pvp <Name>'] },
  { id: 'packs', title: 'Resource Packs & Editionen', intro: 'Die eigenen Texturen und Menüs gehören zur PAP-Darstellung.', paragraphs: [
    'Im Downloadbereich stehen getrennte Java- und Bedrock-Packs. Java richtet sich an Minecraft 1.21.11. Versionsstand, Installation und Prüfsummen bleiben dort nachvollziehbar.',
    'Ein Bedrock-Pack ist noch keine Freigabe für den Bedrock-Serverzugang. Die Verbindung über Bedrock/Geyser wird noch geprüft; eine Adresse wird nach dem Verbindungstest ergänzt.',
    'Wenn eine Darstellung im Spiel nicht passt, melde Edition, Version und den betroffenen Menüpunkt. Illustrationen auf dieser Website sind neu erstellte Motive und keine Screenshots des Servers.'
  ] },
  { id: 'alpha', title: 'Alpha, Zugang & Feedback', intro: 'Voraussichtlich geht es am 01.11.2026 los.', paragraphs: [
    'Der Termin ist geplant und kann sich verschieben. Die Anmeldung und aktuelle Freischaltung laufen über den offiziellen Discord. Vorgesehen sind höchstens 20 Spieler gleichzeitig.',
    'In einer Alpha können Funktionen ausfallen, Preise und Balance im Spiel verändert werden oder Testdaten zurückgesetzt werden. Eine dauerhafte Welt oder ein Erhalt aller Fortschritte ist noch nicht zugesichert.',
    'Melde Fehler mit dem verwendeten Befehl, deiner Edition, Uhrzeit und einer kurzen Beschreibung. Vertrauliche Daten gehören in einen Supportkontakt. Nutze Fehler nicht aus und wiederhole Abstürze nicht absichtlich.'
  ] },
];
export const ruleChapters: Chapter[] = [
  { id: 'zusammen', title: '1. Umgang miteinander', intro: 'Spiele fair und behandle andere respektvoll.', paragraphs: ['Keine Beleidigungen, Diskriminierung, Drohungen oder gezielte Belästigung. Veröffentliche keine privaten Informationen anderer Personen. Unerwünschte Werbung, Spam und dauerndes Provozieren gehören nicht in Chat oder Discord.', 'Ein Konflikt im Spiel rechtfertigt keinen Angriff auf die Person dahinter. Nutze für Streitfälle den Support.'] },
  { id: 'fair', title: '2. Fair spielen', intro: 'Keine Cheats, Dupes oder absichtlichen Störungen.', paragraphs: ['X-Ray, unfaire Kampf- und Automatisierungsprogramme, Duplizieren und das Ausnutzen von Fehlern sind im Regelentwurf untersagt. Welche Komfort-Mods erlaubt sind, bestätigt das Team vor dem Start.', 'Melde einen gefundenen Fehler. Erzeuge keine Lag-Maschinen und versuche nicht, Server oder andere Clients zum Absturz zu bringen.'] },
  { id: 'peace', title: '3. Schutz während der Peace', intro: 'Claims und Zugriffsrechte respektieren.', paragraphs: ['Umgehe keinen Claim-Schutz. Missbrauche keine Rechte, die dir jemand für ein gemeinsames Projekt gegeben hat. Die Regeln für unbeanspruchte Bauten werden vor dem Alpha-Start festgelegt; leite daraus keine pauschale Griefing-Erlaubnis ab.', 'Außerhalb ausdrücklich vorgesehener freiwilliger Duelle ist Survival-PvP in der Peace ausgeschaltet. Sonderbereiche können eigene Regeln haben.'] },
  { id: 'purge', title: '4. Risiko während der Purge', intro: 'PvP ist aktiv, Claims sind offen.', paragraphs: ['Im Alpha-Konzept können in der Purge Bases angegriffen, Kisten geplündert und Spieler bekämpft werden. Ein Claim schützt dann nicht wie am Tag. Bereite dich darauf vor, bevor du am Survival teilnimmst.', 'Cheats, Schutzumgehung, Belästigung und technische Angriffe bleiben verboten. Regeln für Spawn, geschützte Hubs, Einsteigerschutz und erlaubte Raid-Methoden werden vor der Öffnung verbindlich ergänzt.', 'Flucht durch Logout ist kein zuverlässiger Ausweg: Das aktuelle Konzept sieht eine Kampfsperre und Folgen für Combat-Logout vor. Beachte die Anzeige im Spiel.'] },
  { id: 'handel', title: '5. Handel, Teams & Konten', intro: 'Prüfe, was du tauschst und wem du Zugriff gibst.', paragraphs: ['Nutze vorgesehene Handelsmenüs und kontrolliere jede Bestätigung. Täuschung über Angebote und das Ausnutzen fremder Konten sind im Regelentwurf untersagt. Gib Passwörter oder Anmeldetokens niemals weiter.', 'Ob und wann das Team verlorene Gegenstände oder Testfortschritt wiederherstellen kann, wird nach dem konkreten Fall entschieden. Eine Erstattung ist nicht zugesichert.'] },
  { id: 'alpha', title: '6. Alpha & Moderation', intro: 'Der Teststand entwickelt sich mit euren Rückmeldungen.', paragraphs: ['Funktionen, Balance und Regeln können sich während der Alpha ändern. Wesentliche Änderungen und der geltende Regelstand werden im Discord veröffentlicht. Fehler bitte mit nachvollziehbaren Schritten melden.', 'Das Team dokumentiert Regelverstöße und kann Maßnahmen treffen. Sanktionsstufen, Einspruchsweg und verbindliche Ausnahmen müssen vor der Öffnung ergänzt werden. Dieser Website-Entwurf ist bis zur Freigabe kein abgeschlossenes Regelwerk.'] },
];
