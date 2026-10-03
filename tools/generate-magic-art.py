from PIL import Image, ImageDraw
from pathlib import Path
import json,math

root=Path(__file__).resolve().parents[1]/'assets/sprites'
base=Image.open(root/'sally.png').convert('RGBA')
magic=base.copy()
for i in range(base.width//48):
    frame=base.crop((i*48,0,i*48+48,64)); d=ImageDraw.Draw(frame)
    # Preserve Sally's brown hair, face and original animation silhouette.
    for y in range(30,53):
        for x in range(12,35):
            c=frame.getpixel((x,y))
            if c[:3] in [(52,46,72),(72,65,91)]:frame.putpixel((x,y),(255,242,223,255))
            elif c[:3] in [(213,86,136),(245,140,169)]:frame.putpixel((x,y),(231,105,170,255))
    d=ImageDraw.Draw(frame);d.polygon([(17,31),(23,35),(30,31),(27,38),(23,35),(19,38)],fill='#e55a99')
    d.rectangle((21,34,25,37),fill='#ffe59d');d.rectangle((17,43,30,44),fill='#fff0cd')
    d.polygon([(18,9),(21,6),(24,9),(27,6),(30,9)],fill='#ffe19b');d.rectangle((23,7,25,9),fill='#ed7aad')
    magic.paste(frame,(i*48,0))
magic.save(root/'sally-magic.png')

def star(d,x,y,r,c):
    d.polygon([(x+math.cos(-math.pi/2+i*math.pi/5)*(r if i%2==0 else r*.45),y+math.sin(-math.pi/2+i*math.pi/5)*(r if i%2==0 else r*.45)) for i in range(10)],fill=c)
def heart(d,x,y,r,c):
    d.polygon([(x-r,y),(x-r*.8,y-r*.65),(x-r*.3,y-r*.8),(x,y-r*.35),(x+r*.3,y-r*.8),(x+r*.8,y-r*.65),(x+r,y),(x,y+r)],fill=c)
def doll(pose=0,cry=False,beat=0):
    im=Image.new('RGBA',(64,96));d=ImageDraw.Draw(im);dy=(beat%2) if cry else 0; transformed=pose>=3
    # Detailed original storybook pixel doll, fully clothed throughout the sequence.
    d.polygon([(16,10+dy),(24,5+dy),(41,5+dy),(49,14+dy),(51,39+dy),(56,67),(44,70),(40,43),(17,70),(9,63),(14,38)],fill='#58313f')
    d.polygon([(19,12+dy),(26,8+dy),(40,8+dy),(46,15+dy),(48,43),(52,63),(47,65),(40,36),(18,63),(14,61),(18,36)],fill='#97523d')
    d.line([(18,24),(16,46),(18,57)],fill='#c88453',width=2);d.line([(46,21),(45,44),(49,59)],fill='#b9744b',width=2)
    if cry:
        d.ellipse((12,73,32,88),fill='#f6b497');d.ellipse((35,73,54,88),fill='#f6b497')
        d.rounded_rectangle((8,82,28,93),3,fill='#695264');d.rounded_rectangle((36,82,57,93),3,fill='#695264')
        d.rounded_rectangle((9,81,27,90),3,fill='#fff2e1');d.rounded_rectangle((37,81,56,90),3,fill='#fff2e1')
    else:
        kick=5 if pose==4 else 0
        d.rectangle((22,73,28,87),fill='#f8bc9f');d.rectangle((37+kick,71,43+kick,87-kick),fill='#f8bc9f')
        d.rounded_rectangle((18,85,29,93),2,fill='#724158');d.rounded_rectangle((36+kick,84-kick,48+kick,92-kick),2,fill='#724158')
        d.rectangle((20,79 if transformed else 85,28,90),fill='#fff2e3');d.rectangle((38+kick,78-kick if transformed else 84-kick,47+kick,89-kick),fill='#fff2e3')
        if transformed:d.rectangle((20,79,28,81),fill='#ef92be');d.rectangle((38+kick,78-kick,47+kick,80-kick),fill='#ef92be')
    d.polygon([(22,63),(43,63),(49,77),(16,77)],fill='#a44878');d.polygon([(23,62),(41,62),(46,75),(19,75)],fill='#ed8fb4')
    for x in (23,30,37,43):d.line((x,65,x+1,74),fill='#ffd5dd',width=2)
    d.polygon([(20,44),(43,44),(46,61),(41,65),(21,65),(17,56)],fill='#fff0df' if transformed else '#342b46')
    if transformed:
        d.polygon([(22,45),(31,50),(41,45),(37,55),(31,51),(25,55)],fill='#e565a4');heart(d,31,51,3,'#ffdfa0')
        d.rectangle((22,62,41,64),fill='#ffde98');star(d,31,64,4,'#fff4db')
        d.polygon([(22,62),(14,66),(9,77),(21,74)],fill='#b5e2e6');d.polygon([(41,62),(49,66),(55,77),(43,74)],fill='#b5e2e6')
    else:heart(d,31,54,6,'#f08da8')
    # Arms change from heart clasp to raised hand, twirl, leap and wand strike.
    positions={0:((21,53),(28,55),(42,53),(35,55)),1:((20,48),(12,36),(44,46),(51,26)),2:((20,49),(6,43),(44,49),(59,43)),3:((20,49),(5,43),(44,49),(59,43)),4:((20,48),(12,26),(44,48),(54,29)),5:((20,50),(31,57),(44,50),(31,53)),6:((20,49),(12,57),(44,47),(58,35)),7:((20,49),(13,64),(44,49),(50,30))}
    a,b,c,e=positions.get(pose,positions[0])
    if cry:a,b,c,e=(20,52),(27,63),(44,52),(39,61)
    for u,v in [(a,b),(c,e)]:
        d.line([u,v],fill='#d78d7c',width=7);d.line([u,v],fill='#ffc8a6',width=5);d.ellipse((v[0]-3,v[1]-3,v[0]+3,v[1]+3),fill='#ffceac')
    if transformed:
        d.ellipse((16,44,24,50),fill='#fff6e8');d.ellipse((40,44,48,50),fill='#fff6e8')
        if pose in (6,7):
            wx,wy=e;d.line([(wx,wy+5),(wx+3,wy-10)],fill='#ffe1a0',width=3);star(d,wx+3,wy-14,7,'#ffe49c');heart(d,wx+3,wy-14,3,'#f077ad')
    # Soft cheeks, large expressive eyes, swept brown fringe.
    d.rounded_rectangle((18,15+dy,46,40+dy),8,fill='#e79781');d.rounded_rectangle((20,13+dy,44,39+dy),7,fill='#ffd0ad')
    d.polygon([(17,18+dy),(21,10+dy),(39,10+dy),(46,17+dy),(42,22+dy),(35,15+dy),(29,18+dy),(22,23+dy)],fill='#92503b')
    d.line([(22,14+dy),(30,10+dy),(37,12+dy)],fill='#bf7c4e',width=2)
    d.ellipse((20,31+dy,26,35+dy),fill='#f49b98');d.ellipse((38,31+dy,44,35+dy),fill='#f49b98')
    if cry:
        d.line([(23,26+dy),(27,28+dy),(23,30+dy)],fill='#563445',width=2);d.line([(41,26+dy),(37,28+dy),(41,30+dy)],fill='#563445',width=2)
        d.line([(23,24+dy),(27,22+dy)],fill='#7f423d',width=2);d.line([(37,22+dy),(41,24+dy)],fill='#7f423d',width=2)
        d.ellipse((29,32+dy,36,39+dy),fill='#8d3858');d.ellipse((31,35+dy,35,38+dy),fill='#ef8fa4')
        for x,phase in [(23,beat),(39,beat+2)]:
            y=29+dy+phase%4*2;d.polygon([(x,y),(x-2,y+5),(x,y+7),(x+2,y+5)],fill='#80d8ed');d.point((x-1,y+4),fill='#e8faff')
        # Visible milk bottle held tightly in both hands.
        by=58+dy;d.rounded_rectangle((26,by,39,by+20),3,fill='#94a8be');d.rounded_rectangle((28,by+1,37,by+18),2,fill='#f8f4e5')
        d.rectangle((27,by-2,38,by+2),fill='#ec9ab9');d.rectangle((30,by-6,35,by-2),fill='#ffd7b3');d.rectangle((29,by+10,36,by+14),fill='#b0dce3');heart(d,32,by+12,2,'#e981a9')
        d.ellipse((22,by+5,28,by+12),fill='#ffd0ad');d.ellipse((37,by+5,43,by+12),fill='#ffd0ad')
    else:
        for x in (24,37):
            d.rounded_rectangle((x,25+dy,x+4,31+dy),1,fill='#3e2c3a');d.rectangle((x,25+dy,x+1,27+dy),fill='#fff6e5')
        d.line([(29,35+dy),(32,37+dy),(35,35+dy)],fill='#ad5966',width=1)
    if transformed:
        d.polygon([(25,12),(28,7),(32,11),(36,7),(40,12)],fill='#ffe3a4');heart(d,32,10,2,'#ea74a8')
        star(d,18,32,2,'#ffdfa1');star(d,46,32,2,'#ffdfa1')
    return im
cinema=Image.new('RGBA',(64*8,96))
for i in range(8):cinema.paste(doll(i),(i*64,0))
cinema.save(root/'sally-cinema.png')
cry=Image.new('RGBA',(64*6,96))
for i in range(6):cry.paste(doll(cry=True,beat=i),(i*64,0))
cry.save(root/'sally-cry.png')
print('Generated transformed Sally atlas, 8 cinematic poses and 6 milk-bottle crying frames.')
