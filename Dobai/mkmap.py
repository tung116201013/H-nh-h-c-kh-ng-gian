#!/usr/bin/env python3
"""Sinh MỤC LỤC (bản đồ mã) cho index.html / cfsync.js / api-worker.js.
Chạy: python3 mkmap.py index.html cfsync.js api-worker.js > CODEMAP.md
Số dòng đổi sau mỗi lần sửa -> chạy lại; hoặc tìm theo TÊN hàm bằng grep -n "function TEN"."""
import re, sys, os
def blocks(L):
    out=[]; i=0
    while i<len(L):
        m=re.match(r'\s*<(script|style)\b([^>]*)>',L[i])
        if m:
            kind=m.group(1); attrs=m.group(2); idm=re.search(r'id="([^"]+)"',attrs); src=re.search(r'src="([^"]+)"',attrs)
            tm=re.search(r'type="([^"]+)"',attrs)
            j=i
            if '</%s>'%kind not in L[i]:
                j=i+1
                while j<len(L) and '</%s>'%kind not in L[j]: j+=1
            out.append(dict(kind=kind,id=idm.group(1) if idm else '',src=src.group(1) if src else '',type=tm.group(1) if tm else '',a=i+1,b=j+1,size=sum(len(x)+1 for x in L[i:j+1])))
            i=j+1
        else: i+=1
    return out
def jsindex(L,a,b):
    fn=[];sec=[]
    for k in range(a-1,b):
        l=L[k]
        if len(l)>600: continue
        m=re.match(r'\s{0,2}(?:async\s+)?function\s+([\w$]+)',l)
        if m and (l.startswith('function') or l.startswith('async function') or l.startswith('  function') or l.startswith('  async function')):
            fn.append((k+1,m.group(1)))
        m=re.match(r'(?:const|let|var)\s+([A-Z][\w$]*)\s*=\s*(?:\(\(\)|\(function|function|\{|\[|new\s)',l)
        if m: fn.append((k+1,m.group(1)+(' (module/đối tượng)')))
        m=re.match(r'\s*/\*\s*-{3,}\s*(.+?)\s*-*\s*\*?/?\s*$',l) or re.match(r'\s*/\*\s*-{2,}\s*(.+?)\s*-{2,}\s*\*/',l)
        if m: sec.append((k+1,m.group(1)[:100]))
    return fn,sec
def cssindex(L,a,b):
    return [(k+1,re.sub(r'\s*\*/.*','',re.sub(r'^\s*/\*\s*-*\s*','',L[k]))[:90]) for k in range(a-1,b) if re.match(r'\s*/\*',L[k]) and len(L[k])<200]
def main():
    for p in sys.argv[1:]:
        L=open(p,encoding='utf-8').read().split('\n'); name=os.path.basename(p)
        print('\n# %s  (%d dòng, %.1f KB)\n'%(name,len(L),sum(len(x)+1 for x in L)/1024))
        if name.endswith('.html'):
            print('## Các khối <script>/<style> (theo thứ tự trong file)\n\n| dòng | loại | id | kích thước |\n|---|---|---|---|')
            B=blocks(L)
            for b in B: print('| %d–%d | %s | %s | %s |'%(b['a'],b['b'],b['kind']+(' src='+b['src'] if b['src'] else '')+(' ['+b['type']+']' if b['type'] else ''),b['id'] or '(không id)','%.0f KB'%(b['size']/1024) if b['size']>2048 else '%d B'%b['size']))
            for b in B:
                if b['kind']=='script' and not b['src'] and not b['type'] :
                    fn,sec=jsindex(L,b['a'],b['b'])
                    print('\n## Script %s dòng %d–%d\n'%(b['id'] or '(chính, không id)',b['a'],b['b']))
                    if sec: print('**Mục (comment tiêu đề):**\n'); [print('- %d  %s'%x) for x in sec]
                    if fn: print('\n**Hàm / đối tượng cấp cao:**\n'); print(', '.join('`%s`:%d'%(n,ln) for ln,n in fn))
                elif b['kind']=='style' and b['size']>1500:
                    c=cssindex(L,b['a'],b['b'])
                    if c: print('\n## CSS %s dòng %d–%d\n'%(b['id'] or '(chính)',b['a'],b['b'])); [print('- %d  %s'%x) for x in c[:60]]
        else:
            fn,sec=jsindex(L,1,len(L))
            if sec: [print('- %d  %s'%x) for x in sec]
            print('\n**Hàm:** '+', '.join('`%s`:%d'%(n,ln) for ln,n in fn))
            ro=[(i+1,l.strip()[:90]) for i,l in enumerate(L) if re.search(r"(?:\.get|\.post|path\s*===|pathname\s*===|\bif \(p ===|url\.pathname)",l) and ("'/" in l or '"/' in l)][:40]
            if ro: print('\n**Các đường dẫn / route:**\n'); [print('- %d  `%s`'%x) for x in ro]
main()
