# HƯỚNG DẪN ĐƯA BẢN MỚI NHẤT LÊN CLOUDFLARE (làm trên điện thoại)

Bản này gom **tất cả** thay đổi từ trước đến nay (chưa có gì được up), gồm cả phần mới 19/11: danh sách model dùng chung, chia hạn mức theo dữ liệu mọi tài khoản, đẩy việc khó sang AI mạnh hơn, AI tạo skill. **Không cần thêm biến mới** cho phần này; bảng D1 mới tự tạo. Làm lần lượt **A → H**. Mỗi bước xong mới sang bước sau.

## Danh sách file (gửi trong chat)
| File | Đưa vào đâu |
|---|---|
| `api-worker.js` | Worker **dobai-api** (dán code) |
| `index.html` | Worker **dobai** (tải file lên) |
| `cfsync.js` | Worker **dobai** (tải file lên, cùng lúc với index.html) |
| `ytplay.html` | Worker **dobai** (tải lên cùng index.html; để YouTube phát được khi mở web từ `content://`) |
| `netlify-secret.txt` | Chỉ để **đọc 2 giá trị** ở bước C, dùng xong **xóa** |
| `BAN_GIAO.md`, `SHARED_API.md`, `mkmap.py` | Tài liệu cho lần làm việc sau, không up lên Cloudflare |

> Tên file phải đúng `index.html`, `cfsync.js`. Nếu điện thoại tải về thành `index (1).html` thì đổi tên lại trước khi up.

---

## A. Tải file về điện thoại
Trong chat, bấm từng thẻ file → **Tải xuống**. Mở ứng dụng Tệp kiểm tra tên file đúng.

## B. Lấy 2 thông tin của Cloudflare (cho trình duyệt AI)
1. **Account ID:** https://dash.cloudflare.com → **Workers & Pages** → trang tổng quan, cột bên phải có *Account ID* → sao chép, dán tạm vào Ghi chú.
2. **API token:** bấm biểu tượng tài khoản (góc phải trên) → **My Profile** → **API Tokens** → **Create Token** → *Create Custom Token* → **Get started**.
   - Token name: `dobai-browser`
   - Permissions: **Account** → **Browser Rendering** → **Edit**
   - **Continue to summary** → **Create Token** → **sao chép token ngay** (chỉ hiện 1 lần), dán tạm vào Ghi chú.

## C. Thêm biến cho Worker `dobai-api`
Workers & Pages → **dobai-api** → **Settings** → **Variables and Secrets** → **Add**. Thêm lần lượt:

| Tên | Loại | Giá trị |
|---|---|---|
| `NL_UPSTREAM` | Text | địa chỉ trong `netlify-secret.txt` |
| `NL_KEY` | **Secret** | khóa trong `netlify-secret.txt` |
| `CF_ACCOUNT_ID` | Text | Account ID (bước B.1) |
| `CF_BR_TOKEN` | **Secret** | token (bước B.2) |
| `BR_DAY_SEC` *(tùy chọn)* | Text | `540` (số giây trình duyệt tối đa mỗi ngày cho cả hệ thống) |
| `FOUNDER_EMAIL` *(tùy chọn)* | Text | mặc định đã là tung1231232t6@gmail.com, không cần thêm |

Các biến cũ (`SESSION_SECRET`, `GOOGLE_CLIENT_ID`, `ALLOWED_EMAILS`, `SITE_ORIGIN`, `QUOTA_MB`) và binding `DB` **giữ nguyên**.
- **Để người khác đăng nhập được:** xóa biến `ALLOWED_EMAILS` (hoặc thêm email của họ vào, ngăn cách bằng dấu phẩy). Email nhà sáng lập luôn vào được.
- Bấm **Deploy** nếu có nút.
- Xong thì **xóa `netlify-secret.txt`** khỏi điện thoại và chat.

## D. Cập nhật code Worker API (`dobai-api`)
1. **dobai-api** → **Edit code**.
2. Bấm vào khung code → *Chọn tất cả* → **xóa hết**.
3. Mở `api-worker.js` → *Chọn tất cả* → *Sao chép* → quay lại Cloudflare → **Dán**.
4. **Deploy** (*Save and deploy*). Chờ báo thành công.
5. Kiểm tra: mở `https://dobai-api.tung1231232t6.workers.dev` → thấy **"API đang chạy."**.
(Dữ liệu cũ giữ nguyên; bảng mới tự tạo lần đầu có người đăng nhập.)

## E. Cập nhật web (`dobai`)
1. Workers & Pages → **dobai** → mục tải lên (**Create deployment / Upload**, hoặc ⋯ → *Upload assets*).
2. Chọn **cả 3 file**: `index.html`, `cfsync.js` và `ytplay.html` (nếu chỉ chọn được từng file thì lặp lại, hoặc nén `.zip` nếu có chỗ nhận zip).
3. **Deploy**, chờ báo thành công.

