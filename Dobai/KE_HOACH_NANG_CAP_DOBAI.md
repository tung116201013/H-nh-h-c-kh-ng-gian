# KẾ HOẠCH THÊM & NÂNG CẤP TÍNH NĂNG CHO DOBAI (dựa trên DERO_TONG_HOP_V4.md)

Lập: 21/11/2026. Dùng cùng `BAN_GIAO.md`. Mỗi **Phase** là một việc độc lập, làm gọn trong **một phiên**; hết phiên giữa chừng thì app vẫn chạy bình thường (xem luật N3).

---

## 0. Cách dùng (đọc trước, 1 phút)

**Mỗi phiên chỉ giao 1 Phase.** Gửi cho Claude đúng các tệp sau (không gửi cả `DERO_TONG_HOP_V4.md`, nặng 9 MB, hơn 90% là mã thư viện ở mục 24):

| Luôn gửi | Gửi thêm khi Phase ghi "Worker" |
|---|---|
| `BAN_GIAO.md`, `KE_HOACH_NANG_CAP_DOBAI.md` (file này), `index.html`, `cfsync.js` | `api-worker.js` |

Và `DERO_TONG_HOP_V4.md` **chỉ khi** Phase ghi "Đọc DERO dòng …" (Claude chỉ đọc đúng dải dòng đó, không đọc cả file).

**Câu giao việc mẫu (chép nguyên, đổi tên Phase):**
> Đọc BAN_GIAO.md và KE_HOACH_NANG_CAP_DOBAI.md. Làm đúng **Phase A2a**, không làm phase khác. Đọc DERO_TONG_HOP_V4.md đúng dải dòng ghi trong Phase. Sửa bản sao index.html bằng script Python (`assert count==1`), thử bằng Playwright, rồi xuất index.html + cập nhật BAN_GIAO.md (thêm mục mới) + hướng dẫn up ngắn cho điện thoại. Làm xong thì dừng.

**Kích cỡ:** **S** ≈ dưới 300 dòng mã mới · **M** ≈ 300–700 dòng · phase lớn đã chia sẵn thành a/b (mỗi nửa ≈ M). Đây là ước lượng.

---

## 1. Luật chung (áp dụng mọi Phase)

- **N1. Chỉ thêm khối mới** `<style id="…-css">` + `<script id="…">` ngay trước `<script src="/cfsync.js">` (như `vid-ext`, `wg-ext`). Hạn chế sửa script chính; nếu bắt buộc thì `assert` đúng 1 vị trí và ghi vào BAN_GIAO.
- **N2. Tiền tố riêng**: CSS/ID dùng tiền tố của module (`tl-`, `ex-`, `dk-`…). **Không dùng lớp `.b`** (trùng handler app).
- **N3. Điểm dừng an toàn**: mỗi script là một khối riêng nên lỗi một khối không làm hỏng khối khác; bọc `try/catch` ở điểm vào; mỗi bước nhỏ kết thúc ở trạng thái chạy được. Hết hạn mức giữa chừng → chỉ mất bước đang làm dở.
- **N4. Dữ liệu người dùng** lưu `localStorage` khóa `dc:…` hoặc IndexedDB `dc-kho` → **tự đồng bộ Cloudflare** nhờ danh sách cho phép của `cfsync.js`. Không đặt tên khóa có chữ `key|token|secret|tally|probe` (bị chặn đồng bộ).
- **N5. Thư viện nạp lười** (`TS.lib(tên)`) từ `cdnjs.cloudflare.com`/`cdn.jsdelivr.net` với **phiên bản cố định**, chỉ khi bấm dùng; không nhúng thêm vào HTML (file đã 6 MB). Đã có sẵn: pdf.js 3.11.174, JSZip 3.10.1, XLSX 0.18.5, html2pdf 0.10.1, PptxGenJS 3.12.0, docx-preview 0.3.3, KaTeX. **Chưa có**: pdf-lib, fontkit, Tesseract.js, thư viện tạo QR, thư viện `docx`.
- **N6. Chạy trên máy trước**; chỉ dùng Worker khi bắt buộc (đề online). Công cụ nào gửi dữ liệu ra ngoài phải ghi nhãn rõ "gửi lên máy chủ".
- **N7. Giới hạn bộ nhớ điện thoại**: 50 MB/tệp (đúng pdfoke §20.3); PDF xử lý **từng trang một**, giải phóng canvas; bắt `RangeError` → báo "tệp quá lớn cho máy này".
- **N8. Thử trong môi trường Claude**: sandbox chặn mạng ngoài danh sách → thư viện lấy bằng `npm` để thử cục bộ; mạng thật (CDN, Gemini, OCR dữ liệu ngôn ngữ) **chưa thử được** → mỗi Phase phải có nút/bước **"Kiểm tra"** để người dùng bấm trên điện thoại, và ghi rõ "chưa thử thật" trong BAN_GIAO.
- **N9. Giao diện**: nền sáng (đã khóa light), **một màu nhấn**, nút chạm ≥ 40 px, tiếng Việt, hướng dẫn up ngắn từng bước.
- **N10. Bản quyền**: chỉ lấy **ý tưởng/cơ chế** từ dero/pdfoke, viết mã riêng, đặt tên/giao diện riêng (DERO §17, §20.11). Kiểm tra `LICENSE` từng thư viện trước khi dùng.

