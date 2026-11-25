# HƯỚNG DẪN XÓA HẾT BẢN CŨ VÀ DỰNG LẠI DOBAI TỪ ĐẦU TRÊN CLOUDFLARE
Tên miền mới: **`bh13.workers.dev`** · Làm trên điện thoại (Chrome) · cập nhật 23/11/2026 (bản có Xingchi GPT + OCR laychu)

Sau khi xong, bạn có:
- Web: `https://dobai.bh13.workers.dev`
- API: `https://dobai-api.bh13.workers.dev`
- Cơ sở dữ liệu D1 tên `dobai-db`, gắn vào dobai-api với tên binding `DB`

> **Nếu chỉ nhớ 3 điều:**
> 1. Xóa Worker/D1 là **mất vĩnh viễn** dữ liệu trên đám mây. Nếu còn muốn giữ chat, tiến độ, file thì làm **Phần 1 (sao lưu)** trước.
> 2. Tên miền mới = **nơi lưu trữ trình duyệt mới và trống**. Dữ liệu trong trình duyệt ở tên miền cũ **không tự sang**. Cách đưa sang là sao lưu rồi nhập (Phần 1 và Phần 9).
> 3. Google đăng nhập sẽ **báo lỗi** cho tới khi bạn thêm tên miền mới vào Google Cloud (**Phần 6**).

---

## PHẦN 0 — Chuẩn bị (5 phút)

### 0.1 Tệp cần có (gửi kèm tin nhắn)
| Tệp | Đưa vào đâu | Ghi chú |
|---|---|---|
| `api-worker.js` | Worker **dobai-api** (dán code) | **Bản mới**: có thêm cổng `/px/xc` (Xingchi) và `/px/ly` (OCR laychu). Địa chỉ web nằm ở biến `SITE_ORIGIN` |
| `index.html` | Worker **dobai** (tải lên) | **Bản mới**: đã sửa sẵn địa chỉ sang `bh13.workers.dev`, thêm tab **Xingchi (GPT)** và chế độ **OCR laychu** |
| `cfsync.js` | Worker **dobai** (tải lên) | **Đã sửa sẵn** `API_BASE` = `https://dobai-api.bh13.workers.dev` |
| `ytplay.html` | Worker **dobai** (tải lên) | Giữ nguyên |
| Thư mục `ocr/` (mô hình OCR) | Worker **dobai** | **Tùy chọn**, làm sau cùng (Phần 8) |

Tên tệp phải đúng `index.html`, `cfsync.js`, `ytplay.html`, `api-worker.js`. Nếu điện thoại tải về thành `index (1).html` thì đổi tên lại trước khi up.

### 0.2 Ghi lại các giá trị cần dùng lại
Mở Ghi chú trên điện thoại, chuẩn bị chỗ dán:
- **Google Client ID**: dạng `xxxx.apps.googleusercontent.com`. Có trong Google Cloud (xem Phần 6) hoặc trong biến `GOOGLE_CLIENT_ID` của dobai-api cũ.
- **Các biến của dobai-api cũ**: vào dobai-api → Settings → Variables and Secrets, chép lại các **Text** (xem Phần 1.3). Các **Secret** thì Cloudflare giấu giá trị. Bạn phải lấy lại từ nơi gốc (`netlify-secret.txt`, token trình duyệt…) hoặc tạo mới.

---

## PHẦN 1 — Sao lưu dữ liệu cũ (bỏ qua nếu không cần giữ gì)

### 1.1 Sao lưu từ web cũ
1. Mở web cũ (tên miền cũ vẫn còn chạy), đăng nhập.
2. ☁ **Tài khoản** → mục **Sao lưu** → **Tải bản sao lưu**. Tệp `.json` sẽ về máy. Chờ báo "Đã tạo bản sao lưu (N mục)".
3. Kiểm tra tệp đã nằm trong ứng dụng Tệp (dung lượng không bằng 0).
4. Dữ liệu chỉ nằm trong trình duyệt (chưa đăng nhập, chưa đồng bộ) cũng nên bấm **Đồng bộ** xong rồi hãy sao lưu.

### 1.2 Lưu riêng các thứ nằm trên Cloudflare
- Không có file nào bạn tự upload mà không còn bản gốc? Nếu có, nhờ Claude chuyển hoặc tải về trước.
- Bản `api-worker.js` và `index.html` gần nhất đã có trong chat này, không cần lưu từ Cloudflare.

