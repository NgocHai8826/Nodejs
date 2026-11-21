// Hàm tính điểm trung bình 3 môn
function tinhDiemTrungBinh(m1, m2, m3) {
    const dtb = (m1 + m2 + m3) / 3;
    return parseFloat(dtb.toFixed(2));
}

// Hàm xếp loại học tập
function xepLoai(dtb) {
    if (dtb >= 8.0) {
        return 'Giỏi';
    } else if (dtb >= 6.5) {
        return 'Khá';
    } else if (dtb >= 5.0) {
        return 'Trung bình';
    } else {
        return 'Yếu';
    }
}

// Xuất các hàm bằng module.exports
module.exports = {
    tinhDiemTrungBinh,
    xepLoai
};
