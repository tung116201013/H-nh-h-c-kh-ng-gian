# GIAO VIỆC CHO HYDROGEN — A1b + A4 (làm CẢ HAI trong một lượt, nộp 2 phần riêng)

Bạn là phụ tá của Claude trong dự án dobai (web học tiếng Anh một file `index.html` + Cloudflare Worker).
Claude KHÔNG viết mã nặng; bạn viết, Claude ghép vào `index.html` thật và chạy thử bằng Playwright.
Đính kèm: `dobai-khoi-A0-A3b.html` — **6 khối đã duyệt và chạy thật** (A0 `tools-core`, A1 `txt-tools`, A2a `pdf-tools`, A2b `pdf-merge`, A3a `img-pdf-compress`, A3b `id-photo`). Đây là mẫu phong cách và **nguồn sự thật về API `TL`** (kể cả `LIB_DEFS`: đã có `tesseract` = tesseract.js@5.1.1, `pdfjs`, `pdf-lib`, `jszip`).
**Không có** file ngữ cảnh dự án. Chỉ dùng tên toàn cục có trong file khối (`TL`, `toast`, `AF`). Cần tên khác thì ghi ở mục D, **không đoán, không bịa**.

Hai việc ĐỘC LẬP (hỏng việc nào không kéo việc kia). Nộp theo 2 phần: **PHẦN 1 = A1b**, **PHẦN 2 = A4**. Không làm Phase khác.

---

## 1. Bài học bắt buộc nhớ
| Lỗi đã gặp | Quy tắc |
|---|---|
| `$` toàn cục của app là `querySelector` | Trong IIFE tự khai báo `const $ = id => document.getElementById(id)` |
| Trùng tên toàn cục | **Không thêm tên toàn cục nào.** Cấm: `TL`, `PDFX`, `IMGX`, `TS`, `V`, `S`, `D`, `W`. Không `window.xxx =` |
| `stopPropagation()` làm chết nút (logic click của app nằm ở `document`) | **Cấm.** Ủy quyền sự kiện lọc bằng `closest('[data-oc-…]')`; **không** dùng thuộc tính `data-uimp`, `data-tl-*`, `data-afc`, `data-af`, `data-pm-*`, `data-at-*` |
| **`e.code` của `DOMException` là SỐ** (`createImageBitmap` lỗi → code 11) | Nhận biết lỗi của `TL.mkErr` bằng `typeof e.code === 'string'`, **không** dùng `if (e && e.code)` |
| `a \|\| b` với `''`/`0` | Dùng `== null` |
| `touch-action` của khung A0 (`#tl-ov` none, `.tl-bd` pan-y, có `touchmove` không-thụ-động `preventDefault`) | Không `preventDefault` trên `touchmove` |
| `options` dạng hàm bị gọi lại mỗi khi danh sách tệp đổi, `box` bị làm sạch; "Làm tệp khác" không xóa `vals`; `run` nhận bản sao **nông** của `vals` | Dựng UI lại được từ `vals`, kiểm tra lại giá trị trong `run()` |
| 2 bản khối khác nhau | Nộp **đúng MỘT** bản mỗi phần, trong MỘT code block |

Luật chung: nằm trong IIFE; bọc try/catch ở điểm vào; không `localStorage`; chạy trên máy (không gửi tệp ra ngoài, trừ việc tải dữ liệu ngôn ngữ OCR); canvas ≤ 12 triệu điểm ảnh; xử lý từng trang/ảnh, giải phóng canvas/bitmap; `RangeError` → `TL.mkErr('too-large-for-device')`; nền sáng, một màu nhấn `var(--blue,#243B8F)`, nút ≥ 40 px, tiếng Việt, đúng ở 400 px; chỉ lấy ý tưởng, tự viết mã.

---

# PHẦN 1 — A1b: sửa bảng TCVN3 (thiếu chữ HOA có dấu) · cỡ S

**Bối cảnh:** công cụ `chuyen-font-unicode` (khối `txt-tools`, mục "4.5 Phông cũ → Unicode") có bảng `TCVN3_MAP` chỉ chứa chữ thường có dấu và vài chữ hoa (Ă Â Ê Ô Ơ Ư Đ). **Thiếu chữ HOA có dấu thanh** (À Á Ả Ã Ạ, Ằ Ắ Ẳ Ẵ Ặ, Ầ Ấ Ẩ Ẫ Ậ, È É Ẻ Ẽ Ẹ, Ề Ế Ể Ễ Ệ, Ì Í Ỉ Ĩ Ị, Ò Ó Ỏ Õ Ọ, Ồ Ố Ổ Ỗ Ộ, Ờ Ớ Ở Ỡ Ợ, Ù Ú Ủ Ũ Ụ, Ừ Ứ Ử Ữ Ự, Ỳ Ý Ỷ Ỹ Ỵ).