## F. Mở web và kiểm tra
1. Mở `https://dobai.tung1231232t6.workers.dev`.
2. Nếu vẫn thấy giao diện cũ: Chrome → ⋮ → Cài đặt → Quyền riêng tư → *Xóa dữ liệu duyệt web* → chỉ chọn *Ảnh và tệp được lưu trong bộ nhớ đệm* (**KHÔNG** chọn Cookie/dữ liệu trang web, kẻo mất dữ liệu chưa đồng bộ) → Xóa.
3. Đăng nhập Google bằng **tung1231232t6@gmail.com** (mục ☁ Tài khoản). Chờ đồng bộ xong.

## G. Danh sách kiểm tra (tick từng mục)
**Cũ**
- [ ] Chat AI có nút **🎭** (tùy chỉnh trợ lý), mỗi câu trả lời có nút Đọc to.
- [ ] Khung token gọn; bảng suy nghĩ có *Gốc | Tiếng Việt*; tệp code có tab Mã nguồn.
- [ ] Đăng nhập, thoát rồi vào lại không mất file.

**Mới**
- [ ] Unit 2 → Exercise 1 → bấm **Đáp án** ở một câu: có 2 nút **✨ Trực quan / 📖 Lời giải chữ**; bấm *Tiếp ›* hoặc ▶ thấy từ trong câu sáng lên kèm bong bóng giải thích, rồi đáp án và lý do loại 3 đáp án sai.
- [ ] Lời giải trực quan: khung giải thích **nổi** ở dưới, kéo thanh ⋮ để di chuyển, ▾ thu gọn, ⟲ về chỗ cũ; chạm bất kỳ chỗ nào trong lời giải thì thanh trên cùng tự thu gọn.
- [ ] Chạm một từ trong câu → thẻ tra từ (nghĩa, từ loại, cụm, 🔊, 🔍 Cambridge/Oxford/Google Dịch/TFlat, 📋 sao chép). Bấm 🔊 ở dưới hoặc ▶ → đọc từng bước, chữ đang đọc in đậm to lên.
- [ ] Mở chọn model: có các nhóm **Tất cả / Gemini / xKiro / Gonka / Netlify / OpenRouter** và ô **tìm model theo tên**; dòng cuối ghi "đang dùng chung với các tài khoản" (không còn cảnh báo "Worker chưa có /api/shared").
- [ ] Đăng nhập tài khoản thứ hai → danh sách model Netlify/OpenRouter **được nhận sẵn**, không phải tải lại (tiết kiệm lượt gọi).
- [ ] Thẻ token dưới câu trả lời đã gộp cả chi phí Exa/Jina.
- [ ] 📘 → 🧩: ô **✨ Nhờ AI tạo skill riêng**; hoặc nói trong chat "tạo skill …".
- [ ] ⚙ "Dùng chung · tiết kiệm · việc khó" (chân bộ chọn model): bật/tắt chia sẻ, đẩy việc khó (3.6 flash → hydrogen).
- [ ] ☁ Tài khoản có huy hiệu 👑 **Nhà sáng lập** và nút **🛡️ Mở trang quản trị** (4 tab: Tổng quan, Người dùng, Mã nâng cấp, Nhật ký).
- [ ] Bong bóng câu hỏi có **Sao chép** + **Chỉnh sửa** (sửa → Gửi thì AI trả lời lại); nhấn giữ ra menu.
- [ ] 🎭 → **📊 Thống kê khóa & hạn mức**: thấy bảng khóa; hỏi vài câu thì số đếm tăng.
- [ ] **📁 Tệp của tôi** (trong Kho, 🎭 hoặc Tài khoản): xem, tải từng tệp, tải .zip.
- [ ] Chọn model Netlify → chạy được (nhà sáng lập). Tài khoản Thường chọn Netlify → báo cần Pro.
- [ ] **🎬 Video:** 🔎 Tìm kiếm → có ô **🎬 Tìm & phát video** (mặc định tick). Chat: "Tìm giúp mình vài video YouTube dạy phát âm tiếng Anh" → dưới câu trả lời có **thẻ video**; bấm thẻ → khung phát hiện **trên đầu khung chat** (‹ › chuyển bài, ↗ mở trang gốc, ▾ thu gọn mà video vẫn chạy, ✕ đóng). Nút **🎬** ở thanh trên để tự tìm video không cần hỏi AI. *(Chỉ cần up lại `index.html`, không đổi Worker.)*
- [ ] Nút **Tìm kiếm** → tick **🖥️ Trình duyệt cho AI** (model Netlify/xKiro/OpenRouter) → nhờ "mở example.com và cho biết tiêu đề" → có ảnh chụp trong mục 🖥️.

