from pathlib import Path
import hashlib,json,zipfile
base=Path(__file__).resolve().parents[3].parents[1] if Path(__file__).parent.name=='tools' else Path(__file__).resolve().parent.parent
out=base/'outputs/PAP-Chibi-Chatbot-2026-10-09'
qa=json.loads((out/'asset-qa.json').read_text())
source=Path(qa['source'])
manifest=json.loads((source/'animations.json').read_text(encoding='utf-8-sig'))
clips={**manifest['animations'],**manifest['transitions']}
archive=Path('C:/Users/licht/Documents/Codex/2026-10-02/erstelle-jetzt-eine-tats-chlich-ausf-2/outputs/PAP_Desktop_Companion_Chibi_v1.2.0_Quellcode.zip')
with zipfile.ZipFile(archive) as z:
    matches=[n for n in z.namelist() if n.endswith('Assets/animations.json')]
    assert len(matches)==1,matches
    prefix=matches[0][:-len('animations.json')]
    assert hashlib.sha256(z.read(matches[0])).hexdigest()==qa['sourceManifestSha256']
    total=0
    for row in qa['rows']:
        digest=hashlib.sha256()
        for frame in clips[row['clip']]['frames']:
            digest.update(hashlib.sha256(z.read(prefix+frame)).digest());total+=1
        assert digest.hexdigest()==row['sourceSequenceSha256'],row['clip']
result={'archive':str(archive),'selectedFramesMatchDeliveredSourceZip':True,'frames':total,'manifestMatch':True}
(out/'delivered-source-match.json').write_text(json.dumps(result,indent=2),encoding='utf-8')
public=base/'work/emberstone-chatbot/papsmp-website/public'
before=json.loads((out/'public-before.json').read_text())
after={p.relative_to(public).as_posix():hashlib.sha256(p.read_bytes()).hexdigest() for p in public.rglob('*') if p.is_file()}
assert before==after,'protected public file changed'
(out/'public-preserved.json').write_text(json.dumps({'count':len(before),'allMatch':True,'changed':[]},indent=2),encoding='utf-8')
(out/'backup-sha256.json').write_text(json.dumps({'chatbot-before.zip':hashlib.sha256((out/'chatbot-before.zip').read_bytes()).hexdigest()},indent=2),encoding='utf-8')
print(json.dumps({**result,'protectedPublicFiles':len(before)}))