### 1.3 Chép lại các biến của dobai-api cũ
Workers & Pages → **dobai-api** → **Settings** → **Variables and Secrets**. Chụp màn hình, ghi lại tên các biến và giá trị **Text**. Các biến có thể có:
`SESSION_SECRET` (secret) · `GOOGLE_CLIENT_ID` · `ALLOWED_EMAILS` · `SITE_ORIGIN` · `QUOTA_MB` · `NL_UPSTREAM` · `NL_KEY` (secret) · `CF_ACCOUNT_ID` · `CF_BR_TOKEN` (secret) · `BR_DAY_SEC` · `POLLI_KEYS` (secret) · `FOUNDER_EMAIL`.

---

## PHẦN 2 — Xóa bản cũ

Làm theo thứ tự này (xóa Worker trước, rồi mới xóa D1, vì D1 đang gắn vào Worker).

### 2.1 Xác định cái nào cần xóa
Danh sách trong tài khoản của bạn có 8 Worker. **Xóa 4 cái**: `dobai`, `dobai-api`, `index`, `appdotienganh`. **Giữ**: `exa`, `gonka`, `cool-feather-0304`. `proud-sun-555a`: chưa rõ, tạm để.
| Worker | Làm gì |
|---|---|
| `dobai` | **Xóa** (sẽ tạo lại) |
| `dobai-api` | **Xóa** (sẽ tạo lại) |
| `index` | Là bản thử cũ. **Xóa** nếu không dùng nữa |
| `appdotienganh` | Là bản app rất cũ (16 ngày). **Xóa** nếu không dùng nữa |
Kéo xuống cuối danh sách xem còn Worker nào khác. Nếu có tên lạ như `cool-feather-0304`, `gonka`, `exa`… thì xem **Phần 10**, đừng xóa vội.

### 2.2 Xóa từng Worker
1. Dashboard → **Workers & Pages**.
2. Bấm vào tên Worker (ví dụ `index`).
3. **Settings** (Cài đặt) → kéo xuống cuối → mục **Delete** (Xóa Worker) → gõ lại tên để xác nhận → **Delete**.
4. Lặp lại cho `appdotienganh`, `dobai-api`, `dobai`.
> Hoặc ở danh sách: bấm **⋯** ở thẻ Worker → **Delete**. Giao diện mỗi lúc một khác, tìm chữ Delete.

### 2.3 Xóa cơ sở dữ liệu D1 cũ
1. Menu bên trái (bấm biểu tượng ☰) → **Storage & Databases** (Lưu trữ & Cơ sở dữ liệu) → **D1 SQL Database**.
2. Bấm `dobai-db` → **Settings** → **Delete database** → xác nhận.
3. Nếu có D1 khác không dùng nữa thì xóa luôn.
> Nếu có báo "database đang được dùng bởi Worker" thì Worker chưa xóa hết. Quay lại 2.2.

### 2.4 Dọn các thứ phụ (tùy chọn)
- **API token cũ** của trình duyệt AI: Hồ sơ (icon người) → **My Profile** → **API Tokens** → token `dobai-browser` → **Roll** hoặc **Delete** nếu bạn định tạo lại (Phần 5.4).
- Trong ứng dụng Chrome: xóa dữ liệu trang của tên miền cũ (không bắt buộc).

---

## PHẦN 3 — Kiểm tra tên miền workers.dev của tài khoản

Vì bạn mới đổi tên miền nên kiểm tra kỹ để khỏi dựng xong mà không vào được:
1. Workers & Pages → **tổng quan** → ô bên phải (hoặc **Account Home → Workers & Pages → Overview**) ghi **Your subdomain** = `bh13` (địa chỉ `https://<tên>.bh13.workers.dev`).
2. Nếu bạn muốn đổi `bh13` thì làm **ngay bây giờ**. Sau khi đổi, các địa chỉ trong `index.html` và `cfsync.js` phải sửa lại (nhờ Claude).
3. Ghi lại **Account ID** (cột bên phải trang tổng quan Workers & Pages). Dùng cho `CF_ACCOUNT_ID` (Phần 5.4).

---

## PHẦN 4 — Tạo cơ sở dữ liệu D1

1. **Storage & Databases** → **D1 SQL Database** → **Create database** (Tạo).
2. Tên: **`dobai-db`** (đúng tên, dễ nhớ) → vị trí để mặc định → **Create**.
3. **Không cần tạo bảng.** Mã Worker tự tạo bảng ở lần có người đăng nhập đầu tiên.

---

