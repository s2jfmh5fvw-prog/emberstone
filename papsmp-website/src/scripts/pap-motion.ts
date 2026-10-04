export type PapState = 'idle'|'attentive'|'dragging'|'typing'|'answering'|'happy'|'rest';
export type Gesture = 'blink'|'curious'|'wave'|'hop'|'ears'|'tail'|'walk'|'yawn'|'stretch'|'leaf'|'firefly';
type Clock = { set:(fn:()=>void,delay:number)=>number; clear:(id:number)=>void; now:()=>number };
const durations:Record<Gesture,number>={blink:320,curious:6000,wave:2000,hop:3000,ears:1000,tail:2200,walk:22000,yawn:6000,stretch:4000,leaf:6000,firefly:6000};
export class PapMotion {
  state:PapState='idle';
  private timers:number[]=[];
  private last:Gesture|undefined;
  private rareAt=-Infinity;
  private touchedAt:number;
  private quiet=false;
  private paused=false;
  constructor(private draw:(frame:number,gesture:string,state:PapState)=>void,private clock:Clock,private random=()=>Math.random()) {this.touchedAt=clock.now();}
  private cancel(){this.timers.forEach(id=>this.clock.clear(id));this.timers=[];}
  private after(fn:()=>void,delay:number){this.timers.push(this.clock.set(fn,delay));}
  private protected(){return this.state==='typing'||this.state==='dragging'||this.state==='answering';}
  setState(state:PapState){this.cancel();this.state=state;this.draw(this.quiet?2:0,'idle',state);if(!this.protected())this.schedule();}
  touch(){this.touchedAt=this.clock.now();}
  setQuiet(value:boolean){this.quiet=value;this.setState(value?'rest':'idle');}
  setPaused(value:boolean){this.paused=value;this.cancel();this.draw(this.quiet?2:0,'idle',this.state);if(!value)this.schedule();}
  get resting(){return this.quiet;}
  play(action:Gesture){
    if(this.paused||this.quiet||this.protected())return;
    this.cancel();this.last=action;if(['wave','hop','curious','firefly'].includes(action))this.rareAt=this.clock.now();
    this.draw(0,action,this.state);
    this.after(()=>{this.draw(0,'idle',this.state);this.schedule();},durations[action]);
  }
  private schedule(){
    if(this.paused||this.quiet||this.protected())return;
    this.after(()=>{
      if(this.state==='idle'&&this.clock.now()-this.touchedAt>180000){this.setQuiet(true);return;}
      const pool:Gesture[]=this.state==='idle'?['walk','walk','walk','blink','stretch','yawn','leaf']:['blink','blink','blink'];
      if(this.state==='idle'&&this.clock.now()-this.rareAt>90000)pool.push('curious','firefly');
      const filtered=pool.filter(x=>x!==this.last),choices=filtered.length?filtered:pool;
      this.play(choices[Math.floor(this.random()*choices.length)]);
    },18000+this.random()*26000);
  }
  dispose(){this.cancel();}
}
