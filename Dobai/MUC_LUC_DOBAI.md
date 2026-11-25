# MỤC LỤC TRA CỨU DOBAI — đọc file này TRƯỚC, rồi chỉ đọc đúng dải dòng cần

Lập 21/11/2026 từ bản `index.html` **16 182 dòng** (6,4 MB), `cfsync.js` 627 dòng, `api-worker.js` 608 dòng. Số dòng đổi sau mỗi lần sửa → chạy lại: `python3 mkmap.py index.html cfsync.js api-worker.js > CODEMAP.md` (CODEMAP.md đi kèm là bản mới nhất).

> **Lưu ý:** phần "CODEMAP" nằm trong `BAN_GIAO.md` (dòng 203–730) là bản **cũ** (index.html 13 331 dòng) → **số dòng ở đó đã lệch**, chỉ dùng phần mô tả. Số dòng đúng nằm ở file này và `CODEMAP.md`.

## 1. Cách Claude dùng (tiết kiệm hạn mức)
1. Đọc **file này** + mục BAN_GIAO liên quan (số dòng ở §6) + Phase trong `KE_HOACH_NANG_CAP_DOBAI.md`. **Không** đọc cả `index.html` (có dòng dài hàng trăm KB) hay cả `DERO_TONG_HOP_V4.md` (239 647 dòng; mục 24 từ dòng 1301 là mã thư viện).
2. Đọc mã: `sed -n 'A,Bp' index.html | cut -c1-300` hoặc Read với offset/limit; tìm hàm: `grep -n "function TÊN\|const TÊN" index.html | cut -c1-120`.
3. **Không in dòng chứa khóa API** (`GKEYS` dòng 4404 và vài dòng `cfg.keys` có khóa nhúng) — dùng `cut -c1-80`.
4. Sửa bằng script Python `s.replace(a,b)` có `assert s.count(a)==1`; chèn module mới **ngay trước** `<script src="/cfsync.js">` (dòng 15674 hiện tại).
5. Thử: Playwright mở `file://…/index.html`, nghe `pageerror` (xem BAN_GIAO §7, dòng 172–177).

## 2. Các tệp và vai trò
| Tệp | Đưa vào đâu | Ghi chú |
|---|---|---|
| `index.html` | Worker tĩnh **dobai** | Toàn bộ app (một file) |
| `cfsync.js` | Worker **dobai** | Đồng bộ + tài khoản + trang quản trị |
| `ytplay.html` | Worker **dobai** | Trang trung gian phát YouTube khi mở từ `content://`/`file://` (nhận `?v=<11 ký tự>&t=<giây>`) |
| `api-worker.js` | Worker **dobai-api** (dán code) | API, D1, vai trò, Netlify gate, trình duyệt đám mây, `/api/shared` |
| `HUONG_DAN_UP.md` | không up | Các bước A→H đưa lên Cloudflare + kiểm tra + sự cố thường gặp |
| `SHARED_API.md` | không up | Hợp đồng `/api/shared/models|usage` (đã cài trong api-worker dòng 139–222) |
| `wg-module.html` | không up | **Bản gốc** của khối `wg-ext` (đã ghép vào index.html dòng 15456–15673); chỉ dùng để xem cách ghép |
| `mkmap.py` | không up | Sinh `CODEMAP.md` |
| `BAN_GIAO.md` | không up | Nhật ký + thiết kế (mục lục ở §6) |
| `KE_HOACH_NANG_CAP_DOBAI.md` | không up | Các Phase nâng cấp từ DERO |
| `DERO_TONG_HOP_V4.md` | không up | Tài nguyên tham khảo (mục lục ở §5) |

