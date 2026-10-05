export const packRelease = {
  label: 'Alpha v1.0 RC1',
  revision: '3.2.9',
  java: {
    url: '/downloads/PAP-SMP-Full-Java-3.2.9-Alpha-v1.0-RC1-MC-1.21.11.zip',
    bytes: 11224161,
    sha256: 'D6B7A0B50C67D524266FCC060CB492EE2395DD07DD2FD40268861B8EC93A8D04',
  },
  bedrock: {
    url: '/downloads/PAP-SMP-Bedrock-3.2.9-Alpha-v1.0-RC1.mcpack',
    bytes: 8852614,
    sha256: '97A472AFD45FF325ABDAFD38A9E57E0673E258C5376EA7FFE1E5EB9859755389',
  },
  overlay: '/downloads/PAP-SMP-Geyser-Overlay-3.2.9-Alpha-v1.0-RC1.zip',
  mappings: '/downloads/PAP-SMP-Custom-Mappings-3.2.9.json',
  travel: '/downloads/PAP-SMP-Travel-Menu-1.4.0-alpha.2.zip',
  installation: '/downloads/PAP-SMP-Alpha-v1.0-RC1-INSTALLATION.md',
  report: '/downloads/PAP-SMP-Alpha-v1.0-RC1-PRUEFBERICHT.md',
  checksums: '/downloads/PAP-SMP-Alpha-v1.0-RC1-SHA256.txt',
} as const;

export function packSize(bytes: number) {
  return `${new Intl.NumberFormat('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(bytes / 1_000_000)} MB`;
}

export const resourcePackAnswer = `Die aktuellen Java- und Bedrock-Packs stehen im Downloadbereich: ${packRelease.label}, Ressourcenstand ${packRelease.revision}. Java ist für Minecraft 1.21.11 vorgesehen, Bedrock für den Java-Server über Geyser. SHA-256-Prüfsummen, Server-Overlay und Installationshinweise sind verlinkt. Die Sichtprüfung im Spiel steht noch aus; ein Pack-Download bestätigt keinen freigegebenen Bedrock-Serverzugang.`;
