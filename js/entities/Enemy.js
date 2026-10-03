import {ENEMY_NAMES} from '../config.js';
import {audio} from '../audio.js';
export class Enemy extends Phaser.Physics.Arcade.Sprite{
 constructor(scene,x,y,type=0,object=false){super(scene,x,y,'enemy',type*4);scene.add.existing(this);scene.physics.add.existing(this);this.setDepth(6);this.setOrigin(.5,1);this.body.setSize(28,28).setOffset(6,10);this.kind=ENEMY_NAMES[type];this.type=type;this.home=x;this.baseY=y;this.dir=-1;this.state='normal';this.timer=0;this.life=0;this.object=object;this.setImmovable(true);this.play('enemy-'+type);if(type===4||type===6)this.body.setAllowGravity(false);}
 inflate(){if(this.state!=='normal')return;this.state='hit';this.life=.1;this.setVelocity(0,0);this.body.setAllowGravity(false);this.state='floating';this.timer=6.5;this.baseY=this.y-28;this.body.checkCollision.down=false;this.body.checkCollision.left=false;this.body.checkCollision.right=false;this.bubble=this.scene.add.image(this.x,this.y-20,'bubble').setScale(1.28).setDepth(5).setAlpha(.85);this.setScale(1.12);audio.sfx('inflate');this.scene.burst(this.x,this.y-20,0xffc1dc,8);}
 launch(dir){this.state='launched';this.dir=dir;this.timer=2;this.setVelocity(dir*480,-35);this.body.checkCollision.none=true;audio.sfx('projectile');}
 pop(){if(!this.active)return;this.state='pop';audio.sfx('pop');this.scene.burst(this.x,this.y-20,0xffddac,12);this.bubble?.destroy();this.destroy();}
 tick(dt){this.life+=dt;if(this.state==='floating'){this.timer-=dt;this.setVelocity(0,0);this.y=this.baseY+Math.sin(this.life*3)*4;this.body.updateFromGameObject();this.bubble?.setPosition(this.x,this.y-20);this.bubble?.setAlpha(this.timer<1?(Math.floor(this.life*12)%2?.3:.85):.85);if(this.timer<=0)this.pop();return;}
 if(this.state==='launched'){this.timer-=dt;this.bubble?.setPosition(this.x,this.y-20);if(this.timer<=0||this.x<0||this.x>this.scene.mapWidth)this.pop();return;}
 if(this.object){this.setVelocityX(this.dir*100);if(this.scene.bossPhase===2&&this.body.blocked.down)this.setVelocityY(-260);return;}
 if(Math.abs(this.x-this.home)>100||this.body.blocked.left||this.body.blocked.right)this.dir*=-1;
 if(this.type===0)this.dir=this.scene.player.x<this.x?-1:1;
 this.setVelocityX(this.dir*(this.type===3?95:this.type===0?28:42));this.setFlipX(this.dir>0);
 if(this.type===2&&this.body.blocked.down)this.setVelocityY(-210);
 if(this.type===4||this.type===6){this.y=this.baseY+Math.sin(this.life*2)*24;this.body.updateFromGameObject();}
 if((this.type===5||this.type===6)&&this.life>2.7){this.life=0;this.scene.hostile(this.x,this.y-28,this.type===6?0:this.dir*145,this.type===6?140:-125);}}
}
