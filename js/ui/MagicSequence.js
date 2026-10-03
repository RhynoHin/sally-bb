import {app} from '../state.js';
import {audio} from '../audio.js';
import {save} from '../config.js';
import {controls} from './TouchControls.js';

const TAU=Math.PI*2;
const ease=t=>1-Math.pow(1-Math.max(0,Math.min(1,t)),3);
function star(g,x,y,r,color,alpha=1,rotation=0){
 const points=Array.from({length:10},(_,i)=>{const a=rotation-Math.PI/2+i*Math.PI/5,k=i%2?r*.42:r;return{x:x+Math.cos(a)*k,y:y+Math.sin(a)*k};});
 g.fillStyle(color,alpha);g.fillPoints(points,true);
}
function heart(g,x,y,r,color,alpha=1){
 g.fillStyle(color,alpha);g.fillCircle(x-r*.42,y-r*.2,r*.55);g.fillCircle(x+r*.42,y-r*.2,r*.55);g.fillTriangle(x-r*.91,y,x+r*.91,y,x,y+r);
}

// A scene-owned timeline: all gameplay clocks and hazards stay frozen throughout.
export class MagicSequence{
 constructor(scene){this.scene=scene;this.time=0;this.phase='transform';this.active=true;this.hit=false;this.soundStage=-1;
  this.reduced=save.reducedMotion||matchMedia('(prefers-reduced-motion: reduce)').matches;
  this.group=scene.add.container(0,0).setDepth(1000).setScrollFactor(0);
  this.bg=scene.add.graphics().setScrollFactor(0);this.lines=scene.add.graphics().setScrollFactor(0);
  this.hero=scene.add.sprite(480,414,'sally-cinema',0).setOrigin(.5,1).setScrollFactor(0).setScale(3.75);
  this.title=scene.add.text(480,43,'SALLY’S HEART, SHINE!',{fontFamily:'Trebuchet MS',fontSize:27,fontStyle:'bold',color:'#fff2cc',stroke:'#754679',strokeThickness:5,letterSpacing:3}).setOrigin(.5).setScrollFactor(0);
  this.caption=scene.add.text(480,484,'A little heart. A whole lot of magic.',{fontFamily:'Trebuchet MS',fontSize:18,color:'#ffe9ed',stroke:'#5c346c',strokeThickness:3}).setOrigin(.5).setScrollFactor(0);
  this.group.add([this.bg,this.lines,this.hero,this.title,this.caption]);
  document.querySelector('#stage').classList.add('cinematic');controls.reset();scene.physics.world.pause();app.mode='transform';audio.running=false;audio.sfx('transform');
 }
 update(dt){
  this.time+=dt;
  if(this.phase==='transform')this.transform();else this.finisher();
 }
 transform(){
  const t=this.time,g=this.bg,o=this.lines;g.clear();o.clear();
  // The level disappears into a rose / indigo theatrical gradient.
  const top=t<3.6?0x643c8e:0x7650aa,bottom=t<3.6?0xe57caf:0xf5a4bf;
  for(let y=0;y<540;y+=18){const c=Phaser.Display.Color.Interpolate.ColorWithColor(Phaser.Display.Color.ValueToColor(top),Phaser.Display.Color.ValueToColor(bottom),540,y);g.fillStyle(Phaser.Display.Color.GetColor(c.r,c.g,c.b));g.fillRect(0,y,960,19);}
  g.fillStyle(0xffdfe3,.04);for(let i=0;i<18;i++){const a=i*TAU/18+t*(this.reduced?.025:.13);g.fillTriangle(480,280,480+Math.cos(a)*800,280+Math.sin(a)*800,480+Math.cos(a+.16)*800,280+Math.sin(a+.16)*800);}
  for(let r=240;r>40;r-=18){g.fillStyle(0xffd7e9,.014);g.fillCircle(480,278,r+Math.sin(t*2)*5);}
  // A gold sigil, heart constellation and flowing orbital ribbons.
  o.lineStyle(2,0xffe7ab,.5);o.strokeEllipse(480,433,410,67);o.lineStyle(1,0xfff0db,.4);o.strokeEllipse(480,433,365,48);
  for(let i=0;i<12;i++){const a=i*TAU/12+t*.18;star(o,480+Math.cos(a)*196,433+Math.sin(a)*30,5,0xffe1a1,.75,a);}
  for(let i=0;i<45;i++){const x=(i*137+Math.sin(t*.8+i)*20)%960,y=(i*89-t*(8+i%4*6)+1080)%540;star(o,x,y,2+i%4,0xffefcf,.35+(i%3)*.18,t*.2);}
  const grow=ease(t/1.2);for(let ribbon=0;ribbon<4;ribbon++){
   const color=[0xffdf9b,0xffb5d9,0xbbeef1,0xfbe9ff][ribbon];const speed=this.reduced?.18:1.1;
   o.lineStyle(5-ribbon*.6,color,.64*grow);o.beginPath();
   for(let i=0;i<=52;i++){const k=i/52,a=k*TAU*1.1+t*speed+ribbon*1.7,x=480+Math.sin(a)*(155+50*Math.sin(k*Math.PI)),y=432-k*340+Math.cos(a)*19;
    if(i===0)o.moveTo(x,y);else o.lineTo(x,y);
   }o.strokePath();
  }
  for(let i=0;i<11;i++){const a=i*TAU/11+t*(this.reduced?.1:.75),r=175+Math.sin(t*2+i)*22;heart(o,480+Math.cos(a)*r,265+Math.sin(a)*145,6+i%3,[0xffd6ec,0xffe7a4,0xc7f5ef][i%3],.55);}
  let frame=t<.65?0:t<1.4?1:t<2.65?2:t<3.65?3:t<4.6?4:t<5.05?5:t<5.6?6:7;
  this.hero.setFrame(frame);this.hero.y=414-(t>1.4&&t<4.6?Math.sin(Math.min(1,(t-1.4)/3.2)*Math.PI)*45:0);
  const spinning=t>1.5&&t<3.65&&!this.reduced;this.hero.setScale(3.75*(spinning?.25+.75*Math.abs(Math.cos((t-1.5)*6.2)):1),3.75);this.hero.setFlipX(spinning&&Math.sin((t-1.5)*6.2)<0);this.hero.rotation=!this.reduced&&t>3.65&&t<4.6?Math.sin((t-3.65)*Math.PI/.95)*-.12:0;
  if(t>=2.65&&t<3.7){const glow=Math.sin((t-2.65)*Math.PI/1.05);g.fillStyle(0xffe9ed,glow*.2);g.fillRect(0,0,960,540);star(o,480,255,100*glow,0xfff0bb,.35);}
  const stage=t<1.4?0:t<3.65?1:t<5.05?2:3;
  if(stage!==this.soundStage){this.soundStage=stage;audio.sfx(stage===3?'magicReady':'sparkle');}
  this.title.setText(stage<2?'SALLY’S HEART, SHINE!':'★ STARHEART SALLY ★');
  this.caption.setText(stage===0?'Heart to the sky…':stage===1?'Ribbon of dreams, wrap me in light!':stage===2?'Tiny BB. Brilliant heart.':'STARHEART BLOOM!');
  if(t>5.05){for(let i=0;i<8;i++){const a=i*TAU/8;star(o,480+Math.cos(a)*230,265+Math.sin(a)*180,10,0xffe5a4,.8,t*.1);}o.lineStyle(3,0xfff0c4,.6);o.strokeCircle(480,258,205);}
  if(t>=6.15){this.phase='finisher';this.time=0;this.group.remove(this.hero,true);this.group.remove(this.title,true);this.group.remove(this.caption,true);this.finisherLabel=this.scene.add.text(480,90,'STARHEART BLOOM!',{fontFamily:'Trebuchet MS',fontSize:30,fontStyle:'bold',color:'#fff1be',stroke:'#9f4a8b',strokeThickness:5}).setOrigin(.5).setScrollFactor(0);this.group.add(this.finisherLabel);this.scene.magicForm=14;this.scene.player.play('magic-attack');this.scene.player.setAlpha(1);audio.sfx('ultimate');app.mode='ultimate';this.finisher();}
 }
 finisher(){
  const t=this.time,g=this.bg,o=this.lines;g.clear();o.clear();
  const p=this.scene.player,cam=this.scene.cameras.main,x=p.x-cam.scrollX,y=p.y-36,progress=ease(t/1.5),alpha=Math.max(0,1-t/1.9);
  this.finisherLabel.setAlpha(alpha);g.fillStyle(0xd267bc,.09*alpha);g.fillRect(0,0,960,540);
  for(let i=0;i<5;i++){const r=30+progress*(960+i*80);o.lineStyle(14-i*2,[0xffa2d2,0xffe8a8,0xbcf2ef,0xffddeb,0xf4c7ff][i],alpha*(.7-i*.1));o.strokeEllipse(x,y,r*2,r*.85);}
  for(let i=0;i<32;i++){const a=i*TAU/32,r=45+progress*(420+i%4*75),hx=x+Math.cos(a)*r,hy=y+Math.sin(a)*r*.55;heart(o,hx,hy,12+(i%3)*4,[0xff98c5,0xffe6a0,0xffe3f4][i%3],alpha);star(o,hx+20,hy-17,6,0xfff0ba,alpha,t);}
  star(o,x,y,55+Math.sin(t*3)*10,0xffe8ae,alpha*.5);heart(o,x,y,33,0xffb1d6,alpha*.8);
  if(!this.hit&&t>=.35){this.hit=true;this.scene.resolveMagic();}
  if(t>=1.9)this.finish();
 }
 finish(){this.active=false;this.group.destroy(true);document.querySelector('#stage').classList.remove('cinematic');controls.reset();app.mode='play';if(!app.orientationPaused)this.scene.physics.world.resume();audio.music(this.scene.world.music);this.scene.player.invincible=Math.max(this.scene.player.invincible,1.2);this.scene.finishMagic();}
 destroy(){this.active=false;this.group?.destroy(true);document.querySelector('#stage').classList.remove('cinematic');}
}

export function cryingPresentation(scene){
 const group=scene.add.container(0,0).setDepth(900).setScrollFactor(0),g=scene.add.graphics().setScrollFactor(0);
 g.fillStyle(0xffe5df);g.fillRect(0,0,960,540);g.fillStyle(0xf9c2d1);g.fillEllipse(280,457,330,60);
 for(let i=0;i<24;i++){heart(g,35+(i*137)%900,45+(i*73)%440,5+i%4,0xf3a9c6,.4);star(g,50+(i*131)%900,30+(i*93)%420,3,0xfff5d3,.8);}
 const hero=scene.add.sprite(278,458,'sally-cry').setOrigin(.5,1).setScale(3.6).setScrollFactor(0).play('sally-cry');
 const label=scene.add.text(278,71,'SALLY NEEDS A CUDDLE',{fontFamily:'Trebuchet MS',fontSize:19,fontStyle:'bold',color:'#a25b82',letterSpacing:2}).setOrigin(.5).setScrollFactor(0);
 group.add([g,hero,label]);scene.cryingHero=hero;return group;
}