---

## 2. Bản đồ: lấy gì từ DERO/pdfoke, bỏ gì

| Nguồn trong DERO | Làm cho dobai | Phase |
|---|---|---|
| ToolShell, giới hạn 50/100 MB, lỗi có mã, kéo thả, chia sẻ (§20.3) | Khung "Công cụ tệp" | A0 |
| Văn bản tiếng Việt: bỏ dấu, hoa/thường, đếm từ, đọc số, TCVN3/VNI (§20.2, 20.4) | Làm | A1 |
| Ghép/tách/xoay/xóa/sắp xếp PDF, ảnh↔PDF (§20.4) | Làm | A2a, A2b |
| Nén ảnh nhị phân chất lượng, nén PDF, ảnh thẻ, CCCD (§20.4, 20.12) | Làm | A3 |
| OCR Tesseract `vie`, ưu tiên lớp chữ PDF (§20.4, §14) | Làm, nối vào **Nạp đề** | A4 |
| Watermark, đánh số trang, thêm chữ, chữ ký, che thông tin thật (§20.4) | Làm | A5a, A5b |
| Word↔PDF, PDF→Excel… | Bản "trên máy" gần đúng | A6 |
| Mô hình `doc`/`online`, QType 4 loại, khối mẫu (§5.4, 7.2, 7.3) | Mô hình đề + trình soạn | B1a, B1b |
| Xuất `.docx`/PDF, trộn mã đề (§11.6, §1) | Làm | B2 |
| Luồng AI soạn đề nhiều bước, khung chương trình, JSON chịu lỗi (§9, 11.2, 11.3, 19.2) | Làm cho **tiếng Anh** | B3 |
| Đề online, nộp bài, chấm ở máy chủ, `exam_gate` (§7.3, 7.4, 8, 11.4) | Làm trên Worker + D1 | B4a, B4b |
| Phân tích kết quả, chấm phiếu gõ tay (§6.5, 7.4) | Làm | B5 |
| Ngân hàng câu hỏi, ma trận (§5.4 "Kho câu hỏi", §1) | Làm | B6 |
| Slide AI: dàn ý duyệt, từng slide, kiểm tra hợp lệ (§5.5, 9.1, 19.3) | Làm | B7a, B7b |
| Trang bắt đầu, thanh tab, lọc viên (§5.1, 5.2, §21 Office 23) | Làm | C1 |
| PWA, cache, hạn mức, thống kê ẩn danh (§20.1, 20.8) | Làm | C2, C3 |
| QR/VietQR, lưu đồ, so sánh văn bản, hành chính | Tùy chọn | D1–D4 |

**KHÔNG làm (kèm lý do):**
- Sao chép giao diện, tên, logo, mã của "đề rõ"/pdfoke/Office 23 → bản quyền (§17, §20.11).
- Dịch vụ chuyển đổi Office→PDF, PDF→Word chuẩn, Sửa chữ trong PDF bằng LibreOffice/PyMuPDF/pdf2docx → cần **Cloudflare Containers (trả phí, cần thẻ)** và PyMuPDF là AGPL (§20.11). Thay bằng bản gần đúng trên máy (A6).
- Điểm AI, bảng giá, thanh toán (§10) → dobai đã có hệ **hạng + mã nâng cấp**.
- Đề cộng đồng, kho tài liệu công khai, hồ sơ tác giả → dobai là app cá nhân/lớp nhỏ.
- 27–32 công cụ vẽ hình Toán–Lý–Hóa–Sinh (§12) → ngoài phạm vi môn Anh.
- Supabase, Vercel, React/TipTap → dobai dùng D1 + Worker + một file HTML; TipTap quá nặng cho điện thoại.
- SEO/GEO, `llms.txt`, trang biến thể (§20.9) → app riêng tư, không cần.

---

## 3. Thứ tự khuyên làm

```
Đợt 1  A0 → A1 → A2a → A2b          (nền + công cụ nhanh, rủi ro thấp)
Đợt 2  A4 (OCR→Nạp đề) → A3
Đợt 3  B1a → B1b → B2 → B3          (soạn, xuất, trộn, AI soạn đề)
Đợt 4  B4a(Worker) → B4b → B5       (đề online + chấm + phân tích)
Đợt 5  B6 → B7a → B7b               (ngân hàng câu hỏi, slide)
Đợt 6  A5a → A5b → A6 → C1 → C2 → C3 → (D tùy chọn)
```
Phụ thuộc cứng: A0 trước mọi A*; B1a trước B1b…B7; B4a trước B4b; B1b trước B2/B3. A4 nên đi sớm vì giúp **Nạp đề PDF scan** (hiện còn rủi ro Gemini Files API chưa thử thật).

---

# PHẦN A — CÔNG CỤ TỆP CHẠY TRÊN MÁY

