import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import ExcelJS from "exceljs";
import path from "path";
import { error } from "console";
import { headers } from "next/headers";
import { Buffer } from "buffer";

export async function GET() {
  try {
    const dichVus = await prisma.phongTro_DanhSachDichVu.findMany({
      include: {
        PhongTro: true,
        DanhSachDichVu: true,
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

    const worksheet = workbook.worksheets[0];
    if (!worksheet) {
      return NextResponse.json(
        { error: "không tìm thấy file" },
        { status: 500 }
      );
    }
    const headerRowNumber = 6;
    const headers = [
      "ID",
      "Tên phòng",
      "Tầng",
      "Dịch vụ",
      "Số lượng",
      "Ghi chú",
    ];
    worksheet.spliceRows(headerRowNumber, 0, headers);
    dichVus.forEach((dv, index) => {
      const rowData = [
        dv.PhongTroId,
        dv.PhongTro.tenPhong,
        dv.PhongTro.tang,
        dv.DanhSachDichVu.tenDichVu,
        dv.soLuong,
        dv.ghiChu,
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
