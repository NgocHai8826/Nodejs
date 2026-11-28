const express = require('express');
const path = require('path');
const app = express();

// Thiết lập template engine Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Xử lý yêu cầu GET đến đường dẫn '/'
app.get('/', (req, res) => {
  const name = 'John Doe';
  res.render('index', { name });
});

// Khởi động server và lắng nghe yêu cầu tại cổng 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại: http://localhost:${PORT}`);
  console.log(`Truy cập giao diện Pug: http://localhost:${PORT}`);
});