## Phase A0 — Khung "Công cụ" dùng chung · **S** · chỉ index.html
**Mục tiêu:** một khung chung để các công cụ sau chỉ cần khai báo cấu hình + hàm `run()`.
**Đọc DERO:** §20.3 (dòng 1031–1043), §20.12 phần `Tool` (1233–1242), §20.1 phần tìm/gần đây/yêu thích (958–959).
**Việc cần làm:**
1. Khối `tools-core` + `tools-css` (tiền tố `tl-`). Đối tượng `window.TS`: `TS.register({id,name,group,desc,ext,maxFiles,minFiles,run})`, `TS.open(id)`, `TS.lib(name)` (nạp lười, cache, báo lỗi mạng rõ ràng), `TS.save(blob,name)` (tải + `navigator.share` + **"Lưu vào Kho"** qua `KHO`), `TS.err(code)`.
2. Màn hình: vùng chọn tệp (bấm/kéo thả) → danh sách tệp (↑ ↓ ✕, dung lượng) → ô tùy chọn → nút **Bắt đầu** → thanh tiến độ → kết quả ("Tải về <tên> (dung lượng)", "đã giảm từ A xuống B (n%)", ghi chú) → "Làm tệp khác" / "Tiếp tục xử lý: <công cụ liên quan>".
3. Mã lỗi: `unsupported, encrypted, corrupt, invalid, empty, too-large-for-device, network` + chuỗi tiếng Việt.
4. Cổng vào: nút **"Công cụ"** ở Trang chủ + Danh sách bài (cạnh `#uimp-entry`), hub nhóm công cụ, **ô tìm không dấu** (NFD, `đ→d`), **Dùng gần đây (≤6)** `dc:tl:recent`, **Yêu thích (≤10)** `dc:tl:fav`.
5. Giới hạn: `userAgentData.mobile`/UA → 50 MB (điện thoại), 100 MB (máy tính); tệp 0 byte/sai đuôi bị từ chối riêng từng tệp.
**Kiểm tra:** đăng ký 1 công cụ giả (đổi tên tệp) chạy trọn luồng; tìm "ghep" ra "Ghép PDF"; 400 px không tràn ngang; không lỗi JS.

## Phase A1 — Văn bản tiếng Việt & tiếng Anh · **S** · chỉ index.html
**Đọc DERO:** §20.2 nhóm "Văn bản tiếng Việt" (1010–1015), §20.4 "Phông cũ sang Unicode" & "Đọc số thành chữ" (1067, 1077).
**Công cụ:** bỏ dấu (đ→d); đổi HOA/thường/Hoa Đầu Câu/Hoa Mỗi Từ; **đếm từ** (từ, ký tự có/không khoảng trắng, câu, đoạn, thời gian đọc; tách riêng Anh/Việt); **đọc số thành chữ** (Việt chuẩn kế toán: linh/lẻ, mốt, lăm, tư; và tiếng Anh; xử lý chuỗi số dài như chuỗi, không qua số thực); chuyển **TCVN3/VNI → Unicode** (dán chữ hoặc `.docx` qua JSZip, giữ định dạng).
**Nối thêm:** nút "Đếm từ" trong khung chat/ghi chú; đọc số bằng tiếng Anh nối với 🔊 TTS có sẵn.
**Kiểm tra:** bộ ví dụ cố định (1.250.000 → "một triệu hai trăm năm mươi nghìn đồng"; 15 → "mười lăm"; 21 → "hai mươi mốt"; 1005 → "một nghìn không trăm linh năm"), kiểm bằng script.

## Phase A2a — PDF cơ bản (1/2): ảnh↔PDF, tách, xóa, xoay · **M** · chỉ index.html
**Đọc DERO:** §20.4 "Ghép, tách, xoay, xóa…" (1047), §20.2 nhóm "Sắp xếp trang PDF" (973–979), §24.3 chỉ phần API `PDFDocument.copyPages/embedJpg/embedPng` (đọc dòng 135121–135200, không đọc cả).
**Việc cần làm:** nạp `pdf-lib` lười; **ảnh→PDF** (tối đa 100 ảnh, vừa A4, ảnh ngang xoay trang, kéo/↑↓ sắp xếp, nhận cả HEIC nếu trình duyệt đọc được); **PDF→JPG/PNG** bằng pdf.js sẵn có (chọn trang, độ phân giải, tải ZIP bằng JSZip); **tách** (mỗi trang một tệp hoặc giữ vài trang `1,3-5`), **xóa trang**, **xoay**.
**Cơ chế:** lưới ảnh thu nhỏ do pdf.js vẽ (vẽ từng trang, hủy khi đóng); thao tác tạo **kế hoạch `plan`** (JSON: nguồn, trang, góc xoay) rồi chỉ **sao chép trang** (giữ chữ chọn được, liên kết).
**Kiểm tra:** PDF mẫu 12 trang (tạo bằng script): tách/xóa/xoay đúng số trang và hướng; PDF có mật khẩu → báo `encrypted`.

