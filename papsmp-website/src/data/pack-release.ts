export const packRelease = {
  label: 'Alpha · PAP-Naturwerk',
  revision: '3.2.24',
  java: {
    url: '/downloads/PAP-SMP-Full-Java-3.2.16-Karten-MC-1.21.11.zip',
    versionedUrl: '/downloads/PAP-SMP-Full-Java-3.2.16-Karten-MC-1.21.11.zip',
    originalUrl: '/downloads/PAP-SMP-Full-Java-3.2.8-ORIGINAL-MC-1.21.11.zip',
    sha1: '70568d5f857fdd6cf4527fd3502b34e451f407f9',
    bytes: 12092554,
    sha256: '3e688f882eb75465e8d9dcb7330e51ced566117bc1ae03dfb141d75f0395e46e',
  },
  bedrock: {
    url: '/downloads/PAP-SMP-Bedrock-3.2.16-Karten.mcpack',
    bytes: 9477020,
    sha256: 'b9f71c00409758ac73549750047167ffbe587f8504c6f46801c699c4668ec441',
  },
  overlay: '/downloads/PAP-SMP-Geyser-Overlay-3.2.16-Karten.zip',
  mappings: '/downloads/PAP-SMP-Custom-Mappings-3.2.16.json',
  travel: '/downloads/PAP-SMP-Travel-Menu-1.4.0-alpha.2.zip',
  bundle: { url: '/downloads/PAP-SMP-3.2.16-Karten-Gesamtpaket.zip', bytes: 21632543 },
  preview: '/downloads/PAP-SMP-Events-UI-RC2-Iconvorschau.png',
  handoff: '/downloads/PAP-SMP-Events-UI-RC2-Datapack-Handoff.md',
  installation: '/downloads/PAP-SMP-3.2.16-INSTALLATION.md',
  report: '/downloads/PAP-SMP-3.2.16-PRUEFBERICHT.md',
  checksums: '/downloads/PAP-SMP-3.2.16-SHA256.txt',
} as const;

export function packSize(bytes: number) {
  return `${new Intl.NumberFormat('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(bytes / 1_000_000)} MB`;
}

export const resourcePackAnswer = `Die aktuellen Java- und Bedrock-Packs stehen im Downloadbereich: ${packRelease.label}, Ressourcenstand ${packRelease.revision}. Die sechs Schutzanlagen und die PAP-/Bo-Companions wurden mit echten Java- und Bedrock-Clients unter Windows geprüft. 3.2.24 korrigiert fehlende Java-Texturen, die Bedrock-Geometrie und Blickrichtung sowie die Companion-Pack-Erkennung. PAP hat eine feinere Schnauze und kürzere Fuchsohren; seine Java-Bewegungen sind geglättet. Menüs, Event-Icons, Pack-UUIDs und bestehende Downloadadressen bleiben erhalten. Die Packs allein aktivieren keine Serverfunktionen und gewähren keinen Zugang zur geschlossenen Alpha. Installation, Overlay und Prüfsummen sind verlinkt.`;
