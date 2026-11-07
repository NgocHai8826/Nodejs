const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

  res.write(`
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ứng dụng Node.js - Hồ Sỹ Ngọc Hải</title>
        <!-- Google Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
        <style>
            * {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
            }
            body {
                font-family: 'Inter', sans-serif;
                background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
                height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #1e293b;
            }
            .card {
                background: #ffffff;
                padding: 40px;
                border-radius: 16px;
                box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                text-align: center;
                max-width: 450px;
                width: 90%;
                animation: fadeIn 0.8s ease-in-out;
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .badge {
                display: inline-block;
                background: #e0e7ff;
                color: #4338ca;
                font-size: 12px;
                font-weight: 600;
                padding: 6px 12px;
                border-radius: 20px;
                margin-bottom: 16px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            h1 {
                color: #0f172a;
                font-size: 22px;
                font-weight: 700;
                margin-bottom: 20px;
                line-height: 1.4;
            }
            .info-box {
                background: #f8fafc;
                border: 1px solid #e2e8f0;
                border-radius: 10px;
                padding: 16px;
                text-align: left;
                margin-top: 15px;
            }
            p {
                font-size: 15px;
                color: #475569;
                margin: 8px 0;
            }
            p b {
                color: #334155;
            }
        </style>
    </head>
    <body>
        <div class="card">
            <span class="badge">Node.js Server</span>
            <h1>Chào mừng bạn đến với ứng dụng của tôi!</h1>
            <div class="info-box">
                <p><b>Họ và tên:</b> Hồ Sỹ Ngọc Hải</p>
                <p><b>Mã sinh viên:</b> (Nhập mã sinh viên của bạn vào đây)</p>
            </div>
        </div>
    </body>
    </html>
  `);

  res.end();
});

server.listen(PORT, () => {
  console.log(`Server đang chạy tại địa chỉ: http://localhost:${PORT}`);
});