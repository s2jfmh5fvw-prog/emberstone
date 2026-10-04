import {PapWalk} from './pap-pet-walk.js';

/** Original PAP 0.9 frames. The website planner owns actions; this renderer owns poses and distance gait. */
export class PapPet {
  constructor(canvas,manifest,options={}){
    this.canvas=canvas;this.ctx=canvas.getContext('2d');this.manifest=manifest;this.options=options;
    this.cache=new Map();this.walk=new PapWalk(options.random??Math.random);
    this.state='idle';this.pose='idle';this.face='left';this.clip='idle_left';this.queue=[];
    this.elapsed=0;this.last=0;this.raf=0;this.token=0;this.ready=false;this.dead=false;this.paused=false;this.reduced=false;
    this.route=null;this.dwell=0;this.pending=false;this.frame=-1;
    canvas.width=224;canvas.height=150;this.ctx.imageSmoothingEnabled=false;
  }
  async image(url){
    if(this.cache.has(url)){const result=this.cache.get(url);this.cache.delete(url);this.cache.set(url,result);return result;}
    const result=new Promise((resolve,reject)=>{const image=new Image();image.onload=()=>resolve(image);image.onerror=()=>reject(Error('PAP image missing'));image.src=url;});
    this.cache.set(url,result);while(this.cache.size>4)this.cache.delete(this.cache.keys().next().value);return result;
  }
  async load(){await this.change('idle');if(this.dead)return;this.ready=true;await this.base();this.start();}
  async enter(name,token){
    const clip=this.manifest.clips[name];if(!clip)throw Error('PAP pose missing: '+name);
    const image=await this.image(clip.pages[0]);if(token!==this.token||this.dead)return false;
    this.clip=name;this.elapsed=0;this.frame=0;this.last=performance.now();this.paint(image,0);return true;
  }
  paint(image,index){
    this.ctx.clearRect(0,0,224,150);const cell=index%32;
    this.ctx.drawImage(image,(cell%8)*224,Math.floor(cell/8)*150,224,150,0,0,224,150);
    this.options.observe?.({clip:this.clip,frame:index,walking:this.walk.active,x:this.walk.x,cachedPages:this.cache.size});
  }
  async change(pose,returnTo=null){
    if(this.dead)return;const token=++this.token;this.pending=true;
    const origin=this.clip.replace(/_(left|right)$/,'');
    const transition=origin==='walk'&&pose==='idle'?`walk${this.walk.transitionBin}_to_idle_${this.face}`:`${origin}_to_${pose}_${this.face}`;
    this.pose=pose;this.queue=[];
    if(!this.reduced&&this.manifest.clips[transition])this.queue.push(transition);
    this.queue.push(`${pose}_${this.face}`);
    if(returnTo&&!this.reduced)this.queue.push(`${returnTo}_${this.face}`);
    if(this.reduced&&returnTo) this.queue=[`${returnTo}_${this.face}`];
    try{await this.enter(this.queue.shift(),token);}finally{if(token===this.token)this.pending=false;}
  }
  resting(){return this.state==='rest';}
  basePose(){return this.resting()?'sleep':this.state==='idle'?'idle':'sit';}
  base(){return this.change(this.basePose());}
  setState(state){
    if(state===this.state)return;
    const asleep=this.resting();this.state=state;this.stopWalk();
    if(!asleep&&!this.resting()&&this.pose==='wake'&&state!=='dragging'){
      this.queue=[`${this.basePose()}_${this.face}`];return;
    }
    if(state==='dragging'){this.options.commit?.();this.walk.x=0;this.options.move?.(0);}
    if(!this.ready)return;
    const next=asleep&&!this.resting()&&!this.reduced?this.change('wake',this.basePose()):this.base();
    next.catch(error=>this.fail(error));
  }
  stopWalk(){this.walk.stop();this.route=null;this.dwell=0;}
  cancelAction(){this.stopWalk();if(this.ready)this.base().catch(error=>this.fail(error));}
  resetPosition(){this.stopWalk();this.walk.x=0;this.options.move?.(0);}
  play(action){
    if(!this.ready||this.dead||this.paused||this.reduced||['rest','typing','answering','dragging'].includes(this.state))return false;
    if(action==='walk')return this.beginWalk();
    this.stopWalk();
    const pose={wave:'petted',hop:'happy',curious:'butterfly',ears:'idle',tail:'idle',blink:'idle'}[action]??action;
    if(!this.manifest.clips[`${pose}_${this.face}`])return false;
    this.change(pose,['idle','sit'].includes(pose)?null:this.basePose()).catch(error=>this.fail(error));return true;
  }
  beginWalk(){
    if(this.state!=='idle')return false;
    const available=this.options.bounds?.(this.walk.x)??0;
    this.walk.limit=Math.max(0,Math.min(210,available));if(this.walk.limit<25)return false;
    this.route=this.walk.x<-.5?'return':'out';if(this.route==='out')this.walk.outward();else this.walk.home();
    this.face=this.walk.direction;this.change('walk').catch(error=>this.fail(error));return true;
  }
  async arrived(){
    if(this.route==='out'){
      this.route='pause';this.dwell=.8+(this.options.random??Math.random)()*1.4;await this.change('idle');
    }else{this.route=null;await this.change('idle');}
  }
  setPaused(value){this.paused=value;if(value){cancelAnimationFrame(this.raf);this.raf=0;}else this.start();}
  setReduced(value){if(value===this.reduced)return;this.reduced=value;this.stopWalk();if(this.ready)this.base().catch(error=>this.fail(error));}
  start(){if(this.raf||this.dead||this.paused||!this.ready)return;this.last=performance.now();this.raf=requestAnimationFrame(now=>this.tick(now));}
  async tick(now){
    this.raf=0;if(this.dead||this.paused)return;
    const dt=Math.min(.08,Math.max(0,(now-this.last)/1000));this.last=now;const token=this.token;
    try{
      if(!this.reduced&&!this.pending){
        if(this.route==='pause'&&!this.queue.length){this.dwell-=dt;if(this.dwell<=0){this.route='return';this.walk.home();this.face='right';await this.change('walk');}}
        let arrived=false;
        if(this.walk.active&&this.clip===`walk_${this.face}`){const step=this.walk.step(dt,this.canvas.getBoundingClientRect().width);this.options.move?.(this.walk.x);arrived=step.arrived;}
        const clip=this.manifest.clips[this.clip];this.elapsed+=dt;
        if(this.elapsed*clip.fps>=clip.count){
          if(this.queue.length){await this.enter(this.queue.shift(),this.token);if(!this.queue.length)this.pose=this.clip.replace(/_(left|right)$/,'');}
          else if(clip.loop)this.elapsed%=clip.count/clip.fps;
        }
        const active=this.manifest.clips[this.clip];
        const index=this.clip===`walk_${this.face}`?Math.floor(this.walk.phase*active.count):Math.min(active.count-1,Math.floor(this.elapsed*active.fps));
        if(index!==this.frame){const renderToken=this.token,image=await this.image(active.pages[Math.floor(index/32)]);if(renderToken===this.token&&!this.dead&&!this.paused){this.frame=index;this.paint(image,index);}}
        if(arrived&&this.route&&token===this.token)await this.arrived();
      }
    }catch(error){this.fail(error);return;}
    if(!this.dead&&!this.paused){this.last=performance.now();this.raf=requestAnimationFrame(next=>this.tick(next));}
  }
  fail(error){this.options.error?.(error);this.destroy();}
  destroy(){this.dead=true;++this.token;cancelAnimationFrame(this.raf);this.raf=0;this.stopWalk();this.cache.clear();}
}
