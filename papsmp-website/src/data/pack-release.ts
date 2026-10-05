export const packRelease = {
  label: 'Alpha v1.0 RC2',
  revision: '3.2.10',
  java: {
    url: '/downloads/PAP-SMP-Full-Java-3.2.8-MC-1.21.11.zip',
    versionedUrl: '/downloads/PAP-SMP-Full-Java-3.2.10-Alpha-v1.0-RC2-MC-1.21.11.zip',
    originalUrl: '/downloads/PAP-SMP-Full-Java-3.2.8-ORIGINAL-MC-1.21.11.zip',
    sha1: 'f7075040436793bc3968f1649070e99d35c5fd63',
    bytes: 11215505,
    sha256: '3224F3C4ABBB16D491DDA7E27B33989CC8F6CC1C625BA6F4F306440C2DC50F42',
  },
  bedrock: {
    url: '/downloads/PAP-SMP-Bedrock-3.2.10-Alpha-v1.0-RC2.mcpack',
    bytes: 8857493,
    sha256: '0BB81F0767EA0EF8D98C554ECDB2649E5B616E0E229134357237B21089ABD8F5',
  },
  overlay: '/downloads/PAP-SMP-Geyser-Overlay-3.2.10-Alpha-v1.0-RC2.zip',
  mappings: '/downloads/PAP-SMP-Custom-Mappings-3.2.10.json',
  travel: '/downloads/PAP-SMP-Travel-Menu-1.4.0-alpha.2.zip',
  bundle: { url: '/downloads/PAP-SMP-Alpha-v1.0-RC2-Gesamtpaket.zip', bytes: 20238217 },
  preview: '/downloads/PAP-SMP-Events-UI-RC2-Iconvorschau.png',
  handoff: '/downloads/PAP-SMP-Events-UI-RC2-Datapack-Handoff.md',
  installation: '/downloads/PAP-SMP-Alpha-v1.0-RC2-INSTALLATION.md',
  report: '/downloads/PAP-SMP-Alpha-v1.0-RC2-PRUEFBERICHT.md',
  checksums: '/downloads/PAP-SMP-Alpha-v1.0-RC2-SHA256.txt',
} as const;

export function packSize(bytes: number) {
  return `${new Intl.NumberFormat('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(bytes / 1_000_000)} MB`;
}

export const resourcePackAnswer = `Die aktuellen Java- und Bedrock-Packs stehen im Downloadbereich: ${packRelease.label}, Ressourcenstand ${packRelease.revision}. Neu sind acht Event-Icons. Java 1.21.11 verwendet sie mit dem separat gelieferten Event-UI-Datapack; Bedrock nutzt native Formularbilder über Geyser/Floodgate. Im aktivierten Gesamtpaket sind diese Bilder für den Alpha-Test eingeschaltet. Installation, Vorschau, Geyser-Overlay und SHA-256-Prüfsummen sind verlinkt. Die native Sichtprüfung und Bedienung im Spiel stehen noch aus; der Download bestätigt keinen freigegebenen Serverzugang.`;
