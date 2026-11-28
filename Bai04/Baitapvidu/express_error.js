const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Trang giao diện
app.get('/', (req, res) => {
  res.send(`
    <form action="/divide" method="post">
      <label for="dividend">Dividend:</label>
      <input type="number" id="dividend" name="dividend" required>
      <br>
      <label for="divisor">Divisor:</label>
      <input type="number" id="divisor" name="divisor" required>
      <br>
      <input type="submit" value="Submit">
    </form>
  `);
});

// Xử lý yêu cầu POST
app.post('/divide', (req, res) => {
  const dividend = parseFloat(req.body.dividend);
  const divisor = parseFloat(req.body.divisor);

  if (isNaN(dividend) || isNaN(divisor) || divisor === 0) {
    // Xử lý lỗi
    res.status(400).send('Invalid input');
    return;
  }

  const result = dividend / divisor;
  res.send(`Result: ${result}`);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Truy cập Form chia số: http://localhost:${PORT}`);
});
