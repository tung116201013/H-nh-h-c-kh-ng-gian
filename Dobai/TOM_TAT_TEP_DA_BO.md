# TÓM TẮT CÁC TỆP ĐÃ BỎ (không cần giữ) — dobai, 21/11/2026

Các tệp dưới đây **không còn cần** để làm việc tiếp. Nội dung quan trọng đã nằm trong các tệp giữ lại.

| Tệp bỏ | Nó là gì | Vì sao bỏ / nội dung còn ở đâu |
|---|---|---|
| `GIAO_VIEC_HYDROGEN_A2a.md`, `A2b.md`, `A3a.md` | Tệp giao việc các Phase đã xong (PDF cơ bản, ghép/sắp xếp, nén) | Phase đã ghép. Khuôn mẫu mới nhất là `GIAO_VIEC_HYDROGEN_A3b.md`; kết quả thử ở `TONG_HOP_CHUYEN_PHIEN_v3.md` mục 3 |
| `TONG_HOP_CHUYEN_PHIEN_v2.md` | Bàn giao phiên cũ (sau A2b) | Thay bằng v3 (đã gộp kết quả A3a) |
| `dobai-khoi-A0-A2b.html` (và bản A0-A1-A2a) | Khối mẫu 4 khối | Thay bằng `dobai-khoi-A0-A3a.html` (5 khối) |
| `ai_studio_code_3.txt`, `ai_studio_code_4.html` | Bản Hydrogen trả cho A3a (hai bản giống hệt) | Khối đã nằm trong `index.html` và `dobai-khoi-A0-A3a.html` |
| `wg-module.html` | Bản gốc khối `wg-ext` (nhóm công việc kiểu Claude) | Đã ghép vào `index.html`; chỉ để xem cách ghép |
| `CODEMAP.md` cũ | Bản đồ mã với số dòng cũ | Đã sinh lại bản mới (trong thư mục giữ lại) |
| `SHARED_API.md` | Hợp đồng `/api/shared` | Đã cài trong `api-worker.js`. Tóm tắt dưới đây |

## Hợp đồng `/api/shared` (từ SHARED_API.md, đã cài trong api-worker.js)
Xác thực bằng token đăng nhập (Bearer); mọi tài khoản đăng nhập đều dùng được. Bảng D1: `shared(k PK, v, updated)`, `su(day,kfp,model,uid,r,i,o,e,ts)`.
- `GET /api/shared/models` → `{models:{g|n|o|x|k:{t,data}}}`
- `PUT /api/shared/models {k,t,data}` → lưu nếu `t` mới hơn; `k` ∈ g,n,o,x,k; data ≤ 64 KB; id khớp `/^[\w.\-\/:]+$/`
- `POST /api/shared/usage {day,rows,dead,obs}` → cộng dồn theo uid
- `GET /api/shared/usage` → `{day, rpd, rpm, dead, lim}` (rpd/rpm loại trừ chính người gọi; `lim` = trung vị ≥ 3 mẫu)

## Tệp lớn — chỉ đính kèm khi cần
- `DOBAI_CONTEXT_GEMINI.md` (≈2 MB): ngữ cảnh đã lược cho Hydrogen, **cũ** (không có A0–A3a). Chỉ cần khi làm việc ngoài mảng công cụ A; khi đó dựng lại.
- `DERO_TONG_HOP_V4.md` (≈9 MB): tài nguyên khảo sát. Chỉ dùng khi một Phase ghi "Đọc DERO dòng …"; mục lục theo dòng nằm trong `MUC_LUC_DOBAI.md` §5. Đọc đúng dải dòng, không đọc cả tệp.

## Cách bắt đầu phiên mới
Gửi: `TONG_HOP_CHUYEN_PHIEN_v3.md`, `index.html`, `dobai-khoi-A0-A3a.html`, tệp giao việc hiện tại (`GIAO_VIEC_HYDROGEN_A3b.md`). Thêm `cfsync.js`/`api-worker.js` chỉ khi Phase đụng tới đồng bộ hoặc Worker.
