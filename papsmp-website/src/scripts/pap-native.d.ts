export class PapCompanion {
  constructor(canvas:HTMLCanvasElement,manifest:unknown,options?:{automatic?:boolean;onError?:(error:unknown)=>void});
  load():Promise<this>;
  cancelAction():void;
  setEngaged(value:boolean):void;
  setDragging(value:boolean):void;
  setQuiet(value:boolean):void;
  stop():void;
  resume():void;
  track(x:number,y:number):void;
  play(name:string):boolean;
  destroy():void;
}
