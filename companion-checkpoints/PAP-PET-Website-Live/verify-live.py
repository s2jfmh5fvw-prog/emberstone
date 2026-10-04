from pathlib import Path
from urllib.request import Request,urlopen
from concurrent.futures import ThreadPoolExecutor
import hashlib,json,re,sys,time

base=Path(__file__).resolve().parent
repo=base.parent.parent if base.parent.name=='companion-checkpoints' else base.parent.parent/'work/emberstone-chatbot'
dist=repo/'papsmp-website/dist'
domain='https://papsmp.de'
def fetch(path):
    for attempt in range(3):
        try:
            with urlopen(Request(domain+path,headers={'User-Agent':'PAP-release-verification','Cache-Control':'no-cache'}),timeout=50) as r:
                return r.status,r.read(),dict(r.headers)
        except (TimeoutError,OSError):
            if attempt==2: raise
            time.sleep(attempt+1)
def compare(path,local):
    status,data,_=fetch(path)
    expected=local.read_bytes()
    result={'path':path,'status':status,'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest(),'matchesBuild':data==expected}
    if data!=expected and path in ['/kontakt/','/impressum/','/datenschutz/']:
        def email(code):
            raw=bytes.fromhex(code)
            return bytes(b^raw[0] for b in raw[1:]).decode()
        text=data.decode()
        text=re.sub(r'href="/cdn-cgi/l/email-protection#([0-9a-f]+)"',lambda m:'href="mailto:'+email(m[1])+'"',text)
        text=re.sub(r'<span class="__cf_email__" data-cfemail="([0-9a-f]+)">\[email&#160;protected\]</span>',lambda m:email(m[1]),text)
        text=re.sub(r'<script data-cfasync="false" src="/cdn-cgi/scripts/[^"/]+/cloudflare-static/email-decode.min.js"></script>','',text)
        result['emailProtectionNormalizedMatch']=text.encode()==expected
    assert status==200 and (data==expected or result.get('emailProtectionNormalizedMatch')),result
    return result
status,html,headers=fetch('/')
(base/'live-index.html').write_bytes(html)
assert status==200 and html== (dist/'index.html').read_bytes(),'Live HTML is not the final build yet'
paths={'/':dist/'index.html'}
for path in re.findall(r'(?:src|href)="(/_astro/[^"?]+)"',html.decode()):
    if path.endswith(('.js','.css')): paths[path]=dist/path.lstrip('/')
for local in (dist/'_astro').glob('*.webp'): paths['/_astro/'+local.name]=local
for local in (dist/'_astro').glob('poster.*.png'): paths['/_astro/'+local.name]=local
for path in ['/kontakt/','/impressum/','/datenschutz/']: paths[path]=dist/path.strip('/')/'index.html'
for name in ['PAP-SMP-Full-Java-3.2.8-MC-1.21.11.zip','PAP-SMP-Bedrock-3.2.8-Alpha.mcpack','PAP-SMP-Geyser-Overlay-3.2.8.zip']:
    paths['/downloads/'+name]=dist/'downloads'/name
with ThreadPoolExecutor(max_workers=4) as pool:
    checks=list(pool.map(lambda pair:compare(*pair),paths.items()))
proof={'domain':domain,'commit':sys.argv[1] if len(sys.argv)>1 else 'c407b0a040dab246b103d732b332686a39e8d59a','allMatch':True,'checks':checks,'server':headers.get('Server')}
(base/'live-http-check.json').write_text(json.dumps(proof,indent=2),encoding='utf-8')
print(json.dumps({'allMatch':True,'checks':len(checks),'downloadBytes':sum(x['bytes'] for x in checks if x['path'].startswith('/downloads/'))}))

