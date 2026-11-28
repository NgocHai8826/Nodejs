// Dòng này import module express để tạo một router trong Express.
const express = require('express');
// Dòng này tạo một router mới bằng cách sử dụng express.Router(). 
// Router này sẽ chứa các xử lý liên quan đến định tuyến (routing) cho phần của ứng dụng được quản lý bởi router này.
const router = express.Router();
// Dòng này import module calculatorModel, một module chứa logic xử lý tính toán, từ thư mục models. 
// Cái này thường được sử dụng để tách logic xử lý ra khỏi controller.
const calculatorModel = require('../models/calculatorModel');

// Đây là một route xử lý HTTP GET đối với đường dẫn gốc /. Khi người dùng truy cập trang chính, 
// router này sẽ hiển thị template 'calculator' bằng cách sử dụng res.render('calculator'). 
// Điều này cho phép hiển thị giao diện máy tính trên trình duyệt của người dùng.
router.get('/', (req, res) => {
  res.render('calculator');
});

// Đây là một route xử lý HTTP POST đối với đường dẫn /calculate. Khi người dùng gửi một biểu mẫu tính toán, 
// router này sẽ xử lý dữ liệu gửi đến thông qua req.body, sau đó gọi hàm calculate.
router.post('/calculate', (req, res, next) => {
  const { num1, num2, operation } = req.body;
  // Để tính toán kết quả. Nếu kết quả không phải là một số hợp lệ, 
  // nó sẽ tạo một lỗi và chuyển nó đến middleware xử lý lỗi thông qua next(err). 
  // Nếu kết quả hợp lệ, nó sẽ hiển thị template 'calculator' với kết quả.
  const result = calculatorModel.calculate(num1, num2, operation);
  if (isNaN(result)) {
    const err = new Error('Invalid input');
    err.status = 400;
    return next(err);
  }
  res.render('calculator', { result });
});

// Dòng này xuất router này để có thể được sử dụng bởi ứng dụng Express chính. 
// Router này sẽ được sử dụng trong tệp app.js để xác định cách các route trong controller này được xử lý.
module.exports = router;