## 3. index.html — các khối theo thứ tự (dòng hiện tại)
| Dòng | id | Vai trò | Mục BAN_GIAO |
|---|---|---|---|
| 12–712 | style chính | CSS chung (responsive ở cuối) | — |
| 713 | script (269 KB) | thư viện JS nhúng | §7 |
| 732–877 | ui-pro | CSS giao diện | — |
| 883–886 | d-t80, d-tu2, d-ansd, d-u3 | JSON nhúng: đề cương, Unit 2, đáp án/lời giải, Unit 3 | — |
| 923 | af-lib-gz | thư viện nén (1,8 MB) cho trình xem tệp | — |
| 924–2528 | script | **AF** (xuất tệp + trình xem, `HLX` tô màu mã dòng 1288, `AG` dòng 1432, `IMG` tìm ảnh/video dòng 1718) | §4, 4l, 4m |
| 2529–2858 | unit-core | **UIMPC**: lõi Nạp đề (phân tích đề, kiểm tra, lời giải chữ) | 4h, 4i |
| 2859–8788 | script chính | dữ liệu đề (`QDATA` 2918, `ANSK` 2943, `ansHTML` 2954, `TR`/`SECS` 3188, **`UNITX` 3193**), `FC` vòng công cụ 3273, **chat AI** (`GKEYS` 4404, `KST` 4435, `KSTUI` 4543, `EXP` 4752, `NL_BASE` 4769, `AIP` 5159, `GCHAT` 5257, `xkCall` 5689, `geminiCallOnce` 6230, `mdInline` 6338, `mdRender` 6380, `gRender` 6726, `gSend` 7138, `TTS` 7188, `sayText` 7222), `init` 8743 | §4, 4b |
| 8790–9253 | lrn-ext | Ôn tập thông minh (học lại câu sai, AI phân tích) — `window.LRN` | §6 |
| 9254–9934 | sk-bundle, sk-js | Kỹ năng (skill) — `window.SK` | — |
| 10007–10437 | stt-ext | Bấm giờ/hẹn giờ/lưu thời gian học — `window.STT` | — |
| 10438–10988 | agx-ext | **AGX**: nhiều bước, nhóm tin, xin phép công cụ, xuất ảnh Word/PDF | 4o |
| 10989–11753 | kho-core, kho-ext | **Kho** dữ liệu/bộ nhớ dài hạn (`window.__KHO`) | — |
| 11754–12178 | ui-final(+js), fix-r7 | CSS/JS tinh chỉnh (neo khung chat theo bàn phím…) | — |
| 12180–12355 | anim-r10, think-r12, br-css | hiệu ứng, khung suy nghĩ | 4 |
| 12357–12460 | fm-js, fm-css | **Tệp của tôi** (`FM`) | 4b |
| 12461–13098 | vz-css, vz-js | **Lời giải trực quan** (`VZD` 12658) | 4e, 4e-2 |
| 13100–13653 | vzg-css, vz-gen | tạo lời giải trực quan bằng AI (`callGem` 13473) | 4f |
| 13654–13972 | vz-edit | sửa/xuất/nhập lời giải | 4g |
| 13973–14151 | vzg-ui, vz-read | bộ chọn bấm được thay `<select>`; kịch bản đọc do AI viết | 4h, 4k |
| 14153–15074 | unit-import | **Nạp đề** (giao diện, AI, thẻ Tự động, Sửa) | 4h, 4i, 4j, 4n |
| 15075–15455 | vid-css, vid-ext | AI tìm video + khung phát nhúng (`window.VID` 15453) | 4i |
| 15456–15673 | wg-css, wg-ext | Nhóm công việc kiểu Claude + prompt phong cách (`window.WG`) | 4o |
| **15674** | `<script src="/cfsync.js">` | **Điểm chèn module mới = ngay trước dòng này** | — |
| 15676–15861 | tok-css, thtr-css, afcode-css, aip-css, gia-css, kst-css, adv-r13-css | CSS thẻ token, dịch suy nghĩ, mã nguồn, trợ lý, thống kê khóa | — |
| 15862–16180 | adv-r13 | model dùng chung, hạn mức học từ mọi tài khoản, đẩy việc khó, nhóm model, tạo skill (`ESC` 15993) | 4b |