**Việc cần làm:** viết lại **đúng bảng TCVN3** (ABC/.VnTime, kể cả họ `.VnTimeH` dùng cho chữ HOA) để chữ hoa có dấu ra đúng Unicode, **không làm hỏng** chữ thường và ký tự Latin thường (A–Z, a–z, số, dấu câu mã < 0x80 giữ nguyên). Lưu ý: trong TCVN3 chữ HOA có dấu nằm ở các mã khác chữ thường (khu 0x80–0xFF); nếu một mã hóa nghĩa cho cả HOA và thường tùy phông thì ghi rõ ở mục D.

**Ràng buộc đầu ra (đây là việc SỬA, không phải khối mới):**
- Nộp **MỘT patch SEARCH/REPLACE** vào khối `txt-tools` thay thế đối tượng `TCVN3_MAP` (đoạn SEARCH phải **xuất hiện đúng 1 lần** trong `dobai-khoi-A0-A3b.html`, và vì khối này là bản sao nguyên văn trong `index.html`, cũng đúng 1 lần ở đó). Nếu hàm `tcvn3ToUnicode` cần đổi theo thì gộp vào cùng patch hoặc patch thứ hai (cũng SEARCH duy nhất). Không patch gì khác.
- **Tự kiểm bằng mã trước khi nộp** (viết ở mục C): sinh bảng ngược (Unicode → TCVN3) từ chính bảng của bạn, chạy vòng khứ hồi trên chuỗi "Tiếng Việt: ĐÀ NẴNG, HUẾ, ƯỚC MƠ, Nguyễn Thị Ánh, ỨNG DỤNG, Ở ĐÂY, ÔNG, ĂN" và 134 chữ cái tiếng Việt có dấu, báo bao nhiêu khớp. Không có bảng chính thức trong file → nêu rõ chỗ **không chắc** ở mục D (không bịa mã).
- Không đổi VNI, không đổi giao diện.

---

# PHẦN 2 — A4: OCR tiếng Việt/Anh + nối vào "Nạp đề" · cỡ M · khối mới

Nộp MỘT khối `<style id="oc-css">` + `<script id="ocr-tools">`, chèn sau khối `id-photo`, ngay trước `<script src="/cfsync.js">`. Tiền tố **`oc-`**, thuộc tính **`data-oc-*`**. **Không patch script chính.**

