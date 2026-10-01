export const site = {
  name: 'PAP SMP',
  title: 'PAP SMP — Survival mit Peace am Tag und Purge in der Nacht',
  description: 'Entdecke PAP SMP: ein deutscher Minecraft-Survival-Server in der Alpha. Tagsüber wächst deine Welt, in der Purge-Nacht wechselt der Rhythmus. Infos zu Zugang, Editionen und Downloads.',
  canonical: 'https://papsmp.de/',
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
