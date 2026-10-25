import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';

const app = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const root = path.resolve(app, '..');
const config = parse(fs.readFileSync(path.join(root, '.pages.yml'), 'utf8'));
const errors = [];
let checked = 0;
function validate(fields, data, location) {
  for (const field of fields) {
    const value = data?.[field.name];
    const label = `${location}.${field.name}`;
    if (value === undefined || value === null || value === '') {
      if (field.required) errors.push(`${label}: Pflichtfeld fehlt.`);
      continue;
    }
    if (field.list) {
      if (!Array.isArray(value)) { errors.push(`${label}: Liste erwartet.`); continue; }
      value.forEach((item, i) => validate([{ ...field, name: 'item', list: false }], { item }, `${label}[${i}]`));
      continue;
    }
    if (field.type === 'object') {
      if (typeof value !== 'object' || Array.isArray(value)) errors.push(`${label}: Objekt erwartet.`);
      else validate(field.fields, value, label);
    } else if (field.type === 'boolean') {
      if (typeof value !== 'boolean') errors.push(`${label}: Ein-/Aus-Wert erwartet.`);
    } else if (field.type === 'number') {
      if (typeof value !== 'number' || !Number.isFinite(value) || value < (field.options?.min ?? -Infinity) || value > (field.options?.max ?? Infinity)) errors.push(`${label}: Zahl außerhalb des erlaubten Bereichs.`);
    } else if (typeof value !== 'string') {
      errors.push(`${label}: Text erwartet.`);
    } else if (field.type === 'select') {
      const allowed = field.options.values.map(item => typeof item === 'string' ? item : item.name);
      if (!allowed.includes(value)) errors.push(`${label}: Unbekannte Auswahl.`);
    } else if (field.type === 'image') {
      const target = path.resolve(app, 'public', '.' + value);
      const publicRoot = path.resolve(app, 'public') + path.sep;
      if (!value.startsWith('/') || value.startsWith('//') || !target.startsWith(publicRoot) || !/\.(png|jpe?g|webp|gif|avif)$/i.test(value) || !fs.existsSync(target)) errors.push(`${label}: Bild fehlt oder ungültiger Bildpfad (${value}).`);
    }
    checked++;
  }
}
for (const entry of config.content) {
  if (entry.type !== 'file') continue;
  const content = JSON.parse(fs.readFileSync(path.join(root, entry.path), 'utf8'));
  validate(entry.fields, content, entry.name);
  if (entry.name === 'questions') {
    content.items.forEach((item, i) => {
      if (!item.fromRelease && !item.answer?.trim()) errors.push(`questions.items[${i}]: Eine eigene Antwort fehlt.`);
    });
  }
}
if (errors.length) {
  console.error('Website-Inhalte bitte korrigieren:\n' + errors.map(e => `- ${e}`).join('\n'));
  process.exitCode = 1;
} else console.log(`Pages CMS: ${config.content.length} Bereiche und ${checked} Felder erfolgreich geprüft.`);
