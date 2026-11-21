const { MongoClient } = require('mongodb');

// Mã màu ANSI cho giao diện Terminal
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

// URL kết nối tới MongoDB local
const url = 'mongodb://localhost:27017/';
const client = new MongoClient(url);

// Database riêng biệt cho Bài 9 để chạy và nộp độc lập
const dbName = 'qlsinhvien_bt09';
const collectionName = 'students_test';

async function run() {
    try {
        // 1. Kết nối MongoDB
        await client.connect();

        // In Banner cá nhân hóa bài tập
        console.log('\n' + c.cyan + '╔══════════════════════════════════════════════════════════════════════╗' + c.reset);
        console.log(c.cyan + '║' + c.bold + c.white + '               BÀI TẬP 09: XÓA DỮ LIỆU CÓ ĐIỀU KIỆN MONGODB           ' + c.reset + c.cyan + '║' + c.reset);
        console.log(c.cyan + '║' + c.gray + '  Sinh viên: ' + c.green + c.bold + 'Hồ Sỹ Ngọc Hải' + c.reset + c.gray + '  │  MSSV: ' + c.yellow + 'CDCNTT18B10' + c.reset + c.gray + '  │  Lớp: ' + c.blue + 'CĐ-CNTT18B' + c.reset + c.gray + '  ' + c.cyan + '║' + c.reset);
        console.log(c.cyan + '╚══════════════════════════════════════════════════════════════════════╝' + c.reset + '\n');

        console.log(`${c.green}✔ Đã kết nối thành công tới MongoDB Server!${c.reset}`);
        console.log(`${c.gray}➔ Database riêng:${c.reset} ${c.yellow}${c.bold}'${dbName}'${c.reset} ${c.gray}│ Collection:${c.reset} ${c.cyan}'${collectionName}'${c.reset}\n`);

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Chuẩn bị dữ liệu ít nhất 5 sinh viên mẫu
        const danhSachMau = [
            { masv: 'CDCNTT18B10', hoten: 'Hồ Sỹ Ngọc Hải', tuoi: 20, diem: 8.5 },
            { masv: 'CDCNTT18B01', hoten: 'Nguyễn Văn An', tuoi: 20, diem: 7.0 },
            { masv: 'CDCNTT18B02', hoten: 'Trần Thị Bình', tuoi: 19, diem: 6.5 },
            { masv: 'CDCNTT18B05', hoten: 'Lê Văn Tèo', tuoi: 22, diem: 5.5 },
            { masv: 'CDCNTT18B09', hoten: 'Phạm Thị Duyên', tuoi: 19, diem: 4.0 },
            { masv: 'CDCNTT18B12', hoten: 'Hoàng Văn Em', tuoi: 20, diem: 3.5 }
        ];

        // Dọn dẹp dữ liệu cũ (nếu có) và nạp lại để đảm bảo tính độc lập khi chạy lại nhiều lần
        await collection.deleteMany({});
        const insertResult = await collection.insertMany(danhSachMau);
        console.log(`${c.yellow}${c.bold}▶ [Bước 1] Đã khởi tạo thành công ${insertResult.insertedCount} sinh viên mẫu ban đầu:${c.reset}`);
        console.log(c.gray + '─'.repeat(70) + c.reset);
        danhSachMau.forEach((sv, idx) => {
            console.log(`   ${c.bold}${idx + 1}.${c.reset} Mã SV: ${c.cyan}${sv.masv}${c.reset} │ Họ tên: ${c.white}${sv.hoten}${c.reset} │ Tuổi: ${sv.tuoi} │ Điểm: ${c.yellow}${sv.diem}${c.reset}`);
        });
        console.log(c.gray + '─'.repeat(70) + c.reset);

        // 2. Dùng deleteOne() xóa một sinh viên theo mã sinh viên (masv: 'CDCNTT18B05')
        const maXoa = 'CDCNTT18B05';
        const deleteOneResult = await collection.deleteOne({ masv: maXoa });
        console.log(`\n${c.yellow}${c.bold}▶ [Bước 2] Thực hiện xóa 1 sinh viên có mã '${maXoa}' bằng deleteOne():${c.reset}`);
        console.log(`   ${c.green}✔ Số bản ghi đã xóa thành công:${c.reset} ${c.bold}${deleteOneResult.deletedCount}${c.reset}`);

        // 3. Dùng deleteMany() xóa các sinh viên có điểm dưới 5 (diem < 5)
        const deleteManyResult = await collection.deleteMany({ diem: { $lt: 5 } });
        console.log(`\n${c.yellow}${c.bold}▶ [Bước 3] Thực hiện xóa các sinh viên có điểm < 5 bằng deleteMany():${c.reset}`);
        console.log(`   ${c.green}✔ Số bản ghi đã xóa thành công:${c.reset} ${c.bold}${deleteManyResult.deletedCount}${c.reset}`);

        // 4. Hiển thị danh sách sinh viên còn lại bằng find()
        console.log(`\n${c.yellow}${c.bold}▶ [Bước 4] Danh sách sinh viên còn lại trong collection sau khi xóa:${c.reset}`);
        console.log(c.gray + '─'.repeat(70) + c.reset);
        const remainingStudents = await collection.find({}).toArray();
        if (remainingStudents.length === 0) {
            console.log('   Không còn sinh viên nào trong danh sách.');
        } else {
            remainingStudents.forEach((sv, idx) => {
                console.log(`   ${c.bold}${idx + 1}.${c.reset} Mã SV: ${c.cyan}${sv.masv}${c.reset} │ Họ tên: ${c.white}${sv.hoten}${c.reset} │ Tuổi: ${sv.tuoi} │ Điểm: ${c.green}${c.bold}${sv.diem}${c.reset}`);
            });
        }
        console.log(c.gray + '─'.repeat(70) + c.reset);
        console.log(`   ${c.cyan}Tổng số sinh viên còn lại:${c.reset} ${c.bold}${remainingStudents.length}${c.reset}`);

        console.log(`\n${c.yellow}${c.bold}▶ BẢNG TỔNG HỢP DỮ LIỆU CÒN LẠI (CONSOLE.TABLE):${c.reset}`);
        console.table(remainingStudents.map(s => ({
            'Mã SV': s.masv,
            'Họ và tên': s.hoten,
            'Tuổi': s.tuoi,
            'Điểm': s.diem
        })));

        console.log(`${c.green}${c.bold}✔ Hoàn tất toàn bộ các thao tác của Bài tập 09 thành công!${c.reset}\n`);

    } catch (err) {
        console.error(c.red + '✖ Đã xảy ra lỗi trong quá trình thực thi:' + c.reset, err);
    } finally {
        // Đóng kết nối
        await client.close();
        console.log(`${c.gray}-> Đã đóng kết nối MongoDB an toàn.${c.reset}\n`);
    }
}

run();