## 4. Muốn sửa việc gì → vào đâu
| Việc | Nơi | Ghi chú |
|---|---|---|
| Khung chat AI, vẽ tin nhắn | `gRender` 6726, `mdRender` 6380, `mdInline` 6338 (ảnh/video/liên kết) | CSS lớp `.gai/.gbody`; module `wg-ext` bọc `gRender` |
| Gọi model | Gemini `geminiCallOnce` 6230 · kiểu OpenAI `xkCall` 5689 · `callGem` (vz-gen 13473) · `callOA` (unit-import) | `ai()` trong unit-import chọn theo tiền tố `xk:/gk:/nl:/or:/ap:/za:/it:/gq:` |
| Khóa, hạn mức, thống kê | `GKEYS` 4404, `KST` 4435, `KSTUI` 4543, `ESC`/`MDL` (adv-r13 15993–16070) | `localStorage ai_usage, ai_limits, ai_prjgroups` |
| Nhà cung cấp phụ (ApiNex, Z.ai, Groq, Itera) | `EXP` 4752 | BAN_GIAO 813–816 |
| Prompt hệ thống | `GSYS` 5144, `AG.sys` (1432), `AIP.sys()` 5159, `WG.proto` (wg-ext) | |
| Đọc to | `TTS` 7188, `sayText` 7222, `AIP` 5159 | BAN_GIAO dòng 72 |
| Nạp đề (Unit mới) | lõi `unit-core` 2529; giao diện `unit-import` 14153; đăng ký vào app `UNITX` 3193 | khóa `dc:unit:<id>`, `dc:units` |
| Lời giải trực quan | `vz-js` 12653 (dữ liệu `VZD` 12658), tạo `vz-gen`, sửa `vz-edit`, đọc `vz-read` | khóa `dc:vzgen:`, `dc:vzhist:`, `dc:vzrd:` |
| Video / ảnh | `vid-ext` 15121 · `IMG` 1718 | `VID.parse/search/run/pre` |
| Xuất tệp/trình xem tệp | `AF` 924 (đối tượng `HLX` 1288) | |
| Kho tệp / Tệp của tôi | `kho-core` 10989, `kho-ext` 11322, `fm-js` 12357 | IndexedDB `dc-kho` |
| Skill | `sk-js` 9255 | IndexedDB `sk_db` |
| Ôn lại câu sai | `lrn-ext` 8790 | |
| Giờ học | `stt-ext` 10007 | `localStorage stt:v1` |
| Đồng bộ, đăng nhập, quản trị (client) | `cfsync.js`: đồng bộ 164, giao diện 239, đăng nhập 320, tài khoản 345, **quản trị 434**, sao lưu 579, khởi động 613 | danh sách cho phép localStorage: dòng ~113 `scanLocal` |
| API server | `api-worker.js`: `initDb` 51, vai trò/quyền 81, `shared` 153, **`api` router 222**, `redeem` 330, `admin` 351, `nlProxy` 454, `brProxy` 507, route gốc 585–604 | thêm route mới = thêm `if (path === …)` trong `api` (≈222–330) hoặc ở cuối (585+) |
| Thêm bảng D1 | `initDb` (api-worker 51) | tự tạo khi có yêu cầu đầu tiên |

Route đã có (api-worker): `/api/config`, `/auth/google`, `/auth/dev`(DEV_LOGIN), `/api/me`, `/api/index`, `/api/item`, `/api/blob/…`, `/api/trash`, `/api/restore`, `/api/purge`, `/api/redeem`, `/api/shared/{models,usage}`, `/api/admin/*`, `/nl/v1/*` (Netlify), `/br` (trình duyệt đám mây).

Khóa localStorage tự đồng bộ: tiền tố `dc:|lrn:|stt:|fc_|ai_|or_custom|nl_custom|tok_save`; chặn nếu chứa `key|token|secret|tally|probe` (BAN_GIAO dòng 51).

