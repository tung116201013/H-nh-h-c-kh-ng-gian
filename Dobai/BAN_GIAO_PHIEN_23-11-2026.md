# BÀN GIAO PHIÊN 22–23/11/2026 — dobai (OCR nâng cấp + dựng lại Cloudflare)

Dùng file này đầu phiên mới, kèm `index.html`, `api-worker.js`, `cfsync.js`, `ytplay.html` trong thư mục `LAM_LAI/` và `HUONG_DAN_XOA_VA_LAM_LAI_CLOUDFLARE.md`.

## 1. Dự án và cách làm việc
- dobai = web học tiếng Anh một tệp `index.html` + Cloudflare Worker (`dobai` tĩnh, `dobai-api` code) + D1. Người dùng là giáo viên, làm **chủ yếu trên điện thoại**, trả lời bằng tiếng Việt.
- Quy trình: Hydrogen (model ở AI Studio) viết khối mã; Claude ghép vào `index.html` bằng Python (`assert count==1`), thử bằng Playwright 400×800, rồi gửi tệp.
- Luật khối: IIFE, tự khai `$`, không thêm tên toàn cục (trừ dưới `LIBX`), không `stopPropagation`, `typeof e.code === 'string'`, `== null`, tiền tố riêng (`o2-`, `o2e-`), không `localStorage` trong khối OCR (dùng `LIBX._.metaGet/metaSet`), nút ≥ 40 px, đúng ở 400 px.
- Sandbox: không ra được HF/jsdelivr/unpkg/bcebos; Tesseract và AI thật **chưa thử được**, người dùng phải thử trên điện thoại. SendUserFile ≤ 30 MB.

## 2. Đã xong trong phiên
1. Tìm tài nguyên OCR (VietOCR ONNX, PaddleOCR det, Tesseract vie, từ điển âm tiết) → `OCR_NANG_CAP/`, danh mục `TAI_NGUYEN_OCR.md`. Đã xuất **từng model một tệp** trong `XUAT_MODEL/` (det, decoder, encoder 4 mảnh, json, 3 bản Tesseract, từ điển) và gửi cho người dùng.
2. Ghép OCR v2.1 của Hydrogen (4 khối + vá Nạp đề) + thêm OCR cũ A4 làm tier `old` + thẻ trang chủ `#o2-entry`.
3. Màn **📷 Đọc chữ** (`ocr-easy`): 3 bước, chế độ Tự chọn / OCR cũ / Nhanh+ / Chính xác (VietOCR ~100 MB) / **Chữ viết tay (AI)** (chọn model AI, lọc 👁, nút thử) / so sánh nhiều chế độ / tùy chọn đầy đủ (ngôn ngữ, trang PDF, xoay, tiền xử lý, tự sửa chính tả). Đã bỏ link "nâng cao" cũ.
4. **Thêm trong phiên này (đã thử bằng mô phỏng mạng, 0 lỗi JS):**
   - Nhà cung cấp **Xingchi (GPT)** `xc` trong `EXP` (2 khóa xoay vòng `EXK.xc`, tự tải `/models` qua `xcLoad`), regex nhóm nhà cung cấp đã thêm `xc`.
   - Chế độ **OCR trực tuyến laychu** `ly` trong `ocr-easy` (`lyRun`, POST `<PX>/ly/chat/completions`, ảnh→data URL, PDF→file part, xác nhận trước khi gửi, lỗi 401/402/413/429 có chữ tiếng Việt).
   - `api-worker.js`: bảng `PX` có thêm `xc: https://api.xingchiapi.com/v1` và `ly: https://ocr.laychu.com/v1`.
5. Đổi tên miền: `tung1231232t6.workers.dev` → **`bh13.workers.dev`** trong `index.html` (API proxy `/px`, `/nl/v1`, ytplay, xKiro `cool-feather-0304`, `gonka`, `exa`) và `cfsync.js` (`API_BASE`). Không còn chuỗi `tung1231232t6.workers.dev` nào trong `index.html`. Email nhà sáng lập `tung1231232t6@gmail.com` giữ nguyên (đó là Gmail).
6. Viết `HUONG_DAN_XOA_VA_LAM_LAI_CLOUDFLARE.md` (xóa hết, dựng lại, Google OAuth, OCR model, sự cố).

