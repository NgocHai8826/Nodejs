const express = require('express');
const app = express();

// Định nghĩa route cho đường dẫn gốc
app.get('/', (req, res) => {
  res.send('Trang chủ');
});

// Định nghĩa route cho đường dẫn '/about'
app.get('/about', (req, res) => {
  res.send('Trang giới thiệu');
});

// Định nghĩa route cho đường dẫn '/users' với tham số query 
app.get('/users', (req, res) => {
  const { name } = req.query;
  res.send(`Xin chào, ${name}`);
});

// Định nghĩa route mặc định khi không tìm thấy route phù hợp
app.use((req, res) => {
  res.status(404).send('Không tìm thấy trang');
});

// Khởi động server và lắng nghe yêu cầu tại cổng 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại: http://localhost:${PORT}`);
  console.log('Các đường link truy cập nhanh:');
  console.log(`  - Trang chủ:        http://localhost:${PORT}/`);
  console.log(`  - Trang giới thiệu: http://localhost:${PORT}/about`);
  console.log(`  - Trang người dùng: http://localhost:${PORT}/users?name=Minh`);
  console.log(`  - Trang test 404:   http://localhost:${PORT}/khongtontai`);
});
