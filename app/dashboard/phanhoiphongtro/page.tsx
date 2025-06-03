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

interface PhanHoi {
  id: number;
  noiDung: string;
  ngayPhanHoi: string;
  trangThai: boolean;
  KhachHangId: number;
}

interface PhongTro {
  id: number;
  tenPhong: string;
}

interface PhongTroPhanHoi {
  PhanHoiId: number;
  PhongTroId: number;
  PhanHoi: PhanHoi;
  PhongTro: PhongTro;
}

export default function PhongTroPhanHoiList() {
  const [data, setData] = useState<PhongTroPhanHoi[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/phongtro_phanhoi")
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
        console.error("Lỗi khi tải dữ liệu PhongTroPhanHoi:", error)
      );
  }, []);

  return (
    <div>
      <h1 className="flex justify-center items-center text-green-500 text-4xl mt-3 mb-3 text-underline">
        DANH SÁCH PHẢN HỒI PHÒNG TRỌ
      </h1>
      <Table>
        <TableCaption className="text-white"></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white">ID</TableHead>
            <TableHead className="text-white">Nội dung</TableHead>
            <TableHead className="text-white">Ngày phản hồi</TableHead>
            <TableHead className="text-white">Trạng thái</TableHead>
            <TableHead className="text-white">ID</TableHead>
            <TableHead className="text-white">Tên phòng</TableHead>
            <TableHead className="text-white">ID Khách hàng</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={`${item.PhanHoiId}-${item.PhongTroId}`}>
              <TableCell className="text-white">{item.PhanHoi.id}</TableCell>
              <TableCell className="text-white">
                {item.PhanHoi.noiDung}
              </TableCell>
              <TableCell className="text-white">
                {new Date(item.PhanHoi.ngayPhanHoi).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-white">
                {item.PhanHoi.trangThai ? "Đã xử lý" : "Chưa xử lý"}
              </TableCell>
              <TableCell className="text-white">{item.PhongTro.id}</TableCell>
              <TableCell className="text-white">
                {item.PhongTro.tenPhong}
              </TableCell>
              <TableCell className="text-white">
                {item.PhanHoi.KhachHangId}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
