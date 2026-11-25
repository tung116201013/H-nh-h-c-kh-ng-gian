# GIAO VIỆC CHO HYDROGEN — LÔ 2 "CHẠY & KIỂM" (6 khối trong MỘT lượt)

Bạn là phụ tá của Claude trong dự án **dobai** (web học tiếng Anh một file `index.html` + Cloudflare Worker, chạy trên điện thoại). Claude KHÔNG viết mã nặng: **bạn viết, Claude ghép vào `index.html` thật và chạy thử bằng Playwright.** Lô 1 (kho thư viện + phong cách + thành phần mẫu) **đã ghép và chạy được**; lô này xây tiếp lên nó. Làm hết trong một lần nộp.

## 0. Đính kèm và cách dùng
| Tệp | Dùng để |
|---|---|
| `KE_HOACH_KHO_THU_VIEN_VA_CONG_CU_CODE.md` | **Đặc tả.** Lô này làm: **L4, L5, L6, L7** (mục 2), **T2, T3** (mục B2), hợp đồng C2. Chỗ nào tệp này viết khác thì **tệp này thắng**. |
| `dobai-khoi-LO1.html` | **6 khối Lô 1 đã chạy thật (nguồn sự thật về `LIBX`)**: `lib-core`, `lib-ingest`+`lb-css`, `lib-ui`, `lib-bridge`, `ae-core`, `ae-comp`+`ae-css`. Đọc để biết hàm nào có thật và chữ ký thật; mẫu phong cách. |
| `web-ai-khoi-v2.html` | Khối `web-ai` v2: cơ chế đăng ký hành động `web:` (`document.__wsReg`), `ask`, `AG.sys`, `FC.loop`. |
| `TRICH_preview_screenshot_FCloop.js` | **Trích từ `index.html`**: cơ chế `preview`/`screenshot`/tự kiểm tra **đã có sẵn** trong script chính (iframe cách ly `pvHookFn`, đo tương phản, bắt lỗi, `viewOne`) và mẫu `FC.loop` của `agx-ext`. **Tái dùng ý tưởng/cách gọi, không viết lại; không có hàm nào trong đó truy cập được từ khối của bạn trừ khi ghi ở mục D.** |
| `dobai-khoi-A0-A3b.html` | Khối A0–A3b: API `TL` (`TL.mkErr/fold/lib/register/open…`). |
| `TONG_HOP_CHUYEN_PHIEN_v5.md` | Bối cảnh, luật chèn khối. |

**Không có** `index.html` (7 MB). Chỉ dùng tên toàn cục **có trong các tệp trên** (`TL`, `LIBX`, `toast`, `AG`, `FC`, `AF`). Cần tên/API khác thì ghi ở **mục D, không đoán, không bịa**.

## 1. Sáu khối phải nộp (mỗi khối một code block riêng)
Chèn trước `<script src="/cfsync.js">`, **sau** 6 khối Lô 1, theo thứ tự: `code-run → code-check → code-snips → code-loop → ae-check → ae-eye`. **Thứ tự bạn viết/nộp (ưu tiên khi bị cắt):** L4 → L5 → T2 → L6 → L7 → T3.

| # | Khối | Phase | Tiền tố CSS / thuộc tính |
|---|---|---|---|
| 1 | `<script id="code-run">` | L4 Runner `LIBX.run` + `web:exec` | `rx-` / `data-rx-*` (nếu cần giao diện) |
| 2 | `<script id="code-check">` | L5 kiểm mã `LIBX.check` + `web:check` | — |
| 3 | `<script id="ae-check">` | T2 `LIBX.aesth` + `web:aesth` (dùng Runner) | — |
| 4 | `<script id="code-snips">` | L6 ngân hàng mẫu (`kind:'snip'`) | `rx-` |
| 5 | `<script id="code-loop">` | L7 vòng tự sửa + skill "Viết mã tốt" | — |
| 6 | `<script id="ae-eye">` | T3 `web:look` (mặc định Tắt) | — |

