// Dòng này import module express, một framework web phổ biến trong Node.js, để tạo và quản lý ứng dụng web.
const express = require('express');
// Dòng này import module body-parser, một middleware cho Express.js, giúp phân tích và 
// trích xuất dữ liệu từ các yêu cầu HTTP gửi đến ứng dụng.
const bodyParser = require('body-parser');
const path = require('path');

// Dòng này tạo một instance của Express.js bằng cách gọi hàm express(). 
// Instance này đại diện cho ứng dụng web của bạn và sẽ được sử dụng để định cấu hình và xử lý các yêu cầu HTTP.
const app = express();

// Dòng này đặt middleware body-parser để xử lý dữ liệu từ các biểu mẫu HTML được gửi dưới dạng phương thức POST. 
// Middleware này phân tích dữ liệu và chuyển nó thành dạng JSON để sử dụng trong các xử lý tiếp theo.
app.use(bodyParser.urlencoded({ extended: true }));

// Dòng này sử dụng middleware express.static để phục vụ các tệp tĩnh (ví dụ: CSS, hình ảnh) từ thư mục public. 
// Điều này cho phép bạn truy cập các tệp tĩnh trực tiếp từ trình duyệt, ví dụ: /styles.css.
app.use(express.static(path.join(__dirname, 'public')));

// Dòng này đặt template engine là Pug (trước đó có thể cài đặt thông qua npm install pug), 
// cho phép bạn sử dụng Pug để tạo các trang HTML động.
app.set('view engine', 'pug');
// Dòng này đặt đường dẫn đến thư mục chứa các tệp template Pug. Thường thì các tệp này sẽ nằm trong thư mục views.
app.set('views', path.join(__dirname, 'views'));

// Dòng này import module calculatorController từ thư mục controllers. 
// Đây là một controller chứa các xử lý liên quan đến tính toán.
const calculatorController = require('./controllers/calculatorController');
// Dòng này đăng ký controller calculatorController với đường dẫn tiền tố /calculator. 
// Nghĩa là các route trong calculatorController sẽ được tiếp nhận qua đường dẫn bắt đầu bằng /calculator.
app.use('/calculator', calculatorController);

// Middleware xử lý lỗi:
// Đây là một middleware đặc biệt để xử lý lỗi. Nếu có lỗi xảy ra trong quá trình xử lý yêu cầu, 
// middleware này sẽ bắt lỗi, in thông báo lỗi vào console, và gửi trả lời với mã trạng thái 500 (lỗi máy chủ) và 
// thông báo 'Something broke!'.
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Something broke!');
});

// Dòng này bắt đầu máy chủ Express.js và lắng nghe yêu cầu HTTP trên cổng 3000. 
// Khi máy chủ được khởi động, hiển thị đường link trực tiếp trên Terminal để người dùng truy cập.
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Truy cập ứng dụng Calculator MVC tại: http://localhost:${PORT}/calculator`);
});