## Phase A2b — PDF cơ bản (2/2): ghép + sắp xếp bằng lưới · **M** · chỉ index.html
**Việc cần làm:** **ghép** (tối đa 50 tệp PDF/ảnh, ≥ 2 tệp, ↑↓); **sắp xếp** kéo-thả đổi chỗ + ✕ xóa + ↻ xoay trên một màn hình, có **hoàn tác**; cảm ứng: giữ-rồi-kéo (kèm nút ↑↓ dự phòng vì kéo thả trên điện thoại hay lỗi).
**Nối thêm:** nút "Mở trong Công cụ PDF" ở trình xem tệp (`AF`) và ở "Tệp của tôi" (`FM`) cho tệp `.pdf`.
**Kiểm tra:** ghép 3 tệp (2 PDF + 1 ảnh) ra đúng thứ tự; kéo 1 trang lên đầu; hoàn tác; 400 px.

## Phase A3 — Nén ảnh, nén PDF, ảnh thẻ, CCCD · **M** · chỉ index.html
**Đọc DERO:** §20.4 "Nén PDF", "Nén ảnh", "Ảnh thẻ và CCCD" (1053–1055, 1069); mã `toTarget` ở §20.12 (1207–1230).
**Việc cần làm:**
1. **Nén ảnh**: đọc bằng `createImageBitmap` (đúng EXIF), nền trắng, JPEG; không mục tiêu → cạnh dài 2560 px, chất lượng 0,75; có mục tiêu (50/100/500 KB, 1 MB…) → **tìm nhị phân chất lượng 0,35–0,92 (6 vòng)**, vẫn lớn thì **thu cạnh ×0,8**, tối đa 12 vòng; không nhỏ hơn bản gốc thì trả bản gốc kèm ghi chú.
2. **Nén PDF**: *nhẹ* (nén lại ảnh nhúng, giữ chữ) rồi *mạnh* (mỗi trang vẽ ảnh vừa đủ đọc, **xử lý từng trang**); **không bao giờ lớn hơn bản gốc**; mục tiêu 200 KB/500 KB/1/2/5/10 MB.
3. **Ảnh thẻ** 2×3, 3×4, 4×6, 3,5×4,5 cm ở 300 DPI (px = mm ÷ 25,4 × 300), khung cắt cố định tỉ lệ, **tờ in** 10×15 cm/A4 (chọn khổ đứng/ngang xếp được nhiều ảnh hơn, lề 5 mm, khe 2 mm); ghi **JFIF 300 DPI** vào đầu JPEG; **ghép 2 mặt CCCD** đúng cỡ thật trên A4.
**Kiểm tra:** ảnh mẫu 4 MB → mục tiêu 100 KB ra ≤ 100 KB hoặc báo "chưa đạt"; PDF mẫu nén xong không lớn hơn; ảnh thẻ 3×4 = 354×472 px.

## Phase A4 — OCR tiếng Việt/Anh + nối vào **Nạp đề** · **M** · index.html (Worker tùy chọn)
**Đọc DERO:** §20.4 "OCR tiếng Việt" (1065), §14 (784–786), §22 dòng "OCR ngay trên máy" (1277).
**Việc cần làm:**
1. Công cụ "Ảnh/PDF → văn bản": nạp `tesseract.js` lười, ngôn ngữ `vie+eng`; **PDF ưu tiên lớp chữ có sẵn** (trang có ≥ 20 ký tự không phải khoảng trắng thì bỏ OCR); trang ảnh vẽ canvas `min(300 DPI, 3000 px)`; tối đa 30 trang; **hủy giữa chừng**; tiến độ 2 giai đoạn (tải dữ liệu / nhận dạng); xuất sao chép, `.txt`, `.docx`.
2. **Nối vào Nạp đề** (`unit-import`): thêm cách phân tích thứ 4 "OCR trên máy" → văn bản → `UIMPC.parseExam` (thuật toán, **không tốn lượt Hydrogen**) → AI chỉ giải đáp án. Có cảnh báo "OCR làm mất gạch chân, in đậm, công thức; soát tay chỗ trống".
3. Dữ liệu ngôn ngữ: mặc định lấy từ CDN của Tesseract; **tùy chọn** tải `vie.traineddata(.gz)` lên Worker `dobai` ở `/ocr/` để chạy không phụ thuộc CDN (người dùng up 1 tệp).
**Chưa chắc [cần thử thật]:** địa chỉ/kích thước dữ liệu ngôn ngữ, tốc độ trên điện thoại. Có nút **"Kiểm tra OCR"** (chạy 1 ảnh mẫu nhúng sẵn).
**Kiểm tra:** ảnh chữ Việt mẫu trong Playwright (npm `tesseract.js` + dữ liệu cục bộ); luồng hủy; PDF có chữ không gọi OCR.

## Phase A5a — PDF nâng cao (1/2): watermark, đánh số trang, thêm chữ · **M** · index.html (+ tệp phông)
**Đọc DERO:** §20.4 "Chỉnh sửa PDF" (1049) và "Watermark và đánh số trang" (1059); §20.5 phần phông (1101).
**Việc cần làm:** nạp `pdf-lib` + `fontkit`; **nhúng phông con (subset)** Be Vietnam Pro / Arimo / Tinos để đủ dấu tiếng Việt (tệp TTF để ở Worker `dobai` `/fonts/`, **người dùng up thêm** — ghi rõ trong hướng dẫn; hoặc tải từ CDN nếu có); tính theo **CropBox + góc xoay trang**.
- Watermark: nhiều dòng, **chéo/ngang/lặp kín (so le)**, độ mờ 0,03–1, màu hex, phạm vi `all|first|1,3-5`.
- Đánh số: 5 kiểu (`1`, `Trang 1`, `1/10`, `Trang 1/10`, `- 1 -`), vị trí 6 ô, cỡ 6–40, số bắt đầu, bỏ trang đầu.
- Thêm chữ: lớp chú thích trên trang pdf.js, tọa độ chuẩn hóa 0–1, đậm/nghiêng/gạch chân/màu, tự xoay theo hướng trang.
**Kiểm tra:** PDF mẫu có trang xoay 90° — chữ không lệch; "Trang 1/10" đúng; tiếng Việt đủ dấu.

