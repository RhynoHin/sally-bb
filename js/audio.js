import {save,persist} from './config.js';
// All melodies and sound envelopes were composed for this game. No audio files.
const melodies=[
 [72,76,79,76,74,77,81,79,76,72,74,76,79,83,81,79],
 [67,74,76,74,79,76,74,71,69,76,79,76,81,79,76,74],
 [72,79,76,84,81,79,76,74,77,81,79,76,74,72,71,74],
 [69,76,81,79,76,74,72,76,69,74,77,76,72,71,69,64],
 [72,76,79,84,83,79,77,76,74,77,81,86,84,81,79,76],
 [76,79,84,81,79,76,74,79,77,81,86,84,81,77,76,72,79,84,88,86,84,81,79,76,77,81,84,86,88,84,79,84],
 [72,79,84,88,86,84,81,79,76,81,84,88,91,88,84,79]
];
export class AudioEngine{
 constructor(){this.ctx=null;this.theme=0;this.beat=0;this.running=false;this.timer=null;this.suspended=false;this.active=new Set();this.notesPlayed=0;}
 unlock(){if(!this.ctx){const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;this.ctx=new AC();this.master=this.ctx.createGain();this.master.gain.value=save.sound?.3:0;this.analyser=this.ctx.createAnalyser();this.analyser.fftSize=256;this.master.connect(this.analyser);this.analyser.connect(this.ctx.destination);}if(this.ctx.state==='suspended')this.ctx.resume().catch(()=>{});if(!this.timer)this.timer=setInterval(()=>this.schedule(),60);}
 tone(midi,duration=.12,type='square',volume=.14,when){if(!this.ctx||!save.sound||this.suspended)return;const t=when??this.ctx.currentTime;const o=this.ctx.createOscillator(),g=this.ctx.createGain();o.type=type;o.frequency.setValueAtTime(440*Math.pow(2,(midi-69)/12),t);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(volume,t+.007);g.gain.exponentialRampToValueAtTime(.001,t+duration);o.connect(g);g.connect(this.master);o.start(t);o.stop(t+duration+.01);this.active.add(o);o.onended=()=>{this.active.delete(o);g.disconnect();o.disconnect();};this.notesPlayed++;}
 music(theme){this.theme=theme;this.beat=0;this.running=true;this.next=(this.ctx?.currentTime||0)+.05;}
 schedule(){if(!this.ctx||!save.sound||!this.running||this.suspended)return;const step=this.theme===3?.23:.16;if(this.next<this.ctx.currentTime-.2)this.next=this.ctx.currentTime+.02;while(this.next<this.ctx.currentTime+.12){const m=melodies[this.theme];this.tone(m[this.beat%m.length],step*.85,'square',.065,this.next);if(this.beat%2===0)this.tone([48,53,55,53][Math.floor(this.beat/8)%4],step*1.5,'triangle',.14,this.next);if(this.beat%4===2)this.tone(91,.035,'triangle',.04,this.next);this.next+=step;this.beat++;}}
 sfx(name){const seq={jump:[67,79],land:[48],attack:[79,83,88],projectile:[88],inflate:[60,67,76,84],pop:[91,79],defeat:[76,84],collect:[79,88],heal:[72,76,79,84],hurt:[48,43],clear:[72,76,79,84,88],menu:[76,79],secret:[76,79,84,88,91,96],birthday:[72,79,84,88,86,84,91],switch:[60,72]}[name]||[76];seq.forEach((n,i)=>this.tone(n,.12,name==='hurt'?'sawtooth':'square',.13,(this.ctx?.currentTime||0)+i*.055));}
 toggle(){this.unlock();save.sound=!save.sound;persist();if(this.master)this.master.gain.setValueAtTime(save.sound?.3:0,this.ctx.currentTime);if(save.sound){this.next=this.ctx.currentTime+.03;this.sfx('menu');}return save.sound;}
 suspend(value){this.suspended=value;if(value)for(const o of this.active){try{o.stop();}catch{}}else this.next=(this.ctx?.currentTime||0)+.03;}
 sample(){if(!this.analyser)return {context:'uninitialised',rms:0};const a=new Uint8Array(this.analyser.fftSize);this.analyser.getByteTimeDomainData(a);return {context:this.ctx.state,rms:Math.sqrt(a.reduce((s,v)=>s+((v-128)/128)**2,0)/a.length),notes:this.notesPlayed,muted:!save.sound};}
}
export const audio=new AudioEngine();
