export type PapState = 'idle'|'attentive'|'dragging'|'typing'|'answering'|'happy'|'rest';
export type Gesture = 'blink'|'curious'|'wave'|'hop'|'ears'|'tail';
type Clock = { set:(fn:()=>void,delay:number)=>number; clear:(id:number)=>void; now:()=>number };
const durations:Record<Gesture,number>={blink:320,curious:3500,wave:3000,hop:1650,ears:1000,tail:2200};
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
    this.cancel();this.last=action;if(action==='wave'||action==='hop')this.rareAt=this.clock.now();
    this.draw(0,action,this.state);
    this.after(()=>{this.draw(0,'idle',this.state);this.schedule();},durations[action]);
  }
  private schedule(){
    if(this.paused||this.quiet||this.protected())return;
    const slower=this.clock.now()-this.touchedAt>180000?2:1;
    this.after(()=>{
      const pool:Gesture[]=['blink','blink','blink','curious','ears','tail'];
      if(this.clock.now()-this.rareAt>90000)pool.push('wave','hop');
      const choices=pool.filter(x=>x!==this.last);
      this.play(choices[Math.floor(this.random()*choices.length)]);
    },(12000+this.random()*16000)*slower);
  }
  dispose(){this.cancel();}
}
