import { faqs } from './faq';
import { site } from './site';

export type PapAnswer = { text: string; mood?: 'greeting' | 'speaking' | 'happy' | 'curious'; links?: { label: string; url: string }[] };
export type PapTopic = PapAnswer & { title: string; words: string[] };
const discord = { label: 'PAP SMP auf Discord', url: site.links.discord };
const downloads = { label: 'Zu den Resource Packs', url: `${site.canonical}#availability-title` };
export const papGreeting = 'Hey! Ich bin PAP, dein kleiner Website-Helfer. 🦊 Ich kenne die Infos zur Alpha, zu Java und Bedrock, den Downloads und VIP. Einen kleinen Minecraft-Witz habe ich auch parat.';
export const papTopics: Record<string, PapTopic> = {
  join: { title: 'Wie komme ich auf den Server?', words: ['beitreten', 'zugang', 'whitelist', 'freischalt', 'anmeld', 'alpha', 'einstieg', 'mitspielen', 'spieler', 'join', 'auf den server', 'zum server'], text: faqs[1][1], links: [discord] },
  editions: { title: 'Java oder Bedrock?', words: ['bedrock', 'geyser', 'crossplay', 'handy', 'konsole', 'playstation', 'xbox', 'switch', 'edition', 'plattform'], text: faqs[3][1], links: [discord, downloads] },
  java: { title: 'Wie lautet die Java-Adresse?', words: ['java', 'adresse', 'ip', 'serveradresse', 'port'], text: `Die veröffentlichte Java-Adresse lautet ${site.server.java}. Für die Freischaltung und aktuelle Alpha-Hinweise schau bitte auf Discord vorbei.`, links: [discord] },
  pack: { title: 'Wo finde ich das Resourcepack?', words: ['resource', 'ressource', 'pack', 'download', 'textur', 'mcpack', 'prufsumme', 'sha256'], text: 'Die aktuellen Java- und Bedrock-Resource-Packs findest du im Downloadbereich. Achte auf die passende Edition, die angezeigte Version und die SHA-256-Prüfsumme. Die Bedrock-Dateien bestätigen noch keinen freigegebenen Bedrock-Serverzugang.', links: [downloads] },
  shop: { title: 'Gibt es VIP oder einen Shop?', words: ['vip', 'shop', 'preis', 'kosten', 'kaufen', 'paypal', 'shards', 'kit', 'abo'], text: faqs[5][1] + ' Verbindliche Preise und Bedingungen stehen direkt im Checkout. Bei Zahlungsproblemen hilft dir das PAP-Team auf Discord.', links: [{ label: 'Offizieller PAP-VIP-Checkout', url: site.links.vip }, discord] },
  discord: { title: 'Wo bekomme ich Hilfe?', words: ['discord', 'support', 'hilfe', 'ticket', 'team', 'kontakt', 'problem', 'bug', 'fehler'], text: 'Auf dem offiziellen PAP-SMP-Discord findest du die Community, aktuelle Alpha-Infos und Hilfe vom Team. Beschreibe dort dein Anliegen. Ich kann selbst keine Tickets erstellen oder deine Kontodaten prüfen.', links: [discord] },
  purge: { title: 'Was bedeutet Peace und Purge?', words: ['purge', 'peace', 'regeln', 'nacht', 'tag', 'pvp', 'kampf', 'zeiten'], text: faqs[0][1] + ' Die verbindlichen Regeln und aktuellen Abläufe findest du auf Discord. Konkrete Uhrzeiten oder Ausnahmen bestätige ich nur, wenn sie offiziell auf der Website stehen.', links: [discord] },
  about: { title: 'Was ist PAP SMP?', words: ['was ist pap', 'uber pap', 'konzept', 'survival', 'minecraft', 'smp'], text: faqs[0][1], links: [discord] },
};
const jokes = [
  'Warum hat der Creeper keinen Kalender? Weil er jeden Termin sprengt. 🦊',
  'Ich wollte ein Haus aus Obsidian bauen. Jetzt plane ich schon mal den Umbau für nächstes Jahr. 🦊',
  'Mein Minecraft-Lebenslauf? Viel Erfahrung im Fallenlassen wertvoller Gegenstände. Besonders in Lava. 🦊',
];
export function normalizePapQuery(value: string) {
  return value.toLocaleLowerCase('de').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ß/g, 'ss').trim();
}
function matchesWord(query: string, keyword: string) {
  return keyword.length <= 3 ? query.split(/[^a-z0-9]+/).includes(keyword) : query.includes(keyword);
}
export function getPapAnswer(query: string, topic?: string, jokeNumber = 0): PapAnswer {
  const normalized = normalizePapQuery(query);
  const fallback: PapAnswer = { text: 'Dazu habe ich keine bestätigte Website-Info. Ich bin ein FAQ-Helfer und kann nur die hinterlegten PAP-Antworten geben. Frag bitte auf dem offiziellen Discord nach.', mood: 'curious', links: [discord] };
  if (/\b(?:api[ -]?(?:schlussel|key)|passwort|geheimnis|token)\b/.test(normalized)) return fallback;
  if (topic === 'joke' || /\b(witz|witze|lustig|spass|joke)\b/.test(normalized)) return { text: jokes[jokeNumber % jokes.length], mood: 'happy' };
  if (topic && papTopics[topic]) return papTopics[topic];
  if (/^(hallo|hi|hey|moin|guten tag)[! .]*$/.test(normalized)) return { text: papGreeting, mood: 'greeting' };
  if (/^(danke|dankeschon|vielen dank|super|cool)[! .]*$/.test(normalized)) return { text: 'Gern! Wenn du noch eine Frage hast, bin ich hier. 🦊', mood: 'happy' };
  // Specific intent comes before broad Minecraft/about keywords.
  for (const key of ['pack', 'editions', 'shop', 'java', 'join', 'discord', 'purge', 'about']) {
    const entry = papTopics[key];
    if (entry.words.some(word => matchesWord(normalized, word))) return entry;
  }
  return fallback;
}
