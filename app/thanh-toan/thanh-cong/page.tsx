"use client";

import { useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react";

export default function ThanhToanThanhCong() {
  const searchParams = useSearchParams();
  const hoaDonId = searchParams.get("hd");

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
      <h1 className="text-3xl font-bold text-green-700">
        Thanh toán thành công!
      </h1>
      <p className="mt-2 text-lg">
        Cảm ơn bạn đã thanh toán hóa đơn <strong>#{hoaDonId}</strong>.
      </p>
      <a
        href="/dashboard/hoadon"
        className="mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Quay về trang hóa đơn
      </a>
    </div>
  );
}
