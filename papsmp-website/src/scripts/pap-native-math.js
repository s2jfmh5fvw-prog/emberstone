export const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export const mix=(a,b,t)=>a+(b-a)*t;
export function ease(x){x=clamp(x,0,1);return x*x*x*(x*(x*6-15)+10);}
export function curve(t,points){
  if(t<=points[0][0])return points[0][1];
  for(let i=1;i<points.length;i++){
    const [b,y]=points[i], [a,x]=points[i-1];
    if(t<=b)return mix(x,y,ease((t-a)/(b-a)));
  }
  return points.at(-1)[1];
}
export function blink(t,c){return t>c-.14&&t<c+.16?curve(t,[[c-.14,0],[c-.04,1],[c+.015,1],[c+.16,0]]):0;}
export function turnPoint(anchor,delta,angle){const a=angle*Math.PI/180,c=Math.cos(a),s=Math.sin(a);return [anchor[0]+delta[0]*c-delta[1]*s,anchor[1]+delta[0]*s+delta[1]*c];}
export function plantedArm(shoulder,wrist=[187,220]){
  const baseUpper=Math.hypot(3,31),baseLower=Math.hypot(-1,23);
  const dx=wrist[0]-shoulder[0],dy=wrist[1]-shoulder[1];
  const actual=Math.hypot(dx,dy),scale=Math.max(1,actual/(baseUpper+baseLower-.00001));
  const upper=baseUpper*scale,lower=baseLower*scale;
  const distance=clamp(actual,.001,upper+lower-.000001);
  const direction=Math.atan2(dy,dx);
  const a=direction-Math.acos(clamp((upper*upper+distance*distance-lower*lower)/(2*upper*distance),-1,1));
  const elbow=[shoulder[0]+upper*Math.cos(a),shoulder[1]+upper*Math.sin(a)];
  const b=Math.atan2(wrist[1]-elbow[1],wrist[0]-elbow[0]);
  return {upper:(a-Math.atan2(31,3))*180/Math.PI,lower:(b-Math.atan2(23,-1))*180/Math.PI,elbow,wrist,scale};
}
export const durations={idle:6,greeting:3,curious:3.5,thinking:3,answer:3,hop:1.65,blink:.32,ears:1,tail:2.2};
export function poseFor(state,t){
  const duration=durations[state]??6;
  const e=Math.sin(Math.PI*clamp(t/duration,0,1))**2;
  const p={lean:0,chest:1.2*Math.sin(2*Math.PI*t/3)*e,dip:0,hx:0,hy:-.5*Math.sin(2*Math.PI*t/3)*e,ha:0,earL:0,earR:0,tail:.7*Math.sin(2*Math.PI*t/4-.7)*e,gazeX:0,gazeY:0,blink:0,lift:0,wrist:0,turn:0,rootY:0,headScale:1};
  if(state==='idle'){
    const alert=curve(t,[[0,0],[2.2,0],[2.8,1],[3.5,1],[4.1,0],[6,0]]);
    p.hx=1.4*alert;p.ha=-1.2*alert;p.gazeX=1.2*alert;
    p.earL=curve(t,[[0,0],[2.35,0],[2.48,-5],[2.7,2],[2.92,-.5],[3.2,0],[6,0]]);
    p.earR=curve(t,[[0,0],[2.57,0],[2.7,2.8],[3,-.8],[3.25,0],[6,0]]);
  }else if(state==='greeting'){
    const lift=curve(t,[[0,0],[.18,0],[.78,1],[1.84,1],[2.48,0],[3,0]]);
    const prep=curve(t,[[0,0],[.25,1],[.52,0],[3,0]]);
    p.lift=lift;p.dip=2.5*prep;p.lean=-4.2*lift;p.hx=-1.7*lift;p.hy=1.2*prep-.7*lift;p.ha=-4.5*lift;
    p.wrist=curve(t,[[0,0],[.8,0],[.98,-12],[1.18,12],[1.38,-12],[1.6,10],[1.8,0],[3,0]]);
    p.turn=curve(t,[[0,0],[.45,0],[.67,1],[2.08,1],[2.36,0],[3,0]]);
    p.tail=curve(t,[[0,0],[.24,-1],[.78,3],[1.28,1],[1.78,2],[2.47,-2],[2.8,.5],[3,0]]);
    p.earR=curve(t,[[0,0],[.4,0],[.7,-3],[.95,1],[1.3,0],[3,0]]);p.blink=blink(t,2.66);
  }else if(state==='curious'){
    const a=curve(t,[[0,0],[.28,0],[.86,1],[2.35,1],[3.12,0],[3.5,0]]);
    p.ha=6.8*a;p.hx=2.8*a;p.hy=1.2*a;p.lean=1.2*a;p.gazeX=1.4*a;p.gazeY=.8*a;p.earL=-5*a;p.earR=2*a;p.tail=2.2*Math.sin(Math.PI*t/3.5)*a;p.blink=blink(t,1.48);
  }else if(state==='thinking'){
    const a=curve(t,[[0,0],[.25,0],[.8,1],[1.95,1],[2.68,0],[3,0]]);
    p.ha=-4.2*a;p.hx=-1.4*a;p.hy=-1.2*a;p.gazeX=-1.2*a;p.gazeY=-1.25*a;p.earR=-2.8*a;p.earL=1.2*a;p.blink=blink(t,2.27);
  }else if(state==='answer'){
    const a=curve(t,[[0,0],[.42,0],[.74,1],[1.1,-.2],[1.37,0],[3,0]]);
    p.hy=3*a;p.ha=1.4*a;p.dip=.7*a;p.blink=blink(t,.78);p.tail=2*Math.sin(2*Math.PI*t/2.2)*e;
    p.earL=curve(t,[[0,0],[1.18,0],[1.35,-2],[1.56,1],[1.8,0],[3,0]]);
  }else if(state==='blink'){
    p.blink=blink(t,.14);
  }else if(state==='ears'){
    p.earL=curve(t,[[0,0],[.15,-7],[.36,2.5],[.6,-1],[1,0]]);
    p.earR=curve(t,[[0,0],[.28,4.5],[.5,-1.5],[.76,.5],[1,0]]);
  }else if(state==='tail'){
    p.tail=curve(t,[[0,0],[.38,-5],[.85,5],[1.3,-3],[1.7,1.5],[2.2,0]]);
  }else if(state==='hop'){
    // Anticipation, takeoff, flight, landing compression, then a damped settle.
    p.dip=curve(t,[[0,0],[.24,7],[.38,0],[.79,0],[.92,8],[1.11,-1.4],[1.31,1],[1.5,0],[1.65,0]]);
    p.rootY=curve(t,[[0,0],[.33,0],[.54,-20],[.70,-12],[.82,0],[1.65,0]]);
    p.hy=curve(t,[[0,0],[.24,1.2],[.40,-3],[.68,-1],[.94,2.8],[1.14,-.9],[1.45,0],[1.65,0]]);
    p.headScale=1+curve(t,[[0,0],[.26,-.012],[.52,.012],[.86,-.01],[1.2,0],[1.65,0]]);
    p.earL=curve(t,[[0,0],[.28,-3],[.48,5],[.72,-2],[.95,5],[1.18,-1.8],[1.44,0],[1.65,0]]);
    p.earR=curve(t,[[0,0],[.30,2],[.52,-4],[.79,2],[1.02,-3],[1.28,1],[1.52,0],[1.65,0]]);
    p.tail=curve(t,[[0,0],[.28,-3],[.60,3],[.85,-2],[1.02,3],[1.32,-1],[1.65,0]]);p.blink=blink(t,1.2);
  }
  return p;
}
export function bodyOffset(p,x,y){
  const weight=clamp((215-y)/75,0,1);
  const bulge=Math.sin(Math.PI*clamp((y-139)/76,0,1));
  return [p.lean*weight+p.chest*(x-162)/40*bulge,p.dip*weight-p.chest*.7*bulge];
}
export function tailOffset(p,x){const w=clamp((108-x)/98,0,1)**1.15;return [p.tail*.65*w,p.tail*w*1.6];}