## PHẦN 5 — Tạo Worker API `dobai-api`

### 5.1 Tạo Worker
1. **Workers & Pages** → **Create** (Tạo ứng dụng) → **Create Worker** (hoặc **Start with Hello World!**).
2. Tên: **`dobai-api`** (đúng, thường, gạch ngang) → **Deploy**.
3. Chờ xong, bấm **Edit code**.

### 5.2 Dán mã
1. Trong trình soạn code: bấm vào khung → **Chọn tất cả** → **xóa hết**.
2. Mở `api-worker.js` → Chọn tất cả → Sao chép → quay lại → **Dán**.
3. **Deploy** (Save and deploy). Chờ báo thành công.
4. Mở `https://dobai-api.bh13.workers.dev`. Thấy **"API đang chạy."** là được.
   - Thấy "Chưa cấu hình DB" hoặc lỗi 500 là bình thường lúc này. Chưa gắn D1 (bước 5.3).
   - Nếu mở không được: vào Worker → **Settings → Domains & Routes** → bật **workers.dev** (Enable).

### 5.3 Gắn D1 vào Worker (bắt buộc)
1. dobai-api → **Settings** → **Bindings** → **Add** → **D1 database**.
2. **Variable name: `DB`** (viết hoa, đúng như vậy) → chọn database **`dobai-db`** → **Deploy/Save**.

### 5.4 Thêm biến môi trường
dobai-api → **Settings** → **Variables and Secrets** → **Add** (thêm lần lượt). Mỗi lần thêm xong bấm **Deploy** ở cuối.

| Tên | Loại | Giá trị | Bắt buộc? |
|---|---|---|---|
| `SESSION_SECRET` | **Secret** | Chuỗi ngẫu nhiên dài (≥ 40 ký tự). Gõ lung tung chữ + số, hoặc dùng trình tạo mật khẩu của điện thoại | **Có** |
| `GOOGLE_CLIENT_ID` | Text | Client ID của Google (Phần 6) | **Có** |
| `SITE_ORIGIN` | Text | `https://dobai.bh13.workers.dev` (**không có dấu `/` ở cuối**) | **Có** |
| `ALLOWED_EMAILS` | Text | Danh sách email được đăng nhập, ngăn bằng dấu phẩy. **Bỏ trống/không tạo** = ai cũng đăng nhập được | Tùy |
| `QUOTA_MB` | Text | `200` (hạn mức mỗi người, MB) | Tùy |
| `NL_UPSTREAM` | Text | Địa chỉ trong `netlify-secret.txt` | Chỉ nếu dùng Netlify |
| `NL_KEY` | **Secret** | Khóa trong `netlify-secret.txt`. Nên tạo khóa mới ở Netlify (khóa cũ từng lộ) | Chỉ nếu dùng Netlify |
| `CF_ACCOUNT_ID` | Text | Account ID (Phần 3) | Chỉ nếu dùng trình duyệt AI |
| `CF_BR_TOKEN` | **Secret** | Token tạo ở bước dưới | Chỉ nếu dùng trình duyệt AI |
| `BR_DAY_SEC` | Text | `540` | Tùy |
| `POLLI_KEYS` | **Secret** | Các khóa `sk_...` của Pollinations, cách nhau dấu phẩy | Chỉ nếu dùng |
| `FOUNDER_EMAIL` | Text | Mặc định là `tung1231232t6@gmail.com` (đã nằm trong mã). **Chỉ thêm nếu muốn đổi** | Tùy |
| `DEV_LOGIN` | — | **KHÔNG tạo.** Chỉ dùng khi chạy thử trên máy | Không |

**Tạo token trình duyệt AI (nếu cần):**
1. Hồ sơ (góc phải trên) → **My Profile** → **API Tokens** → **Create Token** → **Create Custom Token** → **Get started**.
2. Tên `dobai-browser`. Quyền: **Account** → **Browser Rendering** → **Edit**. → **Continue to summary** → **Create Token**.
3. **Sao chép token ngay** (chỉ hiện một lần) và dán vào `CF_BR_TOKEN`.

### 5.5 Kiểm tra API
- Mở `https://dobai-api.bh13.workers.dev/api/config` → thấy `{"clientId":"…apps.googleusercontent.com"}`. Đúng là xong.
- Không thấy Client ID → `GOOGLE_CLIENT_ID` chưa lưu/chưa Deploy.

---

## PHẦN 6 — Google Cloud: cho phép tên miền mới đăng nhập (**dễ quên nhất**)

