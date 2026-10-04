// The desktop PAP binds the leg phase to travelled distance, not a timer.
export class PapWalk {
  constructor(random=Math.random){this.random=random;this.x=0;this.goal=0;this.phase=0;this.velocity=0;this.active=false;this.limit=0;}
  bounds(viewport,figureWidth,rightGap=20){
    this.limit=Math.max(0,Math.min(210,viewport-figureWidth-rightGap-14));
    this.x=Math.max(-this.limit,Math.min(0,this.x))||0;this.goal=Math.max(-this.limit,Math.min(0,this.goal))||0;return this.x;
  }
  outward(){this.goal=-Math.min(this.limit,48+this.random()*112);this.begin();}
  home(){this.goal=0;this.begin();}
  begin(){this.velocity=0;this.phase=0;this.speed=35+this.random()*18;this.active=Math.abs(this.goal-this.x)>.1;}
  stop(){this.active=false;this.velocity=0;}
  step(seconds,renderWidth){
    if(!this.active)return {arrived:false,moved:0};
    const dt=Math.max(0,Math.min(.08,seconds)),delta=this.goal-this.x;
    const deceleration=this.speed/.35,target=Math.min(this.speed,Math.sqrt(2*deceleration*Math.abs(delta)));
    this.velocity+=(target-this.velocity)*(1-Math.exp(-dt/.22));
    const move=Math.min(Math.abs(delta),dt*this.velocity),arrived=Math.abs(delta)<=Math.max(.35,move);
    const before=this.x;this.x=arrived?this.goal:this.x+Math.sign(delta)*move;
    this.phase=(this.phase+Math.abs(this.x-before)/(26*renderWidth/125.44))%1;
    if(arrived)this.stop();return {arrived,moved:this.x-before};
  }
  get direction(){return this.goal>=this.x?'right':'left';}
  get transitionBin(){return Math.round(this.phase*32)%32;}
}
