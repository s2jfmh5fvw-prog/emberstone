import {getPapAnswer,papGreeting,papTopics,type PapAnswer} from '../data/pap-helper';
import {site} from '../data/site';
import {PapMotion} from './pap-motion';
import {createPapPosition} from './pap-position';
import {createPapRenderer} from './pap-renderer';

const root=document.querySelector<HTMLElement>('[data-pap-helper]');
if(root) initPap(root);
function initPap(root:HTMLElement){
  const select=<T extends HTMLElement=HTMLElement>(selector:string)=>root.querySelector<T>(selector)!;
  const figure=select<HTMLButtonElement>('.pap-figure'),canvas=select<HTMLCanvasElement>('.pap-canvas');
  const conversation=select('.pap-conversation'),current=select('.pap-current'),question=select('.pap-question');
  const input=select<HTMLInputElement>('.pap-input'),submit=select<HTMLButtonElement>('.pap-submit');
  const settings=select('.pap-settings'),tip=select('.pap-tip'),history=select<HTMLDetailsElement>('.pap-history'),historyLog=select('.pap-history-log');
  const preference=matchMedia('(prefers-reduced-motion: reduce)');
  const position=createPapPosition(root,conversation,settings,tip);
  const renderer=createPapRenderer(root,canvas);
  const motion=new PapMotion(renderer.draw,{set:(fn,ms)=>window.setTimeout(fn,ms),clear:id=>clearTimeout(id),now:()=>Date.now()});
  const shortcuts=Array.from(root.querySelectorAll<HTMLButtonElement>('.pap-shortcuts button'));
  const navToggle=document.querySelector<HTMLButtonElement>('.menu-toggle');
  let busy=false,jokeNumber=0,previousTopic:string|undefined,seenIntro=false,replyTimer=0,tipTimer=0,holdTimer=0;
  let tipUsed=false,lastNear=0,suppressClickUntil=0;
  let lastPause:boolean|undefined;
  const messages:{text:string;user:boolean}[]=[];
  const cleanup=new AbortController(),on={signal:cleanup.signal};
  function dismissTip(){tip.hidden=true;clearTimeout(tipTimer);}
  function remember(text:string,user=false){messages.push({text,user});if(messages.length>30)messages.shift();}
  function renderHistory(){
    history.hidden=messages.length<3;historyLog.replaceChildren();
    for(const message of messages.slice(0,-2)){
      const p=document.createElement('p'),label=document.createElement('strong');label.textContent=message.user?'Du: ':'PAP: ';p.append(label,document.createTextNode(message.text));historyLog.append(p);
    }
  }
  function renderAnswer(answer:PapAnswer){
    current.replaceChildren();const p=document.createElement('p');p.textContent=answer.text;current.append(p);
    for(const link of answer.links??[]){
      let url:URL;try{url=new URL(link.url);}catch{continue;}
      if(url.protocol!=='https:'||!['papsmp.de','discord.gg','pap-vip-commerce.pap-vip-smp.workers.dev'].includes(url.hostname))continue;
      const anchor=document.createElement('a');anchor.textContent=link.label;
      if(url.hostname==='papsmp.de'&&url.hash){anchor.href=location.pathname==='/'?url.hash:`/${url.hash}`;}
      else{anchor.href=url.href;anchor.target='_blank';anchor.rel='noopener noreferrer';}
      current.append(anchor);
    }
    if(answer.copyAddress){
      const copy=document.createElement('button');copy.type='button';copy.className='pap-text-action';copy.textContent='Java-Adresse kopieren';
      copy.addEventListener('click',async()=>{
        copy.disabled=true;
        try{await navigator.clipboard.writeText(site.server.java);copy.textContent='Adresse kopiert';motion.touch();refreshState();motion.play('hop');}
        catch{copy.textContent=`Zum Kopieren: ${site.server.java}`;}
        finally{copy.disabled=false;position.fit();}
      },on);current.append(copy);
    }
    renderHistory();position.fit();
  }
  function refreshState(){motion.setState(pointer?.dragging?'dragging':motion.resting?'rest':busy?'answering':input.value.trim()?'typing':conversation.hidden?'idle':'attentive');}
  function open(){
    if(navToggle?.getAttribute('aria-expanded')==='true'){navToggle.click();syncMenu();}
    dismissTip();settings.hidden=true;motion.touch();if(motion.resting)motion.setQuiet(false);
    conversation.hidden=false;figure.setAttribute('aria-expanded','true');figure.setAttribute('aria-label','PAP-Gespräch einklappen');
    if(!seenIntro){const note=document.createElement('small');note.className='pap-intro';note.textContent='FAQ-Helfer; keine externe KI';current.append(note);seenIntro=true;}
    refreshState();position.fit();motion.play('wave');input.focus({preventScroll:true});
  }
  function close(focus=false){conversation.hidden=true;settings.hidden=true;figure.setAttribute('aria-expanded','false');figure.setAttribute('aria-label','PAP ansprechen');refreshState();if(focus)figure.focus({preventScroll:true});}
  function menu(){if(navToggle?.getAttribute('aria-expanded')==='true'){navToggle.click();syncMenu();}dismissTip();settings.hidden=false;position.fit();motion.setState('attentive');select<HTMLButtonElement>('[data-action=clear]').focus({preventScroll:true});}
  function ask(shortcutText?:string,topic?:string){
    const text=(shortcutText??input.value).trim().slice(0,500);if(!text||busy)return;
    busy=true;submit.disabled=true;shortcuts.forEach(button=>button.disabled=true);remember(text,true);question.textContent=text;question.hidden=false;if(!shortcutText)input.value='';dismissTip();motion.touch();refreshState();
    renderAnswer({text:'Ich schaue in den PAP-Infos nach …'});
    replyTimer=window.setTimeout(()=>{
      const answer=getPapAnswer(text,topic,jokeNumber,previousTopic);
      if(answer.mood==='happy'&&/witz|joke|lustig/i.test(text))jokeNumber++;
      previousTopic=answer.topic??previousTopic;remember(answer.text);busy=false;submit.disabled=false;shortcuts.forEach(button=>button.disabled=false);renderAnswer(answer);refreshState();
      if(answer.gesture)motion.play(answer.gesture);else if(answer.mood==='happy'){if(!input.value.trim()&&!pointer?.dragging)motion.setState('happy');motion.play('hop');}else if(answer.mood==='curious')motion.play('curious');else motion.play('blink');
    },preference.matches?0:180);
  }
  select<HTMLFormElement>('.pap-form').addEventListener('submit',event=>{event.preventDefault();ask();},on);
  shortcuts.forEach(button=>button.addEventListener('click',()=>{const topic=button.dataset.topic!;ask(papTopics[topic].title,topic);},on));
  input.addEventListener('input',()=>{dismissTip();motion.touch();refreshState();},on);
  figure.addEventListener('click',()=>{if(Date.now()<suppressClickUntil)return;conversation.hidden||root.dataset.menuOpen==='true'?open():close();},on);
  figure.addEventListener('contextmenu',event=>{event.preventDefault();menu();},on);
  figure.addEventListener('keydown',event=>{if(event.key==='ContextMenu'||event.key==='F10'&&event.shiftKey){event.preventDefault();menu();}},on);
  settings.addEventListener('click',event=>{
    const action=(event.target as HTMLElement).closest<HTMLElement>('[data-action]')?.dataset.action;
    if(action==='clear'){clearTimeout(replyTimer);busy=false;submit.disabled=false;shortcuts.forEach(button=>button.disabled=false);input.value='';messages.length=0;previousTopic=undefined;question.hidden=true;remember(papGreeting);renderAnswer({text:papGreeting});refreshState();}
    if(action==='position')position.reset();
    if(action==='quiet'){close();dismissTip();motion.setQuiet(true);}
    settings.hidden=true;figure.focus({preventScroll:true});
  },on);
  document.addEventListener('pointerdown',event=>{if(!root.contains(event.target as Node)){settings.hidden=true;if(!input.value.trim())close();}},on);
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&(!conversation.hidden||!settings.hidden)){event.preventDefault();close(true);}},on);
  let pointer:{id:number;startX:number;startY:number;x:number;y:number;touch:boolean;armed:boolean;dragging:boolean}|undefined;
  figure.addEventListener('pointerdown',event=>{
    if(event.button!==0)return;
    motion.touch();pointer={id:event.pointerId,startX:event.clientX,startY:event.clientY,x:event.clientX,y:event.clientY,touch:event.pointerType!=='mouse',armed:event.pointerType==='mouse',dragging:false};
    if(!pointer.touch)figure.setPointerCapture(event.pointerId);
    else holdTimer=window.setTimeout(()=>{if(!pointer)return;pointer.armed=true;figure.setPointerCapture(pointer.id);suppressClickUntil=Date.now()+900;menu();},550);
  },on);
  figure.addEventListener('pointermove',event=>{
    const p=pointer;if(!p||p.id!==event.pointerId)return;
    const distance=Math.hypot(event.clientX-p.startX,event.clientY-p.startY);
    if(!p.armed){if(distance>6){clearTimeout(holdTimer);pointer=undefined;}return;}
    if(distance>6&&!p.dragging){p.dragging=true;settings.hidden=true;dismissTip();motion.setState('dragging');}
    if(p.dragging){event.preventDefault();position.move(event.clientX-p.x,event.clientY-p.y);}
    p.x=event.clientX;p.y=event.clientY;
  },on);
  function release(event:PointerEvent){if(!pointer||pointer.id!==event.pointerId)return;clearTimeout(holdTimer);const dragged=pointer.dragging;pointer=undefined;if(dragged){suppressClickUntil=Date.now()+350;refreshState();}if(figure.hasPointerCapture(event.pointerId))figure.releasePointerCapture(event.pointerId);}
  figure.addEventListener('pointerup',release,on);figure.addEventListener('pointercancel',release,on);figure.addEventListener('lostpointercapture',release,on);
  figure.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse'&&Date.now()-lastNear>15000&&!pointer){lastNear=Date.now();motion.play('blink');}},on);
  document.addEventListener('pointermove',event=>{if(event.pointerType==='mouse')renderer.track(event.clientX,event.clientY);},on);
  const pause=()=>{const paused=preference.matches||document.hidden||navToggle?.getAttribute('aria-expanded')==='true';if(paused===lastPause)return;lastPause=paused;renderer.setPaused(paused);motion.setPaused(paused);};
  const syncMenu=()=>{root.dataset.menuOpen=String(navToggle?.getAttribute('aria-expanded')==='true');pause();};
  const navObserver=new MutationObserver(syncMenu);
  if(navToggle)navObserver.observe(navToggle,{attributes:true,attributeFilter:['aria-expanded']});
  preference.addEventListener('change',pause,on);document.addEventListener('visibilitychange',()=>{pause();if(document.hidden)dismissTip();},on);
  window.addEventListener('resize',position.fit,on);visualViewport?.addEventListener('resize',position.fit,on);visualViewport?.addEventListener('scroll',position.fit,on);
  history.addEventListener('toggle',position.fit,on);select('.pap-info').addEventListener('toggle',position.fit,on);
  remember(papGreeting);renderAnswer({text:papGreeting});position.fit();syncMenu();
  tipTimer=window.setTimeout(()=>{
    if(tipUsed||document.hidden||motion.resting||!conversation.hidden||preference.matches||input.value)return;
    tipUsed=true;tip.hidden=false;position.fit();tipTimer=window.setTimeout(dismissTip,7000);
  },20000);
  document.addEventListener('astro:before-swap',()=>{cleanup.abort();navObserver.disconnect();motion.dispose();renderer.stop();[replyTimer,tipTimer,holdTimer].forEach(clearTimeout);},{once:true});
}