(Thứ tự **chèn** khác thứ tự **nộp**: chèn theo cột "Khối" ở đầu mục này.) Tiền tố `rx-`, `data-rx-*`: chưa ai dùng. **Không thêm tên toàn cục nào** — mọi thứ treo dưới `window.LIBX` (`LIBX.run`, `LIBX.check`, `LIBX.aesth`, `LIBX.snips`, `LIBX.loop`, `LIBX.look`).

## 2. Bài học bắt buộc (đã gây lỗi thật)
| Lỗi đã gặp | Quy tắc |
|---|---|
| `$` toàn cục của app là `querySelector` | Trong IIFE tự khai báo `const $ = id => document.getElementById(id)` |
| Trùng tên toàn cục | Không thêm tên toàn cục ngoài `LIBX` (đã tồn tại). Cấm: `TL, PDFX, IMGX, TS, V, S, D, W` |
| `stopPropagation()` làm chết nút (logic click của app ở `document`) | **Cấm.** Ủy quyền bằng `closest('[data-rx-…]')`; **không** dùng `data-uimp, data-tl-*, data-afc, data-af, data-pm-*, data-at-*, data-oc-*, data-ws-*, data-lb-*, data-ae-*` |
| `e.code` của `DOMException` là SỐ | Nhận lỗi `TL.mkErr` bằng `typeof e.code === 'string'` |
| `a \|\| b` với `''`/`0` | Dùng `== null` |
| `touch-action` của khung `#tl-ov` | Không `preventDefault` trên `touchmove` |
| `TL.mkErr` chỉ có mã: `unsupported, encrypted, corrupt, invalid, empty, too-large-for-device, network` | Chỉ dùng các mã này; mã mới (hết giờ chạy, bị chặn…) tự tạo `Error` có `.code` chuỗi + thông báo tiếng Việt **và ghi ở mục D**. Lô 1 đã tự tạo `lib-quota`. |
| **Lỗi bộ thử (Lô 1)**: bộ THỬ có kỳ vọng sai làm báo lỗi giả (ví dụ đặt trần kho ≥ 1 MB nên không bao giờ vượt; đòi mã liệt kê tệp mà mã chủ ý không tải) | **Bộ thử phải kiểm hành vi đã đặc tả, và tự chạy được thật trước khi nộp (đọc mã của chính bạn, dò từng kỳ vọng).** Ghi hằng số thật của `LIBX` (xem `dobai-khoi-LO1.html`): trần kho tối thiểu **1 MB** (`LIBX._.setCap`), `estTokens = ceil(ký tự/3.5)`, `LIBX.style.list/get/set/remove/clone` là **async**, `contrast/fix/cssVars/brief` là **đồng bộ**. |
| Bộ thử được Claude chạy bằng `page.evaluate('(' + src + ')()')` | Mỗi THỬ là một **hàm mũi tên `async () => {…}`** trả `{ten, dat, loi[], so}`; dọn mọi thứ nó tạo (xóa mẫu/thư viện thử) kể cả khi lỗi (`finally`). Trang thử **không có mạng**: giả lập `fetch`. |
| 2 bản khối khác nhau | Nộp **đúng MỘT** bản mỗi khối |

Luật chung: IIFE; try/catch mọi điểm vào; **không `localStorage`/`sessionStorage`** (cài đặt nhỏ lưu vào store `meta` của IndexedDB `dc-lib` qua API `LIBX` nếu có hàm tương ứng, nếu không thì giữ trong RAM và ghi ở D); chạy 100 % trên máy; nền sáng, nút ≥ 40 px, đúng ở 400 px, tiếng Việt, tôn trọng `prefers-reduced-motion`; **tự viết mã**; viết gọn, comment ngắn (tổng 6 khối ≲ 150 KB).

