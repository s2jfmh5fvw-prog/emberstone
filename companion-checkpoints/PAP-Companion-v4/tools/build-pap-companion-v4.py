"""Free, deterministic 2D character animation. Existing PAP art stays read-only."""
from pathlib import Path
import math, json, hashlib, argparse
import numpy as np
from PIL import Image, ImageDraw, ImageChops, ImageFilter

ROOT = Path(__file__).parent.parent
parser = argparse.ArgumentParser()
parser.add_argument('--out', type=Path, default=ROOT / 'outputs/PAP-Companion-v4')
parser.add_argument('--quick', action='store_true')
parser.add_argument('--source', type=Path, default=ROOT / 'work/emberstone-chatbot/papsmp-website/src/assets/chatbot')
args = parser.parse_args()
OUT = args.out
OUT.mkdir(parents=True, exist_ok=True)
SOURCE = args.source.resolve()
S = 2
N = 256 * S
SIZE = 320
FPS = 30
base = Image.open(SOURCE / 'pap-companion-v2.webp').convert('RGBA').crop((0, 0, 256, 256))
rig = {p.stem.replace('pap-', ''): Image.open(p).convert('RGBA') for p in (SOURCE / 'rig').glob('*.webp')}

def blank(): return Image.new('RGBA', (N, N))
def hi(im): return im.resize((N, N), Image.Resampling.LANCZOS)
def mask(points):
    m = Image.new('L', (N, N))
    ImageDraw.Draw(m).polygon([(x*S, y*S) for x,y in points], fill=255)
    return m
def part(im, points):
    result = hi(im)
    result.putalpha(ImageChops.multiply(result.getchannel('A'), mask(points)))
    return result
def remove(im, m):
    result = im.copy()
    result.putalpha(ImageChops.multiply(result.getchannel('A'), ImageChops.invert(m)))
    return result

# Head and chest are separate; the retained neck fur conceals their joint.
head_mask = mask([(58,0),(256,0),(256,119),(238,130),(219,137),(197,141),(164,140),(143,137),(125,136),(106,137),(85,129),(65,114)])
body_full = hi(rig['body'])
head = body_full.copy()
head.putalpha(ImageChops.multiply(head.getchannel('A'), head_mask))
body = remove(body_full, head_mask)
neck = blank()
draw = ImageDraw.Draw(neck)
draw.polygon([(112*S,134*S),(138*S,122*S),(181*S,125*S),(207*S,137*S),(202*S,164*S),(146*S,170*S),(117*S,151*S)], fill='#e3bea0')
neck.alpha_composite(body)
body = neck
# Rebuild the small concealed belly region with PAP's warm dark coat and fur tips.
# Its lower boundary is curved; the old rectangular joint fill is not retained.
belly_hole=mask([(165,166),(204,166),(204,221),(168,225),(165,200)])
body=remove(body,belly_hole)
belly=blank();d=ImageDraw.Draw(belly)
d.polygon([(166*S,166*S),(195*S,167*S),(195*S,188*S),(192*S,201*S),(189*S,211*S),(182*S,217*S),(167*S,217*S)],fill='#382633')
d.polygon([(165*S,166*S),(194*S,164*S),(197*S,179*S),(191*S,178*S),(192*S,188*S),(185*S,183*S),(185*S,194*S),(178*S,188*S),(176*S,201*S),(169*S,195*S),(164*S,188*S)],fill='#d6ac8e')
d.polygon([(165*S,166*S),(190*S,163*S),(192*S,173*S),(183*S,170*S),(183*S,180*S),(175*S,176*S),(171*S,188*S),(168*S,181*S),(165*S,185*S)],fill='#f0d0ac')
d.polygon([(179*S,198*S),(185*S,195*S),(185*S,204*S),(179*S,213*S),(170*S,216*S),(167*S,205*S)],fill='#493040')
belly.putalpha(ImageChops.multiply(belly.getchannel('A'),belly_hole))
body.alpha_composite(belly)

