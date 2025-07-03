import puppeteer from "puppeteer";

export async function generatePDFBufferFromHTML(html: string): Promise<Buffer> {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    // Sử dụng 'domcontentloaded' để chờ DOM được tải, thường nhanh hơn 'networkidle0'
    // 'networkidle0' chờ cho đến khi không có request mạng nào trong 500ms, có thể quá lâu.
    await page.setContent(html, { waitUntil: "networkidle0" });

    const buffer = await page.pdf({
      format: "A4",
      printBackground: true,
      // margin: {
      //   top: '20mm',
      //   right: '20mm',
      //   bottom: '20mm',
      //   left: '20mm',
      // },
    });

    return Buffer.from(buffer);
  } catch (error) {
    console.error("Lỗi khi tạo PDF với Puppeteer:", error);
    throw error; // Ném lỗi để API route có thể bắt được và trả về client
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
