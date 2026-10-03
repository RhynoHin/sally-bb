export class Controls{
 constructor(){this.held={left:false,right:false,jump:false,attack:false,magic:false};this.pointers=new Map();this.keyboard=new Set();this.jumpQueued=false;this.attackQueued=false;this.magicQueued=false;this.jumpRelease=false;
  document.querySelectorAll('[data-control]').forEach(b=>{
   const key=b.dataset.control;
   b.addEventListener('pointerdown',e=>{e.preventDefault();b.setPointerCapture(e.pointerId);this.pointers.set(e.pointerId,key);if(key==='jump')this.jumpQueued=true;if(key==='attack')this.attackQueued=true;if(key==='magic')this.magicQueued=true;this.sync();});
   const release=e=>{if(this.pointers.get(e.pointerId)==='jump')this.jumpRelease=true;this.pointers.delete(e.pointerId);this.sync();};
   b.addEventListener('pointerup',release);b.addEventListener('pointercancel',release);b.addEventListener('lostpointercapture',release);
  });
  window.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','ArrowDown','Space','KeyA','KeyD','KeyX','KeyC','Escape','KeyF'].includes(e.code))e.preventDefault();if(!e.repeat){if(e.code==='Space')this.jumpQueued=true;if(e.code==='KeyX')this.attackQueued=true;if(e.code==='KeyC')this.magicQueued=true;}this.keyboard.add(e.code);this.sync();});
  window.addEventListener('keyup',e=>{if(e.code==='Space')this.jumpRelease=true;this.keyboard.delete(e.code);this.sync();});
  window.addEventListener('blur',()=>this.reset());
 }
 sync(){const p=[...this.pointers.values()];this.held.left=p.includes('left')||this.keyboard.has('ArrowLeft')||this.keyboard.has('KeyA');this.held.right=p.includes('right')||this.keyboard.has('ArrowRight')||this.keyboard.has('KeyD');this.held.jump=p.includes('jump')||this.keyboard.has('Space');this.held.attack=p.includes('attack')||this.keyboard.has('KeyX');this.held.magic=p.includes('magic')||this.keyboard.has('KeyC');document.querySelectorAll('[data-control]').forEach(b=>b.classList.toggle('pressed',this.held[b.dataset.control]));}
 reset(){this.pointers.clear();this.keyboard.clear();this.jumpQueued=false;this.attackQueued=false;this.magicQueued=false;this.jumpRelease=false;this.sync();}
}
export const controls=new Controls();