## 3. Hợp đồng (PHẢI đúng chữ ký; cái nào đã có ở Lô 1 thì dùng, đừng làm lại)
```
Đã có (Lô 1): LIBX.add/search/get/list/remove/pin/stats/export/import · LIBX._ .{estTokens, reload, setCap}
              LIBX.ingest.* · LIBX.ui.open/close · LIBX.style.{list,get,set,remove,clone,cssVars,brief,contrast,fix}
              LIBX._wsLib (hàm xử lý web:lib) · web:lib và web:style(chưa) — web:lib đã đăng ký
Phải làm (lô này):
LIBX.run({lang,code|file,libs,timeout})   → Promise<{ok,logs[],errors[],files?[],shot?}>        (code-run)
LIBX.check({file|code})                   → Promise<{ok,issues:[{sev,line?,col?,msg,fix?}]}>   (code-check)
LIBX.aesth({file|code,style,widths})      → Promise<{score,issues:[{sev,sel,measured,msg,fix}]}> (ae-check)
LIBX.snips.{save,list,remove}             (code-snips; lưu vào LIBX qua kind:'snip')
LIBX.loop.{enable,disable,isOn}           (code-loop)
LIBX.look({file|code,widths,vision})      → Promise<{img?,map?}>                                (ae-eye)
sev: 'nặng'|'vừa'|'nhẹ'      kind: 'doc'|'api'|'example'|'types'|'cheat'|'snip'|'style'|'comp'|'ui'
```
- Khối dùng `LIBX` do khối khác cung cấp: **dò `window.LIBX` rồi chờ tối đa 3 giây** (100 ms/lần); không có thì `toast('Kho thư viện chưa sẵn sàng')`, không ném lỗi.
- **Đăng ký hành động `web:`** bằng `document.__wsReg(kind, fn)` → `true/false`; `fn(body, {c, dl, json, ask})` trả **chuỗi** (kết quả đưa lại AI). `ask(key, title, detail)` → `Promise<boolean>`. Tên hành động chỉ `[a-z-]`: `exec`, `check`, `aesth`, `look`. Phải dò `document.__wsReg` chờ ≤ 3 s như `lib-bridge` (xem Lô 1), không có thì `console.warn`.
- Kết quả trả AI luôn **≤ 1 500 token** (ước lượng theo `LIBX._.estTokens`), cắt có ghi "(đã cắt …)". Nhật ký chạy ≤ 4 KB.
- `web:exec` cần **xin phép** (`ask('exec:run', …)`, lần đầu mỗi cuộc chat — `ask` đã nhớ lựa chọn "cho phép cả cuộc chat").

