
// 1. Sử dụng class, constructor để biểu diễn sinh viên
class SinhVien {
    constructor(ma, hoTen, tuoi, diem) {
        this.ma = ma;
        this.hoTen = hoTen;
        this.tuoi = tuoi;
        this.diem = diem;
    }

    // Phương thức hiển thị thông tin sinh viên
    hienThi() {
        return `Mã SV: ${this.ma} | Họ tên: ${this.hoTen} | Tuổi: ${this.tuoi} | Điểm: ${this.diem}`;
    }
}

// 2. Khai báo danh sách 5 sinh viên
const danhSachSinhVien = [
    new SinhVien('CDCNTT18B10', 'Hồ Sỹ Ngọc Hải', 20, 8.5),
    new SinhVien('CDCNTT18B01', 'Nguyễn Văn An', 20, 7.0),
    new SinhVien('CDCNTT18B02', 'Trần Thị Bình', 19, 4.5),
    new SinhVien('CDCNTT18B03', 'Lê Hoàng Cường', 21, 6.0),
    new SinhVien('CDCNTT18B04', 'Phạm Thị Dung', 20, 3.8)
];

// 3. Sử dụng hàm mũi tên (arrow function) để lọc sinh viên có điểm từ 5 trở lên
const sinhVienDatYeuCau = danhSachSinhVien.filter(sv => sv.diem >= 5);

// 4. Hiển thị danh sách sinh viên đạt yêu cầu bằng console.log()
console.log('--- DANH SÁCH SINH VIÊN ĐẠT YÊU CẦU (ĐIỂM >= 5) ---');
sinhVienDatYeuCau.forEach((sv, index) => {
    console.log(`${index + 1}. ${sv.hienThi()}`);
});