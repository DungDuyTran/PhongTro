// Import thư viện ExcelJS để đọc file .xlsx
import ExcelJS from "exceljs";
// Import Buffer từ node (dùng khi xử lý dữ liệu binary)
import { Buffer } from "node:buffer";

// Hàm chính: nhận buffer từ file Excel, trả về validData và invalidRows
export async function parsePhongTroFromExcel(buffer: Buffer) {
  const workbook = new ExcelJS.Workbook();

  try {
    // Load buffer vào workbook từ file Excel (async)
    await workbook.xlsx.load(buffer);
  } catch (err) {
    console.error("Lỗi khi tải file Excel:", err);

    // Nếu file hỏng hoặc không đúng định dạng Excel, throw lỗi rõ ràng
    throw new Error(
      "File Excel không hợp lệ hoặc không thể đọc được. Vui lòng kiểm tra định dạng và nội dung."
    );
  }

  // Lấy worksheet đầu tiên (theo index = 1)
  const worksheet = workbook.getWorksheet(1);
  if (!worksheet) {
    throw new Error(
      "Không tìm thấy worksheet nào trong file Excel. Vui lòng kiểm tra lại cấu trúc file."
    );
  }

  // Mảng chứa dữ liệu hợp lệ
  const validData: any[] = [];

  // Mảng chứa các dòng lỗi và lý do lỗi
  const invalidRows: any[] = [];

  // Duyệt qua từng dòng trong file Excel
  worksheet.eachRow((row, rowNumber) => {
    // Bỏ qua 7 dòng đầu tiên (dòng tiêu đề, hướng dẫn, mô tả...)
    if (rowNumber < 8) return;

    // ExcelJS trả về row.values là 1 mảng với index bắt đầu từ 1
    const values = row.values as (ExcelJS.CellValue | undefined)[];

    // Ép kiểu, loại bỏ undefined, chuyển sang string hoặc number
    const tenPhong = (values[1]?.toString() || "").trim();
    const tang = Number(values[2]);
    const kichThuoc = Number(values[3]);
    const giaPhong = Number(values[4]);
    const soNguoiToiDa = Number(values[5]);
    const tenToaNha = (values[6]?.toString() || "").trim();
    const diaChi = (values[7]?.toString() || "").trim(); // Có thể để trống

    // Khởi tạo object chứa lỗi cho từng cột
    const errors: Record<string, string[]> = {};

    // Bắt đầu validate từng trường dữ liệu
    if (!tenPhong) {
      errors.tenPhong = ["Tên phòng không được bỏ trống."];
    }

    if (isNaN(tang) || tang <= 0) {
      errors.tang = ["Tầng phải là một số nguyên dương."];
    }

    if (isNaN(kichThuoc) || kichThuoc <= 0) {
      errors.kichThuoc = ["Kích thước phải là một số dương."];
    }

    if (isNaN(giaPhong) || giaPhong <= 0) {
      errors.giaPhong = ["Giá phòng phải là một số tiền dương."];
    }

    if (isNaN(soNguoiToiDa) || soNguoiToiDa <= 0) {
      errors.soNguoiToiDa = ["Số người tối đa phải là một số nguyên dương."];
    }

    if (!tenToaNha) {
      errors.tenToaNha = ["Tên tòa nhà không được bỏ trống."];
    }

    // Nếu có lỗi → thêm dòng này vào danh sách lỗi
    if (Object.keys(errors).length > 0) {
      invalidRows.push({
        row: rowNumber, // Dòng lỗi (bắt đầu từ 1)
        errors, // Lỗi chi tiết theo cột
        originalData: values, // Dữ liệu gốc để tiện debug UI nếu cần
      });
    } else {
      // Nếu không có lỗi → thêm vào mảng hợp lệ
      validData.push({
        tenPhong,
        tang,
        kichThuoc,
        giaPhong,
        soNguoiToiDa,

        // Thêm cấu trúc connectOrCreate cho ToaNha
        ToaNha: {
          connectOrCreate: {
            where: {
              tenToaNha: tenToaNha, // Dùng tenToaNha để tìm
            },
            create: {
              tenToaNha: tenToaNha, // Nếu chưa tồn tại thì tạo mới
              diaChi: diaChi, // Địa chỉ có thể trống
            },
          },
        },
      });
    }
  });

  // Trả về dữ liệu hợp lệ và lỗi
  return { validData, invalidRows };
}
