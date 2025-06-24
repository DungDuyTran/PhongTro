// Cách 1 — tạo PDF trong server (API) bằng pdfkit, rồi gửi về client

import { NextResponse } from "next/server";
import PDFDocument from "pdfkit";
import { prisma } from "@/prisma/client";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

export async function GET() {
  try {
    const phongTros = await prisma.phongTro.findMany({
      include: {
        ToaNha: true,
      },
    });

    // Đường dẫn tới font Roboto
    const fontPath = path.join(
      process.cwd(),
      "public",
      "fonts",
      "Roboto-Regular.ttf"
    );

    // Tạo PDFDocument và set font mặc định ngay
    const doc = new PDFDocument({
      size: "A4",
      margin: 50,
      font: fontPath, // truyền luôn font Roboto vào đây
    });

    const buffers: Buffer[] = [];
    doc.on("data", (chunk) => buffers.push(chunk));
    doc.on("end", () => {});

    // Không cần registerFont, đã set font rồi
    doc.fontSize(20).text("Danh Sách Phòng Trọ", { align: "center" });
    doc.moveDown();

    phongTros.forEach((pt) => {
      doc
        .fontSize(12)
        .text(
          `Phòng: ${pt.tenPhong}, Tầng: ${pt.tang}, Kích thước: ${
            pt.kichThuoc
          }m², Giá: ${pt.giaPhong.toLocaleString()} VND, Số người: ${
            pt.soNguoiToiDa
          }, Toà nhà: ${pt.ToaNha?.tenToaNha}, Địa chỉ: ${pt.ToaNha?.diaChi}`
        );
      doc.moveDown(0.5);
    });

    doc.end();
    await new Promise<void>((resolve) => doc.on("end", () => resolve()));
    const pdfBuffer = Buffer.concat(buffers);

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=phongtro.pdf`,
      },
    });
  } catch (error) {
    console.error(" Lỗi tạo PDF:", error);
    return new Response("Lỗi khi tạo PDF", { status: 500 });
  }
}
