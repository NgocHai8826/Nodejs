const { MongoClient } = require('mongodb');

// URL kết nối tới MongoDB đang chạy local
const url = 'mongodb://localhost:27017/';
const client = new MongoClient(url);

// Tên Database và Collection theo yêu cầu
const dbName = 'qlsinhvien';
const collectionName = 'students';

async function run() {
    try {
        // 1. Kết nối MongoDB đang chạy trên máy
        await client.connect();
        console.log('-> Đã kết nối thành công tới MongoDB Server!\n');

        // 2. Sử dụng database qlsinhvien, collection students
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // 3. Chuẩn bị danh sách ít nhất 3 sinh viên, mỗi sinh viên gồm masv, hoten, tuoi, diem
        const danhSachSinhVien = [
            { masv: 'CDCNTT18B10', hoten: 'Hồ Sỹ Ngọc Hải', tuoi: 20, diem: 8.5 },
            { masv: 'CDCNTT18B01', hoten: 'Nguyễn Văn An', tuoi: 20, diem: 7.5 },
            { masv: 'CDCNTT18B02', hoten: 'Trần Thị Bình', tuoi: 19, diem: 6.0 },
            { masv: 'CDCNTT18B03', hoten: 'Lê Hoàng Cường', tuoi: 21, diem: 9.0 }
        ];

        // Thêm ít nhất 3 sinh viên bằng insertMany()
        const resultInsert = await collection.insertMany(danhSachSinhVien);
        console.log(`[1] Đã thêm thành công ${resultInsert.insertedCount} sinh viên vào collection '${collectionName}':`);
        Object.values(resultInsert.insertedIds).forEach((id, index) => {
            console.log(`    + ${danhSachSinhVien[index].hoten} (${danhSachSinhVien[index].masv}) - Điểm: ${danhSachSinhVien[index].diem} (ID: ${id})`);
        });

        // 4. Sử dụng find() hiển thị danh sách sinh viên
        console.log('\n[2] Danh sách sinh viên trong collection students (find()):');
        console.log('----------------------------------------------------');
        const allStudents = await collection.find({}).toArray();
        allStudents.forEach((sv, idx) => {
            console.log(`${idx + 1}. Mã SV: ${sv.masv} | Họ tên: ${sv.hoten} | Tuổi: ${sv.tuoi} | Điểm: ${sv.diem}`);
        });
        console.log('----------------------------------------------------');
        console.log(`Tổng số sinh viên trong cơ sở dữ liệu: ${allStudents.length}`);

    } catch (err) {
        console.error('Đã xảy ra lỗi trong quá trình thao tác:', err);
    } finally {
        // 5. Đóng kết nối sau khi hoàn thành
        await client.close();
        console.log('\n-> Đã đóng kết nối MongoDB sau khi hoàn thành công việc.');
    }
}

run();
