from pathlib import Path
from urllib.request import Request,urlopen
from urllib.error import HTTPError
from concurrent.futures import ThreadPoolExecutor
import hashlib,json,re,sys,time,socket
base=Path(__file__).resolve().parent
repo=base.parent.parent if base.parent.name=='companion-checkpoints' else base.parent.parent/'work/emberstone-chatbot'
dist=repo/'papsmp-website/dist'
commit=sys.argv[1]
domain='https://papsmp.de'
# Optional per-process DNS fallback from a fresh Windows Resolve-DnsName result.
# URL hostname, Host header, SNI and certificate validation remain unchanged.
dns_file=base/'dns-addresses.json'
if dns_file.exists():
    addresses=json.loads(dns_file.read_text(encoding='utf-8-sig'))
    original_getaddrinfo=socket.getaddrinfo
    def resolved_getaddrinfo(host,port,*args,**kwargs):
        if host in addresses:
            return original_getaddrinfo(addresses[host][0],port,*args,**kwargs)
        return original_getaddrinfo(host,port,*args,**kwargs)
    socket.getaddrinfo=resolved_getaddrinfo
def fetch(url):
    for attempt in range(3):
        try:
            with urlopen(Request(url,headers={'User-Agent':'PAP-release-verification','Cache-Control':'no-cache'}),timeout=40) as r:
                return r.status,r.read(),dict(r.headers)
        except (OSError,TimeoutError):
            if attempt==2: raise
            time.sleep(attempt+1)
status,html,headers=fetch(domain+'/')
if html!=(dist/'index.html').read_bytes():
    print('Cloudflare still serves previous production HTML; retry after deployment.',flush=True)
    sys.exit(2)
assert status==200 and b'data-renderer="pet-chibi-v12"' in html
(base/'live-index.html').write_bytes(html)
def compare(pair):
    path,local=pair
    status,data,_=fetch(domain+path);expected=local.read_bytes()
    row={'path':path,'status':status,'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest(),'matchesBuild':data==expected}
    if data!=expected and path in ['/kontakt/','/impressum/','/datenschutz/']:
        def email(code):
            raw=bytes.fromhex(code);return bytes(b^raw[0] for b in raw[1:]).decode()
        text=data.decode()
        text=re.sub(r'href="/cdn-cgi/l/email-protection#([0-9a-f]+)"',lambda m:'href="mailto:'+email(m[1])+'"',text)
        text=re.sub(r'<span class="__cf_email__" data-cfemail="([0-9a-f]+)">\[email&#160;protected\]</span>',lambda m:email(m[1]),text)
        text=re.sub(r'<script data-cfasync="false" src="/cdn-cgi/scripts/[^"/]+/cloudflare-static/email-decode.min.js"></script>','',text)
        row['emailProtectionNormalizedMatch']=text.encode()==expected
    assert status==200 and (row['matchesBuild'] or row.get('emailProtectionNormalizedMatch')),row
    return row
paths={'/':dist/'index.html'}
for path in re.findall(r'(?:src|href)="(/_astro/[^"?]+)"',html.decode()):
    if path.endswith(('.js','.css','.png')):paths[path]=dist/path.lstrip('/')
for local in (dist/'_astro').glob('*.webp'):paths['/_astro/'+local.name]=local
for path in ['/kontakt/','/impressum/','/datenschutz/']:paths[path]=dist/path.strip('/')/'index.html'
pack_source=(repo/'papsmp-website/src/data/pack-release.ts').read_text(encoding='utf-8-sig')
revision=re.search(r"revision:\s*['\"]([^'\"]+)['\"]",pack_source)[1]
for local in (dist/'downloads').glob('*'+revision+'*'):paths['/downloads/'+local.name]=local
with ThreadPoolExecutor(max_workers=4) as pool:checks=list(pool.map(compare,paths.items()))
proof={'domain':domain,'commit':commit,'allMatch':True,'checks':checks,'server':headers.get('Server')}
(base/'live-http-check.json').write_text(json.dumps(proof,indent=2),encoding='utf-8')
print(json.dumps({'allMatch':True,'checks':len(checks),'downloadBytes':sum(x['bytes'] for x in checks if x['path'].startswith('/downloads/'))}),flush=True)
try:
    _,data,_=fetch(f'https://api.github.com/repos/s2jfmh5fvw-prog/emberstone/commits/{commit}/check-runs')
    runs=json.loads(data)
    selected=[{k:r.get(k) for k in ['name','head_sha','status','conclusion','details_url','completed_at']} for r in runs.get('check_runs',[]) if 'Cloudflare' in r.get('name','')]
    (base/'cloudflare-deployment.json').write_text(json.dumps(selected,indent=2),encoding='utf-8')
    print(json.dumps({'cloudflareChecks':selected}),flush=True)
except (HTTPError,OSError) as error:
    print('GitHub deployment metadata unavailable; exact production HTTP comparison is saved.',flush=True)
