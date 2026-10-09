export const packRelease = {
  label: 'Alpha · Karten & Werte',
  revision: '3.2.14',
  java: {
    url: '/downloads/PAP-SMP-Full-Java-3.2.14-Karten-MC-1.21.11.zip',
    versionedUrl: '/downloads/PAP-SMP-Full-Java-3.2.14-Karten-MC-1.21.11.zip',
    originalUrl: '/downloads/PAP-SMP-Full-Java-3.2.8-ORIGINAL-MC-1.21.11.zip',
    sha1: '965b3c7ca489f083b88573f2644ab07a66941521',
    bytes: 11909742,
    sha256: 'b98cab4bd818656ff040342849960e1d0925c3a7329cc469188fbb89b7f98d70',
  },
  bedrock: {
    url: '/downloads/PAP-SMP-Bedrock-3.2.14-Karten.mcpack',
    bytes: 9274537,
    sha256: 'bcf7bf20d6ef59b0c99db9aca3c08fc48b110132c4a2aaa0916f88ca227fe9a3',
  },
  overlay: '/downloads/PAP-SMP-Geyser-Overlay-3.2.14-Karten.zip',
  mappings: '/downloads/PAP-SMP-Custom-Mappings-3.2.14.json',
  travel: '/downloads/PAP-SMP-Travel-Menu-1.4.0-alpha.2.zip',
  bundle: { url: '/downloads/PAP-SMP-3.2.14-Karten-Gesamtpaket.zip', bytes: 21183140 },
  preview: '/downloads/PAP-SMP-Events-UI-RC2-Iconvorschau.png',
  handoff: '/downloads/PAP-SMP-Events-UI-RC2-Datapack-Handoff.md',
  installation: '/downloads/PAP-SMP-3.2.14-INSTALLATION.md',
  report: '/downloads/PAP-SMP-3.2.14-PRUEFBERICHT.md',
  checksums: '/downloads/PAP-SMP-3.2.14-SHA256.txt',
} as const;

export function packSize(bytes: number) {
  return `${new Intl.NumberFormat('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(bytes / 1_000_000)} MB`;
}

export const resourcePackAnswer = `Die aktuellen Java- und Bedrock-Packs stehen im Downloadbereich: ${packRelease.label}, Ressourcenstand ${packRelease.revision}. Enthalten sind PAP-/Bo-Chibis, PAP-Menüs und acht Event-Icons. 3.2.14 ergänzt das große überlappende Website-Logo, Cash-/Shards-Karten und klar ausgerichtete Scoreboardwerte. Die bisherigen Chibi-Korrekturen und Bo-Ringanimationen bleiben erhalten. Java-Darstellung und technische Pack-Prüfungen sind bestätigt; die Bedrock-Grafikabnahme bleibt offen. Installation, Geyser-Overlay und Prüfsummen sind verlinkt. Das Pack gewährt keinen Zugang zur weiterhin geschlossenen Alpha.`;
