from PIL import Image, ImageDraw
from pathlib import Path
import math, random, json

ROOT=Path(__file__).resolve().parents[1]/'assets'; random.seed(913)
def rect(d,box,c): d.rectangle(box,fill=c)
def heart(d,x,y,c,s=1):
    d.polygon([(x,y+2*s),(x+2*s,y),(x+4*s,y+s),(x+6*s,y),(x+8*s,y+2*s),(x+8*s,y+4*s),(x+4*s,y+8*s),(x,y+4*s)],fill=c)
def star(d,x,y,c,r=8):
    d.polygon([(x+math.cos(-math.pi/2+i*math.pi/5)*(r if i%2==0 else r*.45),y+math.sin(-math.pi/2+i*math.pi/5)*(r if i%2==0 else r*.45)) for i in range(10)],fill=c)

states={'idle':4,'blink':2,'walk':6,'run':6,'jump':2,'fall':2,'land':2,'attack':4,'hurt':2,'invincible':2,'collect':2,'victory':4,'clear':4,'birthday':6,'over':2}
frames=[]; mapping={}
for state,count in states.items():
    mapping[state]=[]
    for f in range(count):
        im=Image.new('RGBA',(48,64));d=ImageDraw.Draw(im); mapping[state].append(len(frames))
        bob=1 if state in ['idle','blink'] and f%3==1 else 0
        stride=([-3,0,3,0,-2,2][f%6] if state in ['walk','run'] else 0)
        victory=state in ['victory','clear','birthday','collect']; attack=state=='attack'
        oy=bob+(-2 if victory and f%2 else 0)+(2 if state=='land' else 0)
        # Swept brown silhouette with stepped pixel edges.
        d.polygon([(13,8+oy),(20,4+oy),(31,5+oy),(36,11+oy),(38,28+oy),(41,39+oy),(35,43+oy),(31,37+oy),(10,42+oy),(7,35+oy),(11,28+oy)],fill='#573443')
        d.polygon([(14,9+oy),(22,6+oy),(30,7+oy),(34,12+oy),(35,31+oy),(37,38+oy),(33,39+oy),(30,30+oy),(13,36+oy),(11,34+oy)],fill='#8f503b')
        # legs + ivory trainers
        if state=='victory':
            # Seated victory pose on the ending cake, with bent knees and trainers.
            rect(d,(17,49+oy,30,53+oy),'#f3b599');rect(d,(21,53+oy,34,57+oy),'#f3b599')
            rect(d,(29,51+oy,37,56+oy),'#5a4259');rect(d,(32,55+oy,41,60+oy),'#5a4259')
            rect(d,(29,50+oy,37,54+oy),'#fff4e7');rect(d,(32,54+oy,41,58+oy),'#fff4e7')
        else:
            rect(d,(17+stride,49+oy,22+stride,57+oy),'#f3b599');rect(d,(26-stride,49+oy,31-stride,57+oy),'#f3b599')
            rect(d,(15+stride,56+oy,23+stride,61+oy),'#5a4259');rect(d,(25-stride,56+oy,34-stride,61+oy),'#5a4259')
            rect(d,(15+stride,55+oy,23+stride,59+oy),'#fff4e7');rect(d,(25-stride,55+oy,34-stride,59+oy),'#fff4e7')
        # pink skirt, dark fitted top
        d.polygon([(16,42+oy),(31,42+oy),(35,51+oy),(12,51+oy)],fill='#d95688');rect(d,(17,43+oy,29,49+oy),'#f58ca9');rect(d,(18,44+oy,21,50+oy),'#ffc2c5')
        d.polygon([(16,30+oy),(30,30+oy),(33,41+oy),(30,44+oy),(16,44+oy),(13,38+oy)],fill='#342e48');rect(d,(17,31+oy,29,42+oy),'#48415b')
        heart(d,20,34+oy,'#f993ad',.8)
        # arms / magical heart rattle
        ly=25 if victory else 37; ry=22 if victory else (30 if attack else 37)
        rect(d,(10,ly+oy,15,ly+7+oy),'#f8c4a3');rect(d,(31,ry+oy,36,ry+7+oy),'#f8c4a3')
        if attack or victory:
            rect(d,(37,ry-4+oy,39,ry+5+oy),'#f9d68c');heart(d,33,ry-11+oy,'#963958');heart(d,34,ry-10+oy,'#ff8fb3',.8)
        # face and ears
        rect(d,(14,17+oy,33,26+oy),'#e79b83');rect(d,(15,12+oy,32,27+oy),'#ffd1ae');rect(d,(18,10+oy,29,29+oy),'#ffd1ae')
        d.polygon([(13,13+oy),(16,8+oy),(29,8+oy),(33,13+oy),(30,15+oy),(25,11+oy),(20,15+oy),(15,18+oy)],fill='#8f503b')
        rect(d,(18,8+oy,26,9+oy),'#bd7b4b');rect(d,(14,12+oy,16,16+oy),'#b56f47')
        blink=state=='blink' or (state=='idle' and f==3) or state=='over'
        if blink:
            rect(d,(18,20+oy,21,20+oy),'#392c3d');rect(d,(26,20+oy,29,20+oy),'#392c3d')
        else:
            rect(d,(18,18+oy,21,22+oy),'#392c3d');rect(d,(26,18+oy,29,22+oy),'#392c3d');rect(d,(18,18+oy,19,19+oy),'#fff7e9');rect(d,(26,18+oy,27,19+oy),'#fff7e9')
        rect(d,(16,24+oy,19,25+oy),'#f39a96');rect(d,(28,24+oy,31,25+oy),'#f39a96');rect(d,(23,26+oy,26,26+oy),'#a45363')
        if victory: rect(d,(24,27+oy,25,27+oy),'#a45363')
        rect(d,(13,25+oy,13,26+oy),'#ffdc86');rect(d,(33,25+oy,33,26+oy),'#ffdc86')
        frames.append(im)