### 2.1 Công cụ "Ảnh/PDF → văn bản" (`anh-pdf-sang-chu`)
- `group: 'Văn bản'` (dùng đúng chuỗi như nhóm A1). `ext`: `pdf, jpg, jpeg, png, webp, bmp, heic, heif`; `minFiles: 1`, `maxFiles: 20` (1 PDF **hoặc** nhiều ảnh; trộn thì ném `invalid` giải thích). `related: ['doi-chu-hoa','dem-tu','bo-dau']`.
- **Tùy chọn** (mảng mô tả): Ngôn ngữ `vie+eng` (mặc định) / `eng` / `vie`; Phạm vi trang (chỉ PDF) `all` hoặc dải `1,3-5` (kiểm tra hợp lệ như `tach-pdf` của A2a; sai → `invalid`); Xuất `txt` (mặc định) / `docx`.
- **PDF ưu tiên lớp chữ có sẵn:** với mỗi trang lấy `page.getTextContent()` (pdf.js 3.11.174: `TL.lib('pdfjs')`, `getDocument({data}).promise`, `getPage`, `getViewport`, `render({canvasContext,viewport}).promise`). Trang có **≥ 20 ký tự không phải khoảng trắng** thì dùng chữ đó và **bỏ OCR** trang đó (gom chữ theo dòng theo toạ độ y, ngắt đoạn hợp lý). Trang ít chữ → vẽ canvas rồi OCR: scale sao cho `min(300 DPI, 3000 px)` cạnh dài, nền trắng.
- **Giới hạn:** tối đa **30 trang** cần OCR (quá thì ném `too-large-for-device` kèm "hãy chọn dải trang"); trang có sẵn lớp chữ không tính vào 30.
- **Tesseract** (`TL.lib('tesseract')`, v5.1.1): tạo worker **một lần cho cả mẻ** với ngôn ngữ đã chọn, `recognize(canvas)` **từng trang một**, giải phóng canvas ngay (`canvas.width=canvas.height=0`), **luôn `worker.terminate()` trong `finally`**. **Tiến độ 2 giai đoạn** qua `onProg(%, chữ)`: "Đang tải dữ liệu ngôn ngữ…" rồi "Đang nhận dạng trang i/N…". Ghi API tesseract.js bạn dùng (`createWorker(langs, oem, {logger})`, `recognize`) và mức chắc chắn ở mục D.
- **Hủy giữa chừng:** nếu API `TL`/khung có cơ chế hủy thì dùng; **nếu không thấy trong file khối, ghi "không thấy" ở mục D** và làm phiên bản tối thiểu: đóng khung (`#tl-ov[hidden]`) → dừng vòng lặp và terminate worker (dùng cờ thế hệ, `MutationObserver` như A3b).
- **Đầu ra:** `<tên-gốc>-ocr.txt` (UTF-8) hoặc `.docx` (tạo `.docx` **tối thiểu** bằng `TL.lib('jszip')`: `[Content_Types].xml`, `_rels/.rels`, `word/document.xml` mỗi đoạn một `<w:p>`, thoát ký tự XML). `notes`: số trang dùng lớp chữ có sẵn / số trang OCR / ngôn ngữ; cảnh báo cố định: "OCR làm mất gạch chân, in đậm, công thức; hãy soát tay chỗ trống và chữ bị nhận sai." Kết quả rỗng hoàn toàn → `TL.mkErr('empty', …)`.
- Lỗi: PDF mật khẩu → `encrypted`; PDF hỏng → `corrupt`; ảnh không đọc được/HEIC không giải mã → bỏ qua ảnh đó + `notes` (hỏng hết → `unsupported`); mất mạng khi tải thư viện/dữ liệu ngôn ngữ → `TL.mkErr('network', …)` (xem `TL.lib` làm sao báo lỗi mạng).
- **Nút "Kiểm tra OCR":** trong `options` dạng hàm (hoặc tách riêng nếu mảng không hỗ trợ nút — nêu ở D), chạy OCR một ảnh mẫu **tự vẽ bằng canvas** (chữ "Xin chao 123 Hello", nền trắng, chữ đen to) và hiện kết quả/ lỗi. Dùng để người dùng thử trên điện thoại vì sandbox của Claude không có mạng CDN.

### 2.2 Nối vào "Nạp đề" (KHÔNG patch script chính)
Giao diện Nạp đề của app là lớp phủ **`#uimp-ov`** do script chính dựng lười; thẻ "Nạp đề mới" nằm trong **`#ui-new`** (bị `innerHTML` dựng lại mỗi lần đổi thẻ), chứa ô chữ **`#ui-text`** (textarea), hàng nút `data-uimp="file"` / `data-uimp="clip"`, dòng trạng thái `#ui-fn`, ô chọn cách phân tích `#ui-method` (giá trị `algo` | `ai` | `ext`). Logic của app nghe `input` trên `#ui-text` (cập nhật trạng thái) và `change` trên `#ui-method`. **Những tên này đã được Claude kiểm trong `index.html`; không tên nào khác được đoán.**

Việc cần làm trong CÙNG khối `ocr-tools`:
1. Dùng `MutationObserver` trên `document.body` (childList, subtree) để phát hiện `#uimp-ov` rồi `#ui-new`; **chèn thêm một hàng**: nút **"📷 Đọc chữ từ ảnh/PDF (OCR trên máy)"** (`data-oc-nd="pick"`, cao ≥ 40 px) + dòng cảnh báo nhỏ ("OCR làm mất gạch chân, in đậm, công thức; soát tay chỗ trống"), đặt ngay sau hàng nút `data-uimp="clip"`. Mỗi lần `#ui-new` bị dựng lại thì chèn lại **đúng một lần** (không nhân đôi, không vòng lặp vô hạn do chính việc chèn của bạn — nhớ ngắt/so cờ).
2. Bấm nút → mở `<input type="file" accept="image/*,.pdf" hidden>` do bạn tự tạo (không dùng `#ui-file`) → chạy cùng hàm OCR của 2.1 (ngôn ngữ `vie+eng`, PDF ưu tiên lớp chữ, ≤ 30 trang) → hiện tiến độ ở một dòng riêng của bạn (không ghi đè `#ui-fn`).
3. Xong: gán `#ui-text.value` = văn bản, `dispatchEvent(new Event('input',{bubbles:true}))`; đặt `#ui-method.value = 'algo'` rồi `dispatchEvent(new Event('change',{bubbles:true}))` (**thuật toán, không tốn lượt AI**); `toast('Đã đọc chữ bằng OCR — hãy soát lại rồi bấm Phân tích đề')`. Lỗi → `toast` có lý do; không làm hỏng lớp phủ.
4. Nếu `#uimp-ov` bị đóng giữa chừng → hủy OCR đang chạy, terminate worker, không ghi vào phần tử đã gỡ.
5. Nếu bạn thấy cách này không chạy (tên phần tử khác mô tả) → nêu ở mục D, **đừng đoán**.