## Phase A5b — PDF nâng cao (2/2): chữ ký, che thông tin thật, mật khẩu · **M** · index.html
**Đọc DERO:** §20.4 (1049, 1057), §20.2 dòng `chen-chu-ky`, `che-thong-tin`, `dat-mat-khau` (984–987).
- **Chữ ký**: vẽ ngón tay hoặc ảnh (tự xóa nền giấy), chèn nhiều trang; lưu chữ ký ở `dc:sign` (có hỏi trước, vì là dữ liệu cá nhân).
- **Che thông tin = xóa thật**: trang vẽ ra canvas **200 DPI**, tô đen, lưu JPEG 0,9, **thay trang gốc bằng trang ảnh**; nói rõ "trang này mất lớp chữ chọn được".
- **Mật khẩu (đặt/gỡ)**: cần `qpdf.wasm` (≈1,3 MB, mã hóa AES-256) → **để mục chọn sau**, chỉ làm khi người dùng muốn; kiểm tra giấy phép và tải wasm lên Worker `dobai`.
**Kiểm tra:** che xong trích chữ vùng che bằng pdf.js phải rỗng; chữ ký đúng vị trí trên trang xoay.

## Phase A6 — Office ↔ PDF bản "trên máy" (gần đúng) · **M** · chỉ index.html
**Lưu ý trung thực:** chuyển đổi chuẩn cần LibreOffice trên máy chủ (không có miễn phí/không thẻ). Làm bản gần đúng và **ghi rõ giới hạn** trong giao diện.
- **Word→PDF**: `docx-preview` (đã có) dựng HTML → `html2pdf` (đã có); bố cục có thể lệch.
- **PDF→Word cơ bản**: pdf.js lấy chữ theo dòng (gom đoạn, nhận tiêu đề theo cỡ chữ) → `.docx` tối thiểu bằng JSZip hoặc thư viện `docx` (§24.1 chỉ để tra API); **không giữ bảng/ảnh/cột** (DERO §20.7 nêu lỗi nhận nhầm cột với công văn hai cột → ở đây không dò cột).
- **PDF→Excel** (gom chữ theo hàng/cột, §20.4 dòng 1061), **CSV→Excel**, **Ghép file/sheet Excel** (XLSX sẵn có).
**Kiểm tra:** `.docx` mẫu ra PDF đủ trang; PDF văn bản thường ra `.docx` mở được, đúng thứ tự đoạn.

---

# PHẦN B — SOẠN ĐỀ, ĐỀ ONLINE, SLIDE

## Phase B1a — Mô hình đề + chuyển đổi dữ liệu Unit · **M** · chỉ index.html
**Đọc DERO:** §7.2 (337–341), §7.3 (343–360), §5.4 phần "Mô hình khối đề" (236).
**Việc cần làm:**
1. Mô hình `EX`: `{id,title,unit,grade,term,year,duration,createdAt,updatedAt,blocks[]}`; loại khối cho **tiếng Anh**: `header, student, heading, para, mcq (4 phương án), tf (đúng/sai a–d), short (trả lời ngắn), essay, passage (đoạn văn), cloze (điền từ), reorder (sắp xếp câu), answerKey, rubric, end, pagebreak`. Hạng `QType = trac-nghiem|dung-sai|tra-loi-ngan|tu-luan`.
2. Điểm mặc định: 0,25 (trắc nghiệm), thang 0,1/0,25/0,5/1 (đúng/sai theo số ý), 0,25 (trả lời ngắn), 1 (tự luận); nút **chia đều 10 điểm**.
3. **Kiểm tra hợp lệ** (đủ 4 phương án, có đáp án, đáp án trả lời ngắn khớp `^[-+]?\d+(,\d+)?$`…).
4. Lưu `dc:exam:<id>` + chỉ mục `dc:exams` (tự đồng bộ). Bộ **chuyển đổi**: Unit/Exercise hiện có (`QDATA/TR/ANSK/QPASS`) và đề đã nạp (`dc:unit:<id>`) → `EX`.
**Kiểm tra:** chuyển u2e1 → `EX` đủ 10 câu, đáp án khớp; validator bắt câu thiếu đáp án.

