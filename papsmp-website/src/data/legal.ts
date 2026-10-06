// Replace each [FIELD] with the final verified text. Keep approved=false until review.
export const legal = {
  approved: false,
  operator: '[VOLLSTÄNDIGER_NAME_ODER_FIRMA]',
  address: '[STRASSE_HAUSNUMMER]\n[PLZ_ORT]\n[LAND]',
  email: '[BETREIBER_EMAIL]',
  updated: '[DATUM_DER_FREIGABE]',
} as const;
export type LegalBlock = {heading:string;text:string};
export const legalPages:Record<string,{title:string;blocks:LegalBlock[]}>={
  impressum:{title:'Impressum',blocks:[
    {heading:'Angaben zum Betreiber',text:`${legal.operator}\n${legal.address}\n[RECHTSFORM_UND_VERTRETUNGSBERECHTIGTE_FALLS_ZUTREFFEND]`},
    {heading:'Kontakt',text:`E-Mail: ${legal.email}\n[WEITERER_UNMITTELBARER_KONTAKTWEG]`},
    {heading:'Register, Aufsicht und Kennzeichen',text:'[REGISTERGERICHT_UND_REGISTERNUMMER_FALLS_ZUTREFFEND]\n[UMSATZSTEUER_ID_ODER_WIRTSCHAFTS_ID_FALLS_ZUTREFFEND]\n[ZUSTÄNDIGE_AUFSICHT_ODER_BERUFSANGABEN_FALLS_ERFORDERLICH]'},
    {heading:'Redaktionell Verantwortlicher',text:'[NAME_UND_LADUNGSFÄHIGE_ANSCHRIFT_FALLS_ERFORDERLICH]'},
    {heading:'Minecraft-Hinweis',text:'PAP SMP ist kein offizieller Minecraft-Service. Nicht von Mojang oder Microsoft genehmigt oder mit ihnen verbunden.'},
  ]},
  datenschutz:{title:'Datenschutz',blocks:[
    {heading:'1. Verantwortlicher und Kontakt',text:`${legal.operator}\n${legal.address}\nDatenschutzkontakt: [DATENSCHUTZ_EMAIL]\n[DATENSCHUTZBEAUFTRAGTER_FALLS_ERFORDERLICH]`},
    {heading:'2. Hosting und Zugriffsprotokolle',text:'Die Website wird über Cloudflare Pages bereitgestellt. [GENAUE_VERTRAGSPARTEI_UND_ANSCHRIFT]\n[DATENARTEN_ZWECK_RECHTSGRUNDLAGE_SPEICHERDAUER_EMPFAENGER]\n[AUFTRAGSVERARBEITUNG_DRITTLANDTRANSFER_UND_GARANTIEN]'},
    {heading:'3. Kontakt per E-Mail',text:'Das Kontaktformular bereitet eine E-Mail im E-Mail-Programm der absendenden Person vor. Es versendet die Eingaben nicht über einen eigenen Formularserver.\n[VERARBEITUNG_BEIM_BETREIBER_EMAILANBIETER_ZWECK_RECHTSGRUNDLAGE_UND_LOESCHFRISTEN]'},
    {heading:'4. PAP-FAQ-Helfer',text:'Der PAP-Helfer nutzt hinterlegte Antworten. Eingaben werden im Arbeitsspeicher des geöffneten Fensters verarbeitet und nicht an einen externen KI-Dienst gesendet. Der Helfer speichert keine Chatverläufe dauerhaft.\n[ZUTREFFENDE_RECHTSGRUNDLAGE_ERGAENZEN]'},
    {heading:'5. Medien, Schrift und lokale Funktionen',text:'Die Schrift und Website-Medien werden vom eigenen Website-Host geladen. Die Kopierfunktion schreibt auf deinen Klick die Serveradresse in die Zwischenablage.\n[TATSAECHLICHE_COOKIES_SPEICHERTECHNIKEN_HOST_SICHERHEITSFUNKTIONEN_UND_RECHTSGRUNDLAGEN_PRUEFEN]'},
    {heading:'6. Externe Links und Discord',text:'Externe Dienste werden über Links geöffnet. Für Discord-Anmeldung, Mitgliedschaft und Nachrichten gelten zusätzlich die Hinweise des jeweiligen Anbieters.\n[DATENVERARBEITUNG_DURCH_DEN_BETREIBER_IM_DISCORD_ERGAENZEN]'},
    {heading:'7. Shop, Kontoverknüpfung und Zahlungen',text:'[AKTIVER_COMMERCE_DIENST_UND_ZAHLUNGSANBIETER]\n[KONTOIDENTIFIKATOREN_BESTELLDATEN_ZWECK_RECHTSGRUNDLAGE_EMPFAENGER]\n[WEBHOOKS_LIEFERPROTOKOLLE_AUFBEWAHRUNGSFRISTEN_TRANSFERGARANTIEN]\nDieser Abschnitt muss die tatsächlich aktivierte Kaufanbindung beschreiben.'},
    {heading:'8. Rechte und Beschwerden',text:'[AUSKUNFT_BERICHTIGUNG_LOESCHUNG_EINSCHRAENKUNG_DATENUEBERTRAGBARKEIT_WIDERSPRUCH_WIDERRUF_NACH_ANWENDBARKEIT]\n[ZUSTAENDIGE_DATENSCHUTZAUFSICHT_MIT_KONTAKT]\n[PFLICHT_ODER_FREIWILLIGKEIT_DER_ANGABEN_UND_AUTOMATISIERTE_ENTSCHEIDUNGEN]'},
  ]},
  shopbedingungen:{title:'Shopbedingungen',blocks:[
    {heading:'1. Anbieter und Geltungsbereich',text:`Anbieter: ${legal.operator}\n${legal.address}\n${legal.email}\n[GELTUNGSBEREICH_UND_VERTRAGSSPRACHE]`},
    {heading:'2. Produkte und Voraussetzungen',text:'Geplante Produkte: VIP-Monatsabo 4,99 € pro Monat, 150 Shards 1,99 €, 1 shop-key 0,99 €. VIP soll VIP-Status, tägliche VIP-Crate, Alpha-Zugang zur PAP-Pet-Demo für Windows (.exe) und 500 Shards enthalten.\n[VERBINDLICHE_INHALTE_TECHNISCHE_VORAUSSETZUNGEN_KOMPATIBILITAET_CRATE_INHALTE_UND_CHANCEN]'},
    {heading:'3. Preis, Laufzeit und Abrechnung',text:'VIP ist ein Monatsabo für 4,99 € pro Monat.\n[ENDPREISE_STEUERANGABEN_ZUSATZKOSTEN]\n[MINDESTLAUFZEIT_VERLAENGERUNG_UND_KUENDIGUNGSFRISTEN]\n[500_SHARDS_EINMALIG_ODER_JE_VERLAENGERUNG]\n[KUENDIGUNGSWEG_UND_FALLS_ERFORDERLICH_KUENDIGUNGSBUTTON]'},
    {heading:'4. Vertragsschluss und Kontozuordnung',text:'[BESTELLABLAUF_ANNAHMEZEITPUNKT_KORREKTURMOEGLICHKEITEN_VERTRAGSSPEICHERUNG]\n[KONTOBINDUNG_JAVA_UUID_UND_BEDROCK_IDENTITAET]\n[ZAHLUNGSMETHODEN_UND_BESTAETIGUNG]'},
    {heading:'5. Bereitstellung und Support',text:'[LIEFERFRIST_WEBHOOK_BESTAETIGTE_ZUSTELLUNG_KAUFHISTORIE]\n[VORGEHEN_BEI_FEHLENDER_DOPPELTER_ODER_FALSCHER_LIEFERUNG]\n[BEZUGSWEG_WINDOWS_DEMO_UPDATES_UND_SUPPORT]'},
    {heading:'6. Widerruf und gesetzliche Rechte',text:'[PASSENDE_WIDERRUFSBELEHRUNG_FUER_DIE_TATSAECHLICHE_LEISTUNGSART]\n[GESETZLICHE_MANGELRECHTE_UND_WEITERE_ANWENDBARE_VERBRAUCHERRECHTE]\nKeine pauschale Regel „digitale Käufe sind nicht erstattbar“ verwenden.'},
    {heading:'7. Alpha und Änderungen',text:'[ZUGESAGTE_LEISTUNG_TROTZ_ALPHA_MOEGLICHE_WARTUNG_UND_GRENZEN]\n[UMGANG_MIT_RESETS_AUSFAELLEN_UND_BEREITS_BEZAHLTEN_GUTHABEN]\n[VERFAHREN_BEI_AENDERUNGEN_BEZAHLTER_LEISTUNGEN]'},
  ]},
  widerruf:{title:'Widerrufsbelehrung',blocks:[
    {heading:'Zutreffende Leistungsart auswählen',text:'[DIGITALE_INHALTE_DIGITALE_DIENSTLEISTUNG_ODER_SONSTIGE_DIENSTLEISTUNG]\nVIP, Ingame-Guthaben und die Windows-Demo können unterschiedlich einzuordnen sein. Die freigegebene Belehrung wird für das tatsächliche Angebot eingesetzt.'},
    {heading:'Widerrufsrecht',text:'[GEPRUEFTER_VOLLSTAENDIGER_BELEHRUNGSTEXT_MIT_FRIST_BEGINN_VERFAHREN_UND_ADRESSAT]'},
    {heading:'Folgen des Widerrufs',text:'[GEPRUEFTER_TEXT_ZU_RUECKZAHLUNG_FRIST_ZAHLUNGSMITTEL_UND_GGF_WERTERSATZ]'},
    {heading:'Elektronische Widerrufsfunktion',text:'[VERFUEGBARE_WIDERRUFSFUNKTION_AUF_DER_TATSAECHLICHEN_BESTELLOBERFLAECHE]\n[VERTRAGSZUORDNUNG_BESTAETIGUNG_UND_UNVERZUEGLICHE_EINGANGSBESTAETIGUNG]\nBei Online-Verträgen muss die Anwendbarkeit von § 356a BGB geprüft und die Funktion im aktiven Kaufdienst umgesetzt werden. Ein statisches Musterformular ersetzt diese Funktion nicht.'},
    {heading:'Vorzeitige Bereitstellung',text:'[ZUTREFFENDE_BEDINGUNGEN_UND_SEPARATE_EINWILLIGUNGEN_FUER_VORZEITIGEN_BEGINN]\nEin Widerrufsrecht erlischt nicht allein deshalb, weil ein Kauf digital ist. Die erforderlichen Erklärungen und Bestätigungen müssen im tatsächlichen Checkout umgesetzt sein.'},
  ]},
  widerrufsformular:{title:'Muster-Widerrufsformular',blocks:[
    {heading:'An den Anbieter',text:`${legal.operator}\n${legal.address}\nE-Mail: ${legal.email}`},
    {heading:'Erklärung',text:'Hiermit widerrufe ich/widerrufen wir (*) den von mir/uns (*) abgeschlossenen Vertrag über den Kauf der folgenden Waren (*)/die Erbringung der folgenden Dienstleistung (*):\n[LEISTUNG_ODER_PRODUKT]\nBestellt am (*)/erhalten am (*): [DATUM]\nName des/der Verbraucher(s): [NAME]\nAnschrift des/der Verbraucher(s): [ANSCHRIFT]\nUnterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier): [UNTERSCHRIFT]\nDatum: [DATUM]\n(*) Unzutreffendes streichen.'},
    {heading:'Zusätzliche Zuordnung (optional)',text:'Bestellnummer oder Minecraft-Konto: [OPTIONALE_ZUORDNUNG]\nEine eindeutige Widerrufserklärung kann auch auf anderem Wege erfolgen. Es besteht keine Pflicht, dieses Formular zu verwenden.'},
  ]},
};
