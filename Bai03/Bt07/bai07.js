const http = require('http');
const { URL } = require('url');

const PORT = 3001;

// Thông tin sinh viên thực hiện
const SINH_VIEN = {
    hoten: 'Hồ Sỹ Ngọc Hải',
    masv: 'CDCNTT18B10',
    lop: 'CĐ-CNTT18B'
};

// Mã màu ANSI cho Terminal
const c = {
    reset: '\x1b[0m',
    bold: '\x1b[1m',
    cyan: '\x1b[36m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    gray: '\x1b[90m',
    white: '\x1b[37m'
};

// Hàm render giao diện HTML/CSS cá nhân hóa cho sinh viên
function renderPage({ title, heading, content, type = 'info', showBack = true }) {
    const isError = type === 'error';
    const isSuccess = type === 'success';

    return `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - ${SINH_VIEN.hoten} (${SINH_VIEN.masv})</title>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }
        body {
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px 16px;
            color: #334155;
        }
        .container {
            background: #ffffff;
            border-radius: 20px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.45);
            width: 100%;
            max-width: 560px;
            overflow: hidden;
            animation: fadeIn 0.35s ease-out;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(12px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .header {
            background: ${isError ? 'linear-gradient(135deg, #ef4444, #991b1b)' : (isSuccess ? 'linear-gradient(135deg, #059669, #065f46)' : 'linear-gradient(135deg, #2563eb, #1e40af)')};
            color: #ffffff;
            padding: 26px 24px;
            text-align: center;
            position: relative;
        }
        .author-badge {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            background: rgba(255, 255, 255, 0.16);
            backdrop-filter: blur(8px);
            padding: 6px 16px;
            border-radius: 9999px;
            font-size: 13px;
            margin-bottom: 12px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            font-weight: 500;
        }
        .author-badge span.dot {
            width: 8px;
            height: 8px;
            background-color: #4ade80;
            border-radius: 50%;
            display: inline-block;
            box-shadow: 0 0 8px #4ade80;
        }
        .header h1 {
            font-size: 22px;
            font-weight: 800;
            letter-spacing: -0.5px;
            margin-bottom: 6px;
        }
        .header p {
            font-size: 13px;
            opacity: 0.9;
        }
        .body {
            padding: 28px 24px;
        }
        .links-list {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 14px;
            margin-top: 14px;
        }
        .link-card {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #f8fafc;
            border: 2px solid #e2e8f0;
            border-radius: 14px;
            padding: 16px 20px;
            text-decoration: none;
            color: #1e293b;
            font-weight: 600;
            transition: all 0.25s ease;
        }
        .link-card:hover {
            border-color: #3b82f6;
            background: #eff6ff;
            transform: translateY(-2px);
            box-shadow: 0 8px 16px rgba(59, 130, 246, 0.15);
        }
        .link-card.primary {
            border-color: #bfdbfe;
            background: #f0f7ff;
        }
        .link-info {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }
        .link-title {
            font-size: 17px;
            color: #0f172a;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .link-url {
            font-size: 12.5px;
            color: #64748b;
            font-family: 'Consolas', 'Courier New', Courier, monospace;
            font-weight: normal;
        }
        .badge {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: #dbeafe;
            color: #1e40af;
            font-size: 12px;
            font-weight: 700;
            width: 24px;
            height: 24px;
            border-radius: 50%;
        }
        .arrow {
            font-size: 20px;
            color: #3b82f6;
            transition: transform 0.2s ease;
        }
        .link-card:hover .arrow {
            transform: translateX(4px);
        }
        .result-box {
            background: #f8fafc;
            border-radius: 14px;
            border: 2px dashed #cbd5e1;
            padding: 28px 20px;
            text-align: center;
            margin-bottom: 22px;
        }
        .result-title {
            color: #64748b;
            font-size: 13px;
            margin-bottom: 12px;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            font-weight: 600;
        }
        .result-value {
            font-size: 28px;
            font-weight: 800;
            color: ${isError ? '#dc2626' : (isSuccess ? '#059669' : '#0f172a')};
            word-break: break-word;
        }
        .result-sub {
            margin-top: 10px;
            font-size: 14px;
            color: #64748b;
        }
        .error-message {
            color: #991b1b;
            font-size: 15px;
            line-height: 1.6;
            padding: 18px 20px;
            background: #fef2f2;
            border: 1px solid #fecaca;
            border-radius: 12px;
            margin-bottom: 22px;
            display: flex;
            align-items: flex-start;
            gap: 12px;
        }
        .btn-back {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            width: 100%;
            padding: 13px 18px;
            background: #2563eb;
            color: #ffffff;
            text-decoration: none;
            border-radius: 12px;
            font-weight: 600;
            font-size: 14px;
            transition: all 0.2s ease;
        }
        .btn-back:hover {
            background: #1d4ed8;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
        }
        .footer {
            border-top: 1px solid #f1f5f9;
            padding: 14px 24px;
            background: #fafafa;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 12px;
            color: #64748b;
        }
        .footer-tag {
            font-weight: 600;
            color: #3b82f6;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="author-badge">
                <span class="dot"></span>
                <span>${SINH_VIEN.hoten} • ${SINH_VIEN.masv} • ${SINH_VIEN.lop}</span>
            </div>
            <h1>${heading}</h1>
            <p>Node.js Web Server — Cổng ${PORT}</p>
        </div>
        <div class="body">
            ${content}
            ${showBack ? '<a href="/" class="btn-back">⬅ Quay lại Trang chủ</a>' : ''}
        </div>
        <div class="footer">
            <span>Bài thực hành 03 - Node.js</span>
            <span class="footer-tag">${SINH_VIEN.masv}</span>
        </div>
    </div>
</body>
</html>`;
}

const server = http.createServer((req, res) => {
    // Thiết lập response header UTF-8 để hiển thị HTML và tiếng Việt chuẩn
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    // Phân tích URL bằng đối tượng URL
    const baseURL = `http://${req.headers.host || 'localhost:' + PORT}`;
    const parsedUrl = new URL(req.url, baseURL);
    const pathname = parsedUrl.pathname;
    const searchParams = parsedUrl.searchParams;

    // 1. Tuyến đường /hello?name=...
    if (pathname === '/hello') {
        const name = searchParams.get('name');

        if (!name || name.trim() === '') {
            res.statusCode = 400;
            const html = renderPage({
                title: 'Lỗi tham số',
                heading: 'Thông Báo Lỗi',
                type: 'error',
                content: `
                    <div class="error-message">
                        <span style="font-size: 20px;">⚠️</span>
                        <div>
                            <strong>Lỗi:</strong> Thiếu tham số <code>name</code> hoặc giá trị rỗng!<br>
                            <small style="color: #64748b;">(Ví dụ đúng: <a href="/hello?name=Hồ%20Sỹ%20Ngọc%20Hải" style="color: #2563eb; font-weight: 600;">/hello?name=Hồ Sỹ Ngọc Hải</a> hoặc <a href="/hello?name=Minh" style="color: #2563eb; font-weight: 600;">/hello?name=Minh</a>)</small>
                        </div>
                    </div>
                `
            });
            res.end(html);
            return;
        }

        const isOwner = name.trim().toLowerCase() === SINH_VIEN.hoten.toLowerCase();

        res.statusCode = 200;
        const html = renderPage({
            title: `Xin chào ${name}`,
            heading: 'Kết Quả Xử Lý Tham Số URL',
            type: 'success',
            content: `
                <div class="result-box">
                    <div class="result-title">Lời chào từ Server</div>
                    <div class="result-value">Xin chào ${name}</div>
                    ${isOwner ? `<div class="result-sub" style="color: #059669; font-weight: 600;">⭐ Chào mừng tác giả bài làm: ${SINH_VIEN.hoten} (${SINH_VIEN.masv})</div>` : ''}
                </div>
            `
        });
        res.end(html);
        return;
    }

    // 2. Tuyến đường /sum?a=...&b=...
    if (pathname === '/sum') {
        const paramA = searchParams.get('a');
        const paramB = searchParams.get('b');

        // Kiểm tra xem có truyền đủ hai tham số không
        if (paramA === null || paramB === null || paramA.trim() === '' || paramB.trim() === '') {
            res.statusCode = 400;
            const html = renderPage({
                title: 'Lỗi tham số',
                heading: 'Thông Báo Lỗi',
                type: 'error',
                content: `
                    <div class="error-message">
                        <span style="font-size: 20px;">⚠️</span>
                        <div>
                            <strong>Lỗi:</strong> Thiếu tham số! Vui lòng truyền đủ cả hai tham số <code>a</code> và <code>b</code>.<br>
                            <small style="color: #64748b;">(Ví dụ đúng: <a href="/sum?a=10&b=20" style="color: #2563eb; font-weight: 600;">/sum?a=10&b=20</a>)</small>
                        </div>
                    </div>
                `
            });
            res.end(html);
            return;
        }

        const numA = Number(paramA);
        const numB = Number(paramB);

        // Kiểm tra tính hợp lệ của số
        if (isNaN(numA) || isNaN(numB)) {
            res.statusCode = 400;
            const html = renderPage({
                title: 'Lỗi giá trị',
                heading: 'Thông Báo Lỗi',
                type: 'error',
                content: `
                    <div class="error-message">
                        <span style="font-size: 20px;">⚠️</span>
                        <div>
                            <strong>Lỗi:</strong> Giá trị của tham số <code>a</code> và <code>b</code> phải là số hợp lệ!
                        </div>
                    </div>
                `
            });
            res.end(html);
            return;
        }

        const tong = numA + numB;
        res.statusCode = 200;
        const html = renderPage({
            title: `Tổng = ${tong}`,
            heading: 'Kết Quả Tính Toán',
            type: 'success',
            content: `
                <div class="result-box">
                    <div class="result-title">Phép tính: ${numA} + ${numB}</div>
                    <div class="result-value">Tổng = ${tong}</div>
                    <div class="result-sub">Tính toán hoàn tất thành công</div>
                </div>
            `
        });
        res.end(html);
        return;
    }

    // Trang chủ hiển thị liên kết trực quan chuyển tiếp
    if (pathname === '/') {
        res.statusCode = 200;
        const html = renderPage({
            title: 'Trang chủ',
            heading: 'Web Server Node.js',
            showBack: false,
            content: `
                <p style="color: #475569; font-size: 15px; margin-bottom: 16px;">
                    Các đường dẫn kiểm tra:
                </p>
                <ul class="links-list">
                    <li>
                        <a href="/hello?name=Minh" class="link-card">
                            <div class="link-info">
                                <span class="link-title">
                                    <span class="badge">1</span> Tên
                                </span>
                                <span class="link-url">/hello?name=Minh</span>
                            </div>
                            <span class="arrow">➜</span>
                        </a>
                    </li>
                    <li>
                        <a href="/sum?a=10&b=20" class="link-card">
                            <div class="link-info">
                                <span class="link-title">
                                    <span class="badge">2</span> Tổng
                                </span>
                                <span class="link-url">/sum?a=10&b=20</span>
                            </div>
                            <span class="arrow">➜</span>
                        </a>
                    </li>
                </ul>
            `
        });
        res.end(html);
        return;
    }

    // Các đường dẫn khác
    res.statusCode = 404;
    const html = renderPage({
        title: '404 Không tìm thấy',
        heading: 'Lỗi 404',
        type: 'error',
        content: `
            <div class="error-message">
                <span style="font-size: 20px;">⚠️</span>
                <div>Đường dẫn bạn yêu cầu không tồn tại trên hệ thống!</div>
            </div>
        `
    });
    res.end(html);
});

server.listen(PORT, () => {
    console.log('\n' + c.cyan + '╔══════════════════════════════════════════════════════════════════════╗' + c.reset);
    console.log(c.cyan + '║' + c.bold + c.white + '               BÀI TẬP 07: WEB SERVER XỬ LÝ THAM SỐ URL               ' + c.reset + c.cyan + '║' + c.reset);
    console.log(c.cyan + '║' + c.gray + '  Sinh viên: ' + c.green + c.bold + SINH_VIEN.hoten + c.reset + c.gray + '  │  MSSV: ' + c.yellow + SINH_VIEN.masv + c.reset + c.gray + '  │  Lớp: ' + c.blue + SINH_VIEN.lop + c.reset + c.gray + '  ' + c.cyan + '║' + c.reset);
    console.log(c.cyan + '╚══════════════════════════════════════════════════════════════════════╝' + c.reset);
    console.log(`${c.green}✔ Web Server đang hoạt động tại:${c.reset} ${c.yellow}${c.bold}http://localhost:${PORT}${c.reset}`);
    console.log(`${c.cyan}▶ Các liên kết kiểm tra:${c.reset}`);
    console.log(`   1. [Tên]:  http://localhost:${PORT}/hello?name=Minh`);
    console.log(`   2. [Tổng]: http://localhost:${PORT}/sum?a=10&b=20\n`);
});
