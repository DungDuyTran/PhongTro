import { NextRequest, NextResponse } from "next/server";
import { transporter, mailOptions } from "@/lib/mail";
import { exportHopDongToPDF } from "@/lib/export-hopdong-pdf";

// Bạn có thể thay bằng loại dữ liệu phù hợp với hệ thống của bạn
interface HopDongData {
  id: string;
  tenPhong: string;
  tang: number;
  giaPhong: string;
  tienDaCoc: string;
  ngayBatDau: string;
  ngayKetThuc: string;
  khachHang: string;
  ghiChu: string;
}

export async function POST(req: NextRequest) {
  try {
    const { to, hopDongData } = await req.json();

    // Tạo PDF từ dữ liệu hợp đồng nhận được
    const pdfBuffer = await exportHopDongToPDF(hopDongData);

    // Gửi mail kèm PDF
    await transporter.sendMail({
      ...mailOptions,
      to,
      subject: "📄 Hợp đồng thuê phòng trọ",
      text: "Bạn vui lòng kiểm tra file hợp đồng đính kèm.",
      attachments: [
        {
          filename: "hopdong.pdf",
          content: pdfBuffer,
        },
      ],
    });

    return NextResponse.json({
      success: true,
      message: "Đã gửi email thành công",
    });
  } catch (error: any) {
    console.error("❌ Gửi email thất bại:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
