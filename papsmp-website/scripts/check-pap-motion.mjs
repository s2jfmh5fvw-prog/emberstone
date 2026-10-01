import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

// Execute the production controller with a clock, without hover or pointer events.
function setup(reduced = false, random = 0) {
  let now = 0, timerId = 0;
  const timers = new Map(), nodes = new Map(), frames = [];
  class Element {
    constructor() { this.listeners = {}; this.dataset = {}; this.style = {}; this.children = []; this.hidden = false; this.value = ''; this.attrs = {}; this.classes = new Set(); this.classList = { add: x => this.classes.add(x), remove: x => this.classes.delete(x), toggle: (x,on) => on ? this.classes.add(x) : this.classes.delete(x) }; }
    addEventListener(name, callback) { this.listeners[name] = callback; }
    emit(name, event = {}) { this.listeners[name]?.(event); }
    append(...items) { this.children.push(...items); }
    replaceChildren(...items) { this.children = items; }
    setAttribute(name,value) { this.attrs[name] = value; }
    getBoundingClientRect() { return { height: this === root ? 168 : 490 }; }
    focus() {}
  }
  const root = new Element();
  root.dataset.animation = 'idle';
  root.dataset.papSmooth = '/animation.webp';
  for (const key of ['.pap-panel','.pap-log','.pap-input','.pap-send','.pap-launcher','.pap-tip','.pap-character-area','.pap-restore','.pap-form','.pap-close','.pap-clear','.pap-snooze','.pap-tip-dismiss','.pap-panel-heading']) nodes.set(key,new Element());
  nodes.get('.pap-panel').hidden = true;
  const poses = [new Element(),new Element()];
  for (const pose of poses) pose.classList.add = value => { pose.classes.add(value); if (value === 'is-visible') frames.push({at:now,frame:pose.dataset.frame,sheet:pose.dataset.sheet}); };
  root.querySelector = key => nodes.get(key);
  root.querySelectorAll = key => key.includes('.pap-pose') ? poses : [];
  const document = new Element();
  document.hidden = false;
  document.querySelector = () => root;
  document.createElement = () => new Element();
  const preference = new Element(); preference.matches = reduced;
  const window = new Element();
  const context = {
    document, window, innerWidth:1200, innerHeight:800,
    matchMedia: () => preference,
    getComputedStyle: () => ({bottom:'22px'}),
    setTimeout: (callback,delay) => {const id=++timerId;timers.set(id,{at:now+delay,callback});return id;},
    clearTimeout: id => timers.delete(id),
    Math:Object.assign(Object.create(Math),{random:()=>random}),
    Image:class extends Element { set src(value) {this.url=value;this.emit('load');} get src() {return this.url ?? '';} },
    require:()=>({papGreeting:'Hello',papTopics:{},getPapAnswer:()=>({text:'FAQ'})}),
    exports:{}, URL,
  };
  const source = fs.readFileSync(new URL('../src/scripts/pap-helper.ts',import.meta.url),'utf8');
  vm.runInNewContext(ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,context);
  function advance(ms) {
    const until = now+ms;
    while(true) {
      const first = [...timers].sort((a,b)=>a[1].at-b[1].at)[0];
      if(!first || first[1].at>until) break;
      timers.delete(first[0]);now=first[1].at;first[1].callback();
    }
    now=until;
  }
  return {root,nodes,document,preference,frames,advance,timers};
}
let checks = 0;
function check(test) {test();checks++;}
check(()=>{const s=setup();s.advance(7100);assert.equal(s.root.dataset.animation,'blink');s.advance(200);assert.ok(s.frames.some(f=>f.sheet==='smooth'&&f.frame==='2'));});
check(()=>{const s=setup(false,.99);s.advance(17900);assert.equal(s.root.dataset.animation,'curious');});
check(()=>{const s=setup(false,.79);s.advance(16000);assert.equal(s.root.dataset.animation,'wave');s.advance(2000);assert.ok(s.frames.some(f=>f.sheet==='smooth'&&f.frame==='7'));assert.ok(!s.frames.some(f=>f.sheet==='smooth'&&f.frame==='6'));});
check(()=>{const s=setup(true);s.advance(60000);assert.equal(s.frames.length,0);assert.equal(s.root.dataset.animation,'idle');});
check(()=>{const s=setup();s.advance(7100);s.document.hidden=true;s.document.emit('visibilitychange');const count=s.frames.length;s.advance(60000);assert.equal(s.frames.length,count);assert.equal(s.root.dataset.animation,'idle');});
check(()=>{const s=setup();s.document.hidden=true;s.document.emit('visibilitychange');s.advance(10000);s.document.hidden=false;s.document.emit('visibilitychange');s.advance(7100);assert.equal(s.root.dataset.animation,'blink');});
check(()=>{const s=setup();s.advance(7100);s.preference.matches=true;s.preference.emit('change');const count=s.frames.length;s.advance(60000);assert.equal(s.frames.length,count);});
check(()=>{const s=setup();s.nodes.get('.pap-snooze').emit('click');const count=s.frames.length;s.advance(60000);assert.equal(s.frames.length,count);s.nodes.get('.pap-restore').emit('click');s.advance(7100);assert.equal(s.root.dataset.animation,'blink');});
console.log(`PAP motion checks: ${checks} passed (autonomous intervals, actual frames, hidden tab, reduced motion, hide/restore)`);
