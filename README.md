# 🏠 Quản Lý Phòng Trọ – DUNGPHONGTRO

Đồ án cá nhân xây dựng bằng **Next.js** + **TypeScript**, hỗ trợ quản lý phòng trọ hiện đại: từ CRUD dữ liệu đến biểu đồ, xuất file, và thanh toán online.

---

## 🚀 Tính Năng Chính

- 📋 **Quản lý phòng – hợp đồng – hoá đơn**
  - Thêm/sửa/xoá, phân trang, tìm kiếm, lọc dữ liệu
  - CRUD REST API đầy đủ (GET, POST, PUT, DELETE)
  - Dùng `[id]` và nested dynamic routes
- 📊 **Dashboard báo cáo**

  - Thống kê doanh thu, tình trạng phòng
  - Vẽ biểu đồ bằng `Recharts`
  - Giao diện đẹp, responsive

- 📦 **Xuất/Nhập file**

  - **Excel**: Xuất có template, Import (cả thường & bulk)
  - **PDF & Word**: Xuất theo mẫu sẵn có
  - **QR Code**: Mã hoá thông tin hợp đồng/hoá đơn

- 📧 **Gửi email**

  - Gửi Gmail thông báo, gửi định kỳ theo ngày

- 💳 **Thanh toán online**
  - Tích hợp cổng thanh toán **Stripe** (test mode)

---

## 🛠 Công Nghệ Sử Dụng

| Công Nghệ                 | Mô Tả ngắn gọn                         |
| ------------------------- | -------------------------------------- |
| **Next.js 15**            | Framework chính (App Router + API)     |
| **React 19**              | UI library                             |
| **TypeScript**            | Viết code rõ ràng, tránh lỗi           |
| **Tailwind CSS 4**        | Styling nhanh gọn bằng utility classes |
| **Prisma ORM**            | Kết nối & thao tác với MySQL DB        |
| **MySQL**                 | Cơ sở dữ liệu chính                    |
| **React Hook Form + Zod** | Xử lý và validate form                 |
| **TanStack Table**        | Hiển thị bảng dữ liệu động             |
| **Recharts**              | Vẽ biểu đồ đẹp                         |
| **Axios + SWR**           | Gọi API và cache dữ liệu hiệu quả      |

🧩 Các thư viện hỗ trợ khác:

- `clsx`, `tailwind-merge` – xử lý class
- `@radix-ui/react-*` – UI components nâng cao
- `file-saver`, `exceljs`, `docx`, `jspdf`, `qrcode` – xử lý file và mã QR

---

## ⚙️ Cách Chạy Project

```bash
git clone <repo-url>
cd <tên-folder>
npm install
npm run dev
```