## Phase B1b — Trình soạn đề trên điện thoại · **M** · chỉ index.html
**Đọc DERO:** §5.4 (202–236: ribbon điện thoại, bảng công cụ, **khối mẫu** dòng 225–232), §5.2 (182–190).
**Việc cần làm:** trình soạn dạng **danh sách khối** (không dùng TipTap): thêm khối từ bảng **Khối mẫu** (nhóm Đầu đề · Câu hỏi · Nội dung · Bố cục), sửa tại chỗ, ↑↓ chuyển, nhân đôi, xóa, **hoàn tác/làm lại**, đánh số câu tự động, "Xem trang A4", mục lục các phần; nút ⋯ "Tất cả công cụ" (Định dạng/Chèn/Bố cục). Chèn từ **Kho câu hỏi** để B6 nối sau.
**Kiểm tra:** soạn 1 đề 3 phần, lưu, tải lại trang, mở lại đủ; 400 px; hoàn tác 20 bước.

## Phase B2 — Xuất đề & trộn mã đề · **M** · chỉ index.html
**Đọc DERO:** §11.6 (675–706), §1 dòng "trộn câu và đáp án" (265), §6.3 bố cục đáp án `cols-4/cols-1` (285).
**Việc cần làm:**
- **Xuất `.docx`** (thư viện `docx` bản UMD từ CDN, kèm giữ nguyên thông báo bản quyền; nếu thất bại → JSZip tối thiểu), **PDF** (html2pdf/CSS `@page` A4), **in**, `.json` sao lưu.
- Bố cục đáp án tự chọn 1 hàng/2 hàng/dọc theo độ dài.
- **Trộn mã đề**: hoán vị câu và đáp án theo hạt giống, mã đề 3–4 chữ số, **bảng đáp án từng mã**, giữ các câu cùng một đoạn văn đi cùng nhau, không trộn đáp án dạng "All of the above/Both A and B"; xuất ZIP nhiều mã.
**Kiểm tra:** 4 mã đề — mỗi câu đáp án đúng khớp bảng đáp án mã đó (script kiểm tự động); `.docx` mở được (đọc lại bằng JSZip).

## Phase B3 — AI soạn đề tiếng Anh nhiều bước · **M** · chỉ index.html
**Đọc DERO:** §9 (429–437), §9.1 phần "Soạn đề" (441–447), §8.1 (419–425), §11.2 (536–570), §11.3 (571–604), §19.2 (892–915).
**Việc cần làm (dùng lại `ai()`, bậc model, `VZG.parseAI/salvage`, `verifyKeys`):**
1. **Hỏi trước** (thẻ lựa chọn 4 câu: hình thức, độ khó, thời gian, phạm vi Unit/ngữ pháp) khi yêu cầu mơ hồ.
2. **Khung chương trình tiếng Anh** (Unit đã nạp + danh sách ngữ pháp/từ vựng người dùng chỉnh được; không đóng cứng): yêu cầu AI chỉ ra câu trong phạm vi, thêm `warning` khi yêu cầu ngoài phạm vi.
3. **Soạn** ra JSON `blocks` (stream nếu model hỗ trợ), 3 giai đoạn có đồng hồ: Suy nghĩ → Viết đề → Đưa vào đề; **máy trạng thái** (§19.2); đếm số câu yêu cầu, thiếu thì gọi bù 1 lần.
4. **Kiểm tra sau soạn**: đủ phương án, không trùng câu, đáp án hợp lệ; **bỏ phiếu đáp án** bằng 3.8/3.6 Flash như Nạp đề; câu nghi ngờ vào danh sách "Nên xem lại".
5. Thêm: "Rà soát đề hiện tại", "Thêm câu hỏi", "Sửa câu" (tái dùng mẫu thẻ **Sửa** có Trước/Sau + Áp dụng).
**Kiểm tra:** AI giả lập (như các Phase trước) trả JSON bị cắt giữa chừng → `salvage` khôi phục; đếm câu thiếu → gọi bù; **chưa thử Gemini thật** (ghi BAN_GIAO).

## Phase B4a — Đề online: Worker + D1 · **M** · **Worker (dán lại `api-worker.js`)**
**Đọc DERO:** §7.3, §7.4 (343–365), §8 (389–404), §11.4 (605–639), §20.12 khung Worker (1184–1201), §20.6 hạn mức (1116–1117).
**Việc cần làm:**
- Bảng D1 mới (tự tạo như các bảng khác): `exams(id TEXT PK 8 ký tự, owner, data, answers, listed, created, updated)`, `attempts(id, exam_id, device_id, name, class, score, max, seconds, answers, created)`.
- Route: `POST /api/exam` (chủ đề đăng, cần đăng nhập, tách `answers` ra cột riêng), `GET /api/exam/:id` (**công khai, không trả đáp án/lời giải**), `POST /api/attempt` (**máy chủ chấm lại**, không tin điểm từ trình duyệt; giới hạn tên ≤ 60, lớp ≤ 30), `GET /api/exam/:id/results` (chỉ chủ đề), `GET /api/exam/:id/gate?device=` (đã làm chưa).
- **Chống lạm dụng**: hạn mức theo IP-ngày bằng bảng `rl` đã có; tùy chọn Turnstile (miễn phí, không cần thẻ, cần site key + secret — hỏi người dùng có muốn không).
- Chặn CORS cũ vẫn dùng `SITE_ORIGIN`; endpoint công khai không cần token nhưng bắt buộc `exams.listed`/đã đăng.
**Kiểm tra:** `wrangler dev --local` như BAN_GIAO §3.2: đăng đề, lấy đề (không thấy đáp án), nộp bài chấm đúng, nộp 2 lần bị `gate` chặn khi bật "một lần", vượt hạn mức → 429.

