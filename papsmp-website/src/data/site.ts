export const site = {
  name: 'PAP SMP',
  title: 'PAP SMP — Survival mit Peace am Tag und Purge in der Nacht',
  description: 'PAP SMP von yuuh92: bauen und handeln in der Peace, offene Claims und PvP in der Purge. Alpha geplant ab 01.11.2026. Infobuch, Regeln, Packs und Shopangebote.',
  canonical: 'https://papsmp.de/',
  supportEmail: 'papsupport@icloud.com',
  links: {
    discord: 'https://discord.gg/hxgnJNTp4J',
    whitelist: 'https://discord.gg/hxgnJNTp4J',
    resourcePack: undefined,
    vip: 'https://pap-vip-commerce.pap-vip-smp.workers.dev/vip',
  },
  server: { java: '104.204.219.211:25565', bedrock: undefined },
  alpha: true,
} as const;

export type PublicTarget = string | undefined;
