export const packRelease = {
  label: 'Alpha · Sichtkorrekturen',
  revision: '3.2.13',
  java: {
    url: '/downloads/PAP-SMP-Full-Java-3.2.13-UI-Chibi-Fix-MC-1.21.11.zip',
    versionedUrl: '/downloads/PAP-SMP-Full-Java-3.2.13-UI-Chibi-Fix-MC-1.21.11.zip',
    originalUrl: '/downloads/PAP-SMP-Full-Java-3.2.8-ORIGINAL-MC-1.21.11.zip',
    sha1: '7531c3e2f01d3278ba105af770bab76a71e6fcdf',
    bytes: 11881774,
    sha256: 'a9bf05a5766d3574025c940206de2d9bd09dc553c92acc12fddd764c1db09a63',
  },
  bedrock: {
    url: '/downloads/PAP-SMP-Bedrock-3.2.13-UI-Chibi-Fix.mcpack',
    bytes: 9280278,
    sha256: '9dc7b9549adf1956824fe1e07d82ac08fa85fa607352d4c739637e4854863679',
  },
  overlay: '/downloads/PAP-SMP-Geyser-Overlay-3.2.13-UI-Chibi-Fix.zip',
  mappings: '/downloads/PAP-SMP-Custom-Mappings-3.2.13.json',
  travel: '/downloads/PAP-SMP-Travel-Menu-1.4.0-alpha.2.zip',
  bundle: { url: '/downloads/PAP-SMP-3.2.13-UI-Chibi-Fix-Gesamtpaket.zip', bytes: 21143616 },
  preview: '/downloads/PAP-SMP-Events-UI-RC2-Iconvorschau.png',
  handoff: '/downloads/PAP-SMP-Events-UI-RC2-Datapack-Handoff.md',
  installation: '/downloads/PAP-SMP-3.2.13-INSTALLATION.md',
  report: '/downloads/PAP-SMP-3.2.13-PRUEFBERICHT.md',
  checksums: '/downloads/PAP-SMP-3.2.13-SHA256.txt',
} as const;

export function packSize(bytes: number) {
  return `${new Intl.NumberFormat('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(bytes / 1_000_000)} MB`;
}

export const resourcePackAnswer = `Die aktuellen Java- und Bedrock-Packs stehen im Downloadbereich: ${packRelease.label}, Ressourcenstand ${packRelease.revision}. Enthalten sind PAP-/Bo-Chibis, PAP-Menüs und acht Event-Icons. 3.2.13 korrigiert die Java-Ausrichtung, ergänzt native Bo-Ringanimationen auf Bedrock und verwendet das Website-Logo im Scoreboard. Java-Darstellung und technische Pack-Prüfungen sind bestätigt; die Bedrock-Grafikabnahme bleibt offen. Installation, Geyser-Overlay und Prüfsummen sind verlinkt. Das Pack gewährt keinen Zugang zur weiterhin geschlossenen Alpha.`;
