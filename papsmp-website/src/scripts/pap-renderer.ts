import {PapPet,type PetOptions} from './pap-pet.js';
import rig from '../assets/chatbot/pet-v09/manifest.json';
import type {PapState} from './pap-motion';
const files=import.meta.glob<string>('../assets/chatbot/pet-v09/*.webp',{eager:true,query:'?url',import:'default'});
const manifest={...rig,clips:Object.fromEntries(Object.entries(rig.clips).map(([name,clip])=>[name,{...clip,pages:clip.pages.map(file=>files[`../assets/chatbot/pet-v09/${file.split('/').at(-1)}`])}]))};
type PetRig=Pick<PapPet,'load'|'setState'|'cancelAction'|'resetPosition'|'play'|'setPaused'|'setReduced'|'destroy'>;
export function createPapRenderer(root:HTMLElement,canvas:HTMLCanvasElement,options:PetOptions={},create=(canvas:HTMLCanvasElement):PetRig=>new PapPet(canvas,manifest,{...options,observe:data=>{root.dataset.clip=data.clip;root.dataset.frame=String(data.frame);root.dataset.walking=String(data.walking);root.dataset.walkX=data.x.toFixed(2);root.dataset.cachedPages=String(data.cachedPages);},error:()=>{root.dataset.ready='false';root.dataset.renderError='true';}})){
  const pet=create(canvas);let lastGesture='idle',lastState:PapState='idle',paused=false,reduced=false,disposed=false;
  const ready=pet.load().then(()=>{if(!disposed)root.dataset.ready='true';}).catch(error=>{pet.destroy();root.dataset.ready='false';root.dataset.renderError='true';console.error('PAP animation could not load',error);});
  function draw(_frame:number,gesture:string,state:PapState){
    root.dataset.state=state;const changed=state!==lastState;
    if(changed){lastState=state;pet.setState(state);}
    if(gesture===lastGesture)return;
    lastGesture=gesture;root.dataset.animation=gesture;
    if(gesture==='idle'){if(!changed)pet.cancelAction();}
    else if(!paused&&!reduced&&!['rest','dragging','typing','answering'].includes(state))pet.play(gesture);
  }
  return {ready,draw,track:(_x:number,_y:number)=>{},resetPosition:()=>pet.resetPosition(),setReduced:(value:boolean)=>{reduced=value;pet.setReduced(value);},setPaused:(value:boolean)=>{if(value===paused)return;paused=value;pet.setPaused(value);},stop:()=>{disposed=true;pet.destroy();}};
}