---

## 3. ĐẦU RA (đúng thứ tự)
**PHẦN 1:** A1) patch SEARCH/REPLACE (kèm số dòng trong `dobai-khoi-A0-A3b.html`); C1) kết quả vòng khứ hồi + bảng đạt/không; D1) chỗ chưa chắc.
**PHẦN 2:** A2) khối `<style id="oc-css">` + `<script id="ocr-tools">` trong **MỘT** code block; B2) "không có patch"; C2) bảng tự rà bên dưới; D2) chỗ chưa chắc.

| Kiểm tra (PHẦN 2) | Kết quả |
|---|---|
| IIFE; tự khai báo `$`/`E`; không thêm tên toàn cục; không `stopPropagation`/`preventDefault` trên `touchmove` | |
| Mã lỗi `TL.mkErr` nhận biết bằng `typeof e.code === 'string'` | |
| Mọi `run()` trả `{files:[{blob,name,note}]}` ≥ 1 tệp hoặc ném `TL.mkErr(...)` | |
| Dải trang `1,3-5`, `5-3`, `0`, `99`, rỗng, chữ → xử lý ra sao | |
| PDF có lớp chữ ≥ 20 ký tự → không OCR trang đó; > 30 trang cần OCR → `too-large-for-device` | |
| Worker tesseract luôn `terminate()` (kể cả lỗi/hủy); canvas giải phóng từng trang | |
| Tiến độ 2 giai đoạn; đóng khung → dừng sạch | |
| Nạp đề: nút chèn đúng 1 lần, chèn lại khi `#ui-new` dựng lại, không vòng lặp vô hạn | |
| Nạp đề: sau OCR `#ui-text` có chữ, `#ui-method = algo`, sự kiện `input`/`change` đã bắn | |
| Nạp đề: đóng `#uimp-ov` giữa chừng → hủy sạch | |
| Không dùng `\|\|` với giá trị có thể là `0`/`''`; CSS bắt đầu `oc-`; 400 px; nút ≥ 40 px | |

**D) Chỗ chưa chắc / không kiểm chứng được** — liệt kê thẳng, không bịa API/mã. Ví dụ phải nêu: bảng TCVN3 HOA bạn dựa vào đâu; chữ ký `createWorker` của tesseract.js 5.1.1 và nơi nó tải dữ liệu `vie`; kích thước dữ liệu và tốc độ trên điện thoại; khung A0 có cơ chế hủy không.

Làm xong thì DỪNG. Không đề xuất Phase kế tiếp.

---

## 4. Claude sẽ làm gì sau khi nhận
1. Áp patch A1b và chèn khối A4 sau `id-photo`, trước `cfsync.js` (Python, `assert count==1`).
2. Playwright 400×800: **A1b** — chạy vòng khứ hồi TCVN3 với danh sách chữ HOA/thường, kiểm không hỏng chữ thường; **A4** — PDF có lớp chữ (tạo bằng pdf-lib) → không gọi OCR, ra đúng chữ; dải trang sai → `invalid`; PDF mật khẩu/hỏng; ảnh hỏng; `.docx` đọc lại bằng JSZip; giả lập `Tesseract` để thử luồng worker/terminate/tiến độ/hủy; Nạp đề: dựng `#uimp-ov` thật bằng app, kiểm nút chèn 1 lần, chèn lại sau đổi thẻ, ghi vào `#ui-text`, `#ui-method=algo`.
3. Sandbox **không có mạng CDN** → OCR thật (tải `tesseract.js` + dữ liệu `vie`) **chưa thử được**; người dùng sẽ bấm "Kiểm tra OCR" trên điện thoại.
4. Có lỗi thì trả lại kèm lỗi cụ thể; hãy tự rà kỹ.