Không làm phần này, đăng nhập Google sẽ báo `origin_mismatch` hoặc nút không hiện.
1. Mở https://console.cloud.google.com → chọn đúng dự án đang chứa OAuth client.
2. **APIs & Services** → **Credentials** → bấm tên **OAuth 2.0 Client ID** loại *Web application*.
3. Mục **Authorized JavaScript origins** → **Add URI** → dán đúng:
   `https://dobai.bh13.workers.dev`
   (không có `/` ở cuối, không có `www`). Có thể **giữ** tên miền cũ hoặc xóa.
4. **Save**. Chờ vài phút (đôi khi tới vài giờ) rồi thử lại.
5. **OAuth consent screen** (Màn hình đồng ý): nếu đang ở chế độ **Testing**, vào **Audience/Test users** thêm email của bạn (và email người sẽ dùng). Email không có trong danh sách sẽ báo `access_denied`.
6. Không cần Client Secret (thiết kế hiện tại không dùng). Nếu secret từng lộ trong chat thì xóa/tạo lại để an toàn.
7. Nếu bạn tạo **client mới**, chép Client ID mới vào biến `GOOGLE_CLIENT_ID` (Phần 5.4) rồi Deploy lại.

---

## PHẦN 7 — Tạo Worker web `dobai` (tệp tĩnh)

### 7.1 Tạo và tải tệp lên
1. **Workers & Pages** → **Create** → chọn **Upload your static files** (tải tệp tĩnh), không chọn "Hello World".
   - Nếu chỉ thấy "Pages": chọn **Pages → Upload assets** và đặt tên dự án `dobai`. Địa chỉ sẽ là `dobai.pages.dev`, **khác** `workers.dev`. Khi đó báo lại, cần sửa địa chỉ trong 2 tệp.
2. Tên Worker: **`dobai`** (đúng).
3. Chọn **cả 3 tệp**: `index.html`, `cfsync.js`, `ytplay.html` (có thể phải chọn lần lượt, hoặc chọn nhiều tệp một lúc ở trình chọn tệp).
4. **Deploy** → chờ báo thành công.
5. Mở `https://dobai.bh13.workers.dev`. Nếu không vào được: Worker `dobai` → **Settings → Domains & Routes** → bật **workers.dev**.

### 7.2 Lưu ý khi cập nhật sau này
- Sửa `index.html`/`cfsync.js`: vào Worker `dobai` → **Deployments / Upload** → tải lên **lại cả bộ tệp** cần thiết (nên chọn đủ 3 tệp, và thư mục `ocr/` nếu đã dùng OCR). Một số giao diện **thay hết** thư mục cũ bằng bộ mới, thiếu tệp nào là mất tệp đó.
- Tải xong, nếu vẫn thấy giao diện cũ: Chrome → ⋮ → Cài đặt → Quyền riêng tư → Xóa dữ liệu duyệt web → chỉ chọn **Ảnh và tệp được lưu trong bộ nhớ đệm** (**KHÔNG** chọn Cookie/dữ liệu trang).

---

## PHẦN 8 — (Tùy chọn) Mô hình OCR "Chuẩn" (~100 MB)

Làm **sau cùng**, khi web và đăng nhập đã chạy ổn. Bỏ qua phần này thì mức OCR "Nhanh", "OCR cũ A4" và "AI" vẫn dùng được; chỉ mức "Chuẩn" (VietOCR) báo "Chưa cài mô hình".

Cấu trúc thư mục phải đúng như sau, nằm **cạnh** `index.html`:
```
ocr/
  am_tiet_vi.txt
  vietocr/
    det.onnx
    vietocr_decoder.onnx
    vietocr.json
    vietocr_encoder.onnx.part00
    vietocr_encoder.onnx.part01
    vietocr_encoder.onnx.part02
    vietocr_encoder.onnx.part03
    SHA256SUMS
```
Mỗi tệp phải ≤ 25 MiB (encoder đã được chia 4 mảnh vì vậy). Giữ nguyên tên tệp. Tải các tệp từ tin nhắn "xuất model" trước: bỏ tiền tố số và `3_VietOCR_`, ví dụ `1_det_PaddleOCR_tach-dong.onnx` → `det.onnx`, `3_VietOCR_encoder.onnx.part00` → `vietocr_encoder.onnx.part00`, `2_VietOCR_decoder.onnx` → `vietocr_decoder.onnx`, `4_vietocr_cau-hinh.json` → `vietocr.json`, `8_am_tiet_vi_tu-dien-sua-dau.txt` → `am_tiet_vi.txt`.