sheet=Image.new('RGBA',(48*len(frames),64))
for i,im in enumerate(frames):sheet.paste(im,(i*48,0))
sheet.save(ROOT/'sprites/sally.png');(ROOT/'sprites/animations.json').write_text(json.dumps(mapping))

enemy_names=['strawberry','teddy','jelly','duck','bottle','cupcake','cloud']
sheet=Image.new('RGBA',(40*4,40*7))
for row,name in enumerate(enemy_names):
  for f in range(4):
    im=Image.new('RGBA',(40,40));d=ImageDraw.Draw(im);o=f%2
    if name=='strawberry':
      d.polygon([(7,13+o),(13,8+o),(28,8+o),(33,15+o),(30,29+o),(21,36+o),(12,30+o)],fill='#843d64');d.polygon([(9,14+o),(14,10+o),(27,10+o),(31,16+o),(28,28+o),(21,33+o),(14,28+o)],fill='#f66f87');d.polygon([(12,10),(15,3),(20,8),(24,2),(27,10)],fill='#62b88c')
      for x,y in [(13,17),(27,15),(16,29),(26,28)]:rect(d,(x,y,x+1,y+2),'#ffe3a2')
    elif name=='teddy':
      d.ellipse((5,4,17,16),fill='#a56e58');d.ellipse((24,4,35,16),fill='#a56e58');d.ellipse((7,8+o,33,34+o),fill='#cf9b70');d.ellipse((14,24+o,27,34+o),fill='#ffe0ac')
    elif name=='jelly':
      d.polygon([(5,31),(7,18+o),(13,9+o),(26,9+o),(33,18+o),(35,31),(27,34),(20,31),(12,34)],fill='#9773c4');rect(d,(12,12+o,17,14+o),'#d0b9ed')
    elif name=='duck':
      d.ellipse((7,15+o,32,34+o),fill='#ffd077');d.ellipse((12,7+o,31,25+o),fill='#ffe3a0');rect(d,(28,18+o,37,22+o),'#ed9074');rect(d,(4,13,8,22),'#b78ca2');rect(d,(2,16,10,19),'#b78ca2')
    elif name=='bottle':
      rect(d,(13,6+o,26,10+o),'#bf779c');d.polygon([(12,12+o),(28,12+o),(31,31+o),(9,31+o)],fill='#fcf0da');rect(d,(12,20+o,28,26+o),'#9bc6d1');d.polygon([(9,17),(1,12),(4,22)],fill='#c1e4df');d.polygon([(31,17),(39,12),(36,22)],fill='#c1e4df')
    elif name=='cupcake':
      d.polygon([(8,22),(32,22),(29,35),(12,35)],fill='#ab7393');d.ellipse((7,11+o,33,28+o),fill='#ffe2bd');d.ellipse((13,4+o,28,20+o),fill='#ffc2c1');d.ellipse((18,3,23,8),fill='#e26581')
    else:
      d.ellipse((2,16+o,37,31+o),fill='#adabdb');d.ellipse((8,8+o,28,30+o),fill='#e8e2ff');d.ellipse((20,13+o,36,29+o),fill='#e8e2ff')
    ey=20+o;rect(d,(15,ey,17,ey+3),'#40374f');rect(d,(25,ey,27,ey+3),'#40374f');rect(d,(19,ey+7,24,ey+7),'#7a4d6c')
    sheet.paste(im,(f*40,row*40))