## Phase B4b — Đề online: giao diện làm bài & chia sẻ · **M** · index.html
**Đọc DERO:** §6.3 (280–287), §7.4 phần định danh thiết bị (364).
**Việc cần làm:** nút **"Đăng đề online"** ở trình soạn (chọn: công khai theo link / một lần / hạn giờ / có xem lời giải sau khi nộp); **link chia sẻ** dạng `…workers.dobai/?de=<id>` (app một file nên dùng `?de=`), copy + `navigator.share`; màn **Làm bài** cho học sinh (không đăng nhập; `device_id` UUID `dc:device`): tên + lớp, đồng hồ, 4 loại câu, đánh dấu câu chưa làm, **tự lưu nháp**, nộp, kết quả + lời giải nếu chủ cho phép. Chế độ làm bài ẩn mọi thứ khác của app.
**Kiểm tra:** Playwright 2 ngữ cảnh (chủ + học sinh) với Worker cục bộ; đồng hồ hết giờ tự nộp; mất mạng khi nộp → giữ bài, thử lại.

## Phase B5 — Phân tích kết quả + chấm phiếu gõ tay · **M** · index.html
**Đọc DERO:** §7.4 phân tích (364), §6.5 (293–299).
**Việc cần làm:** bảng điểm (gộp theo `device_id`/tên, **lần tốt nhất**), TB thang 10, **4 mức** (<5, 5–6,5, 6,5–8, ≥8), top 3, **histogram** + thống kê từng câu (câu sai nhiều → nút "Tạo bài ôn" nối vào **ôn lại câu sai** sẵn có), xuất Excel (XLSX). **Chấm phiếu gõ tay**: lưới câu + nút A B C D, so với đáp án đề chọn, lưu lịch sử. Chấm **ảnh phiếu** (OpenCV.js) → để D-tùy chọn.
**Kiểm tra:** dữ liệu giả 30 bài; số liệu thống kê khớp tính tay.

## Phase B6 — Ngân hàng câu hỏi + ma trận đề · **M** · chỉ index.html
**Đọc DERO:** §5.4 dòng "Kho câu hỏi" (219), §9 bước nạp khung (433), §1 dòng "ma trận, bản đặc tả" (265).
**Việc cần làm:** kho câu (IndexedDB `dc-kho` hoặc `dc:bank:*`) tự nhận câu từ Nạp đề/AI/đề đã soạn; thẻ **Unit · dạng · mức (NB/TH/VD/VDC) · chủ điểm ngữ pháp**; tìm/lọc; chèn vào đề; AI gắn mức/chủ điểm hàng loạt (1 lượt/Exercise); **ma trận & bản đặc tả** (bảng dạng × mức), **tạo đề tự động theo ma trận** (chọn ngẫu nhiên theo ràng buộc, không trùng câu đã ra gần đây).
**Kiểm tra:** 200 câu giả; tạo đề theo ma trận đúng số lượng từng ô.

## Phase B7a — Slide giảng bài AI (1/2): dàn ý duyệt + từng slide · **M** · index.html
**Đọc DERO:** §5.5 (240–248), §9.1 phần "Soạn slide" (449–458), §19.3 (916–933).
**Việc cần làm:** luồng `hỏi → thẻ dàn ý (tiêu đề, số slide, đối tượng, danh sách slide) → [Hủy] [Tạo N slide] → mỗi slide một lượt → kiểm tra hợp lệ (19.3) → "Bỏ qua N slide vì nội dung không hợp lệ" + nút Tạo lại`; mô hình `deck {id, background, transition, elements[] (x,y,w,h theo %)}`; **trình chiếu** toàn màn hình trong web (Hiện dần, Bay lên… + "Hiện từng dòng"); tái dùng `IMG` (ảnh/video), 🔊 TTS đọc ghi chú; xuất **.pptx** bằng PptxGenJS (đã có).
**Kiểm tra:** AI giả lập: 1 slide lỗi → bị bỏ + Tạo lại; xuất pptx đọc lại bằng JSZip đủ slide.

## Phase B7b — Slide (2/2): chỉnh sửa & mẫu · **M** · index.html
Kéo/đổi cỡ phần tử, sửa chữ tại chỗ, thêm hình/hộp chữ/bảng 3×3/biểu đồ cột, ghi chú người nói, nền sáng/tối, đổi bố cục, sắp xếp lại slide, hoàn tác. **Đọc DERO:** §5.5 (244–247).

---

# PHẦN C — TRẢI NGHIỆM & HẠ TẦNG

## Phase C1 — Trang bắt đầu + thanh tab tài liệu · **M** · chỉ index.html
**Đọc DERO:** §5.1, §5.2 (171–190), §21 (1258–1267).
Lời chào theo giờ; **thẻ nhanh** (Đề, Slide, Công cụ tệp, Nạp đề); "Gần đây" có ô tìm, **lọc viên** (Tất cả/Đề/Slide/Công cụ) với tấm nền trượt, đổi tên, xóa (có thùng rác sẵn của cfsync); thanh tab 42 px cho **tài liệu mới** (không đụng chat); trạng thái rỗng thân thiện.
**Kiểm tra:** mở 3 tab, đóng/chuyển, tải lại vẫn nhớ; 400 px.

