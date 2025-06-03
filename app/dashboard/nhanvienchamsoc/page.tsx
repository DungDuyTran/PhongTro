"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface KhachHang {
  id: number;
  hoTen: string;
}

interface NhanVien {
  id: number;
  hoTen: string;
}

interface ChamSocKhachHang {
  id: number;
  tenHoTro: string;
  loaiHoTro: string;
  ngayHoTro: string;
  KhachHangId: number;
  NhanVienId: number;
  KhachHang: KhachHang;
  NhanVien: NhanVien;
}

export default function ChamSocKhachHangList() {
  const [data, setData] = useState<ChamSocKhachHang[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/chamsockhachhang")
      .then((res) => res.json())
      .then((resData) => {
        const danhSach = Array.isArray(resData)
          ? resData
          : Array.isArray(resData.data)
          ? resData.data
          : [];
        setData(danhSach);
      })
      .catch((error) =>
        console.error("Lỗi khi tải dữ liệu chăm sóc khách hàng:", error)
      );
  }, []);

  return (
    <div>
      <h1 className="flex justify-center items-center text-green-500 text-4xl mt-3 mb-3 text-underline">
        DỊCH VỤ CHĂM SÓC KHÁCH HÀNG
      </h1>
      <Table>
        <TableCaption className="text-white"></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white">ID</TableHead>
            <TableHead className="text-white">Tên hỗ trợ</TableHead>
            <TableHead className="text-white">Loại hỗ trợ</TableHead>
            <TableHead className="text-white">Ngày hỗ trợ</TableHead>
            <TableHead className="text-white">ID</TableHead>
            <TableHead className="text-white">Tên Khách hàng</TableHead>
            <TableHead className="text-white">ID</TableHead>
            <TableHead className="text-white">Tên Nhân viên</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="text-white">{item.id}</TableCell>
              <TableCell className="text-white">{item.tenHoTro}</TableCell>
              <TableCell className="text-white">{item.loaiHoTro}</TableCell>
              <TableCell className="text-white">
                {new Date(item.ngayHoTro).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-white">{item.KhachHang?.id}</TableCell>
              <TableCell className="text-white">
                {item.KhachHang?.hoTen}
              </TableCell>
              <TableCell className="text-white">{item.NhanVien?.id}</TableCell>
              <TableCell className="text-white">
                {item.NhanVien?.hoTen}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
