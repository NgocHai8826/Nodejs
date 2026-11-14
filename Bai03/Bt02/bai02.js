
const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
    // Lấy URL và loại bỏ query string nếu có
    const url = req.url.split('?')[0];

    // Thiết lập Header định dạng HTML với bảng mã UTF-8 để hiển thị tiếng Việt chính xác
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    if (url === '/') {
        // Khi truy cập /, hiển thị lời chào và mã sinh viên
        res.writeHead(200);
        res.end(`
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trang chủ - Node.js Server</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0;
            color: #333;
        }
        .container {
            background: #ffffff;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            max-width: 500px;
            width: 90%;
            text-align: center;
        }
        h1 {
            color: #2b6cb0;
            margin-bottom: 20px;
            font-size: 26px;
        }
        .greeting {
            font-size: 18px;
            color: #4a5568;
            margin-bottom: 25px;
        }
        .card {
            background: #edf2f7;
            border-left: 5px solid #3182ce;
            padding: 16px 20px;
            margin-bottom: 25px;
            text-align: left;
            border-radius: 4px;
        }
        .card p {
            margin: 8px 0;
            font-size: 16px;
        }
        .btn {
            display: inline-block;
            background: #3182ce;
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 6px;
            font-weight: bold;
            transition: background 0.3s;
        }
        .btn:hover {
            background: #2b6cb0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Xin Chào! Chào mừng đến với Node.js Server</h1>
        <p class="greeting">Chào mừng thầy cô và các bạn đã ghé thăm trang web!</p>
        <div class="card">
            <p><strong>Mã sinh viên:</strong> CDCNTT18B10</p>
            <p><strong>Họ và tên:</strong> Hồ Sỹ Ngọc Hải</p>
            <p><strong>Lớp:</strong> CĐ-CNTT18B</p>
        </div>
        <a href="/about" class="btn">Xem giới thiệu bản thân (/about) &rarr;</a>
    </div>
</body>
</html>
        `);
    } else if (url === '/about') {
        // Khi truy cập /about, hiển thị thông tin giới thiệu bản thân
        res.writeHead(200);
        res.end(`
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Giới thiệu bản thân - About</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0;
            color: #333;
        }
        .container {
            background: #ffffff;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            max-width: 520px;
            width: 90%;
        }
        h1 {
            color: #2c7a7b;
            text-align: center;
            margin-bottom: 25px;
            font-size: 24px;
        }
        .info-list {
            list-style: none;
            padding: 0;
            margin: 0 0 25px 0;
        }
        .info-list li {
            padding: 12px 16px;
            border-bottom: 1px solid #e2e8f0;
            font-size: 15px;
            display: flex;
            justify-content: space-between;
        }
        .info-list li:last-child {
            border-bottom: none;
        }
        .label {
            font-weight: 600;
            color: #4a5568;
        }
        .value {
            color: #1a202c;
            text-align: right;
        }
        .bio {
            background: #f7fafc;
            border-left: 4px solid #38b2ac;
            padding: 14px;
            border-radius: 4px;
            font-size: 14px;
            line-height: 1.6;
            color: #4a5568;
            margin-bottom: 25px;
        }
        .text-center {
            text-align: center;
        }
        .btn {
            display: inline-block;
            background: #38b2ac;
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 6px;
            font-weight: bold;
            transition: background 0.3s;
        }
        .btn:hover {
            background: #2c7a7b;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Thông Tin Giới Thiệu Bản Thân</h1>
        <ul class="info-list">
            <li><span class="label">Họ và tên:</span> <span class="value">Hồ Sỹ Ngọc Hải</span></li>
            <li><span class="label">Mã sinh viên:</span> <span class="value">CDCNTT18B10</span></li>
            <li><span class="label">Lớp:</span> <span class="value">CĐ-CNTT18B</span></li>
            <li><span class="label">Chuyên ngành:</span> <span class="value">Công nghệ Thông tin</span></li>
            <li><span class="label">Môn học:</span> <span class="value">Lập trình Node.js</span></li>
            <li><span class="label">Sở thích:</span> <span class="value">Lập trình, công nghệ, nghiên cứu phần mềm</span></li>
        </ul>
        <div class="bio">
            Xin chào! Tôi là sinh viên thuộc lớp CĐ-CNTT18B. Đây là trang giới thiệu cá nhân được phát triển bằng Web Server Node.js phục vụ cho môn học.
        </div>
        <div class="text-center">
            <a href="/" class="btn">&larr; Quay lại trang chủ (/)</a>
        </div>
    </div>
</body>
</html>
        `);
    } else {
        // Khi truy cập đường dẫn không tồn tại, trả về mã trạng thái HTTP 404
        res.writeHead(404);
        res.end(`
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 Not Found</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #f7fafc;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            text-align: center;
        }
        .box {
            background: white;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            max-width: 420px;
            width: 90%;
        }
        h1 { font-size: 64px; color: #e53e3e; margin: 0; }
        h2 { font-size: 22px; color: #2d3748; margin: 10px 0; }
        p { color: #718096; margin-bottom: 25px; }
        .btn {
            display: inline-block;
            background: #4299e1;
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 6px;
            font-weight: bold;
        }
        .btn:hover { background: #3182ce; }
    </style>
</head>
<body>
    <div class="box">
        <h1>404</h1>
        <h2>Trang Không Tồn Tại</h2>
        <p>Đường dẫn <code>${req.url}</code> không tìm thấy trên máy chủ.</p>
        <a href="/" class="btn">Quay lại Trang Chủ</a>
    </div>
</body>
</html>
        `);
    }
});

server.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`[Bài 2] Web Server đang chạy tại cổng: ${PORT}`);
    console.log(`- Trang chủ: http://localhost:${PORT}`);
    console.log(`- Giới thiệu: http://localhost:${PORT}/about`);
    console.log(`======================================================\n`);
});
