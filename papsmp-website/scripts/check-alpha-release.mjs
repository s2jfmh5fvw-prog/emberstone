import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dist=path.join(root,'dist');
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);
const html=walk(dist).filter(f=>f.endsWith('.html'));
let refs=0;const failures=[];
for(const file of html){
 const source=fs.readFileSync(file,'utf8');
 for(const match of source.matchAll(/(?:href|src)="([^"\s]+)"/g)){
  const value=match[1];if(!value.startsWith('/')||value.startsWith('//'))continue;
  const [pathname,anchor]=value.split('#');const target=path.join(dist,decodeURIComponent(pathname));
  const exists=fs.existsSync(target);const page=pathname.endsWith('/')?path.join(target,'index.html'):fs.existsSync(target)&&fs.statSync(target).isDirectory()?path.join(target,'index.html'):target;
  if(!exists)failures.push(`${path.relative(dist,file)}: missing ${value}`);
  else if(anchor&&page.endsWith('.html')&&!fs.readFileSync(page,'utf8').includes(`id="${anchor}"`))failures.push(`missing anchor ${value}`);
  refs++;
 }
 for(const match of source.matchAll(/srcset="([^"]+)"/g)){for(const candidate of match[1].split(',')){const asset=candidate.trim().split(/\s+/)[0];if(asset.startsWith('/')){assert(fs.existsSync(path.join(dist,asset)),asset);refs++;}}}
}
assert.deepEqual(failures,[]);
const home=fs.readFileSync(path.join(dist,'index.html'),'utf8');
for(const text of ['01.11.2026','4,99 €','1,99 €','0,99 €','500 Shards','pap-alpha-teaser-v023-720p.mp4','pap-alpha-teaser-v023-1080p.mp4'])assert(home.includes(text),text);
assert(!home.includes('fonts.googleapis.com'));
const shop=fs.readFileSync(path.join(dist,'shop/index.html'),'utf8');
assert(home.includes('pro Monat · Monatsabo')&&shop.includes('pro Monat · Monatsabo'),'Monthly VIP billing must be visible on both shop entry points');
const blockers=[];const legal=fs.readFileSync(path.join(root,'src/data/legal.ts'),'utf8');const alpha=fs.readFileSync(path.join(root,'src/data/alpha.ts'),'utf8');
if(/approved:\s*false/.test(legal)||html.some(f=>/\[[A-ZÄÖÜ_]+\]/.test(fs.readFileSync(f,'utf8'))))blockers.push('Betreiberangaben und freigegebene Rechtstexte fehlen.');
if(/billingConfirmed:\s*false/.test(alpha))blockers.push('VIP-Abrechnung ist offen.');
if(/shardsGrantConfirmed:\s*false/.test(alpha))blockers.push('Vergabezyklus der 500 VIP-Shards ist offen.');
if(/deliveryVerified:\s*false/.test(alpha))blockers.push('Neue Kaufanbindung und bestätigte Ingame-Lieferung fehlen.');
if(/rulesConfirmed:\s*false/.test(alpha))blockers.push('Verbindliche Alpha-Regeln und Purge-Zeitkonfiguration sind offen.');
const result={pages:html.length,local_references:refs,checks:'PASS',release_ready:blockers.length===0,blockers};
console.log(JSON.stringify(result,null,2));
if((process.argv.includes('--release')||process.env.CF_PAGES_BRANCH==='main')&&blockers.length)process.exitCode=1;
