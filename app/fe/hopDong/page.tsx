"use client";

import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

interface PhongTro {
  tenPhong: string;
  tang: number;
  giaPhong: number;
  hinhAnh?: string;
}

interface KhachHang {
  hoTen: string;
}

interface HopDong {
  id: number;
  ngayBatDau: string;
  ngayKetThuc: string;
  tienDaCoc: number;
  tongTien: number;
  ghiChu: string;
  KhachHang?: KhachHang;
  KhachHangId: number;
}

interface ChiTietHopDong {
  HopDongId: number;
  PhongTroId: number;
  PhongTro: PhongTro;
  HopDong: HopDong;
}

export default function HopDongDetailPage() {
  const [data, setData] = useState<ChiTietHopDong | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const fetchData = async () => {
      try {
        const res = await fetch("/api/chitiethopdong_");
        const result = await res.json();
        const allData: ChiTietHopDong[] = result.data || [];

        const matched = allData.find(
          (item) => item.HopDong.KhachHangId === 7 && item.PhongTroId === 1
        );

        setData(matched || null);
      } catch (err) {
        console.error("Lỗi khi tải hợp đồng:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <p className="text-center text-blue-500 mt-6">
        Đang tải dữ liệu hợp đồng...
      </p>
    );
  }

  if (!data) {
    return (
      <p className="text-center text-red-500 mt-6">
        Không tìm thấy hợp đồng cho khách hàng 7 và phòng 1
      </p>
    );
  }

  const { PhongTro, HopDong } = data;
  const khach = HopDong.KhachHang;

  return (
    <div className="p-6 max-w-4xl mx-auto font-medium">
      <h1
        className="text-4xl font-bold text-green-600 text-center mb-6"
        data-aos="fade-up"
      >
        HỢP ĐỒNG THUÊ PHÒNG
      </h1>

      <div className="flex flex-col md:flex-row gap-12 border p-4 rounded-xl shadow bg-white">
        <div
          className="w-full md:w-1/2 rounded-xl overflow-hidden"
          data-aos="fade-right"
        >
          <iframe
            src="/hopdong_4.pdf"
            width="100%"
            height="600px"
            className="rounded-xl shadow"
          />
        </div>

        <div
          className="w-full md:w-1/2 space-y-2 text-sm md:text-base"
          data-aos="fade-left"
        >
          <p>
            <strong>Tên phòng:</strong> {PhongTro.tenPhong}
          </p>
          <p>
            <strong>Tầng:</strong> {PhongTro.tang}
          </p>
          <p>
            <strong>Giá phòng:</strong> {PhongTro.giaPhong.toLocaleString()} đ
          </p>
          <p>
            <strong>Ngày bắt đầu:</strong>{" "}
            {new Date(HopDong.ngayBatDau).toLocaleDateString()}
          </p>
          <p>
            <strong>Ngày kết thúc:</strong>{" "}
            {new Date(HopDong.ngayKetThuc).toLocaleDateString()}
          </p>
          <p>
            <strong>Tiền cọc:</strong> {HopDong.tienDaCoc.toLocaleString()} đ
          </p>
          <p>
            <strong>Ghi chú:</strong> {HopDong.ghiChu || "Không có"}
          </p>
          <a
            href={`/api/report/hopdongpdf?id=${HopDong.id}`}
            download={`hopdong-${HopDong.id}.pdf`}
            className="inline-block px-4 py-2 mt-4 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Tải hợp đồng PDF
          </a>
        </div>
      </div>
    </div>
  );
}
