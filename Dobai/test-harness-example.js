const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const br=await chromium.launch();const p=await br.newPage({viewport:{width:400,height:800}});
const lib=fs.readFileSync('/opt/npm-tools/node_modules/pdf-lib/dist/pdf-lib.min.js','utf8');
await p.route(/^https?:/,r=>{const u=r.request().url();if(/pdf-lib@1\.17\.1/.test(u))return r.fulfill({contentType:'application/javascript',body:lib});r.abort()});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///tmp/claude-0/a0/work_a2a.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
const R=await p.evaluate(async()=>{
 const T=id=>TL.list().find(x=>x.id===id);const o={};
 o.ids=TL.list().filter(x=>x.group==='PDF').map(x=>x.id);
 const P=await TL.lib('pdf-lib');
 const mk=async(n)=>{const d=await P.PDFDocument.create();for(let i=0;i<n;i++){const pg=d.addPage([300+i,400]);pg.drawText('Trang '+(i+1),{x:20,y:200})}return new File([await d.save()],'m.pdf',{type:'application/pdf'})};
 const pdf=await mk(12);
 const cnt=async b=>(await P.PDFDocument.load(await b.arrayBuffer())).getPageCount();
 const err=async fn=>{try{await fn();return 'NO ERROR'}catch(e){return e.code||e.message}};
 let r=await T('tach-pdf').run([pdf],{mode:'keep',range:'1,3-5'},()=>{});o.keep=await cnt(r.files[0].blob);
 r=await T('tach-pdf').run([pdf],{mode:'each',range:'all'},()=>{});const JS=await TL.lib('jszip');const z=await JS.loadAsync(await r.files[0].blob.arrayBuffer());o.eachZip=Object.keys(z.files).length;
 r=await T('xoa-trang-pdf').run([pdf],{range:'2,4-6'},()=>{});o.del=await cnt(r.files[0].blob);
 o.delAll=await err(()=>T('xoa-trang-pdf').run([pdf],{range:'1-12'},()=>{}));
 r=await T('xoay-pdf').run([pdf],{angle:'90',range:'1,3-5'},()=>{});let d=await P.PDFDocument.load(await r.files[0].blob.arrayBuffer());o.rot=[0,1,2,3,4,5].map(i=>d.getPage(i).getRotation().angle);
 r=await T('xoay-pdf').run([await new File([await r.files[0].blob.arrayBuffer()],'r.pdf')],{angle:'270',range:'all'},()=>{});d=await P.PDFDocument.load(await r.files[0].blob.arrayBuffer());o.rot2=[0,1,2,3,4,5].map(i=>d.getPage(i).getRotation().angle);
 o.bad={};for(const s of ['5-3','0','99','','abc']){o.bad[s||'(rong)']=await err(()=>T('tach-pdf').run([pdf],{mode:'keep',range:s},()=>{}))}
 // ảnh → pdf
 const mkimg=async(w,h,type)=>{const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');x.fillStyle='#c33';x.fillRect(0,0,w,h);return new File([await new Promise(r=>c.toBlob(r,type))],'i'+w+'x'+h+(type==='image/png'?'.png':'.jpg'),{type})};
 const imgs=[await mkimg(800,400,'image/jpeg'),await mkimg(400,800,'image/png'),new File(['not an image'],'bad.jpg',{type:'image/jpeg'})];
 r=await T('anh-sang-pdf').run(imgs,{margin:'10',fit:'contain'},()=>{});d=await P.PDFDocument.load(await r.files[0].blob.arrayBuffer());
 o.img={pages:d.getPageCount(),size:[0,1].map(i=>{const s=d.getPage(i).getSize();return Math.round(s.width)+'x'+Math.round(s.height)}),notes:r.notes};
 // mật khẩu: giả lập PDF mã hóa tối thiểu
 const enc=new File([new TextEncoder().encode('%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids[]/Count 0>>endobj\ntrailer<</Root 1 0 R/Encrypt 3 0 R>>\n%%EOF')],'e.pdf');
 o.enc=await err(()=>T('tach-pdf').run([enc],{mode:'keep',range:'1'},()=>{}));
 return o});
console.log(JSON.stringify(R));
// UI picker
await p.evaluate(()=>TL.open('tach-pdf'));
const buf=await p.evaluate(async()=>{const P=await TL.lib('pdf-lib');const d=await P.PDFDocument.create();for(let i=0;i<5;i++)d.addPage([200,300]);return Array.from(await d.save())});
await p.setInputFiles('#tl-filein',[{name:'x.pdf',mimeType:'application/pdf',buffer:Buffer.from(buf)}]);await p.waitForTimeout(800);
console.log('grid btns',await p.locator('.pf-pg').count(),'info',await p.locator('#pf-pinfo').innerText());
await p.locator('.pf-mini[data-pf-all="0"]').click();await p.locator('.pf-pg[data-p="1"]').click();await p.locator('.pf-pg[data-p="3"]').click();
console.log('range',await p.inputValue('#pf-range-in'),'pnote',await p.locator('#pf-pnote').innerText());
await p.fill('#pf-range-in','2-4');console.log('on after type',await p.locator('.pf-pg.on').count());
console.log('scrollW',await p.evaluate(()=>document.documentElement.scrollWidth+'/'+document.documentElement.clientWidth));
await p.evaluate(()=>TL.close());await p.waitForTimeout(200);
console.log('errors',JSON.stringify(errs));await br.close()})();
