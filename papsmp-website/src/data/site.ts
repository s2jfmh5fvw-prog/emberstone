export const site = {
  name: 'PAP SMP',
  title: 'PAP SMP — Peace am Tag. Purge in der Nacht.',
  description: 'PAP SMP ist ein deutscher Alpha-Survival-Server mit Peace-and-Purge-Konzept und Java-/Bedrock-Crossplay.',
  canonical: 'https://papsmp.de/',
  links: { discord: 'https://discord.gg/hxgnJNTp4J', whitelist: 'https://discord.gg/hxgnJNTp4J', resourcePack: undefined, vip: undefined },
  server: { java: '104.204.219.211:25565', bedrock: undefined },
  alpha: true,
} as const;

export type PublicTarget = string | undefined;
