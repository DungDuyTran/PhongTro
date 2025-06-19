import { NextRequest, NextResponse } from "next/server";
import { parsePhongTroFromExcelBulk } from "@/lib/excel/parsePhongTroBulkInsert";

import { prisma } from "@/prisma/client";
import { Buffer } from "node:buffer";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { message: "Không có file nào được tải lên." },
        { status: 400 }
      );
    }

    const allowedTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { message: `File không hợp lệ: ${file.type}` },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const nodeBuffer = Buffer.from(new Uint8Array(arrayBuffer));

    const { validData, invalidRows } = await parsePhongTroFromExcelBulk(
      nodeBuffer
    );

    if (validData.length === 0 && invalidRows.length > 0) {
      return NextResponse.json(
        {
          message: "Tất cả các dòng đều không hợp lệ.",
          errors: invalidRows,
        },
        { status: 400 }
      );
    }

    // 1. Gom các ToaNha duy nhất để upsert
    const uniqueToaNhas = new Map();
    for (const item of validData) {
      const {
        tenToaNha,
        diaChi,
        soTang,
        DonViHanhChinhId = 1,
      } = item.ToaNha.connectOrCreate.create;
      if (!uniqueToaNhas.has(tenToaNha)) {
        uniqueToaNhas.set(tenToaNha, {
          tenToaNha,
          diaChi,
          soTang,
          DonViHanhChinhId,
        });
      }
    }

    // 2. Upsert ToaNha
    for (const toaNha of uniqueToaNhas.values()) {
      await prisma.toaNha.upsert({
        where: { tenToaNha: toaNha.tenToaNha },
        update: {},
        create: {
          tenToaNha: toaNha.tenToaNha,
          diaChi: toaNha.diaChi,
          soTang: toaNha.soTang || 1,
          DonViHanhChinh: {
            connect: { id: toaNha.DonViHanhChinhId },
          },
        },
      });
    }

    // 3. Lấy lại danh sách ToaNha
    const toaNhasInDb = await prisma.toaNha.findMany({
      where: {
        tenToaNha: {
          in: Array.from(uniqueToaNhas.keys()),
        },
      },
    });

    const mapToaNha = new Map(toaNhasInDb.map((t) => [t.tenToaNha, t.id]));

    // 4. Chuẩn bị danh sách insert, lọc ra các dòng không có ToaNhaId
    const phongTroToInsert = [];
    const missingToaNhaRows = [];

    for (const item of validData) {
      const { ToaNha, ...phongData } = item;
      const tenToaNha = ToaNha.connectOrCreate.where.tenToaNha;
      const ToaNhaId = mapToaNha.get(tenToaNha);

      if (!ToaNhaId) {
        missingToaNhaRows.push({
          row: item.row || 0,
          errors: {
            ToaNhaId: [`Không tìm thấy ToaNhaId cho '${tenToaNha}'`],
          },
        });
        continue;
      }

      phongTroToInsert.push({
        ...phongData,
        ToaNhaId,
      });
    }

    if (phongTroToInsert.length === 0) {
      return NextResponse.json(
        {
          message: "Không thể tạo bất kỳ phòng trọ nào vì thiếu ToaNhaId.",
          errors: [...invalidRows, ...missingToaNhaRows],
        },
        { status: 400 }
      );
    }

    // 5. Import vào database
    await prisma.phongTro.createMany({
      data: phongTroToInsert,
      skipDuplicates: true,
    });

    return NextResponse.json({
      message: `Đã import thành công ${phongTroToInsert.length} phòng trọ.`,
      errors: [...invalidRows, ...missingToaNhaRows],
    });
  } catch (error: any) {
    console.error("Lỗi import:", error);
    return NextResponse.json(
      {
        message: "Lỗi khi xử lý file.",
        detail: error.message || String(error),
      },
      { status: 500 }
    );
  }
}
