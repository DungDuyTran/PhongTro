"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AOS from "aos";
import "aos/dist/aos.css";

interface HoaDon {
  id: number;
  ngayLap: string;
  loaiHoaDon: string;
  tinhTrang: string;
  soTien: number | string;
  LichSuThanhToanId?: number;
  KhachHangId: number;
}

export default function HoaDonPage() {
  const [data, setData] = useState<HoaDon[]>([]);

  useEffect(() => {
    AOS.init({ duration: 800 });

    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/hoadon");
        const result = await res.json();
        setData(result.data || []);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu hóa đơn:", error);
      }
    };

    fetchData();
  }, []);

  const handleThanhToan = (hoaDonId: number) => {
    alert(`Đang xử lý thanh toán cho hóa đơn ${hoaDonId}`);
  };

  return (
    <div className="p-4 max-w-6xl mx-auto font-medium">
      <h1
        className="text-4xl font-bold text-green-600 text-center mb-6"
        data-aos="fade-down"
      >
        HÓA ĐƠN PHÒNG TRỌ
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((item) => {
          const isPaid =
            item.tinhTrang.toLowerCase() === "đã thanh toán" ||
            item.tinhTrang.toLowerCase() === "da thanh toan";

          return (
            <div
              key={item.id}
              className="border rounded-xl p-4 bg-white shadow hover:shadow-md transition"
              data-aos="fade-up"
            >
              <p>
                <strong>Loại hóa đơn:</strong> {item.loaiHoaDon}
              </p>
              <p>
                <strong>Ngày lập:</strong>{" "}
                {new Date(item.ngayLap).toLocaleDateString()}
              </p>
              <p>
                <strong>Số tiền:</strong> {Number(item.soTien).toLocaleString()}{" "}
                đ
              </p>
              <p>
                <strong>Tình trạng:</strong>{" "}
                <span
                  className={
                    isPaid
                      ? "text-green-600 font-semibold"
                      : "text-red-600 font-semibold"
                  }
                >
                  {item.tinhTrang}
                </span>
              </p>

              {!isPaid && (
                <Button
                  className="mt-4 bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => handleThanhToan(item.id)}
                >
                  Thanh toán
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
