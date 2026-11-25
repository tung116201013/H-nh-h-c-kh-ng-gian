/* dự phòng: nếu trang chưa nạp hộp thoại riêng (dbdlg) thì dùng tạm hộp thoại trình duyệt */
if (typeof window !== 'undefined' && !window.dbConfirm) { window.dbAlert = m => { alert(m); return Promise.resolve(); }; window.dbConfirm = m => Promise.resolve(confirm(m)); window.dbPrompt = (m, d) => Promise.resolve(prompt(m, d)); }
/* Tài khoản + đồng bộ dữ liệu lên Cloudflare (D1). Không đăng nhập vẫn dùng bình thường (lưu trên máy). */
(() => {
  'use strict';
  if (window.__cfsync) return; window.__cfsync = true;

  const API_BASE = 'https://dobai-api.bh13.workers.dev';   // địa chỉ Worker API
  const CHUNK = 700000;                                              // cắt file thành phần ~700KB
  const SCAN_MS = 30000;
  const LS_ALLOW = /^(dc:|lrn:|stt:|fc_|ai_|or_custom$|nl_custom$|tok_save$)/;
  const LS_DENY = /(key|token|secret|tally|probe)/i;
  const STORES = [
    { db: 'dc', store: 'kv', kp: null },
    { db: 'dc-kho', store: 'kv', kp: null },
    { db: 'dc-chat-history', store: 'chats', kp: 'id' },
    { db: 'sk_db', store: 'skills', kp: 'name' },
    { db: 'dc-libsync', store: 'kv', kp: null },   // Kho thư viện (khối lib-sync đóng gói từng thư viện vào đây)
  ];
  const NSLS = 'ls';
  const nsIdb = (s) => `idb:${s.db}/${s.store}`;
  const LABEL = { ls: 'Cài đặt & tiến độ', 'idb:dc/kv': 'Dữ liệu chính', 'idb:dc-kho/kv': 'Kho dữ liệu', 'idb:dc-chat-history/chats': 'Cuộc chat', 'idb:dc-libsync/kv': 'Kho thư viện', 'idb:sk_db/skills': 'Kỹ năng' };

  let user = null, busy = false, pending = false, lastMsg = '', lastOk = 0, lastErr = '';
  let me = null;
  const ICON = { free: '', plus: '⭐', pro: '💎', ultra: '🚀', admin: '🛡️', founder: '👑' };
  const emitMe = () => { try { window.dispatchEvent(new CustomEvent('cfs:me')); } catch { } };
  window.CFS = {
    api: API_BASE, call: (p, o) => call(p, o),
    get token() { return getTok(); }, get user() { return user; }, get me() { return me; },
    get role() { return (me && me.role) || 'free'; }, get rank() { return (me && me.rank) || 0; },
    can: (f) => !!(user && me && !me.banned && me.feat && me.feat[f]),
    open: () => (user ? openAccount() : showLogin()),
  };

  /* ---------- tiện ích ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const fmtT = (t) => new Date(t).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  const fmtD = (t) => new Date(t).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
  const fmtMB = (n) => n >= 1073741824 ? (n / 1073741824).toFixed(2) + ' GB' : n >= 1048576 ? (n / 1048576).toFixed(1) + ' MB' : Math.max(0, Math.round(n / 1024)) + ' KB';
  const getTok = () => { try { return localStorage.getItem('cfsync:tok'); } catch { return null; } };
  const setTok = (t) => { try { t ? Storage.prototype.setItem.call(localStorage, 'cfsync:tok', t) : localStorage.removeItem('cfsync:tok'); } catch { } };
  const autoOn = () => { try { return localStorage.getItem('cfsync:auto') !== '0'; } catch { return true; } };
  const setAuto = (v) => { try { Storage.prototype.setItem.call(localStorage, 'cfsync:auto', v ? '1' : '0'); } catch { } };
  const lsSetRaw = (k, v) => { try { Storage.prototype.setItem.call(localStorage, k, v); } catch (e) { console.warn('[cfsync] ls', e); } };
  const hash53 = (str) => { let h1 = 0xdeadbeef, h2 = 0x41c6ce57; for (let i = 0; i < str.length; i++) { const c = str.charCodeAt(i); h1 = Math.imul(h1 ^ c, 2654435761); h2 = Math.imul(h2 ^ c, 1597334677); } h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909); h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909); return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36) + str.length.toString(36); };
  const sha256 = async (blob) => { const d = await crypto.subtle.digest('SHA-256', await blob.arrayBuffer()); return [...new Uint8Array(d)].map(b => b.toString(16).padStart(2, '0')).join(''); };
  const toB64 = (blob) => new Promise((ok, no) => { const fr = new FileReader(); fr.onload = () => ok(String(fr.result).split(',')[1] || ''); fr.onerror = () => no(fr.error); fr.readAsDataURL(blob); });
  async function call(path, opt = {}) {
    const t = getTok();
    return fetch(API_BASE + path, { ...opt, headers: { ...(t ? { authorization: 'Bearer ' + t } : {}), ...(opt.headers || {}) } });
  }
  const errOf = async (r, d) => (await r.json().catch(() => ({}))).error || d;

  /* ---------- IndexedDB ---------- */
  const openDb = (s) => new Promise((ok, no) => {
    const r = indexedDB.open(s.db, 1);
    r.onupgradeneeded = () => { if (!r.result.objectStoreNames.contains(s.store)) r.result.createObjectStore(s.store, s.kp ? { keyPath: s.kp } : undefined); };
    r.onsuccess = () => ok(r.result); r.onerror = () => no(r.error); r.onblocked = () => no(new Error('blocked'));
  });
  async function idbAll(s) {
    const db = await openDb(s);
    try {
      return await new Promise((ok, no) => {
        const out = [], q = db.transaction(s.store, 'readonly').objectStore(s.store).openCursor();
        q.onsuccess = () => { const c = q.result; if (c) { out.push([c.key, c.value]); c.continue(); } else ok(out); };
        q.onerror = () => no(q.error);
      });
    } finally { db.close(); }
  }
  async function idbPut(s, key, val) {
    const db = await openDb(s);
    try { await new Promise((ok, no) => { const t = db.transaction(s.store, 'readwrite'); s.kp ? t.objectStore(s.store).put(val) : t.objectStore(s.store).put(val, key); t.oncomplete = ok; t.onerror = t.onabort = () => no(t.error); }); } finally { db.close(); }
  }
  async function idbDel(s, key) {
    const db = await openDb(s);
    try { await new Promise((ok, no) => { const t = db.transaction(s.store, 'readwrite'); t.objectStore(s.store).delete(key); t.oncomplete = ok; t.onerror = t.onabort = () => no(t.error); }); } finally { db.close(); }
  }

  /* ---------- mã hoá giá trị (Blob/ArrayBuffer -> tham chiếu) ---------- */
  function encode(v, blobs) {
    if (v === null || typeof v !== 'object') return v;
    if (v instanceof Blob) { const ph = { $blob: null, k: (v instanceof File) ? 'file' : 'blob', t: v.type, n: v.name || '', s: v.size, lm: v.lastModified || 0 }; blobs.push([ph, v]); return ph; }
    if (v instanceof ArrayBuffer) { const ph = { $blob: null, k: 'ab', s: v.byteLength }; blobs.push([ph, new Blob([v])]); return ph; }
    if (ArrayBuffer.isView(v)) { const ph = { $blob: null, k: 'view:' + v.constructor.name, s: v.byteLength }; blobs.push([ph, new Blob([v])]); return ph; }
    if (v instanceof Date) return { $date: v.getTime() };
    if (Array.isArray(v)) return v.map(x => encode(x, blobs));
    const o = {}; for (const k of Object.keys(v)) o[k] = encode(v[k], blobs); return o;
  }
  const sigOf = (enc) => hash53(JSON.stringify(enc, (k, x) => (x && x.$blob === null ? { ...x, lm: 0 } : x)));
  const rebuild = async (v, blob) => {
    if (v.k === 'file') return new File([blob], v.n || 'file', { type: v.t || '', lastModified: v.lm || Date.now() });
    if (v.k === 'ab') return await blob.arrayBuffer();
    if (v.k && v.k.startsWith('view:')) { const C = window[v.k.slice(5)] || Uint8Array; return new C(await blob.arrayBuffer()); }
    return blob;
  };
  async function decode(v, fromBackup) {
    if (v === null || typeof v !== 'object') return v;
    if (Array.isArray(v)) return Promise.all(v.map(x => decode(x, fromBackup)));
    if ('$date' in v) return new Date(v.$date);
    if ('$blob' in v) {
      if (fromBackup) { const b = await (await fetch('data:application/octet-stream;base64,' + (v.$data || ''))).blob(); return rebuild(v, v.t ? new Blob([b], { type: v.t }) : b); }
      const mr = await call('/api/blob/' + v.$blob); if (!mr.ok) throw new Error('thiếu file ' + String(v.$blob).slice(0, 8));
      const meta = await mr.json(), parts = [];
      for (let i = 0; i < meta.parts; i++) {
        const pr = await call('/api/blob/' + v.$blob + '/' + i); if (!pr.ok) throw new Error('thiếu phần file');
        parts.push(await (await fetch('data:application/octet-stream;base64,' + await pr.text())).blob());
      }
      return rebuild(v, new Blob(parts, { type: v.t || '' }));
    }
    const o = {}; for (const k of Object.keys(v)) o[k] = await decode(v[k], fromBackup); return o;
  }

  /* ---------- quét dữ liệu trên máy ---------- */
  async function scanLocal() {
    const map = new Map(), failed = new Set();
    try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (LS_ALLOW.test(k) && !LS_DENY.test(k)) map.set(NSLS + '\u0001' + k, { ns: NSLS, k, val: localStorage.getItem(k) }); } } catch { failed.add(NSLS); }
    for (const s of STORES) {
      let rows; try { rows = await idbAll(s); } catch (e) { console.warn('[cfsync] đọc', s.db, e); failed.add(nsIdb(s)); continue; }
      for (const [key, val] of rows) { const k = JSON.stringify(key); map.set(nsIdb(s) + '\u0001' + k, { ns: nsIdb(s), k, s, key, val }); }
    }
    return { map, failed };
  }

  /* ---------- sổ theo dõi (manifest) ---------- */
  const mkey = () => 'cfsync:m:' + (user && user.email);
  const loadM = () => { try { return JSON.parse(localStorage.getItem(mkey()) || 'null'); } catch { return null; } };
  const saveM = (m) => lsSetRaw(mkey(), JSON.stringify(m));
  const itemUrl = (ns, k) => `/api/item?ns=${encodeURIComponent(ns)}&k=${encodeURIComponent(k)}`;

  async function applyRemote(it) {
    if (it.ns === NSLS) {
      if (it.deleted) { try { Storage.prototype.removeItem.call(localStorage, it.k); } catch { } return; }
      const r = await call(itemUrl(it.ns, it.k)); if (!r.ok) throw new Error('đọc mục lỗi');
      lsSetRaw(it.k, (await r.json()).v); return;
    }
    const s = STORES.find(x => nsIdb(x) === it.ns); if (!s) return;
    const key = JSON.parse(it.k);
    if (it.deleted) { await idbDel(s, key); return; }
    const r = await call(itemUrl(it.ns, it.k)); if (!r.ok) throw new Error('đọc mục lỗi');
    await idbPut(s, key, await decode((await r.json()).v));
  }

  async function pushBlob(blob) {
    const h = await sha256(blob);
    const head = await call('/api/blob/' + h, { method: 'HEAD' });
    if (head.status !== 200) {
      const n = Math.max(1, Math.ceil(blob.size / CHUNK));
      for (let i = 0; i < n; i++) {
        const b64 = await toB64(blob.slice(i * CHUNK, (i + 1) * CHUNK));
        const r = await call('/api/blob/' + h + '/' + i, { method: 'PUT', body: b64, headers: { 'content-type': 'text/plain' } });
        if (!r.ok) throw new Error(await errOf(r, 'tải file lỗi'));
      }
      const dr = await call('/api/blob/' + h + '/done', { method: 'POST', body: JSON.stringify({ size: blob.size, type: blob.type || '', parts: n }), headers: { 'content-type': 'application/json' } });
      if (!dr.ok) throw new Error(await errOf(dr, 'chốt file lỗi'));
    }
    return h;
  }
  async function pushItem(e, sig) {
    const blobs = []; const v = e.ns === NSLS ? e.val : encode(e.val, blobs);
    for (const [ph, blob] of blobs) ph.$blob = await pushBlob(blob);
    const r = await call(itemUrl(e.ns, e.k), { method: 'PUT', body: JSON.stringify({ v }), headers: { 'x-sig': sig, 'content-type': 'application/json' } });
    if (!r.ok) throw new Error(await errOf(r, 'lưu lỗi'));
  }

  /* ---------- đồng bộ ---------- */
  const idOf = (it) => it.ns + '\u0001' + it.k;
  async function sync(initial, opts = {}) {
    if (!user) return;
    if (busy) { pending = true; return; }
    busy = true; setStatus('syncing');
    try {
      let M = loadM();
      const mode = opts.mode || '';                                  // 'pull' = lấy đè từ đám mây, 'push' = gửi đè lên
      if (!M || mode === 'pull') M = { since: 0, items: {} };
      else if (mode === 'push') M = { since: M.since, items: {} };
      const first = !loadM() || mode === 'pull';                      // lần đầu trên máy này: ưu tiên bản trên đám mây
      const prevIds = new Set(Object.keys(M.items));

      const ir = await call('/api/index?since=' + Math.max(0, M.since - 1));
      if (ir.status === 401) { setTok(null); user = null; setStatus(''); toast('Phiên đăng nhập đã hết hạn, hãy đăng nhập lại.'); return; }
      if (!ir.ok) throw new Error('index ' + ir.status);
      const { items: remote, now } = await ir.json();

      const { map: local, failed } = await scanLocal();
      const changed = new Set();
      for (const [id, e] of local) { e._sig = sigOf(e.ns === NSLS ? e.val : encode(e.val, [])); if (M.items[id] !== e._sig) changed.add(id); }

      const handled = new Set();          // mục vừa nhận/đã khớp: KHÔNG gửi lại, KHÔNG coi là bị xoá
      const remoteDel = new Set(remote.filter(r => r.deleted).map(idOf));

      /* an toàn: đám mây báo xoá quá nhiều mục trên máy này thì hỏi trước */
      const toKill = remote.filter(r => r.deleted && local.has(idOf(r)) && !changed.has(idOf(r)));
      let allowKill = true;
      if (toKill.length >= 5 && toKill.length > local.size * 0.4 && !opts.force) {
        allowKill = !initial && (await dbConfirm(`Đám mây báo đã xoá ${toKill.length} mục đang có trên máy này. Xoá luôn trên máy?\n\nChọn Hủy để GIỮ dữ liệu và gửi lại lên đám mây.`));
      }

      let applied = 0, pushed = 0;
      for (const it of remote) {
        const id = idOf(it), have = local.get(id);
        if (it.deleted) {
          if (have && !changed.has(id) && allowKill) { await applyRemote(it); applied++; handled.add(id); }
          else if (have) { /* giữ bản trên máy, sẽ gửi lại */ }
          else handled.add(id);
          delete M.items[id];           // mục giữ lại trên máy sẽ được gửi lên lại ở bước dưới
          continue;
        }
        if (M.items[id] === it.sig) continue;
        if (have && have._sig === it.sig) { M.items[id] = it.sig; handled.add(id); continue; }
        if (have && changed.has(id) && !first) continue;            // máy này mới sửa -> giữ bản máy, đẩy lên sau
        await applyRemote(it); applied++; M.items[id] = it.sig; handled.add(id);
      }

      /* gửi thay đổi trên máy lên */
      for (const [id, e] of local) {
        if (handled.has(id) || M.items[id] === e._sig) continue;
        await pushItem(e, e._sig); M.items[id] = e._sig; pushed++;
      }

      /* mục đã bị xoá ở máy này -> xoá (mềm) trên đám mây */
      const gone = [...prevIds].filter(id => !local.has(id) && !handled.has(id) && !remoteDel.has(id) && !failed.has(id.split('\u0001')[0]) && M.items[id] !== undefined);
      let doKill = true;
      if (gone.length >= 5 && gone.length > prevIds.size * 0.4 && !opts.force) {
        doKill = !initial && (await dbConfirm(`Máy này vừa mất ${gone.length} mục. Xoá luôn trên đám mây?\n\nChọn Hủy để giữ dữ liệu trên đám mây (xem Tài khoản > Tải lại từ đám mây để lấy về).`));
      }
      if (doKill) for (const id of gone) { const [ns, k] = id.split('\u0001'); const r = await call(itemUrl(ns, k), { method: 'DELETE' }); if (r.ok) delete M.items[id]; }

      M.since = now; saveM(M); lastOk = Date.now(); lastErr = '';
      lastMsg = pushed || applied ? `↑${pushed} ↓${applied}` : 'không có thay đổi';
      setStatus('ok');
      if (applied) {
        const last = Number(sessionStorage.getItem('cfsync:rl') || 0);
        if ((initial || opts.reload) && Date.now() - last > 20000) { sessionStorage.setItem('cfsync:rl', String(Date.now())); location.reload(); }
        else toast('Có dữ liệu mới từ thiết bị khác. Bấm để tải lại.', () => location.reload());
      }
    } catch (e) { console.warn('[cfsync]', e); lastErr = String(e.message || e); setStatus('err'); }
    finally { busy = false; if (pending) { pending = false; setTimeout(() => sync(false), 800); } if ($('#cfs-acc')) renderAccount(); }
  }

  /* ---------- giao diện ---------- */
  const css = document.createElement('style');
  css.textContent = `
#cfs-btn{display:none!important}
#cfs-btn{position:fixed;right:12px;bottom:12px;z-index:2147483000;display:flex;align-items:center;gap:8px;font:600 13px/1.2 system-ui,sans-serif;background:#1f2937;color:#fff;border:0;border-radius:22px;padding:8px 14px 8px 9px;box-shadow:0 4px 16px #0006;cursor:pointer;max-width:75vw}
#cfs-btn.cf-err{background:#b91c1c}#cfs-btn.ok{background:#166534}
#cfs-btn .cf-av{width:24px;height:24px;border-radius:50%;background:#ffffff33;display:grid;place-items:center;font-size:13px;overflow:hidden;flex:0 0 24px}
#cfs-btn .cf-av img{width:100%;height:100%;object-fit:cover}
#cfs-ov{--bg:#f3f5f9;--card:#fff;--ink:#17233B;--mute:#5b6b82;--line:#e1e6ee;--acc:#1b2f7b;--soft:#eaeefb;--bad:#b91c1c;--ok:#15803d;color-scheme:light;position:fixed;inset:0;z-index:2147483001;background:var(--bg);display:flex;font:14px/1.5 var(--u-font,"Be Vietnam Pro",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif);color:var(--ink)}
#cfs-ov *{box-sizing:border-box}
#cfs-ov .cf-sheet{width:100%;height:100%;display:flex;flex-direction:column;overflow:hidden;background:var(--bg)}
#cfs-ov .cf-bar2{flex:0 0 auto;display:flex;align-items:center;gap:6px;height:56px;padding:0 10px 0 6px;padding-top:env(safe-area-inset-top,0px);background:#fff;border-bottom:1px solid var(--line)}
#cfs-ov .cf-bar2 button{flex:0 0 auto;display:flex;align-items:center;gap:6px;min-height:44px;padding:0 12px;border:0;background:none;color:var(--acc);font:600 15px/1 inherit;font-family:inherit;cursor:pointer;border-radius:10px}
#cfs-ov .cf-bar2 button:active{background:var(--soft)}
#cfs-ov .cf-bar2 b{flex:1;text-align:center;font-size:16px;margin-right:64px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
#cfs-ov .cf-page{flex:1 1 auto;min-height:0;overflow-y:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;width:100%;max-width:640px;margin:0 auto;padding:14px 14px calc(28px + env(safe-area-inset-bottom,0px))}
#cfs-ov .cf-page.cf-wide{max-width:800px}
#cfs-ov h2{margin:0;font-size:18px;font-weight:700;letter-spacing:-.01em}
#cfs-ov h3{margin:0 0 4px;font-size:14px;font-weight:700;color:var(--ink)}
#cfs-ov .cf-top{display:flex;align-items:center;gap:12px;margin-bottom:14px}
#cfs-ov .cf-big{width:56px;height:56px;border-radius:50%;background:var(--acc);color:#fff;display:grid;place-items:center;font-size:21px;font-weight:700;overflow:hidden;flex:0 0 56px;border:2px solid #fff;box-shadow:0 0 0 1px var(--line)}
#cfs-ov .cf-big img{width:100%;height:100%;object-fit:cover}
#cfs-ov .cf-who{min-width:0;flex:1}#cfs-ov .cf-who b{display:block;font-size:16px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#cfs-ov .cf-who span{color:var(--mute);font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:block}
#cfs-ov .cf-card{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:12px 16px 14px;margin-bottom:12px}
#cfs-ov .cf-row{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:8px 0}
#cfs-ov .cf-card h3+.cf-row{padding-top:4px}
#cfs-ov .cf-card .cf-row+.cf-row{border-top:1px solid var(--line)}
#cfs-ov .cf-card .cf-row.cf-leg{border-top:0;padding:3px 0}
#cfs-ov .cf-row small{color:var(--mute)}
#cfs-ov .cf-pill{display:inline-flex;align-items:center;gap:6px;padding:3px 10px;border-radius:99px;font-size:12px;font-weight:600;background:#e7f6ec;color:var(--ok)}
#cfs-ov .cf-pill::before{content:"";width:7px;height:7px;border-radius:50%;background:currentColor}
#cfs-ov .cf-pill.cf-err{background:#fdeaea;color:var(--bad);margin:0;font-size:12px}#cfs-ov .cf-pill.cf-busy{background:var(--soft);color:var(--acc)}
#cfs-ov button.cf-b{font-family:inherit;font-size:14px;font-weight:600;min-height:44px;padding:0 16px;border-radius:12px;border:1px solid var(--line);background:#fff;color:var(--ink);cursor:pointer;line-height:1.2}
#cfs-ov button.cf-b:active{background:var(--soft)}
#cfs-ov button.cf-b.cf-p{background:var(--acc);border-color:var(--acc);color:#fff}
#cfs-ov button.cf-b.cf-p:active{background:#14235f}
#cfs-ov button.cf-b.cf-d{color:var(--bad);border-color:#efc3c3;background:#fff}
#cfs-ov button.cf-b:disabled{opacity:.5}
#cfs-ov button:focus-visible,#cfs-ov input:focus-visible,#cfs-ov select:focus-visible{outline:2px solid var(--acc);outline-offset:2px}
#cfs-ov .cf-btns{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
#cfs-ov .cf-btns .cf-full{flex:1 1 100%}#cfs-ov .cf-btns .cf-half{flex:1 1 calc(50% - 4px)}
#cfs-ov .cf-meter{height:8px;border-radius:99px;background:#e9edf4;overflow:hidden;display:flex;margin:8px 0 10px}
#cfs-ov .cf-meter i{display:block;height:100%}
#cfs-ov .cf-leg{display:flex;align-items:center;gap:8px;font-size:13px}
#cfs-ov .cf-leg i{display:inline-block;width:9px;height:9px;border-radius:50%;margin-right:8px}
#cfs-ov .cf-sw{position:relative;width:48px;height:28px;flex:0 0 48px}
#cfs-ov .cf-sw input{opacity:0;position:absolute;inset:0;width:100%;height:100%;margin:0;z-index:2}
#cfs-ov .cf-sw span{position:absolute;inset:0;border-radius:99px;background:#cbd2de;transition:.2s}
#cfs-ov .cf-sw span::after{content:"";position:absolute;left:3px;top:3px;width:22px;height:22px;border-radius:50%;background:#fff;transition:.2s;box-shadow:0 1px 3px rgba(15,23,42,.3)}
#cfs-ov .cf-sw input:checked+span{background:var(--acc)}#cfs-ov .cf-sw input:checked+span::after{left:23px}
#cfs-ov .cf-tr{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:9px 0;border-top:1px solid var(--line)}
#cfs-ov .cf-tr div{min-width:0}#cfs-ov .cf-tr b{display:block;font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#cfs-ov .cf-tr small{color:var(--mute)}
#cfs-ov .cf-err{color:var(--bad);font-size:13px;margin:6px 0 0}
#cfs-ov .cf-hint{color:var(--mute);font-size:13px;margin:6px 0 0}
#cfs-ov .cf-note{background:#fff;border:1px solid var(--line);border-radius:12px;padding:10px 12px;color:var(--mute);font-size:12.5px;margin:14px 0 0}
#cfs-ov ul.cf-ft{list-style:none;padding:0;margin:12px 0 4px}#cfs-ov ul.cf-ft li{padding:6px 0 6px 28px;position:relative}
#cfs-ov ul.cf-ft li::before{content:"✓";position:absolute;left:0;top:7px;width:18px;height:18px;border-radius:50%;background:#dcfce7;color:var(--ok);font-size:11px;font-weight:700;display:grid;place-items:center}
#cfs-ov .cf-login{text-align:left}
#cfs-ov .cf-logo{width:48px;height:48px;border-radius:14px;background:var(--acc);color:#fff;display:grid;place-items:center;font-size:24px;margin:2px 0 12px}
#cfs-ov .cf-gwrap{min-height:44px;display:flex;justify-content:center;margin-top:14px}
#cfs-ov .cf-in{flex:1;min-width:0;font-family:inherit;font-size:14px;height:44px;padding:0 12px;border-radius:12px;border:1px solid var(--line);background:#fff;color:var(--ink);letter-spacing:.03em}
#cfs-ov .cf-in::placeholder{color:#97a3b6;letter-spacing:0}
#cfs-ov select.cf-in,#cfs-ov textarea.cf-in{letter-spacing:0}#cfs-ov textarea.cf-in{height:auto;padding:10px 12px}
#cfs-ov .cf-role{display:inline-flex;align-items:center;gap:6px;padding:4px 12px;border-radius:99px;font-weight:700;font-size:13px;background:#eef1f6;color:var(--ink);border:1px solid var(--line)}
#cfs-ov .cf-r-plus{background:#fef3c7;color:#92400e;border-color:#f5dc8a}#cfs-ov .cf-r-pro{background:#e0e9ff;color:#1e3a8a;border-color:#c3d3fb}#cfs-ov .cf-r-ultra{background:#ede9fe;color:#5b21b6;border-color:#d8cdfa}#cfs-ov .cf-r-admin{background:#fee2e2;color:#991b1b;border-color:#f6c0c0}#cfs-ov .cf-r-founder{background:#fff4d6;color:#7a4a00;border-color:#f1d28a}
#cfs-ov .cf-feat{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px}
#cfs-ov .cf-feat>div{display:flex;align-items:center;gap:8px;padding:9px 10px;border-radius:10px;background:var(--bg);font-size:13px;line-height:1.25;min-width:0}
#cfs-ov .cf-feat>div.off{color:var(--mute)}
#cfs-ov .cf-feat small{display:block;font-size:11px;color:var(--mute)}
#cfs-ov .cf-ic{flex:0 0 20px;width:20px;height:20px;border-radius:50%;display:grid;place-items:center;font-size:10px;font-style:normal;font-weight:700;background:#e6eaf1;color:var(--mute)}
#cfs-ov .cf-ic.on{background:#dcfce7;color:var(--ok);font-size:12px}
#cfs-ov .cf-card .cf-row.cf-redeem{border-top:1px solid var(--line);margin-top:12px;padding-top:12px}
#cfs-ov .cf-tabs{display:flex;gap:6px;overflow:auto;margin:0 0 12px;padding-bottom:2px}#cfs-ov .cf-tabs button{flex:0 0 auto;min-height:40px}
#cfs-ov .cf-tabs button.on{background:var(--acc);color:#fff;border-color:var(--acc)}
#cfs-ov .cf-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}
#cfs-ov .cf-stat{background:#fff;border:1px solid var(--line);border-radius:14px;padding:12px 14px}#cfs-ov .cf-stat b{display:block;font-size:22px;line-height:1.2}#cfs-ov .cf-stat small{color:var(--mute)}
#cfs-ov .cf-u{display:flex;align-items:center;gap:10px;padding:10px 0;border-top:1px solid var(--line);cursor:pointer}
#cfs-ov .cf-u .cf-av2{width:36px;height:36px;border-radius:50%;background:var(--acc);color:#fff;display:grid;place-items:center;font-weight:700;overflow:hidden;flex:0 0 36px}#cfs-ov .cf-u .cf-av2 img{width:100%;height:100%;object-fit:cover}
#cfs-ov .cf-u div{min-width:0;flex:1}#cfs-ov .cf-u b{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#cfs-ov .cf-u small{color:var(--mute);display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
#cfs-ov .cf-kv{display:grid;grid-template-columns:110px 1fr;gap:4px 10px;font-size:13px}#cfs-ov .cf-kv span:nth-child(odd){color:var(--mute)}#cfs-ov .cf-kv span{overflow-wrap:anywhere}
#cfs-ov pre.cf-pre{white-space:pre-wrap;word-break:break-word;background:var(--bg);border:1px solid var(--line);padding:10px;border-radius:12px;font:12px/1.5 ui-monospace,Menlo,monospace;max-height:50vh;overflow:auto}
#cfs-ov .cf-msg{padding:8px 10px;border-radius:12px;margin:6px 0;background:var(--bg);font-size:13px;white-space:pre-wrap;word-break:break-word}#cfs-ov .cf-msg.u{background:var(--soft)}#cfs-ov .cf-msg small{display:block;color:var(--mute);margin-bottom:2px}
#cfs-ov .cf-code{font:600 15px ui-monospace,Menlo,monospace;letter-spacing:.06em}
#cfs-ov .cf-bar{height:6px;border-radius:9px;background:var(--acc);min-width:2px}
#cfs-ov .cf-chk{display:flex;align-items:center;gap:8px;padding:6px 0}
#cfs-ov .cf-prev{max-width:100%;max-height:60vh;border-radius:12px;display:block;margin:8px auto}
@media(prefers-reduced-motion:reduce){#cfs-ov .cf-sw span,#cfs-ov .cf-sw span::after{transition:none}}
#cfs-toast{position:fixed;left:12px;right:12px;bottom:64px;z-index:2147483002;background:#17233B;color:#fff;border-radius:12px;padding:12px;font:14px system-ui,sans-serif;text-align:center;cursor:pointer;box-shadow:0 4px 16px #0006}`;
  document.head.appendChild(css);

  const btn = document.createElement('button'); btn.id = 'cfs-btn'; document.body.appendChild(btn);
  function setStatus(st) {
    btn.className = st === 'ok' ? 'ok' : st === 'err' ? 'err' : '';
    const ini = user ? ((user.name || user.email || '?')[0] || '?').toUpperCase() : '☁';
    const av = user && user.picture ? `<img src="${esc(user.picture)}" referrerpolicy="no-referrer" alt="">` : esc(ini);
    const txt = !user ? 'Đăng nhập' : st === 'syncing' ? 'Đang đồng bộ…' : st === 'err' ? 'Lỗi đồng bộ' : `Đã đồng bộ ${lastOk ? fmtT(lastOk) : ''}`;
    btn.innerHTML = `<span class="cf-av">${user ? av : '☁'}</span><span>${esc(txt)}</span>`;
    document.querySelectorAll('[data-cfs-open]').forEach(b => { b.textContent = user ? '☁ ' + (user.name || user.email || 'Tài khoản') + ' · ' + txt : '☁ Đăng nhập Google & đồng bộ'; });
    if ($('#cfs-acc')) renderAccount();
  }
  function toast(msg, fn) { let t = $('#cfs-toast'); if (t) t.remove(); t = document.createElement('div'); t.id = 'cfs-toast'; t.textContent = msg; t.onclick = () => { t.remove(); fn && fn(); }; document.body.appendChild(t); setTimeout(() => t.remove(), 14000); }
  function overlay(inner, title, backFn) {
    closeOv(); const o = document.createElement('div'); o.id = 'cfs-ov';
    o.innerHTML = `<div class="cf-sheet"><div class="cf-bar2"><button type="button" id="cf-back" aria-label="Quay lại">‹ Quay lại</button><b>${esc(title || '')}</b></div><div class="cf-page">${inner}</div></div>`;
    $('#cf-back', o).onclick = backFn || closeOv;
    document.body.appendChild(o); try { document.documentElement.style.overflow = 'hidden'; } catch { } return o;
  }
  const closeOv = () => { const o = $('#cfs-ov'); if (o) o.remove(); try { document.documentElement.style.overflow = ''; } catch { } };

  /* --- đăng nhập --- */
  async function showLogin() {
    const o = overlay(`<div class="cf-login"><div class="cf-logo">☁</div><h2>Lưu dữ liệu lên đám mây</h2>
      <p class="cf-hint">Đăng nhập Google để dữ liệu không bị mất khi thoát ra vào lại, và dùng được trên mọi thiết bị.</p>
      <ul class="cf-ft"><li>Lưu chữ, cuộc chat, tiến độ học</li><li>Lưu cả file và ảnh trong kho</li><li>Tự đồng bộ, có thùng rác khôi phục 30 ngày</li></ul>
      <div id="cfs-g" class="cf-gwrap"></div><p class="cf-err" id="cfs-err"></p>
      <p class="cf-note">Quản trị viên của dịch vụ có thể xem dữ liệu lưu trên đám mây của bạn (chat, tệp) để hỗ trợ và quản lý; mọi lần xem đều được ghi nhật ký.</p>
      <div class="cf-btns"><button class="cf-b cf-full" id="cfs-x">Để sau (chỉ lưu trên máy này)</button></div></div>`, 'Đăng nhập');
    $('#cfs-x', o).onclick = closeOv;
    try {
      const cfg = await (await call('/api/config')).json();
      if (!window.google || !google.accounts) await new Promise((ok, no) => { const s = document.createElement('script'); s.src = 'https://accounts.google.com/gsi/client'; s.async = true; s.onload = ok; s.onerror = () => no(new Error('Không tải được thư viện Google')); document.head.appendChild(s); });
      google.accounts.id.initialize({
        client_id: cfg.clientId,
        callback: async (resp) => {
          const r = await call('/auth/google', { method: 'POST', body: JSON.stringify({ credential: resp.credential }), headers: { 'content-type': 'application/json' } });
          const j = await r.json().catch(() => ({}));
          if (!r.ok) { const e = $('#cfs-err'); if (e) e.textContent = j.error || 'Lỗi đăng nhập'; return; }
          setTok(j.token); user = j.user; closeOv(); setStatus('syncing'); loadMe(); sync(true);
        },
      });
      google.accounts.id.renderButton($('#cfs-g', o), { theme: 'outline', size: 'large', text: 'signin_with', locale: 'vi', width: 280 });
    } catch (e) { const el = $('#cfs-err'); if (el) el.textContent = String(e.message || e); }
  }

  /* --- trang tài khoản --- */
  let trash = null, showTrash = false, accMsg = '';
  async function loadMe() { try { const r = await call('/api/me'); if (r.ok) { me = await r.json(); emitMe(); } } catch { } }
  let usage = null;
  async function loadUsage() { try { const r = await call('/api/usage'); if (r.ok) usage = await r.json(); } catch { } }
  async function loadTrash() { try { const r = await call('/api/trash'); if (r.ok) trash = (await r.json()).items; } catch { } }
  async function openAccount() {
    overlay('<div id="cfs-acc"></div>', 'Tài khoản'); renderAccount();
    await loadMe(); renderAccount();
    await loadUsage(); renderAccount();
  }
  function roleCard() {
    if (!me || !me.role) return '';
    const feats = me.features || {}, until = me.until ? 'đến ' + new Date(me.until).toLocaleDateString('vi-VN') : (me.role === 'free' ? '' : 'vĩnh viễn');
    const need = { 0: 'Thường', 1: 'Plus', 2: 'Pro', 3: 'Ultra' };
    const fl = '<div class="cf-feat">' + Object.keys(feats).map(k => `<div class="${me.feat[k] ? '' : 'off'}"><i class="cf-ic ${me.feat[k] ? 'on' : ''}">${me.feat[k] ? '✓' : '🔒'}</i><span>${esc(feats[k].label)}${feats[k].min > 0 ? `<small>từ ${need[feats[k].min]}</small>` : ''}</span></div>`).join('') + '</div>';
    return `<div class="cf-card"><h3>Hạng tài khoản</h3>
      <div class="cf-row"><span class="cf-role cf-r-${me.role}">${ICON[me.role] || ''} ${esc(me.roleName)}</span><small>${esc(until)}</small></div>
      ${fl}
      ${me.rank < 5 ? `<div class="cf-row cf-redeem"><input id="a-code" placeholder="Nhập mã nâng cấp: XXXX-XXXX-XXXX" autocapitalize="characters" autocomplete="off" class="cf-in"><button class="cf-b cf-p" id="a-redeem">Nhập</button></div>` : ''}
      <div class="cf-btns"><button class="cf-b cf-full" id="a-files">📁 Tệp của tôi (xem &amp; tải)</button></div>
      ${me.rank >= 4 ? `<div class="cf-btns"><button class="cf-b cf-p cf-full" id="a-adm">🛡️ Mở trang quản trị</button></div>` : ''}
    </div>`;
  }
  function usageCard() {
    if (!usage) return '<div class="cf-card"><h3>📊 Hạn mức hôm nay</h3><p class="cf-hint">Đang tải…</p></div>';
    const NAMES = { nl: 'Netlify (AI)', px: 'Cổng AI khác (Cohere, Z.ai, Groq…)', pk: 'Pollinations', br: 'Trình duyệt AI (số thao tác)' }, rows = usage.rows || [], today = usage.today, day = {};
    rows.forEach(r => { if (NAMES[r.kind]) { (day[r.day] = day[r.day] || {})[r.kind] = r.n; } });
    const days = Object.keys(day).sort().reverse().slice(0, 7), t = day[today] || {};
    const b = usage.br || {}, pc = (a, z) => z ? Math.min(100, a / z * 100) : 0;
    const bar = (a, z, col) => `<div class="cf-meter"><i style="width:${pc(a, z)}%;background:${col}"></i></div>`;
    let h = '<div class="cf-card"><h3>📊 Hạn mức hôm nay</h3>';
    h += `<div class="cf-row"><span>Trình duyệt AI (bạn)</span><small>${b.usedSec || 0} / ${b.capSec || 0} giây</small></div>${bar(b.usedSec || 0, b.capSec || 0, '#2563eb')}`;
    h += `<div class="cf-row"><span>Trình duyệt AI (cả hệ thống)</span><small>${b.allSec || 0} / ${b.allCapSec || 0} giây</small></div>${bar(b.allSec || 0, b.allCapSec || 0, '#14b8a6')}`;
    h += '<p class="cf-hint">Hạn mức trình duyệt tính theo thời gian chạy, đặt lại mỗi ngày (giờ UTC). Cloudflare chỉ cho 10 phút/ngày miễn phí.</p>';
    h += '<div class="cf-row"><b>Số lượt gọi qua máy chủ hôm nay</b></div>';
    const ks = Object.keys(NAMES); let any = 0;
    ks.forEach(k => { if (t[k]) { any = 1; h += `<div class="cf-row cf-leg"><span>${esc(NAMES[k])}</span><small>${t[k]} lượt</small></div>`; } });
    if (!any) h += '<p class="cf-hint">Hôm nay chưa có lượt nào.</p>';
    if (days.length > 1) {
      h += '<div class="cf-row" style="margin-top:6px"><b>7 ngày gần nhất</b></div>';
      days.forEach(d => { const o = day[d], tot = ks.reduce((a, k) => a + (o[k] || 0), 0); h += `<div class="cf-row cf-leg"><span>${esc(d)}</span><small>${tot} lượt</small></div>`; });
    }
    h += '<p class="cf-hint">Hạn mức của từng khóa AI (Gemini, xKiro…) xem ở 🎭 → 📊 Thống kê khóa &amp; hạn mức.</p></div>';
    return h;
  }
  function renderAccount() {
    const box = $('#cfs-acc'); if (!box || !user) return;
    if (me && me.banned) { box.innerHTML = `<div class="cf-card"><h3>🔒 Tài khoản bị khóa</h3><p>${esc(me.reason || 'Liên hệ quản trị viên để biết thêm.')}</p><div class="cf-btns"><button class="cf-b" id="a-out2">Đăng xuất</button><button class="cf-b" id="a-close2">Đóng</button></div></div>`; $('#a-close2', box).onclick = closeOv; $('#a-out2', box).onclick = () => { setTok(null); user = null; me = null; closeOv(); setStatus(''); emitMe(); }; return; }
    const used = me ? me.used : 0, quota = me ? me.quota : 1, pct = Math.min(100, used / quota * 100);
    const itB = me ? me.items.size : 0, flB = me ? me.files.size : 0;
    const stat = busy ? '<span class="cf-pill cf-busy">Đang đồng bộ…</span>' : lastErr ? '<span class="cf-pill cf-err">Lỗi</span>' : lastOk ? `<span class="cf-pill">Đã đồng bộ ${fmtT(lastOk)}</span>` : '<span class="cf-pill cf-busy">Chưa đồng bộ</span>';
    const pic = user.picture ? `<img src="${esc(user.picture)}" referrerpolicy="no-referrer" alt="">` : esc(((user.name || user.email || '?')[0] || '?').toUpperCase());
    box.innerHTML = `
    <div class="cf-top"><div class="cf-big">${pic}</div><div class="cf-who"><b>${esc(user.name || 'Tài khoản')}</b><span>${esc(user.email)}</span></div></div>
    ${roleCard()}
    <div class="cf-card"><h3>Đồng bộ</h3>
      <div class="cf-row"><span>Trạng thái</span>${stat}</div>
      ${lastMsg ? `<div class="cf-row"><small>Lần gần nhất</small><small>${esc(lastMsg)}</small></div>` : ''}
      <div class="cf-row"><span>Tự động đồng bộ<br><small>Mỗi 30 giây khi đang mở app</small></span><label class="cf-sw"><input type="checkbox" id="a-auto" ${autoOn() ? 'checked' : ''}><span></span></label></div>
      ${lastErr ? `<p class="cf-err">${esc(lastErr)}</p>` : ''}
      <div class="cf-btns"><button class="cf-b cf-p cf-full" id="a-sync" ${busy ? 'disabled' : ''}>Đồng bộ ngay</button><button class="cf-b cf-half" id="a-pull" ${busy ? 'disabled' : ''}>Tải lại từ đám mây</button><button class="cf-b cf-half" id="a-push" ${busy ? 'disabled' : ''}>Gửi lại tất cả lên</button></div>
      <p class="cf-hint">“Tải lại từ đám mây” lấy bản trên đám mây ghi đè bản trên máy này. “Gửi lại tất cả lên” đẩy toàn bộ dữ liệu máy này lên đám mây.</p></div>
    <div class="cf-card"><h3>Dung lượng</h3>
      <div class="cf-row"><b>${fmtMB(used)}</b><small>trên ${fmtMB(quota)} (${pct.toFixed(pct < 10 ? 1 : 0)}%)</small></div>
      <div class="cf-meter"><i style="width:${itB / quota * 100}%;background:#2563eb"></i><i style="width:${flB / quota * 100}%;background:#14b8a6"></i></div>
      <div class="cf-row cf-leg"><span><i style="background:#2563eb"></i>Chữ &amp; dữ liệu${me ? ` · ${me.items.n} mục` : ''}</span><small>${fmtMB(itB)}</small></div>
      <div class="cf-row cf-leg"><span><i style="background:#14b8a6"></i>File &amp; ảnh${me ? ` · ${me.files.n} tệp` : ''}</span><small>${fmtMB(flB)}</small></div></div>
    ${usageCard()}
    <div class="cf-card"><h3>Thùng rác</h3>
      <div class="cf-row"><span>Mục đã xoá${me ? ` · ${me.trash}` : ''}<br><small>Giữ 30 ngày rồi xoá hẳn</small></span><button class="cf-b" id="a-trash">${showTrash ? 'Ẩn' : 'Xem'}</button></div>
      ${showTrash ? (trash === null ? '<p class="cf-hint">Đang tải…</p>' : trash.length ? trash.map((t, i) => `<div class="cf-tr"><div><b>${esc(LABEL[t.ns] || t.ns)} · ${esc(String(t.k).replace(/^"|"$/g, '').slice(0, 40))}</b><small>${fmtD(t.updated)} · ${fmtMB(t.size)}</small></div><button class="cf-b" data-rs="${i}">Khôi phục</button></div>`).join('') : '<p class="cf-hint">Thùng rác trống.</p>') : ''}</div>
    <div class="cf-card"><h3>Sao lưu</h3>
      <p class="cf-hint" style="margin-top:2px">Tải toàn bộ dữ liệu trên máy này về thành một file để cất giữ, hoặc nhập lại từ file đó.</p>
      <div class="cf-btns"><button class="cf-b cf-half" id="a-exp">Tải bản sao lưu</button><button class="cf-b cf-half" id="a-imp">Nhập từ sao lưu</button><input type="file" id="a-file" accept=".json,application/json" hidden></div></div>
    ${accMsg ? `<p class="cf-hint">${esc(accMsg)}</p>` : ''}
    <div class="cf-card"><h3>Tài khoản</h3>
      <div class="cf-btns" style="margin-top:4px"><button class="cf-b cf-full" id="a-out">Đăng xuất</button><button class="cf-b cf-d cf-full" id="a-del">Xoá toàn bộ dữ liệu trên đám mây</button></div>
      <p class="cf-hint">Đăng xuất chỉ ngắt kết nối, dữ liệu trên máy vẫn còn.</p></div>`;
    const on = (id, fn) => { const e = $(id, box); if (e) e.onclick = fn; };
    on('#a-close', closeOv);
    on('#a-adm', openAdmin);
    on('#a-files', () => { closeOv(); if (typeof FM !== 'undefined') FM.show(); });
    on('#a-redeem', async () => {
      const inp = $('#a-code', box), code = inp.value.trim(); if (!code) return; const b = $('#a-redeem', box); b.disabled = true;
      const r = await call('/api/redeem', { method: 'POST', body: JSON.stringify({ code }), headers: { 'content-type': 'application/json' } });
      const j = await r.json().catch(() => ({}));
      accMsg = r.ok ? `🎉 Đã nâng cấp lên ${j.roleName}${j.until ? ' đến ' + new Date(j.until).toLocaleDateString('vi-VN') : ' (vĩnh viễn)'}` : (j.error || 'Mã không hợp lệ');
      await loadMe(); renderAccount();
    });
    $('#a-auto', box).onchange = (e) => setAuto(e.target.checked);
    on('#a-sync', () => sync(false, { reload: true }).then(loadMe).then(renderAccount));
    on('#a-pull', async () => { if ((await dbConfirm('Lấy toàn bộ dữ liệu từ đám mây và ghi đè bản trên máy này (với các mục trùng)?'))) sync(false, { mode: 'pull', reload: true, force: true }).then(loadMe).then(renderAccount); });
    on('#a-push', async () => { if ((await dbConfirm('Gửi toàn bộ dữ liệu trên máy này lên đám mây (ghi đè các mục trùng)?'))) sync(false, { mode: 'push', force: true }).then(loadMe).then(renderAccount); });
    on('#a-trash', async () => { showTrash = !showTrash; if (showTrash) { trash = null; renderAccount(); await loadTrash(); } renderAccount(); });
    box.querySelectorAll('[data-rs]').forEach(b => b.onclick = async () => {
      const t = trash[+b.dataset.rs]; b.disabled = true;
      const r = await call('/api/restore', { method: 'POST', body: JSON.stringify({ ns: t.ns, k: t.k }), headers: { 'content-type': 'application/json' } });
      accMsg = r.ok ? 'Đã khôi phục. Đang đồng bộ về máy…' : 'Không khôi phục được.';
      await loadTrash(); await loadMe(); renderAccount(); if (r.ok) sync(false, { reload: true });
    });
    on('#a-exp', exportBackup);
    on('#a-imp', () => $('#a-file', box).click());
    $('#a-file', box).onchange = (e) => e.target.files[0] && importBackup(e.target.files[0]);
    on('#a-out', async () => { if ((await dbConfirm('Đăng xuất? Dữ liệu trên máy vẫn được giữ.'))) { setTok(null); user = null; me = null; closeOv(); setStatus(''); emitMe(); } });
    on('#a-del', async () => {
      if (!(await dbConfirm('XOÁ TOÀN BỘ dữ liệu của bạn trên đám mây? Không khôi phục được. Dữ liệu trên máy này không bị xoá.'))) return;
      const t = (await dbPrompt('Gõ XOA để xác nhận:')); if (t !== 'XOA') return;
      const r = await call('/api/purge', { method: 'POST', body: JSON.stringify({ confirm: 'XOA' }), headers: { 'content-type': 'application/json' } });
      if (r.ok) { try { localStorage.removeItem(mkey()); } catch { } accMsg = 'Đã xoá dữ liệu trên đám mây.'; await loadMe(); renderAccount(); } else accMsg = 'Không xoá được.';
      renderAccount();
    });
  }

  /* --- Trang quản trị (admin trở lên) --- */
  const adm = { tab: 'over', q: '', uid: null, ns: null, view: null, data: null, msg: '' };
  const aj = async (p, o = {}) => { const r = await call('/api/admin/' + p, o.body ? { ...o, headers: { 'content-type': 'application/json' } } : o); const j = await r.json().catch(() => ({})); if (!r.ok) throw new Error(j.error || 'Lỗi'); return j; };
  const post = (p, b) => aj(p, { method: 'POST', body: JSON.stringify(b) });
  const ago = (t) => { if (!t) return 'chưa từng'; const m = (Date.now() - t) / 60000; return m < 1 ? 'vừa xong' : m < 60 ? Math.round(m) + ' phút trước' : m < 1440 ? Math.round(m / 60) + ' giờ trước' : Math.round(m / 1440) + ' ngày trước'; };
  const rname = (r) => (me && me.roles.find(x => x.id === r) || { name: r }).name;
  const roleTag = (r) => `<span class="cf-role cf-r-${r}">${ICON[r] || ''} ${esc(rname(r))}</span>`;
  const avatar = (u) => u.picture ? `<img src="${esc(u.picture)}" referrerpolicy="no-referrer" alt="">` : esc(((u.name || u.email || '?')[0] || '?').toUpperCase());
  async function openAdmin() { adm.tab = 'over'; adm.uid = null; adm.view = null; const o = overlay('<div id="cfs-adm"></div>', 'Quản trị', () => { closeOv(); openAccount(); }); $('.cf-page', o).classList.add('cf-wide'); renderAdmin(); }
  async function renderAdmin() {
    const box = $('#cfs-adm'); if (!box) return;
    const tabs = [['over', 'Tổng quan'], ['users', 'Người dùng'], ['codes', 'Mã nâng cấp'], ['log', 'Nhật ký']];
    box.innerHTML = `<div class="cf-tabs">${tabs.map(t => `<button class="cf-b ${adm.tab === t[0] && !adm.uid ? 'on' : ''}" data-t="${t[0]}">${t[1]}</button>`).join('')}</div><div id="ad-body"><p class="cf-hint">Đang tải…</p></div>`;
    box.querySelectorAll('[data-t]').forEach(b => b.onclick = () => { adm.tab = b.dataset.t; adm.uid = null; adm.view = null; renderAdmin(); });
    const body = $('#ad-body', box);
    try {
      if (adm.uid) await adminUser(body);
      else if (adm.tab === 'over') await adminOver(body);
      else if (adm.tab === 'users') await adminUsers(body);
      else if (adm.tab === 'codes') await adminCodes(body);
      else await adminLog(body);
    } catch (e) { body.innerHTML = `<p class="cf-err">${esc(e.message || e)}</p>`; }
  }
  async function adminOver(body) {
    const d = await aj('overview'), u = d.users || {}, use = d.usage || [];
    const nl = {}; use.filter(x => x.kind === 'nl').forEach(x => nl[x.day] = x.n); const days = []; for (let i = 13; i >= 0; i--) days.push(new Date(Date.now() - i * 864e5).toISOString().slice(0, 10));
    const mx = Math.max(1, ...days.map(x => nl[x] || 0)), tot = d.storage.total, lim = 500 * 1048576;
    body.innerHTML = `<div class="cf-grid">
      <div class="cf-stat"><b>${u.n || 0}</b><small>Tài khoản</small></div><div class="cf-stat"><b>${u.a1 || 0}</b><small>Hoạt động 24 giờ</small></div>
      <div class="cf-stat"><b>${u.a7 || 0}</b><small>Hoạt động 7 ngày</small></div><div class="cf-stat"><b>${u.new7 || 0}</b><small>Mới trong 7 ngày</small></div>
      <div class="cf-stat"><b>${u.bn || 0}</b><small>Đang bị khóa</small></div><div class="cf-stat"><b>${d.codes.u || 0}/${d.codes.n || 0}</b><small>Mã đã dùng / đã tạo</small></div></div>
    <div class="cf-card" style="margin-top:12px"><h3>Theo hạng</h3>${Object.keys(d.byRole).sort((a, b) => me.roles.findIndex(x => x.id === a) - me.roles.findIndex(x => x.id === b)).map(r => `<div class="cf-row">${roleTag(r)}<b>${d.byRole[r]}</b></div>`).join('')}</div>
    <div class="cf-card"><h3>Dung lượng cơ sở dữ liệu</h3><div class="cf-row"><b>${fmtMB(tot)}</b><small>giới hạn miễn phí D1 ≈ 500 MB</small></div>
      <div class="cf-meter"><i style="width:${Math.min(100, tot / lim * 100)}%;background:${tot / lim > .8 ? '#dc2626' : '#2563eb'}"></i></div>
      <div class="cf-row"><small>${d.items.n} mục dữ liệu · ${d.storage.files.n} tệp (${fmtMB(d.storage.files.s)})</small></div></div>
    <div class="cf-card"><h3>Lượt dùng Netlify (14 ngày)</h3><div style="display:flex;align-items:flex-end;gap:3px;height:70px">${days.map(x => `<div style="flex:1;display:flex;flex-direction:column;justify-content:flex-end;height:100%" title="${x}: ${nl[x] || 0}"><div class="cf-bar" style="height:${(nl[x] || 0) / mx * 100}%"></div></div>`).join('')}</div>
      <div class="cf-row"><small>${days[0].slice(5)}</small><small>Tổng: ${days.reduce((a, x) => a + (nl[x] || 0), 0)} lượt</small><small>${days[13].slice(5)}</small></div></div>`;
  }
  async function adminUsers(body) {
    body.innerHTML = `<input class="cf-in" id="ad-q" placeholder="Tìm theo tên / email" style="width:100%;box-sizing:border-box" value="${esc(adm.q)}"><div id="ad-list"><p class="cf-hint">Đang tải…</p></div>`;
    const load = async () => {
      const d = await aj('users?q=' + encodeURIComponent(adm.q)), list = $('#ad-list', body);
      list.innerHTML = d.users.length ? d.users.map(u => `<div class="cf-u" data-id="${esc(u.id)}"><div class="cf-av2">${avatar(u)}</div><div><b>${esc(u.name || u.email)} ${u.banned ? '🔒' : ''}</b><small>${esc(u.email)} · ${ago(u.last_seen)}${u.ip ? ' · ' + esc(u.ip) : ''}</small><small>${fmtMB(u.isize + u.fsize)} · ${u.items} mục · ${u.files} tệp</small></div>${roleTag(u.eff)}</div>`).join('') : '<p class="cf-hint">Không có ai.</p>';
      list.querySelectorAll('[data-id]').forEach(el => el.onclick = () => { adm.uid = el.dataset.id; adm.ns = null; adm.view = null; renderAdmin(); });
    };
    let t; $('#ad-q', body).oninput = (e) => { adm.q = e.target.value; clearTimeout(t); t = setTimeout(() => load().catch(() => { }), 300); };
    await load();
  }
  const FNAME = { netlify: 'Khóa Netlify', pollinations: 'Khóa Pollinations', sync: 'Đồng bộ', upload: 'Tải tệp lên', ai: 'Chat AI', search: 'Tra mạng', tts: 'Đọc to' };
  async function adminUser(body) {
    const d = await aj('user?id=' + encodeURIComponent(adm.uid)), u = d.user;
    const mine = me.rank, canEdit = u.email !== user.email && rankOfRole(u.eff) < mine;
    const opts = me.roles.filter(r => r.id !== 'founder' && rankOfRole(r.id) < mine).map(r => `<option value="${r.id}" ${r.id === u.eff ? 'selected' : ''}>${esc(r.name)}</option>`).join('');
    const ed = canEdit;
    body.innerHTML = `<div class="cf-btns" style="margin:0 0 10px"><button class="cf-b" id="ad-back">← Danh sách</button></div>
    <div class="cf-top"><div class="cf-big">${avatar(u)}</div><div class="cf-who"><b>${esc(u.name || '')}</b><span>${esc(u.email)}</span>${roleTag(u.eff)}</div></div>
    <div class="cf-card"><h3>Thông tin</h3><div class="cf-kv">
      <span>ID</span><span>${esc(u.id)}</span><span>Địa chỉ IP</span><span>${esc(u.ip || '—')} ${u.country ? '(' + esc(u.country) + ')' : ''}</span><span>Thiết bị</span><span>${esc(u.ua || '—')}</span>
      <span>Hoạt động</span><span>${ago(u.last_seen)}</span><span>Tạo lúc</span><span>${u.created ? new Date(u.created).toLocaleString('vi-VN') : '—'}</span><span>Số lần đăng nhập</span><span>${u.logins || 0}</span>
      <span>Hạng gốc</span><span>${esc(rname(u.role || 'free'))}${u.role_until ? ' · đến ' + new Date(u.role_until).toLocaleDateString('vi-VN') : ''}</span>${u.banned ? `<span>Khóa</span><span>${esc(u.ban_reason || 'có')}</span>` : ''}</div></div>
    ${ed ? `<div class="cf-card"><h3>Quản lý</h3>
      <div class="cf-row"><select class="cf-in" id="ad-role">${opts}</select><input class="cf-in" id="ad-days" type="number" min="0" placeholder="Số ngày (0 = vĩnh viễn)" style="max-width:150px"><button class="cf-b cf-p" id="ad-setrole">Đặt hạng</button></div>
      <h3 style="margin-top:12px">Chặn tính năng riêng</h3>${Object.keys(FNAME).map(k => `<label class="cf-chk"><input type="checkbox" data-deny="${k}" ${u.deny.includes(k) ? 'checked' : ''}> ${FNAME[k]}</label>`).join('')}
      <div class="cf-btns"><button class="cf-b" id="ad-savedeny">Lưu chặn</button></div>
      <h3 style="margin-top:12px">Khóa tài khoản</h3><div class="cf-row"><input class="cf-in" id="ad-reason" placeholder="Lý do" value="${esc(u.ban_reason || '')}"><button class="cf-b ${u.banned ? '' : 'cf-d'}" id="ad-ban">${u.banned ? 'Mở khóa' : 'Khóa'}</button></div>
      <h3 style="margin-top:12px">Ghi chú nội bộ</h3><div class="cf-row"><input class="cf-in" id="ad-note" value="${esc(u.note || '')}"><button class="cf-b" id="ad-savenote">Lưu</button></div></div>` : '<p class="cf-hint">Bạn không đủ quyền chỉnh tài khoản này.</p>'}
    ${adm.msg ? `<p class="cf-hint">${esc(adm.msg)}</p>` : ''}
    <div class="cf-card"><h3>Lịch sử IP</h3>${d.ips.length ? d.ips.map(i => `<div class="cf-tr"><div><b>${esc(i.ip)} ${i.country ? '· ' + esc(i.country) : ''}</b><small>${new Date(i.t).toLocaleString('vi-VN')} · ${esc((i.ua || '').slice(0, 70))}</small></div></div>`).join('') : '<p class="cf-hint">Chưa có.</p>'}</div>
    <div class="cf-card"><h3>Dữ liệu (${fmtMB(d.ns.reduce((a, x) => a + x.s, 0))})</h3>${d.ns.map(n => `<div class="cf-tr"><div><b>${esc(LABEL[n.ns] || n.ns)}</b><small>${n.n} mục · ${fmtMB(n.s)}</small></div><button class="cf-b" data-ns="${esc(n.ns)}">Xem</button></div>`).join('')}<div class="cf-btns"><button class="cf-b" id="ad-files">📁 Xem tệp / ảnh / video</button></div></div>
    <div id="ad-sub"></div>`;
    $('#ad-back', body).onclick = () => { adm.uid = null; renderAdmin(); };
    const act = async (fn, ok) => { try { await fn(); adm.msg = ok; } catch (e) { adm.msg = 'Lỗi: ' + e.message; } renderAdmin(); };
    if (ed) {
      $('#ad-setrole', body).onclick = () => act(() => post('user', { id: u.id, role: $('#ad-role', body).value, days: Number($('#ad-days', body).value) || 0 }), 'Đã đặt hạng');
      $('#ad-savedeny', body).onclick = () => act(() => post('user', { id: u.id, deny: [...body.querySelectorAll('[data-deny]')].filter(c => c.checked).map(c => c.dataset.deny) }), 'Đã lưu chặn tính năng');
      $('#ad-ban', body).onclick = async () => { if (!u.banned && !(await dbConfirm('Khóa tài khoản này?'))) return; act(() => post('user', { id: u.id, banned: !u.banned, reason: $('#ad-reason', body).value }), u.banned ? 'Đã mở khóa' : 'Đã khóa'); };
      $('#ad-savenote', body).onclick = () => act(() => post('user', { id: u.id, note: $('#ad-note', body).value }), 'Đã lưu ghi chú');
    }
    body.querySelectorAll('[data-ns]').forEach(b => b.onclick = () => adminItems(u, b.dataset.ns));
    $('#ad-files', body).onclick = () => adminFiles(u);
  }
  const rankOfRole = (r) => (me.roles || []).findIndex(x => x.id === r);
  async function adminItems(u, ns) {
    const sub = $('#ad-sub'); sub.innerHTML = '<p class="cf-hint">Đang tải…</p>';
    const d = await aj('items?uid=' + encodeURIComponent(u.id) + '&ns=' + encodeURIComponent(ns));
    sub.innerHTML = `<div class="cf-card"><h3>${esc(LABEL[ns] || ns)}</h3>${d.items.map((it, i) => `<div class="cf-tr"><div><b>${esc(String(it.k).replace(/^"|"$/g, '').slice(0, 50))}${it.deleted ? ' 🗑' : ''}</b><small>${new Date(it.updated).toLocaleString('vi-VN')} · ${fmtMB(it.size)}</small></div><button class="cf-b" data-i="${i}">Mở</button></div>`).join('') || '<p class="cf-hint">Trống.</p>'}<div id="ad-item"></div></div>`;
    sub.querySelectorAll('[data-i]').forEach(b => b.onclick = async () => {
      const it = d.items[+b.dataset.i], out = $('#ad-item', sub); out.innerHTML = '<p class="cf-hint">Đang tải…</p>';
      try {
        const r = await call('/api/admin/item?uid=' + encodeURIComponent(u.id) + '&ns=' + encodeURIComponent(it.ns) + '&k=' + encodeURIComponent(it.k)); if (!r.ok) throw new Error((await r.json().catch(() => ({}))).error || 'Lỗi');
        const j = await r.json(), v = j && j.v; let h;
        if (it.ns === 'idb:dc-chat-history/chats' && v && Array.isArray(v.msgs)) h = `<h3>${esc(v.title || 'Cuộc chat')}</h3>` + v.msgs.map(m => `<div class="cf-msg ${m.r === 'user' ? 'u' : ''}"><small>${esc(m.r)}${m.model ? ' · ' + esc(m.model) : ''}</small>${esc(m.t || '')}</div>`).join('');
        else { let t = typeof v === 'string' ? v : JSON.stringify(v, null, 2); const big = t.length > 60000; h = `<pre class="cf-pre">${esc(big ? t.slice(0, 60000) + '\n… (còn ' + (t.length - 60000) + ' ký tự)' : t)}</pre>`; }
        out.innerHTML = h;
      } catch (e) { out.innerHTML = `<p class="cf-err">${esc(e.message)}</p>`; }
    });
    sub.scrollIntoView({ behavior: 'smooth' });
  }
  async function fetchBlob(uid, b) {
    const parts = [];
    for (let i = 0; i < Math.max(1, b.parts); i++) { const r = await call('/api/admin/blob?uid=' + encodeURIComponent(uid) + '&hash=' + b.hash + '&n=' + i); if (!r.ok) throw new Error('thiếu phần file'); parts.push(await (await fetch('data:application/octet-stream;base64,' + await r.text())).blob()); }
    return new Blob(parts, { type: b.type || 'application/octet-stream' });
  }
  const saveBlob = (blob, name) => { const u = URL.createObjectURL(blob), a = document.createElement('a'); a.href = u; a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(u), 8000); };
  async function adminFiles(u) {
    const sub = $('#ad-sub'); sub.innerHTML = '<p class="cf-hint">Đang tải…</p>';
    const d = await aj('blobs?uid=' + encodeURIComponent(u.id));
    const ic = (t) => /^image/.test(t) ? '🖼️' : /^video/.test(t) ? '🎬' : /^audio/.test(t) ? '🎵' : /pdf/.test(t) ? '📕' : '📄';
    sub.innerHTML = `<div class="cf-card"><h3>Tệp (${d.blobs.length})</h3>${d.blobs.map((b, i) => `<div class="cf-tr"><div><b>${ic(b.type || '')} ${esc(b.type || 'không rõ')}</b><small>${fmtMB(b.size)} · ${new Date(b.created).toLocaleString('vi-VN')} · ${b.hash.slice(0, 8)}</small></div><span><button class="cf-b" data-v="${i}">Xem</button> <button class="cf-b" data-d="${i}">Tải</button></span></div>`).join('') || '<p class="cf-hint">Chưa có tệp.</p>'}<div id="ad-prev"></div></div>`;
    sub.querySelectorAll('[data-v]').forEach(btn => btn.onclick = async () => {
      const b = d.blobs[+btn.dataset.v], p = $('#ad-prev', sub); p.innerHTML = '<p class="cf-hint">Đang tải tệp…</p>';
      try {
        const blob = await fetchBlob(u.id, b), url = URL.createObjectURL(blob), t = b.type || '';
        p.innerHTML = /^image/.test(t) ? `<img class="cf-prev" src="${url}">` : /^video/.test(t) ? `<video class="cf-prev" controls src="${url}"></video>` : /^audio/.test(t) ? `<audio controls src="${url}" style="width:100%"></audio>` : /pdf/.test(t) ? `<iframe class="cf-prev" style="width:100%;height:60vh;border:0" src="${url}"></iframe>` : /^text|json|xml|javascript/.test(t) ? `<pre class="cf-pre">${esc((await blob.text()).slice(0, 60000))}</pre>` : '<p class="cf-hint">Không xem trước được định dạng này, hãy bấm Tải.</p>';
      } catch (e) { p.innerHTML = `<p class="cf-err">${esc(e.message)}</p>`; }
    });
    sub.querySelectorAll('[data-d]').forEach(btn => btn.onclick = async () => { const b = d.blobs[+btn.dataset.d]; btn.disabled = true; try { saveBlob(await fetchBlob(u.id, b), 'tep-' + b.hash.slice(0, 8) + '.' + ((b.type || '').split('/')[1] || 'bin').split(';')[0].replace(/[^a-z0-9]/gi, '')); } catch (e) { dbAlert(e.message); } btn.disabled = false; });
    sub.scrollIntoView({ behavior: 'smooth' });
  }
  async function adminCodes(body) {
    const d = await aj('codes'), mine = me.rank;
    const opts = me.roles.filter(r => !['free', 'founder'].includes(r.id) && rankOfRole(r.id) < mine).map(r => `<option value="${r.id}">${esc(r.name)}</option>`).join('');
    const st = (c) => c.revoked ? '🚫 đã thu hồi' : c.used_by ? '✅ ' + esc(c.used_email || 'đã dùng') : (c.expires && c.expires < Date.now()) ? '⌛ hết hạn' : '🟢 chưa dùng';
    body.innerHTML = `<div class="cf-card"><h3>Tạo mã dùng một lần</h3>
      <div class="cf-row"><select class="cf-in" id="cd-role">${opts}</select><input class="cf-in" id="cd-days" type="number" min="0" placeholder="Số ngày hiệu lực hạng (0 = vĩnh viễn)"></div>
      <div class="cf-row"><input class="cf-in" id="cd-count" type="number" min="1" max="20" value="1" style="max-width:90px"><input class="cf-in" id="cd-exp" type="number" min="0" placeholder="Mã hết hạn sau … ngày (bỏ trống = không)"></div>
      <div class="cf-row"><input class="cf-in" id="cd-note" placeholder="Ghi chú (tuỳ chọn)"><button class="cf-b cf-p" id="cd-make">Tạo mã</button></div><div id="cd-out"></div>
      <p class="cf-hint">Người nhận chỉ cần nhập mã trong mục ☁ Tài khoản → “Nhập mã nâng cấp”. Mỗi mã chỉ dùng được một lần.</p></div>
    <div class="cf-card"><h3>Danh sách mã</h3>${d.codes.map(c => `<div class="cf-tr"><div><b class="cf-code">${esc(c.code)}</b><small>${esc(rname(c.role))} · ${c.days ? c.days + ' ngày' : 'vĩnh viễn'} · ${st(c)} · ${esc(c.created_by || '')}${c.note ? ' · ' + esc(c.note) : ''}</small></div><span><button class="cf-b" data-cp="${esc(c.code)}">Chép</button>${!c.used_by && !c.revoked ? ` <button class="cf-b cf-d" data-rv="${esc(c.code)}">Thu hồi</button>` : ''}</span></div>`).join('') || '<p class="cf-hint">Chưa có mã.</p>'}</div>`;
    const cp = async (t) => { try { navigator.clipboard.writeText(t); toast('Đã chép ' + t); } catch { (await dbPrompt('Sao chép mã:', t)); } };
    $('#cd-make', body).onclick = async () => {
      try { const r = await post('code', { role: $('#cd-role', body).value, days: Number($('#cd-days', body).value) || 0, count: Number($('#cd-count', body).value) || 1, expDays: Number($('#cd-exp', body).value) || 0, note: $('#cd-note', body).value });
        $('#cd-out', body).innerHTML = `<div class="cf-msg">${r.codes.map(c => `<div class="cf-code">${c}</div>`).join('')}<div class="cf-btns"><button class="cf-b" id="cd-all">Chép tất cả</button></div></div>`; $('#cd-all', body).onclick = () => cp(r.codes.join('\n'));
      } catch (e) { $('#cd-out', body).innerHTML = `<p class="cf-err">${esc(e.message)}</p>`; }
    };
    body.querySelectorAll('[data-cp]').forEach(b => b.onclick = () => cp(b.dataset.cp));
    body.querySelectorAll('[data-rv]').forEach(b => b.onclick = async () => { if (!(await dbConfirm('Thu hồi mã này?'))) return; await post('code/revoke', { code: b.dataset.rv }); renderAdmin(); });
  }
  async function adminLog(body) {
    const d = await aj('audit');
    body.innerHTML = `<div class="cf-card"><h3>Nhật ký thao tác quản trị</h3>${d.audit.map(a => `<div class="cf-tr"><div><b>${esc(a.action)} · ${esc(a.target || '')}</b><small>${new Date(a.t).toLocaleString('vi-VN')} · ${esc(a.actor)}${a.detail ? ' · ' + esc(a.detail) : ''}</small></div></div>`).join('') || '<p class="cf-hint">Trống.</p>'}</div>`;
  }

  /* --- sao lưu / nhập --- */
  async function exportBackup() {
    try {
      accMsg = 'Đang tạo bản sao lưu…'; renderAccount();
      const { map } = await scanLocal(), out = { v: 1, t: Date.now(), items: [] };
      for (const e of map.values()) {
        if (e.ns === NSLS) { out.items.push({ ns: e.ns, k: e.k, v: e.val }); continue; }
        const blobs = [], v = encode(e.val, blobs);
        for (const [ph, b] of blobs) ph.$data = await toB64(b);
        out.items.push({ ns: e.ns, k: e.k, v });
      }
      const u = URL.createObjectURL(new Blob([JSON.stringify(out)], { type: 'application/json' })), a = document.createElement('a');
      a.href = u; a.download = 'sao-luu-' + new Date().toISOString().slice(0, 10) + '.json'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(u), 5000);
      accMsg = `Đã tạo bản sao lưu (${out.items.length} mục).`;
    } catch (e) { accMsg = 'Không tạo được: ' + (e.message || e); }
    renderAccount();
  }
  async function importBackup(file) {
    try {
      const j = JSON.parse(await file.text()); if (!j || !Array.isArray(j.items)) throw new Error('File không đúng định dạng');
      if (!(await dbConfirm(`Nhập ${j.items.length} mục từ bản sao lưu? Các mục trùng sẽ bị ghi đè trên máy này.`))) return;
      let n = 0;
      for (const it of j.items) {
        if (it.ns === NSLS) { if (LS_ALLOW.test(it.k) && !LS_DENY.test(it.k)) { lsSetRaw(it.k, it.v); n++; } continue; }
        const s = STORES.find(x => nsIdb(x) === it.ns); if (!s) continue;
        await idbPut(s, JSON.parse(it.k), await decode(it.v, true)); n++;
      }
      accMsg = `Đã nhập ${n} mục. Đang tải lại…`; renderAccount();
      setTimeout(() => location.reload(), 900);
    } catch (e) { accMsg = 'Không nhập được: ' + (e.message || e); renderAccount(); }
  }

  btn.onclick = () => (user ? openAccount() : showLogin());
  document.addEventListener('click', e => { const t = e.target.closest && e.target.closest('[data-cfs-open]'); if (t) (user ? openAccount() : showLogin()); });
  try { setStatus(''); } catch (e) {}

  /* ---------- khởi động ---------- */
  (async () => {
    setStatus('');
    try {
      const r = getTok() ? await call('/api/me') : null;
      if (r && r.status === 401) setTok(null);
      if (r && r.ok) { me = await r.json(); user = me.user; emitMe(); if (me.banned) { setStatus('err'); toast('🔒 Tài khoản bị khóa' + (me.reason ? ': ' + me.reason : '')); } else { setStatus('syncing'); await sync(true); } }
      else if (r && r.status === 403) { const j = await r.json().catch(() => ({})); toast(j.error || 'Tài khoản bị khóa'); }
    } catch { }
    setInterval(() => { if (user && autoOn() && !document.hidden && !(me && me.banned)) sync(false); }, SCAN_MS);
    setInterval(() => { if (user && !document.hidden) loadMe(); }, 300000);
    document.addEventListener('visibilitychange', () => { if (user && autoOn() && document.hidden) sync(false); });
    window.addEventListener('online', () => user && autoOn() && sync(false));
  })();
})();
