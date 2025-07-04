import ExcelJS from "exceljs";
import { Buffer } from "node:buffer";

/**
 * Đọc và phân tích dữ liệu phòng trọ từ file Excel (dạng bulk import).
 * Trả về danh sách dòng hợp lệ và các dòng lỗi.
 */
export async function parsePhongTroFromExcelBulk(buffer: Buffer) {
  const workbook = new ExcelJS.Workbook();

  try {
    // Load dữ liệu từ buffer Excel
    await workbook.xlsx.load(buffer);
  } catch (err) {
    console.error("Lỗi khi tải file Excel:", err);
    throw new Error("File Excel không hợp lệ hoặc không thể đọc.");
  }

  // Lấy sheet đầu tiên trong file Excel
  const worksheet = workbook.getWorksheet(1);
  if (!worksheet) {
    throw new Error("Không tìm thấy worksheet trong file Excel.");
  }

  // Mảng chứa dữ liệu hợp lệ
  const validData: any[] = [];

  // Mảng chứa các dòng bị lỗi để trả về cho người dùng
  const invalidRows: any[] = [];

  // Lặp qua từng dòng trong worksheet
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber < 8) return; // Bỏ qua các dòng tiêu đề (header) ở đầu

    // Lấy tất cả giá trị trong dòng hiện tại
    const values = row.values as (ExcelJS.CellValue | undefined)[];

    // Trích xuất dữ liệu từ các cột tương ứng
    const tenPhong = (values[1]?.toString() || "").trim(); // Cột A
    const tang = Number(values[2]); // Cột B
    const kichThuoc = Number(values[3]); // Cột C
    const giaPhong = Number(values[4]); // Cột D
    const soNguoiToiDa = Number(values[5]); // Cột E
    const tenToaNha = (values[6]?.toString() || "").trim(); // Cột F
    const diaChi = (values[7]?.toString() || "").trim(); // Cột G
    const soTang = Number(values[8]); // Cột H

    // Đối tượng lưu lỗi theo từng field
    const errors: Record<string, string[]> = {};

    // Kiểm tra hợp lệ từng trường
    if (!tenPhong) errors.tenPhong = ["Tên phòng không được để trống."];
    if (isNaN(tang) || tang <= 0) errors.tang = ["Tầng phải > 0"];
    if (isNaN(kichThuoc) || kichThuoc <= 0)
      errors.kichThuoc = ["Sai kích thước"];
    if (isNaN(giaPhong) || giaPhong <= 0) errors.giaPhong = ["Sai giá"];
    if (isNaN(soNguoiToiDa) || soNguoiToiDa <= 0)
      errors.soNguoiToiDa = ["Sai số người"];
    if (!tenToaNha) errors.tenToaNha = ["Thiếu tên tòa nhà"];

    // Nếu có lỗi thì thêm vào danh sách dòng lỗi
    if (Object.keys(errors).length > 0) {
      invalidRows.push({
        row: rowNumber, // Số thứ tự dòng bị lỗi
        errors, // Danh sách lỗi theo field
        originalData: values, // Dữ liệu gốc để dễ debug
      });
    } else {
      // Nếu hợp lệ, thêm vào danh sách validData
      validData.push({
        tenPhong,
        tang,
        kichThuoc,
        giaPhong,
        soNguoiToiDa,
        ToaNha: {
          connectOrCreate: {
            where: { tenToaNha }, // Điều kiện tìm kiếm để check tồn tại
            create: {
              tenToaNha, // Tên toà nhà sẽ dùng để tạo nếu chưa có
              diaChi, // Địa chỉ toà nhà
              soTang: isNaN(soTang) ? 1 : soTang, // Mặc định là 1 nếu không hợp lệ
              DonViHanhChinhId: 1, // Tạm thời hardcode ID đơn vị hành chính
            },
          },
        },
      });
    }
  });

  // Trả kết quả: valid data và lỗi
  return { validData, invalidRows };
}
