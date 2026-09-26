# Website Phong Thủy Đỗ Gia — Hướng dẫn cập nhật & kết nối Blog với Notion

## 1. Cấu trúc thư mục

```
index.html                  Trang chủ
ngay-gio-sinh.html          → phongthuydogia.com/ngay-gio-sinh
dat-ten.html                → phongthuydogia.com/dat-ten
dinh-huong-su-nghiep.html   → phongthuydogia.com/dinh-huong-su-nghiep
luan-la-so.html             → phongthuydogia.com/luan-la-so
assets/                     CSS chung, logo, favicon
favicon.ico, site.webmanifest, robots.txt
vercel.json                 Đường dẫn gọn (bỏ .html) + định tuyến Blog, sitemap
api/                        Code Blog (chạy trên Vercel, đọc bài từ Notion)
scripts/                    Công cụ sinh lại các trang tĩnh (không bắt buộc)
```

**Đưa lên GitHub:** chép toàn bộ các file này vào repo hiện tại (ghi đè `index.html`),
**giữ nguyên file `og-image.jpg`** đang có trong repo, rồi commit & push. Vercel sẽ tự deploy.

## 2. Kết nối Blog với Notion (làm 1 lần, ~10 phút)

### Bước 1 — Tạo Integration
1. Vào https://www.notion.so/profile/integrations → **New integration**.
2. Tên: `Website Đỗ Gia`, loại **Internal**, chọn workspace của bạn → Save.
3. Mở tab **Configuration**, copy **Internal Integration Secret** (chuỗi bắt đầu bằng `ntn_...`).
   Giữ bí mật chuỗi này, không gửi cho ai.

### Bước 2 — Tạo database "Blog" trong Notion
Tạo một trang mới → gõ `/database` → chọn **Database – Full page**, đặt tên `Blog`.
Tạo các cột (tên cột phải đúng như dưới, kể cả dấu):

| Tên cột      | Kiểu (Type)     | Ghi chú |
|--------------|-----------------|---------|
| `Tên bài`    | Title (cột mặc định, đổi tên) | Tiêu đề bài = thẻ H1 |
| `Slug`       | Text            | Đường dẫn, vd `gio-da-de-la-gi`. Để trống → tự tạo từ tiêu đề |
| `Mô tả`      | Text            | 120–160 ký tự, hiện trên Google & khi chia sẻ Facebook |
| `Ngày đăng`  | Date            | Bài mới nhất hiển thị đầu tiên |
| `Chủ đề`     | Multi-select    | vd: Chọn ngày giờ sinh, Đặt tên, Công danh sự nghiệp |
| `Xuất bản`   | Checkbox        | **Chỉ bài được tick mới hiện trên web** |
| `Ảnh bìa`    | Files & media   | Không bắt buộc — có thể dùng ảnh Cover của trang |
| `Tiêu đề SEO`| Text            | Không bắt buộc — nếu muốn tiêu đề trên Google khác tiêu đề bài |

### Bước 3 — Cho Integration quyền đọc database
Mở database Blog → nút **•••** góc phải → **Connections** → chọn `Website Đỗ Gia` → Confirm.

### Bước 4 — Khai báo trên Vercel
1. Copy link database (nút **Share → Copy link**).
2. Vercel → project phongthuydogia → **Settings → Environment Variables**, thêm:
   - `NOTION_TOKEN` = chuỗi `ntn_...` ở Bước 1
   - `NOTION_DATABASE_ID` = link database vừa copy (dán nguyên link cũng được)
3. Vào tab **Deployments** → bản mới nhất → **Redeploy** (chỉ cần làm 1 lần này).

## 3. Đăng bài hằng ngày

1. Thêm 1 dòng mới trong database Blog, mở dòng đó ra và viết bài như viết trang Notion bình thường.
2. Điền `Mô tả`, `Ngày đăng`, `Chủ đề`, thêm ảnh bìa (Cover) nếu có.
3. Tick **Xuất bản** → bài lên web tại `phongthuydogia.com/blog/<slug>` sau khoảng **5 phút**.
   Sửa bài trên Notion cũng tự cập nhật sau ~5 phút. Không cần deploy, không cần sửa file.

### Soạn bài chuẩn SEO
- **Tiêu đề bài** chứa từ khóa chính (vd "Giờ Dạ Đề là gì?"), dài ≤ 60 ký tự.
- Dùng **Heading 1** cho các mục lớn, **Heading 2** cho mục con (web tự đổi thành H2/H3 và tạo Mục lục khi có ≥ 3 mục).
  Không cần gõ lại tiêu đề bài ở đầu nội dung.
- **Slug** ngắn, không dấu, nối bằng gạch ngang. Không đổi slug sau khi đã đăng (link cũ sẽ hỏng).
- Mỗi ảnh nên có **caption** (chú thích) — caption được dùng làm mô tả ảnh (alt) cho Google.
- Chèn link nội bộ tới trang dịch vụ, vd `/ngay-gio-sinh`, `/dat-ten`.
- Hỗ trợ: đoạn văn, heading, danh sách, trích dẫn, callout, ảnh, bảng, toggle, video YouTube, bookmark, chia cột.

Web tự động tạo: thẻ title/description, canonical, Open Graph (ảnh chia sẻ Facebook = ảnh bìa),
dữ liệu cấu trúc BlogPosting + Breadcrumb, Mục lục, bài liên quan, `sitemap.xml` (tự thêm bài mới) và RSS `/blog/rss.xml`.

**Sau khi có bài đầu tiên:** vào Google Search Console → Sitemaps → gửi `https://www.phongthuydogia.com/sitemap.xml`.

## 4. Sửa nội dung trang dịch vụ / trang chủ

Có thể sửa trực tiếp các file `.html`. Nếu muốn sửa menu/footer cho tất cả trang cùng lúc:
sửa `api/_lib/layout.js` (menu, footer, số điện thoại, link form) và `scripts/pages-data.mjs` (nội dung 4 trang dịch vụ),
rồi chạy `node scripts/build-pages.mjs` để sinh lại các file `.html`.
