import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
const source=fs.readFileSync(new URL('../src/scripts/pap-renderer.ts',import.meta.url),'utf8'),exports={};
vm.runInNewContext(ts.transpileModule(source.slice(source.indexOf('type PetRig=')),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,{exports,console:{error(){}},PapPet:class{},manifest:{}});
function fixture(load=()=>Promise.resolve()){
 const calls=[],pet={load,setState:x=>calls.push(['state',x]),cancelAction:()=>calls.push(['cancel']),resetPosition:()=>calls.push(['reset']),play:x=>calls.push(['play',x]),setPaused:x=>calls.push(['pause',x]),setReduced:x=>calls.push(['reduced',x]),destroy:()=>calls.push(['destroy'])};
 const root={dataset:{}};return {renderer:exports.createPapRenderer(root,{}, {},()=>pet),root,calls};
}
let checks=0;const check=async fn=>{await fn();checks++;};
await check(async()=>{const f=fixture();await f.renderer.ready;assert.equal(f.root.dataset.ready,'true');f.renderer.draw(0,'wave','attentive');f.renderer.draw(0,'wave','attentive');assert.equal(f.calls.filter(x=>x[0]==='play').length,1);assert.deepEqual(f.calls.at(-1),['play','wave']);});
await check(()=>{const f=fixture();f.renderer.draw(0,'hop','happy');f.renderer.draw(0,'idle','typing');assert(f.calls.some(x=>x[0]==='state'&&x[1]==='typing'));assert.equal(f.root.dataset.state,'typing');});
await check(()=>{const f=fixture();f.renderer.draw(0,'walk','dragging');assert(!f.calls.some(x=>x[0]==='play'));assert.deepEqual(f.calls.at(-1),['state','dragging']);});
await check(()=>{const f=fixture();f.renderer.setPaused(true);f.renderer.setPaused(true);f.renderer.draw(0,'walk','idle');assert.equal(f.calls.filter(x=>x[0]==='pause').length,1);assert(!f.calls.some(x=>x[0]==='play'));f.renderer.setPaused(false);assert.deepEqual(f.calls.at(-1),['pause',false]);});
await check(()=>{const f=fixture();f.renderer.draw(2,'idle','rest');f.renderer.draw(0,'idle','attentive');assert.deepEqual(f.calls.at(-1),['state','attentive']);assert(!f.calls.some(x=>x[0]==='cancel'));});
await check(()=>{const f=fixture();f.renderer.setReduced(true);f.renderer.draw(0,'wave','idle');assert(!f.calls.some(x=>x[0]==='play'));f.renderer.resetPosition();assert.deepEqual(f.calls.at(-1),['reset']);});
await check(async()=>{let finish;const f=fixture(()=>new Promise(resolve=>{finish=resolve;}));f.renderer.stop();finish();await f.renderer.ready;assert.equal(f.root.dataset.ready,undefined);assert(f.calls.some(x=>x[0]==='destroy'));});
await check(async()=>{const f=fixture(()=>Promise.reject(Error('missing')));await f.renderer.ready;assert.equal(f.root.dataset.ready,'false');assert.equal(f.root.dataset.renderError,'true');});
console.log(`PAP renderer lifecycle checks: ${checks} passed`);
