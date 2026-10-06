export const alpha = {
  date: '01.11.2026', dateISO: '2026-11-01', dateStatus: 'Voraussichtlicher Start',
  rulesConfirmed: false, billingConfirmed: false, deliveryVerified: false,
} as const;

export const products = [
  { id: 'vip', name: 'VIP', price: '4,99 €', icon: 'crest', label: 'Für deine PAP-Runde',
    description: 'VIP-Status und ein eigener kleiner Begleiter für deinen Windows-Desktop.',
    includes: ['VIP-Status', 'Tägliche VIP-Crate', 'Alpha-Zugang zur PAP-Pet-Demo für Windows (.exe)', '500 Shards'],
    note: 'Abrechnungszeitraum, Laufzeit und die Vergabe der 500 Shards werden vor der Shopöffnung bestätigt.' },
  { id: 'shards-150', name: '150 Shards', price: '1,99 €', icon: 'shard', label: 'Shard Shop',
    description: 'Ein Paket mit 150 Shards für dein verknüpftes Minecraft-Konto.',
    includes: ['150 Shards ingame'], note: 'Shards sind eine virtuelle Serverwährung. Für dieses Angebot ist die Kaufanbindung noch in Vorbereitung.' },
  { id: 'shop-key', name: 'shop-key', price: '0,99 €', icon: 'key', label: 'Key Shop · Platzhalter',
    description: 'Ein Shop-Key für dein Minecraft-Konto. Der Produktname ist vorläufig.',
    includes: ['1 shop-key ingame'], note: 'Zugehörige Crate, Inhalt und gegebenenfalls Gewinnchancen werden vor einem Kauf veröffentlicht.' },
] as const;
