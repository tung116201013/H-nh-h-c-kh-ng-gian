// TRÍCH từ index.html (script chính, dòng 3274-3300 và 3451-3790): cơ chế preview/screenshot/tự kiểm tra có sẵn — Hydrogen chỉ ĐỌC để biết cách dùng, KHÔNG viết lại
  const GUIDE = "CÔNG CỤ ĐIỀU KHIỂN TỆP (web chạy giúp bạn rồi gửi kết quả về trong tin nhắn bắt đầu bằng \"[Kết quả công cụ]\"). Danh sách tệp hiện có và bản mới nhất của chúng nằm ở cuối hướng dẫn này.\n1) SỬA TỆP ĐÃ CÓ bằng khối patch (không gửi lại cả tệp):\n```patch:ten-tep.duoi\n<<<<<<< SEARCH\nđoạn nguyên văn cần thay (chép đúng từng ký tự, 1–6 dòng, chỉ khớp một chỗ trong tệp)\n=======\nđoạn mới\n>>>>>>> REPLACE\n```\nMột khối có thể có nhiều cặp SEARCH/REPLACE; tất cả phải khớp thì web mới áp dụng (kiểu tất cả-hoặc-không). Thêm
  const MODES = { off: ['Tắt', 'Không gửi hướng dẫn công cụ tệp, không tự kiểm tra.'], err: ['Tự kiểm tra lỗi', 'Dựng thử tệp thật; có lỗi nặng thì tự báo AI sửa (tối đa 3 vòng).'], vis: ['Kiểm tra + tự chụp ảnh', 'Như "Tự kiểm tra lỗi", và web tự chụp trang HTML/SVG, xuất thử ảnh rồi gửi cho AI xem; AI sửa nếu thấy lỗi rồi mới báo bạn (khuyên dùng).'], all: ['Kiểm tra cả lưu ý', 'Báo AI cả lưu ý nhẹ (LaTeX trong Word, slide nhiều chữ…).'] };
  let mode = 'vis'; try { const v = localStorage.getItem('fc_mode'); if (MODES[v]) mode = v; } catch (e) {}
  const MAXR = 3, stats = { patch: 0, insp: 0, fix: 0 };
  const X = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const nn = n => String(n).trim().replace(/[\\/:*?"<>|\s]+/g, '-').slice(0, 80);
  const extOf = n => (String(n).split('.').pop() || '').toLowerCase();
  const NM = { docx: 'Word', pdf: 'PDF', xlsx: 'Excel', pptx: 'PowerPoint', html: 'HTML', csv: 'CSV' };

  /* ---------- 1. Khối công cụ trong câu trả lời của AI ---------- */
  function blocks(text) {
    const out = [], re = /```[ \t]*(file|patch|read|inspect|preview|screenshot|export|guide|plan|docimg|search|cm)[:=][ \t]*["']?([^\s`"']+)["']?[^\n]*\n([\s\S]*?)(?:(```)|$)/g; let m;
    while ((m = re.exec(text))) out.push({ kind: m[1], name: nn(m[2]), body: m[3].replace(/\n$/, ''), start: m.index, end: m.index + m[0].length, trunc: !m[4] });
    return out;
  }
  const find = (ws, n) => Object.keys(ws).find(k => k === n || k.toLowerCase() === String(n).toLowerCase());

  /* ---------- 2. Patch SEARCH/REPLACE (tất cả-hoặc-không) ---------- */
  function applyPatch(text, body) {
    const hs = [], re = /<{5,9}[ \t]*SEARCH[ \t]*\n([\s\S]*?)\n?={5,9}[ \t]*\n([\s\S]*?)\n?>{5,9}[ \t]*REPLACE/g; let m;
    while ((m = re.exec(body))) hs.push([m[1], m[2]]);
    if (!hs.length) return { ok: false, err: 'Khối patch không có cặp "<<<<<<< SEARCH / ======= / >>>>>>> REPLACE" hợp lệ.' };
    let t = String(text).replace(/\r/g, ''); const errs = [], at = [];
    hs.forEach((h, i) => {
      let s = h[0], r = h[1], pos = -1, cnt = 0;
      if (!s.trim()) { errs.push('#' + (i + 1) + ': phần SEARCH trống.'); return; }
      pos = t.indexOf(s); if (pos >= 0) cnt = t.split(s).length - 1;
// ----- 3451-3790 -----
  /* ---------- 4b. Xem trước & chụp màn hình trang HTML/SVG (preview · screenshot) ---------- */
  let SHOTS = [];
  /* Hàm này chạy TRONG iframe cách ly (toString rồi chèn vào <head>), nên không được dùng biến bên ngoài. */
  function pvHookFn(ID, SHOT, VH) {
    var errs = [], started = false;
    function post(o) { try { o.fc = ID; parent.postMessage(o, '*'); } catch (e) {} }
    function pushErr(m) { m = String(m).slice(0, 200); if (errs.length < 5 && errs.indexOf(m) < 0) errs.push(m); }
    addEventListener('error', function (e) { pushErr((e.message || 'error') + (e.lineno ? ' (dòng ' + e.lineno + ')' : '')); });
    addEventListener('unhandledrejection', function (e) { pushErr('Promise bị từ chối: ' + (e.reason && e.reason.message || e.reason)); });
    var ce = console.error; console.error = function () { pushErr('console.error: ' + [].slice.call(arguments).join(' ')); try { ce && ce.apply(console, arguments); } catch (e) {} };
    function col(s) {
      var m = /rgba?\(\s*([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)(?:[ ,/]+([\d.]+%?))?/.exec(s || ''); if (!m) return null;
      var a = m[4] == null ? 1 : (/%$/.test(m[4]) ? parseFloat(m[4]) / 100 : parseFloat(m[4]));
      return [+m[1], +m[2], +m[3], a];
    }
    function lum(c) { var f = c.slice(0, 3).map(function (v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }); return 0.2126 * f[0] + 0.7152 * f[1] + 0.0722 * f[2]; }
    function ratio(a, b) { var x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
    function nm(el) { var t = el.tagName.toLowerCase(), c = typeof el.className === 'string' ? el.className.trim().split(/\s+/)[0] : ''; return t + (el.id ? '#' + el.id : '') + (c ? '.' + c : ''); }
    function hasOwnText(el) { for (var i = 0; i < el.childNodes.length; i++) if (el.childNodes[i].nodeType === 3 && el.childNodes[i].nodeValue.trim()) return true; return false; }
    function visible(el, cs) { if (!cs || cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity === 0) return false; var r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0; }
    function scrolls(el, body) {
      for (var p = el.parentElement; p && p !== body && p !== document.documentElement; p = p.parentElement) { var o = getComputedStyle(p).overflowX; if (o === 'auto' || o === 'scroll' || o === 'hidden' || o === 'clip') return true; }
      return false;
    }
    function bgOf(el) {
      var base = [255, 255, 255, 1];
      for (var p = el; p; p = p.parentElement) {
        var cs = getComputedStyle(p);
        if (cs.backgroundImage && cs.backgroundImage !== 'none') return null;
        var c = col(cs.backgroundColor);
        if (c && c[3] >= 0.95) return c;
        if (c && c[3] > 0) base = [Math.round(c[0] * c[3] + base[0] * (1 - c[3])), Math.round(c[1] * c[3] + base[1] * (1 - c[3])), Math.round(c[2] * c[3] + base[2] * (1 - c[3])), 1];
      }
      return base;
    }
    function run() {
      var de = document.documentElement, body = document.body, vw = innerWidth, d = {}, all = body ? [].slice.call(body.querySelectorAll('*'), 0, 1500) : [];
      d.vw = vw; d.sw = de.scrollWidth; d.sh = Math.max(de.scrollHeight, body ? body.scrollHeight : 0); d.hscroll = d.sw > vw + 1;
      d.heads = [].slice.call(document.querySelectorAll('h1,h2,h3'), 0, 8).map(function (h) { return h.tagName.toLowerCase() + ': ' + h.textContent.trim().replace(/\s+/g, ' ').slice(0, 60); });
      d.btn = document.querySelectorAll('button,[role=button],input[type=button],input[type=submit]').length;
      d.link = document.querySelectorAll('a[href]').length;
      d.inp = document.querySelectorAll('input:not([type=hidden]),select,textarea').length;
      d.img = document.querySelectorAll('img,svg').length;
      d.font = body ? getComputedStyle(body).fontFamily.slice(0, 70) : '';
      d.noVp = !document.querySelector('meta[name=viewport]');
      d.empty = !body || body.innerText.trim().length < 20;
      var over = [], tap = [], small = [], low = [], clip = [], bad = 0, anh = 0, ext = 0, i, el, cs, r;
      for (i = 0; i < all.length; i++) {
        el = all[i]; var tg = el.tagName; if (/^(SCRIPT|STYLE|LINK|META|NOSCRIPT|TITLE|HEAD|BR|PATH|G|DEFS)$/i.test(tg)) continue;
        cs = getComputedStyle(el); if (!visible(el, cs)) continue; r = el.getBoundingClientRect();
        if (over.length < 5 && (r.right > vw + 2 || r.left < -2) && cs.position !== 'fixed' && !scrolls(el, body)) over.push(nm(el) + ' (' + Math.round(r.left) + '→' + Math.round(r.right) + 'px)');
        if (vw <= 520 && tap.length < 5 && /^(BUTTON|INPUT|SELECT|TEXTAREA)$/.test(tg) || (vw <= 520 && tap.length < 5 && (tg === 'A' || el.getAttribute('role') === 'button') && cs.display !== 'inline')) { if ((r.width < 40 || r.height < 40) && !(tg === 'INPUT' && /^(checkbox|radio|hidden)$/.test(el.type))) tap.push(nm(el) + ' ' + Math.round(r.width) + '×' + Math.round(r.height)); }
        if (hasOwnText(el)) {
          var fs = parseFloat(cs.fontSize);
          if (small.length < 5 && fs < 12) small.push(nm(el) + ' ' + fs + 'px');
          if (low.length < 5) {
            var fg = col(cs.color), bg = bgOf(el);
            if (fg && bg) {
              if (fg[3] < 1) fg = [Math.round(fg[0] * fg[3] + bg[0] * (1 - fg[3])), Math.round(fg[1] * fg[3] + bg[1] * (1 - fg[3])), Math.round(fg[2] * fg[3] + bg[2] * (1 - fg[3])), 1];
              var big = fs >= 24 || (fs >= 18.66 && +cs.fontWeight >= 700), rt = ratio(fg, bg);
              if (rt < (big ? 3 : 4.5)) low.push(nm(el) + ' ' + rt.toFixed(1) + ':1');
            }
          }
          if (clip.length < 3 && (cs.overflowX === 'hidden' || cs.overflowY === 'hidden') && cs.textOverflow !== 'ellipsis' && !/-webkit-box/.test(cs.display) && (el.scrollWidth > el.clientWidth + 2 || el.scrollHeight > el.clientHeight + 2) && el.clientWidth > 0) clip.push(nm(el));
        }
      }
      [].forEach.call(document.querySelectorAll('img'), function (im) {
        var s = im.getAttribute('src') || '';
        if (/^anh:/i.test(s)) anh++;
        else if (im.complete && !im.naturalWidth && s) bad++;
      });
      [].forEach.call(document.querySelectorAll('script[src],link[href],img[src],source[src],iframe[src]'), function (n) { var u = n.getAttribute('src') || n.getAttribute('href') || ''; if (/^(https?:)?\/\//i.test(u)) ext++; });
      d.over = over; d.tap = tap; d.small = small; d.low = low; d.clip = clip; d.bad = bad; d.anh = anh; d.ext = ext;
      return d;
    }
    function snap() {
      var de = document.documentElement, c = de.cloneNode(true), i, n;
      [].slice.call(c.querySelectorAll('script,noscript,link,iframe,video,audio,canvas')).forEach(function (e) { e.parentNode.removeChild(e); });
      [].slice.call(c.querySelectorAll('img')).forEach(function (im) {
        var s = im.getAttribute('src') || '';
        if (/^anh:/i.test(s)) {
          var live = document.querySelectorAll('img'), w = 0, h = 0;
          for (i = 0; i < live.length; i++) if (live[i].getAttribute('src') === s) { var r = live[i].getBoundingClientRect(); w = r.width; h = r.height; break; }
          var ph = document.createElement('div');
          ph.setAttribute('style', 'box-sizing:border-box;display:inline-block;vertical-align:middle;width:' + (w || 200) + 'px;height:' + (h || 120) + 'px;border:2px dashed #9aa4b2;background:#eef1f5;color:#6b7686;font:12px sans-serif;text-align:center;line-height:' + Math.max(h || 120, 20) + 'px;overflow:hidden');
          ph.textContent = '[ảnh: ' + s.slice(4, 30) + ']';
          im.parentNode.replaceChild(ph, im);
        } else if (/^https?:/i.test(s)) im.removeAttribute('src');
      });
      var vh = function (t) { return t.replace(/(-?\d*\.?\d+)\s*(?:d|s|l)?vh\b/g, function (m, v) { return (parseFloat(v) * VH / 100) + 'px'; }); };
      [].slice.call(c.querySelectorAll('style')).forEach(function (st) { st.textContent = vh(st.textContent.replace(/:root\b/g, 'html')); });
      [].slice.call(c.querySelectorAll('[style]')).forEach(function (e) { e.setAttribute('style', vh(e.getAttribute('style'))); });
      var fz = document.createElement('style'); fz.textContent = '*,*::before,*::after{animation-delay:-100s!important;animation-duration:.001s!important;animation-iteration-count:1!important;animation-fill-mode:both!important;transition:none!important}';
      (c.querySelector('head') || c).appendChild(fz);
      var x = new XMLSerializer().serializeToString(c);
      var bg = '#ffffff', b1 = col(getComputedStyle(document.body).backgroundColor), b2 = col(getComputedStyle(de).backgroundColor);
      if (b1 && b1[3] > 0.5) bg = getComputedStyle(document.body).backgroundColor; else if (b2 && b2[3] > 0.5) bg = getComputedStyle(de).backgroundColor;
      return { x: x, bg: bg };
    }
    function go() {
      if (started) return; started = true;
      try { var st = document.createElement('style'); st.textContent = '*,*::before,*::after{animation-duration:.001s!important;animation-delay:0s!important;animation-iteration-count:1!important;transition:none!important;scroll-behavior:auto!important}'; (document.head || document.documentElement).appendChild(st); } catch (e) {}
      setTimeout(function () {
        var d = null, x = null, bg = null;
        try { d = run(); } catch (e) { pushErr('báo cáo: ' + (e && e.message || e)); }
        if (SHOT) { try { var s = snap(); x = s.x; bg = s.bg; } catch (e) { pushErr('chụp: ' + (e && e.message || e)); } }
        post({ type: 'done', d: d, x: x, bg: bg, errs: errs });
      }, 1100);
    }
    if (document.readyState === 'complete') go(); else { addEventListener('load', go); setTimeout(go, 3000); }
  }
  function pvInject(src, hook) {
    if (/<head[^>]*>/i.test(src)) return src.replace(/<head[^>]*>/i, m => m + hook);
    if (/<html[^>]*>/i.test(src)) return src.replace(/<html[^>]*>/i, m => m + hook);
    if (/^\s*<!doctype[^>]*>/i.test(src)) return src.replace(/^\s*<!doctype[^>]*>/i, m => m + hook);
    return hook + src;
  }
  function pvInspect(src, W, H, shot) {
    return new Promise(res => {
      const id = 'pv' + Date.now() + Math.random().toString(36).slice(2, 6), ifr = document.createElement('iframe'); let done = 0, tm;
      ifr.setAttribute('sandbox', 'allow-scripts'); ifr.style.cssText = 'position:fixed;left:-99999px;top:0;width:' + W + 'px;height:' + H + 'px;border:0;visibility:hidden';
      const fin = r => { if (done) return; done = 1; clearTimeout(tm); window.removeEventListener('message', on); try { ifr.srcdoc = '<!doctype html>'; } catch (e) {} ifr.remove(); res(r); };
      const on = ev => { const d = ev.data; if (d && d.fc === id && d.type === 'done') fin({ d: d.d, x: d.x, bg: d.bg, errs: d.errs || [] }); };
      window.addEventListener('message', on);
      const hook = '<script>(' + pvHookFn.toString() + ')(' + JSON.stringify(id) + ',' + (shot ? 1 : 0) + ',' + H + ');<\/script>';
      const guard = '<script>(function(){try{var n=0;window.requestAnimationFrame=function(f){n++;if(n>90)return 0;return setTimeout(function(){try{f(performance.now())}catch(e){}},120)};var SI=window.setInterval;window.setInterval=function(f,t){return SI(f,Math.max(250,t||0))};var P=window.CanvasRenderingContext2D&&CanvasRenderingContext2D.prototype;if(P){["shadowBlur","filter"].forEach(function(k){try{Object.defineProperty(P,k,{set:function(){},get:function(){return k=="filter"?"none":0},confi
      ifr.srcdoc = pvInject(src, guard + hook);
      document.body.appendChild(ifr);
      tm = setTimeout(() => fin({ fail: 'hết giờ sau 6 giây (trang không phản hồi)' }), 6000);
    });
  }
  /* Vẽ DOM đã tuần tự hóa qua SVG foreignObject → canvas → JPEG (không cần thư viện, chạy offline) */
  function pvRaster(m, W, capH) {
    return new Promise(res => {
      try {
        const sh = (m.d && m.d.sh) || capH, Hc = Math.max(200, Math.min(Math.round(sh), capH)), bg = m.bg || '#ffffff';
        const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + Hc + '" viewBox="0 0 ' + W + ' ' + Hc + '"><foreignObject x="0" y="0" width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml" style="width:' + W + 'px;height:' + Hc + 'px;overflow:hidden;background:' + bg + '">' + m.x + '</div></foreignObject></svg>';
        const img = new Image(); let done = 0;
        const fin = r => { if (!done) { done = 1; res(r); } };
        const t = setTimeout(() => fin({ err: 'hết giờ khi dựng ảnh' }), 6000);
        img.onload = () => {
          clearTimeout(t);
          try {
            const sc = W <= 520 ? 1.5 : 1, cv = document.createElement('canvas'); cv.width = Math.round(W * sc); cv.height = Math.round(Hc * sc);
            const cx = cv.getContext('2d'); cx.fillStyle = bg; cx.fillRect(0, 0, cv.width, cv.height); cx.drawImage(img, 0, 0, cv.width, cv.height);
            const u = cv.toDataURL('image/jpeg', .82), b64 = u.split(',')[1] || '';
            if (b64.length < 2000) return fin({ err: 'ảnh trống' });
            fin({ b64, size: Math.round(b64.length * 0.75), w: W, h: Hc });
          } catch (e) { fin({ err: 'trình duyệt chặn xuất ảnh (' + (e && e.name || e) + ')' }); }
        };
        img.onerror = () => { clearTimeout(t); fin({ err: 'không dựng được ảnh từ trang (HTML/CSS quá phức tạp hoặc không hợp lệ XML)' }); };
        img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
      } catch (e) { res({ err: String(e && e.message || e) }); }
    });
  }
  function pvFmt(d, errs) {
    const L = [], I = []; if (!d) return { text: '(không lấy được báo cáo bố cục)' + (errs && errs.length ? '\n[LỖI] ' + errs.join('\n[LỖI] ') : ''), n: errs ? errs.length : 0 };
    L.push('Khổ ' + d.vw + 'px: trang cao ' + d.sh + 'px, ' + (d.hscroll ? 'CÓ cuộn ngang (nội dung rộng ' + d.sw + 'px)' : 'không cuộn ngang') + '.');
    if (d.heads.length) L.push('Tiêu đề: ' + d.heads.join(' | '));
    L.push('Có ' + d.btn + ' nút, ' + d.link + ' liên kết, ' + d.inp + ' ô nhập, ' + d.img + ' ảnh/SVG. Font thân trang: ' + d.font);
    if (d.hscroll) I.push('Trang bị cuộn ngang ở khổ ' + d.vw + 'px.');
    if (d.over.length) I.push('Phần tử tràn ngang ra ngoài khung: ' + d.over.join('; '));
    if (d.noVp) I.push('Thiếu <meta name="viewport"> (điện thoại sẽ thu nhỏ trang).');
    if (d.empty) I.push('Trang gần như không có chữ (có thể dựng lỗi hoặc script chưa chạy).');
    if (d.tap.length) I.push('Vùng bấm nhỏ hơn 40px: ' + d.tap.join('; '));
    if (d.small.length) I.push('Chữ nhỏ hơn 12px: ' + d.small.join('; '));
    if (d.low.length) I.push('Chữ tương phản thấp (<4,5:1): ' + d.low.join('; '));
    if (d.clip.length) I.push('Chữ có thể bị cắt (overflow:hidden): ' + d.clip.join('; '));
    if (d.bad) I.push(d.bad + ' ảnh hỏng (không tải được).');
    if (d.anh) L.push(d.anh + ' ảnh dạng anh:… (web sẽ thay bằng ảnh thật khi hiển thị; trong ảnh chụp là khung nét đứt).');
    if (d.ext) I.push(d.ext + ' tài nguyên ngoài (http/https) — khung cách ly không tải được.');
    (errs || []).forEach(e => I.push('Lỗi JS: ' + e));
    L.push(I.length ? 'Phát hiện:\n' + I.map((x, i) => (i + 1) + '. ' + x).join('\n') : '✓ Không thấy vấn đề bố cục rõ ràng (kiểm tra tự động, không thay được việc nhìn ảnh).');
    return { text: L.join('\n'), n: I.length };
  }
  function parseView(body) {
    const t = String(body || '').toLowerCase(), ws = []; let h = 0;
    const m = /(\d{3,4})\s*[x×]\s*(\d{3,4})/.exec(t);
    if (m) { ws.push(+m[1]); h = +m[2]; }
    else { (t.match(/\b\d{3,4}\b/g) || []).forEach(n => ws.push(+n)); if (!ws.length) { if (/mobile|phone|điện thoại|dien thoai/.test(t)) ws.push(390); if (/tablet|máy tính bảng/.test(t)) ws.push(768); if (/desktop|\bpc\b|máy tính/.test(t)) ws.push(1280); } }
    const cl = (v, a, b) => Math.max(a, Math.min(b, v));
    return { ws: ws.slice(0, 3).map(w => cl(w, 240, 1920)), h: h ? cl(h, 320, 1400) : 0, top: /\btop\b|đầu trang|màn đầu/.test(t) };
  }
  /* ---------- 4c. Ảnh xuất ra · khối export · guide · chặn tải khi đang kiểm tra ---------- */
  const PEND = new Set(); let ROUND = 0;
  const GUIDE2 = "\n6) XUẤT / ĐỔI ĐỊNH DẠNG: khối ```export:ten-moi.png``` có dòng \"from: ten-nguon\" (tệp đã tạo hoặc ảnh người dùng gửi; xem hướng dẫn nhóm imgx). Tạo ảnh mới: ```file:ten.png``` với nội dung HTML/SVG (đuôi png, jpg, webp, bmp, gif, ico).\n7) XEM HƯỚNG DẪN: khối ```guide:word``` (hoặc pdf, excel, ppt, code, design, img, imgx, all) — web trả hướng dẫn chi tiết trong [Kết quả công cụ].\nTỰ KIỂM TRA TR
  function pvCanvas(m, W, Hc, o) {
    return new Promise((res, rej) => {
      try {
        const bg = (o.bg && o.bg !== 'transparent') ? o.bg : (m.bg || '#ffffff');
        const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + Hc + '" viewBox="0 0 ' + W + ' ' + Hc + '"><foreignObject x="0" y="0" width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml" style="width:' + W + 'px;height:' + Hc + 'px;overflow:hidden;background:' + bg + '">' + m.x + '</div></foreignObject></svg>';
        const img = new Image(); let done = 0; const fin = (f, v) => { if (!done) { done = 1; f(v); } };
        const t = setTimeout(() => fin(rej, new Error('hết giờ khi dựng ảnh')), 15000);
        img.onload = () => { clearTimeout(t); try { let k = o.scale || (W <= 600 ? 2 : 1); if (W * Hc * k * k > 16e6) k = Math.sqrt(16e6 / (W * Hc)); const cv = document.createElement('canvas'); cv.width = Math.max(1, Math.round(W * k)); cv.height = Math.max(1, Math.round(Hc * k)); const cx = cv.getContext('2d'); cx.fillStyle = bg; cx.fillRect(0, 0, cv.width, cv.height); cx.drawImage(img, 0, 0, cv.width, cv.height); fin(res, cv); } catch (e) { fin(rej, e); } };
        img.onerror = () => { clearTimeout(t); fin(rej, new Error('không dựng được ảnh từ trang (HTML/CSS quá phức tạp hoặc không hợp lệ XML)')); };
        img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
      } catch (e) { rej(e); }
    });
  }
  async function toCanvas(src, o) {
    o = o || {}; const W = Math.max(240, Math.min(Math.round(o.width || 1080), 2400)), Hv = Math.round(o.height || (W <= 520 ? 844 : 800));
    const r = await pvInspect(src, W, Hv, 1);
    if (r.fail) throw new Error('không dựng được trang: ' + r.fail);
    if (!r.x) throw new Error('không lấy được nội dung trang để chụp');
    const sh = (r.d && r.d.sh) || Hv, Hc = o.page === 'top' ? Hv : (o.height ? Hv : Math.max(200, Math.min(Math.round(sh), 10000)));
    return pvCanvas(r, W, Hc, o);
  }
  async function imgVerify(k, text, firstShot) {
    const e = extOf(k); let r;
    try { r = await AF.imx.fromText(text, e, {}); } catch (er) { return { fail: 1, msg: '▸ ' + k + ': [LỖI] không xuất được ảnh: ' + (er && er.message || er) + '. Hãy sửa HTML/SVG (chỉ CSS/HTML đơn giản, không tài nguyên ngoài, không phụ thuộc JavaScript) rồi gửi lại.' }; }
    const bl = AF.imx.blank(r.cv); let shot = 0;
    if (firstShot && SHOTS.length < 1) { try { const th = AF.imx.thumb(r.cv); SHOTS.push({ kind: 'image', name: 'xuat-' + nn(k.replace(/\.[^.]+$/, '')) + '.jpg', mime: 'image/jpeg', size: Math.round(th.b64.length * 0.75), b64: th.b64, url: th.url, desc: 'Bản xem trước ảnh ' + k }); shot = 1; } catch (er) {} }
    return { fail: bl ? 1 : 0, shot, msg: '▸ ' + k + ' → ảnh ' + e.toUpperCase() + ' ' + r.w + '×' + r.h + 'px, ' + Math.max(1, Math.round(r.blob.size / 1024)) + ' KB' + (bl ? ' — [LỖI] ảnh ' + bl + '. Kiểm tra màu nền/màu chữ/kích thước rồi sửa bằng patch.' : ' ✓ xuất được' + (shot ? ' (ảnh xem trước đính kèm).' : '.')) };
  }
  async function exportOut(b, ws) {
    const to = extOf(b.name), tag = '▸ export ' + b.name, m = /^\s*(?:from|nguon|nguồn|tu|từ)\s*[:=]\s*(.+?)\s*$/im.exec(b.body || '');
    if (!m) return '✗ export ' + b.name + ': thiếu dòng "from: <tên tệp nguồn hoặc tên ảnh đính kèm>" trong khối.';
    const nm = m[1].replace(/^[`"']+|[`"']+$/g, ''), kf = find(ws, nm), src = kf ? { kind: 'text', name: kf, text: ws[kf].text } : AF.imx.resolve(nm), opt = AF.imx.parseOpts('', b.body);
    if (!src) return '✗ export ' + b.name + ': không thấy nguồn "' + nm + '". Tệp hiện có: ' + (Object.keys(ws).join(', ') || '(chưa có)') + '. Với ảnh đính kèm dùng đúng tên ảnh hoặc "last".';
    const raster = AF.imx.isImg(to) || to === 'svg' || (to === 'pdf' && (src.kind === 'img' || /^\s*<svg\b/i.test(src.text || '')));
    if (!raster) {
      if (src.kind !== 'text') return '✗ export ' + b.name + ': ảnh chỉ chuyển được sang png, jpg, webp, bmp, gif, ico, svg, pdf.';
      const bl = await AF.build(AF.reg(b.name, src.text)); return tag + ' ← ' + src.name + ' ✓ tạo được ' + to.toUpperCase() + ', ' + Math.max(1, Math.round(bl.size / 1024)) + ' KB.';
    }
    const r = await AF.imx.run(src, to, opt), bk = AF.imx.blank(r.cv); let shot = '';
    if (SHOTS.length < 1) { try { const th = AF.imx.thumb(r.cv); SHOTS.push({ kind: 'image', name: 'xuat-' + nn(b.name.replace(/\.[^.]+$/, '')) + '.jpg', mime: 'image/jpeg', size: Math.round(th.b64.length * 0.75), b64: th.b64, url: th.url, desc: 'Bản xem trước ' + b.name }); shot = ' (ảnh xem trước đính kèm)'; } catch (er) {} }
    return tag + ' ← ' + src.name + ': ' + r.w + '×' + r.h + 'px, ' + Math.max(1, Math.round(r.blob.size / 1024)) + ' KB' + (bk ? ' — [LỖI] ảnh ' + bk + '.' : ' ✓') + shot;
  }
  function guideOut(b) {
    const raw = String(b.name || '').toLowerCase().replace(/\.[^.]+$/, ''), ids = AG.keys();
    const al = { docx: 'word', xlsx: 'excel', csv: 'excel', pptx: 'ppt', html: 'code', anh: 'img', export: 'imgx', convert: 'imgx', png: 'imgx', jpg: 'imgx', webp: 'imgx', 'xuat-anh': 'imgx', 'tat-ca': 'all', tatca: 'all' };
    const k = al[raw] || raw; if (k === 'all') return '▸ guide all:\n' + ids.map(x => AG.guideText(x)).join('\n\n');
    if (ids.indexOf(k) < 0) return '✗ guide ' + b.name + ': không có nhóm này. Nhóm hợp lệ: ' + ids.join(', ') + ', all.';
    return '▸ guide ' + k + ':\n' + AG.guideText(k);
  }
  async function viewOne(kind, k, v, text, body) {
    const e0 = extOf(k), e = AF.imx.isImg(e0) ? (/^\s*<svg\b/i.test(text) ? 'svg' : /^\s*</.test(text) ? 'html' : e0) : e0, tag = '▸ ' + kind + ' ' + k + ' (v' + v + ')';
    if (e !== 'html' && e !== 'svg') return '✗ ' + kind + ' ' + k + ': chỉ hỗ trợ tệp .html và .svg; với loại khác hãy dùng khối inspect.';
    const src = e === 'svg' ? '<!doctype html><meta charset="utf-8"><body style="margin:0">' + text + '</body>' : text, pv = parseView(body);
    const vis = typeof GK_NOVIS !== 'undefined' && typeof GPICK !== 'undefined' && GK_NOVIS[GPICK];
    if (kind === 'preview') {
      const ws = pv.ws.length ? pv.ws : [390, 1280], out = [];
      for (const W of ws) {
        const H = pv.h || (W <= 520 ? 844 : 800), r = await pvInspect(src, W, H, 0);
        if (r.fail) { out.push('✗ không chạy được ở ' + W + 'px: ' + r.fail); continue; }
        out.push(pvFmt(r.d, r.errs).text);
      }
      return tag + ':\n' + out.join('\n\n');
    }
    const W = pv.ws[0] || 1280, H = pv.h || (W <= 520 ? 844 : 800), r = await pvInspect(src, W, H, 1);
    if (r.fail) return tag + ': ✗ không chạy được: ' + r.fail;
    const rep = pvFmt(r.d, r.errs).text;
    if (!r.x) return tag + ': ✗ không chụp được (không lấy được DOM). Báo cáo chữ:\n' + rep;
    const ras = await pvRaster(r, W, pv.top ? H : 2400);
    if (ras.err) return tag + ' @' + W + 'px: ✗ không chụp được ảnh (' + ras.err + '). Hãy dựa vào báo cáo chữ:\n' + rep;
    const nm2 = 'chup-' + nn(k.replace(/\.[^.]+$/, '')) + '-' + W + '.jpg';
    SHOTS.push({ kind: 'image', name: nm2, mime: 'image/jpeg', size: ras.size, b64: ras.b64, url: 'data:image/jpeg;base64,' + ras.b64, desc: 'Ảnh chụp ' + k + ' ở khổ ' + W + 'px.\n' + rep });
    return tag + ' @' + W + 'px: đã chụp ' + ras.w + '×' + ras.h + 'px (ảnh đính kèm kèm tin nhắn này)' + (vis ? ' — LƯU Ý: model hiện tại không xem được ảnh, hãy dựa vào báo cáo chữ' : '') + '.\n' + rep;
  }
  async function process(c) {
    const idx = c.msgs.length - 1, m = c.msgs[idx]; if (!m || m.r !== 'model' || !m.t) return '';
    const bl = blocks(m.t); if (!bl.length) return (typeof AGX !== 'undefined' && AGX.nudge(c, 1)) || '';
    const ws = files(c, idx); let seq = 1e6; const tick = () => ++seq, res = [], reps = [], touched = [], inspected = {}; let nTool = 0, changed = 0, nShot = 0, viewNote = 0, nGuide = 0; SHOTS = [];
    for (const b of bl) {
      const k = find(ws, b.name);
      if (b.kind === 'file') { ws[k || b.name] = { text: b.body, v: (k ? ws[k].v : 0) + 1, trunc: b.trunc, ts: tick() }; if (touched.indexOf(k || b.name) < 0) touched.push(k || b.name); continue; }
      if (b.kind === 'guide') { if (++nGuide > 2) continue; res.push(guideOut(b)); continue; }
      if (b.kind === 'plan') { res.push(AGX.plan(c, b)); continue; }
      if (++nTool > 3) { if (nTool === 4) res.push('(Bỏ qua các khối công cụ thứ 4 trở đi — mỗi lượt tối đa 3 khối.)'); continue; }
      if (typeof AGX !== 'undefined' && !(await AGX.perm(b, c))) { res.push('✗ ' + b.kind + ' ' + b.name + ': người dùng đã TỪ CHỐI cấp phép cho công cụ này. KHÔNG thử lại đúng thao tác đó; hãy làm cách khác hoặc hỏi người dùng.'); continue; }
      if (b.kind === 'patch') {
        if (!k) { res.push('✗ patch ' + b.name + ': chưa có tệp này. Hãy tạo bằng khối ```file:' + b.name + '. Tệp hiện có: ' + (Object.keys(ws).join(', ') || '(chưa có)')); continue; }
        const r = applyPatch(ws[k].text, b.body);
        if (!r.ok) { res.push('✗ patch ' + k + ' thất bại:\n' + r.err); continue; }
        ws[k] = { text: r.text, v: ws[k].v + 1, ts: tick() }; stats.patch++; changed++; if (touched.indexOf(k) < 0) touched.push(k);
        reps.push({ b, text: '✏️ *Đã áp dụng patch vào `' + k + '` (' + r.n + ' thay đổi tại ' + r.at.join(', ') + ', phiên bản v' + ws[k].v + ')*\n\n```file:' + k + '\n' + r.text.replace(/\n$/, '') + '\n```' });
      } else if (b.kind === 'read') res.push(readOut(ws, b));
      else if (b.kind === 'preview' || b.kind === 'screenshot') {
        if (!k) { res.push('✗ ' + b.kind + ' ' + b.name + ': không có tệp này. Tệp hiện có: ' + (Object.keys(ws).join(', ') || '(chưa có)')); continue; }
        if (b.kind === 'screenshot' && ++nShot > 1) { res.push('(Bỏ qua screenshot thứ 2 — mỗi lượt tối đa 1 ảnh.)'); continue; }
        try { res.push(await viewOne(b.kind, k, ws[k].v, ws[k].text, b.body)); viewNote = 1; } catch (er) { res.push('✗ ' + b.kind + ' ' + k + ': ' + (er && er.message || er)); }
      }
      else if (b.kind === 'docimg') { try { res.push(await AGX.docimg(b, c)); } catch (er) { res.push('✗ docimg ' + b.name + ': ' + (er && er.message || er)); } }
      else if (b.kind === 'cm') { try { res.push(await AGX.cm(b, c)); } catch (er) { res.push('✗ cm ' + b.name + ': ' + (er && er.message || er)); } }
      else if (b.kind === 'search') { try { res.push(await AGX.search(b, c)); } catch (er) { if (GSTOPPED) throw er; res.push('✗ search: ' + (er && er.message || er)); } }
      else if (b.kind === 'export') { try { res.push(await exportOut(b, ws)); viewNote = 1; } catch (er) { res.push('✗ export ' + b.name + ': ' + (er && er.message || er)); } }
      else if (b.kind === 'inspect') {
        if (!k) { res.push('✗ inspect ' + b.name + ': không có tệp này.'); continue; }
        const f = AF.reg(k, ws[k].text), R = await check(f, 1); stats.insp++; inspected[k] = 1;
        res.push('▸ inspect ' + k + ' (v' + ws[k].v + '): ' + R.rep.join(' · ') + (R.issues.length ? '\n' + R.issues.map((i, n) => (n + 1) + '. ' + (i.lv === 'err' ? '[LỖI] ' : '[lưu ý] ') + i.msg).join('\n') : '\n✓ Không phát hiện lỗi.'));
      }
    }
    if (reps.length) { let t = m.t; reps.slice().sort((a, b) => b.b.start - a.b.start).forEach(r => { t = t.slice(0, r.b.start) + r.text + t.slice(r.b.end); }); m.t = t; m.patched = (m.patched || 0) + reps.length; }
    let fail = 0;
    if (mode !== 'off') for (const k of touched) {
      if (inspected[k] || !ws[k]) continue;
      if (ws[k].trunc) { res.push('▸ ' + k + ': [LỖI] tệp bị cắt giữa chừng (thiếu ``` đóng). Hãy gửi lại ngắn gọn hơn hoặc chia làm 2 tệp.'); fail++; continue; }
      if (AF.imx.isImg(extOf(k))) { const rr = await imgVerify(k, ws[k].text, nShot < 1); res.push(rr.msg); if (rr.fail) fail++; if (rr.shot) nShot++; viewNote = 1; continue; }
      const R = await check(AF.reg(k, ws[k].text)), li = fmtIssues(R.issues, mode);
      if (li.length) { res.push('▸ ' + k + ' (v' + ws[k].v + '): ' + R.rep.join(' · ') + '\n' + li.join('\n')); fail++; }
    }
    if ((mode === 'vis' || mode === 'all') && ROUND < 2 && !nShot) {
      const k0 = touched.find(k => ws[k] && /^(html|svg)$/.test(extOf(k)) && !ws[k].trunc && !inspected[k]);
      if (k0) { try { const nov = typeof GK_NOVIS !== 'undefined' && typeof GPICK !== 'undefined' && GK_NOVIS[GPICK], msg = await viewOne(nov ? 'preview' : 'screenshot', k0, ws[k0].v, ws[k0].text, ''); if (msg.indexOf('✗') < 0) { res.push('(web tự kiểm tra trước khi giao) ' + msg); nShot++; viewNote = 1; } } catch (er) {} }
    }
    if (!res.length && typeof AGX !== 'undefined') { const nd = AGX.nudge(c); if (nd) res.push(nd); }
    if (!res.length) return '';
    stats.fix += fail;
    return '[Kết quả công cụ]\n' + res.join('\n\n') + (fail || res.some(x => x[0] === '✗') ? '\n\nHãy sửa các lỗi trên: dùng khối patch (SEARCH khớp nguyên văn) hoặc gửi lại toàn bộ tệp nếu hỏng nặng. Khi đã ổn thì chỉ trả lời 1–2 câu, KHÔNG gửi lại tệp.' : (viewNote ? '\n\nĐã xem trang (ảnh chụp nếu có nằm kèm tin nhắn này). Nếu thấy lỗi bố cục/tương tác RÕ RÀNG thì sửa bằng patch (tối đa 2 vòng)
  }
  async function loop0(c) {
    if (mode === 'off') return;
    let prev = '', FS = 0;
    for (let r = 0; ; r++) {
      const last = c.msgs[c.msgs.length - 1]; if (!last || last.r !== 'model' || GSTOPPED) return;
      GBUSY = 1; c.busy = 1; c.part = null; c.status = 'đang xử lý & kiểm tra tệp'; try { gRender(); } catch (e) {}
      ROUND = r; let msg = ''; try { msg = await process(c); } catch (e) { console.warn('[FC]', e); }
      GBUSY = 0; c.busy = 0; c.status = '';
      { const hf = /\[LỖI\]|✗/.test(msg || ''); FS = hf ? FS + 1 : 0;
        if (msg && hf && !c._esc && !GSTOPPED && window.ESC && ESC.on() && (FS >= 3 || msg === prev || r >= (typeof AGX !== 'undefined' ? AGX.maxr(c, MAXR) : MAXR))) {
          c._esc = 1; let done = false;
          try { GBUSY = 1; c.busy = 1; c.status = 'web nhờ AI mạnh hơn sửa lỗi'; try { gRender(); } catch (e) {} done = await ESC.repair(c, { ws: files(c, c.msgs.length - 1), check, reg: AF.reg, msg }); } catch (e) { console.warn('[ESC]', e); } finally { GBUSY = 0; c.busy = 0; c.status = ''; }
          if (done) { prev = ''; FS = 0; try { gRender(); } catch (e) {} continue; }
        } }
      if (!msg || msg === prev || r >= (typeof AGX !== 'undefined' ? AGX.maxr(c, MAXR) : MAXR) || GSTOPPED) { try { gRender(); } catch (e) {} return; }
      prev = msg; const sh = SHOTS; SHOTS = []; const dl = (typeof AGX !== 'undefined') ? AGX.take() : null; c.msgs.push({ r: 'user', t: msg, tool: 1, atts: sh.length ? sh : undefined, dl: dl && dl.length ? dl : undefined });
      await gRunInner(c);
    }
  }

  async function loop(c) {
    PEND.clear(); c._esc = 0;
    try {
      const l = c.msgs[c.msgs.length - 1];
      if (mode !== 'off' && l && l.r === 'model' && l.t) blocks(l.t).forEach(b => { if (b.kind === 'file' || b.kind === 'export') PEND.add(b.name.toLowerCase()); });
      await loop0(c);
    } finally { PEND.clear(); }
  }

  /* ---------- 6. Giao diện ---------- */
// ----- agx-ext FC.loop (10440-10470) -----
    FC.loop = async function (c) {
      await l0.apply(this, arguments);
      if (OFFFLAG) return;
      for (let r = 0; r < cfg.rounds; r++) {
        const last = c.msgs[c.msgs.length - 1];
        if (!last || last.r !== 'model' || GSTOPPED) return;
        const bl = K.parseBlocks(String(last.t || '')); if (!bl.length) return;
        if (callsSinceUser(c) >= MAXCALLS) { addLog('dừng', 'quá ' + MAXCALLS + ' lần gọi', ''); return; }
        GBUSY = 1; c.busy = 1; c.part = null; c.status = 'đang chạy kỹ năng / công cụ'; try { gRender(); } catch (e) {}
        let out = null; try { out = await runBlocks(c, bl); } catch (e) { console.warn('[SK]', e); } finally { GBUSY = 0; c.busy = 0; c.status = ''; }
        if (!out || GSTOPPED) { try { gRender(); } catch (e) {} return; }
        const pv = lastSk(c); if (pv && pv.t === out.text) { addLog('dừng', 'khối lặp y nguyên', ''); try { gRender(); } catch (e) {} return; }
        c.msgs.push({ r: 'user', t: out.text, tool: 1, sk: 1, skLabel: out.label, skRepos: out.repos && out.repos.length ? out.repos : undefined });
        await gRunInner(c);
        await l0.call(this, c);
      }
    };
    const h0 = FC.toolHtml;
    FC.toolHtml = function (m) {
      if (m && (m.sk || /^\[Kỹ năng – kết quả/.test(String(m.t || '')))) {
        const t = String(m.t || ''), shown = t.length > 30000 ? t.slice(0, 30000) + '\n…(rút gọn khi hiển thị; AI vẫn nhận đủ)' : t;
        return '<details class="gtool"><summary>🧩 ' + esc(m.skLabel || 'Kỹ năng / công cụ') + ' <small>(web gửi cho AI)</small></summary><pre>' + esc(shown) + '</pre>' + (m.skRepos || []).map(r => '<button type="button" class="sk-btn" data-sk="gh" data-v="' + esc(r) + '">⬇ Cài ' + esc(r) + '</button>').join('') + '</details>';
      }
      return h0.apply(this, arguments);
    };
    const p0 = FC.panelHtml; FC.panelHtml = function () { let h = p0.apply(this, arguments); try { h += panelHtml(); } catch (e) { console.warn('[SK]', e); } return h; };
    if (typeof window.mdRender === 'function') { const m0 = window.mdRender; window.mdRender = function (src) { let s = src; try { s = hideBlocks(src); } catch (e) {} return m0.call(this, s); }; }
    return true;
  }
  let ok = false; try { ok = hook(); } catch (e) { console.warn('[SK] hook lỗi', e); }
  window.SK = { enabled: () => REG.filter(s => isOn(s.name)), REG, cfg, CACHE, hooked: ok, off: OFFFLAG, sysAdd, want, runBlocks, runOne, runJs, skFetch, listRepo, installGithub, importFile, getSkill, unpack, hideBlocks, guide, panelHtml, _K: K };
