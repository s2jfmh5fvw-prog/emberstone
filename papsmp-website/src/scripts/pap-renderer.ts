import {PapCompanion} from './pap-native.js';
import rig from '../assets/chatbot/native-v4/rig.json';
import type {PapState} from './pap-motion';

const files=import.meta.glob<string>('../assets/chatbot/native-v4/*.webp',{eager:true,query:'?url',import:'default'});
const manifest={...rig,layers:Object.fromEntries(Object.entries(rig.layers).map(([name,spec])=>[
  name,{...spec,file:files[`../assets/chatbot/native-v4/${spec.file.split('/').at(-1)}`]}
]))};
type NativeRig=Pick<PapCompanion,'load'|'cancelAction'|'setEngaged'|'setDragging'|'setQuiet'|'stop'|'resume'|'track'|'play'|'destroy'>;
const names:Record<string,string>={wave:'greeting',curious:'curious',hop:'hop',blink:'blink',ears:'ears',tail:'tail'};

/** The website clock owns gestures; the rig owns frames and damped pointer attention. */
export function createPapRenderer(root:HTMLElement,canvas:HTMLCanvasElement,create=(canvas:HTMLCanvasElement):NativeRig=>new PapCompanion(canvas,manifest,{automatic:false})){
  const pet=create(canvas);
  let lastGesture='idle',quiet=false,dragging=false,paused=false,disposed=false;
  const ready=pet.load().then(()=>{if(!disposed)root.dataset.ready='true';}).catch(error=>{
    pet.destroy();root.dataset.ready='false';root.dataset.renderError='true';console.error('PAP animation could not load',error);
  });
  function draw(_frame:number,gesture:string,state:PapState){
    root.dataset.state=state;
    const nextQuiet=state==='rest',nextDragging=state==='dragging';
    if(nextQuiet!==quiet){quiet=nextQuiet;pet.setQuiet(quiet);}
    if(nextDragging!==dragging){dragging=nextDragging;pet.setDragging(dragging);}
    pet.setEngaged(state==='typing'||state==='answering');
    if(gesture===lastGesture)return;
    lastGesture=gesture;root.dataset.animation=gesture;
    if(gesture==='idle')pet.cancelAction();
    else if(!paused&&!quiet&&!dragging)pet.play(names[gesture]??gesture);
  }
  return {ready,draw,track:(x:number,y:number)=>pet.track(x,y),setPaused:(value:boolean)=>{
    if(value===paused)return;paused=value;
    if(value)pet.stop();else pet.resume();
  },stop:()=>{disposed=true;pet.destroy();}};
}