# A small skin patch lets the original eyes close and follow a glance independently.
eye_specs = [
    {'points':[(106,97),(135,90),(141,119),(109,123)], 'box':(102,87,144,127), 'angle':-12},
    {'points':[(159,88),(190,80),(196,111),(162,120)], 'box':(155,77,199,124), 'angle':-10},
]
eyes = []
head_pixels = np.asarray(head).copy()
for spec in eye_specs:
    em = mask(spec['points'])
    eye = hi(base)
    eye.putalpha(ImageChops.multiply(eye.getchannel('A'), em))
    eyes.append(eye)
    x0,y0,x1,y1 = spec['box']
    corners = [(x0-2,y0+1),(x1+1,y0+1),(x0-2,y1+1),(x1+1,y1+1)]
    rgb = [np.asarray(base)[max(0,min(255,y)),max(0,min(255,x)),:3].astype(float) for x,y in corners]
    ys,xs = np.mgrid[y0*S:y1*S, x0*S:x1*S]
    u = (xs-x0*S)/((x1-x0)*S); v = (ys-y0*S)/((y1-y0)*S)
    color = rgb[0][None,None,:]*(1-u[...,None])*(1-v[...,None])+rgb[1][None,None,:]*u[...,None]*(1-v[...,None])+rgb[2][None,None,:]*(1-u[...,None])*v[...,None]+rgb[3][None,None,:]*u[...,None]*v[...,None]
    selection = np.asarray(em)[y0*S:y1*S,x0*S:x1*S] > 0
    region = head_pixels[y0*S:y1*S,x0*S:x1*S,:3]
    region[selection] = np.clip(color[selection],0,255).astype(np.uint8)
head_skin = Image.fromarray(head_pixels)

arm = hi(rig['arm'])
upper = part(rig['arm'], [(160,154),(211,154),(210,201),(162,201)])
lower = part(rig['arm'], [(163,192),(210,192),(210,222),(163,222)])
hand = part(rig['arm'], [(162,215),(203,215),(207,224),(203,235),(167,239),(160,229)])
ruff = hi(rig['ruff'])
tail = hi(rig['tail'])
ear_l, ear_r = hi(rig['ear-left']), hi(rig['ear-right'])

def ease(x):
    x = min(1., max(0., x))
    return x*x*x*(x*(x*6-15)+10)
def curve(t, points):
    if t <= points[0][0]: return points[0][1]
    for (a,x),(b,y) in zip(points,points[1:]):
        if t <= b: return x+(y-x)*ease((t-a)/(b-a))
    return points[-1][1]
def blink(t, center):
    return curve(t, [(center-.14,0),(center-.04,1),(center+.015,1),(center+.16,0)]) if center-.14<t<center+.16 else 0

def affine(im, anchor, target, angle=0, sx=1, sy=1):
    # Canvas coordinates, clockwise positive; destination target attaches a real joint.
    a = math.radians(angle); c,s = math.cos(a),math.sin(a)
    matrix = np.array([[c*sx,-s*sy],[s*sx,c*sy]])
    inv = np.linalg.inv(matrix)
    ax,ay = np.array(anchor)*S
    tx,ty = np.array(target)*S
    offset = np.array([ax,ay])-inv@np.array([tx,ty])
    coefficients = (inv[0,0],inv[0,1],offset[0],inv[1,0],inv[1,1],offset[1])
    return im.transform((N,N),Image.Transform.AFFINE,coefficients,Image.Resampling.BICUBIC)
def point(anchor, delta, angle):
    a=math.radians(angle);c,s=math.cos(a),math.sin(a)
    return (anchor[0]+delta[0]*c-delta[1]*s,anchor[1]+delta[0]*s+delta[1]*c)
