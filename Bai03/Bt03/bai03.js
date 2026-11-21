
const fs = require('fs');
const path = require('path');

// Đường dẫn tập tin thongtin.txt (cùng thư mục với bai03.js)
const filePath = path.join(__dirname, 'thongtin.txt');

// Dữ liệu ban đầu: Họ tên và mã sinh viên
const thongTinBanDau = 'Họ và tên: Hồ Sỹ Ngọc Hải\nMã sinh viên: CDCNTT18B10\n';

// Dữ liệu ghi nối thêm: Tên lớp
const thongTinLop = 'Lớp: CĐ-CNTT18B\n';

// 1. Tạo tập tin thongtin.txt chứa họ tên và mã sinh viên
fs.writeFile(filePath, thongTinBanDau, 'utf8', (err) => {
    if (err) {
        console.error('Lỗi khi tạo tập tin:', err);
        return;
    }

    // 2. Đọc và hiển thị nội dung tập tin lên Terminal
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Lỗi khi đọc tập tin:', err);
            return;
        }
        
        console.log('--- NỘI DUNG TẬP TIN BAN ĐẦU ---');
        console.log(data.trim());

        // 3. Ghi nối thêm tên lớp vào cuối tập tin bằng appendFile()
        fs.appendFile(filePath, thongTinLop, 'utf8', (err) => {
            if (err) {
                console.error('Lỗi khi ghi nối thêm tập tin:', err);
                return;
            }

            // 4. Đọc lại tập tin để chứng minh nội dung đã được cập nhật
            fs.readFile(filePath, 'utf8', (err, updatedData) => {
                if (err) {
                    console.error('Lỗi khi đọc lại tập tin:', err);
                    return;
                }

                console.log('\n--- NỘI DUNG TẬP TIN SAU KHI CẬP NHẬT (APPEND) ---');
                console.log(updatedData.trim());
            });
        });
    });
});