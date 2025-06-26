import puppeteer from "puppeteer";

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
  const html = generateHTML(phongTros);

  const browser = await puppeteer.launch({ headless: true });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
  });

  await browser.close();

  return Buffer.from(pdfBuffer);
}

function generateHTML(phongTros: PhongTro[]): string {
  const rows = phongTros
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
    .join("");

  return `
  <!DOCTYPE html>
  <html lang="vi">
    <head>
      <meta charset="UTF-8" />
      <title>Danh sách phòng trọ</title>
      <style>
        body {
          font-family: sans-serif;
          padding: 20px;
        }
        h1 {
          text-align: center;
          color: #097551;
        }
        h3 {
          text-align: center;
          color: #0d9165;
        }
        h2{
          text-align: center;
          color: #1ab581;
        }
        .header-info {
          text-align: center;
          color: #047857; /* tương đương text-green-700 */
          margin-bottom: 10px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        th {
          background-color: #10b981;
          color: white;
          padding: 8px;
        }
        td {
          border: 1px solid #ddd;
          padding: 6px 8px;
          text-align: center;
        }
      </style>
    </head>
    <body>
  
      <!-- THÔNG TIN ĐẦU TRANG -->
      <div class="header-info">
        <h1>ĐỒ ÁN PHÒNG TRỌ</h1>
        <h3>số nhà 11 - Thôn Nam Hiệp - xã Nam Đà</h3>
        <h3>Huyện Krông Nô - Tỉnh Đăk Nông</h3>
        <h3>ĐT: 0962684418 - 09765552227</h3>
        <hr />
      </div>
  
      <h2>Danh Sách Phòng Trọ</h2>
      <table>
        <thead>
          <tr>
            <th>Tên phòng</th>
            <th>Tầng</th>
            <th>Kích thước</th>
            <th>Giá phòng</th>
            <th>Số người tối đa</th>
            <th>Toà nhà</th>
            <th>Địa chỉ</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
      <h3>Cảm ơn quý khách</h3>
    </body>
  </html>
  
  `;
}
