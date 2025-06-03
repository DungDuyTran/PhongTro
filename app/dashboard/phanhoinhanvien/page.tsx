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

interface PhanHoiNhanVien {
  id: number;
  PhanHoiId: number;
  PhanHoi: PhanHoi;
}

export default function PhanHoiNhanVienList() {
  const [data, setData] = useState<PhanHoiNhanVien[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/phanhoinhanvien")
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
        console.error("Lỗi khi tải dữ liệu phản hồi nhân viên:", error)
      );
  }, []);

  return (
    <div>
      <h1 className="flex justify-center items-center text-green-500 text-4xl mt-3 mb-3 text-underline">
        DANH SÁCH PHẢN HỒI NHÂN VIÊN
      </h1>
      <Table>
        <TableCaption className="text-white"></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-white">ID</TableHead>
            <TableHead className="text-white">ID Phản hồi</TableHead>
            <TableHead className="text-white">Nội dung</TableHead>
            <TableHead className="text-white">Ngày phản hồi</TableHead>
            <TableHead className="text-white">Trạng thái</TableHead>
            <TableHead className="text-white">ID Khách hàng</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="text-white">{item.id}</TableCell>
              <TableCell className="text-white">{item.PhanHoi?.id}</TableCell>
              <TableCell className="text-white">
                {item.PhanHoi?.noiDung}
              </TableCell>
              <TableCell className="text-white">
                {new Date(item.PhanHoi?.ngayPhanHoi).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-white">
                {item.PhanHoi?.trangThai ? "Đã phản hồi" : "Chưa phản hồi"}
              </TableCell>
              <TableCell className="text-white flex items-center">
                {item.PhanHoi?.KhachHangId}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
