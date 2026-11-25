// API lưu dữ liệu chỉ dùng D1 (không cần R2/thẻ). Đăng nhập Google, token Bearer.
const te = new TextEncoder(), td = new TextDecoder();
const INLINE_MAX = 400_000;      // mục nhỏ lưu thẳng 1 dòng
const CHUNK = 700_000;           // mục lớn cắt thành các dòng ~700KB
const SESSION_DAYS = 30;
const TRASH_DAYS = 30;

const CORS = (env) => ({
  'access-control-allow-origin': env.SITE_ORIGIN || '*',
  'access-control-allow-headers': 'authorization,content-type,x-dobai-token,x-sig,x-api-key,anthropic-version,anthropic-beta,anthropic-dangerous-direct-browser-access',
  'access-control-allow-methods': 'GET,POST,PUT,DELETE,HEAD,OPTIONS',
  'access-control-max-age': '86400',
});
const json = (env, o, status = 200) => new Response(JSON.stringify(o), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store', ...CORS(env) } });
const text = (env, s, status = 200) => new Response(s, { status, headers: { 'content-type': 'text/plain', 'cache-control': 'no-store', ...CORS(env) } });

const b64u = (buf) => { let s = ''; for (const c of new Uint8Array(buf)) s += String.fromCharCode(c); return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); };
const unb64u = (s) => { s = s.replace(/-/g, '+').replace(/_/g, '/'); while (s.length % 4) s += '='; const r = atob(s), b = new Uint8Array(r.length); for (let i = 0; i < r.length; i++) b[i] = r.charCodeAt(i); return b; };
const hmacKey = (secret) => crypto.subtle.importKey('raw', te.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
async function makeToken(env, uid) {
  const p = b64u(te.encode(JSON.stringify({ u: uid, e: Date.now() + SESSION_DAYS * 864e5 })));
  return p + '.' + b64u(await crypto.subtle.sign('HMAC', await hmacKey(env.SESSION_SECRET), te.encode(p)));
}
async function readToken(req, env) {
  const m = /^Bearer (.+)$/.exec(req.headers.get('authorization') || ''); return readTokenStr(m ? m[1] : '', env);
}
async function readTokenStr(tk, env) {
  const [p, s] = String(tk || '').split('.'); if (!p || !s) return null;
  try {
    if (!(await crypto.subtle.verify('HMAC', await hmacKey(env.SESSION_SECRET), unb64u(s), te.encode(p)))) return null;
    const o = JSON.parse(td.decode(unb64u(p))); return o.e > Date.now() ? o.u : null;
  } catch { return null; }
}

let jwks = null, jwksAt = 0;
async function googleKeys() { if (jwks && Date.now() - jwksAt < 3600e3) return jwks; jwks = (await (await fetch('https://www.googleapis.com/oauth2/v3/certs')).json()).keys; jwksAt = Date.now(); return jwks; }
async function verifyGoogle(idt, env) {
  const [h, p, s] = String(idt).split('.'); if (!h || !p || !s) throw new Error('token');
  const head = JSON.parse(td.decode(unb64u(h))), pl = JSON.parse(td.decode(unb64u(p)));
  const jwk = (await googleKeys()).find(k => k.kid === head.kid); if (!jwk) throw new Error('kid');
  const ck = await crypto.subtle.importKey('jwk', jwk, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']);
  if (!(await crypto.subtle.verify('RSASSA-PKCS1-v1_5', ck, unb64u(s), te.encode(h + '.' + p)))) throw new Error('sig');
  if (pl.aud !== env.GOOGLE_CLIENT_ID) throw new Error('aud');
  if (!['accounts.google.com', 'https://accounts.google.com'].includes(pl.iss)) throw new Error('iss');
  if (!(pl.exp * 1000 > Date.now())) throw new Error('exp');
  if (!pl.email_verified) throw new Error('email');
  return pl;
}

let inited = false;
async function initDb(env) {
  if (inited) return;
  await env.DB.batch([
    env.DB.prepare('CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, email TEXT, name TEXT, picture TEXT, created INTEGER)'),
    env.DB.prepare('CREATE TABLE IF NOT EXISTS items (uid TEXT NOT NULL, ns TEXT NOT NULL, k TEXT NOT NULL, updated INTEGER NOT NULL, size INTEGER DEFAULT 0, sig TEXT, deleted INTEGER DEFAULT 0, val TEXT, cid TEXT, PRIMARY KEY (uid, ns, k))'),
    env.DB.prepare('CREATE INDEX IF NOT EXISTS items_upd ON items (uid, updated)'),
    env.DB.prepare('CREATE TABLE IF NOT EXISTS chunks (uid TEXT NOT NULL, id TEXT NOT NULL, n INTEGER NOT NULL, size INTEGER DEFAULT 0, data TEXT, PRIMARY KEY (uid, id, n))'),
    env.DB.prepare('CREATE TABLE IF NOT EXISTS blobs (uid TEXT NOT NULL, hash TEXT NOT NULL, size INTEGER DEFAULT 0, type TEXT, parts INTEGER DEFAULT 0, created INTEGER, PRIMARY KEY (uid, hash))'),
  ]);
  const cols = ((await env.DB.prepare('PRAGMA table_info(users)').all()).results || []).map(c => c.name);
  for (const [n, d] of [['role', "TEXT DEFAULT 'free'"], ['role_until', 'INTEGER DEFAULT 0'], ['banned', 'INTEGER DEFAULT 0'], ['ban_reason', 'TEXT'], ['deny', 'TEXT'], ['ip', 'TEXT'], ['country', 'TEXT'], ['ua', 'TEXT'], ['last_seen', 'INTEGER DEFAULT 0'], ['logins', 'INTEGER DEFAULT 0'], ['note', 'TEXT']])
    if (!cols.includes(n)) await env.DB.prepare('ALTER TABLE users ADD COLUMN ' + n + ' ' + d).run();
  await env.DB.batch([
    env.DB.prepare('CREATE TABLE IF NOT EXISTS codes (code TEXT PRIMARY KEY, role TEXT, days INTEGER DEFAULT 0, created_by TEXT, created INTEGER, expires INTEGER DEFAULT 0, used_by TEXT, used_at INTEGER, note TEXT, revoked INTEGER DEFAULT 0)'),
    env.DB.prepare('CREATE TABLE IF NOT EXISTS iplog (uid TEXT, ip TEXT, country TEXT, ua TEXT, t INTEGER)'),
    env.DB.prepare('CREATE INDEX IF NOT EXISTS iplog_u ON iplog (uid, t)'),
    env.DB.prepare('CREATE TABLE IF NOT EXISTS audit (id INTEGER PRIMARY KEY AUTOINCREMENT, t INTEGER, actor TEXT, action TEXT, target TEXT, detail TEXT)'),
    env.DB.prepare('CREATE TABLE IF NOT EXISTS usage (uid TEXT, day TEXT, kind TEXT, n INTEGER DEFAULT 0, PRIMARY KEY (uid, day, kind))'),
    env.DB.prepare('CREATE TABLE IF NOT EXISTS rl (k TEXT PRIMARY KEY, n INTEGER, t INTEGER)'),
    env.DB.prepare('CREATE TABLE IF NOT EXISTS shared (k TEXT PRIMARY KEY, v TEXT, updated INTEGER)'),
    env.DB.prepare('CREATE TABLE IF NOT EXISTS su (day TEXT, kfp TEXT, model TEXT, uid TEXT, r INTEGER DEFAULT 0, i INTEGER DEFAULT 0, o INTEGER DEFAULT 0, e INTEGER DEFAULT 0, ts INTEGER, PRIMARY KEY (day, kfp, model, uid))'),
    env.DB.prepare('CREATE TABLE IF NOT EXISTS sev (ts INTEGER, kfp TEXT, model TEXT, uid TEXT, r INTEGER)'),
    env.DB.prepare('CREATE INDEX IF NOT EXISTS sev_ts ON sev (ts)'),
    env.DB.prepare('CREATE TABLE IF NOT EXISTS sdead (kfp TEXT, model TEXT, until INTEGER, uid TEXT, ts INTEGER, PRIMARY KEY (kfp, model))'),
    env.DB.prepare('CREATE TABLE IF NOT EXISTS sobs (m TEXT, f TEXT, n INTEGER, uid TEXT, ts INTEGER)'),
    env.DB.prepare('CREATE INDEX IF NOT EXISTS sobs_m ON sobs (m, f)'),
    env.DB.prepare('CREATE TABLE IF NOT EXISTS sprof (day TEXT, model TEXT, h INTEGER, n INTEGER DEFAULT 0, PRIMARY KEY (day, model, h))'),
  ]);
  const sc = ((await env.DB.prepare('PRAGMA table_info(sobs)').all()).results || []).map(c => c.name);
  if (!sc.includes('x')) await env.DB.prepare('ALTER TABLE sobs ADD COLUMN x INTEGER DEFAULT 0').run();   // giới hạn chính xác do Google ghi trong lỗi 429
  inited = true;
}

/* ---------- Vai trò & quyền ---------- */
const FOUNDER = 'tung1231232t6@gmail.com';
const ROLES = ['free', 'plus', 'pro', 'ultra', 'admin', 'founder'];
const RN = { free: 'Thường', plus: 'Plus', pro: 'Pro', ultra: 'Ultra', admin: 'Admin', founder: 'Nhà sáng lập' };
const QMUL = { free: 1, plus: 1.5, pro: 2, ultra: 3, admin: 5, founder: 10 };
const rank = (r) => Math.max(0, ROLES.indexOf(r));
// tính năng: min = hạng tối thiểu; admin có thể chặn riêng từng tài khoản (deny)
const FEATURES = { netlify: { min: 2, label: 'Khóa Netlify' }, pollinations: { min: 2, label: 'Khóa Pollinations' }, sync: { min: 0, label: 'Đồng bộ dữ liệu' }, upload: { min: 0, label: 'Tải tệp lên' }, ai: { min: 0, label: 'Chat AI' }, search: { min: 0, label: 'Tra mạng' }, tts: { min: 0, label: 'Đọc to' }, browser: { min: 2, label: 'Trình duyệt cho AI' } };
const isFounder = (email, env) => String(email || '').toLowerCase() === String(env.FOUNDER_EMAIL || FOUNDER).toLowerCase();
function effRole(u, env) {
  if (isFounder(u.email, env)) return 'founder';
  const r = ROLES.includes(u.role) ? u.role : 'free';
  if (r !== 'free' && u.role_until > 0 && u.role_until < Date.now()) return 'free';
  return r;
}
const denyOf = (u) => { try { const a = JSON.parse(u.deny || '[]'); return Array.isArray(a) ? a.filter(x => FEATURES[x]) : []; } catch { return []; } };
function featMap(role, deny) { const o = {}; for (const k in FEATURES) o[k] = rank(role) >= FEATURES[k].min && !deny.includes(k); return o; }
const quotaBytes = (env, role) => Math.round((Number(env.QUOTA_MB) || 200) * (QMUL[role] || 1) * 1048576);
const clientInfo = (req) => ({ ip: req.headers.get('cf-connecting-ip') || '', country: (req.cf && req.cf.country) || req.headers.get('cf-ipcountry') || '', ua: (req.headers.get('user-agent') || '').slice(0, 200) });
async function audit(env, actor, action, target, detail) { try { await env.DB.prepare('INSERT INTO audit (t,actor,action,target,detail) VALUES (?,?,?,?,?)').bind(Date.now(), actor, action, target || '', String(detail || '').slice(0, 500)).run(); } catch {} }
async function touch(env, u, req) {
  const c = clientInfo(req), now = Date.now();
  if (u.last_seen && now - u.last_seen < 60e3 && u.ip === c.ip) return;
  await env.DB.prepare('UPDATE users SET last_seen=?, ip=?, country=?, ua=? WHERE id=?').bind(now, c.ip, c.country, c.ua, u.id).run();
  if (c.ip && c.ip !== u.ip) await env.DB.prepare('INSERT INTO iplog (uid,ip,country,ua,t) VALUES (?,?,?,?,?)').bind(u.id, c.ip, c.country, c.ua, now).run();
  u.last_seen = now; u.ip = c.ip;
}
async function limited(env, k, max, winMs) {
  const now = Date.now(), r = await env.DB.prepare('SELECT n,t FROM rl WHERE k=?').bind(k).first();
  if (!r || now - r.t > winMs) { await env.DB.prepare('INSERT OR REPLACE INTO rl (k,n,t) VALUES (?,?,?)').bind(k, 1, now).run(); return false; }
  if (r.n >= max) return true;
  await env.DB.prepare('UPDATE rl SET n=n+1 WHERE k=?').bind(k).run(); return false;
}
const dayKey = () => new Date().toISOString().slice(0, 10);
async function countUse(env, uid, kind) { try { await env.DB.prepare('INSERT INTO usage (uid,day,kind,n) VALUES (?,?,?,1) ON CONFLICT(uid,day,kind) DO UPDATE SET n=n+1').bind(uid, dayKey(), kind).run(); } catch {} }
async function usedBytes(env, uid) {
  const a = await env.DB.prepare('SELECT COALESCE(SUM(size),0) n FROM chunks WHERE uid=?').bind(uid).first();
  const b = await env.DB.prepare('SELECT COALESCE(SUM(size),0) n FROM items WHERE uid=? AND deleted=0 AND val IS NOT NULL').bind(uid).first();
  return (a?.n || 0) + (b?.n || 0);
}

async function login(req, env) {
  const { credential } = await req.json().catch(() => ({}));
  let pl; try { pl = await verifyGoogle(credential, env); } catch (e) { return json(env, { error: 'Đăng nhập Google không hợp lệ: ' + e.message }, 401); }
  const allow = String(env.ALLOWED_EMAILS || '').toLowerCase().split(',').map(s => s.trim()).filter(Boolean);
  if (allow.length && !allow.includes(String(pl.email).toLowerCase()) && !isFounder(pl.email, env)) return json(env, { error: 'Email này chưa được phép dùng.' }, 403);
  const old = await env.DB.prepare('SELECT banned,ban_reason FROM users WHERE id=?').bind(pl.sub).first();
  if (old && old.banned && !isFounder(pl.email, env)) return json(env, { error: 'Tài khoản đã bị khóa' + (old.ban_reason ? ': ' + old.ban_reason : '') + '.' }, 403);
  const c = clientInfo(req), now = Date.now();
  await env.DB.prepare('INSERT INTO users (id,email,name,picture,created,ip,country,ua,last_seen,logins) VALUES (?,?,?,?,?,?,?,?,?,1) ON CONFLICT(id) DO UPDATE SET email=excluded.email,name=excluded.name,picture=excluded.picture,ip=excluded.ip,country=excluded.country,ua=excluded.ua,last_seen=excluded.last_seen,logins=COALESCE(users.logins,0)+1')
    .bind(pl.sub, pl.email, pl.name || '', pl.picture || '', now, c.ip, c.country, c.ua, now).run();
  if (c.ip) await env.DB.prepare('INSERT INTO iplog (uid,ip,country,ua,t) VALUES (?,?,?,?,?)').bind(pl.sub, c.ip, c.country, c.ua, now).run();
  if (isFounder(pl.email, env)) await env.DB.prepare("UPDATE users SET role='founder', banned=0 WHERE id=?").bind(pl.sub).run();
  return json(env, { ok: true, token: await makeToken(env, pl.sub), user: { email: pl.email, name: pl.name, picture: pl.picture } });
}

async function deleteChunks(env, uid, id) { if (id) await env.DB.prepare('DELETE FROM chunks WHERE uid=? AND id=?').bind(uid, id).run(); }

/* ---------- Dữ liệu dùng chung giữa mọi tài khoản: danh sách model + lượt dùng khóa (để chia hạn mức chính xác hơn) ----------
   Hợp đồng: SHARED_API.md. Không lưu khóa thật: "kfp" chỉ là dấu vân tay ngắn do web tự tính. */
const SH_ID = /^[\w.\-\/:]+$/, SH_KEY = /^[\w.\-]{1,40}\|[\w.\-\/:]{1,100}$/, SH_K = ['g', 'n', 'o', 'x', 'k'];
const SH_SECRET = /(AIza[\w-]{10,}|sk-[\w-]{10,}|jina_\w{10,}|Bearer\s|[A-Za-z0-9_\-]{32,})/;
const ptDay = (t) => new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Los_Angeles', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(t || Date.now()));
const clampN = (v, mx) => Math.max(0, Math.min(mx, Math.floor(Number(v) || 0)));
function shClean(x, depth) {   // chỉ giữ id model hợp lệ + chữ ngắn; bỏ mọi thứ giống khóa bí mật
  if (depth > 3) return undefined;
  if (typeof x === 'string') return x.length <= 200 && !SH_SECRET.test(x) ? x : undefined;
  if (typeof x === 'number' || typeof x === 'boolean' || x === null) return x;
  if (Array.isArray(x)) return x.slice(0, 800).map((v) => (typeof v === 'string' ? (SH_ID.test(v) && v.length <= 120 ? v : undefined) : shClean(v, depth + 1))).filter((v) => v !== undefined);
  if (typeof x === 'object') { const o = {}; let n = 0; for (const k of Object.keys(x)) { if (++n > 800) break; if (!SH_ID.test(k) || k.length > 120) continue; const v = shClean(x[k], depth + 1); if (v !== undefined) o[k] = v; } return o; }
  return undefined;
}

/* ---------- Dự đoán dùng chung: gộp phần web đã HỌC được (giới hạn thật Google báo, số lượt chạy được trước khi bị chặn,
   thời gian hồi sau 429, mốc tính lại hạn mức, token trung bình, độ trễ). Mọi tài khoản gửi lên → máy chủ gộp → ai cũng nhận lại bản gộp.
   Phép gộp lnMerge là "lũy đẳng" (gộp nhiều lần vẫn ra cùng kết quả) và không phụ thuộc thứ tự, nên đồng bộ lặp lại không làm số liệu phình lên. ---------- */
const LN_F = ['rpm', 'tpm', 'rpd'], LN_MAXM = 160, LN_DAY = 864e5;
function lnNum(v, max) { v = Number(v); return Number.isFinite(v) && v >= 0 ? Math.min(v, max) : 0; }
function lnOkM(m) { return typeof m === 'string' && m.length <= 100 && SH_ID.test(m) && !SH_SECRET.test(m); }
function lnClean(x, now) {
  const o = { ex: {}, ob: {}, pk: {}, rec: {}, av: {}, lt: {}, rb: [] }; if (!x || typeof x !== 'object') return o;
  const tmax = now + 300000;
  const eachM = (src, fn) => { let n = 0; for (const m of Object.keys(src && typeof src === 'object' ? src : {})) { if (!lnOkM(m)) continue; if (++n > LN_MAXM) break; fn(m, src[m]); } };
  eachM(x.ex, (m, e) => { for (const f of LN_F) { const c = e && e[f]; if (c && lnNum(c.v, 1e9) >= 1) (o.ex[m] = o.ex[m] || {})[f] = { v: Math.round(lnNum(c.v, 1e9)), t: Math.min(lnNum(c.t, tmax), tmax), n: Math.max(1, Math.round(lnNum(c.n, 1e4))) }; } });
  eachM(x.ob, (m, e) => { for (const f of LN_F) { const a = e && Array.isArray(e[f]) ? e[f].slice(-12) : []; const out = a.filter((p) => Array.isArray(p) && lnNum(p[0], 1e7) >= 1 && lnNum(p[1], tmax) > now - 45 * LN_DAY).map((p) => [Math.round(lnNum(p[0], 1e7)), Math.min(lnNum(p[1], tmax), tmax)]); if (out.length) (o.ob[m] = o.ob[m] || {})[f] = out; } });
  eachM(x.pk, (m, e) => { for (const f of LN_F) { const p = e && e[f]; if (Array.isArray(p) && lnNum(p[0], 1e9) >= 1 && lnNum(p[1], tmax) > now - 14 * LN_DAY) (o.pk[m] = o.pk[m] || {})[f] = [Math.round(lnNum(p[0], 1e9)), Math.min(lnNum(p[1], tmax), tmax)]; } });
  for (const k of ['rec', 'av', 'lt']) eachM(x[k], (m, p) => { if (Array.isArray(p) && lnNum(p[0], 1e9) > 0 && lnNum(p[1], 1e6) >= 1) o[k][m] = [lnNum(p[0], 1e9), Math.min(Math.round(lnNum(p[1], 1e6)), 60)]; });
  if (Array.isArray(x.rb)) o.rb = x.rb.slice(-10).filter((p) => Array.isArray(p) && Number.isFinite(+p[0]) && Number.isFinite(+p[1]) && Math.abs(+p[0]) < 3 * LN_DAY && Math.abs(+p[1]) < 3 * LN_DAY).map((p) => [Math.round(+p[0]), Math.round(+p[1])]);
  return o;
}
function lnMerge(a, b, now) {
  const r = { ex: {}, ob: {}, pk: {}, rec: {}, av: {}, lt: {}, rb: [] };
  for (const src of [a, b]) {
    for (const m in src.ex) for (const f in src.ex[m]) { const e = src.ex[m][f], o = (r.ex[m] = r.ex[m] || {}), c = o[f];
      if (!c) o[f] = { ...e }; else if (c.v === e.v) o[f] = { v: e.v, t: Math.max(c.t, e.t), n: Math.max(c.n, e.n) }; else if (e.t > c.t || (e.t === c.t && e.n > c.n)) o[f] = { ...e }; }
    for (const m in src.ob) for (const f in src.ob[m]) { const o = (r.ob[m] = r.ob[m] || {}); o[f] = (o[f] || []).concat(src.ob[m][f]); }
    for (const m in src.pk) for (const f in src.pk[m]) { const p = src.pk[m][f], o = (r.pk[m] = r.pk[m] || {}), c = o[f];
      if (!c) o[f] = p.slice(); else { const bothFresh = now - c[1] < 14 * LN_DAY && now - p[1] < 14 * LN_DAY; if (bothFresh ? p[0] > c[0] : p[1] > c[1]) o[f] = p.slice(); } }
    for (const k of ['rec', 'av', 'lt']) for (const m in src[k]) { const p = src[k][m], c = r[k][m];
      if (!c || p[1] > c[1]) r[k][m] = p.slice(); else if (p[1] === c[1]) r[k][m] = [(p[0] + c[0]) / 2, c[1]]; }
    r.rb = r.rb.concat(src.rb);
  }
  for (const m in r.ob) for (const f in r.ob[m]) { const seen = new Set(); r.ob[m][f] = r.ob[m][f].filter((p) => { const k = p[0] + '@' + p[1]; if (seen.has(k) || p[1] < now - 45 * LN_DAY) return false; seen.add(k); return true; }).sort((x, y) => x[1] - y[1]).slice(-12); if (!r.ob[m][f].length) delete r.ob[m][f]; }
  { const seen = new Set(); r.rb = r.rb.filter((p) => { const k = p[0] + ',' + p[1]; if (seen.has(k)) return false; seen.add(k); return true; }).slice(-10); }
  return r;
}
async function shared(req, env, url, uid) {
  const sub = url.pathname.slice('/api/shared/'.length), method = req.method;
  if (sub === 'models' && method === 'GET') {
    const { results } = await env.DB.prepare("SELECT k,v FROM shared WHERE k LIKE 'models:%'").all();
    const models = {}; for (const r of results || []) { try { models[r.k.slice(7)] = JSON.parse(r.v); } catch {} }
    return json(env, { models });
  }
  if (sub === 'models' && method === 'PUT') {
    if (await limited(env, 'shp:' + uid, 60, 3600000)) return json(env, { error: 'Gửi quá nhiều, thử lại sau.' }, 429);
    let b = {}; try { b = await req.json(); } catch {}
    if (!SH_K.includes(b.k)) return json(env, { error: 'k không hợp lệ' }, 400);
    const now = Date.now(), t = Math.min(Number(b.t) || now, now + 300000);
    const data = shClean(b.data && typeof b.data === 'object' ? b.data : {}, 0) || {};
    const v = JSON.stringify({ t, data });
    if (v.length > 65536) return json(env, { error: 'Dữ liệu quá lớn (tối đa 64KB)' }, 413);
    const cur = await env.DB.prepare('SELECT v FROM shared WHERE k=?').bind('models:' + b.k).first();
    if (cur) { try { if ((JSON.parse(cur.v).t || 0) >= t) return json(env, { ok: true, kept: true }); } catch {} }
    await env.DB.prepare('INSERT OR REPLACE INTO shared (k,v,updated) VALUES (?,?,?)').bind('models:' + b.k, v, now).run();
    return json(env, { ok: true });
  }
  if (sub === 'learn' && (method === 'GET' || method === 'POST')) {
    const now = Date.now(), row = await env.DB.prepare("SELECT v FROM shared WHERE k='learn'").first();
    let cur = null; try { cur = row ? JSON.parse(row.v) : null; } catch {}
    let base = lnClean(cur && cur.d, now);
    if (method === 'GET') return json(env, { t: (cur && cur.t) || 0, d: base, n: Object.keys(base.ex).length + Object.keys(base.ob).length });
    if (await limited(env, 'shl:' + uid, 240, 3600000)) return json(env, { error: 'Gửi quá nhiều, thử lại sau.' }, 429);
    let b = {}; try { b = await req.json(); } catch {}
    const inc = lnClean(b && b.d, now), merged = lnMerge(base, inc, now);
    const changed = JSON.stringify(merged) !== JSON.stringify(base), v = JSON.stringify({ t: changed ? now : ((cur && cur.t) || now), d: merged });
    if (v.length > 120000) return json(env, { error: 'Dữ liệu học quá lớn.' }, 413);
    if (changed || !row) await env.DB.prepare('INSERT OR REPLACE INTO shared (k,v,updated) VALUES (?,?,?)').bind('learn', v, now).run();
    return json(env, { ok: true, t: changed ? now : ((cur && cur.t) || now), d: merged, n: Object.keys(merged.ex).length + Object.keys(merged.ob).length });
  }
  if (sub === 'usage' && method === 'POST') {
    if (await limited(env, 'shu:' + uid, 400, 3600000)) return json(env, { error: 'Gửi quá nhiều' }, 429);
    let b = {}; try { b = await req.json(); } catch {}
    const now = Date.now(), today = ptDay(now), day = /^\d{4}-\d\d-\d\d$/.test(b.day || '') ? b.day : today;
    if (day !== today && day !== ptDay(now - 864e5)) return json(env, { ok: true, skipped: 'day' });
    const st = [];
    const rows = b.rows && typeof b.rows === 'object' ? Object.entries(b.rows).slice(0, 200) : [];
    for (const [key, v] of rows) {
      if (!SH_KEY.test(key) || !v) continue;
      const [kfp, model] = key.split('|'), r = clampN(v.r, 100000), i = clampN(v.i, 1e9), o = clampN(v.o, 1e9), e = clampN(v.e, 100000);
      if (!r && !e) continue;
      st.push(env.DB.prepare('INSERT INTO su (day,kfp,model,uid,r,i,o,e,ts) VALUES (?,?,?,?,?,?,?,?,?) ON CONFLICT(day,kfp,model,uid) DO UPDATE SET r=r+excluded.r,i=i+excluded.i,o=o+excluded.o,e=e+excluded.e,ts=excluded.ts').bind(day, kfp, model, uid, r, i, o, e, now));
      if (r) { st.push(env.DB.prepare('INSERT INTO sev (ts,kfp,model,uid,r) VALUES (?,?,?,?,?)').bind(now, kfp, model, uid, r));
        st.push(env.DB.prepare('INSERT INTO sprof (day,model,h,n) VALUES (?,?,?,?) ON CONFLICT(day,model,h) DO UPDATE SET n=n+excluded.n').bind(new Date(now).toISOString().slice(0, 10), model, new Date(now).getUTCHours(), r)); }
    }
    const dead = b.dead && typeof b.dead === 'object' ? Object.entries(b.dead).slice(0, 100) : [];
    for (const [key, until] of dead) {
      const u2 = Math.floor(Number(until) || 0); if (!SH_KEY.test(key) || u2 <= now || u2 > now + 36 * 36e5) continue;
      const [kfp, model] = key.split('|');
      st.push(env.DB.prepare('INSERT INTO sdead (kfp,model,until,uid,ts) VALUES (?,?,?,?,?) ON CONFLICT(kfp,model) DO UPDATE SET until=MAX(until,excluded.until),uid=excluded.uid,ts=excluded.ts').bind(kfp, model, u2, uid, now));
    }
    const obs = Array.isArray(b.obs) ? b.obs.slice(0, 30) : [];
    for (const x of obs) {
      if (!x || !SH_ID.test(String(x.m || '')) || String(x.m).length > 100 || !['rpd', 'rpm', 'tpm'].includes(x.f)) continue;
      const n = clampN(x.n, 1e6), ex = clampN(x.x, 1e8); if (n < 1 && ex < 1) continue;
      st.push(env.DB.prepare('INSERT INTO sobs (m,f,n,uid,ts,x) VALUES (?,?,?,?,?,?)').bind(String(x.m), x.f, n, uid, now, ex));
    }
    for (const x of obs) { if (!x || !SH_ID.test(String(x.m || '')) || String(x.m).length > 100 || !['rpd', 'rpm'].includes(x.f)) continue; const n = clampN(x.n, 1e6); if (n < 1) continue; st.push(env.DB.prepare('INSERT INTO sobs (m,f,n,uid,ts) VALUES (?,?,?,?,?)').bind(String(x.m), x.f, n, uid, now)); }
    if (st.length) await env.DB.batch(st);
    if (Math.random() < 0.05) await env.DB.batch([   // dọn dữ liệu cũ
      env.DB.prepare('DELETE FROM sev WHERE ts<?').bind(now - 600000),
      env.DB.prepare('DELETE FROM sdead WHERE until<?').bind(now),
      env.DB.prepare('DELETE FROM sobs WHERE ts<? AND (x IS NULL OR x=0)').bind(now - 14 * 864e5),
      env.DB.prepare('DELETE FROM sobs WHERE ts<?').bind(now - 45 * 864e5),
      env.DB.prepare('DELETE FROM sprof WHERE day<?').bind(new Date(now - 21 * 864e5).toISOString().slice(0, 10)),
      env.DB.prepare('DELETE FROM su WHERE day<?').bind(ptDay(now - 8 * 864e5)),
    ]);
    return json(env, { ok: true });
  }
  if (sub === 'usage' && method === 'GET') {
    const now = Date.now(), day = ptDay(now), rpd = {}, rpm = {}, dead = {}, lim = {};
    const [a, b2, c, d] = await env.DB.batch([
      env.DB.prepare('SELECT kfp,model,SUM(r) n FROM su WHERE day=? AND uid<>? GROUP BY kfp,model').bind(day, uid),
      env.DB.prepare('SELECT kfp,model,SUM(r) n FROM sev WHERE ts>? AND uid<>? GROUP BY kfp,model').bind(now - 60000, uid),
      env.DB.prepare('SELECT kfp,model,until FROM sdead WHERE until>?').bind(now),
      env.DB.prepare('SELECT m,f,n,x,ts FROM sobs WHERE ts>? ORDER BY m,f,n LIMIT 4000').bind(now - 45 * 864e5),
    ]);
    for (const r of a.results || []) rpd[r.kfp + '|' + r.model] = r.n;
    for (const r of b2.results || []) rpm[r.kfp + '|' + r.model] = r.n;
    for (const r of c.results || []) dead[r.kfp + '|' + r.model] = r.until;
    // lim[m][f] = {v, n, ex}: ex=1 nếu là con số Google báo chính xác (giá trị xuất hiện nhiều nhất trong 45 ngày); ngược lại là trung vị số lượt trước khi bị chặn (14 ngày, cần ≥3 mẫu)
    const g = {}, gx = {};
    for (const r of d.results || []) {
      const k = r.m + '|' + r.f;
      if (r.x > 0) { const o = gx[k] || (gx[k] = {}); o[r.x] = (o[r.x] || 0) + 1; }
      else if (r.n > 0 && r.ts > now - 14 * 864e5) (g[k] = g[k] || []).push(r.n);
    }
    for (const k in gx) { const [m, f] = k.split('|'); let best = 0, bc = 0; for (const v in gx[k]) if (gx[k][v] > bc || (gx[k][v] === bc && +v > best)) { best = +v; bc = gx[k][v]; } if (best) (lim[m] = lim[m] || {})[f] = { v: best, n: bc, ex: 1 }; }
    for (const k in g) { const arr = g[k]; if (arr.length < 3) continue; const [m, f] = k.split('|'); if (lim[m] && lim[m][f]) continue; arr.sort((a, b) => a - b); (lim[m] = lim[m] || {})[f] = { v: arr[Math.floor((arr.length - 1) / 2)], n: arr.length, ex: 0 }; }
    return json(env, { day, rpd, rpm, dead, lim });
  }
  if (sub === 'prof' && method === 'GET') {   // hồ sơ nhu cầu theo giờ UTC của TOÀN hệ thống (trung bình/ngày, tách ngày thường | cuối tuần), làm mới tối đa 30 phút/lần
    const now = Date.now(), c = await env.DB.prepare("SELECT v FROM shared WHERE k='prof'").first();
    if (c) { try { const j = JSON.parse(c.v); if (now - j.t < 30 * 60000) return json(env, j); } catch {} }
    const today = new Date(now).toISOString().slice(0, 10), from = new Date(now - 14 * 864e5).toISOString().slice(0, 10);
    const { results } = await env.DB.prepare('SELECT day,model,h,n FROM sprof WHERE day>=? AND day<?').bind(from, today).all();
    const M = {};
    for (const r of results || []) {
      const dw = new Date(r.day + 'T00:00:00Z').getUTCDay(), cls = dw === 0 || dw === 6 ? 1 : 0, o = M[r.model] || (M[r.model] = { sum: new Array(48).fill(0), days: [new Set(), new Set()], tot: 0 });
      o.sum[cls * 24 + r.h] += r.n; o.days[cls].add(r.day); o.tot += r.n;
    }
    const models = {};
    Object.keys(M).sort((a, b) => M[b].tot - M[a].tot).slice(0, 40).forEach((m) => { const o = M[m], nd = [o.days[0].size, o.days[1].size]; models[m] = { w: o.sum.map((v, i) => { const d = nd[i >= 24 ? 1 : 0]; return d ? Math.round(v / d * 100) / 100 : 0; }), n: nd }; });
    const out = { t: now, models };
    await env.DB.prepare('INSERT OR REPLACE INTO shared (k,v,updated) VALUES (?,?,?)').bind('prof', JSON.stringify(out), now).run();
    return json(env, out);
  }
  return json(env, { error: 'không tìm thấy' }, 404);
}

async function api(req, env, url, uid, ctx) {
  const path = url.pathname, method = req.method;
  if (path.startsWith('/api/admin/')) return await admin(req, env, url, ctx);
  if (path === '/api/redeem' && method === 'POST') return await redeem(req, env, ctx);
  if (path.startsWith('/api/shared/')) return await shared(req, env, url, uid);
  if (/^\/api\/(index|item|trash|restore|purge|blob)/.test(path) && !ctx.feat.sync) return json(env, { error: 'Tính năng đồng bộ đã bị tắt cho tài khoản này.' }, 403);
  if (/^\/api\/blob\/[a-f0-9]{64}\/\d+$/.test(path) && method === 'PUT' && !ctx.feat.upload) return json(env, { error: 'Tính năng tải tệp lên đã bị tắt cho tài khoản này.' }, 403);
  if (path === '/api/me') {
    const u = { email: ctx.u.email, name: ctx.u.name, picture: ctx.u.picture };
    const cut = Date.now() - TRASH_DAYS * 864e5;
    await env.DB.prepare('DELETE FROM chunks WHERE uid=? AND id IN (SELECT cid FROM items WHERE uid=? AND deleted=1 AND cid IS NOT NULL AND updated<?)').bind(uid, uid, cut).run();
    await env.DB.prepare('DELETE FROM items WHERE uid=? AND deleted=1 AND updated<?').bind(uid, cut).run();
    const it = await env.DB.prepare('SELECT COUNT(*) c, COALESCE(SUM(size),0) s FROM items WHERE uid=? AND deleted=0').bind(uid).first();
    const bl = await env.DB.prepare('SELECT COUNT(*) c, COALESCE(SUM(size),0) s FROM blobs WHERE uid=?').bind(uid).first();
    const tr = await env.DB.prepare('SELECT COUNT(*) c FROM items WHERE uid=? AND deleted=1').bind(uid).first();
    const fs = await env.DB.prepare("SELECT COALESCE(SUM(size),0) s FROM chunks WHERE uid=? AND id LIKE 'b:%'").bind(uid).first();
    const used = await usedBytes(env, uid);
    return json(env, { user: u, role: ctx.role, roleName: RN[ctx.role], rank: rank(ctx.role), until: ctx.role === 'founder' ? 0 : (ctx.u.role_until || 0), baseRole: ctx.u.role || 'free', deny: ctx.deny, feat: ctx.feat, features: FEATURES, roles: ROLES.map(r => ({ id: r, name: RN[r] })), now: Date.now(), used, quota: quotaBytes(env, ctx.role), items: { n: it.c, size: Math.max(0, used - fs.s) }, files: { n: bl.c, size: fs.s }, trash: tr.c });
  }
  if (path === '/api/usage' && method === 'GET') {
    const { results } = await env.DB.prepare('SELECT day,kind,n FROM usage WHERE uid=? ORDER BY day DESC LIMIT 80').bind(uid).all();
    const cap = BRCAP[rank(ctx.role)] || 0, mine = await brUsed(env, uid), all = await brUsed(env, '*');
    return json(env, { today: dayKey(), rows: results || [], br: { usedSec: Math.round(mine / 1000), capSec: Math.round(cap / 1000), allSec: Math.round(all / 1000), allCapSec: Number(env.BR_DAY_SEC) || 540 } });
  }
  if (path === '/api/trash' && method === 'GET') {
    const { results } = await env.DB.prepare('SELECT ns,k,updated,size FROM items WHERE uid=? AND deleted=1 AND (val IS NOT NULL OR cid IS NOT NULL) ORDER BY updated DESC LIMIT 200').bind(uid).all();
    return json(env, { items: results, days: TRASH_DAYS });
  }
  if (path === '/api/restore' && method === 'POST') {
    const { ns, k } = await req.json().catch(() => ({}));
    const r = await env.DB.prepare('UPDATE items SET deleted=0, updated=? WHERE uid=? AND ns=? AND k=? AND deleted=1 AND (val IS NOT NULL OR cid IS NOT NULL)').bind(Date.now(), uid, ns, k).run();
    return json(env, { ok: !!(r.meta && r.meta.changes) });
  }
  if (path === '/api/purge' && method === 'POST') {
    const { confirm } = await req.json().catch(() => ({}));
    if (confirm !== 'XOA') return json(env, { error: 'thiếu xác nhận' }, 400);
    await env.DB.batch([
      env.DB.prepare('DELETE FROM chunks WHERE uid=?').bind(uid),
      env.DB.prepare('DELETE FROM items WHERE uid=?').bind(uid),
      env.DB.prepare('DELETE FROM blobs WHERE uid=?').bind(uid),
    ]);
    return json(env, { ok: true });
  }
  if (path === '/api/index' && method === 'GET') {
    const since = Number(url.searchParams.get('since')) || 0;
    const { results } = await env.DB.prepare('SELECT ns,k,updated,size,sig,deleted FROM items WHERE uid=? AND updated>=? ORDER BY updated LIMIT 5000').bind(uid, since).all();
    return json(env, { items: results, now: Date.now() });
  }
  if (path === '/api/item') {
    const ns = url.searchParams.get('ns'), k = url.searchParams.get('k');
    if (!ns || k == null) return json(env, { error: 'thiếu ns/k' }, 400);
    if (method === 'GET') {
      const row = await env.DB.prepare('SELECT val,cid,deleted FROM items WHERE uid=? AND ns=? AND k=?').bind(uid, ns, k).first();
      if (!row || (row.deleted && url.searchParams.get('trash') !== '1')) return json(env, { error: 'không có' }, 404);
      if (row.cid) {
        const { results } = await env.DB.prepare('SELECT data FROM chunks WHERE uid=? AND id=? ORDER BY n').bind(uid, row.cid).all();
        return new Response(results.map(r => r.data).join(''), { headers: { 'content-type': 'application/json', 'cache-control': 'no-store', ...CORS(env) } });
      }
      return new Response(row.val, { headers: { 'content-type': 'application/json', 'cache-control': 'no-store', ...CORS(env) } });
    }
    if (method === 'PUT') {
      const body = await req.text(), size = body.length;
      if (size > 50 * 1048576) return json(env, { error: 'mục quá lớn' }, 413);
      const old = await env.DB.prepare('SELECT size,cid,val,deleted FROM items WHERE uid=? AND ns=? AND k=?').bind(uid, ns, k).first();
      if (await usedBytes(env, uid) + size > quotaBytes(env, ctx.role)) return json(env, { error: 'Hết dung lượng' }, 413);
      let val = null, cid = null;
      if (size <= INLINE_MAX) val = body;
      else {
        cid = crypto.randomUUID(); const st = [];
        for (let i = 0, n = 0; i < size; i += CHUNK, n++) { const part = body.slice(i, i + CHUNK); st.push(env.DB.prepare('INSERT INTO chunks (uid,id,n,size,data) VALUES (?,?,?,?,?)').bind(uid, cid, n, part.length, part)); }
        await env.DB.batch(st);
      }
      await env.DB.prepare('INSERT INTO items (uid,ns,k,updated,size,sig,deleted,val,cid) VALUES (?,?,?,?,?,?,0,?,?) ON CONFLICT(uid,ns,k) DO UPDATE SET updated=excluded.updated,size=excluded.size,sig=excluded.sig,deleted=0,val=excluded.val,cid=excluded.cid')
        .bind(uid, ns, k, Date.now(), size, req.headers.get('x-sig') || '', val, cid).run();
      await deleteChunks(env, uid, old?.cid);
      return json(env, { ok: true });
    }
    if (method === 'DELETE') {
      // xoá mềm: đánh dấu đã xoá nhưng GIỮ dữ liệu 30 ngày (khôi phục được trong Thùng rác)
      await env.DB.prepare("INSERT INTO items (uid,ns,k,updated,size,sig,deleted) VALUES (?,?,?,?,0,'',1) ON CONFLICT(uid,ns,k) DO UPDATE SET updated=excluded.updated,deleted=1").bind(uid, ns, k, Date.now()).run();
      return json(env, { ok: true });
    }
  }
  // file/ảnh: client cắt base64 thành các phần ~700KB
  const bm = /^\/api\/blob\/([a-f0-9]{64})(?:\/(\d+|done))?$/.exec(path);
  if (bm) {
    const hash = bm[1], part = bm[2], id = 'b:' + hash;
    if (!part && (method === 'HEAD' || method === 'GET')) {
      const r = await env.DB.prepare('SELECT size,type,parts FROM blobs WHERE uid=? AND hash=?').bind(uid, hash).first();
      if (method === 'HEAD') return new Response(null, { status: r ? 200 : 404, headers: CORS(env) });
      return r ? json(env, r) : json(env, { error: 'không có' }, 404);
    }
    if (part && part !== 'done' && method === 'GET') {
      const r = await env.DB.prepare('SELECT data FROM chunks WHERE uid=? AND id=? AND n=?').bind(uid, id, Number(part)).first();
      return r ? text(env, r.data) : json(env, { error: 'không có' }, 404);
    }
    if (part && part !== 'done' && method === 'PUT') {
      const data = await req.text(); if (data.length > 1_900_000) return json(env, { error: 'phần quá lớn' }, 413);
      if (await usedBytes(env, uid) + data.length > quotaBytes(env, ctx.role)) return json(env, { error: 'Hết dung lượng' }, 413);
      await env.DB.prepare('INSERT OR REPLACE INTO chunks (uid,id,n,size,data) VALUES (?,?,?,?,?)').bind(uid, id, Number(part), data.length, data).run();
      return json(env, { ok: true });
    }
    if (part === 'done' && method === 'POST') {
      const { size, type, parts } = await req.json().catch(() => ({}));
      const c = await env.DB.prepare('SELECT COUNT(*) n FROM chunks WHERE uid=? AND id=?').bind(uid, id).first();
      if (!parts || c.n !== parts) return json(env, { error: 'thiếu phần file' }, 400);
      await env.DB.prepare('INSERT OR REPLACE INTO blobs (uid,hash,size,type,parts,created) VALUES (?,?,?,?,?,?)').bind(uid, hash, size || 0, type || '', parts, Date.now()).run();
      return json(env, { ok: true });
    }
  }
  return json(env, { error: 'không tìm thấy' }, 404);
}

async function redeem(req, env, ctx) {
  if (await limited(env, 'redeem:' + ctx.u.id, 8, 3600e3)) return json(env, { error: 'Nhập sai quá nhiều lần, thử lại sau 1 giờ.' }, 429);
  const { code } = await req.json().catch(() => ({}));
  const c = String(code || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  const row = c.length === 12 ? await env.DB.prepare('SELECT * FROM codes WHERE REPLACE(code,\'-\',\'\')=?').bind(c).first() : null;
  if (!row || row.revoked || row.used_by || (row.expires && row.expires < Date.now())) return json(env, { error: 'Mã không hợp lệ, đã dùng hoặc đã hết hạn.' }, 400);
  if (ctx.role === 'founder') return json(env, { error: 'Nhà sáng lập đã có quyền cao nhất.' }, 400);
  if (rank(row.role) < rank(ctx.role)) return json(env, { error: 'Tài khoản của bạn đang ở hạng ' + RN[ctx.role] + ', cao hơn hạng của mã này.' }, 400);
  const now = Date.now(); let until = 0;
  if (row.days > 0) { const base = (rank(row.role) === rank(ctx.role) && ctx.u.role_until > now) ? ctx.u.role_until : now; until = base + row.days * 864e5; }
  else if (rank(row.role) === rank(ctx.role) && ctx.role !== 'free' && !(ctx.u.role_until > 0)) until = 0;
  const used = await env.DB.prepare('UPDATE codes SET used_by=?, used_at=? WHERE code=? AND used_by IS NULL AND revoked=0').bind(ctx.u.id, now, row.code).run();
  if (!(used.meta && used.meta.changes)) return json(env, { error: 'Mã đã được dùng.' }, 400);
  await env.DB.prepare('UPDATE users SET role=?, role_until=? WHERE id=?').bind(row.role, until, ctx.u.id).run();
  await audit(env, ctx.u.id, 'redeem', ctx.u.email, row.role + ' · ' + (row.days || 'vĩnh viễn') + ' ngày · mã tạo bởi ' + row.created_by);
  return json(env, { ok: true, role: row.role, roleName: RN[row.role], until });
}

/* ---------- Quản trị (admin trở lên) ---------- */
const genCode = () => { const A = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', b = crypto.getRandomValues(new Uint8Array(12)); let o = ''; for (let i = 0; i < 12; i++) { o += A[b[i] % A.length]; if (i % 4 === 3 && i < 11) o += '-'; } return o; };
async function targetUser(env, id) { return await env.DB.prepare('SELECT * FROM users WHERE id=?').bind(id).first(); }
async function admin(req, env, url, ctx) {
  if (rank(ctx.role) < 4) return json(env, { error: 'Cần quyền admin' }, 403);
  const path = url.pathname.slice('/api/admin/'.length), method = req.method, me = ctx.role, actor = ctx.u.email;
  const founder = me === 'founder';
  if (path === 'overview') {
    const now = Date.now();
    const u = await env.DB.prepare('SELECT COUNT(*) n, SUM(last_seen>?) a1, SUM(last_seen>?) a7, SUM(created>?) new7, SUM(banned=1) bn FROM users').bind(now - 864e5, now - 7 * 864e5, now - 7 * 864e5).first();
    const it = await env.DB.prepare('SELECT COUNT(*) n, COALESCE(SUM(size),0) s FROM items WHERE deleted=0').first();
    const ch = await env.DB.prepare('SELECT COALESCE(SUM(size),0) s FROM chunks').first();
    const bl = await env.DB.prepare('SELECT COUNT(*) n, COALESCE(SUM(size),0) s FROM blobs').first();
    const { results: byRole } = await env.DB.prepare('SELECT role, role_until, email FROM users').all();
    const cnt = {}; byRole.forEach(r => { const e = effRole({ role: r.role, role_until: r.role_until, email: r.email }, env); cnt[e] = (cnt[e] || 0) + 1; });
    const { results: use } = await env.DB.prepare('SELECT day, kind, SUM(n) n FROM usage WHERE day>=? GROUP BY day, kind ORDER BY day').bind(new Date(now - 13 * 864e5).toISOString().slice(0, 10)).all();
    const codes = await env.DB.prepare('SELECT COUNT(*) n, SUM(used_by IS NOT NULL) u FROM codes WHERE revoked=0').first();
    return json(env, { users: u, byRole: cnt, items: it, storage: { total: ch.s + it.s, files: bl }, usage: use, codes });
  }
  if (path === 'users' && method === 'GET') {
    const q = '%' + String(url.searchParams.get('q') || '').toLowerCase() + '%';
    const { results } = await env.DB.prepare('SELECT u.id,u.email,u.name,u.picture,u.role,u.role_until,u.banned,u.ban_reason,u.deny,u.ip,u.country,u.last_seen,u.created,u.logins,u.note,'
      + '(SELECT COUNT(*) FROM items i WHERE i.uid=u.id AND i.deleted=0) items,(SELECT COALESCE(SUM(size),0) FROM items i WHERE i.uid=u.id AND i.deleted=0) isize,'
      + '(SELECT COUNT(*) FROM blobs b WHERE b.uid=u.id) files,(SELECT COALESCE(SUM(size),0) FROM blobs b WHERE b.uid=u.id) fsize '
      + 'FROM users u WHERE LOWER(u.email) LIKE ? OR LOWER(u.name) LIKE ? ORDER BY u.last_seen DESC LIMIT 300').bind(q, q).all();
    return json(env, { users: results.map(r => ({ ...r, eff: effRole(r, env), deny: denyOf(r) })) });
  }
  if (path === 'user' && method === 'GET') {
    const id = url.searchParams.get('id'), u = await targetUser(env, id); if (!u) return json(env, { error: 'không có' }, 404);
    const { results: ips } = await env.DB.prepare('SELECT ip,country,ua,t FROM iplog WHERE uid=? ORDER BY t DESC LIMIT 40').bind(id).all();
    const { results: ns } = await env.DB.prepare('SELECT ns, COUNT(*) n, COALESCE(SUM(size),0) s FROM items WHERE uid=? AND deleted=0 GROUP BY ns ORDER BY s DESC').bind(id).all();
    const { results: use } = await env.DB.prepare('SELECT day, kind, n FROM usage WHERE uid=? ORDER BY day DESC LIMIT 60').bind(id).all();
    return json(env, { user: { ...u, eff: effRole(u, env), deny: denyOf(u) }, ips, ns, usage: use });
  }
  if (path === 'user' && method === 'POST') {
    const b = await req.json().catch(() => ({})), u = await targetUser(env, b.id); if (!u) return json(env, { error: 'không có' }, 404);
    const cur = effRole(u, env);
    if (u.id === ctx.u.id) return json(env, { error: 'Không tự sửa tài khoản của mình ở đây.' }, 400);
    if (rank(cur) >= rank(me)) return json(env, { error: 'Không đủ quyền với tài khoản này.' }, 403);
    const sets = [], vals = [], log = [];
    if (b.role !== undefined) {
      if (!ROLES.includes(b.role) || b.role === 'founder') return json(env, { error: 'hạng không hợp lệ' }, 400);
      if (rank(b.role) >= rank(me)) return json(env, { error: 'Chỉ được cấp hạng thấp hơn hạng của bạn.' }, 403);
      const days = Math.max(0, Math.min(3650, Number(b.days) || 0));
      sets.push('role=?', 'role_until=?'); vals.push(b.role, days ? Date.now() + days * 864e5 : 0); log.push('hạng ' + b.role + (days ? ' ' + days + ' ngày' : ' vĩnh viễn'));
    }
    if (b.banned !== undefined) { sets.push('banned=?', 'ban_reason=?'); vals.push(b.banned ? 1 : 0, b.banned ? String(b.reason || '').slice(0, 200) : ''); log.push(b.banned ? 'KHÓA: ' + (b.reason || '') : 'mở khóa'); }
    if (b.deny !== undefined) { const d = (Array.isArray(b.deny) ? b.deny : []).filter(x => FEATURES[x]); sets.push('deny=?'); vals.push(JSON.stringify(d)); log.push('chặn: ' + (d.join(',') || 'không')); }
    if (b.note !== undefined) { sets.push('note=?'); vals.push(String(b.note || '').slice(0, 300)); }
    if (!sets.length) return json(env, { error: 'không có gì để đổi' }, 400);
    await env.DB.prepare('UPDATE users SET ' + sets.join(',') + ' WHERE id=?').bind(...vals, u.id).run();
    await audit(env, actor, 'user.update', u.email, log.join(' | '));
    return json(env, { ok: true });
  }
  if (path === 'items' && method === 'GET') {
    const uid = url.searchParams.get('uid'), ns = url.searchParams.get('ns');
    const q = ns ? env.DB.prepare('SELECT ns,k,updated,size,deleted FROM items WHERE uid=? AND ns=? ORDER BY updated DESC LIMIT 500').bind(uid, ns) : env.DB.prepare('SELECT ns,k,updated,size,deleted FROM items WHERE uid=? ORDER BY updated DESC LIMIT 500').bind(uid);
    return json(env, { items: (await q.all()).results });
  }
  if (path === 'item' && method === 'GET') {
    const uid = url.searchParams.get('uid'), ns = url.searchParams.get('ns'), k = url.searchParams.get('k');
    const row = await env.DB.prepare('SELECT val,cid FROM items WHERE uid=? AND ns=? AND k=?').bind(uid, ns, k).first();
    if (!row) return json(env, { error: 'không có' }, 404);
    await audit(env, actor, 'view.item', uid, ns + '/' + k);
    let body = row.val;
    if (row.cid) { const { results } = await env.DB.prepare('SELECT data FROM chunks WHERE uid=? AND id=? ORDER BY n').bind(uid, row.cid).all(); body = results.map(r => r.data).join(''); }
    return new Response(body, { headers: { 'content-type': 'application/json', 'cache-control': 'no-store', ...CORS(env) } });
  }
  if (path === 'blobs' && method === 'GET') {
    const { results } = await env.DB.prepare('SELECT hash,size,type,parts,created FROM blobs WHERE uid=? ORDER BY created DESC LIMIT 500').bind(url.searchParams.get('uid')).all();
    return json(env, { blobs: results });
  }
  if (path === 'blob' && method === 'GET') {
    const uid = url.searchParams.get('uid'), hash = url.searchParams.get('hash'), n = Number(url.searchParams.get('n')) || 0;
    if (!/^[a-f0-9]{64}$/.test(hash || '')) return json(env, { error: 'hash' }, 400);
    if (n === 0) await audit(env, actor, 'view.blob', uid, hash.slice(0, 12));
    const r = await env.DB.prepare('SELECT data FROM chunks WHERE uid=? AND id=? AND n=?').bind(uid, 'b:' + hash, n).first();
    return r ? text(env, r.data) : json(env, { error: 'không có' }, 404);
  }
  if (path === 'codes' && method === 'GET') {
    const { results } = await env.DB.prepare('SELECT c.*, u.email used_email FROM codes c LEFT JOIN users u ON u.id=c.used_by ORDER BY c.created DESC LIMIT 200').all();
    return json(env, { codes: results });
  }
  if (path === 'code' && method === 'POST') {
    const b = await req.json().catch(() => ({}));
    if (!ROLES.includes(b.role) || b.role === 'free' || b.role === 'founder') return json(env, { error: 'hạng không hợp lệ' }, 400);
    if (rank(b.role) >= rank(me)) return json(env, { error: 'Chỉ tạo được mã cho hạng thấp hơn hạng của bạn.' }, 403);
    const days = Math.max(0, Math.min(3650, Number(b.days) || 0)), count = Math.max(1, Math.min(20, Number(b.count) || 1));
    const exp = b.expDays ? Date.now() + Math.min(365, Number(b.expDays)) * 864e5 : 0, out = [];
    for (let i = 0; i < count; i++) { const code = genCode(); await env.DB.prepare('INSERT INTO codes (code,role,days,created_by,created,expires,note) VALUES (?,?,?,?,?,?,?)').bind(code, b.role, days, actor, Date.now(), exp, String(b.note || '').slice(0, 100)).run(); out.push(code); }
    await audit(env, actor, 'code.create', b.role, count + ' mã · ' + (days || 'vĩnh viễn') + ' ngày');
    return json(env, { ok: true, codes: out });
  }
  if (path === 'code/revoke' && method === 'POST') {
    const { code } = await req.json().catch(() => ({}));
    await env.DB.prepare('UPDATE codes SET revoked=1 WHERE code=? AND used_by IS NULL').bind(code).run();
    await audit(env, actor, 'code.revoke', code, ''); return json(env, { ok: true });
  }
  if (path === 'audit' && method === 'GET') {
    const { results } = await env.DB.prepare('SELECT t,actor,action,target,detail FROM audit ORDER BY id DESC LIMIT 200').all();
    return json(env, { audit: results });
  }
  return json(env, { error: 'không tìm thấy' }, 404);
}

/* ---------- Cổng Netlify: khóa thật nằm ở Worker, chỉ Pro trở lên mới đi qua ---------- */
async function nlProxy(req, env, url) {
  const tk = (/^Bearer (.+)$/.exec(req.headers.get('authorization') || '') || [])[1] || req.headers.get('x-api-key') || '';
  const uid = await readTokenStr(tk, env); if (!uid) return json(env, { error: 'Cần đăng nhập tài khoản Pro trở lên để dùng Netlify.' }, 401);
  const u = await targetUser(env, uid); if (!u) return json(env, { error: 'Cần đăng nhập lại.' }, 401);
  const role = effRole(u, env), deny = denyOf(u);
  if (u.banned) return json(env, { error: 'Tài khoản bị khóa.' }, 403);
  if (!featMap(role, deny).netlify) return json(env, { error: 'Netlify chỉ dành cho tài khoản Pro trở lên (hạng của bạn: ' + RN[role] + ').' }, 403);
  if (!env.NL_KEY || !env.NL_UPSTREAM) return json(env, { error: 'Chưa cấu hình NL_KEY / NL_UPSTREAM trên Worker.' }, 503);
  const up = env.NL_UPSTREAM.replace(/\/+$/, '') + url.pathname.slice(3) + url.search, h = new Headers();
  for (const k of ['content-type', 'accept', 'anthropic-version', 'anthropic-beta']) { const v = req.headers.get(k); if (v) h.set(k, v); }
  if (req.headers.get('x-api-key')) h.set('x-api-key', env.NL_KEY); else h.set('authorization', 'Bearer ' + env.NL_KEY);
  await countUse(env, uid, 'nl');
  const r = await fetch(up, { method: req.method, headers: h, body: (req.method === 'GET' || req.method === 'HEAD') ? undefined : req.body });
  const oh = new Headers(); for (const k of ['content-type', 'cache-control']) { const v = r.headers.get(k); if (v) oh.set(k, v); }
  for (const [k, v] of Object.entries(CORS(env))) oh.set(k, v);
  return new Response(r.body, { status: r.status, headers: oh });
}


/* ---------- Cổng Pollinations: khóa sk_ nằm ở Worker (secret POLLI_KEYS, nhiều khóa cách nhau dấu phẩy), chỉ Pro trở lên ----------
   Client gọi  <API>/pk/chat/completions  hoặc  <API>/pk/models  với  Authorization: Bearer <token đăng nhập>.
   Khóa bị từ chối / hết pollen / quá giới hạn (401·402·403·429) thì Worker tự thử khóa kế tiếp. */
const PK_UP = 'https://gen.pollinations.ai/v1';
async function pkProxy(req, env, url) {
  const tk = (/^Bearer (.+)$/.exec(req.headers.get('authorization') || '') || [])[1] || req.headers.get('x-dobai-token') || '';
  const uid = await readTokenStr(tk, env); if (!uid) return json(env, { error: 'Cần đăng nhập tài khoản Pro trở lên để dùng Pollinations.' }, 401);
  const u = await targetUser(env, uid); if (!u) return json(env, { error: 'Cần đăng nhập lại.' }, 401);
  const role = effRole(u, env), deny = denyOf(u);
  if (u.banned) return json(env, { error: 'Tài khoản bị khóa.' }, 403);
  if (!featMap(role, deny).pollinations) return json(env, { error: 'Pollinations chỉ dành cho tài khoản Pro trở lên (hạng của bạn: ' + RN[role] + ').' }, 403);
  const keys = String(env.POLLI_KEYS || '').split(/[\s,]+/).filter((k) => /^sk_[\w-]+$/.test(k));
  if (!keys.length) return json(env, { error: 'Chưa cấu hình POLLI_KEYS trên Worker.' }, 503);
  const rest = url.pathname.slice(3);   // bỏ "/pk"
  if (!/^\/(chat\/completions|models)\/?$/.test(rest)) return json(env, { error: 'Đường dẫn không được phép.' }, 404);
  const isGet = req.method === 'GET' || req.method === 'HEAD';
  let body; if (!isGet) { body = await req.text(); if (body.length > 20e6) return json(env, { error: 'Yêu cầu quá lớn.' }, 413); }
  const start = Math.floor(Math.random() * keys.length); let r = null, lastErr = '';
  for (let i = 0; i < keys.length; i++) {
    const h = new Headers(); h.set('authorization', 'Bearer ' + keys[(start + i) % keys.length]);
    for (const k of ['content-type', 'accept']) { const v = req.headers.get(k); if (v) h.set(k, v); }
    try { r = await fetch(PK_UP + rest + url.search, { method: req.method, headers: h, body }); }
    catch (e) { lastErr = String(e && e.message || e); r = null; continue; }
    if (![401, 402, 403, 429].includes(r.status)) break;
  }
  if (!r) return json(env, { error: 'Không nối được Pollinations: ' + lastErr }, 502);
  await countUse(env, uid, 'pk');
  const oh = new Headers(); for (const k of ['content-type', 'cache-control', 'retry-after']) { const v = r.headers.get(k); if (v) oh.set(k, v); }
  for (const [k, v] of Object.entries(CORS(env))) oh.set(k, v);
  oh.set('access-control-expose-headers', 'retry-after');
  return new Response(r.body, { status: r.status, headers: oh });
}

/* ---------- Cổng chuyển tiếp cho các nhà cung cấp AI không cho trang web gọi trực tiếp (CORS) ----------
   Client gọi  <API>/px/<mã>/chat/completions  kèm  Authorization: Bearer <khóa nhà cung cấp>  và  X-Dobai-Token: <token đăng nhập>.
   Worker chỉ chuyển tiếp tới đúng các địa chỉ trong danh sách bên dưới (không phải proxy mở). Không lưu khóa. */
const PX = {
  it: 'https://api.iteracompute.com/v1',
  za: 'https://api.z.ai/api/paas/v4',
  ap: 'https://apinex.bond/v1',
  gq: 'https://api.groq.com/openai/v1',
  co: 'https://api.cohere.ai/compatibility/v1',
  xc: 'https://api.xingchiapi.com/v1',
  ly: 'https://ocr.laychu.com/v1',
};
async function pxProxy(req, env, url) {
  const m = /^\/px\/([a-z]{2})(\/.*)?$/.exec(url.pathname); const base = m && PX[m[1]];
  if (!base) return json(env, { error: 'Nhà cung cấp không được hỗ trợ.' }, 404);
  /* Không cần đăng nhập (khóa nhà cung cấp do trang tự gửi, Worker không giữ bí mật nào) — vì trang có thể mở từ tệp trên điện thoại (origin "null").
     Nếu có token đăng nhập hợp lệ thì kiểm tra khóa/chặn tính năng và đếm lượt dùng. */
  let uid = null;
  const tk = req.headers.get('x-dobai-token') || '';
  if (tk) uid = await readTokenStr(tk, env);
  if (uid) {
    const u = await targetUser(env, uid);
    if (u) {
      const role = effRole(u, env), deny = denyOf(u);
      if (u.banned) return json(env, { error: 'Tài khoản bị khóa.' }, 403);
      if (!featMap(role, deny).ai) return json(env, { error: 'Tài khoản bị chặn tính năng Chat AI.' }, 403);
    } else uid = null;
  }
  const rest = (m[2] || '/').replace(/\.\.+/g, '.');
  if (!/^\/(chat\/completions|responses|models)\/?$/.test(rest)) return json(env, { error: 'Đường dẫn không được phép.' }, 404);
  const h = new Headers();
  for (const k of ['content-type', 'accept', 'authorization']) { const v = req.headers.get(k); if (v) h.set(k, v); }
  let r;
  try { r = await fetch(base + rest + url.search, { method: req.method, headers: h, body: (req.method === 'GET' || req.method === 'HEAD') ? undefined : req.body }); }
  catch (e) { return json(env, { error: 'Không nối được máy chủ ' + m[1] + ': ' + (e && e.message || e) }, 502); }
  if (uid) { try { await countUse(env, uid, 'px'); } catch {} }
  const oh = new Headers(); for (const k of ['content-type', 'cache-control', 'retry-after']) { const v = r.headers.get(k); if (v) oh.set(k, v); }
  return new Response(r.body, { status: r.status, headers: oh });
}
const withStar = (r) => { const h = new Headers(r.headers); h.set('access-control-allow-origin', '*'); h.set('access-control-expose-headers', 'retry-after'); return new Response(r.body, { status: r.status, headers: h }); };

/* ---------- Trình duyệt đám mây cho AI (Cloudflare Browser Rendering qua CDP, không cần thư viện) ----------
   Biến cần có: CF_ACCOUNT_ID (Text), CF_BR_TOKEN (Secret, quyền "Browser Rendering - Edit"), tùy chọn BR_DAY_SEC (mặc định 540). */
const BRCAP = { 2: 120000, 3: 240000, 4: 360000, 5: 540000 };   // mili-giây/ngày theo hạng (pro, ultra, admin, founder)
const BR_IDLE = 60000;
const brBase = (env) => (env.BR_BASE || 'https://api.cloudflare.com/client/v4') + '/accounts/' + env.CF_ACCOUNT_ID + '/browser-run/devtools/browser';
const brH = (env) => ({ Authorization: 'Bearer ' + env.CF_BR_TOKEN });
const BR_SNAP = `(()=>{const vis=e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return r.width>3&&r.height>3&&s.visibility!=='hidden'&&s.display!=='none'};
document.querySelectorAll('[data-bi]').forEach(e=>e.removeAttribute('data-bi'));
const q='a[href],button,input:not([type=hidden]),select,textarea,[role=button],[role=link],[role=tab],[onclick],summary';
const els=[];for(const e of document.querySelectorAll(q)){if(els.length>=70)break;if(!vis(e))continue;const i=els.length+1;e.setAttribute('data-bi',i);
els.push({i,tag:e.tagName.toLowerCase(),type:e.type||'',text:(e.innerText||e.value||e.placeholder||e.getAttribute('aria-label')||e.title||'').trim().replace(/\\s+/g,' ').slice(0,70),href:e.tagName==='A'?(e.href||'').slice(0,100):''})}
return JSON.stringify({title:document.title,url:location.href,text:(document.body?document.body.innerText:'').replace(/\\n{3,}/g,'\\n\\n').slice(0,3500),els})})()`;
function brGuardUrl(u) {
  let x; try { x = new URL(u); } catch { return 'Địa chỉ không hợp lệ.'; }
  if (!/^https?:$/.test(x.protocol)) return 'Chỉ mở http/https.';
  const h = x.hostname.toLowerCase();
  if (h === 'localhost' || h.endsWith('.local') || h.endsWith('.internal') || /^(127\.|10\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.|0\.|\[)/.test(h)) return 'Không mở địa chỉ nội bộ.';
  return '';
}
function cdpConn(ws) {
  let id = 0; const pend = new Map();
  ws.addEventListener('message', (e) => { try { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { const p = pend.get(m.id); pend.delete(m.id); m.error ? p.rej(new Error(m.error.message || 'cdp')) : p.res(m.result || {}); } } catch {} });
  return (method, params, sessionId) => new Promise((res, rej) => {
    const i = ++id; pend.set(i, { res, rej });
    ws.send(JSON.stringify({ id: i, method, params: params || {}, sessionId }));
    setTimeout(() => { if (pend.has(i)) { pend.delete(i); rej(new Error('quá thời gian: ' + method)); } }, 25000);
  });
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function brCharge(env, uid, ms) {
  ms = Math.max(0, Math.round(ms)); if (!ms) return;
  for (const u of [uid, '*']) { try { await env.DB.prepare('INSERT INTO usage (uid,day,kind,n) VALUES (?,?,?,?) ON CONFLICT(uid,day,kind) DO UPDATE SET n=n+?').bind(u, dayKey(), 'brms', ms, ms).run(); } catch {} }
}
async function brUsed(env, uid) { const r = await env.DB.prepare('SELECT n FROM usage WHERE uid=? AND day=? AND kind=?').bind(uid, dayKey(), 'brms').first(); return r ? r.n : 0; }
async function brProxy(req, env, url) {
  const tk = (/^Bearer (.+)$/.exec(req.headers.get('authorization') || '') || [])[1] || '';
  const uid = await readTokenStr(tk, env); if (!uid) return json(env, { error: 'Cần đăng nhập.' }, 401);
  const u = await targetUser(env, uid); if (!u) return json(env, { error: 'Cần đăng nhập lại.' }, 401);
  const role = effRole(u, env), deny = denyOf(u);
  if (u.banned) return json(env, { error: 'Tài khoản bị khóa.' }, 403);
  if (!featMap(role, deny).browser) return json(env, { error: 'Trình duyệt cho AI dành cho tài khoản Pro trở lên (hạng của bạn: ' + RN[role] + ').' }, 403);
  if (!env.CF_ACCOUNT_ID || !env.CF_BR_TOKEN) return json(env, { error: 'Chưa cấu hình CF_ACCOUNT_ID / CF_BR_TOKEN trên Worker.' }, 503);
  if (req.method !== 'POST') return json(env, { error: 'dùng POST' }, 405);
  let b = {}; try { b = await req.json(); } catch {}
  const act = String(b.action || ''), cap = BRCAP[rank(role)] || 0, dayCap = (Number(env.BR_DAY_SEC) || 540) * 1000;
  const mine = await brUsed(env, uid), all = await brUsed(env, '*');
  const info = { usedSec: Math.round(mine / 1000), capSec: Math.round(cap / 1000), allSec: Math.round(all / 1000), allCapSec: Math.round(dayCap / 1000) };
  if (act === 'usage') return json(env, info);
  const t0 = Date.now(), rk = 'brs:' + uid;
  let sid = String(b.sid || '').replace(/[^A-Za-z0-9_-]/g, '');
  const closeSess = async () => { if (sid) { try { await fetch(brBase(env) + '/' + sid, { method: 'DELETE', headers: brH(env) }); } catch {} await env.DB.prepare('DELETE FROM rl WHERE k=?').bind(rk + ':' + sid).run(); } };
  if (act === 'close') {
    const r = sid ? await env.DB.prepare('SELECT t FROM rl WHERE k=?').bind(rk + ':' + sid).first() : null;
    if (r) await brCharge(env, uid, Math.min(t0 - r.t, BR_IDLE));
    await closeSess(); return json(env, { ok: true });
  }
  if (mine >= cap || all >= dayCap) return json(env, { error: mine >= cap ? 'Hết thời gian trình duyệt hôm nay của hạng bạn (' + info.capSec + ' giây/ngày).' : 'Hết thời gian trình duyệt miễn phí hôm nay của cả hệ thống (Cloudflare giới hạn 10 phút/ngày). Thử lại sau 07:00 sáng mai (giờ Việt Nam).' }, 429);
  let ws = null, ok = false;
  try {
    if (act === 'open' || !sid) {
      const bad = act === 'open' ? brGuardUrl(b.url) : ''; if (bad) return json(env, { error: bad }, 400);
      if (!sid) {
        const cr = await fetch(brBase(env) + '?keep_alive=' + BR_IDLE, { method: 'POST', headers: brH(env) });
        const cj = await cr.json().catch(() => ({}));
        sid = String(cj.sessionId || (cj.result && cj.result.sessionId) || '').replace(/[^A-Za-z0-9_-]/g, '');
        if (!sid) return json(env, { error: 'Không tạo được phiên trình duyệt (' + cr.status + '): ' + JSON.stringify(cj).slice(0, 200) }, 502);
        await env.DB.prepare('INSERT OR REPLACE INTO rl (k,n,t) VALUES (?,?,?)').bind(rk + ':' + sid, 1, Date.now()).run();
      }
    } else {
      const r = await env.DB.prepare('SELECT t FROM rl WHERE k=?').bind(rk + ':' + sid).first();
      if (!r) return json(env, { error: 'Phiên trình duyệt đã đóng. Hãy mở lại bằng action open.', closed: true }, 410);
      await brCharge(env, uid, Math.min(t0 - r.t, BR_IDLE));
    }
    const wr = await fetch(brBase(env) + '/' + sid, { headers: Object.assign({ Upgrade: 'websocket' }, brH(env)) });
    ws = wr.webSocket; if (!ws) return json(env, { error: 'Không kết nối được trình duyệt (' + wr.status + ').', closed: true }, 502);
    ws.accept(); const cdp = cdpConn(ws);
    let tg = (await cdp('Target.getTargets')).targetInfos || []; let page = tg.find((x) => x.type === 'page');
    if (!page) { const c = await cdp('Target.createTarget', { url: 'about:blank' }); page = { targetId: c.targetId }; }
    const { sessionId: ss } = await cdp('Target.attachToTarget', { targetId: page.targetId, flatten: true });
    const P = (m, p) => cdp(m, p, ss), ev = async (expr) => { const r = await P('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true }); return r.result ? r.result.value : undefined; };
    await P('Page.enable'); await P('Emulation.setDeviceMetricsOverride', { width: 800, height: 600, deviceScaleFactor: 1, mobile: false });
    const settle = async (ms) => { await sleep(ms || 800); for (let i = 0; i < 12; i++) { let st = ''; try { st = await ev('document.readyState'); } catch {} if (st === 'complete') break; await sleep(500); } };
    const center = async (i) => ev('(()=>{const e=document.querySelector(\'[data-bi="' + (Number(i) | 0) + '"]\');if(!e)return null;e.scrollIntoView({block:"center",inline:"center"});const r=e.getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2}})()');
    const click = async (x, y) => { for (const t of ['mouseMoved', 'mousePressed', 'mouseReleased']) await P('Input.dispatchMouseEvent', { type: t, x, y, button: 'left', clickCount: 1 }); };
    const KEYS = { Enter: [13, '\r'], Tab: [9, ''], Escape: [27, ''], Backspace: [8, ''], ArrowDown: [40, ''], ArrowUp: [38, ''], PageDown: [34, ''], PageUp: [33, ''], Space: [32, ' '] };
    const press = async (k) => { const d = KEYS[k]; if (!d) return; const o = { key: k === 'Space' ? ' ' : k, code: k, windowsVirtualKeyCode: d[0] }; await P('Input.dispatchKeyEvent', Object.assign({ type: d[1] ? 'keyDown' : 'rawKeyDown', text: d[1] || undefined }, o)); await P('Input.dispatchKeyEvent', Object.assign({ type: 'keyUp' }, o)); };
    let note = '';
    if (act === 'open') { const nv = await P('Page.navigate', { url: b.url }); if (nv.errorText) note = 'Lỗi mở trang: ' + nv.errorText; await settle(1200); }
    else if (act === 'click') { const c = b.i ? await center(b.i) : (b.x != null ? { x: +b.x, y: +b.y } : null); if (!c) note = 'Không thấy phần tử số ' + b.i + ' (có thể trang đã đổi, hãy đọc lại danh sách).'; else { await click(c.x, c.y); await settle(1300); } }
    else if (act === 'type') { const c = await center(b.i); if (!c) note = 'Không thấy ô số ' + b.i + '.'; else { await click(c.x, c.y); await ev('(()=>{const e=document.activeElement;if(e&&e.select)e.select()})()'); await P('Input.insertText', { text: String(b.text || '').slice(0, 2000) }); if (b.submit) { await press('Enter'); await settle(1500); } else await sleep(300); } }
    else if (act === 'key') { await press(String(b.key || '')); await settle(1000); }
    else if (act === 'scroll') { await ev('window.scrollBy(0,' + (Number(b.dy) || 500) + ')'); await sleep(400); }
    else if (act === 'back') { await ev('history.back()'); await settle(1000); }
    else if (act === 'wait') { await sleep(Math.min(8000, Math.max(200, Number(b.ms) || 1500))); }
    else if (act === 'hover') { const c = await center(b.i); if (!c) note = 'Không thấy phần tử số ' + b.i + '.'; else { await P('Input.dispatchMouseEvent', { type: 'mouseMoved', x: c.x, y: c.y }); await sleep(600); } }
    else if (act === 'select') {
      const r = await ev('(()=>{const e=document.querySelector(\'[data-bi="' + (Number(b.i) | 0) + '"]\');if(!e)return "none";if(e.tagName!=="SELECT")return "notselect";const t=' + JSON.stringify(String(b.text == null ? (b.option == null ? '' : b.option) : b.text).toLowerCase()) + ';const o=[...e.options].find(o=>o.value.toLowerCase()===t||o.text.trim().toLowerCase()===t)||[...e.options].find(o=>o.text.toLowerCase().includes(t));if(!o)return "noopt";e.value=o.value;e.dispatchEvent(new Event("input",{bubbles:true}));e.dispatchEvent(new Event("change",{bubbles:true}));return "ok"})()');
      note = r === 'ok' ? '' : r === 'none' ? 'Không thấy phần tử số ' + b.i + '.' : r === 'notselect' ? 'Phần tử số ' + b.i + ' không phải ô chọn (select); dùng click.' : 'Không có lựa chọn khớp "' + (b.text || b.option || '') + '".';
      await settle(800);
    }
    else if (act === 'find') {
      const r = await ev('(()=>{const t=' + JSON.stringify(String(b.query || b.text || '').toLowerCase()) + ';if(!t)return "";const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;while((n=w.nextNode())){const v=n.nodeValue;const k=v.toLowerCase().indexOf(t);if(k>=0&&n.parentElement&&n.parentElement.getClientRects().length){n.parentElement.scrollIntoView({block:"center"});return (n.parentElement.innerText||v).replace(/\\s+/g," ").slice(0,300)}}return ""})()');
      note = r ? 'Đã cuộn tới chỗ có chữ "' + (b.query || b.text) + '": ' + r : 'Không thấy chữ "' + (b.query || b.text || '') + '" trên trang.';
      await sleep(300);
    }
    else if (act !== 'read') return json(env, { error: 'action không hợp lệ' }, 400);
    let snap = {}; try { snap = JSON.parse(await ev(BR_SNAP.replace('slice(0,3500)', 'slice(0,' + Math.min(9000, Math.max(1500, Number(b.max) || 3500)) + ')').replace('els.length>=70', 'els.length>=' + Math.min(150, Math.max(30, Number(b.maxEls) || 70))))); } catch (e) { note = (note + ' Không đọc được trang: ' + e.message).trim(); }
    let img = ''; if (b.shot !== false) { try { img = (await P('Page.captureScreenshot', b.full ? { format: 'jpeg', quality: 40, captureBeyondViewport: true } : { format: 'jpeg', quality: b.hq ? 70 : 45 })).data || ''; } catch {} }
    ok = true;
    const dt = Date.now() - t0; await env.DB.prepare('UPDATE rl SET t=? WHERE k=?').bind(Date.now(), rk + ':' + sid).run(); await brCharge(env, uid, dt);
    await countUse(env, uid, 'br');
    return json(env, { ok: true, sid, note, title: snap.title || '', url: snap.url || '', text: snap.text || '', els: snap.els || [], img, usedSec: Math.round((mine + dt) / 1000), capSec: info.capSec });
  } catch (e) {
    return json(env, { error: 'Lỗi trình duyệt: ' + (e && e.message || e), sid }, 502);
  } finally { try { if (ws) ws.close(1000, 'bye'); } catch {} }
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url), path = url.pathname;
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: path.startsWith('/px/') ? { ...CORS(env), 'access-control-allow-origin': '*' } : CORS(env) });
    if (!env.SESSION_SECRET) return json(env, { error: 'Chưa cấu hình SESSION_SECRET' }, 500);
    try {
      await initDb(env);
      if (path === '/api/config') return json(env, { clientId: env.GOOGLE_CLIENT_ID });
      if (path === '/auth/google' && req.method === 'POST') return await login(req, env);
      if (path === '/auth/dev' && env.DEV_LOGIN === '1' && req.method === 'POST') {   // chỉ để thử trên máy
        await env.DB.prepare('INSERT OR IGNORE INTO users (id,email,name,picture,created) VALUES (?,?,?,?,?)').bind('dev', 'dev@local', 'Dev', '', Date.now()).run();
        const who = new URL(req.url).searchParams.get('as');   // thử vai trò: ?as=email@x.com
        if (who) { await env.DB.prepare('INSERT OR IGNORE INTO users (id,email,name,picture,created) VALUES (?,?,?,?,?)').bind('dev:' + who, who, who, '', Date.now()).run(); return json(env, { ok: true, token: await makeToken(env, 'dev:' + who) }); }
        return json(env, { ok: true, token: await makeToken(env, 'dev') });
      }
      if (path === '/') return text(env, 'API đang chạy.');
      if (path.startsWith('/nl/')) return await nlProxy(req, env, url);
      if (path.startsWith('/pk/')) return await pkProxy(req, env, url);
      if (path === '/br') return await brProxy(req, env, url);
      if (path.startsWith('/px/')) return withStar(await pxProxy(req, env, url));
      const uid = await readToken(req, env);
      if (!uid) return json(env, { error: 'chưa đăng nhập' }, 401);
      const u = await env.DB.prepare('SELECT * FROM users WHERE id=?').bind(uid).first();
      if (!u) return json(env, { error: 'chưa đăng nhập' }, 401);
      const role = effRole(u, env), deny = denyOf(u);
      const ctx = { u, role, deny, feat: featMap(role, deny) };
      if (u.banned && role !== 'founder' && path !== '/api/me') return json(env, { error: 'Tài khoản đã bị khóa' + (u.ban_reason ? ': ' + u.ban_reason : '') + '.', banned: true }, 403);
      await touch(env, u, req);
      if (path === '/api/me' && u.banned && role !== 'founder') return json(env, { banned: true, reason: u.ban_reason || '', user: { email: u.email, name: u.name, picture: u.picture } });
      return await api(req, env, url, uid, ctx);
    } catch (e) { return json(env, { error: 'lỗi máy chủ: ' + (e && e.message || e) }, 500); }
  },
};
