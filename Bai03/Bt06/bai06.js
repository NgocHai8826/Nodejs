const { tinhDiemTrungBinh, xepLoai } = require('./xulyDiem');

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

// Hàm gán màu sắc và biểu tượng theo xếp loại
function mauXepLoai(loai) {
    switch (loai) {
        case 'Giỏi': return `${c.green}${c.bold}★ Giỏi${c.reset}`;
        case 'Khá': return `${c.cyan}${c.bold}◆ Khá${c.reset}`;
        case 'Trung bình': return `${c.yellow}${c.bold}▲ Trung bình${c.reset}`;
        default: return `${c.red}${c.bold}▼ Yếu${c.reset}`;
    }
}

// Dữ liệu danh sách 3 sinh viên
const danhSachSinhVien = [
    {
        masv: 'CDCNTT18B10',
        hoten: 'Hồ Sỹ Ngọc Hải',
        lop: 'CĐ-CNTT18B',
        laSinhVien: true,
        diemMon1: 8.5,
        diemMon2: 9.0,
        diemMon3: 8.5
    },
    {
        masv: 'CDCNTT18B01',
        hoten: 'Nguyễn Văn An',
        lop: 'CĐ-CNTT18B',
        laSinhVien: false,
        diemMon1: 7.0,
        diemMon2: 6.5,
        diemMon3: 7.5
    },
    {
        masv: 'CDCNTT18B15',
        hoten: 'Trần Thị Bình',
        lop: 'CĐ-CNTT18B',
        laSinhVien: false,
        diemMon1: 5.5,
        diemMon2: 5.0,
        diemMon3: 6.0
    }
];

// In Banner cá nhân hóa bài tập
console.log('\n' + c.cyan + '╔══════════════════════════════════════════════════════════════════════╗' + c.reset);
console.log(c.cyan + '║' + c.bold + c.white + '               BÀI TẬP 06: MODULE TÍNH KẾT QUẢ HỌC TẬP                ' + c.reset + c.cyan + '║' + c.reset);
console.log(c.cyan + '║' + c.gray + '  Sinh viên: ' + c.green + c.bold + 'Hồ Sỹ Ngọc Hải' + c.reset + c.gray + '  │  MSSV: ' + c.yellow + 'CDCNTT18B10' + c.reset + c.gray + '  │  Lớp: ' + c.blue + 'CĐ-CNTT18B' + c.reset + c.gray + '  ' + c.cyan + '║' + c.reset);
console.log(c.cyan + '╚══════════════════════════════════════════════════════════════════════╝' + c.reset + '\n');

console.log(c.yellow + c.bold + '▶ DANH SÁCH CHI TIẾT SINH VIÊN:' + c.reset);
console.log(c.gray + '─'.repeat(70) + c.reset);

const bangTongKet = [];

danhSachSinhVien.forEach((sv, index) => {
    const dtb = tinhDiemTrungBinh(sv.diemMon1, sv.diemMon2, sv.diemMon3);
    const loai = xepLoai(dtb);

    const tagCaNhan = sv.laSinhVien
        

    console.log(`${c.bold}${index + 1}. Họ tên:${c.reset} ${c.cyan}${c.bold}${sv.hoten}${c.reset}${tagCaNhan} ${c.gray}(MSSV: ${sv.masv})${c.reset}`);
    console.log(`   ${c.gray}├─ Điểm 3 môn:${c.reset}  Môn 1: ${c.white}${sv.diemMon1}${c.reset} │ Môn 2: ${c.white}${sv.diemMon2}${c.reset} │ Môn 3: ${c.white}${sv.diemMon3}${c.reset}`);
    console.log(`   ${c.gray}├─ Điểm TB:${c.reset}     ${c.yellow}${c.bold}${dtb}${c.reset}`);
    console.log(`   ${c.gray}└─ Xếp loại:${c.reset}    ${mauXepLoai(loai)}`);
    console.log(c.gray + '─'.repeat(70) + c.reset);

    bangTongKet.push({
        'STT': index + 1,
        'Họ và tên': sv.laSinhVien ? `★ ${sv.hoten}` : sv.hoten,
        'MSSV': sv.masv,
        'Môn 1': sv.diemMon1,
        'Môn 2': sv.diemMon2,
        'Môn 3': sv.diemMon3,
        'ĐTB': dtb,
        'Xếp loại': loai
    });
});

console.log('\n' + c.yellow + c.bold + '▶ BẢNG TỔNG HỢP KẾT QUẢ HỌC TẬP:' + c.reset);
console.table(bangTongKet);
console.log(c.green + '✔ Thực thi hoàn tất bài tập 06 thành công!\n' + c.reset);