## H. Dùng quyền quản trị
- **Tạo mã nâng cấp:** Quản trị → tab *Mã nâng cấp* → chọn hạng, số ngày (0 = vĩnh viễn), số lượng → Tạo → gửi mã `XXXX-XXXX-XXXX`. Người dùng vào ☁ Tài khoản → *Nhập mã nâng cấp*. Mỗi mã dùng 1 lần, thu hồi được.
- **Quản lý người dùng:** tab *Người dùng* → bấm một tài khoản: xem IP, dữ liệu, chat, tệp/ảnh/video; đổi hạng; khóa/mở khóa; chặn từng tính năng (kể cả Netlify, Trình duyệt AI). Mọi lần xem/đổi được ghi ở tab *Nhật ký*.
- Hạng: Thường < Plus < Pro < Ultra < Admin < Nhà sáng lập. Admin chỉ tác động tài khoản thấp hơn mình, chỉ cấp hạng thấp hơn mình.
- Netlify và Trình duyệt AI: từ Pro trở lên. Trình duyệt: Pro 120 giây/ngày, Ultra 240, Admin 360, Nhà sáng lập 540 (nằm trong 10 phút/ngày miễn phí của Cloudflare).

---

## Sự cố thường gặp
| Hiện tượng | Cách xử lý |
|---|---|
| Vẫn thấy giao diện cũ | Xóa bộ nhớ đệm (F.2) hoặc mở tab ẩn danh |
| Trang trắng sau khi up | Tên file phải đúng `index.html`; tải lại file từ chat rồi up lại |
| "Chưa cấu hình SESSION_SECRET" | Settings → Variables and Secrets → thêm lại `SESSION_SECRET` (chuỗi ngẫu nhiên dài) |
| `window is not defined` ở Worker API | Bạn dán nhầm `cfsync.js` vào dobai-api; chỉ dán `api-worker.js` |
| Google báo `access_denied` | Google Cloud → màn hình đồng ý → thêm email vào **Test users** |
| Đồng bộ lỗi / không đăng nhập | `SITE_ORIGIN` phải đúng `https://dobai.tung1231232t6.workers.dev` (không có `/` cuối) |
| Người khác đăng nhập báo không được phép | Còn biến `ALLOWED_EMAILS` → xóa hoặc thêm email |
| Chọn model báo "Worker chưa có /api/shared" | Chưa dán `api-worker.js` mới vào dobai-api (bước D) |
| Netlify báo 503 "Chưa cấu hình" | Thiếu `NL_UPSTREAM`/`NL_KEY` (bước C) |
| Netlify báo 403 | Chưa đủ hạng Pro hoặc bị chặn tính năng |
| Trình duyệt AI báo 503 | Thiếu `CF_ACCOUNT_ID`/`CF_BR_TOKEN` (bước C) |
| Trình duyệt AI báo 502 "Không tạo được phiên" | Token sai quyền (phải *Browser Rendering – Edit*) hoặc Account ID sai; nếu đúng hết mà vẫn lỗi, gửi ảnh chụp cho Claude |
| Trình duyệt AI báo hết thời gian | Cloudflare chỉ cho 10 phút/ngày, có lại 07:00 sáng (giờ VN) |
| Không thấy nút quản trị | Phải đăng nhập đúng email nhà sáng lập; tải lại cứng |
| Đọc to không ra tiếng | Tăng âm lượng media; 🎭 → *Nghe thử*; kiểm tra giọng TTS của Android |

Nếu hỏng gì, chụp màn hình gửi Claude kèm tên bước (ví dụ "C" hoặc "D.4").

## Việc nên làm thêm (bảo mật)
- Google Cloud → Clients → xóa/tạo lại *Client secret* đã lỡ gửi trong chat (thiết kế hiện tại không dùng nó).
- Khóa Netlify từng lộ công khai → nên tạo khóa mới ở Netlify rồi đặt vào `NL_KEY`.
- Các khóa khác (Gemini, xKiro, Gonka, OpenRouter, Exa, Jina) vẫn nằm trong `index.html`, ai mở mã nguồn cũng thấy; chỉ Netlify được giấu ở Worker.


## Cập nhật 21/11
- Chỉ cần up lại `index.html` + `ytplay.html` (+ `cfsync.js` như cũ); `api-worker.js` không đổi.
- Mới: tab ApiNex / Z.ai / Groq / Itera trong bộ chọn model, X (Twitter) khi tìm video, ảnh `![](https://…)` hiện trong chat, xem mã nguồn kiểu trình soạn code, khóa giao diện sáng.
