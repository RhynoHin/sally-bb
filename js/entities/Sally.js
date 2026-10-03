import {controls} from '../ui/TouchControls.js';
import {audio} from '../audio.js';
export class Sally extends Phaser.Physics.Arcade.Sprite{
 constructor(scene,x,y){super(scene,x,y,'sally');scene.add.existing(this);scene.physics.add.existing(this);this.setOrigin(.5,1).setScale(1.25).setDepth(8);this.body.setSize(22,48).setOffset(13,12);this.body.setMaxVelocity(280,680);this.body.setCollideWorldBounds(false);this.face=1;this.coyote=0;this.buffer=0;this.attackTimer=0;this.invincible=0;this.poseTimer=0;this.dropTimer=0;this.wasGround=false;this.play('sally-idle');}
 tick(dt){const s=this.scene;this.invincible=Math.max(0,this.invincible-dt);this.attackTimer=Math.max(0,this.attackTimer-dt);this.poseTimer=Math.max(0,this.poseTimer-dt);this.dropTimer=Math.max(0,this.dropTimer-dt);const grounded=this.body.blocked.down||this.body.touching.down;if(grounded){this.coyote=.12;if(!this.wasGround){audio.sfx('land');this.poseTimer=.09;this.pose='land';}}else this.coyote=Math.max(0,this.coyote-dt);if(controls.jumpQueued){this.buffer=.14;controls.jumpQueued=false;}else this.buffer=Math.max(0,this.buffer-dt);
 const dir=(controls.held.right?1:0)-(controls.held.left?1:0);this.setVelocityX(dir*(s.milkTimer>0?270:230));if(dir){this.face=dir;this.setFlipX(dir<0);}if(this.buffer>0&&this.coyote>0){if(controls.keyboard.has('ArrowDown')){this.dropTimer=.25;this.y+=12;}else{this.setVelocityY(-500);audio.sfx('jump');}this.buffer=0;this.coyote=0;}
 if(controls.jumpRelease){if(this.body.velocity.y< -190)this.setVelocityY(-190);controls.jumpRelease=false;}
 if(controls.attackQueued||(controls.held.attack&&this.attackTimer<=0)){controls.attackQueued=false;if(this.attackTimer<=0){s.rattle();this.attackTimer=.32;this.pose='attack';this.poseTimer=.2;}}
 this.alpha=this.invincible>0?(Math.floor(s.elapsed*12)%2?.35:1):1;
 const anim=this.poseTimer>0?this.pose:!grounded?(this.body.velocity.y<0?'jump':'fall'):dir?(s.milkTimer>0?'run':'walk'):'idle';this.play('sally-'+anim,true);this.wasGround=grounded;this.x=Phaser.Math.Clamp(this.x,22,s.mapWidth-22);}
}
