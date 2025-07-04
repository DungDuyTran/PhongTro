import { NextRequest, NextResponse } from "next/server";
import { parsePhongTroFromExcelBulk } from "@/lib/excel/parsePhongTroBulkInsert";
import { prisma } from "@/prisma/client";
import { Buffer } from "node:buffer";

// API route xử lý import file Excel chứa danh sách phòng trọ
export async function POST(req: NextRequest) {
  try {
    // Lấy dữ liệu form gửi lên (chứa file Excel)
    const formData = await req.formData();
    const file = formData.get("file") as File;

    // Kiểm tra nếu không có file đính kèm
    if (!file) {
      return NextResponse.json(
        { message: "Không có file nào được tải lên." },
        { status: 400 }
      );
    }

    // Kiểm tra định dạng file hợp lệ
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

    // Chuyển file sang buffer (dùng cho thư viện ExcelJS)
    const arrayBuffer = await file.arrayBuffer();
    const nodeBuffer = Buffer.from(new Uint8Array(arrayBuffer));

    // Gọi hàm parse dữ liệu Excel đã tách riêng
    const { validData, invalidRows } = await parsePhongTroFromExcelBulk(
      nodeBuffer
    );

    // Nếu tất cả các dòng đều lỗi, trả về danh sách lỗi
    if (validData.length === 0 && invalidRows.length > 0) {
      return NextResponse.json(
        {
          message: "Tất cả các dòng đều không hợp lệ.",
          errors: invalidRows,
        },
        { status: 400 }
      );
    }
    // ========== BƯỚC 1: Gom các tòa nhà duy nhất cần upsert ==========
    const uniqueToaNhas = new Map();
    for (const item of validData) {
      const {
        tenToaNha,
        diaChi,
        soTang,
        DonViHanhChinhId = 1,
      } = item.ToaNha.connectOrCreate.create;
      // Nếu tòa nhà chưa có trong Map, thêm vào (tránh tạo trùng)
      if (!uniqueToaNhas.has(tenToaNha)) {
        uniqueToaNhas.set(tenToaNha, {
          tenToaNha,
          diaChi,
          soTang,
          DonViHanhChinhId,
        });
      }
    }

    // ========== BƯỚC 2: Upsert các ToaNha vào CSDL ==========
    for (const toaNha of uniqueToaNhas.values()) {
      await prisma.toaNha.upsert({
        where: { tenToaNha: toaNha.tenToaNha }, // kiểm tra theo tên
        update: {}, // không update gì cả nếu đã tồn tại
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

    // ========== BƯỚC 3: Lấy lại danh sách ToaNha vừa tạo hoặc đã có ==========
    const toaNhasInDb = await prisma.toaNha.findMany({
      where: {
        tenToaNha: {
          in: Array.from(uniqueToaNhas.keys()),
        },
      },
    });

    // Tạo map để tra nhanh ToaNhaId từ tên
    const mapToaNha = new Map(toaNhasInDb.map((t) => [t.tenToaNha, t.id]));

    // ========== BƯỚC 4: Chuẩn bị dữ liệu phòng trọ để insert ==========
    const phongTroToInsert = [];
    const missingToaNhaRows = []; // lưu dòng thiếu ToaNhaId (có lỗi)

    for (const item of validData) {
      const { ToaNha, ...phongData } = item;
      const tenToaNha = ToaNha.connectOrCreate.where.tenToaNha;
      const ToaNhaId = mapToaNha.get(tenToaNha);

      // Nếu không tìm thấy ToaNhaId thì log lại lỗi
      if (!ToaNhaId) {
        missingToaNhaRows.push({
          row: item.row || 0,
          errors: {
            ToaNhaId: [`Không tìm thấy ToaNhaId cho '${tenToaNha}'`],
          },
        });
        continue;
      }

      // Gộp dữ liệu hợp lệ để insert
      phongTroToInsert.push({
        ...phongData,
        ToaNhaId,
      });
    }

    // Nếu không insert được dòng nào (do lỗi ToaNhaId), trả lỗi
    if (phongTroToInsert.length === 0) {
      return NextResponse.json(
        {
          message: "Không thể tạo bất kỳ phòng trọ nào vì thiếu ToaNhaId.",
          errors: [...invalidRows, ...missingToaNhaRows],
        },
        { status: 400 }
      );
    }

    // ========== BƯỚC 5: Thêm vào database ==========
    await prisma.phongTro.createMany({
      data: phongTroToInsert,
      skipDuplicates: true, // bỏ qua nếu trùng (theo ràng buộc unique trong DB)
    });

    // Trả về kết quả thành công và danh sách lỗi nếu có
    return NextResponse.json({
      message: `Đã import thành công ${phongTroToInsert.length} phòng trọ.`,
      errors: [...invalidRows, ...missingToaNhaRows],
    });
  } catch (error: any) {
    // Xử lý lỗi server
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
