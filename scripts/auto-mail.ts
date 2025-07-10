import dotenv from "dotenv";
dotenv.config();

import { transporter, mailOptions } from "../lib/mail";
import { exportHopDongToPDF } from "../lib/export-hopdong-pdf";
import cron from "node-cron";

// Hàm gửi email kèm file PDF hợp đồng
async function sendAutoMail() {
  try {
    // Dữ liệu hợp đồng mẫu — có thể lấy từ DB hoặc API
    const hopDongData = {
      id: "HD001",
      tenPhong: "P101",
      tang: 1,
      giaPhong: "2.000.000",
      tienDaCoc: "1.000.000",
      ngayBatDau: "2025-07-06",
      ngayKetThuc: "2025-12-06",
      khachHang: "Nguyễn Văn A",
      ghiChu: "Hợp đồng 6 tháng",
    };

    // Tạo file PDF từ template
    const pdfBuffer = await exportHopDongToPDF(hopDongData);

    // Gửi email với file đính kèm
    await transporter.sendMail({
      ...mailOptions,
      to: "tranduydunga1@gmail.com",
      subject: "📄 Hợp đồng thuê phòng trọ",
      text: "Vui lòng kiểm tra file hợp đồng đính kèm.",
      attachments: [
        {
          filename: `hopdong-${hopDongData.id}.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    console.log(
      "✅ Đã gửi mail kèm hợp đồng PDF lúc",
      new Date().toLocaleString()
    );
  } catch (err) {
    console.error(" Lỗi khi gửi mail:", err);
  }
}

// Lên lịch gửi mail lúc 21:53 hằng ngày
cron.schedule("03 22 * * *", () => {
  console.log("🕐 Đến giờ gửi mail tự động (21:53)...");
  sendAutoMail();
});

// Gửi ngay lập tức khi chạy file (dùng để test)
sendAutoMail();
