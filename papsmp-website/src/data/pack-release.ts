export const packRelease = {
  label: 'Alpha · PAP-Naturwerk',
  revision: '3.2.18',
  java: {
    url: '/downloads/PAP-SMP-Full-Java-3.2.16-Karten-MC-1.21.11.zip',
    versionedUrl: '/downloads/PAP-SMP-Full-Java-3.2.16-Karten-MC-1.21.11.zip',
    originalUrl: '/downloads/PAP-SMP-Full-Java-3.2.8-ORIGINAL-MC-1.21.11.zip',
    sha1: '604554fab749e76564f7ed27e406c2865b08126e',
    bytes: 12092044,
    sha256: '27e88e9afe3eb70e9657720c8a76bd33eac3f4dde53e9cff6181a677298892db',
  },
  bedrock: {
    url: '/downloads/PAP-SMP-Bedrock-3.2.16-Karten.mcpack',
    bytes: 9468546,
    sha256: '2ab2259b079078d5fb010eaa81d01c8ca8caf987cc9ca30e40727d476d101407',
  },
  overlay: '/downloads/PAP-SMP-Geyser-Overlay-3.2.16-Karten.zip',
  mappings: '/downloads/PAP-SMP-Custom-Mappings-3.2.16.json',
  travel: '/downloads/PAP-SMP-Travel-Menu-1.4.0-alpha.2.zip',
  bundle: { url: '/downloads/PAP-SMP-3.2.16-Karten-Gesamtpaket.zip', bytes: 21536822 },
  preview: '/downloads/PAP-SMP-Events-UI-RC2-Iconvorschau.png',
  handoff: '/downloads/PAP-SMP-Events-UI-RC2-Datapack-Handoff.md',
  installation: '/downloads/PAP-SMP-3.2.16-INSTALLATION.md',
  report: '/downloads/PAP-SMP-3.2.16-PRUEFBERICHT.md',
  checksums: '/downloads/PAP-SMP-3.2.16-SHA256.txt',
} as const;

export function packSize(bytes: number) {
  return `${new Intl.NumberFormat('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(bytes / 1_000_000)} MB`;
}

export const resourcePackAnswer = `Die aktuellen Java- und Bedrock-Packs stehen im Downloadbereich: ${packRelease.label}, Ressourcenstand ${packRelease.revision}. 3.2.18 ergänzt die freigegebenen Naturmodelle für Barrikaden, Dornen, Windglocke, Reifblüte, Wurzelbogen und Hainanker. PAP-/Bo-Chibis, Menüs, Event-Icons sowie der Bedrock-Pausemenü-Hotfix aus 3.2.17 bleiben erhalten. Bestehende Downloadadressen und Pack-UUIDs bleiben gleich. Die Pack-Struktur und Modellgeometrie sind statisch geprüft; die tatsächliche Höhe und Ausrichtung der Modellträger sowie die grafische Java-/Bedrock-/Geyser-Abnahme bleiben offen. Die Packs allein aktivieren keine Serverfunktionen und gewähren keinen Zugang zur geschlossenen Alpha. Installation, Overlay und Prüfsummen sind verlinkt.`;
