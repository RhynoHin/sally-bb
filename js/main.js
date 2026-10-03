import {W,H} from './config.js';
import {app} from './state.js';
import {audio} from './audio.js';
import {controls} from './ui/TouchControls.js';
import {BootScene} from './scenes/BootScene.js';
import {MenuScene} from './scenes/MenuScene.js';
import {StoryScene} from './scenes/StoryScene.js';
import {BirthdayScene} from './scenes/BirthdayScene.js';
import {BossScene} from './scenes/BossScene.js';
import {EndingScene} from './scenes/EndingScene.js';
const game=new Phaser.Game({type:Phaser.CANVAS,parent:'game',width:W,height:H,backgroundColor:'#ffdfd2',pixelArt:true,roundPixels:true,banner:false,scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},physics:{default:'arcade',arcade:{gravity:{y:950},customUpdate:true,debug:false}},audio:{noAudio:true},scene:[BootScene,MenuScene,StoryScene,BirthdayScene,BossScene,EndingScene]});app.game=game;
function orientation(){const portrait=window.innerHeight>window.innerWidth;app.orientationPaused=portrait;controls.reset();if(app.current?.physics?.world){if(portrait)app.current.physics.world.pause();else if(app.mode==='play')app.current.physics.world.resume();}audio.suspend(portrait||app.paused);const bounds=document.querySelector('#game').getBoundingClientRect();game.scale.setParentSize(bounds.width,bounds.height);}
window.addEventListener('resize',orientation);window.visualViewport?.addEventListener('resize',orientation);window.addEventListener('orientationchange',orientation);document.addEventListener('visibilitychange',()=>{if(document.hidden){controls.reset();audio.suspend(true);}else audio.suspend(app.orientationPaused||app.paused);});document.addEventListener('contextmenu',e=>e.preventDefault());document.addEventListener('gesturestart',e=>e.preventDefault(),{passive:false});document.addEventListener('touchmove',e=>e.preventDefault(),{passive:false});setTimeout(orientation,100);
window.render_game_to_text=()=>{const s=app.current,p=s?.player;return JSON.stringify({coordinates:'world pixels; origin top-left; +x right; +y down',mode:app.mode,paused:app.paused,portrait:app.orientationPaused,level:s?.level,world:s?.world?.name,health:s?.health,score:app.run?.score,letters:app.run?.letters,camera:s?.cameras?.main?.scrollX,player:p?{x:Math.round(p.x),y:Math.round(p.y),vx:Math.round(p.body.velocity.x),vy:Math.round(p.body.velocity.y),grounded:p.body.blocked.down||p.body.touching.down,face:p.face,invincible:p.invincible,animation:p.anims.currentAnim?.key}:null,enemies:s?.enemyList?.filter(e=>e.active&&(!p||Math.abs(e.x-p.x)<700)).map(e=>({kind:e.kind,state:e.state,x:Math.round(e.x),y:Math.round(e.y),seconds:+e.timer.toFixed(1),bossObject:e.object})),items:s?.pickups?.getChildren().filter(c=>c.active&&(!p||Math.abs(c.x-p.x)<500)).map(c=>({kind:c.kind,id:c.id,birthday:c.birthday,x:c.x,y:c.y})),birthday:s?.level===5?{collected:s.birthdayCollected.size,total:s.birthdayTotal,secret:s.secretShown}:null,boss:s?.isBoss?{hp:s.bossHp,phase:s.bossPhase}:null,checkpoint:s?.checkpoint,goal:s?.goalX,audio:audio.sample()});};
// Deterministic test stepping drives Phaser's actual scene/physics loop.
let testClock=performance.now();window.advanceTime=ms=>{game.loop.stop();const frames=Math.max(1,Math.ceil(ms/(1000/60)));for(let i=0;i<frames;i++){testClock+=1000/60;game.step(testClock,1000/60);}};
// Opt-in only on local test URLs. Never available on a normal production URL.
if(new URLSearchParams(location.search).has('test')&&['127.0.0.1','localhost'].includes(location.hostname))window.__sallyTest={app,audio,controls,game};
if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js').catch(()=>{}));
