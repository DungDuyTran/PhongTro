import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { hd?: string };
}) {
  const hoaDonId = Number(searchParams.hd);

  if (!hoaDonId) {
    return <div>Không tìm thấy mã hóa đơn</div>;
  }

  // Ghi nhận thanh toán vào database
  const hoaDon = await prisma.hoaDon.findUnique({ where: { id: hoaDonId } });
  if (!hoaDon) {
    return <div>Hóa đơn không tồn tại</div>;
  }

  if (hoaDon.tinhTrang === "Đã thanh toán") {
    return (
      <div className="text-center mt-10 text-green-600 text-2xl font-bold">
        Đã thanh toán trước đó!
      </div>
    );
  }

  const thanhToan = await prisma.lichSuThanhToan.create({
    data: {
      ngayThanhToan: new Date(),
      soTien: Number(hoaDon.soTien),
    },
  });

  await prisma.hoaDon.update({
    where: { id: hoaDonId },
    data: {
      tinhTrang: "Đã thanh toán",
      LichSuThanhToanId: thanhToan.id,
    },
  });

  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold text-green-600">
        Thanh toán thành công!
      </h1>
      <p className="mt-4 mb-5">Cảm ơn bạn đã thanh toán hóa đơn #{hoaDonId}.</p>
      <a
        href="/dashboard/hoadon"
        className="mt-12 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Quay về trang hóa đơn
      </a>
    </div>
  );
}
