import {StoryScene} from './StoryScene.js';
export class BirthdayScene extends StoryScene{constructor(){super('Birthday');}create(data){super.create({...data,level:5});}}
