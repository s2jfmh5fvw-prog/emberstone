import type {PapState} from './pap-motion';
export function createPapRenderer(root:HTMLElement,sprite:HTMLElement){
  const pick=(selector:string)=>root.querySelector<HTMLElement>(selector)!;
  const scene=pick('.pap-scene'),arm=pick('.pap-arm'),tail=pick('.pap-tail'),left=pick('.pap-ear-left'),right=pick('.pap-ear-right');
  const rest=pick('.pap-arm-rest'),wave=pick('.pap-arm-wave'),shadow=pick('.pap-shadow');
  let animations:Animation[]=[];
  function stop(){animations.forEach(animation=>animation.cancel());animations=[];}
  function animate(element:HTMLElement,keyframes:Keyframe[],duration:number){animations.push(element.animate(keyframes,{duration,easing:'ease-in-out'}));}
  function turn(element:HTMLElement,angles:[number,number][],duration:number){animate(element,angles.map(([offset,angle])=>({offset,transform:`rotate(${angle}deg)`})),duration);}
  return {stop,draw:(frame:number,gesture:string,state:PapState)=>{
    sprite.dataset.frame=String(frame);sprite.style.backgroundPosition=`${frame%4*100/3}% ${Math.floor(frame/4)*100/3}%`;
    root.dataset.state=state;root.dataset.renderer=gesture==='blink'||gesture==='curious'||frame===2?'sprite':'rig';
    if(gesture===root.dataset.animation)return;
    stop();root.dataset.animation=gesture;
    if(gesture==='wave'){
      turn(arm,[[0,0],[.08,5],[.28,-107],[.42,-122],[.56,-102],[.69,-121],[.78,-104],[1,0]],1540);
      // Swap the pad-facing hand only in the air; the grounded arm is the moving arm itself.
      animate(wave,[{offset:0,visibility:'hidden'},{offset:.17,visibility:'hidden'},{offset:.17,visibility:'visible'},{offset:.88,visibility:'visible'},{offset:.88,visibility:'hidden'},{offset:1,visibility:'hidden'}],1540);
      animate(rest,[{offset:0,visibility:'visible'},{offset:.17,visibility:'visible'},{offset:.17,visibility:'hidden'},{offset:.88,visibility:'hidden'},{offset:.88,visibility:'visible'},{offset:1,visibility:'visible'}],1540);
    }
    if(gesture==='ears'){
      turn(left,[[0,0],[.18,-2],[.38,3.5],[.58,-1.5],[.8,.8],[1,0]],680);
      turn(right,[[0,0],[.24,1],[.43,-3],[.64,1.4],[.82,-.5],[1,0]],680);
    }
    if(gesture==='tail')turn(tail,[[0,0],[.16,-1],[.38,4],[.63,-3],[.85,1.2],[1,0]],1800);
    if(gesture==='hop'){
      animate(scene,[{transform:'translateY(0) scale(1)'},{transform:'translateY(1px) scale(1.03,.96)',offset:.2},{transform:'translateY(-8px) scale(.99,1.01)',offset:.48},{transform:'translateY(0) scale(1.02,.98)',offset:.78},{transform:'translateY(0) scale(1)'}],700);
      animate(shadow,[{opacity:1,transform:'scale(1)'},{opacity:.6,transform:'scale(.85)',offset:.48},{opacity:1,transform:'scale(1)'}],700);
    }
  }};
}
