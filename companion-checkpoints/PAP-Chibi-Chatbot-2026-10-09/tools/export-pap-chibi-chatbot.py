"""Pack approved Desktop Chibi frames unchanged into lossless browser atlas pages."""
from pathlib import Path
from PIL import Image
import hashlib, json, re, shutil

base=Path(__file__).resolve().parents[3].parents[1] if Path(__file__).parent.name=='tools' else Path(__file__).resolve().parent.parent
repo=base/'work/emberstone-chatbot'
source=Path('C:/Users/licht/Documents/Codex/2026-10-02/ich-will-eine-windows-applikation-exe/work/src-chibi-v1.2.0/Assets')
out=repo/'papsmp-website/src/assets/chatbot/pet-chibi-v12'
proof=base/'outputs/PAP-Chibi-Chatbot-2026-10-09'
out.mkdir(parents=True,exist_ok=True)
manifest=json.loads((source/'animations.json').read_text(encoding='utf-8-sig'))
old=json.loads((repo/'papsmp-website/src/assets/chatbot/pet-v09/manifest.json').read_text())
clips={**manifest['animations'],**manifest['transitions']}
selected=set(old['clips'])|{'listen_left','listen_right','idle_to_listen_left','idle_to_listen_right','sit_to_listen_left','sit_to_listen_right'}
selected.update(n for n in clips if re.fullmatch(r'(walk\d+_to_listen|listen\d+_to_idle)_(left|right)',n))
assert selected<=clips.keys(),selected-clips.keys()
assert manifest['canvas']=={'width':224,'height':150,'pawBaseline':150}
rig={'width':224,'height':150,'columns':8,'pageFrames':32,'sourceVersion':'PAP Desktop Chibi 1.2.0','clips':{}}
rows=[];frames=0;pages=0
for name in sorted(selected):
    clip=clips[name];paths=clip['frames'];files=[];sequenceHash=hashlib.sha256();nonempty=0
    for start in range(0,len(paths),32):
        atlas=Image.new('RGBA',(1792,600));batch=[]
        for i,rel in enumerate(paths[start:start+32]):
            original=Image.open(source/rel).convert('RGBA')
            assert original.size==(224,150),(name,rel,original.size)
            assert original.getchannel('A').getbbox(),(name,rel,'empty')
            batch.append(original);sequenceHash.update(hashlib.sha256((source/rel).read_bytes()).digest());nonempty+=1
            atlas.paste(original,((i%8)*224,(i//8)*150))
        file=f'{name}-{start//32}.webp';atlas.save(out/file,lossless=True,method=3,exact=True)
        decoded=Image.open(out/file).convert('RGBA')
        for i,original in enumerate(batch):
            crop=decoded.crop(((i%8)*224,(i//8)*150,(i%8+1)*224,(i//8+1)*150))
            # Invisible RGB can be discarded by an encoder; visible RGBA must be exact.
            assert crop.tobytes()==original.tobytes(),(name,start+i,'pixel mismatch')
        files.append(file);pages+=1
    rig['clips'][name]={'fps':clip['fps'],'loop':clip['loop'],'count':len(paths),'pages':files}
    frames+=len(paths);rows.append({'clip':name,'frames':len(paths),'sourceSequenceSha256':sequenceHash.hexdigest(),'pixelsMatch':True,'nonempty':nonempty})
    if len(rows)%30==0: print(f'{len(rows)}/{len(selected)} clips verified',flush=True)
(out/'manifest.json').write_text(json.dumps(rig,separators=(',',':')),encoding='utf-8')
Image.open(source/manifest['animations']['idle_left']['frames'][0]).save(out/'poster.png')
shutil.copyfile(source.parent/'LIZENZHINWEISE.md',out/'LIZENZHINWEISE.md')
result={'sourceThread':'codex://threads/01a0fc0e-018f-71b1-97bb-ac3a0b772a25','source':str(source),'sourceManifestSha256':hashlib.sha256((source/'animations.json').read_bytes()).hexdigest(),'sourceChibi':manifest['chibi'],'clips':len(rows),'frames':frames,'pages':pages,'allPixelsMatch':True,'bytes':sum(p.stat().st_size for p in out.glob('*.webp')),'firstIdlePageBytes':(out/'idle_left-0.webp').stat().st_size,'rows':rows}
(out/'SOURCE-QA.json').write_text(json.dumps(result,indent=2),encoding='utf-8')
(proof/'asset-qa.json').write_text(json.dumps(result,indent=2),encoding='utf-8')
public=repo/'papsmp-website/public'
(proof/'public-before.json').write_text(json.dumps({p.relative_to(public).as_posix():hashlib.sha256(p.read_bytes()).hexdigest() for p in public.rglob('*') if p.is_file()},indent=2),encoding='utf-8')
print(json.dumps({k:result[k] for k in ['clips','frames','pages','allPixelsMatch','bytes','firstIdlePageBytes']}),flush=True)
