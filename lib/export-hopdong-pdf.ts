import fs from "fs"; // Dùng để đọc/ghi file hệ thống
import path from "path"; // Dùng để xử lý đường dẫn file
import handlebars from "handlebars"; // Template engine để chèn dữ liệu vào HTML
import QRCode from "qrcode"; // Thư viện tạo mã QR
import { generatePDFBufferFromHTML } from "./pdf-utils"; // Hàm chuyển HTML => PDF (dùng puppeteer)

// Interface mô tả dữ liệu hợp đồng cần truyền vào để tạo PDF
interface HopDongData {
  id: string; // ID hợp đồng
  tenPhong: string;
  tang: number;
  giaPhong: string;
  tienDaCoc: string;
  ngayBatDau: string;
  ngayKetThuc: string;
  khachHang: string;
  ghiChu: string;
  qrCode?: string; // Có thể truyền nội dung QR riêng nếu muốn
}

// Hàm xuất hợp đồng ra PDF từ dữ liệu và template
export async function exportHopDongToPDF(
  data: HopDongData,
  outputPath?: string // Nếu truyền đường dẫn, sẽ ghi file ra ổ cứng
): Promise<Buffer> {
  // Tạo đường dẫn tuyệt đối đến file HTML template
  const templatePath = path.join(
    process.cwd(),
    "public",
    "templates",
    "phongtro-template.html"
  );

  // Kiểm tra tồn tại của file template
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Không tìm thấy template HTML tại: ${templatePath}`);
  }

  // ✅ Tạo nội dung văn bản để đưa vào QR code
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

  // Nếu caller không truyền qrCode, ta sẽ tạo nội dung mặc định từ các dòng trên
  const qrCodeContent = data.qrCode || qrCodeLines.join("\n");

  // ✅ Sinh QR code dưới dạng hình ảnh base64
  let qrCodeDataUrl = "";
  try {
    qrCodeDataUrl = await QRCode.toDataURL(qrCodeContent, {
      width: 150,
      errorCorrectionLevel: "H", // Độ chính xác cao nhất
    });
  } catch (err) {
    console.error("❌ Lỗi khi tạo QR Code:", err);
  }

  // ✅ Nội dung hợp đồng sẽ được chèn vào vị trí {{{content}}} trong template
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

  // ✅ Đọc template HTML gốc
  const templateContent = fs.readFileSync(templatePath, "utf8");

  // Biên dịch template thành hàm layout để chèn biến
  const layout = handlebars.compile(templateContent);

  // Tạo ra HTML cuối cùng (đã render content + QR code)
  const finalHtml = layout({
    content, // <== chèn vào {{{content}}}
    qrCode: qrCodeDataUrl, // <== chèn vào {{qrCode}}
  });

  // ✅ Chuyển HTML thành PDF bằng puppeteer
  const pdfBuffer = await generatePDFBufferFromHTML(finalHtml);

  // ✅ Nếu có yêu cầu ghi file thì thực hiện ghi ra ổ cứng
  if (outputPath) {
    fs.writeFileSync(outputPath, pdfBuffer);
    console.log(`✅ PDF đã lưu tại: ${outputPath}`);
  }

  // ✅ Trả về buffer để dùng trong API response
  return pdfBuffer;
}
