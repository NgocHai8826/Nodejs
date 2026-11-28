const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const app = express();

// Thiết lập template engine Handlebars
app.engine('handlebars', exphbs.engine({
  // Không dùng thư mục layouts
  layoutsDir: path.join(__dirname, 'views', 'nonexistent_layouts'), // Đường dẫn không tồn tại
  defaultLayout: false // Không sử dụng layout mặc định
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Xử lý yêu cầu GET đến đường dẫn '/'
app.get('/', (req, res) => {
  const name = 'John Doe';
  res.render('index', { name });
});

// Khởi động server và lắng nghe yêu cầu tại cổng 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Truy cập giao diện Handlebars: http://localhost:${PORT}`);
});
