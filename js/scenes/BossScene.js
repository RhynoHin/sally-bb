import {StoryScene} from './StoryScene.js';
export class BossScene extends StoryScene{constructor(){super('Boss');}create(data){super.create({...data,level:4,boss:true});}}
