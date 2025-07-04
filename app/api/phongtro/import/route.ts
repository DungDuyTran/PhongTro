// Import các module cần thiết từ Next.js và thư viện bên ngoài
import { NextRequest, NextResponse } from "next/server";
import { parsePhongTroFromExcel } from "@/lib/excel/parsePhongTro";
import { prisma } from "@/prisma/client";
import { Buffer } from "node:buffer";

// Hàm xử lý POST request để import file Excel
export async function POST(req: NextRequest) {
  try {
    // Lấy dữ liệu form (dạng multipart/form-data)
    const formData = await req.formData();

    // Lấy file từ form data
    const file = formData.get("file") as File;

    // Nếu không có file được gửi lên, trả về lỗi
    if (!file) {
      return NextResponse.json(
        {
          message:
            "Không có file nào được tải lên. Vui lòng chọn một file Excel.",
        },
        { status: 400 }
      );
    }

    // Kiểm tra loại file hợp lệ (Excel)
    const allowedTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
      "application/vnd.ms-excel", // .xls
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          message: `Loại file không hợp lệ: ${file.type}. Vui lòng tải lên file Excel (.xlsx hoặc .xls).`,
        },
        { status: 400 }
      );
    }

    // Đọc file thành buffer (array buffer → node buffer)
    const arrayBuffer = await file.arrayBuffer();
    const nodeBuffer = Buffer.from(new Uint8Array(arrayBuffer));

    // Phân tích dữ liệu từ file Excel thành validData và invalidRows
    const { validData, invalidRows } = await parsePhongTroFromExcel(nodeBuffer);

    // Nếu tất cả các dòng đều sai → trả lỗi và danh sách dòng lỗi
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

    // Nếu có dữ liệu hợp lệ → tiến hành ghi vào database
    if (validData.length > 0) {
      for (const data of validData) {
        // Tách thông tin tòa nhà và dữ liệu phòng
        const { ToaNha, ...phongData } = data;

        const createToaNha = ToaNha?.connectOrCreate?.create;
        const whereToaNha = ToaNha?.connectOrCreate?.where;

        // Nếu thiếu tên tòa nhà → trả lỗi
        if (!whereToaNha?.tenToaNha) {
          return NextResponse.json(
            {
              message: "Thiếu tên tòa nhà trong ToaNha.",
              errorData: data,
            },
            { status: 400 }
          );
        }

        // Nếu số tầng không hợp lệ → gán mặc định là 1
        const soTang =
          typeof createToaNha?.soTang === "number" &&
          !isNaN(createToaNha.soTang)
            ? createToaNha.soTang
            : 1;

        // Gọi Prisma để tạo bản ghi phòng trọ + toà nhà (connectOrCreate)
        await prisma.phongTro.create({
          data: {
            ...phongData, // Các trường như tenPhong, tang, kichThuoc...
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
                      id: createToaNha.DonViHanhChinhId || 1, // Gán id mặc định nếu không có
                    },
                  },
                },
              },
            },
          },
        });
      }
    }

    // Trả kết quả thành công sau khi import
    return NextResponse.json({
      message: `Quá trình import hoàn tất. Đã nhập thành công ${validData.length} phòng trọ.`,
      imported: validData.length,
      errors: invalidRows,
    });
  } catch (error: any) {
    // Ghi log và trả lỗi nếu có exception trong quá trình xử lý
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
