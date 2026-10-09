export const packRelease = {
  label: 'Alpha · Karten & Werte',
  revision: '3.2.15',
  java: {
    url: '/downloads/PAP-SMP-Full-Java-3.2.15-Karten-MC-1.21.11.zip',
    versionedUrl: '/downloads/PAP-SMP-Full-Java-3.2.15-Karten-MC-1.21.11.zip',
    originalUrl: '/downloads/PAP-SMP-Full-Java-3.2.8-ORIGINAL-MC-1.21.11.zip',
    sha1: '72c71d087d28ca31500f43aea4efb3618275d147',
    bytes: 12016742,
    sha256: 'ff0af8c3a73c83a80d2ed890680c1bac20ac5783775eb4f47a18ff161f32913d',
  },
  bedrock: {
    url: '/downloads/PAP-SMP-Bedrock-3.2.15-Karten.mcpack',
    bytes: 9376384,
    sha256: '3eb049f96dc817dee89a8f72fc027f71d260bcb19ae9b9ba2528164ae6566277',
  },
  overlay: '/downloads/PAP-SMP-Geyser-Overlay-3.2.15-Karten.zip',
  mappings: '/downloads/PAP-SMP-Custom-Mappings-3.2.15.json',
  travel: '/downloads/PAP-SMP-Travel-Menu-1.4.0-alpha.2.zip',
  bundle: { url: '/downloads/PAP-SMP-3.2.15-Karten-Gesamtpaket.zip', bytes: 21380112 },
  preview: '/downloads/PAP-SMP-Events-UI-RC2-Iconvorschau.png',
  handoff: '/downloads/PAP-SMP-Events-UI-RC2-Datapack-Handoff.md',
  installation: '/downloads/PAP-SMP-3.2.15-INSTALLATION.md',
  report: '/downloads/PAP-SMP-3.2.15-PRUEFBERICHT.md',
  checksums: '/downloads/PAP-SMP-3.2.15-SHA256.txt',
} as const;

export function packSize(bytes: number) {
  return `${new Intl.NumberFormat('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(bytes / 1_000_000)} MB`;
}

export const resourcePackAnswer = `Die aktuellen Java- und Bedrock-Packs stehen im Downloadbereich: ${packRelease.label}, Ressourcenstand ${packRelease.revision}. Enthalten sind PAP-/Bo-Chibis, PAP-Menüs und acht Event-Icons. 3.2.15 verbessert die gewählte Kartenansicht mit einem schmaleren Panel, festen Abständen, getrennten Währungskarten und einem aus der Originaldatei scharf abgeleiteten Logo. Die bisherigen Chibi-Korrekturen und Bo-Ringanimationen bleiben erhalten. Java-Darstellung und technische Pack-Prüfungen sind bestätigt; die Bedrock-Grafikabnahme bleibt offen. Installation, Geyser-Overlay und Prüfsummen sind verlinkt. Das Pack gewährt keinen Zugang zur weiterhin geschlossenen Alpha.`;
