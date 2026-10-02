import {clamp,mix,ease,poseFor,durations,bodyOffset,tailOffset,plantedArm,turnPoint,blink} from './pap-native-math.js';

/** PAP's free continuous 2D character rig. No model service, atlas download or framework. */
export class PapCompanion {
  constructor(canvas,manifest,{baseUrl=document.baseURI,onState=()=>{},onError=console.error,shadow=true,automatic=true}={}){
    this.canvas=canvas;this.ctx=canvas.getContext('2d');this.manifest=manifest;
    this.baseUrl=new URL(baseUrl,document.baseURI).href;this.onState=onState;this.onError=onError;this.shadow=shadow;this.automatic=automatic;this.engaged=false;
    this.images={};this.look={x:0,y:0,vx:0,vy:0};this.target={x:0,y:0};
    this.quiet=false;this.paused=false;this.dragging=false;this.destroyed=false;this.raf=0;
    this.action=null;this.transition=null;this.pointerAt=0;this.state='idle';this.lastPose=poseFor('idle',0);
    this.renderCount=0;
    this.origin=performance.now()/1000;this.lastTime=this.origin;this.lastDraw=0;this.lastSpecial=-Infinity;
    this.nextBlink=this.origin+2+Math.random()*3;this.blinkAt=-10;this.nextAction=this.origin+12+Math.random()*12;
    this.motion=matchMedia('(prefers-reduced-motion: reduce)');this.reduced=this.motion.matches;
    [canvas.width,canvas.height]=manifest.outputCanvas;
    this.onHidden=()=>{if(document.hidden)this.suspend();else{this.lastTime=performance.now()/1000;this.action=null;this.transition=null;this.nextAction=this.lastTime+12+Math.random()*12;this.start();}};
    this.onReduced=()=>{this.reduced=this.motion.matches;this.action=null;this.transition=null;this.suspend();this.renderStill();this.start();};
    document.addEventListener('visibilitychange',this.onHidden);this.motion.addEventListener('change',this.onReduced);
  }
  async load(){
    await Promise.all(Object.entries(this.manifest.layers).map(async([name,spec])=>{
      this.images[name]=await new Promise((resolve,reject)=>{
        const im=new Image();im.onload=()=>resolve(im);im.onerror=()=>reject(new Error(`PAP layer missing: ${name}`));
        im.src=new URL(spec.file,this.baseUrl).href;
      });
    }));
    if(this.destroyed){this.images={};return this;}this.ready=true;this.renderStill();this.start();return this;
  }
  setState(state){if(this.state!==state){this.state=state;this.onState(state);}this.canvas.dataset.state=state;}
  start(){
    if(!this.ready||this.destroyed||this.quiet||this.paused||this.reduced||this.dragging||document.hidden){this.renderStill();return;}
    if(!this.raf){this.lastTime=performance.now()/1000;this.raf=requestAnimationFrame(t=>this.tick(t));}
  }
  suspend(){cancelAnimationFrame(this.raf);this.raf=0;}
  stop(){this.pausedAt=performance.now()/1000;this.paused=true;this.suspend();this.canvas.dataset.motion='paused';}
  resume(){const now=performance.now()/1000;if(this.action)this.action.start+=now-(this.pausedAt??now);this.paused=false;this.lastTime=now;this.start();}
  setQuiet(quiet){this.quiet=Boolean(quiet);this.action=null;this.transition=null;this.suspend();this.look={x:0,y:0,vx:0,vy:0};this.renderStill();this.nextAction=performance.now()/1000+15;this.start();}
  setDragging(dragging){this.dragging=dragging;this.action=null;this.transition=null;this.suspend();this.target={x:0,y:0};this.renderStill();this.nextAction=performance.now()/1000+15;this.start();}
  cancelAction(){
    if(this.action){this.action=null;this.transition={from:{...this.lastPose},start:performance.now()/1000};this.setState('idle');}
  }
  setEngaged(engaged){
    this.engaged=engaged;
    if(engaged){this.cancelAction();this.target={x:0,y:0};}
  }
  track(x,y){
    if(this.quiet||this.paused||this.reduced||this.dragging||this.engaged)return;
    const r=this.canvas.getBoundingClientRect();
    this.target={x:clamp((x-r.left-r.width*.62)/230,-1,1),y:clamp((y-r.top-r.height*.4)/230,-1,1)};
    this.pointerAt=performance.now()/1000;
  }
  play(name){
    if(!(name in durations)||name==='idle')return false;
    if(this.quiet||this.paused||this.reduced||this.dragging||this.engaged||document.hidden)return false;
    const now=performance.now()/1000;
    this.action={name,start:now};this.transition={from:{...this.lastPose},start:now};
    this.lastSpecial=['greeting','hop'].includes(name)?now:this.lastSpecial;
    this.nextAction=now+15+Math.random()*12;this.setState(name);this.start();return true;
  }
  tick(ms){
    this.raf=0;
    if(this.destroyed||this.quiet||this.paused||this.reduced||this.dragging||document.hidden)return;
    const now=ms/1000,dt=clamp(now-this.lastTime,.001,.045);this.lastTime=now;
    if(now-this.pointerAt>2.5)this.target={x:0,y:0};
    // Critically damped attention: no snapping between directional pictures.
    for(const k of ['x','y']){
      const v='v'+k;this.look[v]+=(64*(this.target[k]-this.look[k])-16*this.look[v])*dt;
      this.look[k]+=this.look[v]*dt;
    }
    if(now>=this.nextBlink){this.blinkAt=now+.14;this.nextBlink=now+3.8+Math.random()*3.4;}
    if(this.action&&now-this.action.start>=durations[this.action.name]){
      this.action=null;this.transition={from:{...this.lastPose},start:now};this.setState('idle');
    }
    if(this.automatic&&!this.engaged&&!this.action&&now>=this.nextAction){
      const rare=now-this.lastSpecial>=90;
      const r=Math.random();this.play(rare&&r<.12?'hop':rare&&r<.18?'greeting':r<.65?'curious':'thinking');
      this.nextAction=now+12+Math.random()*16;
    }
    let p=poseFor(this.action?.name??'idle',this.action?now-this.action.start:(now-this.origin)%6);
    if(this.transition){
      const a=ease((now-this.transition.start)/.18);
      for(const k of Object.keys(p))p[k]=mix(this.transition.from[k]??p[k],p[k],a);
      if(a===1)this.transition=null;
    }
    const attention=this.action?.name==='hop'?.15:this.action?.name==='greeting'?.35:1;
    p.hx+=this.look.x*2.8*attention;p.hy+=this.look.y*1.8*attention;p.ha+=this.look.x*3.2*attention;
    p.gazeX+=this.look.x*1.8*attention;p.gazeY+=this.look.y*1.3*attention;
    p.blink=Math.max(p.blink,blink(now,this.blinkAt));
    this.lastPose=p;
    if(now-this.lastDraw>=1/this.manifest.targetFps){
      this.render(p);this.lastDraw=now;
      this.canvas.dataset.motion='animated';this.canvas.dataset.lookX=this.look.x.toFixed(3);this.canvas.dataset.lookY=this.look.y.toFixed(3);
      this.canvas.dataset.lift=p.lift.toFixed(3);this.canvas.dataset.rootY=p.rootY.toFixed(2);
    }
    this.raf=requestAnimationFrame(t=>this.tick(t));
  }
  renderStill(){
    if(!this.ready)return;
    const p=poseFor('idle',0);if(this.quiet){p.blink=1;p.ha=1.7;}
    if(!this.paused||this.reduced||this.quiet||this.dragging){this.lastPose=p;this.render(p);}
    this.canvas.dataset.motion=this.reduced?'reduced':this.quiet?'quiet':this.dragging?'dragging':this.paused?'paused':'animated';
    this.canvas.dataset.lookX=this.look.x.toFixed(3);this.canvas.dataset.lookY=this.look.y.toFixed(3);
    this.setState(this.quiet?'quiet':'idle');
  }
  piece(name,anchor=[0,0],target=anchor,angle=0,sx=1,sy=1){
    const c=this.ctx;c.save();c.translate(...target);c.rotate(angle*Math.PI/180);c.scale(sx,sy);c.translate(-anchor[0],-anchor[1]);
    c.drawImage(this.images[name],0,0,256,256);c.restore();
  }
  triangle(image,src,dst){
    const [s0,s1,s2]=src,[d0,d1,d2]=dst;
    const ax=s1[0]-s0[0],ay=s1[1]-s0[1],bx=s2[0]-s0[0],by=s2[1]-s0[1],det=ax*by-ay*bx;
    const ux=d1[0]-d0[0],uy=d1[1]-d0[1],vx=d2[0]-d0[0],vy=d2[1]-d0[1];
    const a=(ux*by-vx*ay)/det,c=(vx*ax-ux*bx)/det,b=(uy*by-vy*ay)/det,d=(vy*ax-uy*bx)/det;
    const ctx=this.ctx,cx=(d0[0]+d1[0]+d2[0])/3,cy=(d0[1]+d1[1]+d2[1])/3;
    ctx.save();ctx.beginPath();
    dst.forEach(([x,y],i)=>{const dx=x-cx,dy=y-cy,l=Math.hypot(dx,dy)||1;const px=x+dx/l*.12,py=y+dy/l*.12;i?ctx.lineTo(px,py):ctx.moveTo(px,py);});
    ctx.closePath();ctx.clip();ctx.transform(a,b,c,d,d0[0]-a*s0[0]-c*s0[1],d0[1]-b*s0[0]-d*s0[1]);
    ctx.drawImage(image,0,0,256,256);ctx.restore();
  }
  mesh(name,field){
    for(const [x,y,w,h] of this.manifest.layers[name].meshCells){
      const src=[[x,y],[x+w,y],[x+w,y+h],[x,y+h]];
      const dst=src.map(([px,py])=>{const [dx,dy]=field(px,py);return [px+dx,py+dy];});
      this.triangle(this.images[name],[src[0],src[1],src[2]],[dst[0],dst[1],dst[2]]);
      this.triangle(this.images[name],[src[0],src[2],src[3]],[dst[0],dst[2],dst[3]]);
    }
  }
  render(p){
    const c=this.ctx;c.setTransform(1,0,0,1,0,0);c.clearRect(0,0,320,320);c.imageSmoothingEnabled=true;c.imageSmoothingQuality='high';
    // Shadow belongs to the preview stage and remains on the ground during flight.
    const flight=clamp(-p.rootY/20,0,1);const radius=62*(1-flight*.24);
    if(this.shadow){c.save();c.translate(195,268);c.scale(1,.16);const gradient=c.createRadialGradient(0,0,0,0,0,radius);
    gradient.addColorStop(0,`rgba(3,2,6,${.43-flight*.2})`);gradient.addColorStop(1,'rgba(3,2,6,0)');c.fillStyle=gradient;c.beginPath();c.arc(0,0,radius,0,Math.PI*2);c.fill();c.restore();}
    c.save();c.translate(32,32+p.rootY);
    const field=(x,y)=>bodyOffset(p,x,y);
    this.mesh('tail',x=>tailOffset(p,x));this.mesh('body',field);
    const [dx,dy]=field(185,166),shoulder=[185+dx,166+dy];
    const planted=plantedArm(shoulder),upper=mix(planted.upper,-57,p.lift),lower=mix(planted.lower,-151,p.lift);
    const scale=mix(planted.scale,1,p.lift),elbow=turnPoint(shoulder,[3*scale,31*scale],upper),wrist=turnPoint(elbow,[-scale,23*scale],lower);
    this.piece('upper-arm',[185,166],shoulder,upper,scale,scale);
    if(p.lift>.02){c.fillStyle='#352330';c.beginPath();c.arc(elbow[0],elbow[1],7,0,Math.PI*2);c.fill();}
    this.piece('forearm',[188,197],elbow,lower,scale,scale);
    this.piece(p.turn>.5?'palm':'hand',[187,220],wrist,lower+p.wrist,Math.max(.15,Math.abs(1-2*p.turn)),1);
    this.mesh('ruff',field);
    const [hx,hy]=field(162,140);
    c.save();c.translate(162+hx+p.hx,139+hy+p.hy);c.rotate(p.ha*Math.PI/180);c.scale(p.headScale,p.headScale);c.translate(-162,-139);
    this.piece('ear-left',[101,70],[101,70],p.earL);this.piece('ear-right',[191,67],[191,67],p.earR);this.piece('head');
    for(const [name,x,y] of [['eye-left',123,107],['eye-right',177,100.5]])this.piece(name,[x,y],[x+p.gazeX,y+p.gazeY+p.blink*2],0,1,Math.max(.07,1-p.blink));
    c.restore();c.restore();
    this.canvas.dataset.renderId=String(++this.renderCount);
  }
  destroy(){this.destroyed=true;this.suspend();document.removeEventListener('visibilitychange',this.onHidden);this.motion.removeEventListener('change',this.onReduced);this.images={};}
}
