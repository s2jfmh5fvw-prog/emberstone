export function createPapPosition(root:HTMLElement,conversation:HTMLElement,settings:HTMLElement,tip:HTMLElement){
  let ratioX=1,ratioY=1,x=0,y=0,wander=0;
  const viewport=()=>({left:visualViewport?.offsetLeft??0,top:visualViewport?.offsetTop??0,width:visualViewport?.width??innerWidth,height:visualViewport?.height??innerHeight});
  function fit(){
    const v=viewport();root.dataset.compact=String(v.height<450);const size=root.offsetWidth;
    const bottom=Math.max(6,parseFloat(getComputedStyle(root).getPropertyValue('--pap-safe-bottom'))||0);
    const height=root.offsetHeight||size;
    x=Math.max(v.left+10,Math.min(v.left+10+ratioX*Math.max(0,v.width-size-22)+wander,v.left+Math.max(10,v.width-size-12)));y=v.top+16+ratioY*Math.max(0,v.height-height-bottom-16);
    root.style.left=`${x}px`;root.style.top=`${y}px`;
    const width=Math.min(340,v.width-20),leftSide=x+size/2>v.left+v.width/2;
    root.dataset.side=leftSide?'left':'right';
    const bx=Math.max(v.left+10,Math.min(leftSide?x+size-width:x,v.left+v.width-width-10));
    conversation.style.width=`${width}px`;
    const above=y-v.top-12,below=v.top+v.height-y-height-16;
    const room=Math.max(100,Math.min(v.height-24,Math.max(above,below)));
    conversation.style.setProperty('--pap-room',`${room}px`);
    const chatHeight=Math.min(conversation.scrollHeight,room);
    const by=Math.max(v.top+10,Math.min(above>=below?y-chatHeight-8:y+height+8,v.top+v.height-chatHeight-14));
    conversation.style.left=`${bx-x}px`;conversation.style.top=`${by-y}px`;
    for(const bubble of [settings,tip]){
      const bw=bubble.offsetWidth||230,bh=bubble.offsetHeight||70;
      bubble.style.left=`${Math.max(v.left+10,Math.min(x+size-bw,v.left+v.width-bw-10))-x}px`;
      bubble.style.top=`${Math.max(v.top+10,Math.min(y-bh-10,v.top+v.height-bh-14))-y}px`;
    }
  }
  function commit(){const v=viewport(),size=root.offsetWidth;ratioX=Math.max(0,Math.min(1,(x-v.left-10)/Math.max(1,v.width-size-22)));wander=0;}
  return {fit,commitWander:commit,wander:(offset:number)=>{wander=offset;fit();},walkBounds:(offset:number)=>Math.max(0,x-offset-viewport().left-10),move:(dx:number,dy:number)=>{
    const v=viewport(),size=root.offsetWidth,bottom=Math.max(6,parseFloat(getComputedStyle(root).getPropertyValue('--pap-safe-bottom'))||0);
    wander=0;ratioX=Math.max(0,Math.min(1,(x+dx-v.left-10)/Math.max(1,v.width-size-22)));
    ratioY=Math.max(0,Math.min(1,(y+dy-v.top-16)/Math.max(1,v.height-(root.offsetHeight||size)-bottom-16)));fit();
  },reset:()=>{wander=0;ratioX=ratioY=1;fit();}};
}
