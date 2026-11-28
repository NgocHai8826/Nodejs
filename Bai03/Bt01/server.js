const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware phục vụ tệp tĩnh (CSS, hình ảnh, scripts) từ thư mục 'public'
app.use(express.static(path.join(__dirname, 'public')));

// 1. Route Trang Chủ (Home)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// 2. Route Giới Thiệu Bản Thân (About)
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

// 3. Route Kỹ Năng Chuyên Môn (Skills)
app.get('/skills', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'skills.html'));
});

// 4. Route Sở Thích Cá Nhân (Hobbies)
app.get('/hobbies', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'hobbies.html'));
});

// 5. Route Thông Tin Liên Hệ (Contact)
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});

// 6. Middleware xử lý đường dẫn không tồn tại (HTTP 404 Not Found)
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// Khởi động Web Server
app.listen(PORT, () => {
  console.log('╔══════════════════════════════════════════════════════════════════════╗');
  console.log('║           BÀI TẬP 01: WEBSITE GIỚI THIỆU CÁ NHÂN (EXPRESS)           ║');
  console.log('║  Sinh viên: Hồ Sỹ Ngọc Hải  │  MSSV: CDCNTT18B10  │  Lớp: CĐ-CNTT18B ║');
  console.log('╚══════════════════════════════════════════════════════════════════════╝');
  console.log('');
  console.log(`✔ Web Server đang chạy tại: http://localhost:${PORT}`);
  console.log(`▶ Truy cập Trang chủ: http://localhost:${PORT}/`);
});
