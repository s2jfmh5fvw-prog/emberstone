import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
import {PapWalk} from '../src/scripts/pap-pet-walk.js';
const source=fs.readFileSync(new URL('../src/scripts/pap-pet.js',import.meta.url),'utf8').replace(/^import.*\n/,'').replace('export class PapPet','class PapPet')+'\nexports.PapPet=PapPet;';
const manifest=JSON.parse(fs.readFileSync(new URL('../src/assets/chatbot/pet-v09/manifest.json',import.meta.url)));
function fixture(){let now=0,id=0;const rafs=new Map(),draws=[],events=[],moves=[];const exports={};
 class Image{set src(value){this.url=value;queueMicrotask(()=>this.onload?.());}}
 vm.runInNewContext(source,{exports,PapWalk,Image,performance:{now:()=>now},requestAnimationFrame:fn=>{rafs.set(++id,fn);return id;},cancelAnimationFrame:id=>rafs.delete(id),Error,Math});
 const canvas={getContext:()=>({clearRect(){},drawImage:(image,...args)=>draws.push([image.url,...args])}),getBoundingClientRect:()=>({width:202})};
 const pet=new exports.PapPet(canvas,manifest,{move:x=>moves.push(x),bounds:()=>210,random:()=>.5,commit:()=>events.push('commit'),observe:data=>events.push(data),error:error=>{throw error;}});
 async function advance(seconds){for(let i=0;i<seconds*60;i++){now+=1000/60;const pending=[...rafs.values()];rafs.clear();for(const fn of pending)await fn(now);}}
 return {pet,draws,events,moves,advance,rafs};}
let checks=0;async function check(fn){await fn();checks++;}
await check(async()=>{const f=fixture();f.pet.setPaused(true);await f.pet.load();assert(f.draws.length>0);assert.equal(f.rafs.size,0);f.pet.destroy();});
await check(async()=>{const f=fixture();await f.pet.load();f.pet.play('walk');await f.advance(18);assert(f.moves.some(x=>x<-90));assert.equal(f.moves.at(-1),0);assert(f.events.some(x=>x.clip==='walk_left'));assert(f.events.some(x=>x.clip==='walk_right'));assert(f.events.every(x=>!x.cachedPages||x.cachedPages<=4));f.pet.destroy();});
await check(async()=>{const f=fixture();await f.pet.load();f.pet.play('walk');await f.advance(2);f.pet.setState('typing');const x=f.moves.at(-1);await f.advance(5);assert.equal(f.moves.at(-1),x);assert.equal(f.pet.play('walk'),false);f.pet.destroy();});
await check(async()=>{const f=fixture();await f.pet.load();f.pet.setState('rest');await f.advance(2);assert.equal(f.pet.clip,'sleep_left');f.pet.setState('idle');f.pet.setState('attentive');await f.advance(.2);assert.equal(f.pet.clip,'wake_left');await f.advance(4);assert.equal(f.pet.clip,'sit_left');f.pet.destroy();});
await check(async()=>{const f=fixture();await f.pet.load();f.pet.play('walk');await f.advance(1);f.pet.setPaused(true);const x=f.moves.at(-1),n=f.draws.length;await f.advance(5);assert.equal(f.draws.length,n);assert.equal(f.moves.at(-1),x);f.pet.setPaused(false);await f.advance(18);assert.equal(f.moves.at(-1),0);f.pet.destroy();});
await check(async()=>{const f=fixture();await f.pet.load();f.pet.setReduced(true);f.pet.setState('rest');await f.advance(1);assert.equal(f.pet.clip,'sleep_left');const n=f.draws.length;await f.advance(4);assert.equal(f.draws.length,n);assert.equal(f.pet.play('walk'),false);f.pet.destroy();});
await check(async()=>{const f=fixture();await f.pet.load();f.pet.play('walk');await f.advance(2);f.pet.setState('dragging');await f.advance(1);assert(f.events.includes('commit'));assert.equal(f.pet.walk.x,0);f.pet.destroy();assert.equal(f.rafs.size,0);});
await check(async()=>{const f=fixture();const ready=f.pet.load();f.pet.destroy();await ready;assert.equal(f.rafs.size,0);assert.equal(f.draws.length,0);});
console.log(`PAP PET lifecycle checks: ${checks} passed`);
