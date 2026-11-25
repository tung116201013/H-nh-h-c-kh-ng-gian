# Hợp đồng /api/shared (Worker dobai-api) — cần thêm vào api-worker.js
Xác thực: cùng token đăng nhập (Authorization: Bearer). Mọi tài khoản đã đăng nhập đều dùng được. Bảng D1 mới: shared(k PRIMARY KEY, v TEXT, updated INT) và su(day, kfp, model, uid, r, i, o, e, ts).
- GET /api/shared/models -> {models:{g|n|o|x|k:{t, data}}}
- PUT /api/shared/models {k,t,data} -> lưu nếu t mới hơn; k thuộc g,n,o,x,k; data ≤ 64KB; chỉ nhận id khớp /^[\w.\-\/:]+$/
- POST /api/shared/usage {day, rows:{"kfp|model":{r,i,o,e}}, dead:{"kfp|model":untilMs}, obs:[{m,f:"rpd|rpm",n}]} -> cộng dồn theo uid; lưu obs
- GET /api/shared/usage -> {day (giờ Thái Bình Dương), rpd:{"kfp|model":n}, rpm:{...60 giây gần nhất}, dead:{...}, lim:{model:{rpd,rpm}}}  — rpd/rpm LOẠI TRỪ chính người gọi; lim = trung vị obs của mọi người (≥3 mẫu).

## Bổ sung 21/11 (KST v2)
- POST /api/shared/usage: `obs[]` nay có thêm `x` (giới hạn CHÍNH XÁC đọc từ lỗi 429, tùy chọn), `ra` (giây chờ), `f` ∈ rpd|rpm|tpm; `n` có thể 0 nếu có `x`. Server tự ghi hồ sơ theo giờ UTC vào bảng `sprof` từ `rows`.
- GET /api/shared/usage: `lim[model][f]` nay là `{v, n, ex}` (ex=1: Google báo chính xác). Client cũ bỏ qua định dạng mới; client mới vẫn đọc được số thuần.
- GET /api/shared/prof -> `{t, models:{model:{w:[48], n:[ngàyThường, cuốiTuần]}}}`: lượt/giờ trung bình của TOÀN hệ thống (24 ô ngày thường + 24 ô cuối tuần, giờ UTC). Server làm mới tối đa 30 phút/lần.
