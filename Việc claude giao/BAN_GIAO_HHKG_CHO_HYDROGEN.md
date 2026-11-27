# BÀN GIAO CHO HYDROGEN — Hình học không gian 3D dùng CHUNG khung chat AI

Phiên: 27-11-2026. Người gửi: Claude (ghép/sửa). Người nhận: Hydrogen (nâng cấp tiếp).
Nguồn đầu vào của phiên này: bản hhkg do "bank" làm (hhkg.html, hhkg.js, api-worker_1.js, index_1.html).

## 1. Yêu cầu của chủ dự án (giữ nguyên khi nâng cấp)
1. KHÔNG sửa / không cần cập nhật `api-worker.js` (Worker **dobai-api** giữ bản cũ). Route `/api/geometry/solve` và `GEMINI_API_KEY` của bản bank bị bỏ hẳn.
2. Lời giải AI dùng CHUNG chức năng chat AI có sẵn của web (cùng khóa API, model đang chọn, lịch sử chat).
3. Tận dụng giao diện chat AI có sẵn để tích hợp hình học không gian (không làm khung chat riêng).

## 2. Kiến trúc và luồng dữ liệu
```
Trang chủ (index.html)
  └ thẻ 📐 [data-hhkg-entry] ── click ──► import('/hhkg.js')  (chỉ nạp khi cần)
        hhkg.js chạy ở CHẾ ĐỘ NHÚNG (có #app, không có #hhkg-standalone-boot) → lớp #hhkg-ov
Trong lớp 3D, tab "AI Giải" / hỏi thêm / giải lại
  └ hhkg.js gọi __hhkgFetch(url, {body}) ─► window.__hhkgAsk(req)        (module hhkg-chat ở index.html)
        ├ chat(): tạo/mở GCHAT.hhkg (free:1, hhkg:1, title '📐 Hình học 3D · AI giải'), aiSheet()
        ├ gSend(text, atts)  → khung chat AI có sẵn gọi model người dùng chọn
        │     (AG.sys(c) được móc để thêm GEO_SYSTEM + luật FMT chỉ cho chat hình học)
        ├ waitReply(): đợi c.busy/GBUSY hết (3 nhịp 300 ms) rồi lấy tin 'model' cuối
        ├ extract(): tách khối ```hhkg, đọc JSON chịu lỗi (cả JSON bị cắt giữa chừng)
        ├ validate(): ID, số, đồng phẳng, vuông góc  → lỗi: tự nhắn AI sửa 1 lần (🔧)
        └ trả data cho hhkg.js dưới dạng {ok:true, data} giả Response → code cũ (me / Te) chạy nguyên
Trong chat: mdRender bị bọc để ẨN khối ```hhkg; gRender bị bọc để chèn thẻ 📐 "Dựng hình 3D / Áp dụng vào hình"
  └ thẻ click → import('/hhkg.js') → HHKG.open('ai') → HHKG.applySolve(data) | HHKG.applyPatch(data) → đóng chat
```
- z-index: `#hhkg-ov` gốc là 2147483200 nên module ép `#hhkg-ov{z-index:29!important}` để khung chat (`#aiansw`, z 31) nằm trên lớp 3D.
- `/hhkg.html` mở thẳng sẽ tự chuyển về `/?hhkg=1` (trừ `?solo=1`: chạy riêng, không có AI, `__hhkgFetch` trả 503 → code cũ tự rơi về chế độ Offline).

## 3. Danh sách file trong gói
| Đường dẫn | Việc |
|---|---|
| `src/hhkg-chat.module.js` | MÃ NGUỒN đọc được của khối `<script id="hhkg-chat">` (có 2 chỗ giữ chỗ `__GEO_SYSTEM__`, `__FMT__`) |
| `src/build.py` | Ghép ra index.html / hhkg.js / hhkg.html; mỗi bước vá `assert` số lần khớp. `python3 src/build.py <vào> <ra>` |
| `prompt/geo_system.txt` | GEO_SYSTEM của bank (lệnh GeoGebra, nguyên tắc dựng hình) — trích nguyên văn từ api-worker_1.js |
| `prompt/fmt.txt` | LUẬT cho AI (quy trình 7 bước, công thức tọa độ, cấu trúc lời giải, định dạng khối, checklist, điều cấm, ví dụ mẫu) |
| `LUAT_AI_HHKG.md` | Bản đọc của luật trên |
| `tests/test_hhkg_chat.js` | Test không cần trình duyệt: `node tests/test_hhkg_chat.js` (đang ĐẠT) |
| `reference/worker-geometry-section.js` | THAM CHIẾU: schema `GEO_SOLVE_SCHEMA`, `GEO_FOLLOWUP_SCHEMA`, `geometrySolve` của bank (không dùng) |
| `reference/hhkg.html.original` | hhkg.html trước khi thêm dòng chuyển hướng |

