var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.end('Hello World! Chào mừng đến với ứng dụng Node.js đầu tiên của tôi.');
}).listen(8080);

console.log('Server đang chạy tại http://localhost:8080');