wave_reference=Image.open(SOURCE/'pap-companion-v2.webp').convert('RGBA').crop((768,256,1024,512))
wave_paw=part(wave_reference,[(199,139),(198,128),(203,117),(218,108),(230,110),(241,116),(242,128),(236,143),(223,151),(210,147)])
wave_hand=affine(wave_paw,(213,145),(187,220),180,.82,.82)
def deform(im, displace):
    # Continuous mesh deformation creates curved tail follow-through and a moving chest.
    mesh=[]; step=32
    for y in range(0,N,step):
        for x in range(0,N,step):
            right,bottom=min(N,x+step),min(N,y+step)
            quad=[]
            for px,py in [(x,y),(x,bottom),(right,bottom),(right,y)]:
                dx,dy=displace(px/S,py/S)
                quad.extend((px-dx*S,py-dy*S))
            mesh.append(((x,y,right,bottom),tuple(quad)))
    return im.transform((N,N),Image.Transform.MESH,mesh,Image.Resampling.BICUBIC)

def params(state,t,duration):
    p={'lean':0.,'chest':0.,'dip':0.,'hx':0.,'hy':0.,'ha':0.,'ear_l':0.,'ear_r':0.,'tail':0.,'gaze_x':0.,'gaze_y':0.,'blink':0.,'upper':0.,'lower':0.,'wrist':0.,'palm':False,'turn':0.,'rootY':0.,'headScale':1.}
    envelope=math.sin(math.pi*min(1,t/duration))**2
    p['chest']=1.2*math.sin(2*math.pi*t/3.0)*envelope
    p['hy']=-.5*math.sin(2*math.pi*t/3.0)*envelope
    p['tail']=.7*math.sin(2*math.pi*t/4-.7)*envelope
    if state=='idle':
        p['blink']=blink(t,1.48)+blink(t,4.70)
        alert=curve(t,[(0,0),(2.2,0),(2.75,1),(3.55,1),(4.1,0),(duration,0)])
        p['hx']=1.4*alert;p['ha']=-1.2*alert;p['gaze_x']=1.3*alert
        p['ear_l']=curve(t,[(0,0),(2.35,0),(2.48,-5),(2.69,2),(2.91,-.5),(3.2,0),(duration,0)])
        p['ear_r']=curve(t,[(0,0),(2.57,0),(2.69,2.8),(3.0,-.8),(3.25,0),(duration,0)])
    elif state=='greeting':
        lift=curve(t,[(0,0),(.18,0),(.78,1),(1.84,1),(2.48,0),(duration,0)])
        prepare=curve(t,[(0,0),(.25,1),(.52,0),(duration,0)])
        settle=curve(t,[(0,0),(2.24,0),(2.57,1),(2.83,0),(duration,0)])
        p['dip']=2.5*prepare+.7*settle;p['lean']=-4.2*lift
        p['hx']=-1.7*lift;p['hy']=1.2*prepare-.7*lift;p['ha']=-4.5*lift
        p['upper']=-57*lift;p['lower']=-151*lift
        p['wrist']=curve(t,[(0,0),(.8,0),(.98,-12),(1.18,12),(1.38,-12),(1.60,10),(1.80,0),(duration,0)])
        p['turn']=curve(t,[(0,0),(.45,0),(.67,1),(2.08,1),(2.36,0),(duration,0)])
        p['palm']=p['turn']>.5
        p['tail']=curve(t,[(0,0),(.24,-1),(.78,3),(1.28,1),(1.78,2),(2.47,-2),(2.8,.5),(duration,0)])
        p['ear_r']=curve(t,[(0,0),(.40,0),(.70,-3),(.95,1),(1.30,0),(duration,0)])
        p['blink']=blink(t,2.66)
    elif state=='curious':
        interest=curve(t,[(0,0),(.28,0),(.86,1),(2.35,1),(3.12,0),(duration,0)])
        p['ha']=6.8*interest;p['hx']=2.8*interest;p['hy']=1.2*interest;p['lean']=1.2*interest
        p['gaze_x']=1.4*interest;p['gaze_y']=.8*interest
        p['ear_l']=-5*interest;p['ear_r']=2*interest
        p['tail']=2.2*math.sin(math.pi*t/duration)*interest
        p['blink']=blink(t,1.48)
    elif state=='thinking':
        think=curve(t,[(0,0),(.25,0),(.80,1),(1.95,1),(2.68,0),(duration,0)])
        p['ha']=-4.2*think;p['hx']=-1.4*think;p['hy']=-1.2*think
        p['gaze_x']=-1.2*think;p['gaze_y']=-1.25*think
        p['ear_r']=-2.8*think;p['ear_l']=1.2*think
        p['blink']=blink(t,2.27)
    elif state=='answer':
        nod=curve(t,[(0,0),(.42,0),(.74,1),(1.10,-.2),(1.37,0),(duration,0)])
        p['hy']=3.0*nod;p['ha']=1.4*nod;p['dip']=.7*nod
        p['blink']=blink(t,.78)
        p['ear_l']=curve(t,[(0,0),(1.18,0),(1.35,-2),(1.56,1),(1.8,0),(duration,0)])
        p['tail']=2*math.sin(2*math.pi*t/2.2)*envelope
    elif state=='hop':
        p['dip']=curve(t,[(0,0),(.24,7),(.38,0),(.79,0),(.92,8),(1.11,-1.4),(1.31,1),(1.5,0),(1.65,0)])
        p['rootY']=curve(t,[(0,0),(.33,0),(.54,-20),(.70,-12),(.82,0),(1.65,0)])
        p['hy']=curve(t,[(0,0),(.24,1.2),(.40,-3),(.68,-1),(.94,2.8),(1.14,-.9),(1.45,0),(1.65,0)])
        p['headScale']=1+curve(t,[(0,0),(.26,-.012),(.52,.012),(.86,-.01),(1.2,0),(1.65,0)])
        p['ear_l']=curve(t,[(0,0),(.28,-3),(.48,5),(.72,-2),(.95,5),(1.18,-1.8),(1.44,0),(1.65,0)])
        p['ear_r']=curve(t,[(0,0),(.30,2),(.52,-4),(.79,2),(1.02,-3),(1.28,1),(1.52,0),(1.65,0)])
        p['tail']=curve(t,[(0,0),(.28,-3),(.60,3),(.85,-2),(1.02,3),(1.32,-1),(1.65,0)])
        p['blink']=blink(t,1.2)
    return p

