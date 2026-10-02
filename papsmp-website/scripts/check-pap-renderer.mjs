import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
const source=fs.readFileSync(new URL('../src/scripts/pap-renderer.ts',import.meta.url),'utf8');
const exports={};
const code=source.slice(source.indexOf('type NativeRig='));
vm.runInNewContext(ts.transpileModule(code,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,{exports,console:{error(){}},PapCompanion:class{},manifest:{}});
function fixture(load=()=>Promise.resolve()){
  const calls=[];const pet={load,cancelAction:()=>calls.push(['cancel']),setEngaged:x=>calls.push(['engaged',x]),setDragging:x=>calls.push(['dragging',x]),setQuiet:x=>calls.push(['quiet',x]),stop:()=>calls.push(['pause']),resume:()=>calls.push(['resume']),track:(x,y)=>calls.push(['track',x,y]),play:name=>{calls.push(['play',name]);return true;},destroy:()=>calls.push(['destroy'])};
  const root={dataset:{animation:'idle'}},canvas={};return {renderer:exports.createPapRenderer(root,canvas,()=>pet),root,calls};
}
let checks=0;const check=async fn=>{await fn();checks++;};
await check(async()=>{const f=fixture();await f.renderer.ready;assert.equal(f.root.dataset.ready,'true');f.renderer.draw(0,'wave','attentive');f.renderer.draw(0,'wave','attentive');assert.equal(f.calls.filter(x=>x[0]==='play').length,1);assert.equal(f.calls.find(x=>x[0]==='play')[1],'greeting');});
await check(()=>{const f=fixture();f.renderer.draw(0,'hop','happy');f.renderer.draw(0,'idle','typing');assert.deepEqual(f.calls.at(-1),['cancel']);assert(f.calls.some(x=>x[0]==='engaged'&&x[1]));assert.equal(f.root.dataset.state,'typing');});
await check(()=>{const f=fixture();f.renderer.draw(0,'wave','dragging');assert(f.calls.some(x=>x[0]==='dragging'&&x[1]));assert(!f.calls.some(x=>x[0]==='play'));f.renderer.draw(0,'idle','idle');assert(f.calls.some(x=>x[0]==='dragging'&&!x[1]));});
await check(()=>{const f=fixture();f.renderer.setPaused(true);f.renderer.setPaused(true);f.renderer.draw(0,'tail','idle');assert.equal(f.calls.filter(x=>x[0]==='pause').length,1);assert(!f.calls.some(x=>x[0]==='play'));f.renderer.setPaused(false);assert.deepEqual(f.calls.at(-1),['resume']);});
await check(()=>{const f=fixture();f.renderer.draw(2,'ears','rest');assert(f.calls.some(x=>x[0]==='quiet'&&x[1]));assert(!f.calls.some(x=>x[0]==='play'));f.renderer.draw(0,'idle','attentive');assert(f.calls.some(x=>x[0]==='quiet'&&!x[1]));});
await check(()=>{const f=fixture();f.renderer.track(123,321);assert.deepEqual(f.calls.at(-1),['track',123,321]);for(const action of ['ears','tail','blink','curious','hop']){f.renderer.draw(0,action,'idle');assert.deepEqual(f.calls.at(-1),['play',action]);}});
await check(async()=>{let finish;const f=fixture(()=>new Promise(resolve=>{finish=resolve;}));f.renderer.stop();finish();await f.renderer.ready;assert.equal(f.root.dataset.ready,undefined);assert(f.calls.some(x=>x[0]==='destroy'));});
await check(async()=>{const f=fixture(()=>Promise.reject(Error('missing layer')));await f.renderer.ready;assert.equal(f.root.dataset.ready,'false');assert.equal(f.root.dataset.renderError,'true');assert(f.calls.some(x=>x[0]==='destroy'));});
console.log(`PAP renderer lifecycle checks: ${checks} passed`);
