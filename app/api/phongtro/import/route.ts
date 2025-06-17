import { NextRequest, NextResponse } from "next/server";
import { parsePhongTroFromExcel } from "@/lib/excel/parsePhongTro";
import { prisma } from "@/prisma/client";
import { Buffer } from "node:buffer";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        {
          message:
            "Không có file nào được tải lên. Vui lòng chọn một file Excel.",
        },
        { status: 400 }
      );
    }

    const allowedTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          message: `Loại file không hợp lệ: ${file.type}. Vui lòng tải lên file Excel (.xlsx hoặc .xls).`,
        },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const nodeBuffer = Buffer.from(new Uint8Array(arrayBuffer));

    const { validData, invalidRows } = await parsePhongTroFromExcel(nodeBuffer);

    if (validData.length === 0 && invalidRows.length > 0) {
      return NextResponse.json(
        {
          message:
            "Tất cả các dòng dữ liệu đều không hợp lệ. Vui lòng kiểm tra lại file Excel của bạn.",
          errors: invalidRows,
        },
        { status: 400 }
      );
    }

    if (validData.length > 0) {
      for (const data of validData) {
        const { ToaNha, ...phongData } = data;

        const createToaNha = ToaNha?.connectOrCreate?.create;
        const whereToaNha = ToaNha?.connectOrCreate?.where;

        if (!whereToaNha?.tenToaNha) {
          return NextResponse.json(
            {
              message: "Thiếu tên tòa nhà trong ToaNha.",
              errorData: data,
            },
            { status: 400 }
          );
        }

        // Gán giá trị mặc định nếu soTang bị thiếu hoặc không phải số
        const soTang =
          typeof createToaNha?.soTang === "number" &&
          !isNaN(createToaNha.soTang)
            ? createToaNha.soTang
            : 1;

        await prisma.phongTro.create({
          data: {
            ...phongData,
            ToaNha: {
              connectOrCreate: {
                where: {
                  tenToaNha: whereToaNha.tenToaNha,
                },
                create: {
                  tenToaNha: createToaNha.tenToaNha,
                  diaChi: createToaNha.diaChi,
                  soTang: soTang,
                  DonViHanhChinh: {
                    connect: {
                      id: createToaNha.DonViHanhChinhId || 1,
                    },
                  },
                },
              },
            },
          },
        });
      }
    }

    return NextResponse.json({
      message: `Quá trình import hoàn tất. Đã nhập thành công ${validData.length} phòng trọ.`,
      imported: validData.length,
      errors: invalidRows,
    });
  } catch (error: any) {
    console.error("Lỗi trong quá trình xử lý import file:", error);
    return NextResponse.json(
      {
        message: "Đã xảy ra lỗi trong quá trình xử lý import file.",
        detail: error.message || String(error),
      },
      { status: 500 }
    );
  }
}