sheet.save(ROOT/'sprites/enemies.png')

items=['strawberry','candy','cake','star','heart','milk','note','candle','gift','balloon']
sheet=Image.new('RGBA',(24*len(items),28))
for i,k in enumerate(items):
  im=Image.new('RGBA',(24,28));d=ImageDraw.Draw(im)
  if k=='strawberry':
    d.polygon([(4,10),(12,6),(20,10),(19,18),(12,24),(5,18)],fill='#fb7999');d.polygon([(7,9),(8,3),(12,7),(17,3),(17,10)],fill='#65b792');rect(d,(8,13,9,15),'#fff0bb');rect(d,(15,15,16,17),'#fff0bb')
  elif k=='candy':
    d.polygon([(1,8),(7,11),(17,11),(23,8),(23,21),(17,18),(7,18),(1,21)],fill='#bc9be0');d.ellipse((6,6,18,22),fill='#f8bdd0');rect(d,(10,8,13,20),'#ffe9bf')
  elif k=='cake':
    d.polygon([(3,10),(19,7),(21,22),(3,22)],fill='#fcd2a3');rect(d,(3,13,20,15),'#ed8eae');rect(d,(3,19,20,21),'#d08b67');d.polygon([(3,10),(17,5),(20,10)],fill='#fff5dc');d.ellipse((12,3,16,7),fill='#f27592')
  elif k=='star':star(d,12,14,'#f2ae57',11);star(d,12,13,'#ffe39a',9)
  elif k=='heart':heart(d,3,6,'#c95b86',2.1);heart(d,5,7,'#ff9dba',1.65)
  elif k=='milk':rect(d,(7,5,16,8),'#e4a7ba');rect(d,(5,10,18,24),'#fff2db');rect(d,(6,15,17,20),'#a3d9d5');heart(d,9,16,'#ec87a5',.65)
  elif k=='note':rect(d,(14,5,17,19),'#a46bd2');rect(d,(8,4,16,7),'#a46bd2');d.ellipse((7,16,17,24),fill='#cc94dc')
  elif k=='candle':rect(d,(8,11,15,24),'#fff0b9');rect(d,(9,13,11,23),'#f19cb6');d.polygon([(12,1),(8,7),(11,10),(15,7)],fill='#ffc969')
  elif k=='gift':rect(d,(3,10,21,24),'#ef91b1');rect(d,(2,8,22,12),'#ffbfca');rect(d,(10,8,13,24),'#ffe2a0');d.ellipse((4,2,11,8),outline='#e6b363',width=2);d.ellipse((12,2,19,8),outline='#e6b363',width=2)
  else:d.ellipse((5,2,19,19),fill='#ffdb8e');rect(d,(8,5,10,10),'#fff4cf');d.line([(12,19),(14,23),(11,27)],fill='#c29578')
  sheet.paste(im,(i*24,0))
