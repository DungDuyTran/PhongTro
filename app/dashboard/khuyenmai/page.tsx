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

interface ChiTietKhuyenMai {
  loaiKhuyenMai: string;
  phantram: number;
  PhongTroId: number;
  KhuyenMaiId: number;
  PhongTro: {
    id: number;
    tenPhong: string;
    tang: number;
    kichThuoc: number;
    giaPhong: number;
    soNguoiToiDa: number;
    ToaNhaId: number;
    loaiPhongId: number | null;
  };
  KhuyenMai: {
    id: number;
    tenKhuyenMai: string;
    moTa: string;
    phanTramGiamGia: number;
    ngayBatDau: string;
    ngayKetThuc: string;
  };
}

const Page = () => {
  const [data, setData] = useState<ChiTietKhuyenMai[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/chitietkhuyenmai");
        const result = await res.json();
        setData(result.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="text-white">
      <h1 className="flex justify-center items-center text-green-500 text-4xl mt-3 mb-3 text-underline">
        DANH SÁCH KHUYẾN MÃI
      </h1>
      <Table>
        <TableCaption className="text-white"></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white">ID</TableHead>
            <TableHead className="text-white">Tên phòng</TableHead>
            <TableHead className="text-white">Tầng</TableHead>
            <TableHead className="text-white">Tên khuyến mãi</TableHead>
            <TableHead className="text-white">Mô tả</TableHead>
            <TableHead className="text-white">Giảm (%)</TableHead>
            <TableHead className="text-white">Thời gian</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="text-white">{item.PhongTro.id}</TableCell>
              <TableCell className="text-white">
                {item.PhongTro.tenPhong}
              </TableCell>
              <TableCell className="text-white">{item.PhongTro.tang}</TableCell>
              <TableCell className="text-white">
                {item.KhuyenMai.tenKhuyenMai}
              </TableCell>
              <TableCell className="text-white">
                {item.KhuyenMai.moTa}
              </TableCell>
              <TableCell className="text-white">
                {item.KhuyenMai.phanTramGiamGia * 100}%
              </TableCell>
              <TableCell className="text-white">
                {new Date(item.KhuyenMai.ngayBatDau).toLocaleDateString()} -{" "}
                {new Date(item.KhuyenMai.ngayKetThuc).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;
