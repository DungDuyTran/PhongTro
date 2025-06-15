import ExcelJS from "exceljs";

export async function parsePhongTroFromExcel(buffer: Buffer) {
  const workbook = new ExcelJS.Workbook();

  try {
    await workbook.xlsx.load(buffer);
  } catch (err) {
    throw new Error("File Excel không hợp lệ hoặc không thể đọc được.");
  }

  const worksheet = workbook.getWorksheet(1);
  if (!worksheet) throw new Error("Không tìm thấy worksheet trong file Excel.");

  const validData: any[] = [];
  const invalidRows: any[] = [];

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber < 8) return;

    const values = row.values as (string | number | undefined)[];
    const tenPhong = values[1]?.toString().trim();
    const tang = Number(values[2]);
    const kichThuoc = Number(values[3]);
    const giaPhong = Number(values[4]);
    const soNguoiToiDa = Number(values[5]);
    const tenToaNha = values[6]?.toString().trim();
    const diaChi = values[7]?.toString().trim() || "";

    const errors: Record<string, string[]> = {};
    if (!tenPhong) errors.tenPhong = ["Tên phòng không được bỏ trống"];
    if (isNaN(tang)) errors.tang = ["Tầng phải là số"];
    if (isNaN(kichThuoc)) errors.kichThuoc = ["Kích thước phải là số"];
    if (isNaN(giaPhong)) errors.giaPhong = ["Giá phòng phải là số"];
    if (isNaN(soNguoiToiDa))
      errors.soNguoiToiDa = ["Số người tối đa phải là số"];
    if (!tenToaNha) errors.tenToaNha = ["Thiếu tên tòa nhà"];

    if (Object.keys(errors).length > 0) {
      invalidRows.push({ row: rowNumber, errors });
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
            create: { tenToaNha, diaChi },
          },
        },
      });
    }
  });

  return { validData, invalidRows };
}
