/** Standalone PAP frame player; no dependencies, network service, or chat backend. */
export class PapAnimation {
  constructor(canvas, manifest, { baseUrl = document.baseURI, reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches } = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.manifest = manifest;
    this.baseUrl = new URL(baseUrl, document.baseURI).href;
    this.reducedMotion = reducedMotion;
    this.cache = new Map();
    this.generation = 0;
    this.raf = 0;
    this.timer = 0;
    this.playing = false;
    this.canvas.width = manifest.frameSize[0];
    this.canvas.height = manifest.frameSize[1];
    this.hiddenListener = () => {
      if (document.hidden) this.stop();
      else if (!this.destroyed) this.play('idle', { loop: true }).catch(console.error);
    };
    document.addEventListener('visibilitychange', this.hiddenListener);
  }
  async load(state) {
    const spec = this.manifest.states[state];
    if (!spec) throw new Error(`Unknown PAP animation: ${state}`);
    if (!this.cache.has(state)) this.cache.set(state, new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error(`Could not load ${spec.atlas}`));
      image.src = new URL(spec.atlas, this.baseUrl).href;
    }));
    return this.cache.get(state);
  }
  draw(image, frame) {
    const [w, h] = this.manifest.frameSize;
    const columns = this.manifest.columns;
    this.ctx.clearRect(0, 0, w, h);
    this.ctx.drawImage(image, frame % columns * w, Math.floor(frame / columns) * h, w, h, 0, 0, w, h);
    this.canvas.dataset.frame = String(frame);
  }
  async play(state = 'idle', { loop = state === 'idle', onEnd } = {}) {
    this.stop();
    const token = ++this.generation;
    const image = await this.load(state);
    if (token !== this.generation || this.destroyed || document.hidden) return;
    const spec = this.manifest.states[state];
    this.state = state;
    this.canvas.dataset.state = state;
    this.draw(image, 0);
    if (this.reducedMotion) { this.canvas.dataset.motion = 'reduced'; return; }
    this.canvas.dataset.motion = 'animated';
    this.playing = true;
    let start;
    let previous = -1;
    const tick = now => {
      if (token !== this.generation || !this.playing) return;
      start ??= now;
      const elapsed = now - start;
      const frame = Math.min(spec.frames - 1, Math.floor(elapsed / spec.durationMs * spec.frames));
      if (frame !== previous) { this.draw(image, frame); previous = frame; }
      if (elapsed >= spec.durationMs) {
        this.draw(image, spec.frames - 1);
        this.playing = false;
        this.raf = 0;
        if (loop) this.timer = setTimeout(() => {
          if (token === this.generation) this.play(state, { loop, onEnd }).catch(console.error);
        }, state === 'idle' ? 1300 + Math.random() * 1600 : 0);
        else onEnd?.(state);
        return;
      }
      this.raf = requestAnimationFrame(tick);
    };
    this.raf = requestAnimationFrame(tick);
  }
  stop() {
    ++this.generation;
    cancelAnimationFrame(this.raf);
    clearTimeout(this.timer);
    this.raf = 0;
    this.timer = 0;
    this.playing = false;
  }
  destroy() {
    this.destroyed = true;
    this.stop();
    document.removeEventListener('visibilitychange', this.hiddenListener);
    this.cache.clear();
  }
}
