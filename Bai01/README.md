# Báo cáo Thực hành Bài 1: Cài đặt & Khởi tạo Node.js

## 1. Kết quả kiểm tra môi trường
- **Node.js (LTS):** `v26.13.0` (lệnh `node -v`)
- **npm:** `11.20.0` (lệnh `npm -v`)

## 2. Mã nguồn ứng dụng (`hello.js` / `MyFirstNode.js`)
```javascript
var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.end('Hello World! Chào mừng đến với ứng dụng Node.js đầu tiên của tôi.');
}).listen(8080);

console.log('Server đang chạy tại http://localhost:8080');
```

## 3. Mô tả kết quả thực thi
- **Chạy Server:** Điều hướng vào thư mục dự án (`cd Bai01`) và thực thi lệnh `node MyFirstNode.js` (hoặc `node hello.js`). Terminal xuất ra dòng thông báo `Server đang chạy tại http://localhost:8080`.
- **Kiểm tra trên trình duyệt:** Truy cập địa chỉ `http://localhost:8080`, trình duyệt hiển thị chính xác nội dung: *"Hello World! Chào mừng đến với ứng dụng Node.js đầu tiên của tôi."*
