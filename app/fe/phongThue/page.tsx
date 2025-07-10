"use client";

import React, { useEffect, useState } from "react";

interface KhachHang {
  id: number;
  hoTen: string;
  ngaySinh: string;
  cccd: string;
  diaChi: string;
  soDienThoai: string;
  email: string;
}

interface PhongTro {
  id: number;
  tenPhong: string;
  tang: number;
  kichThuoc: number;
  giaPhong: number;
  soNguoiToiDa: number;
  toaNha: { tenToaNha: string };
  hinhAnh?: string;
}

export default function PhongTroPage() {
  const [khachHang, setKhachHang] = useState<KhachHang | null>(null);
  const [phongCuaToi, setPhongCuaToi] = useState<PhongTro | null>(null);

  useEffect(() => {
    const khachId = 7;

    fetch(`/api/khachhang/${khachId}`)
      .then((res) => res.json())
      .then((data) => setKhachHang(data.data));

    fetch(`/api/phongtro/khachhang/${khachId}`)
      .then((res) => res.json())
      .then((data) => setPhongCuaToi(data));
  }, []);

  return (
    <div className="p-4 space-y-8">
      {khachHang && (
        <section className="border rounded shadow bg-white p-4">
          <h2 className="text-lg font-semibold mb-2">Thông tin khách hàng</h2>
          <p>
            <strong>Họ tên:</strong> {khachHang.hoTen}
          </p>
          <p>
            <strong>Ngày sinh:</strong>{" "}
            {new Date(khachHang.ngaySinh).toLocaleDateString()}
          </p>
          <p>
            <strong>CCCD:</strong> {khachHang.cccd}
          </p>
          <p>
            <strong>Địa chỉ:</strong> {khachHang.diaChi}
          </p>
          <p>
            <strong>SĐT:</strong> {khachHang.soDienThoai}
          </p>
          <p>
            <strong>Email:</strong> {khachHang.email}
          </p>
        </section>
      )}

      {phongCuaToi && (
        <section className="border rounded-xl p-4 shadow-md bg-green-50">
          <h2 className="text-xl font-semibold text-green-700 mb-2">
            Phòng đang thuê
          </h2>
          <div className="flex gap-4">
            <img
              src={
                phongCuaToi.hinhAnh ||
                "https://kientructrangkim.com/wp-content/uploads/2022/11/thiet-ke-noi-that-phong-tro-4.jpg"
              }
              className="w-48 h-32 object-cover rounded-lg"
              alt="Phòng đang thuê"
            />
            <div className="space-y-1">
              <p>
                <strong>Phòng:</strong> {phongCuaToi.tenPhong}
              </p>
              <p>
                <strong>Tầng:</strong> {phongCuaToi.tang}
              </p>
              <p>
                <strong>Diện tích:</strong> {phongCuaToi.kichThuoc} m²
              </p>
              <p>
                <strong>Giá thuê:</strong>{" "}
                {phongCuaToi.giaPhong.toLocaleString()} đ/tháng
              </p>
              <p>
                <strong>Tòa nhà:</strong> {phongCuaToi.toaNha.tenToaNha}
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