Đầu vào build cần: `index_1.html` (= index.html + khối `hhkg-link` cũ; đã diff: chỉ khác đúng khối đó), `hhkg.js`, `hhkg.html` của bank. File thành phẩm đã giao: index.html, hhkg.js, hhkg.html, cfsync.js (giữ cũ), ytplay.html (giữ cũ).

## 4. Điểm chạm vào index.html (tên toàn cục module đang dùng — đừng đổi tên khi sửa index)
`AG.sys(c)` (móc thêm prompt, nhận diện chat hình học bằng `c.hhkg` hoặc tiêu đề bắt đầu '📐'), `mdRender` (ẩn khối hhkg), `gRender` (chèn thẻ), `GCHAT`, `GCUR`, `gSend(text, atts)`, `aiSheet`, `gProbeAll(false)`, `xkProbeAll(false)`, `GPICK`, `GGOOD`, `GEMINI_MODELS`, `GBUSY`, `toast`, `V.view`, DOM `#app`, `#gmsgs`, `#gm{i} .md`, `#aiansw .gclose`, anchor thẻ chủ `#o2-entry|#tl-entry|#uimp-entry|details.bkp|.st-ft`.
Hình dạng dữ liệu chat: tin `{r:'user'|'model'|'err', t, atts?}`; ảnh đính kèm `{kind:'image', name, mime, size, b64, url}` (url dạng data:).

## 5. Điểm vá trong hhkg.js (ĐÃ MINIFY — tên biến sẽ đổi khi Hydrogen build lại từ source)
Cần làm lại ở SOURCE, không vá tên minify:
1. Ba chỗ `fetch(API + "/api/geometry/solve", …)` → một hàm `askAI(body)` gọi `window.__hhkgAsk(body)`; giữ hình dạng trả về `{ok, status, json()}` hoặc đổi thẳng sang Promise<data> (cập nhật 3 nơi gọi). Body gửi đi (đã đối chiếu từ mã): `{mode:"solve", problemText, imageBase64?, imageMimeType?}`, `{mode:"recompute", problemText, currentScene}`, `{mode:"followup", question, currentScene}`.
   Tên minify hiện tại: giải = `nt`, giải lại = `_e`, hỏi thêm = `Te`; không có `window.__hhkgAsk` → trả status 503 để UI rơi về Offline (đang đúng).
2. Mở thêm API trên `window.HHKG` (đang thêm vào literal `t.HHKG={open:I,close:ot,state:r,…}`): `applySolve(data)` = `state.tab="ai"; me(data); render()`; `applyPatch(F)` = bản sao phần áp `updatedScene`/highlight của hàm hỏi thêm (updateVertices, updateEdges, addVertices, addEdges, addFaces, addRightAngles, addConstructions qua `Bl`, rồi `yt` + `dt({keepCamera:true})`, `it` highlight).
3. Nên bỏ phần chữ trong giao diện còn nói "cần đăng nhập / AI Worker" nếu có.