def render(p):
    canvas=blank()
    def body_field(x,y):
        weight=min(1,max(0,(215-y)/75))
        bulge=math.sin(math.pi*min(1,max(0,(y-139)/76)))
        return p['lean']*weight + p['chest']*(x-162)/40*bulge, p['dip']*weight-p['chest']*.7*bulge
    def tail_field(x,y):
        weight=min(1,max(0,(108-x)/98))**1.15
        return p['tail']*.65*weight, p['tail']*weight*1.6
    canvas.alpha_composite(deform(tail,tail_field))
    canvas.alpha_composite(deform(body,body_field))
    # Two-segment arm with a separately turning hand, rooted in the moving chest.
    shoulder=(185+body_field(185,166)[0],166+body_field(185,166)[1])
    # Solve the planted hand before mixing into the greeting's lifted pose.
    end=np.array([187.,220.]);delta=end-np.array(shoulder);actual=np.linalg.norm(delta)
    u,l=math.hypot(3,31),math.hypot(-1,23);stretch=max(1,actual/(u+l-.00001));u*=stretch;l*=stretch
    angle=math.atan2(delta[1],delta[0])-math.acos(np.clip((u*u+actual*actual-l*l)/(2*u*actual),-1,1))
    ik_elbow=np.array(shoulder)+u*np.array([math.cos(angle),math.sin(angle)])
    lower_angle=math.atan2(end[1]-ik_elbow[1],end[0]-ik_elbow[0])
    lift=-p['upper']/57;upper_angle=(1-lift)*(math.degrees(angle)-math.degrees(math.atan2(31,3)))+lift*(-57)
    lower_angle=(1-lift)*(math.degrees(lower_angle)-math.degrees(math.atan2(23,-1)))+lift*(-151)
    bone_scale=stretch+(1-stretch)*lift
    elbow=point(shoulder,(3*bone_scale,31*bone_scale),upper_angle)
    wrist=point(elbow,(-bone_scale,23*bone_scale),lower_angle)
    canvas.alpha_composite(affine(upper,(185,166),shoulder,upper_angle,bone_scale,bone_scale))
    if abs(p['upper'])>1:
        joint=blank();jd=ImageDraw.Draw(joint)
        ex,ey=elbow
        jd.ellipse(((ex-7)*S,(ey-7)*S,(ex+7)*S,(ey+7)*S),fill='#352330')
        canvas.alpha_composite(joint)
    canvas.alpha_composite(affine(lower,(188,197),elbow,lower_angle,bone_scale,bone_scale))
    palm_width=max(.15,abs(1-2*p['turn']))
    canvas.alpha_composite(affine(wave_hand if p['palm'] else hand,(187,220),wrist,lower_angle+p['wrist'],palm_width,1))
    canvas.alpha_composite(deform(ruff,body_field))
    animated_head=head_skin.copy()
    for i,(eye,spec) in enumerate(zip(eyes,eye_specs)):
        x0,y0,x1,y1=spec['box']; center=((x0+x1)/2,(y0+y1)/2)
        closure=min(1,p['blink']); vertical=max(.07,1-closure)
        ey=affine(eye,center,(center[0]+p['gaze_x'],center[1]+p['gaze_y']+closure*2),0,1,vertical)
        animated_head.alpha_composite(ey)
    # Ears follow head motion but settle at different times.
    ears=blank()
    ears.alpha_composite(affine(ear_l,(101,70),(101,70),p['ear_l']))
    ears.alpha_composite(affine(ear_r,(191,67),(191,67),p['ear_r']))
    # Original head skin already includes the small hidden ear attachment underpainting.
    ears.alpha_composite(animated_head)
    hx,hy=body_field(162,140)
    canvas.alpha_composite(affine(ears,(162,139),(162+hx+p['hx'],139+hy+p['hy']),p['ha'],p['headScale'],p['headScale']))
    # Keep a 16 px transparent margin: exports never clip ear, tail or lifted hand.
    result=Image.new('RGBA',(SIZE,SIZE))
    result.alpha_composite(canvas.resize((256,256),Image.Resampling.LANCZOS),(32,round(32+p['rootY'])))
    return result