sheet.save(ROOT/'sprites/items.png')

themes=[('#ffe0c6','#9bd4b8','#eaa1a7'),('#f6dcae','#a8d6db','#729faf'),('#f6c8b1','#c8a9dd','#9681b7'),('#292c59','#696799','#d8b7df'),('#fbd6df','#edb5ca','#c57c9f'),('#ffdfd2','#edb2ca','#dc88ab'),('#41315b','#a082b7','#f2c77e')]
for idx,(sky,hill,accent) in enumerate(themes):
 im=Image.new('RGB',(480,270),sky);d=ImageDraw.Draw(im)
 top=tuple(int(sky[j:j+2],16) for j in (1,3,5))
 for y in range(270):
   color=tuple(min(255,int(c+(255-c)*y/540)) for c in top);rect(d,(0,y,480,y),color)
 for n in range(24):
   x=random.randrange(480);y=random.randrange(155)
   if idx in [3,6]:star(d,x,y,'#fff0ba',random.choice([2,3,4]))
   else:d.ellipse((x,y,x+30,y+9),fill='#fff1dd');d.ellipse((x+8,y-5,x+22,y+7),fill='#fff1dd')
 if idx in [3,6]:d.ellipse((364,24,418,78),fill='#ffebb3');d.ellipse((379,18,427,68),fill=sky)
 for x in [-70,80,220,370]: d.ellipse((x,150,x+210,360),fill=hill)
 # Background landmark silhouettes make each world distinct.
 for x in range(30,480,110):
   y=130+(x%3)*9
   if idx==0:
    rect(d,(x+15,y+25,x+22,236),'#b88a77');d.ellipse((x-3,y,x+42,y+40),fill='#efacbb');rect(d,(x+8,y+7,x+17,y+9),'#ffe5b2');d.ellipse((x+20,y+13,x+27,y+20),fill='#fff0bd')
   elif idx==1:
    rect(d,(x,y,x+65,237),accent);rect(d,(x+10,y-16,x+22,y),'#8fbac6');rect(d,(x+5,y+20,x+18,y+48),'#ffe9b7');rect(d,(x+26,y+20,x+39,y+48),'#ffe9b7');rect(d,(x+46,y+20,x+59,y+48),'#ffe9b7')
   elif idx==2:
    for i in range(3):rect(d,(x+i*15,y+i*12,x+14+i*15,245),['#df8da5','#9cbed1','#ebca8c'][i])
   elif idx in [4,6]:
    rect(d,(x,y,x+52,242),accent);rect(d,(x-8,y-15,x+10,242),accent);rect(d,(x+40,y-15,x+60,242),accent);d.polygon([(x-14,y-15),(x+1,y-42),(x+17,y-15)],fill='#d992b3');d.polygon([(x+35,y-15),(x+50,y-42),(x+66,y-15)],fill='#d992b3');d.ellipse((x+17,y+30,x+35,y+60),fill='#ffe6bd')
   elif idx==5:
    d.ellipse((x,y,x+24,y+34),fill='#f3adc1');d.line((x+12,y+34,x+18,236),fill='#b78ca1',width=1);d.ellipse((x+32,y+17,x+54,y+45),fill='#ffe2a3');d.line((x+44,y+45,x+39,236),fill='#b78ca1')
   else:d.ellipse((x,y,x+57,y+21),fill='#a39ac0');d.ellipse((x+12,y-8,x+40,y+17),fill='#a39ac0')
 im.save(ROOT/f'backgrounds/world-{idx}.png')