## 5. DERO_TONG_HOP_V4.md — mục lục theo dòng (đọc `offset`/`limit`)
Tổng 239 647 dòng. **Dòng 1–1300 = nội dung khảo sát** (đọc từng mục); **từ 1301 = mã nguồn thư viện** (24.1 docx 1313 · 24.2 PptxGenJS 124916 · 24.3 pdf-lib 135121 · 24.4 @office-kit/docx 172132 · 24.5 Gotenberg 212652) → chỉ tra API khi thật cần, đọc ≤ 80 dòng.
Mục dero.id.vn = 1–19 và 21; pdfoke.com = 20; ánh xạ vào kế hoạch dựng = 22.

- 1  Bộ tài nguyên và khảo sát tổng hợp (v4): web soạn đề dero.id.vn "đề rõ", công cụ PDF pdfoke.com, Office 23
- 15  Mục lục
- 44  0. Lấy được gì, không lấy được gì
- 59  1. Tổng quan sản phẩm
- 76  2. Bản đồ màn hình và điều hướng
- 97  3. Kiến trúc
- 115  4. Hệ thống thiết kế
- 117  4.1 Phông và cỡ chữ [đã thấy]
- 124  4.2 Màu (biến CSS trên `:root`)
- 139  4.3 Bo góc, bóng, chuyển động
- 145  4.4 Công nghệ giao diện [suy ra]
- 149  4.5 Khung token để bắt đầu (đặt lại giá trị theo thương hiệu của bạn)
- 167  5. Khung ứng dụng soạn thảo `/soan-de`
- 171  5.1 Thanh tab `compose-tabbar`
- 182  5.2 Trang bắt đầu
- 192  5.3 Bảng vẽ [đã thấy]
- 202  5.4 Trình soạn đề [đã thấy, trên khổ điện thoại]
- 240  5.5 Trình soạn slide [đã thấy, trên khổ điện thoại]
- 250  5.6 Trợ lý AI trong ba loại tài liệu [đã thấy]
- 258  6. Các trang còn lại
- 260  6.1 Trang chủ `/`
- 271  6.2 Đề cộng đồng `/de-cong-dong`
- 280  6.3 Xem đề `/de/<id>`
- 289  6.4 Kho tài liệu `/kho-tai-lieu`
- 293  6.5 Chấm trắc nghiệm `/cham-trac-nghiem`
- 301  6.6 Tạo đề online `/tao-de-online`
- 307  7. Mô hình dữ liệu
- 309  7.1 Đồng bộ cloud (`user_items`)
- 337  7.2 Đề soạn thảo (`doc`): mảng `blocks`
- 343  7.3 Đề online (`online`)
- 362  7.4 Bài làm (`exam_attempts`)
- 366  7.5 Slide (`deck`) và bảng vẽ (`board`)
- 370  7.6 Kho tài liệu (`user_documents`)
- 374  7.7 Bảng Supabase khác quan sát được
- 389  8. API máy chủ `/api/*`
- 406  8.0 Các tác vụ `/api/llm` đã thấy trong log
- 419  8.1 Giao thức `/api/llm` stream (SSE)
- 429  9. Luồng AI soạn đề (nhiều bước)
- 439  9.1 Quan sát thực tế (đề và slide)
- 462  10. Điểm AI và bảng giá `/bang-gia`
- 491  11. Mã khởi đầu (chạy được)
- 493  11.1 Proxy `/api/llm` bằng Cloudflare Worker (chuyển tiếp tới bất kỳ API tương thích OpenAI, ví dụ Gemini, Ope
- 536  11.2 Máy khách gọi AI và tách JSON chịu lỗi
- 571  11.3 Nhận diện môn/lớp/học kỳ từ câu yêu cầu (nền tảng của "khung chương trình")
- 605  11.4 Chấm đề online (chạy phía máy chủ, không tin kết quả từ trình duyệt)
- 640  11.5 Đồng bộ local-first lên Supabase (khung rút gọn)
- 675  11.6 Xuất `.docx` đề thi bằng thư viện `docx` (Node hoặc trình duyệt)
- 707  12. Bảng vẽ và 27 công cụ hình
- 709  12.1 Phân loại theo môn [đã thấy]
- 736  12.2 Chi tiết hình học trong mã nguồn rút gọn
- 744  12.3 Cách làm
- 750  13. Lộ trình dựng và ánh xạ trang
- 784  14. Kết nối với web OCR
- 790  15. Đã sửa so với hai file cũ
- 811  16. Còn thiếu và cách lấy tiếp
- 827  17. Lưu ý
- 838  18. Phụ lục: bookmark thu thập, cách chạy và giới hạn
- 862  19. Phụ lục: mã bổ sung
- 864  19.1 Thống kê mẫu số liệu ghép nhóm (đã chạy thử)
- 892  19.2 Máy trạng thái trợ lý AI (soạn đề, slide)
- 916  19.3 Kiểm tra slide hợp lệ (chặn "Bỏ qua 1 slide vì nội dung không hợp lệ")
- 934  20. Web thứ hai: pdfoke.com (công cụ PDF/văn phòng) — nay có đủ mã giao diện
- 938  20.0 Dữ liệu có trong lần này và còn thiếu
- 951  20.1 Tổng quan và trang chủ [đã thấy]
- 967  20.2 Danh mục 62 công cụ [đã thấy: `llms.txt` và HTML từng trang]
- 1031  20.3 Khung công cụ dùng chung (`ToolShell`) và giới hạn [đã thấy trong mã]
- 1045  20.4 Cách từng nhóm công cụ làm việc [đã thấy trong mã, diễn đạt lại]
- 1081  20.5 Hệ thống thiết kế [đã thấy trong CSS]
- 1105  20.6 Dịch vụ chuyển đổi phía máy chủ [đã thấy, trong repo `pdfoke-convert`]
- 1128  20.6b Phía trình duyệt gọi dịch vụ [đã thấy trong mã]
- 1136  20.7 Chi tiết kỹ thuật đáng học của dịch vụ
- 1148  20.8 Quyền riêng tư, thống kê, quảng cáo [đã thấy: trang Chính sách bảo mật, cập nhật 18/11/2026]
- 1156  20.9 SEO, GEO và trang mẫu [đã thấy]
- 1163  20.10 Bản ghi thao tác (3 gói zip, một phiên) [đã thấy]
- 1179  20.11 Giấy phép (quan trọng khi dùng lại)
- 1182  20.12 Khung viết lại riêng (ý tưởng, không chép mã gốc)
- 1244  20.13 Còn thiếu về pdfoke và cách lấy tiếp
- 1258  21. Web thứ ba: Office 23 — `office.minhspark.com` [đã thấy qua ảnh chụp; chưa có mã nguồn]
- 1271  22. Ánh xạ vào kế hoạch dựng (bổ sung cho mục 13 và 14)
- 1291  23. Thay đổi so với v3 (bản v4)
- 1301  24. Phụ lục: mã nguồn thư viện xử lý file (tải từ GitHub ngày 20/11/2026)
- 1313  24.1 docx (dolanmiu/docx) — tạo/sửa .docx

## 6. BAN_GIAO.md — mục lục theo dòng
(bỏ đoạn CODEMAP cũ dòng 203–730; các mục 4i–4o ở cuối file là mới nhất, đọc **4n** (775) trước khi làm tiếp việc dở)

- 1  BÀN GIAO CÔNG VIỆC — Web học tiếng Anh (dobai) + đồng bộ Cloudflare
- 9  1. Mục tiêu & phạm vi
- 15  2. Hạ tầng đã triển khai (Cloudflare)
- 42  3. Thiết kế đồng bộ
- 44  3.1 Máy chủ (`api-worker.js`) — bảng D1
- 50  3.2 Máy khách (`cfsync.js`)
- 58  3.3 Lỗi đã gặp & cách xử lý (để khỏi lặp lại)
- 65  4. Các nội dung đặc thù của app (để hiểu khi đọc code)
- 75  4b. Bổ sung 18–19/11/2026 (đã làm, chưa kiểm tra trên điện thoại thật)
- 104  4c. Trình duyệt đám mây cho AI (19/11/2026) — chưa thử với Cloudflare thật
- 110  4e. Lời giải trực quan (19/11/2026) — khối `<style id="vz-css">` + `<script id="vz-js">` trước `<script src="/
- 117  4e-2. Mở rộng sang các dạng bài khác (19/11/2026) — mỗi dạng mới có 1 câu làm thử (câu 1)
- 125  4f. Đọc xen kẽ Anh–Việt + tự tạo lời giải trực quan bằng AI (19/11/2026) — chưa thử trên điện thoại thật
- 135  4i. AI tìm video + khung phát nhúng (21/11/2026) — khối `<style id="vid-css">` + `<script id="vid-ext">` ngay 
- 146  5. Nhật ký công việc (theo thứ tự)
- 158  6. Việc còn dở / nên làm tiếp
- 172  7. Cách làm việc hiệu quả với file lớn
- 181  4g. Sửa / xuất / nhập lời giải trực quan (20/11) — khối `<script id="vz-edit">` + `<style id="vze-css">`
- 193  4h. Sửa lỗi bảng + chức năng “Nạp đề Unit” (21/11/2026) — khối `unit-core` (trước script chính), `UNITX` (scri
- 736  4i. Nâng cấp “Nạp đề” — thẻ Tự động (20/11/2026) — trong `<script id="unit-import">` (đoạn “NÂNG CẤP 20/11”) +
- 745  4j. Thẻ “Sửa” — chỉnh đề đã nạp bằng AI (20/11/2026) — trong `unit-import` (đoạn “SỬA BẰNG AI”)
- 751  4k. Giải 1 lượt cả Exercise + kịch bản đọc do AI viết (21/11/2026)
- 758  4l. Module tìm ảnh IMG nâng cấp (21/11/2026)
- 763  4m. Tận dụng khóa Pixabay/Unsplash + tìm VIDEO (21/11/2026) — trong khối `IMG` (đoạn “VIDEO”)
- 775  4n. Phiên 21/11/2026 (chiều) — đang làm dở, đọc mục này trước
- 779  Yêu cầu của người dùng trong phiên này (chia bước)
- 791  Bước 1 đã làm (trong `index.html`, khối `<script id="unit-import">` + `vzg-ui`)
- 799  Ghi chú vị trí cho các bước sau
- 805  Lưu ý cho người dùng
- 809  Cập nhật 21/11 sáng (bước 5–6)
- 813  Cập nhật 21/11 (thêm 3 khóa AI)
- 818  4o. Nhóm công việc kiểu Claude + ép phong cách Claude (21/11/2026) — khối `<style id="wg-css">` + `<script id=

## 7. Việc dở / chưa thử thật (tóm tắt, chi tiết ở BAN_GIAO)
- Chưa thử với **Gemini/mạng thật**: Nạp đề + Files API (tệp > 9 MB), tạo/sửa lời giải trực quan, `gemini-4-hydrogen`/`3.8-flash` id model, tìm video/ảnh, `ytplay.html`, Cloudflare Browser Rendering (nếu 404/502 thử đổi `browser-run`→`browser-rendering`), ApiNex (base URL chưa xác minh).
- Bảng "Hướng dẫn công cụ cho AI" cần chia lại mục (BAN_GIAO 4n bước 2, vị trí `AG.panel`/IIFE `TABS`); thống kê khóa chi tiết toàn bộ nhà cung cấp (bước 3) — chưa làm.
- Bảo mật: khóa Gemini/xKiro/OpenRouter/Pixabay/Unsplash **nằm trong HTML**; chỉ Netlify giấu ở Worker.
