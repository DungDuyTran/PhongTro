import ExcelJS from "exceljs";
import { Buffer } from "node:buffer";

export async function parsePhongTroFromExcel(buffer: Buffer) {
  const workbook = new ExcelJS.Workbook();

  try {
    await workbook.xlsx.load(buffer);
  } catch (err) {
    console.error("Lỗi khi tải file Excel:", err);
    throw new Error(
      "File Excel không hợp lệ hoặc không thể đọc được. Vui lòng kiểm tra định dạng và nội dung."
    );
  }

  // Lấy worksheet đầu tiên (hoặc theo tên nếu bạn biết chắc)
  const worksheet = workbook.getWorksheet(1);
  if (!worksheet) {
    throw new Error(
      "Không tìm thấy worksheet nào trong file Excel. Vui lòng kiểm tra lại cấu trúc file."
    );
  }

  const validData: any[] = [];
  const invalidRows: any[] = [];

  // Lặp qua từng dòng, bỏ qua 7 dòng đầu tiên (header và thông tin khác)
  // Bạn đã có `rowNumber < 8` nên dữ liệu sẽ bắt đầu từ dòng 8.
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber < 8) return; // Bỏ qua 7 dòng đầu tiên

    // Lấy giá trị của các ô, ép kiểu rõ ràng hơn để tránh lỗi runtime
    // Lưu ý: ExcelJS trả về giá trị dựa trên loại ô. toString() hoặc Number() là cần thiết.
    const values = row.values as (ExcelJS.CellValue | undefined)[];

    // Đảm bảo truy cập đúng index và xử lý các giá trị undefined
    const tenPhong = (values[1]?.toString() || "").trim();
    const tang = Number(values[2]);
    const kichThuoc = Number(values[3]);
    const giaPhong = Number(values[4]);
    const soNguoiToiDa = Number(values[5]);
    const tenToaNha = (values[6]?.toString() || "").trim();
    const diaChi = (values[7]?.toString() || "").trim(); // Địa chỉ có thể trống

    const errors: Record<string, string[]> = {};

    // Validate dữ liệu
    if (!tenPhong) errors.tenPhong = ["Tên phòng không được bỏ trống."];
    if (isNaN(tang) || tang <= 0)
      errors.tang = ["Tầng phải là một số nguyên dương."];
    if (isNaN(kichThuoc) || kichThuoc <= 0)
      errors.kichThuoc = ["Kích thước phải là một số dương."];
    if (isNaN(giaPhong) || giaPhong <= 0)
      errors.giaPhong = ["Giá phòng phải là một số tiền dương."];
    if (isNaN(soNguoiToiDa) || soNguoiToiDa <= 0)
      errors.soNguoiToiDa = ["Số người tối đa phải là một số nguyên dương."];
    if (!tenToaNha) errors.tenToaNha = ["Tên tòa nhà không được bỏ trống."];

    // Thêm dữ liệu vào mảng hợp lệ hoặc không hợp lệ
    if (Object.keys(errors).length > 0) {
      invalidRows.push({ row: rowNumber, errors, originalData: values }); // Lưu thêm dữ liệu gốc để dễ debug
    } else {
      validData.push({
        tenPhong,
        tang,
        kichThuoc,
        giaPhong,
        soNguoiToiDa,
        // Dùng connectOrCreate cho ToaNha để tạo mới nếu chưa tồn tại, hoặc kết nối nếu đã có
        ToaNha: {
          connectOrCreate: {
            where: { tenToaNha: tenToaNha }, // Điều kiện tìm kiếm tòa nhà
            create: { tenToaNha: tenToaNha, diaChi: diaChi }, // Dữ liệu tạo mới nếu không tìm thấy
          },
        },
      });
    }
  });

  return { validData, invalidRows };
}