def preview_frame(im):
    canvas=Image.new('RGBA',(SIZE,SIZE),(22,17,29,255))
    shadow=Image.new('RGBA',(SIZE,SIZE));d=ImageDraw.Draw(shadow)
    d.ellipse((90,249,250,270),fill=(0,0,0,105))
    shadow=shadow.filter(ImageFilter.GaussianBlur(5))
    canvas.alpha_composite(shadow);canvas.alpha_composite(im)
    return canvas.convert('RGB')

# Export editable character pieces for continuous browser animation, not an atlas loop.
assets=OUT/'assets';assets.mkdir(exist_ok=True)
layers={'body':body,'head':head_skin,'eye-left':eyes[0],'eye-right':eyes[1],
        'tail':tail,'ear-left':ear_l,'ear-right':ear_r,'upper-arm':upper,
        'forearm':lower,'hand':hand,'palm':wave_hand,'ruff':ruff}
manifest={'version':'4.0-preview','kind':'continuous-2d-rig','sourceCanvas':[256,256],
          'textureCanvas':[N,N],'outputCanvas':[320,320],'offset':[32,32],
          'targetFps':30,'layers':{},'sourceHashes':{},'shadowSeparate':True}
for name,im in layers.items():
    pixels=np.asarray(im).copy();pixels[pixels[:,:,3]<3]=0
    im=Image.fromarray(pixels)
    path=assets/f'pap-{name}.webp';im.save(path,quality=92,method=6)
    manifest['layers'][name]={'file':f'assets/{path.name}','bytes':path.stat().st_size,
                              'sha256':hashlib.sha256(path.read_bytes()).hexdigest()}
    if name in ('body','tail','ruff'):
        alpha=im.getchannel('A');cells=[]
        for y in range(0,256,32):
            for x in range(0,256,32):
                if alpha.crop((x*S,y*S,(x+32)*S,(y+32)*S)).getbbox():cells.append([x,y,32,32])
        manifest['layers'][name]['meshCells']=cells
