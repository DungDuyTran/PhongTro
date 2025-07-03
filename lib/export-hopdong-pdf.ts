import fs from "fs";
import path from "path";
import handlebars from "handlebars";
import QRCode from "qrcode";
import { generatePDFBufferFromHTML } from "./pdf-utils";

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
  qrCode?: string; // Nếu muốn override nội dung QR
}

export async function exportHopDongToPDF(
  data: HopDongData,
  outputPath?: string
): Promise<Buffer> {
  const templatePath = path.join(
    process.cwd(),
    "public",
    "templates",
    "phongtro-template.html"
  );

  if (!fs.existsSync(templatePath)) {
    throw new Error(`Không tìm thấy template HTML tại: ${templatePath}`);
  }

  // ✅ Tạo nội dung văn bản QR code (toàn bộ thông tin hợp đồng)
  const qrCodeLines = [
    "PHIẾU THỐNG KÊ HỢP ĐỒNG PHÒNG TRỌ",
    `Khách hàng: ${data.khachHang}`,
    `Phòng: ${data.tenPhong} (Tầng ${data.tang})`,
    `Giá phòng: ${data.giaPhong} VND`,
    `Tiền cọc: ${data.tienDaCoc} VND`,
    `Ngày bắt đầu: ${data.ngayBatDau}`,
    `Ngày kết thúc: ${data.ngayKetThuc}`,
    `Ghi chú: ${data.ghiChu || "Không có ghi chú"}`,
  ];

  const qrCodeContent = data.qrCode || qrCodeLines.join("\n");

  // ✅ Sinh mã QR dạng ảnh base64
  let qrCodeDataUrl = "";
  try {
    qrCodeDataUrl = await QRCode.toDataURL(qrCodeContent, {
      width: 150,
      errorCorrectionLevel: "H",
    });
  } catch (err) {
    console.error("❌ Lỗi khi tạo QR Code:", err);
  }

  // ✅ Nội dung hợp đồng sẽ chèn vào template
  const content = `
    <h1 style="text-align: center; color:#07b871; margin-bottom: 20px;">HỢP ĐỒNG CHO THUÊ PHÒNG TRỌ</h1>
    <p><strong>Tên khách hàng:</strong> ${data.khachHang}</p>
    <p><strong>Phòng thuê:</strong> ${data.tenPhong} (Tầng ${data.tang})</p>
    <p><strong>Giá phòng:</strong> ${data.giaPhong} VND</p>
    <p><strong>Tiền cọc:</strong> ${data.tienDaCoc} VND</p>
    <p><strong>Ngày bắt đầu:</strong> ${data.ngayBatDau}</p>
    <p><strong>Ngày kết thúc:</strong> ${data.ngayKetThuc}</p>
    <p><strong>Ghi chú:</strong> ${data.ghiChu || "Không có ghi chú"}</p>
  `;

  // ✅ Load HTML template và chèn dữ liệu
  const templateContent = fs.readFileSync(templatePath, "utf8");
  const layout = handlebars.compile(templateContent);

  const finalHtml = layout({
    content,
    qrCode: qrCodeDataUrl,
  });

  // ✅ Tạo PDF buffer
  const pdfBuffer = await generatePDFBufferFromHTML(finalHtml);

  // ✅ Ghi file nếu có đường dẫn đầu ra
  if (outputPath) {
    fs.writeFileSync(outputPath, pdfBuffer);
    console.log(`✅ PDF đã lưu tại: ${outputPath}`);
  }

  return pdfBuffer;
}
