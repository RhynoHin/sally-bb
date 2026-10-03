export const W=960,H=540;
export const ITEM_NAMES=['strawberry','candy','cake','star','heart','milk','note','candle','gift','balloon'];
export const ENEMY_NAMES=['strawberry','teddy','jelly','duck','bottle','cupcake','cloud'];
export const WORLDS=[
 {name:'Candy Garden',short:'CANDY GARDEN',tag:'A sweet little beginning',sky:0,floor:0xffe0b4,edge:0xed9fb1,music:0,length:3100},
 {name:'Milk Bottle Factory',short:'MILK FACTORY',tag:'A little magic in every bottle',sky:1,floor:0xa4d2d0,edge:0x648da2,music:1,length:3300},
 {name:'Giant Toy Bedroom',short:'TOY BEDROOM',tag:'Small Sally. Enormous adventures.',sky:2,floor:0xe5bb95,edge:0x94749e,music:2,length:3350},
 {name:'Moonlight Nursery',short:'MOONLIGHT',tag:'Follow the stars, little dreamer',sky:3,floor:0xa095c9,edge:0xe2b7db,music:3,length:3450},
 {name:'Sally Dream Castle',short:'DREAM CASTLE',tag:'One brave heart can change a world',sky:4,floor:0xf3c6bb,edge:0xbb7b9f,music:4,length:2800},
 {name:'Sally’s Birthday Party',short:'LEVEL 913',tag:'Every little wish begins with you',sky:5,floor:0xf6c9ad,edge:0xe893b2,music:5,length:3700},
 {name:'Secret Dream Level',short:'SECRET DREAM',tag:'SALLY BB SUPER STAR!',sky:6,floor:0xb698cf,edge:0xffd79a,music:6,length:2650}
];
export const SAVE_KEY='sally-bb-v1';
const initial={unlocked:1,story:null,best:0,letters:[],birthdayUnlocked:true,birthdaySecret:false,dreamUnlocked:false,sound:true,reducedMotion:false};
export let save={...initial};
try{save={...initial,...JSON.parse(localStorage.getItem(SAVE_KEY)||'{}')};}catch{}
export function persist(){try{localStorage.setItem(SAVE_KEY,JSON.stringify(save));}catch{}}
