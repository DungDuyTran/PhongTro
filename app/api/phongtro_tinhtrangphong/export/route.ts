import { prisma } from "@/prisma/client";
import { NextResponse } from "next/server";
import ExcelJS from "exceljs";
import { headers } from "next/headers";
import { join } from "path";
import path from "path";
import { error } from "console";

export async function GET() {
  try {
    const phongTro_tinhTrangPhongs =
      await prisma.phongTro_TinhTrangPhong.findMany({
        include: {
          phongTro: true,
          tinhTrangPhong: true,
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
        { error: "không tìm thấy file worksheet trong template excel" },
        { status: 500 }
      );
    }

    const headerRowNumber = 7;
    const headers = [
      "ID",
      "Tên Phòng",
      "Tầng",
      "Kích thước",
      "Giá phòng",
      "Số người ở tối đa",
      "Tình trạng",
      "Ngày cập nhật",
    ];
    worksheet.spliceRows(headerRowNumber, 0, headers);

    phongTro_tinhTrangPhongs.forEach((pt, index) => {
      const rowData = [
        pt.phongTro.id,
        pt.phongTro.tenPhong,
        pt.phongTro.tang,
        pt.phongTro.kichThuoc,
        pt.phongTro.giaPhong,

        pt.phongTro.soNguoiToiDa,
        pt.tinhTrangPhong.tinhTrang,
        pt.tinhTrangPhong.ngayCapNhat,
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
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
