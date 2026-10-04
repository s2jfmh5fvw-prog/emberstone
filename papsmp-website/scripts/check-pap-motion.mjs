import assert from 'node:assert/strict';
import fs from 'node:fs';import vm from 'node:vm';import ts from 'typescript';
const exports={};vm.runInNewContext(ts.transpileModule(fs.readFileSync(new URL('../src/scripts/pap-motion.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,{exports});
let checks=0;
function fixture(random=()=>0){let now=0,id=0;const timers=new Map(),frames=[];const clock={set:(fn,delay)=>{timers.set(++id,{at:now+delay,fn});return id;},clear:id=>timers.delete(id),now:()=>now};const motion=new exports.PapMotion((frame,gesture,state)=>frames.push({at:now,frame,gesture,state}),clock,random);function advance(ms){const end=now+ms;let n=0;while(true){const next=[...timers].sort((a,b)=>a[1].at-b[1].at)[0];if(!next||next[1].at>end)break;if(++n>1000)throw Error('loop');now=next[1].at;timers.delete(next[0]);next[1].fn();}now=end;}return {motion,advance,timers,frames};}
const check=fn=>{fn();checks++;};
check(()=>{const f=fixture();f.motion.setState('idle');f.advance(17999);assert.equal(f.frames.length,1);f.advance(1);assert.equal(f.frames.at(-1).gesture,'walk');f.advance(22000);assert.equal(f.frames.at(-1).gesture,'idle');assert.equal(f.timers.size,1);});
check(()=>{const f=fixture();f.motion.setState('idle');f.advance(58000);assert.equal(f.frames.at(-1).gesture,'blink');});
for(const state of ['typing','dragging','answering'])check(()=>{const f=fixture();f.motion.play('walk');f.motion.setState(state);const count=f.frames.length;f.motion.play('curious');f.advance(120000);assert.equal(f.frames.length,count);assert.equal(f.timers.size,0);});
check(()=>{const f=fixture();f.motion.play('walk');f.motion.setPaused(true);const count=f.frames.length;f.advance(120000);assert.equal(f.frames.length,count);f.motion.setPaused(false);assert.equal(f.timers.size,1);});
check(()=>{const f=fixture();f.motion.setQuiet(true);f.advance(60000);assert.equal(f.frames.at(-1).state,'rest');assert.equal(f.timers.size,0);f.motion.setQuiet(false);assert.equal(f.frames.at(-1).state,'idle');assert.equal(f.timers.size,1);});
check(()=>{const f=fixture();f.motion.play('wave');f.advance(2010);assert.equal(f.frames.at(-1).gesture,'idle');});
check(()=>{const f=fixture();f.motion.play('walk');f.advance(100);f.motion.play('blink');f.advance(330);assert.equal(f.frames.at(-1).gesture,'idle');assert.equal(f.timers.size,1);});
check(()=>{const f=fixture();f.motion.setState('idle');f.advance(260000);assert.equal(f.motion.resting,true);assert.equal(f.timers.size,0);});
check(()=>{const f=fixture();f.motion.setState('attentive');f.advance(260000);assert(!f.frames.some(x=>x.gesture==='walk'));assert.equal(f.motion.resting,false);});
check(()=>{const f=fixture();f.motion.setState('idle');f.advance(150000);f.motion.touch();f.advance(100000);assert.equal(f.motion.resting,false);});
check(()=>{const f=fixture();f.motion.setState('idle');f.motion.dispose();f.advance(60000);assert.equal(f.timers.size,0);assert.equal(f.frames.length,1);});
console.log(`PAP behavior checks: ${checks} passed`);
