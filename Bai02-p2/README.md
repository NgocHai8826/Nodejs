## 1. Mô tả cách thực hiện (Các bước chạy)

### Bước 1: Điều hướng & Khởi chạy Server
- Mở cửa sổ Terminal / PowerShell trong môi trường phát triển (như VS Code).
- Chạy lệnh `cd Bai02-p2` để chuyển vào thư mục chứa bài tập.
- Thực thi file bằng lệnh `node MyFirstNode.js` (hoặc tên file tương ứng như `node MyFirstNode_2.js`).
- Sau khi chạy thành công, Terminal sẽ xuất ra dòng thông báo:
  ```text
  Server đang chạy tại địa chỉ: http://localhost:3000
  ```

### Bước 2: Kiểm tra phản hồi trên trình duyệt
- Mở trình duyệt web (Google Chrome) và nhập địa chỉ `http://localhost:3000` vào thanh địa chỉ.
- Máy chủ phản hồi mã HTML/CSS và hiển thị thẻ giao diện hình thẻ Card căn giữa trang với nền chuyển màu (Gradient).

---

## 2. Kết quả thực hiện

- **Mã nguồn (`MyFirstNode_2.js`):** Web Server được khởi tạo thành công ở cổng `3000`, trả về tài liệu HTML tích hợp CSS layout đáp ứng chuẩn UI modern.
- **Giao diện hiển thị:** Trang web hiển thị thẻ Card có các thành phần:
  - **Nhãn badge nổi bật:** `NODE.JS SERVER`
  - **Tiêu đề chính:** *"Chào mừng bạn đến với ứng dụng của tôi!"*
  - **Danh sách thông tin cá nhân trong các ô vuông được định dạng riêng biệt:**
    1. **Họ và tên:** Hồ Sỹ Ngọc Hải
    2. **Mã sinh viên:** CDCNTT18B10

---