## 3. Trạng thái Cloudflare tại thời điểm bàn giao (tài khoản, subdomain `bh13`)
Có 8 Worker: `dobai`, `dobai-api`, `index`, `appdotienganh`, `exa`, `proud-sun-555a`, `cool-feather-0304`, `gonka`.
- Người dùng **định xóa**: `dobai`, `dobai-api`, `index`, `appdotienganh`, và D1 `dobai-db` (không sao lưu dữ liệu, đã đồng ý bỏ).
- **Giữ**: `exa`, `gonka`, `cool-feather-0304` (index đã trỏ tới). `proud-sun-555a`: chưa rõ, người dùng quyết.
- **Chưa biết** người dùng đã xóa chưa. Việc kế tiếp theo hướng dẫn: Phần 2 (xóa) → 4 (tạo D1 `dobai-db`) → 5 (tạo `dobai-api`, dán `api-worker.js`, gắn binding **`DB`**, thêm biến) → 6 (Google Cloud) → 7 (tạo `dobai`, up `index.html`, `cfsync.js`, `ytplay.html`) → 8 (OCR model, tùy chọn).
- Biến `dobai-api` cần: `SESSION_SECRET` (Secret), `GOOGLE_CLIENT_ID`, `SITE_ORIGIN=https://dobai.bh13.workers.dev` (không có `/` cuối); tùy chọn `ALLOWED_EMAILS`, `QUOTA_MB`, `NL_UPSTREAM`, `NL_KEY`, `CF_ACCOUNT_ID` (`25d0b5ae62f648b3e6ed55491e2d657c`), `CF_BR_TOKEN`, `BR_DAY_SEC`, `POLLI_KEYS`. **Không** đặt `DEV_LOGIN`.
- Google Cloud phải thêm `https://dobai.bh13.workers.dev` vào Authorized JavaScript origins, nếu không đăng nhập lỗi.

## 4. Việc còn dở / nên làm
1. **Người dùng chưa xong dựng lại Cloudflare** → hỗ trợ từng bước, chụp màn hình khi kẹt.
2. **Tệp mô hình OCR "Chuẩn"**: cần cấu trúc `ocr/vietocr/…` và `ocr/am_tiet_vi.txt` cạnh `index.html`. Điện thoại khó up cả thư mục. Nếu người dùng chỉ có điện thoại: sửa web đọc mô hình theo **tên phẳng** (đổi `DEF_MODEL_BASE`/tên tệp trong khối `ocr-eng`) rồi giao lại.
3. Chưa thử thật: Tesseract (nhánh `old`/`fast`), tier AI viết tay với model thật, Xingchi (chưa rõ tương thích OpenAI đầy đủ, danh sách model đoán trước `gpt-4o`, `gpt-5`…), laychu (chưa biết CORS/độ trễ thật; đi qua Worker `/px/ly`). Người dùng sẽ thử trên điện thoại.
4. **Bảo mật:** khóa Xingchi (2), laychu (1) và nhiều khóa khác nằm **trong `index.html`** (ai xem mã nguồn cũng thấy). Đề xuất đã nói với người dùng: chuyển sang Secret ở Worker (xây route như cổng Netlify). Người dùng chưa quyết. Khóa đã lộ trong chat, nên khuyên đổi.
5. Giấy phép từ điển `am_tiet_vi.txt` là GPL-2.0 (nguồn Viet74K): chưa quyết nhúng vào index; hiện chỉ để ở `ocr/`.
6. Handwriting tốt nhất vẫn là AI nhìn ảnh; không có model viết tay nhỏ chạy trong trình duyệt (xem `TAI_NGUYEN_OCR.md` mục B).
7. Hydrogen H2 (xuất VietOCR handwritten sang ONNX) để sau, chưa làm.

## 5. Vị trí tệp (scratchpad phiên này, có thể mất; tệp đã gửi người dùng trong chat)
`…/scratchpad/LAM_LAI/{index.html, api-worker.js, cfsync.js, ytplay.html, HUONG_DAN_XOA_VA_LAM_LAI_CLOUDFLARE.md, BAN_GIAO_PHIEN_23-11-2026.md}` · `…/scratchpad/XUAT_MODEL/` · `…/scratchpad/OCR_NANG_CAP/` · khối nguồn `…/scratchpad/ocr-easy-cur.html`, `patch_xc.py` (script vá Xingchi/laychu), test `t_xc.js`.

## 6. Mẹo kỹ thuật cho phiên sau
- Khối `ocr-easy`: `MODES`, `runModes` (nhánh `ly` trước `x.ui.setTier`), `go()`, `job()` (cho lệnh web:ocr của AI), `LY` = {model, fmt, key}, `savePrefs/loadPrefs` qua `LIBX._.metaSet('ocr2_easy')`.
- Hộp thoại xác nhận của app là `window.dbConfirm`; test tự động đặt `window.__dbAutoYes = true`.
- Cổng `/px/<2 chữ cái>/…` của Worker chỉ cho `chat/completions` và `models`, chỉ chuyển `content-type`, `accept`, `authorization`.
- Thêm nhà cung cấp OpenAI-compatible mới: thêm vào `EXP`, `EX_OLD`, `EXK` (nếu nhiều khóa), `PX` ở Worker, và thêm mã 2 chữ cái vào các regex `gq|co|xc|pl` (14 chỗ trong `index.html`).
- Chạy test: khởi động `python3 -m http.server`/mở `file://`, Playwright chặn mạng và mô phỏng `/px/...`; nghe `pageerror`.