for path in [SOURCE/'pap-companion-v2.webp',*sorted((SOURCE/'rig').glob('*.webp'))]:
    manifest['sourceHashes'][path.name]=hashlib.sha256(path.read_bytes()).hexdigest()
(OUT/'rig.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
base.save(OUT/'pap-reference.png')
print(json.dumps({'layers':len(layers),'textureBytes':sum(v['bytes'] for v in manifest['layers'].values()),'canvas':[320,320]}))
if args.quick:raise SystemExit(0)

clips={};qa=[]
for state,duration in [('greeting',3.),('hop',1.65)]:
    count=round(duration*FPS)
    frames=[render(params(state,duration*i/(count-1),duration)) for i in range(count)]
    frames[0].save(OUT/f'pap-{state}.webp',save_all=True,append_images=frames[1:],duration=1000/FPS,loop=0,quality=87,method=4)
    if state=='hop':frames[0].save(OUT/'pap-hop.png',save_all=True,append_images=frames[1:],duration=1000/FPS,loop=0,blend=0,disposal=0)
    bounds=[im.getchannel('A').getbbox() for im in frames]
    assert all(b and min(b[0],b[1])>5 and b[2]<SIZE-5 and b[3]<SIZE-5 for b in bounds)
    assert frames[0].tobytes()==frames[-1].tobytes()
    qa.append({'state':state,'frames':count,'transparent':all(im.getpixel((0,0))[3]==0 for im in frames),'unclipped':True,'neutralSeam':True})
    clips[state]=frames
    print(state,count,flush=True)
demo=clips['greeting']+clips['hop']
preview=[]
for im in demo:
    bg=Image.new('RGBA',(SIZE,SIZE),(23,17,30,255));sh=Image.new('RGBA',(SIZE,SIZE));ImageDraw.Draw(sh).ellipse((130,260,270,279),fill=(0,0,0,95));bg.alpha_composite(sh.filter(ImageFilter.GaussianBlur(5)));bg.alpha_composite(im)
    preview.append(bg.convert('RGB').quantize(colors=192,method=Image.Quantize.MEDIANCUT))
preview[0].save(OUT/'pap-winkt-und-hopst.gif',save_all=True,append_images=preview[1:],duration=[40 if i%3==2 else 30 for i in range(len(preview))],loop=0,optimize=False,disposal=2)
board=Image.new('RGB',(SIZE*5,SIZE*2),(23,17,30))
poses=[('greeting',0),('greeting',.25),('greeting',.8),('greeting',1.2),('greeting',2.5),('hop',0),('hop',.24),('hop',.54),('hop',.92),('hop',1.65)]
for i,(state,t) in enumerate(poses):
    im=render(params(state,t,3 if state=='greeting' else 1.65));x,y=i%5*SIZE,i//5*SIZE
    board.paste(im,(x,y),im);ImageDraw.Draw(board).text((x+10,y+10),f'{state} / {t}',fill='white')
board.save(OUT/'posen-pruefung.png')
(OUT/'export-qa.json').write_text(json.dumps({'states':qa,'fps':FPS,'textureBytes':sum(v['bytes'] for v in manifest['layers'].values())},indent=2),encoding='utf-8')
