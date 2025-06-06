# Quản Lý Phòng Trọ 🏠

Đây là đồ án cá nhân của mình xây dựng bằng **Next.js**, dùng để quản lý phòng trọ. Giao diện đơn giản, dễ dùng, có thể thêm/xoá/sửa phòng, xem tình trạng phòng, biểu đồ thống kê, v.v...

## 🔧 Công Nghệ Mình Dùng

- **Next.js 15** – framework chính cho ứng dụng
- **React 19** – thư viện frontend
- **Tailwind CSS 4** – viết CSS nhanh gọn bằng class
- **Prisma ORM** – quản lý dữ liệu với database
- **MySQL** (hoặc PostgreSQL tuỳ config) – lưu dữ liệu
- **React Hook Form + Zod** – xử lý form và validation
- **TanStack Table** – hiển thị bảng danh sách (phòng, hợp đồng,...)
- **Recharts** – vẽ biểu đồ (tình trạng phòng, doanh thu,...)
- **Axios + SWR** – fetch và cache API
- **Lucide React + FontAwesome** – icon cho UI

Ngoài ra còn dùng vài thư viện nhỏ như:

- `clsx`, `tailwind-merge` – xử lý class tailwind
- `@radix-ui/react-*` – UI components (accordion, slot,...)

## ⚙️ Cách Chạy Project

````bash
git clone <repo-url>
cd <tên-folder>
npm install
npm run dev



<!-- This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
````

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details. -->
