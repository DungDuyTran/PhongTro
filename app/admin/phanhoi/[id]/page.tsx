// --- FILE: app/admin/phan-hoi/[id]/page.tsx ---
import { notFound } from "next/navigation";
import prisma from "@/lib/db";

export default async function PhanHoiDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  const phanHoi = await prisma.phanHoi.findUnique({
    where: { id },
    include: { KhachHang: true },
  });

  if (!phanHoi) return notFound();

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow rounded space-y-4">
      <h1 className="text-2xl font-bold">Chi tiết phản hồi #{phanHoi.id}</h1>
      <p>
        <strong>Khách hàng:</strong> {phanHoi.KhachHang?.hoTen || "Không rõ"}
      </p>
      <p>
        <strong>Nội dung:</strong> {phanHoi.noiDung}
      </p>
      <p>
        <strong>Trạng thái:</strong>{" "}
        {phanHoi.trangThai ? "Đã xử lý" : "Chưa xử lý"}
      </p>
    </div>
  );
}
