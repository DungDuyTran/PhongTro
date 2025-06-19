import ExcelJS from "exceljs";
import { Buffer } from "node:buffer";

export async function parsePhongTroFromExcelBulk(buffer: Buffer) {
  const workbook = new ExcelJS.Workbook();

  try {
    await workbook.xlsx.load(buffer);
  } catch (err) {
    console.error("Lỗi khi tải file Excel:", err);
    throw new Error("File Excel không hợp lệ hoặc không thể đọc.");
  }

  const worksheet = workbook.getWorksheet(1);
  if (!worksheet) {
    throw new Error("Không tìm thấy worksheet trong file Excel.");
  }

  const validData: any[] = [];
  const invalidRows: any[] = [];

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber < 8) return; // Bỏ qua các dòng tiêu đề

    const values = row.values as (ExcelJS.CellValue | undefined)[];
    const tenPhong = (values[1]?.toString() || "").trim();
    const tang = Number(values[2]);
    const kichThuoc = Number(values[3]);
    const giaPhong = Number(values[4]);
    const soNguoiToiDa = Number(values[5]);
    const tenToaNha = (values[6]?.toString() || "").trim();
    const diaChi = (values[7]?.toString() || "").trim();
    const soTang = Number(values[8]);

    const errors: Record<string, string[]> = {};

    if (!tenPhong) errors.tenPhong = ["Tên phòng không được để trống."];
    if (isNaN(tang) || tang <= 0) errors.tang = ["Tầng phải > 0"];
    if (isNaN(kichThuoc) || kichThuoc <= 0)
      errors.kichThuoc = ["Sai kích thước"];
    if (isNaN(giaPhong) || giaPhong <= 0) errors.giaPhong = ["Sai giá"];
    if (isNaN(soNguoiToiDa) || soNguoiToiDa <= 0)
      errors.soNguoiToiDa = ["Sai số người"];
    if (!tenToaNha) errors.tenToaNha = ["Thiếu tên tòa nhà"];

    if (Object.keys(errors).length > 0) {
      invalidRows.push({ row: rowNumber, errors, originalData: values });
    } else {
      validData.push({
        tenPhong,
        tang,
        kichThuoc,
        giaPhong,
        soNguoiToiDa,
        ToaNha: {
          connectOrCreate: {
            where: { tenToaNha },
            create: {
              tenToaNha,
              diaChi,
              soTang: isNaN(soTang) ? 1 : soTang,
              DonViHanhChinhId: 1,
            },
          },
        },
      });
    }
  });

  return { validData, invalidRows };
}