# Foreground cake, ribbon flag, candy tree, present, heart arch, Nanny.
for key in ['cake','tree','present','arch','nanny']:
 im=Image.new('RGBA',(128,144));d=ImageDraw.Draw(im)
 if key=='cake':
  rect(d,(10,90,117,128),'#cc7a8f');rect(d,(12,92,115,124),'#f3adc0');rect(d,(22,61,106,93),'#f7bfab');rect(d,(33,37,95,64),'#e994b0')
  for x in range(13,114,13):d.ellipse((x,85,x+14,99),fill='#fff0d5')
  for x in range(23,102,12):d.ellipse((x,57,x+14,70),fill='#fff0d5')
  for x in range(35,92,12):d.ellipse((x,33,x+14,45),fill='#fff0d5')
  for x in [43,63,83]:rect(d,(x,19,x+4,33),'#c185b4');d.polygon([(x+2,8),(x-1,15),(x+2,18),(x+5,15)],fill='#ffcb73')
  heart(d,50,101,'#e17497',2);rect(d,(6,129,121,133),'#f3cf8b');star(d,65,48,'#ffecbb',6)
 elif key=='tree':
  rect(d,(58,58,67,136),'#ac7568');d.ellipse((14,8,111,100),fill='#ac668a');d.ellipse((17,5,108,94),fill='#ef9db5');d.ellipse((31,15,65,31),fill='#ffced0')
  for x,y in [(40,60),(82,35),(65,78)]:heart(d,x,y,'#fff0c4',1.4)
 elif key=='present':
  rect(d,(20,62,108,136),'#be638c');rect(d,(24,64,104,131),'#e796b6');rect(d,(15,50,113,68),'#ffc5cb');rect(d,(58,50,70,135),'#ffde9c');d.ellipse((31,24,64,53),outline='#e9b96e',width=6);d.ellipse((64,24,96,53),outline='#e9b96e',width=6)
 elif key=='arch':
  d.arc((5,8,120,138),180,360,fill='#c785a3',width=12);rect(d,(5,70,16,137),'#c785a3');rect(d,(109,70,120,137),'#c785a3');d.arc((8,11,117,135),180,360,fill='#ffe3a3',width=3);heart(d,51,15,'#ed92b6',3);rect(d,(26,63,100,90),'#fff0cf');star(d,63,76,'#eab479',10)
 else:
  # Original grumpy Nanny: lavender bun, stern glasses, apron, star slippers.
  d.ellipse((42,6,89,38),fill='#a79ab7');d.ellipse((25,24,106,97),fill='#8b7b9a');rect(d,(35,40,96,88),'#f2bc9e');d.polygon([(27,82),(103,82),(117,130),(11,130)],fill='#695b9a');d.polygon([(42,82),(88,82),(99,126),(31,126)],fill='#fff0d5');heart(d,54,96,'#d892ab',2)
  for x in [44,75]:rect(d,(x,52,x+17,68),'#463c61');rect(d,(x+3,55,x+14,65),'#ffe0b6');rect(d,(x+7,57,x+9,62),'#493752')
  rect(d,(60,58,75,60),'#463c61');rect(d,(60,77,76,79),'#a46c7c');rect(d,(32,131,52,137),'#e8acbf');rect(d,(79,131,102,137),'#e8acbf');star(d,43,134,'#ffe6a4',3);star(d,90,134,'#ffe6a4',3)
 im.save(ROOT/f'sprites/{key}.png')

base=frames[0]
for size in [180,192,512]:
 icon=Image.new('RGB',(size,size),'#f2b4c5');d=ImageDraw.Draw(icon);d.rounded_rectangle((size*.08,size*.08,size*.92,size*.92),radius=size*.16,fill='#ffe8cc');s=base.resize((int(size*.66),int(size*.88)),Image.Resampling.NEAREST);icon.paste(s,(int(size*.17),int(size*.1)),s);icon.save(ROOT/f'icons/icon-{size}.png')
print('Original art generated:',len(frames),'Sally frames;',len(items),'items; 7 worlds; icons.')
