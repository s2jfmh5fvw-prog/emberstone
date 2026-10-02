import assert from 'node:assert/strict';
import {PapCompanion} from '../src/scripts/pap-native.js';

// Browser signals and image loading are controlled; all lifecycle methods are production code.
let frames=new Map(),frameId=0,hidden=false,reduced=false;
const events=new Map();
globalThis.document={baseURI:'https://papsmp.de/',get hidden(){return hidden;},addEventListener:(name,fn)=>events.set(name,fn),removeEventListener:(name,fn)=>{if(events.get(name)===fn)events.delete(name);}};
globalThis.matchMedia=()=>({get matches(){return reduced;},addEventListener:(_name,fn)=>events.set('motion',fn),removeEventListener:()=>events.delete('motion')});
globalThis.requestAnimationFrame=fn=>{frames.set(++frameId,fn);return frameId;};
globalThis.cancelAnimationFrame=id=>frames.delete(id);
globalThis.Image=class {set src(_){queueMicrotask(()=>this.onload());}};
class Pet extends PapCompanion {
  render(p){this.pose=p;this.canvas.dataset.renderId=String(++this.renderCount);}
}
const manifest={outputCanvas:[320,320],layers:{body:{file:'pap-body.webp'}},targetFps:30};
function fixture(){frames.clear();hidden=false;reduced=false;events.clear();return new Pet({dataset:{},getContext:()=>({}),getBoundingClientRect:()=>({left:0,top:0,width:144,height:144})},manifest,{automatic:false});}
let checks=0;async function check(fn){await fn();checks++;}
await check(async()=>{const p=fixture();p.stop();await p.load();assert(p.renderCount>0,'Pause before loading must still display PAP');assert.equal(p.canvas.dataset.motion,'paused');assert.equal(frames.size,0);p.resume();assert.equal(frames.size,1);p.destroy();});
await check(async()=>{const p=fixture();reduced=true;events.get('motion')();await p.load();assert(p.renderCount>0);assert.equal(p.canvas.dataset.motion,'reduced');assert.equal(frames.size,0);assert.equal(p.play('greeting'),false);p.destroy();});
await check(async()=>{const p=fixture();p.setQuiet(true);await p.load();assert.equal(p.pose.blink,1);assert.equal(frames.size,0);p.setQuiet(false);assert.equal(frames.size,1);p.destroy();});
await check(async()=>{const p=fixture();await p.load();p.play('greeting');p.setEngaged(true);assert.equal(p.action,null);assert.equal(p.play('hop'),false);p.track(900,200);assert.deepEqual(p.target,{x:0,y:0});p.destroy();});
await check(async()=>{const p=fixture();await p.load();p.setDragging(true);assert.equal(frames.size,0);assert.equal(p.play('hop'),false);p.setDragging(false);assert.equal(frames.size,1);p.destroy();});
await check(async()=>{const p=fixture();await p.load();hidden=true;events.get('visibilitychange')();assert.equal(frames.size,0);hidden=false;events.get('visibilitychange')();assert.equal(frames.size,1);p.destroy();assert.equal(frames.size,0);assert.equal(events.size,0);});
await check(async()=>{const p=fixture();const loading=p.load();p.destroy();await loading;assert.equal(p.ready,undefined);assert.equal(frames.size,0);assert.deepEqual(p.images,{});});
await check(async()=>{const p=fixture();await p.load();p.nextAction=-Infinity;frames.clear();p.tick(performance.now());assert.equal(p.action,null,'Manual planner must not trigger another autonomous gesture');p.destroy();});
console.log(`PAP native lifecycle checks: ${checks} passed`);
