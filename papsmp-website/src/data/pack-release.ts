export const packRelease = {
  label: 'Alpha Â· PAP-Naturwerk & Begleiter',
  revision: '3.2.90',
  java: {
    serverUrl: '/downloads/PAP-SMP-Full-Java-3.2.91-PAP-V07-MC-1.21.11.zip',
    url: '/downloads/PAP-SMP-Full-Java-3.2.91-PAP-V07-MC-1.21.11.zip',
    versionedUrl: '/downloads/PAP-SMP-Full-Java-3.2.91-PAP-V07-MC-1.21.11.zip',
    originalUrl: '/downloads/PAP-SMP-Full-Java-3.2.8-ORIGINAL-MC-1.21.11.zip',
    sha1: '1935bbf6d533be7f90544dd92525c9fa3febb652',
    bytes: 12091432,
    sha256: '28637ae3c3a98696d51bc7222d679fe3356113071b923a53212a2efae1c89f74',
  },
  bedrock: { url: '/downloads/PAP-SMP-Bedrock-3.2.93-PAP-V07.mcpack', bytes: 9488867, sha256: '0db50b51eb3150db2c4471ab957ed35d90855e23f40b19fb0df39eb2026bf183' },
  overlay: '/downloads/PAP-SMP-Geyser-Overlay-3.2.90.zip',
  mappings: '/downloads/PAP-SMP-Custom-Mappings-3.2.90.json',
  travel: '/downloads/PAP-SMP-Travel-Menu-1.4.0-alpha.2.zip',
  bundle: { url: '/downloads/PAP-SMP-3.2.90-Gesamtpaket.zip', bytes: 21756921 },
  preview: '/downloads/PAP-SMP-Events-UI-RC2-Iconvorschau.png',
  handoff: '/downloads/PAP-SMP-Events-UI-RC2-Datapack-Handoff.md',
  installation: '/downloads/PAP-SMP-3.2.90-INSTALLATION.md',
  report: '/downloads/PAP-SMP-3.2.90-PRUEFBERICHT.md',
  checksums: '/downloads/PAP-SMP-3.2.90-SHA256.txt',
} as const;

export function packSize(bytes: number) {
  return `${new Intl.NumberFormat('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(bytes / 1_000_000)} MB`;
}

export const resourcePackAnswer = 'Du findest das Resourcepack im Downloadbereich. Wähle Java oder Bedrock passend zu deiner Minecraft-Edition. Beim Beitritt zu PAP SMP kannst du das Pack direkt vom Server herunterladen. Es enthält die PAP-Modelle, Texturen, Menüs und Anzeigen.';
