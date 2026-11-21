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

// Database riêng biệt cho Bài 10 để chạy và nộp độc lập
const dbName = 'qlsinhvien_bt10';
const departmentsCol = 'departments';
const studentsCol = 'students_join';

async function run() {
    try {
        // 1. Kết nối cơ sở dữ liệu MongoDB
        await client.connect();

        // In Banner cá nhân hóa bài tập
        console.log('\n' + c.cyan + '╔══════════════════════════════════════════════════════════════════════╗' + c.reset);
        console.log(c.cyan + '║' + c.bold + c.white + '         BÀI TẬP 10: LIÊN KẾT HAI COLLECTION MONGODB ($LOOKUP)         ' + c.reset + c.cyan + '║' + c.reset);
        console.log(c.cyan + '║' + c.gray + '  Sinh viên: ' + c.green + c.bold + 'Hồ Sỹ Ngọc Hải' + c.reset + c.gray + '  │  MSSV: ' + c.yellow + 'CDCNTT18B10' + c.reset + c.gray + '  │  Lớp: ' + c.blue + 'CĐ-CNTT18B' + c.reset + c.gray + '  ' + c.cyan + '║' + c.reset);
        console.log(c.cyan + '╚══════════════════════════════════════════════════════════════════════╝' + c.reset + '\n');

        console.log(`${c.green}✔ Đã kết nối thành công tới MongoDB Server!${c.reset}`);
        console.log(`${c.gray}➔ Database riêng:${c.reset} ${c.yellow}${c.bold}'${dbName}'${c.reset}\n`);

        const db = client.db(dbName);
        const colDepartments = db.collection(departmentsCol);
        const colStudents = db.collection(studentsCol);

        // 2. Dữ liệu mẫu các khoa (ít nhất 2 khoa)
        const danhSachKhoa = [
            { makhoa: 'CNTT', tenkhoa: 'Công nghệ thông tin' },
            { makhoa: 'QTKD', tenkhoa: 'Quản trị kinh doanh' },
            { makhoa: 'KT', tenkhoa: 'Kế toán tài chính' }
        ];

        // 3. Dữ liệu mẫu sinh viên (ít nhất 4 sinh viên)
        const danhSachSinhVien = [
            { masv: 'CDCNTT18B10', hoten: 'Hồ Sỹ Ngọc Hải', makhoa: 'CNTT' },
            { masv: 'CDCNTT18B01', hoten: 'Nguyễn Văn An', makhoa: 'CNTT' },
            { masv: 'CDQTKD18B01', hoten: 'Trần Thị Bình', makhoa: 'QTKD' },
            { masv: 'CDKT18B01', hoten: 'Lê Hoàng Cường', makhoa: 'KT' }
        ];

        // Dọn dẹp dữ liệu cũ và nạp lại để đảm bảo tính độc lập khi chạy lại nhiều lần
        await colDepartments.deleteMany({});
        await colStudents.deleteMany({});

        await colDepartments.insertMany(danhSachKhoa);
        await colStudents.insertMany(danhSachSinhVien);

        console.log(`${c.yellow}${c.bold}▶ [Bước 1] Đã khởi tạo ${danhSachKhoa.length} khoa trong collection '${departmentsCol}':${c.reset}`);
        danhSachKhoa.forEach(k => console.log(`   + [${c.cyan}${k.makhoa}${c.reset}] ${c.white}${k.tenkhoa}${c.reset}`));

        console.log(`\n${c.yellow}${c.bold}▶ [Bước 2] Đã khởi tạo ${danhSachSinhVien.length} sinh viên trong collection '${studentsCol}':${c.reset}`);
        danhSachSinhVien.forEach(sv => console.log(`   + Mã SV: ${c.cyan}${sv.masv}${c.reset} │ Họ tên: ${c.white}${sv.hoten}${c.reset} │ Mã khoa: ${c.yellow}${sv.makhoa}${c.reset}`));

        // 4. Sử dụng aggregate() kết hợp $lookup để liên kết sinh viên với khoa qua makhoa
        const pipeline = [
            {
                $lookup: {
                    from: departmentsCol,
                    localField: 'makhoa',
                    foreignField: 'makhoa',
                    as: 'thongTinKhoa'
                }
            },
            {
                // Mở rộng mảng thongTinKhoa thành đối tượng
                $unwind: {
                    path: '$thongTinKhoa',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                // Chọn các trường hiển thị: bao gồm mã khoa và tên khoa
                $project: {
                    _id: 0,
                    masv: 1,
                    hoten: 1,
                    makhoa: 1,
                    tenkhoa: { $ifNull: ['$thongTinKhoa.tenkhoa', 'Chưa xác định'] }
                }
            }
        ];

        console.log(`\n${c.yellow}${c.bold}▶ [Bước 3] Thực thi lệnh aggregate() với $lookup liên kết sinh viên và khoa...${c.reset}`);
        const ketQuaJoin = await colStudents.aggregate(pipeline).toArray();

        // 5. Hiển thị danh sách sinh viên kèm tên khoa tương ứng
        console.log(`\n${c.yellow}${c.bold}▶ [Bước 4] KẾT QUẢ DANH SÁCH SINH VIÊN KÈM TÊN KHOA TƯƠNG ỨNG:${c.reset}`);
        console.log(c.gray + '─'.repeat(70) + c.reset);
        ketQuaJoin.forEach((sv, index) => {
            console.log(`   ${c.bold}${index + 1}.${c.reset} Mã SV: ${c.cyan}${sv.masv}${c.reset} │ Họ tên: ${c.white}${sv.hoten}${c.reset}`);
            console.log(`      ${c.gray}└─ Tên khoa:${c.reset} ${c.green}${c.bold}${sv.tenkhoa}${c.reset} ${c.gray}(Mã khoa: ${sv.makhoa})${c.reset}`);
        });
        console.log(c.gray + '─'.repeat(70) + c.reset);

        console.log(`\n${c.yellow}${c.bold}▶ BẢNG TỔNG HỢP LIÊN KẾT DỮ LIỆU (CONSOLE.TABLE):${c.reset}`);
        console.table(ketQuaJoin.map(item => ({
            'Mã SV': item.masv,
            'Họ và tên': item.hoten,
            'Mã khoa': item.makhoa,
            'Tên khoa': item.tenkhoa
        })));

        console.log(`${c.green}${c.bold}✔ Hoàn tất toàn bộ các thao tác của Bài tập 10 thành công!${c.reset}\n`);

    } catch (err) {
        console.error(c.red + '✖ Đã xảy ra lỗi trong quá trình thực thi:' + c.reset, err);
    } finally {
        // Đóng kết nối MongoDB
        await client.close();
        console.log(`${c.gray}-> Đã đóng kết nối MongoDB an toàn.${c.reset}\n`);
    }
}

run();
