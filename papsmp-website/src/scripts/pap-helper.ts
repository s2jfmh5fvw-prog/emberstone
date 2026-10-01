import { getPapAnswer, papGreeting, papTopics } from '../data/pap-helper';

const root = document.querySelector<HTMLElement>('[data-pap-helper]');
if (root) initPap(root);

function initPap(root: HTMLElement) {
  const select = <T extends HTMLElement = HTMLElement>(selector: string) => root.querySelector<T>(selector)!;
  const panel = select('.pap-panel');
  const log = select('.pap-log');
  const input = select<HTMLInputElement>('.pap-input');
  const send = select<HTMLButtonElement>('.pap-send');
  const launcher = select<HTMLButtonElement>('.pap-launcher');
  const poses = Array.from(root.querySelectorAll<HTMLElement>('.pap-mascot .pap-pose'));
  const chips = Array.from(root.querySelectorAll<HTMLButtonElement>('.pap-chip'));
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let visiblePose = 0;
  let hidden = false;
  let busy = false;
  let jokeNumber = 0;
  let tipShown = false;
  let idleTimer: ReturnType<typeof setTimeout> | undefined;
  let stepTimer: ReturnType<typeof setTimeout> | undefined;
  let replyTimer: ReturnType<typeof setTimeout> | undefined;
  let tipTimer: ReturnType<typeof setTimeout> | undefined;
  let lastIdle = '';
  let smoothReady = false;
  const smoothAsset = new Image();
  smoothAsset.decoding = 'async';
  smoothAsset.addEventListener('load', () => { smoothReady = true; root.dataset.animationsReady = 'true'; });
  const preloadSmooth = () => { if (!preference.matches && !smoothAsset.src) smoothAsset.src = root.dataset.papSmooth!; };
  // Let the main page render before requesting the extra animation artwork.
  setTimeout(preloadSmooth,1800);

  const sequences: Record<string, { frame: number; duration: number }[]> = {
    blink: [{frame:0,duration:110},{frame:1,duration:90},{frame:2,duration:120},{frame:3,duration:100},{frame:0,duration:130}],
    // Frame 6 lifts the opposite paw in the generated atlas; omit it.
    wave: [0,4,5,9,8,7,8,9,10,11,0].map(frame => ({frame,duration:frame===7?280:170})),
    curious: [{frame:0,duration:180},{frame:12,duration:260},{frame:13,duration:580},{frame:14,duration:260},{frame:15,duration:200},{frame:0,duration:180}],
  };

  function showPose(frame: number, sheet: 'poses' | 'smooth' = 'poses') {
    const next = 1 - visiblePose;
    const rows = sheet === 'smooth' ? 4 : 2;
    const pose = poses[next];
    pose.dataset.sheet = sheet;
    pose.dataset.frame = String(frame);
    pose.style.backgroundPosition = `${(frame % 4) * 100 / 3}% ${Math.floor(frame / 4) * 100 / (rows - 1)}%`;
    pose.classList.add('is-visible');
    poses[visiblePose].classList.remove('is-visible');
    visiblePose = next;
  }
  function stopMotion() {
    clearTimeout(idleTimer);
    clearTimeout(stepTimer);
    root.dataset.animation = 'idle';
  }
  function scheduleIdle() {
    clearTimeout(idleTimer);
    if (hidden || busy || document.hidden || preference.matches) return;
    // Random intervals require no hover and never overlap user interactions.
    idleTimer = setTimeout(() => {
      const choices = ['blink','blink','blink','wave','curious'].filter(x => x !== lastIdle);
      const action = choices[Math.floor(Math.random() * choices.length)];
      lastIdle = action;
      play(action);
    }, 7000 + Math.random() * 11000);
  }
  function settle() {
    root.dataset.state = 'idle';
    root.dataset.animation = 'idle';
    showPose(0);
    scheduleIdle();
  }
  function play(action: string) {
    stopMotion();
    if (hidden || document.hidden || preference.matches || !smoothReady) { settle(); return; }
    const sequence = sequences[action];
    if (!sequence) { settle(); return; }
    root.dataset.animation = action;
    let index = 0;
    const advance = () => {
      if (hidden || document.hidden || preference.matches) { settle(); return; }
      const step = sequence[index++];
      if (!step) { settle(); return; }
      showPose(step.frame, 'smooth');
      stepTimer = setTimeout(advance, step.duration);
    };
    advance();
  }
  function showMood(mood: string) {
    stopMotion();
    root.dataset.state = mood;
    if (mood === 'greeting') { play('wave'); return; }
    if (mood === 'curious') { play('curious'); return; }
    showPose(mood === 'happy' ? 7 : mood === 'thinking' ? 5 : 6);
    if (!busy) stepTimer = setTimeout(settle, preference.matches ? 1500 : 2200);
  }
  function safeLink(url: string) {
    try { const link = new URL(url); return link.protocol === 'https:' && ['papsmp.de','discord.gg','pap-vip-commerce.pap-vip-smp.workers.dev'].includes(link.hostname); }
    catch { return false; }
  }
  function addMessage(text: string, user = false, links: {label:string;url:string}[] = []) {
    const item = document.createElement('div');
    item.className = `pap-message${user ? ' pap-message--user' : ''}`;
    const label = document.createElement('span');
    label.className = 'pap-message-label'; label.textContent = user ? 'Du' : 'PAP';
    const content = document.createElement('div'); content.className = 'pap-message-content';
    const paragraph = document.createElement('p'); paragraph.textContent = text;
    content.append(paragraph);
    if (links.length) {
      const list = document.createElement('div'); list.className = 'pap-message-links';
      for (const link of links.filter(link => safeLink(link.url))) {
        const anchor = document.createElement('a');
        anchor.textContent = `${link.label} ↗`; anchor.href = link.url;
        anchor.target = '_blank'; anchor.rel = 'noopener noreferrer'; list.append(anchor);
      }
      content.append(list);
    }
    item.append(label,content); log.append(item);
    while (log.children.length > 40) log.firstElementChild?.remove();
    log.scrollTop = log.scrollHeight;
  }
  function dismissTip() { select('.pap-tip').hidden = true; clearTimeout(tipTimer); }
  function fitPanel() {
    const viewport = window.visualViewport;
    const height = viewport?.height ?? innerHeight;
    const keyboardInset = Math.max(0, innerHeight - height - (viewport?.offsetTop ?? 0));
    const mobile = innerWidth <= 600;
    const base = mobile ? 14 : 22;
    root.style.bottom = `calc(${base + keyboardInset}px + env(safe-area-inset-bottom, 0px))`;
    root.classList.toggle('pap-keyboard', mobile && !panel.hidden && height < 450);
    const bottom = parseFloat(getComputedStyle(root).bottom) - keyboardInset;
    const available = Math.max(140, height - root.getBoundingClientRect().height - bottom - (mobile ? 9 : 14) - 16);
    root.classList.toggle('pap-compact', available < 360);
    panel.style.maxHeight = `${available}px`;
  }
  function openPanel() {
    if (hidden) restore();
    panel.hidden = false; fitPanel();
    launcher.setAttribute('aria-expanded','true');
    launcher.setAttribute('aria-label','PAP-Chat minimieren');
    dismissTip();
    if (busy) showMood('thinking'); else showMood('greeting');
    if (innerWidth > 600) input.focus(); else select('.pap-panel-heading').focus();
  }
  function closePanel(returnFocus = true) {
    panel.hidden = true;
    launcher.setAttribute('aria-expanded','false'); launcher.setAttribute('aria-label','PAP-Chat öffnen');
    fitPanel(); if (!busy) settle();
    if (returnFocus) launcher.focus();
  }
  function setBusy(value: boolean) { busy = value; send.disabled = value; chips.forEach(chip => chip.disabled = value); }
  function ask(text: string, topic?: string) {
    text = text.trim().slice(0,500);
    if (!text || busy) return;
    if (panel.hidden) openPanel();
    setBusy(true); dismissTip(); addMessage(text,true); input.value = ''; showMood('thinking');
    const dots = document.createElement('div'); dots.className = 'pap-typing';
    dots.setAttribute('role','status'); dots.setAttribute('aria-label','PAP sucht eine FAQ-Antwort');
    for (let i=0;i<3;i++) dots.append(document.createElement('i'));
    log.append(dots); log.scrollTop = log.scrollHeight;
    replyTimer = setTimeout(() => {
      dots.remove(); const answer = getPapAnswer(text,topic,jokeNumber++);
      addMessage(answer.text,false,answer.links); setBusy(false); showMood(answer.mood ?? 'speaking');
    }, preference.matches ? 0 : 240);
  }
  function reset() {
    clearTimeout(replyTimer); setBusy(false); log.replaceChildren(); input.value = '';
    addMessage(papGreeting); settle();
  }
  function hide() {
    closePanel(false); hidden = true; dismissTip(); stopMotion();
    select('.pap-character-area').hidden = true; select('.pap-restore').hidden = false;
    select('.pap-restore').focus();
  }
  function restore() {
    hidden = false; select('.pap-character-area').hidden = false; select('.pap-restore').hidden = true;
    settle(); fitPanel(); launcher.focus();
  }
  select<HTMLFormElement>('.pap-form').addEventListener('submit', event => { event.preventDefault(); ask(input.value); });
  chips.forEach(chip => chip.addEventListener('click', () => ask(chip.dataset.topic === 'joke' ? 'Erzähl mir einen PAP-Witz' : papTopics[chip.dataset.topic!].title,chip.dataset.topic)));
  launcher.addEventListener('click', () => panel.hidden ? openPanel() : closePanel());
  select('.pap-close').addEventListener('click', () => closePanel());
  select('.pap-clear').addEventListener('click', reset);
  select('.pap-snooze').addEventListener('click', hide);
  select('.pap-restore').addEventListener('click', restore);
  select('.pap-tip-dismiss').addEventListener('click', dismissTip);
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !panel.hidden) { event.preventDefault(); closePanel(); } });
  preference.addEventListener('change', () => { stopMotion(); showPose(0); preloadSmooth(); scheduleIdle(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stopMotion(); else if (!busy) settle(); });
  window.addEventListener('resize', fitPanel, {passive:true});
  window.visualViewport?.addEventListener('resize', fitPanel, {passive:true});
  window.visualViewport?.addEventListener('scroll', fitPanel, {passive:true});
  tipTimer = setTimeout(() => {
    if (hidden || document.hidden || !panel.hidden || tipShown) return;
    tipShown = true; select('.pap-tip').hidden = false; tipTimer = setTimeout(dismissTip,8000);
  },8500);
  addMessage(papGreeting); fitPanel(); scheduleIdle();
}
