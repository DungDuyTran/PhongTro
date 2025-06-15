import { NextRequest, NextResponse } from "next/server";
import { parsePhongTroFromExcel } from "@/lib/excel/parsePhongTro";
import { prisma } from "@/prisma/client";

export const config = {
  runtime: "nodejs",
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Không có file được gửi lên." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(new Uint8Array(arrayBuffer));

    const { validData, invalidRows } = await parsePhongTroFromExcel(buffer);

    if (validData.length === 0) {
      return NextResponse.json(
        {
          message: "Tất cả dòng dữ liệu đều không hợp lệ.",
          errors: invalidRows,
        },
        { status: 400 }
      );
    }

    await prisma.phongTro.createMany({
      data: validData,
      skipDuplicates: true,
    });

    return NextResponse.json({
      message: "Import thành công.",
      imported: validData.length,
      errors: invalidRows,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Lỗi xử lý import", detail: String(error) },
      { status: 500 }
    );
  }
}
