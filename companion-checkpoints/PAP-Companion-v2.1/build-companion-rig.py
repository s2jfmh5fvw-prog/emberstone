from PIL import Image,ImageDraw,ImageChops
from pathlib import Path
import json,argparse
root=Path(__file__).parent
parser=argparse.ArgumentParser();parser.add_argument('--website',type=Path,default=root/'emberstone-chatbot/papsmp-website');args=parser.parse_args()
website=args.website
dest=website/'src/assets/chatbot/rig'
dest.mkdir(exist_ok=True)
original=Image.open(website/'src/assets/chatbot/pap-companion-v2.webp').convert('RGBA').crop((0,0,256,256))
def mask(points):
    hi=Image.new('L',(1024,1024));ImageDraw.Draw(hi).polygon([(x*4,y*4) for x,y in points],fill=255)
    return hi.resize((256,256),Image.Resampling.LANCZOS)
def extract(points):
    m=mask(points);part=original.copy();part.putalpha(ImageChops.multiply(original.getchannel('A'),m));return part,m
tail,tail_mask=extract([(0,95),(79,95),(79,114),(75,121),(84,126),(93,137),(106,144),(120,145),(119,170),(104,184),(89,191),(78,200),(78,238),(0,238)])
ear_left,el_mask=extract([(68,20),(108,20),(128,34),(120,49),(111,57),(103,61),(96,69),(94,79),(87,88),(83,98),(75,85)])
ear_right,er_mask=extract([(151,45),(176,17),(197,0),(217,0),(225,59),(219,81),(205,76),(196,64),(184,61),(176,55),(167,57)])
arm,arm_mask=extract([(172,157),(200,157),(207,183),(204,216),(204,237),(168,237),(164,226),(168,210),(168,193),(171,179)])
body=original.copy()
removed=ImageChops.lighter(ImageChops.lighter(tail_mask,el_mask),ImageChops.lighter(er_mask,arm_mask))
body.putalpha(ImageChops.multiply(original.getchannel('A'),ImageChops.invert(removed)))
# Small joint underpainting is covered by the moving piece at rest. No second paw remains.
underpaint=Image.new('RGBA',(256,256));d=ImageDraw.Draw(underpaint)
d.polygon([(172,164),(194,163),(194,184),(188,200),(185,211),(179,219),(169,217),(167,199)],fill='#654757')
d.polygon([(172,164),(194,163),(194,180),(189,185),(187,180),(183,189),(180,184),(174,190)],fill='#d6b397')
d.polygon([(176,188),(186,188),(184,208),(177,218),(169,216),(170,204)],fill='#4e3547')
d.polygon([(82,85),(95,74),(108,66),(108,86),(96,102)],fill='#e1bea0')
d.polygon([(171,52),(192,55),(210,68),(205,83),(194,75),(180,69)],fill='#e5c1a0')
# Restrict painted joint coverage to the holes and preserve transparent floor beneath raised arm.
allowed=ImageChops.lighter(ImageChops.lighter(el_mask,er_mask),arm_mask)
underpaint.putalpha(ImageChops.multiply(underpaint.getchannel('A'),allowed))
body.alpha_composite(underpaint)
ruff,_=extract([(160,149),(197,149),(203,167),(190,178),(181,169),(174,180),(165,174)])
wave_source=Image.open(website/'src/assets/chatbot/pap-companion-v2.webp').convert('RGBA').crop((768,256,1024,512))
hand_mask=mask([(199,139),(198,128),(203,117),(218,108),(230,110),(241,116),(242,128),(236,143),(223,151),(210,147)])
wave_source.putalpha(ImageChops.multiply(wave_source.getchannel('A'),hand_mask))
hand=wave_source.crop((196,106,243,154)).resize((32,33),Image.Resampling.LANCZOS).rotate(-105,resample=Image.Resampling.BICUBIC,expand=True)
wave_arm=arm.copy();keep=Image.new('L',(256,256));ImageDraw.Draw(keep).rectangle((0,0,255,218),fill=255)
wave_arm.putalpha(ImageChops.multiply(wave_arm.getchannel('A'),keep))
wave_arm.alpha_composite(hand,(184-hand.width//2,218-hand.height//2))
parts={'tail':tail,'ear-left':ear_left,'ear-right':ear_right,'body':body,'arm':arm,'ruff':ruff,'wave-arm':wave_arm}
for name,im in parts.items():im.save(dest/f'pap-{name}.webp',quality=94,method=6)
def pose(tail_angle=0,ear_angle=0,arm_angle=0,beans=False):
    canvas=Image.new('RGBA',(256,256))
    canvas.alpha_composite(tail.rotate(tail_angle,resample=Image.Resampling.BICUBIC,center=(107,181)))
    canvas.alpha_composite(ear_left.rotate(ear_angle,resample=Image.Resampling.BICUBIC,center=(101,70)))
    canvas.alpha_composite(ear_right.rotate(-ear_angle,resample=Image.Resampling.BICUBIC,center=(191,67)))
    canvas.alpha_composite(body)
    canvas.alpha_composite((wave_arm if beans else arm).rotate(arm_angle,resample=Image.Resampling.BICUBIC,center=(183,166)))
    canvas.alpha_composite(ruff)
    return canvas
board=Image.new('RGB',(1024,320),(30,24,40))
for i,(label,p) in enumerate([('Reference',original),('Rig / rest',pose()),('Wave / one front paw',pose(arm_angle=105,beans=True)),('Tail + ears',pose(tail_angle=-5,ear_angle=5))]):
    board.paste(p,(i*256,25),p);ImageDraw.Draw(board).text((i*256+12,285),label,fill='white')
board.save(root/'rig-review.png')
(dest/'rig.json').write_text(json.dumps({'reference':'pap-companion-v2 frame 0 / registered neutral 11','canvas':[256,256],'pivots':{'tail':[107,181],'ear-left':[101,70],'ear-right':[191,67],'arm':[183,166]},'underpainting':'only occluded shoulder/ear joins; floor under raised front paw stays transparent','bytes':{name:(dest/f'pap-{name}.webp').stat().st_size for name in parts}},indent=2))
print('Rig bytes:',sum((dest/f'pap-{name}.webp').stat().st_size for name in parts))
