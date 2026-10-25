export const packRelease = {
  label: 'Alpha · PAP-Naturwerk & Begleiter',
  revision: '3.2.90',
  java: {
    serverUrl: '/downloads/PAP-SMP-Full-Java-3.2.16-Karten-MC-1.21.11.zip',
    url: '/downloads/PAP-SMP-Full-Java-3.2.90-MC-1.21.11.zip',
    versionedUrl: '/downloads/PAP-SMP-Full-Java-3.2.90-MC-1.21.11.zip',
    originalUrl: '/downloads/PAP-SMP-Full-Java-3.2.8-ORIGINAL-MC-1.21.11.zip',
    sha1: '6613be5c0d5f97deffe3d554cb48398bcf740a6e',
    bytes: 12065159,
    sha256: 'fd74318a0d83548a4ea833d566b6db9ff5490b7ba0b13e3ecf1492ad303b548b',
  },
  bedrock: { url: '/downloads/PAP-SMP-Bedrock-3.2.90.mcpack', bytes: 9477851, sha256: '54f58c36e3ebdf996da208c91bbcf5d90f71905fb591c1699dac7c80ee0961a1' },
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

export const resourcePackAnswer = `Die aktuellen Java- und Bedrock-Packs stehen im Downloadbereich: ${packRelease.label}, Ressourcenstand ${packRelease.revision}. Enthalten sind die überarbeiteten Schutzanlagen, PAP und BO, Schinken mit Cowboyhut und Halsband, Peace-Krone und Purge-Maske, PAP-Totem, das Herz mit erhaltenem Puls und die Phönix-Elytra. Eigene Brustpanzer, Hosen und Schuhe entfallen. Die Packs allein aktivieren keine Serverfunktionen und gewähren keinen Alpha-Zugang. Einspielhilfe, passendes Geyser-Overlay und Prüfsummen sind verlinkt; der Prüfbericht nennt echte Client-Nachweise und verbleibende Tests.`;