## 4. Ghi chú riêng từng khối (bổ sung đặc tả)
**L4 `code-run`.** Chạy **JS thuần** và **HTML tự chứa** trong `<iframe sandbox="allow-scripts" srcdoc>` (**không** `allow-same-origin`). Bắt `console.log/warn/error`, `window.onerror`, `unhandledrejection`, `<script>` onerror (lỗi CDN), hết giờ (mặc định 8 000 ms → gỡ iframe, trang chính vẫn mượt), nhật ký ≤ 4 KB. `libs:["pdf-lib@1.17.1"]` → chèn `<script src>` CDN **ghim phiên bản** (CDN: `cdn.jsdelivr.net/npm/<tên>@<ver>/<đường dẫn dist>`; **bạn không có bảng tên tệp dist → chỉ hỗ trợ bảng nhỏ do chính bạn tự khai báo cho 6 thư viện web đang dùng và ghi mức chắc chắn ở D**; thư viện không có trong bảng → báo `invalid` rõ ràng). Tệp Blob tạo trong iframe gửi ra bằng `postMessage` (`rx-` id ngẫu nhiên mỗi lần chạy, kiểm `e.source === iframe.contentWindow` và id). Không truyền khóa/`localStorage` vào iframe. Chụp ảnh: **dùng cách đã có trong `TRICH_preview_screenshot_FCloop.js`** nếu gọi được từ khối riêng; không gọi được thì trả `shot:null` + ghi D (đừng viết lại bộ chụp).
**L5 `code-check`.** Cú pháp JS: dùng `acorn` nạp lười từ CDN **ghim phiên bản** (ví dụ `acorn@8.11.3`, nêu số bạn chọn ở D) qua `<script>` tự chèn (không qua `TL.lib` nếu không có trong `LIB_DEFS`); không có mạng → rơi về `new Function`/`new Function('return async()=>{…}')` **không thực thi** (chỉ biên dịch) và ghi "cú pháp kiểm bằng trình duyệt, không có vị trí chính xác". JSON, HTML (`DOMParser`, thẻ không đóng, `id` trùng), CSS (`CSSStyleSheet.replaceSync`). Phân tích phạm vi nhẹ (biến chưa khai báo trừ danh sách toàn cục trình duyệt, `await` ngoài `async`). **Dò API bịa:** rút `Đối_tượng.hàm()`, so với `LIBX.search` của thư viện đang dùng; chỉ là gợi ý, ghi độ tin cậy. **Quy tắc riêng dobai** (bật khi `rules:'dobai'`): IIFE, tự khai báo `$`, không `stopPropagation`, tên toàn cục cấm, `typeof e.code === 'string'`, không `localStorage` khóa cấm (lấy từ bảng ở mục 2 của chính tệp này).
**T2 `ae-check`.** Chạy trong iframe cách ly **của Runner** (gọi `LIBX.run` hoặc hàm nội bộ dùng chung — nếu `LIBX.run` chưa sẵn sàng, chờ ≤ 3 s). Đo bằng `getComputedStyle` + `getBoundingClientRect`, bảng quy tắc/ngưỡng ở B2-T2 trong kế hoạch. **Ghi chú:** script chính đã có một bộ đo tương tự trong `pvHookFn` (xem tệp trích) — dùng làm tham khảo ý tưởng, mã của bạn **tự đầy đủ**. Kết quả ≤ 1 KB, điểm = 100 − 15×nặng − 5×vừa − 1×nhẹ (sàn 0). `fix` lấy từ `LIBX.style.fix`.
**L6 `code-snips`.** Nút "💾 Lưu mẫu" hiện **trong kết quả `web:exec` thành công** (do bạn không có DOM khung chat, **chỉ cung cấp `LIBX.snips.save(...)` và một trình nghe ủy quyền** `[data-rx-save]` + ghi cách Claude gắn nút ở D). Lưu qua `LIBX.add` với `kind:'snip'`; giới hạn 200 mẫu, ≤ 20 KB/mẫu; mẫu ghi phiên bản thư viện lúc chạy, gắn nhãn "cũ" khi kho đổi phiên bản ghim. `web:lib` đã tìm theo `kind`, bạn chỉ cần đảm bảo `snip` được xếp trước khi trùng từ khóa **nếu `LIBX.search` hiện tại chưa làm** — kiểm trong `lib-core` rồi ghi D, **không sửa `lib-core`**.
**L7 `code-loop`.** Công tắc **mặc định Tắt**. Khi bật, bọc `FC.loop` giống mẫu `web-ai`/`agx-ext` (xem tệp trích và `web-ai-khoi-v2.html`): với khối ` ```file:*.html/*.js ` AI vừa viết → chạy `check` → `exec` (và `aesth` cho `.html`, dùng **chung ngân sách 3 vòng**) rồi đẩy kết quả về AI (`c.msgs.push({r:'user', t, tool:1})` + `gRunInner(c)` như `web-ai`); dừng khi sạch lỗi hoặc `GSTOPPED`; hiển thị "🔁 Vòng 2/3". **Không nhân đôi** cơ chế `FC.loop` hiện có: bọc **một lần**, nếu bọc rồi thì không bọc nữa. Skill "Viết mã tốt": bạn **không có API `SK`** → chỉ soạn **nội dung skill** (markdown) xuất qua `LIBX.loop.skillText()` để Claude nối vào `propose_skills`; ghi D.
**T3 `ae-eye`.** Công tắc mặc định Tắt, chỉ chạy khi `aesth ≥ 80`. Ảnh: ≤ 800 px cạnh dài, JPEG 0,7, ≤ 2 ảnh/vòng; model **không** có thị giác → trả **bản đồ bố cục chữ** ≤ 600 token (tọa độ 0–1, cỡ chữ, màu). Bạn **không biết** model hiện tại có thị giác không: nhận tham số `vision:boolean` từ người gọi; mặc định `false` (an toàn). Thang 6 tiêu chí 0–2 viết thành prompt cho AI (xuất qua `LIBX.look.rubric()`).

## 5. ĐẦU RA (đúng thứ tự)
1. **Sáu khối** theo thứ tự ưu tiên ở mục 1. Trước mỗi khối một dòng: `PHẦN n — <khối> — ĐỦ` hoặc `DỞ`.
2. **Bộ thử cho từng khối** (mỗi khối một code block, tên `THỬ n`): `async () => { … return {ten, dat:boolean, loi:[…], so:{…}} }` chạy trong `page.evaluate` Chromium, **không mạng**. Phủ mọi dòng "Kiểm" trong đặc tả: L4 (mã `throw`, `await` hỏng, vòng lặp vô hạn bị cắt đúng hạn, mã cố đọc `parent.localStorage` bị chặn, script CDN lỗi, nhật ký ≤ 4 KB); L5 (**bộ 30 đoạn mẫu: 15 đúng + 15 lỗi cố ý** — in số bắt đúng/báo nhầm); T2 (**20 trang mẫu: 10 tốt + 10 lỗi cố ý** — in số bắt đúng/báo nhầm; chạy thử 6 preset + 24 thành phần của Lô 1: 0 lỗi nặng ngoài ngoại lệ đã ghi); L6 (lưu/tìm/xóa, nhãn "cũ"); L7 (AI giả lập: sai lần 1/đúng lần 2 → dừng; sai mãi → dừng ở 3; bấm Dừng); T3 (ảnh ≤ 800 px/JPEG; model không thị giác nhận bản đồ chữ; vượt trần ảnh bị chặn).
3. **Bảng tự rà (một bảng cho cả lô)** — các dòng: IIFE/`$`/không tên toàn cục mới/không `stopPropagation`/không `preventDefault` touchmove/không `localStorage`; `typeof e.code === 'string'` và mã lỗi mới; `== null`; tiền tố `rx-`; 400 px, nút ≥ 40 px; chờ `LIBX` ≤ 3 s không ném lỗi; **chữ ký từng hàm ở mục 3 (liệt kê hàm có)**; kết quả `web:*` ≤ 1 500 token, nhật ký ≤ 4 KB; iframe `sandbox="allow-scripts"` không `allow-same-origin`; hết giờ gỡ iframe; mỗi hành động `web:` đăng ký qua `document.__wsReg` và không trùng hành động có sẵn (`help state tools run open video ui click type read wait lib style`); 6 khối đúng id/thứ tự, mỗi khối một bản; **mỗi kỳ vọng trong bộ THỬ đã được đối chiếu với mã bạn viết (không có kỳ vọng ngược hành vi đặc tả)**.
4. **Mục D — chỗ chưa chắc / không kiểm chứng được**, nêu thẳng, không bịa API. Phải nêu: tên tệp dist CDN bạn dùng cho `libs`; phiên bản `acorn`; cách chụp ảnh (gọi được `screenshot` có sẵn không); cách gắn nút "💾 Lưu mẫu"; cách `FC.loop` được bọc; mã lỗi mới; ngưỡng đo (ví dụ độ sáng "nền sáng"); mọi chỗ **không thử được vì không có mạng/không có `index.html`**.

Làm xong thì **DỪNG**. Không đề xuất Phase kế tiếp. **Nếu hết chỗ giữa chừng: không nộp mã cắt cụt** — nộp trọn các phần đã xong, ghi `DỞ` cho phần còn lại (sẽ chuyển sang Lô 3).

---
## 6. Claude sẽ làm gì sau khi nhận
1. Python chèn 6 khối theo thứ tự mục 1 (`assert count==1`), sau 6 khối Lô 1, trước `<script src="/cfsync.js">`.
2. Playwright 400×800: nghe `pageerror`, nạp trang sạch, chạy **nguyên văn** THỬ 1–6 (`page.evaluate('(' + src + ')()')`), kiểm `LIBX` đủ hàm, đăng ký `web:exec/check/aesth/look`, 400 px không tràn.
3. Báo cáo gom lỗi theo khối gửi lại bạn sửa **một lượt**. Việc cần mạng thật (CDN, AI thật, model thị giác) → người dùng thử trên điện thoại.
4. Claude tự gắn: nút "📚 Thư viện mã" (`data-lb-open`), nút "💾 Lưu mẫu", công tắc ⚙ cho vòng tự sửa/nhìn ảnh, và nối `LIBX.ingest.cheat` với hàm gọi AI của web.
