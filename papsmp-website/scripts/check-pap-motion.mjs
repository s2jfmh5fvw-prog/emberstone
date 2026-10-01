import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
const exports={};
vm.runInNewContext(ts.transpileModule(fs.readFileSync(new URL('../src/scripts/pap-motion.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,{exports});
const {PapMotion}=exports;
let checks=0;
function fixture(random=()=>0){
  let now=0,id=0;const timers=new Map(),frames=[];
  const clock={set:(fn,delay)=>{timers.set(++id,{at:now+delay,fn});return id;},clear:id=>timers.delete(id),now:()=>now};
  const motion=new PapMotion((frame,gesture,state)=>frames.push({at:now,frame,gesture,state}),clock,random);
  function advance(ms){const end=now+ms;let count=0;while(true){const next=[...timers].sort((a,b)=>a[1].at-b[1].at)[0];if(!next||next[1].at>end)break;if(++count>1000)throw Error('Timer loop');now=next[1].at;timers.delete(next[0]);next[1].fn();}now=end;}
  return {motion,advance,timers,frames};
}
function check(fn){fn();checks++;}
check(()=>{const f=fixture();f.motion.setState('idle');f.advance(11999);assert.equal(f.frames.length,1);f.advance(1);assert.equal(f.frames.at(-1).gesture,'blink');f.advance(220);assert.equal(f.frames.at(-1).gesture,'idle');assert.equal(f.timers.size,1);});
check(()=>{const f=fixture();f.motion.setState('idle');f.advance(12300);f.advance(12000);assert.equal(f.frames.at(-1).gesture,'curious');});
for(const state of ['typing','dragging','answering'])check(()=>{const f=fixture();f.motion.play('wave');f.motion.setState(state);const count=f.frames.length;f.motion.play('curious');f.advance(120000);assert.equal(f.frames.length,count);assert.equal(f.timers.size,0);assert.equal(f.frames.at(-1).state,state);});
check(()=>{const f=fixture();f.motion.play('wave');f.advance(300);f.motion.setPaused(true);const count=f.frames.length;f.advance(120000);assert.equal(f.frames.length,count);assert.equal(f.timers.size,0);f.motion.setPaused(false);assert.equal(f.timers.size,1);});
check(()=>{const f=fixture();f.motion.setQuiet(true);f.motion.play('wave');f.advance(60000);assert.equal(f.frames.at(-1).frame,2);assert.equal(f.timers.size,0);f.motion.setQuiet(false);assert.equal(f.frames.at(-1).frame,0);assert.equal(f.timers.size,1);});
check(()=>{const f=fixture();f.motion.play('wave');f.advance(1500);assert(!f.frames.some(x=>x.frame===6));assert.equal(f.frames.at(-1).gesture,'idle');});
check(()=>{const f=fixture();f.motion.play('wave');f.advance(150);f.motion.play('blink');f.advance(300);assert.equal(f.frames.at(-1).gesture,'idle');assert.equal(f.timers.size,1);});
check(()=>{const f=fixture(()=>.999);f.motion.setState('idle');f.advance(120000);const rare=f.frames.filter(x=>x.gesture==='hop');assert(rare.length>=1);assert(rare.length<=2);if(rare.length===2)assert(rare[1].at-rare[0].at>=90000);});
check(()=>{const f=fixture();f.motion.setState('idle');f.motion.dispose();f.advance(60000);assert.equal(f.timers.size,0);assert.equal(f.frames.length,1);});
console.log(`PAP behavior checks: ${checks} passed`);