**Khó khăn trên điện thoại:** trình chọn tệp của điện thoại thường **không tải được cả thư mục**, nên bạn khó tạo cấu trúc `ocr/vietocr/`. Cách làm gọn nhất là dùng **máy tính** để kéo thả cả thư mục chứa `index.html`, `cfsync.js`, `ytplay.html`, `ocr/`. Nếu chỉ có điện thoại, báo Claude để sửa web đọc mô hình theo tên phẳng (không cần thư mục).

Sau khi up: mở web → công cụ **OCR** → **Cài mô hình chính xác** (cần Wi-Fi, chỉ một lần). Thanh tải chạy đủ và báo "đã kiểm SHA-256" là xong.

---

## PHẦN 9 — Kiểm tra toàn bộ và nhập lại dữ liệu

### 9.1 Kiểm tra theo thứ tự
- [ ] `https://dobai-api.bh13.workers.dev` → "API đang chạy."
- [ ] `https://dobai-api.bh13.workers.dev/api/config` → có `clientId`
- [ ] `https://dobai.bh13.workers.dev` → mở được web, không trang trắng
- [ ] ☁ **Tài khoản** → **Đăng nhập Google** bằng `tung1231232t6@gmail.com` → thấy huy hiệu 👑 **Nhà sáng lập** và nút **🛡️ Mở trang quản trị**
- [ ] Thoát rồi đăng nhập lại: dữ liệu vẫn còn (đã đồng bộ)
- [ ] Chat AI hoạt động (Gemini…)
- [ ] Chọn model Netlify chạy được (nhà sáng lập)
- [ ] Tìm video, bấm thẻ video phát được (`ytplay.html` chạy trên địa chỉ mới)
- [ ] Công cụ OCR: ảnh/PDF → văn bản ra chữ (thử chế độ **OCR cũ (A4)** trước, không cần mạng thêm)
- [ ] Bộ chọn model trong chat có tab **Xingchi (GPT)**; mở tab thấy danh sách model, chọn một model và hỏi thử
- [ ] 📷 Đọc chữ → **🛰️ OCR trực tuyến (laychu)** → chọn ảnh → đọc ra chữ (nhớ đã dán `api-worker.js` mới)

### 9.2 Nhập dữ liệu từ bản sao lưu (Phần 1)
1. Đăng nhập web mới.
2. ☁ **Tài khoản** → **Sao lưu** → **Nhập từ sao lưu** → chọn tệp `.json` → xác nhận. Các mục trùng bị ghi đè trên máy này.
3. Chờ "Đang đồng bộ…" xong để dữ liệu lên D1 mới.

---

## PHẦN 10 — Các Worker lẻ (xKiro, Gonka, Exa): GIỮ LẠI, không xóa

Tài khoản của bạn đã có sẵn 3 Worker proxy này ở tên miền mới: `cool-feather-0304` (xKiro), `gonka` (Gonka), `exa` (tìm kiếm Exa). Bản `index.html` mới **đã sửa địa chỉ trỏ tới chúng** (`…bh13.workers.dev`), nên bạn chỉ cần **không xóa**.
- `proud-sun-555a`: tên ngẫu nhiên, mình không biết dùng làm gì. Mở nó xem code/ngày tạo; nếu không nhận ra thì có thể xóa, còn không chắc thì cứ để.

---

## PHẦN 11 — Xingchi (GPT) và OCR laychu (đã có sẵn trong bản mới)
- Bản `index.html` và `api-worker.js` trong bộ này **đã gồm** hai nhà cung cấp mới. **Phải dán lại `api-worker.js`** vào dobai-api (Phần 5.2) để cổng `/px/xc` và `/px/ly` hoạt động. Không cần thêm biến môi trường.
- **Xingchi (GPT):** bộ chọn model trong chat có thêm tab **Xingchi (GPT)** (2 khóa, tự đổi khóa khi hết hạn mức). Danh sách model tự tải khi bạn mở tab. Mô hình nào không có thì bấm ➕ nhập id.
- **OCR laychu:** mở **📷 Đọc chữ** → mục 2 → **🛰️ OCR trực tuyến (laychu)**. Chọn Chính xác/Nhanh và văn bản/Markdown. Gửi PDF được (đọc mọi trang, tối đa 30 MB). Có hộp xác nhận trước khi gửi tệp ra ngoài. Tài khoản chưa nạp tiền bị giới hạn 100 ảnh/ngày.
- Cả hai khóa nằm trong `index.html` như các khóa khác, nên **ai xem mã nguồn cũng thấy**. Nên đổi khóa nếu có người khác dùng web.

