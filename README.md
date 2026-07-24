# Enkai Academy

Website portfolio / gallery cá nhân của **Phạm Anh Quốc**.  
Chạy hoàn toàn miễn phí trên **GitHub Pages**.

---

## Cấu trúc thư mục (quan trọng)

```
enkai-academy/
├── index.html              ← Trang chính
├── css/
│   └── style.css           ← Giao diện đẹp
├── js/
│   └── main.js             ← Logic gallery + xem chi tiết
├── data/
│   └── works.json          ← Danh sách tất cả tác phẩm (ảnh/video)
├── assets/
│   ├── images/             ← Đặt tất cả ảnh vào đây
│   └── videos/             ← Đặt tất cả video vào đây
└── README.md               ← File hướng dẫn này
```

---

## Cách đưa website lên GitHub Pages (làm lần đầu)

1. Tạo tài khoản GitHub (nếu chưa có): https://github.com
2. Tạo **repository mới**:
   - Tên repo nên là: `enkai-academy` hoặc `ten-ban.github.io`
   - Chọn **Public**
   - Không tick "Add a README" (vì đã có sẵn)
3. Upload toàn bộ thư mục `enkai-academy` lên repo:
   - Cách dễ nhất: Kéo thả toàn bộ file vào trang repo trên GitHub
   - Hoặc dùng GitHub Desktop (phần mềm dễ dùng)
4. Vào **Settings → Pages**:
   - Source: Deploy from a branch
   - Branch: `main` (hoặc `master`) → folder `/ (root)`
   - Save
5. Đợi 1–2 phút, website sẽ có địa chỉ dạng:
   `https://ten-ban.github.io/enkai-academy/`
   (hoặc `https://ten-ban.github.io` nếu repo tên là `ten-ban.github.io`)

### Gắn tên miền riêng (bạn đã có domain)

1. Trong repo, tạo file tên `CNAME` (không có đuôi) ở thư mục gốc.
2. Nội dung file chỉ viết đúng tên miền của bạn, ví dụ:
   ```
   enkai.academy
   ```
   hoặc
   ```
   www.enkai.academy
   ```
3. Vào trang quản lý domain (nơi mua domain) → DNS → thêm bản ghi:
   - **Type A** trỏ về IP của GitHub Pages:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153
   - Hoặc **CNAME** trỏ `www` về `ten-ban.github.io`
4. Đợi DNS cập nhật (có thể 5 phút đến vài giờ).

---

## Cách thêm ảnh / video mới (rất quan trọng)

Vì GitHub Pages là **website tĩnh**, bạn **không thể upload trực tiếp từ trình duyệt**.  
Cách làm đúng:

### Bước 1: Thêm file ảnh/video vào thư mục

- Ảnh → bỏ vào `assets/images/`
  - Ví dụ: `anh-hoang-hon.jpg`, `portrait-01.png`
- Video → bỏ vào `assets/videos/`
  - Ví dụ: `ky-niem-2025.mp4` (nên dùng định dạng mp4, dung lượng vừa phải)

**Lưu ý:**
- Tên file nên viết không dấu, không khoảng trắng (dùng dấu gạch ngang `-`).
- Ảnh nên nén trước khi upload (dưới 1–2MB là đẹp).
- Video nên dưới 20–30MB để load nhanh.

### Bước 2: Cập nhật danh sách trong `data/works.json`

Mở file `data/works.json` và thêm một object mới vào mảng:

```json
{
  "id": 5,
  "title": "Tên tác phẩm của bạn",
  "type": "image",
  "src": "assets/images/ten-file-anh.jpg",
  "description": "Mô tả ngắn về tác phẩm này. Mọi người sẽ đọc được khi bấm xem chi tiết.",
  "date": "2026-07-20"
}
```

**Giải thích từng trường:**

| Trường        | Ý nghĩa                          | Ví dụ                          |
|---------------|----------------------------------|--------------------------------|
| `id`          | Số thứ tự (tăng dần)             | 5, 6, 7...                     |
| `title`       | Tên hiển thị                     | "Hoàng hôn Đà Nẵng"            |
| `type`        | `"image"` hoặc `"video"`         | "image"                        |
| `src`         | Đường dẫn file                   | "assets/images/xxx.jpg"        |
| `description` | Mô tả chi tiết                   | "Chụp lúc 17h30..."            |
| `date`        | Ngày (năm-tháng-ngày)            | "2026-07-20"                   |

**Ví dụ đầy đủ sau khi thêm 1 ảnh mới:**

```json
[
  {
    "id": 1,
    "title": "Hoàng hôn trên biển",
    "type": "image",
    "src": "assets/images/sample-1.jpg",
    "description": "Khoảnh khắc hoàng hôn...",
    "date": "2025-06-12"
  },
  {
    "id": 5,
    "title": "Ảnh mới của tôi",
    "type": "image",
    "src": "assets/images/anh-moi.jpg",
    "description": "Đây là ảnh mình vừa chụp hôm nay.",
    "date": "2026-07-24"
  }
]
```

### Bước 3: Upload lại lên GitHub

- Kéo thả file ảnh/video + file `works.json` đã sửa lên repo.
- Hoặc commit bằng GitHub Desktop.
- Đợi 30–60 giây, refresh website → tác phẩm mới xuất hiện.

---

## Xem chi tiết tác phẩm

- Bấm vào bất kỳ ảnh/video nào trên trang → mở cửa sổ chi tiết.
- Có thể xem ảnh lớn hoặc phát video.
- Bấm nút × hoặc click ra ngoài hoặc nhấn phím `Esc` để đóng.

---

## Tùy chỉnh nhanh

| Muốn thay đổi          | File cần sửa              |
|------------------------|---------------------------|
| Email liên hệ          | `index.html` (dòng contact) |
| Tên chủ sở hữu         | `index.html`              |
| Màu sắc / giao diện    | `css/style.css`           |
| Thêm/xóa tác phẩm      | `data/works.json` + assets |

---

## Lưu ý quan trọng

- Website **không hỗ trợ upload trực tiếp từ người xem** (vì GitHub Pages là static). Chỉ **bạn** (chủ sở hữu) mới thêm được nội dung bằng cách upload file lên repo.
- Nếu sau này muốn người khác upload được → cần chuyển sang dịch vụ có backend (Netlify + Form, Supabase, Firebase…), phức tạp hơn.
- Luôn giữ file `works.json` đúng định dạng JSON (dấu phẩy, ngoặc kép…) nếu sai sẽ không hiện gallery.

---

Chúc bạn xây dựng Enkai Academy thật đẹp!  
Nếu cần chỉnh sửa thêm (thêm trang, đổi màu, thêm bộ lọc…), cứ hỏi nhé.
