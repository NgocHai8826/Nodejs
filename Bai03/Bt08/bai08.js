const fs = require('fs');
const path = require('path');

// Mã màu ANSI cho Terminal
const c = {
    reset: '\x1b[0m',
    bold: '\x1b[1m',
    dim: '\x1b[2m',
    cyan: '\x1b[36m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    red: '\x1b[31m',
    gray: '\x1b[90m',
    white: '\x1b[37m'
};

// Định nghĩa đường dẫn thư mục và các tập tin
const dataDir = path.join(__dirname, 'data');
const ghichuPath = path.join(dataDir, 'ghichu.txt');
const ghichuMoiPath = path.join(dataDir, 'ghichu_moi.txt');
const tamPath = path.join(dataDir, 'tam.txt');

// Dữ liệu ít nhất 3 dòng nội dung cần ghi
const noiDungGhiChu = [
    '1. Sinh viên: Hồ Sỹ Ngọc Hải - MSSV: CDCNTT18B10 - Lớp: CĐ-CNTT18B',
    '2. Môn học: Lập trình Node.js - Bài thực hành 03: File System',
    '3. Nội dung: Quản lý thư mục và tập tin bằng module fs trong Node.js'
].join('\n') + '\n';

// In Banner cá nhân hóa bài tập
console.log('\n' + c.cyan + '╔══════════════════════════════════════════════════════════════════════╗' + c.reset);
console.log(c.cyan + '║' + c.bold + c.white + '               BÀI TẬP 08: QUẢN LÝ TẬP TIN VỚI FILE SYSTEM            ' + c.reset + c.cyan + '║' + c.reset);
console.log(c.cyan + '║' + c.gray + '  Sinh viên: ' + c.green + c.bold + 'Hồ Sỹ Ngọc Hải' + c.reset + c.gray + '  │  MSSV: ' + c.yellow + 'CDCNTT18B10' + c.reset + c.gray + '  │  Lớp: ' + c.blue + 'CĐ-CNTT18B' + c.reset + c.gray + '  ' + c.cyan + '║' + c.reset);
console.log(c.cyan + '╚══════════════════════════════════════════════════════════════════════╝' + c.reset + '\n');

// 1. Tạo thư mục data nếu chưa tồn tại
fs.mkdir(dataDir, { recursive: true }, (err) => {
    if (err) {
        console.error(c.red + '✖ Lỗi khi tạo thư mục data:' + c.reset, err);
        return;
    }
    console.log(`${c.green}✔ [Bước 1]${c.reset} ${c.bold}Đã tạo thư mục 'data' thành công!${c.reset}`);

    // 2. Ghi ít nhất 3 dòng nội dung vào tập tin ghichu.txt
    fs.writeFile(ghichuPath, noiDungGhiChu, 'utf8', (err) => {
        if (err) {
            console.error(c.red + '✖ Lỗi khi tạo và ghi tập tin ghichu.txt:' + c.reset, err);
            return;
        }
        console.log(`${c.green}✔ [Bước 2]${c.reset} ${c.bold}Đã tạo tập tin 'ghichu.txt' và ghi 3 dòng nội dung thành công!${c.reset}`);

        // 3. Đổi tên tập tin thành ghichu_moi.txt bằng fs.rename()
        fs.rename(ghichuPath, ghichuMoiPath, (err) => {
            if (err) {
                console.error(c.red + '✖ Lỗi khi đổi tên tập tin:' + c.reset, err);
                return;
            }
            console.log(`${c.green}✔ [Bước 3]${c.reset} ${c.bold}Đã đổi tên tập tin 'ghichu.txt' ➔ 'ghichu_moi.txt' bằng fs.rename() thành công!${c.reset}`);

            // 4. Đọc và hiển thị nội dung sau khi đổi tên bằng fs.readFile()
            fs.readFile(ghichuMoiPath, 'utf8', (err, data) => {
                if (err) {
                    console.error(c.red + '✖ Lỗi khi đọc tập tin ghichu_moi.txt:' + c.reset, err);
                    return;
                }
                console.log(`\n${c.yellow}▶ [Bước 4] Đọc nội dung tập tin 'ghichu_moi.txt' sau khi đổi tên:${c.reset}`);
                console.log(c.gray + '┌' + '─'.repeat(70) + '┐' + c.reset);
                data.trim().split('\n').forEach(line => {
                    const padLen = Math.max(0, 68 - line.length);
                    console.log(`${c.gray}│${c.reset} ${c.white}${line}${' '.repeat(padLen)}${c.gray}│${c.reset}`);
                });
                console.log(c.gray + '└' + '─'.repeat(70) + '┘' + c.reset);

                // 5. Tạo tập tin tam.txt
                const noiDungTam = 'Tập tin tạm thời phục vụ kiểm tra xóa bằng fs.unlink()';
                fs.writeFile(tamPath, noiDungTam, 'utf8', (err) => {
                    if (err) {
                        console.error(c.red + '✖ Lỗi khi tạo tập tin tam.txt:' + c.reset, err);
                        return;
                    }
                    console.log(`\n${c.green}✔ [Bước 5]${c.reset} ${c.bold}Đã tạo tập tin tạm 'tam.txt' thành công!${c.reset}`);

                    // 6. Xóa tập tin tam.txt bằng fs.unlink()
                    fs.unlink(tamPath, (err) => {
                        if (err) {
                            console.error(c.red + '✖ Lỗi khi xóa tập tin tam.txt:' + c.reset, err);
                            return;
                        }
                        console.log(`${c.green}✔ [Bước 6]${c.reset} ${c.bold}Đã xóa tập tin 'tam.txt' bằng fs.unlink() thành công!${c.reset}`);
                        console.log(`\n${c.green}${c.bold}✔ Hoàn tất toàn bộ các thao tác của Bài tập 08 thành công!${c.reset}\n`);
                    });
                });
            });
        });
    });
});