---

## SỰ CỐ THƯỜNG GẶP
| Hiện tượng | Cách xử lý |
|---|---|
| Google báo `origin_mismatch` / `redirect_uri_mismatch` | Chưa thêm `https://dobai.bh13.workers.dev` vào **Authorized JavaScript origins** (Phần 6), hoặc chưa chờ đủ lâu |
| Google báo `access_denied` | Thêm email vào **Test users** (Phần 6.5) |
| Không có nút đăng nhập / `/api/config` lỗi | `GOOGLE_CLIENT_ID` chưa có, hoặc chưa Deploy lại sau khi thêm biến |
| Đăng nhập xong báo lỗi đồng bộ / CORS | `SITE_ORIGIN` sai. Phải đúng `https://dobai.bh13.workers.dev`, **không có `/` ở cuối** |
| Lỗi liên quan `DB` / `no such table` | Chưa gắn D1 với tên binding **`DB`** (Phần 5.3) |
| `Chưa cấu hình SESSION_SECRET` | Thêm lại `SESSION_SECRET` (dạng Secret) rồi Deploy |
| Người khác đăng nhập báo không được phép | Còn biến `ALLOWED_EMAILS` → xóa hoặc thêm email họ |
| `window is not defined` ở Worker API | Dán nhầm `cfsync.js` vào dobai-api. Chỉ dán `api-worker.js` |
| Trang trắng sau khi up | Tên tệp phải đúng `index.html`. Tải lại tệp rồi up lại |
| Vẫn thấy giao diện cũ | Xóa **bộ nhớ đệm** (Phần 7.2), hoặc mở tab ẩn danh |
| Web vẫn gọi tới địa chỉ cũ | Bạn up nhầm `index.html`/`cfsync.js` cũ. Dùng bản trong bộ này |
| Netlify báo 503 | Thiếu `NL_UPSTREAM`/`NL_KEY` |
| Netlify báo 403 | Chưa đủ hạng Pro hoặc bị chặn tính năng |
| Trình duyệt AI báo 503 | Thiếu `CF_ACCOUNT_ID`/`CF_BR_TOKEN` |
| Trình duyệt AI báo 502 | Token sai quyền (phải *Browser Rendering – Edit*) hoặc Account ID sai |
| Tab Xingchi trống/báo lỗi 404 | Chưa dán `api-worker.js` **mới** vào dobai-api (thiếu cổng `/px/xc`). Dán lại rồi Deploy |
| Xingchi báo 401/403/429 | Khóa hết hạn mức hoặc bị từ chối (web tự đổi sang khóa thứ hai). Trạm miễn phí nên có lúc quá tải |
| OCR laychu báo 404 "Nhà cung cấp không được hỗ trợ" | Chưa dán `api-worker.js` mới (thiếu cổng `/px/ly`) |
| OCR laychu báo 402 | Hết số dư khóa laychu, nạp thêm hoặc dùng chế độ khác |
| OCR laychu báo hết 100 ảnh/ngày | Tài khoản laychu chưa nạp tiền. Đặt lại lúc 00:00 giờ Việt Nam |
| OCR báo "Chưa cài mô hình OCR" | Cấu trúc thư mục `ocr/vietocr/` sai tên/thiếu tệp (Phần 8) |

Nếu hỏng ở bước nào, chụp màn hình gửi Claude kèm tên bước (ví dụ "5.3" hoặc "Phần 6").

---

## BẢO MẬT (nên làm)
- `index.html` vẫn chứa nhiều khóa API (Gemini, xKiro, OpenRouter, Pixabay, Unsplash, Xingchi, OCR laychu…). Các khóa Xingchi và laychu đã nằm trong chat nên cân nhắc đổi khóa sau khi thử xong. **Ai mở mã nguồn cũng thấy.** Chỉ Netlify (và Pollinations) được giấu ở Worker. Nên đổi sang khóa mới hoặc giới hạn khóa theo tên miền khi có thể.
- Khóa Netlify từng lộ: tạo khóa mới và đặt vào `NL_KEY`.
- Xóa `netlify-secret.txt` khỏi điện thoại/chat sau khi dùng xong.
- Tệp sao lưu `.json` chứa dữ liệu cá nhân (chat…); đừng gửi cho người khác.
