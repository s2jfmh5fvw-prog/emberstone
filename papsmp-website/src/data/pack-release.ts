export const packRelease = {
  label: 'Alpha · Bedrock-Hotfix',
  revision: '3.2.17',
  java: {
    url: '/downloads/PAP-SMP-Full-Java-3.2.16-Karten-MC-1.21.11.zip',
    versionedUrl: '/downloads/PAP-SMP-Full-Java-3.2.16-Karten-MC-1.21.11.zip',
    originalUrl: '/downloads/PAP-SMP-Full-Java-3.2.8-ORIGINAL-MC-1.21.11.zip',
    sha1: 'f34971b99265a50ef1ca4b40ad3de47db86a1d0b',
    bytes: 11961448,
    sha256: 'a2531f6e1f811d328cb5a587cb2d534dc7eeb9778e75d6835a25923d4eea08ba',
  },
  bedrock: {
    url: '/downloads/PAP-SMP-Bedrock-3.2.16-Karten.mcpack',
    bytes: 9318151,
    sha256: '50f76f5919324b7aee7ad07d3229481442d1d4ca59dc42dc9fd6831a1f7ae4e4',
  },
  overlay: '/downloads/PAP-SMP-Geyser-Overlay-3.2.16-Karten.zip',
  mappings: '/downloads/PAP-SMP-Custom-Mappings-3.2.16.json',
  travel: '/downloads/PAP-SMP-Travel-Menu-1.4.0-alpha.2.zip',
  bundle: { url: '/downloads/PAP-SMP-3.2.16-Karten-Gesamtpaket.zip', bytes: 21258694 },
  preview: '/downloads/PAP-SMP-Events-UI-RC2-Iconvorschau.png',
  handoff: '/downloads/PAP-SMP-Events-UI-RC2-Datapack-Handoff.md',
  installation: '/downloads/PAP-SMP-3.2.16-INSTALLATION.md',
  report: '/downloads/PAP-SMP-3.2.16-PRUEFBERICHT.md',
  checksums: '/downloads/PAP-SMP-3.2.16-SHA256.txt',
} as const;

export function packSize(bytes: number) {
  return `${new Intl.NumberFormat('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(bytes / 1_000_000)} MB`;
}

export const resourcePackAnswer = `Die aktuellen Java- und Bedrock-Packs stehen im Downloadbereich: ${packRelease.label}, Ressourcenstand ${packRelease.revision}. Enthalten sind PAP-/Bo-Chibis, PAP-Menüs und acht Event-Icons. 3.2.17 entfernt den Eingriff in das native Bedrock-Pausemenü und die doppelte Bo-Ringanimation. Die bestehenden Downloadadressen bleiben erhalten. Die Pack-Struktur ist geprüft; die grafische Bedrock-Abnahme und der Test von Speichern & beenden im echten Client bleiben offen. Installation, Geyser-Overlay und Prüfsummen sind verlinkt. Das Pack gewährt keinen Zugang zur weiterhin geschlossenen Alpha.`;
