import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { exportHopDongToPDF } from "@/lib/export-hopdong-pdf";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const hopDongId = req.nextUrl.searchParams.get("id");

  console.log(`[API] Nhận request xuất PDF cho HopDongId: ${hopDongId}`);

  if (!hopDongId) {
    console.error("[API] Thiếu tham số ID hợp đồng.");
    return new Response("Thiếu tham số ID hợp đồng", { status: 400 });
  }

  try {
    // Truy vấn chi tiết hợp đồng dựa trên HopDongId
    const chiTiet = await prisma.chiTietHopDong.findFirst({
      where: { HopDongId: Number(hopDongId) },
      include: {
        HopDong: { include: { KhachHang: true } }, // Include KhachHang từ HopDong
        PhongTro: true, // Include PhongTro từ ChiTietHopDong
      },
    });

    if (!chiTiet) {
      console.warn(
        `[API] Không tìm thấy chi tiết hợp đồng cho ID: ${hopDongId}`
      );
      return new Response("Không tìm thấy chi tiết hợp đồng", { status: 404 });
    }

    console.log(
      `[API] Tìm thấy chi tiết hợp đồng cho ID: ${hopDongId}. Bắt đầu xuất PDF...`
    );

    const { HopDong, PhongTro } = chiTiet;

    // Chuẩn bị dữ liệu để truyền vào hàm exportHopDongToPDF
    const pdfBuffer = await exportHopDongToPDF({
      tenPhong: PhongTro.tenPhong,
      tang: PhongTro.tang,
      giaPhong: PhongTro.giaPhong.toLocaleString("vi-VN"),
      tienDaCoc: HopDong.tienDaCoc.toLocaleString("vi-VN"),
      ngayBatDau: new Date(HopDong.ngayBatDau).toLocaleDateString("vi-VN"),
      ngayKetThuc: new Date(HopDong.ngayKetThuc).toLocaleDateString("vi-VN"),
      khachHang: HopDong.KhachHang?.hoTen || "Không có",
      ghiChu: HopDong.ghiChu || "Không có ghi chú",
      qrCode: "", // Bạn có thể tạo QR code dựa trên HopDongId hoặc một URL cụ thể
    });
    const arrayBuffer = new Uint8Array(pdfBuffer).buffer;

    console.log(`[API] Xuất PDF thành công cho HopDongId: ${hopDongId}`);
    return new Response(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=hopdong_${hopDongId}.pdf`,
      },
    });
  } catch (error) {
    console.error(`[API] Lỗi khi xuất PDF cho HopDongId ${hopDongId}:`, error);
    return new Response(
      `Lỗi server: ${error instanceof Error ? error.message : String(error)}`,
      { status: 500 }
    );
  }
}
