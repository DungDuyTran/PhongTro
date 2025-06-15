import { NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import ExcelJS from "exceljs";
import path from "path";
import { Buffer } from "buffer";

export async function GET() {
  try {
    const phongTros = await prisma.phongTro.findMany({
      include: {
        ToaNha: true,
      },
    });

    const workbook = new ExcelJS.Workbook();
    const filePath = path.join(
      process.cwd(),
      "public",
      "template",
      "template_phongtro.xlsx"
    );
    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.worksheets[0]; // hoặc dùng tên sheet: workbook.getWorksheet("Phòng Trọ")
    if (!worksheet) {
      return NextResponse.json(
        { error: "Không tìm thấy worksheet trong template Excel" },
        { status: 500 }
      );
    }

    // Chèn tiêu đề cột thủ công tại dòng 7
    const headerRowNumber = 7;
    const headers = [
      "ID",
      "Tên phòng",
      "Tầng",
      "Kích thước (m2)",
      "Giá phòng",
      "Số người tối đa",
      "Tên toà nhà",
      "Địa chỉ",
    ];
    worksheet.spliceRows(headerRowNumber, 0, headers); // chèn dòng mới tại vị trí 7

    // Bắt đầu ghi dữ liệu từ dòng 8 trở đi
    phongTros.forEach((pt, index) => {
      const rowData = [
        pt.id,
        pt.tenPhong,
        pt.tang,
        pt.kichThuoc,
        pt.giaPhong,
        pt.soNguoiToiDa,
        pt.ToaNha?.tenToaNha || "",
        pt.ToaNha?.diaChi || "",
      ];
      worksheet.insertRow(headerRowNumber + 1 + index, rowData);
    });

    const buffer = await workbook.xlsx.writeBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Disposition": "attachment; filename=phongtro.xlsx",
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