## Phase C2 — PWA + dùng offline · **M** · index.html + **thêm tệp lên Worker `dobai`**
**Đọc DERO:** §20.1 (960–962).
Thêm `manifest.webmanifest`, `sw.js`, 3 biểu tượng (192/512/512 maskable); service worker **network-first cho `index.html`**, cache-first cho thư viện có phiên bản; số phiên bản cache = ngày build; nút "Cài như ứng dụng" (bắt `beforeinstallprompt`); nút **"Xóa cache & tải bản mới"** trong ☁ Tài khoản (vì BAN_GIAO đã ghi "xóa cache nếu vẫn thấy bản cũ").
**Rủi ro:** SW giữ bản cũ → luôn có nút xóa cache và hiển thị số phiên bản.

## Phase C3 — Hạn mức, thống kê ẩn danh, Turnstile · **S** · **Worker**
**Đọc DERO:** §20.8 (1148–1154), §20.6b (1131–1134).
Sự kiện ẩn danh `POST /api/e {e,l,p}` (không IP, không nội dung) → bảng `usage` (kind `evt:<tên>`), hiện ở tab **Tổng quan** của trang quản trị: công cụ nào dùng nhiều, số bài nộp. Gắn Turnstile cho `POST /api/attempt` nếu người dùng đã có khóa.

---

# PHẦN D — TÙY CHỌN (chỉ làm khi người dùng yêu cầu)

- **D1 QR / VietQR / mã vạch** (§20.4 dòng 1071): QR cho link đề online (dán lên bảng/lớp), VietQR EMVCo + CRC-16.
- **D2 Lưu đồ / sơ đồ tư duy ngữ pháp** (§20.4 dòng 1073): gõ từng dòng → tự dàn → xuất PNG/SVG/PDF.
- **D3 So sánh văn bản** (§20.4 dòng 1079): so 2 phiên bản đề, tô sửa/thêm/xóa.
- **D4 Nhóm hành chính** (hóa đơn XML, sao kê, ngày làm việc, lịch âm): không liên quan học tiếng Anh.
- **D5 Bảng vẽ mini** (§5.3), **D6 Chấm ảnh phiếu** (OpenCV.js).
- **D7 Giao diện theo dịp** (§20.1 dòng 956): mảng `[tên, từ, đến]`, ví dụ Tết 2027.

---

## 4. Bảng theo dõi (đánh dấu khi xong)

| Phase | Việc | Cỡ | Worker? | Xong |
|---|---|---|---|---|
| A0 | Khung Công cụ | S | – | ☑ |
| A1 | Văn bản Việt/Anh | S | – | ☑ |
| A2a | PDF: ảnh↔PDF, tách, xóa, xoay | M | – | ☑ |
| A2b | PDF: ghép, sắp xếp | M | – | ☑ |
| A3a | Nén ảnh/PDF (đã ghép, chưa thử điện thoại) | M | – | ☑ |
| A3b | Ảnh thẻ, ghép CCCD (đã ghép, chưa thử điện thoại) | M | – | ☑ |
| A4 | OCR + Nạp đề | M | tùy chọn | ☐ |
| A5a | Watermark, số trang, thêm chữ | M | up phông | ☐ |
| A5b | Chữ ký, che thông tin, mật khẩu | M | tùy chọn | ☐ |
| A6 | Office↔PDF gần đúng | M | – | ☐ |
| B1a | Mô hình đề | M | – | ☐ |
| B1b | Trình soạn đề | M | – | ☐ |
| B2 | Xuất + trộn mã đề | M | – | ☐ |
| B3 | AI soạn đề tiếng Anh | M | – | ☐ |
| B4a | Đề online: Worker + D1 | M | **Có** | ☐ |
| B4b | Đề online: giao diện | M | – | ☐ |
| B5 | Phân tích + chấm gõ tay | M | – | ☐ |
| B6 | Ngân hàng câu + ma trận | M | – | ☐ |
| B7a | Slide AI (dàn ý + từng slide) | M | – | ☐ |
| B7b | Slide: chỉnh sửa | M | – | ☐ |
| C1 | Trang bắt đầu + tab | M | – | ☐ |
| C2 | PWA offline | M | up tệp | ☐ |
| C3 | Thống kê + Turnstile | S | **Có** | ☐ |

## 5. Việc tồn đọng trong BAN_GIAO nên xử lý xen kẽ (không thuộc DERO)
Nhiều module đã làm **chưa thử với Gemini/mạng thật** (Nạp đề + Files API 15 MB, tạo lời giải trực quan, tìm video/ảnh, trình duyệt đám mây, Hydrogen id model). Sau mỗi Đợt nên dành 1 phiên ngắn "kiểm tra thật trên điện thoại" và ghi kết quả vào BAN_GIAO để các Phase mới không dựa trên giả định sai.
