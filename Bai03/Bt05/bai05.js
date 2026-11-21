const { MongoClient } = require('mongodb');

// URL kết nối tới MongoDB Server cục bộ
const url = 'mongodb://localhost:27017/';
const client = new MongoClient(url);

// Cơ sở dữ liệu và collection riêng biệt cho Bài 5 để chạy và nộp độc lập
const dbName = 'qlsinhvien_bt05';
const collectionName = 'students';

async function run() {
    try {
        // Kết nối MongoDB
        await client.connect();
        console.log('====================================================');
        console.log('BÀI 5: TÌM KIẾM, CẬP NHẬT VÀ SẮP XẾP MONGODB (BT05)');
        console.log('====================================================\n');
        console.log('-> Đã kết nối thành công tới MongoDB Server!');
        console.log(`-> Sử dụng Database riêng: '${dbName}' | Collection: '${collectionName}'\n`);

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Khởi tạo/Làm mới dữ liệu mẫu riêng biệt cho Bài 5 (đảm bảo chạy độc lập không phụ thuộc bài khác)
        await collection.deleteMany({});
        const duLieuBanDau = [
            { masv: 'CDCNTT18B10', hoten: 'Hồ Sỹ Ngọc Hải', tuoi: 20, diem: 8.5 },
            { masv: 'CDCNTT18B01', hoten: 'Nguyễn Văn An', tuoi: 20, diem: 7.5 },
            { masv: 'CDCNTT18B02', hoten: 'Trần Thị Bình', tuoi: 19, diem: 6.0 },
            { masv: 'CDCNTT18B03', hoten: 'Lê Hoàng Cường', tuoi: 21, diem: 9.0 }
        ];
        await collection.insertMany(duLieuBanDau);
        console.log('[0] Đã chuẩn bị dữ liệu sinh viên mẫu độc lập cho Bài 5.');

        // 1. Tìm các sinh viên có diem >= 7 bằng find() và $gte, sắp xếp giảm dần bằng sort()
        console.log('\n[1] Tìm các sinh viên có điểm >= 7, sắp xếp theo điểm giảm dần:');
        console.log('----------------------------------------------------');
        const queryDiem = { diem: { $gte: 7 } };
        const sortedStudents = await collection.find(queryDiem).sort({ diem: -1 }).toArray();

        sortedStudents.forEach((sv, idx) => {
            console.log(`${idx + 1}. Mã SV: ${sv.masv} | Họ tên: ${sv.hoten} | Điểm: ${sv.diem} | Tuổi: ${sv.tuoi}`);
        });
        console.log('----------------------------------------------------');

        // 2. Cập nhật điểm của một sinh viên theo masv bằng updateOne() và $set
        // Cập nhật điểm của sinh viên Trần Thị Bình (CDCNTT18B02) từ 6.0 lên 8.0
        const maSVCapNhat = 'CDCNTT18B02';
        const diemMoi = 8.0;

        console.log(`\n[2] Thực hiện cập nhật điểm cho sinh viên ${maSVCapNhat} thành ${diemMoi}...`);
        const updateResult = await collection.updateOne(
            { masv: maSVCapNhat },
            { $set: { diem: diemMoi } }
        );

        console.log(`-> Kết quả: Khớp ${updateResult.matchedCount} bản ghi, đã cập nhật thành công ${updateResult.modifiedCount} bản ghi.`);

        // 3. Hiển thị lại thông tin sau cập nhật để kiểm tra kết quả
        console.log('\n[3] Thông tin sinh viên sau khi cập nhật:');
        console.log('----------------------------------------------------');
        const studentUpdated = await collection.findOne({ masv: maSVCapNhat });
        if (studentUpdated) {
            console.log(`+ Mã SV : ${studentUpdated.masv}`);
            console.log(`+ Họ tên: ${studentUpdated.hoten}`);
            console.log(`+ Tuổi  : ${studentUpdated.tuoi}`);
            console.log(`+ Điểm  : ${studentUpdated.diem} (Đã được cập nhật thành công!)`);
        } else {
            console.log('Không tìm thấy thông tin sinh viên vừa cập nhật.');
        }
        console.log('----------------------------------------------------');

    } catch (err) {
        console.error('Đã xảy ra lỗi trong quá trình thao tác:', err);
    } finally {
        // Đóng kết nối sau khi hoàn thành
        await client.close();
        console.log('\n-> Đã đóng kết nối MongoDB an toàn.');
    }
}

run();
