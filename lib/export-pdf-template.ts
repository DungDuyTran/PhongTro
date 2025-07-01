import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import handlebars from "handlebars";
import QRCode from "qrcode";

interface PhongTro {
  id: number;
  tenPhong: string;
  tang: number;
  kichThuoc: number;
  giaPhong: number;
  soNguoiToiDa: number;
  ToaNha: {
    tenToaNha: string;
    diaChi: string;
  };
}

export async function exportPhongTroToPDF(
  phongTros: PhongTro[]
): Promise<Buffer> {
  const templatePath = path.join(
    process.cwd(),
    "public",
    "templates",
    "phongtro-template.html"
  );
  const qrCodeDataUrl = await QRCode.toDataURL("https://example.com/phongtro");

  const templateSource = fs.readFileSync(templatePath, "utf8");
  const template = handlebars.compile(templateSource);
  const html = template({
    content: generateTable(phongTros),
    qrCode: qrCodeDataUrl,
  });

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  const pdfBuffer = Buffer.from(
    await page.pdf({
      format: "A4",
      printBackground: true,
    })
  );

  await browser.close();
  return pdfBuffer;
}

function generateTable(phongTros: PhongTro[]): string {
  return `
    <table border="1" cellpadding="8" cellspacing="0" style="width: 100%; border-collapse: collapse;">
      <thead style="background-color: #10b981; color: white;">
        <tr>
          <th>Tên phòng</th>
          <th>Tầng</th>
          <th>Kích thước</th>
          <th>Giá phòng</th>
          <th>Số người tối đa</th>
          <th>Tòa nhà</th>
          <th>Địa chỉ</th>
        </tr>
      </thead>
      <tbody>
        ${phongTros
          .map(
            (pt) => `
              <tr>
                <td>${pt.tenPhong}</td>
                <td>${pt.tang}</td>
                <td>${pt.kichThuoc} m²</td>
                <td>${pt.giaPhong.toLocaleString()} VND</td>
                <td>${pt.soNguoiToiDa}</td>
                <td>${pt.ToaNha.tenToaNha}</td>
                <td>${pt.ToaNha.diaChi}</td>
              </tr>`
          )
          .join("")}
      </tbody>
    </table>
  `;
}
