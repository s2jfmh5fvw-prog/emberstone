export type PetOptions={move?:(offset:number)=>void;commit?:()=>void;bounds?:(offset:number)=>number;observe?:(data:{clip:string;frame:number;walking:boolean;x:number;cachedPages:number})=>void;error?:(error:unknown)=>void;random?:()=>number};
export class PapPet{
  constructor(canvas:HTMLCanvasElement,manifest:unknown,options?:PetOptions);
  load():Promise<void>;setState(state:string):void;cancelAction():void;resetPosition():void;play(action:string):boolean;setPaused(value:boolean):void;setReduced(value:boolean):void;destroy():void;
}