## 6. Hợp đồng JSON của khối ```hhkg (AI → web)
- Giải / giải lại: `{title, grade, topic, method, keyFormula, summary, finalAnswer, visualTips, verificationNote, suggestedFollowups[], constructions[{command,note}], scene{showOxyz, unitNote, vertices[{id,x,y,z,role}], edges[{from,to,style,label}], faces[{vertices[],color,opacity,internal}], rightAngles[{vertex,p1,p2}], angles[{vertex,p1,p2,label}]}, steps[{stepTitle,explanation,formula,highlightVertices[],highlightEdges[],highlightFaceVertices[]}]}` — cùng hình dạng với `GEO_SOLVE_SCHEMA` của bank.
- Hỏi thêm / sửa hình: `{answer, highlightVertices[], highlightEdges[], updatedScene{addVertices, addEdges, addFaces, addRightAngles, updateVertices, updateEdges[{from,to,style?,remove?}], addConstructions[string]}}`.
- Trả về cho hhkg.js: giải/giải lại → object ở trên đã `normSolve` (đủ mảng rỗng, title, summary, steps mặc định); hỏi thêm → `{answer(đã bỏ markdown, ≤1800 ký tự), highlightVertices, highlightEdges, updatedScene}`.

## 7. Bộ kiểm tra tự động (validate)
Lỗi NẶNG (hard): thiếu scene.vertices; đỉnh không có id / id trùng / tọa độ không phải số; cạnh–mặt–góc dùng ID không tồn tại (id do `constructions` tạo ra được chấp nhận); cạnh hai đầu trùng; mặt < 3 đỉnh.
Lỗi NHẸ (soft): tọa độ > 12; style cạnh lạ; mặt không đồng phẳng (sai số 0,02); góc vuông khai báo mà |cos| > 0,02; bước highlight dùng ID lạ; thiếu finalAnswer.
Xử lý: có lỗi → nhắn AI sửa đúng 1 lần (tin bắt đầu "🔧 Kiểm tra tự động…"); sau đó lỗi nhẹ → vẫn dựng kèm `verificationNote` "⚠ Chưa qua kiểm tra tự động…"; lỗi nặng → báo lỗi cho người dùng.

## 8. Đã kiểm thử và CHƯA kiểm thử (nói thật)
ĐÃ: cú pháp 2 file; `build.py` tái tạo đúng từng byte bản đã giao; `tests/test_hhkg_chat.js` đạt (extract/loose/hide, validate, vòng tự sửa, followup, lỗi 400); chạy hhkg.js bằng stub DOM trong Node: `window.HHKG` có `applySolve/applyPatch`, gọi không ném ReferenceError.
CHƯA: chạy trên trình duyệt thật (WebGL, z-index chồng khung chat lên lớp 3D, cuộn/bàn phím trên điện thoại); chạy với model thật (độ chính xác tọa độ phụ thuộc model; luật mới chỉ được thử bằng mô phỏng); luồng ảnh đề bài qua `atts`; nút "Hỏi lại" trong chat với chat hình học; ảnh hưởng của `mdRender`/`gRender` bọc thêm lên các module khác (ví dụ unit-import) — chỉ cắt đúng khối ```hhkg nên dự kiến không ảnh hưởng.

## 9. Gợi ý nâng cấp tiếp (theo thứ tự ưu tiên)
1. Chạy thử 10–15 bài mẫu (chóp đều, SA ⊥ đáy, lăng trụ, thiết diện, khoảng cách giữa hai đường chéo nhau, tọa độ Oxyz) với 2–3 model, ghi tỉ lệ qua `validate`; chỉnh `prompt/fmt.txt` theo lỗi thường gặp.
2. Thêm kiểm tra: độ dài cạnh khớp số liệu đề; đáp số tính lại từ tọa độ (hiện chỉ yêu cầu AI tự làm).
3. Đưa `askAI`, `applySolve`, `applyPatch` vào source hhkg (mục 5) để khỏi vá file minify.
4. Nút "Mở chat bài này" trong lớp 3D (mở lại GCHAT.hhkg khi đóng chat); nút ✕ chat tự hiện hình khi giải xong.
5. Lưu bài đã giải: gắn `dc:hhkg:saved` với id cuộc chat để mở lại cả lời giải lẫn hình.
6. Nút Android Back đóng lớp 3D (hiện chưa có pushState).

## 10. Quy tắc làm việc (từ dự án dobai)
Hydrogen viết mã theo khối riêng, Claude ghép vào index.html. Khi sửa index.html: không đổi tên các toàn cục ở mục 4; khối `hhkg-chat` nằm trước `<script src="/cfsync.js">`. Up file lên Worker **dobai**: đủ 5 file cùng lúc (index.html, hhkg.html, hhkg.js, cfsync.js, ytplay.html).
