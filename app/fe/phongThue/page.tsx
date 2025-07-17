"use client";

import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

interface ToaNha {
  tenToaNha: string;
  diaChi: string;
}

interface PhongTro {
  id: number;
  tenPhong: string;
  tang: number;
  kichThuoc: number;
  giaPhong: number;
  soNguoiToiDa: number;
  hinhAnh?: string;
  ToaNha: ToaNha;
}

interface PhongDangThue {
  phongTroId: number;
  khachHangId: number;
  phongTro: PhongTro;
}

export default function PhongTroPage() {
  const [phongThue, setPhongThue] = useState<PhongDangThue | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Khởi tạo hiệu ứng AOS
    AOS.init({ duration: 1000 });

    // Gọi API
    fetch("/api/phongdangthue")
      .then((res) => res.json())
      .then((res) => {
        console.log("Kết quả API:", res);
        const filtered = res?.data?.find?.(
          (item: PhongDangThue) =>
            item.khachHangId === 7 && item.phongTroId === 1
        );
        setPhongThue(filtered || null);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi fetch API:", err);
        setError("Không thể tải dữ liệu từ server.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="p-4 text-blue-500">Đang tải dữ liệu...</p>;
  }

  if (error) {
    return <p className="p-4 text-red-600">{error}</p>;
  }

  if (!phongThue) {
    return (
      <p className="p-4 text-red-600">Không tìm thấy phòng cho khách hàng 7.</p>
    );
  }

  const phong = phongThue.phongTro;

  return (
    <div className="p-4 w-auto font-medium">
      <h1 className="text-4xl mb-4 flex justify-center" data-aos="fade-down">
        Thông tin phòng bạn đang thuê
      </h1>

      <div
        className="flex flex-col md:flex-row justify-center items-center gap-20 border rounded-xl p-4"
        data-aos="flip-up"
      >
        {/* Ảnh phòng */}
        <img
          src={
            phong.hinhAnh ||
            "https://kientructrangkim.com/wp-content/uploads/2022/11/thiet-ke-noi-that-phong-tro-4.jpg"
          }
          alt="Ảnh phòng"
          className="w-full md:w-120 h-auto object-cover rounded-lg shadow"
        />

        {/* Thông tin phòng */}
        <div className="space-y-2 text-sm md:text-base" data-aos="fade-up">
          <p>Phòng: {phong.tenPhong}</p>
          <p>Tầng: {phong.tang}</p>
          <p>Diện tích: {phong.kichThuoc} m²</p>
          <p>Giá thuê: {phong.giaPhong.toLocaleString()} đ/tháng</p>
          <p>Số người tối đa: {phong.soNguoiToiDa}</p>
          <p>Tòa nhà: {phong.ToaNha?.tenToaNha}</p>
          <p>Địa chỉ: {phong.ToaNha?.diaChi}</p>
        </div>
      </div>
    </div>
  );
}
