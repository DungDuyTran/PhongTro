import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { prisma } from "@/prisma/client";

// Hàm tải template Word dưới dạng Buffer
function loadTemplateBuffer(filename: string): Buffer {
  const templatePath = path.join(process.cwd(), "templates", filename);

  console.log("📂 Đường dẫn template:", templatePath);

  if (!fs.existsSync(templatePath)) {
    throw new Error(`❌ Không tìm thấy template Word tại: ${templatePath}`);
  }

  return fs.readFileSync(templatePath);
}

// Hàm xử lý yêu cầu GET để tạo và trả về file Word
export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Thiếu ID hợp đồng" }, { status: 400 });
    }

    const chiTiet = await prisma.chiTietHopDong.findFirst({
      where: { HopDongId: Number(id) },
      include: {
        PhongTro: true,
        HopDong: {
          include: { KhachHang: true },
        },
      },
    });

    if (!chiTiet) {
      return NextResponse.json(
        { error: "Không tìm thấy hợp đồng" },
        { status: 404 }
      );
    }

    // Tải template Word với tên file đã được xác nhận là chính xác
    const templateBuffer = loadTemplateBuffer("hopdong-template.docx");
    const zip = new PizZip(templateBuffer);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    const data = {
      hoTen: chiTiet.HopDong.KhachHang?.hoTen || "",
      tenPhong: chiTiet.PhongTro.tenPhong,
      tang: chiTiet.PhongTro.tang,
      giaPhong: chiTiet.PhongTro.giaPhong.toLocaleString(),
      ngayBatDau: new Date(chiTiet.HopDong.ngayBatDau).toLocaleDateString(
        "vi-VN"
      ),
      ngayKetThuc: new Date(chiTiet.HopDong.ngayKetThuc).toLocaleDateString(
        "vi-VN"
      ),
      tienDaCoc: chiTiet.HopDong.tienDaCoc.toLocaleString(),
      ghiChu: chiTiet.HopDong.ghiChu || "",
    };

    doc.setData(data);

    try {
      doc.render();
    } catch (error: any) {
      // Bắt lỗi Docxtemplater cụ thể để hiển thị thông tin chi tiết hơn
      if (
        error.properties &&
        error.properties.errors &&
        Array.isArray(error.properties.errors)
      ) {
        console.error(
          "❌ Chi tiết lỗi Docxtemplater:",
          error.properties.errors
        );
        const detailedErrors = error.properties.errors.map((err: any) => ({
          message: err.properties?.explanation || err.message,
          xpath: err.properties?.xpath,
          offset: err.properties?.offset,
          tag: err.properties?.tag,
        }));
        return NextResponse.json(
          {
            error: "Lỗi render Word từ template",
            detail:
              "Vui lòng kiểm tra lại cấu trúc template Word của bạn, đặc biệt là cú pháp thẻ (phải là {thẻ} chứ không phải [[thẻ]]).",
            docxtemplaterErrors: detailedErrors,
          },
          { status: 500 }
        );
      } else {
        console.error(
          "❌ Lỗi khi render template Word (không rõ chi tiết):",
          error
        );
        return NextResponse.json(
          {
            error: "Lỗi render Word",
            detail: error.message || "Lỗi không xác định khi render template",
          },
          { status: 500 }
        );
      }
    }

    const buffer = doc.getZip().generate({ type: "nodebuffer" });

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="hopdong-${id}.docx"`,
      },
    });
  } catch (err) {
    console.error("❌ Lỗi server:", err);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
