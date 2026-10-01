import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
const exports={};
vm.runInNewContext(ts.transpileModule(fs.readFileSync(new URL('../src/scripts/pap-renderer.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,{exports});
function fixture(){
  const animations=[];const nodes=new Map();
  for(const key of ['.pap-scene','.pap-arm','.pap-tail','.pap-ear-left','.pap-ear-right','.pap-arm-rest','.pap-arm-wave','.pap-shadow'])nodes.set(key,{animate:(frames,options)=>{const animation={key,frames,options,cancelled:false,cancel(){this.cancelled=true;}};animations.push(animation);return animation;}});
  const root={dataset:{animation:'idle'},querySelector:selector=>nodes.get(selector)},sprite={dataset:{},style:{}};
  return {renderer:exports.createPapRenderer(root,sprite),root,sprite,animations};
}
let checks=0;const check=fn=>{fn();checks++;};
check(()=>{const f=fixture();f.renderer.draw(0,'wave','attentive');assert.equal(f.root.dataset.renderer,'rig');assert.equal(f.animations.length,3);assert.equal(f.animations[0].key,'.pap-arm');assert(f.animations[0].frames.some(x=>x.transform==='rotate(-122deg)'));assert(f.animations.every(x=>x.options.duration===1540));});
check(()=>{const f=fixture();f.renderer.draw(0,'wave','attentive');const rest=f.animations.find(x=>x.key==='.pap-arm-rest'),wave=f.animations.find(x=>x.key==='.pap-arm-wave');assert.equal(rest.frames[2].visibility,'hidden');assert.equal(wave.frames[2].visibility,'visible');assert.equal(rest.frames[2].offset,wave.frames[2].offset);assert(![...rest.frames,...wave.frames].some(x=>'opacity' in x));});
check(()=>{const f=fixture();f.renderer.draw(0,'tail','idle');assert.equal(f.animations.length,1);assert.equal(f.animations[0].key,'.pap-tail');assert.equal(f.animations[0].options.duration,1800);});
check(()=>{const f=fixture();f.renderer.draw(0,'ears','idle');assert.deepEqual(f.animations.map(x=>x.key),['.pap-ear-left','.pap-ear-right']);assert(f.animations.every(x=>x.options.duration===680));});
check(()=>{const f=fixture();f.renderer.draw(0,'wave','attentive');f.renderer.draw(0,'idle','typing');assert(f.animations.every(x=>x.cancelled));assert.equal(f.root.dataset.animation,'idle');});
check(()=>{const f=fixture();f.renderer.draw(2,'idle','rest');assert.equal(f.root.dataset.renderer,'sprite');assert.equal(f.sprite.dataset.frame,'2');assert.equal(f.animations.length,0);});
check(()=>{const f=fixture();f.renderer.draw(13,'curious','attentive');assert.equal(f.root.dataset.renderer,'sprite');f.renderer.draw(0,'idle','idle');assert.equal(f.root.dataset.renderer,'rig');});
check(()=>{const f=fixture();f.renderer.draw(0,'tail','idle');f.renderer.draw(0,'tail','idle');assert.equal(f.animations.length,1);f.renderer.stop();assert(f.animations.every(x=>x.cancelled));});
console.log(`PAP renderer checks: ${checks} passed`);
